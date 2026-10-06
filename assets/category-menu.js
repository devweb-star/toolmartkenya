(() => {
  'use strict';

  const homeLink = Array.from(document.querySelectorAll('a')).find((link) =>
    link.textContent.trim().toLowerCase() === 'home'
  );
  if (!homeLink) return;

  const path = window.location.pathname.replace(/\\/g, '/');
  const categoryDepth = path.includes('/categories/')
    ? path.split('/categories/')[1].split('/').filter(Boolean).length
    : path.includes('/blog/') ? 1 : 0;
  const rootPath = '../'.repeat(categoryDepth);
  const dataPath = `${rootPath}product.json`;
  const categoriesPath = `${rootPath}categories/categories.html`;
  const categoryHeroImages = {
    agricultural: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200',
    automotive: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200',
    'cleaning-equipment': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
    construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200',
    'food-processing': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200',
    generators: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200',
    landscaping: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200',
    'power-tools': 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200',
    printing: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1200',
    'solar-water-heaters': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200',
    'water-pumps': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200',
    welding: 'https://images.unsplash.com/photo-1504917595225-2b7fe560489d?w=1200'
  };
  if (document.getElementById('productGrid') && !document.querySelector('link[href*="subcategory-page.css"]')) {
    const subcategoryStyles = document.createElement('link');
    subcategoryStyles.rel = 'stylesheet';
    subcategoryStyles.href = `${rootPath}assets/subcategory-page.css`;
    document.head.appendChild(subcategoryStyles);
  }
  const subcategoryFiles = {
    'water-pumps': { petrol: 'petrol-water-pumps.html', diesel: 'diesel-water-pumps.html', submersible: 'submersible-water-pumps.html', 'high-pressure': 'high-pressure-water-pumps.html', booster: 'booster-pumps.html', electric: 'electric-water-pumps.html', solar: 'solar-water-pumps.html' },
    generators: { 'petrol-gen': 'petrol-generators.html', 'diesel-gen': 'diesel-generators.html', silent: 'silent-generators.html' },
    landscaping: { 'brush-cutters': 'brush-cutters.html', 'earth-auger': 'earth-auger-machines.html', 'honda-brush': 'honda-brush-cutters.html', 'honda-lawn': 'honda-lawn-mowers.html', 'lawn-mowers': 'lawn-mowers.html', 'power-saw': 'power-saws.html' },
    construction: { mixers: 'concrete-mixers.html', vibrator: 'concrete-vibrators.html', hoist: 'concrete-hoist.html', geotextile: 'geo-textiles-fabric.html', net: 'construction-net.html', membrane: 'app-membrane.html', compressor: 'air-compressors.html', welding: 'welding-machines.html', 'fold-ladder': 'foldable-ladders.html', 'alum-ladder': 'aluminium-ladders.html', boots: 'safety-boots.html', helmet: 'construction-helmets.html', 'shade-nets': 'car-shade-nets.html', 'welding-gen': 'welding-generators.html' },
    agricultural: { 'chaff-cutters': 'chaff-cutters.html', silage: 'silage-choppers.html', milking: 'milking-machines.html', tractor: 'walking-tractors.html', baler: 'manual-hay-balers.html', maize: 'maize-shellers.html', sprayer: 'motorised-knapsack-sprayer.html', shade: 'shade-nets.html' },
    'food-processing': { posho: 'posho-mills.html', 'oil-press': 'oil-press-machines.html', pellet: 'pellet-making-machine.html', peanut: 'peanut-butter-making-machine.html', 'bone-saw': 'bone-saw-machine.html', mincer: 'meat-mincer.html', spice: 'spice-grinder.html', juicer: 'commercial-juicers.html', blender: 'commercial-blenders.html', dough: 'dough-mixers.html', popcorn: 'popcorn-machine.html' },
    'power-tools': { 'heat-gun': 'heat-gun.html', 'angle-grinder': 'angle-grinders.html', 'cordless-drill': 'cordless-drill.html', blower: 'blowers.html', 'demolition-hammer': 'demolition-hammers.html', 'circular-saw': 'circular-saw.html', 'welding-grinder': 'welding-grinders.html', 'wall-chaser': 'wall-chaser-machine.html', jigsaw: 'jig-saw-machines.html' },
    printing: { 'heat-press-machine': 'heat-press-machine.html', 'vinyl-cutter-machine': 'vinyl-cutter-machine.html' },
    welding: { products: 'welding.html' },
    cleaning: { vacuum: 'vacuum-cleaners.html', carpet: 'carpet-cleaning-machines.html', sofa: 'sofa-cleaning-machines.html', 'car-wash': 'car-wash-machines.html', floor: 'floor-scrubbing-machines.html' },
    general: { 'heat-press': 'heat-press-machine.html', vinyl: 'vinyl-plotter-machine.html' }
  };
  const style = document.createElement('style');
  style.textContent = `
    html, body {
      overflow-x: hidden !important;
      max-width: 100vw !important;
    }

    nav, header, .header, .navbar { overflow: visible !important; }

    .category-menu-item {
      position: relative !important;
      display: list-item !important;
    }
    .category-menu-toggle {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .category-menu-toggle::after {
      content: '\\f107';
      font-family: 'Font Awesome 6 Free';
      font-weight: 900;
      font-size: .75em;
      transition: transform .2s ease;
    }
    .category-menu-item.menu-open > .category-menu-toggle::after {
      transform: rotate(180deg);
    }

    /* Main dropdown - fixed to viewport */
    .category-menu {
      position: fixed !important;
      z-index: 9999 !important;
      display: block !important;
      width: 260px !important;
      max-height: min(70vh, 520px);
      margin: 0 !important;
      padding: 8px !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      overscroll-behavior: contain;
      list-style: none !important;
      background: var(--white, #fff);
      border: 1px solid rgba(15,23,42,.1);
      border-radius: 10px;
      box-shadow: 0 16px 36px rgba(15,23,42,.18);
      opacity: 0;
      visibility: hidden;
      transform: none;
      transition: opacity .18s ease, visibility .18s;
      pointer-events: none;
    }
    .category-menu::-webkit-scrollbar { width: 0; height: 0; }
    .category-menu { scrollbar-width: none; -ms-overflow-style: none; }

    .category-menu-item:hover > .category-menu,
    .category-menu-item:focus-within > .category-menu,
    .category-menu-item.menu-open > .category-menu {
      opacity: 1;
      visibility: visible;
      transform: none;
      pointer-events: auto;
    }

    /* Each category li */
    .category-menu > li {
      position: relative !important;
      list-style: none !important;
      margin: 0;
      padding: 0;
    }

    /* Row containing name link + submenu toggle */
    .category-row {
      display: flex;
      align-items: center;
      gap: 0;
      border-radius: 6px;
      transition: background .15s ease;
    }
    .category-row:hover {
      background: rgba(0,127,255,.04);
    }

    /* Category name - navigates to category page */
    .category-name {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      padding: 10px 6px 10px 12px;
      color: var(--dark, #0f172a);
      white-space: nowrap;
      text-decoration: none;
      border-radius: 6px 0 0 6px;
    }
    .category-name:hover,
    .category-name:focus-visible {
      color: var(--primary, #007fff);
      outline: none;
    }

    /* Submenu toggle button - opens/closes submenu only */
    .category-submenu-toggle {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 38px;
      margin: 0;
      padding: 0;
      background: transparent;
      border: 0;
      border-radius: 0 6px 6px 0;
      cursor: pointer;
      color: var(--dark, #0f172a);
      transition: background .15s ease, color .15s ease;
    }
    .category-submenu-toggle:hover,
    .category-submenu-toggle:focus-visible {
      background: rgba(0,127,255,.12);
      color: var(--primary, #007fff);
      outline: none;
    }
    .submenu-arrow {
      font-family: 'Font Awesome 6 Free';
      font-weight: 900;
      font-size: .7em;
      opacity: .6;
      transition: transform .2s ease;
    }
    .submenu-arrow::before {
      content: '\\f054';
    }
    .category-menu > li.menu-open > .category-row .submenu-arrow,
    .category-menu > li:hover > .category-row .submenu-arrow {
      transform: rotate(90deg);
      opacity: 1;
      color: var(--primary, #007fff);
    }
    .category-menu > li.flip-x > .category-row .submenu-arrow {
      transform: rotate(180deg);
    }
    .category-menu > li.flip-x.menu-open > .category-row .submenu-arrow,
    .category-menu > li.flip-x:hover > .category-row .submenu-arrow {
      transform: rotate(90deg);
    }

    /* Submenu - absolute relative to parent li */
    .category-submenu {
      position: fixed !important;
      top: 0 !important;
      left: auto !important;
      right: auto !important;
      z-index: 10000 !important;
      display: block !important;
      width: 240px !important;
      max-height: min(70vh, 520px, calc(100vh - 40px));
      margin: 0 !important;
      padding: 8px !important;
      overflow-y: auto;
      overscroll-behavior: contain;
      list-style: none !important;
      background: var(--white, #fff);
      border: 1px solid rgba(15,23,42,.1);
      border-radius: 10px;
      box-shadow: 0 16px 36px rgba(15,23,42,.18);
      opacity: 0;
      visibility: hidden;
      transform: translateX(-6px);
      transition: opacity .18s ease, transform .18s ease, visibility .18s;
      pointer-events: none;
    }
    .category-submenu.flip-x {
      left: auto !important;
      right: auto !important;
      margin: 0 !important;
      transform: translateX(6px);
    }
    .category-submenu::-webkit-scrollbar { width: 0; height: 0; }
    .category-submenu { scrollbar-width: none; -ms-overflow-style: none; }
    .category-submenu > li {
      position: relative !important;
      list-style: none !important;
      margin: 0;
      padding: 0;
    }
    .category-submenu a {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      color: var(--dark, #0f172a);
      white-space: nowrap;
      border-radius: 6px;
      text-decoration: none;
    }
    .category-submenu a:hover,
    .category-submenu a:focus-visible {
      background: rgba(0,127,255,.09);
      color: var(--primary, #007fff);
      outline: none;
    }
    .category-menu > li:hover > .category-submenu,
    .category-menu > li:focus-within > .category-submenu,
    .category-menu > li.menu-open > .category-submenu {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
      pointer-events: auto;
    }

    /* Mobile view */
    @media (max-width: 700px) {
      .category-menu {
        position: fixed !important;
        left: 12px !important;
        right: 12px !important;
        width: auto !important;
        max-height: calc(100vh - 120px) !important;
        margin: 0 !important;
        padding: 8px !important;
        overflow-y: auto !important;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(15,23,42,.25);
      }
      .category-name {
        white-space: normal;
        padding: 12px 8px 12px 14px;
      }
      .category-submenu-toggle {
        width: 44px;
        height: 44px;
      }
      .submenu-arrow::before {
        content: '\\f078';
      }
      .category-menu > li.menu-open > .category-row .submenu-arrow {
        transform: rotate(180deg);
      }
      .category-menu > li.flip-x > .category-row .submenu-arrow {
        transform: rotate(0deg);
      }
      .category-menu > li.flip-x.menu-open > .category-row .submenu-arrow {
        transform: rotate(180deg);
      }

      /* Submenu becomes inline accordion on mobile */
      .category-submenu {
        position: static !important;
        display: none !important;
        width: 100% !important;
        max-height: none !important;
        margin: 0 0 4px 0 !important;
        padding: 4px 0 4px 16px !important;
        border-left: 2px solid rgba(0,127,255,.2);
        border-radius: 0;
        box-shadow: none;
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        background: transparent !important;
        border-width: 0 0 0 2px !important;
      }
      .category-submenu.flip-x {
        left: auto !important;
        right: auto !important;
      }
      .category-menu > li.menu-open > .category-submenu {
        display: block !important;
      }
      .category-submenu a {
        padding: 10px 12px;
        font-size: .95em;
      }
    }
  `;
  document.head.appendChild(style);

  const categoryPageMatch = path.match(/\/categories\/([^/]+)\.html$/);
  const hero = document.querySelector('.hero');
  if (categoryPageMatch && hero) {
    const heroImage = categoryHeroImages[categoryPageMatch[1]];
    if (heroImage) {
      hero.style.backgroundImage = `linear-gradient(135deg, rgba(15,23,42,.82), rgba(30,58,138,.72)), url("${heroImage}")`;
      hero.style.backgroundPosition = 'center';
      hero.style.backgroundSize = 'cover';
    }
  }

  const nav = homeLink.closest('ul, nav');
  if (!nav) return;

  let ancestor = nav;
  while (ancestor && ancestor !== document.body) {
    const cs = getComputedStyle(ancestor);
    if (cs.overflow === 'hidden' || cs.overflow === 'auto' || cs.overflowY === 'hidden' || cs.overflowY === 'auto') {
      ancestor.style.overflow = 'visible';
    }
    ancestor = ancestor.parentElement;
  }

  const existing = nav.querySelector('.category-menu-item');
  const categoriesLink = Array.from(nav.querySelectorAll('a')).find((link) => {
    const href = link.getAttribute('href') || '';
    return /categories\/categories\.html(?:$|#)/.test(href) || link.textContent.trim().toLowerCase() === 'categories';
  });
  const existingCategoriesItem = categoriesLink?.closest('li') || categoriesLink;
  const categoryItem = existing || existingCategoriesItem || document.createElement('li');
  categoryItem.className = 'category-menu-item';
  categoryItem.innerHTML = `<a href="${categoriesPath}" class="category-menu-toggle" aria-haspopup="true" aria-expanded="false">Categories</a><ul class="category-menu" aria-label="Categories"></ul>`;
  const productsLink = Array.from(nav.querySelectorAll('a')).find((link) => /products\.html(?:$|#)/.test(link.getAttribute('href') || ''));
  const productsItem = productsLink?.closest('li') || productsLink;
  if (productsItem && productsItem !== categoryItem) productsItem.before(categoryItem);
  else if (!categoryItem.parentElement) nav.append(categoryItem);

  const menu = categoryItem.querySelector('.category-menu');
  const toggle = categoryItem.querySelector('.category-menu-toggle');

  const isMobile = () => window.matchMedia('(max-width: 700px)').matches;

  const closeAllSubmenus = (exceptItem = null) => {
    menu.querySelectorAll('li.menu-open').forEach((item) => {
      if (item !== exceptItem) {
        item.classList.remove('menu-open');
        const btn = item.querySelector('.category-submenu-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  };

  const adjustMenuPosition = () => {
    if (isMobile()) {
      const rect = toggle.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const menuMaxHeight = viewportHeight - rect.bottom - 20;

      menu.style.top = (rect.bottom + 8) + 'px';
      menu.style.maxHeight = Math.max(200, menuMaxHeight) + 'px';
      menu.style.left = '12px';
      menu.style.right = '12px';
      menu.style.width = 'auto';
      return;
    }

    const rect = categoryItem.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const menuWidth = 260;
    const menuMaxHeight = Math.min(viewportHeight * 0.7, 520);

    const menuHeight = Math.min(menu.scrollHeight || menuMaxHeight, menuMaxHeight);
    let top = rect.bottom;
    if (top + menuHeight > viewportHeight - 20) {
      top = Math.max(20, rect.top - menuHeight);
    }
    menu.style.top = top + 'px';

    if (rect.left + menuWidth > viewportWidth - 20) {
      menu.style.left = 'auto';
      menu.style.right = Math.max(20, viewportWidth - rect.right) + 'px';
      menu.style.width = menuWidth + 'px';
    } else {
      menu.style.left = rect.left + 'px';
      menu.style.right = 'auto';
      menu.style.width = menuWidth + 'px';
    }
  };

  const adjustSubmenuFlip = (submenu, parentLi) => {
    if (isMobile()) {
      parentLi.classList.remove('flip-x');
      submenu.classList.remove('flip-x');
      submenu.style.removeProperty('left');
      submenu.style.removeProperty('right');
      submenu.style.removeProperty('top');
      return;
    }

    const liRect = parentLi.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const submenuWidth = 240;

    const submenuRightEdge = liRect.right + submenuWidth;

    if (submenuRightEdge > viewportWidth - 20) {
      parentLi.classList.add('flip-x');
      submenu.classList.add('flip-x');
      submenu.style.setProperty('left', 'auto', 'important');
      submenu.style.setProperty('right', Math.max(20, viewportWidth - liRect.left) + 'px', 'important');
    } else {
      parentLi.classList.remove('flip-x');
      submenu.classList.remove('flip-x');
      submenu.style.setProperty('left', liRect.right + 'px', 'important');
      submenu.style.setProperty('right', 'auto', 'important');
    }

    const viewportHeight = window.innerHeight;
    const submenuMaxHeight = Math.min(viewportHeight * 0.7, 520, viewportHeight - 40);
    const submenuHeight = Math.min(submenu.scrollHeight || 300, submenuMaxHeight);
    const submenuTop = Math.max(20, Math.min(liRect.top, viewportHeight - 20 - submenuHeight));
    submenu.style.setProperty('top', submenuTop + 'px', 'important');
  };

  const closeMenus = () => {
    document.querySelectorAll('.category-menu-item.menu-open, .category-menu > li.menu-open').forEach((item) => item.classList.remove('menu-open'));
    document.querySelectorAll('.category-menu-toggle').forEach((item) => item.setAttribute('aria-expanded', 'false'));
    menu.querySelectorAll('.category-submenu-toggle').forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
  };

  fetch(dataPath)
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories || {};
      const printing = categories.printing;
      const printingProducts = printing?.subcategories?.products?.products || [];
      if (printing && !printing.subcategories['vinyl-cutter-machine']) {
        printing.subcategories['vinyl-cutter-machine'] = {
          name: 'Vinyl Cutter Machine',
          url: 'vinyl-cutter-machine.html',
          products: printingProducts.filter((product) => /vinyl/i.test(product.name))
        };
      }
      Object.entries(categories).forEach(([key, category]) => {
        const item = document.createElement('li');
        const directory = key === 'cleaning' ? 'cleaning-equipment' : key === 'general' ? 'general-equipment' : key;

        // Row: name link + submenu toggle
        const row = document.createElement('div');
        row.className = 'category-row';

        const link = document.createElement('a');
        link.href = `${rootPath}categories/${directory}.html`;
        link.className = 'category-name';
        link.textContent = category.name || key;

        const submenuToggle = document.createElement('button');
        submenuToggle.type = 'button';
        submenuToggle.className = 'category-submenu-toggle';
        submenuToggle.setAttribute('aria-expanded', 'false');
        submenuToggle.setAttribute('aria-label', `Toggle ${category.name || key} subcategories`);
        submenuToggle.innerHTML = '<span class="submenu-arrow" aria-hidden="true"></span>';

        row.append(link, submenuToggle);
        item.append(row);

        const subcategories = document.createElement('ul');
        subcategories.className = 'category-submenu';
        Object.entries(category.subcategories || {}).filter(([subKey]) => subKey !== 'products').forEach(([subKey, subcategory]) => {
          const subItem = document.createElement('li');
          const subLink = document.createElement('a');
          const filename = subcategory.url || subcategoryFiles[key]?.[subKey] || `${subKey}.html`;
          subLink.href = `${rootPath}categories/${directory}/${filename}`;
          subLink.textContent = subcategory.name || subKey;
          subItem.append(subLink);
          subcategories.append(subItem);
        });
        item.append(subcategories);

        // Desktop: hover opens submenu
        item.addEventListener('mouseenter', () => {
          if (isMobile()) return;
          closeAllSubmenus(item);
          adjustSubmenuFlip(subcategories, item);
          submenuToggle.setAttribute('aria-expanded', 'true');
        });
        item.addEventListener('mouseleave', () => {
          if (isMobile()) return;
          item.classList.remove('menu-open');
          submenuToggle.setAttribute('aria-expanded', 'false');
        });
        item.addEventListener('focusin', () => {
          if (isMobile()) return;
          closeAllSubmenus(item);
          adjustSubmenuFlip(subcategories, item);
          submenuToggle.setAttribute('aria-expanded', 'true');
        });
        item.addEventListener('focusout', (event) => {
          if (isMobile() || item.contains(event.relatedTarget)) return;
          item.classList.remove('menu-open');
          submenuToggle.setAttribute('aria-expanded', 'false');
        });

        // Toggle button: click opens/closes submenu only (does not navigate)
        submenuToggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = item.classList.contains('menu-open');
          if (isOpen) {
            item.classList.remove('menu-open');
            submenuToggle.setAttribute('aria-expanded', 'false');
          } else {
            closeAllSubmenus(item);
            item.classList.add('menu-open');
            adjustSubmenuFlip(subcategories, item);
            submenuToggle.setAttribute('aria-expanded', 'true');
          }
        });

        menu.append(item);
      });
    })
    .catch((error) => console.error('Unable to load categories menu:', error));

  // Main "Categories" tab toggle - click opens or closes the entire menu
  toggle.addEventListener('click', (event) => {
    if (!isMobile()) return;
    event.preventDefault();
    event.stopPropagation();
    const isOpen = categoryItem.classList.contains('menu-open');
    // Always close submenus first
    closeAllSubmenus();
    if (isOpen) {
      // Close the whole menu
      categoryItem.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      // Open the menu
      adjustMenuPosition();
      categoryItem.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  categoryItem.addEventListener('mouseenter', () => {
    if (isMobile()) return;
    adjustMenuPosition();
    categoryItem.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
  });
  categoryItem.addEventListener('mouseleave', () => {
    if (isMobile()) return;
    closeMenus();
  });
  categoryItem.addEventListener('focusin', () => {
    if (isMobile()) return;
    adjustMenuPosition();
    categoryItem.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
  });
  categoryItem.addEventListener('focusout', (event) => {
    if (isMobile() || categoryItem.contains(event.relatedTarget)) return;
    closeMenus();
  });

  // Close when clicking outside
  document.addEventListener('click', (event) => {
    if (!categoryItem.contains(event.target)) closeMenus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenus();
  });
  window.addEventListener('resize', () => {
    if (categoryItem.classList.contains('menu-open')) {
      adjustMenuPosition();
    }
  });
  window.addEventListener('scroll', () => {
    if (categoryItem.classList.contains('menu-open') && isMobile()) {
      adjustMenuPosition();
    }
  }, { passive: true });
})();