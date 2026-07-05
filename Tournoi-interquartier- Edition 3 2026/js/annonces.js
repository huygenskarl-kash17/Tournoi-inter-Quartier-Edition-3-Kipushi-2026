/* =========================================================
   PAGE ANNONCES / COMMUNIQUÉS — 100% STATIQUE
   (aucune base de données : géré directement dans le HTML)
   - Filtres par catégorie
   - Lightbox pour agrandir les photos
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

    /* ---------- FILTRES ---------- */
    const boutons = document.querySelectorAll(".filtre-btn");
    const communiques = document.querySelectorAll(".communique");

    boutons.forEach(bouton => {
        bouton.addEventListener("click", () => {
            boutons.forEach(b => b.classList.remove("actif"));
            bouton.classList.add("actif");

            const filtre = bouton.dataset.filtre;

            communiques.forEach(c => {
                const correspond = (filtre === "tous" || c.dataset.categorie === filtre);
                c.style.display = correspond ? "" : "none";
            });
        });
    });

    /* ---------- LIGHTBOX PHOTOS ---------- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    window.ouvrirLightbox = function(imgElement){
        lightbox.classList.add("actif");
        lightboxImg.src = imgElement.src;
    };

    window.fermerLightbox = function(){
        lightbox.classList.remove("actif");
        lightboxImg.src = "";
    };

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) window.fermerLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") window.fermerLightbox();
        });
    }

    /* ---------- POPUPS STATISTIQUES (buteurs / passeurs) ---------- */
    window.ouvrirModal = function(id){
        const modal = document.getElementById(id);
        if (modal) modal.classList.add("actif");
    };

    window.fermerModal = function(id){
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove("actif");
    };

    document.querySelectorAll(".modal-overlay").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("actif");
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal-overlay.actif").forEach(m => m.classList.remove("actif"));
        }
    });

    /* ---------- CARTE "HOMME DU MATCH" (3 photos, défilement auto 3s) ---------- */
    const hmSlider = document.getElementById("hm-slider");
    if (hmSlider) {
        const hmSlides = hmSlider.querySelectorAll(".hm-slide");
        const hmDots = document.querySelectorAll(".hm-dot");
        let hmIndex = 0;

        setInterval(() => {
            hmSlides[hmIndex].classList.remove("actif");
            hmDots[hmIndex].classList.remove("actif");

            hmIndex = (hmIndex + 1) % hmSlides.length;

            hmSlides[hmIndex].classList.add("actif");
            hmDots[hmIndex].classList.add("actif");
        }, 3000);
    }

});
