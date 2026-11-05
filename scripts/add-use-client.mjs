import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'graphql/generated/graphql.ts';
const HEADER = "// @ts-nocheck\n'use client';\n/* eslint-disable */\n\n";

let content = readFileSync(FILE, 'utf8');

// Strip any existing directives and comments from top
content = content.replace(/^(\/\/ @ts-nocheck\s*|'use client';?\s*|"use client";?\s*|\/\* eslint-disable \*\/\s*)+/, '');

writeFileSync(FILE, HEADER + content);
console.log(`[add-use-client] Added ts-nocheck & client header to ${FILE}`);
