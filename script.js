// Image slider functionality
function changeImage(src) {
    document.getElementById('current-image').src = src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) {
            thumb.classList.add('active');
        }
    });
    
    // Track event in Facebook Pixel
    if (typeof fbq === 'function') {
        fbq('track', 'ViewContent');
    }
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

// Scroll to order form - update to use corrected ID
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

// Image zoom functionality
let zoomLevel = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;
const modalImage = document.getElementById('modal-image');

// Global variables for image navigation
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
    
    // Re-enable body scrolling
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
    modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // إظهار شاشة التحميل أثناء تحميل الصفحة
    showLoader();
    
    // استدعاء الدالة الأصلية
    try {
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
        
        // Initialize accordion
        setupAccordion();
        
        // Add this new function to ensure thumbnail scrolling works
        setupThumbnailScrolling();
        
        // Check if images loaded correctly
        document.querySelectorAll('img').forEach(img => {
            img.onerror = function() {
                this.src = 'placeholder.jpg'; // Fallback image
            };
        });
        
        // إخفاء شاشة التحميل بعد اكتمال تحميل الصفحة
        window.addEventListener('load', function() {
            setTimeout(hideLoader, 500);
        });
        
    } catch (error) {
        hideLoader(); // تأكد من إخفاء شاشة التحميل في حالة الخطأ
        console.error("Error initializing page:", error);
    }
});

// Improve mobile touch handling
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

// End dragging
function endDrag() {
    isDragging = false;
}

// Accordion functionality
function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        const toggleBtn = header.querySelector('.accordion-toggle');
        const category = header.parentElement;
        const isExpanded = category.classList.contains('expanded');
        
        // تعيين حالة التوسيع الحالية
        toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        
        header.addEventListener('click', function() {
            const category = this.parentElement;
            const isExpanded = category.classList.contains('expanded');
            const toggleBtn = this.querySelector('.accordion-toggle');
            
            // إغلاق جميع الأقسام المفتوحة الأخرى
            document.querySelectorAll('.feature-category.expanded').forEach(expandedCategory => {
                // تخطي القسم الحالي إذا كنا نقوم بإغلاقه على أي حال
                if (expandedCategory !== category || !isExpanded) {
                    expandedCategory.classList.remove('expanded');
                    
                    // تحديث حالة أزرار التبديل للأقسام الأخرى
                    const otherBtn = expandedCategory.querySelector('.accordion-toggle');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });
            
            // تبديل القسم الحالي
            category.classList.toggle('expanded');
            
            // تحديث حالة زر التبديل الحالي
            toggleBtn.setAttribute('aria-expanded', category.classList.contains('expanded') ? 'true' : 'false');
        });
    });
}

// Function to ensure thumbnail scrolling works on all devices
function setupThumbnailScrolling() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    if (!thumbnailsContainer) return;
    
    // Force overflow-x property to ensure scrolling works
    thumbnailsContainer.style.overflowX = 'auto';
    thumbnailsContainer.style.webkitOverflowScrolling = 'touch';
    
    // Ensure active thumbnail is visible by scrolling to it
    const activeThumb = document.querySelector('.thumbnail.active');
    if (activeThumb) {
        // Add a slight delay to ensure DOM is fully ready
        setTimeout(() => {
            activeThumb.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'center'  
            });
        }, 100);
    }
    
    // Ensure scrolling is handled correctly on touch devices
    thumbnailsContainer.addEventListener('touchstart', function(e) {
        // Don't prevent default here to allow native scrolling
    }, { passive: true });
}

// استبدال أي استخدام لـ window.onunload بـ window.onpagehide أو window.onbeforeunload
// على سبيل المثال:
window.addEventListener('pagehide', function(event) {
    // الكود اللازم عند مغادرة الصفحة
});

// بدلاً من:
// window.addEventListener('unload', function(event) { ... });

// تمت إزالة أو تعديل دوال شاشة التحميل
function showLoader() {
    // تم تعطيل وظيفة التحميل - لا تفعل شيئاً
    return;
}

function hideLoader() {
    // تم تعطيل وظيفة التحميل - لا تفعل شيئاً
    return;
}

// Load product data based on URL parameter
function loadProductFromURL() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('product');
    
    // If no product ID is specified, use the default product
    if (!productId) {
        productId = "velo-electrique-harley-u9"; // Default product
    }
    
    // Find the product in our products array
    const product = products.find(p => p.id === productId);
    
    // If product not found, use the first product as fallback
    const productData = product || products[0];
    
    // Update page title
    document.title = productData.title + " | jouet maroc";
    
    // Update product details
    updateProductDisplay(productData);
    
    // بعد تحديث معلومات المنتج الرئيسي، قم بتحديث المنتجات ذات الصلة أيضًا
    updateRelatedProducts();
}

// Function to update the UI with product data
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
    
    // Update thumbnails
    const thumbnailsContainer = document.getElementById('thumbnails-slider');
    thumbnailsContainer.innerHTML = ''; // Clear existing thumbnails
    
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.classList.add('thumbnail');
        if (index === 0) thumbnail.classList.add('active');
        thumbnail.src = image;
        thumbnail.alt = `صورة مصغرة ${index + 1}`;
        thumbnail.onclick = function() { changeImage(this.src); };
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

// تعديل المعالج الرئيسي
document.addEventListener('DOMContentLoaded', function() {
    try {
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
