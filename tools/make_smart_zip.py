"""Build a "smart" skeleton zip of the study hub for uploading into a Claude chat.

Keeps the code and the authored content (HTML, CSS, JS, homework/quiz data.js, LaTeX sources, tools, README) and cuts
the chaff that is large and carries no information a chat needs: PDFs, screenshots and images, bundled fonts and KaTeX,
the generated slide-text index, and the stale pre-chapter copies (root hw/, quizzes/, slides/). Every cut file is still
listed, with its size, in SKELETON_INDEX.md inside the zip, so the chat knows what exists and where.

Run from anywhere (stdlib only, Python 3.8+):
    python tools/make_smart_zip.py                    # -> _skeleton/MAT_231_Calc_II_skeleton.zip
    python tools/make_smart_zip.py --list             # dry run: print what would be kept / cut
    python tools/make_smart_zip.py --with-slide-text  # also keep assets/js/slide-text.js (page text of every PDF, ~110 KB)
    python tools/make_smart_zip.py --with-images      # also keep homework screenshots (large)
    python tools/make_smart_zip.py --with-pdfs        # also keep the slide PDFs (large)
    python tools/make_smart_zip.py --with-legacy      # also keep the stale root hw/ quizzes/ slides/ copies
    python tools/make_smart_zip.py --out C:/tmp/hub.zip
"""
import argparse, datetime, os, subprocess, sys, zipfile
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NAME = "MAT_231_Calc_II"
OUT_DIR = "_skeleton"

SKIP_DIRS_ANYWHERE = {".git", "node_modules", "__pycache__", ".venv", "venv", ".idea", ".vscode", OUT_DIR}
LEGACY_ROOT_DIRS = {"hw", "quizzes", "slides"}        # pre-chapter copies; the live tree is ch<N>/
VENDOR_DIR = ("assets", "vendor")                    # KaTeX + fonts (third-party, re-downloadable)
GENERATED_BIG = {("assets", "js", "slide-text.js")}  # rebuilt by tools/extract_slide_text.py
PDF_EXT = {".pdf"}
IMAGE_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".ico", ".svg"}
BINARY_EXT = {".woff", ".woff2", ".ttf", ".otf", ".eot", ".zip", ".7z", ".mp4", ".mp3", ".wav", ".exe", ".dll", ".pyc"}
KEEP_EXT = {".html", ".htm", ".css", ".js", ".mjs", ".json", ".md", ".txt", ".py", ".ps1", ".tex", ".csv", ".yml", ".yaml", ".toml", ".gitignore", ""}
SOFT_LIMIT_MB = 25  # chat uploads get unwieldy past this


def human(n):
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024 or unit == "GB":
            return f"{n:.0f} {unit}" if unit == "B" else f"{n:.1f} {unit}"
        n /= 1024


def bar(i, n, label, width=32):
    """Single-line progress bar on stderr."""
    frac = i / n if n else 1
    fill = int(width * frac)
    sys.stderr.write(f"\r  {label:<8} [{'#' * fill}{'.' * (width - fill)}] {i:>4}/{n:<4} {frac:6.1%}")
    if i >= n:
        sys.stderr.write("\n")
    sys.stderr.flush()


def classify(rel, args):
    """Return None to keep the file, or the reason it is cut."""
    parts = rel.parts
    ext = rel.suffix.lower()
    if len(parts) > 1 and parts[0] in LEGACY_ROOT_DIRS and not args.with_legacy:
        return "legacy copy (pre-chapter layout; live tree is ch<N>/)"
    if parts[:2] == VENDOR_DIR:
        return "vendor (KaTeX / fonts, third-party)"
    if tuple(parts) in GENERATED_BIG and not args.with_slide_text:
        return "generated (tools/extract_slide_text.py)"
    if ext in PDF_EXT and not args.with_pdfs:
        return "pdf"
    if ext in IMAGE_EXT and not args.with_images:
        return "image"
    if ext in BINARY_EXT:
        return "binary"
    if ext not in KEEP_EXT and not rel.name.startswith("."):
        return f"other ({ext})"
    return None


def git_rev():
    try:
        r = subprocess.run(["git", "-C", str(ROOT), "log", "-1", "--format=%h %cs %s"], capture_output=True, text=True, timeout=10)
        return r.stdout.strip() or "n/a"
    except Exception:
        return "n/a (git not found)"


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--out", default=str(ROOT / OUT_DIR / f"{NAME}_skeleton.zip"))
    ap.add_argument("--list", action="store_true", help="dry run: print the plan, write nothing")
    ap.add_argument("--with-slide-text", action="store_true")
    ap.add_argument("--with-images", action="store_true")
    ap.add_argument("--with-pdfs", action="store_true")
    ap.add_argument("--with-legacy", action="store_true")
    args = ap.parse_args()

    print(f"[1/3] scanning {ROOT}")
    files = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = sorted(d for d in dirnames if d not in SKIP_DIRS_ANYWHERE)
        for f in sorted(filenames):
            p = Path(dirpath) / f
            files.append((p.relative_to(ROOT), p.stat().st_size))

    keep, cut = [], []
    for i, (rel, size) in enumerate(files, 1):
        why = classify(rel, args)
        (keep if why is None else cut).append((rel, size, why))
        if i % 25 == 0 or i == len(files):
            bar(i, len(files), "classify")

    tot_all = sum(s for _, s in files)
    tot_keep = sum(s for _, s, _ in keep)
    by_reason = defaultdict(lambda: [0, 0])
    for _, s, why in cut:
        by_reason[why][0] += 1
        by_reason[why][1] += s

    print(f"      {len(files)} files, {human(tot_all)} on disk")
    print(f"      keep {len(keep)} files ({human(tot_keep)})   cut {len(cut)} files ({human(tot_all - tot_keep)})")
    for why, (n, s) in sorted(by_reason.items(), key=lambda kv: -kv[1][1]):
        print(f"        cut  {n:>4} x {why:<52} {human(s):>9}")

    if args.list:
        print("\nKEPT:")
        for rel, s, _ in keep:
            print(f"  {human(s):>9}  {rel.as_posix()}")
        return

    # ---- index of the whole tree (kept + cut), cut files grouped per folder so it stays short
    stamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    lines = [
        f"# {NAME} — skeleton zip",
        "",
        f"Built {stamp} by tools/make_smart_zip.py · repo HEAD: {git_rev()}",
        "",
        "This is a cut-down copy of the MAT 231 study-hub repo for uploading into a chat: code and authored content are",
        "included, large binaries are not. Every file that was left out is listed below with its size, so its path and",
        "existence are known even though its bytes are absent. Paths are relative to the repo root.",
        "",
        f"- Full repo: {len(files)} files, {human(tot_all)}",
        f"- In this zip: {len(keep)} files, {human(tot_keep)} uncompressed",
        "- Cut: " + "; ".join(f"{n} {why} ({human(s)})" for why, (n, s) in sorted(by_reason.items(), key=lambda kv: -kv[1][1])),
        "",
        "Read README.md first: it documents the layout (course home → ch<N>/ chapter hubs), the data files",
        "(assets/js/chapters.js, outline.js, slides.js, manifest.js) and the steps for adding a chapter.",
        "",
        "## Files left out",
        "",
    ]
    groups = defaultdict(list)
    for rel, s, why in cut:
        folder = rel.parts[0] if why.startswith("legacy") else rel.parent.as_posix()  # one line per legacy root folder
        groups[(folder, why)].append((rel.relative_to(folder).as_posix() if folder != "." else rel.name, s))
    for (folder, why), items in sorted(groups.items()):
        s = sum(x for _, x in items)
        if len(items) > 6:
            exts = sorted({Path(n).suffix or "(none)" for n, _ in items})
            lines.append(f"- `{folder}/` — {len(items)} files ({', '.join(exts)}), {human(s)} · {why}")
        else:
            for n, x in items:
                lines.append(f"- `{folder}/{n}` — {human(x)} · {why}")
    lines += ["", "## Files included", ""]
    lines += [f"- `{rel.as_posix()}` — {human(s)}" for rel, s, _ in keep]
    index = "\n".join(lines) + "\n"

    out = Path(args.out).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    print(f"[2/3] writing {out}")
    with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        z.writestr(f"{NAME}/SKELETON_INDEX.md", index)
        for i, (rel, _, _) in enumerate(keep, 1):
            z.write(ROOT / rel, f"{NAME}/{rel.as_posix()}")
            if i % 10 == 0 or i == len(keep):
                bar(i, len(keep), "zip")

    size = out.stat().st_size
    print(f"[3/3] done: {human(size)} zipped ({100 * size / max(tot_all, 1):.1f}% of the full {human(tot_all)})")
    if size > SOFT_LIMIT_MB * 1024 * 1024:
        print(f"      WARNING: over {SOFT_LIMIT_MB} MB — drop --with-* flags or check for new large files in the KEPT list (--list)")


if __name__ == "__main__":
    main()
