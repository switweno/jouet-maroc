// تحميل مسبق للصور لتجنب الوميض
function preloadImages(images) {
    if (!images || !images.length) return;
    
    const preloadedImages = [];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
        preloadedImages.push(img);
    });
    
    return preloadedImages;
}

/**
 * تحسين دالة تغيير الصور مع حركات انتقالية مميزة
 * @param {string} src - مصدر الصورة الجديدة
 * @param {string} direction - الاتجاه (right, left) أو null للاكتشاف التلقائي
 */
function changeImage(src, direction = null) {
    if (!src) return;
    
    const currentImage = document.getElementById('current-image');
    if (!currentImage) return;
    
    // تحديد اتجاه الانتقال بناءً على موقع الصورة المصغرة
    if (!direction) {
        const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));
        const activeIndex = thumbnails.findIndex(thumb => thumb.classList.contains('active'));
        const newIndex = thumbnails.findIndex(thumb => thumb.src === src);
        
        if (activeIndex !== -1 && newIndex !== -1) {
            direction = newIndex > activeIndex ? 'right' : 'left';
        } else {
            direction = 'fade'; // الانتقال الافتراضي
        }
    }
    
    // تخزين مصدر الصورة الجديدة والتحميل المسبق لها
    const newImageSrc = src;
    const preloadImage = new Image();
    preloadImage.src = newImageSrc;
    
    // إزالة أي تأثيرات سابقة والبدء في تطبيق تأثير الخروج
    currentImage.classList.remove('image-slide-enter-from-right', 
                                'image-slide-enter-from-left', 
                                'image-slide-exit-right', 
                                'image-slide-exit-left');
    
    // 1. تطبيق تأثير الخروج المناسب
    if (direction === 'right') {
        currentImage.classList.add('image-slide-exit-left');
    } else if (direction === 'left') {
        currentImage.classList.add('image-slide-exit-right');
    } else {
        // تقليل الشفافية فقط للتلاشي
        currentImage.style.opacity = '0';
    }
    
    // 2. تحضير مؤشر الحمل للصورة الجديدة
    currentImage.style.pointerEvents = 'none'; // منع النقرات المتكررة أثناء التغيير
    
    // 3. بعد انتهاء تأثير الخروج، حمل الصورة الجديدة وطبق تأثير الدخول
    setTimeout(() => {
        // تغيير مصدر الصورة
        currentImage.src = newImageSrc;
        
        // إزالة تأثيرات الخروج
        currentImage.classList.remove('image-slide-exit-left', 'image-slide-exit-right');
        
        // تطبيق تأثير الدخول المناسب
        if (direction === 'right') {
            currentImage.classList.add('image-slide-enter-from-right');
        } else if (direction === 'left') {
            currentImage.classList.add('image-slide-enter-from-left');
        } else {
            // التلاشي البسيط للظهور
            currentImage.style.opacity = '1';
        }
        
        // إستعادة تفاعل المؤشر
        currentImage.style.pointerEvents = 'auto';
        
        // تحديث الصورة المصغرة النشطة
        updateActiveThumbnail(src);
        
        // إزالة تأثيرات الدخول بعد إكتمال الحركة
        setTimeout(() => {
            currentImage.classList.remove('image-slide-enter-from-right', 'image-slide-enter-from-left');
        }, 500); // توافق مع مدة التحولات في CSS
        
    }, 300); // زمن قصير مناسب لإكتمال تأثير الخروج
    
    // تتبع الحدث باستخدام Facebook Pixel
    if (typeof fbq === 'function') {
        fbq('track', 'ViewContent');
    }
}

// دالة محسنة لتحديث الصورة المصغرة النشطة
function updateActiveThumbnail(src) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        // إزالة الفئة النشطة من جميع الصور المصغرة
        thumb.classList.remove('active');
        
        // إضافة الفئة النشطة للصورة المطابقة
        if (thumb.src === src) {
            thumb.classList.add('active');
            
            // تمرير الصورة المصغرة النشطة إلى المنتصف بشكل فوري
            requestAnimationFrame(() => {
                try {
                    thumb.scrollIntoView({
                        behavior: 'auto', // تغيير إلى 'auto' بدلاً من 'smooth' للانتقال الفوري
                        block: 'nearest', 
                        inline: 'center'
                    });
                } catch (e) {
                    console.error('Error scrolling thumbnail into view:', e);
                }
            });
        }
    });
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
let timeoutId = null;

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
    
    // Show zoom instructions
    showZoomInstructions();
}

// Show zoom instructions
function showZoomInstructions() {
    // Check if instructions element exists or create it if not
    let instructions = document.querySelector('.zoom-instructions');
    if (!instructions) {
        instructions = document.createElement('div');
        instructions.className = 'zoom-instructions';
        instructions.innerHTML = '<i class="fas fa-hand-pointer"></i> تمرير وتكبير الصورة باللمس';
        document.querySelector('.modal-content').appendChild(instructions);
    }
    
    // Show instructions after ensuring modal is displayed
    setTimeout(() => {
        instructions.classList.add('show');
    }, 300);
    
    // Create element to display zoom status
    let zoomStatus = document.querySelector('.zoom-status');
    if (!zoomStatus) {
        zoomStatus = document.createElement('div');
        zoomStatus.className = 'zoom-status';
        document.querySelector('.modal-content').appendChild(zoomStatus);
    }
}

// Update zoom status
function updateZoomStatus() {
    const zoomStatus = document.querySelector('.zoom-status');
    if (!zoomStatus) return;
    
    zoomStatus.textContent = `${Math.round(zoomLevel * 100)}%`;
    zoomStatus.classList.add('show');
    
    if (timeoutId) clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
        zoomStatus.classList.remove('show');
    }, 1500);
}

// Change zoom level with zoom status display
function changeZoom(amount) {
    const prevZoom = zoomLevel;
    zoomLevel += amount;
    
    // Limit zoom level
    if (zoomLevel < 1) zoomLevel = 1;
    if (zoomLevel > 4) zoomLevel = 4;
    
    // Do not proceed if zoom level did not change
    if (prevZoom === zoomLevel) return;
    
    updateImageTransform();
    updateZoomStatus();
}

// Reset zoom level and position
function resetZoom() {
    zoomLevel = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
}

// Update image transform based on zoom level and position
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
    
    // Allow scrolling only when zoomed in
    if (zoomLevel > 1) {
        // Update position
        translateX += deltaX * sensitivity;
        translateY += deltaY * sensitivity;
        
        // Scroll limits based on zoom level
        const maxTranslate = (zoomLevel - 1) * 200;
        translateX = Math.max(Math.min(translateX, maxTranslate), -maxTranslate);
        translateY = Math.max(Math.min(translateY, maxTranslate), -maxTranslate);
        
        // Update image position
        updateImageTransform();
    }
    
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
        // إزالة معالجات الأحداث القديمة
        link.onclick = null;
        
        // إضافة معالج حدث جديد
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // منع انتشار الحدث
            
            // تعطيل الرابط مؤقتًا لمنع النقرات المتكررة
            this.style.pointerEvents = 'none';
            
            const href = this.getAttribute('href');
            const productId = new URLSearchParams(href.split('?')[1]).get('product');
            
            if (productId) {
                // إظهار مؤشر تحميل (اختياري - يمكن إضافته لاحقًا)
                document.body.style.cursor = 'wait';
                
                // تحديث عنوان URL
                history.pushState({}, '', `?product=${productId}`);
                
                // استخدام طريقة تمرير فورية (بدون smooth) للتأكد من التمرير الكامل
                window.scrollTo(0, 0);
                
                // تأكيد إضافي للتمرير
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    
                    // انتظار فترة قصيرة ثم تحميل المنتج
                    setTimeout(() => {
                        loadProductFromURL();
                        
                        // إعادة تمكين التفاعل مع الرابط والمؤشر الطبيعي
                        this.style.pointerEvents = 'auto';
                        document.body.style.cursor = 'default';
                    }, 100);
                }, 50);
            } else {
                this.style.pointerEvents = 'auto';
            }
        });
        
        // تحسين تجربة المؤشر على الروابط
        link.style.cursor = 'pointer';
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

// تحسين تهيئة الصور المصغرة لإزالة تأثيرات الانتقال الزائدة
function setupThumbnailScrolling() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    if (!thumbnailsContainer) return;
    
    // تعيين خصائص التمرير بشكل مباشر
    thumbnailsContainer.style.overflowX = 'auto';
    thumbnailsContainer.style.webkitOverflowScrolling = 'touch';
    thumbnailsContainer.style.touchAction = 'manipulation';
    
    // تعيين سلوك التمرير لتكون أسرع
    thumbnailsContainer.style.scrollBehavior = 'auto'; // تغيير من 'smooth' إلى 'auto'
    
    // إزالة أي معالجات أحداث سابقة
    thumbnailsContainer.onmouseenter = null;
    thumbnailsContainer.onmouseleave = null;
    thumbnailsContainer.onmousemove = null;
    
    // تحميل مسبق لجميع الصور لمنع الوميض
    const allThumbnails = document.querySelectorAll('.thumbnail');
    const imagesToPreload = Array.from(allThumbnails).map(thumb => thumb.src);
    preloadImages(imagesToPreload);
    
    // إضافة معالجات النقر للصور المصغرة مع تحسين الأداء
    allThumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // تنفيذ تغيير الصورة مباشرة
            const activeThumb = document.querySelector('.thumbnail.active');
            if (activeThumb) {
                const activeIndex = Array.from(allThumbnails).indexOf(activeThumb);
                const direction = index > activeIndex ? 'right' : 'left';
                changeImage(this.src, direction);
            } else {
                changeImage(this.src);
            }
        });
    });
    
    // تعيين متغير التحميل الأول إلى false
    firstLoad = false;
}

// معالجة تحميل المنتج
// تحسين دالة تحميل المنتج من URL للتحقق من وجود بيانات المنتجات
function loadProductFromURL() {
    try {
        // إضافة تمرير فوري للأعلى في بداية تحميل المنتج
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        const urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get('product');
        
        if (!productId) {
            productId = "trottinette-EcoXtrem-liner"; // Default product
        }
        
        // التحقق من أن مصفوفة المنتجات موجودة قبل البحث فيها
        if (!Array.isArray(products) || products.length === 0) {
            console.error("Products array is not available or empty");
            return;
        }
        
        const product = products.find(p => p.id === productId);
        const productData = product || products[0]; // استخدام المنتج الأول كاحتياطي
        
        if (!productData) {
            console.error("No product data available");
            return;
        }
        
        document.title = productData.title + " | jouet maroc";
        
        // تحديث واجهة المنتج وتنظيف معالجات الأحداث القديمة
        cleanupEventHandlers();
        updateProductDisplay(productData);
        updateRelatedProducts();
        
        // تأخير تهيئة العناصر التفاعلية لمنع التداخل
        setTimeout(() => {
            setupAccordion();
            setupThumbnailScrolling();
            setupProductLinks();
        }, 50);
    } catch (error) {
        console.error("Error loading product:", error);
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
    
    // Update main image with discount badge
    const mainImage = document.getElementById('current-image');
    mainImage.src = product.images[0]; // Set first image as main image
    
    // Add discount badge to main image container
    const mainImageContainer = document.querySelector('.main-image');
    
    // Remove existing discount badge if any
    const existingBadge = mainImageContainer.querySelector('.main-image-discount-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Add new discount badge if discount exists
    if (product.discount) {
        const discountBadge = document.createElement('div');
        discountBadge.className = 'main-image-discount-badge';
        discountBadge.textContent = `-${product.discount}%`;
        mainImageContainer.appendChild(discountBadge);
    }
    
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
        thumbnail.onclick = function() {
            const activeThumb = document.querySelector('.thumbnail.active');
            if (activeThumb) {
                const activeIndex = Array.from(document.querySelectorAll('.thumbnail')).indexOf(activeThumb);
                const direction = index > activeIndex ? 'right' : 'left';
                changeImage(this.src, direction);
            } else {
                changeImage(this.src);
            }
        };
        
        // إضافة خصائص CSS لتحسين تجربة استخدام المؤشر
        thumbnail.style.cursor = 'pointer';
        thumbnail.style.pointerEvents = 'auto';
        thumbnail.style.touchAction = 'manipulation';
        
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
    // الحصول على جميع روابط المنتجات في قسم المنتجات ذات الصلة
    const relatedLinks = document.querySelectorAll('.related-products .product-link');
    
    relatedLinks.forEach(link => {
        // استخراج معرف المنتج من الرابط
        const href = link.getAttribute('href');
        const productId = new URLSearchParams(href.split('?')[1]).get('product');
        
        if (productId) {
            // البحث عن بيانات المنتج
            const relatedProduct = products.find(p => p.id === productId);
            
            if (relatedProduct) {
                // تحديث عنوان المنتج
                const titleElem = link.querySelector('h3');
                if (titleElem) titleElem.textContent = relatedProduct.title;
                
                // تحديث صورة المنتج
                const imgElem = link.querySelector('img');
                if (imgElem && relatedProduct.images.length > 0) {
                    imgElem.src = relatedProduct.images[0];
                    imgElem.alt = relatedProduct.title;
                }
                
                // تحديث السعر الحالي
                const priceElem = link.querySelector('.related-price');
                if (priceElem) priceElem.textContent = relatedProduct.currentPrice + " درهم";
                
                // تحديث السعر القديم
                const oldPriceElem = link.querySelector('.related-old-price');
                if (oldPriceElem) oldPriceElem.textContent = relatedProduct.oldPrice + " درهم";
                
                // تحديث نسبة الخصم
                const discountElem = link.querySelector('.related-discount-badge');
                if (discountElem) discountElem.textContent = "-" + relatedProduct.discount + "%";
            }
        }
    });
}

// إعداد سلايدر العروض في الهيدر
document.addEventListener('DOMContentLoaded', function() {
    // التأكد من توقف السلايدر عند الضغط على العناصر للهواتف
    const offersTrack = document.querySelector('.offers-track');
    const offerItems = document.querySelectorAll('.offer-item');
    
    if (offersTrack && offerItems.length > 0) {
        // اكتشاف الأجهزة اللمسية
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        offerItems.forEach(item => {
            item.addEventListener(isTouchDevice ? 'touchstart' : 'mouseover', function() {
                offersTrack.style.animationPlayState = 'paused';
            });
            
            item.addEventListener(isTouchDevice ? 'touchend' : 'mouseout', function() {
                offersTrack.style.animationPlayState = 'running';
            });
        });
        
        // إعادة ضبط موضع السلايدر عند تغيير أوضاع الشاشة
        window.addEventListener('resize', function() {
            offersTrack.style.animation = 'none';
            setTimeout(function() {
                offersTrack.style.animation = 'offerSlide 12s infinite ease-in-out';
            }, 10);
        });
    }
});

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

// إضافة متغير للتحكم في عدد مرات التمرير التلقائي
let initialScrollPerformed = false;
let userHasScrolled = false;

// تحسين دالة التمرير للأعلى لاحترام تفاعل المستخدم
function forceScrollToTop() {
    // لا تنفذ التمرير الإجباري إذا كان المستخدم قد قام بالتمرير بالفعل
    if (userHasScrolled) {
        return;
    }

    if (!initialScrollPerformed) {
        initialScrollPerformed = true;
        window.scrollTo(0, 0);
    }
}

// تحسين المعالج الرئيسي لتحسين سلوك التمرير
document.addEventListener('DOMContentLoaded', function() {
    try {
        // تنفيذ تمرير واحد فقط عند بدء التحميل
        initialScrollPerformed = false;
        forceScrollToTop();
        
        // إضافة مراقب للتمرير لمعرفة متى يبدأ المستخدم بالتمرير
        window.addEventListener('scroll', function() {
            if (!userHasScrolled && window.scrollY > 5) {
                userHasScrolled = true;
            }
        }, { passive: true });
        
        // إلغاء التمرير الإضافي بعد تحميل المستند
        setTimeout(() => {
            // تنفيذ تمرير واحد فقط إذا كان المستخدم لم يتفاعل بعد
            if (!userHasScrolled) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto'
                });
            }
        }, 100);
        
        // إلغاء التمرير الإضافي عند تحميل الصفحة بالكامل
        window.addEventListener('load', function() {
            // تنفيذ فقط إذا كان المستخدم لم يتفاعل بعد
            if (!userHasScrolled) {
                initialScrollPerformed = true;
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'auto'
                });
            }
        });
        
        // استعادة التمرير التلقائي فقط عند تحميل منتج جديد
        function loadProductFromURL() {
            try {
                // تحقق مما إذا كان هذا تحميل منتج جديد بعد نقر المستخدم
                const isProductSwitch = document.referrer.includes(window.location.host);
                
                // إذا كان هناك تبديل منتج، قم بالتمرير للأعلى وإعادة الضبط
                if (isProductSwitch) {
                    userHasScrolled = false;
                    window.scrollTo(0, 0);
                }
                
                // باقي الكود لتحميل المنتج...
                const urlParams = new URLSearchParams(window.location.search);
                let productId = urlParams.get('product');
                
                if (!productId) {
                    productId = "trottinette-EcoXtrem-liner"; // Default product
                }
                
                // ...existing code (rest of the loadProductFromURL function)...
            } catch (error) {
                console.error("Error loading product:", error);
            }
        }

        // تعديل معالج نقر روابط المنتجات
        function setupProductLinks() {
            document.querySelectorAll('.related-products .product-link').forEach(link => {
                // إزالة معالجات الأحداث القديمة
                link.onclick = null;
                
                // إضافة معالج حدث جديد نظيف
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // منع انتشار الحدث
                    
                    userHasScrolled = false; // إعادة ضبط متغير التمرير عند تبديل المنتجات
                    
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
                });
                
                // تحسين تجربة المؤشر على الروابط
                link.style.cursor = 'pointer';
                link.style.webkitTapHighlightColor = 'transparent';
            });
        }

    } catch (error) {
        console.error("Error initializing page:", error);
    }
});

// تعديل معالج popstate للحفاظ على سلوك التمرير المناسب
window.addEventListener('popstate', function() {
    // إعادة ضبط متغير التمرير عند استخدام أزرار التنقل في المتصفح
    userHasScrolled = false;
    
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    setTimeout(() => {
        loadProductFromURL();
    }, 400);
});

// تحسين دالة التنقل بين الصور في النافذة المنبثقة
function navigateImages(direction) {
    // Calculate new index
    currentImageIndex += direction;
    
    // Loop around if needed
    if (currentImageIndex < 0) currentImageIndex = allImages.length - 1;
    if (currentImageIndex >= allImages.length) currentImageIndex = 0;
    
    // Update modal image with improved animation
    const modalImage = document.getElementById('modal-image');
    const directionName = direction > 0 ? 'right' : 'left';
    
    // تحسين حركة انتقال الصور في النافذة المنبثقة لتطابق الصور الرئيسية
    modalImage.style.opacity = '0';
    modalImage.style.transform = `translateX(${direction > 0 ? '-30px' : '30px'})`;
    modalImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    setTimeout(() => {
        modalImage.src = allImages[currentImageIndex];
        
        modalImage.onload = () => {
            modalImage.style.opacity = '1';
            modalImage.style.transform = 'translateX(0) scale(1)';
            zoomLevel = 1;
            translateX = 0;
            translateY = 0;
        };
        
        // تحديث الصورة الرئيسية أيضًا
        const mainImage = document.getElementById('current-image');
        if (mainImage) {
            changeImage(allImages[currentImageIndex], directionName);
        }
    }, 300);
    
    // Reset zoom when changing images
    resetZoom();
}

// Close image modal
function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Remove zoom instructions and status
    const instructions = document.querySelector('.zoom-instructions');
    if (instructions) instructions.classList.remove('show');
    
    const zoomStatus = document.querySelector('.zoom-status');
    if (zoomStatus) zoomStatus.classList.remove('show');
}

// Ensure modal elements exist
function ensureModalElements() {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent) return;
    
    // Check if zoom instructions element exists and create if not
    if (!document.querySelector('.zoom-instructions')) {
        const instructions = document.createElement('div');
        instructions.className = 'zoom-instructions';
        instructions.innerHTML = '<i class="fas fa-hand-pointer"></i> تمرير وتكبير الصورة باللمس';
        modalContent.appendChild(instructions);
    }
    
    // Check if zoom status element exists and create if not
    if (!document.querySelector('.zoom-status')) {
        const zoomStatus = document.createElement('div');
        zoomStatus.className = 'zoom-status';
        modalContent.appendChild(zoomStatus);
    }
}

// تحسين معالجات أحداث للنافذة المنبثقة عند تحميل المستند
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // التأكد من وجود عنصر الصورة في النافذة المنبثقة
    const modalImage = document.getElementById('modal-image');
    if (modalImage) {
        // إعداد معالجات الأحداث للسحب والتمرير
        modalImage.addEventListener('mousedown', startDrag);
        modalImage.addEventListener('touchstart', startDrag, { passive: false });
        
        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag, { passive: false });
        
        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);
        
        // إضافة تكبير بالنقر المزدوج على الأجهزة المحمولة
        let lastTap = 0;
        modalImage.addEventListener('touchend', function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 300 && tapLength > 0) {
                // تم اكتشاف نقر مزدوج
                if (zoomLevel === 1) {
                    changeZoom(1); // تكبير
                } else {
                    resetZoom(); // إعادة ضبط
                }
                e.preventDefault();
            }
            
            lastTap = currentTime;
        });
        
        // إضافة تكبير بالنقر المزدوج للماوس
        modalImage.addEventListener('dblclick', function(e) {
            if (zoomLevel === 1) {
                changeZoom(1); // تكبير
            } else {
                resetZoom(); // إعادة ضبط
            }
            e.preventDefault();
        });
    }
    
    // معالج النقر خارج الصورة لإغلاق النافذة
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeImageModal();
            }
        });
    }
    
    // إغلاق النافذة باستخدام مفتاح ESC
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('image-modal');
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeImageModal();
        }
    });
    
    // ...existing code...
});
