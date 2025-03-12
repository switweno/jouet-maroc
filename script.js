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
        // إنشاء نسخة من الصورة الحالية لعمل تأثير الخروج
        if (direction === 'right' || direction === 'left') {
            // إنشاء نسخة من الصورة القديمة وإضافتها إلى الحاوية
            const oldImageClone = document.createElement('img');
            oldImageClone.src = oldImageSrc;
            oldImageClone.className = 'exiting-image';
            oldImageClone.style.position = 'absolute';
            oldImageClone.style.top = '0';
            oldImageClone.style.left = '0';
            oldImageClone.style.width = '100%';
            oldImageClone.style.height = 'auto';
            oldImageClone.style.zIndex = '1';
            
            // إضافة الصورة المنسوخة للحاوية
            const mainImageContainer = currentImage.parentNode;
            mainImageContainer.appendChild(oldImageClone);
            
            // تطبيق تأثير الخروج على الصورة القديمة
            setTimeout(() => {
                oldImageClone.classList.add(direction === 'right' ? 'image-slide-exit-left' : 'image-slide-exit-right');
                
                // إزالة الصورة القديمة بعد اكتمال التأثير
                setTimeout(() => {
                    if (oldImageClone.parentNode) {
                        oldImageClone.parentNode.removeChild(oldImageClone);
                    }
                }, 500); // زمن أطول قليلاً من مدة الانتقال للتأكد من اكتمال التأثير
            }, 10);
        }
        
        // إزالة أي تأثيرات سابقة من الصورة الرئيسية
        currentImage.classList.remove(
            'image-slide-enter-from-right', 
            'image-slide-enter-from-left', 
            'image-zoom-in',
            'image-fade-in'
        );
        
        // إيقاف أي رسوم متحركة قيد التنفيذ
        window.clearTimeout(currentImage.animationTimeout);
        
        // تغيير مصدر الصورة الرئيسية
        currentImage.src = newImageSrc;
        currentImage.style.opacity = '1'; // تأكد من أن الصورة مرئية
        
        // تطبيق تأثير دخول للصورة الجديدة
        if (direction === 'right') {
            currentImage.classList.add('image-slide-enter-from-right');
        } else if (direction === 'left') {
            currentImage.classList.add('image-slide-enter-from-left');
        } else {
            // استخدام تأثير ظهور تدريجي في الحالات الأخرى
            currentImage.classList.add('image-zoom-in');
        }
        
        // تحديث الصورة المصغرة النشطة
        updateActiveThumbnail(src);
        
        // إزالة تأثيرات الدخول بعد إكتمال الحركة
        currentImage.animationTimeout = setTimeout(() => {
            currentImage.classList.remove(
                'image-slide-enter-from-right', 
                'image-slide-enter-from-left',
                'image-zoom-in',
                'image-fade-in'
            );
        }, 600); // وقت أطول قليلاً من مدة الانتقال للتأكد من اكتمال التأثير
    };
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
    const orderSection = document.getElementById('order-section');
    window.scrollTo({
        top: orderSection.offsetTop - 10,  // تعديل المسافة هنا (يمكنك زيادة أو تقليل الرقم حسب الحاجة)
        behavior: 'smooth'  // التمرير السلس
    });
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
                window.open(`https://wa.me/212672568976?text=${message}`, '_blank');
                
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
    const zoomContainer = document.querySelector('.zoom-container');
    
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
    
    // Check image type (vertical or horizontal) and apply appropriate class
    modalImage.onload = function() {
        if (this.naturalHeight > this.naturalWidth) {
            zoomContainer.classList.add('vertical-image');
        } else {
            zoomContainer.classList.remove('vertical-image');
        }
        
        // Ensure image is centered
        centerModalImage();
    };
    
    // Display the modal
    modal.style.display = 'block';
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Ensure modal elements exist
    ensureModalElements();
    
    // Show zoom instructions
    showZoomInstructions();
    
    // Track event in Facebook Pixel if available
    if (typeof fbq === 'function') {
        fbq('track', 'ViewContent', {
            content_type: 'product_image',
            content_ids: ['PROD12345']
        });
    }
}

// Center modal image
function centerModalImage() {
    const modalImage = document.getElementById('modal-image');
    if (!modalImage) return;
    
    translateX = 0;
    translateY = 0;
    updateImageTransform();
}

// Update image transform based on zoom level and position
function updateImageTransform() {
    const modalImage = document.getElementById('modal-image');
    if (modalImage) {
        // Apply transform with centering
        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
    }
}

// Reset zoom level and position
function resetZoom() {
    zoomLevel = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
    
    // Update zoom status
    updateZoomStatus();
}

// Change zoom level with zoom status display
function changeZoom(amount) {
    const prevZoom = zoomLevel;
    const zoomContainer = document.querySelector('.zoom-container');
    const modalImage = document.getElementById('modal-image');
    
    // Retain the position of the center point before zooming
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Calculate the distance between the center and the current position
    const offsetX = translateX;
    const offsetY = translateY;
    
    // Change zoom level
    zoomLevel += amount;
    
    // Limit zoom level
    if (zoomLevel < 1) zoomLevel = 1;
    if (zoomLevel > 4) zoomLevel = 4;
    
    // Do not proceed if zoom level did not change
    if (prevZoom === zoomLevel) return;
    
    // Calculate new position to maintain the center point
    if (prevZoom !== 1 && zoomLevel !== 1) {
        // Update offset based on zoom level change
        translateX = (offsetX / prevZoom) * zoomLevel;
        translateY = (offsetY / prevZoom) * zoomLevel;
    } else if (zoomLevel === 1) {
        // Center image when zooming out to normal size
        translateX = 0;
        translateY = 0;
    }
    
    // Apply changes
    updateImageTransform();
    
    // Update zoom status
    updateZoomStatus();
    
    // Add highlight class if zoom level is greater than 1
    if (zoomLevel > 1) {
        zoomContainer.classList.add('zoomed');
    } else {
        zoomContainer.classList.remove('zoomed');
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
            productId = "velo-electrique-harley-u9"; // Default product
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
    
    // تهيئة الأكورديون بعد تحديث المحتوى مع تأخير قصير للتأكد من اكتمال التحديث
    setTimeout(() => {
        setupAccordion();
        
        // التأكد من أن الاكورديون الأول مفتوح دائماً
        const firstCategory = document.querySelector('.feature-category');
        if (firstCategory && !firstCategory.classList.contains('expanded')) {
            const firstToggle = firstCategory.querySelector('.accordion-toggle');
            toggleAccordionItem(firstCategory, firstToggle);
        }
    }, 200);
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

// تحسين وظيفة إعادة ضبط التكبير
function resetZoom() {
    zoomLevel = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
    
    // تحديث حالة التكبير
    updateZoomStatus();
}

// تحسين وظيفة تحديث تحويل الصورة
function updateImageTransform() {
    const modalImage = document.getElementById('modal-image');
    if (modalImage) {
        // تطبيق التحويل مع ضمان المركزية
        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
    }
}

// دالة جديدة للتأكد من تمركز الصورة في النافذة المنبثقة
function centerModalImage() {
    const modalImage = document.getElementById('modal-image');
    if (!modalImage) return;
    
    translateX = 0;
    translateY = 0;
    updateImageTransform();
}

// تحسين وظيفة تغيير مستوى التكبير
function changeZoom(amount) {
    const prevZoom = zoomLevel;
    const zoomContainer = document.querySelector('.zoom-container');
    const modalImage = document.getElementById('modal-image');
    
    // احتفظ بموضع النقطة المركزية قبل التكبير
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // حساب المسافة بين المركز والموضع الحالي
    const offsetX = translateX;
    const offsetY = translateY;
    
    // تغيير مستوى التكبير
    zoomLevel += amount;
    
    // تحديد حدود التكبير
    if (zoomLevel < 1) zoomLevel = 1;
    if (zoomLevel > 4) zoomLevel = 4;
    
    // عدم التنفيذ إذا لم يتغير مستوى التكبير
    if (prevZoom === zoomLevel) return;
    
    // حساب الموضع الجديد للحفاظ على النقطة المركزية
    if (prevZoom !== 1 && zoomLevel !== 1) {
        // تحديث الإزاحة بناءً على التغير في مستوى التكبير
        translateX = (offsetX / prevZoom) * zoomLevel;
        translateY = (offsetY / prevZoom) * zoomLevel;
    } else if (zoomLevel === 1) {
        // إعادة الصورة للمركز عند التصغير للحجم الطبيعي
        translateX = 0;
        translateY = 0;
    }
    
    // تطبيق التغييرات
    updateImageTransform();
    
    // تحديث حالة التكبير
    updateZoomStatus();
    
    // إضافة فئة مميزة إذا كان التكبير أكبر من 1
    if (zoomLevel > 1) {
        zoomContainer.classList.add('zoomed');
    } else {
        zoomContainer.classList.remove('zoomed');
    }
}

// تحسين وظيفة سحب الصورة
function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    let currentX, currentY;
    
    // الحصول على الموضع الحالي
    if (e.type === 'mousemove') {
        currentX = e.clientX;
        currentY = e.clientY;
    } else if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
    }
    
    // حساب مقدار الحركة
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    
    // تطبيق حساسية مختلفة للأجهزة المحمولة
    const isMobile = window.innerWidth <= 767;
    const sensitivity = isMobile ? 0.8 : 1;
    
    // السماح بالتمرير فقط عند التكبير
    if (zoomLevel > 1) {
        // تحديث الموضع
        translateX += deltaX * sensitivity;
        translateY += deltaY * sensitivity;
        
        // حساب حدود التمرير بناءً على مستوى التكبير
        const containerWidth = window.innerWidth * 0.85; // 85% من عرض النافذة
        const containerHeight = window.innerHeight * 0.75; // 75% من ارتفاع النافذة
        const modalImage = document.getElementById('modal-image');
        
        if (modalImage) {
            const scaledWidth = modalImage.offsetWidth * zoomLevel;
            const scaledHeight = modalImage.offsetHeight * zoomLevel;
            
            const maxTranslateX = Math.max(0, (scaledWidth - containerWidth) / 2);
            const maxTranslateY = Math.max(0, (scaledHeight - containerHeight) / 2);
            
            // تطبيق الحدود مع مراعاة التناسب
            translateX = Math.min(Math.max(translateX, -maxTranslateX), maxTranslateX);
            translateY = Math.min(Math.max(translateY, -maxTranslateY), maxTranslateY);
        }
        
        // تحديث موضع الصورة
        updateImageTransform();
    }
    
    // إعادة تعيين نقطة البداية
    startX = currentX;
    startY = currentY;
}

// تحسين فتح نافذة تكبير الصورة للهواتف
function openImageModal() {
    const modal = document.getElementById('image-modal');
    const currentImage = document.getElementById('current-image');
    const modalImage = document.getElementById('modal-image');
    const zoomContainer = document.querySelector('.zoom-container');
    
    // جمع كل صور المنتج
    allImages = [];
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        allImages.push(thumbnail.src);
    });
    
    // إضافة الصورة الرئيسية إذا لم تكن موجودة في الصور المصغرة
    if (!allImages.includes(currentImage.src)) {
        allImages.unshift(currentImage.src);
    }
    
    // تحديد الصورة الحالية
    currentImageIndex = allImages.indexOf(currentImage.src);
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    // تعيين مصدر الصورة في النافذة
    modalImage.src = currentImage.src;
    
    // إعادة ضبط التكبير والموضع
    resetZoom();
    
    // اكتشاف نوع الجهاز
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
    
    // إظهار النافذة
    modal.style.display = 'block';
    
    // منع التمرير في الخلفية
    document.body.style.overflow = 'hidden';
    
    // إضافة إرشادات التكبير والتمرير
    showZoomInstructions(isMobile);
    
    // فحص اتجاه الصورة بعد تحميلها
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
    
    // تتبع الحدث باستخدام Facebook Pixel إذا كان متاحًا
    if (typeof fbq === 'function') {
        fbq('track', 'ViewContent', {
            content_type: 'product_image',
            content_ids: ['PROD12345']
        });
    }
}

// تحسين وظيفة إظهار إرشادات التكبير للهواتف
function showZoomInstructions(isMobile) {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent) return;
    
    // التأكد من حذف أي إرشادات قديمة
    const existingInstructions = document.querySelector('.zoom-instructions');
    if (existingInstructions) {
        existingInstructions.remove();
    }
    
    // إنشاء إرشادات جديدة
    const instructions = document.createElement('div');
    instructions.className = 'zoom-instructions';
    
    // تغيير النص حسب نوع الجهاز
    if (isMobile) {
        instructions.innerHTML = '<i class="fas fa-hand-pointer"></i> انقر مرتين للتكبير، اسحب للتحريك';
    } else {
        instructions.innerHTML = '<i class="fas fa-search-plus"></i> استخدم أزرار التكبير أو عجلة الماوس';
    }
    
    modalContent.appendChild(instructions);
    
    // عرض الإرشادات بعد التأكد من وجود النافذة
    setTimeout(() => {
        instructions.classList.add('show');
        
        // إخفاء الإرشادات تلقائيًا بعد 4 ثوانٍ
        setTimeout(() => {
            instructions.classList.remove('show');
        }, 4000);
    }, 300);
}

// تحسين وظيفة التكبير للاستجابة بشكل أفضل على الهواتف
function changeZoom(amount) {
    const prevZoom = zoomLevel;
    const zoomContainer = document.querySelector('.zoom-container');
    const modalImage = document.getElementById('modal-image');
    
    // تعديل كمية التكبير للهواتف
    const isMobile = window.innerWidth <= 768;
    const zoomStep = isMobile ? (amount * 0.8) : amount; // تقليل قيمة التكبير للهواتف
    
    // تغيير مستوى التكبير
    zoomLevel += zoomStep;
    
    // تحديد حدود التكبير (تقليل الحد الأقصى على الهواتف)
    if (zoomLevel < 1) zoomLevel = 1;
    if (zoomLevel > (isMobile ? 3 : 4)) zoomLevel = (isMobile ? 3 : 4);
    
    // عدم التنفيذ إذا لم يتغير مستوى التكبير
    if (prevZoom === zoomLevel) return;
    
    // حفظ موضع المركز قبل التكبير
    const centerX = translateX;
    const centerY = translateY;
    
    // إعادة حساب الموضع للحفاظ على نقطة المركز
    if (prevZoom !== 1 && zoomLevel !== 1) {
        translateX = (centerX / prevZoom) * zoomLevel;
        translateY = (centerY / prevZoom) * zoomLevel;
    } else if (zoomLevel === 1) {
        // إعادة الصورة للمركز عند التصغير للحجم الطبيعي
        translateX = 0;
        translateY = 0;
    }
    
    // تطبيق التغييرات
    updateImageTransform();
    
    // تحديث حالة التكبير
    updateZoomStatus();
    
    // إضافة فئة للتمييز عند التكبير
    if (zoomLevel > 1) {
        zoomContainer.classList.add('zoomed');
    } else {
        zoomContainer.classList.remove('zoomed');
    }
}

// تحسين وظيفة السحب على الهواتف
function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    let currentX, currentY;
    
    // الحصول على الموضع الحالي
    if (e.type === 'mousemove') {
        currentX = e.clientX;
        currentY = e.clientY;
    } else if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
    }
    
    // حساب مقدار الحركة
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    
    // تطبيق حساسية مختلفة للأجهزة المحمولة
    const isMobile = window.innerWidth <= 768;
    // زيادة حساسية الهواتف لتحسين تجربة السحب
    const sensitivity = isMobile ? 1.0 : 1.0;
    
    // السماح بالتمرير فقط عند التكبير
    if (zoomLevel > 1) {
        // تحديث الموضع مع تطبيق الحساسية
        translateX += deltaX * sensitivity;
        translateY += deltaY * sensitivity;
        
        // حساب حدود التمرير بناءً على مستوى التكبير والحاوية
        const modalImage = document.getElementById('modal-image');
        
        if (modalImage) {
            // حساب أبعاد الصورة المكبرة
            const scaledWidth = modalImage.offsetWidth * zoomLevel;
            const scaledHeight = modalImage.offsetHeight * zoomLevel;
            
            // ضبط الحدود نسبيًا لتجنب مشكلات على الهواتف
            const containerWidth = window.innerWidth * (isMobile ? 0.9 : 0.85);
            const containerHeight = window.innerHeight * (isMobile ? 0.7 : 0.8);
            
            // حساب الحدود القصوى للحركة
            const maxTranslateX = Math.max(0, (scaledWidth - containerWidth) / 2);
            const maxTranslateY = Math.max(0, (scaledHeight - containerHeight) / 2);
            
            // تطبيق الحدود بشكل أكثر مرونة للهواتف
            translateX = Math.min(Math.max(translateX, -maxTranslateX * 1.1), maxTranslateX * 1.1);
            translateY = Math.min(Math.max(translateY, -maxTranslateY * 1.1), maxTranslateY * 1.1);
        }
        
        // تحديث موضع الصورة
        updateImageTransform();
    }
    
    // إعادة تعيين نقطة البداية
    startX = currentX;
    startY = currentY;
}

// تحسين تجربة النقر المزدوج للتكبير على الهواتف
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    const modalImage = document.getElementById('modal-image');
    if (modalImage) {
        // تحسين تجربة النقر المزدوج على الهواتف
        let lastTap = 0;
        let touchTimeout;
        
        modalImage.addEventListener('touchend', function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            // تحسين اكتشاف النقر المزدوج على الهواتف
            clearTimeout(touchTimeout);
            
            if (tapLength < 400 && tapLength > 0) {
                // نقر مزدوج - تبديل حالة التكبير
                if (zoomLevel === 1) {
                    // مستوى تكبير أقل للهواتف
                    changeZoom(window.innerWidth <= 768 ? 1 : 1.5);
                } else {
                    resetZoom();
                }
                
                e.preventDefault();
            } else {
                // انتظار لفترة قصيرة للتحقق من النقر المزدوج
                touchTimeout = setTimeout(() => {
                    // إجراء للنقر الفردي إذا احتجنا
                }, 300);
            }
            
            lastTap = currentTime;
        });
        
        // إضافة تكبير بعجلة الماوس للأجهزة المكتبية
        modalImage.addEventListener('wheel', function(e) {
            e.preventDefault();
            
            // تغيير التكبير بناءً على اتجاه عجلة الماوس
            if (e.deltaY < 0) {
                // تصغير قيمة التغيير للحصول على تجربة أكثر سلاسة
                changeZoom(0.25);
            } else {
                changeZoom(-0.25);
            }
        });
    }
    
    // ...existing code...
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
    
    // الحصول على منتجات فئة محددة
    function getCategoryProducts(categoryId) {
        // تحديد المنتجات حسب الفئة
        switch(categoryId) {
            case 'electric-bikes':
                return filterProductsByCategory('دراجات كهربائية');
            case 'scooters':
                return filterProductsByCategory('تروتنيت');
            case 'bikes':
                return filterProductsByCategory('دراجات هواىية');
            case 'electric-cars':
                return filterProductsByCategory('سيارات كهربائية');
            default:
                return [];
        }
    }
    
    // فلترة المنتجات حسب الفئة
    function filterProductsByCategory(category) {
        if (!window.products) return [];
        return window.products.filter(product => product.category === category);
    }
});

// ...existing code...
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");
const scrollThreshold = 5; // الحد الأدنى للحركة قبل التفاعل

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {  
        if (scrollTop > lastScrollTop) {
            // إخفاء القائمة عند التمرير لأسفل
            navbar.style.top = "-70px";
        } else {
            // إظهار القائمة عند التمرير لأعلى
            navbar.style.top = "0";
        }
    }

    lastScrollTop = scrollTop;
});



    document.addEventListener("DOMContentLoaded", function() {
        var currentURL = encodeURIComponent(window.location.href); // أخذ الرابط الحالي مع تشفيره
        var whatsappNumber = "212762609147"; // ضع رقم الواتساب بدون "+"
        var whatsappLink = "https://wa.me/" + whatsappNumber + "?text=مرحبًا، أريد الاستفسار عن: " + currentURL;

        document.getElementById("whatsapp-button").setAttribute("href", whatsappLink);
    });
