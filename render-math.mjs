import fs from 'node:fs';
import katex from 'katex';
const lecture=JSON.parse(fs.readFileSync('content/lecture-source.json','utf8'));
let count=0;
for(const section of lecture)for(const block of section.blocks){
 if(block.type==='math'){
  block.html=katex.renderToString(block.latex,{displayMode:true,throwOnError:true,strict:'error',output:'htmlAndMathml',trust:false});count++;
 }
}
fs.writeFileSync('app/lecture.json',JSON.stringify(lecture));
console.log(`Validated and rendered ${count} LaTeX displays across ${lecture.length} sections.`);
