/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 2 — L’UNION FAIT LA FORCE
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
  "societeOmbre_chapitre2_scroll";

const STORAGE_ROOT_CLUES =
  "societeOmbre_chapitre2_rootClues";

const STORAGE_CAVE_SENSES =
  "societeOmbre_chapitre2_caveSenses";

const STORAGE_HOPE_CLUES =
  "societeOmbre_chapitre2_hopeClues";

const STORAGE_PACT =
  "societeOmbre_chapitre2_pact";

const STORAGE_SECRETS =
  "societeOmbre_chapitre2_secrets";

const STORAGE_FINISHED =
  "societeOmbre_chapitre2_finished";


/* =========================================================
   VISUELS MANQUANTS
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
   APPARITION PROGRESSIVE DES PARAGRAPHES
========================================================= */

function animateParagraphs(scene) {

  if (
    scene.dataset.textAnimated === "1"
  ) {
    return;
  }

  scene.dataset.textAnimated = "1";

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
   BOUTONS CONTINUER
========================================================= */

document
  .querySelectorAll("[data-next]")
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
    STORAGE_ROOT_CLUES
  );

  localStorage.removeItem(
    STORAGE_CAVE_SENSES
  );

  localStorage.removeItem(
    STORAGE_HOPE_CLUES
  );

  localStorage.removeItem(
    STORAGE_PACT
  );

  localStorage.removeItem(
    STORAGE_FINISHED
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeMenu();

  setTimeout(
    () => {
      location.reload();
    },
    500
  );

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
      () => {

        secretPopup.classList.remove(
          "show"
        );

        secretPopup.setAttribute(
          "aria-hidden",
          "true"
        );

      },
      3200
    );

}


/* =========================================================
   INTERACTION 1
   IA2 — ANALYSE DES INDICES SUR ROOT
========================================================= */

const rootClues =
  document.querySelectorAll(
    '[data-root-clue]'
  );

const rootClueResult =
  document.getElementById(
    "rootClueResult"
  );

const rootClueContinue =
  document.getElementById(
    "rootClueContinue"
  );


function getRootClues() {

  try {

    return JSON.parse(
      localStorage.getItem(
        STORAGE_ROOT_CLUES
      )
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveRootClues(list) {

  localStorage.setItem(
    STORAGE_ROOT_CLUES,
    JSON.stringify(list)
  );

}


function updateRootInvestigation() {

  const found =
    getRootClues();

  rootClues.forEach(
    (clue) => {

      const value =
        clue.dataset.rootClue;

      if (
        found.includes(value)
      ) {

        clue.classList.add(
          "found"
        );

      }

    }
  );


  if (
    rootClueResult &&
    found.length > 0
  ) {

    rootClueResult.innerHTML =
      `
        <strong>IA2</strong><br><br>
        ${found.length} indice${found.length > 1 ? "s" : ""}
        actuellement retenu${found.length > 1 ? "s" : ""}.
      `;

  }


  if (
    found.length >=
    rootClues.length &&
    rootClues.length > 0
  ) {

    if (rootClueResult) {

      rootClueResult.innerHTML =
        `
          <strong>Analyse IA2 terminée.</strong>
          <br><br>
          Les déplacements de Root,
          ses capacités de combat,
          son absence prolongée
          et certaines concordances géographiques
          justifient une enquête approfondie.
          <br><br>
          Aucun de ces éléments,
          pris isolément,
          ne constitue une preuve.
        `;

    }


    if (rootClueContinue) {

      rootClueContinue.hidden =
        false;

      rootClueContinue.classList.add(
        "completed"
      );

    }

  }

}


rootClues.forEach(
  (clue) => {

    clue.addEventListener(
      "click",
      () => {

        const value =
          clue.dataset.rootClue;

        const found =
          getRootClues();

        if (
          !found.includes(value)
        ) {

          found.push(value);

          saveRootClues(found);

          clue.classList.add(
            "found"
          );

          playClueSound();

        }

        updateRootInvestigation();

      }
    );

  }
);


updateRootInvestigation();


/* =========================================================
   BOUTON SUITE ENQUÊTE ROOT
========================================================= */

if (rootClueContinue) {

  rootClueContinue.addEventListener(
    "click",
    () => {

      const target =
        document.getElementById(
          "scene-5"
        ) ||
        document.querySelector(
          '[data-after-root-investigation]'
        );

      if (target) {

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );

}


/* =========================================================
   INTERACTION 2
   CASCADE DES SECRETS ENFOUIS
========================================================= */

const sensoryButtons =
  document.querySelectorAll(
    "[data-sense]"
  );

const sensoryResult =
  document.getElementById(
    "sensoryResult"
  );

const caveReveal =
  document.getElementById(
    "caveReveal"
  );


function getCaveSenses() {

  try {

    return JSON.parse(
      localStorage.getItem(
        STORAGE_CAVE_SENSES
      )
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveCaveSenses(list) {

  localStorage.setItem(
    STORAGE_CAVE_SENSES,
    JSON.stringify(list)
  );

}


const senseTexts = {

  eau:
    "L’eau ne tombe pas seulement. Son rythme change légèrement selon la roche qu’elle rencontre.",

  roche:
    "La paroi semble irrégulière. Certaines cavités ne correspondent pas à une formation entièrement naturelle.",

  son:
    "Derrière le grondement de la cascade, Root distingue des résonances différentes. Certaines semblent venir de l’intérieur de la roche.",

  lumiere:
    "Les rares rayons de lumière révèlent des reflets inhabituels sur une zone précise de la paroi."

};


function updateCaveInteraction() {

  const discovered =
    getCaveSenses();

  sensoryButtons.forEach(
    (button) => {

      const sense =
        button.dataset.sense;

      if (
        discovered.includes(
          sense
        )
      ) {

        button.classList.add(
          "discovered"
        );

      }

    }
  );


  if (
    discovered.length >=
    sensoryButtons.length &&
    sensoryButtons.length > 0
  ) {

    if (sensoryResult) {

      sensoryResult.innerHTML =
        `
          <strong>
            Root comprend enfin.
          </strong>
          <br><br>
          Elle cherche depuis le début
          comme une archéologue.
          <br><br>
          Hope lui avait pourtant demandé
          de faire autre chose.
          <br><br>
          Ressentir.
          Écouter.
          Faire corps avec la grotte.
        `;

    }

    if (caveReveal) {

      caveReveal.classList.add(
        "open"
      );

    }

  }

}


sensoryButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const sense =
          button.dataset.sense;

        const discovered =
          getCaveSenses();

        if (
          !discovered.includes(
            sense
          )
        ) {

          discovered.push(
            sense
          );

          saveCaveSenses(
            discovered
          );

          button.classList.add(
            "discovered"
          );

          playClueSound();

        }

        if (
          sensoryResult &&
          senseTexts[sense]
        ) {

          sensoryResult.innerHTML =
            senseTexts[sense];

        }

        updateCaveInteraction();

      }
    );

  }
);


updateCaveInteraction();


/* =========================================================
   OUVERTURE / RÉVÉLATION BOÎTE DE PANDORE
========================================================= */

const pandoraButton =
  document.getElementById(
    "pandoraButton"
  );

const pandoraReveal =
  document.getElementById(
    "pandoraReveal"
  );


if (pandoraButton) {

  pandoraButton.addEventListener(
    "click",
    () => {

      pandoraButton.classList.add(
        "completed"
      );

      pandoraButton.textContent =
        "Boîte découverte";

      if (pandoraReveal) {

        pandoraReveal.classList.add(
          "open"
        );

      }

      showSecret(
        "pandora-transformation",
        "La boîte de Pandore ne semble pas avoir été conçue pour être transportée. Elle a choisi une nouvelle forme."
      );

      playRevealSound();

    }
  );

}


/* =========================================================
   INTERACTION 3
   ENQUÊTE IA2 SUR HOPE
========================================================= */

const hopeClues =
  document.querySelectorAll(
    "[data-hope-clue]"
  );

const hopeClueResult =
  document.getElementById(
    "hopeClueResult"
  );

const hopeCompareBtn =
  document.getElementById(
    "hopeCompareBtn"
  );

const hopeComparison =
  document.getElementById(
    "hopeComparison"
  );


function getHopeClues() {

  try {

    return JSON.parse(
      localStorage.getItem(
        STORAGE_HOPE_CLUES
      )
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveHopeClues(list) {

  localStorage.setItem(
    STORAGE_HOPE_CLUES,
    JSON.stringify(list)
  );

}


const hopeTexts = {

  traces:
    "Les premières traces administratives fiables de Hope Awake n’apparaissent qu’environ quatre ans plus tôt.",

  ted:
    "Ted Awake a été recueilli puis adopté après la disparition de sa famille.",

  crash:
    "Les archives mentionnent un crash d’Airbus A380 en Chine.",

  enfant:
    "Une fillette âgée de douze ans figurait parmi les passagers. Son corps n’a jamais été retrouvé."

};


function updateHopeInvestigation() {

  const found =
    getHopeClues();

  hopeClues.forEach(
    (clue) => {

      const value =
        clue.dataset.hopeClue;

      if (
        found.includes(value)
      ) {

        clue.classList.add(
          "found"
        );

      }

    }
  );


  if (
    found.length >=
    hopeClues.length &&
    hopeClues.length > 0
  ) {

    if (hopeClueResult) {

      hopeClueResult.innerHTML =
        `
          <strong>
            Tous les éléments sont maintenant reliés.
          </strong>
          <br><br>
          Il reste une hypothèse à tester :
          comparer la fillette disparue
          à Hope adulte.
        `;

    }


    if (hopeCompareBtn) {

      hopeCompareBtn.hidden =
        false;

    }

  }

}


hopeClues.forEach(
  (clue) => {

    clue.addEventListener(
      "click",
      () => {

        const value =
          clue.dataset.hopeClue;

        const found =
          getHopeClues();

        if (
          !found.includes(value)
        ) {

          found.push(value);

          saveHopeClues(found);

          clue.classList.add(
            "found"
          );

          playClueSound();

        }

        if (
          hopeClueResult &&
          hopeTexts[value]
        ) {

          hopeClueResult.innerHTML =
            hopeTexts[value];

        }

        updateHopeInvestigation();

      }
    );

  }
);


updateHopeInvestigation();


/* =========================================================
   COMPARAISON MORPHOLOGIQUE HOPE
========================================================= */

if (hopeCompareBtn) {

  hopeCompareBtn.addEventListener(
    "click",
    () => {

      hopeCompareBtn.classList.add(
        "completed"
      );

      hopeCompareBtn.textContent =
        "Analyse terminée";

      if (hopeComparison) {

        hopeComparison.classList.add(
          "open"
        );

        hopeComparison.innerHTML =
          `
            <strong>
              IA2 — Concordance morphologique élevée
            </strong>
            <br><br>
            Structure osseuse :
            compatible.
            <br>
            Écartement des yeux :
            compatible.
            <br>
            Proportions faciales :
            compatibles.
            <br><br>
            Conclusion :
            les données justifient une enquête approfondie,
            mais ne permettent pas une identification certaine.
          `;

      }

      playRevealSound();

      showSecret(
        "hope-enfant",
        "Hope pourrait être l’enfant disparue du crash. Mais Lucy ne possède encore aucune preuve définitive."
      );

    }
  );

}


/* =========================================================
   MESSAGE ROOT / LUCY
========================================================= */

const rootMessageBtn =
  document.getElementById(
    "rootMessageBtn"
  );

const rootMessageReveal =
  document.getElementById(
    "rootMessageReveal"
  );


if (rootMessageBtn) {

  rootMessageBtn.addEventListener(
    "click",
    () => {

      if (rootMessageReveal) {

        rootMessageReveal.classList.add(
          "open"
        );

      }

      rootMessageBtn.classList.add(
        "completed"
      );

      rootMessageBtn.textContent =
        "Message lu";

      playRevealSound();

    }
  );

}


/* =========================================================
   SYSTÈME DE SÉCURITÉ AWAKE
========================================================= */

const securityScanBtn =
  document.getElementById(
    "securityScanBtn"
  );

const securityReveal =
  document.getElementById(
    "securityReveal"
  );


if (securityScanBtn) {

  securityScanBtn.addEventListener(
    "click",
    () => {

      securityScanBtn.classList.add(
        "completed"
      );

      securityScanBtn.textContent =
        "Analyse terminée";

      if (securityReveal) {

        securityReveal.classList.add(
          "open"
        );

      }

      playRevealSound();

      showSecret(
        "security-link",
        "Le système de l’hacienda Awake et celui de Root semblent partager la même philosophie technologique."
      );

    }
  );

}


/* =========================================================
   INTERACTION 4
   PACTE DE VÉRITÉ
========================================================= */

const pactButton =
  document.getElementById(
    "pactButton"
  ) ||
  document.querySelector(
    "[data-pact-hand]"
  );

const pactZone =
  document.getElementById(
    "pactZone"
  ) ||
  document.querySelector(
    ".hand-zone"
  );

const pactResult =
  document.getElementById(
    "pactResult"
  );

const chapterEnd =
  document.getElementById(
    "chapter-end"
  );


function completePact() {

  localStorage.setItem(
    STORAGE_PACT,
    "1"
  );

  localStorage.setItem(
    STORAGE_FINISHED,
    "1"
  );


  if (pactButton) {

    pactButton.classList.add(
      "completed"
    );

    pactButton.textContent =
      "Pacte accepté";

    pactButton.disabled =
      true;

  }


  if (pactZone) {

    pactZone.classList.add(
      "completed"
    );

  }


  if (pactResult) {

    pactResult.innerHTML =
      `
        <p>
          Lucy prend une inspiration.
        </p>

        <p>
          Puis pose lentement sa main
          sur celles des trois autres.
        </p>

        <p class="impact-text">
          Aucun mensonge.
        </p>

        <p>
          Pour la première fois depuis longtemps,
          elle accepte d’accorder sa confiance
          sans disposer de toutes les preuves.
        </p>

        <p class="emphasis">
          L’union fait la force.
        </p>
      `;

    pactResult.classList.add(
      "open"
    );

  }

  playPactSound();


  setTimeout(
    () => {

      if (chapterEnd) {

        chapterEnd.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    },
    3500
  );

}


if (pactButton) {

  pactButton.addEventListener(
    "click",
    completePact
  );

}


if (
  localStorage.getItem(
    STORAGE_PACT
  ) === "1"
) {

  if (pactButton) {

    pactButton.classList.add(
      "completed"
    );

    pactButton.textContent =
      "Pacte accepté";

    pactButton.disabled =
      true;

  }

  if (pactZone) {

    pactZone.classList.add(
      "completed"
    );

  }

  if (pactResult) {

    pactResult.classList.add(
      "open"
    );

  }

}


/* =========================================================
   LIEN AVEC LE CHOIX DU PROLOGUE
========================================================= */

const prologueChoice =
  localStorage.getItem(
    "societeOmbre_premierChoix"
  );

const pactMemory =
  document.getElementById(
    "pactMemory"
  );


if (pactMemory) {

  if (
    prologueChoice === "eveil"
  ) {

    pactMemory.textContent =
      "Vous aviez choisi d’ouvrir les yeux. Lucy choisit maintenant, elle aussi, de regarder au-delà de ce que les faits peuvent mesurer.";

  }

  if (
    prologueChoice === "illusion"
  ) {

    pactMemory.textContent =
      "Vous aviez choisi l’illusion. Pourtant, certaines vérités semblent continuer à vous poursuivre.";

  }

}


/* =========================================================
   SON
========================================================= */

let audioCtx = null;
let masterGain = null;
let ambienceOsc1 = null;
let ambienceOsc2 = null;
let soundActive = false;


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
    40;

  gain1.gain.value =
    0.65;


  ambienceOsc2.type =
    "triangle";

  ambienceOsc2.frequency.value =
    79;

  gain2.gain.value =
    0.07;


  ambienceOsc1
    .connect(gain1)
    .connect(masterGain);

  ambienceOsc2
    .connect(gain2)
    .connect(masterGain);


  ambienceOsc1.start();

  ambienceOsc2.start();


  soundActive = true;


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

  masterGain.gain
    .exponentialRampToValueAtTime(
      0.0001,
      audioCtx.currentTime +
      0.35
    );


  setTimeout(
    () => {

      try {

        ambienceOsc1?.stop();
        ambienceOsc2?.stop();

        audioCtx.close();

      } catch (error) {
        /* rien */
      }


      audioCtx = null;
      masterGain = null;
      ambienceOsc1 = null;
      ambienceOsc2 = null;

    },
    450
  );


  soundActive = false;


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
   EFFETS SONORES
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
        630,
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


function playPactSound() {

  playTone(
    330,
    1.1,
    0.02
  );

  setTimeout(
    () => {

      playTone(
        495,
        1.2,
        0.02
      );

    },
    170
  );

  setTimeout(
    () => {

      playTone(
        660,
        1.3,
        0.018
      );

    },
    340
  );

}


/* =========================================================
   ESCAPE FERME LE MENU
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeMenu();

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
