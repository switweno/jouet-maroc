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
const colorOptions = document.querySelectorAll('.color-option');
const selectedColorDisplay = document.getElementById('selected-color');

let currentSelectedColor = null;

// نص افتراضي ولون ثابت
const defaultText = "Aucune couleur sélectionnée";
const defaultColor = "#666";

selectedColorDisplay.textContent = defaultText;
selectedColorDisplay.style.color = defaultColor;

// تحديث النص عند اختيار لون
colorOptions.forEach(option => {
  option.addEventListener('click', function(event) {
    event.stopPropagation(); // لمنع الحدث من الوصول للوثيقة
    colorOptions.forEach(opt => opt.classList.remove('active'));
    this.classList.add('active');

    const colorName = this.getAttribute('data-color') || 'Couleur inconnue';
    currentSelectedColor = colorName;

    selectedColorDisplay.textContent = colorName;
    selectedColorDisplay.style.color = defaultColor; // لون ثابت رمادي
  });

  // عرض اسم اللون عند المرور على الدائرة
  option.addEventListener('mouseover', function() {
    const colorName = this.getAttribute('data-color') || '';
    selectedColorDisplay.textContent = colorName;
  });

  // إعادة النص للحالة السابقة عند الخروج بالماوس
  option.addEventListener('mouseout', function() {
    selectedColorDisplay.textContent = currentSelectedColor || defaultText;
  });
});

// إعادة الحالة الافتراضية عند الضغط في أي مكان خارج خيارات الألوان
document.addEventListener('click', function(event) {
  if (!event.target.closest('.color-options')) {
    colorOptions.forEach(opt => opt.classList.remove('active'));
    currentSelectedColor = null;
    selectedColorDisplay.textContent = defaultText;
    selectedColorDisplay.style.color = defaultColor;
  }
});



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
