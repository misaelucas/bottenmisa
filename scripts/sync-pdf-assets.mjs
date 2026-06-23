import fs from "node:fs/promises";
import path from "node:path";

const SOURCE_ROOT = "/home/fezzik/Documents/OPSEC_Bible_PT";
const MARKDOWN_FILES = [
  "src/content/pdf/productivity.pt.md",
  "src/content/pdf/productivity.en.md",
];
const PUBLIC_ASSETS = "public/pdf-assets";

const imagePattern = /^\s*!\[[^\]]*\]\((?<src>[^)]+)\)\s*$/gm;

await fs.mkdir(PUBLIC_ASSETS, { recursive: true });

const sources = new Set();

for (const markdownFile of MARKDOWN_FILES) {
  const markdown = await fs.readFile(markdownFile, "utf8");
  for (const match of markdown.matchAll(imagePattern)) {
    if (match.groups?.src) sources.add(match.groups.src.trim());
  }
}

await copyFile(
  path.join(SOURCE_ROOT, "assets/aha.png"),
  path.join(PUBLIC_ASSETS, "cover-aha.png"),
);

for (const src of sources) {
  if (typeof src !== "string") continue;
  if (/^https?:\/\//.test(src)) continue;
  const relativeSource = src;
  const publicRelative = src.replace(/^the-opsec-bible\/docs\//, "");
  await copyFile(
    path.join(SOURCE_ROOT, relativeSource),
    path.join(PUBLIC_ASSETS, publicRelative),
  );
}

console.log(`Synced ${sources.size + 1} PDF assets into ${PUBLIC_ASSETS}`);

async function copyFile(source, destination) {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(source, destination);
}
