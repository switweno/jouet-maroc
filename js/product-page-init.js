/**
 * Script d'initialisation des fonctionnalités de la page produit
 * - Sélection de couleur
 * - Sélection de quantité
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialiser la sélection de couleur
  initColorSelection();
  
  // Initialiser le sélecteur de quantité
  initQuantitySelector();
});

/**
 * Initialise la sélection de couleur
 */
function initColorSelection() {
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColorDisplay = document.getElementById('selected-color');
  
  if (!colorOptions.length || !selectedColorDisplay) return;
  
  // Aucune couleur sélectionnée par défaut
  // Afficher un message invitant l'utilisateur à choisir une couleur
  selectedColorDisplay.textContent = "Veuillez choisir une couleur";
  selectedColorDisplay.style.color = "#666"; // Style pour indiquer qu'aucune sélection n'a été faite
  
  // Ajouter les écouteurs d'événements à chaque option de couleur
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Retirer la classe active de toutes les options
      colorOptions.forEach(opt => opt.classList.remove('active'));
      
      // Ajouter la classe active à l'option cliquée
      this.classList.add('active');
      
      // Mettre à jour l'affichage de la couleur sélectionnée
      const colorName = this.getAttribute('data-color') || 'Couleur inconnue';
      selectedColorDisplay.textContent = colorName;
      selectedColorDisplay.style.color = ""; // Réinitialiser la couleur du texte
    });
  });
}

/**
 * Initialise le sélecteur de quantité
 */
function initQuantitySelector() {
  const quantityInput = document.getElementById('quantity');
  const decreaseBtn = document.querySelector('.quantity-decrease');
  const increaseBtn = document.querySelector('.quantity-increase');
  
  if (!quantityInput || !decreaseBtn || !increaseBtn) return;
  
  // Définir les limites
  const minValue = parseInt(quantityInput.getAttribute('min') || 1, 10);
  const maxValue = parseInt(quantityInput.getAttribute('max') || 15, 10);
  
  // S'assurer que la valeur initiale est dans les limites
  let currentValue = parseInt(quantityInput.value, 10) || 1;
  currentValue = Math.max(minValue, Math.min(maxValue, currentValue));
  quantityInput.value = currentValue;
  
  // Gestionnaire pour le bouton de diminution
  decreaseBtn.addEventListener('click', function() {
    currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > minValue) {
      quantityInput.value = --currentValue;
    }
  });
  
  // Gestionnaire pour le bouton d'augmentation
  increaseBtn.addEventListener('click', function() {
    currentValue = parseInt(quantityInput.value, 10);
    if (currentValue < maxValue) {
      quantityInput.value = ++currentValue;
    }
  });
  
  // Gestionnaire pour les changements directs dans l'input
  quantityInput.addEventListener('change', function() {
    currentValue = parseInt(this.value, 10) || minValue;
    currentValue = Math.max(minValue, Math.min(maxValue, currentValue));
    this.value = currentValue;
  });
  
  // Empêcher les valeurs non numériques
  quantityInput.addEventListener('keypress', function(e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (galleryImages.length > 0 && lightbox && lightboxImg) {
    let currentImageIndex = 0;
    
    const navigateImage = function(direction) {
      currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[currentImageIndex].src;
      updateCounter();
    };
    
    const updateCounter = function() {
      const counter = document.querySelector('.lightbox-counter');
      if (counter) {
        counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
      }
    };
    
    const handleSwipe = function() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        navigateImage(1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        navigateImage(-1);
      }
    };
    
    const closeLightbox = function() {
      lightbox.style.display = 'none';
    };
    
    if (!document.querySelector('.lightbox-nav')) {
      const prevArrow = document.createElement('div');
      prevArrow.className = 'lightbox-nav lightbox-prev';
      prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
      
      const nextArrow = document.createElement('div');
      nextArrow.className = 'lightbox-nav lightbox-next';
      nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
      
      lightbox.appendChild(prevArrow);
      lightbox.appendChild(nextArrow);
      
      const imageCounter = document.createElement('div');
      imageCounter.className = 'lightbox-counter';
      lightbox.appendChild(imageCounter);
      
      const style = document.createElement('style');
      style.textContent = `
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 24px;
          z-index: 10000;
          transition: all 0.3s ease;
          opacity: 0.7;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
          outline: none;
        }
        
        .lightbox-nav:hover {
          background-color: rgba(0, 0, 0, 0.8);
          opacity: 1;
        }
        
        .lightbox-nav:active {
          background-color: rgba(0, 0, 0, 0.9);
          transform: translateY(-50%) scale(0.95);
        }
        
        .lightbox-prev {
          left: 20px;
        }
        
        .lightbox-next {
          right: 20px;
        }
        
        .lightbox-counter {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Suppression de l'effet de surbrillance sur l'ensemble du lightbox */
        #lightbox, #lightbox * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Optimisation pour mobile */
        @media (max-width: 768px) {
          .lightbox-nav {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
          
          .lightbox-counter {
          position: absolute;
          bottom: 10px;
          left: 50%;
          
        }
          
          .lightbox-prev {
            left: 10px;
          }
          
          .lightbox-next {
            right: 10px;
          }
        }
        
        /* Animation de transition */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .lightbox-content {
          animation: fadeIn 0.3s ease;
        }
      `;
      document.head.appendChild(style);
      
      prevArrow.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage(-1);
      });
      
      nextArrow.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage(1);
      });
    }
    
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', function () {
        currentImageIndex = index;
        lightboxImg.src = this.src;
        lightbox.style.display = 'flex';
        updateCounter();
      });
    });
    
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    document.addEventListener('keydown', function(e) {
      if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
          navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
          navigateImage(1);
        } else if (e.key === 'Escape') {
          closeLightbox();
        }
      }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    lightbox.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    window.closeLightbox = closeLightbox;
  }
});
