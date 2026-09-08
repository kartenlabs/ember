import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const kit=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(await readFile(join(kit,'asset-manifest.json'),'utf8'));
for(const asset of manifest.assets) {
  const meta=await sharp(join(kit,asset.file)).metadata();
  assert.equal(meta.width,asset.width,asset.file);
  assert.equal(meta.height,asset.height,asset.file);
  assert.ok(asset.alt.length>0,`Missing alt text: ${asset.file}`);
  if(asset.file.includes('/ember-wordmark-') || asset.file.includes('/ember-monogram-')) {
    assert.equal(meta.hasAlpha,true,asset.file);
    const statistics=await sharp(join(kit,asset.file)).stats();
    assert.equal(statistics.channels.at(-1).min,0,asset.file);
  }
  if(asset.file.includes('company-cover')) assert.ok(asset.bytes<3*1024*1024,asset.file);
}
const names=await readdir(kit,{recursive:true});
for(const name of names.filter(n=>n.endsWith('.html'))) {
  const text=await readFile(join(kit,name),'utf8');
  for(const match of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target=match[1];
    if(/^(https?:|data:|#)/.test(target)) continue;
    await stat(resolve(dirname(join(kit,name)),target));
  }
}
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||'/usr/bin/google-chrome'});
try {
  const page=await browser.newPage();
  for(const asset of manifest.assets.filter(a=>a.source?.endsWith('.html'))) {
    await page.setViewportSize({width:asset.width,height:asset.height});
    await page.goto(pathToFileURL(join(kit,asset.source)).href);
    await page.evaluate(()=>document.fonts.ready);
    const overflow=await page.evaluate(()=>{
      const board=document.querySelector('.board');
      if(!board) return [];
      const bounds=board.getBoundingClientRect();
      return [...board.querySelectorAll('h1,h2,p,.footer,.digits,.eyebrow')].filter(el=>{
        const box=el.getBoundingClientRect();
        return box.right>bounds.right+1 || box.bottom>bounds.bottom+1 || box.left<bounds.left-1;
      }).map(el=>el.textContent);
    });
    assert.deepEqual(overflow,[],asset.file);
  }
  for(const width of [390,1280]) for(const path of ['index.html','05-case-study/case-study.html']) {
    await page.setViewportSize({width,height:900});
    await page.goto(pathToFileURL(join(kit,path)).href);
    await page.evaluate(()=>document.fonts.ready);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${path} at ${width}px`);
  }
} finally { await browser.close(); }
console.log(`Verified ${manifest.assets.length} PNGs, transparent logos, cover upload sizes, local HTML links, artboard text bounds, and responsive gallery/case study.`);
