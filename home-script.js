// تهيئة الصفحة عند تحميل المستند
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من وجود بيانات المنتجات
    if (typeof products === 'undefined' || !Array.isArray(products) || products.length === 0) {
        console.error('Products data is not available or empty');
        document.getElementById('products-grid').innerHTML = '<div class="no-results">لا توجد منتجات متاحة حاليًا</div>';
        return;
    }
    
    // إضافة تأثير انتقالي لشريط التنقل الثابت
    const navBar = document.querySelector('.nav-bar');
    if (navBar) {
        navBar.style.transition = 'transform 0.3s ease';
    }

    // تهيئة الفلاتر وعرض المنتجات وإعداد مستمعي الأحداث
    initializeFilters();
    displayProducts(products);
    setupEventListeners();
    
    // التمرير إلى أعلى الصفحة
    window.scrollTo(0, 0);

    // التحقق من وجود معلمات URL للتصفية المسبقة
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // تعيين الفئة الافتراضية إذا كانت محددة في URL
    if (categoryParam) {
        const navCategoryFilter = document.querySelector('.nav-bar #categoryFilter');
        const mainCategoryFilter = document.querySelector('.filter-section #categoryFilter');
        
        if (navCategoryFilter) navCategoryFilter.value = categoryParam;
        if (mainCategoryFilter) mainCategoryFilter.value = categoryParam;
        
        // تطبيق التصفية بناءً على الفئة المحددة في URL
        filterProducts();
    }
});

// تحسين تهيئة الفلاتر لضمان تزامن القائمتين المنسدلتين
function initializeFilters() {
    const categoryFilterNav = document.querySelector('.nav-bar #categoryFilter');
    const categoryFilterMain = document.querySelector('.filter-section #categoryFilter');
    
    // التحقق من وجود عناصر القائمة المنسدلة
    const filtersToUpdate = [categoryFilterNav, categoryFilterMain].filter(filter => filter);
    
    // استخراج الفئات الفريدة من المنتجات
    const categories = [...new Set(products.map(product => product.category))];
    
    // إضافة الفئات إلى كل قائمة منسدلة موجودة
    filtersToUpdate.forEach(filterElement => {
        // التأكد من وجود عنصر الفلتر قبل إضافة الخيارات
        if (filterElement) {
            // حفظ الخيار الأول (الكل)
            const allOption = filterElement.querySelector('option[value="all"]');
            // مسح القائمة الحالية
            filterElement.innerHTML = '';
            // إعادة إضافة خيار "الكل"
            if (allOption) {
                filterElement.appendChild(allOption);
            } else {
                const defaultOption = document.createElement('option');
                defaultOption.value = 'all';
                defaultOption.textContent = 'كل المنتجات';
                filterElement.appendChild(defaultOption);
            }
            
            // إضافة باقي الفئات
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                filterElement.appendChild(option);
            });
            
            // إضافة مستمع حدث مباشر للتأكد من عمله
            filterElement.addEventListener('change', function() {
                console.log('تم اختيار الفئة:', this.value);
                filterProducts();
            });
        }
    });
}

// تحسين تحميل الصور لشاشات الهواتف
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('products-grid');
    
    // مسح المحتوى السابق
    productsGrid.innerHTML = '';
    
    // إذا لم توجد منتجات للعرض
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="no-results">لا توجد منتجات مطابقة لعملية البحث</div>';
        return;
    }
    
    // كشف عرض الشاشة للتحسين
    const isMobile = window.innerWidth <= 768;
    
    // عرض المنتجات
    productsToShow.forEach(product => {
        // إنشاء بطاقة المنتج
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // تنسيق الأسعار والخصم
        const currentPrice = `${product.currentPrice} درهم`;
        const oldPrice = `${product.oldPrice} درهم`;
        const discount = `-${product.discount}%`;
        
        // إضافة HTML لبطاقة المنتج مع تحسين الصور للهواتف
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.title}" loading="lazy" 
                    width="${isMobile ? '150' : '250'}" height="${isMobile ? '150' : '200'}">
                <div class="discount-badge">${discount}</div>
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-category">${product.category}</div>
                <div class="product-price">
                    <div class="current-price">${currentPrice}</div>
                    <div class="old-price">${oldPrice}</div>
                </div>
                <a href="index.html?product=${product.id}" class="cta-button">عرض المنتج</a>
            </div>
        `;
        
        // إضافة بطاقة المنتج إلى الشبكة
        productsGrid.appendChild(productCard);
    });
}

// تحديث وظيفة تصفية المنتجات للتعامل مع حالة عدم وجود القوائم المنسدلة الثانوية
function filterProducts() {
    // البحث عن قيم التصفية من كلا القائمتين
    const navCategoryFilter = document.querySelector('.nav-bar #categoryFilter');
    const navSearchInput = document.querySelector('.nav-bar #searchInput');
    
    const mainCategoryFilter = document.querySelector('.filter-section #categoryFilter');
    const mainSearchInput = document.querySelector('.filter-section #searchInput');
    
    // تحديد القيم المستخدمة في التصفية (من أي قائمة متوفرة)
    const category = navCategoryFilter?.value || mainCategoryFilter?.value || 'all';
    const searchQuery = (navSearchInput?.value || mainSearchInput?.value || '').toLowerCase().trim();
    
    console.log('تصفية حسب الفئة:', category);
    console.log('تصفية حسب البحث:', searchQuery);
    
    // تطبيق الفلاتر على نسخة من المنتجات
    let filteredProducts = [...products];
    
    // فلترة حسب الفئة
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
        console.log(`تم العثور على ${filteredProducts.length} منتج في الفئة ${category}`);
    }
    
    // فلترة حسب البحث
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => {
            return (
                (product.title && product.title.toLowerCase().includes(searchQuery)) ||
                (product.brand && product.brand.toLowerCase().includes(searchQuery)) ||
                (product.category && product.category.toLowerCase().includes(searchQuery))
            );
        });
    }
    
    // عرض المنتجات بعد التصفية
    displayProducts(filteredProducts);
    
    // تحديث حالة القوائم المنسدلة للتأكد من تزامنها
    updateFilterSelections(category, searchQuery);
}

// دالة جديدة لتحديث حالة القوائم المنسدلة بشكل متزامن
function updateFilterSelections(category, searchQuery) {
    const navCategoryFilter = document.querySelector('.nav-bar #categoryFilter');
    const navSearchInput = document.querySelector('.nav-bar #searchInput');
    
    const mainCategoryFilter = document.querySelector('.filter-section #categoryFilter');
    const mainSearchInput = document.querySelector('.filter-section #searchInput');
    
    // تحديث حالة قوائم الفئات
    if (navCategoryFilter && category) {
        navCategoryFilter.value = category;
    }
    
    if (mainCategoryFilter && category) {
        mainCategoryFilter.value = category;
    }
    
    // تحديث حالة حقول البحث
    if (navSearchInput && searchQuery) {
        navSearchInput.value = searchQuery;
    }
    
    if (mainSearchInput && searchQuery) {
        mainSearchInput.value = searchQuery;
    }
}

// تحديث وظيفة setupEventListeners لتشمل قائمة التصفية الثابتة
function setupEventListeners() {
    // إعداد مستمعات الأحداث للقائمة الثابتة
    const navCategoryFilter = document.querySelector('.nav-bar #categoryFilter');
    const navSearchInput = document.querySelector('.nav-bar #searchInput');
    const navSearchButton = document.querySelector('.nav-bar #searchButton');

    // إعداد مستمعات الأحداث للقائمة الرئيسية
    const mainCategoryFilter = document.querySelector('.filter-section #categoryFilter');
    const mainSearchInput = document.querySelector('.filter-section #searchInput');
    const mainSearchButton = document.querySelector('.filter-section #searchButton');

    // دالة لتزامن قيم الفلاتر المتشابهة
    function syncFilterValues(sourceElement, targetElement, eventType) {
        if (sourceElement && targetElement) {
            sourceElement.addEventListener(eventType, function() {
                targetElement.value = sourceElement.value;
                filterProducts();
            });
        }
    }

    // تزامن الفلاتر بين القائمتين
    if (navCategoryFilter && mainCategoryFilter) {
        syncFilterValues(navCategoryFilter, mainCategoryFilter, 'change');
        syncFilterValues(mainCategoryFilter, navCategoryFilter, 'change');
    }
    
    if (navSearchInput && mainSearchInput) {
        syncFilterValues(navSearchInput, mainSearchInput, 'input');
        syncFilterValues(mainSearchInput, navSearchInput, 'input');
    }

    // إضافة مستمعات الأحداث لأزرار البحث
    [navSearchButton, mainSearchButton].forEach(button => {
        if (button) {
            button.addEventListener('click', filterProducts);
        }
    });

    // إضافة مستمع لأحداث ضغط Enter في أي من مربعات البحث
    [navSearchInput, mainSearchInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    filterProducts();
                    event.preventDefault();
                }
            });
        }
    });

    // تحسين التفاعل على الأجهزة اللمسية
    if ('ontouchstart' in window) {
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }

    // الاستجابة لتغيير حجم النافذة
    window.addEventListener('resize', function() {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function() {
            filterProducts();
        }, 300);
    });
    
    // أضف مستمع للتمرير لإظهار/إخفاء شريط التصفية عند التمرير
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navBar = document.querySelector('.nav-bar');
        if (!navBar) return;
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // إظهار/إخفاء الشريط حسب اتجاه التمرير
        if (currentScrollTop > lastScrollTop && currentScrollTop > 200) {
            // التمرير للأسفل - إخفاء الشريط
            navBar.style.transform = 'translateY(-100%)';
        } else {
            // التمرير للأعلى - إظهار الشريط
            navBar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScrollTop;
    });

    // إضافة مستمعات أحداث مباشرة للقوائم المنسدلة
    if (navCategoryFilter) {
        navCategoryFilter.addEventListener('change', function() {
            console.log('تم تغيير فئة القائمة العلوية:', this.value);
            // تحديث قيمة القائمة الأخرى إذا كانت موجودة
            if (mainCategoryFilter) mainCategoryFilter.value = this.value;
            filterProducts();
        });
    }

    if (mainCategoryFilter) {
        mainCategoryFilter.addEventListener('change', function() {
            console.log('تم تغيير فئة القائمة الرئيسية:', this.value);
            // تحديث قيمة القائمة الأخرى إذا كانت موجودة
            if (navCategoryFilter) navCategoryFilter.value = this.value;
            filterProducts();
        });
    }

    // إضافة مستمعات أحداث لحقول البحث
    function handleSearchInput(e) {
        const otherInput = e.currentTarget === navSearchInput ? mainSearchInput : navSearchInput;
        if (otherInput) otherInput.value = e.currentTarget.value;
    }

    if (navSearchInput) {
        navSearchInput.addEventListener('input', handleSearchInput);
        navSearchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                filterProducts();
                event.preventDefault();
            }
        });
    }

    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', handleSearchInput);
        mainSearchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                filterProducts();
                event.preventDefault();
            }
        });
    }

    // إضافة مستمعات الأحداث لأزرار البحث
    if (navSearchButton) {
        navSearchButton.addEventListener('click', filterProducts);
    }

    if (mainSearchButton) {
        mainSearchButton.addEventListener('click', filterProducts);
    }
}

// الانتقال السلس إلى أعلى الصفحة
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
});
