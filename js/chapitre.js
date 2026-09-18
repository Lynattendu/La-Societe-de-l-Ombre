const scene = [
  {
    image: "images/Root.PNG",
    text: "Root avançait lentement dans la rue, absorbée par ses pensées."
  },
  {
    image: "images/Hope.PNG",
    text: "Quelque part ailleurs, Hope poursuivait son propre chemin, avec cette force tranquille qui la caractérisait."
  },
  {
    image: "images/Maitre-Lee.PNG",
    text: "Et dans le silence, Maître Lee observait les mouvements du monde comme s’il en connaissait déjà les failles."
  }
];

const imageScene = document.getElementById("imageScene");
const texteScene = document.getElementById("texteScene");
const suiteBtn = document.getElementById("suiteBtn");

const chapitreNumero = document.getElementById("chapitreNumero");
const chapitreTitre = document.getElementById("chapitreTitre");
const chapitreContenu = document.getElementById("chapitreContenu");

let segmentIndex = 0;
let motIndex = 0;
let mots = [];
let timer = null;
let enCours = false;

const vitesseMot = 320;

/* =========================
   INTRO VISUELLE DU CHAPITRE
   ========================= */

function lancerIntroductionChapitre() {

  imageScene.src = scene[0].image;

  // 1. Chapitre 1
  setTimeout(() => {
    chapitreNumero.classList.add("visible");
  }, 500);

  // 2. Titre
  setTimeout(() => {
    chapitreTitre.classList.add("visible");
  }, 1800);

  // 3. L'image apparaît
  setTimeout(() => {
    imageScene.classList.add("visible");
  }, 3200);

  // 4. On laisse le lecteur regarder
  setTimeout(() => {
    document
      .querySelector(".chapitre-intro")
      .classList.add("disparait");
  }, 5000);

  // 5. Le bloc titre disparaît vraiment
  setTimeout(() => {
    document
      .querySelector(".chapitre-intro")
      .style.display = "none";
  }, 6100);

  // 6. Le texte apparaît ensuite
  setTimeout(() => {
    chapitreContenu.classList.add("visible");
  }, 6300);

  // 7. Puis le texte commence à être raconté
  setTimeout(() => {
    afficherSegment();
  }, 7000);
}

/* =========================
   CHANGEMENT D’IMAGE
   ========================= */

function changerImage(src) {

  imageScene.classList.add("fade-out");

  setTimeout(() => {

    imageScene.src = src;

    imageScene.onload = () => {
      imageScene.classList.remove("fade-out");
      imageScene.classList.add("fade-in");

      setTimeout(() => {
        imageScene.classList.remove("fade-in");
      }, 700);
    };

  }, 400);
}

/* =========================
   AFFICHAGE D’UN SEGMENT
   ========================= */

function afficherSegment() {

  if (segmentIndex >= scene.length) {
    suiteBtn.classList.add("visible");
    return;
  }

  const segment = scene[segmentIndex];

  if (segmentIndex > 0) {
    changerImage(segment.image);
  }

  mots = segment.text.split(" ");
  motIndex = 0;
  texteScene.innerHTML = "";
  enCours = true;

  ecrireMot();
}

/* =========================
   ÉCRITURE MOT PAR MOT
   ========================= */

function ecrireMot() {

  if (motIndex < mots.length) {

    const mot = document.createElement("span");
    mot.textContent = mots[motIndex] + " ";
    mot.classList.add("mot");

    texteScene.appendChild(mot);

    motIndex++;

    timer = setTimeout(ecrireMot, vitesseMot);

  } else {

    enCours = false;

    setTimeout(() => {
      segmentIndex++;
      afficherSegment();
    }, 1200);

  }
}

/* =========================
   AFFICHER TOUT LE TEXTE
   SI ON TOUCHE / CLIQUE
   ========================= */

function afficherTexteComplet() {

  if (!enCours) {
    return;
  }

  clearTimeout(timer);

  texteScene.innerHTML = mots.join(" ");
  motIndex = mots.length;
  enCours = false;

  setTimeout(() => {
    segmentIndex++;
    afficherSegment();
  }, 900);
}

texteScene.addEventListener("click", afficherTexteComplet);

document.addEventListener(
  "touchstart",
  function(event) {
    if (event.target.closest(".chapitre-contenu")) {
      afficherTexteComplet();
    }
  },
  { passive: true }
);

/* =========================
   DÉMARRAGE
   ========================= */

lancerIntroductionChapitre();
