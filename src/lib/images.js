// Finds every image dropped into src/assets/products at build time (Vite glob), so there are no 404 probes.
const files=import.meta.glob('../assets/products/*.{jpg,jpeg,png,webp,avif,svg}',{eager:true,query:'?url',import:'default'});
const map={};
for(const[path,url]of Object.entries(files))map[path.split('/').pop().replace(/\.[^.]+$/,'').toLowerCase()]=url;
const logos=import.meta.glob('../assets/brands/*.svg',{eager:true,query:'?url',import:'default'});
const bmap={};
for(const[path,url]of Object.entries(logos))bmap[path.split('/').pop().replace('.svg','')]=url;
export const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
// k = 0 main image; k = 1..3 gallery images (-2, -3, -4). Falls back to the main image, then null.
export const productImage=(p,k=0)=>{const s=slug(p.name);return(k&&map[`${s}-${k+1}`])||map[s]||null};
// Brand logo: wide logo by default, mark=true for the square icon (src/assets/brands/<brand>.svg and <brand>-mark.svg)
export const brandLogo=(name,mark)=>bmap[slug(name)+(mark?'-mark':'')]||null;
