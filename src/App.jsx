import React, { useState, useRef, useEffect } from "react";

// --- Données du Livre ---
// MODIFICATION : Ajout de la clé "type" ('narrative' ou 'dialogue')
const storyPages = [
  {
    id: 0,
    title: "Couverture",
    imageUrl: "/images/Couv.png",
    bubbles: [],
    originalText: "LE Pêcheur ET SA FEMME\nUn conte des Frères Grimm.",
    ambiance: "bg-sky-100 text-gray-900",
  },
  {
    id: 1,
    title: "Page 1",
    imageUrl: "/images/Page 1.png",
    bubbles: [
      {
        id: 1,
        text: "Il y avait une fois un pêcheur et sa femme, qui habitaient ensemble une cahute au bord de la mer.",
        position: "top-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "Il y avait une fois un pêcheur et sa femme, qui habitaient ensemble une cahute au bord de la mer, le pêcheur allait tous les jours jeter son hameçon, et il le jetait et le jetait encore.",
    ambiance: "bg-sky-100 text-gray-900",
  },
  {
    id: 2,
    title: "Page 2",
    imageUrl: "/images/Page 2.png",
    bubbles: [
      {
        id: 1,
        text: "Tout à coup il vit l’hameçon plonger... et quand il le retira, il tenait au bout une grosse barbue.",
        position: "bottom-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "Un jour il était assis près de sa ligne, sur le rivage, le regard tourné du côté de l’eau limpide, et il restait assis, toujours assis ; tout à coup il vit l’hameçon plonger et descendre profondément, et quand il le retira, il tenait au bout une grosse barbue.",
    ambiance: "bg-sky-100 text-gray-900",
  },
  {
    id: 3,
    title: "Page 3",
    imageUrl: "/images/Page 3.png",
    bubbles: [
      {
        id: 2,
        text: "« Je te prie de me laisser vivre ; je ne suis pas une vraie barbue, je suis un prince enchanté. »",
        position: "bottom-50 right-10 max-w-md",
        textClass: "italic", // Ajout d'italique pour la parole
        type: "dialogue", // Type dialogue
      },
    ],
    originalText:
      "La barbue lui dit : « Je te prie de me laisser vivre ; je ne suis pas une vraie barbue, je suis un prince enchanté. A quoi te servirait de me faire mourir ? Je ne serais pas pour toi un grand régal ; rejette-moi dans l’eau et laisse-moi nager. »",
    ambiance: "bg-sky-200 text-gray-900",
  },
  {
    id: 4,
    title: "Page 4",
    imageUrl: "/images/Page 4.png",
    bubbles: [
      {
        id: 1,
        text: "Il la rejeta dans l’eau... en laissant après elle une longue traînée de sang.",
        position: "bottom-10 right-10 max-w-lg",
        type: "narrative",
      },
      {
        id: 2,
        text: "« Vraiment, tu n’as pas besoin d’en dire si long. »",
        position: "top-50 left-10 max-w-lg",
        textClass: "italic",
        type: "dialogue",
      },
    ],
    originalText:
      "« Vraiment, dit l’homme, tu n’as pas besoin d’en dire si long, je ne demande pas mieux que de laisser nager à son aise une barbue qui sait parler. » Il la rejeta dans l’eau, et la barbue s’y replongea jusqu’au fond, en laissant après elle une longue traînée de sang.",
    ambiance: "bg-sky-100 text-gray-900",
  },
  {
    id: 5,
    title: "Page 5",
    imageUrl: "/images/Page 5.png",
    bubbles: [
      {
        id: 1,
        text: "« Ah ! dit la femme, c’est triste d’habiter cette cahute... tu aurais pu demander une petite chaumière. »",
        position: "top-10 left-10 max-w-lg",
        textClass: "italic",
        type: "dialogue", // Type dialogue
      },
    ],
    originalText:
      "L’homme alla retrouver sa femme dans la cahute. « Mon homme, lui dit-elle, n’as-tu rien pris aujourd’hui ? \n— Non, dit l’homme, j’ai pris une barbue qui m’a dit qu’elle était un prince enchanté, et je l’ai laissée nager comme auparavant.\n— N’as-tu rien demandé pour toi ? dit la femme.\n— Non, dit l’homme ; et qu’aurais-je demandé ?\n— Ah ! dit la femme, c’est pourtant triste d’habiter toujours une cahute sale et infecte comme celle-ci : tu aurais pu pourtant demander pour nous une petite chaumière. Retourne et appelle la barbue : dis-lui que nous voudrions avoir une petite chaumière ; elle fera cela certainement. »",
    ambiance: "bg-stone-700 text-gray-900",
  },
  {
    id: 6,
    title: "Page 6",
    imageUrl: "/images/Page 6.png",
    bubbles: [
      {
        id: 1,
        text: "L’homme se rendit au bord de la mer... il la vit toute jaune et toute verte...",
        position: "top-10 right-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "L’homme ne s’en souciait point ; pourtant il se rendit au bord de la mer, et quand il y fut il la vit toute jaune et toute verte ; il s’approcha de l’eau et dit :\nTarare ondin, Tarare ondin,\nPetit poisson, gentil fretin,\nMon Isabeau crie et tempête ;\nIl en faut bien faire à sa tête. ...\nLa barbue parut et lui dit : « Que veux-tu donc ? »\n« Ah ! dit l’homme, ma femme et moi nous voudrions avoir une petite chaumière. »",
    ambiance: "bg-yellow-100 text-gray-900",
  },
  {
    id: 7,
    title: "Page 7",
    imageUrl: "/images/Page 7.png",
    bubbles: [
      {
        id: 1,
        text: "L’homme s’en retourna, et à sa place était une petite chaumière...",
        position: "bottom-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "« Retourne sur tes pas, dit la barbue, elle l’a déjà. »\nL’homme s’en retourna, et sa femme n’était plus dans sa cahute ; mais à sa place était une petite chaumière, et sa femme était assise à la porte sur un banc. Elle le prit par la main et lui dit : « Entre donc et regarde ; cela vaut pourtant bien mieux »\n... Derrière étaient une petite cour avec des poules et des canards, et un petit jardin avec des légumes et des fruits. « Vois, dit la femme, n’est-ce pas joli ?\n— Oui, dit l’homme, restons comme cela, nous allons vivre vraiment heureux. »",
    ambiance: "bg-lime-50 text-gray-900",
  },
  {
    id: 8,
    title: "Page 8",
    imageUrl: "/images/Page 8.png",
    bubbles: [
      {
        id: 1,
        text: "« J’aimerais à habiter un grand château en pierre. va trouver la barbue, il faut qu’elle nous donne un château. »",
        position: "bottom-10 right-10 max-w-lg",
        textClass: "italic",
        type: "dialogue",
      },
    ],
    originalText:
      "Cela alla bien ainsi pendant huit ou quinze jours, puis la femme dit : « Écoute, mon homme, cette chaumière est aussi trop étroite... J’aimerais à habiter un grand château en pierre : va trouver la barbue, il faut qu’elle nous donne un château. »\n... L’homme sentait cette démarche lui peser sur le cœur... « Cela n’est pas bien. » Pourtant il obéit.",
    ambiance: "bg-lime-50 text-gray-900",
  },
  {
    id: 9,
    title: "Page 9",
    imageUrl: "/images/Page 9.png",
    bubbles: [
      {
        id: 1,
        text: "L’eau était violette et d’un bleu sombre, grisâtre et prête à se soulever.",
        position: "bottom-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "Quand il arriva près de la mer, l’eau était violette et d’un bleu sombre, grisâtre et prête à se soulever ; elle n’était plus verte et jaune comme auparavant ; pourtant elle n’était point agitée. Le pêcheur s’approcha et dit :\nTarare ondin, Tarare ondin, Petit poisson, gentil fretin,Mon Isabeau crie et tempête, Il en faut bien faire à sa tête.\n La barbue parut et lui dit : « Que veux-tu donc ? »\n« Ah ! dit l’homme, ma femme et moi nous voudrions habiter un grand château en pierre. »\n«Va, dit la barbue, tu la trouveras sur la porte. »",
    ambiance: "bg-blue-950 text-gray-900",
  },
  {
    id: 10,
    title: "Page 10",
    imageUrl: "/images/Page 10.png",
    bubbles: [
      {
        id: 1,
        text: "Comme il approchait, il vit un grand château de pierre...",
        position: "bottom-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "L’homme s’en alla... il vit un grand château de pierre, et sa femme se tenait au haut du perron... dans le château était un vestibule immense... des lustres en cristal étaient suspendus aux plafonds... des mets et des vins recherchés chargeaient les tables...\n« Eh bien ! dit la femme, cela n’est-il pas beau ?\n— Ah ! oui, dit l’homme, tenons-nous-en là... et nous vivrons contents. »",
    ambiance: "bg-gray-700 text-gray-900",
  },
  {
    id: 11,
    title: "Page 11",
    imageUrl: "/images/Page 11.png",
    bubbles: [
      {
        id: 1,
        text: "« Ne pourrions-nous pas devenir rois de tout ce pays ? Va trouver la barbue, nous serons rois. »",
        position: "top-10 right-10 max-w-lg",
        textClass: "italic",
        type: "dialogue",
      },
    ],
    originalText:
      "Le lendemain la femme s’éveilla... et de son lit elle vit la belle campagne... Elle le poussa du coude et dit : « Mon homme, lève-toi et regarde par la fenêtre ; vois, ne pourrions-nous pas devenir rois de tout ce pays ? Va trouver la barbue, nous serons rois. »",
    ambiance: "bg-gray-200 text-gray-900",
  },
  {
    id: 12,
    title: "Page 12",
    imageUrl: "/images/Page 12.png",
    bubbles: [
      {
        id: 1,
        text: "Quand il approcha de la mer, elle était d’un gris sombre, l’eau bouillonnait...",
        position: "bottom-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "L’homme y alla, mais il était tout consterné... Quand il approcha de la mer, elle était d’un gris sombre, l’eau bouillonnait du fond à la surface et répandait une odeur fétide. Il s’avança et dit :\nTarare ondin, Tarare ondin...\nLa barbue parut et lui dit : « Que veux-tu donc ? »\n« Ah ! dit l’homme, ma femme veut devenir reine. »\n« Va, dit la barbue, elle l'est déjà. »",
    ambiance: "bg-stone-500 text-white",
  },
  {
    id: 13,
    title: "Page 13",
    imageUrl: "/images/Page 13.png",
    bubbles: [
      {
        id: 1,
        text: "Sa femme était assise sur un trône élevé, tout d’or et de diamant...",
        position: "top-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "L’homme partit et, quand il approcha du palais, il vit que le château s’était de beaucoup agrandi... sa femme était assise sur un trône élevé, tout d’or et de diamant ; elle portait sur la tête une grande couronne d’or... Il s’avança et dit : « Ah ! femme, te voilà donc reine ! »",
    ambiance: "bg-yellow-100 text-gray-900",
  },
  {
    id: 14,
    title: "Page 14",
    imageUrl: "/images/Page 14.png",
    bubbles: [
      {
        id: 1,
        text: "« Je suis reine, il faut maintenant que je devienne impératrice. »",
        position: "top-10 left-30 max-w-lg",
        textClass: "italic",
        type: "dialogue",
      },
    ],
    originalText:
      "« ... Maintenant nous n’avons plus rien à désirer.\n— Point du tout, mon homme, dit-elle tout agitée ; le temps me dure fort de tout ceci, je n’y puis plus tenir. Va trouver la barbue ; je suis reine, il faut maintenant que je devienne impératrice. »",
    ambiance: "bg-orange-100 text-gray-900",
  },
  {
    id: 15,
    title: "Page 15",
    imageUrl: "/images/Page 15.png",
    bubbles: [
      {
        id: 1,
        text: "L’eau était noire et bouillonnante ; l’écume montait à la surface...",
        position: "bottom-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "Il fallut qu’il marchât... il vit que l’eau était noire et bouillonnante ; l’écume montait à la surface, et le vent la soulevait en soufflant avec violence : il se sentit frissonner. Il s’approcha et dit :\nTarare ondin, Tarare ondin...",
    ambiance: "bg-gray-700 text-white",
  },
  {
    id: 16,
    title: "Page 16",
    imageUrl: "/images/Page 16.png",
    bubbles: [
      {
        id: 1,
        text: "Il vit sa femme assise sur un trône... haut de mille pieds...",
        position: "top-10 left-10 max-w-lg",
        type: "narrative",
      },
      {
        id: 2,
        text: "« Femme, te voilà donc impératrice ! »",
        position: "bottom-40 left-10 max-w-lg",
        textClass: "italic",
        type: "dialogue",
      },
      {
        id: 3,
        text: "« Je suis impératrice, je veux maintenant être pape. »",
        position: "top-40 right-10 max-w-3xs",
        textClass: "italic",
        type: "dialogue",
      },
    ],
    originalText:
      "L’homme revint sur ses pas... tout le château était d’un marbre poli... il vit sa femme assise sur un trône qui était d’un or d’une seule pièce, et haut de mille pieds ; elle portait une énorme couronne d’or de trois coudées... « Femme, te voilà donc impératrice ! »\n « Mon homme, dit-elle, que fais-tu là planté ? Je suis impératrice, je veux maintenant être pape ; va trouver la barbue... Marche, je suis impératrice, et tu es mon homme ; vite, mets-toi en chemin. »",
    ambiance: "bg-slate-400 text-gray-900",
  },
  {
    id: 17,
    title: "Page 17",
    imageUrl: "/images/Page 17.png",
    bubbles: [
      {
        id: 1,
        text: "Il vit une immense église... elle portait trois énormes couronnes d’or.",
        position: "top-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "Il revint, et quand il arriva, il vit une immense église tout entourée de palais... sa femme était revêtue d’or de la tête aux pieds ; elle était assise sur un trône beaucoup plus élevé que l’autre, et portait trois énormes couronnes d’or... « Femme, dit l’homme en la contemplant, il est donc vrai que te voilà pape ?\n— Oui, dit-elle, je suis pape. »",
    ambiance: "bg-yellow-100 text-gray-900",
  },
  {
    id: 18,
    title: "Page 18",
    imageUrl: "/images/Page 18.png",
    bubbles: [
      {
        id: 1,
        text: "« Je veux devenir pareille au bon Dieu. »",
        position: "top-50 left-10 max-w-lg",
        textClass: "italic",
        type: "dialogue",
      },
    ],
    originalText:
      "L’ambition l’empêchait de dormir... « Mon homme, dit-elle en le poussant du coude, réveille-toi, va trouver la barbue : je veut devenir, pareille au bon Dieu. » ... Alors elle se mit en fureur... « Je n’y tiens plus, je n’y puis plus tenir ! Veux-tu marcher à l’instant même ? »",
    ambiance: "bg-yellow-50 text-gray-900",
  },
  {
    id: 19,
    title: "Page 19",
    imageUrl: "/images/Page 19.png",
    bubbles: [
      {
        id: 1,
        text: "La tempête était déchaînée... la mer soulevait des vagues noires, aussi hautes que des clochers...",
        position: "bottom-10 right-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "Mais la tempête était déchaînée... le ciel était noir comme de la poix ; il tonnait, il éclairait, et la mer soulevait des vagues noires, aussi hautes que des clochers et des montagnes, et à leur sommet elles portaient toutes une couronne blanche d’écume. Il se mit à crier :\nTarare ondin, Tarare ondin...",
    ambiance: "bg-zinc-900 text-white",
  },
  {
    id: 20,
    title: "Page 20",
    imageUrl: "/images/Page 20.png",
    bubbles: [
      {
        id: 1,
        text: "Et ils y logent encore aujourd’hui à l’heure qu’il est.",
        position: "top-10 left-10 max-w-lg",
        type: "narrative",
      },
    ],
    originalText:
      "« Et que veut-elle donc ? dit la barbue.\n— Ah ! dit-il, elle veut devenir pareille au bon Dieu.\n— Retourne, tu la trouveras logée dans la cahute. »\nEt ils y logent encore aujourd’hui à l’heure qu’il est.",
    ambiance: "bg-sky-100 text-gray-900",
  },
  // Ajout des pages 22 à 26 (placeholders)
  {
    id: 21,
    title: "Page 21",
    imageUrl: "/images/Der.png",
    bubbles: [],
    originalText: "",
    ambiance: "bg-white text-gray-900",
  },
];
// ...existing code...

// --- Composant principal de l'application ---
export default function App() {
  // Helper to prefix public paths with Vite base (works in dev and production)
  const getPublicUrl = (path) => {
    // import.meta.env.BASE_URL is set by Vite and equals the `base` option in vite.config.js
    const base = import.meta.env.BASE_URL || "/";
    // Ensure no double-slash when base ends with '/'
    return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  };
  const [currentPage, setCurrentPage] = useState(0);
  const currentPageData = storyPages[currentPage];

  const [isNarrating, setIsNarrating] = useState(false);
  const utteranceRef = useRef(null);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, storyPages.length - 1));
    resetFeatures();
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
    resetFeatures();
  };

  const resetFeatures = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
  };

  const progressPercentage = (currentPage / (storyPages.length - 1)) * 100;

  const handleReadAloud = () => {
    if (!window.speechSynthesis) {
      console.error("Le TTS du navigateur n'est pas supporté.");
      return;
    }

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }

    const textToRead = currentPageData.originalText
      ? currentPageData.originalText.replace(/\n/g, " ")
      : "";

    if (!textToRead) {
      console.warn("Pas de texte à lire sur cette page.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "fr-FR"; // Définit la langue en français
    utteranceRef.current = utterance; // Garde une référence

    // Gère le début et la fin de la parole
    utterance.onstart = () => {
      setIsNarrating(true);
    };
    utterance.onend = () => {
      setIsNarrating(false);
      utteranceRef.current = null;
    };
    utterance.onerror = (e) => {
      console.error("Erreur de synthèse vocale:", e);
      setIsNarrating(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Stoppe la parole si le composant est démonté
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // --- Icônes ---
  const ArrowLeftIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
  const ArrowRightIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
  const SpinnerIcon = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <main
      className={`flex flex-col min-h-screen w-full transition-all duration-1000 font-['Inter',_sans-serif] ${currentPageData.ambiance}`}
    >
      {/* 1. Entête Fixe */}
      <header className="w-full fixed top-0 left-0 right-0 z-40 p-4">
        <div className="bg-white/50 backdrop-blur-md rounded-lg shadow-md p-4 max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800 flex-1">
              Le Pêcheur et sa Femme
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReadAloud}
                className={`flex items-center justify-center gap-2 px-3 py-2 text-white font-semibold rounded-lg shadow-md transition-all ${
                  isNarrating
                    ? "bg-red-600 hover:bg-red-700" // Devient un bouton "Stop"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                title={
                  isNarrating
                    ? "Arrêter la lecture"
                    : "Lire le texte à voix haute"
                }
              >
                {isNarrating ? "⏹️" : "🔊"}
                <span className="hidden md:inline">
                  {isNarrating ? "Arrêter" : "Lire"}
                </span>
              </button>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* 2. Contenu principal en 2 colonnes */}
      <div className="flex-grow w-full max-w-7xl mx-auto mt-36 md:mt-48 mb-32 px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Colonne de Gauche (Image) */}
          <div className="w-full lg:w-3/5 lg:sticky lg:top-36">
            <div className="relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden aspect-square">
              <img
                src={getPublicUrl(currentPageData.imageUrl)}
                alt={currentPageData.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/800x800/CCCCCC/FF0000?text=Image+introuvable";
                }}
              />

              {/* MODIFICATION : Logique d'affichage des bulles */}
              {currentPageData.bubbles &&
                currentPageData.bubbles.map((bubble) => {
                  // Définir les styles ici
                  const narrativeStyle =
                    "bg-white/90 backdrop-blur-md rounded-2xl shadow-xl";
                  const dialogueStyle =
                    "bg-white/90 backdrop-blur-md rounded-full shadow-xl";

                  return (
                    <div
                      key={bubble.id}
                      className={`absolute p-4 md:p-6 transition-all duration-300 ${
                        bubble.position
                      } ${
                        bubble.type === "dialogue"
                          ? dialogueStyle
                          : narrativeStyle
                      }`}
                    >
                      <p
                        className={`leading-relaxed ${
                          bubble.textClass
                            ? bubble.textClass
                            : "text-base md:text-lg text-gray-700"
                        }`}
                      >
                        {bubble.text}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Colonne de Droite (Texte Original) */}
          <div className="w-full lg:w-2/5">
            {currentPageData.id !== 0 && currentPageData.id !== 21 && (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 lg:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Texte Original
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg">
                  {currentPageData.originalText ||
                    "Pas de texte original pour cette page."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Navigation Fixe en bas */}
      <footer className="w-full fixed bottom-0 left-0 right-0 z-40 p-4">
        <div className="bg-white/50 backdrop-blur-md rounded-lg shadow-md p-4 flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon />
            <span className="hidden md:inline">Précédent</span>
          </button>
          <span className="text-sm md:text-base font-medium text-gray-700">
            Page {currentPage} / {storyPages.length - 1}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === storyPages.length - 1}
            // CORRECTION : Commentaire JSX invalide supprimé
            className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <span className="hidden md:inline">Suivant</span>
            <ArrowRightIcon />
          </button>
        </div>
      </footer>
    </main>
  );
}
