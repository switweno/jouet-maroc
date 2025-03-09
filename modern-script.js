// تهيئة الصفحة عند تحميل المستند
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من وجود بيانات المنتجات
    if (typeof products === 'undefined' || !Array.isArray(products) || products.length === 0) {
        document.getElementById('products-grid').innerHTML = '<div class="no-results">لا توجد منتجات متاحة حاليًا</div>';
        return;
    }

    // تهيئة سلايدر المنتجات المميزة
    initializeFeaturedSlider();

    // تهيئة الفلاتر
    initializeFilters();
    
    // عرض المنتجات
    displayProducts(products);
    
    // تهيئة مستمعات الأحداث
    setupEventListeners();
});

// دالة جديدة لتهيئة سلايدر المنتجات المميزة - تحسين انتقال الشرائح
function initializeFeaturedSlider() {
    const sliderTrack = document.getElementById('featured-slider-track');
    const sliderIndicators = document.getElementById('slider-indicators');
    
    if (!sliderTrack || !sliderIndicators) return;
    
    // اختيار أفضل 5 منتجات للعرض في السلايدر (بناءً على نسبة الخصم الأعلى)
    const featuredProducts = [...products]
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 5);
    
    // إنشاء شرائح للمنتجات المميزة
    featuredProducts.forEach((product, index) => {
        // إنشاء الشريحة
        const slide = document.createElement('div');
        slide.className = 'slider-slide';
        
        // إنشاء محتوى الشريحة مع تحسين عرض الصور
        slide.innerHTML = `
            <div class="slide-content">
                <div class="slide-image">
                    <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                    <span class="slide-discount">-${product.discount}%</span>
                </div>
                <div class="slide-details">
                    <h3 class="slide-title">${product.title}</h3>
                    <div class="slide-category">${product.category}</div>
                    <div class="slide-price">
                        <div class="slide-current-price">${product.currentPrice} درهم</div>
                        <div class="slide-old-price">${product.oldPrice} درهم</div>
                    </div>
                    <a href="index.html?product=${product.id}" class="slide-button">عرض المنتج</a>
                </div>
            </div>
        `;
        
        // إضافة الشريحة إلى المسار
        sliderTrack.appendChild(slide);
        
        // إنشاء مؤشر للشريحة
        const indicator = document.createElement('span');
        indicator.className = `indicator${index === 0 ? ' active' : ''}`;
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        
        // إضافة المؤشر إلى حاوية المؤشرات
        sliderIndicators.appendChild(indicator);
    });
    
    // تهيئة متغيرات السلايدر
    let currentSlide = 0;
    const slidesCount = featuredProducts.length;
    let slideInterval;
    
    // إعداد أزرار التنقل
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }
    
    // دالة للانتقال إلى شريحة محددة - تصحيح الانتقال للعرض الكامل
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = slidesCount - 1;
        } else if (slideIndex >= slidesCount) {
            slideIndex = 0;
        }
        
        currentSlide = slideIndex;
        
        // تحديث موضع المسار بشكل صحيح للعرض الكامل
        // استخدام القيمة السالبة للانتقال الصحيح في اتجاه LTR داخل حاوية السلايدر
        sliderTrack.style.transform = `translateX(${-currentSlide * 100}%)`;
        
        // تحديث المؤشرات النشطة
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // إعادة ضبط المؤقت عند النقر اليدوي
        resetSlideInterval();
    }
    
    // دالة لبدء التنقل التلقائي
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 4000); // زيادة وقت العرض لكل شريحة إلى 4 ثواني
    }
    
    // دالة لإعادة ضبط المؤقت
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // بدء التنقل التلقائي بعد تأخير قصير لضمان تحميل الصفحة بشكل كامل
    setTimeout(() => {
        startSlideInterval();
    }, 500);
    
    // إيقاف التنقل التلقائي عند تمرير الماوس فوق السلايدر واستئنافه عند الخروج
    const featuredSlider = document.querySelector('.featured-slider');
    if (featuredSlider) {
        featuredSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        featuredSlider.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
        
        // إيقاف التنقل التلقائي عند اللمس على الأجهزة اللمسية
        featuredSlider.addEventListener('touchstart', () => {
            clearInterval(slideInterval);
        }, { passive: true });
        
        featuredSlider.addEventListener('touchend', () => {
            startSlideInterval();
        }, { passive: true });
    }
    
    // تنفيذ الانتقال الأولي يدويًا للتأكد من ظهور الشريحة الأولى بشكل كامل
    goToSlide(0);
}

// تهيئة الفلاتر مع استخراج الفئات من المنتجات
function initializeFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (!categoryFilter) return;
    
    // استخراج الفئات الفريدة
    const categories = [...new Set(products.map(product => product.category))];
    
    // إضافة خيار الكل
    const defaultOption = document.createElement('option');
    defaultOption.value = 'all';
    defaultOption.textContent = 'كل المنتجات';
    categoryFilter.appendChild(defaultOption);
    
    // إضافة باقي الفئات
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// تحسين وظيفة عرض المنتجات للتعامل بشكل أفضل مع مختلف أحجام الشاشات
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('products-grid');
    
    // مسح المحتوى السابق
    productsGrid.innerHTML = '';
    
    // التحقق من وجود منتجات للعرض
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="no-results">لا توجد منتجات مطابقة لعملية البحث</div>';
        return;
    }
    
    console.log(`عرض ${productsToShow.length} منتج`);
    
    // إزالة التكرار من المنتجات باستخدام معرفات المنتجات
    const uniqueProductIds = new Set();
    const uniqueProducts = productsToShow.filter(product => {
        if (!uniqueProductIds.has(product.id)) {
            uniqueProductIds.add(product.id);
            return true;
        }
        return false;
    });
    
    console.log(`عرض ${uniqueProducts.length} منتج فريد بعد إزالة التكرار`);
    
    // عرض المنتجات الفريدة فقط
    uniqueProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // تنسيق الأسعار والخصم
        const currentPrice = `${product.currentPrice} درهم`;
        const oldPrice = `${product.oldPrice} درهم`;
        const discount = `-${product.discount}%`;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                <div class="discount-badge">${discount}</div>
            </div>
            <div class="product-details">
                <div>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-category">${product.category}</div>
                </div>
                <div>
                    <div class="product-price">
                        <div class="current-price">${currentPrice}</div>
                        <div class="old-price">${oldPrice}</div>
                    </div>
                    <a href="index.html?product=${product.id}" class="cta-button">عرض المنتج</a>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
        
        // تطبيق الحجم المناسب للصورة بعد تحميلها
        const img = productCard.querySelector('.product-image img');
        img.onload = function() {
            const imgRatio = this.naturalHeight / this.naturalWidth;
            // إذا كانت نسبة العرض إلى الارتفاع مختلفة بشكل كبير عن 4:3
            if (Math.abs(imgRatio - (4/3)) > 0.2) {
                this.style.objectPosition = 'center center';
            }
        };
    });
    
    // تطبيق تأثير الظهور المتدرج للمنتجات
    applyProductsAnimation();
}

// وظيفة جديدة لإضافة تأثيرات حركية متوافقة مع جميع المتصفحات
function applyProductsAnimation() {
    // التحقق من دعم المتصفح للتحريكات
    const supportsAnimation = typeof document.createElement('div').animate === 'function';
    
    if (supportsAnimation) {
        // تطبيق تأثير الظهور المتدرج على المنتجات
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // تأخير مختلف لكل منتج
            setTimeout(() => {
                card.animate(
                    [
                        { opacity: 0, transform: 'translateY(20px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], 
                    {
                        duration: 500,
                        easing: 'ease-out',
                        fill: 'forwards'
                    }
                );
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50 * index);
        });
    } else {
        // إذا لم يكن هناك دعم، عرض المنتجات مباشرة بدون تأثيرات
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '1';
        });
    }
}

// تعديل وظيفة تصفية المنتجات لتحديث العنوان أيضًا
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    
    // تحديث عنوان القسم بناءً على الفئة المختارة
    updateSectionTitle(category);
    
    // تطبيق الفلاتر
    let filteredProducts = [...products];
    
    // فلترة حسب الفئة
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // فلترة حسب البحث
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => {
            return (
                product.title.toLowerCase().includes(searchQuery) ||
                product.brand.toLowerCase().includes(searchQuery) ||
                product.category.toLowerCase().includes(searchQuery)
            );
        });
    }
    
    // عرض المنتجات بعد التصفية
    displayProducts(filteredProducts);
}

// إضافة وظيفة جديدة لتحديث عنوان القسم
function updateSectionTitle(category) {
    const sectionTitle = document.querySelector('.products-section h2');
    if (sectionTitle) {
        if (category === 'all') {
            sectionTitle.textContent = 'جميع المنتجات';
        } else {
            sectionTitle.textContent = category;
        }
        
        // إضافة تأثير بصري عند تغيير العنوان
        sectionTitle.classList.add('title-updated');
        setTimeout(() => {
            sectionTitle.classList.remove('title-updated');
        }, 500);
    }
}

// إعداد مستمعات الأحداث
function setupEventListeners() {
    // إضافة مستمع للقائمة المنسدلة
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // إضافة مستمع لزر البحث
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', filterProducts);
    }
    
    // إضافة مستمع لمدخل البحث عند الضغط على Enter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                filterProducts();
                event.preventDefault();
            }
        });
    }
    
    // استجابة لتغيير حجم النافذة
    window.addEventListener('resize', function() {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function() {
            const productsGrid = document.getElementById('products-grid');
            if (productsGrid && productsGrid.children.length > 0) {
                // إعادة ترتيب العناصر فقط دون إعادة تحميلها بالكامل
                adjustLayoutOnResize();
            }
        }, 300);
    });
}

// وظيفة جديدة لضبط تخطيط المنتجات عند تغيير حجم النافذة
function adjustLayoutOnResize() {
    // ضبط ارتفاع بطاقات المنتجات بشكل متناسق
    const productCards = document.querySelectorAll('.product-card');
    const productTitles = document.querySelectorAll('.product-title');
    
    // إعادة تعيين أي ارتفاعات مضبوطة مسبقًا
    productTitles.forEach(title => {
        title.style.height = 'auto';
    });
    
    productCards.forEach(card => {
        card.style.height = 'auto';
    });
    
    // السماح بإعادة تنسيق المتصفح قبل قياس الارتفاعات الجديدة
    requestAnimationFrame(() => {
        // المنع من التنفيذ على الشاشات الصغيرة حيث نريد تناسق عمودي فقط
        if (window.innerWidth >= 768) {
            // ضبط ارتفاع العناوين بشكل متناسق لكل صف
            equalizeHeights(productTitles);
        }
    });
}

// وظيفة مساعدة لضبط ارتفاعات عناصر متشابهة
function equalizeHeights(elements) {
    if (!elements.length) return;
    
    // إعادة تعيين الارتفاعات
    elements.forEach(el => {
        el.style.height = 'auto';
    });
    
    // حساب أقصى ارتفاع
    let maxHeight = 0;
    elements.forEach(el => {
        const height = el.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    
    // تطبيق الارتفاع الموحد
    if (maxHeight > 0) {
        elements.forEach(el => {
            el.style.height = maxHeight + 'px';
        });
    }
}
