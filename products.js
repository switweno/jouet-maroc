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
          { key: "PUISSANCE", value: "1000 W" },
          { key: "VITESSE", value: "50-56 KM/H" },
          { key: "MODE DE CONDUITE", value: "3 VITESSES" },
          { key: "BATTERIE", value: "LITHIUM 48V 17.5AH" },
          { key: "AUTONOMIE", value: "45-60 KM" },
          { key: "CHARGE MAX", value: "110 KG" },
          { key: "FREINAGE", value: "DISQUES AV/AR + E-ABS" }
        ]
      },
      {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
          { key: "AFFICHAGE", value: "DISPLAY EY2 (APPLICATION MOBILE) 📱" },
          { key: "SUSPENSION", value: "AV/AR RÉGLABLES" },
          { key: "ÉCLAIRAGE", value: "LED AV/AR + إشارات" },
          { key: "ÉTANCHÉITÉ", value: "IPX5" },
          { key: "CONCEPTION", value: "PLIABLE" },
          { key: "KLAXON", value: "OUI" },
          { key: "CADEAU 1", value: "حقيبة هدية 🎁" },
          { key: "CADEAU 2", value: "غرفة هواء هدية 🎁" },
          { key: "CADEAU 3", value: "قفل مرفق هدية 🎁" }
        ]
      }
    ],
    warranty: "GARANTIE 3 MOIS",
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
      "Xiaomi Essential/xiaomi-essential-07.webp",
      "Xiaomi Essential/xiaomi-essential-08.webp"
    ],
    features: [
      {
        title: "المواصفات التقنية",
        icon: "fa-cogs",
        items: [
          { key: "PUISSANCE", value: "500W MAX" },
          { key: "VITESSE", value: "20 KM/H MIN - 25 KM/H MAX" },
          { key: "MODE DE CONDUITE", value: "3 VITESSES RÉGLABLES" },
          { key: "BATTERIE", value: "LITHIUM 36V 5100MAH / 183WH" },
          { key: "AUTONOMIE", value: "15 KM MIN - 20 KM MAX" },
          { key: "CHARGE MAX", value: "100 KG" },
          { key: "FREINAGE", value: "DISQUE AR & ELECTRIQUE + E-ABS" }
        ]
      },
      {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
          { key: "MATÉRIAU", value: "ALUMINIUM" },
          { key: "ÉCLAIRAGE", value: "LED AV/AR" },
          { key: "FEU STOP", value: "LED" },
          { key: "FEU AVANT", value: "LED" },
          { key: "ÉTANCHÉITÉ", value: "IPX5" },
          { key: "AFFICHAGE", value: "LCD AVEC APP MOBILE 📱" },
          { key: "PNEUS", value: "8,5 POUCES" },
          { key: "CONCEPTION", value: "PLIABLE" },
          { key: "INDICATEUR", value: "BATTERIE" },
          { key: "BÉQUILLE", value: "KLAXON INCLUS" }
        ]
      }
    ],
    warranty: "GARANTIE 3 MOIS",
    videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1891550898286187%2F&show_text=false&width=267&t=0"
  },
  {
    id: "kukarin-g2-pro",
    title: "TROTTINETTE KUKIRIN G2 PRO",
    brand: "KUKIRIN",
    category: "تروتنيت",
    availability: "غير متوفر",
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
      "kukaring2pro/kukiring2pro-4.webp"
    ],
    features: [
      {
        title: "المواصفات التقنية",
        icon: "fa-cogs",
        items: [
          { key: "PUISSANCE", value: "1200W" },
          { key: "VITESSE", value: "50-57 KM/H" },
          { key: "BATTERIE", value: "48V 15AH" },
          { key: "AUTONOMIE", value: "40-50 KM" },
          { key: "CHARGE MAX", value: "120 KG" },
          { key: "FREIN", value: "DISQUES AV/AR" }
        ]
      },
      {
         title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
          { key: "SUSPENSION", value: "AV/AR RÉGLABLES" },
          { key: "ÉCLAIRAGE", value: "LED AV/AR + CLIGNOTANTS" },
          { key: "ÉTANCHÉITÉ", value: "IPX5" },
          { key: "AFFICHAGE", value: "ÉCRAN LCD MULTIFONCTION" },
          { key: "PNEUS", value: "OFF-ROAD 8.5\" RENFORCÉS" },
          { key: "CONCEPTION", value: "PLIABLE AVEC SIÈGE EN CUIR" },
          { key: "INDICATEUR", value: "INDICATEUR DE BATTERIE + CLIGNOTANTS" },
          { key: "CADEAU", value: "🎁 SURPRISE OFFERTE !" }
        ]
      }
    ],
    warranty: "GARANTIE 3 MOIS",
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
          { key: "PUISSANCE", value: "1000W MIN - 1450W MAX" },
          { key: "VITESSE", value: "50-67 KM/H" },
          { key: "MODE DE CONDUITE", value: "3 VITESSES" },
          { key: "BATTERIE", value: "LITHIUM 52V 14AH" },
          { key: "AUTONOMIE", value: "30-40 KM" },
          { key: "CHARGE MAXIMALE", value: "120 KG" },
          { key: "FREINAGE", value: "DISQUES AV/AR + E-ABS" }
        ]
      },
      {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
          { key: "SUSPENSION", value: "AVANT ET ARRIÈRE" },
          { key: "ÉCLAIRAGE", value: "LED AV/AR + CLIGNOTANTS" },
          { key: "ÉTANCHÉITÉ", value: "IPX5" },
          { key: "WATERPROOF", value: "IPX4" },
          { key: "AFFICHAGE", value: "DISPLAY EY2" },
          { key: "PNEUS", value: "9\" RENFORCÉS" },
          { key: "CONCEPTION", value: "PLIABLE AVEC KLAXON" },
          { key: "TABLEAU DE BORD", value: "DIGITAL" }
        ]
      }
    ],
    warranty: "GARANTIE 3 MOIS",
    videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F657273883473788%2F&show_text=false&width=267&t=0"
  },
  {
    id: "VÉLO-BMX-GTR -ALUMINIUM",
    title: "VÉLO BMX GTR ALUMINIUM 26",
    brand: "HAOMENG",
    category: "دراجات هوائية",
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
          { key: "ROUES", value: "26 POUCES" },
          { key: "MATÉRIAU", value: "VÉLO ALUMINIUM" },
          { key: "QUALITÉ", value: "BMX GTR 1E QUALITÉ " },
          { key: "ROUES MATÉRIAU", value: "ROUE DE VÉLO ALUMINIUM" },
          { key: "CHANGEMENT", value: "CHANGEMENT SUNRISE" },
          { key: "VITESSE", value: "VITESSE 3×7=21" },
          { key: "PLATEAU", value: "PLATEAU SUNRISE‏" }
        ]
      },
      {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
          { key: "FREINS", value: "FREIN À DISQUE AVANT ET ARRIÈRE" },
          { key: "AMORTISSEUR", value: "AMORTISSEUR AVANT" },
          { key: "SIÈGE", value: "SIÈGE SPORT CUIR" },
          { key: "GARDES-BOUE", value: "LES GARDES-BOUES AV ET AR" }
        ]
      }
    ],
    warranty: "GARANTIE DE 3 MOIS",
    videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F634632965780146%2F&show_text=false&width=267&t=0"
  },
  
  {
    id: "VÉLO-VTT-YOUMEIG-20",
    title: " VÉLO VTT YOUMEIG 20",
    brand: "YOUMEIG",
    category: "دراجات هوائية",
    availability: "متوفر في المخزون",
    ratings: 4.5,
    reviewCount: 26,
    currentPrice: 1149,
    oldPrice: 1399,
    discount: 30,
    images: [
      "VÉLO-VTT-YOUMEIG-20/velo-vtt-youmeig-20-01.webp",
      "VÉLO-VTT-YOUMEIG-20/velo-vtt-youmeig-20-02.webp",
      "VÉLO-VTT-YOUMEIG-20/velo-vtt-youmeig-20-03.webp",
      "VÉLO-VTT-YOUMEIG-20/velo-vtt-youmeig-20-04.webp",
      "VÉLO-VTT-YOUMEIG-20/velo-vtt-youmeig-20-05.webp",
      "VÉLO-VTT-YOUMEIG-20/velo-vtt-youmeig-20-06.webp",
      "VÉLO-VTT-YOUMEIG-20/velo-vtt-youmeig-20-07.webp",
      "VÉLO-VTT-YOUMEIG-20/velo-vtt-youmeig-20-08.webp",
      "VÉLO-VTT-YOUMEIG-20/velo-vtt-youmeig-20-09.webp"
    ],
    features: [
    {
        title: "المواصفات التقنية",
        icon: "fa-cogs",
        items: [
            { key: "ROUES", value: "20 POUCES" },
            { key: "GARDES-BOUES", value: "AV ET AR" },
            { key: "QUALITÉ", value: "YOUMEIG 1E QUALITÉ" },
            { key: "ROUE", value: "ALUMINIUM" },
            { key: "CHANGEMENT DE VITESSE", value: "SHIMANO" },
            { key: "VITESSE", value: "1×7" },
            { key: "PLATEAU", value: "SHIMANO" }
        ]
    },
    {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
            { key: "AMORTISSEUR", value: "AVANT" },
            { key: "SIÈGE", value: "SIÈGE SPORT EN CUIR" },
            { key: "FREINS", value: "DISQUES AVANT ET ARRIÈRE" }
        ]
    }
],

    warranty: "GARANTIE DE 3 MOIS",
    videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1901365823940555%2F&show_text=false&width=267&t=0"
  },
  
    {
    id: "VÉLO-VTT-ITALIANO-20",
    title: "VÉLO VTT ITALIANO 20",
    brand: "ITALIANO",
    category: "دراجات هوائية",
    availability: "متوفر في المخزون",
    ratings: 4.5,
    reviewCount: 9,
    currentPrice: 1190,
    oldPrice: 1399,
    discount: 30,
    images: [
      "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-01.webp",
      "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-02.webp",
      "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-03.webp",
     "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-04.webp",
     "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-05.webp",
     "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-06.webp",
     "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-07.webp",
     "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-08.webp",
     "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-09.webp",
     "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-10.webp",
     "VÉLO-VTT-ITALIANO-20/velo-vtt-italiano-20-11.webp"
    ],
      
    features: [
    {
        title: "المواصفات التقنية",
        icon: "fa-cogs",
        items: [
             { key: "ROUES", value: "20 POUCES" },
      { key: "GARDES-BOUES", value: "AV ET AR" },
      { key: "QUALITÉ", value: "ITALIANO QUALITÉ 100%" },
      { key: "ROUE", value: "ALUMINIUM" },
      { key: "CHANGEMENT DE VITESSE", value: "SHIMANO" },
      { key: "VITESSE", value: "1×7" },
      { key: "PLATEAU", value: "SHIMANO" }
        ]
    },
    {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
           { key: "AMORTISSEUR", value: "AVANT" },
      { key: "SIÈGE", value: "SPORT EN CUIR" },
      { key: "FREINS", value: "DISQUES AVANT ET ARRIÈRE" }
        ]
    }
],

    warranty: "GARANTIE DE 3 MOIS",
    videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1745763942639295%2F&show_text=false&width=267&t=0"
  },
  {
    id: "velo-vtt-haomeng-27.5",
    title: "VÉLO VTT HAOMENG 27.5",
    brand: "HAOMENG",
    category: "دراجات هوائية",
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
          { key: "ROUES", value: "26 POUCES" },
          { key: "MATÉRIAU", value: "ALUMINIUM" },
          { key: "QUALITÉ", value: "BMX GTR 1E" },
          { key: "ROUE", value: "ALUMINIUM" },
          { key: "CHANGEMENT DE VITESSE", value: "SUNRISE" },
          { key: "VITESSE", value: "3×7 = 21 VITESSES" },
          { key: "PLATEAU", value: "SUNRISE" }
        ]
      },
      {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
          { key: "FREINS", value: "DISQUES AVANT ET ARRIÈRE" },
          { key: "AMORTISSEUR", value: "AMORTISSEUR AVANT" },
          { key: "SIÈGE", value: "SIÈGE SPORT EN CUIR" }
        ]
      }
    ],
    warranty: "GARANTIE DE 3 MOIS",
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
          { key: "PUISSANCE", value: "750 W MAX" },
          { key: "BATTERIE", value: "LITHIUM 48V 18.2AH" },
          { key: "CHARGE RAPIDE", value: "COMPATIBLE 54V" },
          { key: "CHARGE MAXIMALE", value: "130 KG" },
          { key: "AUTONOMIE NORMALE", value: "45-60 KM" },
          { key: "MODE ASSISTANCE", value: "100 KM MAX" },
          { key: "VITESSE", value: "50 KM/H MIN - 62 KM/H MAX" },
          { key: "FREINS", value: "DISQUES AV/AR" }
        ]
      },
      {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
          { key: "AFFICHAGE", value: "ÉCRAN LCD MULTIFONCTION" },
          { key: "NIVEAUX DE VITESSE", value: "5 NIVEAUX" },
          { key: "TRANSMISSION", value: "7 VITESSES SHIMANO" },
          { key: "ÉCLAIRAGE", value: "LED AV/AR + CLIGNOTANTS" },
          { key: "AMORTISSEURS", value: "RÉGLABLES AV/AR" },
          { key: "CONFORT", value: "SIÈGE CUIR 2 PLACES" },
          { key: "DÉMARRAGE", value: "CONTACT" },
          { key: "PNEUS", value: "20.4\" AVEC GARDE-BOUE" },
          { key: "KLAXON", value: "ÉLECTRIQUE" },
          { key: "PIÈCES", value: "SHIMANO" }
        ]
      }
    ],
    warranty: "GARANTIE DE 3 MOIS",
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
          { key: "PUISSANCE", value: "500 W MAX" },
          { key: "VITESSE MAX", value: "50 KM/H MAX" },
          { key: "BATTERIE", value: "LITHIUM 48V 13AH" },
          { key: "CHARGE RAPIDE", value: "COMPATIBLE 54V" },
          { key: "AUTONOMIE", value: "45-55 KM" },
          { key: "VITESSES MOTEUR", value: "5 NIVEAUX DE VITESSE" },
          { key: "FREINS", value: "AV/AR" }
        ]
      },
      {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
          { key: "AFFICHAGE", value: "شاشة رقمية متعددة الوظائف" },
          { key: "AMORTISSEURS", value: "RÉGLABLE AV" },
          { key: "ÉCLAIRAGE", value: "LED AV/AR + KLAXON" },
          { key: "PNEUS", value: "20'' AVEC GARDE-BOUE" },
          { key: "SIÈGE", value: "CUIR CONFORTABLE" },
          { key: "SYSTÈME", value: "CHANGEMENT SHIMANO" },
          { key: "VITESSES", value: "7 VITESSES" },
          { key: "CONFORT", value: "PORTE-BAGAGE INCLUS" },
          { key: "CHARGE MAX", value: "130 KG" }
        ]
      }
    ],
    warranty: "GARANTIE DE 3 MOIS",
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
          { key: "PUISSANCE", value: "500 W MAX" },
          { key: "VITESSE MAX", value: "50 KM/H MAX" },
          { key: "BATTERIE", value: "LITHIUM 48V 13AH" },
          { key: "CHARGE RAPIDE", value: "COMPATIBLE 54V" },
          { key: "AUTONOMIE", value: "45-55 KM MAX" },
          { key: "NIVEAUX DE VITESSE", value: "5 NIVEAUX DE VITESSE" },
          { key: "FREINS", value: "AVANT ET ARRIÈRE" }
        ]
      },
      {
        title: "المميزات الإضافية",
        icon: "fa-star",
        items: [
          { key: "AFFICHAGE", value: "DIGITAL MULTIFONCTION" },
          { key: "AMORTISSEURS", value: "RÉGLABLE AVANT" },
          { key: "ÉCLAIRAGE", value: "LED AVANT ET ARRIÈRE + KLAXON" },
          { key: "PNEUS", value: "20 POUCES AVEC GARDE-BOUE" },
          { key: "SIÈGE", value: "CUIR CONFORTABLE" },
          { key: "SYSTÈME", value: "CHANGEMENT SHIMANO" },
          { key: "VITESSES", value: "7 VITESSES SHIMANO" },
          { key: "PIÈCES", value: "PIÈCES SHIMANO" },
          { key: "PORTE-BAGAGE", value: "INCLUS" },
          { key: "CHARGE MAX", value: "130 KG" }
        ]
      }
    ],
    warranty: "GARANTIE DE 3 MOIS",
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
      { key: "PUISSANCE", value: "400 W MAX" },
      { key: "VITESSE MAX", value: "46 KM" },
      { key: "DÉMARRAGE", value: "CONTACT ÉLECTRIQUE" },
      { key: "BATTERIE", value: "48V 15.6AH LITHIUM" },
      { key: "AUTONOMIE", value: "45-55 KM MAX" },
      { key: "FREINS", value: "AV/AR" },
      { key: "VITESSE", value: "3 NIVEAUX + 1 PÉDALE" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "CHARGE", value: "54V COMPATIBLE" },
      { key: "AMORTISSEURS", value: "DOUBLE" },
      { key: "LED", value: "AV/AR" },
      { key: "PNEUS", value: "14 POUCES" },
      { key: "SIÈGE", value: "2 PLACES CUIR" },
      { key: "AFFICHAGE", value: "TABLEAU DIGITAL" },
      { key: "CONFORT", value: "VÉLO PLIABLE" },
      { key: "CHARGE MAX", value: "120 KG" }
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
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-14.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-15.webp",
     "VÉLO-ÉLECTRIQUE-LIKEBIKE-HARLEY-U11/likebike-u11-16.webp"
   ],
features: [
    {
      title: "المواصفات التقنية",
      icon: "fa-cogs",
      items: [
        { key: "MOTEUR", value: "500 W MIN - 720 W MAX" },
        { key: "BATTERIE", value: "48 V 18,2 AH - LITHIUM" },
        { key: "CHARGE MAX", value: "130 KG" },
        { key: "FREINAGE", value: "AVANT ET ARRIÈRE" },
        { key: "AUTONOMIE", value: "45 KM - 60 KM MAX" },
        { key: "MODE ASSISTANCE", value: "100 KM MAX" },
        { key: "VITESSE MAX", value: "51 KM/H" },
        { key: "CHARGE RAPIDE", value: "54V" }
      ]
    },
    {
      title: "المميزات الإضافية",
      icon: "fa-star",
      items: [
        { key: "TABLEAU", value: "DIGITAL" },
        { key: "NIVEAUX DE VITESSE", value: "5 NIVEAUX" }, 
        { key: "CHANGEMENT SHIMANO", value: "7E VITESSE" },
        { key: "ÉCLAIRAGE", value: "LED AVANT ET ARRIÈRE" },
        { key: "SIGNAL", value: "À DROITE ET À GAUCHE" },
        { key: "AMORTISSEUR", value: "AVANT ET ARRIÈRE" },
        { key: "SIÈGE", value: "CUIR - 2 PLACES EN CUIR" },
        { key: "DÉMARRAGE", value: "CONTACT" },
        { key: "PNEU", value: "20,4 POUCES" },
        { key: "KLAXON", value: "ÉLECTRIQUE" },
        { key: "PIÈCES", value: "SHIMANO" },
        { key: "GARDE-BOUE", value: "AV ET AR" }
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
     "bison-gt/bison-gt-1000-7.webp",
     "bison-gt/bison-gt-1000-8.webp",
     "bison-gt/bison-gt-1000-9.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "MARQUE", value: "BISON GT ORIGINAL" },
      { key: "MOTEUR", value: "1000W MAX" },
      { key: "VITESSE", value: "JUSQU'À 50 KM/H" },
      { key: "BATTERIE", value: "48V 13AH LITHIUM" },
      { key: "AUTONOMIE", value: "JUSQU'À 40 KM" },
      { key: "CHARGE MAX", value: "120 KG" },
      { key: "FREINS", value: "DISQUES AVANT ET ARRIÈRE + E-ABS" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "PNEUS", value: "10 POUCES OFF-ROAD" },
      { key: "AMORTISSEURS", value: "DOUBLE SUSPENSION" },
      { key: "TABLEAU DE BORD", value: "ÉCRAN DIGITAL" },
      { key: "LUMIÈRES LED", value: "AVANT & ARRIÈRE" },
      { key: "PLIABLE", value: "OUI" },
      { key: "KLAXON", value: "OUI" }
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
      { key: "MARQUE", value: "ECOXTREM LINEAR" },
      { key: "MOTEUR", value: "350W - 700W MAX" },
      { key: "VITESSE", value: "25 - 30 KM/H" },
      { key: "BATTERIE", value: "36V 7,8AH LITHIUM" },
      { key: "AUTONOMIE", value: "15 - 25 KM" },
      { key: "CHARGE MAX", value: "100 KG" },
      { key: "FREIN", value: "DISQUE ARRIÈRE + ÉLECTRIQUE" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "ROUES", value: "10 POUCES TUBELESS" },
      { key: "ÉTANCHÉITÉ", value: "IPX5" },
      { key: "ÉCRAN", value: "LCD EY2" },
      { key: "VITESSE", value: "3 NIVEAUX RÉGLABLES" },
      { key: "LED", value: "AVANT + STOP ARRIÈRE" },
      { key: "SIGNAL", value: "CLIGNOTANTS GAUCHE/DROITE" },
      { key: "KLAXON", value: "OUI" },
      { key: "PLIABLE", value: "OUI" },
      { key: "CADEAU", value: "SAC OFFERT 🎁" }
    ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1001871115150219%2F&show_text=false&width=267&t=0"
  },
  
   {
   id: "voiture-jeep-bougie",
   title: "voiture jeep bougie 2025",
   brand: "Marque enfant",
   category: "سيارات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 55,
   currentPrice: 2599,
   oldPrice: 3300,
   discount: 30,
   images: [
     "voiture-jeep-bougie/voiture-jeep-bougie-01.webp",
     "voiture-jeep-bougie/voiture-jeep-bougie-02.webp",
     "voiture-jeep-bougie/voiture-jeep-bougie-03.webp",
      "voiture-jeep-bougie/voiture-jeep-bougie-04.webp",
      "voiture-jeep-bougie/voiture-jeep-bougie-05.webp",
      "voiture-jeep-bougie/voiture-jeep-bougie-06.webp",
     "voiture-jeep-bougie/voiture-jeep-bougie-07.webp"
   ],
    
features: [
  {
     title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "Batterie", value: "12V 10AH" },
      { key: "Chargeur", value: "12 volts" },
      { key: "Siège", value: "2 places cuir" },
      { key: "Moteur", value: "5 moteurs" },
      { key: "Vitesse", value: "3 niveaux" },
      { key: "Éclairage", value: "LED avant & arrière" },
      { key: "Tableau de bord", value: "Digital" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "Ceinture", value: "De sécurité" },
      { key: "Musique", value: "USB, câble auxiliaire" },
      { key: "Bluetooth", value: "Intégré" },
      { key: "Balançoire", value: "Effet intégré" },
      { key: "Amortisseurs", value: "Inclus" },
      { key: "Télécommande", value: "Manuelle + contrôle via téléphone" },
      { key: "Âge", value: "1 - 9 ans" }
  ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1356692908792031%2F&show_text=false&width=267&t=0"
 },
  
  {
   id: "Voiture-Mercedes-Classe-G",
   title: "Voiture Mercedes Classe G",
   brand: "Marque enfant",
   category: "سيارات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 45,
   currentPrice: 2199,
   oldPrice: 2900,
   discount: 30,
   images: [
     "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-01.webp",
      "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-02.webp",
      "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-03.webp",
      "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-04.webp",
      "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-05.webp",
      "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-06.webp",
     "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-07.webp",
      "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-08.webp",
      "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-09.webp",
      "Voiture-Mercedes-Classe-G/voiture-mercedes-classe-g-10.webp"
   ],
    
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "BATTERIE", value: "12V" },
      { key: "CHARGEUR", value: "12 VOLTS" },
      { key: "SIÈGE", value: "2 PLACES CUIR" },
      { key: "MOTEUR", value: "5 MOTEURS" },
      { key: "ÉCLAIRAGE", value: "LED" },
      { key: "TABLEAU", value: "DIGITAL" },
      { key: "VITESSE", value: "3 NIVEAUX" }
    ]
  },
 {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "CEINTURE", value: "DE SÉCURITÉ" },
      { key: "MUSIQUE", value: "USB, CÂBLE AUXILIAIRE" },
      { key: "BLUETOOTH", value: "INTÉGRÉ" },
      { key: "BALANÇOIRE", value: "EFFET INTÉGRÉ" },
      { key: "AMORTISSEURS", value: "INCLUS" },
      { key: "LED", value: "AVANT & ARRIÈRE" },
      { key: "TÉLÉCOMMANDE", value: "MANUELLE" },
      { key: "ÂGE", value: "1 - 7 ANS" },
      { key: "COULEUR", value: "BLANC & GRIS" }
  ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F654449327191104%2F&show_text=false&width=267&t=0"
 },
  
  {
   id: "voiture_range_rover_police",
   title: "Voiture Range-Rover police",
   brand: "Marque enfant",
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
      { key: "MOTEUR", value: "5 MOTEURS PUISSANTS" },
      { key: "VITESSE", value: "3 NIVEAUX" },
      { key: "BATTERIE", value: "12V RECHARGEABLE" },
      { key: "AUTONOMIE", value: "1-2H DE JEU" },
      { key: "CHARGE MAX", value: "JUSQU'À 30 KG" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "CEINTURE", value: "INCLUSE" },
      { key: "ROUES", value: "ANTIDÉRAPANTES" },
      { key: "PROTECTION", value: "RÉSISTANTE" },
      { key: "MUSIQUE", value: "BLUETOOTH, USB, AUX" },
      { key: "LED", value: "AVANT & ARRIÈRE" },
      { key: "KLAXON", value: "SON RÉALISTE" },
      { key: "BALANÇOIRE", value: "EFFET INTÉGRÉ" },
      { key: "TÉLÉCOMMANDE", value: "PARENTALE" }
     ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1369894724022601%2F&show_text=false&width=267&t=0"
 },
  
  {
   id: "Voiture-Mercedes-mini-44",
   title: "Voiture Mercedes mini 4*4",
   brand: "Marque enfant",
   category: "سيارات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 23,
   currentPrice: 1149 ,
   oldPrice: 1550,
   discount: 30,
   images: [
     "Voiture-Mercedes-mini-44/voiture-mercedes-mini 44-01.webp",
     "Voiture-Mercedes-mini-44/voiture-mercedes-mini 44-02.webp",
     "Voiture-Mercedes-mini-44/voiture-mercedes-mini 44-03.webp",
     "Voiture-Mercedes-mini-44/voiture-mercedes-mini 44-04.webp",
     "Voiture-Mercedes-mini-44/voiture-mercedes-mini 44-05.webp",
     "Voiture-Mercedes-mini-44/voiture-mercedes-mini 44-06.webp",
     "Voiture-Mercedes-mini-44/voiture-mercedes-mini 44-07.webp"
   ],
features: [
  {
    title: "المواصفات التقنية",
    icon: "fa-cogs",
    items: [
      { key: "MOTEUR", value: "5 motor" },
      { key: "VITESSE", value: "3E vitesse" },
      { key: "BATTERIE", value: "Batterie 12V" },
      { key: "TÉLÉCOMMANDE", value: "Télécommande manuel" },
      { key: "BLUETOOTH", value: "Bluetooth" },
      { key: "TÉLÉPHONE", value: "Maîtrisé depuis le téléphone 📲" },
      { key: "CHARGEUR", value: "Chargeur 12 volts" },
      { key: "PLACES", value: "2 place mini" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "CEINTURE", value: "ceinture de sécurité" },
      { key: "ROUES", value: "Les amortisseurs" },
      { key: "PROTECTION", value: "RÉSISTANTE" },
      { key: "MUSIQUE", value: "Music+USB+câble auxiliaire" },
      { key: "LED", value: "Led avant" },
      { key: "BALANÇOIRE", value: "Balançoire" },
      { key: "ÂGE", value: "l'AG 1 - 6 ans" }
     ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1416644319698669%2F&show_text=false&width=267&t=0"
 },
  
{
   id: "voiture-Lamborghini-2025",
   title: "Voiture Lamborghini 2025",
   brand: "Marque enfant",
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
      { key: "MOTEUR", value: "3 MOTEURS PUISSANTS" },
      { key: "VITESSE", value: "3 VITESSES + BASCULE" },
      { key: "BATTERIE", value: "2X 6V RECHARGEABLES" },
      { key: "CHARGEUR", value: "INCLUS (12V)" },
      { key: "AUTONOMIE", value: "1-2H" },
      { key: "ÂGE", value: "1-6 ANS" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "CEINTURE", value: "INCLUSE" },
      { key: "AMORTISSEURS", value: "OUI" },
      { key: "ROUES", value: "ANTIDÉRAPANTES" },
      { key: "PROTECTION", value: "RÉSISTANTE" },
      { key: "MUSIQUE", value: "BLUETOOTH, USB, AUX" },
      { key: "LED", value: "AVANT & ARRIÈRE" },
      { key: "KLAXON", value: "OUI" },
      { key: "BALANÇOIRE", value: "OUI" },
      { key: "TÉLÉCOMMANDE", value: "PARENTALE" },
      { key: "SIÈGE", value: "CONFORTABLE" }
    ]
  }
],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1179274147225695%2F&show_text=false&width=267&t=0"
 },
  
{
   id: "Moteur-HARLEY-6V",
   title: "Moteur HARLEY 6V",
   brand: "Marque enfant ",
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
      { key: "MOTEUR", value: "2 MOTEURS PUISSANTS" },
      { key: "VITESSE", value: "3 VITESSES" },
      { key: "BATTERIE", value: "2 BATTERIES 6V RECHARGEABLES" },
      { key: "CHARGEUR", value: "CHARGEUR 12V INCLUS" },
      { key: "ÂGE", value: "POUR ENFANTS DE 1 À 6 ANS" }
    ]
  },
  {
    title: "المميزات الإضافية",
    icon: "fa-star",
    items: [
      { key: "SIÈGE", value: "SIÈGE EN CUIR CONFORTABLE" },
      { key: "AMORTISSEURS", value: "AMORTISSEURS INTÉGRÉS" },
      { key: "ÉCLAIRAGE", value: "LED AVANT ET ARRIÈRE" },
      { key: "MUSIQUE", value: "BLUETOOTH, USB, CÂBLE AUX" },
      { key: "SONS", value: "EFFETS SONORES IMMERSIFS" },
      { key: "GUIDE", value: "MANUEL INCLUS 🎁" }
    ]
  }
],

   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1779576732774007%2F&show_text=false&width=264&t=0"
 }
  
]; 

// تعيين المتغير global للصفحة
window.products = products;