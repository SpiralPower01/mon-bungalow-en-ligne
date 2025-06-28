// ======================================================
// MODULE : GESTION DE L'OVERLAY PRINCIPAL
// ======================================================
import { DOM } from "../dom-loader.js";

// Garde en mémoire quel lien est actif pour pouvoir le désactiver
let activeLink = null;

// --- Fonctions Privées du Module ---

// Fonction pour fermer l'overlay
function closeOverlay() {
  if (DOM.pageContainer) DOM.pageContainer.classList.remove("is-visible");
  if (activeLink) activeLink.classList.remove("active");
  activeLink = null;
  if (DOM.backgroundVideo && DOM.backgroundVideo.paused) {
    DOM.backgroundVideo.play();
  }
  document.body.classList.remove("apercu-is-active");
}

// Fonction pour ouvrir l'overlay
function openOverlay(clickedElement) {
  if (DOM.pageContainer) DOM.pageContainer.classList.add("is-visible");

  const targetId = clickedElement.getAttribute("href");

  // On gère la classe sur le body pour l'overlay de rotation
  if (targetId === "#apercu") {
    document.body.classList.add("apercu-is-active"); // << AJOUTEZ CETTE LIGNE
    if (DOM.backgroundVideo) DOM.backgroundVideo.pause();
  } else {
    document.body.classList.remove("apercu-is-active"); // << AJOUTEZ CETTE LIGNE
    if (DOM.backgroundVideo && DOM.backgroundVideo.paused) {
      DOM.backgroundVideo.play();
    }
  }

  DOM.allPages.forEach((page) => (page.style.display = "none"));
  const targetPage = document.querySelector(targetId);
  if (targetPage) targetPage.style.display = "block";

  DOM.allNavLinks.forEach((link) => link.classList.remove("active"));
  clickedElement.classList.add("active");
  activeLink = clickedElement;
}

// --- Fonction d'Initialisation Exportée ---

export function initOverlay() {
  if (!DOM.navContainer) return;

  // Écouteur sur la navigation principale
  DOM.navContainer.addEventListener("click", (event) => {
    const clickedElement = event.target.closest("a");
    if (!clickedElement) return;
    event.preventDefault();

    if (clickedElement === activeLink) {
      closeOverlay();
    } else {
      openOverlay(clickedElement);
    }
  });

  if (DOM.mainCloseButton)
    DOM.mainCloseButton.addEventListener("click", closeOverlay);

  if (DOM.pageContainer)
    DOM.pageContainer.addEventListener("click", (event) => {
      if (event.target === DOM.pageContainer) closeOverlay();
    });
}
