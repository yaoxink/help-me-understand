import { chromium } from './browser-client/index.mjs';
export async function launchBrowser(){
 const attempts=[...(process.env.HMU_BROWSER_EXECUTABLE?[{executablePath:process.env.HMU_BROWSER_EXECUTABLE}]:[]),{}, {channel:'chrome'},{channel:'msedge'}];
 const errors=[];
 for(const options of attempts){try{return await chromium.launch({headless:true,...options});}catch(e){errors.push(String(e.message).split('\n')[0]);}}
 throw new Error('No supported local browser started. Install Chrome/Edge/Chromium or set HMU_BROWSER_EXECUTABLE to its executable. '+errors.join('; '));
}
export async function memoryPage(browser,html,options={}){
 const context=await browser.newContext({offline:true,serviceWorkers:'block',acceptDownloads:false,...options});
 await context.route('**/*',route=>route.abort());
 const page=await context.newPage();
 await page.setContent(html,{waitUntil:'load'});
 return {context,page};
}
