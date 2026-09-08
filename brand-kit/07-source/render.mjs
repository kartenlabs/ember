import { readFile, writeFile, mkdir, readdir, copyFile, stat } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';
import sharp from 'sharp';

const source = dirname(fileURLToPath(import.meta.url));
const kit = resolve(source, '..');
const repo = resolve(kit, '..');
const baseURL = process.env.EMBER_CAPTURE_URL || 'http://127.0.0.1:3110';
const C = { ink:'#100E0C', card:'#17130F', cream:'#F3ECE0', muted:'#CFC3B0', border:'#332B22', amber:'#E8A64C', sage:'#86A87F', clay:'#C97558', paper:'#F6F1E7' };
const manifest = [];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const put = async (path, data) => { await mkdir(dirname(join(kit,path)),{recursive:true}); await writeFile(join(kit,path),data); };
const dataURL = async path => `data:image/png;base64,${(await readFile(join(kit,path))).toString('base64')}`;

// Copy only the Latin subsets actually used by the app, together with OFLs.
await mkdir(join(source,'fonts'),{recursive:true});
const cssFiles = (await readdir(join(repo,'.next/static/chunks'))).filter(f=>f.endsWith('.css'));
const appCSS = (await Promise.all(cssFiles.map(f=>readFile(join(repo,'.next/static/chunks',f),'utf8')))).join('\n');
for (const [name, family, weight, directory] of [
  ['pixel-bold','Silkscreen','700','silkscreen'], ['pixel-regular','Silkscreen','400','silkscreen'],
  ['mono','IBM Plex Mono','400','ibmplexmono'], ['sans','Instrument Sans','400','instrumentsans'],
]) {
  const block = [...appCSS.matchAll(/@font-face\{[^}]+\}/g)].map(m=>m[0]).find(b=>b.includes(`font-family:${family};`) && b.includes(`font-weight:${weight};`) && b.includes('unicode-range:U+??'));
  if (!block) throw new Error(`Missing font: ${family} ${weight}; run npm run build.`);
  const media = block.match(/url\(\.\.\/media\/([^)]*)\)/)[1];
  await copyFile(join(repo,'.next/static/media',media),join(source,'fonts',`${name}.woff2`));
  const licensePath = `08-licenses/${directory}-OFL.txt`;
  try { await stat(join(kit,licensePath)); } catch {
    const url = `https://raw.githubusercontent.com/google/fonts/main/ofl/${directory}/OFL.txt`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Cannot retrieve font license: ${url}`);
    await put(licensePath,await response.text());
  }
}
await put('08-licenses/Pixelarticons-MIT.txt',await readFile(join(repo,'public/icons/LICENSE.txt')));
const outlines = JSON.parse(execFileSync('python3',[join(source,'outline-wordmark.py'),join(source,'fonts/pixel-bold.woff2')],{encoding:'utf8'}));
const word = (color=C.cream) => `<svg viewBox="0 0 ${outlines.ember.width} ${outlines.ember.height}" fill="${color}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ember">${outlines.ember.paths}</svg>`;
const letter = (color=C.ink) => `<svg viewBox="0 0 ${outlines.e.width} ${outlines.e.height}" fill="${color}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ember e monogram">${outlines.e.paths}</svg>`;
const fonts = (await Promise.all(['pixel-bold','pixel-regular','mono','sans'].map(async(name)=>`@font-face{font-family:${name};src:url(data:font/woff2;base64,${(await readFile(join(source,'fonts',name+'.woff2'))).toString('base64')})}`))).join('');
const styles = `${fonts}
*{box-sizing:border-box}html,body{margin:0}body{font-family:sans,Arial;color:${C.cream};background:${C.ink}}a{color:inherit}.board{position:relative;overflow:hidden;background:${C.ink};padding:64px;display:flex;flex-direction:column}.light{background:${C.paper};color:${C.ink}}.pixel{font-family:pixel-regular}.mono{font-family:mono}.eyebrow{font:20px pixel-regular;letter-spacing:.16em;line-height:1.5;text-transform:uppercase;color:${C.amber}}.light .eyebrow{color:#B26F1F}.brand{width:210px;display:block}.top{display:flex;align-items:center;justify-content:space-between;gap:32px}.by{font:18px mono;color:${C.muted}}.light .by{color:#5A5044}h1,h2,p{margin:0}h1{font-size:88px;font-weight:400;line-height:1.02;letter-spacing:-.035em}h2{font-size:60px;font-weight:400;line-height:1.05;letter-spacing:-.03em}.copy{font-size:30px;line-height:1.4;color:${C.muted};max-width:850px}.light .copy{color:#5A5044}.footer{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:24px;font:18px mono;border-top:1px solid ${C.border};padding-top:24px}.light .footer{border-color:#CFC3B0}.timer{border:2px solid ${C.border};background:${C.card};padding:40px;box-shadow:10px 10px 0 #0B0908}.timer .digits{font:144px pixel-bold;line-height:1.1;margin:24px 0 32px;white-space:nowrap}.timer .bar{display:flex;gap:6px;margin-top:36px}.timer .bar i{height:12px;flex:1;background:${C.border}}.timer .bar i.on{background:var(--accent,${C.amber})}.timer .eyebrow{color:var(--accent,${C.amber})}.timer .cta{background:var(--accent,${C.amber});color:${C.ink};display:inline-block;font:20px pixel-regular;padding:18px 36px}.timer .sub{font:18px mono;color:${C.muted}}.number{font:96px pixel-bold;color:var(--accent,${C.amber})}.rules{display:grid;gap:28px}.rule{border-top:1px solid ${C.border};padding-top:24px;display:grid;grid-template-columns:70px 1fr;gap:20px}.rule p{font-size:28px;line-height:1.4}.rule b{font-weight:400;color:${C.amber};font-family:mono}.screenshot{width:100%;border:1px solid ${C.border};display:block}.sample{font:14px mono;color:${C.muted}}.swatches{display:flex;gap:12px}.swatch{flex:1;height:200px;display:flex;align-items:flex-end;padding:22px;color:${C.ink};font:20px mono}.big-e{width:260px}.note{font:18px mono;line-height:1.5;color:${C.muted}}.light .note{color:#5A5044}
@page{margin:0} @media print{.board{break-after:page;page-break-after:always;-webkit-print-color-adjust:exact;print-color-adjust:exact}.board:last-child{break-after:auto}}
`;
const top = (light=false) => `<div class="top"><div class="brand">${word(light?C.ink:C.cream)}</div><span class="by">by kartenlabs</span></div>`;
const footer = (page='@kartenlabs') => `<div class="footer"><span>ember.kartenlabs.com</span><span>${page}</span></div>`;
const timer = (mode='FOCUS',time='25:00',accent=C.amber) => `<div class="timer" style="--accent:${accent}"><div class="eyebrow">${mode}</div><div class="digits">${time}</div><div class="cta">START</div><div class="bar">${Array.from({length:24},(_,i)=>`<i class="${i<10?'on':''}"></i>`).join('')}</div></div>`;
const html = body => `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ember · kartenlabs</title><style>${styles}</style></head><body>${body}</body></html>`;
const browser = await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/usr/bin/google-chrome'});
const page = await browser.newPage({deviceScaleFactor:1});
async function art(path,width,height,content,alt,{light=false,raw=false}={}) {
  const body = raw?content:`<main class="board ${light?'light':''}" style="width:${width}px;height:${height}px">${content}</main>`;
  const sourcePath = `07-source/artboards/${path.replaceAll('/','--').replace('.png','.html')}`;
  await put(sourcePath,html(body));
  await page.setViewportSize({width,height});
  await page.setContent(html(body));
  await page.evaluate(()=>document.fonts.ready);
  const overflow=await page.evaluate(()=>{
    const board=document.querySelector('.board');
    if(!board) return [];
    const bounds=board.getBoundingClientRect();
    return [...board.querySelectorAll('h1,h2,p,.footer,.digits,.eyebrow')].filter(el=>{
      const box=el.getBoundingClientRect();
      return box.right>bounds.right+1 || box.bottom>bounds.bottom+1 || box.left<bounds.left-1;
    }).map(el=>el.textContent.slice(0,80));
  });
  if(overflow.length) console.warn(`Layout overflow ${path}: ${overflow.join(' | ')}`);
  await page.screenshot({path:join(kit,path),omitBackground:raw});
  manifest.push({file:path,width,height,alt,source:sourcePath});
}

try {
  for(const folder of ['01-identity/svg','01-identity/png','02-social/instagram/carousel','02-social/linkedin','03-web-seo/images','03-web-seo/favicons','04-product-screenshots','05-case-study','07-source/artboards']) await mkdir(join(kit,folder),{recursive:true});
  for(const [variant,color] of [['cream',C.cream],['ink',C.ink],['amber',C.amber]]) {
    const width=1600,height=Math.round(1600*outlines.ember.height/outlines.ember.width);
    const svg=word(color).replace('<svg ','<svg width="1600" height="'+height+'" ');
    await put(`01-identity/svg/ember-wordmark-${variant}.svg`,svg);
    await sharp(Buffer.from(svg)).png().toFile(join(kit,`01-identity/png/ember-wordmark-${variant}-1600.png`));
    manifest.push({file:`01-identity/png/ember-wordmark-${variant}-1600.png`,width,height,alt:`Ember pixel wordmark in ${variant}, transparent background.`,source:`01-identity/svg/ember-wordmark-${variant}.svg`});
    const e=letter(color).replace('<svg ','<svg width="512" height="512" ');
    await put(`01-identity/svg/ember-monogram-${variant}.svg`,e);
    await sharp(Buffer.from(e)).png().toFile(join(kit,`01-identity/png/ember-monogram-${variant}-512.png`));
    manifest.push({file:`01-identity/png/ember-monogram-${variant}-512.png`,width:512,height:512,alt:`Ember e monogram in ${variant}, transparent background.`,source:`01-identity/svg/ember-monogram-${variant}.svg`});
  }
  for(const [variant,bg,fg] of [['amber',C.amber,C.ink],['night',C.ink,C.cream],['daylight',C.paper,C.ink]]) {
    const avatar=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="${bg}"/><svg x="288" y="288" width="448" height="448" viewBox="0 0 ${outlines.e.width} ${outlines.e.height}" fill="${fg}">${outlines.e.paths}</svg></svg>`;
    await put(`01-identity/svg/ember-avatar-${variant}.svg`,avatar);
    await sharp(Buffer.from(avatar)).png().toFile(join(kit,`01-identity/png/ember-avatar-${variant}-1024.png`));
    manifest.push({file:`01-identity/png/ember-avatar-${variant}-1024.png`,width:1024,height:1024,alt:`Ember e profile avatar on a ${variant} background.`,source:`01-identity/svg/ember-avatar-${variant}.svg`});
    if(variant==='amber') for(const size of [32,48,180,192,512]) {
      const path=`03-web-seo/favicons/ember-icon-${size}.png`;
      await sharp(Buffer.from(avatar)).resize(size,size).png().toFile(join(kit,path));
      manifest.push({file:path,width:size,height:size,alt:'Ember e application icon.'});
    }
  }
  // PNG-compressed ICO: one 48px entry, with a standard ICO directory header.
  const iconPng=await readFile(join(kit,'03-web-seo/favicons/ember-icon-48.png'));
  const ico=Buffer.alloc(22);
  ico.writeUInt16LE(1,2);ico.writeUInt16LE(1,4);ico[6]=48;ico[7]=48;
  ico.writeUInt16LE(1,10);ico.writeUInt16LE(32,12);ico.writeUInt32LE(iconPng.length,14);ico.writeUInt32LE(22,18);
  await put('03-web-seo/favicons/favicon.ico',Buffer.concat([ico,iconPng]));
  await copyFile(join(kit,'01-identity/svg/ember-avatar-amber.svg'),join(kit,'03-web-seo/favicons/icon.svg'));
  await art('01-identity/png/ember-lockup-night-1600x500.png',1600,500,`${top()}<div style="margin-top:72px;font-size:56px">A quiet timer.</div>${footer('kartenlabs.com')}`,'Ember. A quiet timer. By kartenlabs.');

  // Real app captures use an isolated context with staged sessions. Third-party
  // media is replaced only inside the capture, never in product source files.
  const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,timezoneId:'Europe/Berlin',reducedMotion:'reduce'});
  await context.route('https://www.youtube-nocookie.com/**',route=>route.fulfill({contentType:'text/html',body:'<html><body style="margin:0;background:#17130F;color:#CFC3B0;display:grid;place-items:center;height:100vh;font:10px monospace">external media omitted</body></html>'}));
  const capture=await context.newPage();
  await capture.clock.install({time:new Date('2026-09-08T12:00:00+02:00')});
  const captureRows=[0,1,2,3,4,5,6].flatMap(day=>Array.from({length:day===0?3:day%3+1},(_,i)=>({id:`sample-${day}-${i}`,startedAt:new Date('2026-09-08T08:00:00+02:00').getTime()-day*86400000+i*2100000,mode:'focus',minutes:25,task:['writing','design review','reading'][i%3]})));
  for(const [name,route,theme,width,height,mode] of [
    ['timer-night-desktop','/','dark',1440,1000,'focus'],['timer-daylight-desktop','/','light',1440,1000,'focus'],
    ['short-break-desktop','/','dark',1440,1000,'short'],['settings-desktop','/settings','dark',1440,1150,'focus'],
    ['log-desktop-sample-data','/log','dark',1440,1000,'focus'],['timer-mobile','/','dark',390,844,'focus'],
    ['settings-mobile','/settings','dark',390,844,'focus'],['log-mobile-sample-data','/log','light',390,844,'focus'],
  ]) {
    await capture.setViewportSize({width,height});
    await capture.goto(baseURL,{waitUntil:'networkidle'});
    await capture.evaluate(({theme,mode,rows})=>{
      localStorage.setItem('ember.settings',JSON.stringify({theme,task:'writing'}));
      localStorage.setItem('ember.sessions',JSON.stringify(rows));
      localStorage.setItem('ember.timer',JSON.stringify({mode,completed:2,endsAt:null,held:0,started:false}));
    },{theme,mode,rows:captureRows});
    await capture.goto(baseURL+route,{waitUntil:'networkidle'});
    await capture.waitForFunction(theme=>document.documentElement.dataset.theme===theme,theme);
    await capture.evaluate(()=>document.fonts.ready);
    await capture.waitForTimeout(150);
    if(route==='/') await capture.getByRole('timer').waitFor();
    const path=`04-product-screenshots/${name}.png`;
    await capture.screenshot({path:join(kit,path),fullPage:true});
    const meta=await sharp(join(kit,path)).metadata();
    manifest.push({file:path,width:meta.width,height:meta.height,alt:`Ember ${name.replaceAll('-',' ')}. Staged session data; external media omitted.`});
    if(['timer-night-desktop','timer-daylight-desktop','settings-desktop'].includes(name)) {
      const panelPath=`04-product-screenshots/${name}-panel.png`;
      await capture.locator('.em-grid-bg').screenshot({path:join(kit,panelPath)});
      const panelMeta=await sharp(join(kit,panelPath)).metadata();
      manifest.push({file:panelPath,width:panelMeta.width,height:panelMeta.height,alt:`Ember ${name.replaceAll('-',' ')} app panel, cropped at the window border. Staged data; external media omitted.`});
    }
  }
  await context.close();
  const shot=await dataURL('04-product-screenshots/timer-night-desktop-panel.png');
  const mobile=await dataURL('04-product-screenshots/timer-mobile.png');
  const settings=await dataURL('04-product-screenshots/settings-desktop-panel.png');
  const lightshot=await dataURL('04-product-screenshots/timer-daylight-desktop-panel.png');

  const launch=`${top()}<div class="eyebrow" style="margin-top:80px">FOCUS, GENTLY</div><h1 style="margin-top:28px">Make room<br>for one thing.</h1><p class="copy" style="margin:32px 0 52px">A quiet pomodoro timer.<br>Optional ambient music for your session.</p>${timer()}${footer()}`;
  await art('02-social/instagram/launch-1080x1350.png',1080,1350,launch,'Ember by kartenlabs. Make room for one thing. A quiet pomodoro timer displaying 25:00.');
  await art('02-social/instagram/square-1080x1080.png',1080,1080,`${top()}<h1 style="margin:80px 0 56px">A quiet timer.</h1>${timer()}${footer()}`,'Ember. A quiet timer. Focus mode at 25:00.');
  await art('02-social/instagram/story-1080x1920.png',1080,1920,`${top()}<div style="height:140px"></div><div class="eyebrow">ONE SESSION</div><h1 style="margin:36px 0">A little time.<br>A little space.</h1><p class="copy" style="margin-bottom:80px">Focus. Take a break.<br>Come back when you are ready.</p>${timer()}<div style="margin-top:100px" class="note">Find Ember at<br><span style="font-size:32px;color:${C.cream}">ember.kartenlabs.com</span></div><div style="height:160px"></div>${footer('by kartenlabs')}`,'Ember story. A little time. A little space. Visit ember.kartenlabs.com.');

  const slides=[
    {title:'Make room for<br>one thing.',tag:'MEET EMBER',body:`<p class="copy">A quiet pomodoro timer by kartenlabs.</p><div style="margin-top:64px">${timer()}</div>`,alt:'Meet Ember: a quiet pomodoro timer by kartenlabs.'},
    {title:'A rhythm that<br>leaves room.',tag:'THREE MODES',body:`<div class="rules">${[['25:00','Focus',C.amber],['05:00','Short break',C.sage],['15:00','Long break',C.clay]].map(([time,label,color])=>`<div style="padding:28px 0;border-top:1px solid ${C.border}"><div class="number" style="--accent:${color}">${time}</div><p class="copy" style="margin-top:16px">${label}</p></div>`).join('')}</div>`,alt:'Three adjustable timer modes: 25-minute focus, 5-minute short break, 15-minute long break. Default lengths shown.'},
    {title:'A soundtrack<br>for your session.',tag:'AMBIENT STATION',body:`<p class="copy">Optional background music alongside<br>your timer, with its own playback controls.</p><div style="background:${C.card};border:1px solid ${C.border};padding:48px;margin-top:64px"><div style="display:flex;align-items:flex-end;gap:12px;height:180px">${[3,5,4,8,6,9,5,7,4,6,3,5].map(n=>`<span style="flex:1;height:${n*20}px;background:${C.amber}"></span>`).join('')}</div><p style="font-size:44px;margin-top:48px">Currently featuring Claude FM</p><p class="copy" style="margin-top:20px">Music for thinking and building.</p><p class="note" style="margin-top:32px">Stream by Claude, embedded via YouTube.<br>Ember is an independent kartenlabs project.</p></div>`,alt:'Optional ambient music alongside the timer. Current station: Claude FM, music for thinking and building, by Claude, embedded via YouTube. Ember is an independent kartenlabs project.'},
    {title:'Set the pace.<br>Choose the sound.',tag:'YOUR SETTINGS',body:`<p class="copy">Adjust each block. Choose a chime.<br>Let the next session start automatically,<br>or take your time.</p><img class="screenshot" style="margin-top:52px;height:500px;object-fit:contain" src="${settings}" alt="Ember settings screen">`,alt:'Adjustable focus and break lengths, five chime options, and optional auto-start. Product screenshot with staged data.'},
    {title:'Night or<br>Daylight.',tag:'TWO THEMES',body:`<p class="copy">The same quiet space, in a different light.</p><img class="screenshot" style="margin-top:56px" src="${lightshot}" alt="Ember Daylight theme">`,alt:'Ember in its light Daylight theme. Product screenshot with staged data.'},
    {title:'Quiet on the surface.<br>Careful underneath.',tag:'BUILT WITH CARE',body:`<div class="rules">${[['01','A deadline-based clock','The countdown follows elapsed time when you return to a backgrounded tab.'],['02','A session that stays yours','Started blocks retain their original duration and label when settings change.'],['03','A log that stays local','Settings and session history are stored in this browser.']].map(([n,title,copy])=>`<div class="rule"><b>${n}</b><div><p style="font-size:34px;margin-bottom:16px">${title}</p><p class="copy">${copy}</p></div></div>`).join('')}</div>`,alt:'Ember uses a deadline-based clock, preserves active session details, and stores settings and logs in the browser.'},
    {title:'Start with<br>one session.',tag:'A QUIET TIMER',body:`<div style="margin:76px 0;width:100%">${word(C.amber)}</div><p class="copy" style="font-size:38px">ember.kartenlabs.com</p><p class="note" style="margin-top:48px">A project by kartenlabs<br>kartenlabs.com</p>`,alt:'Start with one session. Ember at ember.kartenlabs.com. A project by kartenlabs.'},
  ];
  const carouselBoards=[];
  for(const [i,s] of slides.entries()) {
    const content=`${top()}<div class="eyebrow" style="margin-top:80px">${s.tag}</div><h1 style="font-size:76px;margin:28px 0 48px">${s.title}</h1>${s.body}${footer(`${i+1} of ${slides.length}`)}`;
    await art(`02-social/instagram/carousel/${String(i+1).padStart(2,'0')}-1080x1350.png`,1080,1350,content,s.alt);
    carouselBoards.push(`<section class="board" style="width:1080px;height:1350px">${content}</section>`);
  }
  const music=slides[2];
  await art('02-social/instagram/ambient-station-1080x1350.png',1080,1350,`${top()}<div class="eyebrow" style="margin-top:80px">${music.tag}</div><h1 style="font-size:76px;margin:28px 0 48px">${music.title}</h1>${music.body}${footer()}`,music.alt);
  await put('02-social/linkedin/ember-document-carousel.html',html(carouselBoards.join('')));
  await page.setContent(html(carouselBoards.join('')));await page.evaluate(()=>document.fonts.ready);
  await page.pdf({path:join(kit,'02-social/linkedin/ember-document-carousel.pdf'),width:'1080px',height:'1350px',printBackground:true,tagged:true});

  const landscape=`${top()}<div style="display:grid;grid-template-columns:1.12fr 1fr;gap:48px;align-items:center;flex:1"><div><div class="eyebrow">A QUIET TIMER</div><h1 style="font-size:66px;margin-top:28px">Make room<br>for one thing.</h1></div><div>${timer()}</div></div>${footer('by kartenlabs')}`;
  // Compact clock for horizontal compositions.
  const wide=landscape.replace('class="digits"','class="digits" style="font-size:76px"').replace('padding:40px','padding:24px');
  await art('02-social/linkedin/launch-1200x627.png',1200,627,wide,'Ember by kartenlabs. Make room for one thing. ember.kartenlabs.com.');
  await art('03-web-seo/images/ember-og-1200x630.png',1200,630,wide,'Ember — a quiet pomodoro timer by kartenlabs.');
  await sharp(join(kit,'03-web-seo/images/ember-og-1200x630.png')).webp({quality:90}).toFile(join(kit,'03-web-seo/images/ember-og-1200x630.webp'));
  await art('02-social/linkedin/company-cover-4200x700.png',4200,700,`<div style="display:flex;align-items:center;justify-content:center;gap:180px;height:100%"><div style="width:740px">${word()}</div><div style="height:240px;border-left:2px solid ${C.border}"></div><div><h1 style="font-size:108px">A quiet timer.</h1><div class="mono" style="font-size:40px;margin-top:48px;color:${C.muted}">ember.kartenlabs.com · by kartenlabs</div></div></div>`,'Ember campaign cover for kartenlabs company channels. A quiet timer. ember.kartenlabs.com.');
  await art('02-social/linkedin/company-cover-1512x256.png',1512,256,`<div style="display:flex;align-items:center;justify-content:center;gap:72px;height:100%"><div style="width:260px">${word()}</div><div><h2 style="font-size:42px">A quiet timer.</h2><p class="mono" style="font-size:18px;margin-top:16px;color:${C.muted}">ember.kartenlabs.com · by kartenlabs</p></div></div>`,'Compact Ember campaign cover for kartenlabs company channels.');

  await art('05-case-study/cover-1600x900.png',1600,900,`${top()}<div style="display:grid;grid-template-columns:1fr 1.1fr;gap:64px;align-items:center;flex:1"><div><div class="eyebrow">PRODUCT CASE STUDY</div><h1 style="margin:32px 0">Designing<br>a quieter<br>timer.</h1><p class="copy">Ember · by kartenlabs</p></div><img src="${shot}" class="screenshot" alt="Ember timer interface"></div>${footer('kartenlabs.com')}`,'Ember case study cover: Designing a quieter timer, by kartenlabs.');
  await art('05-case-study/product-showcase-1600x1200.png',1600,1200,`${top()}<h1 style="font-size:72px;margin:48px 0">One rhythm.<br>Room to breathe.</h1><div style="display:grid;grid-template-columns:1fr 260px;gap:48px;align-items:start;margin-top:24px"><img class="screenshot" style="height:640px;object-fit:contain" src="${shot}" alt="Desktop timer"><img class="screenshot" style="max-height:640px;object-fit:contain" src="${mobile}" alt="Mobile timer"></div>${footer('responsive web app')}`,'Ember desktop and mobile timer interfaces. Staged product captures.');
  await art('01-identity/brand-board-1600x1200.png',1600,1200,`${top()}<h1 style="margin:72px 0 56px">Warmth. Space. Rhythm.</h1><div class="swatches">${[['Ink',C.ink,C.cream],['Cream',C.cream,C.ink],['Focus',C.amber,C.ink],['Short break',C.sage,C.ink],['Long break',C.clay,C.ink]].map(([name,color,fg])=>`<div class="swatch" style="background:${color};color:${fg};border:1px solid ${C.border}">${name}<br>${color}</div>`).join('')}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;margin-top:72px"><div><div class="eyebrow">PIXEL</div><div class="pixel" style="font-size:64px;margin:28px 0">25:00</div><p class="copy">Silkscreen<br>Marks, time, small labels.</p></div><div><div class="eyebrow">WORDS + NUMBERS</div><p style="font-size:48px;margin:28px 0">A quiet timer.</p><p class="mono" style="font-size:28px">1 of 4 · focus · 25 min</p><p class="copy" style="margin-top:24px">Instrument Sans + IBM Plex Mono</p></div></div>${footer('identity reference')}`,'Ember brand board with warm ink, cream, amber, sage and clay, and its three typefaces.');

  const deckSlides=[
    ['A quieter timer.','PRODUCT CASE STUDY',`<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:70px;align-items:center"><div><p class="copy">Ember is a pomodoro timer for a small, repeatable rhythm: focus, break, return.</p><p class="note" style="margin-top:40px">A project by kartenlabs<br>ember.kartenlabs.com</p></div><img class="screenshot" src="${shot}" alt="Ember timer"></div>`],
    ['A small brief. A clear direction.','01 · THE BRIEF',`<div class="rules"><div class="rule"><b>01</b><p>Focus, short breaks, and long breaks with adjustable lengths.</p></div><div class="rule"><b>02</b><p>A choice of gentle completion chimes, with a way to preview them.</p></div><div class="rule"><b>03</b><p>A minimal, calm, pixel-inspired interface with an ambient station.</p></div></div><p class="note" style="margin-top:48px">Source: repository design brief. No interviews or usability study are claimed.</p>`],
    ['Three modes. One visual language.','02 · THE IDENTITY',`<div class="swatches"><div class="swatch" style="background:${C.amber}">FOCUS<br>#E8A64C</div><div class="swatch" style="background:${C.sage}">SHORT BREAK<br>#86A87F</div><div class="swatch" style="background:${C.clay}">LONG BREAK<br>#C97558</div></div><p class="copy" style="margin-top:48px">A warm ink background and cream type hold the interface together. Accent colors indicate the active mode. Pixel type carries time; plain language carries meaning.</p>`],
    ['Make the next action obvious.','03 · THE EXPERIENCE',`<div style="display:grid;grid-template-columns:1fr 280px;gap:64px"><div class="rules"><div class="rule"><b>01</b><p>Start, pause, reset, and skip sit beside the countdown.</p></div><div class="rule"><b>02</b><p>A completion handoff offers the next block without forcing a start.</p></div><div class="rule"><b>03</b><p>Night and Daylight themes share the same visual structure.</p></div></div><img class="screenshot" style="height:490px;width:226px;object-fit:cover;object-position:top" src="${mobile}" alt="Mobile timer"></div>`],
    ['A soundtrack beside the clock.','AMBIENT STATION',`<p class="copy" style="font-size:38px">An optional ambient station makes Ember a place to settle into a session, alongside its timing and break controls.</p><div style="border:1px solid ${C.border};padding:48px;margin-top:48px"><p style="font-size:48px">Currently featuring Claude FM</p><p class="copy" style="margin-top:20px">Music for thinking and building · by Claude · via YouTube</p></div><p class="note" style="margin-top:36px">The station is a third-party embed and can change. No audio is hosted by Ember. Concentration benefits have not been measured. No affiliation or endorsement is claimed.</p>`],
    ['A clock that remembers.','04 · THE ENGINEERING',`<div class="rules"><div class="rule"><b>01</b><p>A stored deadline determines the time remaining when a tab returns.</p></div><div class="rule"><b>02</b><p>Active blocks keep their original duration, start time, and label.</p></div><div class="rule"><b>03</b><p>Validated local storage restores sessions. Calendar arithmetic handles daylight-saving changes.</p></div></div><p class="note" style="margin-top:40px">Implementation: Next.js, React, TypeScript, CSS custom properties.</p>`],
    ['Checked in code. Ready to learn.','05 · VALIDATION',`<div style="display:flex;gap:120px;margin-bottom:48px"><div><div class="number">15</div><p class="copy">unit tests</p></div><div><div class="number">05</div><p class="copy">browser scenarios</p></div></div><p class="copy">The recorded implementation check covered reload recovery, keyboard access, auto-start, midnight rollover, and layouts from 320px to desktop.</p><p class="note" style="margin-top:36px">Snapshot: repository review on 8 September 2026. Automated checks describe implementation coverage, not user outcomes. Third-party playback is excluded.</p>`],
    ['A working product, with room to grow.','06 · REFLECTION',`<div class="rules"><div class="rule"><b>NOW</b><p>A responsive timer, configurable flow and sounds, two themes, and a local session log.</p></div><div class="rule"><b>NEXT</b><p>Observe real sessions, test audio behavior across devices, and evaluate multi-tab coordination and data export.</p></div></div><p class="copy" style="margin-top:60px">No adoption, conversion, retention, or time-saving metrics are claimed.</p>`],
    ['Start with one session.','EMBER · KARTENLABS',`<div style="width:760px;margin:70px 0">${word(C.amber)}</div><p style="font:40px mono">ember.kartenlabs.com</p><p class="copy" style="margin-top:48px">A project by kartenlabs · kartenlabs.com</p>`],
  ];
  const deck=[];
  for(const [i,[title,tag,body]] of deckSlides.entries()) {
    const content=`${top()}<div class="eyebrow" style="margin-top:52px">${tag}</div><h1 style="font-size:72px;margin:24px 0 48px">${title}</h1>${body}${footer(`${i+1} of ${deckSlides.length}`)}`;
    const board=`<section class="board" style="width:1600px;height:1000px">${content}</section>`;
    deck.push(board);
    await art(`05-case-study/slide-${String(i+1).padStart(2,'0')}.png`,1600,1000,content,`Case study slide ${i+1}: ${title}`);
  }
  await put('05-case-study/presentation.html',html(deck.join('')));
  await page.setContent(html(deck.join('')));await page.evaluate(()=>document.fonts.ready);
  await page.pdf({path:join(kit,'05-case-study/ember-case-study.pdf'),width:'1600px',height:'1000px',printBackground:true,tagged:true});

  // A separate, responsive reading version of the written case study.
  const inline=text=>esc(text).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2">$1</a>');
  const narrative=(await readFile(join(kit,'05-case-study/case-study.md'),'utf8')).trim().split(/\n\n+/).map(block=>{
    if(block.startsWith('# ')) return `<h1>${inline(block.slice(2))}</h1>`;
    if(block.startsWith('## ')) return `<h2>${inline(block.slice(3))}</h2>`;
    if(block.startsWith('- ')) return `<ul>${block.split('\n').map(line=>`<li>${inline(line.slice(2))}</li>`).join('')}</ul>`;
    return `<p>${inline(block.replace(/\n/g,' '))}</p>`;
  }).join('\n');
  await put('05-case-study/case-study.html',`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ember: designing a quieter timer · kartenlabs</title><style>${fonts}*{box-sizing:border-box}body{margin:0;background:${C.ink};color:${C.cream};font:20px/1.7 sans,Arial}article{max-width:980px;margin:auto;padding:48px 24px 100px}nav{display:flex;gap:24px;flex-wrap:wrap;font:14px mono;margin-bottom:48px}a{color:${C.amber};overflow-wrap:anywhere}h1{font-size:clamp(40px,7vw,72px);font-weight:400;line-height:1.1;letter-spacing:-.04em}h2{font-size:34px;font-weight:400;line-height:1.2;margin:64px 0 24px}p,li{color:${C.muted}}strong{color:${C.cream}}code{font-size:15px;overflow-wrap:anywhere}img{width:100%;height:auto;border:1px solid ${C.border};margin-bottom:32px}@media print{body{background:white;color:black}p,li,strong{color:black}a{color:#714411}article{padding:0}nav{display:none}}</style></head><body><article><nav><a href="../index.html">Asset gallery</a><a href="ember-case-study.pdf">Download presentation PDF</a><a href="https://ember.kartenlabs.com">Open Ember</a></nav><img src="cover-1600x900.png" alt="Ember, a quiet timer by kartenlabs">${narrative}</article></body></html>`);

  for(const item of manifest) item.bytes=(await stat(join(kit,item.file))).size;
  const extraNames=await readdir(kit,{recursive:true});
  const additionalFiles=[];
  for(const name of extraNames.filter(name=>/\.(svg|webp|ico|pdf|md|json|mjs|py|woff2|txt)$/.test(name) && name!=='asset-manifest.json')) {
    additionalFiles.push({file:name,bytes:(await stat(join(kit,name))).size});
  }
  await put('asset-manifest.json',JSON.stringify({product:'ember',company:'kartenlabs',productURL:'https://ember.kartenlabs.com',companyURL:'https://kartenlabs.com',socialHandle:'@kartenlabs',created:'2026-09-08',assets:manifest,additionalFiles},null,2)+'\n');
  await put('index.html',`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ember · brand and case-study kit</title><style>${fonts}*{box-sizing:border-box}body{margin:0;background:${C.ink};color:${C.cream};font:18px sans,Arial}header,main{max-width:1300px;margin:auto;padding:48px 24px}header{border-bottom:1px solid ${C.border}}h1{font-size:64px;font-weight:400;letter-spacing:-.04em;margin:24px 0}p{color:${C.muted};line-height:1.6}a{color:${C.amber}}nav{display:flex;gap:24px;flex-wrap:wrap}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}article{border:1px solid ${C.border};padding:16px;min-width:0}img{width:100%;height:220px;object-fit:contain;background:repeating-conic-gradient(#282118 0 25%,#332B22 0 50%) 0/20px 20px}h2{font-size:32px;margin:48px 0 24px}h3{font:14px mono;overflow-wrap:anywhere}small{font:12px mono;color:${C.muted}}.brand{width:220px}</style></head><body><header><div class="brand">${word()}</div><h1>A quiet identity.<br>Ready to share.</h1><p>Ember by kartenlabs. Logos, social exports, SEO assets, product captures, and a case-study presentation.<br>Product: <a href="https://ember.kartenlabs.com">ember.kartenlabs.com</a> · Company: <a href="https://kartenlabs.com">kartenlabs.com</a></p><nav><a href="00-guide/START-HERE.md">Start here</a><a href="05-case-study/ember-case-study.pdf">Case-study PDF</a><a href="02-social/linkedin/ember-document-carousel.pdf">Social carousel PDF</a><a href="06-copy/social-copy.md">Social copy</a><a href="asset-manifest.json">Asset inventory + alt text</a></nav></header><main>${['01-identity','02-social','03-web-seo','04-product-screenshots','05-case-study'].map(group=>`<h2>${esc(group.replace(/^\d+-/,'').replaceAll('-',' '))}</h2><div class="grid">${manifest.filter(a=>a.file.startsWith(group)).map(a=>`<article><a href="${a.file}" download><img src="${a.file}" alt="${esc(a.alt)}" loading="lazy"></a><h3>${esc(a.file.split('/').pop())}</h3><small>${a.width} × ${a.height} · ${Math.round(a.bytes/1024)} KB</small><p><a href="${a.file}" download>Download PNG</a>${a.source?` · <a href="${a.source}">Editable artboard</a>`:''}</p></article>`).join('')}</div>`).join('')}</main></body></html>`);
  const gallery=await readFile(join(kit,'index.html'),'utf8');
  await put('index.html',gallery.replaceAll('Editable artboard','Editable source').replace('<nav>','<nav><a href="05-case-study/case-study.html">Read case study</a>'));
  console.log(`Exported ${manifest.length} PNG assets, SVG masters, two PDFs, editable HTML artboards, and a gallery.`);
} finally { await browser.close(); }
