export type PdfBlock =
  | {
      type: "heading";
      depth: 1 | 2 | 3 | 4 | 5 | 6;
      text: string;
      id: string;
      aliases: string[];
    }
  | { type: "paragraph"; html: string }
  | { type: "image"; src: string; alt: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; lines: string[] };

const imagePattern = /^\s*!\[(?<alt>[^\]]*)\]\((?<src>[^)]+)\)\s*$/;
const headingPattern = /^(?<marks>#{1,6})\s+(?<text>.+)$/;
const listPattern = /^[-*]\s+(?<text>.+)$/;

export function parseProductivityMarkdown(markdown: string): PdfBlock[] {
  const blocks: PdfBlock[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const headingIds = collectHeadingIds(lines);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";

    if (!line.trim() || line.trim() === "`") {
      index += 1;
      continue;
    }

    const heading = line.match(headingPattern);
    if (heading?.groups) {
      blocks.push({
        type: "heading",
        depth: heading.groups.marks.length as 1 | 2 | 3 | 4 | 5 | 6,
        text: stripInlineMarkup(heading.groups.text),
        ...createHeadingAnchor(stripInlineMarkup(heading.groups.text)),
      });
      index += 1;
      continue;
    }

    const image = line.trim().match(imagePattern);
    if (image?.groups) {
      blocks.push({
        type: "image",
        src: toPdfAssetPath(image.groups.src.trim()),
        alt: image.groups.alt,
      });
      index += 1;
      continue;
    }

    const list = line.match(listPattern);
    if (list?.groups) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index]?.match(listPattern);
        if (!item?.groups) break;
        items.push(inlineMarkdownToHtml(item.groups.text, headingIds));
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    if (line.startsWith("    ")) {
      const quoteLines: string[] = [];
      while (index < lines.length) {
        const quoteLine = lines[index] ?? "";
        if (quoteLine.startsWith("    ") || !quoteLine.trim()) {
          const text = quoteLine.replace(/^ {4}/, "").trim();
          if (text) quoteLines.push(text);
          index += 1;
          continue;
        }
        break;
      }
      if (quoteLines.length) blocks.push({ type: "quote", lines: quoteLines });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const next = lines[index] ?? "";
      if (
        !next.trim() ||
        next.trim() === "`" ||
        headingPattern.test(next) ||
        imagePattern.test(next.trim()) ||
        listPattern.test(next) ||
        next.startsWith("    ")
      ) {
        break;
      }
      paragraph.push(next.trim());
      index += 1;
    }

    if (paragraph.length) {
      blocks.push({
        type: "paragraph",
        html: inlineMarkdownToHtml(paragraph.join(" "), headingIds),
      });
    } else {
      index += 1;
    }
  }

  return blocks;
}

export function extractImageSources(markdown: string): string[] {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.trim().match(imagePattern)?.groups?.src)
    .filter((src): src is string => Boolean(src));
}

function toPdfAssetPath(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  return `/pdf-assets/${src.replace(/^the-opsec-bible\/docs\//, "")}`;
}

function stripInlineMarkup(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .trim();
}

function inlineMarkdownToHtml(value: string, headingIds: Set<string>): string {
  let output = escapeHtml(value);

  const protectedHtml: string[] = [];
  const protect = (html: string) => {
    const token = `PDFTOKEN${protectedHtml.length}TOKEN`;
    protectedHtml.push(html);
    return token;
  };

  output = output.replace(/`([^`]+)`/g, (_match, code: string) =>
    protect(`<code>${code}</code>`),
  );
  output = output.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label: string, href: string) =>
      protect(
        `<a href="${escapeAttribute(resolveMarkdownHref(href, headingIds))}">${label}</a>`,
      ),
  );
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/_([^_]+)_/g, "<em>$1</em>");
  protectedHtml.forEach((html, index) => {
    output = output.replaceAll(`PDFTOKEN${index}TOKEN`, html);
  });
  return output;
}

function collectHeadingIds(lines: string[]): Set<string> {
  const ids = new Set<string>(["top"]);
  for (const line of lines) {
    const heading = line.match(headingPattern);
    if (!heading?.groups) continue;
    const anchor = createHeadingAnchor(stripInlineMarkup(heading.groups.text));
    ids.add(anchor.id);
    for (const alias of anchor.aliases) ids.add(alias);
  }
  return ids;
}

function createHeadingAnchor(text: string): { id: string; aliases: string[] } {
  const id = slugify(text);
  const aliases = new Set<string>();
  const beforeColon = text.split(":")[0]?.trim();
  if (beforeColon) aliases.add(slugify(beforeColon));

  const normalizedAliases: Record<string, string[]> = {
    "cold-showers": ["coldshowers"],
    "discipline-over-comfort": ["discipline"],
    "macro-time-management": ["macroworkflow", "macro-workflow"],
    "the-general-workflow": ["generalworkflow", "general-workflow"],
    "pomodoro-focus-times-intentional-pauses-to-prevent-burnouts": [
      "the-pomodoro-technique",
    ],
    "preparing-the-body-diet-to-favor-cerebral-activity": [
      "diet-and-mental-health",
    ],
    "collaborative-project-management-kanban-in-forgejo": [
      "project-management-with-kanban",
    ],
    "reflecting-how-to-use-graphs-to-help-brainstorming-ideas-draw-io": [
      "graphs",
      "brainstorming-ideas-with-drawio",
    ],
    "reflecting-brainstorming-ideas-while-on-the-run": [
      "brainstorming-ideas-while-on-the-run",
    ],
  };

  for (const alias of normalizedAliases[id] ?? []) aliases.add(alias);
  aliases.delete(id);

  return { id, aliases: [...aliases].filter(Boolean) };
}

function resolveMarkdownHref(href: string, headingIds: Set<string>): string {
  const trimmed = href.trim();
  if (/^(https?:|mailto:|#)/.test(trimmed)) return trimmed;

  if (trimmed.endsWith("/index.md") || trimmed.endsWith(".md")) {
    const slug = trimmed
      .replace(/^the-opsec-bible\/docs\//, "")
      .replace(/\/index\.md$/, "")
      .replace(/\.md$/, "")
      .split("/")
      .pop();

    if (slug) {
      const target = slugify(slug);
      if (headingIds.has(target)) return `#${target}`;
    }

    return "#top";
  }

  return trimmed;
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value: string): string {
  return value.replaceAll('"', "%22");
}
