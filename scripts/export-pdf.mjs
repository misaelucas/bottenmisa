import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "node:http";

const LANG = process.env.PDF_LANG === "en" ? "en" : "pt";
const OUTPUT = `output/opsec-bible-productivity-${LANG}.pdf`;
const requestedPath = process.env.PDF_PATH ?? (LANG === "en" ? "/en/productivity/" : "/productivity/");
const pagePath = requestedPath.endsWith("/") ? requestedPath : `${requestedPath}/`;
const distRoot = path.resolve("dist");
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    const filePath = path.resolve(distRoot, `.${pathname}`, pathname.endsWith("/") ? "index.html" : "");
    if (!filePath.startsWith(`${distRoot}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    const contents = await fs.readFile(filePath);
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] ?? "application/octet-stream" });
    response.end(contents);
  } catch {
    response.writeHead(404).end();
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const url = `http://127.0.0.1:${address.port}${pagePath}`;

await fs.mkdir("output", { recursive: true });

let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: {
      width: 1240,
      height: 1754,
    },
  });

  const response = await page.goto(url, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`PDF page did not load: ${url}`);

  await page.pdf({
    path: OUTPUT,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "0mm",
      right: "0mm",
      bottom: "0mm",
      left: "0mm",
    },
  });
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log(`PDF exported to ${OUTPUT}`);
