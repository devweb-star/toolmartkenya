(function () {
  const categoryKey = window.catalogCategoryKey;
  const subcategoryKey = window.catalogSubcategoryKey;
  const grid = document.getElementById('productGrid');
  if (!categoryKey || !subcategoryKey || !grid) return;
  const path = window.location.pathname.replace(/\\/g, '/');
  const pageDepth = path.includes('/categories/')
    ? path.split('/categories/')[1].split('/').filter(Boolean).length
    : 0;
  const assetRoot = '../'.repeat(pageDepth);
  if (!document.querySelector('link[href*="subcategory-page.css"]')) {
    const subcategoryStyles = document.createElement('link');
    subcategoryStyles.rel = 'stylesheet';
    subcategoryStyles.href = `${assetRoot}assets/subcategory-page.css`;
    document.head.appendChild(subcategoryStyles);
  }
  const style = document.createElement('style');
  style.textContent = '.product-link{display:block;height:100%;color:inherit;text-decoration:none}.product-card:hover{transform:translateY(-3px);box-shadow:0 14px 28px rgba(15,23,42,.12);transition:transform .2s ease,box-shadow .2s ease}.product-card:focus-within{outline:3px solid rgba(0,127,255,.3);outline-offset:3px}.product-link-label{display:flex;align-items:center;justify-content:center;width:100%;margin-top:12px;padding:12px 16px;border-radius:12px;background:var(--primary,#007fff);color:var(--white,#fff);font-size:.9rem;font-weight:700;text-align:center}';
  document.head.appendChild(style);
  const catalogRequest = window.location.protocol === 'file:' && Array.isArray(window.catalogLocalProducts)
    ? Promise.resolve({ categories: { [categoryKey]: { subcategories: { [subcategoryKey]: { products: window.catalogLocalProducts } } } } })
    : fetch(`${assetRoot}product.json`).then((response) => {
      if (!response.ok) throw new Error(`Failed to load product.json: ${response.status}`);
      return response.json();
    });
  catalogRequest
    .then((catalog) => {
      const subcategory = catalog.categories?.[categoryKey]?.subcategories?.[subcategoryKey];
      const fallbackProducts = categoryKey === 'printing' && subcategoryKey === 'vinyl-cutter-machine'
        ? catalog.categories?.printing?.subcategories?.products?.products?.filter((product) => /vinyl/i.test(product.name))
        : [];
      const products = subcategory?.products || fallbackProducts || [];
      const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
      grid.innerHTML = products.map((product) => {
        const price = Number(product.price).toLocaleString('en-KE');
        const imagePath = String(product.image || '');
        const image = imagePath.includes('assets/images/')
          ? `${assetRoot}assets/images/${imagePath.split('assets/images/')[1]}`
          : imagePath;
        const productUrl = categoryKey === 'welding' && subcategoryKey === 'products' && product.url && !product.url.includes('/')
          ? `welding-machines/${product.url}`
          : product.url;
        const href = productUrl ? `./${encodeURI(productUrl)}` : '#';
        const featureNames = (Array.isArray(product.features) ? product.features : []).slice(0, 3).map((feature) => `<li>${escapeHtml(feature.name)}</li>`).join('');
        return `<article class="product-card"><a class="product-link" href="${href}" aria-label="View ${escapeHtml(product.name)}"><div class="product-image"><img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)}" loading="lazy"></div><div class="product-body"><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description || product.specifications || '')}</p>${featureNames ? `<ul class="product-features">${featureNames}</ul>` : ''}<div class="product-price"><span class="price">KSh ${price}</span></div><span class="product-link-label">View product</span></div></a></article>`;
      }).join('') || '<p class="empty">No products available.</p>';
    })
    .catch(() => { grid.innerHTML = '<p class="empty">Products are temporarily unavailable.</p>'; });
})();