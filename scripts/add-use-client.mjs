import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'graphql/generated/graphql.ts';
const DIRECTIVE = "'use client'\n\n";

const content = readFileSync(FILE, 'utf8');

if (!content.startsWith("'use client'")) {
  writeFileSync(FILE, DIRECTIVE + content);
  console.log(`[add-use-client] Prepended 'use client' to ${FILE}`);
}
