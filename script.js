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

function changeImage(src, direction = null) {
    if (!src) return;

    const currentImage = document.getElementById('current-image');
    if (!currentImage) return;

    if (!direction) {
        const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));
        const activeIndex = thumbnails.findIndex(thumb => thumb.classList.contains('active'));
        const newIndex = thumbnails.findIndex(thumb => thumb.src === src);

        if (activeIndex !== -1 && newIndex !== -1) {
            direction = newIndex > activeIndex ? 'right' : 'left';
        } else {
            direction = 'fade'; 
        }
    }

    const oldImageSrc = currentImage.src;
    const newImageSrc = src;

    const preloadImage = new Image();
    preloadImage.src = newImageSrc;
    preloadImage.onload = () => {
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
            slidingImagesContainer.style.willChange = 'transform, opacity'; 
            mainImageContainer.style.position = 'relative';
            mainImageContainer.appendChild(slidingImagesContainer);
        }

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
        oldImageClone.style.willChange = 'transform, opacity'; 
        slidingImagesContainer.appendChild(oldImageClone);

        const newImageElement = document.createElement('img');
        newImageElement.src = newImageSrc;
        newImageElement.className = 'entering-image';
        newImageElement.style.position = 'absolute';
        newImageElement.style.top = '0';
        newImageElement.style.width = '100%';
        newImageElement.style.height = '100%';
        newImageElement.style.objectFit = 'cover';
        newImageElement.style.zIndex = '2';
        newImageElement.style.willChange = 'transform, opacity'; 
        if (direction === 'right') {
            newImageElement.style.transform = 'translateX(100%)';
        } else if (direction === 'left') {
            newImageElement.style.transform = 'translateX(-100%)';
        } else {
            newImageElement.style.opacity = '0';
        }

        slidingImagesContainer.appendChild(newImageElement);

        animateTransition(oldImageClone, newImageElement, direction, () => {
            currentImage.src = newImageSrc;

            while (slidingImagesContainer.firstChild) {
                slidingImagesContainer.removeChild(slidingImagesContainer.firstChild);
            }

            updateActiveThumbnail(src);
        });
    };
}

function animateTransition(oldImage, newImage, direction, onComplete) {
    const duration = 250; // مدة الانتقال بالمللي ثانية
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
            onComplete(); 
        }
    }

    requestAnimationFrame(step);
}

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
        productId = "trottinette-Tank-m41"; // Default product
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





// معالجة روابط المنتجات
function setupProductLinks() {
    document.querySelectorAll('.related-products .product-link').forEach(link => {
        // إزالة معالجات الأحداث القديمة
        link.onclick = null;

        // إضافة معالج حدث جديد
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const href = this.getAttribute('href');
            const productId = new URLSearchParams(href.split('?')[1]).get('product');

            if (productId) {
                // تحديث عنوان URL فقط
                history.pushState({}, '', `?product=${productId}`);

                // تحميل المنتج مباشرة
                loadProductFromURL();
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

function updateMetaTag(selector, attrName, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute(attrName, value);
  } else {
    // إذا ما لقيتش العنصر، نصايب واحد جديد
    const meta = document.createElement('meta');
    if (selector.includes('property')) {
      const prop = selector.match(/property=["']([^"']+)["']/)[1];
      meta.setAttribute('property', prop);
    } else if (selector.includes('name')) {
      const name = selector.match(/name=["']([^"']+)["']/)[1];
      meta.setAttribute('name', name);
    }
    meta.setAttribute(attrName, value);
    document.head.appendChild(meta);
  }
}

function updateProductMeta(product) {
  const baseUrl = 'https://jouet-maroc.com/'; // عدل حسب موقعك
  const imageUrl = (product.images && product.images.length > 0) ? baseUrl + product.images[0] : baseUrl + 'default-image.webp';

  // تحديث العنوان
  document.title = product.title + " | Jouet Maroc";

  // تحديث الوصف - يمكنك تعديل الوصف حسب الحاجة
  const descriptionContent = product.warranty || "عروض Jouet Maroc لأفضل التروتينات والدراجات الكهربائية.";

  updateMetaTag('meta[name="description"]', 'content', descriptionContent);

  // تحديث og:title و og:description و og:image
  updateMetaTag('meta[property="og:title"]', 'content', product.title + " | Jouet Maroc");
  updateMetaTag('meta[property="og:description"]', 'content', descriptionContent);
  updateMetaTag('meta[property="og:image"]', 'content', imageUrl);

  // تحديث twitter:title و twitter:description و twitter:image
  updateMetaTag('meta[name="twitter:title"]', 'content', product.title + " | Jouet Maroc");
  updateMetaTag('meta[name="twitter:description"]', 'content', descriptionContent);
  updateMetaTag('meta[name="twitter:image"]', 'content', imageUrl);
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
        <span style="color: #000; font-weight: 600;">العلامة التجارية:</span>
        <span style="color: #000; margin-right: 5px;">${product.brand}</span>
    `;

    document.querySelector('.product-category').innerHTML = `
        <span style="color: #000; font-weight: 600;">الفئة:</span>
        <span style="color: #000; margin-right: 5px;">${product.category}</span>
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
    
const videoSection = document.querySelector('.product-video-section');
const videoContainer = document.querySelector('.video-container');

if (typeof product !== "undefined" && product.videoURL) {
    const isPortrait = product.id === "trottinette-bison-gt-1000";
    const width = isPortrait ? "267" : "560";
    const height = isPortrait ? "476" : "314";

    // نؤجل تحميل الفيديو إلى أن يظهر القسم في الشاشة
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videoContainer.classList.toggle('portrait-video', isPortrait);

                videoContainer.innerHTML = `
                    <iframe 
                        src="${product.videoURL}" 
                        width="${width}" 
                        height="${height}" 
                        style="border:none;overflow:hidden" 
                        scrolling="no" 
                        frameborder="0" 
                        allowfullscreen="true" 
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title="فيديو المنتج">
                    </iframe>
                `;

                observer.unobserve(videoSection); // نوقف المراقبة بعد التحميل
            }
        });
    }, {
        threshold: 0,          // أي ظهور حتى 1px كافٍ لتفعيل
    rootMargin: '1000px'
    });

    observer.observe(videoSection);
    videoSection.style.display = "block";
} else {
    if (videoSection) {
        videoSection.style.display = "none";
    }
}




    
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
        
           // تحميل المنتج فوراً بلا تأخير
    loadProductFromURL();
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

    let mailtoLink = `mailto:jouet-maroc@gmail.com?subject=رسالة من ${name}&body=${message}%0A%0Aالبريد الإلكتروني: ${email}`;
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
    // تحقق واش العنصر موجود قبل ما نخدم عليه
    if (!productsGrid) return;

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// نداء الدالة فقط إذا كان العنصر موجود
if (productsGrid) {
    loadProducts();
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

function displayResults(results) {
    if (!searchResults || !searchInput) return; // تحقق قبل أي استعمال

    // مسح النتائج السابقة
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">Aucun résultat trouvé</div>';
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
   




