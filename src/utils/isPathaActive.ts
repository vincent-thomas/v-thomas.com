export function isPathActive(currentPath: string, href: string) {
  const pathname = currentPath.replace(import.meta.env.BASE_URL, "");
  const subpath = pathname.match(/[^\/]+/g);
  return href === pathname || href === "/" + (subpath?.[0] || "");
}
