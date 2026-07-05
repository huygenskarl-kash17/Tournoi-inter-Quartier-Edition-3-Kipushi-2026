/* =========================================================
   FILTRE DES EQUIPES PAR GROUPE
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const boutons = document.querySelectorAll(".filtre-btn");
    const cartes = document.querySelectorAll(".equipe-card");

    boutons.forEach(bouton => {
        bouton.addEventListener("click", () => {
            boutons.forEach(b => b.classList.remove("actif"));
            bouton.classList.add("actif");

            const filtre = bouton.dataset.filtre;

            cartes.forEach(c => {
                const correspond = (filtre === "tous" || c.dataset.groupe === filtre);
                c.style.display = correspond ? "" : "none";
            });
        });
    });
});
