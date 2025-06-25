// ======================================================
// CONFIGURATION & DONNÉES GLOBALES
// ======================================================
// Ce fichier centralise les données et constantes de l'application.

// Identifiants pour la simulation de connexion (NON SÉCURISÉ)
export const FAKE_USER_CREDENTIALS = {
    username: 'Bungalow971',
    password: 'Password2025!'
};

// Données pour la visite guidée
export const TOUR_DATA = [
    {
        sceneId: 'terrasse',
        videoSrc: 'assets/videos/OpeningVideo.mp4',
        startTime: 0,
        pauseTime: 5,
        title: 'Terrasse Ombragée',
        description: 'Idéale pour profiter de moments de détente à l\'extérieur tout en étant protégé du soleil.',
        images: ['00.jpg']
    },
    {
        sceneId: 'cuisine',
        videoSrc: 'assets/videos/PresentationVideo.mp4',
        startTime: 5,
        pauseTime: 20,
        title: 'Cuisine Ouverte et Fonctionnelle',
        description: 'Un petit espace moderne alliant esthétique et praticité, avec de nombreux rangements astucieux.',
        images: ['01.jpg', '02.jpg']
    },
    {
        sceneId: 'chambre-principale',
        videoSrc: 'assets/videos/PresentationVideo.mp4',
        startTime: 43,
        pauseTime: 60,
        title: 'Chambre Principale Lumineuse',
        description: 'Entièrement blanche, elle est équipée d\'une climatisation pour un confort optimal ainsi que d\'une grande armoire de rangement.',
        images: ['03.jpg', '04.jpg']
    }
];

// Constantes pour le calcul du prix
export const NIGHTLY_RATE = 80;
export const EXTRA_PERSON_RATE = 15;