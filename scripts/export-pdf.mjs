import { chromium } from "playwright";
import fs from "node:fs/promises";

const LANG = process.env.PDF_LANG === "en" ? "en" : "pt";
const OUTPUT = `output/opsec-bible-productivity-${LANG}.pdf`;
const PORT = process.env.PDF_PORT ?? "4321";
const PATH =
  process.env.PDF_PATH ?? (LANG === "en" ? "/en/pdf/productivity" : "/pdf/productivity");
const URL = `http://127.0.0.1:${PORT}${PATH}`;

await fs.mkdir("output", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: {
    width: 1240,
    height: 1754,
  },
});

await page.goto(URL, { waitUntil: "networkidle" });

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

await browser.close();

console.log(`PDF exported to ${OUTPUT}`);
