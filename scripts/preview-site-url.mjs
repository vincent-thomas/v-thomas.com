import { appendFileSync, readFileSync } from 'node:fs';

const token = process.env.CLOUDFLARE_API_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const alias = process.env.PREVIEW_ALIAS;
if (!token || !account || !alias) {
  throw new Error('Preview site URL requires the Cloudflare account, token, and alias');
}

const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${account}/workers/subdomain`,
  { headers: { Authorization: `Bearer ${token}` } },
);
const payload = await response.json();
const subdomain = payload?.result?.subdomain;
if (!response.ok || !payload?.success || !subdomain) {
  throw new Error(`Could not read the workers.dev subdomain (${response.status})`);
}

const configText = readFileSync('wrangler.jsonc', 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/(^|\s)\/\/.*$/gm, '$1');
const workerName = JSON.parse(configText).name;

const label = (value, name) => {
  if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(value)) {
    throw new Error(`Unexpected ${name}: ${value}`);
  }
};
label(alias, 'preview alias');
label(workerName, 'worker name');
label(subdomain, 'workers.dev subdomain');

const url = `https://${alias}-${workerName}.${subdomain}.workers.dev`;
console.log(`Preview site URL: ${url}`);

const output = process.env.GITHUB_OUTPUT;
if (!output) throw new Error('GITHUB_OUTPUT is not set');
appendFileSync(output, `url=${url}\n`);
