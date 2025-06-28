// ======================================================
// CONFIGURATION & DONNÉES GLOBALES
// ======================================================
// Ce fichier centralise les données et constantes de l'application.

// Identifiants pour la simulation de connexion (NON SÉCURISÉ)
export const FAKE_USER_CREDENTIALS = {
  username: "Bungalow971",
  password: "Password2025!",
};

// Données pour la visite guidée interactive
export const TOUR_DATA = [
  {
    sceneId: "terrasse",
    videoSrc: "assets/videos/OpeningVideo.mp4",
    startTime: 0,
    pauseTime: 9,
    title: "Terrasse Ombragée",
    description:
      "Idéale pour profiter de moments de détente à l'extérieur tout en étant protégé du soleil.",
    detailedDescription:
      "Idéale pour profiter de moments de détente à l'extérieur tout en étant protégé du soleil. Son orientation vous permet de prendre vos repas à l'abri des regards et de la chaleur, tout en profitant de la douceur du climat.",
    images: ["00.jpg"],
  },
  {
    sceneId: "cuisine",
    videoSrc: "assets/videos/PresentationVideo.mp4",
    startTime: 5,
    pauseTime: 22,
    title: "Cuisine Ouverte et Fonctionnelle",
    description:
      "Un petit espace moderne alliant esthétique et praticité, avec de nombreux rangements.",
    detailedDescription:
      "Un petit espace moderne alliant esthétique et praticité, décoré dans des tons bois chaleureux avec une dominante de blanc et de marron. De nombreux rangements astucieux facilitent l'organisation, et cette cuisine s'intègre harmonieusement au reste des pièces, offrant une belle continuité visuelle.",
    images: ["01.jpg", "02.jpg"],
  },
  {
    sceneId: "salle-de-bain",
    videoSrc: "assets/videos/PresentationVideo.mp4",
    startTime: 43,
    pauseTime: 67,
    title: "Salle de Bain Moderne",
    description:
      "Douche à l'italienne, toilettes, et de multiples espaces de rangement.",
    detailedDescription:
      "Douche à l'italienne moderne, toilettes intégrées, et de multiples espaces dédiés au rangement, dont un placard et un porte-serviettes pratique. Les matériaux choisis sont à la fois esthétiques et faciles d'entretien.",
    images: ["07.jpg", "08.jpg", "09.jpg"],
  },
  {
    sceneId: "chambre-principale",
    videoSrc: "assets/videos/PresentationVideo.mp4",
    startTime: 75,
    pauseTime: 98,
    title: "Chambre Principale Lumineuse",
    description:
      "Entièrement blanche, climatisée pour un confort optimal et équipée d'une grande armoire.",
    detailedDescription:
      "Entièrement blanche, elle est équipée d'une climatisation pour un confort optimal ainsi que d'une grande armoire de rangement. La literie de qualité vous assurera des nuits reposantes.",
    images: ["03.jpg", "04.jpg"],
  },
  {
    sceneId: "seconde-chambre",
    videoSrc: "assets/videos/PresentationVideo.mp4",
    startTime: 126,
    pauseTime: 155,
    title: "Seconde Chambre Polyvalente",
    description:
      "Aménagée avec un lit simple et des rangements, parfaite pour un enfant ou comme bureau.",
    detailedDescription:
      "Aménagée avec un lit simple et encore plus de rangements, parfaite pour un enfant, un invité ou pour une utilisation comme bureau. Sa flexibilité est un atout majeur pour s'adapter à vos besoins.",
    images: ["05.jpg", "06.jpg"],
  },
];

// Constantes pour le calcul du prix
export const NIGHTLY_RATE = 80;
export const EXTRA_PERSON_RATE = 15;
