// Usage: npm run images  -> lists the image file expected for each product and whether it exists.
import fs from 'fs';
import {P} from '../src/data/products.js';
const dir=new URL('../src/assets/products/',import.meta.url).pathname;
const have=new Set(fs.readdirSync(dir).map(f=>f.replace(/\.[^.]+$/,'').toLowerCase()));
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
let ok=0;
for(const p of P){const s=slug(p.name),has=have.has(s);ok+=has;console.log(`${has?'✓':'✗'} ${p.name.padEnd(24)} -> ${s}.jpg|png|webp`)}
console.log(`\n${ok}/${P.length} products have an image in src/assets/products/`);
