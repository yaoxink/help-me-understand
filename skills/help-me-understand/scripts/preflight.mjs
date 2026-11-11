import {launchBrowser} from '../assets/runtime/browser.mjs';
if(Number(process.versions.node.split('.')[0])<20)throw new Error('Node.js >=20 required');
const browser=await launchBrowser();console.log(JSON.stringify({node:process.versions.node,browser:browser.version(),render:'bundled',otherSkillsRequired:false,networkRequired:false}));await browser.close();
