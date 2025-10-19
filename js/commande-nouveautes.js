document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const productImage = document.getElementById('product-image');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productQuantity = document.getElementById('product-quantity');
    const productTotal = document.getElementById('product-total');
    const customerForm = document.getElementById('customer-form');
    const quantityMinusBtn = document.getElementById('quantity-minus');
    const quantityPlusBtn = document.getElementById('quantity-plus');
    
    // Variables pour stocker les données du produit
    let currentProduct = {
        id: null,
        name: '',
        price: 0,
        image: '',
        quantity: 1
    };
    
    // Image par défaut pour éviter un src vide
    const defaultImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    
    // Fonction pour récupérer les paramètres de l'URL
    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            id: params.get('id'),
            name: params.get('name'),
            price: params.get('price'),
            image: params.get('image')
        };
    }
    
    // Fonction pour mettre à jour le total
    function updateTotal() {
        const total = currentProduct.price * currentProduct.quantity;
        productTotal.textContent = `${total} DH`;
    }
    
    // Initialiser la page avec les données du produit
    function initPage() {
        const params = getURLParams();
        
        if (!params.id || !params.name || !params.price) {
            // Rediriger vers la page des nouveautés si des paramètres sont manquants
            window.location.href = 'nouvel-arrivage.html';
            return;
        }
        
        // Stocker les données du produit
        currentProduct.id = params.id;
        currentProduct.name = decodeURIComponent(params.name || '');
        currentProduct.price = parseInt(params.price || 0);
        currentProduct.image = decodeURIComponent(params.image || '');
        currentProduct.quantity = 1;
        
        // Mettre à jour l'interface utilisateur
        productName.textContent = currentProduct.name;
        productPrice.textContent = `${currentProduct.price} DH`;
        productQuantity.value = currentProduct.quantity;
        
        // Mettre à jour l'image du produit
        if (currentProduct.image && currentProduct.image.trim() !== '') {
            productImage.src = currentProduct.image;
            productImage.alt = currentProduct.name;
        } else {
            productImage.src = defaultImage;
            productImage.alt = "Image non disponible";
            console.warn("Image du produit non définie, utilisation de l'image par défaut");
        }
        
        // Mettre à jour le total
        updateTotal();
    }
    
    // Gestion des boutons de quantité
    quantityMinusBtn.addEventListener('click', function() {
        if (productQuantity.value > 1) {
            productQuantity.value = parseInt(productQuantity.value) - 1;
            currentProduct.quantity = parseInt(productQuantity.value);
            updateTotal();
        }
    });
    
    quantityPlusBtn.addEventListener('click', function() {
        if (productQuantity.value < 10) {
            productQuantity.value = parseInt(productQuantity.value) + 1;
            currentProduct.quantity = parseInt(productQuantity.value);
            updateTotal();
        }
    });
    
    // Mise à jour de la quantité lorsque l'utilisateur la modifie directement
    productQuantity.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }
        this.value = value;
        currentProduct.quantity = value;
        updateTotal();
    });
    
    // Gestion de la soumission du formulaire
    customerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const fullname = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const quantity = currentProduct.quantity;
        const totalPrice = currentProduct.price * quantity;
        
        // Validation simple
        if (!fullname || !phone || !address || !city) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Préparer le message WhatsApp
        const whatsappNumber = "212762609147"; // Numéro WhatsApp de Jouet Maroc
        const message = encodeURIComponent(
            `*Nouvelle commande depuis le site web (Nouveautés)*\n` +
            `----------------------------\n` +
            `*Produit:* ${currentProduct.name}\n` +
            `*Prix unitaire:* ${currentProduct.price} DH\n` +
            `*Quantité:* ${quantity}\n` +
            `*Total:* ${totalPrice} DH\n` +
            `----------------------------\n` +
            `*Nom:* ${fullname}\n` +
            `*Téléphone:* ${phone}\n` +
            `*Adresse:* ${address}\n` +
            `*Ville:* ${city}`
        );
        
        // Rediriger vers WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Réinitialiser le formulaire
        customerForm.reset();
    });
    
    // Initialiser la page au chargement
    initPage();
});
