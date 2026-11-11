/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 3 — LA CONFIANCE
   Nouvelle version
   10 visuels / 18 interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


/* =========================================================
   DERNIÈRE PAGE LUE
========================================================= */

localStorage.setItem(
  "societeOmbre_dernierePage",
  "chapitre3.html"
);

localStorage.setItem(
  "societeOmbre_dernierTitre",
  "Chapitre 3 — La Confiance"
);


/* =========================================================
   CLÉS LOCALSTORAGE
========================================================= */

const PREFIX =
  "societeOmbre_chapitre3_";

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
   OUTILS LOCALSTORAGE
========================================================= */

function loadJSON(
  key,
  fallback = {}
) {

  try {

    const raw =
      localStorage.getItem(key);

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
   MÉMOIRE INTERACTIONS
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
   CONFIANCE ENVERS HALE
========================================================= */

const haleTrustButtons =
  document.querySelectorAll(
    "[data-hale-trust]"
  );

const haleTrustReveal =
  document.getElementById(
    "haleTrustReveal"
  );


const haleTrustTexts = {

  trust: `
    <p>
      Hale parle avec une certitude absolue.
    </p>

    <p>
      Sa réponse laisse entendre qu’il possède
      peut-être une information que Betty ignore encore.
    </p>
  `,

  doubt: `
    <p>
      Betty n’a aucun moyen de vérifier
      ce que Hale affirme.
    </p>

    <p>
      Sa méfiance reste donc parfaitement logique.
    </p>
  `

};


function applyHaleTrust(
  value,
  button
) {

  saveInteraction(
    "haleTrust",
    value
  );

  markSelectedOnly(
    haleTrustButtons,
    button
  );

  openReveal(
    haleTrustReveal,
    haleTrustTexts[value]
  );

  playClueSound();

}


haleTrustButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        applyHaleTrust(
          button.dataset.haleTrust,
          button
        );

      }
    );

  }
);


const savedHaleTrust =
  getInteraction(
    "haleTrust"
  );


if (
  savedHaleTrust &&
  haleTrustTexts[
    savedHaleTrust
  ]
) {

  const button =
    document.querySelector(
      `[data-hale-trust="${savedHaleTrust}"]`
    );

  if (button) {

    markSelectedOnly(
      haleTrustButtons,
      button
    );

    openReveal(
      haleTrustReveal,
      haleTrustTexts[
        savedHaleTrust
      ]
    );

  }

}


/* =========================================================
   INTERACTION 2
   SÉCURITÉ DE L'HACIENDA
========================================================= */

const securityButtons =
  document.querySelectorAll(
    "[data-security]"
  );

const securityReveal =
  document.getElementById(
    "securityReveal"
  );


const securityTexts = {

  drones:
    "Les drones se positionnent autour du véhicule sans agressivité apparente mais sans laisser d’angle mort.",

  identity:
    "Le système connaît immédiatement l’identité et la profession de Betty.",

  validation:
    "L’accès n’est accordé qu’après une validation distante ou automatisée.",

  anticipation:
    "James connaît déjà l’identité de la visiteuse avant qu’elle n’entre réellement dans l’hacienda."
};


let securityFound =
  Array.isArray(
    getInteraction(
      "securityFound"
    )
  )
    ? getInteraction(
        "securityFound"
      )
    : [];


function restoreSecurity() {

  securityFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-security="${value}"]`
        )
      );

    }
  );

  if (
    securityFound.length >= 4
  ) {

    openReveal(
      securityReveal,
      `
        <p>
          L’hacienda ne se contente pas de surveiller.
        </p>

        <p class="impact-line">
          Elle anticipe.
        </p>
      `
    );

  }

}


securityButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.security;

        if (
          !securityFound.includes(
            value
          )
        ) {

          securityFound.push(value);

          saveInteraction(
            "securityFound",
            securityFound
          );

        }

        markCompleted(button);

        openReveal(
          securityReveal,
          `<p>${securityTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreSecurity();


/* =========================================================
   INTERACTION 3
   BETTY ENTRE DANS LE PACTE
========================================================= */

const bettyTrustButton =
  document.getElementById(
    "bettyTrustButton"
  );

const bettyTrustReveal =
  document.getElementById(
    "bettyTrustReveal"
  );


function acceptBettyTrust(
  restore = false
) {

  saveInteraction(
    "bettyTrust",
    true
  );

  markCompleted(
    bettyTrustButton
  );

  if (bettyTrustButton) {

    bettyTrustButton.textContent =
      "Accord accepté";

    bettyTrustButton.disabled =
      true;

  }

  openReveal(
    bettyTrustReveal,
    `
      <p>
        Betty accepte de rester.
      </p>

      <p>
        Elle n’accorde pas encore sa confiance à Hope.
      </p>

      <p class="impact-line">
        Mais elle accepte d’écouter.
      </p>
    `
  );

  if (!restore) {

    playRevealSound();

  }

}


if (bettyTrustButton) {

  bettyTrustButton.addEventListener(
    "click",
    () => {

      acceptBettyTrust(false);

    }
  );

}


if (
  getInteraction(
    "bettyTrust"
  )
) {

  acceptBettyTrust(true);

}


/* =========================================================
   INTERACTION 4
   DANGER AUTOUR D'ANNA
========================================================= */

const annaDangerButtons =
  document.querySelectorAll(
    "[data-anna-danger]"
  );

const annaDangerReveal =
  document.getElementById(
    "annaDangerReveal"
  );


const annaDangerTexts = {

  before:
    "La tentative d’enlèvement a eu lieu avant qu’Anna soit réellement liée à Hope.",

  target:
    "Le danger ne vient donc pas uniquement de la proximité avec Hope ou de son conflit avec Santalucibel.",

  reason:
    "La vraie question devient : pourquoi quelqu’un s’intéressait-il déjà à Anna ?"
};


let annaDangerFound =
  Array.isArray(
    getInteraction(
      "annaDangerFound"
    )
  )
    ? getInteraction(
        "annaDangerFound"
      )
    : [];


function restoreAnnaDanger() {

  annaDangerFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-anna-danger="${value}"]`
        )
      );

    }
  );

  if (
    annaDangerFound.length >= 3
  ) {

    openReveal(
      annaDangerReveal,
      `
        <p>
          Anna était déjà une cible.
        </p>

        <p class="impact-line">
          Le danger précédait Hope.
        </p>
      `
    );

  }

}


annaDangerButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .annaDanger;

        if (
          !annaDangerFound.includes(
            value
          )
        ) {

          annaDangerFound.push(
            value
          );

          saveInteraction(
            "annaDangerFound",
            annaDangerFound
          );

        }

        markCompleted(button);

        openReveal(
          annaDangerReveal,
          `<p>${annaDangerTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreAnnaDanger();


/* =========================================================
   INTERACTION 5
   BOUCLIER D'ANNA
========================================================= */

const shieldTrigger =
  document.getElementById(
    "shieldTrigger"
  );

const shieldReveal =
  document.getElementById(
    "shieldReveal"
  );


function activateShield(
  restore = false
) {

  saveInteraction(
    "shield",
    true
  );

  markCompleted(
    shieldTrigger
  );

  if (shieldTrigger) {

    shieldTrigger.textContent =
      "Protection activée";

    shieldTrigger.disabled =
      true;

  }

  openReveal(
    shieldReveal,
    `
      <p>
        Le dispositif réagit avant que Root n’atteigne Anna.
      </p>

      <p class="impact-line">
        Protection active.
      </p>

      <p>
        Le système ne transforme pas Anna en combattante.
        Il lui donne seulement une barrière supplémentaire.
      </p>
    `
  );

  if (!restore) {

    playRevealSound();

    showSecret(
      "anna-shield",
      "Le bouclier réagit suffisamment vite pour interrompre l’attaque de Root avant le contact."
    );

  }

}


if (shieldTrigger) {

  shieldTrigger.addEventListener(
    "click",
    () => {

      activateShield(false);

    }
  );

}


if (
  getInteraction(
    "shield"
  )
) {

  activateShield(true);

}


/* =========================================================
   INTERACTION 6
   LIMITES DU BOUCLIER
========================================================= */

const shieldLimitButtons =
  document.querySelectorAll(
    "[data-shield-limit]"
  );

const shieldLimitReveal =
  document.getElementById(
    "shieldLimitReveal"
  );


const shieldLimitTexts = {

  physical:
    "Le dispositif peut arrêter ou réduire de nombreuses agressions physiques.",

  fear:
    "Une barrière physique ne supprime pas la peur ressentie pendant une attaque.",

  manipulation:
    "Aucun bouclier matériel ne protège automatiquement contre la manipulation.",

  trauma:
    "Être protégée physiquement ne supprime pas les conséquences psychologiques d’une agression."
};


let shieldLimitsFound =
  Array.isArray(
    getInteraction(
      "shieldLimitsFound"
    )
  )
    ? getInteraction(
        "shieldLimitsFound"
      )
    : [];


function restoreShieldLimits() {

  shieldLimitsFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-shield-limit="${value}"]`
        )
      );

    }
  );

  if (
    shieldLimitsFound.length >= 4
  ) {

    openReveal(
      shieldLimitReveal,
      `
        <p>
          Le bouclier augmente les chances de survie.
        </p>

        <p class="impact-line">
          Il ne rend pas invincible.
        </p>
      `
    );

  }

}


shieldLimitButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .shieldLimit;

        if (
          !shieldLimitsFound.includes(
            value
          )
        ) {

          shieldLimitsFound.push(
            value
          );

          saveInteraction(
            "shieldLimitsFound",
            shieldLimitsFound
          );

        }

        markCompleted(button);

        openReveal(
          shieldLimitReveal,
          `<p>${shieldLimitTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreShieldLimits();


/* =========================================================
   INTERACTION 7
   TECHNOLOGIE BIO-HOLOPHONE
========================================================= */

const bioTechButtons =
  document.querySelectorAll(
    "[data-bio-tech]"
  );

const bioTechReveal =
  document.getElementById(
    "bioTechReveal"
  );


const bioTechOrder = [
  "old",
  "calibration",
  "adaptation"
];


const bioTechTexts = {

  old:
    "La première génération demandait une individualisation longue et complexe.",

  calibration:
    "La nouvelle génération effectue une adaptation de base presque automatiquement en quelques secondes.",

  adaptation:
    "Le dispositif continue ensuite à ajuster progressivement sa connexion aux caractéristiques biologiques de l’utilisateur."
};


let bioTechProgress =
  Number(
    getInteraction(
      "bioTechProgress"
    ) || 0
  );


function restoreBioTech() {

  for (
    let i = 0;
    i < bioTechProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-bio-tech="${bioTechOrder[i]}"]`
      )
    );

  }

  if (
    bioTechProgress >=
    bioTechOrder.length
  ) {

    openReveal(
      bioTechReveal,
      `
        <p>
          Première génération → auto-calibration → adaptation biologique progressive.
        </p>

        <p class="impact-line">
          Peter a franchi une étape considérable.
        </p>
      `
    );

  }

}


bioTechButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.bioTech;

        const expected =
          bioTechOrder[
            bioTechProgress
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

        bioTechProgress++;

        saveInteraction(
          "bioTechProgress",
          bioTechProgress
        );

        openReveal(
          bioTechReveal,
          `<p>${bioTechTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreBioTech();


/* =========================================================
   INTERACTION 8
   ACTIVER LE BIO-HOLOPHONE
========================================================= */

const hologramTrigger =
  document.getElementById(
    "hologramTrigger"
  );

const hologramReveal =
  document.getElementById(
    "hologramReveal"
  );


function activateHologram(
  restore = false
) {

  saveInteraction(
    "hologram",
    true
  );

  markCompleted(
    hologramTrigger
  );

  if (hologramTrigger) {

    hologramTrigger.textContent =
      "Bio-holophone actif";

    hologramTrigger.disabled =
      true;

  }

  openReveal(
    hologramReveal,
    `
      <p>
        Connexion biologique reconnue.
      </p>

      <p>
        Transmission holographique stable.
      </p>

      <p>
        Latence presque inexistante.
      </p>

      <p class="impact-line">
        Nouvelle génération validée.
      </p>
    `
  );

  if (!restore) {

    playHologramSound();

    showSecret(
      "bio-holophone",
      "Peter a considérablement amélioré la technologie connue par Betty."
    );

  }

}


if (hologramTrigger) {

  hologramTrigger.addEventListener(
    "click",
    () => {

      activateHologram(false);

    }
  );

}


if (
  getInteraction(
    "hologram"
  )
) {

  activateHologram(true);

}


/* =========================================================
   INTERACTION 9
   IDENTITÉ DE HOPE
========================================================= */

const hopeIdentityButtons =
  document.querySelectorAll(
    "[data-hope-identity]"
  );

const hopeIdentityReveal =
  document.getElementById(
    "hopeIdentityReveal"
  );


const hopeIdentityTexts = {

  name:
    "Le véritable nom de Hope est Hope Lynattendu.",

  crash:
    "Elle voyageait avec ses parents dans l’avion qui s’est écrasé en Chine.",

  age:
    "Hope avait douze ans au moment du crash.",

  missing:
    "Son corps n’ayant jamais été retrouvé, elle a été portée disparue puis présumée morte."
};


let hopeIdentityFound =
  Array.isArray(
    getInteraction(
      "hopeIdentityFound"
    )
  )
    ? getInteraction(
        "hopeIdentityFound"
      )
    : [];


function restoreHopeIdentity() {

  hopeIdentityFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-hope-identity="${value}"]`
        )
      );

    }
  );

  if (
    hopeIdentityFound.length >= 4
  ) {

    openReveal(
      hopeIdentityReveal,
      `
        <p>
          Hope Awake est une identité reconstruite.
        </p>

        <p class="impact-line">
          Hope Lynattendu a officiellement disparu à douze ans.
        </p>
      `
    );

  }

}


hopeIdentityButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .hopeIdentity;

        if (
          !hopeIdentityFound.includes(
            value
          )
        ) {

          hopeIdentityFound.push(
            value
          );

          saveInteraction(
            "hopeIdentityFound",
            hopeIdentityFound
          );

        }

        markCompleted(button);

        openReveal(
          hopeIdentityReveal,
          `<p>${hopeIdentityTexts[value]}</p>`
        );

        playClueSound();

        if (
          hopeIdentityFound.length >= 4
        ) {

          showSecret(
            "hope-identity",
            "L’enquête de Lucy sur la fillette disparue conduisait bien à Hope."
          );

        }

      }
    );

  }
);

restoreHopeIdentity();


/* =========================================================
   INTERACTION 10
   HOPE / AMY
========================================================= */

const pathButtons =
  document.querySelectorAll(
    "[data-path]"
  );

const pathsReveal =
  document.getElementById(
    "pathsReveal"
  );


const pathTexts = {

  hope: `
    <p>
      Hope est recueillie par les Lumsenti.
    </p>

    <p>
      Elle grandit auprès des Sentinelles de la Lumière
      et de Maître Lee.
    </p>
  `,

  amy: `
    <p>
      Amy survit elle aussi.
    </p>

    <p>
      Mais elle est recueillie par ceux que les Sentinelles
      appellent aujourd’hui les Gardiens Noirs.
    </p>
  `

};


let pathsFound =
  Array.isArray(
    getInteraction(
      "pathsFound"
    )
  )
    ? getInteraction(
        "pathsFound"
      )
    : [];


function restorePaths() {

  pathsFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-path="${value}"]`
        )
      );

    }
  );

  if (
    pathsFound.length >= 2
  ) {

    openReveal(
      pathsReveal,
      `
        <p>
          Deux enfants survivent au même événement.
        </p>

        <p class="impact-line">
          Puis leurs vies prennent deux directions opposées.
        </p>
      `
    );

  }

}


pathButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.path;

        if (
          !pathsFound.includes(
            value
          )
        ) {

          pathsFound.push(value);

          saveInteraction(
            "pathsFound",
            pathsFound
          );

        }

        markCompleted(button);

        openReveal(
          pathsReveal,
          pathTexts[value]
        );

        playClueSound();

        if (
          pathsFound.length >= 2
        ) {

          showSecret(
            "hope-amy-paths",
            "Hope et Amy partagent le même point de départ, mais les deux camps ont façonné leurs vies dans des directions opposées."
          );

        }

      }
    );

  }
);

restorePaths();


/* =========================================================
   INTERACTION 11
   CONFIRMATION ENQUÊTE DE LUCY
========================================================= */

const hopeConfirmButtons =
  document.querySelectorAll(
    "[data-hope-confirm]"
  );

const hopeConfirmReveal =
  document.getElementById(
    "hopeConfirmReveal"
  );


const hopeConfirmTexts = {

  crash:
    "CONFIRMÉ : Hope reconnaît avoir survécu au crash en Chine.",

  child:
    "CONFIRMÉ : la fillette disparue des archives est bien Hope.",

  absence:
    "CONFIRMÉ : les années vécues auprès des Lumsenti expliquent l’absence presque totale de traces administratives."
};


let hopeConfirmFound =
  Array.isArray(
    getInteraction(
      "hopeConfirmFound"
    )
  )
    ? getInteraction(
        "hopeConfirmFound"
      )
    : [];


function restoreHopeConfirm() {

  hopeConfirmFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-hope-confirm="${value}"]`
        )
      );

    }
  );

  if (
    hopeConfirmFound.length >= 3
  ) {

    openReveal(
      hopeConfirmReveal,
      `
        <p>
          L’enquête de Lucy n’était pas fausse.
        </p>

        <p class="impact-line">
          Elle était incomplète.
        </p>
      `
    );

  }

}


hopeConfirmButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset
            .hopeConfirm;

        if (
          !hopeConfirmFound.includes(
            value
          )
        ) {

          hopeConfirmFound.push(
            value
          );

          saveInteraction(
            "hopeConfirmFound",
            hopeConfirmFound
          );

        }

        markCompleted(button);

        openReveal(
          hopeConfirmReveal,
          `<p>${hopeConfirmTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreHopeConfirm();


/* =========================================================
   INTERACTION 12
   DISPARITION DES TROIS ÉTUDIANTS
========================================================= */

const studentsButtons =
  document.querySelectorAll(
    "[data-students]"
  );

const studentsReveal =
  document.getElementById(
    "studentsReveal"
  );


const studentsOrder = [
  "lost",
  "fall",
  "hope",
  "promise"
];


const studentsTexts = {

  lost:
    "Root, Peter et Max se perdent dans une région isolée.",

  fall:
    "Leur exploration tourne au désastre lorsqu’ils tombent dans un gouffre.",

  hope:
    "Hope finit par les retrouver, les soigner et les aider à survivre.",

  promise:
    "Avant leur retour dans le monde extérieur, ils promettent de ne jamais révéler son existence ni celle des Sentinelles."
};


let studentsProgress =
  Number(
    getInteraction(
      "studentsProgress"
    ) || 0
  );


function restoreStudents() {

  for (
    let i = 0;
    i < studentsProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-students="${studentsOrder[i]}"]`
      )
    );

  }

  if (
    studentsProgress >=
    studentsOrder.length
  ) {

    openReveal(
      studentsReveal,
      `
        <p>
          Disparition → chute → survie → promesse.
        </p>

        <p class="impact-line">
          Douze jours qui ont créé un lien durable.
        </p>
      `
    );

  }

}


studentsButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.students;

        const expected =
          studentsOrder[
            studentsProgress
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

        studentsProgress++;

        saveInteraction(
          "studentsProgress",
          studentsProgress
        );

        openReveal(
          studentsReveal,
          `<p>${studentsTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreStudents();


/* =========================================================
   INTERACTION 13
   QUÊTE DE ROOT
========================================================= */

const rootQuestButtons =
  document.querySelectorAll(
    "[data-root-quest]"
  );

const rootQuestReveal =
  document.getElementById(
    "rootQuestReveal"
  );


const rootQuestOrder = [
  "stone",
  "symbols",
  "object",
  "vial"
];


const rootQuestTexts = {

  stone:
    "Tout commence avec une pierre découverte par Root lorsqu’elle était enfant.",

  symbols:
    "La pierre porte des symboles inconnus que Root étudie pendant des années.",

  object:
    "Les inscriptions finissent par lui faire comprendre qu’elles indiquent l’existence d’un objet ancien.",

  vial:
    "Cet objet est une fiole mystérieuse contenant quelque chose que Root ne sait pas encore expliquer."
};


let rootQuestProgress =
  Number(
    getInteraction(
      "rootQuestProgress"
    ) || 0
  );


function restoreRootQuest() {

  for (
    let i = 0;
    i < rootQuestProgress;
    i++
  ) {

    markCompleted(
      document.querySelector(
        `[data-root-quest="${rootQuestOrder[i]}"]`
      )
    );

  }

  if (
    rootQuestProgress >=
    rootQuestOrder.length
  ) {

    openReveal(
      rootQuestReveal,
      `
        <p>
          Pierre → symboles → légende → fiole.
        </p>

        <p class="impact-line">
          Une obsession d’enfant devient une quête de toute une vie.
        </p>
      `
    );

  }

}


rootQuestButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.rootQuest;

        const expected =
          rootQuestOrder[
            rootQuestProgress
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

        rootQuestProgress++;

        saveInteraction(
          "rootQuestProgress",
          rootQuestProgress
        );

        openReveal(
          rootQuestReveal,
          `<p>${rootQuestTexts[value]}</p>`
        );

        playClueSound();

      }
    );

  }
);

restoreRootQuest();


/* =========================================================
   INTERACTION 14
   BETTY ET LA FIOLE
========================================================= */

const vialMemoryButton =
  document.getElementById(
    "vialMemoryButton"
  );

const vialMemoryReveal =
  document.getElementById(
    "vialMemoryReveal"
  );


function revealVialMemory(
  restore = false
) {

  saveInteraction(
    "vialMemory",
    true
  );

  markCompleted(
    vialMemoryButton
  );

  if (vialMemoryButton) {

    vialMemoryButton.textContent =
      "Lien retrouvé";

    vialMemoryButton.disabled =
      true;

  }

  openReveal(
    vialMemoryReveal,
    `
      <p>
        Root avait confié cette fiole à Betty
        plus de vingt ans auparavant.
      </p>

      <p>
        Betty ne lui a jamais révélé ce qu’elle avait réellement fait
        avec son contenu.
      </p>

      <p class="impact-line">
        Le passé vient de revenir au centre de la conversation.
      </p>
    `
  );

  if (!restore) {

    playRevealSound();

    showSecret(
      "vial-betty",
      "Betty reconnaît la fiole que Root lui avait confiée autrefois."
    );

  }

}


if (vialMemoryButton) {

  vialMemoryButton.addEventListener(
    "click",
    () => {

      revealVialMemory(false);

    }
  );

}


if (
  getInteraction(
    "vialMemory"
  )
) {

  revealVialMemory(true);

}


/* =========================================================
   INTERACTION 15
   MARQUE DE ROOT
========================================================= */

const rootMarkTrigger =
  document.getElementById(
    "rootMarkTrigger"
  );

const rootMarkReveal =
  document.getElementById(
    "rootMarkReveal"
  );


function revealRootMark(
  restore = false
) {

  saveInteraction(
    "rootMark",
    true
  );

  markCompleted(
    rootMarkTrigger
  );

  if (rootMarkTrigger) {

    rootMarkTrigger.textContent =
      "Marque révélée";

    rootMarkTrigger.disabled =
      true;

  }

  openReveal(
    rootMarkReveal,
    `
      <p>
        Un cercle apparaît sous la peau.
      </p>

      <p>
        De fins symboles semblent surgir
        de l’intérieur même du poignet.
      </p>

      <p>
        Une ligne lumineuse multicolore
        traverse le centre du motif.
      </p>

      <p class="impact-line">
        Ce n’est pas un tatouage.
      </p>
    `
  );

  if (!restore) {

    playMarkSound();

    showSecret(
      "root-mark",
      "La marque de Root appartient à une histoire plus ancienne que Root elle-même."
    );

  }

}


if (rootMarkTrigger) {

  rootMarkTrigger.addEventListener(
    "click",
    () => {

      revealRootMark(false);

    }
  );

}


if (
  getInteraction(
    "rootMark"
  )
) {

  revealRootMark(true);

}


/* =========================================================
   INTERACTION 16
   SIGNIFICATION DE LA MARQUE
========================================================= */

const markMeaningButtons =
  document.querySelectorAll(
    "[data-mark-meaning]"
  );

const markMeaningReveal =
  document.getElementById(
    "markMeaningReveal"
  );


const markMeaningTexts = {

  destiny: `
    <p>
      Cette interprétation serait trop forte.
    </p>

    <p>
      Hope ne dit pas que leur vie était déjà écrite.
    </p>
  `,

  path: `
    <p>
      La marque indique plutôt un chemin possible.
    </p>

    <p>
      Leur histoire pouvait les conduire jusqu’aux Sentinelles,
      sans que leur avenir soit déjà décidé.
    </p>
  `

};


function applyMarkMeaning(
  value,
  button
) {

  saveInteraction(
    "markMeaning",
    value
  );

  markSelectedOnly(
    markMeaningButtons,
    button
  );

  openReveal(
    markMeaningReveal,
    markMeaningTexts[value]
  );

  playClueSound();

}


markMeaningButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        applyMarkMeaning(
          button.dataset.markMeaning,
          button
        );

      }
    );

  }
);


const savedMarkMeaning =
  getInteraction(
    "markMeaning"
  );


if (
  savedMarkMeaning &&
  markMeaningTexts[
    savedMarkMeaning
  ]
) {

  const button =
    document.querySelector(
      `[data-mark-meaning="${savedMarkMeaning}"]`
    );

  if (button) {

    markSelectedOnly(
      markMeaningButtons,
      button
    );

    openReveal(
      markMeaningReveal,
      markMeaningTexts[
        savedMarkMeaning
      ]
    );

  }

}


/* =========================================================
   INTERACTION 17
   EFFET PAPILLON
========================================================= */

const butterflyButton =
  document.getElementById(
    "butterflyButton"
  );

const butterflyReveal =
  document.getElementById(
    "butterflyReveal"
  );


function revealButterfly(
  restore = false
) {

  saveInteraction(
    "butterfly",
    true
  );

  markCompleted(
    butterflyButton
  );

  if (butterflyButton) {

    butterflyButton.textContent =
      "Chaîne observée";

    butterflyButton.disabled =
      true;

  }

  openReveal(
    butterflyReveal,
    `
      <p>
        Un événement minuscule.
      </p>

      <p>
        Une conséquence.
      </p>

      <p>
        Puis une autre.
      </p>

      <p>
        Jusqu’à produire un résultat
        totalement disproportionné par rapport au point de départ.
      </p>

      <p class="impact-line">
        L’effet papillon.
      </p>
    `
  );

  if (!restore) {

    playRevealSound();

  }

}


if (butterflyButton) {

  butterflyButton.addEventListener(
    "click",
    () => {

      revealButterfly(false);

    }
  );

}


if (
  getInteraction(
    "butterfly"
  )
) {

  revealButterfly(true);

}


/* =========================================================
   INTERACTION 18
   LIEN DU GROUPE
========================================================= */

const groupLinkButtons =
  document.querySelectorAll(
    "[data-group-link]"
  );

const groupLinkReveal =
  document.getElementById(
    "groupLinkReveal"
  );


const groupLinkTexts = {

  survival:
    "Leur relation commence dans une situation où chacun dépend réellement des autres pour survivre.",

  promise:
    "Ils ont ensuite partagé une promesse qu’ils ont respectée pendant des années.",

  distance:
    "Le temps et la distance n’ont pas supprimé le lien créé pendant ces douze jours.",

  call:
    "Leur règle est simple : si l’un d’eux appelle réellement à l’aide, les autres viennent."
};


let groupLinkFound =
  Array.isArray(
    getInteraction(
      "groupLinkFound"
    )
  )
    ? getInteraction(
        "groupLinkFound"
      )
    : [];


function restoreGroupLink() {

  groupLinkFound.forEach(
    (value) => {

      markCompleted(
        document.querySelector(
          `[data-group-link="${value}"]`
        )
      );

    }
  );

  if (
    groupLinkFound.length >= 4
  ) {

    openReveal(
      groupLinkReveal,
      `
        <p>
          Survie.
          Promesse.
          Loyauté.
          Présence.
        </p>

        <p class="impact-line">
          Voilà ce qui a construit leur confiance.
        </p>
      `
    );

  }

}


groupLinkButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const value =
          button.dataset.groupLink;

        if (
          !groupLinkFound.includes(
            value
          )
        ) {

          groupLinkFound.push(
            value
          );

          saveInteraction(
            "groupLinkFound",
            groupLinkFound
          );

        }

        markCompleted(button);

        openReveal(
          groupLinkReveal,
          `<p>${groupLinkTexts[value]}</p>`
        );

        playClueSound();

        if (
          groupLinkFound.length >= 4
        ) {

          showSecret(
            "group-trust",
            "La confiance du groupe ne repose pas sur des mots mais sur des années de loyauté vérifiée."
          );

        }

      }
    );

  }
);

restoreGroupLink();


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

  const scene4 =
    document.getElementById(
      "scene-4"
    );

  const textBlock =
    scene4?.querySelector(
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
      "30px";

    memory.style.padding =
      "16px 12px";

    memory.style.borderTop =
      "1px solid rgba(217,181,111,.22)";

    memory.style.borderBottom =
      "1px solid rgba(217,181,111,.22)";

    memory.textContent =
      "Lucy a déjà accepté cet accord. Betty est maintenant invitée à entrer, elle aussi, dans ce cercle de confiance.";

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
    41;

  gain1.gain.value =
    0.65;

  ambienceOsc2.type =
    "triangle";

  ambienceOsc2.frequency.value =
    82;

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
        1,
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
   Aucun texte ni visuel narratif n'est caché par JavaScript.
   Les interactions seules utilisent des révélations.
========================================================= */


});
