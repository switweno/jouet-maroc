const products = [
  {
    id: "velo-electrique-harley-u9",
    title: "VÉLO ÉLECTRIQUE HARLEY U9",
    brand: "LIKEBIKE",
    category: "دراجات كهربائية",
    availability: "متوفر في المخزون",
    ratings: 4.5,
    reviewCount: 120,
    currentPrice: 8700,
    oldPrice: 10999,
    discount: 30,
    images: [
      "product1.webp",
      "product2.webp",
      "product3.webp",
      "product4.webp",
      "product5.webp",
      "product6.webp",
      "product7.webp"
    ],
    features: [
      {
        title: "Moteur et performance",
        icon: "fa-bolt",
        items: [
          { key: "Marque", value: "LIKEBIKE ORIGINAL 💯" },
          { key: "Moteur", value: "500 W MAX 💯" },
          { key: "Vitesse max", value: "61 KM/h 💯" }
        ]
      },
      {
        title: "Batterie et autonomie",
        icon: "fa-battery-full",
        items: [
          { key: "Batterie", value: "Lithium 48V 15.6AH 💯" },
          { key: "Autonomie", value: "50KM - 60KM max 💯" },
          { key: "Charge max", value: "130 KG 💯" }
        ]
      },
      {
        title: "Sécurité et durabilité",
        icon: "fa-shield-alt",
        items: [
          { key: "Freinage", value: "Avant et arrière 💯" },
          { key: "Amortisseur", value: "Double amortisseur 💯" },
          { key: "Pièces", value: "Shimano 💯" },
          { key: "Pneus", value: "20 pouces 💯" }
        ]
      },
      {
        title: "Bénéfices en plus",
        icon: "fa-cogs",
        items: [
          { key: "Tableau de bord", value: "Digital 💯" },
          { key: "Klaxon", value: "Oui 💯" },
          { key: "Sièges", value: "2 places cuir 💯" },
          { key: "Vitesse", value: "7e vitesse Shimano 💯" }
        ]
      }
    ],
    warranty: "Garantie de 3 mois",
    videoURL: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1216627849670343%2F&show_text=false&width=560&t=0"
  },
 
  {
    id: "trottinette-bison-gt-1000",
    title: "TROTTINETTE BISON GT 1000",
    brand: "BISON",
    category: "تروتنيت",
    availability: "متوفر في المخزون",
    ratings: 4.5,
    reviewCount: 136,
    currentPrice: 5890,
    oldPrice: 7099,
    discount: 20,
    images: [
      "bison-gt-1000-1.webp",
      "bison-gt-1000-2.webp",
      "bison-gt-1000-3.webp",
      "bison-gt-1000-4.webp",
      "bison-gt-1000-5.webp",
      "bison-gt-1000-6.webp",
      "bison-gt-1000-7.webp"
    ],
    features: [
      {
        title: "Moteur et performance",
        icon: "fa-tachometer-alt",
        items: [
          { key: "Marque", value: "BISON GT ORIGINAL" },
          { key: "Moteur", value: "1000 W MAX 💯" },
          { key: "VITESSE", value: "MAX 50 KM" }
        ]
      },
      {
        title: "Batterie et autonomie",
        icon: "fa-battery-full",
        items: [
          { key: "BATTERIE", value: "48 V 13 AH LITHIUM" },
          { key: "AUTONOMIE", value: "40 km MAX" },
          { key: "CHARGE MAX", value: "120 kg" }
        ]
      },
      {
        title: "Sécurité et durabilité",
        icon: "fa-shield-alt",
        items: [
          { key: "FREIN", value: "DISQUE AVANT ET ARRIÈRE + E-ABS" },
          { key: "PNEU", value: "10 POUCES OFF-ROAD" },
          { key: "AMORTISSEUR", value: "DOUBLE AMORTISSEUR" }
        ]
      },
      {
        title: "Bénéfices en plus",
        icon: "fa-cogs",
        items: [
          { key: "TABLEAU", value: "DIGITAL" },
          { key: "LUMIÈRE LED", value: "AVANT ET ARRIÈRE" },
          { key: "PLIABLE KLAXON", value: "OUI" }
        ]
      }
    ],
    warranty: "Garantie 3 mois",
    videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1805454483624438%2F&show_text=false&width=267&t=0"
  },
  
  // منتج جديد للتأكد من وجود بيانات كافية
  {
    id: "scooter-electrique-pro-500w",
    title: "SCOOTER ÉLECTRIQUE PRO 500W",
    brand: "ESCOOTER",
    category: "تروتنيت",
    availability: "متوفر في المخزون",
    ratings: 4.8,
    reviewCount: 87,
    currentPrice: 4890,
    oldPrice: 5999,
    discount: 18,
    images: [
      "scooter-e1.webp",
      "scooter-e2.webp",
      "scooter-e3.webp",
      "scooter-e4.webp"
    ],
    features: [
      {
        title: "Moteur et performance",
        icon: "fa-tachometer-alt",
        items: [
          { key: "Marque", value: "ESCOOTER ORIGINAL" },
          { key: "Moteur", value: "500 W MAX" },
          { key: "VITESSE", value: "MAX 35 KM" }
        ]
      },
      {
        title: "Batterie et autonomie",
        icon: "fa-battery-full",
        items: [
          { key: "BATTERIE", value: "36V 10AH LITHIUM" },
          { key: "AUTONOMIE", value: "30 km MAX" },
          { key: "CHARGE MAX", value: "100 kg" }
        ]
      }
    ],
    warranty: "Garantie 3 mois",
    videoURL: ""
  },
  
  // منتج إضافي
  {
    id: "velo-montagne-pro",
    title: "VÉLO DE MONTAGNE PROFESSIONNEL",
    brand: "SPORTBIKE",
    category: "دراجات هوائية",
    availability: "متوفر في المخزون",
    ratings: 4.7,
    reviewCount: 65,
    currentPrice: 3200,
    oldPrice: 3990,
    discount: 20,
    images: [
      "mountain-bike1.webp",
      "mountain-bike2.webp",
      "mountain-bike3.webp"
    ],
    features: [
      {
        title: "Caractéristiques",
        icon: "fa-bicycle",
        items: [
          { key: "Cadre", value: "Aluminium léger" },
          { key: "Vitesses", value: "21 vitesses Shimano" },
          { key: "Freins", value: "Disque hydraulique" }
        ]
      }
    ],
    warranty: "Garantie 6 mois",
    videoURL: ""
  }
];

// التحقق من تصدير البيانات - إضافة هذا التعليق للتأكد من تنفيذ الملف بالكامل
console.log("products.js loaded successfully - Products count:", products.length);

