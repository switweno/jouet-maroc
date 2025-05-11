const CATEGORIES_CONFIG = {
    'electric-bikes': {
        id: 'electric-bikes',
        displayName: 'الدراجات الكهربائية',
        databaseName: 'دراجات كهربائية',
        icon: 'fa-bicycle'
    },
    'scooters': {
        id: 'scooters',
        displayName: 'التروتنيت',
        databaseName: 'تروتنيت',
        icon: 'bi-scooter'
    },
    'bikes': {
        id: 'bikes',
        displayName: 'الدراجات الهوائية',
        databaseName: 'دراجات هوائية',
        icon: 'fa-bicycle'
    },
    'electric-cars': {
        id: 'electric-cars',
        displayName: 'السيارات الكهربائية',
        databaseName: 'سيارات كهربائية',
        icon: 'fa-car'
    },
    'moteur-cross': {
        id: 'moteur-cross',
        displayName: 'Moteur Cross',
        databaseName: 'moteur-cross',
        icon: 'fa-motorcycle'
    },
    'siege-auto': {
        id: 'siege-auto',
        displayName: 'Siège auto',
        databaseName: 'Siege auto',
        icon: 'fa-chair'
    },
    'trampoline': {
        id: 'trampoline',
        displayName: 'ترامبولين',
        databaseName: 'ترامبولين',
        icon: 'fa-baseball-ball'
    },
    'drift-360': {
        id: 'drift-360',
        displayName: 'Drift 360°',
        databaseName: 'Drift 360°',
        icon: 'fa-sync-alt'
    }
   
};






function getAllCategories() {
    return Object.values(CATEGORIES_CONFIG);
}

function getCategoryConfig(categoryId) {
    return CATEGORIES_CONFIG[categoryId] || null;
}

function getCategoryTitle(categoryId) {
    const category = getCategoryConfig(categoryId);
    return category ? category.displayName : 'منتجات الفئة';
}

function getCategoryName(categoryId) {
    const category = getCategoryConfig(categoryId);
    return category ? category.databaseName : '';
}

function getCategoryProducts(categoryId) {
    const category = getCategoryConfig(categoryId);
    return category ? filterProductsByCategory(category.databaseName) : [];
}

function filterProductsByCategory(categoryName) {
    if (!window.products) return [];
    return window.products.filter(product => product.category === categoryName);
}

function showCategoryProducts(categoryId) {
    const categoryPopup = document.getElementById('category-popup');
    const popupCategoryTitle = document.getElementById('popup-category-title');
    const popupProducts = document.getElementById('popup-products');
    const overlay = document.getElementById('overlay');
    
    popupCategoryTitle.textContent = getCategoryTitle(categoryId);
    
    popupProducts.innerHTML = '';
    
    const categoryProducts = getCategoryProducts(categoryId);
    
    if (categoryProducts.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.className = 'no-products-message';
        noProductsMessage.textContent = 'لا توجد منتجات في هذه الفئة حالياً';
        popupProducts.appendChild(noProductsMessage);
    } else {
        categoryProducts.forEach(product => {
            const productEl = createProductElement(product);
            popupProducts.appendChild(productEl);
        });
    }
    
    categoryPopup.classList.add('show');
    overlay.classList.add('show');
    
    document.body.style.overflow = 'hidden';
}

function renderCategoryElements() {
    const sidebarCategoriesList = document.querySelector('.sidebar-categories');
    if (sidebarCategoriesList) {
        sidebarCategoriesList.innerHTML = '';
        getAllCategories().forEach(category => {
            const li = document.createElement('li');
            li.className = 'sidebar-category';
            li.setAttribute('data-category', category.id);
            li.innerHTML = `
                <i class="fas ${category.icon}"></i>
                <span>${category.displayName}</span>
            `;
            sidebarCategoriesList.appendChild(li);
        });
    }
    
    const desktopCategoriesList = document.querySelector('.desktop-categories ul');
    if (desktopCategoriesList) {
        desktopCategoriesList.innerHTML = '';
        getAllCategories().forEach(category => {
            const li = document.createElement('li');
            li.className = 'desktop-category';
            li.setAttribute('data-category', category.id);
            li.innerHTML = `
                <i class="fas ${category.icon}"></i>
                <span>${category.displayName}</span>
            `;
            desktopCategoriesList.appendChild(li);
        });
    }
    
    setupCategoryEvents();
}

function setupCategoryEvents() {
    document.querySelectorAll('.sidebar-category').forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            document.getElementById('sidebar-menu').classList.remove('open');
            showCategoryProducts(categoryId);
        });
    });
    
    document.querySelectorAll('.desktop-category').forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            showCategoryProducts(categoryId);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    renderCategoryElements();
    
});