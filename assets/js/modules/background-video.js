"use strict";

// ======================================================
// MODULE : GESTION DE LA VIDÉO D'ARRIÈRE-PLAN (v3)
// ======================================================
import { DOM } from "../dom-loader.js";

/**
 * Lance la lecture de la vidéo principale au bon moment.
 */
function startMainVideo() {
  if (!DOM.mainVideo) return;

  DOM.mainVideo.currentTime = 5; // On démarre à 5 secondes !
  DOM.mainVideo.play();
}

/**
 * Gère la transition VISUELLE une fois que la vidéo principale est en cours de lecture.
 */
function performFadeTransition() {
  if (!DOM.openingVideo || !DOM.mainVideo) return;

  // On lance la transition en fondu
  DOM.mainVideo.style.opacity = 1;
  DOM.openingVideo.style.opacity = 0;
}

/**
 * Initialise les écouteurs d'événements pour la vidéo de fond.
 */
export function initBackgroundVideo() {
  if (!DOM.openingVideo || !DOM.mainVideo) return;

  // On écoute la fin de la vidéo d'introduction pour LANCER la vidéo principale
  DOM.openingVideo.addEventListener("ended", startMainVideo);

  // On écoute l'événement 'playing' sur la vidéo principale pour DÉCLENCHER LE FONDU
  // { once: true } assure que cet écouteur ne se déclenchera qu'une seule fois.
  DOM.mainVideo.addEventListener("playing", performFadeTransition, {
    once: true,
  });
}
