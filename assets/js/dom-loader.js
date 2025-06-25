// ======================================================
// SÉLECTION DES ÉLÉMENTS DU DOM
// ======================================================
// Ce module sélectionne une seule fois tous les éléments HTML
// dont l'application a besoin et les exporte.

export const DOM = {
    // Overlays & Navigation
    pageContainer: document.querySelector('.page-container'),
    navContainer: document.querySelector('.main-nav ul'),
    allNavLinks: document.querySelectorAll('.main-nav a'),
    allPages: document.querySelectorAll('.page-content'),
    backgroundVideo: document.querySelector('#backgroundVideo'),
    mainCloseButton: document.querySelector('.page-container .close-button'),
    
    // Authentification
    loginLogoutBtn: document.querySelector('#login-logout-btn'),
    loginModal: document.querySelector('#login-modal'),
    loginForm: document.querySelector('#login-form'),
    loginErrorMsg: document.querySelector('.login-error-message'),
    modalCloseBtn: document.querySelector('#login-modal .close-button'),
    protectedContent: document.querySelectorAll('.protected-content'),

    // Visite Guidée (Aperçu)
    showcaseContainer: document.querySelector('.video-showcase'),
    videoPlayer: document.querySelector('.video-showcase__player'),
    playPauseBtn: document.querySelector('.play-pause-btn'),
    descriptionShowcase: document.querySelector('.description-showcase'),
    continueBtn: document.querySelector('.continue-btn'),

    // Calendrier
    calendarContainer: document.querySelector('#doubleCalendar'),
    reservationBar: document.querySelector('.reservation-bar'),
    monthYearElement1: document.querySelector('#month-year-1'),
    datesGridElement1: document.querySelector('#dates-grid-1'),
    monthYearElement2: document.querySelector('#month-year-2'),
    datesGridElement2: document.querySelector('#dates-grid-2'),
    prevBtn: document.querySelector('#prev-month-btn'),
    nextBtn: document.querySelector('#next-month-btn'),
    arrivalDateInput: document.querySelector('#date-arrival'),
    departureDateInput: document.querySelector('#date-departure'),
    occupantsSelect: document.querySelector('#occupants'),
    nightsDisplay: document.querySelector('.price-summary__nights'),
    priceDisplay: document.querySelector('.price-summary__total')
};