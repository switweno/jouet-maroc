document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const buyNowButtons = document.querySelectorAll('.buy-now-btn');
    const modal = document.getElementById('quick-purchase-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalProductImg = document.getElementById('modal-product-img');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductPrice = document.getElementById('modal-product-price');
    const quickOrderForm = document.getElementById('quick-order-form');
    const quantityInput = document.getElementById('quick-quantity');
    const quantityMinusBtn = document.getElementById('quantity-minus');
    const quantityPlusBtn = document.getElementById('quantity-plus');
    
    // Éléments DOM pour l'aperçu d'image
    const imageModal = document.getElementById('image-modal');
    const modalPreviewImage = document.getElementById('modal-preview-image');
    const closeImageModalBtn = document.querySelector('.close-image-modal');
    const productImages = document.querySelectorAll('.new-product-image img');
    
    // Variables pour stocker les données du produit sélectionné
    let currentProduct = {
        id: null,
        name: '',
        price: 0,
        image: '',
        quantity: 1
    };
    
    // Image par défaut pour éviter un src vide
    const defaultImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    
    // Ajouter des écouteurs d'événements pour l'aperçu d'image
    productImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            modalPreviewImage.src = this.src;
            modalPreviewImage.alt = this.alt;
            imageModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Empêcher le défilement
            
            return false; // Empêcher la propagation aux éléments parents
        });
    });
    
    // Ajouter également l'événement de clic aux conteneurs d'images
    document.querySelectorAll('.new-product-image').forEach(container => {
        container.addEventListener('click', function(e) {
            // Ne déclencher que si le clic est directement sur le conteneur
            if (e.target === this) {
                const img = this.querySelector('img');
                if (img) {
                    modalPreviewImage.src = img.src;
                    modalPreviewImage.alt = img.alt;
                    imageModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
    
    // Fermer la modal d'aperçu d'image
    closeImageModalBtn.addEventListener('click', function() {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fermer la modal d'aperçu d'image au clic en dehors
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Ajouter des écouteurs d'événements aux boutons d'achat
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Récupérer les données du produit
            currentProduct.id = this.getAttribute('data-product-id');
            currentProduct.name = this.getAttribute('data-product-name');
            currentProduct.price = this.getAttribute('data-product-price');
            currentProduct.image = this.getAttribute('data-product-image');
            currentProduct.quantity = 1; // Réinitialiser la quantité à 1
            
            // Mettre à jour le contenu de la modal
            modalProductName.textContent = currentProduct.name || 'Produit';
            modalProductPrice.textContent = `${currentProduct.price || '0'} DH`;
            
            // S'assurer que l'attribut src n'est jamais vide
            if (currentProduct.image && currentProduct.image.trim() !== '') {
                modalProductImg.src = currentProduct.image;
                modalProductImg.alt = currentProduct.name;
            } else {
                // Utiliser une image par défaut si l'image n'est pas définie
                modalProductImg.src = defaultImage;
                modalProductImg.alt = "Image non disponible";
                console.warn("Image du produit non définie, utilisation de l'image par défaut");
            }
            
            quantityInput.value = '1'; // Réinitialiser la quantité affichée
            
            // Afficher la modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
            
            return false;
        });
    });
    
    // Améliorer la gestion du bouton de fermeture pour la modal d'achat
    if (closeModalBtn) {
        // Remplacer l'ancien gestionnaire d'événements par un nouveau
        closeModalBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Réactiver le défilement
            console.log("Modal fermée via bouton X"); // Pour le débogage
        };
    } else {
        console.error("Le bouton de fermeture n'a pas été trouvé!");
    }
    
    // S'assurer que les clics en dehors de la modal ferment aussi la modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log("Modal fermée via clic extérieur"); // Pour le débogage
        }
        
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Gestion des boutons de quantité
    quantityMinusBtn.addEventListener('click', function() {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            currentProduct.quantity = parseInt(quantityInput.value);
        }
    });
    
    quantityPlusBtn.addEventListener('click', function() {
        if (quantityInput.value < 10) { // Limiter à 10 articles maximum
            quantityInput.value = parseInt(quantityInput.value) + 1;
            currentProduct.quantity = parseInt(quantityInput.value);
        }
    });
    
    // Mise à jour de la quantité lorsque l'utilisateur la modifie directement
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }
        this.value = value;
        currentProduct.quantity = value;
    });
    
    // Gestion de la soumission du formulaire
    quickOrderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const fullname = document.getElementById('quick-fullname').value.trim();
        const phone = document.getElementById('quick-phone').value.trim();
        const address = document.getElementById('quick-address').value.trim();
        const city = document.getElementById('quick-city').value.trim();
        const quantity = currentProduct.quantity;
        
        // Validation simple
        if (!fullname || !phone || !address || !city) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Préparer le message WhatsApp
        const whatsappNumber = "212762609147"; // Numéro WhatsApp de Jouet Maroc
        const message = encodeURIComponent(
            `*Nouvelle commande depuis le site web*\n` +
            `----------------------------\n` +
            `*Produit:* ${currentProduct.name}\n` +
            `*Prix:* ${currentProduct.price} DH\n` +
            `*Quantité:* ${quantity}\n` +
            `*Total:* ${currentProduct.price * quantity} DH\n` +
            `----------------------------\n` +
            `*Nom:* ${fullname}\n` +
            `*Téléphone:* ${phone}\n` +
            `*Adresse:* ${address}\n` +
            `*Ville:* ${city}`
        );
        
        // Rediriger vers WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Fermer la modal après l'envoi
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Réinitialiser le formulaire
        quickOrderForm.reset();
    });
    
    // Fermer les modales avec la touche Échap
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                console.log("Modal fermée via touche Échap"); // Pour le débogage
            }
            
            if (imageModal.style.display === 'flex') {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Vérifier si les images des produits existent
    document.querySelectorAll('.new-product-image img').forEach(img => {
        img.onerror = function() {
            console.warn(`Impossible de charger l'image: ${this.src}`);
            this.src = defaultImage;
            this.alt = "Image non disponible";
        };
    });
});
