import { copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);

// Create dist/skills directory
mkdirSync(`${projectRoot}/dist/skills`, { recursive: true });

// Copy fp-kit.md to dist/skills/
copyFileSync(
  `${projectRoot}/fp-kit.md`,
  `${projectRoot}/dist/skills/fp-kit.md`
);

console.log('✓ Copied fp-kit.md to dist/skills/');
