function updateProductMeta(product) {
  const baseUrl = 'https://jouet-maroc.com/';
  const productUrl = `${baseUrl}?product=${product.id}`;
  const imageUrl = (product.images && product.images.length > 0) ? baseUrl + product.images[0] : baseUrl + 'default-image.webp';

  // تحديث العنوان - مع إضافة اسم المتجر بأسلوب ثابت
  document.title = `${product.title} | Jouet Maroc - متجر ألعاب المغرب`;

  // تحديث الوصف - استخدام وصف المنتج بدلاً من الضمان مع تحسينه
  const descriptionContent = product.description || 
    `${product.title} - ${product.brand}. ${product.warranty || ""} تسوق الآن من Jouet Maroc بأفضل سعر ${product.currentPrice} درهم.`;

  updateMetaTag('meta[name="description"]', 'content', descriptionContent);
  
  // تحديث الكلمات المفتاحية
  const keywordsContent = `${product.title}, ${product.brand}, ${product.category}, ألعاب، تسوق، المغرب، خصم`;
  updateMetaTag('meta[name="keywords"]', 'content', keywordsContent);
  
  // تحديث علامات Open Graph مع إضافة النوع والرابط
  updateMetaTag('meta[property="og:title"]', 'content', product.title + " | Jouet Maroc");
  updateMetaTag('meta[property="og:description"]', 'content', descriptionContent);
  updateMetaTag('meta[property="og:image"]', 'content', imageUrl);
  updateMetaTag('meta[property="og:type"]', 'content', 'product');
  updateMetaTag('meta[property="og:url"]', 'content', productUrl);
  updateMetaTag('meta[property="og:site_name"]', 'content', 'Jouet Maroc');
  
  // تحديث علامات Twitter
  updateMetaTag('meta[name="twitter:title"]', 'content', product.title + " | Jouet Maroc");
  updateMetaTag('meta[name="twitter:description"]', 'content', descriptionContent);
  updateMetaTag('meta[name="twitter:image"]', 'content', imageUrl);
  
  // تحديث الرابط المرجعي (canonical)
  updateCanonicalLink(productUrl);
  
  // إضافة بيانات منظمة Schema.org للمنتج (JSON-LD)
  addProductStructuredData(product, productUrl, imageUrl);
}

// دالة لتحديث الرابط المرجعي
function updateCanonicalLink(url) {
  let canonicalLink = document.querySelector("link[rel='canonical']");
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', url);
}

// دالة لإضافة بيانات منظمة للمنتج
function addProductStructuredData(product, productUrl, imageUrl) {
  // إزالة أي بيانات منظمة سابقة
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // إنشاء بيانات منظمة جديدة
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": imageUrl,
    "description": product.description || product.warranty || "",
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "MAD",
      "price": product.currentPrice,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": product.availability === "متوفر في المخزون" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };
  
  // إذا كان هناك تقييمات، أضفها إلى البيانات المنظمة
  if (product.ratings && product.reviewCount) {
    structuredData.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": product.ratings,
      "reviewCount": product.reviewCount
    };
  }
  
  // إضافة البيانات المنظمة إلى الصفحة
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

function loadProductFromURL() {
  try {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('product');
    
    if (!productId) {
      productId = "trottinette-Tank-m41"; // منتج افتراضي
    }
    
    const product = products.find(p => p.id === productId);
    const productData = product || products[0]; 
    
    if (!productData) {
      console.error("No product data available");
      return;
    }
    
    updateProductMeta(productData);
    
    cleanupEventHandlers();
    updateProductDisplay(productData);
    updateRelatedProducts();
    
    setTimeout(() => {
      setupAccordion();
      setupThumbnailScrolling();
      setupProductLinks();
    }, 50);
  } catch (error) {
    console.error("Error loading product:", error);
  }
}


const CATEGORIES_CONFIG = {
    'electric-bikes': {
        id: 'electric-bikes',
        displayName: 'الدراجات الكهربائية',
        databaseName: 'دراجات كهربائية',
        icon: 'fa-bicycle'
    },
    'scooters': {
        id: 'scooters',
        displayName: 'التروتينات',
        databaseName: 'تروتينات',
        icon: 'bi-scooter'
    },
    'bikes': {
        id: 'bikes',
        displayName: 'الدراجات الهوائية',
        databaseName: 'دراجات هوائية',
        icon: 'fa-bicycle'
    },
    'electric-cars': {
        id: 'electric-cars',
        displayName: 'السيارات الكهربائية',
        databaseName: 'سيارات كهربائية',
        icon: 'fa-car'
    },
    'moteur-cross': {
        id: 'moteur-cross',
        displayName: 'Cross',
        databaseName: 'moteur-cross',
        icon: 'fa-motorcycle'
    },
    'siege-auto': {
        id: 'siege-auto',
        displayName: 'Siège auto',
        databaseName: 'Siege auto',
        icon: 'fa-chair'
    },
    'trampoline': {
        id: 'trampoline',
        displayName: 'ترامبولين',
        databaseName: 'ترامبولين',
        icon: 'fa-baseball-ball'
    },
    'drift-360': {
        id: 'drift-360',
        displayName: 'Drift 360°',
        databaseName: 'Drift 360°',
        icon: 'fa-sync-alt'
    }
   
};






function getAllCategories() {
    return Object.values(CATEGORIES_CONFIG);
}

function getCategoryConfig(categoryId) {
    return CATEGORIES_CONFIG[categoryId] || null;
}

function getCategoryTitle(categoryId) {
    const category = getCategoryConfig(categoryId);
    return category ? category.displayName : 'منتجات الفئة';
}

function getCategoryName(categoryId) {
    const category = getCategoryConfig(categoryId);
    return category ? category.databaseName : '';
}

function getCategoryProducts(categoryId) {
    const category = getCategoryConfig(categoryId);
    return category ? filterProductsByCategory(category.databaseName) : [];
}

function filterProductsByCategory(categoryName) {
    if (!window.products) return [];
    return window.products.filter(product => product.category === categoryName);
}

function showCategoryProducts(categoryId) {
    const categoryPopup = document.getElementById('category-popup');
    const popupCategoryTitle = document.getElementById('popup-category-title');
    const popupProducts = document.getElementById('popup-products');
    const overlay = document.getElementById('overlay');
    
    popupCategoryTitle.textContent = getCategoryTitle(categoryId);
    
    popupProducts.innerHTML = '';
    
    const categoryProducts = getCategoryProducts(categoryId);
    
    if (categoryProducts.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.className = 'no-products-message';
        noProductsMessage.textContent = 'لا توجد منتجات في هذه الفئة حالياً';
        popupProducts.appendChild(noProductsMessage);
    } else {
        categoryProducts.forEach(product => {
            const productEl = createProductElement(product);
            popupProducts.appendChild(productEl);
        });
    }
    
    categoryPopup.classList.add('show');
    overlay.classList.add('show');
    
    document.body.style.overflow = 'hidden';
}

function renderCategoryElements() {
    const sidebarCategoriesList = document.querySelector('.sidebar-categories');
    if (sidebarCategoriesList) {
        sidebarCategoriesList.innerHTML = '';
        getAllCategories().forEach(category => {
            const li = document.createElement('li');
            li.className = 'sidebar-category';
            li.setAttribute('data-category', category.id);
            li.innerHTML = `
                <i class="fas ${category.icon}"></i>
                <span>${category.displayName}</span>
            `;
            sidebarCategoriesList.appendChild(li);
        });
    }
    
    const desktopCategoriesList = document.querySelector('.desktop-categories ul');
    if (desktopCategoriesList) {
        desktopCategoriesList.innerHTML = '';
        getAllCategories().forEach(category => {
            const li = document.createElement('li');
            li.className = 'desktop-category';
            li.setAttribute('data-category', category.id);
            li.innerHTML = `
                <i class="fas ${category.icon}"></i>
                <span>${category.displayName}</span>
            `;
            desktopCategoriesList.appendChild(li);
        });
    }
    
    setupCategoryEvents();
}

function setupCategoryEvents() {
    document.querySelectorAll('.sidebar-category').forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            document.getElementById('sidebar-menu').classList.remove('open');
            showCategoryProducts(categoryId);
        });
    });
    
    document.querySelectorAll('.desktop-category').forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            showCategoryProducts(categoryId);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    renderCategoryElements();
    
});



function getProductUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const productParam = urlParams.get('product');
  if (productParam) {
    return `https://jouet-maroc.com/?product=${productParam}`;
  }
  return window.location.href;
}

function getProductTitle() {
  const titleElement = document.querySelector('.product-title');
  if (titleElement && titleElement.textContent.trim() !== '') {
    return titleElement.textContent.trim();
  }
  return "شوف هاد المنتوج";
}

function updateShareLinks() {
  const productUrl = encodeURIComponent(getProductUrl());
  const productTitle = encodeURIComponent(getProductTitle());

 document.getElementById("whatsapp-btn").href = `https://api.whatsapp.com/send?text=${productTitle}%20${productUrl}`;
document.getElementById("facebook-btn").href = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`;
document.getElementById("twitter-btn").href = `https://twitter.com/intent/tweet?text=${productTitle}&url=${productUrl}`;
document.getElementById("telegram-btn").href = `https://t.me/share/url?url=${productUrl}&text=${productTitle}`;
document.getElementById("linkedin-btn").href = `https://www.linkedin.com/sharing/share-offsite/?url=${productUrl}`;

}

window.onload = function() {
  updateShareLinks();
};

document.querySelectorAll('.share-btn').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    updateShareLinks();

    const href = this.href;
    window.open(href, '_blank');
  });
});

