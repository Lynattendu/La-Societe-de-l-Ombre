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
   CLÉS LOCALSTORAGE
========================================================= */

const STORAGE_SCROLL =
  "societeOmbre_chapitre5_scroll";

const STORAGE_SOUND =
  "societeOmbre_chapitre5_sound";

const STORAGE_NEXUS =
  "societeOmbre_chapitre5_nexus";

const STORAGE_PERSON =
  "societeOmbre_chapitre5_person";

const STORAGE_PROBLEM =
  "societeOmbre_chapitre5_problem";

const STORAGE_VIEWPOINT =
  "societeOmbre_chapitre5_viewpoint";

const STORAGE_ELIE_OPTIONS =
  "societeOmbre_chapitre5_elieOptions";

const STORAGE_PHOENIX =
  "societeOmbre_chapitre5_phoenix";

const STORAGE_CALL =
  "societeOmbre_chapitre5_call";

const STORAGE_TECH =
  "societeOmbre_chapitre5_techChoice";

const STORAGE_BUTTERFLY =
  "societeOmbre_chapitre5_butterfly";

const STORAGE_RESONANCE =
  "societeOmbre_chapitre5_resonance";

const STORAGE_GROUP =
  "societeOmbre_chapitre5_group";

const STORAGE_SECRETS =
  "societeOmbre_chapitre5_secrets";


/* =========================================================
   OUTILS
========================================================= */

function getStoredArray(key) {

  try {

    const data = localStorage.getItem(key);

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch (error) {

    console.warn(
      "Erreur lecture localStorage :",
      key,
      error
    );

    return [];

  }

}


function saveStoredArray(key, array) {

  localStorage.setItem(
    key,
    JSON.stringify(array)
  );

}


function addStoredValue(key, value) {

  const values =
    getStoredArray(key);

  if (!values.includes(value)) {

    values.push(value);

    saveStoredArray(
      key,
      values
    );

  }

  return values;

}


function showResult(element, html) {

  if (!element) {
    return;
  }

  element.innerHTML = html;

  element.classList.add("visible");

}


function showSecret(message) {

  if (!secretPopup) {
    return;
  }

  secretPopup.textContent = message;

  secretPopup.classList.add("show");

  clearTimeout(showSecret.timeout);

  showSecret.timeout =
    setTimeout(() => {

      secretPopup.classList.remove("show");

    }, 3500);

}


function addSecret(secretName, message) {

  const secrets =
    addStoredValue(
      STORAGE_SECRETS,
      secretName
    );

  if (message) {

    showSecret(message);

  }

  return secrets;

}


/* =========================================================
   SONS
========================================================= */

let soundEnabled =
  localStorage.getItem(STORAGE_SOUND) !== "off";


function updateSoundButton() {

  if (!soundBtn) {
    return;
  }

  soundBtn.textContent =
    soundEnabled
      ? "🔊"
      : "🔇";

  soundBtn.setAttribute(
    "aria-label",
    soundEnabled
      ? "Couper les sons"
      : "Activer les sons"
  );

}


function playTone({
  frequency = 440,
  duration = 0.15,
  type = "sine",
  volume = 0.035
} = {}) {

  if (!soundEnabled) {
    return;
  }

  try {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContext) {
      return;
    }

    const context =
      new AudioContext();

    const oscillator =
      context.createOscillator();

    const gain =
      context.createGain();

    oscillator.type =
      type;

    oscillator.frequency.value =
      frequency;

    gain.gain.value =
      volume;

    oscillator.connect(gain);

    gain.connect(
      context.destination
    );

    oscillator.start();

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + duration
    );

    oscillator.stop(
      context.currentTime + duration
    );

    setTimeout(() => {

      context.close();

    }, 300);

  } catch (error) {

    console.warn(
      "Son non disponible :",
      error
    );

  }

}


function playObserveSound() {

  playTone({
    frequency: 520,
    duration: 0.12,
    type: "sine",
    volume: 0.03
  });

}


function playChoiceSound() {

  playTone({
    frequency: 420,
    duration: 0.18,
    type: "triangle",
    volume: 0.035
  });

}


function playSecretSound() {

  playTone({
    frequency: 760,
    duration: 0.28,
    type: "sine",
    volume: 0.04
  });

}


/* =========================================================
   MENU
========================================================= */

function openMenu() {

  if (!chapterMenu) {
    return;
  }

  chapterMenu.classList.add("open");

  chapterMenu.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeMenu() {

  if (!chapterMenu) {
    return;
  }

  chapterMenu.classList.remove("open");

  chapterMenu.setAttribute(
    "aria-hidden",
    "true"
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
    event => {

      if (event.target === chapterMenu) {

        closeMenu();

      }

    }
  );

}


if (soundBtn) {

  soundBtn.addEventListener(
    "click",
    () => {

      soundEnabled =
        !soundEnabled;

      localStorage.setItem(
        STORAGE_SOUND,
        soundEnabled
          ? "on"
          : "off"
      );

      updateSoundButton();

      if (soundEnabled) {

        playObserveSound();

      }

    }
  );

}


updateSoundButton();


/* =========================================================
   PROGRESSION
========================================================= */

function updateProgress() {

  if (!progressFill) {
    return;
  }

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const currentScroll =
    window.scrollY;

  const percent =
    documentHeight > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (currentScroll / documentHeight) * 100
          )
        )
      : 0;

  progressFill.style.width =
    `${percent}%`;

}


window.addEventListener(
  "scroll",
  updateProgress,
  { passive: true }
);


window.addEventListener(
  "resize",
  updateProgress
);


updateProgress();


/* =========================================================
   SAUVEGARDE DU SCROLL
========================================================= */

let scrollSaveTimer = null;


window.addEventListener(
  "scroll",
  () => {

    clearTimeout(
      scrollSaveTimer
    );

    scrollSaveTimer =
      setTimeout(() => {

        localStorage.setItem(
          STORAGE_SCROLL,
          String(window.scrollY)
        );

      }, 250);

  },
  { passive: true }
);


/* =========================================================
   REPRENDRE
========================================================= */

if (resumeBtn) {

  resumeBtn.addEventListener(
    "click",
    () => {

      closeMenu();

      const savedScroll =
        Number(
          localStorage.getItem(
            STORAGE_SCROLL
          )
        );

      window.scrollTo({
        top:
          Number.isFinite(savedScroll)
            ? savedScroll
            : 0,
        behavior: "smooth"
      });

    }
  );

}


/* =========================================================
   RECOMMENCER
========================================================= */

function restartChapterProgress() {

  [
    STORAGE_SCROLL,
    STORAGE_NEXUS,
    STORAGE_PERSON,
    STORAGE_PROBLEM,
    STORAGE_VIEWPOINT,
    STORAGE_ELIE_OPTIONS,
    STORAGE_PHOENIX,
    STORAGE_CALL,
    STORAGE_TECH,
    STORAGE_BUTTERFLY,
    STORAGE_RESONANCE,
    STORAGE_GROUP

  ].forEach(key => {

    localStorage.removeItem(key);

  });


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  setTimeout(() => {

    window.location.reload();

  }, 350);

}


if (restartBtn) {

  restartBtn.addEventListener(
    "click",
    restartChapterProgress
  );

}


if (restartChapter) {

  restartChapter.addEventListener(
    "click",
    restartChapterProgress
  );

}


/* =========================================================
   APPARITION DES PARAGRAPHES
========================================================= */

function animateParagraphs(scene) {

  const elements =
    scene.querySelectorAll(
      "p, .dialogue, .interaction-card, .tracking-panel, .links-panel"
    );

  elements.forEach(
    (element, index) => {

      if (
        element.classList.contains(
          "paragraph-visible"
        )
      ) {
        return;
      }

      setTimeout(() => {

        element.classList.add(
          "paragraph-visible"
        );

      }, Math.min(index * 65, 650));

    }
  );

}


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "scene-visible"
            );

            animateParagraphs(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.16
      }
    );


  scenes.forEach(scene => {

    observer.observe(scene);

  });

} else {

  scenes.forEach(scene => {

    scene.classList.add(
      "scene-visible"
    );

    animateParagraphs(scene);

  });

}


/* =========================================================
   BOUTONS CONTINUER
========================================================= */

function scrollToScene(scene) {

  if (!scene) {
    return;
  }

  scene.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


document
  .querySelectorAll("[data-next]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const currentScene =
          button.closest(".scene");

        if (!currentScene) {
          return;
        }

        let nextScene =
          currentScene.nextElementSibling;

        while (
          nextScene &&
          !nextScene.classList.contains("scene")
        ) {

          nextScene =
            nextScene.nextElementSibling;

        }

        playChoiceSound();

        scrollToScene(nextScene);

      }
    );

  });


/* =========================================================
   SCÈNE 2
   EXPLORER LE NEXUS
========================================================= */

const nexusButtons =
  document.querySelectorAll(
    ".nexus-btn"
  );

const nexusResult =
  document.getElementById(
    "nexusResult"
  );


const nexusTexts = {

  architecture:
    `
      <strong>Architecture</strong><br><br>
      Pierre ancienne, végétation, eau et structures contemporaines semblent appartenir au même lieu depuis toujours.
    `,

  cuisine:
    `
      <strong>Cuisine</strong><br><br>
      La France et le Mexique se rencontrent ici dans des associations que personne n’aurait forcément osé imaginer.
    `,

  securite:
    `
      <strong>Sécurité</strong><br><br>
      Certains membres du personnel observent davantage les invités que les assiettes. Au NEXUS, la sécurité se fond dans le décor.
    `

};


function updateNexusResult(
  selected = null
) {

  const visited =
    getStoredArray(
      STORAGE_NEXUS
    );

  let html = "";

  if (
    selected &&
    nexusTexts[selected]
  ) {

    html =
      nexusTexts[selected];

  }


  if (visited.length === 3) {

    html += `
      <div class="secret-discovery">
        <strong>Observation complète</strong><br><br>
        Au NEXUS, presque rien n’est exactement ce qu’il semble être.
      </div>
    `;

  }

  if (html) {

    showResult(
      nexusResult,
      html
    );

  }

}


nexusButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const key =
        button.dataset.nexus;

      const visited =
        addStoredValue(
          STORAGE_NEXUS,
          key
        );

      button.classList.add(
        "selected"
      );

      playObserveSound();

      updateNexusResult(key);


      if (visited.length === 3) {

        addSecret(
          "nexus-observe",
          "Observation découverte — Le NEXUS dissimule plus qu’il ne montre."
        );

      }

    }
  );

});


getStoredArray(
  STORAGE_NEXUS
).forEach(key => {

  const button =
    document.querySelector(
      `.nexus-btn[data-nexus="${key}"]`
    );

  if (button) {

    button.classList.add(
      "selected"
    );

  }

});


if (
  getStoredArray(
    STORAGE_NEXUS
  ).length === 3
) {

  updateNexusResult();

}


/* =========================================================
   SCÈNE 4
   OBSERVER ANNA
========================================================= */

const observeAnna =
  document.getElementById(
    "observeAnna"
  );

const annaResult =
  document.getElementById(
    "annaResult"
  );

let annaObservationCount = 0;


if (observeAnna) {

  observeAnna.addEventListener(
    "click",
    () => {

      annaObservationCount++;

      playObserveSound();


      if (
        annaObservationCount === 1
      ) {

        showResult(
          annaResult,
          "Anna fixe Clark Stephen."
        );

      } else if (
        annaObservationCount === 2
      ) {

        showResult(
          annaResult,
          "Anna fixe toujours Clark Stephen."
        );

      } else {

        showResult(
          annaResult,
          "Anna semble momentanément avoir oublié comment fonctionne la respiration humaine."
        );

      }

    }
  );

}


/* =========================================================
   SCÈNE 5
   OBSERVER ANNA / BETTY / LUCY
========================================================= */

const personButtons =
  document.querySelectorAll(
    ".person-btn"
  );

const personResult =
  document.getElementById(
    "personResult"
  );


const personTexts = {

  anna:
    `
      <strong>Anna</strong><br><br>
      Elle essaie visiblement de mémoriser chaque mot que prononce Max.
    `,

  betty:
    `
      <strong>Betty</strong><br><br>
      Elle paraît amusée, mais remarque immédiatement que Peter regarde régulièrement dans leur direction.
    `,

  lucy:
    `
      <strong>Lucy</strong><br><br>
      Contrairement aux deux autres, Lucy observe autant la salle que Max.
    `

};


personButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const key =
        button.dataset.person;

      addStoredValue(
        STORAGE_PERSON,
        key
      );

      button.classList.add(
        "selected"
      );

      playObserveSound();

      showResult(
        personResult,
        personTexts[key]
      );

    }
  );

});


getStoredArray(
  STORAGE_PERSON
).forEach(key => {

  const button =
    document.querySelector(
      `.person-btn[data-person="${key}"]`
    );

  if (button) {

    button.classList.add(
      "selected"
    );

  }

});


/* =========================================================
   SCÈNE 6
   MÉMOIRE DE CLARK
========================================================= */

const clarkMemoryBtn =
  document.getElementById(
    "clarkMemoryBtn"
  );

const clarkMemoryResult =
  document.getElementById(
    "clarkMemoryResult"
  );


if (
  clarkMemoryBtn &&
  clarkMemoryResult
) {

  clarkMemoryBtn.addEventListener(
    "click",
    () => {

      playObserveSound();

      showResult(
        clarkMemoryResult,
        `
          <strong>Souvenir incomplet</strong><br><br>

          Lucy a autrefois croisé la route de Clark lors d’une intervention.<br><br>

          Son geste a indirectement rendu possible l’audition qui allait changer sa vie.<br><br>

          Un détail banal.<br>
          Une conséquence immense.
        `
      );

      addSecret(
        "clark-butterfly",
        "Observation découverte — Une action minuscule peut modifier toute une vie."
      );

    }
  );

}


/* =========================================================
   SCÈNE 7
   OBSERVER LE PROBLÈME
========================================================= */

const problemButtons =
  document.querySelectorAll(
    ".problem-btn"
  );

const problemResult =
  document.getElementById(
    "problemResult"
  );


const problemTexts = {

  hope:
    `
      <strong>Hope</strong><br><br>
      Elle donne plusieurs instructions très courtes à Peter. Son calme paraît intact, mais son attention s’est totalement déplacée vers l’extérieur.
    `,

  root:
    `
      <strong>Root</strong><br><br>
      Elle semble contrariée. Ce qui vient de se produire ne lui plaît manifestement pas.
    `,

  max:
    `
      <strong>Max</strong><br><br>
      Son sourire a disparu d’un seul coup. Il a compris avant les autres que quelque chose venait de changer.
    `

};


problemButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const key =
        button.dataset.problem;

      addStoredValue(
        STORAGE_PROBLEM,
        key
      );

      button.classList.add(
        "selected"
      );

      playObserveSound();

      showResult(
        problemResult,
        problemTexts[key]
      );

    }
  );

});


getStoredArray(
  STORAGE_PROBLEM
).forEach(key => {

  const button =
    document.querySelector(
      `.problem-btn[data-problem="${key}"]`
    );

  if (button) {

    button.classList.add(
      "selected"
    );

  }

});


/* =========================================================
   SCÈNE 8
   CHOIX DU POINT DE VUE
========================================================= */

const viewpointChoice =
  document.getElementById(
    "viewpointChoice"
  );

const stayLucyBtn =
  document.getElementById(
    "stayLucyBtn"
  );

const followHopeBtn =
  document.getElementById(
    "followHopeBtn"
  );

const lucyView =
  document.getElementById(
    "lucyView"
  );

const hopeView =
  document.getElementById(
    "hopeView"
  );

const goHopeView =
  document.getElementById(
    "goHopeView"
  );

const goLucyView =
  document.getElementById(
    "goLucyView"
  );

const finishViewpoints =
  document.getElementById(
    "finishViewpoints"
  );


let visitedLucyView =
  false;

let visitedHopeView =
  false;


function updateViewpointFinish() {

  if (
    !finishViewpoints
  ) {
    return;
  }

  if (
    visitedLucyView &&
    visitedHopeView
  ) {

    finishViewpoints.hidden =
      false;

  }

}


function showLucyView({
  scroll = true
} = {}) {

  if (!lucyView) {
    return;
  }

  lucyView.hidden =
    false;

  visitedLucyView =
    true;

  addStoredValue(
    STORAGE_VIEWPOINT,
    "lucy"
  );

  updateViewpointFinish();

  if (scroll) {

    setTimeout(() => {

      lucyView.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 50);

  }

}


function showHopeView({
  scroll = true
} = {}) {

  if (!hopeView) {
    return;
  }

  hopeView.hidden =
    false;

  visitedHopeView =
    true;

  addStoredValue(
    STORAGE_VIEWPOINT,
    "hope"
  );

  updateViewpointFinish();

  if (scroll) {

    setTimeout(() => {

      hopeView.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 50);

  }

}


if (stayLucyBtn) {

  stayLucyBtn.addEventListener(
    "click",
    () => {

      playChoiceSound();

      stayLucyBtn.classList.add(
        "selected"
      );

      showLucyView();

    }
  );

}


if (followHopeBtn) {

  followHopeBtn.addEventListener(
    "click",
    () => {

      playChoiceSound();

      followHopeBtn.classList.add(
        "selected"
      );

      showHopeView();

    }
  );

}


if (goHopeView) {

  goHopeView.addEventListener(
    "click",
    () => {

      playChoiceSound();

      showHopeView();

    }
  );

}


if (goLucyView) {

  goLucyView.addEventListener(
    "click",
    () => {

      playChoiceSound();

      showLucyView();

    }
  );

}


if (finishViewpoints) {

  finishViewpoints.addEventListener(
    "click",
    () => {

      playChoiceSound();

      const currentScene =
        finishViewpoints.closest(".scene");

      let nextScene =
        currentScene
          ? currentScene.nextElementSibling
          : null;

      while (
        nextScene &&
        !nextScene.classList.contains("scene")
      ) {

        nextScene =
          nextScene.nextElementSibling;

      }

      scrollToScene(nextScene);

    }
  );

}


const savedViewpoints =
  getStoredArray(
    STORAGE_VIEWPOINT
  );


if (
  savedViewpoints.includes("lucy")
) {

  visitedLucyView =
    true;

  if (lucyView) {

    lucyView.hidden =
      false;

  }

}


if (
  savedViewpoints.includes("hope")
) {

  visitedHopeView =
    true;

  if (hopeView) {

    hopeView.hidden =
      false;

  }

}


updateViewpointFinish();


/* =========================================================
   SCÈNE 8
   LES DEUX OPTIONS DE HOPE
========================================================= */

const elieOptionButtons =
  document.querySelectorAll(
    ".elie-option"
  );

const elieOptionResult =
  document.getElementById(
    "elieOptionResult"
  );


const elieOptionTexts = {

  partir:
    `
      <strong>Vous repartez.</strong><br><br>
      Hope lui offre une sortie honorable : partir sans perdre la face.
    `,

  forcer:
    `
      <strong>Vous forcez le passage.</strong><br><br>
      Cette seconde possibilité ressemble beaucoup moins à une invitation qu’à un avertissement.
    `

};


elieOptionButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const key =
        button.dataset.elieOption;

      addStoredValue(
        STORAGE_ELIE_OPTIONS,
        key
      );

      button.classList.add(
        "selected"
      );

      playChoiceSound();

      showResult(
        elieOptionResult,
        elieOptionTexts[key]
      );

    }
  );

});


getStoredArray(
  STORAGE_ELIE_OPTIONS
).forEach(key => {

  const button =
    document.querySelector(
      `.elie-option[data-elie-option="${key}"]`
    );

  if (button) {

    button.classList.add(
      "selected"
    );

  }

});


/* =========================================================
   SCÈNE 9
   SECRET PHÉNIX
========================================================= */

const phoenixSecret =
  document.getElementById(
    "phoenixSecret"
  );


if (phoenixSecret) {

  phoenixSecret.addEventListener(
    "click",
    () => {

      localStorage.setItem(
        STORAGE_PHOENIX,
        "found"
      );

      phoenixSecret.classList.add(
        "found"
      );

      playSecretSound();

      addSecret(
        "phoenix",
        "Secret découvert — Le Phénix. Peter n’a jamais cessé de surveiller Élie."
      );

    }
  );

}


if (
  localStorage.getItem(
    STORAGE_PHOENIX
  ) === "found"
) {

  if (phoenixSecret) {

    phoenixSecret.classList.add(
      "found"
    );

  }

}


/* =========================================================
   SCÈNE 10
   INTERCEPTION DE L'APPEL
========================================================= */

const listenCallBtn =
  document.getElementById(
    "listenCallBtn"
  );

const callTranscript =
  document.getElementById(
    "callTranscript"
  );


let callPlaying =
  false;


function revealCallTranscript() {

  if (
    !callTranscript ||
    callPlaying
  ) {
    return;
  }

  callPlaying =
    true;

  callTranscript.innerHTML =
    "";

  callTranscript.classList.add(
    "visible"
  );


  const fragments = [

    "… grésillement …",

    "Élie : « … »",

    "… voix féminine …",

    "Femme : « … »",

    "… signal instable …",

    "Élie : « … d’accord … »",

    "… fragment inaudible …",

    "Femme : « … pas maintenant … »",

    "… fin de transmission exploitable …"

  ];


  fragments.forEach(
    (fragment, index) => {

      setTimeout(() => {

        const line =
          document.createElement("p");

        line.textContent =
          fragment;

        line.classList.add(
          "call-line"
        );

        callTranscript.appendChild(
          line
        );


        if (
          index ===
          fragments.length - 1
        ) {

          callPlaying =
            false;

          localStorage.setItem(
            STORAGE_CALL,
            "listened"
          );

        }

      }, index * 450);

    }
  );

}


if (listenCallBtn) {

  listenCallBtn.addEventListener(
    "click",
    () => {

      playObserveSound();

      revealCallTranscript();

    }
  );

}


/* =========================================================
   OBSERVER HOPE APRÈS L'APPEL
========================================================= */

const observeHopeCall =
  document.getElementById(
    "observeHopeCall"
  );

const hopeCallResult =
  document.getElementById(
    "hopeCallResult"
  );


if (
  observeHopeCall &&
  hopeCallResult
) {

  observeHopeCall.addEventListener(
    "click",
    () => {

      playObserveSound();

      showResult(
        hopeCallResult,
        `
          Pendant une fraction de seconde, Hope n’a pas eu l’air certaine de sa réponse.<br><br>
          Elle a répondu vite.<br>
          Peut-être trop vite.
        `
      );

      addSecret(
        "hope-call",
        "Observation découverte — Hope n’est peut-être pas certaine de ne pas connaître cette voix."
      );

    }
  );

}


/* =========================================================
   SCÈNE 11
   CHOIX TECHNOLOGIE / HUMAIN
========================================================= */

const techChoices =
  document.querySelectorAll(
    ".tech-choice"
  );

const techChoiceResult =
  document.getElementById(
    "techChoiceResult"
  );


const techTexts = {

  depasse:
    `
      <strong>Votre choix</strong><br><br>
      La technologie finira peut-être par dépasser certains aspects du jugement humain.
    `,

  humain:
    `
      <strong>Votre choix</strong><br><br>
      L’humain restera indispensable là où le contexte, l’éthique et l’intuition comptent.
    `,

  ensemble:
    `
      <strong>Votre choix</strong><br><br>
      La complémentarité entre intelligence humaine et technologie pourrait devenir la véritable force.
    `

};


function selectTechChoice(
  key,
  {
    save = true,
    sound = true
  } = {}
) {

  techChoices.forEach(button => {

    button.classList.toggle(
      "selected",
      button.dataset.tech === key
    );

  });


  if (
    techTexts[key]
  ) {

    showResult(
      techChoiceResult,
      techTexts[key]
    );

  }


  if (save) {

    localStorage.setItem(
      STORAGE_TECH,
      key
    );

  }


  if (sound) {

    playChoiceSound();

  }

}


techChoices.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      selectTechChoice(
        button.dataset.tech
      );

    }
  );

});


const savedTechChoice =
  localStorage.getItem(
    STORAGE_TECH
  );


if (
  savedTechChoice &&
  techTexts[savedTechChoice]
) {

  selectTechChoice(
    savedTechChoice,
    {
      save: false,
      sound: false
    }
  );

}


/* =========================================================
   SCÈNE 12
   EFFET PAPILLON
========================================================= */

const butterflyBtn =
  document.getElementById(
    "butterflyBtn"
  );

const butterflyResult =
  document.getElementById(
    "butterflyResult"
  );


function revealButterfly() {

  if (!butterflyResult) {
    return;
  }

  showResult(
    butterflyResult,
    `
      <strong>🦋 Effet papillon</strong><br><br>

      Lucy sauve Clark.<br>
      ↓<br>
      Clark passe son audition.<br>
      ↓<br>
      Sa carrière commence.<br>
      ↓<br>
      Il rencontre Root.<br>
      ↓<br>
      Root se retrouve ce soir au NEXUS.<br><br>

      <em>
        Une action minuscule.<br>
        Des conséquences impossibles à prévoir.
      </em>
    `
  );

}


if (butterflyBtn) {

  butterflyBtn.addEventListener(
    "click",
    () => {

      localStorage.setItem(
        STORAGE_BUTTERFLY,
        "opened"
      );

      butterflyBtn.classList.add(
        "opened"
      );

      playSecretSound();

      revealButterfly();

      addSecret(
        "butterfly",
        "Observation découverte — Effet papillon."
      );

    }
  );

}


if (
  localStorage.getItem(
    STORAGE_BUTTERFLY
  ) === "opened"
) {

  if (butterflyBtn) {

    butterflyBtn.classList.add(
      "opened"
    );

  }

  revealButterfly();

}


/* =========================================================
   SCÈNE 13
   RÉSONANCE ROOT / LUCY
========================================================= */

const resonanceButtons =
  document.querySelectorAll(
    ".resonance-btn"
  );

const resonanceResult =
  document.getElementById(
    "resonanceResult"
  );


const resonanceTexts = {

  lucy:
    `
      <strong>Lucy</strong><br><br>
      Elle protège presque instinctivement son poignet droit, comme si elle craignait qu’un signe apparaisse.
    `,

  root:
    `
      <strong>Root</strong><br><br>
      Sa main se porte vers la marque laissée par Pandore avant qu’elle transforme le geste en mouvement banal.
    `,

  hope:
    `
      <strong>Hope</strong><br><br>
      Elle est la seule à avoir remarqué les deux réactions au même instant.
    `

};


function updateResonanceResult(
  selected = null
) {

  const observed =
    getStoredArray(
      STORAGE_RESONANCE
    );

  let html = "";

  if (
    selected &&
    resonanceTexts[selected]
  ) {

    html =
      resonanceTexts[selected];

  }


  if (
    observed.length === 3
  ) {

    html += `
      <div class="secret-discovery">
        <strong>SECRET DÉCOUVERT — RÉSONANCE</strong><br><br>

        Quelque chose a réagi lorsque Root et Lucy se sont touchées.<br><br>

        Mais ni l’une ni l’autre ne semble encore comprendre pourquoi.
      </div>
    `;

  }


  if (html) {

    showResult(
      resonanceResult,
      html
    );

  }

}


resonanceButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const key =
        button.dataset.resonance;

      const observed =
        addStoredValue(
          STORAGE_RESONANCE,
          key
        );

      button.classList.add(
        "selected"
      );

      playObserveSound();

      updateResonanceResult(
        key
      );


      if (
        observed.length === 3
      ) {

        playSecretSound();

        addSecret(
          "resonance",
          "Secret découvert — Résonance."
        );

      }

    }
  );

});


getStoredArray(
  STORAGE_RESONANCE
).forEach(key => {

  const button =
    document.querySelector(
      `.resonance-btn[data-resonance="${key}"]`
    );

  if (button) {

    button.classList.add(
      "selected"
    );

  }

});


if (
  getStoredArray(
    STORAGE_RESONANCE
  ).length === 3
) {

  updateResonanceResult();

}


/* =========================================================
   SCÈNE 14
   OBSERVER LE GROUPE
========================================================= */

const groupButtons =
  document.querySelectorAll(
    ".group-btn"
  );

const groupResult =
  document.getElementById(
    "groupResult"
  );


const groupTexts = {

  "anna-max":
    `
      <strong>Anna + Max</strong><br><br>
      Journalisme, voyages, enquêtes et probablement beaucoup trop peu de sommeil.
    `,

  "betty-peter":
    `
      <strong>Betty + Peter</strong><br><br>
      Technologie, génétique… et plusieurs sujets que Peter évite soigneusement.
    `,

  "lucy-clive":
    `
      <strong>Lucy + Clive</strong><br><br>
      Clive raconte une histoire. Lucy corrige déjà la moitié des faits.
    `,

  "root-clark":
    `
      <strong>Root + Clark</strong><br><br>
      Il suffit d’un regard pour comprendre qu’Anna avait raison.
    `,

  "hope":
    `
      <strong>Hope</strong><br><br>
      Elle observe tout le monde avec un sourire qu’elle ne cherche même plus à cacher.
    `

};


groupButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const key =
        button.dataset.group;

      addStoredValue(
        STORAGE_GROUP,
        key
      );

      button.classList.add(
        "selected"
      );

      playObserveSound();

      showResult(
        groupResult,
        groupTexts[key]
      );

    }
  );

});


getStoredArray(
  STORAGE_GROUP
).forEach(key => {

  const button =
    document.querySelector(
      `.group-btn[data-group="${key}"]`
    );

  if (button) {

    button.classList.add(
      "selected"
    );

  }

});


/* =========================================================
   RESTAURATION DU SCROLL
========================================================= */

const storedScroll =
  Number(
    localStorage.getItem(
      STORAGE_SCROLL
    )
  );


if (
  Number.isFinite(storedScroll) &&
  storedScroll > 0
) {

  setTimeout(() => {

    window.scrollTo({
      top: storedScroll,
      behavior: "auto"
    });

    updateProgress();

  }, 150);

}


});
