import fs from 'node:fs';
import katex from 'katex';

const sections = JSON.parse(fs.readFileSync('content/measure-source.json', 'utf8'));
const ids = new Set();
const blockTypes = new Set(['text', 'statement', 'math', 'heading', 'note', 'supplement']);
let formulas = 0;
for (const section of sections) {
  if (ids.has(section.id)) throw new Error(`Duplicate measure section: ${section.id}`);
  ids.add(section.id);
  if (![1, 2, 3, 4].includes(section.lecture) || !section.blocks.length) throw new Error(`Invalid section: ${section.id}`);
  if (!/^\d{2}:\d{2}:\d{2}$/.test(section.source.start) || section.source.start >= section.source.end) throw new Error(`Invalid source range: ${section.id}`);
  for (const block of section.blocks) {
    if (!blockTypes.has(block.type) || !block.text) throw new Error(`Invalid block: ${section.id}`);
    if (block.type === 'math') {
      block.html = katex.renderToString(block.text, { displayMode: true, throwOnError: true, strict: 'error', trust: false, output: 'htmlAndMathml' });
      formulas++;
    }
  }
}
fs.writeFileSync('app/measure.json', JSON.stringify(sections));
console.log(`Validated ${formulas} formulas in ${sections.length} measure theory sections.`);
