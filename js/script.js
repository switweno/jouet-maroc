// DOM Elements
let slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const mainNav = document.querySelector('.main-nav');
const navbar = document.querySelector('.navbar');


// Globals
let currentSlide = 0;
let slideInterval;

function init() {
  if (slides && slides.length > 0) {
    startSlider();
  }
  setupEventListeners();
  setupLazyLoading();
}

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

function filterProducts(category) {
  filterBtns.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  productCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}




function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const productCards = document.querySelectorAll('.product-card');
    
    const options = {
      root: null, 
      rootMargin: '0px 0px 100px 0px', 
      threshold: 0.1 
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const image = card.querySelector('img');
          
          if (image && image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
          }
          
         
          
          observer.unobserve(card);
        }
      });
    }, options);
    
    productCards.forEach(card => {
      observer.observe(card);
    });
  }
}

function setupEventListeners() {
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
  
  if (filterBtns && filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterProducts(this.dataset.category);
      });
    });
  }
  
 
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  const reflow = notification.offsetHeight;
  
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
    
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function resetSliderInterval() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
}

function addNotificationStyles() {
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

// Add this script to your HTML file
document.addEventListener('DOMContentLoaded', function() {
  let lastScrollTop = 0;
  let scrollTimeout;

  // Only apply scroll behavior on large screens
  function handleScroll() {
    if (window.innerWidth <= 1020) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide navbar
        navbar.classList.add('navbar-hidden');
        navbar.classList.remove('navbar-visible');
      } else {
        // Scrolling up - show navbar
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-visible');
      }
      lastScrollTop = scrollTop;
    }, 10);
  }

  window.addEventListener('scroll', handleScroll);
  
  // Reset navbar state on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 1020) {
      navbar.classList.remove('navbar-hidden', 'navbar-visible');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  try {
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroElements = hero.querySelectorAll('h1, p');
      heroElements.forEach(el => {
        el.style.animation = 'none';
        const reflow = el.offsetHeight; 
        el.style.animation = null;
      });
    }
    
    const categoryHeader = document.querySelector('.category-header');
    if (categoryHeader) {
      const headerElements = categoryHeader.querySelectorAll('h1, p');
      headerElements.forEach(el => {
        el.style.animation = 'none';
        const reflow = el.offsetHeight; 
        el.style.animation = null;
      });
    }
    
    addNotificationStyles();
    init();
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  }
});


const prices = document.querySelectorAll('.product-price span');
prices.forEach(price => {
  price.setAttribute('translate', 'no');
});

const stock = document.querySelectorAll('.product-stock');
stock.forEach(item => {
  item.setAttribute('translate', 'no');
});

const wholesalePrices = document.querySelectorAll('.wholesale-price span');
wholesalePrices.forEach(price => {
  price.setAttribute('translate', 'no');
});



