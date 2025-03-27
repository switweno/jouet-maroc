// إضافة كائن مركزي لتكوين الفئات - أضف هذا في بداية الملف
const CATEGORIES_CONFIG = {
    'electric-bikes': {
        id: 'electric-bikes',
        displayName: 'الدراجات الكهربائية',
        databaseName: 'دراجات كهربائية',
        icon: 'fa-bicycle'
    },
    'scooters': {
        id: 'scooters',
        displayName: 'تروتنيت',
        databaseName: 'تروتنيت',
        icon: 'fa-motorcycle'
    },
    'bikes': {
        id: 'bikes',
        displayName: 'الدراجات الهوائية',
        databaseName: 'دراجات هوائية',
        icon: 'fa-bicycle'
    },
    'electric-cars': {
        id: 'electric-cars',
        displayName: 'سيارات كهربائية',
        databaseName: 'سيارات كهربائية',
        icon: 'fa-car'
    },
   
    'moteur-cross': {
    id: 'moteur-cross',
    displayName: 'moteur-cross',
    databaseName: 'moteur-cross',
    icon: 'fa-motorcycle'
     }   
    // يمكن إضافة فئات جديدة هنا بسهولة
    // 'new-category': {
    //     id: 'new-category',
    //     displayName: 'اسم الفئة الجديدة',
    //     databaseName: 'اسم الفئة في قاعدة البيانات',
    //     icon: 'fa-icon-name'
    // }
};




// دالة مساعدة للحصول على تكوينات جميع الفئات
function getAllCategories() {
    return Object.values(CATEGORIES_CONFIG);
}

// دالة مساعدة للحصول على تكوين فئة محددة
function getCategoryConfig(categoryId) {
    return CATEGORIES_CONFIG[categoryId] || null;
}

// دالة مساعدة للحصول على عنوان الفئة
function getCategoryTitle(categoryId) {
    const category = getCategoryConfig(categoryId);
    return category ? category.displayName : 'منتجات الفئة';
}

// دالة مساعدة للحصول على اسم الفئة
function getCategoryName(categoryId) {
    const category = getCategoryConfig(categoryId);
    return category ? category.databaseName : '';
}

// الحصول على منتجات فئة محددة
function getCategoryProducts(categoryId) {
    const category = getCategoryConfig(categoryId);
    return category ? filterProductsByCategory(category.databaseName) : [];
}

// فلترة المنتجات حسب الفئة
function filterProductsByCategory(categoryName) {
    if (!window.products) return [];
    return window.products.filter(product => product.category === categoryName);
}

// تحسين دالة تحميل منتجات الفئات للنافذة المنبثقة
function showCategoryProducts(categoryId) {
    const categoryPopup = document.getElementById('category-popup');
    const popupCategoryTitle = document.getElementById('popup-category-title');
    const popupProducts = document.getElementById('popup-products');
    const overlay = document.getElementById('overlay');
    
    // تعيين عنوان الفئة
    popupCategoryTitle.textContent = getCategoryTitle(categoryId);
    
    // تنظيف المحتوى السابق
    popupProducts.innerHTML = '';
    
    // الحصول على منتجات الفئة المحددة
    const categoryProducts = getCategoryProducts(categoryId);
    
    // إضافة رسالة إذا لم تكن هناك منتجات
    if (categoryProducts.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.className = 'no-products-message';
        noProductsMessage.textContent = 'لا توجد منتجات في هذه الفئة حالياً';
        popupProducts.appendChild(noProductsMessage);
    } else {
        // إضافة المنتجات إلى النافذة المنبثقة
        categoryProducts.forEach(product => {
            // إنشاء عنصر المنتج
            const productEl = createProductElement(product);
            popupProducts.appendChild(productEl);
        });
    }
    
    // عرض النافذة المنبثقة والخلفية
    categoryPopup.classList.add('show');
    overlay.classList.add('show');
    
    // منع التمرير في الخلفية
    document.body.style.overflow = 'hidden';
}

// دالة جديدة لإنشاء عناصر الفئات في واجهة المستخدم
function renderCategoryElements() {
    // تحديث قائمة الفئات في القائمة الجانبية
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
    
    // تحديث قائمة الفئات في القائمة الأفقية للشاشات الكبيرة
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
    
    // إعادة ربط أحداث النقر
    setupCategoryEvents();
}

// دالة لإعداد أحداث النقر على الفئات
function setupCategoryEvents() {
    // إضافة مستمعات الأحداث للفئات في القائمة الجانبية
    document.querySelectorAll('.sidebar-category').forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            // إغلاق القائمة الجانبية عند اختيار فئة
            document.getElementById('sidebar-menu').classList.remove('open');
            showCategoryProducts(categoryId);
        });
    });
    
    // إضافة مستمعات الأحداث للفئات في القائمة الأفقية
    document.querySelectorAll('.desktop-category').forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            showCategoryProducts(categoryId);
        });
    });
}

// استدعاء تهيئة عناصر الفئات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // تهيئة عناصر الفئات
    renderCategoryElements();
    
    // ...existing code...
});