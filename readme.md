# ToolMart Solutions

Static product catalog for construction, agricultural, automotive, cleaning, food-processing, power-tool, generator, printing, solar-water-heater, water-pump and welding equipment in Kenya.

Production site: <https://toolmart.co.ke>

## Run locally

Serve the project root over HTTP so pages can load `product.json` and shared assets. With Python installed, run:

```powershell
py -m http.server 8000
```

Then open <http://localhost:8000>.

## Project files

- `index.html` is the home page; `products.html` is the full catalog.
- `categories/` contains category, subcategory and product pages.
- `product.json` supplies product names, descriptions, prices, images and page links.
- `assets/` contains shared catalog scripts, styles and product images.
- `blog/` contains the editorial pages and blog data.
- `tools/rebuild-catalog.ps1` rebuilds `product.json` from product detail pages and creates missing catalog pages.
- `robots.txt`, `sitemap.xml` and `llms.txt` describe the published site to crawlers and language models.

Product prices are listed in Kenyan shillings (KSh). Confirm current price and availability with ToolMart before ordering.
