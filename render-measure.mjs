import fs from 'node:fs';
import katex from 'katex';

const sections = JSON.parse(fs.readFileSync('content/measure-source.json', 'utf8'));
const english = JSON.parse(fs.readFileSync('content/measure-english-source.json', 'utf8'));
const englishById = new Map(english.map(section => [section.id, section]));
if (english.length !== sections.length || englishById.size !== sections.length) throw new Error('English section coverage mismatch');
const ids = new Set();
const blockTypes = new Set(['text', 'statement', 'math', 'heading', 'note', 'supplement']);
let formulas = 0;
let englishFormulas = 0;
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
  const script = englishById.get(section.id);
  if (!script?.title || !script.blocks?.length) throw new Error(`Missing English lecture: ${section.id}`);
  const covered = new Set();
  section.englishTitle = script.title;
  section.englishBlocks = script.blocks.map(block => {
    if (!blockTypes.has(block.type) && block.type !== 'cue') throw new Error(`Invalid English block: ${section.id}`);
    if (block.sourceBlock !== undefined) {
      const original = section.blocks[block.sourceBlock];
      if (!original || original.type !== block.type || covered.has(block.sourceBlock)) throw new Error(`Invalid English source reference: ${section.id}`);
      covered.add(block.sourceBlock);
    }
    if (block.type === 'math') {
      const text = block.text || section.blocks[block.sourceBlock]?.text;
      if (!text) throw new Error(`Missing English formula: ${section.id}`);
      englishFormulas++;
      return { ...block, text, html: katex.renderToString(text, { displayMode: true, throwOnError: true, strict: 'error', trust: false, output: 'htmlAndMathml' }) };
    }
    if (!block.text?.trim()) throw new Error(`Empty English paragraph: ${section.id}`);
    return block;
  });
  if (covered.size !== section.blocks.length) throw new Error(`Incomplete English coverage: ${section.id}`);
}
fs.writeFileSync('app/measure.json', JSON.stringify(sections));
console.log(`Validated ${formulas} Chinese and ${englishFormulas} English formulas in ${sections.length} measure theory sections.`);
