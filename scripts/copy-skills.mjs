import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);

const skillsRoot = `${projectRoot}/dist/skills`;
const codexSkillDir = `${skillsRoot}/fp-pack`;

// Create dist/skills directories
mkdirSync(skillsRoot, { recursive: true });
mkdirSync(codexSkillDir, { recursive: true });

const packageJson = JSON.parse(
  readFileSync(`${projectRoot}/package.json`, 'utf8')
);
const version = packageJson.version ?? '0.0.0';
const source = readFileSync(`${projectRoot}/fp-pack.md`, 'utf8');
const withVersion = source.replace('{{version}}', version);

// Copy fp-pack.md to dist/skills/ with version injected
writeFileSync(`${skillsRoot}/fp-pack.md`, withVersion);

const codexFrontmatter = `---\nname: fp-pack\ndescription: Use when working in projects that use fp-pack; follow pipe, SideEffect, and curry guidelines.\nmetadata:\n  short-description: fp-pack workflow\n---\n\n`;
const codexSkillContent = `${codexFrontmatter}${withVersion}`;

// Copy fp-pack.md to dist/skills/fp-pack/SKILL.md for Codex with YAML frontmatter
writeFileSync(`${codexSkillDir}/SKILL.md`, codexSkillContent);

console.log('✓ Copied fp-pack.md to dist/skills/');
console.log('✓ Copied SKILL.md to dist/skills/fp-pack/');
