import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

// Dimensions of a file in public/, so social tags can name width and height.
export async function publicImageSize(src: string) {
  if (!src.startsWith('/') || src.startsWith('//') || src.includes('..')) {
    throw new Error(`Cover image must be a path inside this site: ${src}`);
  }
  const root = resolve(process.cwd(), 'public');
  const file = resolve(root, src.slice(1));
  if (file !== root && !file.startsWith(root + sep)) {
    throw new Error(`Cover image must be a path inside this site: ${src}`);
  }
  return imageSize(await readFile(file));
}

function imageSize(buf: Buffer) {
  if (buf[0] === 0x89 && buf.toString('ascii', 1, 4) === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) return jpegSize(buf);
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return webpSize(buf);
  throw new Error('Cover image must be a PNG, JPEG, or WebP file');
}

function jpegSize(buf: Buffer) {
  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) break;
    const marker = buf[offset + 1];
    const length = buf.readUInt16BE(offset + 2);
    const isFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isFrame) return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    offset += 2 + length;
  }
  throw new Error('Could not read the JPEG cover size');
}

function webpSize(buf: Buffer) {
  const type = buf.toString('ascii', 12, 16);
  if (type === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  if (type === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (type === 'VP8 ') {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  throw new Error(`Could not read the WebP cover size (${type})`);
}
