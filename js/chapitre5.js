/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 5 — L’INAUGURATION DU NEXUS
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


/* =========================================================
   STOCKAGE
========================================================= */

const STORAGE_SCROLL =
  "societeOmbre_chapitre5_scroll";

const STORAGE_PROGRESS =
  "societeOmbre_chapitre5_progression";

const STORAGE_COMPLETED =
  "societeOmbre_chapitre5_termine";

const STORAGE_NEXUS =
  "societeOmbre_chapitre5_nexus";

const STORAGE_ANNA =
  "societeOmbre_chapitre5_anna";

const STORAGE_ELIE =
  "societeOmbre_chapitre5_elie";

const STORAGE_TRACKING =
  "societeOmbre_chapitre5_tracking";

const STORAGE_CALL =
  "societeOmbre_chapitre5_call";

const STORAGE_BUTTERFLY =
  "societeOmbre_chapitre5_butterfly";

const STORAGE_RESONANCE =
  "societeOmbre_chapitre5_resonance";

const STORAGE_SECRETS =
  "societeOmbre_chapitre5_secrets";


/* =========================================================
   MODE DE LECTURE
========================================================= */

const urlParams =
  new URLSearchParams(
    window.location.search
  );

const lectureMode =
  urlParams.get("lecture");


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
   APPARITION DES SCÈNES
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

          animateParagraphs(scene);

          localStorage.setItem(
            STORAGE_PROGRESS,
            "1"
          );

        }

      });

    },
    {
      threshold: 0.14
    }
  );


scenes.forEach((scene) => {

  observer.observe(scene);

});


/* =========================================================
   TEXTE PROGRESSIF
========================================================= */

function animateParagraphs(scene) {

  if (
    scene.dataset.textAnimated ===
    "1"
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
        index * 105
      );

    }
  );

}


/* =========================================================
   PROGRESSION
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

  if (
    documentHeight <= 0
  ) {
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
   SAUVEGARDE POSITION
========================================================= */

let saveScrollTimer =
  null;


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

          localStorage.setItem(
            STORAGE_PROGRESS,
            "1"
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
   REPRENDRE
========================================================= */

if (
  lectureMode === "reprendre"
) {

  const savedPosition =
    parseInt(
      localStorage.getItem(
        STORAGE_SCROLL
      ),
      10
    );

  if (
    !Number.isNaN(
      savedPosition
    ) &&
    savedPosition > 0
  ) {

    setTimeout(
      () => {

        window.scrollTo({
          top: savedPosition,
          left: 0,
          behavior: "instant"
        });

        updateProgress();

      },
      400
    );

  }

}


/* =========================================================
   RECOMMENCER
========================================================= */

if (
  lectureMode === "recommencer"
) {

  setTimeout(
    () => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });

      updateProgress();

    },
    100
  );

}


/* =========================================================
   BOUTONS CONTINUER
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
          button.closest(
            ".scene"
          );

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


menuBtn?.addEventListener(
  "click",
  openMenu
);


menuClose?.addEventListener(
  "click",
  closeMenu
);


chapterMenu?.addEventListener(
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


/* =========================================================
   REPRENDRE DEPUIS LE MENU
========================================================= */

resumeBtn?.addEventListener(
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
      !Number.isNaN(
        position
      )
    ) {

      window.scrollTo({
        top: position,
        behavior: "smooth"
      });

    }

  }
);


/* =========================================================
   RECOMMENCER LE CHAPITRE
========================================================= */

function restartChapterFunction() {

  const prefix =
    "societeOmbre_chapitre5_";

  const keysToDelete =
    [];

  for (
    let i = 0;
    i < localStorage.length;
    i++
  ) {

    const key =
      localStorage.key(i);

    if (
      key &&
      key.startsWith(
        prefix
      )
    ) {

      keysToDelete.push(
        key
      );

    }

  }

  keysToDelete.forEach(
    (key) => {

      localStorage.removeItem(
        key
      );

    }
  );

  window.location.href =
    "chapitre5.html?lecture=recommencer";

}


restartBtn?.addEventListener(
  "click",
  restartChapterFunction
);


restartChapter?.addEventListener(
  "click",
  restartChapterFunction
);


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
    !secrets.includes(
      secret
    )
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
   POPUP INFORMATION
========================================================= */

let secretTimer =
  null;


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

}


function showSecret(
  secretName,
  secretText
) {

  saveSecret(secretName);

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

  secretPopup.classList.add(
    "show"
  );

  secretPopup.setAttribute(
    "aria-hidden",
    "false"
  );

  playSecretSound();

  clearTimeout(
    secretTimer
  );

  secretTimer =
    setTimeout(
      hideSecretPopup,
      3200
    );

}


/* =========================================================
   PETITE FONCTION DE RÉVÉLATION
========================================================= */

function activateReveal(
  trigger,
  reveal,
  storageKey,
  completedText,
  secretName,
  secretText,
  soundFunction
) {

  localStorage.setItem(
    storageKey,
    "1"
  );

  reveal?.classList.add(
    "open"
  );

  if (trigger) {

    trigger.classList.add(
      "completed"
    );

    trigger.textContent =
      completedText;

    trigger.disabled =
      true;

  }

  soundFunction?.();

  if (
    secretName &&
    secretText
  ) {

    showSecret(
      secretName,
      secretText
    );

  }

}


/* =========================================================
   INTERACTION NEXUS
========================================================= */

const nexusTrigger =
  document.getElementById(
    "nexusTrigger"
  );

const nexusReveal =
  document.getElementById(
    "nexusReveal"
  );


nexusTrigger?.addEventListener(
  "click",
  () => {

    activateReveal(
      nexusTrigger,
      nexusReveal,
      STORAGE_NEXUS,
      "NEXUS observé",
      "nexus",
      "Le NEXUS mêle spectacle, hospitalité et sécurité. Plusieurs membres du personnel surveillent discrètement la soirée.",
      playRevealSound
    );

  }
);


if (
  localStorage.getItem(
    STORAGE_NEXUS
  ) === "1"
) {

  nexusReveal?.classList.add(
    "open"
  );

  if (nexusTrigger) {

    nexusTrigger.classList.add(
      "completed"
    );

    nexusTrigger.textContent =
      "NEXUS observé";

    nexusTrigger.disabled =
      true;

  }

}


/* =========================================================
   OBSERVER ANNA
========================================================= */

const annaTrigger =
  document.getElementById(
    "annaTrigger"
  );

const annaReveal =
  document.getElementById(
    "annaReveal"
  );


annaTrigger?.addEventListener(
  "click",
  () => {

    activateReveal(
      annaTrigger,
      annaReveal,
      STORAGE_ANNA,
      "Anna observée",
      null,
      null,
      playClueSound
    );

  }
);


/* =========================================================
   OBSERVER ANNA / BETTY / LUCY
========================================================= */

const personReveal =
  document.getElementById(
    "personReveal"
  );


document
  .querySelectorAll(
    ".person-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const person =
          button.dataset.person;

        if (!personReveal) {
          return;
        }

        let text =
          "";

        if (
          person === "anna"
        ) {

          text =
            "Anna essaie visiblement de mémoriser chaque mot prononcé par Max.";

        }

        if (
          person === "betty"
        ) {

          text =
            "Betty paraît amusée, mais elle remarque immédiatement que Peter regarde régulièrement dans leur direction.";

        }

        if (
          person === "lucy"
        ) {

          text =
            "Contrairement aux deux autres, Lucy observe autant la salle que Max.";

        }

        personReveal.innerHTML =
          `<p>${text}</p>`;

        personReveal.classList.add(
          "open"
        );

        playClueSound();

      }
    );

  });


/* =========================================================
   ÉLIE
========================================================= */

const elieTrigger =
  document.getElementById(
    "elieTrigger"
  );

const elieReveal =
  document.getElementById(
    "elieReveal"
  );


elieTrigger?.addEventListener(
  "click",
  () => {

    activateReveal(
      elieTrigger,
      elieReveal,
      STORAGE_ELIE,
      "Possibilités révélées",
      "elie-choice",
      "Hope ne menace pas Élie. Elle lui offre une sortie honorable tout en lui faisant comprendre que les règles ont changé.",
      playRevealSound
    );

  }
);


/* =========================================================
   SUIVI DU CONVOI
========================================================= */

const trackingTrigger =
  document.getElementById(
    "trackingTrigger"
  );

const trackingReveal =
  document.getElementById(
    "trackingReveal"
  );


trackingTrigger?.addEventListener(
  "click",
  () => {

    activateReveal(
      trackingTrigger,
      trackingReveal,
      STORAGE_TRACKING,
      "Suivi actif",
      "elie-tracking",
      "Le Phénix et deux microtraceurs permettent désormais à Peter de suivre certains déplacements d’Élie.",
      playAnalysisSound
    );

  }
);


/* =========================================================
   APPEL
========================================================= */

const callTrigger =
  document.getElementById(
    "callTrigger"
  );

const callReveal =
  document.getElementById(
    "callReveal"
  );


callTrigger?.addEventListener(
  "click",
  () => {

    activateReveal(
      callTrigger,
      callReveal,
      STORAGE_CALL,
      "Communication écoutée",
      "mysterious-woman",
      "Élie parle avec une femme dont l’identité reste inconnue.",
      playDataSound
    );

  }
);


/* =========================================================
   EFFET PAPILLON
========================================================= */

const butterflyTrigger =
  document.getElementById(
    "butterflyTrigger"
  );

const butterflyReveal =
  document.getElementById(
    "butterflyReveal"
  );


butterflyTrigger?.addEventListener(
  "click",
  () => {

    activateReveal(
      butterflyTrigger,
      butterflyReveal,
      STORAGE_BUTTERFLY,
      "Conséquences observées",
      "butterfly",
      "Le geste de Lucy envers Clark a provoqué une chaîne d’événements qu’aucun d’eux ne pouvait prévoir.",
      playSentinelSound
    );

  }
);


/* =========================================================
   RÉSONANCE ROOT / LUCY
========================================================= */

const resonanceTrigger =
  document.getElementById(
    "resonanceTrigger"
  );

const resonanceReveal =
  document.getElementById(
    "resonanceReveal"
  );


resonanceTrigger?.addEventListener(
  "click",
  () => {

    activateReveal(
      resonanceTrigger,
      resonanceReveal,
      STORAGE_RESONANCE,
      "Résonance observée",
      "root-lucy-resonance",
      "Quelque chose semble réagir lorsque Root et Lucy entrent en contact. Hope est la seule à avoir observé les deux réactions.",
      playMarkSound
    );

  }
);


/* =========================================================
   RESTAURATION DES INTERACTIONS
========================================================= */

const savedInteractions = [

  [
    STORAGE_ANNA,
    annaTrigger,
    annaReveal,
    "Anna observée"
  ],

  [
    STORAGE_ELIE,
    elieTrigger,
    elieReveal,
    "Possibilités révélées"
  ],

  [
    STORAGE_TRACKING,
    trackingTrigger,
    trackingReveal,
    "Suivi actif"
  ],

  [
    STORAGE_CALL,
    callTrigger,
    callReveal,
    "Communication écoutée"
  ],

  [
    STORAGE_BUTTERFLY,
    butterflyTrigger,
    butterflyReveal,
    "Conséquences observées"
  ],

  [
    STORAGE_RESONANCE,
    resonanceTrigger,
    resonanceReveal,
    "Résonance observée"
  ]

];


savedInteractions.forEach(
  ([
    key,
    trigger,
    reveal,
    text
  ]) => {

    if (
      localStorage.getItem(
        key
      ) === "1"
    ) {

      reveal?.classList.add(
        "open"
      );

      if (trigger) {

        trigger.classList.add(
          "completed"
        );

        trigger.textContent =
          text;

        trigger.disabled =
          true;

      }

    }

  }
);


/* =========================================================
   MÉMOIRE DU CHAPITRE 4
========================================================= */

const chapter4Finished =
  localStorage.getItem(
    "societeOmbre_chapitre4_termine"
  ) ||
  localStorage.getItem(
    "societeOmbre_chapitre4_finished"
  );


if (
  chapter4Finished === "1"
) {

  const scene2 =
    document.getElementById(
      "scene-2"
    );

  const textBlock =
    scene2?.querySelector(
      ".text-block"
    );

  if (
    textBlock &&
    !document.getElementById(
      "chapter4Memory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );

    memory.id =
      "chapter4Memory";

    memory.className =
      "emphasis";

    memory.style.marginTop =
      "30px";

    memory.textContent =
      "La nuit précédente, Lucy découvrait l’existence des Indécis tandis que Root révélait l’existence d’une mystérieuse clé.";

    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-38"
  );


if (finalScene) {

  const endObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              localStorage.setItem(
                STORAGE_COMPLETED,
                "1"
              );

              localStorage.setItem(
                STORAGE_PROGRESS,
                "1"
              );

            }

          }
        );

      },
      {
        threshold: 0.5
      }
    );

  endObserver.observe(
    finalScene
  );

}


/* =========================================================
   SON D'AMBIANCE
========================================================= */

let audioCtx =
  null;

let masterGain =
  null;

let ambienceOsc1 =
  null;

let ambienceOsc2 =
  null;

let soundActive =
  false;


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
    0.021;

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
    39;

  gain1.gain.value =
    0.62;

  ambienceOsc2.type =
    "triangle";

  ambienceOsc2.frequency.value =
    77;

  gain2.gain.value =
    0.06;

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

        /* rien */

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


soundBtn?.addEventListener(
  "click",
  () => {

    if (soundActive) {

      stopSound();

    } else {

      startSound();

    }

  }
);


/* =========================================================
   PETITS SONS
========================================================= */

function playTone(
  frequency,
  duration,
  volume = 0.04,
  type = "sine"
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
    type;

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


function playClueSound() {

  playTone(
    430,
    0.35,
    0.018
  );

  setTimeout(
    () => {

      playTone(
        575,
        0.45,
        0.015
      );

    },
    100
  );

}


function playRevealSound() {

  playTone(
    420,
    0.65,
    0.022
  );

  setTimeout(
    () => {

      playTone(
        640,
        0.8,
        0.018
      );

    },
    150
  );

}


function playAnalysisSound() {

  playTone(
    490,
    0.45,
    0.018,
    "triangle"
  );

  setTimeout(
    () => {

      playTone(
        620,
        0.6,
        0.016,
        "sine"
      );

    },
    120
  );

}


function playDataSound() {

  playTone(
    360,
    0.35,
    0.018,
    "square"
  );

  setTimeout(
    () => {

      playTone(
        440,
        0.42,
        0.015,
        "triangle"
      );

    },
    110
  );

}


function playMarkSound() {

  playTone(
    350,
    0.75,
    0.02
  );

  setTimeout(
    () => {

      playTone(
        470,
        0.9,
        0.018
      );

    },
    160
  );

  setTimeout(
    () => {

      playTone(
        610,
        1.0,
        0.015
      );

    },
    310
  );

}


function playSentinelSound() {

  playTone(
    420,
    0.75,
    0.02
  );

  setTimeout(
    () => {

      playTone(
        560,
        0.9,
        0.018
      );

    },
    170
  );

  setTimeout(
    () => {

      playTone(
        710,
        1.05,
        0.014
      );

    },
    330
  );

}


function playSecretSound() {

  playTone(
    540,
    0.65,
    0.022
  );

  setTimeout(
    () => {

      playTone(
        760,
        0.8,
        0.018
      );

    },
    140
  );

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key ===
      "Escape"
    ) {

      closeMenu();

      hideSecretPopup();

    }

  }
);


/* =========================================================
   SAUVEGARDE AVANT QUITTER
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    if (
      params.get("lecture") ===
      "recommencer"
    ) {
      return;
    }

    localStorage.setItem(
      STORAGE_SCROLL,
      Math.round(
        window.scrollY
      )
    );

    localStorage.setItem(
      STORAGE_PROGRESS,
      "1"
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


});
