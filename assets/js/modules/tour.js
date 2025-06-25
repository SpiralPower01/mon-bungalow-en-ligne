// ======================================================
// MODULE : GESTION DE LA VISITE GUIDÉE (APERCU)
// ======================================================
import { DOM } from '../dom-loader.js';
import { TOUR_DATA } from '../config.js';

let currentSceneIndex = 0;

function updateDescriptionView(scene) {
    if (!DOM.descriptionShowcase) return;
    const titleEl = DOM.descriptionShowcase.querySelector('.description-showcase__title');
    const descEl = DOM.descriptionShowcase.querySelector('.description-showcase__description');
    const imageGridEl = DOM.descriptionShowcase.querySelector('.description-showcase__image-grid');

    if (!titleEl || !descEl || !imageGridEl) return;
    titleEl.textContent = scene.title;
    descEl.textContent = scene.description;
    imageGridEl.innerHTML = '';
    scene.images.forEach(imgName => {
        const img = document.createElement('img');
        img.src = `assets/images/${imgName}`;
        img.alt = scene.title;
        imageGridEl.appendChild(img);
    });
}

function loadScene(sceneIndex) {
    if (sceneIndex >= TOUR_DATA.length) {
        console.log("Fin de la visite.");
        // À faire : fermer l'overlay ou afficher un message.
        return;
    }
    const scene = TOUR_DATA[sceneIndex];
    DOM.descriptionShowcase.classList.add('is-hidden');
    
    const currentSrc = DOM.videoPlayer.src.split('/').pop();
    const newSrc = scene.videoSrc.split('/').pop();
    if (currentSrc !== newSrc) DOM.videoPlayer.src = scene.videoSrc;
    
    DOM.videoPlayer.currentTime = scene.startTime || 0;
    updateDescriptionView(scene);
}

function togglePlay() {
    if (!DOM.videoPlayer || !DOM.playPauseBtn) return;
    const icon = DOM.playPauseBtn.querySelector('i');
    if (DOM.videoPlayer.paused) {
        DOM.videoPlayer.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        DOM.showcaseContainer.classList.add('is-playing');
    } else {
        DOM.videoPlayer.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        DOM.showcaseContainer.classList.remove('is-playing');
    }
}

export function initTour() {
    if (!DOM.showcaseContainer) return;

    loadScene(currentSceneIndex);
    
    DOM.playPauseBtn.addEventListener('click', togglePlay);
    DOM.videoPlayer.addEventListener('click', togglePlay);

    DOM.videoPlayer.addEventListener('timeupdate', () => {
        if (!TOUR_DATA[currentSceneIndex]) return;
        const scene = TOUR_DATA[currentSceneIndex];
        if (DOM.videoPlayer.currentTime >= scene.pauseTime && DOM.descriptionShowcase.classList.contains('is-hidden')) {
            DOM.videoPlayer.pause();
            const icon = DOM.playPauseBtn.querySelector('i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            DOM.showcaseContainer.classList.remove('is-playing');
            DOM.descriptionShowcase.classList.remove('is-hidden');
        }
    });

    DOM.continueBtn.addEventListener('click', () => {
        currentSceneIndex++;
        loadScene(currentSceneIndex);
        setTimeout(() => {
            if(DOM.videoPlayer.paused) {
                togglePlay();
            }
        }, 100);
    });
}