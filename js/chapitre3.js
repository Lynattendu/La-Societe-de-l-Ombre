/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 3 — LA CONFIANCE
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
   CLÉS LOCALSTORAGE
========================================================= */

const STORAGE_SCROLL =
  "societeOmbre_chapitre3_scroll";

const STORAGE_PROGRESS =
  "societeOmbre_chapitre3_progression";

const STORAGE_COMPLETED =
  "societeOmbre_chapitre3_termine";

const STORAGE_SHIELD =
  "societeOmbre_chapitre3_shield";

const STORAGE_HOLOGRAM =
  "societeOmbre_chapitre3_hologram";

const STORAGE_HOPE_CONFIRM =
  "societeOmbre_chapitre3_hopeConfirm";

const STORAGE_ROOT_MARK =
  "societeOmbre_chapitre3_rootMark";

const STORAGE_SECRETS =
  "societeOmbre_chapitre3_secrets";


/* =========================================================
   COMPATIBILITÉ ANCIENNE SAUVEGARDE
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre3_finished"
  ) === "1"
) {

  localStorage.setItem(
    STORAGE_COMPLETED,
    "1"
  );

}


/* =========================================================
   MODE DE LECTURE
========================================================= */

const urlParams =
  new URLSearchParams(
    window.location.search
  );

const lectureMode =
  urlParams.get(
    "lecture"
  );


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

        if (
          entry.isIntersecting
        ) {

          const scene =
            entry.target;

          scene.classList.add(
            "is-visible"
          );

          animateParagraphs(
            scene
          );

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
   BARRE DE PROGRESSION
========================================================= */

function updateProgress() {

  if (!progressFill) {
    return;
  }


  const scrollTop =
    window.scrollY;


  const documentHeight =
    document.documentElement.scrollHeight -
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
   REPRISE DEPUIS LE MENU GÉNÉRAL
========================================================= */

if (
  lectureMode ===
  "reprendre"
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
   RECOMMENCER DEPUIS LE MENU GÉNÉRAL
========================================================= */

if (
  lectureMode ===
  "recommencer"
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
          currentScene.nextElementSibling;


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
   REPRENDRE DEPUIS LE MENU INTERNE
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

}


/* =========================================================
   RECOMMENCER LE CHAPITRE
========================================================= */

function restartChapterFunction() {

  const prefix =
    "societeOmbre_chapitre3_";


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
    "chapitre3.html?lecture=recommencer";

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
    !secrets.includes(
      secret
    )
  ) {

    secrets.push(
      secret
    );


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
      () => {

        hideSecretPopup();

      },
      3000
    );

}


/* =========================================================
   INTERACTION 1
   BOUCLIER D'ANNA
========================================================= */

const shieldTrigger =
  document.getElementById(
    "shieldTrigger"
  );


const shieldScene =
  document.getElementById(
    "scene-15"
  );


function activateShield() {

  localStorage.setItem(
    STORAGE_SHIELD,
    "1"
  );


  if (shieldScene) {

    shieldScene.classList.add(
      "unlocked"
    );

  }


  if (shieldTrigger) {

    shieldTrigger.classList.add(
      "completed"
    );


    shieldTrigger.textContent =
      "Protection activée";


    shieldTrigger.disabled =
      true;

  }


  playRevealSound();


  showSecret(
    "anna-shield",
    "Le dispositif réagit avant l’impact. Il protège Anna sans la rendre invulnérable."
  );


  setTimeout(
    () => {

      if (shieldScene) {

        shieldScene.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    },
    500
  );

}


if (shieldTrigger) {

  shieldTrigger.addEventListener(
    "click",
    activateShield
  );

}


if (
  localStorage.getItem(
    STORAGE_SHIELD
  ) === "1"
) {

  if (shieldScene) {

    shieldScene.classList.add(
      "unlocked"
    );

  }


  if (shieldTrigger) {

    shieldTrigger.classList.add(
      "completed"
    );


    shieldTrigger.textContent =
      "Protection activée";


    shieldTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 2
   BIO-HOLOPHONE
========================================================= */

const hologramTrigger =
  document.getElementById(
    "hologramTrigger"
  );


const hologramReveal =
  document.getElementById(
    "hologramReveal"
  );


function activateHologram() {

  localStorage.setItem(
    STORAGE_HOLOGRAM,
    "1"
  );


  if (hologramReveal) {

    hologramReveal.classList.add(
      "open"
    );

  }


  if (hologramTrigger) {

    hologramTrigger.classList.add(
      "completed"
    );


    hologramTrigger.textContent =
      "Bio-holophone actif";


    hologramTrigger.disabled =
      true;

  }


  playHologramSound();


  showSecret(
    "bio-holophone",
    "La nouvelle génération développée par Peter s’adapte progressivement aux caractéristiques biologiques de son utilisateur."
  );

}


if (hologramTrigger) {

  hologramTrigger.addEventListener(
    "click",
    activateHologram
  );

}


if (
  localStorage.getItem(
    STORAGE_HOLOGRAM
  ) === "1"
) {

  if (hologramReveal) {

    hologramReveal.classList.add(
      "open"
    );

  }


  if (hologramTrigger) {

    hologramTrigger.classList.add(
      "completed"
    );


    hologramTrigger.textContent =
      "Bio-holophone actif";


    hologramTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 3
   CONFIRMATION DES INDICES DE LUCY
========================================================= */

const hopeConfirmButtons =
  document.querySelectorAll(
    "[data-hope-confirm]"
  );


const hopeConfirmResult =
  document.getElementById(
    "hopeConfirmResult"
  );


const hopeConfirmTexts = {

  crash:
    "CONFIRMÉ : Hope reconnaît avoir survécu au crash de l’A380 en Chine.",

  enfant:
    "CONFIRMÉ : la fillette disparue des archives correspond bien à Hope.",

  absence:
    "CONFIRMÉ : Hope a vécu durant des années hors du système administratif classique."

};


function getHopeConfirmations() {

  try {

    return JSON.parse(
      localStorage.getItem(
        STORAGE_HOPE_CONFIRM
      )
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveHopeConfirmations(list) {

  localStorage.setItem(
    STORAGE_HOPE_CONFIRM,
    JSON.stringify(
      list
    )
  );

}


function updateHopeConfirmations(
  showFinalSecret = false
) {

  const found =
    getHopeConfirmations();


  hopeConfirmButtons.forEach(
    (button) => {

      const value =
        button.dataset.hopeConfirm;


      if (
        found.includes(
          value
        )
      ) {

        button.classList.add(
          "confirmed"
        );

      }

    }
  );


  if (
    found.length ===
      hopeConfirmButtons.length &&
    hopeConfirmButtons.length > 0
  ) {

    if (hopeConfirmResult) {

      hopeConfirmResult.innerHTML =
        `
          <strong>
            IA2 — hypothèse consolidée
          </strong>

          <br><br>

          Les principaux éléments
          découverts par Lucy au chapitre précédent
          viennent d’être confirmés
          directement par Hope.

          <br><br>

          Pour la première fois,
          l’enquête et son récit
          racontent la même histoire.
        `;

    }


    if (showFinalSecret) {

      showSecret(
        "hope-confirmed",
        "L’enquête de Lucy n’était pas fausse. Elle était simplement incomplète."
      );

    }

  }

}


hopeConfirmButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.hopeConfirm;


        const found =
          getHopeConfirmations();


        let newlyDiscovered =
          false;


        if (
          !found.includes(
            value
          )
        ) {

          found.push(
            value
          );


          saveHopeConfirmations(
            found
          );


          button.classList.add(
            "confirmed"
          );


          playClueSound();


          newlyDiscovered =
            true;

        }


        if (
          hopeConfirmResult &&
          hopeConfirmTexts[value]
        ) {

          hopeConfirmResult.innerHTML =
            hopeConfirmTexts[value];

        }


        const completedNow =
          newlyDiscovered &&
          found.length ===
            hopeConfirmButtons.length;


        updateHopeConfirmations(
          completedNow
        );

      }
    );

  }
);


updateHopeConfirmations(
  false
);


/* =========================================================
   INTERACTION 4
   MARQUE AU POIGNET DE ROOT
========================================================= */

const rootMarkTrigger =
  document.getElementById(
    "rootMarkTrigger"
  );


const rootMarkReveal =
  document.getElementById(
    "rootMarkReveal"
  );


function revealRootMark() {

  localStorage.setItem(
    STORAGE_ROOT_MARK,
    "1"
  );


  if (rootMarkReveal) {

    rootMarkReveal.classList.add(
      "open"
    );

  }


  if (rootMarkTrigger) {

    rootMarkTrigger.classList.add(
      "completed"
    );


    rootMarkTrigger.textContent =
      "Marque révélée";


    rootMarkTrigger.disabled =
      true;

  }


  playMarkSound();


  showSecret(
    "root-mark",
    "Pour les Sentinelles, cette marque n’est pas un simple symbole : elle indique qu’un chemin plus ancien précède celui qui la porte."
  );

}


if (rootMarkTrigger) {

  rootMarkTrigger.addEventListener(
    "click",
    revealRootMark
  );

}


if (
  localStorage.getItem(
    STORAGE_ROOT_MARK
  ) === "1"
) {

  if (rootMarkReveal) {

    rootMarkReveal.classList.add(
      "open"
    );

  }


  if (rootMarkTrigger) {

    rootMarkTrigger.classList.add(
      "completed"
    );


    rootMarkTrigger.textContent =
      "Marque révélée";


    rootMarkTrigger.disabled =
      true;

  }

}


/* =========================================================
   MÉMOIRE DU PACTE DU CHAPITRE 2
========================================================= */

const previousPact =
  localStorage.getItem(
    "societeOmbre_chapitre2_pact"
  );


if (
  previousPact === "1"
) {

  const pactScene =
    document.getElementById(
      "scene-9"
    );


  const textBlock =
    pactScene?.querySelector(
      ".text-block"
    );


  if (
    textBlock &&
    !document.getElementById(
      "chapter2PactMemory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "chapter2PactMemory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "32px";


    memory.style.padding =
      "18px 12px";


    memory.style.borderTop =
      "1px solid rgba(231,189,114,.24)";


    memory.style.borderBottom =
      "1px solid rgba(231,189,114,.24)";


    memory.textContent =
      "Lucy a déjà accepté cet accord. Betty est maintenant invitée à entrer, elle aussi, dans ce cercle de confiance.";


    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   MÉMOIRE DU CHOIX DU PROLOGUE
========================================================= */

const prologueChoice =
  localStorage.getItem(
    "societeOmbre_premierChoix"
  );


if (prologueChoice) {

  const scene27 =
    document.getElementById(
      "scene-27"
    );


  const textBlock =
    scene27?.querySelector(
      ".text-block"
    );


  if (
    textBlock &&
    !document.getElementById(
      "chapter3PrologueMemory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "chapter3PrologueMemory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "36px";


    if (
      prologueChoice ===
      "eveil"
    ) {

      memory.textContent =
        "Vous aviez choisi d’ouvrir les yeux. Hope commence maintenant à montrer ce qui se cachait derrière les apparences.";

    }


    if (
      prologueChoice ===
      "illusion"
    ) {

      memory.textContent =
        "Vous aviez choisi l’illusion. Pourtant, les apparences commencent maintenant à se fissurer.";

    }


    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const scene50 =
  document.getElementById(
    "scene-50"
  );


if (scene50) {

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
    scene50
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
    0.022;


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
    41;


  gain1.gain.value =
    0.63;


  ambienceOsc2.type =
    "triangle";


  ambienceOsc2.frequency.value =
    82;


  gain2.gain.value =
    0.065;


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
        580,
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
    160
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


function playHologramSound() {

  playTone(
    520,
    0.45,
    0.018,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        720,
        0.65,
        0.015,
        "triangle"
      );

    },
    120
  );

}


function playMarkSound() {

  playTone(
    350,
    0.7,
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
   SAUVEGARDE AVANT DE QUITTER
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


/* =========================================================
   FIN INITIALISATION
========================================================= */

});
