import fs from 'node:fs';
import path from 'node:path';

// This single-page reader uses local state for navigation. Build at the root,
// then qualify absolute static asset URLs for a GitHub project Pages URL.
const base=(process.env.PAGES_BASE_PATH||'').replace(/\/$/,'');
if(base && !/^\/[a-zA-Z0-9_.-]+$/.test(base))throw new Error('Invalid Pages base path');
const root='dist/client';
if(!fs.existsSync(path.join(root,'index.html')))throw new Error('Missing prerendered index.html');
function rewrite(dir){
 for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,ent.name);
  if(ent.isDirectory())rewrite(file);
  else if(/\.(html|js|json|rsc|css)$/.test(ent.name)){
   const source=fs.readFileSync(file,'utf8');
   const result=source.replaceAll('/_next/',`${base}/_next/`).replaceAll('/favicon.svg',`${base}/favicon.svg`);
   fs.writeFileSync(file,result);
  }
 }
}
rewrite(root);
fs.writeFileSync(path.join(root,'.nojekyll'),'');
console.log(`GitHub Pages output ready at ${base||'/'}`);
