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
      color: #FF0555;
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



  // فتح الصورة في Lightbox
  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', function () {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
      lightboxImg.src = this.src;
      lightbox.style.display = 'flex';
    });
  });

  // إغلاق Lightbox
  function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
  }

  // مسموح النداء من HTML
  window.closeLightbox = closeLightbox;

document.getElementById('lightbox').addEventListener('click', function (e) {
  const lightboxImg = document.getElementById('lightbox-img');
  if (e.target !== lightboxImg) {
    closeLightbox();
  }
});


