# Product images

Every product already has generated SVG illustrations here (main image plus 3 gallery views). To use real photos, add a file with the same name (for example `aurora-x1-pro-5g.jpg`) and delete the matching `.svg`, because an SVG with the same name wins if both exist. No code changes are needed. Re-create the illustrations any time with `python3 scripts/generate-assets.py`.

## Naming rule
Name the file after the product name in `src/data/products.js`, in lowercase, with dashes instead of spaces and symbols.

| Product name        | Main image file       | Extra gallery images (optional)        |
|---------------------|-----------------------|----------------------------------------|
| iPhone 16           | `iphone-16.jpg`       | `iphone-16-2.jpg`, `-3`, `-4`          |
| Aurora X1 Pro 5G    | `aurora-x1-pro-5g.png`| `aurora-x1-pro-5g-2.png` ...           |
| ANC Headphones Max  | `anc-headphones-max.webp` | `anc-headphones-max-2.webp` ...    |

- Allowed types: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.svg`
- The main image is used on cards and the first picture of the product page.
- Gallery images `-2`, `-3`, `-4` fill the other three spots on the product page. Missing ones reuse the main image.
- A product with no image at all shows an emoji placeholder.
- Best results: square images (about 800x800), plain or transparent background, under 300 KB each.

## Using real product names
Open `src/data/products.js` and change the name (for example `'Aurora X1 Pro 5G'` to `'iPhone 16'`). The image filename then becomes `iphone-16.jpg`.

## Check what is missing
Run `npm run images` to list the expected file name for every product and whether the image is present.
