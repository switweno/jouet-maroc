/**
 * Script simplifié pour la page des nouveaux arrivages
 * Gère uniquement le lightbox pour l'affichage des images
 */

document.addEventListener('DOMContentLoaded', function() {
    // Éléments du lightbox
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    
    // Vérifier que les éléments existent avant de continuer
    if (!lightboxOverlay || !lightboxImage || !lightboxClose) {
        console.error("Éléments du lightbox non trouvés");
        return;
    }
    
    // Trouver toutes les images de produits
    const productImages = document.querySelectorAll('.new-product-image img');
    
    // Ajouter des écouteurs d'événements à chaque image
    productImages.forEach(function(img) {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Mettre à jour la source de l'image du lightbox
            lightboxImage.src = this.src;
            lightboxImage.alt = this.alt || "Image agrandie du produit";
            
            // Afficher le lightbox
            lightboxOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Empêcher le défilement
        });
    });
    
    // Fermer le lightbox au clic sur le bouton de fermeture
    lightboxClose.addEventListener('click', function() {
        lightboxOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Réactiver le défilement
    });
    
    // Fermer le lightbox au clic en dehors de l'image
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fermer le lightbox avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.style.display === 'flex') {
            lightboxOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // S'assurer que les liens d'achat fonctionnent correctement
    const buyButtons = document.querySelectorAll('.buy-now-btn');
    buyButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            // Empêcher la propagation pour éviter que le clic déclenche aussi le lightbox
            e.stopPropagation();
        });
    });
});
