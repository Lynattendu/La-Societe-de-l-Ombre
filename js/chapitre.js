const scene = [
  {
    image: "images/Root.PNG",
    text: "Root avançait lentement dans la rue, absorbée par ses pensées."
  },
  {
    image: "images/HOPE.PNG",
    text: "Quelques minutes plus tard, elle pénétra dans le musée. Quelque chose attirait son attention."
  },
  {
    image: "images/Maitre-Lee.PNG",
    text: "Devant elle, un objet ancien semblait presque l'attendre. Son instinct lui disait que rien n'était normal."
  }
];

const imageScene = document.getElementById("imageScene");
const texteScene = document.getElementById("texteScene");
const suiteBtn = document.getElementById("suiteBtn");

let segmentIndex = 0;
let motIndex = 0;
let mots = [];
let timer = null;
let enCours = false;

const vitesseMot = 180;

/* =========================
   AFFICHER UNE IMAGE
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
   ECRITURE MOT PAR MOT
   ========================= */

function afficherSegment() {

  if (segmentIndex >= scene.length) {

    suiteBtn.classList.add("visible");
    return;
  }

  const segment = scene[segmentIndex];

  changerImage(segment.image);

  mots = segment.text.split(" ");

  motIndex = 0;

  texteScene.innerHTML = "";

  enCours = true;

  ecrireMot();
}


function ecrireMot() {

  if (motIndex < mots.length) {

    const mot = document.createElement("span");

    mot.textContent = mots[motIndex] + " ";

    mot.classList.add("mot");

    texteScene.appendChild(mot);

    motIndex++;

    timer = setTimeout(
      ecrireMot,
      vitesseMot
    );

  } else {

    enCours = false;

    setTimeout(() => {

      segmentIndex++;

      afficherSegment();

    }, 1200);

  }
}


/* =========================
   TOUCHER / CLIQUER
   POUR AFFICHER TOUT LE TEXTE
   ========================= */

texteScene.addEventListener(
  "click",
  afficherTexteComplet
);

document.addEventListener(
  "touchstart",
  function(event){

    if (
      event.target.closest(".chapitre-contenu")
    ) {
      afficherTexteComplet();
    }

  },
  { passive:true }
);


function afficherTexteComplet() {

  if (!enCours) {
    return;
  }

  clearTimeout(timer);

  texteScene.innerHTML =
    mots.join(" ");

  motIndex =
    mots.length;

  enCours =
    false;

  setTimeout(() => {

    segmentIndex++;

    afficherSegment();

  }, 900);
}


/* =========================
   DEMARRAGE
   ========================= */

afficherSegment();
