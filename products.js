

// تعريف جديد للمتغير productsData بدلاً من products لتجنب التعارض
var productsData = [
  {
   id: "dualtron-pop-54v",
   title: "TROTTINETTE DUALTRON POP 52V",
   brand: "DUALTRON",
   category: "تروتنيت",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 192,
   currentPrice: 7490,
   oldPrice: 8499,
   discount: 30,
   images: [
     "dualtron-pop/dualtron-pop_52v_02.webp",
     "dualtron-pop/dualtron-pop_52v_01.webp",
     "dualtron-pop/dualtron-pop_52v_03.webp",
     "dualtron-pop/dualtron-pop_52v_04.webp",
     "dualtron-pop/dualtron-pop_52v_05.webp",
     "dualtron-pop/dualtron-pop_52v_06.webp",
     "dualtron-pop/dualtron-pop_52v_07.webp"
   ],
   features: [
 {
   title: "MOTEUR & PERFORMANCE",
   icon: "fa-bolt",
   items: [
     { key: "Puissance", value: "1000W min - 1450W max " },
     { key: "Vitesse", value: "50 km/h min - 67 km/h max " },
     { key: "Mode de conduite", value: "3 vitesses réglables " },
     { key: "Démarrage", value: "Accélérateur électrique + pédale d'assistance " }
   ]
 },
 {
   title: "BATTERIE & AUTONOMIE",
   icon: "fa-battery-full",
   items: [
     { key: "Batterie", value: "Lithium 52V 14AH " },
     { key: "Autonomie", value: "30 km min - 40 km max " },
     { key: "Charge rapide", value: "Compatible 58V " },
     { key: "Charge maximale", value: "120 kg " }
   ]
 },
 {
   title: "SÉCURITÉ & CONTRÔLE",
   icon: "fa-shield-alt",
   items: [
     { key: "Freinage", value: "Disques AV/AR + E-ABS " },
     { key: "Suspension", value: "Avant et arrière réglables " },
     { key: "Éclairage", value: "LED AV/AR + clignotants directionnels " },
     { key: "Étanchéité", value: "IPX5 (batterie) / IPX4 (corps) " }
   ]
 },
 {
   title: "TECHNOLOGIE & CONFORT",
   icon: "fa-mobile-alt",
   items: [
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
     "vtt_27/vtt_27_01.webp",
     "vtt_27/vtt_27_02.webp",
     "vtt_27/vtt_27_03.webp",
     "vtt_27/vtt_27_04.webp",
     "vtt_27/vtt_27_05.webp",
     "vtt_27/vtt_27_06.webp",
     "vtt_27/vtt_27_07.webp"
   ],
   features: [
     {
        title: "CADRE & TRANSMISSION",
   icon: "fa-bicycle",
   items: [
     { key: "Roues", value: "27.5 pouces en aluminium " },
     { key: "Transmission", value: "3×7 vitesses (21 vitesses) " },
     { key: "Dérailleur", value: "LXYANG haute précision " },
     { key: "Plateau", value: "LXYANG renforcé " }
   ]
 },
 {
   title: "FREINS & AMORTISSEURS",
   icon: "fa-shield-alt",
   items: [
     { key: "Freins", value: "À disque hydrauliques AV/AR " },
     { key: "Amortisseur", value: "Avant réglable " },
     { key: "Pneus", value: "Anticrevaison avec garde-boue intégrés " }
   ]
 },
 {
   title: "ÉQUIPEMENT",
   icon: "fa-cogs",
   items: [
     { key: "Éclairage", value: "LED AV/AR haute luminosité " },
     { key: "Siège", value: "Cuir sport confort 2 places " },
     { key: "Charge maximale", value: "130 kg " }
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
     "product3.webp",
     "product2.webp",
     "product1.webp",
     "product4.webp",
     "product5.webp",
     "product6.webp",
     "product8.webp"
   ],
   features: [
     {
       title: "MOTEUR & PERFORMANCE",
       icon: "fa-bolt",
       items: [
         { key: "Puissance", value: "750 W MAX " },
         { key: "Vitesse", value: "50 km/h MIN - 62 km/h MAX " },
         { key: "Démarrage", value: "Contact électrique " }
       ]
     },
     {
       title: "BATTERIE & AUTONOMIE",
       icon: "fa-battery-full",
       items: [
         { key: "Batterie", value: "Lithium 48V 18.2AH " },
         { key: "Autonomie normale", value: "45-60 km " },
         { key: "Mode assistance", value: "100 km MAX " },
         { key: "Charge rapide", value: "54V compatible " }
       ]
     },
     {
       title: "SÉCURITÉ & CONFORT",
       icon: "fa-shield-alt",
       items: [
         { key: "Freins", value: "Disques AV/AR " },
         { key: "Amortisseurs", value: "Réglables AV/AR " },
         { key: "Éclairage", value: "LED AV/AR + clignotants " },
         { key: "Pneus", value: "20.4\" avec garde-boue " }
       ]
     },
     {
       title: "ÉQUIPEMENT & DESIGN",
       icon: "fa-cogs",
       items: [
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
         { key: "Moteur", value: "1000 W MAX " },
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
     "ecoxtrem-linear-01.webp",
     "ecoxtrem-linear-02.webp",
     "ecoxtrem-linear-03.webp",
     "ecoxtrem-linear-04.webp",
     "ecoxtrem-linear-05.webp",
     "ecoxtrem-linear-06.webp",
     "ecoxtrem-linear-07.webp"
   ],
   features: [
     {
       title: "MOTEUR ET PERFORMANCE",
       icon: "fa-tachometer-alt",
       items: [
         { key: "MARQUE", value: "EcoXtrem LINEAR" },
         { key: "MOTEUR", value: "350W min - 700W max" },
         { key: "VITESSE", value: "25 km/h min - 30 km/h max" }
       ]
     },
     {
       title: "BATTERIE ET AUTONOMIE",
       icon: "fa-battery-full",
       items: [
         { key: "BATTERIE", value: "36V 7,8AH LITHIUM" },
         { key: "AUTONOMIE", value: "15 km min - 25 km max" },
         { key: "CHARGE MAX", value: "100 kg" }
       ]
     },
     {
       title: "SÉCURITÉ ET DURABILITÉ",
       icon: "fa-shield-alt",
       items: [
         { key: "FREIN", value: "À disque arrière & Électrique" },
         { key: "ROUE", value: "10 pouces Tubeless" },
         { key: "ÉTANCHÉITÉ", value: "IPX5" }
       ]
     },
     {
       title: "FONCTIONNALITÉS AVANCÉES",
       icon: "fa-cogs",
       items: [
         { key: "ÉCRAN", value: "LCD avec affichage EY2" },
         { key: "VITESSE RÉGLABLE", value: "3 niveaux" },
         { key: "FEUX LED", value: "Avant + Stop arrière" },
         { key: "SIGNALISATION", value: "Clignotants gauche/droite" },
         { key: "KLAXON", value: "Oui" },
         { key: "PLIABLE", value: "Oui" }
       ]
     },
     {
       title: "BÉNÉFICES EN PLUS",
       icon: "fa-gift",
       items: [
         { key: "CADEAU", value: "Sac offert 🎁" }
       ]
     }
   ],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1001871115150219%2F&show_text=false&width=267&t=0"
  },
  {
   id: "voiture_range_rover_police",
   title: "Voiture Range Rover police",
   brand: "Range Rover police",
   category: "سيارات كهربائية",
   availability: "متوفر في المخزون",
   ratings: 4.5,
   reviewCount: 192,
   currentPrice: 1820,
   oldPrice: 2350,
   discount: 30,
   images: [
     "voiture_range_rover_police/voiture_range_rover_police-01.webp",
     "voiture_range_rover_police/voiture_range_rover_police-02.webp",
     "voiture_range_rover_police/voiture_range_rover_police-03.webp",
     "voiture_range_rover_police/voiture_range_rover_police-04.webp",
     "voiture_range_rover_police/voiture_range_rover_police-05.webp",
     "voiture_range_rover_police/voiture_range_rover_police-06.webp",
     "voiture_range_rover_police/voiture_range_rover_police-07.webp"
   ],
   features: [
  {
    title: "MOTEUR ET VITESSE",
    icon: "fa-tachometer-alt",
    items: [
      { key: "MARQUE", value: "Range Rover Police" },
      { key: "MOTEUR", value: "5 moteurs puissants" },
      { key: "VITESSE", value: "3 vitesses" }
    ]
  },
  {
    title: "BATTERIE ET UTILISATION",
    icon: "fa-battery-full",
    items: [
      { key: "BATTERIE", value: "12V rechargeable" },
      { key: "AUTONOMIE", value: "Jusqu'à 1-2 heures de jeu" },
      { key: "CHARGE MAX", value: "Adaptée pour enfants (jusqu'à 30 kg)" }
    ]
  },
  {
    title: "SÉCURITÉ POUR ENFANTS",
    icon: "fa-shield-alt",
    items: [
      { key: "CEINTURE DE SÉCURITÉ", value: "Incluse pour une conduite sûre" },
      { key: "ROUES", value: "Antidérapantes et durables" },
      { key: "PROTECTION", value: "Résistante aux éclaboussures" }
    ]
  },
  {
    title: "FONCTIONNALITÉS MULTIMÉDIA",
    icon: "fa-cogs",
    items: [
      { key: "MUSIQUE", value: "Bluetooth, USB et câble auxiliaire" },
      { key: "FEUX LED", value: "Avant et arrière pour un style unique" },
      { key: "KLAXON", value: "Son de police réaliste inclus" },
      { key: "BALANÇOIRE", value: "Effet de balançoire amusant" }
    ]
  },
  {
    title: "ACCESSOIRES INCLUS",
    icon: "fa-gift",
    items: [
      { key: "TÉLÉCOMMANDE", value: "Contrôle parental manuel inclus 🎁" }
       ]
     }
   ],
   warranty: "Garantie 3 mois",
   videoURL: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjouetmaroc2%2Fvideos%2F1369894724022601%2F&show_text=false&width=267&t=0"
 }
  
]; // إزالة أي فواصل زائدة في نهاية المصفوفة


// تعيين المتغير global للصفحة
window.products = productsData;








