/* =========================
   LA SOCIÉTÉ DE L'OMBRE
   OUVERTURE INTERACTIVE
   ========================= */


/* =========================
   RÉFÉRENCES DES SCÈNES
   ========================= */

const scenes =
  document.querySelectorAll(".scene");

const scene1 =
  document.getElementById("scene1");

const scene2 =
  document.getElementById("scene2");

const scene3 =
  document.getElementById("scene3");

const scene4 =
  document.getElementById("scene4");

const scene5 =
  document.getElementById("scene5");

const scene6 =
  document.getElementById("scene6");

const scene7 =
  document.getElementById("scene7");

const scene8 =
  document.getElementById("scene8");

const scene9 =
  document.getElementById("scene9");

const scene10 =
  document.getElementById("scene10");

const scene11 =
  document.getElementById("scene11");

const scene12 =
  document.getElementById("scene12");

const scene13 =
  document.getElementById("scene13");


/* =========================
   BOUTONS
   ========================= */

const startStoryBtn =
  document.getElementById(
    "startStoryBtn"
  );

const portalBtn =
  document.getElementById(
    "portalBtn"
  );

const guardianBtn =
  document.getElementById(
    "guardianBtn"
  );

const sentinelBtn =
  document.getElementById(
    "sentinelBtn"
  );

const continueScene4Btn =
  document.getElementById(
    "continueScene4Btn"
  );

const secretContinueBtn =
  document.getElementById(
    "secretContinueBtn"
  );

const butterflyBtn =
  document.getElementById(
    "butterflyBtn"
  );

const goPrologueBtn =
  document.getElementById(
    "goPrologueBtn"
  );

const choiceScreenBtn =
  document.getElementById(
    "choiceScreenBtn"
  );

const illusionBtn =
  document.getElementById(
    "illusionBtn"
  );

const awakeBtn =
  document.getElementById(
    "awakeBtn"
  );

const consequenceContinueBtns =
  document.querySelectorAll(
    ".consequenceContinueBtn"
  );

const chapter1Btn =
  document.getElementById(
    "chapter1Btn"
  );


/* =========================
   MÉMOIRE DU LECTEUR
   ========================= */

const STORAGE_CHOICE =
  "societeOmbre_premierChoix";

const STORAGE_SECRET =
  "societeOmbre_secretOuverture";

const STORAGE_SYMBOL_CHOICE =
  "societeOmbre_symboleChoisi";

const STORAGE_OUVERTURE_VUE =
  "societeOmbre_ouvertureVue";


/* =========================
   FONCTION :
   CHANGER DE SCÈNE
   ========================= */

function showScene(scene) {

  if (!scene) {
    return;
  }


  scenes.forEach(
    (item) => {

      item.classList.remove(
        "active"
      );

    }
  );


  scene.classList.add(
    "active"
  );


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

if (startStoryBtn) {

  startStoryBtn.addEventListener(
    "click",
    () => {

      showScene(
        scene2
      );

    }
  );

}


/* =========================
   SCÈNE 2
   PASSAGE
   ========================= */

if (portalBtn) {

  portalBtn.addEventListener(
    "click",
    () => {

      showScene(
        scene3
      );


      setTimeout(
        () => {

          showScene(
            scene4
          );

        },
        1900
      );

    }
  );

}


/* =========================
   SCÈNE 4
   GARDIENS / SENTINELLES
   ========================= */

let symbolChosen =
  false;


function discoverSecret(origin) {

  if (symbolChosen) {
    return;
  }


  symbolChosen =
    true;


  /*
    Mémoriser que le secret
    de l'ouverture a été découvert.
  */

  localStorage.setItem(
    STORAGE_SECRET,
    "1"
  );


  /*
    Mémoriser le camp choisi.
  */

  localStorage.setItem(
    STORAGE_SYMBOL_CHOICE,
    origin
  );


  /*
    Récupérer la phrase
    de la scène 5.
  */

  const secretChoiceText =
    document.getElementById(
      "secretChoiceText"
    );


  /*
    Phrase différente selon
    le symbole choisi.
  */

  if (secretChoiceText) {

    if (
      origin ===
      "gardiens"
    ) {

      secretChoiceText.textContent =
        "Vous avez choisi les Gardiens Noirs. Pour eux, préserver l’équilibre peut parfois exiger de franchir des limites que d’autres refusent de dépasser.";

    }


    if (
      origin ===
      "sentinelles"
    ) {

      secretChoiceText.textContent =
        "Vous avez choisi les Sentinelles de la Lumière. Pour elles, préserver l’équilibre signifie protéger la vie, même lorsque ce choix est le plus difficile.";

    }

  }


  /*
    Afficher le secret.
  */

  showScene(
    scene5
  );

}


/* =========================
   GARDIENS NOIRS
   ========================= */

if (guardianBtn) {

  guardianBtn.addEventListener(
    "click",
    () => {

      discoverSecret(
        "gardiens"
      );

    }
  );

}


/* =========================
   SENTINELLES DE LA LUMIÈRE
   ========================= */

if (sentinelBtn) {

  sentinelBtn.addEventListener(
    "click",
    () => {

      discoverSecret(
        "sentinelles"
      );

    }
  );

}


/* =========================
   BOUTON DE SECOURS
   SCÈNE 4
   ========================= */

if (continueScene4Btn) {

  continueScene4Btn.addEventListener(
    "click",
    () => {

      showScene(
        scene6
      );

    }
  );

}


/* =========================
   SCÈNE 5
   SECRET DÉCOUVERT
   ========================= */

if (secretContinueBtn) {

  secretContinueBtn.addEventListener(
    "click",
    () => {

      showScene(
        scene6
      );

    }
  );

}


/* =========================
   SCÈNE 6
   PAPILLON
   ========================= */

if (butterflyBtn) {

  butterflyBtn.addEventListener(
    "click",
    () => {

      showScene(
        scene7
      );


      setTimeout(
        () => {

          showScene(
            scene8
          );

        },
        1800
      );

    }
  );

}


/* =========================
   SCÈNE 8
   TOUT EFFET A UNE CAUSE
   ========================= */

if (goPrologueBtn) {

  goPrologueBtn.addEventListener(
    "click",
    () => {

      showScene(
        scene9
      );

    }
  );

}


/* =========================
   SCÈNE 9
   PROLOGUE
   ========================= */

if (choiceScreenBtn) {

  choiceScreenBtn.addEventListener(
    "click",
    () => {

      showScene(
        scene10
      );

    }
  );

}


/* =========================
   SCÈNE 10
   CHOIX FINAL DU PROLOGUE
   ========================= */


/* =========================
   VIVRE DANS L'ILLUSION
   ========================= */

if (illusionBtn) {

  illusionBtn.addEventListener(
    "click",
    () => {

      localStorage.setItem(
        STORAGE_CHOICE,
        "illusion"
      );


      showScene(
        scene11
      );

    }
  );

}


/* =========================
   OUVRIR LES YEUX
   ========================= */

if (awakeBtn) {

  awakeBtn.addEventListener(
    "click",
    () => {

      localStorage.setItem(
        STORAGE_CHOICE,
        "eveil"
      );


      showScene(
        scene12
      );

    }
  );

}


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


        showScene(
          scene13
        );

      }
    );

  }
);


/* =========================
   SCÈNE 13
   VERS LE CHAPITRE 1
   ========================= */

if (chapter1Btn) {

  chapter1Btn.addEventListener(
    "click",
    () => {

      window.location.href =
        "chapitre1.html";

    }
  );

}


/* =========================
   PROTECTION CONTRE
   LES DOUBLES CLICS
   ========================= */

function lockButtonTemporarily(
  button,
  duration = 1200
) {

  if (!button) {
    return;
  }


  button.disabled =
    true;


  setTimeout(
    () => {

      button.disabled =
        false;

    },
    duration
  );

}


/* =========================
   PASSAGE
   ========================= */

if (portalBtn) {

  portalBtn.addEventListener(
    "click",
    () => {

      lockButtonTemporarily(
        portalBtn,
        2000
      );

    }
  );

}


/* =========================
   PAPILLON
   ========================= */

if (butterflyBtn) {

  butterflyBtn.addEventListener(
    "click",
    () => {

      lockButtonTemporarily(
        butterflyBtn,
        1900
      );

    }
  );

}


/* =========================
   ACCESSIBILITÉ
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
        activeElement.tagName ===
          "BUTTON"
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
      new URLSearchParams(
        window.location.search
      );


    const depart =
      params.get(
        "depart"
      );


    /*
      Le bouton
      "Passer l'introduction"
      arrive directement ici.
    */

    if (
      depart ===
      "prologue"
    ) {

      showScene(
        scene9
      );

    } else {

      showScene(
        scene1
      );

    }

  }
);
