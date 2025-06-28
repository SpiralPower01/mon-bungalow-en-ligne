"use strict";

// ======================================================
// MODULE : GESTION DE LA VISITE GUIDÉE (APERCU) (v3 - Corrigé)
// ======================================================
import { DOM } from "../dom-loader.js";
import { TOUR_DATA } from "../config.js";

// --- ÉTAT INTERNE AU MODULE ---
let currentSceneIndex = 0;
const PLAYBACK_SPEEDS = [1, 1.5, 2];
let currentSpeedIndex = 0;
let controlsTimeout = null;

// --- FONCTIONS PRIVÉES DU MODULE ---

/**
 * Met à jour le contenu du panneau de description et l'état des boutons de navigation.
 * @param {number} sceneIndex - L'index de la scène à afficher.
 */
function updateDescriptionPanel(sceneIndex) {
  const scene = TOUR_DATA[sceneIndex];
  if (!DOM.descriptionShowcase || !scene) return;

  const titleEl = DOM.descriptionShowcase.querySelector(
    ".description-showcase__title"
  );
  const descEl = DOM.descriptionShowcase.querySelector(
    ".description-showcase__description"
  );
  const imageGridEl = DOM.descriptionShowcase.querySelector(
    ".description-showcase__image-grid"
  );

  if (!titleEl || !descEl || !imageGridEl) return;

  // Mise à jour des textes et images
  titleEl.textContent = scene.title;
  descEl.textContent = scene.description;
  imageGridEl.innerHTML = "";
  scene.images.forEach((imgName) => {
    const img = document.createElement("img");
    img.src = `assets/images/${imgName}`;
    img.alt = scene.title;
    imageGridEl.appendChild(img);
  });

  // Mise à jour de l'état des boutons
  if (sceneIndex === TOUR_DATA.length - 1) {
    DOM.continueBtn.innerHTML =
      'Recommencer la visite <i class="fas fa-redo"></i>';
  } else {
    DOM.continueBtn.innerHTML =
      'Continuer la visite <i class="fas fa-arrow-right"></i>';
  }
  DOM.prevSceneBtn.style.display = sceneIndex === 0 ? "none" : "inline-flex";
  DOM.nextSceneBtn.style.display =
    sceneIndex === TOUR_DATA.length - 1 ? "none" : "inline-flex";
}

/**
 * Charge les données vidéo (source, temps) pour une scène spécifique dans le lecteur.
 * @param {number} sceneIndex - L'index de la scène.
 */
function loadVideoForScene(sceneIndex) {
  const scene = TOUR_DATA[sceneIndex];
  if (!scene) return;

  const currentSrc = DOM.videoPlayer.src.split("/").pop();
  const newSrc = scene.videoSrc.split("/").pop();

  if (currentSrc !== newSrc) {
    DOM.videoPlayer.src = scene.videoSrc;
  }
  DOM.videoPlayer.currentTime = scene.startTime || 0;
  DOM.videoPlayer.playbackRate = PLAYBACK_SPEEDS[currentSpeedIndex];
}

/**
 * Met en pause la lecture vidéo et affiche le panneau de description.
 */
function showCurrentDescription() {
  if (DOM.videoPlayer.paused) return;

  DOM.videoPlayer.pause();
  const icon = DOM.playPauseBtn.querySelector("i");
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
  DOM.showcaseContainer.classList.remove("is-playing");
  DOM.descriptionShowcase.classList.remove("is-hidden");
  DOM.showcaseContainer.classList.add("show-controls");
  clearTimeout(controlsTimeout);
}

/**
 * Gère la lecture/pause de la vidéo et l'affichage des contrôles.
 */
function togglePlay() {
  // ... (cette fonction ne change pas)
  if (!DOM.videoPlayer || !DOM.playPauseBtn) return;
  const icon = DOM.playPauseBtn.querySelector("i");
  if (DOM.videoPlayer.paused) {
    DOM.videoPlayer.play();
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    DOM.showcaseContainer.classList.add("is-playing");
    startControlsTimeout();
  } else {
    DOM.videoPlayer.pause();
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    DOM.showcaseContainer.classList.remove("is-playing");
    DOM.showcaseContainer.classList.add("show-controls");
    clearTimeout(controlsTimeout);
  }
}

/**
 * Affiche les contrôles et lance un minuteur pour les cacher.
 */
function startControlsTimeout() {
  // ... (cette fonction ne change pas)
  DOM.showcaseContainer.classList.add("show-controls");
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(() => {
    DOM.showcaseContainer.classList.remove("show-controls");
  }, 3000);
}

// --- FONCTION D'INITIALISATION EXPORTÉE ---

export function initTour() {
  if (!DOM.showcaseContainer) return;

  const preloader = document.createElement("video");
  preloader.src = TOUR_DATA[1].videoSrc;
  preloader.load();

  DOM.showcaseContainer.classList.add("show-controls");

  // Configuration initiale
  loadVideoForScene(currentSceneIndex);
  updateDescriptionPanel(currentSceneIndex);

  // --- ÉCOUTEURS D'ÉVÉNEMENTS ---

  DOM.playPauseBtn.addEventListener("click", togglePlay);
  DOM.videoPlayer.addEventListener("click", togglePlay);
  DOM.showcaseContainer.addEventListener("mousemove", () => {
    if (DOM.showcaseContainer.classList.contains("is-playing")) {
      startControlsTimeout();
    }
  });

  DOM.videoPlayer.addEventListener("timeupdate", () => {
    if (!TOUR_DATA[currentSceneIndex]) return;
    const scene = TOUR_DATA[currentSceneIndex];
    if (
      DOM.videoPlayer.currentTime >= scene.pauseTime &&
      DOM.descriptionShowcase.classList.contains("is-hidden")
    ) {
      showCurrentDescription();
    }
  });

  DOM.continueBtn.addEventListener("click", () => {
    DOM.descriptionShowcase.classList.add("is-hidden");
    setTimeout(() => {
      if (currentSceneIndex >= TOUR_DATA.length - 1) {
        currentSceneIndex = 0;
      } else {
        currentSceneIndex++;
      }
      loadVideoForScene(currentSceneIndex);
      updateDescriptionPanel(currentSceneIndex);
      togglePlay();
    }, 500);
  });

  DOM.toggleSpeedBtn.addEventListener("click", () => {
    currentSpeedIndex = (currentSpeedIndex + 1) % PLAYBACK_SPEEDS.length;
    const newSpeed = PLAYBACK_SPEEDS[currentSpeedIndex];
    DOM.videoPlayer.playbackRate = newSpeed;
    DOM.toggleSpeedBtn.querySelector("span").textContent = `x${newSpeed}`;
  });

  DOM.skipVideoBtn.addEventListener("click", () => {
    showCurrentDescription();
  });

  // LOGIQUE CORRIGÉE POUR LA NAVIGATION DANS LES DESCRIPTIONS
  DOM.nextSceneBtn.addEventListener("click", () => {
    if (currentSceneIndex < TOUR_DATA.length - 1) {
      currentSceneIndex++;
      updateDescriptionPanel(currentSceneIndex); // Met à jour uniquement la description
    }
  });

  DOM.prevSceneBtn.addEventListener("click", () => {
    if (currentSceneIndex > 0) {
      currentSceneIndex--;
      updateDescriptionPanel(currentSceneIndex); // Met à jour uniquement la description
    }
  });
}
