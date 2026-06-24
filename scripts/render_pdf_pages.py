#!/usr/bin/env python3
import argparse
import shutil
import subprocess
from pathlib import Path


def render_with_fitz(pdf_path: Path, output_dir: Path, pages: int, dpi: int) -> bool:
    try:
        import fitz  # type: ignore
    except ImportError:
        return False

    doc = fitz.open(pdf_path)
    scale = dpi / 72
    matrix = fitz.Matrix(scale, scale)
    for index in range(min(pages, doc.page_count)):
        page = doc.load_page(index)
        pixmap = page.get_pixmap(matrix=matrix, alpha=False)
        pixmap.save(output_dir / f"page-{index + 1:02d}.png")
    return True


def render_with_pdftoppm(pdf_path: Path, output_dir: Path, pages: int, dpi: int) -> bool:
    if shutil.which("pdftoppm") is None:
        return False

    subprocess.run(
        [
            "pdftoppm",
            "-png",
            "-r",
            str(dpi),
            "-f",
            "1",
            "-l",
            str(pages),
            str(pdf_path),
            str(output_dir / "page"),
        ],
        check=True,
    )
    for file in output_dir.glob("page-*.png"):
        parts = file.stem.split("-")
        if parts[-1].isdigit():
            file.rename(output_dir / f"page-{int(parts[-1]):02d}.png")
    return True


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf")
    parser.add_argument("output_dir")
    parser.add_argument("--pages", type=int, default=12)
    parser.add_argument("--dpi", type=int, default=150)
    args = parser.parse_args()

    pdf_path = Path(args.pdf)
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    for old_page in output_dir.glob("page-*.png"):
        old_page.unlink()

    if not render_with_fitz(pdf_path, output_dir, args.pages, args.dpi):
        if not render_with_pdftoppm(pdf_path, output_dir, args.pages, args.dpi):
            raise SystemExit("Install PyMuPDF or poppler-utils to render PDF pages.")

    print(f"Rendered first {args.pages} pages to {output_dir}")


if __name__ == "__main__":
    main()
