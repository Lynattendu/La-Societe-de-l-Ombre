/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 2 — L’UNION FAIT LA FORCE
   Nouvelle version
   10 visuels / interactions narratives
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


/* =========================================================
   DERNIÈRE PAGE LUE
========================================================= */

localStorage.setItem(
  "societeOmbre_dernierePage",
  "chapitre2.html"
);

localStorage.setItem(
  "societeOmbre_dernierTitre",
  "Chapitre 2 — L’union fait la force"
);


/* =========================================================
   CLÉS LOCALSTORAGE
========================================================= */

const PREFIX =
  "societeOmbre_chapitre2_";

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

const STORAGE_PACT =
  PREFIX + "pact";


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
   PARAMÈTRES URL
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
   UTILITAIRES LOCALSTORAGE
========================================================= */

function loadJSON(
  key,
  fallback = {}
) {

  try {

    const raw =
      localStorage.getItem(
        key
      );

    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw);

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
  secretName
) {

  const secrets =
    getSecrets();

  if (
    !secrets.includes(
      secretName
    )
  ) {

    secrets.push(
      secretName
    );

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

  /*
     Petit délai pour laisser les images
     prendre leur place.
  */

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
    80
  );

} else {

  restoreScrollPosition();

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

        const scene =
          button.closest(".scene");

        if (!scene) {
          return;
        }

        const next =
          scene.nextElementSibling;

        if (next) {

          next.scrollIntoView({
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
      key.startsWith(
        PREFIX
      )
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
    "chapitre2.html?lecture=recommencer";

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


function closeReveal(
  element
) {

  if (!element) {
    return;
  }

  element.classList.remove(
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
   IA2 — DOSSIER ROOT
========================================================= */

const rootClueButtons =
  document.querySelectorAll(
    "[data-root-clue]"
  );

const rootClueReveal =
  document.getElementById(
    "rootClueReveal"
  );


const rootClueTexts = {

  voyages: `
    <h3>Voyages communs</h3>

    <p>
      IA2 retrouve plusieurs périodes durant lesquelles Root
      se trouvait dans les mêmes pays que la Tueuse Caméléon.
    </p>

    <p class="interaction-status">
      Corrélation détectée.
      Aucune preuve directe.
    </p>
  `,

  combat: `
    <h3>Capacités de combat</h3>

    <p>
      Root possède un niveau de combat très supérieur à celui
      attendu chez une archéologue.
    </p>

    <p>
      Anticipation, vitesse, précision et capacité
      à neutraliser plusieurs adversaires.
    </p>

    <p class="interaction-status">
      Compatible avec le profil.
      Insuffisant pour conclure.
    </p>
  `,

  disparition: `
    <h3>Disparition</h3>

    <p>
      Root devait rentrer aux États-Unis plusieurs jours
      auparavant.
    </p>

    <p>
      Aucun retour enregistré.
      Peu de messages.
      Aucun contact récent avec Lucy.
    </p>

    <p class="interaction-status">
      Situation inhabituelle.
    </p>
  `,

  profil: `
    <h3>Profil potentiel</h3>

    <p>
      Voyages internationaux.
      Capacités physiques élevées.
      Ressources importantes.
      Technologies inhabituelles.
      Goût du risque.
    </p>

    <p class="interaction-status">
      Hypothèse à approfondir.
      Ne pas confondre compatibilité et culpabilité.
    </p>
  `

};


let rootCluesFound =
  Array.isArray(
    getInteraction(
      "rootClues"
    )
  )
    ? getInteraction(
        "rootClues"
      )
    : [];


function updateRootClues() {

  rootClueButtons.forEach(
    (button) => {

      const value =
        button.dataset.rootClue;

      if (
        rootCluesFound.includes(
          value
        )
      ) {

        markCompleted(
          button
        );

      }

    }
  );

}


rootClueButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.rootClue;

        if (
          !rootClueTexts[value]
        ) {
          return;
        }

        if (
          !rootCluesFound.includes(
            value
          )
        ) {

          rootCluesFound.push(
            value
          );

          saveInteraction(
            "rootClues",
            rootCluesFound
          );

        }

        markCompleted(
          button
        );

        openReveal(
          rootClueReveal,
          rootClueTexts[value]
        );

        playClueSound();

      }
    );

  }
);

updateRootClues();


/* =========================================================
   INTERACTION 2
   LUCY — FAITS OU INSTINCT
========================================================= */

const lucyJudgmentButtons =
  document.querySelectorAll(
    "[data-lucy-judgment]"
  );

const lucyJudgmentReveal =
  document.getElementById(
    "lucyJudgmentReveal"
  );


const judgmentTexts = {

  facts: `
    <p>
      Les faits justifient une enquête.
      Ils ne suffisent pas à condamner Root.
    </p>

    <p>
      Lucy doit continuer à vérifier chaque élément
      avant de transformer une hypothèse en certitude.
    </p>
  `,

  instinct: `
    <p>
      L’instinct de Lucy lui indique qu’une pièce
      importante manque encore.
    </p>

    <p>
      Elle ne rejette pas les faits.
      Elle refuse simplement de leur faire dire
      davantage que ce qu’ils prouvent réellement.
    </p>
  `

};


function applyJudgment(
  value,
  button
) {

  saveInteraction(
    "lucyJudgment",
    value
  );

  markSelectedOnly(
    lucyJudgmentButtons,
    button
  );

  openReveal(
    lucyJudgmentReveal,
    judgmentTexts[value]
  );

  playRevealSound();

}


lucyJudgmentButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        applyJudgment(
          button.dataset
            .lucyJudgment,
          button
        );

      }
    );

  }
);


const savedJudgment =
  getInteraction(
    "lucyJudgment"
  );


if (
  savedJudgment &&
  judgmentTexts[
    savedJudgment
  ]
) {

  const savedButton =
    document.querySelector(
      `[data-lucy-judgment="${savedJudgment}"]`
    );

  if (savedButton) {

    markSelectedOnly(
      lucyJudgmentButtons,
      savedButton
    );

    openReveal(
      lucyJudgmentReveal,
      judgmentTexts[
        savedJudgment
      ]
    );

  }

}


/* =========================================================
   INTERACTION 3
   SYSTÈME DE SÉCURITÉ ROOT
========================================================= */

const securityRootButtons =
  document.querySelectorAll(
    "[data-security-root]"
  );

const securityRootReveal =
  document.getElementById(
    "securityRootReveal"
  );


const securityOrder = [
  "detect",
  "study",
  "adapt",
  "neutralize",
  "checkmate"
];


const securityTexts = {

  detect:
    "Le système repère l’intrus dès son entrée.",

  study:
    "Il analyse les réactions, les habitudes et les choix de Clive.",

  adapt:
    "Chaque nouvelle tentative permet au système de devenir plus efficace.",

  neutralize:
    "L’objectif n’est pas de tuer, mais de contrôler et repousser l’intrus.",

  checkmate:
    "Lors de sa dernière tentative, Clive comprend que le système connaît désormais suffisamment sa manière d’agir pour toujours avoir plusieurs coups d’avance."

};


let securityRootProgress =
  Number(
    getInteraction(
      "securityRootProgress"
    ) || 0
  );


function restoreSecurityRoot() {

  for (
    let i = 0;
    i < securityRootProgress;
    i++
  ) {

    const value =
      securityOrder[i];

    const button =
      document.querySelector(
        `[data-security-root="${value}"]`
      );

    markCompleted(
      button
    );

  }

  if (
    securityRootProgress >=
    securityOrder.length
  ) {

    openReveal(
      securityRootReveal,
      `
        <p>
          Détecter → étudier → apprendre → s’adapter → neutraliser.
        </p>

        <p class="impact-line">
          Échec et mat.
        </p>

        <p>
          Ce n’est plus seulement une alarme.
          C’est un système de sécurité capable d’apprendre
          de celui qu’il affronte.
        </p>
      `
    );

  }

}


securityRootButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .securityRoot;

        const expected =
          securityOrder[
            securityRootProgress
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
            450
          );

          return;

        }

        markCompleted(
          button
        );

        securityRootProgress++;

        saveInteraction(
          "securityRootProgress",
          securityRootProgress
        );

        openReveal(
          securityRootReveal,
          `<p>${securityTexts[value]}</p>`
        );

        playClueSound();

        if (
          securityRootProgress ===
          securityOrder.length
        ) {

          openReveal(
            securityRootReveal,
            `
              <p>
                Détecter → étudier → apprendre → s’adapter → neutraliser.
              </p>

              <p class="impact-line">
                Échec et mat.
              </p>

              <p>
                Clive ne s’est pas contenté de perdre contre
                une technologie.
                Il a perdu contre quelque chose qui apprenait
                de lui.
              </p>
            `
          );

          showSecret(
            "root-security",
            "Le système de Root apprend des réactions de l’intrus et adapte ensuite sa défense."
          );

        }

      }
    );

  }
);

restoreSecurityRoot();


/* =========================================================
   INTERACTION 4
   PRÉSENCE INVISIBLE
========================================================= */

const presenceButtons =
  document.querySelectorAll(
    "[data-presence]"
  );

const presenceReveal =
  document.getElementById(
    "presenceReveal"
  );


const presenceOrder = [
  "instinct",
  "silence",
  "thermal",
  "movement",
  "amy"
];


const presenceTexts = {

  instinct:
    "L’instinct de Root l’alerte avant qu’elle ne puisse expliquer pourquoi.",

  silence:
    "Aucun bruit. Aucune erreur de déplacement perceptible.",

  thermal:
    "La vision thermique ne détecte aucune présence.",

  movement:
    "Les capteurs de mouvement ne trouvent rien non plus.",

  amy:
    "Une personne capable d’échapper à la fois aux sens de Root et aux technologies de Peter correspond à une menace très particulière : le Fantôme de l’Ombre."
};


let presenceProgress =
  Number(
    getInteraction(
      "presenceProgress"
    ) || 0
  );


function restorePresence() {

  for (
    let i = 0;
    i < presenceProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-presence="${presenceOrder[i]}"]`
      )
    );

  }

  if (
    presenceProgress >=
    presenceOrder.length
  ) {

    openReveal(
      presenceReveal,
      `
        <p>
          Aucun appareil ne la voit.
          Root ne l’entend pas.
        </p>

        <p class="impact-line">
          Pourtant, quelqu’un est là.
        </p>

        <p>
          Amy.
        </p>
      `
    );

  }

}


presenceButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.presence;

        const expected =
          presenceOrder[
            presenceProgress
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
            450
          );

          return;

        }

        markCompleted(button);

        presenceProgress++;

        saveInteraction(
          "presenceProgress",
          presenceProgress
        );

        openReveal(
          presenceReveal,
          `<p>${presenceTexts[value]}</p>`
        );

        playClueSound();

        if (
          presenceProgress >=
          presenceOrder.length
        ) {

          showSecret(
            "amy-presence",
            "Amy peut rester suffisamment invisible pour échapper aux capteurs de Peter."
          );

        }

      }
    );

  }
);

restorePresence();


/* =========================================================
   INTERACTION 5
   TROUVER AMY
========================================================= */

const amyHuntVisual =
  document.querySelector(
    "[data-amy-hunt]"
  );

const amyHitbox =
  document.getElementById(
    "amyHitbox"
  );

const amySpotlight =
  document.getElementById(
    "amySpotlight"
  );

const amyResult =
  document.getElementById(
    "amyResult"
  );


function revealAmy(
  restore = false
) {

  if (amyHuntVisual) {

    amyHuntVisual.classList.add(
      "amy-found"
    );

  }

  if (amySpotlight) {

    amySpotlight.classList.add(
      "visible"
    );

  }

  if (amyResult) {

    amyResult.textContent =
      "Amy, le Fantôme de l’Ombre, était là.";

    amyResult.classList.add(
      "visible"
    );

  }

  saveInteraction(
    "amyFound",
    true
  );

  if (!restore) {

    playRevealSound();

    showSecret(
      "amy-found",
      "Root avait raison de faire confiance à son instinct : Amy observait réellement sa progression."
    );

  }

}


if (amyHitbox) {

  amyHitbox.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      revealAmy();

    }
  );

}


if (
  getInteraction(
    "amyFound"
  )
) {

  revealAmy(true);

}


/* =========================================================
   INTERACTION 6
   SEMER AMY
========================================================= */

const trailButtons =
  document.querySelectorAll(
    "[data-trail]"
  );

const trailReveal =
  document.getElementById(
    "trailReveal"
  );


const trailValues = [
  "change",
  "hide",
  "return",
  "erase",
  "false"
];


const trailTexts = {

  change:
    "Root change volontairement son itinéraire.",

  hide:
    "Elle utilise le terrain pour disparaître temporairement des zones où Amy pourrait l’observer.",

  return:
    "Elle revient sur ses pas afin de rendre sa trajectoire illogique.",

  erase:
    "Elle efface les traces qui pourraient révéler son véritable chemin.",

  false:
    "Elle crée volontairement de fausses pistes pour obliger Amy à perdre du temps."
};


let trailFound =
  Array.isArray(
    getInteraction(
      "trailFound"
    )
  )
    ? getInteraction(
        "trailFound"
      )
    : [];


function restoreTrail() {

  trailFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-trail="${value}"]`
        )
      );

    }
  );

  if (
    trailFound.length ===
    trailValues.length
  ) {

    openReveal(
      trailReveal,
      `
        <p>
          Root ne cherche pas à battre Amy.
        </p>

        <p>
          Elle cherche uniquement à lui faire perdre
          assez de temps pour protéger l’entrée de la grotte.
        </p>
      `
    );

  }

}


trailButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.trail;

        if (
          !trailFound.includes(
            value
          )
        ) {

          trailFound.push(value);

          saveInteraction(
            "trailFound",
            trailFound
          );

        }

        markCompleted(button);

        openReveal(
          trailReveal,
          `<p>${trailTexts[value]}</p>`
        );

        playClueSound();

        if (
          trailFound.length ===
          trailValues.length
        ) {

          openReveal(
            trailReveal,
            `
              <p>
                Modifier sa route.
                Disparaître.
                Revenir.
                Effacer.
                Tromper.
              </p>

              <p class="impact-line">
                Quelques heures d’avance.
              </p>

              <p>
                C’est tout ce dont Root avait besoin.
              </p>
            `
          );

        }

      }
    );

  }
);

restoreTrail();


/* =========================================================
   INTERACTION 7
   CASCADE — OBSERVER AUTREMENT
========================================================= */

const caveButtons =
  document.querySelectorAll(
    "[data-cave]"
  );

const caveReveal =
  document.getElementById(
    "caveReveal"
  );


const caveTexts = {

  water:
    "Le rythme de l’eau change selon les surfaces et les cavités qu’elle rencontre.",

  rock:
    "Certaines irrégularités de la roche peuvent cacher un passage ou une cavité.",

  sound:
    "Les échos permettent de percevoir ce que les yeux ne peuvent pas voir.",

  light:
    "La lumière révèle des reliefs et des différences invisibles dans l’obscurité."
};


let caveFound =
  Array.isArray(
    getInteraction(
      "caveFound"
    )
  )
    ? getInteraction(
        "caveFound"
      )
    : [];


function restoreCave() {

  caveFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-cave="${value}"]`
        )
      );

    }
  );

  if (
    caveFound.length >= 4
  ) {

    openReveal(
      caveReveal,
      `
        <p>
          Root cherchait encore comme une archéologue.
        </p>

        <p>
          Hope lui demande maintenant de faire autre chose :
          ressentir la grotte comme un ensemble.
        </p>
      `
    );

  }

}


caveButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.cave;

        if (
          !caveFound.includes(
            value
          )
        ) {

          caveFound.push(value);

          saveInteraction(
            "caveFound",
            caveFound
          );

        }

        markCompleted(button);

        openReveal(
          caveReveal,
          `<p>${caveTexts[value]}</p>`
        );

        playClueSound();

        if (
          caveFound.length >= 4
        ) {

          openReveal(
            caveReveal,
            `
              <p>
                Eau, roche, son et lumière
                ne sont pas quatre informations séparées.
              </p>

              <p class="impact-line">
                Elles forment un seul environnement.
              </p>
            `
          );

        }

      }
    );

  }
);

restoreCave();


/* =========================================================
   INTERACTION 8
   CONNEXION DE ROOT
========================================================= */

const connectionButtons =
  document.querySelectorAll(
    "[data-connection]"
  );

const connectionReveal =
  document.getElementById(
    "connectionReveal"
  );


const connectionOrder = [
  "observe",
  "listen",
  "feel",
  "memory"
];


const connectionTexts = {

  observe:
    "Root commence par ce qu’elle connaît : observer.",

  listen:
    "Puis elle cesse de chercher uniquement avec ses yeux et écoute réellement la grotte.",

  feel:
    "Les sensations cessent d’être un bruit de fond. Elles deviennent une information.",

  memory:
    "La mémoire héritée des Parques semble alors se mêler à ce qu’elle ressent autour d’elle."
};


let connectionProgress =
  Number(
    getInteraction(
      "connectionProgress"
    ) || 0
  );


function restoreConnection() {

  for (
    let i = 0;
    i < connectionProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-connection="${connectionOrder[i]}"]`
      )
    );

  }

  if (
    connectionProgress >=
    connectionOrder.length
  ) {

    openReveal(
      connectionReveal,
      `
        <p>
          Observer → écouter → ressentir → laisser la mémoire répondre.
        </p>

        <p>
          Root cesse de chercher la boîte.
          Elle sait simplement où aller.
        </p>
      `
    );

  }

}


connectionButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.connection;

        const expected =
          connectionOrder[
            connectionProgress
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
            450
          );

          return;

        }

        markCompleted(button);

        connectionProgress++;

        saveInteraction(
          "connectionProgress",
          connectionProgress
        );

        openReveal(
          connectionReveal,
          `<p>${connectionTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreConnection();


/* =========================================================
   INTERACTION 9
   BOÎTE DE PANDORE
========================================================= */

const pandoraButton =
  document.getElementById(
    "pandoraButton"
  );

const pandoraReveal =
  document.getElementById(
    "pandoraReveal"
  );


function revealPandora(
  restore = false
) {

  if (pandoraButton) {

    markCompleted(
      pandoraButton
    );

    pandoraButton.textContent =
      "Boîte examinée";

  }

  openReveal(
    pandoraReveal,
    `
      <p>
        L’objet tient entièrement dans la paume de Root.
      </p>

      <p>
        Sa surface porte des gravures anciennes,
        mais son poids semble presque impossible.
      </p>

      <p class="impact-line">
        Ce n’est pas une boîte ordinaire.
      </p>
    `
  );

  saveInteraction(
    "pandoraExamined",
    true
  );

  if (!restore) {

    playRevealSound();

  }

}


if (pandoraButton) {

  pandoraButton.addEventListener(
    "click",
    () => {

      revealPandora();

    }
  );

}


if (
  getInteraction(
    "pandoraExamined"
  )
) {

  revealPandora(true);

}


/* =========================================================
   INTERACTION 10
   TRANSFORMATION DE PANDORE
========================================================= */

const transformationButtons =
  document.querySelectorAll(
    "[data-transformation]"
  );

const transformationReveal =
  document.getElementById(
    "transformationReveal"
  );


const transformationOrder = [
  "box",
  "heart",
  "dissolve",
  "mark",
  "knowledge"
];


const transformationTexts = {

  box:
    "Root tient encore l’objet physique entre ses mains.",

  heart:
    "Une impulsion irrépressible lui demande de rapprocher la boîte de son cœur.",

  dissolve:
    "Au contact de sa peau, la matière se désagrège jusqu’à disparaître.",

  mark:
    "La boîte devient une marque : une cascade parcourue de ses anciens symboles.",

  knowledge:
    "Avec la marque viennent des impressions, des souvenirs et un savoir que Root ne sait pas encore utiliser."
};


let transformationProgress =
  Number(
    getInteraction(
      "transformationProgress"
    ) || 0
  );


function restoreTransformation() {

  for (
    let i = 0;
    i < transformationProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-transformation="${transformationOrder[i]}"]`
      )
    );

  }

  if (
    transformationProgress >=
    transformationOrder.length
  ) {

    openReveal(
      transformationReveal,
      `
        <p>
          La boîte n’a pas été détruite.
        </p>

        <p class="impact-line">
          Elle a changé de forme.
        </p>

        <p>
          Elle est désormais liée à Root.
        </p>
      `
    );

  }

}


transformationButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .transformation;

        const expected =
          transformationOrder[
            transformationProgress
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
            450
          );

          return;

        }

        markCompleted(button);

        transformationProgress++;

        saveInteraction(
          "transformationProgress",
          transformationProgress
        );

        openReveal(
          transformationReveal,
          `<p>${transformationTexts[value]}</p>`
        );

        playClueSound();

        if (
          transformationProgress >=
          transformationOrder.length
        ) {

          showSecret(
            "pandora-transformation",
            "La boîte de Pandore ne semble pas détruite : elle est désormais liée à Root sous une autre forme."
          );

        }

      }
    );

  }
);

restoreTransformation();


/* =========================================================
   INTERACTION 11
   ANALYSER L'ENLÈVEMENT
========================================================= */

const attackButtons =
  document.querySelectorAll(
    "[data-attack]"
  );

const attackReveal =
  document.getElementById(
    "attackReveal"
  );


const attackTexts = {

  number:
    "Les gardes sont dépassés par le nombre d’assaillants.",

  organization:
    "Les ravisseurs semblent coordonnés et préparés.",

  anticipation:
    "Chaque réponse des gardes paraît avoir été anticipée à l’avance.",

  target:
    "Leur objectif n’est pas de provoquer un affrontement : ils veulent Anna, rapidement et vivante."
};


let attackFound =
  Array.isArray(
    getInteraction(
      "attackFound"
    )
  )
    ? getInteraction(
        "attackFound"
      )
    : [];


function restoreAttack() {

  attackFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-attack="${value}"]`
        )
      );

    }
  );

  if (
    attackFound.length >= 4
  ) {

    openReveal(
      attackReveal,
      `
        <p>
          Il ne s’agit pas d’une attaque improvisée.
        </p>

        <p class="impact-line">
          L’enlèvement a été préparé.
        </p>
      `
    );

  }

}


attackButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.attack;

        if (
          !attackFound.includes(
            value
          )
        ) {

          attackFound.push(value);

          saveInteraction(
            "attackFound",
            attackFound
          );

        }

        markCompleted(button);

        openReveal(
          attackReveal,
          `<p>${attackTexts[value]}</p>`
        );

        playClueSound();

        if (
          attackFound.length >= 4
        ) {

          openReveal(
            attackReveal,
            `
              <p>
                Nombre + organisation + anticipation + objectif précis.
              </p>

              <p class="impact-line">
                Quelqu’un savait exactement comment atteindre Anna.
              </p>
            `
          );

        }

      }
    );

  }
);

restoreAttack();


/* =========================================================
   INTERACTION 12
   HALE / SENTINELLES
========================================================= */

const haleButtons =
  document.querySelectorAll(
    "[data-hale]"
  );

const haleReveal =
  document.getElementById(
    "haleReveal"
  );


const haleOrder = [
  "look",
  "salute",
  "mark",
  "sentinel"
];


const haleTexts = {

  look:
    "Dès que Hale croise le regard de Hope, son comportement change.",

  salute:
    "Il incline discrètement la tête. Un geste suffisamment subtil pour passer inaperçu aux yeux de presque tout le monde.",

  mark:
    "Hope fait apparaître le tatouage thermosensible dissimulé sur son poignet.",

  sentinel:
    "Hope reconnaît immédiatement la marque des Sentinelles de la Lumière."
};


let haleProgress =
  Number(
    getInteraction(
      "haleProgress"
    ) || 0
  );


function restoreHale() {

  for (
    let i = 0;
    i < haleProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-hale="${haleOrder[i]}"]`
      )
    );

  }

  if (
    haleProgress >=
    haleOrder.length
  ) {

    openReveal(
      haleReveal,
      `
        <p>
          Hale ne voit plus seulement en Hope
          la femme qui vient de sauver Anna.
        </p>

        <p class="impact-line">
          Il reconnaît la Protectrice.
        </p>
      `
    );

  }

}


haleButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.hale;

        const expected =
          haleOrder[
            haleProgress
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
            450
          );

          return;

        }

        markCompleted(button);

        haleProgress++;

        saveInteraction(
          "haleProgress",
          haleProgress
        );

        openReveal(
          haleReveal,
          `<p>${haleTexts[value]}</p>`
        );

        playClueSound();

        if (
          haleProgress >=
          haleOrder.length
        ) {

          showSecret(
            "hale-sentinel",
            "Hale appartient aux Sentinelles de la Lumière et reconnaît Hope comme la Protectrice."
          );

        }

      }
    );

  }
);

restoreHale();


/* =========================================================
   INTERACTION 13
   MAX — RÉSEAU D'INFLUENCE
========================================================= */

const maxNetworkButtons =
  document.querySelectorAll(
    "[data-max-network]"
  );

const maxNetworkReveal =
  document.getElementById(
    "maxNetworkReveal"
  );


const maxNetworkTexts = {

  anger:
    "Les colères, difficultés et revendications existent réellement.",

  influence:
    "Des intermédiaires peuvent encourager ou orienter certaines tensions sans les avoir créées.",

  attention:
    "Pendant que l’attention publique est concentrée ailleurs, d’autres décisions peuvent passer presque inaperçues.",

  interest:
    "Les actions observées servent parfois des intérêts économiques ou politiques très éloignés de ceux des citoyens mobilisés.",

  choice:
    "La manipulation devient particulièrement efficace lorsque la personne croit avoir librement choisi la direction préparée pour elle."
};


let maxNetworkFound =
  Array.isArray(
    getInteraction(
      "maxNetworkFound"
    )
  )
    ? getInteraction(
        "maxNetworkFound"
      )
    : [];


function restoreMaxNetwork() {

  maxNetworkFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-max-network="${value}"]`
        )
      );

    }
  );

  if (
    maxNetworkFound.length >= 5
  ) {

    openReveal(
      maxNetworkReveal,
      `
        <p>
          La manipulation n’annule pas forcément
          les causes réelles.
        </p>

        <p>
          Elle peut simplement exploiter,
          amplifier ou orienter ce qui existe déjà.
        </p>
      `
    );

  }

}


maxNetworkButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.maxNetwork;

        if (
          !maxNetworkFound.includes(
            value
          )
        ) {

          maxNetworkFound.push(value);

          saveInteraction(
            "maxNetworkFound",
            maxNetworkFound
          );

        }

        markCompleted(button);

        openReveal(
          maxNetworkReveal,
          `<p>${maxNetworkTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreMaxNetwork();


/* =========================================================
   INTERACTION 14
   MAX — QUE PUBLIER ?
========================================================= */

const maxChoiceButtons =
  document.querySelectorAll(
    "[data-max-choice]"
  );

const maxChoiceReveal =
  document.getElementById(
    "maxChoiceReveal"
  );


const maxChoiceTexts = {

  all: `
    <p>
      Tout révéler immédiatement donnerait au public
      l’intégralité des soupçons de Max.
    </p>

    <p>
      Mais certaines conclusions dépassent encore
      ce qu’il peut prouver.
    </p>
  `,

  nothing: `
    <p>
      Ne rien publier protégerait l’enquête.
    </p>

    <p>
      Mais cela empêcherait aussi les citoyens
      de voir les connexions déjà démontrables.
    </p>
  `,

  verified: `
    <p>
      Max choisit de montrer ce qu’il peut réellement prouver :
      les faits, les connexions, les contradictions
      et les zones d’ombre.
    </p>

    <p>
      Il laisse ensuite chacun construire sa propre réflexion.
    </p>
  `

};


function applyMaxChoice(
  value,
  button
) {

  saveInteraction(
    "maxChoice",
    value
  );

  markSelectedOnly(
    maxChoiceButtons,
    button
  );

  openReveal(
    maxChoiceReveal,
    maxChoiceTexts[value]
  );

  playRevealSound();

}


maxChoiceButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        applyMaxChoice(
          button.dataset.maxChoice,
          button
        );

      }
    );

  }
);


const savedMaxChoice =
  getInteraction(
    "maxChoice"
  );


if (
  savedMaxChoice &&
  maxChoiceTexts[
    savedMaxChoice
  ]
) {

  const button =
    document.querySelector(
      `[data-max-choice="${savedMaxChoice}"]`
    );

  if (button) {

    markSelectedOnly(
      maxChoiceButtons,
      button
    );

    openReveal(
      maxChoiceReveal,
      maxChoiceTexts[
        savedMaxChoice
      ]
    );

  }

}


/* =========================================================
   INTERACTION 15
   ENQUÊTE SUR HOPE
========================================================= */

const hopeClueButtons =
  document.querySelectorAll(
    "[data-hope-clue]"
  );

const hopeClueReveal =
  document.getElementById(
    "hopeClueReveal"
  );


const hopeClueTexts = {

  traces:
    "Les premières traces administratives fiables de Hope Awake n’apparaissent qu’environ quatre ans auparavant.",

  ted:
    "Ted Awake avait été recueilli puis adopté après la disparition de sa famille.",

  crash:
    "La famille de Ted a disparu lors du crash d’un Airbus A380 en Chine.",

  child:
    "Une fillette de douze ans figurait parmi les passagers. Son corps n’a jamais été retrouvé."
};


let hopeCluesFound =
  Array.isArray(
    getInteraction(
      "hopeClues"
    )
  )
    ? getInteraction(
        "hopeClues"
      )
    : [];


function restoreHopeClues() {

  hopeCluesFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-hope-clue="${value}"]`
        )
      );

    }
  );

  if (
    hopeCluesFound.length >= 4
  ) {

    openReveal(
      hopeClueReveal,
      `
        <p>
          Quatre années de traces.
          Un frère adopté.
          Un crash en Chine.
          Une enfant disparue.
        </p>

        <p class="impact-line">
          Il reste une hypothèse à vérifier.
        </p>
      `
    );

  }

}


hopeClueButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.hopeClue;

        if (
          !hopeCluesFound.includes(
            value
          )
        ) {

          hopeCluesFound.push(value);

          saveInteraction(
            "hopeClues",
            hopeCluesFound
          );

        }

        markCompleted(button);

        openReveal(
          hopeClueReveal,
          `<p>${hopeClueTexts[value]}</p>`
        );

        playClueSound();

        if (
          hopeCluesFound.length >= 4
        ) {

          openReveal(
            hopeClueReveal,
            `
              <p>
                Le passé officiel de Hope possède
                une immense zone vide.
              </p>

              <p>
                La fillette disparue pourrait être
                la pièce qui manque.
              </p>
            `
          );

        }

      }
    );

  }
);

restoreHopeClues();


/* =========================================================
   INTERACTION 16
   COMPARAISON MORPHOLOGIQUE
========================================================= */

const hopeCompareBtn =
  document.getElementById(
    "hopeCompareBtn"
  );

const hopeComparison =
  document.getElementById(
    "hopeComparison"
  );


function revealHopeComparison(
  restore = false
) {

  if (hopeCompareBtn) {

    markCompleted(
      hopeCompareBtn
    );

    hopeCompareBtn.textContent =
      "Comparaison terminée";

  }

  openReveal(
    hopeComparison,
    `
      <p>
        Structure osseuse :
        compatible.
      </p>

      <p>
        Écartement des yeux :
        compatible.
      </p>

      <p>
        Proportions du visage :
        compatibles.
      </p>

      <p class="impact-line">
        Concordance morphologique très élevée.
      </p>

      <p>
        Les données justifient une enquête approfondie,
        mais ne permettent pas encore une identification certaine.
      </p>
    `
  );

  saveInteraction(
    "hopeComparison",
    true
  );

  if (!restore) {

    playRevealSound();

    showSecret(
      "hope-child",
      "Hope pourrait être la fillette disparue du crash en Chine."
    );

  }

}


if (hopeCompareBtn) {

  hopeCompareBtn.addEventListener(
    "click",
    revealHopeComparison
  );

}


if (
  getInteraction(
    "hopeComparison"
  )
) {

  revealHopeComparison(true);

}


/* =========================================================
   INTERACTION 17
   EXAMINER LE PHÉNIX
========================================================= */

const phoenixButtons =
  document.querySelectorAll(
    "[data-phoenix]"
  );

const phoenixReveal =
  document.getElementById(
    "phoenixReveal"
  );


const phoenixTexts = {

  movement:
    "Les mouvements sont suffisamment naturels pour reproduire le comportement d’un véritable oiseau.",

  plumage:
    "L’apparence extérieure ne laisse pratiquement aucune trace visible de technologie.",

  breathing:
    "Même la respiration et les réactions semblent organiques.",

  genetics:
    "Peter a combiné sa technologie à certains travaux de Betty Flores en biogénétique."
};


let phoenixFound =
  Array.isArray(
    getInteraction(
      "phoenixFound"
    )
  )
    ? getInteraction(
        "phoenixFound"
      )
    : [];


function restorePhoenix() {

  phoenixFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-phoenix="${value}"]`
        )
      );

    }
  );

  if (
    phoenixFound.length >= 4
  ) {

    openReveal(
      phoenixReveal,
      `
        <p>
          Le Phénix n’est plus simplement une machine
          imitant un animal.
        </p>

        <p class="impact-line">
          Technologie et biogénétique se rejoignent.
        </p>
      `
    );

  }

}


phoenixButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.phoenix;

        if (
          !phoenixFound.includes(
            value
          )
        ) {

          phoenixFound.push(value);

          saveInteraction(
            "phoenixFound",
            phoenixFound
          );

        }

        markCompleted(button);

        openReveal(
          phoenixReveal,
          `<p>${phoenixTexts[value]}</p>`
        );

        playClueSound();

        if (
          phoenixFound.length >= 4
        ) {

          showSecret(
            "phoenix-origin",
            "Peter a uni sa technologie aux recherches génétiques de Betty pour créer le Phénix."
          );

        }

      }
    );

  }
);

restorePhoenix();


/* =========================================================
   INTERACTION 18
   RELIER ROOT À HOPE
========================================================= */

const linkButtons =
  document.querySelectorAll(
    "[data-link]"
  );

const linkReveal =
  document.getElementById(
    "linkReveal"
  );


const linkOrder = [
  "message",
  "restaurant",
  "security",
  "training",
  "hope"
];


const linkTexts = {

  message:
    "Root révèle à Lucy qu’elle se trouve elle aussi au Mexique.",

  restaurant:
    "Root mentionne un restaurant français haut de gamme qui ouvre très bientôt dans la même région.",

  security:
    "Clive découvre chez Hope un système de sécurité fondé sur une philosophie très proche de celui de Root.",

  training:
    "Root avait déjà expliqué qu’une amie lui avait enseigné ses fameux « petits trucs utiles au cas où ».",

  hope:
    "Les éléments convergent vers une hypothèse : cette amie est Hope."
};


let linkProgress =
  Number(
    getInteraction(
      "linkProgress"
    ) || 0
  );


function restoreLink() {

  for (
    let i = 0;
    i < linkProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-link="${linkOrder[i]}"]`
      )
    );

  }

  if (
    linkProgress >=
    linkOrder.length
  ) {

    openReveal(
      linkReveal,
      `
        <p>
          Mexique + restaurant français + technologie similaire
          + amie combattante.
        </p>

        <p class="impact-line">
          Root et Hope se connaissent.
        </p>
      `
    );

  }

}


linkButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.link;

        const expected =
          linkOrder[
            linkProgress
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
            450
          );

          return;

        }

        markCompleted(button);

        linkProgress++;

        saveInteraction(
          "linkProgress",
          linkProgress
        );

        openReveal(
          linkReveal,
          `<p>${linkTexts[value]}</p>`
        );

        playClueSound();

        if (
          linkProgress >=
          linkOrder.length
        ) {

          showSecret(
            "root-hope-link",
            "Lucy comprend que Root et Hope sont presque certainement liées."
          );

        }

      }
    );

  }
);

restoreLink();


/* =========================================================
   PACTE FINAL
========================================================= */

const pactButton =
  document.getElementById(
    "pactButton"
  );

const pactResult =
  document.getElementById(
    "pactResult"
  );


function completePact(
  restore = false
) {

  localStorage.setItem(
    STORAGE_PACT,
    "1"
  );

  localStorage.setItem(
    STORAGE_COMPLETED,
    "1"
  );

  localStorage.setItem(
    STORAGE_PROGRESS,
    "1"
  );

  if (pactButton) {

    markCompleted(
      pactButton
    );

    pactButton.textContent =
      "Pacte accepté";

    pactButton.disabled =
      true;

  }

  openReveal(
    pactResult,
    `
      <p>
        Trois mains attendent celle de Lucy.
      </p>

      <p>
        La raison lui demande des preuves.
        Son instinct lui demande de faire confiance.
      </p>

      <p class="impact-line">
        Aucun mensonge.
      </p>

      <p>
        Lucy accepte d’entrer dans le cercle.
      </p>

      <p class="emphasis-line">
        L’union fait la force.
      </p>
    `
  );

  if (!restore) {

    playPactSound();

    showSecret(
      "pact",
      "Lucy accepte pour la première fois depuis longtemps d’accorder une part de confiance sans disposer de toutes les preuves."
    );

  }

}


if (pactButton) {

  pactButton.addEventListener(
    "click",
    () => {

      completePact(false);

    }
  );

}


if (
  localStorage.getItem(
    STORAGE_PACT
  ) === "1"
) {

  completePact(true);

}


/* =========================================================
   SON
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
    40;

  gain1.gain.value =
    0.65;

  ambienceOsc2.type =
    "triangle";

  ambienceOsc2.frequency.value =
    79;

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
   EFFETS SONORES
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
        580,
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


function playPactSound() {

  playTone(
    330,
    1,
    0.018
  );

  setTimeout(
    () => {

      playTone(
        495,
        1.1,
        0.018
      );

    },
    160
  );

  setTimeout(
    () => {

      playTone(
        660,
        1.2,
        0.016
      );

    },
    320
  );

}


/* =========================================================
   FERMETURE MENU / POPUP AVEC ÉCHAP
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
   CLIC POPUP
========================================================= */

if (secretPopup) {

  secretPopup.addEventListener(
    "click",
    hideSecretPopup
  );

}


/* =========================================================
   FIN DE CHAPITRE
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
   Aucun texte ni aucune image n'est caché par JavaScript.
   Les animations concernent uniquement les interactions.
========================================================= */


});
