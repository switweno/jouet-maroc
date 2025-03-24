// تعريف المنتجات باسم واحد فقط لتجنب التضارب
const products = [

  
    {
   id: "TROTTINETTE-JOYOR-48V-17.5AH",
   title: "TROTTINETTE JOYOR 48V 17.5AH",
   brand: "JOYOR Y 6 S",
   category: "تروتنيت",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 121,
   currentPrice: 5490,
   oldPrice: 6299,
   discount: 30,
   images: [
     "TROTTINETTE-JOYOR-48V-17.5AH/joyor-48v-17.5ah-03.webp",
     "TROTTINETTE-JOYOR-48V-17.5AH/joyor-48v-17.5ah-05.webp",
     "TROTTINETTE-JOYOR-48V-17.5AH/joyor-48v-17.5ah-02.webp",
     "TROTTINETTE-JOYOR-48V-17.5AH/joyor-48v-17.5ah-04.webp",
     "TROTTINETTE-JOYOR-48V-17.5AH/joyor-48v-17.5ah-01.webp",
     "TROTTINETTE-JOYOR-48V-17.5AH/joyor-48v-17.5ah-07.webp",
     "TROTTINETTE-JOYOR-48V-17.5AH/joyor-48v-17.5ah-06.webp"
   ],
   features: [
    {
      title: "المواصفات التقنية",
      icon: "fa-cogs",
      items: [
        { key: "Puissance", value: "1000 W" },
        { key: "Vitesse", value: "50-56 km/h" },
        { key: "Mode de conduite", value: "3 vitesses" },
        { key: "Batterie", value: "Lithium 48V 17.5AH" },
        { key: "Autonomie", value: "45-60 km" },
        { key: "Charge max", value: "110 kg" },
        { key: "Freinage", value: "Disques AV/AR + E-ABS" }
      ]
    },
    {
      title: "المميزات الإضافية",
      icon: "fa-star",
      items: [
        { key: "Affichage", value: "DISPLAY EY2 (app mobile) 📱" },
        { key: "Suspension", value: "AV/AR réglables" },
        { key: "Éclairage", value: "LED AV/AR + clignotants" },
        { key: "Étanchéité", value: "IPX5" },
        { key: "Pneus", value: "10\" chambre à air" },
        { key: "Conception", value: "Pliable avec klaxon" },
        { key: "Cadeau 1", value: "Sac offert 🎁" },
        { key: "Cadeau 2", value: "Chambre à air 🎁" },
        { key: "Cadeau 3", value: "Verrouillage inclus 🎁" }
      ]
    }
  ],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F631466946477410%2F&show_text=false&width=267&t=0"
 },
  
  
{
   id: "TROTTINETTE-Mi-Electric-Scooter-Essential",
   title: "TROTTINETTE Mi Electric Scooter Essential",
   brand: "Xiaomi Essential",
   category: "تروتنيت",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 165,
   currentPrice: 2699,
   oldPrice: 3509,
   discount: 30,
   wholesalePrice: {
      minQuantity: 3,
      pricePerUnit: 2375
   },
   images: [
     "Xiaomi Essential/xiaomi-essential-01.webp",
     "Xiaomi Essential/xiaomi-essential-02.webp",
     "Xiaomi Essential/xiaomi-essential-03.webp",
     "Xiaomi Essential/xiaomi-essential-04.webp",
     "Xiaomi Essential/xiaomi-essential-05.webp",
     "Xiaomi Essential/xiaomi-essential-06.webp",
   ],

  features: [
    {
      title: "المواصفات التقنية",
      icon: "fa-cogs",
      items: [
        { key: "Puissance", value: "500W max" },
        { key: "Vitesse", value: "20 km/h min - 25 km/h max" },
        { key: "Mode de conduite", value: "3 vitesses réglables" },
        { key: "Batterie", value: "Lithium 36V 5100mAh / 183Wh" },
        { key: "Autonomie", value: "15 km min - 20 km max" },
        { key: "Charge maximale", value: "100 kg" },
        { key: "Freinage", value: "Disque arrière & Electrique + E-ABS" }
      ]
    },
    {
      title: "المميزات الإضافية",
      icon: "fa-star",
      items: [
        { key: "Matériau", value: "Aluminium" },
        { key: "Éclairage", value: "LED AV/AR (feu stop et feu avant)" },
        { key: "Étanchéité", value: "IPX5" },
        { key: "Affichage", value: "écran LCD avec application mobile📱 (DISPLAY EY2)" },
        { key: "Pneus", value: "8,5 pouces" },
        { key: "Conception", value: "Pliable" },
        { key: "Tableau de bord", value: "Indicateur de batterie" }
      ]
    }
  ],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1891550898286187%2F&show_text=false&width=267&t=0"
 },
  
  {
   id: "kukarin-g2-pro",
   title: "TROTTINETTE KUKIRIN G2 PRO",
   brand: "KUKIRIN",
   category: "تروتنيت",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 256,
   currentPrice: 6390,
   oldPrice: 7599,
   discount: 30,
   images: [
     "kukaring2pro/kukiring2pro-2.webp",
     "kukaring2pro/kukiring2pro-5.webp",
     "kukaring2pro/kukiring2pro-6.webp",
     "kukaring2pro/kukiring2pro-7.webp",
     "kukaring2pro/kukiring2pro-1.webp",
     "kukaring2pro/kukiring2pro-3.webp",
     "kukaring2pro/kukiring2pro-4.webp",
   ],
  features: [
    {
      title: "المواصفات التقنية",
      icon: "fa-cogs",
      items: [
        { key: "Puissance", value: "1200W max" },
        { key: "Vitesse", value: "50 km/h min - 57 km/h max" },
        { key: "Mode de conduite", value: "3 vitesses réglables" },
        { key: "Batterie", value: "Lithium 48V 15AH" },
        { key: "Autonomie", value: "40 km min - 50 km max" },
        { key: "Charge maximale", value: "120 kg" },
        { key: "Freinage", value: "Disques AV/AR" }
      ]
    },
    {
      title: "المميزات الإضافية",
      icon: "fa-star",
      items: [
        { key: "Suspension", value: "Avant et arrière réglables" },
        { key: "Éclairage", value: "LED AV/AR + clignotants directionnels" },
        { key: "Étanchéité", value: "IPX5 (batterie) / IPX4 (corps)" },
        { key: "Affichage", value: "écran LCD digital multifonction" },
        { key: "Pneus", value: "Off-Road 8,5 pouces renforcés" },
        { key: "Conception", value: "Pliable avec siège cuir intégré" },
        { key: "Tableau de bord", value: "Indicateur de batterie et signal à gauche/droite" }
      ]
    }
  ],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1185374139646507%2F&show_text=false&width=267&t=0"
 },
  
  {
   id: "dualtron-pop-54v",
   title: "TROTTINETTE DUALTRON POP 52V",
   brand: "DUALTRON",
   category: "تروتنيت",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 192,
   currentPrice: 7490,
   oldPrice: 8999,
   discount: 30,
   images: [
     "dualtron-pop/dualtron-pop_52v_04.webp",
     "dualtron-pop/dualtron-pop_52v_01.webp",
     "dualtron-pop/dualtron-pop_52v_03.webp",
     "dualtron-pop/dualtron-pop_52v_02.webp",
     "dualtron-pop/dualtron-pop_52v_05.webp",
     "dualtron-pop/dualtron-pop_52v_06.webp",
     "dualtron-pop/dualtron-pop_52v_07.webp"
   ],
   features: [
    {
      title: "المواصفات التقنية",
      icon: "fa-cogs",
      items: [
        { key: "Puissance", value: "1000W min - 1450W max " },
        { key: "Vitesse", value: "50 km/h min - 67 km/h max " },
        { key: "Mode de conduite", value: "3 vitesses réglables " },
        { key: "Batterie", value: "Lithium 52V 14AH " },
        { key: "Autonomie", value: "30 km min - 40 km max " },
        { key: "Charge maximale", value: "120 kg " },
        { key: "Freinage", value: "Disques AV/AR + E-ABS " }
      ]
    },
    {
      title: "المميزات الإضافية",
      icon: "fa-star",
      items: [
        { key: "Suspension", value: "Avant et arrière réglables " },
        { key: "Éclairage", value: "LED AV/AR + clignotants directionnels " },
        { key: "Étanchéité", value: "IPX5 (batterie) / IPX4 (corps) " },
        { key: "Affichage", value: "DISPLAY EY2 connecté (application mobile) " },
        { key: "Pneus", value: "9\" chambre à air renforcés " },
        { key: "Conception", value: "Pliable avec klaxon intégré " },
        { key: "Tableau de bord", value: "Digital multifonction " }
      ]
    }
   ],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F657273883473788%2F&show_text=false&width=267&t=0"
 },
  
 {
   id: "VÉLO-BMX-GTR -ALUMINIUM",
   title: "VÉLO BMX GTR ALUMINIUM 26",
   brand: "HAOMENG",
   category: "دراجات هواىية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 325,
   currentPrice: 1699,
   oldPrice: 2199,
   discount: 30,
   images: [
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-01.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-02.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-03.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-04.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-05.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-06.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-07.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-08.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-09.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-10.webp",
     "VÉLO-BMX-GTR-ALUMINIUM/velo-bmx-gtr-aluminium-11.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "Roues", value: "26 POUCES" },
      { key: "Matériau", value: "VÉLO ALUMINIUM" },
      { key: "Qualité", value: "BMX GTR 1E QUALITÉ " },
      { key: "Roues Matériau", value: "ROUE DE VÉLO ALUMINIUM" },
      { key: "Changement", value: "CHANGEMENT SUNRISE" },
      { key: "Vitesse", value: "VITESSE 3×7=21" },
      { key: "Plateau", value: "PLATEAU SUNRISE‏" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "Freins", value: "FREIN À DISQUE AVANT ET ARRIÈRE" },
      { key: "Amortisseur", value: "AMORTISSEUR AVANT" },
      { key: "Siège", value: "SIÈGE SPORT CUIR" },
      { key: "Gardes-boue", value: "LES GARDES-BOUES AV ET AR" }
    ]
  }
],
   warranty: "Garantie de 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F634632965780146%2F&show_text=false&width=267&t=0"
 },
 
 {
   id: "velo-vtt-haomeng-27.5",
   title: "VÉLO VTT HAOMENG 27.5",
   brand: "HAOMENG",
   category: "دراجات هواىية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 266,
   currentPrice: 1549,
   oldPrice: 1899,
   discount: 30,
   images: [
     "vtt_27/vtt_27_07.webp",
     "vtt_27/vtt_27_06.webp",
     "vtt_27/vtt_27_03.webp",
     "vtt_27/vtt_27_04.webp",
     "vtt_27/vtt_27_05.webp",
     "vtt_27/vtt_27_02.webp",
     "vtt_27/vtt_27_01.webp"
   ],
  features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "ROUES", value: "26 pouces" },
      { key: "MATÉRIAU", value: "Aluminium" },
      { key: "QUALITÉ", value: "BMX GTR 1E" },
      { key: "ROUE", value: "Aluminium" },
      { key: "CHANGEMENT DE VITESSE", value: "Sunrise" },
      { key: "VITESSE", value: "3×7 = 21 vitesses" },
      { key: "PLATEAU", value: "Sunrise" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "FREINS", value: "Disques avant et arrière" },
      { key: "AMORTISSEUR", value: "Amortisseur avant" },
      { key: "SIÈGE", value: "Siège sport en cuir" }
    ]
  }
],
   warranty: "Garantie de 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1370533550961892%2F&show_text=false&width=267&t=0"
 },
 
 {
   id: "velo-electrique-harley-u9",
   title: "VÉLO ÉLECTRIQUE HARLEY U9",
   brand: "LIKEBIKE",
   category: "دراجات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 120,
   currentPrice: 8499,
   oldPrice: 10999,
   discount: 35,
   images: [
     "likebike-harley-u9/likebike-u9-01.webp",
     "likebike-harley-u9/likebike-u9-02.webp",
     "likebike-harley-u9/likebike-u9-03.webp",
     "likebike-harley-u9/likebike-u9-04.webp",
     "likebike-harley-u9/likebike-u9-05.webp",
     "likebike-harley-u9/likebike-u9-06.webp",
     "likebike-harley-u9/likebike-u9-07.webp",
     "likebike-harley-u9/likebike-u9-08.webp",
     "likebike-harley-u9/likebike-u9-09.webp",
     "likebike-harley-u9/likebike-u9-10.webp",
     "likebike-harley-u9/likebike-u9-11.webp",
     "likebike-harley-u9/likebike-u9-12.webp",
      "likebike-harley-u9/likebike-u9-13.webp",
     "likebike-harley-u9/likebike-u9-14.webp"
   ],
   features: [
    {
      title: "المواصفات التقنية",
      icon: "fa-cogs",
      items: [
        { key: "Puissance", value: "750 W MAX " },
        { key: "Vitesse", value: "50 km/h MIN - 62 km/h MAX " },
        { key: "Démarrage", value: "Contact électrique " },
        { key: "Batterie", value: "Lithium 48V 18.2AH " },
        { key: "Autonomie normale", value: "45-60 km " },
        { key: "Mode assistance", value: "100 km MAX " },
        { key: "Freins", value: "Disques AV/AR " }
      ]
    },
    {
      title: "المميزات الإضافية",
      icon: "fa-star",
      items: [
        { key: "Amortisseurs", value: "Réglables AV/AR " },
        { key: "Éclairage", value: "LED AV/AR + clignotants " },
        { key: "Pneus", value: "20.4\" avec garde-boue " },
        { key: "Affichage", value: "Écran LCD multifonction " },
        { key: "Transmission", value: "7 vitesses Shimano " },
        { key: "Confort", value: "Siège cuir 2 places " },
        { key: "Charge maximale", value: "130 kg " }
      ]
    }
  ],
   warranty: "Garantie de 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F668998569027409%2F&show_text=false&width=267&t=0"
 },
  
  {
   id: "velo-electrique-likebike-shine-s",
   title: "VÉLO ÉLECTRIQUE LIKEBIKE SHINE S",
   brand: "LIKEBIKE",
   category: "دراجات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 232,
   currentPrice: 7199,
   oldPrice: 10099,
   discount: 30,
   images: [
     "likebike-shine-s/likebike-shine-s-09.webp",
     "likebike-shine-s/likebike-shine-s-02.webp",
     "likebike-shine-s/likebike-shine-s-03.webp",
     "likebike-shine-s/likebike-shine-s-04.webp",
     "likebike-shine-s/likebike-shine-s-05.webp",
     "likebike-shine-s/likebike-shine-s-06.webp",
     "likebike-shine-s/likebike-shine-s-07.webp",
     "likebike-shine-s/likebike-shine-s-08.webp",
     "likebike-shine-s/likebike-shine-s-01.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "Puissance", value: "500 W MAX" },
      { key: "Vitesse Max", value: "50 km/h MAX" },
      { key: "Batterie", value: "Lithium 48V 13AH" },
      { key: "Autonomie", value: "45-55 km" },
      { key: "Vitesses moteur", value: "5 vitesses (5E)" },
      { key: "Freins", value: "AV/AR" },
      { key: "Vitesses manuelles", value: "7 vitesses (7E)" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "Charge rapide", value: "Compatible 54V" },
      { key: "Affichage", value: "Digital multifonction" },
      { key: "Amortisseurs", value: "Réglable AV" },
      { key: "Éclairage", value: "LED AV/AR + klaxon" },
      { key: "Pneus", value: "20'' avec garde-boue" },
      { key: "Siège", value: "Cuir confortable" },
      { key: "Système", value: "Changement Shimano" },
      { key: "Confort", value: "Porte-bagage inclus" },
      { key: "Charge max", value: "130 kg" }
    ]
  }
],
   warranty: "Garantie de 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1316643962788518%2F&show_text=false&width=267&t=0"
 },
  
 {
   id: "velo-electrique-likebike-shine",
   title: "VÉLO ÉLECTRIQUE LIKEBIKE SHINE",
   brand: "LIKEBIKE",
   category: "دراجات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 269,
   currentPrice: 7199,
   oldPrice: 10099,
   discount: 30,
   images: [
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-01.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-02.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-03.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-04.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-05.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-06.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-07.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-08.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-09.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-SHINE/velo-ekectrique-shine-10.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "Puissance", value: "500 W MAX" },
      { key: "Vitesse Max", value: "50 km/h MAX" },
      { key: "Batterie", value: "Lithium 48V 13AH" },
      { key: "Autonomie", value: "45-55 km MAX" },
      { key: "Vitesses moteur", value: "5 vitesses (5E)" },
      { key: "Vitesses manuelles", value: "7 vitesses (7E)" },
      { key: "Freins", value: "Avant et arrière" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "Charge rapide", value: "Compatible 54V" },
      { key: "Affichage", value: "Digital multifonction" },
      { key: "Amortisseurs", value: "Réglable avant" },
      { key: "Éclairage", value: "LED avant et arrière + klaxon" },
      { key: "Pneus", value: "20 pouces avec garde-boue" },
      { key: "Siège", value: "Cuir confortable" },
      { key: "Système", value: "Changement Shimano" },
      { key: "Pièces", value: "Pièces Shimano" },
      { key: "Porte-bagage", value: "Inclus" },
      { key: "Charge max", value: "130 kg" }
    ]
  }
],
   warranty: "Garantie de 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F497450016283432%2F&show_text=false&width=267&t=0"
 },
  
 {
   id: "VÉLO-ÉLECTRIQUE-LIKEBIKE-2025",
   title: "VÉLO ÉLECTRIQUE 2025 ",
   brand: "LIKEBIKE",
   category: "دراجات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 165,
   currentPrice: 5499,
   oldPrice: 7099,
   discount: 30,
   images: [
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-01.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-02.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-03.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-04.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-05.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-06.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-07.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-08.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-09.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-10.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-11.webp",
     "VÉLO-ÉLECTRIQUE-2025/velo-electrique-2025-12.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "Puissance", value: "400 W MAX" },
      { key: "Vitesse Max", value: "46 KM" },
      { key: "Démarrage", value: "Contact électrique" },
      { key: "Batterie", value: "48V 15.6AH Lithium" },
      { key: "Autonomie", value: "45-55 KM MAX" },
      { key: "Freins", value: "AV/AR" },
      { key: "Vitesse", value: "3 niveaux + 1 pédale" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "Charge", value: "54V compatible" },
      { key: "Amortisseurs", value: "Double" },
      { key: "LED", value: "AV/AR" },
      { key: "Pneus", value: "14 pouces" },
      { key: "Siège", value: "2 places cuir" },
      { key: "Affichage", value: "TABLEAU DIGITAL" },
      { key: "Confort", value: "Vélo pliable" },
      { key: "Charge max", value: "120 kg" }
    ]
  }
],
   warranty: "Garantie de 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F3938949116374653%2F&show_text=false&width=267&t=0"
 },
  
  {
   id: "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11",
   title: "VÉLO ÉLECTRIQUE LIKEBIKE HARLEY U11",
   brand: "LIKEBIKE",
   category: "دراجات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 136,
   currentPrice: 8099,
   oldPrice: 10999,
   discount: 30,
   images: [
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-01.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-02.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-03.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-04.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-05.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-06.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-07.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-08.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-09.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-10.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-11.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-12.webp",
      "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-13.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-14.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-15.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-16.webp"
   ],
  features: [
    {
      title: "المواصفات التقنية",
      icon: "fa-cogs",
      items: [
        { key: "Puissance", value: "500 W MIN - 720 W MAX" },
        { key: "Vitesse max", value: "51 km/h" },
        { key: "Démarrage", value: "Contact électrique" },
        { key: "Batterie", value: "Lithium 48V 18.2AH" },
        { key: "Autonomie normale", value: "45-60 km MAX" },
        { key: "Mode assistance", value: "100 km MAX" },
        { key: "Freinage", value: "Avant et arrière" }
      ]
    },
    {
      title: "المميزات الإضافية",
      icon: "fa-star",
      items: [
        { key: "Charge rapide", value: "54V compatible" },
        { key: "Amortisseurs", value: "Réglables avant et arrière" },
        { key: "Éclairage", value: "LED avant et arrière + signal à droite et à gauche" },
        { key: "Pneus", value: "20.4\" avec garde-boue" },
        { key: "Klaxon", value: "Électrique" },
        { key: "Charge maximale", value: "130 kg" },
        { key: "Affichage", value: "Tableau digital multifonction" },
        { key: "Transmission", value: "Changement Shimano, 7 vitesses" },
        { key: "Confort", value: "Siège cuir, 2 places" },
        { key: "Pièces", value: "Shimano de haute qualité" }
      ]
    }
  ],
   warranty: "Garantie de 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1819301842180680%2F&show_text=false&width=267&t=0"
 },
  
 {
   id: "trottinette-bison-gt-1000",
   title: "TROTTINETTE BISON GT 1000",
   brand: "Ecoxtrem",
   category: "تروتنيت",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 136,
   currentPrice: 5890,
   oldPrice: 7099,
   discount: 20,
   images: [
     "bison-gt/bison-gt-1000-1.webp",
     "bison-gt/bison-gt-1000-2.webp",
     "bison-gt/bison-gt-1000-3.webp",
     "bison-gt/bison-gt-1000-4.webp",
     "bison-gt/bison-gt-1000-5.webp",
     "bison-gt/bison-gt-1000-6.webp",
     "bison-gt/bison-gt-1000-7.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "MARQUE", value: "BISON GT ORIGINAL" },
      { key: "MOTEUR", value: "1000W MAX" },
      { key: "VITESSE", value: "Jusqu'à 50 km/h" },
      { key: "BATTERIE", value: "48V 13Ah Lithium" },
      { key: "AUTONOMIE", value: "Jusqu'à 40 km" },
      { key: "CHARGE MAX", value: "120 kg" },
      { key: "FREINS", value: "Disques avant et arrière + E-ABS" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "PNEUS", value: "10 pouces Off-road" },
      { key: "AMORTISSEURS", value: "Double suspension" },
      { key: "TABLEAU DE BORD", value: "Écran digital" },
      { key: "LUMIÈRES LED", value: "Avant & arrière" },
      { key: "PLIABLE", value: "Oui" },
      { key: "KLAXON", value: "Oui" }
    ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1805454483624438%2F&show_text=false&width=267&t=0"
 },
 {
   id: "trottinette-EcoXtrem-liner",
   title: "TROTTINETTE EcoXtrem LINEAR",
   brand: "EcoXtrem",
   category: "تروتنيت",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 138,
   currentPrice: 3490,
   oldPrice: 4199,
   discount: 30,
   images: [
     "ecoxtrem-linear/ecoxtrem-linear-01.webp",
     "ecoxtrem-linear/ecoxtrem-linear-08.webp",
     "ecoxtrem-linear/ecoxtrem-linear-02.webp",
     "ecoxtrem-linear/ecoxtrem-linear-03.webp",
     "ecoxtrem-linear/ecoxtrem-linear-04.webp",
     "ecoxtrem-linear/ecoxtrem-linear-05.webp",
     "ecoxtrem-linear/ecoxtrem-linear-06.webp",
     "ecoxtrem-linear/ecoxtrem-linear-07.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "MARQUE", value: "EcoXtrem LINEAR" },
      { key: "MOTEUR", value: "350W - 700W max" },
      { key: "VITESSE", value: "25 - 30 km/h" },
      { key: "BATTERIE", value: "36V 7,8AH Lithium" },
      { key: "AUTONOMIE", value: "15 - 25 km" },
      { key: "CHARGE MAX", value: "100 kg" },
      { key: "FREIN", value: "Disque arrière + Électrique" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "ROUES", value: "10 pouces Tubeless" },
      { key: "ÉTANCHÉITÉ", value: "IPX5" },
      { key: "ÉCRAN", value: "LCD EY2" },
      { key: "VITESSE", value: "3 niveaux réglables" },
      { key: "LED", value: "Avant + Stop arrière" },
      { key: "SIGNAL", value: "Clignotants gauche/droite" },
      { key: "KLAXON", value: "Oui" },
      { key: "PLIABLE", value: "Oui" },
      { key: "CADEAU", value: "Sac offert 🎁" }
    ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1001871115150219%2F&show_text=false&width=267&t=0"
  },
  
  {
   id: "voiture_range_rover_police",
   title: "Voiture Range-Rover police",
   brand: "Range-Rover modèle enfant",
   category: "سيارات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 192,
   currentPrice: 1820,
   oldPrice: 2350,
   discount: 30,
   images: [
     "voiture_range_rover_police/voiture_range_rover_police-05.webp",
     "voiture_range_rover_police/voiture_range_rover_police-02.webp",
     "voiture_range_rover_police/voiture_range_rover_police-03.webp",
     "voiture_range_rover_police/voiture_range_rover_police-04.webp",
     "voiture_range_rover_police/voiture_range_rover_police-01.webp",
     "voiture_range_rover_police/voiture_range_rover_police-06.webp",
     "voiture_range_rover_police/voiture_range_rover_police-07.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "MARQUE", value: "Modèle enfant" },
      { key: "MOTEUR", value: "5 moteurs puissants" },
      { key: "VITESSE", value: "3 niveaux" },
      { key: "BATTERIE", value: "12V rechargeable" },
      { key: "AUTONOMIE", value: "1-2h de jeu" },
      { key: "CHARGE MAX", value: "Jusqu'à 30 kg" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "CEINTURE", value: "Incluse" },
      { key: "ROUES", value: "Antidérapantes" },
      { key: "PROTECTION", value: "Résistante" },
      { key: "MUSIQUE", value: "Bluetooth, USB, AUX" },
      { key: "LED", value: "Avant & arrière" },
      { key: "KLAXON", value: "Son réaliste" },
      { key: "BALANÇOIRE", value: "Effet intégré" },
      { key: "TÉLÉCOMMANDE", value: "Parentale" }
    ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1369894724022601%2F&show_text=false&width=267&t=0"
 },
  
{
   id: "voiture-Lamborghini-2025",
   title: "Voiture Lamborghini 2025",
   brand: "Lamborghini modèle enfant",
   category: "سيارات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 192,
   currentPrice: 1590,
   oldPrice: 2000,
   discount: 30,
   images: [
     "voiture-Lamborghini-original/voiture-lamborghini-original-01.webp",
     "voiture-Lamborghini-original/voiture-lamborghini-original-02.webp",
     "voiture-Lamborghini-original/voiture-lamborghini-original-03.webp",
     "voiture-Lamborghini-original/voiture-lamborghini-original-04.webp",
     "voiture-Lamborghini-original/voiture-lamborghini-original-05.webp",
     "voiture-Lamborghini-original/voiture-lamborghini-original-06.webp",
     "voiture-Lamborghini-original/voiture-lamborghini-original-07.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "MARQUE", value: "Modèle enfant" },
      { key: "MOTEUR", value: "3 moteurs puissants" },
      { key: "VITESSE", value: "3 vitesses + bascule" },
      { key: "BATTERIE", value: "2x 6V rechargeables" },
      { key: "CHARGEUR", value: "Inclus (12V)" },
      { key: "AUTONOMIE", value: "1-2h" },
      { key: "ÂGE", value: "1-6 ans" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "CEINTURE", value: "Incluse" },
      { key: "AMORTISSEURS", value: "Oui" },
      { key: "ROUES", value: "Antidérapantes" },
      { key: "PROTECTION", value: "Résistante" },
      { key: "MUSIQUE", value: "Bluetooth, USB, AUX" },
      { key: "LED", value: "Avant & arrière" },
      { key: "KLAXON", value: "Oui" },
      { key: "BALANÇOIRE", value: "Oui" },
      { key: "TÉLÉCOMMANDE", value: "Parentale" },
      { key: "SIÈGE", value: "Confortable" }
    ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1179274147225695%2F&show_text=false&width=267&t=0"
 },
  
{
   id: "Moteur-HARLEY-6V",
   title: "Moteur HARLEY 6V",
   brand: "HARLEY modèle enfant ",
   category: "سيارات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 260,
   currentPrice: 999,
   oldPrice: 1550,
   discount: 30,
   images: [
     "Moteur-HARLEY-6V/moteur-harley-6v-01.webp",
     "Moteur-HARLEY-6V/moteur-harley-6v-02.webp",
     "Moteur-HARLEY-6V/moteur-harley-6v-03.webp",
     "Moteur-HARLEY-6V/moteur-harley-6v-04.webp",
     "Moteur-HARLEY-6V/moteur-harley-6v-05.webp",
     "Moteur-HARLEY-6V/moteur-harley-6v-06.webp",
     "Moteur-HARLEY-6V/moteur-harley-6v-07.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "MARQUE", value: "HARLEY modèle enfant" },
      { key: "MOTEUR", value: "2 moteurs puissants" },
      { key: "VITESSE", value: "3 vitesses" },
      { key: "BATTERIE", value: "2 batteries 6V rechargeables" },
      { key: "CHARGEUR", value: "Chargeur 12 volts inclus" },
      { key: "ÂGE", value: "Adaptée pour une utilisation de 1 à 6 ans" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "SIÈGE", value: "1 place en cuir confortable" },
      { key: "AMORTISSEURS", value: "Inclus pour un confort optimal" },
      { key: "ÉCLAIRAGE", value: "LED avant et arrière pour plus de visibilité" },
      { key: "MUSIQUE", value: "Bluetooth, USB et câble auxiliaire" },
      { key: "EFFETS SONORES", value: "Effets intégrés pour une expérience immersive" },
      { key: "GUIDE UTILISATEUR", value: "Manuel d'utilisation inclus 🎁" }
    ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1779576732774007%2F&show_text=false&width=264&t=0"
 }
  
]; 

// تعيين المتغير global للصفحة
window.products = products;







