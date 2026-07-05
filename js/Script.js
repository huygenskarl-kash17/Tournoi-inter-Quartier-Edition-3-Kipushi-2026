document.addEventListener("DOMContentLoaded", () => {

/* =========================================================
   SLIDER PRINCIPAL (page d'accueil)
   ========================================================= */
let slideIndex = 0;
let slideTimeout;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlides(n) {
    if (slides.length === 0) return;

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach(s => s.style.display = "none");
    dots.forEach(d => d.style.opacity = "0.5");

    slides[slideIndex].style.display = "block";
    if (dots[slideIndex]) dots[slideIndex].style.opacity = "1";

    clearTimeout(slideTimeout);
    slideTimeout = setTimeout(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 4000);
}

window.plusSlide = function(n){
    clearTimeout(slideTimeout);
    showSlides(slideIndex += n);
};

window.currentSlide = function(n){
    clearTimeout(slideTimeout);
    showSlides(slideIndex = n - 1);
};

showSlides(slideIndex);


/* =========================================================
   MENU MOBILE
   ========================================================= */
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav ul");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // ferme le menu après avoir cliqué sur un lien (mobile)
    nav.querySelectorAll("a").forEach(lien => {
        lien.addEventListener("click", () => nav.classList.remove("active"));
    });
}


/* =========================================================
   HEADER RÉTRÉCI AU SCROLL
   ========================================================= */
const header = document.querySelector("header");
if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 30);
    });
}


/* =========================================================
   ANIMATIONS AU DÉFILEMENT (reveal on scroll)
   ========================================================= */
const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
        if (entree.isIntersecting) {
            entree.target.classList.add("active");
        }
    });
}, { threshold: 0.15 });

function activerReveal(){
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
    ).forEach(el => observateur.observe(el));
}
window.activerReveal = activerReveal;
activerReveal();


/* =========================================================
   COMPTEURS ANIMÉS (statistiques page d'accueil)
   ========================================================= */
const compteurs = document.querySelectorAll(".stat-num[data-count]");

function lancerCompteur(el){
    const cible = parseInt(el.dataset.count, 10);
    const duree = 1400;
    const debut = performance.now();

    function etape(maintenant){
        const progres = Math.min((maintenant - debut) / duree, 1);
        el.textContent = Math.floor(progres * cible);
        if (progres < 1) requestAnimationFrame(etape);
        else el.textContent = cible;
    }
    requestAnimationFrame(etape);
}

if (compteurs.length) {
    const observateurCompteur = new IntersectionObserver((entrees) => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                lancerCompteur(entree.target);
                observateurCompteur.unobserve(entree.target);
            }
        });
    }, { threshold: 0.5 });

    compteurs.forEach(el => observateurCompteur.observe(el));
}

});
