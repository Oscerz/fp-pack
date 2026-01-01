import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);

// Create dist/skills directory
mkdirSync(`${projectRoot}/dist/skills`, { recursive: true });

const packageJson = JSON.parse(
  readFileSync(`${projectRoot}/package.json`, 'utf8')
);
const version = packageJson.version ?? '0.0.0';
const source = readFileSync(`${projectRoot}/fp-kit.md`, 'utf8');
const withVersion = source.replace('{{version}}', version);

// Copy fp-kit.md to dist/skills/ with version injected
writeFileSync(`${projectRoot}/dist/skills/fp-kit.md`, withVersion);

console.log('✓ Copied fp-kit.md to dist/skills/');
