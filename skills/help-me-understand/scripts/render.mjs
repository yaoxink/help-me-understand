import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {renderPage,prepareRenderedHtml,reportLine} from '../assets/runtime/kit/render.mjs';
import {lookAt,lookLines} from '../assets/runtime/kit/look.mjs';
const args=process.argv.slice(2), input=args.find(x=>!x.startsWith('--'));
if(!input||!input.endsWith('.src.html'))throw new Error('Usage: node scripts/render.mjs page.src.html [--render-only]');
const source=readFileSync(input,'utf8');
if(/data-ref\s*=\s*(["'])\s*\1/i.test(source))throw new Error('Empty data-ref must be omitted; unrelated figures must not highlight together');
const r=renderPage(source);
if(r.errors.length)throw new Error(r.errors.join('\n'));
if(r.report?.uncaptioned)throw new Error('Every figure needs a judgment-bearing figcaption');
if(!r.kit)throw new Error('Missing <link rel="stylesheet" href="kit.css" data-ve-kit>');
let html=prepareRenderedHtml(r.html);
// Remote fonts are optional in the upstream; remove network references and retain the same kit/local font fallbacks.
html=html.replace(/<link\b[^>]*href=["']https:\/\/fonts\.(?:googleapis|gstatic)\.com[^>]*>\s*/gi,'');
html=html.replace('</head>',`<style data-hmu-fallback>
html:not([data-ve-kit="ready"]) .ve-steps [data-s],html:not([data-ve-kit="ready"]) .ve-steps [data-s] text{opacity:1!important}
html:not([data-ve-kit="ready"]) .ve-steps path[pathLength][data-s]{stroke-dashoffset:0!important}
html:not([data-ve-kit="ready"]) .ve-player{display:none!important}
@media print{svg.has-lit path[data-ref]:not(.is-lit),svg.has-lit g[data-ref]:not(.is-lit) .sh{opacity:1!important}svg.has-lit g[data-ref]:not(.is-lit) text,svg.has-lit text[data-ref]:not(.is-lit){fill:var(--text)!important}}
</style></head>`);
const output=resolve(input.replace(/\.src\.html$/,'.html'));writeFileSync(output,html);
console.log(output+'\n'+reportLine(r.report));
if(args.includes('--render-only')){console.log('UNVERIFIED: render only; actual visual checks not run.');process.exit(0);}
const check=await lookAt(output);writeFileSync(output.replace(/\.html$/,'.qa.json'),JSON.stringify(check,null,2));
for(const line of lookLines(check))console.log(line);
if(check.skipped||check.problems.length)process.exitCode=1;
