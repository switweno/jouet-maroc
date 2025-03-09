// وظائف أساسية للصفحة
// تحسين وظيفة تغيير الصور مع إضافة تأثيرات انتقالية متقدمة
function changeImage(src) {
    const mainImageContainer = document.querySelector('.main-image');
    const currentImage = document.getElementById('current-image');
    const currentSrc = currentImage.src;
    
    // تفادي التغيير إذا كانت نفس الصورة
    if (currentSrc === src) return;
    
    // تحديد اتجاه الانتقال (إلى اليمين أو اليسار)
    // نستخدم الفهارس في مصفوفة الصور المصغرة لتحديد الاتجاه
    const allThumbnails = Array.from(document.querySelectorAll('.thumbnail'));
    const oldIndex = allThumbnails.findIndex(img => img.src === currentSrc);
    const newIndex = allThumbnails.findIndex(img => img.src === src);
    
    // تحديد اتجاه الانتقال بناءً على الفهارس
    const direction = newIndex > oldIndex ? 'left' : 'right';
    
    // إنشاء مؤشر الانتقال
    const slideIndicator = document.createElement('div');
    slideIndicator.className = 'slide-indicator';
    mainImageContainer.appendChild(slideIndicator);
    
    // تنشيط مؤشر الانتقال
    setTimeout(() => {
        slideIndicator.classList.add('active');
    }, 10);
    
    // إنشاء عنصر الصورة الجديدة للانتقال الجديد
    const newImage = document.createElement('img');
    newImage.src = src;
    newImage.alt = currentImage.alt;
    newImage.style.position = 'absolute';
    newImage.style.top = '0';
    newImage.style.left = '0';
    newImage.style.width = '100%';
    newImage.style.height = '100%';
    newImage.style.objectFit = 'contain';
    newImage.classList.add('image-shadow');
    
    // حفظ مرجع للصورة الحالية
    const oldImage = currentImage;
    
    // إضافة تأثير الخروج للصورة الحالية
    if (direction === 'left') {
        oldImage.classList.add('image-exit-left');
        newImage.classList.add('image-enter-right');
    } else {
        oldImage.classList.add('image-exit-right');
        newImage.classList.add('image-enter-left');
    }
    
    // إضافة الصورة الجديدة للحاوية
    mainImageContainer.appendChild(newImage);
    
    // تأخير لضمان تحميل الصورة ثم تطبيق التأثيرات
    setTimeout(() => {
        // بعد انتهاء التأثير، نقوم بتحديث الصورة الرئيسية وإزالة الصورة المؤقتة
        currentImage.src = src;
        currentImage.classList.remove('image-exit-right', 'image-exit-left');
        
        // تحديث الصورة المصغرة النشطة
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            // إزالة الصنف النشط من جميع الصور المصغرة
            thumb.classList.remove('active');
            
            // تحديث الصورة المصغرة النشطة
            if (thumb.src === src) {
                thumb.classList.add('active');
                thumb.classList.add('thumbnail-pulse');
                
                // تمرير الصورة المصغرة النشطة لتكون مرئية
                setTimeout(() => {
                    try {
                        thumb.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'center'  
                        });
                    } catch (e) {
                        console.error('Error scrolling to thumbnail:', e);
                    }
                }, 100);
                
                // إزالة تأثير النبض بعد انتهائه
                setTimeout(() => {
                    thumb.classList.remove('thumbnail-pulse');
                }, 500);
            }
        });
        
        // تتبع تغيير الصورة في Facebook Pixel
        if (typeof fbq === 'function') {
            fbq('track', 'ViewContent');
        }
        
        // إزالة الصورة المؤقتة والمؤشر بعد انتهاء الانتقال
        setTimeout(() => {
            mainImageContainer.removeChild(newImage);
            mainImageContainer.removeChild(slideIndicator);
        }, 500);
        
    }, 300);
}

// Quantity selector functionality
function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    
    currentValue += change;
    
    // Ensure quantity is within valid range (1-10)
    if (currentValue < 1) currentValue = 1;
    if (currentValue > 10) currentValue = 10;
    
    quantityInput.value = currentValue;
}

// Scroll to order form
function scrollToForm() {
    const formElement = document.getElementById('order-section');
    formElement.scrollIntoView({ behavior: 'smooth' });
    
    // Track event in Facebook Pixel
    if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout');
    }
}

// Form submission via WhatsApp with confirmation
function submitFormViaWhatsApp(event) {
    event.preventDefault();
    
    try {
        // Get form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const quantity = document.getElementById('quantity').value;
        
        // Fix: Properly define paymentMethod variable
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        // Form validation
        if (!name || !phone || !address || !city) {
            alert("الرجاء ملء جميع الحقول المطلوبة");
            return;
        }
        
        // Phone validation - ensure it contains only numbers
        if (!/^\d+$/.test(phone.replace(/\s+/g, ''))) {
            alert("رقم الهاتف يجب أن يحتوي على أرقام فقط");
            return;
        }
        
        // Get product information
        const productName = document.querySelector('.product-title').textContent;
        const price = document.querySelector('.current-price').textContent;
        const priceValue = parseFloat(price);
        const totalPrice = parseInt(quantity) * priceValue;
        const productImage = document.getElementById('current-image').src;
        
        // Populate confirmation modal
        document.getElementById('summary-product-image').src = productImage;
        document.getElementById('summary-product-name').textContent = productName;
        document.getElementById('summary-product-price').textContent = price;
        document.getElementById('summary-product-quantity').textContent = quantity;
        document.getElementById('summary-total-price').textContent = totalPrice + " درهم";
        
        document.getElementById('summary-customer-name').textContent = name;
        document.getElementById('summary-customer-phone').textContent = phone;
        document.getElementById('summary-customer-address').textContent = address;
        document.getElementById('summary-customer-city').textContent = city;
        document.getElementById('summary-payment-method').textContent = paymentMethod === 'cod' ? 'الدفع عند الاستلام' : paymentMethod;
        
        // Show confirmation modal
        const confirmationModal = document.getElementById('confirmation-modal');
        confirmationModal.style.display = 'block';
        
        // Prevent scrolling on background
        document.body.style.overflow = 'hidden';
        
        // Setup confirmation button
        document.getElementById('confirm-order-btn').onclick = function() {
            try {
                // Create WhatsApp message with form data
                const message = encodeURIComponent(
                    `*طلب جديد*\n\n` +
                    `*معلومات العميل:*\n` +
                    `الاسم: ${name}\n` +
                    `رقم الهاتف: ${phone}\n` +
                    `العنوان: ${address}\n` +
                    `المدينة: ${city}\n` +
                    `طريقة الدفع: ${paymentMethod === 'cod' ? 'الدفع عند الاستلام' : paymentMethod}\n\n` +
                    `*تفاصيل الطلب:*\n` +
                    `المنتج: ${productName}\n` +
                    `الكمية: ${quantity}\n` +
                    `السعر: ${price}\n` +
                    `المجموع: ${totalPrice} درهم`
                );
                
                // Track event in Facebook Pixel
                if (typeof fbq === 'function') {
                    fbq('track', 'Purchase', {
                        value: priceValue,
                        currency: 'MAD',
                        content_name: productName,
                        content_type: 'product',
                        content_ids: ['PROD12345'],
                        contents: [
                            {
                                id: 'PROD12345',
                                quantity: parseInt(quantity),
                                item_price: priceValue
                            }
                        ]
                    });
                }
                
                // Close confirmation modal
                closeConfirmationModal();
                
                // Fix: Properly format WhatsApp phone number
                window.open(`https://wa.me/212762609147?text=${message}`, '_blank');
                
                // Reset form
                document.getElementById('order-form').reset();
            } catch (error) {
                console.error("Error sending WhatsApp message:", error);
                alert("حدث خطأ أثناء محاولة الاتصال بواتساب. يرجى المحاولة مرة أخرى.");
            }
        };
        
        // Setup cancel button
        document.getElementById('cancel-order-btn').onclick = function() {
            closeConfirmationModal();
        };
        
        // Close when clicking outside
        confirmationModal.onclick = function(event) {
            if (event.target === confirmationModal) {
                closeConfirmationModal();
            }
        };
    } catch (error) {
        console.error("Error in form submission:", error);
        alert("حدث خطأ أثناء معالجة النموذج. يرجى المحاولة مرة أخرى.");
    }
}

// Close confirmation modal
function closeConfirmationModal() {
    document.getElementById('confirmation-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add ESC key to close confirmation modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeConfirmationModal();
    }
});

// Form submission
function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const quantity = document.getElementById('quantity').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Here you would normally send this data to your server
    // This is just a demonstration
    alert(`شكرا ${name}!\nتم استلام طلبك بنجاح.\nسنتواصل معك قريبًا على الرقم ${phone} لتأكيد الطلب.`);
    
    // Track purchase event in Facebook Pixel
    if (typeof fbq === 'function') {
        fbq('track', 'Purchase', {
            value: parseFloat(document.querySelector('.current-price').textContent),
            currency: 'MAD',
            content_name: document.querySelector('.product-title').textContent,
            content_type: 'product',
            content_ids: ['PROD12345'],
            contents: [
                {
                    id: 'PROD12345',
                    quantity: parseInt(quantity),
                    item_price: parseFloat(document.querySelector('.current-price').textContent)
                }
            ]
        });
    }
    
    // Reset form
    document.getElementById('order-form').reset();
}

// وظائف معرض الصور ومعالجتها
// Global variables for image navigation
let zoomLevel = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;
let currentImageIndex = 0;
let allImages = [];

// Open image modal with improved navigation
function openImageModal() {
    const modal = document.getElementById('image-modal');
    const currentImage = document.getElementById('current-image');
    const modalImage = document.getElementById('modal-image');
    
    // Collect all product images
    allImages = [];
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        allImages.push(thumbnail.src);
    });
    
    // Add the main image if it's not one of the thumbnails
    if (!allImages.includes(currentImage.src)) {
        allImages.unshift(currentImage.src);
    }
    
    // Find current image index
    currentImageIndex = allImages.indexOf(currentImage.src);
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    // Set the modal image source to the current product image
    modalImage.src = currentImage.src;
    
    // Reset zoom and position
    resetZoom();
    
    // Display the modal
    modal.style.display = 'block';
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Track event in Facebook Pixel
    if (typeof fbq === 'function') {
        fbq('track', 'ViewContent', {
            content_type: 'product_image',
            content_ids: ['PROD12345']
        });
    }
}

// Navigate between images in modal
function navigateImages(direction) {
    // Calculate new index
    currentImageIndex += direction;
    
    // Loop around if needed
    if (currentImageIndex < 0) currentImageIndex = allImages.length - 1;
    if (currentImageIndex >= allImages.length) currentImageIndex = 0;
    
    // Update modal image
    const modalImage = document.getElementById('modal-image');
    modalImage.src = allImages[currentImageIndex];
    
    // Reset zoom when changing images
    resetZoom();
}

// Close image modal
function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Change zoom level
function changeZoom(amount) {
    zoomLevel += amount;
    
    // Limit zoom level
    if (zoomLevel < 0.5) zoomLevel = 0.5;
    if (zoomLevel > 3) zoomLevel = 3;
    
    updateImageTransform();
}

// Reset zoom level and position
function resetZoom() {
    zoomLevel = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
}

// Update image transform
function updateImageTransform() {
    const modalImage = document.getElementById('modal-image');
    if (modalImage) {
        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
    }
}

// Image drag functions
function startDrag(e) {
    e.preventDefault();
    
    isDragging = true;
    
    // Get mouse or touch position
    if (e.type === 'mousedown') {
        startX = e.clientX;
        startY = e.clientY;
    } else if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    let currentX, currentY;
    
    // Get current position
    if (e.type === 'mousemove') {
        currentX = e.clientX;
        currentY = e.clientY;
    } else if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
    }
    
    // Calculate movement - reduce sensitivity on mobile
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    
    // Apply different sensitivity for mobile
    const isMobile = window.innerWidth <= 767;
    const sensitivity = isMobile ? 0.8 : 1;
    
    // Update position
    translateX += deltaX * sensitivity;
    translateY += deltaY * sensitivity;
    
    // Update transform
    updateImageTransform();
    
    // Reset start position
    startX = currentX;
    startY = currentY;
}

function endDrag() {
    isDragging = false;
}

// وظائف التمرير والتنقل بين المنتجات
// ضبط موضع التمرير بشكل دقيق
function forceScrollToTop() {
    // استخدام طرق متعددة لضمان تطبيق الأفضل حسب المتصفح
    if (window.scrollTo) {
        window.scrollTo(0, 0);
    }
    if (document.documentElement) {
        document.documentElement.scrollTop = 0;
    }
    if (document.body) {
        document.body.scrollTop = 0;
    }
}

// معالجة روابط المنتجات
function setupProductLinks() {
    document.querySelectorAll('.related-products .product-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const productId = new URLSearchParams(href.split('?')[1]).get('product');
            
            if (productId) {
                // تحديث عنوان URL
                history.pushState({}, '', `?product=${productId}`);
                
                // التمرير للأعلى بشكل سلس
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                
                // إضافة تأخير لتحميل المنتج بعد اكتمال التمرير
                setTimeout(() => {
                    loadProductFromURL();
                }, 400);
            }
        });
    });
}

// وظائف واجهة المستخدم
function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        const toggleBtn = header.querySelector('.accordion-toggle');
        const category = header.parentElement;
        const isExpanded = category.classList.contains('expanded');
        
        toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        
        header.addEventListener('click', function() {
            const category = this.parentElement;
            const isExpanded = category.classList.contains('expanded');
            const toggleBtn = this.querySelector('.accordion-toggle');
            
            document.querySelectorAll('.feature-category.expanded').forEach(expandedCategory => {
                if (expandedCategory !== category || !isExpanded) {
                    expandedCategory.classList.remove('expanded');
                    
                    const otherBtn = expandedCategory.querySelector('.accordion-toggle');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });
            
            category.classList.toggle('expanded');
            toggleBtn.setAttribute('aria-expanded', category.classList.contains('expanded') ? 'true' : 'false');
        });
    });
}

// إضافة متغير لتتبع ما إذا كان هذا هو التحميل الأول للصفحة
let firstLoad = true;

// تحسين دالة تهيئة التمرير للصور المصغرة للسماح بالتمرير العمودي والأفقي معاً
function setupThumbnailScrolling() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    if (!thumbnailsContainer) return;
    
    // تعيين خصائص التمرير بشكل يسمح بالتمرير المزدوج (أفقي وعمودي)
    thumbnailsContainer.style.overflowX = 'auto';
    thumbnailsContainer.style.webkitOverflowScrolling = 'touch';
    
    // تعيين touchAction للسماح بكل أنواع التمرير (بما في ذلك العمودي)
    thumbnailsContainer.style.touchAction = 'pan-x pan-y';
    
    // إزالة معالجات الأحداث القديمة
    thumbnailsContainer.onmouseenter = null;
    thumbnailsContainer.onmouseleave = null;
    thumbnailsContainer.onmousemove = null;
    
    // استخدام معالج يحدد اتجاه التمرير المقصود
    let startX, startY, isScrollingHorizontally = false;
    let touchStartTime = 0;
    
    // إضافة معالج لبداية اللمس لتحديد الاتجاه
    thumbnailsContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrollingHorizontally = false; // إعادة ضبط متغير تتبع الاتجاه
        touchStartTime = Date.now();
    }, { passive: true });
    
    // تتبع اتجاه التمرير وتحديد ما إذا كان أفقياً أو عمودياً
    thumbnailsContainer.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        
        // تحديد فيما إذا كان التمرير أفقياً أو عمودياً
        if (!isScrollingHorizontally && Date.now() - touchStartTime > 100) {
            isScrollingHorizontally = deltaX > deltaY;
            
            // إذا كان التمرير أفقياً، نمنع التمرير العمودي للصفحة
            if (isScrollingHorizontally && Math.abs(deltaX) > 10) {
                // منع السلوك الافتراضي فقط إذا كان التمرير أفقياً بشكل واضح
                e.preventDefault();
            }
        }
    }, { passive: false }); // أزلنا passive: true للسماح بـ preventDefault عند الضرورة
    
    // إعادة ضبط متغيرات التتبع عند انتهاء اللمس
    thumbnailsContainer.addEventListener('touchend', function() {
        startX = null;
        startY = null;
    }, { passive: true });
    
    // تحريك الصورة المصغرة النشطة إلى المنتصف إذا لم يكن هذا التحميل الأول
    const activeThumb = document.querySelector('.thumbnail.active');
    if (activeThumb && !firstLoad) {
        requestAnimationFrame(() => {
            try {
                activeThumb.scrollIntoView({ 
                    behavior: 'auto',
                    block: 'nearest',
                    inline: 'center'  
                });
            } catch (e) {
                console.error('Error scrolling thumbnail into view:', e);
            }
        });
    }
    
    // تحديث متغير firstLoad ليكون false بعد التحميل الأول
    firstLoad = false;
}

// معالجة تحميل المنتج
// تحسين دالة تحميل المنتج من URL للتحقق من وجود بيانات المنتجات
function loadProductFromURL() {
    try {
        console.log("🔄 جاري تحميل المنتج من URL...");
        
        // التمرير إلى أعلى الصفحة قبل البدء بتحميل المنتج
        window.scrollTo(0, 0);
        
        const urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get('product');
        
        // التحقق من وجود معرف منتج في العنوان
        if (!productId) {
            console.log("ℹ️ لا يوجد معرف منتج في URL، سيتم استخدام المنتج الافتراضي");
            productId = "velo-electrique-harley-u9"; // المنتج الافتراضي
        }
        
        // التحقق من وجود بيانات المنتجات
        if (!Array.isArray(products) || products.length === 0) {
            console.error("❌ بيانات المنتجات غير متاحة أو فارغة");
            
            // عرض رسالة خطأ في واجهة المستخدم
            document.querySelector('.product-details').innerHTML = `
                <div class="error-message" style="text-align: center; padding: 30px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #E74C3C; margin-bottom: 20px;"></i>
                    <h2>عذراً، لا يمكن تحميل بيانات المنتج</h2>
                    <p>يرجى تحديث الصفحة والمحاولة مرة أخرى</p>
                </div>
            `;
            return;
        }
        
        // البحث عن المنتج بواسطة المعرف
        const product = products.find(p => p.id === productId);
        
        // استخدام المنتج الأول كاحتياطي إذا لم يتم العثور على المنتج المطلوب
        const productData = product || products[0];
        
        if (!productData) {
            console.error("❌ لا توجد بيانات للمنتج");
            return;
        }
        
        // تحديث عنوان الصفحة
        document.title = productData.title + " | jouet maroc";
        
        // تحديث واجهة المنتج وتنظيف معالجات الأحداث القديمة
        cleanupEventHandlers();
        updateProductDisplay(productData);
        
        // تأكيد استدعاء وظيفة تحديث المنتجات ذات الصلة
        console.log("📋 جاري استدعاء updateRelatedProducts()");
        updateRelatedProducts(); // استدعاء دالة تحديث المنتجات ذات الصلة
        
        // تأخير تهيئة العناصر التفاعلية لمنع التداخل
        setTimeout(() => {
            setupAccordion();
            setupThumbnailScrolling();
            setupProductLinks();
        }, 50);
        
        // إضافة التمرير للأعلى مرة أخرى في نهاية تحميل المنتج
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
        }, 100);
        
        console.log("✅ تم تحميل المنتج بنجاح:", productData.title);
        
    } catch (error) {
        console.error("❌ خطأ في تحميل المنتج:", error);
    }
}

// دالة جديدة لتنظيف معالجات الأحداث قبل تحميل منتج جديد
// تحسين آلية تنظيف معالجات الأحداث
function cleanupEventHandlers() {
    // تحسين: معالجة مجموعات متعددة من العناصر مرة واحدة
    const elements = document.querySelectorAll('.thumbnail, .product-link');
    elements.forEach(el => {
        const newEl = el.cloneNode(true);
        if (el.parentNode) {
            el.parentNode.replaceChild(newEl, el);
        }
    });
}

// تحسين دالة تحديث المنتج لتحسين طريقة التعامل مع الصور المصغرة
function updateProductDisplay(product) {
    // Update product title and details
    document.querySelector('.product-title').textContent = product.title;
    document.querySelector('.product-brand').textContent = "العلامة التجارية: " + product.brand;
    document.querySelector('.product-category').textContent = "الفئة: " + product.category;
    document.querySelector('.product-availability').textContent = product.availability;
    
    // Update ratings
    const ratingsContainer = document.querySelector('.ratings');
    // Clear existing stars first
    ratingsContainer.innerHTML = '';
    
    // Add full stars
    const fullStars = Math.floor(product.ratings);
    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star');
        ratingsContainer.appendChild(star);
    }
    
    // Add half star if needed
    if (product.ratings % 1 >= 0.5) {
        const halfStar = document.createElement('i');
        halfStar.classList.add('fas', 'fa-star-half-alt');
        ratingsContainer.appendChild(halfStar);
    }
    
    // Add review count
    const reviewSpan = document.createElement('span');
    reviewSpan.textContent = `(${product.reviewCount} تقييم)`;
    ratingsContainer.appendChild(reviewSpan);
    
    // Update price
    document.querySelector('.current-price').textContent = product.currentPrice + " درهم";
    document.querySelector('.old-price').textContent = product.oldPrice + " درهم";
    document.querySelector('.discount').textContent = "-" + product.discount + "%";
    
    // Update images
    const mainImage = document.getElementById('current-image');
    mainImage.src = product.images[0]; // Set first image as main image
    
    // تحديث الصور المصغرة بأسلوب يمنع تداخل الأحداث
    const thumbnailsContainer = document.getElementById('thumbnails-slider');
    thumbnailsContainer.innerHTML = ''; // مسح الصور المصغرة القديمة
    
    // إنشاء الصور المصغرة الجديدة مع معالجات أحداث نظيفة
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.classList.add('thumbnail');
        if (index === 0) thumbnail.classList.add('active');
        thumbnail.src = image;
        thumbnail.alt = `صورة مصغرة ${index + 1}`;
        
        // استخدام خاصية onclick بدلاً من addEventListener لمنع التكرار
        thumbnail.onclick = function() { changeImage(this.src); };
        
        // إضافة خصائص CSS لتحسين تجربة استخدام المؤشر واللمس
        thumbnail.style.cursor = 'pointer';
        thumbnail.style.pointerEvents = 'auto';
        thumbnail.style.touchAction = 'manipulation'; // السماح للمتصفح بتحديد أفضل سلوك لمس
        thumbnail.draggable = false; // منع السحب الافتراضي للصور
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Update features
    const featuresContainer = document.querySelector('.features-container');
    // Save warranty element
    const warrantyDiv = document.querySelector('.feature-highlight').cloneNode(true);
    featuresContainer.innerHTML = '';
    
    // Add features from product data
    product.features.forEach((feature, index) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('feature-category');
        if (index === 0) categoryDiv.classList.add('expanded'); // Expand first feature by default
        
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('accordion-header', 'french-heading');
        
        const heading = document.createElement('h4');
        heading.innerHTML = `<i class="fas ${feature.icon}"></i> ${feature.title}`;
        
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('accordion-toggle');
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        toggleBtn.setAttribute('aria-label', `توسيع قسم ${feature.title}`);
        toggleBtn.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
        
        headerDiv.appendChild(heading);
        headerDiv.appendChild(toggleBtn);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('accordion-content');
        
        const ul = document.createElement('ul');
        ul.classList.add('feature-list');
        
        feature.items.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('feature-item');
            li.innerHTML = `<strong>${item.key}:</strong> ${item.value}`;
            ul.appendChild(li);
        });
        
        contentDiv.appendChild(ul);
        categoryDiv.appendChild(headerDiv);
        categoryDiv.appendChild(contentDiv);
        featuresContainer.appendChild(categoryDiv);
    });
    
    // Add warranty information back
    featuresContainer.appendChild(warrantyDiv);
    document.querySelector('.feature-highlight span').textContent = product.warranty;
    
    // Update video URL if available
    if (product.videoURL) {
        const videoContainer = document.querySelector('.video-container');
        
        // إعادة كتابة كاملة لمعالجة الفيديو
        if (product.id === "trottinette-bison-gt-1000") {
            // تطبيق فئة الفيديو العمودي
            videoContainer.classList.add('portrait-video');
            
            // استخدام innerHTML لضمان تحميل الإطار بشكل صحيح
            videoContainer.innerHTML = `<iframe 
                src="${product.videoURL}" 
                width="267" 
                height="476" 
                style="border:none;overflow:hidden" 
                scrolling="no" 
                frameborder="0" 
                allowfullscreen="true" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                allowFullScreen="true">
            </iframe>`;
        } else {
            // إزالة فئة الفيديو العمودي إذا وُجدت
            videoContainer.classList.remove('portrait-video');
            
            // استخدام innerHTML للفيديوهات الأفقية أيضًا
            videoContainer.innerHTML = `<iframe 
                src="${product.videoURL}" 
                width="560" 
                height="314" 
                style="border:none;overflow:hidden" 
                title="فيديو المنتج" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                allowfullscreen="true">
            </iframe>`;
        }
    }
}

// اضافة معالج لأحداث النقر على روابط المنتجات ذات معلمات URL
function setupProductLinks() {
    document.querySelectorAll('.product-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // تخزين معلمات الرابط في sessionStorage
            const productId = new URLSearchParams(this.href.split('?')[1]).get('product');
            if (productId) {
                sessionStorage.setItem('scrollPosition', window.pageYOffset);
            }
        });
    });
}

// تحسين دالة معالجة روابط المنتجات لتوفير تجربة تنقل سلسة إلى أعلى الصفحة
function setupProductLinks() {
    document.querySelectorAll('.related-products .product-link').forEach(link => {
        // إزالة معالجات الأحداث القديمة
        link.onclick = null;
        
        // إضافة معالج حدث جديد نظيف
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // تخزين معرف المنتج
            const href = this.getAttribute('href');
            const productId = new URLSearchParams(href.split('?')[1]).get('product');
            
            if (productId) {
                // تحديث عنوان الصفحة بمعرف المنتج الجديد
                history.pushState({}, '', `?product=${productId}`);
                
                // أولاً: التمرير إلى الأعلى بشكل فوري قبل تحميل المنتج
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto' // استخدام 'auto' بدلاً من 'smooth' للتمرير الفوري
                });
                
                // ثانياً: إضافة فترة انتظار قصيرة قبل تحميل المنتج الجديد
                setTimeout(() => {
                    loadProductFromURL();
                    
                    // تأكيد إضافي للتمرير إلى الأعلى بعد التحميل
                    window.scrollTo(0, 0);
                }, 10);
            }
        });
    });
}

// تحسين دالة معالجة روابط المنتجات لتوفير تجربة تنقل سلسة إلى أعلى الصفحة
function setupProductLinks() {
    document.querySelectorAll('.related-products .product-link').forEach(link => {
        // إزالة معالجات الأحداث القديمة
        link.onclick = null;
        
        // إضافة معالج حدث جديد نظيف
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // منع انتشار الحدث
            
            // إيقاف جميع التفاعلات المؤقتة
            document.body.style.pointerEvents = 'none';
            
            const href = this.getAttribute('href');
            const productId = new URLSearchParams(href.split('?')[1]).get('product');
            
            if (productId) {
                history.pushState({}, '', `?product=${productId}`);
                
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    loadProductFromURL();
                    // استعادة التفاعلات بعد اكتمال التحميل
                    document.body.style.pointerEvents = 'auto';
                }, 400);
            } else {
                document.body.style.pointerEvents = 'auto';
            }
        }, { once: true }); // استخدام {once: true} لمنع تسجيل الحدث مرات متعددة
        
        // تحسين تجربة المؤشر على الروابط
        link.style.cursor = 'pointer';
        link.style.webkitTapHighlightColor = 'transparent';
    });
}

// تحسين المعالج الرئيسي بإضافة مراقبة للتغييرات في الـ URL
document.addEventListener('DOMContentLoaded', function() {
    try {
        // ضمان أننا في أعلى الصفحة عند تحميلها لأول مرة - استخدام حل فوري
        window.scrollTo(0, 0);
        
        // إضافة تمرير إضافي بعد تحميل المستند لضمان عرض الصفحة من الأعلى تمامًا
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
        }, 10);
        
        // تأكيد إضافي بعد تحميل الصفحة بالكامل
        window.addEventListener('load', function() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
        });
        
        // Load product data based on URL parameter
        loadProductFromURL();
        
        // Set up product links if any
        setupProductLinks();
        
        // باقي الكود كما هو
        // Set the first thumbnail as active
        if (document.querySelector('.thumbnail')) {
            document.querySelector('.thumbnail').classList.add('active');
        }
        
        // Add image dragging functionality for the modal image
        const modalImage = document.getElementById('modal-image');
        if (modalImage) {
            modalImage.addEventListener('mousedown', startDrag);
            modalImage.addEventListener('touchstart', startDrag, { passive: false });
            
            window.addEventListener('mousemove', drag);
            window.addEventListener('touchmove', drag, { passive: false });
            
            window.addEventListener('mouseup', endDrag);
            window.addEventListener('touchend', endDrag);
        }
        
        // Close modal when clicking outside the image
        const modal = document.getElementById('image-modal');
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeImageModal();
                }
            });
        }
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeImageModal();
            }
        }); 
        
        // Add double tap to zoom on mobile
        let lastTap = 0;
        if (modalImage) {
            modalImage.addEventListener('touchend', function(e) {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                
                if (tapLength < 300 && tapLength > 0) {
                    // Double tap detected
                    if (zoomLevel === 1) {
                        changeZoom(1); // Zoom in
                    } else {
                        resetZoom(); // Reset zoom
                    }
                    e.preventDefault();
                }
                
                lastTap = currentTime;
            });
        }
        
        // Add keyboard navigation for images
        document.addEventListener('keydown', function(event) {
            const modal = document.getElementById('image-modal');
            
            // Only process keyboard input when modal is open
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowLeft') {
                    navigateImages(-1);
                    event.preventDefault();
                } else if (event.key === 'ArrowRight') {
                    navigateImages(1);
                    event.preventDefault();
                }
            }
        });
        
        // Initialize accordion after updating content
        setupAccordion();
        
        // Add this new function to ensure thumbnail scrolling works
        setupThumbnailScrolling();
        
        // Check if images loaded correctly
        document.querySelectorAll('img').forEach(img => {
            img.onerror = function() {
                this.src = 'placeholder.jpg'; // Fallback image
            };
        });
        
        // استعادة موضع التمرير إذا كان المستخدم يعود عبر رابط منتج
        if (sessionStorage.getItem('scrollPosition')) {
            window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition')));
            sessionStorage.removeItem('scrollPosition');
        }
        
        // مراقبة التغييرات في عنوان URL لتحميل المنتجات المناسبة
        window.addEventListener('popstate', function() {
            // التمرير للأعلى بطريقة سلسة
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            
            // إضافة تأخير قصير قبل تحميل المنتج الجديد
            setTimeout(() => {
                loadProductFromURL();
            }, 400);
        });
        
    } catch (error) {
        console.error("Error initializing page:", error);
    }
});

// إضافة دالة جديدة لتحديث معلومات المنتجات ذات الصلة
function updateRelatedProducts() {
    console.log("🔄 تحديث المنتجات ذات الصلة...");
    
    try {
        // الحصول على حاوية المنتجات ذات الصلة
        const relatedGrid = document.getElementById('related-products-grid');
        if (!relatedGrid) {
            console.error("❌ لم يتم العثور على عنصر 'related-products-grid'");
            return;
        }
        
        // مسح المحتوى السابق
        relatedGrid.innerHTML = '';
        
        // الحصول على المنتج الحالي
        const urlParams = new URLSearchParams(window.location.search);
        const currentProductId = urlParams.get('product');
        
        // التحقق من وجود بيانات المنتجات
        if (!Array.isArray(products) || products.length === 0) {
            console.error("❌ مصفوفة المنتجات غير متاحة أو فارغة");
            relatedGrid.innerHTML = '<div class="no-results">لا توجد منتجات ذات صلة متاحة</div>';
            return;
        }
        
        console.log(`📊 إجمالي المنتجات المتاحة: ${products.length}`);
        
        // استراتيجية جديدة: عرض جميع المنتجات باستثناء المنتج الحالي
        const relatedProducts = products.filter(p => p.id !== currentProductId);
        
        console.log(`📊 عدد المنتجات للعرض: ${relatedProducts.length}`);
        
        // التأكد من عرض القسم
        const relatedSection = document.querySelector('.related-products');
        if (relatedSection) {
            relatedSection.style.display = 'block';
        }
        
        // عرض 4 منتجات فقط (أو أقل إذا كان العدد المتاح أقل)
        const maxProductsToShow = 4;
        const displayProducts = relatedProducts.slice(0, maxProductsToShow);
        
        console.log(`✓ عرض ${displayProducts.length} منتج في قسم منتجات أخرى قد تعجبك`);
        
        // إذا لم تكن هناك منتجات للعرض (نادر جداً)
        if (displayProducts.length === 0) {
            relatedGrid.innerHTML = '<div class="no-results">لا توجد منتجات أخرى متاحة</div>';
            return;
        }
        
        // إضافة المنتجات إلى الشبكة مع تحسين هيكل HTML للصور
        displayProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'related-product';
            
            // استخدام هيكل HTML محسن مع حاوية الصورة للنسب المتناسقة
            productElement.innerHTML = `
                <a href="index.html?product=${product.id}" class="product-link">
                    <div class="image-container">
                        <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                        <div class="related-discount-badge">-${product.discount}%</div>
                    </div>
                    <h3>${product.title}</h3>
                    <div class="related-price-container">
                        <div class="related-price">${product.currentPrice} درهم</div>
                        <div class="related-old-price">${product.oldPrice} درهم</div>
                    </div>
                </a>
            `;
            
            relatedGrid.appendChild(productElement);
        });
        
        // إعادة تهيئة الأحداث للروابط الجديدة
        setupProductLinks();
        
        console.log("✅ تم تحديث المنتجات ذات الصلة بنجاح");
        
    } catch (error) {
        console.error("❌ خطأ في تحديث المنتجات ذات الصلة:", error);
        // عرض خطأ واضح للمستخدم في حالة فشل تحميل المنتجات
        const relatedGrid = document.getElementById('related-products-grid');
        if (relatedGrid) {
            relatedGrid.innerHTML = `<div class="no-results">عذراً، حدث خطأ أثناء تحميل المنتجات ذات الصلة</div>`;
        }
    }
}

// تحسين مشكلة التمرير عند تحميل الصفحة
function forceScrollToTop() {
    // استخدام الأسلوب المباشر فقط دون تعطيل وظائف التمرير الأخرى
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

// تحسين المعالج الرئيسي لتجنب تداخل عمليات التمرير
document.addEventListener('DOMContentLoaded', function() {
    try {
        // إرجاع إعدادات التمرير التلقائي إلى الوضع الافتراضي
        if (history.scrollRestoration) {
            history.scrollRestoration = 'auto';
        }
        
        // استخدام التمرير المباشر مرة واحدة فقط
        forceScrollToTop();
        
        // Load product data based on URL parameter
        loadProductFromURL();
        
        // Set up product links
        setupProductLinks();
        
        // باقي الكود كما هو
        // Set the first thumbnail as active
        if (document.querySelector('.thumbnail')) {
            document.querySelector('.thumbnail').classList.add('active');
        }
        
        // Add image dragging functionality for the modal image
        const modalImage = document.getElementById('modal-image');
        if (modalImage) {
            modalImage.addEventListener('mousedown', startDrag);
            modalImage.addEventListener('touchstart', startDrag, { passive: false });
            
            window.addEventListener('mousemove', drag);
            window.addEventListener('touchmove', drag, { passive: false });
            
            window.addEventListener('mouseup', endDrag);
            window.addEventListener('touchend', endDrag);
        }
        
        // Close modal when clicking outside the image
        const modal = document.getElementById('image-modal');
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeImageModal();
                }
            });
        }
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeImageModal();
            }
        });
        
        // Add double tap to zoom on mobile
        let lastTap = 0;
        if (modalImage) {
            modalImage.addEventListener('touchend', function(e) {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                
                if (tapLength < 300 && tapLength > 0) {
                    // Double tap detected
                    if (zoomLevel === 1) {
                        changeZoom(1); // Zoom in
                    } else {
                        resetZoom(); // Reset zoom
                    }
                    e.preventDefault();
                }
                
                lastTap = currentTime;
            });
        }
        
        // Add keyboard navigation for images
        document.addEventListener('keydown', function(event) {
            const modal = document.getElementById('image-modal');
            
            // Only process keyboard input when modal is open
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowLeft') {
                    navigateImages(-1);
                    event.preventDefault();
                } else if (event.key === 'ArrowRight') {
                    navigateImages(1);
                    event.preventDefault();
                }
            }
        });
        
        // Initialize accordion after updating content
        setupAccordion();
        
        // Add this new function to ensure thumbnail scrolling works
        setupThumbnailScrolling();
        
        // Check if images loaded correctly
        document.querySelectorAll('img').forEach(img => {
            img.onerror = function() {
                this.src = 'placeholder.jpg'; // Fallback image
            };
        });
        
        // استعادة موضع التمرير إذا كان المستخدم يعود عبر رابط منتج
        if (sessionStorage.getItem('scrollPosition')) {
            window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition')));
            sessionStorage.removeItem('scrollPosition');
        }
        
        // مراقبة التغييرات في عنوان URL لتحميل المنتجات المناسبة
        window.addEventListener('popstate', function() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            
            // إضافة تأخير قصير قبل تحميل المنتج الجديد
            setTimeout(() => {
                loadProductFromURL();
            }, 400);
        });
        
    } catch (error) {
        console.error("Error initializing page:", error);
    }
});

// تحسين دالة تحديث المنتجات ذات الصلة
function updateRelatedProducts() {
    console.log("🔄 تحديث المنتجات ذات الصلة...");
    
    try {
        // الحصول على حاوية المنتجات ذات الصلة
        const relatedGrid = document.getElementById('related-products-grid');
        if (!relatedGrid) {
            console.log("⚠️ لم يتم العثور على حاوية المنتجات ذات الصلة");
            return;
        }
        
        // مسح المحتوى السابق
        relatedGrid.innerHTML = '';
        
        // الحصول على المنتج الحالي
        const urlParams = new URLSearchParams(window.location.search);
        const currentProductId = urlParams.get('product');
        
        // التحقق من وجود بيانات المنتجات
        if (!Array.isArray(products) || products.length === 0) {
            console.error("❌ بيانات المنتجات غير متاحة أو فارغة");
            return;
        }
        
        // استراتيجية جديدة: عرض جميع المنتجات باستثناء المنتج الحالي
        const relatedProducts = products.filter(p => p.id !== currentProductId);
        
        // التأكد من عرض القسم
        const relatedSection = document.querySelector('.related-products');
        if (relatedSection) {
            relatedSection.style.display = relatedProducts.length ? 'block' : 'none';
        }
        
        // عرض 4 منتجات فقط (أو أقل إذا كان العدد المتاح أقل)
        const maxProductsToShow = 4;
        const displayProducts = relatedProducts.slice(0, maxProductsToShow);
        
        // إذا لم تكن هناك منتجات للعرض
        if (displayProducts.length === 0) {
            relatedGrid.innerHTML = '<div class="no-results">لا توجد منتجات أخرى متاحة حاليًا</div>';
            return;
        }
        
        // إضافة المنتجات إلى الشبكة مع تحسين هيكل HTML للصور
        displayProducts.forEach(product => {
            // إنشاء عنصر البطاقة
            const productCard = document.createElement('div');
            productCard.className = 'related-product-card';
            
            // تنسيق الأسعار والخصم
            const currentPrice = `${product.currentPrice} درهم`;
            const oldPrice = `${product.oldPrice} درهم`;
            const discount = `-${product.discount}%`;
            
            // استخدام هيكل HTML محسن لتناسب جميع أحجام الصور
            productCard.innerHTML = `
                <div class="related-product-image">
                    <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                    <div class="related-product-discount">${discount}</div>
                </div>
                <div class="related-product-details">
                    <div>
                        <h3 class="related-product-title">${product.title}</h3>
                        <div class="related-product-category">${product.category}</div>
                    </div>
                    <div>
                        <div class="related-product-price">
                            <div class="related-current-price">${currentPrice}</div>
                            <div class="related-old-price">${oldPrice}</div>
                        </div>
                        <a href="index.html?product=${product.id}" class="related-cta-button" data-product-id="${product.id}">عرض المنتج</a>
                    </div>
                </div>
            `;
            
            relatedGrid.appendChild(productCard);
        });
        
        // تطبيق استراتيجية lazy loading لتحسين الأداء
        const relatedImages = relatedGrid.querySelectorAll('img');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src') || img.src;
                        observer.unobserve(img);
                    }
                });
            });
            
            relatedImages.forEach(img => {
                if (!img.hasAttribute('data-src') && img.src) {
                    img.setAttribute('data-src', img.src);
                }
                imageObserver.observe(img);
            });
        }
        
        // إعادة تهيئة الأحداث للروابط الجديدة
        setupProductLinks();
        
    } catch (error) {
        console.error("❌ خطأ في تحديث المنتجات ذات الصلة:", error);
        const relatedGrid = document.getElementById('related-products-grid');
        if (relatedGrid) {
            relatedGrid.innerHTML = '<div class="error-message">حدث خطأ أثناء تحميل المنتجات</div>';
        }
    }
}
