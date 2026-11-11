/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 4 — MAIS QUI EST-ELLE ?
   Nouvelle version
   10 visuels / 18 interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


/* =========================================================
   DERNIÈRE PAGE LUE
========================================================= */

localStorage.setItem(
  "societeOmbre_dernierePage",
  "chapitre4.html"
);

localStorage.setItem(
  "societeOmbre_dernierTitre",
  "Chapitre 4 — Mais qui est-elle ?"
);


/* =========================================================
   CLÉS LOCALSTORAGE
========================================================= */

const PREFIX =
  "societeOmbre_chapitre4_";

const STORAGE_SCROLL =
  PREFIX + "scroll";

const STORAGE_PROGRESS =
  PREFIX + "progression";

const STORAGE_COMPLETED =
  PREFIX + "termine";

const STORAGE_INTERACTIONS =
  PREFIX + "interactions";

const STORAGE_SECRETS =
  PREFIX + "secrets";


/* =========================================================
   COMPATIBILITÉ AVEC ANCIENNES SAUVEGARDES
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre4_finished"
  ) === "1"
) {

  localStorage.setItem(
    STORAGE_COMPLETED,
    "1"
  );

}


/* =========================================================
   ÉLÉMENTS PRINCIPAUX
========================================================= */

const progressFill =
  document.getElementById(
    "progressFill"
  );

const menuBtn =
  document.getElementById(
    "menuBtn"
  );

const soundBtn =
  document.getElementById(
    "soundBtn"
  );

const chapterMenu =
  document.getElementById(
    "chapterMenu"
  );

const menuClose =
  document.getElementById(
    "menuClose"
  );

const resumeBtn =
  document.getElementById(
    "resumeBtn"
  );

const restartBtn =
  document.getElementById(
    "restartBtn"
  );

const restartChapter =
  document.getElementById(
    "restartChapter"
  );

const secretPopup =
  document.getElementById(
    "secretPopup"
  );

const secretDescription =
  document.getElementById(
    "secretDescription"
  );

const chapterEnd =
  document.getElementById(
    "chapter-end"
  );


/* =========================================================
   MODE DE LECTURE
========================================================= */

const params =
  new URLSearchParams(
    window.location.search
  );

const lectureMode =
  params.get("lecture");


/* =========================================================
   IMAGES MANQUANTES
========================================================= */

document
  .querySelectorAll(
    ".visual img"
  )
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
   OUTILS JSON
========================================================= */

function loadJSON(
  key,
  fallback = {}
) {

  try {

    const value =
      localStorage.getItem(key);

    if (!value) {

      return fallback;

    }

    return JSON.parse(value);

  } catch (error) {

    return fallback;

  }

}


function saveJSON(
  key,
  value
) {

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

}


/* =========================================================
   MÉMOIRE DES INTERACTIONS
========================================================= */

let interactionState =
  loadJSON(
    STORAGE_INTERACTIONS,
    {}
  );


function saveInteraction(
  name,
  value
) {

  interactionState[name] =
    value;

  saveJSON(
    STORAGE_INTERACTIONS,
    interactionState
  );

}


function getInteraction(
  name
) {

  return interactionState[name];

}


/* =========================================================
   SECRETS
========================================================= */

function getSecrets() {

  return loadJSON(
    STORAGE_SECRETS,
    []
  );

}


function saveSecret(
  name
) {

  const secrets =
    getSecrets();

  if (
    !secrets.includes(name)
  ) {

    secrets.push(name);

    saveJSON(
      STORAGE_SECRETS,
      secrets
    );

  }

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

  const maxScroll =
    document.documentElement
      .scrollHeight -
    window.innerHeight;

  if (maxScroll <= 0) {

    progressFill.style.width =
      "0%";

    return;

  }

  const percentage =
    Math.min(
      100,
      Math.max(
        0,
        (
          scrollTop /
          maxScroll
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

window.addEventListener(
  "resize",
  updateProgress
);

updateProgress();


/* =========================================================
   SAUVEGARDE DE LA POSITION
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
        220
      );

  },
  {
    passive: true
  }
);


/* =========================================================
   REPRISE DE LECTURE
========================================================= */

function restoreScrollPosition() {

  if (
    lectureMode !==
    "reprendre"
  ) {
    return;
  }

  const position =
    parseInt(
      localStorage.getItem(
        STORAGE_SCROLL
      ),
      10
    );

  if (
    Number.isNaN(position) ||
    position <= 0
  ) {
    return;
  }

  setTimeout(
    () => {

      window.scrollTo({
        top: position,
        left: 0,
        behavior: "instant"
      });

      updateProgress();

    },
    450
  );

}


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

} else {

  restoreScrollPosition();

}


/* =========================================================
   BOUTON CONTINUER
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

  const keys =
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
      key.startsWith(PREFIX)
    ) {

      keys.push(key);

    }

  }

  keys.forEach(
    (key) => {

      localStorage.removeItem(
        key
      );

    }
  );

  window.location.href =
    "chapitre4.html?lecture=recommencer";

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
   POPUP SECRET
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
  name,
  text
) {

  saveSecret(name);

  if (
    !secretPopup ||
    !secretDescription
  ) {
    return;
  }

  secretDescription.textContent =
    text;

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
   OUTILS INTERACTIONS
========================================================= */

function openReveal(
  element,
  html
) {

  if (!element) {
    return;
  }

  if (
    typeof html ===
    "string"
  ) {

    element.innerHTML =
      html;

  }

  element.classList.add(
    "open"
  );

}


function markCompleted(
  button
) {

  if (!button) {
    return;
  }

  button.classList.add(
    "completed"
  );

}


function markSelectedOnly(
  buttons,
  selected
) {

  buttons.forEach(
    (button) => {

      if (
        button === selected
      ) {

        button.classList.add(
          "selected"
        );

        button.classList.remove(
          "dimmed"
        );

      } else {

        button.classList.remove(
          "selected"
        );

        button.classList.add(
          "dimmed"
        );

      }

    }
  );

}


/* =========================================================
   INTERACTION 1
   POURQUOI CLIVE ?
========================================================= */

const cliveButtons =
  document.querySelectorAll(
    "[data-clive-question]"
  );

const cliveQuestionReveal =
  document.getElementById(
    "cliveQuestionReveal"
  );


const cliveTexts = {

  hope:
    "Clive voulait peut-être obtenir des informations directes sur Hope.",

  security:
    "Sa tentative d’intrusion pouvait également servir à mesurer le niveau de sécurité de l’hacienda Awake.",

  anna:
    "Il pouvait chercher à vérifier si Hope représentait réellement un danger pour Anna.",

  secret:
    "Le plus important reste peut-être ceci : Lucy travaille avec un cambrioleur recherché. L’enquête n’est probablement pas ordinaire."
};


let cliveFound =
  Array.isArray(
    getInteraction(
      "cliveFound"
    )
  )
    ? getInteraction(
        "cliveFound"
      )
    : [];


function restoreCliveQuestions() {

  cliveFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-clive-question="${value}"]`
        )
      );

    }
  );

  if (
    cliveFound.length >= 4
  ) {

    openReveal(
      cliveQuestionReveal,
      `
        <p>
          Root ne possède encore aucune certitude.
        </p>

        <p class="impact-line">
          Mais tout indique une enquête hors norme.
        </p>
      `
    );

  }

}


cliveButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .cliveQuestion;

        if (
          !cliveFound.includes(
            value
          )
        ) {

          cliveFound.push(value);

          saveInteraction(
            "cliveFound",
            cliveFound
          );

        }

        markCompleted(button);

        openReveal(
          cliveQuestionReveal,
          `<p>${cliveTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreCliveQuestions();


/* =========================================================
   INTERACTION 2
   DOSSIER CAMÉLÉON
========================================================= */

const cameleonFileButton =
  document.getElementById(
    "cameleonFileButton"
  );

const cameleonFileReveal =
  document.getElementById(
    "cameleonFileReveal"
  );


function openCameleonFile(
  restore = false
) {

  saveInteraction(
    "cameleonFile",
    true
  );

  markCompleted(
    cameleonFileButton
  );

  if (cameleonFileButton) {

    cameleonFileButton.textContent =
      "Dossier ouvert";

    cameleonFileButton.disabled =
      true;

  }

  openReveal(
    cameleonFileReveal,
    `
      <p>
        Victimes sans profil commun.
      </p>

      <p>
        Pays différents.
      </p>

      <p>
        Méthodes différentes.
      </p>

      <p>
        Une seule constante :
        une signature laissée volontairement.
      </p>
    `
  );

  if (!restore) {

    playRevealSound();

  }

}


if (cameleonFileButton) {

  cameleonFileButton.addEventListener(
    "click",
    () => {

      openCameleonFile(false);

    }
  );

}


if (
  getInteraction(
    "cameleonFile"
  )
) {

  openCameleonFile(true);

}


/* =========================================================
   INTERACTION 3
   SYMBOLE CAMÉLÉON
========================================================= */

const symbolButtons =
  document.querySelectorAll(
    "[data-symbol-clue]"
  );

const symbolClueReveal =
  document.getElementById(
    "symbolClueReveal"
  );


const symbolOrder = [
  "same",
  "angle",
  "direction",
  "object"
];


const symbolTexts = {

  same:
    "Le symbole reste identique d’une victime à l’autre.",

  angle:
    "Seule son orientation change.",

  direction:
    "En prolongeant cette orientation, une direction apparaît.",

  object:
    "Cette direction désigne un objet précis présent sur la scène."
};


let symbolProgress =
  Number(
    getInteraction(
      "symbolProgress"
    ) || 0
  );


function restoreSymbol() {

  for (
    let i = 0;
    i < symbolProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-symbol-clue="${symbolOrder[i]}"]`
      )
    );

  }

  if (
    symbolProgress >=
    symbolOrder.length
  ) {

    openReveal(
      symbolClueReveal,
      `
        <p>
          Symbole → inclinaison → direction → objet.
        </p>

        <p class="impact-line">
          La signature fonctionne comme une aiguille.
        </p>
      `
    );

  }

}


symbolButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .symbolClue;

        const expected =
          symbolOrder[
            symbolProgress
          ];

        if (
          value !== expected
        ) {

          button.classList.add(
            "wrong"
          );

          setTimeout(
            () => {

              button.classList.remove(
                "wrong"
              );

            },
            420
          );

          return;

        }

        markCompleted(button);

        symbolProgress++;

        saveInteraction(
          "symbolProgress",
          symbolProgress
        );

        openReveal(
          symbolClueReveal,
          `<p>${symbolTexts[value]}</p>`
        );

        playClueSound();

        if (
          symbolProgress >=
          symbolOrder.length
        ) {

          showSecret(
            "cameleon-symbol",
            "Le symbole fonctionne comme une indication directionnelle vers un objet précis."
          );

        }

      }
    );

  }
);

restoreSymbol();


/* =========================================================
   INTERACTION 4
   MESSAGE MICROSCOPIQUE
========================================================= */

const microscopeTrigger =
  document.getElementById(
    "microscopeTrigger"
  );

const microscopeReveal =
  document.getElementById(
    "microscopeReveal"
  );


function activateMicroscope(
  restore = false
) {

  saveInteraction(
    "microscope",
    true
  );

  markCompleted(
    microscopeTrigger
  );

  if (microscopeTrigger) {

    microscopeTrigger.textContent =
      "Message révélé";

    microscopeTrigger.disabled =
      true;

  }

  if (microscopeReveal) {

    microscopeReveal.classList.add(
      "open"
    );

  }

  if (!restore) {

    playRevealSound();

    showSecret(
      "cameleon-message",
      "La Caméléon ne cherche pas seulement à tuer. Elle veut que quelqu’un découvre et interprète son message."
    );

  }

}


if (microscopeTrigger) {

  microscopeTrigger.addEventListener(
    "click",
    () => {

      activateMicroscope(false);

    }
  );

}


if (
  getInteraction(
    "microscope"
  )
) {

  activateMicroscope(true);

}


/* =========================================================
   INTERACTION 5
   ROOT SUSPECTE
========================================================= */

const rootSuspectButtons =
  document.querySelectorAll(
    "[data-root-suspect]"
  );

const rootSuspectReveal =
  document.getElementById(
    "rootSuspectReveal"
  );


const rootSuspectTexts = {

  travel:
    "Root voyage énormément et apparaît à proximité de plusieurs crimes attribués à la Caméléon.",

  combat:
    "Elle possède un niveau de combat largement supérieur à celui d’une personne ordinaire.",

  resources:
    "Elle dispose de ressources financières et technologiques considérables.",

  sentinel:
    "Lucy sait désormais que Root appartient à une organisation secrète.",

  causality:
    "Root raisonne constamment en termes de causes, conséquences et trajectoires humaines."
};


let rootSuspectFound =
  Array.isArray(
    getInteraction(
      "rootSuspectFound"
    )
  )
    ? getInteraction(
        "rootSuspectFound"
      )
    : [];


function restoreRootSuspect() {

  rootSuspectFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-root-suspect="${value}"]`
        )
      );

    }
  );

  if (
    rootSuspectFound.length >= 5
  ) {

    openReveal(
      rootSuspectReveal,
      `
        <p>
          Pris séparément,
          aucun élément ne suffit.
        </p>

        <p>
          Ensemble,
          ils dessinent un profil troublant.
        </p>
      `
    );

  }

}


rootSuspectButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .rootSuspect;

        if (
          !rootSuspectFound.includes(
            value
          )
        ) {

          rootSuspectFound.push(
            value
          );

          saveInteraction(
            "rootSuspectFound",
            rootSuspectFound
          );

        }

        markCompleted(button);

        openReveal(
          rootSuspectReveal,
          `<p>${rootSuspectTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreRootSuspect();


/* =========================================================
   INTERACTION 6
   LE SUSPECT TROP PARFAIT
========================================================= */

const perfectSuspectButton =
  document.getElementById(
    "perfectSuspectButton"
  );

const perfectSuspectReveal =
  document.getElementById(
    "perfectSuspectReveal"
  );


function revealPerfectSuspect(
  restore = false
) {

  saveInteraction(
    "perfectSuspect",
    true
  );

  markCompleted(
    perfectSuspectButton
  );

  if (perfectSuspectButton) {

    perfectSuspectButton.textContent =
      "Paradoxe identifié";

    perfectSuspectButton.disabled =
      true;

  }

  openReveal(
    perfectSuspectReveal,
    `
      <p>
        Root correspond presque trop bien
        à ce que l’enquête semble chercher.
      </p>

      <p class="impact-line">
        Et si cette perfection faisait partie du piège ?
      </p>
    `
  );

  if (!restore) {

    playRevealSound();

  }

}


if (perfectSuspectButton) {

  perfectSuspectButton.addEventListener(
    "click",
    () => {

      revealPerfectSuspect(false);

    }
  );

}


if (
  getInteraction(
    "perfectSuspect"
  )
) {

  revealPerfectSuspect(true);

}


/* =========================================================
   INTERACTION 7
   ANALYSE DU MESSAGE
========================================================= */

const messageAnalysisButtons =
  document.querySelectorAll(
    "[data-message-analysis]"
  );

const messageAnalysisReveal =
  document.getElementById(
    "messageAnalysisReveal"
  );


const messageAnalysisTexts = {

  artist:
    "Le début du message construit l’image d’une femme exceptionnelle, professionnelle et sûre d’elle.",

  investigator:
    "Puis le texte change de cible : la persistance, l’espoir et le chemin semblent concerner celui qui enquête.",

  miracle:
    "Le mot « miraculeusement » suggère que l’artiste se considère normalement impossible à trouver.",

  ghost:
    "La Caméléon pourrait donc être une personne pratiquement absente des bases administratives ordinaires."
};


let messageAnalysisFound =
  Array.isArray(
    getInteraction(
      "messageAnalysisFound"
    )
  )
    ? getInteraction(
        "messageAnalysisFound"
      )
    : [];


function restoreMessageAnalysis() {

  messageAnalysisFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-message-analysis="${value}"]`
        )
      );

    }
  );

  if (
    messageAnalysisFound.length >= 4
  ) {

    openReveal(
      messageAnalysisReveal,
      `
        <p>
          Le message ne décrit pas seulement la Caméléon.
        </p>

        <p class="impact-line">
          Il s’adresse directement à Lucy.
        </p>
      `
    );

  }

}


messageAnalysisButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .messageAnalysis;

        if (
          !messageAnalysisFound.includes(
            value
          )
        ) {

          messageAnalysisFound.push(
            value
          );

          saveInteraction(
            "messageAnalysisFound",
            messageAnalysisFound
          );

        }

        markCompleted(button);

        openReveal(
          messageAnalysisReveal,
          `<p>${messageAnalysisTexts[value]}</p>`
        );

        playClueSound();

        if (
          messageAnalysisFound.length >= 4
        ) {

          showSecret(
            "message-lucy",
            "Le message de la Caméléon semble avoir été écrit autant pour l’enquêtrice que pour parler de l’assassin."
          );

        }

      }
    );

  }
);

restoreMessageAnalysis();


/* =========================================================
   INTERACTION 8
   FUTURS POSSIBLES DES VICTIMES
========================================================= */

const futureButtons =
  document.querySelectorAll(
    "[data-future-analysis]"
  );

const futureAnalysisReveal =
  document.getElementById(
    "futureAnalysisReveal"
  );


const futureTexts = {

  decision:
    "Une décision future peut modifier plusieurs trajectoires humaines.",

  meeting:
    "Une rencontre qui n’a jamais eu lieu peut être aussi importante qu’un événement visible.",

  discovery:
    "Une découverte interrompue peut modifier l’avenir sans jamais laisser de trace.",

  impact:
    "Une personne ordinaire peut sauver ou condamner quelqu’un dont l’influence future sera immense."
};


let futureFound =
  Array.isArray(
    getInteraction(
      "futureFound"
    )
  )
    ? getInteraction(
        "futureFound"
      )
    : [];


function restoreFuture() {

  futureFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-future-analysis="${value}"]`
        )
      );

    }
  );

  if (
    futureFound.length >= 4
  ) {

    openReveal(
      futureAnalysisReveal,
      `
        <p>
          Il ne faut plus seulement analyser
          les conséquences de la mort.
        </p>

        <p class="impact-line">
          Il faut reconstruire les conséquences de la vie qui n’a pas eu lieu.
        </p>
      `
    );

  }

}


futureButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .futureAnalysis;

        if (
          !futureFound.includes(
            value
          )
        ) {

          futureFound.push(value);

          saveInteraction(
            "futureFound",
            futureFound
          );

        }

        markCompleted(button);

        openReveal(
          futureAnalysisReveal,
          `<p>${futureTexts[value]}</p>`
        );

        playAnalysisSound();

        if (
          futureFound.length >= 4
        ) {

          showSecret(
            "absence-analysis",
            "L’absence d’une personne peut modifier l’histoire autant que sa présence."
          );

        }

      }
    );

  }
);

restoreFuture();


/* =========================================================
   INTERACTION 9
   RÉPARTITION DE L'ÉQUIPE
========================================================= */

const teamRoleButtons =
  document.querySelectorAll(
    "[data-team-role]"
  );

const teamRoleReveal =
  document.getElementById(
    "teamRoleReveal"
  );


const teamRoleTexts = {

  lucy:
    "Lucy et IA2 reconstruisent les trajectoires des victimes et les corrélations possibles.",

  clive:
    "Clive cherche les identités effacées, les disparus et les morts qui ne le sont peut-être pas.",

  root:
    "Root analyse les causes et les conséquences derrière chaque événement.",

  hope:
    "Hope cherche ce que la Caméléon espère précisément que personne ne regardera."
};


let teamRolesFound =
  Array.isArray(
    getInteraction(
      "teamRolesFound"
    )
  )
    ? getInteraction(
        "teamRolesFound"
      )
    : [];


function restoreTeamRoles() {

  teamRolesFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-team-role="${value}"]`
        )
      );

    }
  );

  if (
    teamRolesFound.length >= 4
  ) {

    openReveal(
      teamRoleReveal,
      `
        <p>
          Quatre méthodes différentes.
        </p>

        <p class="impact-line">
          Une seule enquête.
        </p>
      `
    );

  }

}


teamRoleButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.teamRole;

        if (
          !teamRolesFound.includes(
            value
          )
        ) {

          teamRolesFound.push(value);

          saveInteraction(
            "teamRolesFound",
            teamRolesFound
          );

        }

        markCompleted(button);

        openReveal(
          teamRoleReveal,
          `<p>${teamRoleTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreTeamRoles();


/* =========================================================
   INTERACTION 10
   DANGER DANS LE BAR
========================================================= */

const dangerButtons =
  document.querySelectorAll(
    "[data-danger-clue]"
  );

const dangerClueReveal =
  document.getElementById(
    "dangerClueReveal"
  );


const dangerTexts = {

  crowd:
    "Hope ne regarde plus les personnes individuellement. Elle observe la densité inhabituelle autour du groupe.",

  entrances:
    "Elle vérifie les entrées, les sorties et les trajectoires possibles.",

  positions:
    "Ce qui semble être une foule ordinaire peut cacher des positions organisées."
};


let dangerFound =
  Array.isArray(
    getInteraction(
      "dangerFound"
    )
  )
    ? getInteraction(
        "dangerFound"
      )
    : [];


function restoreDanger() {

  dangerFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-danger-clue="${value}"]`
        )
      );

    }
  );

  if (
    dangerFound.length >= 3
  ) {

    openReveal(
      dangerClueReveal,
      `
        <p>
          Hope n’a pas identifié une personne précise.
        </p>

        <p class="impact-line">
          Elle a reconnu une configuration dangereuse.
        </p>
      `
    );

  }

}


dangerButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .dangerClue;

        if (
          !dangerFound.includes(
            value
          )
        ) {

          dangerFound.push(value);

          saveInteraction(
            "dangerFound",
            dangerFound
          );

        }

        markCompleted(button);

        openReveal(
          dangerClueReveal,
          `<p>${dangerTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreDanger();


/* =========================================================
   INTERACTION 11
   MÉTHODE DES ASSAILLANTS
========================================================= */

const attackPatternButtons =
  document.querySelectorAll(
    "[data-attack-pattern]"
  );

const attackPatternReveal =
  document.getElementById(
    "attackPatternReveal"
  );


const attackPatternTexts = {

  silent:
    "Les assaillants n’ont pas besoin de communiquer verbalement pour agir ensemble.",

  coordinated:
    "Chaque attaque semble préparer ou compléter celle d’un autre membre du groupe.",

  targets:
    "Les cibles sont réparties immédiatement, signe d’une préparation préalable."
};


let attackPatternFound =
  Array.isArray(
    getInteraction(
      "attackPatternFound"
    )
  )
    ? getInteraction(
        "attackPatternFound"
      )
    : [];


function restoreAttackPattern() {

  attackPatternFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-attack-pattern="${value}"]`
        )
      );

    }
  );

  if (
    attackPatternFound.length >= 3
  ) {

    openReveal(
      attackPatternReveal,
      `
        <p>
          Ce ne sont pas des agresseurs improvisés.
        </p>

        <p class="impact-line">
          Ils ont été entraînés à combattre ensemble.
        </p>
      `
    );

  }

}


attackPatternButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .attackPattern;

        if (
          !attackPatternFound.includes(
            value
          )
        ) {

          attackPatternFound.push(
            value
          );

          saveInteraction(
            "attackPatternFound",
            attackPatternFound
          );

        }

        markCompleted(button);

        openReveal(
          attackPatternReveal,
          `<p>${attackPatternTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreAttackPattern();


/* =========================================================
   INTERACTION 12
   PISTE DE LA CLÉ
========================================================= */

const keyPathButtons =
  document.querySelectorAll(
    "[data-key-path]"
  );

const keyPathReveal =
  document.getElementById(
    "keyPathReveal"
  );


const keyPathOrder = [
  "vietnam",
  "object",
  "followed",
  "danger"
];


const keyPathTexts = {

  vietnam:
    "Root découvre l’objet pendant sa mission au Vietnam.",

  object:
    "Sa forme ressemble à une lame, mais sa géométrie évoque davantage une clé.",

  followed:
    "Quelqu’un semble avoir surveillé Root assez longtemps pour comprendre qu’elle avait découvert quelque chose.",

  danger:
    "L’arrivée des Gardiens Noirs suggère que cet objet possède une importance considérable."
};


let keyPathProgress =
  Number(
    getInteraction(
      "keyPathProgress"
    ) || 0
  );


function restoreKeyPath() {

  for (
    let i = 0;
    i < keyPathProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-key-path="${keyPathOrder[i]}"]`
      )
    );

  }

  if (
    keyPathProgress >=
    keyPathOrder.length
  ) {

    openReveal(
      keyPathReveal,
      `
        <p>
          Vietnam → découverte → surveillance → attaque.
        </p>

        <p class="impact-line">
          La clé semble être la véritable cible.
        </p>
      `
    );

  }

}


keyPathButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.keyPath;

        const expected =
          keyPathOrder[
            keyPathProgress
          ];

        if (
          value !== expected
        ) {

          button.classList.add(
            "wrong"
          );

          setTimeout(
            () => {

              button.classList.remove(
                "wrong"
              );

            },
            420
          );

          return;

        }

        markCompleted(button);

        keyPathProgress++;

        saveInteraction(
          "keyPathProgress",
          keyPathProgress
        );

        openReveal(
          keyPathReveal,
          `<p>${keyPathTexts[value]}</p>`
        );

        playClueSound();

        if (
          keyPathProgress >=
          keyPathOrder.length
        ) {

          showSecret(
            "ancient-key",
            "L’attaque des Gardiens Noirs pourrait être directement liée à la clé découverte par Root."
          );

        }

      }
    );

  }
);

restoreKeyPath();


/* =========================================================
   INTERACTION 13
   MARQUE DE LUCY
========================================================= */

const lucyMarkTrigger =
  document.getElementById(
    "lucyMarkTrigger"
  );

const lucyMarkReveal =
  document.getElementById(
    "lucyMarkReveal"
  );


function revealLucyMark(
  restore = false
) {

  saveInteraction(
    "lucyMark",
    true
  );

  markCompleted(
    lucyMarkTrigger
  );

  if (lucyMarkTrigger) {

    lucyMarkTrigger.textContent =
      "Marque révélée";

    lucyMarkTrigger.disabled =
      true;

  }

  openReveal(
    lucyMarkReveal,
    `
      <p>
        Un cercle incomplet apparaît sous la peau.
      </p>

      <p>
        Deux chemins semblent se séparer sans jamais se rejoindre complètement.
      </p>

      <p>
        Une fine lumière hésite entre les deux directions.
      </p>

      <p class="impact-line">
        Cette marque n’appartient ni aux Sentinelles ni aux Gardiens Noirs.
      </p>
    `
  );

  if (!restore) {

    playMarkSound();

    showSecret(
      "lucy-indecis",
      "Lucy porte une marque liée aux Indécis."
    );

  }

}


if (lucyMarkTrigger) {

  lucyMarkTrigger.addEventListener(
    "click",
    () => {

      revealLucyMark(false);

    }
  );

}


if (
  getInteraction(
    "lucyMark"
  )
) {

  revealLucyMark(true);

}


/* =========================================================
   INTERACTION 14
   ÊTRE UNE INDÉCISE
========================================================= */

const indecisButtons =
  document.querySelectorAll(
    "[data-indecis]"
  );

const indecisReveal =
  document.getElementById(
    "indecisReveal"
  );


const indecisTexts = {

  light: `
    <p>
      Lucy pourrait choisir de soutenir les Sentinelles.
    </p>

    <p>
      Mais rien dans sa marque ne l’y oblige.
    </p>
  `,

  dark: `
    <p>
      Les Gardiens Noirs pourraient également tenter de l’attirer.
    </p>

    <p>
      Mais ce choix ne lui est pas imposé.
    </p>
  `,

  free: `
    <p>
      Lucy peut refuser les deux camps.
    </p>

    <p class="impact-line">
      Son chemin reste le sien.
    </p>
  `

};


function applyIndecisChoice(
  value,
  button
) {

  saveInteraction(
    "indecisChoice",
    value
  );

  markSelectedOnly(
    indecisButtons,
    button
  );

  openReveal(
    indecisReveal,
    indecisTexts[value]
  );

  playClueSound();

}


indecisButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        applyIndecisChoice(
          button.dataset.indecis,
          button
        );

      }
    );

  }
);


const savedIndecisChoice =
  getInteraction(
    "indecisChoice"
  );


if (
  savedIndecisChoice &&
  indecisTexts[
    savedIndecisChoice
  ]
) {

  const button =
    document.querySelector(
      `[data-indecis="${savedIndecisChoice}"]`
    );

  if (button) {

    markSelectedOnly(
      indecisButtons,
      button
    );

    openReveal(
      indecisReveal,
      indecisTexts[
        savedIndecisChoice
      ]
    );

  }

}


/* =========================================================
   INTERACTION 15
   MORTS ADMINISTRATIFS
========================================================= */

const deadFilesTrigger =
  document.getElementById(
    "deadFilesTrigger"
  );

const deadFilesReveal =
  document.getElementById(
    "deadFilesReveal"
  );


function revealDeadFiles(
  restore = false
) {

  saveInteraction(
    "deadFiles",
    true
  );

  markCompleted(
    deadFilesTrigger
  );

  if (deadFilesTrigger) {

    deadFilesTrigger.textContent =
      "Identités vérifiées";

    deadFilesTrigger.disabled =
      true;

  }

  openReveal(
    deadFilesReveal,
    `
      <p>
        Plusieurs identités correspondent.
      </p>

      <p>
        Décès officiels :
        accident, noyade, chute.
      </p>

      <p>
        Pourtant,
        ces hommes viennent de combattre.
      </p>

      <p class="impact-line">
        Ils sont morts administrativement.
      </p>
    `
  );

  if (!restore) {

    playDataSound();

    showSecret(
      "dead-identities",
      "Certains Gardiens Noirs abandonnent officiellement leur ancienne identité au point d’être déclarés morts."
    );

  }

}


if (deadFilesTrigger) {

  deadFilesTrigger.addEventListener(
    "click",
    () => {

      revealDeadFiles(false);

    }
  );

}


if (
  getInteraction(
    "deadFiles"
  )
) {

  revealDeadFiles(true);

}


/* =========================================================
   INTERACTION 16
   LES TROIS POSITIONS
========================================================= */

const ordersButtons =
  document.querySelectorAll(
    "[data-orders]"
  );

const ordersReveal =
  document.getElementById(
    "ordersReveal"
  );


const ordersTexts = {

  light:
    "Les Sentinelles cherchent à préserver un équilibre et à protéger certaines connaissances, même si leurs méthodes ne sont pas toujours parfaites.",

  dark:
    "Les Gardiens Noirs cherchent généralement à rompre cet équilibre afin d’accroître leur pouvoir ou leur influence.",

  indecis:
    "Les Indécis ne sont naturellement liés à aucun des deux ordres et peuvent suivre plusieurs directions."
};


let ordersFound =
  Array.isArray(
    getInteraction(
      "ordersFound"
    )
  )
    ? getInteraction(
        "ordersFound"
      )
    : [];


function restoreOrders() {

  ordersFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-orders="${value}"]`
        )
      );

    }
  );

  if (
    ordersFound.length >= 3
  ) {

    openReveal(
      ordersReveal,
      `
        <p>
          Lumière.
          Gardiens Noirs.
          Indécis.
        </p>

        <p class="impact-line">
          Trois positions différentes face au même équilibre.
        </p>
      `
    );

  }

}


ordersButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.orders;

        if (
          !ordersFound.includes(
            value
          )
        ) {

          ordersFound.push(value);

          saveInteraction(
            "ordersFound",
            ordersFound
          );

        }

        markCompleted(button);

        openReveal(
          ordersReveal,
          `<p>${ordersTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreOrders();


/* =========================================================
   INTERACTION 17
   MARQUE DU GARDIEN NOIR
========================================================= */

const blackMarkTrigger =
  document.getElementById(
    "blackMarkTrigger"
  );

const blackMarkReveal =
  document.getElementById(
    "blackMarkReveal"
  );


function revealBlackMark(
  restore = false
) {

  saveInteraction(
    "blackMark",
    true
  );

  markCompleted(
    blackMarkTrigger
  );

  if (blackMarkTrigger) {

    blackMarkTrigger.textContent =
      "Marque révélée";

    blackMarkTrigger.disabled =
      true;

  }

  openReveal(
    blackMarkReveal,
    `
      <p>
        Une ligne sombre se forme sous la peau.
      </p>

      <p>
        Puis plusieurs symboles apparaissent.
      </p>

      <p>
        Le motif confirme l’appartenance de l’homme.
      </p>

      <p class="impact-line">
        Gardien Noir.
      </p>
    `
  );

  if (!restore) {

    playDarkMarkSound();

    showSecret(
      "black-guardian-mark",
      "La marque confirme que les assaillants appartiennent réellement aux Gardiens Noirs."
    );

  }

}


if (blackMarkTrigger) {

  blackMarkTrigger.addEventListener(
    "click",
    () => {

      revealBlackMark(false);

    }
  );

}


if (
  getInteraction(
    "blackMark"
  )
) {

  revealBlackMark(true);

}


/* =========================================================
   INTERACTION 18
   MARQUES SUPÉRIEURES DE ROOT
========================================================= */

const rootHigherMarkTrigger =
  document.getElementById(
    "rootHigherMarkTrigger"
  );

const rootHigherMarkReveal =
  document.getElementById(
    "rootHigherMarkReveal"
  );


function revealRootHigherMark(
  restore = false
) {

  saveInteraction(
    "rootHigherMark",
    true
  );

  markCompleted(
    rootHigherMarkTrigger
  );

  if (rootHigherMarkTrigger) {

    rootHigherMarkTrigger.textContent =
      "Marques révélées";

    rootHigherMarkTrigger.disabled =
      true;

  }

  openReveal(
    rootHigherMarkReveal,
    `
      <p>
        La première marque apparaît.
      </p>

      <p>
        Puis d’autres lignes remontent le long de l’avant-bras.
      </p>

      <p>
        L’ensemble est plus complexe que la marque déjà découverte.
      </p>

      <p class="impact-line">
        Root appartient à une lignée ancienne des Sentinelles.
      </p>
    `
  );

  if (!restore) {

    playSentinelSound();

    showSecret(
      "root-higher-mark",
      "La marque de Root n’était qu’une partie d’un ensemble beaucoup plus complexe."
    );

  }

}


if (rootHigherMarkTrigger) {

  rootHigherMarkTrigger.addEventListener(
    "click",
    () => {

      revealRootHigherMark(false);

    }
  );

}


if (
  getInteraction(
    "rootHigherMark"
  )
) {

  revealRootHigherMark(true);

}


/* =========================================================
   DRAGON DE HOPE
   Révélation complémentaire
========================================================= */

const dragonTrigger =
  document.getElementById(
    "dragonTrigger"
  );

const dragonReveal =
  document.getElementById(
    "dragonReveal"
  );


function revealDragon(
  restore = false
) {

  saveInteraction(
    "dragon",
    true
  );

  markCompleted(
    dragonTrigger
  );

  if (dragonTrigger) {

    dragonTrigger.textContent =
      "Dragon révélé";

    dragonTrigger.disabled =
      true;

  }

  openReveal(
    dragonReveal,
    `
      <p>
        La lumière se propage sur le corps de Hope.
      </p>

      <p>
        Un dragon immense apparaît sous sa peau.
      </p>

      <p>
        Ses couleurs semblent bouger avec elle.
      </p>

      <p class="impact-line">
        Il paraît vivant.
      </p>
    `
  );

  if (!restore) {

    playDragonSound();

    showSecret(
      "hope-dragon",
      "La marque de Hope révèle son statut exceptionnel de Maître Unique."
    );

  }

}


if (dragonTrigger) {

  dragonTrigger.addEventListener(
    "click",
    () => {

      revealDragon(false);

    }
  );

}


if (
  getInteraction(
    "dragon"
  )
) {

  revealDragon(true);

}


/* =========================================================
   COMPATIBILITÉ ANCIENNES INTERACTIONS
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre4_microscope"
  ) === "1" &&
  !getInteraction("microscope")
) {

  activateMicroscope(true);

}


if (
  localStorage.getItem(
    "societeOmbre_chapitre4_lucyMark"
  ) === "1" &&
  !getInteraction("lucyMark")
) {

  revealLucyMark(true);

}


if (
  localStorage.getItem(
    "societeOmbre_chapitre4_deadFiles"
  ) === "1" &&
  !getInteraction("deadFiles")
) {

  revealDeadFiles(true);

}


if (
  localStorage.getItem(
    "societeOmbre_chapitre4_blackMark"
  ) === "1" &&
  !getInteraction("blackMark")
) {

  revealBlackMark(true);

}


if (
  localStorage.getItem(
    "societeOmbre_chapitre4_rootHigherMark"
  ) === "1" &&
  !getInteraction("rootHigherMark")
) {

  revealRootHigherMark(true);

}


if (
  localStorage.getItem(
    "societeOmbre_chapitre4_dragon"
  ) === "1" &&
  !getInteraction("dragon")
) {

  revealDragon(true);

}


/* =========================================================
   MÉMOIRE DU CHAPITRE 3
========================================================= */

const chapter3Finished =
  localStorage.getItem(
    "societeOmbre_chapitre3_termine"
  ) ||
  localStorage.getItem(
    "societeOmbre_chapitre3_finished"
  );


if (
  chapter3Finished === "1"
) {

  const firstSection =
    document.getElementById(
      "root-enquete"
    );

  const textBlock =
    firstSection?.querySelector(
      ".text-block"
    );

  if (
    textBlock &&
    !document.getElementById(
      "chapter3FinishedMemory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );

    memory.id =
      "chapter3FinishedMemory";

    memory.className =
      "emphasis";

    memory.style.marginTop =
      "30px";

    memory.textContent =
      "Au chapitre précédent, le cercle s’était rapproché. Cette fois, la confiance va être mise à l’épreuve.";

    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   MÉMOIRE DE LA MARQUE DE ROOT
========================================================= */

let chapter3RootMark =
  false;


try {

  const chapter3Interactions =
    JSON.parse(
      localStorage.getItem(
        "societeOmbre_chapitre3_interactions"
      ) || "{}"
    );

  chapter3RootMark =
    Boolean(
      chapter3Interactions.rootMark
    );

} catch (error) {

  chapter3RootMark =
    false;

}


if (
  localStorage.getItem(
    "societeOmbre_chapitre3_rootMark"
  ) === "1"
) {

  chapter3RootMark =
    true;

}


if (chapter3RootMark) {

  const proofSection =
    document.getElementById(
      "preuve-gardien"
    );

  const textBlock =
    proofSection?.querySelector(
      ".text-block"
    );

  if (
    textBlock &&
    !document.getElementById(
      "chapter3RootMarkMemory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );

    memory.id =
      "chapter3RootMarkMemory";

    memory.className =
      "emphasis";

    memory.style.marginTop =
      "30px";

    memory.textContent =
      "La première marque de Root avait déjà été révélée. Lucy va maintenant découvrir qu’elle ne représentait qu’une partie de ce qui se cache sous la surface.";

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

  const lucySection =
    document.getElementById(
      "marque-lucy"
    );

  const textBlock =
    lucySection?.querySelector(
      ".text-block"
    );

  if (
    textBlock &&
    !document.getElementById(
      "chapter4PrologueMemory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );

    memory.id =
      "chapter4PrologueMemory";

    memory.className =
      "emphasis";

    memory.style.marginTop =
      "32px";

    if (
      prologueChoice ===
      "eveil"
    ) {

      memory.textContent =
        "Vous aviez choisi d’ouvrir les yeux. Lucy découvre maintenant qu’une vérité peut exister bien avant que nous soyons capables de la voir.";

    }

    if (
      prologueChoice ===
      "illusion"
    ) {

      memory.textContent =
        "Vous aviez choisi l’illusion. Pourtant, ce qui était invisible n’a jamais cessé d’exister.";

    }

    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

if (chapterEnd) {

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
        threshold: 0.35
      }
    );

  endObserver.observe(
    chapterEnd
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
    0.018;

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

  try {

    if (masterGain) {

      masterGain.gain
        .exponentialRampToValueAtTime(
          0.0001,
          audioCtx.currentTime +
            0.25
        );

    }

  } catch (error) {

    /* rien */

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
    320
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
  volume = 0.025,
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
    0.3,
    0.016
  );

  setTimeout(
    () => {

      playTone(
        575,
        0.4,
        0.014
      );

    },
    90
  );

}


function playRevealSound() {

  playTone(
    420,
    0.55,
    0.02
  );

  setTimeout(
    () => {

      playTone(
        630,
        0.7,
        0.016
      );

    },
    140
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
        1,
        0.015
      );

    },
    310
  );

}


function playDarkMarkSound() {

  playTone(
    180,
    0.75,
    0.024,
    "triangle"
  );

  setTimeout(
    () => {

      playTone(
        230,
        0.9,
        0.018,
        "sine"
      );

    },
    180
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


function playDragonSound() {

  playTone(
    220,
    1.1,
    0.024,
    "sine"
  );

  setTimeout(
    () => {

      playTone(
        330,
        1.25,
        0.02,
        "triangle"
      );

    },
    180
  );

  setTimeout(
    () => {

      playTone(
        495,
        1.4,
        0.018,
        "sine"
      );

    },
    360
  );

  setTimeout(
    () => {

      playTone(
        660,
        1.55,
        0.014,
        "triangle"
      );

    },
    540
  );

}


function playSecretSound() {

  playTone(
    540,
    0.55,
    0.02
  );

  setTimeout(
    () => {

      playTone(
        760,
        0.7,
        0.016
      );

    },
    130
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
   CLIC SUR POPUP
========================================================= */

if (secretPopup) {

  secretPopup.addEventListener(
    "click",
    hideSecretPopup
  );

}


/* =========================================================
   SAUVEGARDE AVANT DE QUITTER
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {

    const currentParams =
      new URLSearchParams(
        window.location.search
      );

    if (
      currentParams.get(
        "lecture"
      ) === "recommencer"
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
   IMPORTANT
   Aucun texte ni visuel narratif n'est caché.
   Seules les boîtes d'interaction utilisent
   des révélations.
========================================================= */


});
