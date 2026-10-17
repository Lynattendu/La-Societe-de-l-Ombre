/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 13 — LA REMONTÉE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
localStorage.setItem(
  "societeOmbre_dernierePage",
  "chapitre13.html"
);

localStorage.setItem(
  "societeOmbre_dernierTitre",
  "Chapitre 13 - La remontée"
);

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

const STORAGE_PREFIX =
  "societeOmbre_chapitre13_";

const STORAGE_SCROLL =
  STORAGE_PREFIX + "scroll";

const STORAGE_PROGRESS =
  STORAGE_PREFIX + "progression";

const STORAGE_COMPLETED =
  STORAGE_PREFIX + "termine";

const STORAGE_SECRETS =
  STORAGE_PREFIX + "secrets";

const STORAGE_CAVE_STRUCTURE =
  STORAGE_PREFIX + "caveStructure";

const STORAGE_ANNA_SYMBOL =
  STORAGE_PREFIX + "annaSymbol";

const STORAGE_PHOENIX_WALL =
  STORAGE_PREFIX + "phoenixWall";

const STORAGE_EXIT_OPENING =
  STORAGE_PREFIX + "exitOpening";

const STORAGE_FIRST_MESSAGES =
  STORAGE_PREFIX + "firstMessages";

const STORAGE_TEACHINGS =
  STORAGE_PREFIX + "teachings";

const STORAGE_SURFACE =
  STORAGE_PREFIX + "surface";

const STORAGE_OUTER_LOCK =
  STORAGE_PREFIX + "outerLock";

const STORAGE_OUTER_LOCK_OPEN =
  STORAGE_PREFIX + "outerLockOpen";

const STORAGE_FOREST_SURVIVAL =
  STORAGE_PREFIX + "forestSurvival";

const STORAGE_PHOENIX_IDENTIFY =
  STORAGE_PREFIX + "phoenixIdentify";

const STORAGE_RECONNECT =
  STORAGE_PREFIX + "reconnect";

const STORAGE_GROUP_NEWS =
  STORAGE_PREFIX + "groupNews";

const STORAGE_REUNION =
  STORAGE_PREFIX + "reunion";

const STORAGE_BETTY_TRUTH =
  STORAGE_PREFIX + "bettyTruth";


/* =========================================================
   COMPATIBILITÉ ANCIENNE FIN
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre13_finished"
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
  urlParams.get("lecture");


/* =========================================================
   OUTILS LOCALSTORAGE
========================================================= */

function getStoredArray(key) {

  try {

    const value =
      JSON.parse(
        localStorage.getItem(key)
      );

    return Array.isArray(value)
      ? value
      : [];

  } catch {

    return [];

  }

}


function saveStoredArray(
  key,
  values
) {

  localStorage.setItem(
    key,
    JSON.stringify(values)
  );

}


function addStoredValue(
  key,
  value
) {

  const values =
    getStoredArray(key);


  if (
    !values.includes(value)
  ) {

    values.push(value);

    saveStoredArray(
      key,
      values
    );

  }


  return values;

}


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

const sceneObserver =
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

    sceneObserver.observe(
      scene
    );

  }
);


/* =========================================================
   TEXTE PROGRESSIF
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
                transform: "translateY(12px)"
              },
              {
                opacity: 1,
                transform: "translateY(0)"
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
   BOUTON CONTINUER
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
      event.target === chapterMenu
    ) {

      closeMenu();

    }

  }
);


/* =========================================================
   REPRENDRE VIA MENU
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
      !Number.isNaN(position)
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
        STORAGE_PREFIX
      )
    ) {

      keysToDelete.push(key);

    }

  }


  keysToDelete.forEach(
    (key) => {

      localStorage.removeItem(key);

    }
  );


  window.location.href =
    "chapitre13.html?lecture=recommencer";

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

    const value =
      JSON.parse(
        localStorage.getItem(
          STORAGE_SECRETS
        )
      );

    return Array.isArray(value)
      ? value
      : [];

  } catch {

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
      JSON.stringify(secrets)
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
      document.createElement("p");


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
   OUTILS INTERACTIONS
========================================================= */

function setRevealHTML(
  reveal,
  html
) {

  if (!reveal) {
    return;
  }


  reveal.innerHTML =
    html;


  reveal.classList.add(
    "open"
  );

}


function openReveal(reveal) {

  if (!reveal) {
    return;
  }


  reveal.classList.add(
    "open"
  );

}


function completeButton(
  button,
  text = null
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

}


/* =========================================================
   INTERACTION 1
   COMPRENDRE LA GROTTE
========================================================= */

const caveStructureReveal =
  document.getElementById(
    "caveStructureReveal"
  );


let caveStructureObserved =
  getStoredArray(
    STORAGE_CAVE_STRUCTURE
  );


const caveStructureTexts = {

  natural:
    "Certains passages possèdent l’irrégularité d’une cavité naturelle façonnée par l’eau et la roche.",

  shaped:
    "D’autres zones sont trop régulières. Elles semblent avoir été façonnées ou corrigées volontairement.",

  organized:
    "L’ensemble donne l’impression d’un parcours pensé pour guider quelqu’un d’une étape à une autre.",

  dragon:
    "Le dragon permet à Hope d’activer plusieurs mécanismes que la roche seule ne révèle pas.",

  phoenix:
    "Le phénix complète le dragon. Certaines portes ne répondent qu’à la présence des deux marques."

};


document
  .querySelectorAll(
    ".cave-structure-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.caveStructure;


        caveStructureObserved =
          addStoredValue(
            STORAGE_CAVE_STRUCTURE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          caveStructureReveal,
          `
            <p>
              ${caveStructureTexts[type]}
            </p>
          `
        );


        playArtifactSound();


        if (
          caveStructureObserved.length >= 5
        ) {

          setRevealHTML(
            caveStructureReveal,
            `
              <p>
                Naturel.
              </p>

              <p>
                Façonné.
              </p>

              <p>
                Organisé.
              </p>

              <p>
                Dragon.
              </p>

              <p>
                Phénix.
              </p>

              <p class="impact-text">
                CE LIEU
                SEMBLE AVOIR ÉTÉ PRÉPARÉ.
              </p>

              <p class="emphasis">
                Peut-être en attente
                de quelqu’un capable
                d’y entrer.
              </p>
            `
          );


          showSecret(
            "cave-prepared",
            "La grotte semble mêler formations naturelles et passages volontairement organisés."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".cave-structure-trigger"
  )
  .forEach((button) => {

    if (
      caveStructureObserved.includes(
        button.dataset.caveStructure
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  caveStructureObserved.length >= 5
) {

  setRevealHTML(
    caveStructureReveal,
    `
      <p>
        Naturel.
      </p>

      <p>
        Façonné.
      </p>

      <p>
        Organisé.
      </p>

      <p>
        Dragon.
      </p>

      <p>
        Phénix.
      </p>

      <p class="impact-text">
        CE LIEU
        SEMBLE AVOIR ÉTÉ PRÉPARÉ.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 2
   SYMBOLE D'ANNA
========================================================= */

const annaSymbolReveal =
  document.getElementById(
    "annaSymbolReveal"
  );


let annaSymbolObserved =
  getStoredArray(
    STORAGE_ANNA_SYMBOL
  );


const annaSymbolTexts = {

  shape:
    "La forme est simple, presque discrète parmi les centaines de signes de la paroi. Elle évoque vaguement un infini déformé.",

  dragon:
    "Hope touche le signe avec la main du dragon. Aucune réaction.",

  phoenix:
    "Le phénix ne réagit pas davantage. Ce symbole semble fonctionner autrement.",

  memory:
    "Le souvenir revient : la petite marque de naissance située près de l’oreille d’Anna."

};


document
  .querySelectorAll(
    ".anna-symbol-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.annaSymbol;


        annaSymbolObserved =
          addStoredValue(
            STORAGE_ANNA_SYMBOL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          annaSymbolReveal,
          `
            <p>
              ${annaSymbolTexts[type]}
            </p>
          `
        );


        playMemorySound();


        if (
          annaSymbolObserved.length >= 4
        ) {

          setRevealHTML(
            annaSymbolReveal,
            `
              <p>
                Aucun effet
                sur le dragon.
              </p>

              <p>
                Aucun effet
                sur le phénix.
              </p>

              <p>
                Pourtant,
                Hope connaît cette forme.
              </p>

              <p class="impact-text">
                ANNA.
              </p>

              <p class="emphasis">
                Ce n’est pas exactement
                la même marque.
                Mais la ressemblance
                est troublante.
              </p>
            `
          );


          showSecret(
            "anna-symbol-similarity",
            "Un symbole ancien ressemble fortement à la marque de naissance d’Anna, sans être parfaitement identique."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".anna-symbol-trigger"
  )
  .forEach((button) => {

    if (
      annaSymbolObserved.includes(
        button.dataset.annaSymbol
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  annaSymbolObserved.length >= 4
) {

  setRevealHTML(
    annaSymbolReveal,
    `
      <p>
        Dragon : aucune réaction.
      </p>

      <p>
        Phénix : aucune réaction.
      </p>

      <p class="impact-text">
        ANNA.
      </p>

      <p class="emphasis">
        Une ressemblance troublante.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 3
   PHÉNIX GRAVÉ
========================================================= */

const phoenixWallReveal =
  document.getElementById(
    "phoenixWallReveal"
  );


let phoenixWallObserved =
  getStoredArray(
    STORAGE_PHOENIX_WALL
  );


const phoenixWallTexts = {

  phoenix:
    "Un immense phénix est gravé dans la roche, beaucoup plus grand que les autres représentations.",

  center:
    "Le symbole ressemblant à la marque d’Anna se trouve exactement au centre du dessin.",

  heart:
    "Sa position correspond au cœur du phénix.",

  dragon:
    "Lorsque Hope pose la main du dragon sur la pierre, toutes les couleurs de sa marque s’illuminent immédiatement."

};


document
  .querySelectorAll(
    ".phoenix-wall-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.phoenixWall;


        phoenixWallObserved =
          addStoredValue(
            STORAGE_PHOENIX_WALL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          phoenixWallReveal,
          `
            <p>
              ${phoenixWallTexts[type]}
            </p>
          `
        );


        playDragonSound();


        if (
          phoenixWallObserved.length >= 4
        ) {

          setRevealHTML(
            phoenixWallReveal,
            `
              <p>
                Phénix gravé.
              </p>

              <p>
                Symbole central.
              </p>

              <p>
                Position du cœur.
              </p>

              <p class="impact-text">
                LE DRAGON RÉAGIT.
              </p>

              <p class="emphasis">
                La paroi vient
                d’être activée.
              </p>
            `
          );


          showSecret(
            "phoenix-wall-activation",
            "Le symbole placé au cœur du phénix gravé active une réaction lorsqu’Hope utilise la main portant le dragon."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".phoenix-wall-trigger"
  )
  .forEach((button) => {

    if (
      phoenixWallObserved.includes(
        button.dataset.phoenixWall
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  phoenixWallObserved.length >= 4
) {

  setRevealHTML(
    phoenixWallReveal,
    `
      <p>
        Phénix.
      </p>

      <p>
        Symbole central.
      </p>

      <p>
        Cœur.
      </p>

      <p class="impact-text">
        LE DRAGON RÉAGIT.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 4
   OUVERTURE DE LA SORTIE
========================================================= */

const exitOpeningReveal =
  document.getElementById(
    "exitOpeningReveal"
  );


const exitOpeningButtons =
  document.querySelectorAll(
    ".exit-opening-trigger"
  );


const exitOpeningOrder = [
  "touch",
  "vibration",
  "tilt",
  "opening",
  "stairs"
];


let exitOpeningProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_EXIT_OPENING
    ) || "0",
    10
  );


const exitOpeningTexts = {

  touch:
    "Hope pose la main du dragon contre la pierre.",

  vibration:
    "Un grondement sourd traverse la cavité et la paroi se met à vibrer.",

  tilt:
    "Une section entière de roche commence lentement à basculer.",

  opening:
    "Une ouverture sombre apparaît derrière la paroi.",

  stairs:
    "Un escalier étroit et abrupt monte vers l’obscurité."

};


function restoreExitOpening() {

  exitOpeningButtons.forEach(
    (button, index) => {

      if (
        index < exitOpeningProgress
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
    exitOpeningProgress >= 5
  ) {

    setRevealHTML(
      exitOpeningReveal,
      `
        <p>
          Contact.
        </p>

        <p>
          Vibration.
        </p>

        <p>
          Basculement.
        </p>

        <p>
          Ouverture.
        </p>

        <p class="name-reveal">
          UN ESCALIER.
        </p>

        <p class="emphasis">
          La grotte avait bien
          prévu une sortie.
        </p>
      `
    );

  }

}


exitOpeningButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.exitOpening;


        const expected =
          exitOpeningOrder[
            exitOpeningProgress
          ];


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
            650
          );


          return;

        }


        exitOpeningProgress++;


        localStorage.setItem(
          STORAGE_EXIT_OPENING,
          exitOpeningProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          exitOpeningReveal,
          `
            <p>
              ${exitOpeningTexts[selected]}
            </p>
          `
        );


        playStoneSound();


        if (
          exitOpeningProgress >= 5
        ) {

          setRevealHTML(
            exitOpeningReveal,
            `
              <p>
                Contact.
              </p>

              <p>
                Vibration.
              </p>

              <p>
                La roche bascule.
              </p>

              <p>
                Une ouverture apparaît.
              </p>

              <p class="name-reveal">
                UN ESCALIER.
              </p>

              <p class="emphasis">
                Hope avait raison :
                une sortie existe.
              </p>
            `
          );


          showSecret(
            "hidden-exit",
            "Le mécanisme ancien révèle un escalier permettant de remonter vers la surface."
          );

        }

      }
    );

  });


restoreExitOpening();


/* =========================================================
   INTERACTION 5
   PREMIERS MESSAGES
========================================================= */

const firstMessagesReveal =
  document.getElementById(
    "firstMessagesReveal"
  );


const firstMessagesButtons =
  document.querySelectorAll(
    ".first-messages-trigger"
  );


const firstMessagesOrder = [
  "unknown",
  "understand",
  "meeting",
  "transform"
];


let firstMessagesProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_FIRST_MESSAGES
    ) || "0",
    10
  );


const firstMessagesTexts = {

  unknown:
    "Ce que tu ignores n’existe pas encore dans ton monde.",

  understand:
    "Comprendre agrandit l’univers.",

  meeting:
    "Une rencontre peut instruire.",

  transform:
    "Une rencontre peut transformer."

};


function restoreFirstMessages() {

  firstMessagesButtons.forEach(
    (button, index) => {

      if (
        index < firstMessagesProgress
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
    firstMessagesProgress >= 4
  ) {

    setRevealHTML(
      firstMessagesReveal,
      `
        <p class="emphasis">
          Ce que tu ignores
          n’existe pas encore
          dans ton monde.
        </p>

        <p class="emphasis">
          Comprendre agrandit
          l’univers.
        </p>

        <p class="emphasis">
          Une rencontre
          peut instruire.
        </p>

        <p class="impact-text">
          UNE RENCONTRE
          PEUT TRANSFORMER.
        </p>
      `
    );

  }

}


firstMessagesButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.firstMessages;


        const expected =
          firstMessagesOrder[
            firstMessagesProgress
          ];


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
            650
          );


          return;

        }


        firstMessagesProgress++;


        localStorage.setItem(
          STORAGE_FIRST_MESSAGES,
          firstMessagesProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          firstMessagesReveal,
          `
            <p class="emphasis">
              ${firstMessagesTexts[selected]}
            </p>
          `
        );


        playMemorySound();


        if (
          firstMessagesProgress >= 4
        ) {

          setRevealHTML(
            firstMessagesReveal,
            `
              <p class="emphasis">
                Ce que tu ignores
                n’existe pas encore
                dans ton monde.
              </p>

              <p class="emphasis">
                Comprendre agrandit
                l’univers.
              </p>

              <p class="emphasis">
                Une rencontre
                peut instruire.
              </p>

              <p class="impact-text">
                UNE RENCONTRE
                PEUT TRANSFORMER.
              </p>
            `
          );


          showSecret(
            "ancient-teachings-one",
            "Les inscriptions de la remontée semblent transmettre des idées plutôt que des phrases directement lues."
          );

        }

      }
    );

  });


restoreFirstMessages();


/* =========================================================
   INTERACTION 6
   ENSEIGNEMENTS
========================================================= */

const teachingsReveal =
  document.getElementById(
    "teachingsReveal"
  );


let teachingsObserved =
  getStoredArray(
    STORAGE_TEACHINGS
  );


const teachingsTexts = {

  body:
    "Le corps est un passage. Prends-en soin. Mais n’oublie pas ce qui le traverse.",

  beginning:
    "Ce que tu appelles une fin peut n’être qu’un commencement.",

  difficulty:
    "La difficulté ne punit pas toujours. Parfois, elle prépare.",

  understanding:
    "Ne crains pas ce que tu peux comprendre.",

  choice:
    "Là où existe le déséquilibre naît toujours une possibilité de choix."

};


document
  .querySelectorAll(
    ".teachings-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.teachings;


        teachingsObserved =
          addStoredValue(
            STORAGE_TEACHINGS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          teachingsReveal,
          `
            <p class="emphasis">
              ${teachingsTexts[type]}
            </p>
          `
        );


        playMemorySound();


        if (
          teachingsObserved.length >= 5
        ) {

          setRevealHTML(
            teachingsReveal,
            `
              <p>
                Le corps.
              </p>

              <p>
                Le commencement.
              </p>

              <p>
                La difficulté.
              </p>

              <p>
                La compréhension.
              </p>

              <p class="impact-text">
                LE CHOIX.
              </p>

              <p class="emphasis">
                Là où existe
                le déséquilibre
                naît toujours
                une possibilité de choix.
              </p>
            `
          );


          showSecret(
            "ancient-teachings-two",
            "Les inscriptions semblent placer le choix au cœur de l’équilibre."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".teachings-trigger"
  )
  .forEach((button) => {

    if (
      teachingsObserved.includes(
        button.dataset.teachings
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  teachingsObserved.length >= 5
) {

  setRevealHTML(
    teachingsReveal,
    `
      <p>
        Le corps.
      </p>

      <p>
        Le commencement.
      </p>

      <p>
        La difficulté.
      </p>

      <p>
        La compréhension.
      </p>

      <p class="impact-text">
        LE CHOIX.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 7
   REVENIR À LA SURFACE
========================================================= */

const surfaceReveal =
  document.getElementById(
    "surfaceReveal"
  );


let surfaceObserved =
  getStoredArray(
    STORAGE_SURFACE
  );


const surfaceTexts = {

  air:
    "L’air frais de l’extérieur confirme immédiatement qu’Hope a atteint la surface.",

  vegetation:
    "Une végétation dense et sauvage entoure l’ouverture. Aucun bâtiment n’est visible.",

  location:
    "Hope ne reconnaît aucun repère. Le courant souterrain a pu la transporter sur plusieurs kilomètres.",

  pain:
    "Son corps fonctionne, mais la remontée a réveillé les douleurs laissées par la chute.",

  closing:
    "Derrière elle, la paroi commence déjà à reprendre sa position initiale."

};


document
  .querySelectorAll(
    ".surface-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.surface;


        surfaceObserved =
          addStoredValue(
            STORAGE_SURFACE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          surfaceReveal,
          `
            <p>
              ${surfaceTexts[type]}
            </p>
          `
        );


        playNatureSound();


        if (
          surfaceObserved.length >= 5
        ) {

          setRevealHTML(
            surfaceReveal,
            `
              <p>
                Air frais.
              </p>

              <p>
                Forêt.
              </p>

              <p>
                Aucun repère.
              </p>

              <p>
                Corps encore blessé.
              </p>

              <p class="impact-text">
                HOPE EST DEHORS.
              </p>

              <p class="emphasis">
                Mais elle ignore
                où elle se trouve.
              </p>
            `
          );


          showSecret(
            "hope-surface",
            "Hope parvient enfin à quitter la montagne, loin de son point de chute initial."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".surface-trigger"
  )
  .forEach((button) => {

    if (
      surfaceObserved.includes(
        button.dataset.surface
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  surfaceObserved.length >= 5
) {

  setRevealHTML(
    surfaceReveal,
    `
      <p class="impact-text">
        HOPE EST DEHORS.
      </p>

      <p class="emphasis">
        Mais sans repère.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 8
   VERROU EXTÉRIEUR
========================================================= */

const outerLockReveal =
  document.getElementById(
    "outerLockReveal"
  );

const openOuterLockTrigger =
  document.getElementById(
    "openOuterLockTrigger"
  );

const openOuterLockReveal =
  document.getElementById(
    "openOuterLockReveal"
  );


let outerLockObserved =
  getStoredArray(
    STORAGE_OUTER_LOCK
  );


const outerLockTexts = {

  dragon:
    "Un minuscule symbole du dragon apparaît à peine sur la roche.",

  phoenix:
    "À côté, Hope distingue le symbole du phénix.",

  anna:
    "Entre les deux se trouve la forme qui ressemble à la marque d’Anna."

};


function updateOuterLockButton() {

  if (!openOuterLockTrigger) {
    return;
  }


  if (
    outerLockObserved.length >= 3 &&
    localStorage.getItem(
      STORAGE_OUTER_LOCK_OPEN
    ) !== "1"
  ) {

    openOuterLockTrigger.disabled =
      false;

    openOuterLockTrigger.classList.add(
      "active"
    );

  } else if (
    localStorage.getItem(
      STORAGE_OUTER_LOCK_OPEN
    ) !== "1"
  ) {

    openOuterLockTrigger.disabled =
      true;

    openOuterLockTrigger.classList.remove(
      "active"
    );

  }

}


document
  .querySelectorAll(
    ".outer-lock-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.outerLock;


        outerLockObserved =
          addStoredValue(
            STORAGE_OUTER_LOCK,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          outerLockReveal,
          `
            <p>
              ${outerLockTexts[type]}
            </p>
          `
        );


        playArtifactSound();


        if (
          outerLockObserved.length >= 3
        ) {

          setRevealHTML(
            outerLockReveal,
            `
              <p>
                Dragon.
              </p>

              <p>
                Phénix.
              </p>

              <p>
                Troisième symbole.
              </p>

              <p class="impact-text">
                TROIS MARQUES.
              </p>

              <p class="emphasis">
                Le mécanisme
                peut probablement
                être réactivé depuis l’extérieur.
              </p>
            `
          );

        }


        updateOuterLockButton();

      }
    );

  });


document
  .querySelectorAll(
    ".outer-lock-trigger"
  )
  .forEach((button) => {

    if (
      outerLockObserved.includes(
        button.dataset.outerLock
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


function openOuterLock() {

  if (
    outerLockObserved.length < 3
  ) {
    return;
  }


  localStorage.setItem(
    STORAGE_OUTER_LOCK_OPEN,
    "1"
  );


  setRevealHTML(
    openOuterLockReveal,
    `
      <p>
        Main droite
        sur le dragon.
      </p>

      <p>
        Main gauche
        sur le phénix.
      </p>

      <p>
        Les deux marques
        d’Hope s’illuminent.
      </p>

      <p>
        La roche vibre.
      </p>

      <p class="name-reveal">
        L’OUVERTURE RÉAPPARAÎT.
      </p>

      <p class="emphasis">
        Hope pourra revenir.
      </p>
    `
  );


  completeButton(
    openOuterLockTrigger,
    "Accès confirmé"
  );


  openOuterLockTrigger.disabled =
    true;

  openOuterLockTrigger.classList.remove(
    "active"
  );


  playStoneSound();


  showSecret(
    "return-access",
    "Hope confirme qu’elle peut rouvrir l’accès à la grotte depuis l’extérieur grâce au dragon et au phénix."
  );

}


openOuterLockTrigger?.addEventListener(
  "click",
  openOuterLock
);


updateOuterLockButton();


if (
  localStorage.getItem(
    STORAGE_OUTER_LOCK_OPEN
  ) === "1"
) {

  setRevealHTML(
    openOuterLockReveal,
    `
      <p>
        Dragon.
      </p>

      <p>
        Phénix.
      </p>

      <p class="name-reveal">
        ACCÈS CONFIRMÉ.
      </p>

      <p class="emphasis">
        Hope pourra revenir.
      </p>
    `
  );


  completeButton(
    openOuterLockTrigger,
    "Accès confirmé"
  );


  if (openOuterLockTrigger) {

    openOuterLockTrigger.disabled =
      true;

    openOuterLockTrigger.classList.remove(
      "active"
    );

  }

}


/* =========================================================
   INTERACTION 9
   FORÊT / PRUDENCE
========================================================= */

const forestSurvivalReveal =
  document.getElementById(
    "forestSurvivalReveal"
  );


let forestSurvivalObserved =
  getStoredArray(
    STORAGE_FOREST_SURVIVAL
  );


const forestSurvivalTexts = {

  observe:
    "Hope cherche les mouvements anormaux, les traces récentes et tout signe indiquant qu’elle pourrait être suivie.",

  listen:
    "Elle ralentit régulièrement pour écouter la forêt au lieu de couvrir les sons par ses propres déplacements.",

  direction:
    "Hope change plusieurs fois de direction afin de rendre sa trajectoire moins prévisible.",

  paths:
    "Elle évite les passages les plus évidents qui faciliteraient une interception.",

  network:
    "La pastille holographique ne capte aucun réseau. Hope est encore isolée."

};


document
  .querySelectorAll(
    ".forest-survival-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.forestSurvival;


        forestSurvivalObserved =
          addStoredValue(
            STORAGE_FOREST_SURVIVAL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          forestSurvivalReveal,
          `
            <p>
              ${forestSurvivalTexts[type]}
            </p>
          `
        );


        playNatureSound();


        if (
          forestSurvivalObserved.length >= 5
        ) {

          setRevealHTML(
            forestSurvivalReveal,
            `
              <p>
                Observer.
              </p>

              <p>
                Écouter.
              </p>

              <p>
                Changer de direction.
              </p>

              <p>
                Éviter les routes évidentes.
              </p>

              <p class="impact-text">
                AUCUN RÉSEAU.
              </p>

              <p class="emphasis">
                Amy pourrait être
                quelque part dehors.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".forest-survival-trigger"
  )
  .forEach((button) => {

    if (
      forestSurvivalObserved.includes(
        button.dataset.forestSurvival
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  forestSurvivalObserved.length >= 5
) {

  setRevealHTML(
    forestSurvivalReveal,
    `
      <p>
        Observation.
      </p>

      <p>
        Écoute.
      </p>

      <p>
        Trajectoire imprévisible.
      </p>

      <p class="impact-text">
        AUCUN RÉSEAU.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 10
   IDENTIFIER LE PHÉNIX DE PETER
========================================================= */

const phoenixIdentifyReveal =
  document.getElementById(
    "phoenixIdentifyReveal"
  );


let phoenixIdentifyObserved =
  getStoredArray(
    STORAGE_PHOENIX_IDENTIFY
  );


const phoenixIdentifyTexts = {

  feathers:
    "À distance, les plumes paraissent parfaitement naturelles.",

  flight:
    "La trajectoire est beaucoup trop régulière et précise pour un animal simplement curieux.",

  look:
    "L’oiseau revient plusieurs fois et semble maintenir Hope dans son champ d’observation.",

  behavior:
    "Ses décisions ressemblent davantage à une mission de repérage qu’à un comportement spontané."

};


document
  .querySelectorAll(
    ".phoenix-identify-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.phoenixIdentify;


        phoenixIdentifyObserved =
          addStoredValue(
            STORAGE_PHOENIX_IDENTIFY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          phoenixIdentifyReveal,
          `
            <p>
              ${phoenixIdentifyTexts[type]}
            </p>
          `
        );


        playDataSound();


        if (
          phoenixIdentifyObserved.length >= 4
        ) {

          setRevealHTML(
            phoenixIdentifyReveal,
            `
              <p>
                Apparence naturelle.
              </p>

              <p>
                Vol précis.
              </p>

              <p>
                Observation constante.
              </p>

              <p class="impact-text">
                CE N’EST PAS
                UN OISEAU ORDINAIRE.
              </p>

              <p class="name-reveal">
                PETER.
              </p>
            `
          );


          showSecret(
            "peter-phoenix",
            "Le Phénix biotechnique de Peter a retrouvé Hope dans la forêt."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".phoenix-identify-trigger"
  )
  .forEach((button) => {

    if (
      phoenixIdentifyObserved.includes(
        button.dataset.phoenixIdentify
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  phoenixIdentifyObserved.length >= 4
) {

  setRevealHTML(
    phoenixIdentifyReveal,
    `
      <p class="impact-text">
        LE PHÉNIX DE PETER.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 11
   RÉTABLIR LE RÉSEAU
========================================================= */

const reconnectReveal =
  document.getElementById(
    "reconnectReveal"
  );


const reconnectButtons =
  document.querySelectorAll(
    ".reconnect-trigger"
  );


const reconnectOrder = [
  "drone",
  "relay",
  "network",
  "communication"
];


let reconnectProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_RECONNECT
    ) || "0",
    10
  );


const reconnectTexts = {

  drone:
    "Plusieurs drones rejoignent le Phénix dans la végétation.",

  relay:
    "L’un d’eux se stabilise près d’Hope et active un relais de communication.",

  network:
    "La pastille holographique d’Hope vibre : le réseau vient d’être rétabli.",

  communication:
    "Hope peut enfin lancer une communication sécurisée."

};


function restoreReconnect() {

  reconnectButtons.forEach(
    (button, index) => {

      if (
        index < reconnectProgress
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
    reconnectProgress >= 4
  ) {

    setRevealHTML(
      reconnectReveal,
      `
        <p>
          Drone.
        </p>

        <p>
          Relais.
        </p>

        <p>
          Réseau.
        </p>

        <p class="name-reveal">
          COMMUNICATION RÉTABLIE.
        </p>
      `
    );

  }

}


reconnectButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.reconnect;


        const expected =
          reconnectOrder[
            reconnectProgress
          ];


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
            650
          );


          return;

        }


        reconnectProgress++;


        localStorage.setItem(
          STORAGE_RECONNECT,
          reconnectProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          reconnectReveal,
          `
            <p>
              ${reconnectTexts[selected]}
            </p>
          `
        );


        playDataSound();


        if (
          reconnectProgress >= 4
        ) {

          setRevealHTML(
            reconnectReveal,
            `
              <p>
                Drone.
              </p>

              <p>
                Relais.
              </p>

              <p>
                Réseau.
              </p>

              <p class="name-reveal">
                COMMUNICATION RÉTABLIE.
              </p>

              <p class="emphasis">
                Peter peut enfin
                localiser Hope précisément.
              </p>
            `
          );


          showSecret(
            "network-restored",
            "Les drones de Peter servent de relais et rétablissent la communication avec Hope."
          );

        }

      }
    );

  });


restoreReconnect();


/* =========================================================
   INTERACTION 12
   NOUVELLES DU GROUPE
========================================================= */

const groupNewsReveal =
  document.getElementById(
    "groupNewsReveal"
  );


let groupNewsObserved =
  getStoredArray(
    STORAGE_GROUP_NEWS
  );


const groupNewsTexts = {

  anna:
    "Anna est en sécurité.",

  betty:
    "Betty va bien et participe toujours aux recherches.",

  max:
    "Max va bien. Selon Peter, il est toujours aussi insupportable.",

  root:
    "Root n’a pas dormi depuis la disparition de Hope.",

  guardians:
    "Les Gardiens cherchent Hope eux aussi. Ils ne sont pas les seuls."

};


document
  .querySelectorAll(
    ".group-news-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.groupNews;


        groupNewsObserved =
          addStoredValue(
            STORAGE_GROUP_NEWS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          groupNewsReveal,
          `
            <p>
              ${groupNewsTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          groupNewsObserved.length >= 5
        ) {

          setRevealHTML(
            groupNewsReveal,
            `
              <p>
                Anna :
                en sécurité.
              </p>

              <p>
                Betty :
                en sécurité.
              </p>

              <p>
                Max :
                toujours insupportable.
              </p>

              <p>
                Root :
                n’a pas dormi.
              </p>

              <p class="impact-text">
                LES GARDIENS
                CHERCHENT AUSSI HOPE.
              </p>
            `
          );


          showSecret(
            "everyone-searching",
            "Hope apprend que plusieurs groupes, dont les Gardiens Noirs, se sont mis à sa recherche."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".group-news-trigger"
  )
  .forEach((button) => {

    if (
      groupNewsObserved.includes(
        button.dataset.groupNews
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  groupNewsObserved.length >= 5
) {

  setRevealHTML(
    groupNewsReveal,
    `
      <p>
        Anna : en sécurité.
      </p>

      <p>
        Betty : en sécurité.
      </p>

      <p>
        Max : en sécurité.
      </p>

      <p>
        Root : inquiète.
      </p>

      <p class="impact-text">
        LES GARDIENS
        CHERCHENT HOPE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 13
   RETROUVAILLES
========================================================= */

const reunionReveal =
  document.getElementById(
    "reunionReveal"
  );


let reunionObserved =
  getStoredArray(
    STORAGE_REUNION
  );


const reunionTexts = {

  root:
    "Root traverse immédiatement la distance qui la sépare d’Hope, la serre dans ses bras, puis lui reproche brutalement de les avoir laissés croire à sa mort.",

  max:
    "Max retrouve son humour presque immédiatement et propose d’attendre qu’Hope soit totalement remise avant de la battre.",

  betty:
    "Betty surprend Hope en la prenant dans ses bras et lui demande de ne jamais refaire une chose pareille."

};


document
  .querySelectorAll(
    ".reunion-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.reunion;


        reunionObserved =
          addStoredValue(
            STORAGE_REUNION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          reunionReveal,
          `
            <p>
              ${reunionTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          reunionObserved.length >= 3
        ) {

          setRevealHTML(
            reunionReveal,
            `
              <p>
                Root.
              </p>

              <p>
                Max.
              </p>

              <p>
                Betty.
              </p>

              <p class="impact-text">
                HOPE EST RETROUVÉE.
              </p>

              <p class="emphasis">
                Et personne
                ne semble disposé
                à la laisser disparaître
                une deuxième fois.
              </p>
            `
          );


          showSecret(
            "hope-found",
            "Root, Max et Betty retrouvent enfin Hope vivante."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".reunion-trigger"
  )
  .forEach((button) => {

    if (
      reunionObserved.includes(
        button.dataset.reunion
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  reunionObserved.length >= 3
) {

  setRevealHTML(
    reunionReveal,
    `
      <p class="impact-text">
        HOPE EST RETROUVÉE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 14
   CONFRONTATION BETTY
========================================================= */

const bettyTruthReveal =
  document.getElementById(
    "bettyTruthReveal"
  );


const bettyTruthButtons =
  document.querySelectorAll(
    ".betty-truth-trigger"
  );


const bettyTruthOrder = [
  "ancients",
  "vial",
  "blood",
  "age",
  "reaction"
];


let bettyTruthProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_BETTY_TRUTH
    ) || "0",
    10
  );


const bettyTruthTexts = {

  ancients:
    "Hope commence par révéler qu’elle a découvert quelque chose concernant les Anciens. Le visage de Betty change légèrement.",

  vial:
    "Lorsque Hope mentionne la fiole, Betty pâlit.",

  blood:
    "Hope affirme que Betty savait que la fiole contenait du sang.",

  age:
    "Hope prononce simplement : Anna a dix-neuf ans.",

  reaction:
    "La respiration de Betty se bloque une fraction de seconde. Ce détail suffit à transformer l’hypothèse d’Hope en quelque chose de beaucoup plus sérieux."

};


function restoreBettyTruth() {

  bettyTruthButtons.forEach(
    (button, index) => {

      if (
        index < bettyTruthProgress
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
    bettyTruthProgress >= 5
  ) {

    setRevealHTML(
      bettyTruthReveal,
      `
        <p>
          Les Anciens.
        </p>

        <p>
          La fiole.
        </p>

        <p>
          Le sang.
        </p>

        <p>
          Dix-neuf ans.
        </p>

        <p class="impact-text">
          BETTY RÉAGIT.
        </p>

        <p class="name-reveal">
          ANNA.
        </p>

        <p class="emphasis">
          L’hypothèse d’Hope
          vient de devenir
          beaucoup plus sérieuse.
        </p>
      `
    );

  }

}


bettyTruthButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.bettyTruth;


        const expected =
          bettyTruthOrder[
            bettyTruthProgress
          ];


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
            650
          );


          return;

        }


        bettyTruthProgress++;


        localStorage.setItem(
          STORAGE_BETTY_TRUTH,
          bettyTruthProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          bettyTruthReveal,
          `
            <p>
              ${bettyTruthTexts[selected]}
            </p>
          `
        );


        playDeductionSound();


        if (
          bettyTruthProgress >= 5
        ) {

          setRevealHTML(
            bettyTruthReveal,
            `
              <p>
                Les Anciens.
              </p>

              <p>
                La fiole.
              </p>

              <p>
                Le sang.
              </p>

              <p>
                Dix-neuf ans.
              </p>

              <p class="impact-text">
                BETTY RÉAGIT.
              </p>

              <p class="name-reveal">
                ANNA.
              </p>

              <p class="emphasis">
                Hope n’avait
                qu’une hypothèse.
                La réaction de Betty
                vient de la renforcer.
              </p>
            `
          );


          showSecret(
            "betty-confirms-suspicion",
            "Sans rien avouer directement, la réaction de Betty confirme à Hope qu’elle a découvert quelque chose de fondamental."
          );

        }

      }
    );

  });


restoreBettyTruth();


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-29"
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


/* =========================================================
   ARRÊT DU SON
========================================================= */

function stopSound() {

  if (
    !soundActive ||
    !audioCtx
  ) {
    return;
  }


  const oldAudioCtx =
    audioCtx;

  const oldOsc1 =
    ambienceOsc1;

  const oldOsc2 =
    ambienceOsc2;

  const oldMasterGain =
    masterGain;


  soundActive =
    false;


  if (soundBtn) {

    soundBtn.classList.remove(
      "sound-active"
    );


    soundBtn.textContent =
      "♫";

  }


  if (oldMasterGain) {

    try {

      oldMasterGain.gain
        .exponentialRampToValueAtTime(
          0.0001,
          oldAudioCtx.currentTime + 0.35
        );

    } catch {

      /* rien */

    }

  }


  audioCtx =
    null;

  masterGain =
    null;

  ambienceOsc1 =
    null;

  ambienceOsc2 =
    null;


  setTimeout(
    () => {

      try {

        oldOsc1?.stop();

      } catch {

        /* rien */

      }


      try {

        oldOsc2?.stop();

      } catch {

        /* rien */

      }


      try {

        oldAudioCtx?.close();

      } catch {

        /* rien */

      }

    },
    450
  );

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
   GÉNÉRATEUR DE TONS
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
      audioCtx.currentTime + duration
    );


  oscillator
    .connect(gain)
    .connect(
      audioCtx.destination
    );


  oscillator.start();


  oscillator.stop(
    audioCtx.currentTime + duration
  );

}


/* =========================================================
   EFFETS SONORES
========================================================= */

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


function playDataSound() {

  playTone(
    360,
    0.3,
    0.016,
    "square"
  );


  setTimeout(
    () => {

      playTone(
        445,
        0.4,
        0.014,
        "triangle"
      );

    },
    110
  );

}


function playMemorySound() {

  playTone(
    330,
    0.75,
    0.016,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        440,
        0.9,
        0.014,
        "triangle"
      );

    },
    180
  );

}


function playArtifactSound() {

  playTone(
    380,
    0.65,
    0.017,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        520,
        0.85,
        0.014,
        "triangle"
      );

    },
    140
  );


  setTimeout(
    () => {

      playTone(
        690,
        1,
        0.012
      );

    },
    300
  );

}


function playDragonSound() {

  playTone(
    250,
    0.45,
    0.022,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        470,
        0.75,
        0.018,
        "sine"
      );

    },
    120
  );

}


function playStoneSound() {

  playTone(
    180,
    0.55,
    0.02,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        240,
        0.8,
        0.017,
        "sine"
      );

    },
    130
  );


  setTimeout(
    () => {

      playTone(
        320,
        0.95,
        0.012,
        "triangle"
      );

    },
    280
  );

}


function playNatureSound() {

  playTone(
    440,
    0.45,
    0.014,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        660,
        0.6,
        0.012,
        "triangle"
      );

    },
    120
  );

}


function playWarmSound() {

  playTone(
    420,
    0.5,
    0.017,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        560,
        0.7,
        0.014,
        "triangle"
      );

    },
    130
  );

}


function playDeductionSound() {

  playTone(
    390,
    0.4,
    0.017,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        550,
        0.55,
        0.015,
        "sine"
      );

    },
    100
  );


  setTimeout(
    () => {

      playTone(
        720,
        0.75,
        0.012
      );

    },
    220
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
   TOUCHE ÉCHAP
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
