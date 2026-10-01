/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 1 — EMBRASSE TON DESTIN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


/* =========================================================
   ÉLÉMENTS PRINCIPAUX
========================================================= */

const scenes =
  document.querySelectorAll(".scene");

const progressFill =
  document.getElementById("progressFill");

const menuBtn =
  document.getElementById("menuBtn");

const soundBtn =
  document.getElementById("soundBtn");

const chapterMenu =
  document.getElementById("chapterMenu");

const menuClose =
  document.getElementById("menuClose");

const resumeBtn =
  document.getElementById("resumeBtn");

const restartBtn =
  document.getElementById("restartBtn");

const restartChapter =
  document.getElementById("restartChapter");

const secretPopup =
  document.getElementById("secretPopup");

const analyseSymbols =
  document.getElementById("analyseSymbols");

const scene29 =
  document.getElementById("scene-29");

const openEnvelope =
  document.getElementById("openEnvelope");

const envelopeReveal =
  document.getElementById("envelopeReveal");

const choiceButtons =
  document.querySelectorAll(".choice-btn");

const choiceResult =
  document.getElementById("choiceResult");


/* =========================================================
   CLÉS DE MÉMOIRE
========================================================= */

const STORAGE_SCROLL =
  "societeOmbre_chapitre1_scroll";

const STORAGE_CHOICE =
  "societeOmbre_chapitre1_instinctRaison";

const STORAGE_SECRETS =
  "societeOmbre_chapitre1_secrets";

const STORAGE_PUZZLE =
  "societeOmbre_chapitre1_symboles";

const STORAGE_ENVELOPE =
  "societeOmbre_chapitre1_enveloppe";

const STORAGE_PROLOGUE_CHOICE =
  "societeOmbre_premierChoix";


/* =========================================================
   IMAGES MANQUANTES
========================================================= */

document
  .querySelectorAll(".visual img")
  .forEach((img) => {

    img.addEventListener(
      "error",
      () => {

        const visual =
          img.closest(".visual");

        if (visual) {

          visual.classList.add(
            "visual-missing"
          );

        }

      }
    );

  });


/* =========================================================
   ANIMATION DES SCÈNES
========================================================= */

const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const scene =
            entry.target;

          scene.classList.add(
            "is-visible"
          );

          animateParagraphs(
            scene
          );

        }

      });

    },
    {
      threshold: 0.16
    }
  );


scenes.forEach((scene) => {

  observer.observe(scene);

});


/* =========================================================
   APPARITION PROGRESSIVE DU TEXTE
========================================================= */

function animateParagraphs(scene) {

  if (
    scene.dataset.textAnimated === "1"
  ) {
    return;
  }

  scene.dataset.textAnimated =
    "1";

  const paragraphs =
    scene.querySelectorAll(
      ".text-block p"
    );

  paragraphs.forEach(
    (paragraph, index) => {

      paragraph.style.opacity =
        "0";

      paragraph.style.transform =
        "translateY(12px)";

      setTimeout(
        () => {

          paragraph.animate(
            [
              {
                opacity: 0,
                transform:
                  "translateY(12px)"
              },
              {
                opacity: 1,
                transform:
                  "translateY(0)"
              }
            ],
            {
              duration: 650,
              easing: "ease-out",
              fill: "forwards"
            }
          );

        },
        index * 110
      );

    }
  );

}


/* =========================================================
   BARRE DE PROGRESSION
========================================================= */

function updateProgress() {

  if (!progressFill) {
    return;
  }

  const scrollTop =
    window.scrollY;

  const documentHeight =
    document.documentElement
      .scrollHeight -
    window.innerHeight;

  if (documentHeight <= 0) {
    return;
  }

  const percentage =
    Math.min(
      100,
      Math.max(
        0,
        (
          scrollTop /
          documentHeight
        ) * 100
      )
    );

  progressFill.style.width =
    percentage + "%";

}


window.addEventListener(
  "scroll",
  updateProgress,
  {
    passive: true
  }
);

updateProgress();


/* =========================================================
   SAUVEGARDE DE LA POSITION
========================================================= */

let saveScrollTimer = null;

window.addEventListener(
  "scroll",
  () => {

    clearTimeout(
      saveScrollTimer
    );

    saveScrollTimer =
      setTimeout(
        () => {

          localStorage.setItem(
            STORAGE_SCROLL,
            Math.round(
              window.scrollY
            )
          );

        },
        250
      );

  },
  {
    passive: true
  }
);


/* =========================================================
   REPRISE DE LECTURE
========================================================= */

const savedScroll =
  parseInt(
    localStorage.getItem(
      STORAGE_SCROLL
    ),
    10
  );


/* =========================================================
   BOUTONS CONTINUER / COMMENCER
========================================================= */

document
  .querySelectorAll(
    "[data-next]"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const currentScene =
          button.closest(".scene");

        if (!currentScene) {
          return;
        }

        const nextScene =
          currentScene
            .nextElementSibling;

        if (nextScene) {

          nextScene.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }
    );

  });


/* =========================================================
   MENU
========================================================= */

function openMenu() {

  if (!chapterMenu) {
    return;
  }

  chapterMenu.classList.add(
    "open"
  );

  chapterMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "no-scroll"
  );

}


function closeMenu() {

  if (!chapterMenu) {
    return;
  }

  chapterMenu.classList.remove(
    "open"
  );

  chapterMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "no-scroll"
  );

}


if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    openMenu
  );

}


if (menuClose) {

  menuClose.addEventListener(
    "click",
    closeMenu
  );

}


if (chapterMenu) {

  chapterMenu.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        chapterMenu
      ) {

        closeMenu();

      }

    }
  );

}


/* =========================================================
   REPRENDRE LA LECTURE
========================================================= */

if (resumeBtn) {

  resumeBtn.addEventListener(
    "click",
    () => {

      closeMenu();

      const position =
        parseInt(
          localStorage.getItem(
            STORAGE_SCROLL
          ),
          10
        );

      if (
        !Number.isNaN(position)
      ) {

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      }

    }
  );

}


/* =========================================================
   RECOMMENCER LE CHAPITRE
========================================================= */

function restartChapterFunction() {

  localStorage.removeItem(
    STORAGE_SCROLL
  );

  localStorage.removeItem(
    STORAGE_CHOICE
  );

  localStorage.removeItem(
    STORAGE_PUZZLE
  );

  localStorage.removeItem(
    STORAGE_ENVELOPE
  );

  /*
    Les secrets restent enregistrés.
  */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeMenu();

}


if (restartBtn) {

  restartBtn.addEventListener(
    "click",
    restartChapterFunction
  );

}


if (restartChapter) {

  restartChapter.addEventListener(
    "click",
    restartChapterFunction
  );

}


/* =========================================================
   SECRETS
========================================================= */

function getSecrets() {

  try {

    return JSON.parse(
      localStorage.getItem(
        STORAGE_SECRETS
      )
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveSecret(secret) {

  const secrets =
    getSecrets();

  if (
    !secrets.includes(secret)
  ) {

    secrets.push(secret);

    localStorage.setItem(
      STORAGE_SECRETS,
      JSON.stringify(
        secrets
      )
    );

  }

}


/* =========================================================
   POPUP SECRET
========================================================= */

let secretTimer = null;
let secretHideTimer = null;


function hideSecretPopup() {

  if (!secretPopup) {
    return;
  }

  secretPopup.classList.remove(
    "show"
  );

  secretPopup.setAttribute(
    "aria-hidden",
    "true"
  );

  /*
    Très important :
    le popup ne peut plus bloquer
    le scroll ni les boutons.
  */
  secretPopup.style.pointerEvents =
    "none";

  clearTimeout(
    secretHideTimer
  );

  secretHideTimer =
    setTimeout(
      () => {

        if (
          !secretPopup.classList.contains(
            "show"
          )
        ) {

          secretPopup.style.visibility =
            "hidden";

        }

      },
      450
    );

}


function showSecret(
  secretName,
  secretText
) {

  saveSecret(
    secretName
  );

  if (!secretPopup) {
    return;
  }

  const inner =
    secretPopup.querySelector(
      ".secret-popup-inner"
    );

  if (!inner) {
    return;
  }

  let description =
    inner.querySelector(
      ".secret-description"
    );

  if (!description) {

    description =
      document.createElement(
        "p"
      );

    description.className =
      "secret-description";

    description.style.marginTop =
      "14px";

    description.style.fontSize =
      "15px";

    description.style.lineHeight =
      "1.55";

    description.style.letterSpacing =
      "0";

    description.style.color =
      "#f4eee6";

    inner.appendChild(
      description
    );

  }


  description.textContent =
    secretText;


  clearTimeout(
    secretTimer
  );

  clearTimeout(
    secretHideTimer
  );


  /*
    Réactivation du popup
  */

  secretPopup.style.visibility =
    "visible";

  secretPopup.style.pointerEvents =
    "auto";

  secretPopup.classList.add(
    "show"
  );

  secretPopup.setAttribute(
    "aria-hidden",
    "false"
  );


  playSecretSound();


  /*
    Le message reste 3,2 secondes,
    puis disparaît automatiquement.
  */

  secretTimer =
    setTimeout(
      hideSecretPopup,
      3200
    );

}


/*
  Sécurité au chargement :
  le popup ne doit jamais bloquer
  la page s'il n'est pas ouvert.
*/

if (secretPopup) {

  secretPopup.style.pointerEvents =
    "none";

  if (
    !secretPopup.classList.contains(
      "show"
    )
  ) {

    secretPopup.style.visibility =
      "hidden";

  }

}


/* =========================================================
   SECRET — FIOLE
========================================================= */

const fioleVisual =
  document.querySelector(
    '[data-secret="fiole"]'
  );

const fioleButton =
  document.querySelector(
    '[data-observe="fiole"]'
  );


function discoverFiole() {

  if (fioleVisual) {

    fioleVisual.classList.add(
      "secret-found"
    );

  }

  showSecret(
    "fiole",
    "Cette fiole est à l’origine d’une chaîne d’événements dont personne ne mesure encore les conséquences."
  );

}


if (fioleButton) {

  fioleButton.addEventListener(
    "click",
    (event) => {

      event.preventDefault();
      event.stopPropagation();

      discoverFiole();

    }
  );

}


if (fioleVisual) {

  fioleVisual.addEventListener(
    "click",
    () => {

      discoverFiole();

    }
  );

}


/* =========================================================
   SECRET — BOÎTE DE PANDORE
========================================================= */

const pandoreVisual =
  document.querySelector(
    '[data-secret="pandore"]'
  );


if (pandoreVisual) {

  pandoreVisual.addEventListener(
    "click",
    () => {

      pandoreVisual.classList.add(
        "secret-found"
      );

      showSecret(
        "pandore",
        "La boîte et sa protectrice seront désormais liées."
      );

    }
  );

}


/* =========================================================
   CHOIX — INSTINCT / RAISON
========================================================= */

function resetChoiceButtons() {

  choiceButtons.forEach(
    (button) => {

      button.classList.remove(
        "selected",
        "dimmed"
      );

    }
  );

}


function createChoiceContinueButton() {

  if (!choiceResult) {
    return;
  }

  const oldButton =
    choiceResult.querySelector(
      ".choice-continue"
    );

  if (oldButton) {

    oldButton.remove();

  }


  const button =
    document.createElement(
      "button"
    );

  button.className =
    "continue-btn choice-continue";

  button.textContent =
    "Continuer";

  button.style.marginTop =
    "22px";


  button.addEventListener(
    "click",
    () => {

      const scene20 =
        document.getElementById(
          "scene-20"
        );

      if (scene20) {

        scene20.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );


  choiceResult.appendChild(
    button
  );

}


function applyChoice(choice) {

  if (!choiceResult) {
    return;
  }

  resetChoiceButtons();


  const selected =
    document.querySelector(
      `[data-choice="${choice}"]`
    );


  choiceButtons.forEach(
    (button) => {

      if (
        button === selected
      ) {

        button.classList.add(
          "selected"
        );

      } else {

        button.classList.add(
          "dimmed"
        );

      }

    }
  );


  if (
    choice === "instinct"
  ) {

    choiceResult.innerHTML =
      `
        <p>
          Root écoute cette sensation
          qu’elle ne parvient pas à expliquer.
        </p>

        <p>
          Elle fait demi-tour.
        </p>

        <p>
          Parfois, l’instinct remarque
          ce que la conscience n’a pas encore compris.
        </p>
      `;

  }


  if (
    choice === "raison"
  ) {

    choiceResult.innerHTML =
      `
        <p>
          Root poursuit d’abord
          sa route vers l’aéroport.
        </p>

        <p>
          Pourtant, le doute demeure.
        </p>

        <p>
          Plus elle avance,
          plus cette sensation devient impossible à ignorer.
        </p>

        <p>
          Certaines décisions ne disparaissent pas
          simplement parce que l’on refuse de les prendre.
        </p>

        <p>
          Root finit par faire demi-tour.
        </p>
      `;

  }


  createChoiceContinueButton();

}


choiceButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const choice =
          button.dataset.choice;

        localStorage.setItem(
          STORAGE_CHOICE,
          choice
        );

        applyChoice(
          choice
        );

        playChoiceSound();

      }
    );

  }
);


/* =========================================================
   RESTAURER LE CHOIX
========================================================= */

const savedChoice =
  localStorage.getItem(
    STORAGE_CHOICE
  );


if (
  savedChoice === "instinct" ||
  savedChoice === "raison"
) {

  applyChoice(
    savedChoice
  );

}


/* =========================================================
   ENVELOPPE DE HOPE
========================================================= */

function openHopeEnvelope() {

  if (!envelopeReveal) {
    return;
  }

  envelopeReveal.classList.add(
    "open"
  );

  localStorage.setItem(
    STORAGE_ENVELOPE,
    "1"
  );


  if (openEnvelope) {

    openEnvelope.textContent =
      "Enveloppe ouverte";

    openEnvelope.disabled =
      true;

  }


  playRevealSound();

}


if (openEnvelope) {

  openEnvelope.addEventListener(
    "click",
    openHopeEnvelope
  );

}


if (
  localStorage.getItem(
    STORAGE_ENVELOPE
  ) === "1"
) {

  openHopeEnvelope();

}


/* =========================================================
   ÉNIGME DES SYMBOLES
========================================================= */

function solveSymbolPuzzle() {

  if (
    !scene29 ||
    !analyseSymbols
  ) {
    return;
  }


  scene29.classList.add(
    "unlocked"
  );


  localStorage.setItem(
    STORAGE_PUZZLE,
    "1"
  );


  analyseSymbols.classList.add(
    "completed"
  );


  analyseSymbols.textContent =
    "Inclinaison identifiée";


  playRevealSound();


  setTimeout(
    () => {

      scene29.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    },
    550
  );

}


if (analyseSymbols) {

  analyseSymbols.addEventListener(
    "click",
    solveSymbolPuzzle
  );

}


if (
  localStorage.getItem(
    STORAGE_PUZZLE
  ) === "1"
) {

  if (scene29) {

    scene29.classList.add(
      "unlocked"
    );

  }


  if (analyseSymbols) {

    analyseSymbols.classList.add(
      "completed"
    );

    analyseSymbols.textContent =
      "Inclinaison identifiée";

  }

}


/* =========================================================
   MÉMOIRE DU CHOIX DU PROLOGUE
========================================================= */

function addPrologueMemory() {

  const prologueChoice =
    localStorage.getItem(
      STORAGE_PROLOGUE_CHOICE
    );


  if (!prologueChoice) {
    return;
  }


  const leeScene =
    document.getElementById(
      "lee-hope"
    );


  const textBlock =
    leeScene?.querySelector(
      ".text-block"
    );


  if (!textBlock) {
    return;
  }


  if (
    document.getElementById(
      "prologueMemory"
    )
  ) {
    return;
  }


  const memory =
    document.createElement(
      "p"
    );


  memory.id =
    "prologueMemory";


  memory.className =
    "emphasis";


  memory.style.marginTop =
    "42px";


  memory.style.padding =
    "20px 14px";


  memory.style.borderTop =
    "1px solid rgba(231,191,117,.25)";


  memory.style.borderBottom =
    "1px solid rgba(231,191,117,.25)";


  if (
    prologueChoice ===
    "eveil"
  ) {

    memory.textContent =
      "Vous aviez choisi d’ouvrir les yeux. Était-ce déjà votre premier pas ?";

  }


  if (
    prologueChoice ===
    "illusion"
  ) {

    memory.textContent =
      "Vous aviez choisi l’illusion. Pourtant, vous êtes toujours ici.";

  }


  textBlock.appendChild(
    memory
  );

}


addPrologueMemory();


/* =========================================================
   AMBIANCE SONORE
========================================================= */

let audioCtx = null;
let masterGain = null;
let ambienceOsc1 = null;
let ambienceOsc2 = null;
let soundActive = false;


/* =========================================================
   DÉMARRER LE SON
========================================================= */

function startSound() {

  if (soundActive) {
    return;
  }


  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;


  if (!AudioContextClass) {
    return;
  }


  audioCtx =
    new AudioContextClass();


  masterGain =
    audioCtx.createGain();


  masterGain.gain.value =
    0.025;


  masterGain.connect(
    audioCtx.destination
  );


  ambienceOsc1 =
    audioCtx.createOscillator();


  ambienceOsc2 =
    audioCtx.createOscillator();


  const gain1 =
    audioCtx.createGain();


  const gain2 =
    audioCtx.createGain();


  ambienceOsc1.type =
    "sine";


  ambienceOsc1.frequency.value =
    42;


  gain1.gain.value =
    0.7;


  ambienceOsc2.type =
    "triangle";


  ambienceOsc2.frequency.value =
    84;


  gain2.gain.value =
    0.08;


  ambienceOsc1
    .connect(gain1)
    .connect(masterGain);


  ambienceOsc2
    .connect(gain2)
    .connect(masterGain);


  ambienceOsc1.start();

  ambienceOsc2.start();


  soundActive =
    true;


  if (soundBtn) {

    soundBtn.classList.add(
      "sound-active"
    );

    soundBtn.textContent =
      "♪";

  }

}


/* =========================================================
   ARRÊTER LE SON
========================================================= */

function stopSound() {

  if (
    !soundActive ||
    !audioCtx
  ) {
    return;
  }


  if (masterGain) {

    masterGain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime +
        0.35
      );

  }


  setTimeout(
    () => {

      try {

        ambienceOsc1?.stop();
        ambienceOsc2?.stop();

        audioCtx?.close();

      } catch (error) {

        /* Rien */

      }


      audioCtx =
        null;

      masterGain =
        null;

      ambienceOsc1 =
        null;

      ambienceOsc2 =
        null;

    },
    450
  );


  soundActive =
    false;


  if (soundBtn) {

    soundBtn.classList.remove(
      "sound-active"
    );

    soundBtn.textContent =
      "♫";

  }

}


/* =========================================================
   BOUTON SON
========================================================= */

if (soundBtn) {

  soundBtn.addEventListener(
    "click",
    () => {

      if (soundActive) {

        stopSound();

      } else {

        startSound();

      }

    }
  );

}


/* =========================================================
   PETITS EFFETS SONORES
========================================================= */

function playTone(
  frequency,
  duration,
  volume = 0.04
) {

  if (
    !soundActive ||
    !audioCtx
  ) {
    return;
  }


  const oscillator =
    audioCtx.createOscillator();


  const gain =
    audioCtx.createGain();


  oscillator.type =
    "sine";


  oscillator.frequency.value =
    frequency;


  gain.gain.setValueAtTime(
    volume,
    audioCtx.currentTime
  );


  gain.gain
    .exponentialRampToValueAtTime(
      0.0001,
      audioCtx.currentTime +
      duration
    );


  oscillator
    .connect(gain)
    .connect(
      audioCtx.destination
    );


  oscillator.start();


  oscillator.stop(
    audioCtx.currentTime +
    duration
  );

}


/* =========================================================
   SON SECRET
========================================================= */

function playSecretSound() {

  playTone(
    540,
    0.7,
    0.025
  );


  setTimeout(
    () => {

      playTone(
        760,
        0.8,
        0.02
      );

    },
    140
  );

}


/* =========================================================
   SON CHOIX
========================================================= */

function playChoiceSound() {

  playTone(
    330,
    0.45,
    0.02
  );

}


/* =========================================================
   SON RÉVÉLATION
========================================================= */

function playRevealSound() {

  playTone(
    420,
    0.7,
    0.025
  );


  setTimeout(
    () => {

      playTone(
        630,
        0.9,
        0.02
      );

    },
    180
  );

}


/* =========================================================
   ÉCHAP POUR FERMER LE MENU
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeMenu();

      hideSecretPopup();

    }

  }
);


/* =========================================================
   SAUVEGARDE AVANT DE QUITTER
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {

    localStorage.setItem(
      STORAGE_SCROLL,
      Math.round(
        window.scrollY
      )
    );

  }
);


/* =========================================================
   PREMIÈRE SCÈNE
========================================================= */

const firstScene =
  document.querySelector(
    ".scene"
  );


if (firstScene) {

  setTimeout(
    () => {

      firstScene.classList.add(
        "is-visible"
      );

    },
    100
  );

}


/* =========================================================
   FIN INITIALISATION
========================================================= */

});
