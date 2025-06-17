// DOM Elements
let slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const mainNav = document.querySelector('.main-nav');

// Globals
let currentSlide = 0;
let slideInterval;

// Initialize the page
function init() {
  if (slides && slides.length > 0) {
    startSlider();
  }
  setupEventListeners();
  setupLazyLoading();
}

// Slider Functions
function startSlider() {
  if (slides && slides.length > 0) {
    showSlide(currentSlide);
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }
}

function showSlide(index) {
  if (!slides || slides.length === 0) return;
  
  if (index < 0 || index >= slides.length) return;
  
  slides.forEach(slide => slide.classList.remove('active'));
  
  if (dots && dots.length > 0) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }
  
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Product Filter Functions - version simplifiée sans animations
function filterProducts(category) {
  // Marquer le bouton actif
  filterBtns.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Filtrer les cartes de produits simplement
  productCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}




// Fonction pour configurer le lazy loading avec Intersection Observer
function setupLazyLoading() {
  // Vérifier si IntersectionObserver est supporté
  if ('IntersectionObserver' in window) {
    const productCards = document.querySelectorAll('.product-card');
    
    const options = {
      root: null, // utiliser le viewport comme zone d'observation
      rootMargin: '0px 0px 100px 0px', // marge de 100px en bas pour précharger
      threshold: 0.1 // 10% de l'élément doit être visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const image = card.querySelector('img');
          
          // Si l'image a un attribut data-src, utiliser celui-ci comme source
          if (image && image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
          }
          
         
          
          // Arrêter d'observer cet élément
          observer.unobserve(card);
        }
      });
    }, options);
    
    // Observer chaque carte de produit
    productCards.forEach(card => {
      observer.observe(card);
    });
  }
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
  // Slider controls
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetSliderInterval();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetSliderInterval();
    });
  }
  
  // Dot navigation
  if (dots && dots.length > 0) {
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const dotIndex = parseInt(this.dataset.index);
        if (!isNaN(dotIndex) && dotIndex >= 0 && dotIndex < slides.length) {
          currentSlide = dotIndex;
          showSlide(currentSlide);
          resetSliderInterval();
        }
      });
    });
  }
  
  // Category filter
  if (filterBtns && filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterProducts(this.dataset.category);
      });
    });
  }
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input').value;
      
      if (email) {
        showNotification('Merci de vous être abonné à notre newsletter!');
        this.reset();
      }
    });
  }
}

// Fonction pour afficher une notification
function showNotification(message) {
  // Créer l'élément de notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  
  // Ajouter une icône et le message
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  
  // Ajouter au DOM
  document.body.appendChild(notification);
  
  // Forcer un reflow pour permettre la transition
  const reflow = notification.offsetHeight;
  
  // Ajouter la classe show pour rendre visible avec animation
  notification.classList.add('show');
  
  // Retirer après 3 secondes
  setTimeout(() => {
    notification.classList.remove('show');
    
    // Attendre la fin de l'animation avant de supprimer
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Reset slider interval
function resetSliderInterval() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
}

// Add styles needed for notifications
function addNotificationStyles() {
  // Création et ajout d'un style pour les notifications
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #333;
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .notification.show {
      transform: translateY(0);
      opacity: 1;
    }
    .notification i {
      font-size: 1.5rem;
      color: #954484;
    }
  `;
  document.head.appendChild(style);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Réinitialiser les animations à chaque visite
    // Pour la page d'accueil
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroElements = hero.querySelectorAll('h1, p');
      heroElements.forEach(el => {
        // Forcer un redémarrage de l'animation
        el.style.animation = 'none';
        // Déclencher un reflow (corriger l'erreur JSHint W030)
        const reflow = el.offsetHeight; // Utiliser dans une variable pour éviter l'erreur
        el.style.animation = null;
      });
    }
    
    // Pour les pages de catégories
    const categoryHeader = document.querySelector('.category-header');
    if (categoryHeader) {
      const headerElements = categoryHeader.querySelectorAll('h1, p');
      headerElements.forEach(el => {
        // Forcer un redémarrage de l'animation
        el.style.animation = 'none';
        // Déclencher un reflow (corriger l'erreur JSHint W030)
        const reflow = el.offsetHeight; // Utiliser dans une variable pour éviter l'erreur
        el.style.animation = null;
      });
    }
    
    addNotificationStyles();
    init();
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  }
});



document.addEventListener('DOMContentLoaded', function () {
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  // Vérifier si le lightbox existe sur cette page
  if (galleryImages.length > 0 && lightbox && lightboxImg) {
    let currentImageIndex = 0;
    
    // Définir les fonctions comme des expressions de fonctions
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
        // Balayage vers la gauche -> image suivante
        navigateImage(1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Balayage vers la droite -> image précédente
        navigateImage(-1);
      }
    };
    
    const closeLightbox = function() {
      lightbox.style.display = 'none';
    };
    
    // Ajouter les flèches de navigation au lightbox s'ils n'existent pas déjà
    if (!document.querySelector('.lightbox-nav')) {
      // Ajouter les flèches de navigation
      const prevArrow = document.createElement('div');
      prevArrow.className = 'lightbox-nav lightbox-prev';
      prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
      
      const nextArrow = document.createElement('div');
      nextArrow.className = 'lightbox-nav lightbox-next';
      nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
      
      lightbox.appendChild(prevArrow);
      lightbox.appendChild(nextArrow);
      
      // Ajouter le numéro d'image
      const imageCounter = document.createElement('div');
      imageCounter.className = 'lightbox-counter';
      lightbox.appendChild(imageCounter);
      
      // Ajouter les styles CSS nécessaires pour les nouveaux éléments
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
      
      // Événements pour les flèches
      prevArrow.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage(-1);
      });
      
      nextArrow.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage(1);
      });
    }
    
    // Ouvrir le lightbox lors du clic sur une image
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', function () {
        currentImageIndex = index;
        lightboxImg.src = this.src;
        lightbox.style.display = 'flex';
        updateCounter();
      });
    });
    
    // Fermer le lightbox lors du clic en dehors de l'image
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Navigation avec les touches du clavier
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
    
    // Support du balayage tactile pour mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    lightbox.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    // Exposer la fonction de fermeture à la portée globale
    window.closeLightbox = closeLightbox;
  }
});


