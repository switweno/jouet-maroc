/**
 * Script spécifique pour la redirection vers la page de commande
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log("Script whatsapp-order.js chargé");
  
  // Sélectionner le bouton de commande WhatsApp
  const orderButton = document.querySelector('.whatsapp-order-btn');
  
  // Vérifier si le bouton existe
  if (orderButton) {
    console.log("Bouton de commande WhatsApp trouvé, ajout de l'écouteur d'événement");
    
    // Ajouter l'écouteur d'événement directement au bouton
    orderButton.addEventListener('click', function(event) {
      event.preventDefault();
      console.log("Bouton de commande WhatsApp cliqué");
      
      try {
        // Obtenir les données du produit comme dans product-page-init.js
        const productName = document.querySelector('.product-info h1').textContent;
        
        // Récupérer la quantité
        const quantityInput = document.getElementById('quantity');
        let quantity = 1; // Valeur par défaut
        
        if (quantityInput) {
          quantity = parseInt(quantityInput.value, 10);
          if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
          }
        }
        
        // Récupérer la couleur sélectionnée
        const colorOption = document.querySelector('.color-option.active');
        const color = colorOption ? colorOption.dataset.color : '';
        
        // Récupérer le prix
        const priceElement = document.querySelector('.current-price');
        const productPrice = priceElement ? parseFloat(priceElement.textContent.replace(/[^\d.-]/g, '')) : 0;
        
        // Vérifier si le prix de gros est sélectionné
        const wholesaleCheckbox = document.getElementById('wholesale-checkbox');
        const wholesalePriceElement = document.querySelector('.wholesale-price-value');
        let isWholesale = false;
        let wholesalePrice = 0;
        
        if (wholesaleCheckbox && wholesaleCheckbox.checked && wholesalePriceElement) {
          isWholesale = true;
          wholesalePrice = parseFloat(wholesalePriceElement.textContent.replace(/[^\d.-]/g, ''));
        }
        
        // Récupérer l'image actuelle
        const mainImage = document.querySelector('.swiper-slide-active img') || 
                          document.querySelector('.product-main-image img') ||
                          document.querySelector('.swiper-zoom-container img');
        const productImage = mainImage ? mainImage.src : '';
        
        // Traiter l'URL de l'image - garder l'URL complète pour les images CDN
        let imagePath = productImage;
        let imageCDN = productImage; // Rabttp CDN (nouveau)
        let imageFallback = ''; // URL de secours (ancien)
        
        // Si c'est un URL CDN, extraire aussi le chemin de secours
        if (productImage.includes('pub-82ebd46c88184123b796592748532c43.r2.dev')) {
          // Extraire le nom du fichier depuis l'URL CDN
          const fileNameMatch = productImage.match(/\/([^\/]+\.webp)$/);
          if (fileNameMatch) {
            imageFallback = 'images/slider/' + fileNameMatch[1];
          }
        }
        
        console.log("Données du produit capturées:", {
          name: productName,
          price: productPrice,
          quantity: quantity,
          color: color,
          image: imagePath,
          imageCDN: imageCDN,
          imageFallback: imageFallback,
          isWholesale: isWholesale,
          wholesalePrice: wholesalePrice
        });
        
        // Créer l'objet produit avec les deux URLs
        const product = {
          name: productName || "Vélo Électrique X1",
          price: productPrice,
          quantity: Number(quantity),
          color: color,
          image: imagePath,
          imageCDN: imageCDN, // Rôle principal - CDN
          imageFallback: imageFallback, // URL de secours - ancien
          total: isWholesale ? wholesalePrice * Number(quantity) : productPrice * Number(quantity),
          id: document.location.pathname.split('/').pop().replace('.html', ''), // Extraire l'ID du produit depuis l'URL
          isWholesale: isWholesale,
          wholesalePrice: wholesalePrice
        };
        
        // Vider localStorage avant de stocker pour éviter les conflits
        localStorage.removeItem('commandeProduct');
        
        // Stocker dans localStorage
        localStorage.setItem('commandeProduct', JSON.stringify(product));
        
        // Déterminer le chemin correct vers la page de commande
        let commandePath = '../commande.html';
        
        // Si nous sommes déjà au niveau racine du site
        if (window.location.pathname.split('/').length <= 2) {
          commandePath = 'commande.html';
        }
        
        // Forcer la redirection vers la page de commande
        console.log("Redirection vers la page de commande:", commandePath);
        window.location.href = commandePath;
      } catch (error) {
        console.error("Erreur lors de la préparation de la commande:", error);
        
        // En cas d'erreur, essayer différents chemins de redirection
        try {
          if (window.location.pathname.includes('/produits/')) {
            window.location.href = '../commande.html';
          } else {
            window.location.href = 'commande.html';
          }
        } catch (redirectError) {
          console.error("Erreur de redirection:", redirectError);
          // Dernière tentative avec chemin absolu
          window.location.href = '/commande.html';
        }
      }
    });
    
    // Ajouter un effet visuel pour montrer que le bouton est cliquable
    orderButton.classList.add('whatsapp-pulse');
    
    // Ajouter une classe pour indiquer que le script est initialisé
    orderButton.classList.add('initialized');
    console.log("Bouton WhatsApp initialisé avec succès");
  } else {
    // Essayer d'autres sélecteurs si le bouton principal n'est pas trouvé
    const alternativeButtons = document.querySelectorAll('.order-now-btn, .whatsapp-btn, button[id*="order"]');
    
    if (alternativeButtons.length > 0) {
      console.log(`Boutons alternatifs trouvés: ${alternativeButtons.length}`);
      
      alternativeButtons.forEach(btn => {
        btn.addEventListener('click', function(event) {
          event.preventDefault();
          console.log("Bouton alternatif cliqué, redirection vers la page de commande");
          
          try {
            // Redirection simple sans données pour les boutons alternatifs
            if (window.location.pathname.includes('/produits/')) {
              window.location.href = '../commande.html';
            } else {
              window.location.href = 'commande.html';
            }
          } catch (error) {
            console.error("Erreur lors de la redirection:", error);
            window.location.href = '/commande.html';
          }
        });
      });
    } else {
      console.error("Aucun bouton de commande trouvé sur cette page");
    }
  }
});
