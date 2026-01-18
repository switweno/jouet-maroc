// Script pour la page de commande

// Numéro WhatsApp pour les commandes
const whatsappNumber = '212762609147';

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  console.log("Page de commande chargée");
  
  // Récupérer les éléments DOM
  const productImage = document.getElementById('product-image');
  const productName = document.getElementById('product-name');
  const productColor = document.getElementById('product-color');
  const productQuantity = document.getElementById('product-quantity');
  const productPrice = document.getElementById('product-price');
  const productTotal = document.getElementById('product-total');
  const customerForm = document.getElementById('customer-form');
  const backButton = document.getElementById('back-to-product');
  
  // Vérifier que les éléments DOM existent
  if (!productImage || !productName || !productQuantity || !productPrice || !productTotal) {
    console.error("Éléments DOM manquants pour l'affichage du produit");
    return;
  }
  
  // Produit par défaut à utiliser si aucun n'est sélectionné
  const defaultProduct = {
    name: "Produit",
    price: 1000,
    quantity: 1,
    image: "images/slider/finaliser-votre-commande-01.webp",
    total: 1000
  };

  // Charger les données du produit depuis localStorage
  loadProductData();
  
  // Charger les données client précédemment sauvegardées
  loadCustomerData();
  
  // Configurer le formulaire
  if (customerForm) {
    setupForm();
  } else {
    console.error("Formulaire client non trouvé");
  }
  
  // Configurer le bouton de retour
  if (backButton) {
    setupBackButton();
  } else {
    console.error("Bouton de retour non trouvé");
  }

  // Fonction pour charger les données du produit
  function loadProductData() {
    try {
      // Récupérer les données du localStorage
      const productData = localStorage.getItem('commandeProduct');
      console.log('Données brutes récupérées de localStorage:', productData);
      
      if (!productData) {
        console.log("Aucun produit sélectionné, utilisation du produit par défaut");
        displayProductDetails(defaultProduct);
        return;
      }
      
      try {
        const product = JSON.parse(productData);
        console.log('Produit après JSON.parse:', product);
        
        // S'assurer que la quantité est un nombre
        if (product && typeof product.quantity !== 'undefined') {
          product.quantity = Number(product.quantity);
          
          // Recalculer le total pour être sûr
          if (product.price) {
            // Utiliser le prix de gros si sélectionné
            if (product.isWholesale && product.wholesalePrice) {
              product.total = product.wholesalePrice * product.quantity;
            } else {
              product.total = product.price * product.quantity;
            }
          }
        }
        
        displayProductDetails(product);
      } catch (parseError) {
        console.error('Erreur lors du parsing JSON:', parseError);
        displayProductDetails(defaultProduct);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données du produit:', error);
      displayProductDetails(defaultProduct);
    }
  }

  // Afficher les détails du produit
  function displayProductDetails(product) {
    if (!product) {
      product = defaultProduct;
      console.log("Utilisation du produit par défaut car aucun produit fourni");
    }
    
    // Vérifier explicitement chaque propriété
    const productToDisplay = {
      name: product.name || defaultProduct.name,
      price: Number(product.price || defaultProduct.price),
      quantity: Number(product.quantity || defaultProduct.quantity),
      image: product.image || defaultProduct.image,
      isWholesale: product.isWholesale || false,
      wholesalePrice: Number(product.wholesalePrice || 0)
    };
    
    // N'ajouter la couleur que si elle existe vraiment et n'est pas vide
    if (product.color && typeof product.color === 'string' && product.color.trim() !== '') {
      productToDisplay.color = product.color.trim();
    }
    
    console.log('Produit formaté pour affichage:', productToDisplay);
    
    // Image du produit
    productImage.src = productToDisplay.image;
    productImage.alt = productToDisplay.name;
    
    // Nom du produit
    productName.textContent = productToDisplay.name;
    
    // Couleur (si disponible)
    if (productColor) {
      if (productToDisplay.color) {
        productColor.textContent = `Couleur: ${productToDisplay.color}`;
        productColor.style.display = 'block';
      } else {
        productColor.style.display = 'none';
      }
    }
    
    // Quantité
    productQuantity.textContent = productToDisplay.quantity.toString();
    console.log('Quantité affichée:', productToDisplay.quantity);
    
    // Prix unitaire - afficher prix normal ou prix de gros selon le choix
    const priceToShow = productToDisplay.isWholesale ? productToDisplay.wholesalePrice : productToDisplay.price;
    productPrice.textContent = `${priceToShow.toFixed(2)} DH`;
    
    // Ajouter une indication si c'est le prix de gros
    if (productToDisplay.isWholesale) {
      productPrice.textContent += ' (Prix de gros)';
    }
    
    // Calculer et afficher le total
    const total = priceToShow * productToDisplay.quantity;
    productTotal.textContent = `${total.toFixed(2)} DH`;
    console.log('Total calculé:', total);
  }

  // Charger les données client
  function loadCustomerData() {
    try {
      const savedData = localStorage.getItem('customerInfo');
      if (savedData) {
        const customerInfo = JSON.parse(savedData);
        
        // Vérifier que les éléments existent avant d'affecter des valeurs
        const fullnameInput = document.getElementById('fullname');
        const phoneInput = document.getElementById('phone');
        const addressInput = document.getElementById('address');
        const cityInput = document.getElementById('city');
        
        if (fullnameInput) fullnameInput.value = customerInfo.fullname || '';
        if (phoneInput) phoneInput.value = customerInfo.phone || '';
        if (addressInput) addressInput.value = customerInfo.address || '';
        if (cityInput) cityInput.value = customerInfo.city || '';
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données client:', error);
    }
  }

  // Configurer le formulaire
  function setupForm() {
    customerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Valider le formulaire
      if (!validateForm()) {
        return;
      }
      
      // Récupérer les données du formulaire
      const formData = {
        fullname: document.getElementById('fullname').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value
      };
      
      // Sauvegarder les données client
      localStorage.setItem('customerInfo', JSON.stringify(formData));
      
      // Récupérer les données du produit
      let product;
      try {
        const productData = localStorage.getItem('commandeProduct');
        product = productData ? JSON.parse(productData) : defaultProduct;
      } catch (error) {
        console.error('Erreur lors de la récupération des données du produit:', error);
        product = defaultProduct;
      }
      
      // Générer le message WhatsApp
      const message = generateWhatsAppMessage(product, formData);
      
      // Ouvrir WhatsApp avec le message
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    });
  }

  // Bouton "Retour au produit"
  function setupBackButton() {
    backButton.addEventListener('click', function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  // Valider le formulaire
  function validateForm() {
    const fullnameInput = document.getElementById('fullname');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    
    if (!fullnameInput || !phoneInput || !addressInput || !cityInput) {
      showError("Impossible de valider le formulaire: champs manquants");
      return false;
    }
    
    const fullname = fullnameInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const city = cityInput.value.trim();
    
    if (!fullname || !phone || !address || !city) {
      showError("Veuillez remplir tous les champs obligatoires.");
      return false;
    }
    
    // Validation basique du numéro de téléphone
    const phoneRegex = /^[0-9+\s()-]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      showError("Veuillez entrer un numéro de téléphone valide.");
      return false;
    }
    
    return true;
  }

  // Générer le message WhatsApp
  function generateWhatsAppMessage(product, customer) {
    // S'assurer que les valeurs sont correctes
    const quantity = Number(product.quantity || 1);
    const price = Number(product.price || 0);
    const isWholesale = product.isWholesale || false;
    const wholesalePrice = Number(product.wholesalePrice || 0);
    
    // Déterminer le prix unitaire à utiliser
    const unitPrice = isWholesale ? wholesalePrice : price;
    const total = unitPrice * quantity;
    
    let message = '🛒 *NOUVELLE COMMANDE* 🛒\n\n';
    
    // Détails du produit
    message += '*Produit commandé:*\n';
    message += `*${product.name}*\n`;
    
    // N'ajouter la couleur que si elle existe et n'est pas vide
    if (product.color && typeof product.color === 'string' && product.color.trim() !== '') {
      message += `- Couleur: ${product.color}\n`;
    }
    
    // Indiquer si c'est un prix de gros
    if (isWholesale) {
      message += `- Prix: ${unitPrice.toFixed(2)} DH (Prix de gros)\n`;
    } else {
      message += `- Prix: ${unitPrice.toFixed(2)} DH\n`;
    }
    
    message += `- Quantité: ${quantity}\n`;
    message += `- Total: ${total.toFixed(2)} DH\n`;
    message += `- Livraison: Gratuite\n`; // Ajout de la livraison gratuite
    
    // Ajouter le lien du produit
    const referrerUrl = document.referrer || '';
    if (referrerUrl && (referrerUrl.includes('/produits/') || referrerUrl.includes('/categories/'))) {
      message += `\n*Lien du produit:* ${referrerUrl}\n`;
    } else if (product.id) {
      const baseUrl = 'https://jouet-maroc.com/produits/';
      message += `\n*Lien du produit:* ${baseUrl}${product.id}.html\n`;
    }
    
    message += '\n';
    
    // Informations client
    message += '*Informations client:*\n';
    message += `*Nom:* ${limitWords(customer.fullname, 5)}\n`;
    message += `*Téléphone:* ${customer.phone}\n`;
    message += `*Adresse:* ${limitWords(customer.address, 20)}\n`;
    message += `*Ville:* ${limitWords(customer.city, 5)}\n`;
    // Fonction pour limiter le nombre de mots
    function limitWords(text, maxWords) {
      const words = text.trim().split(/\s+/);
      return words.slice(0, maxWords).join(' ');
    }

    return encodeURIComponent(message);
  }

  // Afficher un message d'erreur
  function showError(message) {
    // Vérifier si un message d'erreur existe déjà
    let errorEl = document.querySelector('.error-message');
    
    // Si non, en créer un
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      
      // Insérer avant le formulaire
      const form = document.querySelector('.commande-content');
      if (form) {
        form.parentNode.insertBefore(errorEl, form);
      } else {
        document.body.insertBefore(errorEl, document.body.firstChild);
      }
    }
    
    // Mettre à jour le message et afficher
    errorEl.textContent = message;
    errorEl.classList.add('show');
    
    // Faire défiler jusqu'au message
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Masquer après un délai
    setTimeout(() => {
      errorEl.classList.remove('show');
    }, 5000);
  }
});
