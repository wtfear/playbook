#!/usr/bin/env node

/**
 * Knowledge Base Automated Documentation Validation Script
 * 
 * Verifies:
 * 1. Case-sensitive relative Markdown links and frontmatter related_documents resolve to existing files.
 * 2. Every directory index file is strictly named uppercase 'README.md' (no 'readme.md').
 * 3. All category, research, decision, and template documents contain valid YAML frontmatter with valid status.
 */

const fs = require('fs');
const path = require('path');

const VALID_STATUSES = new Set(['proposed', 'draft', 'in-review', 'approved', 'superseded']);

let errors = [];
let totalFilesChecked = 0;
let totalLinksChecked = 0;
let totalFrontmatterChecked = 0;

/**
 * Verifies if a file exists on disk with exact case match across all path segments.
 * Works reliably on both case-insensitive (Windows/macOS) and case-sensitive (Linux) filesystems.
 */
function fileExistsCaseSensitive(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const root = path.parse(absolutePath).root;
    let current = root;
    const segments = absolutePath.slice(root.length).split(path.sep).filter(Boolean);

    for (const segment of segments) {
      if (!fs.existsSync(current)) return false;
      const entries = fs.readdirSync(current);
      if (!entries.includes(segment)) {
        return false;
      }
      current = path.join(current, segment);
    }
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Recursively find all markdown files, ignoring .git, node_modules, and .venv.
 */
function getAllMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== '.git' && item.name !== 'node_modules' && item.name !== '.venv') {
        results.push(...getAllMdFiles(full));
      }
    } else if (item.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Check for lowercase readme.md or any casing variants across the repo.
 */
function checkReadmeCasing(dir) {
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    if (item.isDirectory()) {
      if (item.name !== '.git' && item.name !== 'node_modules' && item.name !== '.venv') {
        checkReadmeCasing(path.join(dir, item.name));
      }
    } else if (item.name.toLowerCase() === 'readme.md' && item.name !== 'README.md') {
      errors.push(`[CASING ERROR] Index file in "${dir}" is named "${item.name}". Expected exact uppercase "README.md".`);
    }
  }
}

/**
 * Validate YAML frontmatter in category, research, decision, and template files.
 */
function validateFrontmatter(filePath, content) {
  const normalized = filePath.replace(/\\/g, '/');
  const needsFrontmatter = (
    normalized.startsWith('categories/') ||
    normalized.startsWith('research/') ||
    normalized.startsWith('decisions/') ||
    normalized.startsWith('templates/')
  );

  if (!needsFrontmatter) return;

  totalFrontmatterChecked++;

  if (!content.startsWith('---')) {
    errors.push(`[FRONTMATTER ERROR] Missing YAML frontmatter in "${normalized}". Must start with "---" at line 1.`);
    return;
  }

  const endFm = content.indexOf('\n---', 3);
  if (endFm === -1) {
    errors.push(`[FRONTMATTER ERROR] Unclosed YAML frontmatter in "${normalized}". Missing closing "---".`);
    return;
  }

  const fm = content.slice(3, endFm);
  
  // Title
  const titleMatch = fm.match(/^title:\s*(.+)$/m);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`[FRONTMATTER ERROR] Missing or empty "title" in "${normalized}".`);
  }

  // Document Type
  const typeMatch = fm.match(/^document_type:\s*(.+)$/m);
  if (!typeMatch || !typeMatch[1].trim()) {
    errors.push(`[FRONTMATTER ERROR] Missing or empty "document_type" in "${normalized}".`);
  }

  // Category
  const catMatch = fm.match(/^category:\s*(.+)$/m);
  if (!catMatch || !catMatch[1].trim()) {
    errors.push(`[FRONTMATTER ERROR] Missing or empty "category" in "${normalized}".`);
  }

  // Status
  const statusMatch = fm.match(/^status:\s*([^\s#]+)/m);
  if (!statusMatch || !VALID_STATUSES.has(statusMatch[1].trim())) {
    errors.push(`[FRONTMATTER ERROR] Invalid or missing "status" in "${normalized}". Expected one of: ${Array.from(VALID_STATUSES).join(', ')}. Found: "${statusMatch ? statusMatch[1] : 'none'}".`);
  }

  // Owner (must be present, not empty string)
  const ownerMatch = fm.match(/^owner:\s*([^\r\n#]*)/m);
  if (!ownerMatch || ownerMatch[1].trim() === '""' || ownerMatch[1].trim() === "''") {
    errors.push(`[FRONTMATTER ERROR] Missing or invalid "owner" in "${normalized}". Must be explicit (e.g., null or owner name).`);
  }

  // Last Reviewed (must be present, not empty string)
  const reviewMatch = fm.match(/^last_reviewed:\s*([^\r\n#]*)/m);
  if (!reviewMatch || reviewMatch[1].trim() === '""' || reviewMatch[1].trim() === "''") {
    errors.push(`[FRONTMATTER ERROR] Missing or invalid "last_reviewed" in "${normalized}". Must be explicit (e.g., null or YYYY-MM-DD).`);
  }
}

/**
 * Validate all relative markdown links in a file.
 */
function validateLinks(filePath, content) {
  const dir = path.dirname(filePath);
  const normalized = filePath.replace(/\\/g, '/');

  // Check frontmatter related_documents
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    const fm = fmMatch[1];
    const relDocsMatch = fm.match(/related_documents:\r?\n((?:\s+-\s+.*?\r?\n)+)/);
    if (relDocsMatch) {
      const lines = relDocsMatch[1].split('\n');
      for (const line of lines) {
        const itemMatch = line.match(/^\s+-\s+"?(.*?)"?\s*$/);
        if (itemMatch && itemMatch[1] && !itemMatch[1].startsWith('http') && !itemMatch[1].includes('[')) {
          totalLinksChecked++;
          const target = itemMatch[1].split('#')[0];
          const resolved = path.resolve(dir, target);
          if (!fileExistsCaseSensitive(resolved)) {
            errors.push(`[LINK ERROR] Broken related_document in "${normalized}": "${itemMatch[1]}" does not exist on disk with exact case.`);
          }
        }
      }
    }
  }

  // Check body markdown links [label](target)
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const target = match[2].trim();
    if (
      target.startsWith('http://') ||
      target.startsWith('https://') ||
      target.startsWith('mailto:') ||
      target.startsWith('#')
    ) {
      continue;
    }

    const cleanTarget = target.split('#')[0].split('?')[0];
    if (!cleanTarget) continue;
    if (cleanTarget.includes('<') || cleanTarget.includes('[')) continue; // Documentation placeholders

    totalLinksChecked++;
    const resolved = path.resolve(dir, cleanTarget);
    if (!fileExistsCaseSensitive(resolved)) {
      errors.push(`[LINK ERROR] Broken link in "${normalized}": "${target}" does not exist on disk with exact case.`);
    }
  }
}

function main() {
  console.log('--- Starting Operating Knowledge Base Documentation Validation ---');

  // 1. Check casing of README.md files
  checkReadmeCasing('.');

  // 2. Scan and validate all markdown files
  const files = getAllMdFiles('.');
  totalFilesChecked = files.length;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    validateFrontmatter(file, content);
    validateLinks(file, content);
  }

  console.log(`\nValidation Statistics:`);
  console.log(`- Total Markdown files inspected: ${totalFilesChecked}`);
  console.log(`- Total Frontmatter blocks verified: ${totalFrontmatterChecked}`);
  console.log(`- Total Relative links checked: ${totalLinksChecked}`);

  if (errors.length > 0) {
    console.error(`\nValidation FAILED with ${errors.length} error(s):\n`);
    errors.forEach(err => console.error(`  ✖ ${err}`));
    process.exit(1);
  } else {
    console.log(`\n✔ 100% Documentation Validation Passed!`);
    console.log(`✔ 0 broken relative links (case-sensitive verified).`);
    console.log(`✔ 0 README casing errors.`);
    console.log(`✔ 100% YAML frontmatter compliance.`);
    process.exit(0);
  }
}

main();
