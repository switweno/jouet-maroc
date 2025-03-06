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

// Scroll to order form
function scrollToForm() {
    const formElement = document.getElementById('order-form');
    formElement.scrollIntoView({ behavior: 'smooth' });
    
    // Track event in Facebook Pixel
    if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout');
    }
}

// Form submission via WhatsApp
function submitFormViaWhatsApp(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
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
    const totalPrice = parseInt(quantity) * parseFloat(price);
    
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
    
    // Replace with your WhatsApp number
    const phoneNumber = '212600000000';
    
    // Track event in Facebook Pixel
    if (typeof fbq === 'function') {
        fbq('track', 'Purchase', {
            value: parseFloat(price),
            currency: 'MAD',
            content_name: productName,
            content_type: 'product',
            content_ids: ['PROD12345'],
            contents: [
                {
                    id: 'PROD12345',
                    quantity: parseInt(quantity),
                    item_price: parseFloat(price)
                }
            ]
        });
    }
    
    // Show confirmation before opening WhatsApp
    if (confirm("سيتم إرسال طلبك عبر واتساب. هل تريد المتابعة؟")) {
        // Open WhatsApp with the message
        window.open(`https://wa.me/${+212762609147}?text=${message}`, '_blank');
        
        // Reset form
        document.getElementById('order-form').reset();
    }
}

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

// Open image modal
function openImageModal() {
    const modal = document.getElementById('image-modal');
    const currentImage = document.getElementById('current-image');
    const modalImage = document.getElementById('modal-image');
    
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
});

// Start dragging the image
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

// Drag the image
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
    
    // Update position
    translateX += deltaX;
    translateY += deltaY;
    
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
