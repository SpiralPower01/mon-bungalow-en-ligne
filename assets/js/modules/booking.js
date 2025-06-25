"use strict";
import { DOM } from '../dom-loader.js';

// Initialise la logique du bouton de réservation
export function initBooking() {
    // Vérification que les éléments nécessaires existent
    if (!DOM.bookNowBtn || !DOM.bookingConfirmationModal) return;

    // Écouteur pour afficher la modale de confirmation
    DOM.bookNowBtn.addEventListener('click', () => {
        DOM.bookingConfirmationModal.classList.add('is-visible');
    });

    // --- LOGIQUE DE FERMETURE DE LA MODALE ---

    const closeBookingModal = () => {
        DOM.bookingConfirmationModal.classList.remove('is-visible');
    };

    // 1. Fermeture via le bouton "X"
    const closeBtn = DOM.bookingConfirmationModal.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBookingModal);
    }

    // 2. Fermeture en cliquant sur le fond (CORRECTION AJOUTÉE ICI)
    DOM.bookingConfirmationModal.addEventListener('click', (event) => {
        if (event.target === DOM.bookingConfirmationModal) {
            closeBookingModal();
        }
    });
}