#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const forbidden = [
  'why/what/outcome',
  'why what outcome',
  'why/what/outcome',
  'todo list',
  'execution-wrapper',
  'execution-wrapper Mandate',
  'why, what, outcome'
].map(s => s.toLowerCase());

function walk(dir) {
  const res = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      res.push(...walk(full));
    } else {
      res.push(full);
    }
  }
  return res;
}

function checkFile(file) {
  try {
    const lower = fs.readFileSync(file, 'utf8').toLowerCase();
    const matches = [];
    for (const phrase of forbidden) {
      if (lower.includes(phrase)) matches.push(phrase);
    }
    return matches;
  } catch (err) {
    console.error(`Failed to read ${file}: ${err && err.message ? err.message : String(err)}`);
    return [];
  }
}

const files = walk(repoRoot).filter(f => f.endsWith('.md') || f.endsWith('.rst') || f.endsWith('.txt'));
const violations = [];
for (const f of files) {
  const matches = checkFile(f);
  if (matches.length) violations.push({ file: path.relative(repoRoot, f), matches });
}

if (violations.length) {
  console.error('Doctrine hygiene check failed. Found forbidden phrases in files:');
  for (const v of violations) {
    console.error(` - ${v.file}: ${[...new Set(v.matches)].join(', ')}`);
  }
  process.exit(2);
}

console.log('Doctrine hygiene check passed.');
process.exit(0);
