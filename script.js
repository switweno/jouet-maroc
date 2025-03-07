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
    
    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    // Get city directly from text input instead of select dropdown
    const city = document.getElementById('city').value;
    
    const quantity = document.getElementById('quantity').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Validate form data
    if (!name || !phone || !address || !city) {
        alert("الرجاء ملء جميع الحقول المطلوبة");
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
        
        // Open WhatsApp with the message
        window.open(`https://wa.me/${+212672568976}?text=${message}`, '_blank');
        
        // Reset form
        document.getElementById('order-form').reset();
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
        header.addEventListener('click', function() {
            const category = this.parentElement;
            const isExpanded = category.classList.contains('expanded');
            
            // Close all other expanded sections
            document.querySelectorAll('.feature-category.expanded').forEach(expandedCategory => {
                // Skip the current category if we're closing it anyway
                if (expandedCategory !== category || !isExpanded) {
                    expandedCategory.classList.remove('expanded');
                }
            });
            
            // Toggle the current category
            category.classList.toggle('expanded');
        });
    });
}

// Function to ensure thumbnail scrolling works on all devices
function setupThumbnailScrolling() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    if (!thumbnailsContainer) return;
    
    // Force overflow-x property to ensure scrolling works
    thumbnailsContainer.style.overflowX = 'auto';
    
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
