/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 6 — LE MYSTÈRE DE LA CLÉ
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
  "societeOmbre_chapitre6_scroll";

const STORAGE_PROGRESS =
  "societeOmbre_chapitre6_progression";

const STORAGE_COMPLETED =
  "societeOmbre_chapitre6_termine";

const STORAGE_SECURITY =
  "societeOmbre_chapitre6_security";

const STORAGE_JUNGLE =
  "societeOmbre_chapitre6_jungle";

const STORAGE_BODY_SCAN =
  "societeOmbre_chapitre6_bodyScan";

const STORAGE_KEY_OBSERVE =
  "societeOmbre_chapitre6_keyObserve";

const STORAGE_LEGEND =
  "societeOmbre_chapitre6_legend";

const STORAGE_INDECIS =
  "societeOmbre_chapitre6_indecis";

const STORAGE_FORCED_CHOICE =
  "societeOmbre_chapitre6_forcedChoice";

const STORAGE_MATERIAL =
  "societeOmbre_chapitre6_material";

const STORAGE_ROOT_KEY =
  "societeOmbre_chapitre6_rootKey";

const STORAGE_KEY_DECISION =
  "societeOmbre_chapitre6_keyDecision";

const STORAGE_KEY_SECURITY =
  "societeOmbre_chapitre6_keySecurity";

const STORAGE_SYMBOL_SEQUENCE =
  "societeOmbre_chapitre6_symbolSequence";

const STORAGE_PHOENIX =
  "societeOmbre_chapitre6_phoenix";

const STORAGE_MARKS =
  "societeOmbre_chapitre6_marks";

const STORAGE_STATE =
  "societeOmbre_chapitre6_state";

const STORAGE_DRAWER =
  "societeOmbre_chapitre6_drawer";

const STORAGE_SECRETS =
  "societeOmbre_chapitre6_secrets";


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


scenes.forEach(
  (scene) => {

    observer.observe(
      scene
    );

  }
);


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
   REPRENDRE DEPUIS LE MENU DU CHAPITRE
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
    "societeOmbre_chapitre6_";


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
    "chapitre6.html?lecture=recommencer";

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
      3200
    );

}


/* =========================================================
   OUTILS INTERACTIONS
========================================================= */

function openReveal(
  reveal
) {

  if (!reveal) {
    return;
  }


  reveal.classList.add(
    "open"
  );

}


function completeButton(
  button,
  text
) {

  if (!button) {
    return;
  }


  button.classList.add(
    "completed"
  );


  if (text) {

    button.textContent =
      text;

  }


  button.disabled =
    true;

}


function setRevealText(
  reveal,
  text
) {

  if (!reveal) {
    return;
  }


  reveal.innerHTML =
    `<p>${text}</p>`;


  reveal.classList.add(
    "open"
  );

}


/* =========================================================
   INTERACTION 1
   SÉCURITÉ
========================================================= */

const securityReveal =
  document.getElementById(
    "securityReveal"
  );


const securityButtons =
  document.querySelectorAll(
    ".security-trigger"
  );


let securityProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_SECURITY
    ) || "0",
    10
  );


const securityOrder =
  [
    "face",
    "retina",
    "hand"
  ];


function updateSecurityButtons() {

  securityButtons.forEach(
    (button, index) => {

      if (
        index <
        securityProgress
      ) {

        button.classList.add(
          "completed"
        );


        button.disabled =
          true;

      }

    }
  );


  if (
    securityProgress >= 3
  ) {

    if (securityReveal) {

      securityReveal.innerHTML =
        `
          <p>VISAGE — IDENTITÉ CONFIRMÉE</p>
          <p>RÉTINE — IDENTITÉ CONFIRMÉE</p>
          <p>MAIN — IDENTITÉ CONFIRMÉE</p>
          <p class="emphasis">ACCÈS AUTORISÉ</p>
        `;


      securityReveal.classList.add(
        "open"
      );

    }

  }

}


securityButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const expected =
          securityOrder[
            securityProgress
          ];


        const selected =
          button.dataset.security;


        if (
          selected !== expected
        ) {

          button.classList.add(
            "wrong"
          );


          playWrongSound();


          setTimeout(
            () => {

              button.classList.remove(
                "wrong"
              );

            },
            600
          );


          return;

        }


        securityProgress++;


        localStorage.setItem(
          STORAGE_SECURITY,
          securityProgress
        );


        completeButton(
          button
        );


        playAnalysisSound();


        if (
          securityProgress === 1
        ) {

          setRevealText(
            securityReveal,
            "Analyse faciale validée."
          );

        }


        if (
          securityProgress === 2
        ) {

          setRevealText(
            securityReveal,
            "Analyse rétinienne validée."
          );

        }


        if (
          securityProgress === 3
        ) {

          if (securityReveal) {

            securityReveal.innerHTML =
              `
                <p>VISAGE — IDENTITÉ CONFIRMÉE</p>
                <p>RÉTINE — IDENTITÉ CONFIRMÉE</p>
                <p>MAIN — IDENTITÉ CONFIRMÉE</p>
                <p class="emphasis">ACCÈS AUTORISÉ</p>
              `;


            securityReveal.classList.add(
              "open"
            );

          }


          showSecret(
            "museum-security",
            "Le laboratoire de Root est protégé par plusieurs niveaux d’identification biométrique."
          );

        }

      }
    );

  }
);


updateSecurityButtons();


/* =========================================================
   INTERACTION 2
   PARCOURS JUNGLE
========================================================= */

const jungleReveal =
  document.getElementById(
    "jungleReveal"
  );

const jungleStep1 =
  document.getElementById(
    "jungleStep1"
  );

const jungleStep2 =
  document.getElementById(
    "jungleStep2"
  );

const jungleStep3 =
  document.getElementById(
    "jungleStep3"
  );


let jungleProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_JUNGLE
    ) || "0",
    10
  );


/*
  Parcours choisi pour Hope :

  1 = pierre gauche
  2 = liane sombre
  3 = plateforme

  Tu pourras changer facilement
  ces réponses si tu veux.
*/

const jungleAnswers = {
  1: "left",
  2: "dark",
  3: "platform"
};


function restoreJungle() {

  if (
    jungleProgress >= 1
  ) {

    if (jungleStep2) {
      jungleStep2.hidden = false;
    }

  }


  if (
    jungleProgress >= 2
  ) {

    if (jungleStep3) {
      jungleStep3.hidden = false;
    }

  }


  if (
    jungleProgress >= 3
  ) {

    if (jungleReveal) {

      jungleReveal.innerHTML =
        `
          <p>PARCOURS VALIDÉ</p>
          <p class="emphasis">
            Hope connaît parfaitement
            le système de Root.
          </p>
        `;


      jungleReveal.classList.add(
        "open"
      );

    }

  }

}


document
  .querySelectorAll(
    ".jungle-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const step =
          parseInt(
            button.dataset.step,
            10
          );


        const selected =
          button.dataset.choice;


        /*
          Si une étape précédente
          n'a pas encore été validée.
        */

        if (
          step !==
          jungleProgress + 1
        ) {
          return;
        }


        const correct =
          jungleAnswers[
            step
          ];


        if (
          selected !== correct
        ) {

          button.classList.add(
            "wrong"
          );


          setRevealText(
            jungleReveal,
            "⚠ CAPTEUR DÉTECTÉ — Hope, elle, connaît le bon chemin."
          );


          playWrongSound();


          setTimeout(
            () => {

              button.classList.remove(
                "wrong"
              );

            },
            700
          );


          return;

        }


        jungleProgress =
          step;


        localStorage.setItem(
          STORAGE_JUNGLE,
          jungleProgress
        );


        completeButton(
          button
        );


        playClueSound();


        if (
          step === 1
        ) {

          if (jungleStep2) {
            jungleStep2.hidden = false;
          }


          setRevealText(
            jungleReveal,
            "La pierre supporte le poids de Hope sans déclencher le système."
          );

        }


        if (
          step === 2
        ) {

          if (jungleStep3) {
            jungleStep3.hidden = false;
          }


          setRevealText(
            jungleReveal,
            "La liane choisie est un point d’appui. Les autres sont des capteurs."
          );

        }


        if (
          step === 3
        ) {

          if (jungleReveal) {

            jungleReveal.innerHTML =
              `
                <p class="impact-text">
                  PARCOURS VALIDÉ
                </p>

                <p class="emphasis">
                  Vous commencez à comprendre
                  pourquoi Root aime autant cet endroit.
                </p>
              `;


            jungleReveal.classList.add(
              "open"
            );

          }


          showSecret(
            "root-security-jungle",
            "Le décor du passage sert directement de système de sécurité."
          );

        }

      }
    );

  }
);


restoreJungle();


/* =========================================================
   INTERACTION 3
   SCANNER CORPOREL
========================================================= */

const bodyScanTrigger =
  document.getElementById(
    "bodyScanTrigger"
  );

const bodyScanReveal =
  document.getElementById(
    "bodyScanReveal"
  );


function activateBodyScan() {

  localStorage.setItem(
    STORAGE_BODY_SCAN,
    "1"
  );


  openReveal(
    bodyScanReveal
  );


  completeButton(
    bodyScanTrigger,
    "Analyse terminée"
  );


  playAnalysisSound();

}


bodyScanTrigger?.addEventListener(
  "click",
  activateBodyScan
);


if (
  localStorage.getItem(
    STORAGE_BODY_SCAN
  ) === "1"
) {

  openReveal(
    bodyScanReveal
  );


  completeButton(
    bodyScanTrigger,
    "Analyse terminée"
  );

}


/* =========================================================
   INTERACTION 4
   EXAMINER LA CLÉ
========================================================= */

const keyObserveReveal =
  document.getElementById(
    "keyObserveReveal"
  );


let observedKeyParts = [];


try {

  observedKeyParts =
    JSON.parse(
      localStorage.getItem(
        STORAGE_KEY_OBSERVE
      )
    ) || [];

} catch (error) {

  observedKeyParts =
    [];

}


const keyObserveTexts = {

  shape:
    "La lame est trop fine et trop régulière pour sembler conçue uniquement comme une arme. Sa géométrie évoque un mécanisme.",

  material:
    "La matière ne ressemble clairement ni à un métal ordinaire ni à une roche identifiable au premier regard.",

  symbols:
    "Les symboles semblent disposés sans ordre évident. Pourtant, leur répétition suggère qu’ils appartiennent à une séquence."

};


function updateKeyObserveButtons() {

  document
    .querySelectorAll(
      ".key-observe-trigger"
    )
    .forEach((button) => {

      if (
        observedKeyParts.includes(
          button.dataset.keyObserve
        )
      ) {

        button.classList.add(
          "completed"
        );

      }

    });

}


document
  .querySelectorAll(
    ".key-observe-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.keyObserve;


        if (
          !observedKeyParts.includes(
            type
          )
        ) {

          observedKeyParts.push(
            type
          );


          localStorage.setItem(
            STORAGE_KEY_OBSERVE,
            JSON.stringify(
              observedKeyParts
            )
          );

        }


        button.classList.add(
          "completed"
        );


        if (keyObserveReveal) {

          keyObserveReveal.innerHTML =
            `
              <p>
                ${keyObserveTexts[type]}
              </p>
            `;


          if (
            observedKeyParts.length === 3
          ) {

            keyObserveReveal.innerHTML +=
              `
                <p class="emphasis">
                  Une arme…
                  ou quelque chose conçu
                  pour ouvrir ou activer autre chose ?
                </p>
              `;

          }


          keyObserveReveal.classList.add(
            "open"
          );

        }


        playClueSound();


        if (
          observedKeyParts.length === 3
        ) {

          showSecret(
            "key-observation",
            "La clé possède les caractéristiques d’un objet fonctionnel plutôt que d’une simple arme ancienne."
          );

        }

      }
    );

  }
);


updateKeyObserveButtons();


/* =========================================================
   INTERACTION 5
   LÉGENDE DU CERCLE
========================================================= */

const legendReveal =
  document.getElementById(
    "legendReveal"
  );


const legendTexts = {

  key:
    "Les récits anciens la décrivent comme une clé plutôt que comme une arme.",

  box:
    "Plusieurs versions de la légende associent l’objet à ce que Root appelle aujourd’hui la boîte de Pandore.",

  symbols:
    "Les symboles doivent être lus dans un ordre précis. Leur disposition visible n’est pas nécessairement leur ordre d’activation."

};


document
  .querySelectorAll(
    ".legend-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.legend;


        localStorage.setItem(
          STORAGE_LEGEND,
          type
        );


        setRevealText(
          legendReveal,
          legendTexts[type]
        );


        playRevealSound();

      }
    );

  });


/* =========================================================
   INTERACTION 6
   INDÉCIS
========================================================= */

const indecisReveal =
  document.getElementById(
    "indecisReveal"
  );


const indecisTexts = {

  mark:
    "La marque de Lucy ressemble à une séparation : deux chemins, deux directions, aucune appartenance naturelle définitive.",

  root:
    "Lorsque Root a touché Lucy au NEXUS, les marques des deux femmes ont réagi presque simultanément.",

  opaque:
    "Certains textes nomment Opaque l’état atteint lorsqu’un Indécis effectue un choix suffisamment important pour modifier définitivement son appartenance."

};


document
  .querySelectorAll(
    ".indecis-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.indecis;


        localStorage.setItem(
          STORAGE_INDECIS,
          type
        );


        setRevealText(
          indecisReveal,
          indecisTexts[type]
        );


        playMarkSound();

      }
    );

  });


/* =========================================================
   INTERACTION 7
   CHOIX FORCÉ
========================================================= */

const forcedChoiceTrigger =
  document.getElementById(
    "forcedChoiceTrigger"
  );

const forcedChoiceReveal =
  document.getElementById(
    "forcedChoiceReveal"
  );


function revealForcedChoice() {

  localStorage.setItem(
    STORAGE_FORCED_CHOICE,
    "1"
  );


  openReveal(
    forcedChoiceReveal
  );


  completeButton(
    forcedChoiceTrigger,
    "Danger compris"
  );


  playDarkSound();


  showSecret(
    "forced-choice",
    "La clé pourrait permettre de transformer un choix libre en appartenance imposée."
  );

}


forcedChoiceTrigger?.addEventListener(
  "click",
  revealForcedChoice
);


if (
  localStorage.getItem(
    STORAGE_FORCED_CHOICE
  ) === "1"
) {

  openReveal(
    forcedChoiceReveal
  );


  completeButton(
    forcedChoiceTrigger,
    "Danger compris"
  );

}


/* =========================================================
   INTERACTION 8
   MATIÈRE DE LA CLÉ
========================================================= */

const materialReveal =
  document.getElementById(
    "materialReveal"
  );


const materialTexts = {

  meteorite:
    "Certaines météorites contiennent des alliages riches en fer et en nickel pouvant produire des signatures très différentes de celles des métaux terrestres travaillés.",

  earth:
    "Une origine terrestre reste possible. L’ancienneté ou la méthode de fabrication pourraient simplement rendre l’objet difficile à identifier.",

  unknown:
    "Sans analyse chimique, isotopique et structurale, aucune origine sérieuse ne peut encore être affirmée."

};


document
  .querySelectorAll(
    ".material-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.material;


        localStorage.setItem(
          STORAGE_MATERIAL,
          type
        );


        setRevealText(
          materialReveal,
          materialTexts[type]
        );


        playAnalysisSound();

      }
    );

  });


/* =========================================================
   INTERACTION 9
   ROOT + CLÉ
========================================================= */

const rootKeyTrigger =
  document.getElementById(
    "rootKeyTrigger"
  );

const rootKeyReveal =
  document.getElementById(
    "rootKeyReveal"
  );


function revealRootReaction() {

  localStorage.setItem(
    STORAGE_ROOT_KEY,
    "1"
  );


  openReveal(
    rootKeyReveal
  );


  completeButton(
    rootKeyTrigger,
    "Réaction observée"
  );


  playMarkSound();


  showSecret(
    "root-key-reaction",
    "La marque de Root réagit directement à la proximité de la clé."
  );

}


rootKeyTrigger?.addEventListener(
  "click",
  revealRootReaction
);


if (
  localStorage.getItem(
    STORAGE_ROOT_KEY
  ) === "1"
) {

  openReveal(
    rootKeyReveal
  );


  completeButton(
    rootKeyTrigger,
    "Réaction observée"
  );

}


/* =========================================================
   INTERACTION 10
   AVIS DU LECTEUR
========================================================= */

const keyDecisionReveal =
  document.getElementById(
    "keyDecisionReveal"
  );


const keyDecisionTexts = {

  give:
    "Vous remettriez la clé à Lucy. Hope estime cependant qu’il serait irresponsable de lui confier un objet dont personne ne connaît encore les effets.",

  keep:
    "Vous préférez conserver la clé en sécurité. C’est également une partie de la décision de Hope.",

  study:
    "Vous choisissez de l’étudier davantage. Hope arrive à la même conclusion : comprendre avant d’agir."

};


document
  .querySelectorAll(
    ".key-decision-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.keyDecision;


        localStorage.setItem(
          STORAGE_KEY_DECISION,
          type
        );


        document
          .querySelectorAll(
            ".key-decision-trigger"
          )
          .forEach((otherButton) => {

            otherButton.classList.remove(
              "completed"
            );

          });


        button.classList.add(
          "completed"
        );


        setRevealText(
          keyDecisionReveal,
          keyDecisionTexts[type]
        );


        playClueSound();

      }
    );

  });


/* =========================================================
   INTERACTION 11
   PROTECTION DE LA CLÉ
========================================================= */

const keySecurityTrigger =
  document.getElementById(
    "keySecurityTrigger"
  );

const keySecurityReveal =
  document.getElementById(
    "keySecurityReveal"
  );


function revealKeySecurity() {

  localStorage.setItem(
    STORAGE_KEY_SECURITY,
    "1"
  );


  openReveal(
    keySecurityReveal
  );


  completeButton(
    keySecurityTrigger,
    "Protection vérifiée"
  );


  playAnalysisSound();

}


keySecurityTrigger?.addEventListener(
  "click",
  revealKeySecurity
);


if (
  localStorage.getItem(
    STORAGE_KEY_SECURITY
  ) === "1"
) {

  openReveal(
    keySecurityReveal
  );


  completeButton(
    keySecurityTrigger,
    "Protection vérifiée"
  );

}


/* =========================================================
   INTERACTION 12
   SÉQUENCE DE SYMBOLES
========================================================= */

const symbolReveal =
  document.getElementById(
    "symbolReveal"
  );


const symbolButtons =
  document.querySelectorAll(
    ".symbol-btn"
  );


let symbolProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_SYMBOL_SEQUENCE
    ) || "0",
    10
  );


/*
  Dans le HTML,
  les boutons sont déjà numérotés
  1 → 5 dans l’ordre donné par Hope.
*/

function restoreSymbols() {

  symbolButtons.forEach(
    (button) => {

      const number =
        parseInt(
          button.dataset.symbol,
          10
        );


      if (
        number <=
        symbolProgress
      ) {

        button.classList.add(
          "completed"
        );


        button.disabled =
          true;

      }

    }
  );


  if (
    symbolProgress >= 5
  ) {

    if (symbolReveal) {

      symbolReveal.innerHTML =
        `
          <p class="impact-text">
            SÉQUENCE COMPLÈTE
          </p>

          <p class="emphasis">
            La clé semble prête
            à réagir.
          </p>
        `;


      symbolReveal.classList.add(
        "open"
      );

    }

  }

}


symbolButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const number =
          parseInt(
            button.dataset.symbol,
            10
          );


        const expected =
          symbolProgress + 1;


        if (
          number !== expected
        ) {

          button.classList.add(
            "wrong"
          );


          playWrongSound();


          if (symbolReveal) {

            symbolReveal.innerHTML =
              `
                <p>
                  L’ordre n’est pas correct.
                </p>

                <p class="emphasis">
                  Hope reprend la récitation.
                </p>
              `;


            symbolReveal.classList.add(
              "open"
            );

          }


          setTimeout(
            () => {

              button.classList.remove(
                "wrong"
              );

            },
            650
          );


          return;

        }


        symbolProgress++;


        localStorage.setItem(
          STORAGE_SYMBOL_SEQUENCE,
          symbolProgress
        );


        completeButton(
          button
        );


        playClueSound();


        if (symbolReveal) {

          symbolReveal.innerHTML =
            `
              <p>
                Symbole ${symbolProgress}
                activé.
              </p>
            `;


          symbolReveal.classList.add(
            "open"
          );

        }


        if (
          symbolProgress === 5
        ) {

          if (symbolReveal) {

            symbolReveal.innerHTML =
              `
                <p class="impact-text">
                  SÉQUENCE COMPLÈTE
                </p>

                <p class="emphasis">
                  Quelque chose vient
                  de changer dans la clé.
                </p>
              `;

          }


          playRevealSound();


          showSecret(
            "symbol-sequence",
            "Maître Lee connaissait l’ordre nécessaire pour activer la clé."
          );

        }

      }
    );

  }
);


restoreSymbols();


/* =========================================================
   INTERACTION 13
   PHÉNIX
========================================================= */

const phoenixTrigger =
  document.getElementById(
    "phoenixTrigger"
  );

const phoenixScene =
  document.getElementById(
    "scene-36"
  );


function revealPhoenix() {

  localStorage.setItem(
    STORAGE_PHOENIX,
    "1"
  );


  if (phoenixScene) {

    phoenixScene.classList.add(
      "unlocked"
    );

  }


  completeButton(
    phoenixTrigger,
    "Phénix révélé"
  );


  playPhoenixSound();


  showSecret(
    "hope-phoenix",
    "La clé provoque l’apparition d’une seconde marque majeure sur Hope : un phénix couvrant presque entièrement son dos."
  );


  setTimeout(
    () => {

      phoenixScene?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    },
    500
  );

}


phoenixTrigger?.addEventListener(
  "click",
  revealPhoenix
);


if (
  localStorage.getItem(
    STORAGE_PHOENIX
  ) === "1"
) {

  phoenixScene?.classList.add(
    "unlocked"
  );


  completeButton(
    phoenixTrigger,
    "Phénix révélé"
  );

}


/* =========================================================
   INTERACTION 14
   DRAGON / PHÉNIX
========================================================= */

const markObserveReveal =
  document.getElementById(
    "markObserveReveal"
  );


let observedMarks = [];


try {

  observedMarks =
    JSON.parse(
      localStorage.getItem(
        STORAGE_MARKS
      )
    ) || [];

} catch (error) {

  observedMarks =
    [];

}


const markTexts = {

  dragon:
    "Le dragon était déjà présent auparavant, mais la clé amplifie spectaculairement sa luminosité et ses couleurs.",

  phoenix:
    "Le phénix n’était jamais apparu. Il couvre presque entièrement le dos de Hope et disparaît lorsque la clé s’éloigne.",

  both:
    "Le dragon et le phénix réagissent simultanément. Ils semblent moins être deux marques indépendantes que deux manifestations liées."

};


document
  .querySelectorAll(
    ".mark-observe-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.mark;


        if (
          !observedMarks.includes(
            type
          )
        ) {

          observedMarks.push(
            type
          );


          localStorage.setItem(
            STORAGE_MARKS,
            JSON.stringify(
              observedMarks
            )
          );

        }


        button.classList.add(
          "completed"
        );


        setRevealText(
          markObserveReveal,
          markTexts[type]
        );


        playMarkSound();


        if (
          observedMarks.length === 3
        ) {

          if (markObserveReveal) {

            markObserveReveal.innerHTML +=
              `
                <p class="emphasis">
                  Dragon + Phénix :
                  peut-être deux parties
                  d’un même mécanisme.
                </p>
              `;

          }


          showSecret(
            "dragon-phoenix",
            "Le dragon et le phénix pourraient constituer deux manifestations complémentaires d’un même phénomène."
          );

        }

      }
    );

  });


/* =========================================================
   INTERACTION 15
   ÉTAT DE HOPE
========================================================= */

const stateTrigger =
  document.getElementById(
    "stateTrigger"
  );

const stateReveal =
  document.getElementById(
    "stateReveal"
  );


function revealState() {

  localStorage.setItem(
    STORAGE_STATE,
    "1"
  );


  openReveal(
    stateReveal
  );


  completeButton(
    stateTrigger,
    "État analysé"
  );


  playAnalysisSound();

}


stateTrigger?.addEventListener(
  "click",
  revealState
);


if (
  localStorage.getItem(
    STORAGE_STATE
  ) === "1"
) {

  openReveal(
    stateReveal
  );


  completeButton(
    stateTrigger,
    "État analysé"
  );

}


/* =========================================================
   INTERACTION 16
   TIROIR
========================================================= */

const drawerTrigger =
  document.getElementById(
    "drawerTrigger"
  );

const drawerReveal =
  document.getElementById(
    "drawerReveal"
  );


function revealDrawer() {

  localStorage.setItem(
    STORAGE_DRAWER,
    "1"
  );


  openReveal(
    drawerReveal
  );


  completeButton(
    drawerTrigger,
    "Débardeur découvert"
  );


  playClueSound();


  showSecret(
    "archaeology-shirt",
    "Même dans un laboratoire archéologique ultrasécurisé, Root semble avoir prévu l’imprévisible."
  );

}


drawerTrigger?.addEventListener(
  "click",
  revealDrawer
);


if (
  localStorage.getItem(
    STORAGE_DRAWER
  ) === "1"
) {

  openReveal(
    drawerReveal
  );


  completeButton(
    drawerTrigger,
    "Débardeur découvert"
  );

}


/* =========================================================
   RESTAURATION CHOIX DU LECTEUR
========================================================= */

const savedKeyDecision =
  localStorage.getItem(
    STORAGE_KEY_DECISION
  );


if (savedKeyDecision) {

  document
    .querySelectorAll(
      ".key-decision-trigger"
    )
    .forEach((button) => {

      if (
        button.dataset.keyDecision ===
        savedKeyDecision
      ) {

        button.classList.add(
          "completed"
        );

      }

    });


  if (
    keyDecisionReveal &&
    keyDecisionTexts[
      savedKeyDecision
    ]
  ) {

    setRevealText(
      keyDecisionReveal,
      keyDecisionTexts[
        savedKeyDecision
      ]
    );

  }

}


/* =========================================================
   RESTAURATION LÉGENDE
========================================================= */

const savedLegend =
  localStorage.getItem(
    STORAGE_LEGEND
  );


if (
  savedLegend &&
  legendTexts[
    savedLegend
  ]
) {

  setRevealText(
    legendReveal,
    legendTexts[
      savedLegend
    ]
  );

}


/* =========================================================
   RESTAURATION INDÉCIS
========================================================= */

const savedIndecis =
  localStorage.getItem(
    STORAGE_INDECIS
  );


if (
  savedIndecis &&
  indecisTexts[
    savedIndecis
  ]
) {

  setRevealText(
    indecisReveal,
    indecisTexts[
      savedIndecis
    ]
  );

}


/* =========================================================
   RESTAURATION MATIÈRE
========================================================= */

const savedMaterial =
  localStorage.getItem(
    STORAGE_MATERIAL
  );


if (
  savedMaterial &&
  materialTexts[
    savedMaterial
  ]
) {

  setRevealText(
    materialReveal,
    materialTexts[
      savedMaterial
    ]
  );

}


/* =========================================================
   MÉMOIRE DU CHAPITRE 5
========================================================= */

const chapter5Finished =
  localStorage.getItem(
    "societeOmbre_chapitre5_termine"
  ) ||
  localStorage.getItem(
    "societeOmbre_chapitre5_finished"
  );


if (
  chapter5Finished === "1"
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
      "chapter5Memory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "chapter5Memory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "30px";


    memory.textContent =
      "Quelques heures plus tôt, Root et Lucy avaient réagi simultanément lorsqu’elles s’étaient touchées au NEXUS. Hope était la seule à l’avoir remarqué.";


    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   MÉMOIRE DU CHAPITRE 4
========================================================= */

const chapter4LucyMark =
  localStorage.getItem(
    "societeOmbre_chapitre4_lucyMark"
  );


if (
  chapter4LucyMark === "1"
) {

  const scene16 =
    document.getElementById(
      "scene-16"
    );


  const textBlock =
    scene16?.querySelector(
      ".text-block"
    );


  if (
    textBlock &&
    !document.getElementById(
      "chapter4LucyMemory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "chapter4LucyMemory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "30px";


    memory.textContent =
      "Vous avez déjà vu la marque de Lucy apparaître. Hope pense désormais qu’elle pourrait être liée à la légende des Indécis.";


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
    "scene-44"
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


function playDarkSound() {

  playTone(
    180,
    0.8,
    0.024,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        240,
        0.95,
        0.018,
        "sine"
      );

    },
    170
  );

}


function playPhoenixSound() {

  playTone(
    220,
    1.0,
    0.025,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        330,
        1.2,
        0.022,
        "triangle"
      );

    },
    180
  );


  setTimeout(
    () => {

      playTone(
        495,
        1.35,
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
        1.5,
        0.015,
        "triangle"
      );

    },
    540
  );


  setTimeout(
    () => {

      playTone(
        825,
        1.7,
        0.012,
        "sine"
      );

    },
    720
  );

}


function playWrongSound() {

  playTone(
    150,
    0.22,
    0.02,
    "square"
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
   ESCAPE FERME LE MENU
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
