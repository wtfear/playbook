#!/usr/bin/env python3
"""
Knowledge Base Automated Documentation Validation Script

Verifies:
1. Case-sensitive relative Markdown links and frontmatter related_documents resolve to existing files.
2. Every directory index file is strictly named uppercase 'README.md' (no 'readme.md').
3. All category, research, decision, and template documents contain valid YAML frontmatter with valid status.
"""

import os
import sys
import re
from pathlib import Path

VALID_STATUSES = {"proposed", "draft", "in-review", "approved", "superseded"}

errors = []
total_files_checked = 0
total_links_checked = 0
total_frontmatter_checked = 0


def file_exists_case_sensitive(file_path: Path) -> bool:
    """
    Verifies if a file exists on disk with exact case match across all path segments.
    Works reliably on both case-insensitive (Windows/macOS) and case-sensitive (Linux) filesystems.
    """
    try:
        resolved = file_path.resolve()
        # For root path
        parts = resolved.parts
        # Drive or root anchor
        current = Path(parts[0])
        for segment in parts[1:]:
            if not current.exists():
                return False
            # Check directory entries for exact case match
            entries = os.listdir(current)
            if segment not in entries:
                return False
            current = current / segment
        return True
    except Exception:
        return False


def get_all_md_files(root_dir: str):
    md_files = []
    ignored_dirs = {".git", "node_modules", ".venv"}
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in ignored_dirs]
        for f in files:
            if f.endswith(".md"):
                md_files.append(os.path.join(root, f))
    return md_files


def check_readme_casing(root_dir: str):
    ignored_dirs = {".git", "node_modules", ".venv"}
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in ignored_dirs]
        for f in files:
            if f.lower() == "readme.md" and f != "README.md":
                errors.append(
                    f'[CASING ERROR] Index file in "{root}" is named "{f}". Expected exact uppercase "README.md".'
                )


def validate_frontmatter(file_path: str, content: str):
    global total_frontmatter_checked
    norm = file_path.replace("\\", "/").lstrip("./")

    needs_frontmatter = (
        norm.startswith("categories/")
        or norm.startswith("research/")
        or norm.startswith("decisions/")
        or norm.startswith("templates/")
    )
    if not needs_frontmatter:
        return

    total_frontmatter_checked += 1

    if not content.startswith("---"):
        errors.append(f'[FRONTMATTER ERROR] Missing YAML frontmatter in "{norm}". Must start with "---" at line 1.')
        return

    end_fm = content.find("\n---", 3)
    if end_fm == -1:
        errors.append(f'[FRONTMATTER ERROR] Unclosed YAML frontmatter in "{norm}". Missing closing "---".')
        return

    fm = content[3:end_fm]

    # Title
    title_match = re.search(r"^title:\s*(.+)$", fm, re.MULTILINE)
    if not title_match or not title_match.group(1).strip():
        errors.append(f'[FRONTMATTER ERROR] Missing or empty "title" in "{norm}".')

    # Document Type
    type_match = re.search(r"^document_type:\s*(.+)$", fm, re.MULTILINE)
    if not type_match or not type_match.group(1).strip():
        errors.append(f'[FRONTMATTER ERROR] Missing or empty "document_type" in "{norm}".')

    # Category
    cat_match = re.search(r"^category:\s*(.+)$", fm, re.MULTILINE)
    if not cat_match or not cat_match.group(1).strip():
        errors.append(f'[FRONTMATTER ERROR] Missing or empty "category" in "{norm}".')

    # Status
    status_match = re.search(r"^status:\s*([^\s#]+)", fm, re.MULTILINE)
    if not status_match or status_match.group(1).strip() not in VALID_STATUSES:
        found_status = status_match.group(1).strip() if status_match else "none"
        errors.append(
            f'[FRONTMATTER ERROR] Invalid or missing "status" in "{norm}". Expected one of: {", ".join(sorted(VALID_STATUSES))}. Found: "{found_status}".'
        )

    # Owner
    owner_match = re.search(r"^owner:\s*([^\r\n#]*)", fm, re.MULTILINE)
    if not owner_match or owner_match.group(1).strip() in ('""', "''"):
        errors.append(f'[FRONTMATTER ERROR] Missing or invalid "owner" in "{norm}". Must be explicit (e.g., null or owner name).')

    # Last Reviewed
    review_match = re.search(r"^last_reviewed:\s*([^\r\n#]*)", fm, re.MULTILINE)
    if not review_match or review_match.group(1).strip() in ('""', "''"):
        errors.append(f'[FRONTMATTER ERROR] Missing or invalid "last_reviewed" in "{norm}". Must be explicit (e.g., null or YYYY-MM-DD).')


def validate_links(file_path: str, content: str):
    global total_links_checked
    dir_path = Path(file_path).parent
    norm = file_path.replace("\\", "/").lstrip("./")

    # Frontmatter related_documents
    fm_match = re.match(r"^---\r?\n([\s\S]*?)\r?\n---", content)
    if fm_match:
        fm = fm_match.group(1)
        rel_match = re.search(r"related_documents:\r?\n((?:\s+-\s+.*?\r?\n)+)", fm)
        if rel_match:
            for line in rel_match.group(1).strip().splitlines():
                item_match = re.match(r'^\s+-\s+"?(.*?)"?\s*$', line)
                if item_match:
                    target = item_match.group(1).strip()
                    if target and not target.startswith("http") and "[" not in target:
                        total_links_checked += 1
                        clean_target = target.split("#")[0].split("?")[0]
                        resolved = (dir_path / clean_target).resolve()
                        if not file_exists_case_sensitive(resolved):
                            errors.append(
                                f'[LINK ERROR] Broken related_document in "{norm}": "{target}" does not exist on disk with exact case.'
                            )

    # Body links [text](target)
    link_regex = re.compile(r"\[([^\]]*)\]\(([^)]+)\)")
    for match in link_regex.finditer(content):
        target = match.group(2).strip()
        if (
            target.startswith("http://")
            or target.startswith("https://")
            or target.startswith("mailto:")
            or target.startswith("#")
        ):
            continue

        clean_target = target.split("#")[0].split("?")[0]
        if not clean_target:
            continue
        if "<" in clean_target or "[" in clean_target:
            continue  # Documentation placeholder

        total_links_checked += 1
        resolved = (dir_path / clean_target).resolve()
        if not file_exists_case_sensitive(resolved):
            errors.append(
                f'[LINK ERROR] Broken link in "{norm}": "{target}" does not exist on disk with exact case.'
            )


def main():
    print("--- Starting Operating Knowledge Base Documentation Validation ---")

    check_readme_casing(".")

    files = get_all_md_files(".")
    global total_files_checked
    total_files_checked = len(files)

    for f in files:
        with open(f, "r", encoding="utf-8") as fh:
            content = fh.read()
        validate_frontmatter(f, content)
        validate_links(f, content)

    print("\nValidation Statistics:")
    print(f"- Total Markdown files inspected: {total_files_checked}")
    print(f"- Total Frontmatter blocks verified: {total_frontmatter_checked}")
    print(f"- Total Relative links checked: {total_links_checked}")

    if errors:
        print(f"\nValidation FAILED with {len(errors)} error(s):\n", file=sys.stderr)
        for err in errors:
            print(f"  ✖ {err}", file=sys.stderr)
        sys.exit(1)
    else:
        print("\n✔ 100% Documentation Validation Passed!")
        print("✔ 0 broken relative links (case-sensitive verified).")
        print("✔ 0 README casing errors.")
        print("✔ 100% YAML frontmatter compliance.")
        sys.exit(0)


if __name__ == "__main__":
    main()
