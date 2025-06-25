"use strict";

// ======================================================
// FICHIER D'ENTRÉE PRINCIPAL (CHEF D'ORCHESTRE)
// ======================================================
/*
    Ce script ne contient aucune logique métier.
    Il importe les fonctions d'initialisation de chaque module
    et les exécute une fois que la page est chargée.
*/

// Importation des initialiseurs de chaque module
import { initOverlay } from './modules/overlay.js';
import { initAuth } from './modules/auth.js';
import { initTour } from './modules/tour.js';
import { initCalendar } from './modules/calendar.js';
import { initBooking } from './modules/booking.js';

// Attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    
    // Lance chaque module
    initOverlay();
    initAuth();
    initTour();
    initCalendar();
    initBooking();

    console.log("Application modulaire initialisée avec succès.");

});