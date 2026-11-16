// Verifies that es.json and fr.json mirror the structure of en.json, and that
// language-independent values (ids, links, numbers, icons…) are identical in all three.
import { readFileSync } from 'node:fs';

const load = (lang) => JSON.parse(readFileSync(new URL(`../src/data/${lang}.json`, import.meta.url), 'utf8'));
const reference = load('en');
const others = ['es', 'fr'];

// Paths whose value must be the same in every language.
const SHARED = [
  /(^|\.)(id|category|track|glyph|icon|statusType|nda|level|href|file|src|url|updated|endpoint|accessKey)$/,
  /^(projects|publications)\..*\.links\.\w+$/,
  /skills\[\d+\]\.years$/,
  /^ip\.items\[\d+\]\.code$/,
  /^site\.email$/,
];
const isShared = (path) => SHARED.some((pattern) => pattern.test(path));

const typeOf = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);
const errors = [];

function compare(a, b, path, lang) {
  const ta = typeOf(a);
  const tb = typeOf(b);
  if (ta !== tb) return errors.push(`[${lang}] ${path}: expected ${ta}, found ${tb === 'undefined' ? 'nothing (missing)' : tb}`);
  if (ta === 'array') {
    if (a.length !== b.length) errors.push(`[${lang}] ${path}: en has ${a.length} items, ${lang} has ${b.length}`);
    for (let i = 0; i < Math.min(a.length, b.length); i++) compare(a[i], b[i], `${path}[${i}]`, lang);
  } else if (ta === 'object') {
    for (const k of Object.keys(a)) compare(a[k], b[k], path ? `${path}.${k}` : k, lang);
    for (const k of Object.keys(b)) if (!(k in a)) errors.push(`[${lang}] ${path}.${k}: extra key not present in en.json`);
  } else if (a !== b && isShared(path)) {
    errors.push(`[${lang}] ${path}: "${b}" differs from en.json "${a}" (must be identical in all languages)`);
  }
}

for (const lang of others) compare(reference, load(lang), '', lang);

if (errors.length) {
  console.error(`i18n check failed — ${errors.length} problem(s):\n` + errors.map((e) => `  • ${e}`).join('\n'));
  process.exit(1);
}
console.log('i18n check passed: en, es and fr are in sync.');
