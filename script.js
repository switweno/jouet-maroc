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
 * تحسين دالة تغيير الصور مع تأثير دفع الصور بشكل أفضل
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

    // تخزين مصدر الصورة الحالية ومصدر الصورة الجديدة
    const oldImageSrc = currentImage.src;
    const newImageSrc = src;

    // التحميل المسبق للصورة الجديدة
    const preloadImage = new Image();
    preloadImage.src = newImageSrc;
    preloadImage.onload = () => {
        // إنشاء حاوية للصور المتغيرة إذا لم تكن موجودة
        const mainImageContainer = currentImage.parentNode;
        let slidingImagesContainer = mainImageContainer.querySelector('.sliding-images-container');

        if (!slidingImagesContainer) {
            slidingImagesContainer = document.createElement('div');
            slidingImagesContainer.className = 'sliding-images-container';
            slidingImagesContainer.style.position = 'absolute';
            slidingImagesContainer.style.top = '0';
            slidingImagesContainer.style.left = '0';
            slidingImagesContainer.style.width = '100%';
            slidingImagesContainer.style.height = '100%';
            slidingImagesContainer.style.overflow = 'hidden';
            slidingImagesContainer.style.zIndex = '2';
            slidingImagesContainer.style.willChange = 'transform, opacity'; // تسريع الأجهزة
            mainImageContainer.style.position = 'relative';
            mainImageContainer.appendChild(slidingImagesContainer);
        }

        // إنشاء نسخة من الصورة القديمة وإضافتها إلى الحاوية
        const oldImageClone = document.createElement('img');
        oldImageClone.src = oldImageSrc;
        oldImageClone.className = 'exiting-image';
        oldImageClone.style.position = 'absolute';
        oldImageClone.style.top = '0';
        oldImageClone.style.left = '0';
        oldImageClone.style.width = '100%';
        oldImageClone.style.height = '100%';
        oldImageClone.style.objectFit = 'cover';
        oldImageClone.style.zIndex = '1';
        oldImageClone.style.willChange = 'transform, opacity'; // تسريع الأجهزة
        slidingImagesContainer.appendChild(oldImageClone);

        // إنشاء الصورة الجديدة وإضافتها إلى الحاوية
        const newImageElement = document.createElement('img');
        newImageElement.src = newImageSrc;
        newImageElement.className = 'entering-image';
        newImageElement.style.position = 'absolute';
        newImageElement.style.top = '0';
        newImageElement.style.width = '100%';
        newImageElement.style.height = '100%';
        newImageElement.style.objectFit = 'cover';
        newImageElement.style.zIndex = '2';
        newImageElement.style.willChange = 'transform, opacity'; // تسريع الأجهزة

        // تعيين موقع البداية للصورة الجديدة حسب الاتجاه
        if (direction === 'right') {
            newImageElement.style.transform = 'translateX(100%)';
        } else if (direction === 'left') {
            newImageElement.style.transform = 'translateX(-100%)';
        } else {
            newImageElement.style.opacity = '0';
        }

        slidingImagesContainer.appendChild(newImageElement);

        // بدء الانتقال السلس
        animateTransition(oldImageClone, newImageElement, direction, () => {
            currentImage.src = newImageSrc;

            // تنظيف حاوية الصور المتحركة
            while (slidingImagesContainer.firstChild) {
                slidingImagesContainer.removeChild(slidingImagesContainer.firstChild);
            }

            // تحديث الصورة المصغرة النشطة
            updateActiveThumbnail(src);
        });
    };
}

// دالة لتطبيق الانتقال السلس باستخدام requestAnimationFrame
function animateTransition(oldImage, newImage, direction, onComplete) {
    const duration = 300; // مدة الانتقال بالمللي ثانية
    const start = performance.now();

    function step(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1); // نسبة التقدم (0 إلى 1)

        if (direction === 'right') {
            oldImage.style.transform = `translateX(-${progress * 100}%)`;
            newImage.style.transform = `translateX(${(1 - progress) * 100}%)`;
        } else if (direction === 'left') {
            oldImage.style.transform = `translateX(${progress * 100}%)`;
            newImage.style.transform = `translateX(-${(1 - progress) * 100}%)`;
        } else {
            oldImage.style.opacity = 1 - progress;
            newImage.style.opacity = progress;
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            onComplete(); // استدعاء الدالة عند انتهاء الانتقال
        }
    }

    requestAnimationFrame(step);
}

// دالة لتحديث الصورة المصغرة النشطة
function updateActiveThumbnail(src) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) {
            thumb.classList.add('active');
            thumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
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

// Updated function to open order form modal instead of scrolling to form
function scrollToForm() {
    openOrderFormModal();
}

// Function to open the order form modal
function openOrderFormModal() {
    const modal = document.getElementById('order-form-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    
    // Reset form when opening (optional)
    // document.getElementById('order-form').reset();
}

// Function to close the order form modal
function closeOrderFormModal() {
    const modal = document.getElementById('order-form-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close order form modal when clicking outside the form
window.addEventListener('click', function(event) {
    const modal = document.getElementById('order-form-modal');
    if (event.target === modal) {
        closeOrderFormModal();
    }
});

// Add ESC key handler to close the order form modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOrderFormModal();
        closeConfirmationModal();
    }
});

// Function to get the current product data
function getCurrentProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('product');
    
    if (!productId) {
        productId = "voiture-dacia-2025"; // Default product
    }
    
    return products.find(p => p.id === productId) || products[0];
}

// Form submission via WhatsApp with confirmation - update to close the order form modal
function submitFormViaWhatsApp(event) {
    event.preventDefault();
    
    try {
        // Get form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        
       
        
        // Form validation
        if (!name || !phone || !address || !city) {
            alert("الرجاء ملء جميع الحقول المطلوبة");
            return;
        }
        
        // Phone validation - ensure it contains only numbers
       if (!/^[\d+]+$/.test(phone.replace(/\s+/g, ''))) {
            alert("رقم الهاتف يجب أن يحتوي على أرقام فقط ورمز + إذا كان دوليًا");
            return;
        }
        
        // Get product information
        const productData = getCurrentProductData();
        const productName = document.querySelector('.product-title').textContent;
        const regularPrice = productData.currentPrice;
        const productImage = document.getElementById('current-image').src;
        
        // Calculate price based on wholesale or regular
        let unitPrice = regularPrice;
        let isWholesale = false;
        
        // Check if product has wholesale pricing and quantity meets minimum requirement
        if (productData.wholesalePrice && 
            productData.wholesalePrice.minQuantity && 
            productData.wholesalePrice.pricePerUnit && 
            quantity >= productData.wholesalePrice.minQuantity) {
            unitPrice = productData.wholesalePrice.pricePerUnit;
            isWholesale = true;
        }
        
        const totalPrice = quantity * unitPrice;
        
        // Populate confirmation modal
        document.getElementById('summary-product-image').src = productImage;
        document.getElementById('summary-product-name').textContent = productName;
        
        // Update to show wholesale or regular price
        if (isWholesale) {
            document.getElementById('summary-product-price').innerHTML = 
                `<span>${unitPrice} درهم</span> <small class="wholesale-label">(سعر الجملة)</small>`;
        } else {
            document.getElementById('summary-product-price').textContent = unitPrice + " درهم";
        }
        
        document.getElementById('summary-product-quantity').textContent = quantity;
        document.getElementById('summary-total-price').textContent = totalPrice + " درهم";
        document.getElementById('summary-customer-name').textContent = name;
        document.getElementById('summary-customer-phone').textContent = phone;
        document.getElementById('summary-customer-address').textContent = address;
        document.getElementById('summary-customer-city').textContent = city;
        
        
        // Show confirmation modal
        const confirmationModal = document.getElementById('confirmation-modal');
        confirmationModal.style.display = 'block';
        
        // Close the order form modal when showing confirmation
        closeOrderFormModal();
        
        // Prevent scrolling on background
        document.body.style.overflow = 'hidden';
        
        // Setup confirmation button
        document.getElementById('confirm-order-btn').onclick = function() {
            try {
                // Create WhatsApp message with form data
                const priceInfo = isWholesale ? 
                    `السعر: ${unitPrice} درهم (سعر الجملة)` : 
                    `السعر: ${unitPrice} درهم`;
                
               
                
                const message = encodeURIComponent(
                    `*طلب جديد*\n\n` +
                    `*معلومات العميل:*\n` +
                    `الاسم: ${name}\n` +
                    `رقم الهاتف: ${phone}\n` +
                    `العنوان: ${address}\n` +
                    `المدينة: ${city}\n` +
                    `*تفاصيل الطلب:*\n` +
                    `المنتج: ${productName}\n` +
                    `الكمية: ${quantity}\n` +
                    `${priceInfo}\n` +
                    `المجموع: ${totalPrice} درهم`
                );
                
                // Track event in Facebook Pixel
                if (typeof fbq === 'function') {
                    fbq('track', 'Purchase', {
                        value: totalPrice,
                        currency: 'MAD',
                        content_name: productName,
                        content_type: 'product',
                        content_ids: [productData.id],
                        contents: [
                            {
                                id: productData.id,
                                quantity: quantity,
                                item_price: unitPrice
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

// Close confirmation modal - update to restore scrolling
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
    
    // Calculate movement
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
        
        // Calculate scroll limits based on zoom level
        const containerWidth = window.innerWidth * 0.85; // 85% of window width
        const containerHeight = window.innerHeight * 0.75; // 75% of window height
        const modalImage = document.getElementById('modal-image');
        
        if (modalImage) {
            const scaledWidth = modalImage.offsetWidth * zoomLevel;
            const scaledHeight = modalImage.offsetHeight * zoomLevel;
            
            const maxTranslateX = Math.max(0, (scaledWidth - containerWidth) / 2);
            const maxTranslateY = Math.max(0, (scaledHeight - containerHeight) / 2);
            
            // Apply limits with proportionality
            translateX = Math.min(Math.max(translateX, -maxTranslateX), maxTranslateX);
            translateY = Math.min(Math.max(translateY, -maxTranslateY), maxTranslateY);
        }
        
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
// تحسين وظيفة إعداد الأكورديون لتعمل عند النقر على الإطار بأكمله
function setupAccordion() {
    // إزالة أي معالجات أحداث قديمة لتجنب التداخل
    document.querySelectorAll('.accordion-header').forEach(header => {
        const newHeader = header.cloneNode(true);
        if (header.parentNode) {
            header.parentNode.replaceChild(newHeader, header);
        }
    });

    // إضافة معالجات أحداث جديدة
    document.querySelectorAll('.accordion-header').forEach(header => {
        // الحصول على عناصر الأكورديون المطلوبة
        const category = header.parentElement;
        const toggleBtn = header.querySelector('.accordion-toggle');
        
        // معالج حدث للنقر على الهيدر بأكمله (باستثناء الروابط الأخرى)
        header.addEventListener('click', function(e) {
            // تجاهل النقر إذا كان على عناصر تفاعلية أخرى غير الزر نفسه
            const isLink = e.target.tagName === 'A' || e.target.closest('a');
            const isOtherButton = e.target.tagName === 'BUTTON' && e.target !== toggleBtn && 
                                  !toggleBtn.contains(e.target);
            
            // استمرار فقط إذا لم يكن النقر على رابط أو زر آخر
            if (isLink || isOtherButton) {
                return;
            }
            
            // تفعيل تبديل القسم
            toggleAccordionItem(category, toggleBtn);
            e.preventDefault();
            e.stopPropagation(); // منع انتشار الحدث
        });
        
        // إضافة معالج منفصل لزر التبديل لضمان الاستجابة
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                toggleAccordionItem(category, this);
                e.preventDefault();
                e.stopPropagation(); // منع انتشار الحدث
            });
            
            // تحديث حالة aria-expanded الأولية
            const isExpanded = category.classList.contains('expanded');
            toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
    });
}

// دالة جديدة منفصلة لتبديل حالة عنصر الأكورديون
function toggleAccordionItem(category, toggleBtn) {
    const isExpanded = category.classList.contains('expanded');
    
    // إغلاق جميع الأقسام المفتوحة الأخرى
    document.querySelectorAll('.feature-category.expanded').forEach(expandedCategory => {
        if (expandedCategory !== category) {
            expandedCategory.classList.remove('expanded');
            const otherBtn = expandedCategory.querySelector('.accordion-toggle');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // تبديل حالة القسم الحالي
    category.classList.toggle('expanded');
    
    // تحديث حالة aria-expanded
    if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 
            category.classList.contains('expanded') ? 'true' : 'false'
        );
    }
}

// إضافة متغير لتتبع ما إذا كان هذا هو التحميل الأول للصفحة
let firstLoad = true;

// تبسيط تهيئة الصور المصغرة بإزالة جميع التعديلات
function setupThumbnailScrolling() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    if (!thumbnailsContainer) return;
    
    // إزالة أي أنماط قد تعيق التمرير
    if (thumbnailsContainer.style.touchAction) {
        thumbnailsContainer.style.touchAction = "";
    }
    
    // تحميل مسبق للصور فقط بدون إضافة أي معالجات أحداث جديدة
    const allThumbnails = document.querySelectorAll('.thumbnail');
    const imagesToPreload = Array.from(allThumbnails).map(thumb => thumb.src);
    preloadImages(imagesToPreload);
    
    // عدم إضافة أي معالجات أحداث لمس جديدة للصور المصغرة
    // استخدام معالجات الأحداث الأصلية المعرفة في HTML
    
    firstLoad = false;
}

// تحسين تهيئة الصور المصغرة بإزالة التعديلات المخصصة وتركها تعمل بشكل طبيعي
function setupThumbnailScrolling() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    if (!thumbnailsContainer) return;
    
    // يتم الاكتفاء بتعيين خصائص أساسية مع ترك خاصية التمرير للمتصفح
    thumbnailsContainer.style.scrollBehavior = 'smooth';
    
    // تحميل مسبق لجميع الصور لمنع الوميض
    const allThumbnails = document.querySelectorAll('.thumbnail');
    const imagesToPreload = Array.from(allThumbnails).map(thumb => thumb.src);
    preloadImages(imagesToPreload);
    
    // الاكتفاء بإضافة معالجات النقر للصور المصغرة فقط
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
            productId = "voiture-dacia-2025"; // Default product
        }
        
        // استخدام المتغير products مباشرةً بدون window.products لضمان التوافق مع الكود القديم
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
    
    // تنظيف معالجات أحداث الصورة الرئيسية
    const mainImage = document.getElementById('current-image');
    if (mainImage) {
        const mainImageContainer = mainImage.parentNode;
        if (mainImageContainer) {
            const newContainer = mainImageContainer.cloneNode(true);
            // الاحتفاظ بالأزرار وعناصر التنقل
            const arrows = mainImageContainer.querySelectorAll('.scroll-arrow');
            arrows.forEach(arrow => {
                newContainer.querySelector(`.scroll-arrow.${arrow.classList[1]}`).onclick = arrow.onclick;
            });
            mainImageContainer.parentNode.replaceChild(newContainer, mainImageContainer);
        }
    }
}

// تحسين دالة تحديث المنتج لتحسين طريقة التعامل مع الصور المصغرة
let updateProductDisplay = function(product) {
    // تحديث عنوان المنتج وتفاصيله
    document.querySelector('.product-title').textContent = product.title;

    // تحديث العلامة التجارية والفئة مع تغيير الألوان
    document.querySelector('.product-brand').innerHTML = `
        <span style="color: #4a2a57; font-weight: 600;">العلامة التجارية:</span>
        <span style="color: #031112; margin-right: 5px;">${product.brand}</span>
    `;

    document.querySelector('.product-category').innerHTML = `
        <span style="color: #4a2a57; font-weight: 600;">الفئة:</span>
        <span style="color: #031112; margin-right: 5px;">${product.category}</span>
    `;

    // تحديث حالة التوفر
    document.querySelector('.product-availability').textContent = product.availability;

   // تحديث اللون وحجم الخط بناءً على حالة التوفر
var availabilityElement = document.querySelector('.product-availability');

if (product.availability === "متوفر في المخزون") {
    availabilityElement.style.color = "#14b93a"; // اللون الأخضر
    availabilityElement.style.fontSize = "1.0rem"; // زيادة حجم الخط
} else if (product.availability === "غير متوفر في المخزون") {
    availabilityElement.style.color = "#ff0000"; // اللون الرمادي
    availabilityElement.style.fontSize = "1rem"; // الحجم الافتراضي
} else {
    availabilityElement.style.color = "#000"; // اللون الافتراضي
    availabilityElement.style.fontSize = "1rem"; // الحجم الافتراضي
}


    
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
    document.querySelector('.discount').textContent = "خصم " + product.discount + "%";


    
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
    // تحديث سعر الجملة
    const wholesalePriceElement = document.querySelector('.product-wholesale-price');
    const wholesalePriceValueElement = document.getElementById('wholesale-price-value');
    
    if (product.wholesalePrice) {
        // عرض سعر الجملة إذا كان متاحًا
        wholesalePriceElement.style.display = 'block';
        wholesalePriceValueElement.textContent = `${product.wholesalePrice.pricePerUnit} درهم (ابتداء من ${product.wholesalePrice.minQuantity} قطع)`;
    } else {
        // إخفاء سعر الجملة إذا لم يكن متاحًا
        wholesalePriceElement.style.display = 'none';
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
        
        // بسط الكود وإعادته للطريقة الأصلية
        if (product.id === "trottinette-bison-gt-1000") {
            // تطبيق فئة الفيديو العمودي
            videoContainer.classList.add('portrait-video');
        } else {
            // إزالة فئة الفيديو العمودي إذا وُجدت
            videoContainer.classList.remove('portrait-video');
        }
        
        // استخدام الطريقة البسيطة والمباشرة في عرض الفيديو
        videoContainer.innerHTML = `
            <iframe 
                src="${product.videoURL}" 
                width="${product.id === "trottinette-bison-gt-1000" ? '267' : '560'}" 
                height="${product.id === "trottinette-bison-gt-1000" ? '476' : '314'}" 
                style="border:none;overflow:hidden" 
                scrolling="no" 
                frameborder="0" 
                allowfullscreen="true" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
        `;
    }
    
    // Update video section
const videoSection = document.querySelector('.product-video-section');

if (product.videoURL) {
    const videoContainer = document.querySelector('.video-container');
    
    // عرض الفيديو
    if (product.id === "trottinette-bison-gt-1000") {
        videoContainer.classList.add('portrait-video');
    } else {
        videoContainer.classList.remove('portrait-video');
    }

    videoContainer.innerHTML = `
        <iframe 
            src="${product.videoURL}" 
            width="${product.id === "trottinette-bison-gt-1000" ? '267' : '560'}" 
            height="${product.id === "trottinette-bison-gt-1000" ? '476' : '314'}" 
            style="border:none;overflow:hidden" 
            scrolling="no" 
            frameborder="0" 
            allowfullscreen="true" 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
    `;
    videoSection.style.display = "block"; // نتأكد أنه بان
} else {
    // ما كاينش فيديو → نخفي القسم كامل
    document.querySelector('.product-video-section').style.display = "none";
}

    
    // تهيئة الأكورديون بعد تحديث المحتوى مع تأخير قصير للتأكد من اكتمال التحديث
    setTimeout(() => {
        setupAccordion();
        
        // التأكد من أن الاكورديون الأول مفتوح دائماً
        const firstCategory = document.querySelector('.feature-category');
        if (firstCategory && !firstCategory.classList.contains('expanded')) {
            const firstToggle = firstCategory.querySelector('.accordion-toggle');
            toggleAccordionItem(firstCategory, firstToggle);
        }
        
        // إضافة دعم التمرير باللمس للصورة الرئيسية
        setupMainImageTouch();
    }, 200);
};

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
        
        
        // إضافة تمرير إضافي بعد تحميل المستند لضمان عرض الصفحة من الأعلى تمامًا
       
        
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
            // البحث عن بيانات المنتج - استخدام products مباشرةً
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
        const loadProductFromURLLocal = function() {
            try {
                // تحقق مما إذا كان هذا تحميل منتج جديد بعد نقر المستخدم
                const isProductSwitch = document.referrer.includes(window.location.host);
                
                // إذا كان هناك تبديل منتج، قم بالتمرير للأعلى وإعادة الضبط
                if (isProductSwitch) {
                    userHasScrolled = false;
                    window.scrollTo(0, 0);
                }
                
                // استدعاء الدالة الأصلية لتحميل المنتج
                loadProductFromURL();
                
            } catch (error) {
                console.error("Error loading product:", error);
            }
        };

        // استخدام تعبير وظيفي بدلاً من إعلان دالة
        const setupProductLinksLocal = function() {
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
                            loadProductFromURLLocal();
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
        };

        // استدعاء الدالة المحلية
        setupProductLinksLocal();

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
    const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));
    const currentImage = document.getElementById('current-image');
    const activeIndex = thumbnails.findIndex(thumb => thumb.classList.contains('active'));
    let newIndex = activeIndex + direction;

    if (newIndex < 0) {
        newIndex = thumbnails.length - 1;
    } else if (newIndex >= thumbnails.length) {
        newIndex = 0;
    }

    const newImageSrc = thumbnails[newIndex].src;
    changeImage(newImageSrc, direction > 0 ? 'right' : 'left');
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
    const zoomContainer = document.querySelector('.zoom-container');
    
    if (modalImage && zoomContainer) {
        modalImage.onload = function() {
            // التحقق مما إذا كانت الصورة عمودية أو أفقية
            if (this.naturalHeight > this.naturalWidth) {
                zoomContainer.classList.add('vertical-image');
            } else {
                zoomContainer.classList.remove('vertical-image');
            }
            
            // التأكد من تمركز الصورة
            centerModalImage();
        };
    }
    
    // ...existing code...
});

// تحسين وظيفة إظهار حالة التكبير
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

// تحسين التأكد من وجود عناصر النافذة المنبثقة
function ensureModalElements() {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent) return;
    
    // التحقق من وجود عنصر إرشادات التكبير وإنشائه إذا لم يكن موجودًا
    if (!document.querySelector('.zoom-instructions')) {
        const instructions = document.createElement('div');
        instructions.className = 'zoom-instructions';
        instructions.innerHTML = '<i class="fas fa-hand-pointer"></i> تمرير وتكبير الصورة باللمس';
        modalContent.appendChild(instructions);
    }
    
    // التحقق من وجود عنصر حالة التكبير وإنشائه إذا لم يكن موجودًا
    if (!document.querySelector('.zoom-status')) {
        const zoomStatus = document.createElement('div');
        zoomStatus.className = 'zoom-status';
        modalContent.appendChild(zoomStatus);
    }
}

// دالة جديدة لإعداد التمرير باللمس للصورة الرئيسية
function setupMainImageTouch() {
    const mainImage = document.getElementById('current-image');
    const mainImageContainer = document.querySelector('.main-image');
    
    if (!mainImage || !mainImageContainer) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // عتبة المسافة اللازمة لاعتبار الحركة سحبًا
    
    // معالجة بداية اللمس
    mainImageContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    // معالجة نهاية اللمس
    mainImageContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    // دالة معالجة السحب
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        // تجاهل النقرات والسحبات القصيرة جدًا
        if (Math.abs(swipeDistance) < swipeThreshold) return;
        
        if (swipeDistance > 0) {
            // سحب من اليسار إلى اليمين (السابق)
            navigateImages(-1);
        } else {
            // سحب من اليمين إلى اليسار (التالي)
            navigateImages(1);
        }
    }
}

// تحسين المعالج الرئيسي لإضافة التمرير باللمس للصورة الرئيسية
document.addEventListener('DOMContentLoaded', function() {
    try {
        // ...existing code...
        
        // تحميل بيانات المنتج حسب معلمة URL
        loadProductFromURL();
        
        // إعداد روابط المنتجات إن وجدت
        setupProductLinks();
        
        // إضافة دعم التمرير باللمس للصورة الرئيسية
        setupMainImageTouch();
        
        // ...existing code...
        
        // إضافة الدعم اللمسي كل مرة يتم فيها تحديث عرض المنتج
        const updateProductDisplayOriginal = updateProductDisplay;
        updateProductDisplay = function(product) {
            updateProductDisplayOriginal(product);
            // إضافة تأخير قصير للتأكد من اكتمال تحميل الصورة
            setTimeout(() => {
                setupMainImageTouch();
            }, 200);
        };
        
        // ...existing code...
    } catch (error) {
        console.error("Error initializing page:", error);
    }
});

// ...existing code...

// تهيئة العناصر وإضافة مستمعي الأحداث للقائمة الجانبية
document.addEventListener('DOMContentLoaded', function() {
    // إضافة إلى المستمعين الموجودين مسبقًا
    
    // استدعاء عناصر القائمة الجانبية
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarClose = document.getElementById('sidebar-close');
    const overlay = document.getElementById('overlay');
    const categories = document.querySelectorAll('.sidebar-category');
    const categoryPopup = document.getElementById('category-popup');
    const popupClose = document.getElementById('popup-close');
    const popupCategoryTitle = document.getElementById('popup-category-title');
    const popupProducts = document.getElementById('popup-products');
    
    // فتح القائمة الجانبية
    menuToggle.addEventListener('click', function() {
        sidebarMenu.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
    });
    
    // إغلاق القائمة الجانبية
    function closeSidebar() {
        sidebarMenu.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto'; // السماح بالتمرير مرة أخرى
    }
    
    sidebarClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // معالجة النقر على فئات المنتجات
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            const categoryName = this.querySelector('span').textContent;
            
            // تعيين عنوان النافذة المنبثقة
            popupCategoryTitle.textContent = categoryName;
            
            // تحضير منتجات الفئة المختارة
            loadCategoryProducts(categoryId);
            
            // عرض النافذة المنبثقة
            categoryPopup.classList.add('show');
            
            // الانتقال إلى وضع الخلفية المعتمة بدون إغلاق القائمة
            // لأن القائمة يجب أن تبقى مفتوحة خلف النافذة المنبثقة
        });
    });
    
    // إغلاق النافذة المنبثقة
    popupClose.addEventListener('click', function() {
        categoryPopup.classList.remove('show');
    });
    
    // تحميل منتجات الفئة المختارة
    function loadCategoryProducts(categoryId) {
        // تنظيف المحتوى السابق
        popupProducts.innerHTML = '';
        
        // الحصول على منتجات الفئة المحددة
        const categoryProducts = getCategoryProducts(categoryId);
        
        // إضافة المنتجات إلى النافذة المنبثقة
        categoryProducts.forEach(product => {
            const productElement = createProductElement(product);
            popupProducts.appendChild(productElement);
        });
    }
    
    // إنشاء عنصر منتج للنافذة المنبثقة
    function createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.className = 'popup-product';
        productDiv.setAttribute('data-id', product.id);
        
        // إضافة محتوى المنتج
        productDiv.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}">
            <div class="popup-product-info">
                <h4 class="popup-product-title">${product.title}</h4>
                <div class="popup-product-price">${product.currentPrice} درهم</div>
            </div>
        `;
        
        // إضافة معالج النقر للمنتج
        productDiv.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            
            // إغلاق النافذة المنبثقة
            categoryPopup.classList.remove('show');
            
            // إغلاق القائمة الجانبية
            closeSidebar();
            
            // تحميل صفحة المنتج
            navigateToProduct(productId);
        });
        
        return productDiv;
    }
    
    // الانتقال إلى صفحة المنتج
    function navigateToProduct(productId) {
        // تغيير عنوان URL للانتقال إلى المنتج
        history.pushState({}, '', `?product=${productId}`);
        
        // التمرير إلى أعلى الصفحة
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        
        // تحميل المنتج
        setTimeout(() => {
            loadProductFromURL();
        }, 400);
    }
    
   
    
    // فلترة المنتجات حسب الفئة
    function filterProductsByCategory(category) {
        if (!window.products) return [];
        return window.products.filter(product => product.category === category);
    }
});










document.addEventListener("DOMContentLoaded", function () {
    const modals = document.querySelectorAll(".modal");
    const buttons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close");

    // فتح النافذة عند الضغط على الزر
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
            }
        });
    });

    // إغلاق النافذة عند الضغط على زر الإغلاق
    closeButtons.forEach(close => {
        close.addEventListener("click", function () {
            const modal = this.closest(".modal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    // إغلاق النافذة عند النقر خارجها
    window.addEventListener("click", function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});


// إرسال عبر البريد الإلكتروني
document.getElementById("contactForm1").addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("name1").value;
    let email = document.getElementById("email1").value;
    let message = document.getElementById("message1").value;

    let mailtoLink = `mailto:marocweno@gmail.com?subject=رسالة من ${name}&body=${message}%0A%0Aالبريد الإلكتروني: ${email}`;
    window.location.href = mailtoLink;
});

// إرسال عبر WhatsApp
document.getElementById("whatsappSend1").addEventListener("click", function () {
    let name = document.getElementById("name1").value;
    let email = document.getElementById("email1").value;
    let message = document.getElementById("message1").value;

    // تكوين الرسالة
    let whatsappMessage = `مرحبًا، أنا ${name}.%0Aالبريد الإلكتروني: ${email}.%0Aالرسالة: ${message}`;

    // تغيير الرقم هنا إلى رقم هاتفك الخاص
    let phoneNumber = "212762609147"; // استبدل هذا برقم هاتفك

    // إنشاء الرابط
    let whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // فتح الرابط في نافذة جديدة
    window.open(whatsappLink, "_blank");
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            });
        }
    });
});

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission (in a real application, you would send this to your server)
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simple validation
            if (email && email.includes('@') && email.includes('.')) {
                // Hide form and show success message
                newsletterForm.style.display = 'none';
                newsletterSuccess.style.display = 'block';
                
                // Optional: Log to console for demo purposes
                console.log('Newsletter subscription:', email);
                
                // Reset form
                setTimeout(() => {
                    emailInput.value = '';
                    newsletterForm.style.display = 'flex';
                    newsletterSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }
});

let currentIndex = 0; // الفهرس الحالي للعرض
let autoScroll; // متغير لتخزين الـ Interval

function scrollOffers(direction) {
    const offerSlider = document.querySelector('.offer-slider');
    const offerItems = document.querySelectorAll('.offer-item');
    const totalItems = offerItems.length;

    if (direction === 'next') {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0; // انتقل إلى العرض التالي
    } else if (direction === 'prev') {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1; // انتقل إلى العرض السابق
    }

    // تحريك الشريط
    const offset = -currentIndex * 100; // حساب الإزاحة
    offerSlider.style.transform = `translateX(${offset}%)`;
}

// تفعيل الحركة التلقائية
function startAutoScroll() {
    autoScroll = setInterval(() => {
        scrollOffers('next'); // يتحرك تلقائيًا إلى العرض التالي
    }, 4000); // تغيير كل 4 ثوانٍ (يمكن تعديل الوقت)
}

// إيقاف الحركة التلقائية عند تفاعل المستخدم (عند الضغط على الأسهم)
function stopAutoScroll() {
    clearInterval(autoScroll);
}

// تشغيل الحركة التلقائية عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", startAutoScroll);

// إيقاف الحركة عند تمرير الماوس فوق الشريط (لإعطاء المستخدم تحكمًا)
document.querySelector('.offer-slider').addEventListener('mouseenter', stopAutoScroll);
document.querySelector('.offer-slider').addEventListener('mouseleave', startAutoScroll);

// إضافة مستمعات الأحداث للقائمة الأفقية في الشاشات الكبيرة
document.addEventListener('DOMContentLoaded', function() {
    // الكود الموجود...
    
    // إضافة مستمعات الأحداث للفئات في القائمة الأفقية
    const desktopCategories = document.querySelectorAll('.desktop-category');
    desktopCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.getAttribute('data-category');
            showCategoryPopup(categoryName);
        });
    });
    
    // دالة لعرض نافذة الفئة (يمكن استخدام نفس الدالة الموجودة)
    function showCategoryPopup(categoryName) {
        // إذا كانت الدالة موجودة بالفعل، استخدمها
        if (typeof showCategoryProducts === 'function') {
            showCategoryProducts(categoryName);
        } else {
            // إنشاء دالة بديلة إذا لم تكن موجودة
            const categoryTitle = document.getElementById('popup-category-title');
            const popupProducts = document.getElementById('popup-products');
            
            // تعيين عنوان الفئة
            categoryTitle.textContent = getCategoryTitle(categoryName);
            
            // عرض منتجات الفئة (هذا يعتمد على بنية البيانات الخاصة بك)
            popupProducts.innerHTML = ''; // مسح المحتوى السابق
            
            // عرض النافذة المنبثقة
            document.getElementById('category-popup').classList.add('show');
            document.getElementById('overlay').classList.add('show');
        }
    }
    
    // دالة مساعدة للحصول على عنوان الفئة
    function getCategoryTitle(categoryName) {
        const titles = {
            'electric-bikes': 'الدراجات الكهربائية',
            'scooters': 'تروتنيت',
            'bikes': 'الدراجات الهوائية',
            'electric-cars': 'سيارات كهربائية'
			
        };
        return titles[categoryName] || 'منتجات الفئة';
    }
});

// تحسين دالة تحميل منتجات الفئات للنافذة المنبثقة
function showCategoryProducts(categoryId) {
    const categoryPopup = document.getElementById('category-popup');
    const popupCategoryTitle = document.getElementById('popup-category-title');
    const popupProducts = document.getElementById('popup-products');
    const overlay = document.getElementById('overlay');
    
    // تعيين عنوان الفئة
    popupCategoryTitle.textContent = getCategoryTitle(categoryId);
    
    // تنظيف المحتوى السابق
    popupProducts.innerHTML = '';
    
    // الحصول على منتجات الفئة المحددة
    const categoryProducts = filterProductsByCategory(getCategoryName(categoryId));
    
    // إضافة رسالة إذا لم تكن هناك منتجات
    if (categoryProducts.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.className = 'no-products-message';
        noProductsMessage.textContent = 'لا توجد منتجات في هذه الفئة حالياً';
        popupProducts.appendChild(noProductsMessage);
    } else {
        // إضافة المنتجات إلى النافذة المنبثقة
        categoryProducts.forEach(product => {
            // إنشاء عنصر المنتج
            const productEl = createProductElement(product);
            popupProducts.appendChild(productEl);
        });
    }
    
    // عرض النافذة المنبثقة والخلفية
    categoryPopup.classList.add('show');
    overlay.classList.add('show');
    
    // منع التمرير في الخلفية
    document.body.style.overflow = 'hidden';
}



// فلترة المنتجات حسب الفئة
function filterProductsByCategory(category) {
    // استخدام المتغير العام products إذا كان موجوداً، أو مصفوفة فارغة إذا لم يكن
    const allProducts = window.products || [];
    
    // طباعة قائمة المنتجات وفئاتها للتشخيص
    console.log("جميع الفئات المتاحة:", allProducts.map(p => p.category).filter((v, i, a) => a.indexOf(v) === i));
    
    // البحث عن المنتجات حسب الفئة
    const filteredProducts = allProducts.filter(product => product.category === category);
    
    // طباعة عدد المنتجات التي تم العثور عليها
    console.log(`تم العثور على ${filteredProducts.length} منتج في فئة "${category}"`);
    
    return filteredProducts;
}

// إنشاء عنصر منتج للنافذة المنبثقة
function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'popup-product';
    
    // إضافة الصورة والمعلومات
    productDiv.innerHTML = `
        <img src="${product.images[0]}" alt="${product.title}">
        <div class="popup-product-info">
            <h4 class="popup-product-title">${product.title}</h4>
            <div class="popup-product-price">${product.currentPrice} درهم</div>
        </div>
    `;
    
    // إضافة معالج النقر
    productDiv.addEventListener('click', function() {
        // تغيير عنوان URL والانتقال إلى صفحة المنتج
        window.location.href = `?product=${product.id}`;
        
        // إغلاق النافذة المنبثقة
        document.getElementById('category-popup').classList.remove('show');
        document.getElementById('overlay').classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    return productDiv;
}

// تعديل معالج أحداث القائمتين (الجانبية والأفقية)
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // إضافة مستمعات الأحداث للفئات في القائمة الجانبية
    const sidebarCategories = document.querySelectorAll('.sidebar-category');
    sidebarCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            // إغلاق القائمة الجانبية عند اختيار فئة
            document.getElementById('sidebar-menu').classList.remove('open');
            showCategoryProducts(categoryId);
        });
    });
    
    // إضافة مستمعات الأحداث للفئات في القائمة الأفقية
    const desktopCategories = document.querySelectorAll('.desktop-category');
    desktopCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            showCategoryProducts(categoryId);
        });
    });
    
    // إغلاق النافذة المنبثقة عند النقر على زر الإغلاق
    const popupClose = document.getElementById('popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            document.getElementById('category-popup').classList.remove('show');
            document.getElementById('overlay').classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // إغلاق النافذة المنبثقة عند النقر على الخلفية
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            const categoryPopup = document.getElementById('category-popup');
            if (categoryPopup.classList.contains('show')) {
                categoryPopup.classList.remove('show');
                this.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// ...existing code...


// الحصول على العناصر DOM
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const productsGrid = document.getElementById('products-grid');

// تحميل بيانات المنتجات من ملف products.js
function loadProducts() {
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// إنشاء بطاقة منتج ديناميكية
function createProductCard(product) {
    const card = document.createElement('a');
    card.href = `?product=${encodeURIComponent(product.id)}`;
    card.className = 'product-link';

    card.innerHTML = `
        <div class="related-product">
            <img src="${product.images[0]}" alt="${product.title}">
            <h3>${product.title}</h3>
            <div class="related-price-container">
                <div class="related-price">${product.currentPrice} درهم</div>
                <div class="related-old-price">${product.oldPrice} درهم</div>
            </div>
            <div class="related-discount-badge">-${product.discount}%</div>
        </div>
    `;

    return card;
}

// دالة لعرض نتائج البحث
function displayResults(results) {
    // مسح النتائج السابقة
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">لم يتم العثور على نتائج</div>';
        searchResults.style.display = 'block';
        return;
    }

    // إنشاء عناصر النتائج
    results.forEach(product => {
        const resultItem = document.createElement('a');
        resultItem.href = `?product=${encodeURIComponent(product.id)}`;
        resultItem.classList.add('search-result-item');

        resultItem.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}" class="search-result-image">
            <div class="search-result-info">
                <div class="search-result-title">${highlightText(product.title, searchInput.value)}</div>
                <div class="search-result-price">${product.currentPrice} درهم</div>
                <div class="search-result-category">${product.category}</div>
            </div>
        `;

        searchResults.appendChild(resultItem);
    });

    // عرض النتائج
    searchResults.style.display = 'block';
}

// دالة لتظليل النص المتطابق
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlighted">$1</span>');
}

// دالة Debouncing
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// دالة البحث الرئيسية
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === '') {
        searchResults.style.display = 'none';
        return;
    }

    // تصفية المنتجات بناءً على الاستعلام
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    // عرض النتائج
    displayResults(filteredProducts);
}

// ربط البحث مع Debouncing
const debouncedSearch = debounce(performSearch, 300); // تأخير لمدة 300 مللي ثانية

// منع الإرسال عند الضغط على زر البحث
document.getElementById('search-button').addEventListener('click', (e) => {
    e.preventDefault();
    performSearch(); // تنفيذ البحث فورًا عند الضغط على الزر
});

// تفعيل البحث عند الكتابة باستخدام Debouncing
searchInput.addEventListener('input', () => {
    debouncedSearch();
});

// إخفاء النتائج عند الضغط خارج منطقة البحث
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        searchResults.style.display = 'none';
    }
});

// تحميل المنتجات عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});


document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const closeModal = document.querySelector(".close");
    const openModalButton = document.querySelector("#openModalButton");

    function openModal() {
        modal.classList.remove("hide");
        modal.classList.add("show");
        modal.style.display = "flex"; // تأكد من إظهار النافذة في كل مرة يتم فتحها
    }

    function closeModalFunc() {
        modal.classList.remove("show");
        modal.classList.add("hide");

        // بعد انتهاء الأنيميشن، نخفي النافذة من الـ DOM
        setTimeout(() => {
            modal.style.display = "none"; // نخفيها بعد انتهاء التأثير
        }, 300); // نفس مدة الأنيميشن
    }

    closeModal.addEventListener("click", closeModalFunc);

    openModalButton.addEventListener("click", function () {
        if (modal.style.display === "none" || !modal.style.display) {
            openModal();
        }
    });
});


// عرض وإخفاء نافذة الدردشة
function toggleChatWindow() {
    const chatWindow = document.getElementById("chatWindow");
    if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
        chatWindow.style.display = "block";
    } else {
        chatWindow.style.display = "none";
    }
}

// إغلاق نافذة الدردشة باستخدام الزر "×"
function closeChatWindow() {
    const chatWindow = document.getElementById("chatWindow");
    chatWindow.style.display = "none";
}

// تبديل الإجابة
function toggleAnswer(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector(".faq-answer");
    const symbol = button.querySelector(".symbol");

    // إغلاق جميع الأسئلة الأخرى
    document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
            item.querySelector(".faq-answer").classList.remove("show");
            item.querySelector(".symbol").textContent = "+"; // إعادة الرمز إلى +
        }
    });

    // تبديل حالة السؤال الحالي
    answer.classList.toggle("show");
    symbol.textContent = answer.classList.contains("show") ? "-" : "+"; // تغيير الرمز بين - و +
}
   