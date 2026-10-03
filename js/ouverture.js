/* =========================
   LA SOCIÉTÉ DE L'OMBRE
   OUVERTURE INTERACTIVE
   ========================= */


/* =========================
   RÉFÉRENCES DES SCÈNES
   ========================= */

const scenes = document.querySelectorAll(".scene");

const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const scene3 = document.getElementById("scene3");
const scene4 = document.getElementById("scene4");
const scene5 = document.getElementById("scene5");
const scene6 = document.getElementById("scene6");
const scene7 = document.getElementById("scene7");
const scene8 = document.getElementById("scene8");
const scene9 = document.getElementById("scene9");
const scene10 = document.getElementById("scene10");
const scene11 = document.getElementById("scene11");
const scene12 = document.getElementById("scene12");
const scene13 = document.getElementById("scene13");


/* =========================
   BOUTONS
   ========================= */

const startStoryBtn =
  document.getElementById("startStoryBtn");

const portalBtn =
  document.getElementById("portalBtn");

const guardianBtn =
  document.getElementById("guardianBtn");

const sentinelBtn =
  document.getElementById("sentinelBtn");

const continueScene4Btn =
  document.getElementById("continueScene4Btn");

const secretContinueBtn =
  document.getElementById("secretContinueBtn");

const butterflyBtn =
  document.getElementById("butterflyBtn");

const goPrologueBtn =
  document.getElementById("goPrologueBtn");

const choiceScreenBtn =
  document.getElementById("choiceScreenBtn");

const illusionBtn =
  document.getElementById("illusionBtn");

const awakeBtn =
  document.getElementById("awakeBtn");

const consequenceContinueBtns =
  document.querySelectorAll(".consequenceContinueBtn");

const chapter1Btn =
  document.getElementById("chapter1Btn");


/* =========================
   MÉMOIRE DU LECTEUR
   ========================= */

const STORAGE_CHOICE =
  "societeOmbre_premierChoix";

const STORAGE_SECRET =
  "societeOmbre_secretOuverture";

const STORAGE_OUVERTURE_VUE =
  "societeOmbre_ouvertureVue";


/* =========================
   FONCTION : CHANGER DE SCÈNE
   ========================= */

function showScene(scene) {

  scenes.forEach((item) => {
    item.classList.remove("active");
  });

  scene.classList.add("active");

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
  });

}


/* =========================
   SCÈNE 1
   PRÉSENTATION
   ========================= */

startStoryBtn.addEventListener(
  "click",
  () => {

    showScene(scene2);

  }
);


/* =========================
   SCÈNE 2
   PASSAGE
   ========================= */

portalBtn.addEventListener(
  "click",
  () => {

    showScene(scene3);

    setTimeout(
      () => {

        showScene(scene4);

      },
      1900
    );

  }
);


/* =========================
   SCÈNE 4
   GARDIENS / SENTINELLES
   ========================= */

let symbolChosen = false;

function discoverSecret(origin) {

  if (symbolChosen) {
    return;
  }

  symbolChosen = true;

  localStorage.setItem(
    STORAGE_SECRET,
    "1"
  );

  localStorage.setItem(
    "societeOmbre_symboleChoisi",
    origin
  );

  showScene(scene5);

}


/* Gardiens Noirs */
guardianBtn.addEventListener(
  "click",
  () => {

    discoverSecret("gardiens");

  }
);


/* Sentinelles de la Lumière */
sentinelBtn.addEventListener(
  "click",
  () => {

    discoverSecret("sentinelles");

  }
);


/*
  Ce bouton reste prévu au cas où,
  mais il est masqué dans le HTML au départ.
*/
continueScene4Btn.addEventListener(
  "click",
  () => {

    showScene(scene6);

  }
);


/* =========================
   SCÈNE 5
   SECRET DÉCOUVERT
   ========================= */

secretContinueBtn.addEventListener(
  "click",
  () => {

    showScene(scene6);

  }
);


/* =========================
   SCÈNE 6
   PAPILLON
   ========================= */

butterflyBtn.addEventListener(
  "click",
  () => {

    showScene(scene7);

    setTimeout(
      () => {

        showScene(scene8);

      },
      1800
    );

  }
);


/* =========================
   SCÈNE 8
   TOUT EFFET A UNE CAUSE
   ========================= */

goPrologueBtn.addEventListener(
  "click",
  () => {

    showScene(scene9);

  }
);


/* =========================
   SCÈNE 9
   PROLOGUE
   ========================= */

choiceScreenBtn.addEventListener(
  "click",
  () => {

    showScene(scene10);

  }
);


/* =========================
   SCÈNE 10
   CHOIX FINAL DU PROLOGUE
   ========================= */


/* VIVRE DANS L'ILLUSION */
illusionBtn.addEventListener(
  "click",
  () => {

    localStorage.setItem(
      STORAGE_CHOICE,
      "illusion"
    );

    showScene(scene11);

  }
);


/* OUVRIR LES YEUX */
awakeBtn.addEventListener(
  "click",
  () => {

    localStorage.setItem(
      STORAGE_CHOICE,
      "eveil"
    );

    showScene(scene12);

  }
);


/* =========================
   SCÈNES 11 / 12
   CONSÉQUENCES DU CHOIX
   ========================= */

consequenceContinueBtns.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        localStorage.setItem(
          STORAGE_OUVERTURE_VUE,
          "1"
        );

        showScene(scene13);

      }
    );

  }
);


/* =========================
   SCÈNE 13
   VERS LE CHAPITRE 1
   ========================= */

chapter1Btn.addEventListener(
  "click",
  () => {

    window.location.href =
      "chapitre1.html";

  }
);


/* =========================
   PETITE PROTECTION
   EMPÊCHE LES DOUBLES CLICS
   SUR CERTAINES INTERACTIONS
   ========================= */

function lockButtonTemporarily(
  button,
  duration = 1200
) {

  button.disabled = true;

  setTimeout(
    () => {

      button.disabled = false;

    },
    duration
  );

}


/* Passage */
portalBtn.addEventListener(
  "click",
  () => {

    lockButtonTemporarily(
      portalBtn,
      2000
    );

  }
);


/* Papillon */
butterflyBtn.addEventListener(
  "click",
  () => {

    lockButtonTemporarily(
      butterflyBtn,
      1900
    );

  }
);


/* =========================
   ACCESSIBILITÉ :
   CLAVIER
   ========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      const activeElement =
        document.activeElement;

      if (
        activeElement &&
        activeElement.tagName === "BUTTON"
      ) {

        event.preventDefault();

        activeElement.click();

      }

    }

  }
);


/* =========================
   AU CHARGEMENT
   ========================= */

window.addEventListener(
  "load",
  () => {

    const params =
      new URLSearchParams(window.location.search);

    const depart =
      params.get("depart");

    if (depart === "prologue") {

      showScene(scene9);

    } else {

      showScene(scene1);

    }

  }
);
