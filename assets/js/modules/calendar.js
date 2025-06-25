"use strict";

import { DOM } from '../dom-loader.js';
import { NIGHTLY_RATE, EXTRA_PERSON_RATE } from '../config.js';

// --- ÉTAT INTERNE AU MODULE ---
let displayDate = new Date();
let startDate = null;
let endDate = null;

// --- FONCTIONS PRIVÉES DU MODULE ---

function calculateAndDisplayPrice() {
    if (!DOM.bookNowBtn) return; // Sécurité

    if (startDate && endDate) {
        const diffTime = endDate.getTime() - startDate.getTime();
        const numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (numberOfNights > 0) {
            const numberOfOccupants = parseInt(DOM.occupantsSelect.value, 10);
            let currentNightlyRate = NIGHTLY_RATE;
            if (numberOfOccupants > 2) {
                currentNightlyRate += (numberOfOccupants - 2) * EXTRA_PERSON_RATE;
            }
            const totalPrice = numberOfNights * currentNightlyRate;
            DOM.nightsDisplay.textContent = `${numberOfNights} nuit${numberOfNights > 1 ? 's' : ''}`;
            DOM.priceDisplay.textContent = `${totalPrice} €`;
            DOM.bookNowBtn.disabled = false; // Active le bouton
        } else {
            DOM.nightsDisplay.textContent = '-- nuits';
            DOM.priceDisplay.textContent = '-- €';
            DOM.bookNowBtn.disabled = true; // Laisse le bouton désactivé
        }
    } else {
        DOM.nightsDisplay.textContent = '-- nuits';
        DOM.priceDisplay.textContent = '-- €';
        DOM.bookNowBtn.disabled = true; // Laisse le bouton désactivé
    }
}

function updateSelection() {
    document.querySelectorAll('.date-cell').forEach(cell => {
        cell.classList.remove('selected', 'range-start', 'range-end', 'in-range');
        const cellDateStr = cell.dataset.date;
        if (!cellDateStr) return;
        const cellDate = new Date(cellDateStr.replace(/-/g, '/'));
        if (startDate && cellDate.getTime() === startDate.getTime()) cell.classList.add('selected', 'range-start');
        if (endDate && cellDate.getTime() === endDate.getTime()) cell.classList.add('selected', 'range-end');
        if (startDate && endDate && cellDate > startDate && cellDate < endDate) cell.classList.add('in-range');
    });
}

function generateMonthGrid(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();
    let datesHTML = "";
    let startDayIndex = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = startDayIndex; i > 0; i--) {
        datesHTML += `<div class="date-cell inactive">${lastDateOfLastMonth - i + 1}</div>`;
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let loopDate = new Date(year, month, i);
        let isToday = loopDate.getTime() === today.getTime() ? 'today' : '';
        let isPast = loopDate < today ? 'inactive' : '';
        datesHTML += `<div class="date-cell ${isToday} ${isPast}" data-date="${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}">${i}</div>`;
    }
    return datesHTML;
}

function renderCalendars() {
    DOM.monthYearElement1.textContent = displayDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    DOM.datesGridElement1.innerHTML = generateMonthGrid(displayDate);
    let nextMonthDate = new Date(displayDate);
    nextMonthDate.setMonth(displayDate.getMonth() + 1);
    DOM.monthYearElement2.textContent = nextMonthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    DOM.datesGridElement2.innerHTML = generateMonthGrid(nextMonthDate);
    updateSelection();
}

function handleDateClick(event) {
    const clickedCell = event.target.closest('.date-cell');
    if (!clickedCell || clickedCell.classList.contains('inactive')) return;
    const clickedDate = new Date(clickedCell.dataset.date.replace(/-/g, '/'));
    if (!startDate || (startDate && endDate)) {
        startDate = clickedDate;
        endDate = null;
    } else if (clickedDate > startDate) {
        endDate = clickedDate;
    } else {
        startDate = clickedDate;
    }
    DOM.arrivalDateInput.value = startDate ? startDate.toLocaleDateString('fr-FR') : '--/--/----';
    DOM.departureDateInput.value = endDate ? endDate.toLocaleDateString('fr-FR') : '--/--/----';
    updateSelection();
    calculateAndDisplayPrice();
}


// --- FONCTION D'INITIALISATION EXPORTÉE ---

export function initCalendar() {
    if (!DOM.calendarContainer) return;

    // *** CODE MANQUANT AJOUTÉ ICI ***
    // Écouteur pour afficher/cacher le calendrier au clic sur la barre
    DOM.reservationBar.addEventListener('click', (event) => {
        // On vérifie qu'on clique bien sur un groupe (Arrivée, Départ...)
        // et non sur le bouton Réserver qui est maintenant à l'extérieur.
        if (event.target.closest('.reservation-bar__group')) {
            DOM.calendarContainer.classList.toggle('is-visible');
        }
    });
    // *** FIN DU CODE MANQUANT ***

    // Écouteurs pour la sélection de date
    DOM.datesGridElement1.addEventListener('click', handleDateClick);
    DOM.datesGridElement2.addEventListener('click', handleDateClick);

    // Écouteurs pour la navigation entre les mois
    DOM.prevBtn.addEventListener('click', () => {
        displayDate.setMonth(displayDate.getMonth() - 1);
        renderCalendars();
    });
    DOM.nextBtn.addEventListener('click', () => {
        displayDate.setMonth(displayDate.getMonth() + 1);
        renderCalendars();
    });

    // Écouteur pour le changement d'occupants
    DOM.occupantsSelect.addEventListener('change', calculateAndDisplayPrice);
    
    // Affiche le calendrier une première fois au chargement (il est caché par le CSS)
    renderCalendars();
}