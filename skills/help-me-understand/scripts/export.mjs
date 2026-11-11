import {readFileSync,writeFileSync} from 'node:fs';
import {launchBrowser,memoryPage} from '../assets/runtime/browser.mjs';
const args=process.argv.slice(2), input=args[0],value=k=>args[args.indexOf(k)+1];
const format=value('--format'),out=value('--out'),selector=args.includes('--selector')?value('--selector'):null;
if(!input||!args.includes('--format')||!args.includes('--out')||!['svg','png','pdf'].includes(format))throw new Error('Usage: node export.mjs page.html --format svg|png|pdf --out file [--selector selector]');
const browser=await launchBrowser();
try{
 const {context,page}=await memoryPage(browser,readFileSync(input,'utf8'),{viewport:{width:1280,height:900},reducedMotion:'reduce'});
 await page.waitForTimeout(150);
 if(format==='pdf'){
  if(args.includes('--page'))await page.pdf({path:out,format:'A4',printBackground:true,preferCSSPageSize:true});
  else{
   const target=page.locator(selector||'main figure').first();
   await target.evaluate(el=>{
    const content=el.cloneNode(true),defs=[...document.querySelectorAll('body > svg[aria-hidden="true"]')].map(e=>e.cloneNode(true));
    const main=document.createElement('main');main.append(content);document.body.replaceChildren(...defs,main);
   });
   await page.addStyleTag({content:'html,body{margin:0!important;padding:0!important}main{margin:0!important;padding:20px!important;max-width:none!important;width:1280px!important;display:block!important}figure{margin:0!important;break-inside:auto!important}.ve-player,.ve-bar,.ve-sel{display:none!important}.frame{overflow:visible!important}'});
   await page.emulateMedia({media:'print'});
   const size=await page.locator('main').boundingBox();
   await page.pdf({path:out,width:Math.ceil(size.width)+'px',height:Math.ceil(size.height+2)+'px',printBackground:true,preferCSSPageSize:false});
  }
 }
 else if(format==='png'){
  if(selector)await page.locator(selector).screenshot({path:out});else await page.screenshot({path:out,fullPage:true});
 }else{
  const svg=await page.locator(selector||'main figure svg:not([aria-hidden="true"])').first().evaluate(el=>{
   if(el.tagName.toLowerCase()!=='svg')throw new Error('SVG export selector must select an SVG');
   const copy=el.cloneNode(true),originals=[el,...el.querySelectorAll('*')],copies=[copy,...copy.querySelectorAll('*')];
   const properties=['fill','fill-opacity','paint-order','stop-color','stop-opacity','color','vector-effect','stroke','stroke-width','stroke-dasharray','stroke-linecap','stroke-linejoin','stroke-opacity','font-family','font-size','font-weight','font-style','text-anchor','dominant-baseline','opacity','filter','marker-end','marker-start','display','visibility'];
   for(let i=0;i<originals.length;i++){const css=getComputedStyle(originals[i]);for(const key of properties){let val=css.getPropertyValue(key);val=val.replace(/url\(["']?[^)"']*#([^)'"\s]+)["']?\)/g,'url(#$1)');copies[i].style.setProperty(key,val);}}
   const inherited=getComputedStyle(el);for(const key of inherited)if(key.startsWith('--'))copy.style.setProperty(key,inherited.getPropertyValue(key));
   const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
   for(const item of document.querySelectorAll('svg defs > *'))if(item.id&&!copy.querySelector('[id="'+CSS.escape(item.id)+'"]'))defs.append(item.cloneNode(true));
   if(defs.childNodes.length)copy.prepend(defs);
   copy.setAttribute('xmlns','http://www.w3.org/2000/svg');
   const box=el.viewBox.baseVal;copy.setAttribute('width',String(box.width||el.getBoundingClientRect().width));copy.setAttribute('height',String(box.height||el.getBoundingClientRect().height));
   copy.style.removeProperty('min-width');copy.style.removeProperty('--ve-min');copy.style.setProperty('overflow','visible');
   return new XMLSerializer().serializeToString(copy);
  });
  writeFileSync(out,svg);
 }
 console.log(out);await context.close();
}finally{await browser.close();}
