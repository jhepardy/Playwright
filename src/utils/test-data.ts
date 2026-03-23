import fs from 'fs';
import path from 'path';

/**
 * JSON-driven data: version in git, easy diff in PRs, no code change for new rows.
 * For secrets use env vars or your secret manager — never commit prod credentials.
 */
export function loadJson<T>(relativePath: string): T {
  const full = path.join(process.cwd(), 'test-data', relativePath);
  const raw = fs.readFileSync(full, 'utf-8');
  return JSON.parse(raw) as T;
}
