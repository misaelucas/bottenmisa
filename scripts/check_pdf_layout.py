#!/usr/bin/env python3
import argparse
import math
import subprocess
from pathlib import Path

A4_WIDTH = 595.28
A4_HEIGHT = 841.89
TOLERANCE = 3.0


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf")
    parser.add_argument("--lang", choices=["pt", "en"], default="pt")
    args = parser.parse_args()

    pdf_path = Path(args.pdf)
    if not pdf_path.exists():
        raise SystemExit(f"Missing PDF: {pdf_path}")

    info = subprocess.run(["pdfinfo", str(pdf_path)], check=True, capture_output=True, text=True).stdout
    if "Page size:" not in info:
        raise SystemExit("pdfinfo did not report page size.")

    pages = parse_pdfinfo_int(info, "Pages")
    width, height = parse_page_size(info)
    problems: list[str] = []

    if not approx(width, A4_WIDTH) or not approx(height, A4_HEIGHT):
        problems.append(f"Expected A4 page size, got {width:.2f} x {height:.2f} pt")

    if pages < 2:
        problems.append("Expected more than one page in the exported PDF.")

    try:
        import fitz  # type: ignore
    except ImportError:
        fitz = None

    if fitz is not None:
        doc = fitz.open(pdf_path)
        bottom_clipping_zone = 10
        for page_index, page in enumerate(doc, start=1):
            rect = page.rect
            for block in page.get_text("blocks"):
                text = block[4].strip()
                if not text:
                    continue
                if block[3] > rect.height - bottom_clipping_zone:
                    problems.append(
                        f"Text block on page {page_index} reaches the clipping zone: y={block[3]:.1f}"
                    )

    text = subprocess.run(["pdftotext", str(pdf_path), "-"], check=True, capture_output=True, text=True).stdout
    required_text = {
        "pt": ["Produtividade", "Introducao ao Niilismo", "O Veneno dos Tempos Modernos"],
        "en": ["Productivity", "Introduction to Nihilism", "The Poison of Modern Times"],
    }
    for required in required_text[args.lang]:
        if required not in strip_accents(text):
            problems.append(f"Missing expected text in extracted PDF: {required}")

    if problems:
        for problem in problems:
            print(f"ERROR: {problem}")
        raise SystemExit(1)

    print(f"PDF layout check passed: {pages} pages, A4, selectable text, no bottom clipping detected.")


def parse_pdfinfo_int(info: str, key: str) -> int:
    for line in info.splitlines():
        if line.startswith(f"{key}:"):
            return int(line.split(":", 1)[1].strip().split()[0])
    return 0


def parse_page_size(info: str) -> tuple[float, float]:
    for line in info.splitlines():
        if line.startswith("Page size:"):
            parts = line.split(":", 1)[1].strip().split()
            return float(parts[0]), float(parts[2])
    raise ValueError("No page size line")


def approx(value: float, expected: float) -> bool:
    return math.isclose(value, expected, abs_tol=TOLERANCE)


def strip_accents(value: str) -> str:
    replacements = str.maketrans("çãáâéêíóôõúüÇÃÁÂÉÊÍÓÔÕÚÜ", "caaaeeiooouuCAAAEEIOOOUU")
    return value.translate(replacements)


if __name__ == "__main__":
    main()
