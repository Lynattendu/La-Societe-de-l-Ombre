/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 8 — L’ÉQUILIBRE
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
  "societeOmbre_chapitre8_scroll";

const STORAGE_PROGRESS =
  "societeOmbre_chapitre8_progression";

const STORAGE_COMPLETED =
  "societeOmbre_chapitre8_termine";

const STORAGE_SURVEILLANCE =
  "societeOmbre_chapitre8_surveillance";

const STORAGE_LEARNING =
  "societeOmbre_chapitre8_learning";

const STORAGE_ENTOURAGE =
  "societeOmbre_chapitre8_entourage";

const STORAGE_CONVERGENCE =
  "societeOmbre_chapitre8_convergence";

const STORAGE_OPERATIONS =
  "societeOmbre_chapitre8_operations";

const STORAGE_HOPE_FILE =
  "societeOmbre_chapitre8_hopeFile";

const STORAGE_STRATEGY =
  "societeOmbre_chapitre8_strategy";

const STORAGE_ISABEL_PROFILE =
  "societeOmbre_chapitre8_isabelProfile";

const STORAGE_CONNECTION =
  "societeOmbre_chapitre8_connection";

const STORAGE_REPORT =
  "societeOmbre_chapitre8_report";

const STORAGE_ISABEL_CONFLICT =
  "societeOmbre_chapitre8_isabelConflict";

const STORAGE_GHOST =
  "societeOmbre_chapitre8_ghost";

const STORAGE_AMY_REACTION =
  "societeOmbre_chapitre8_amyReaction";

const STORAGE_MISSION =
  "societeOmbre_chapitre8_mission";

const STORAGE_SECRETS =
  "societeOmbre_chapitre8_secrets";


/* =========================================================
   COMPATIBILITÉ ANCIENNE FIN
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre8_finished"
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

  const prefix =
    "societeOmbre_chapitre8_";


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
      key.startsWith(prefix)
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
    "chapitre8.html?lecture=recommencer";

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

function openReveal(reveal) {

  if (!reveal) {
    return;
  }


  reveal.classList.add(
    "open"
  );

}


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
   SURVEILLANCE D'ANNA
========================================================= */

const surveillanceReveal =
  document.getElementById(
    "surveillanceReveal"
  );


let surveillanceObserved =
  getStoredArray(
    STORAGE_SURVEILLANCE
  );


const surveillanceTexts = {

  betty:
    "Les déplacements d’Anna avec Betty sont suivis jusque dans la propriété familiale.",

  hale:
    "Ses entraînements et ses échanges avec Hale sont régulièrement documentés.",

  lucy:
    "Ses conversations avec Lucy attirent particulièrement l’attention en raison de son intérêt croissant pour la justice et l’information.",

  hope:
    "La présence de Hope revient dans un nombre croissant de rapports depuis son arrivée au Mexique.",

  max:
    "Même la conversation d’Anna avec Max lors de l’inauguration du NEXUS a été photographiée."

};


document
  .querySelectorAll(
    ".surveillance-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.surveillance;


        surveillanceObserved =
          addStoredValue(
            STORAGE_SURVEILLANCE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          surveillanceReveal,
          `
            <p>
              ${surveillanceTexts[type]}
            </p>
          `
        );


        playDataSound();


        if (
          surveillanceObserved.length >= 5
        ) {

          setRevealHTML(
            surveillanceReveal,
            `
              <p>
                Betty.
              </p>

              <p>
                Hale.
              </p>

              <p>
                Lucy.
              </p>

              <p>
                Hope.
              </p>

              <p>
                Max.
              </p>

              <p class="emphasis">
                Quelqu’un observe Anna
                depuis longtemps.
              </p>
            `
          );


          showSecret(
            "anna-surveillance",
            "La surveillance d’Anna dépasse largement une opération récente : ses relations et son évolution sont suivies de manière méthodique."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".surveillance-trigger"
  )
  .forEach((button) => {

    if (
      surveillanceObserved.includes(
        button.dataset.surveillance
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 2
   APPRENTISSAGE D'ANNA
========================================================= */

const learningReveal =
  document.getElementById(
    "learningReveal"
  );


let learningObserved =
  getStoredArray(
    STORAGE_LEARNING
  );


const learningTexts = {

  french:
    "En quelques jours, Anna est passée de connaissances très limitées en français à des conversations simples et une compréhension beaucoup plus avancée.",

  combat:
    "Elle observe un mouvement, le reproduit, puis semble capable de corriger rapidement ses propres erreurs.",

  justice:
    "Son contact avec Lucy développe son intérêt pour la justice, la manipulation de données, la désinformation et les réseaux criminels.",

  journalism:
    "Son échange avec Max confirme un intérêt de plus en plus sérieux pour le journalisme et la recherche d’informations."

};


document
  .querySelectorAll(
    ".learning-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.learning;


        learningObserved =
          addStoredValue(
            STORAGE_LEARNING,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          learningReveal,
          `
            <p>
              ${learningTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          learningObserved.length >= 4
        ) {

          setRevealHTML(
            learningReveal,
            `
              <p>
                Langue.
              </p>

              <p>
                Combat.
              </p>

              <p>
                Information.
              </p>

              <p>
                Journalisme.
              </p>

              <p class="impact-text">
                PROGRESSION ACCÉLÉRÉE
              </p>

              <p class="emphasis">
                Anna apprend
                beaucoup plus vite
                que prévu.
              </p>
            `
          );


          showSecret(
            "anna-learning",
            "La vitesse d’apprentissage d’Anna dépasse nettement les estimations du Maître Noir."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".learning-trigger"
  )
  .forEach((button) => {

    if (
      learningObserved.includes(
        button.dataset.learning
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 3
   ENTOURAGE D'ANNA
========================================================= */

const entourageReveal =
  document.getElementById(
    "entourageReveal"
  );


let entourageObserved =
  getStoredArray(
    STORAGE_ENTOURAGE
  );


const entourageTexts = {

  betty:
    "Betty apporte à Anna la génétique, la science, les ressources financières et l’accès à un environnement de recherche exceptionnel.",

  lucy:
    "Lucy lui ouvre progressivement le monde de l’enquête, de la cybercriminalité, de l’information et de l’intelligence artificielle.",

  root:
    "Root lui apporte une manière de penser fondée sur l’histoire, les causes, les conséquences et la compréhension du passé.",

  max:
    "Max représente le journalisme, l’investigation de terrain et la capacité de diffuser une information au-delà d’un cercle restreint.",

  peter:
    "Peter représente la technologie, la sécurité et la capacité de construire des solutions qui n’existent pas encore.",

  hope:
    "Hope apporte discipline, maîtrise du corps, combat, protection et un savoir ancien encore difficile à mesurer.",

  hale:
    "Hale connaît Anna depuis sa naissance et représente à la fois sa protection quotidienne et un lien direct avec le monde des Sentinelles."

};


document
  .querySelectorAll(
    ".entourage-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.entourage;


        entourageObserved =
          addStoredValue(
            STORAGE_ENTOURAGE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          entourageReveal,
          `
            <p>
              ${entourageTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          entourageObserved.length >= 7
        ) {

          setRevealHTML(
            entourageReveal,
            `
              <p>
                Science.
              </p>

              <p>
                Information.
              </p>

              <p>
                Histoire.
              </p>

              <p>
                Journalisme.
              </p>

              <p>
                Technologie.
              </p>

              <p>
                Combat.
              </p>

              <p>
                Protection.
              </p>

              <p class="impact-text">
                Anna ne possède pas
                toutes ces compétences.
              </p>

              <p class="emphasis">
                Elle est entourée
                de ceux qui les possèdent.
              </p>
            `
          );


          showSecret(
            "anna-network",
            "Le véritable danger d’Anna pourrait venir moins de ce qu’elle sait déjà que de la diversité exceptionnelle des personnes dont elle apprend."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".entourage-trigger"
  )
  .forEach((button) => {

    if (
      entourageObserved.includes(
        button.dataset.entourage
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 4
   CONVERGENCE
========================================================= */

const convergenceTrigger =
  document.getElementById(
    "convergenceTrigger"
  );

const convergenceReveal =
  document.getElementById(
    "convergenceReveal"
  );


function revealConvergence() {

  localStorage.setItem(
    STORAGE_CONVERGENCE,
    "1"
  );


  openReveal(
    convergenceReveal
  );


  completeButton(
    convergenceTrigger,
    "Convergence révélée"
  );


  convergenceTrigger.disabled =
    true;


  playRevealSound();


  showSecret(
    "anna-convergence",
    "Anna semble fonctionner comme un point de convergence entre plusieurs domaines de connaissance et plusieurs personnes clés."
  );

}


convergenceTrigger?.addEventListener(
  "click",
  revealConvergence
);


if (
  localStorage.getItem(
    STORAGE_CONVERGENCE
  ) === "1"
) {

  openReveal(
    convergenceReveal
  );


  completeButton(
    convergenceTrigger,
    "Convergence révélée"
  );


  if (convergenceTrigger) {

    convergenceTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 5
   OPÉRATIONS ÉCHOUÉES
========================================================= */

const operationReveal =
  document.getElementById(
    "operationReveal"
  );


let operationsObserved =
  getStoredArray(
    STORAGE_OPERATIONS
  );


const operationTexts = {

  capture:
    `
      <p class="impact-text">
        OPÉRATION 1
      </p>

      <p>
        OBJECTIF — CAPTURE
      </p>

      <p>
        Anna devait être récupérée
        vivante.
      </p>

      <p class="emphasis">
        RÉSULTAT — ÉCHEC
      </p>
    `,

  elimination:
    `
      <p class="impact-text">
        OPÉRATION 2
      </p>

      <p>
        OBJECTIF — ÉLIMINATION
      </p>

      <p>
        Anna devait disparaître.
      </p>

      <p class="emphasis">
        RÉSULTAT — ÉCHEC
      </p>
    `

};


document
  .querySelectorAll(
    ".operation-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.operation;


        operationsObserved =
          addStoredValue(
            STORAGE_OPERATIONS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          operationReveal,
          operationTexts[type]
        );


        playDarkSound();


        if (
          operationsObserved.length >= 2
        ) {

          setRevealHTML(
            operationReveal,
            `
              <p class="impact-text">
                DEUX OPÉRATIONS
              </p>

              <p>
                Capture — Échec.
              </p>

              <p>
                Élimination — Échec.
              </p>

              <p class="emphasis">
                Facteur commun :
                l’environnement d’Anna
                a été sous-estimé.
              </p>
            `
          );


          showSecret(
            "two-failures",
            "Après deux échecs successifs, le Maître Noir ne considère plus Anna comme une cible isolée."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".operation-trigger"
  )
  .forEach((button) => {

    if (
      operationsObserved.includes(
        button.dataset.operation
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 6
   DOSSIER HOPE
========================================================= */

const hopeFileReveal =
  document.getElementById(
    "hopeFileReveal"
  );


let hopeFileObserved =
  getStoredArray(
    STORAGE_HOPE_FILE
  );


const hopeFileTexts = {

  combat:
    "Hope possède une maîtrise exceptionnelle des arts martiaux et une capacité à neutraliser rapidement plusieurs adversaires.",

  anna:
    "Elle est intervenue directement pour empêcher l’élimination d’Anna et semble désormais considérer sa protection comme personnelle.",

  betty:
    "Elle a pris un projectile destiné à Betty, rompant avec son comportement habituellement extrêmement calculé.",

  recovery:
    "Une semaine après une blessure critique et une intervention chirurgicale, elle aurait déjà repris un entraînement contrôlé."

};


document
  .querySelectorAll(
    ".hope-file-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.hopeFile;


        hopeFileObserved =
          addStoredValue(
            STORAGE_HOPE_FILE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          hopeFileReveal,
          `
            <p>
              ${hopeFileTexts[type]}
            </p>
          `
        );


        playMarkSound();


        if (
          hopeFileObserved.length >= 4
        ) {

          setRevealHTML(
            hopeFileReveal,
            `
              <p>
                Maîtrise du combat.
              </p>

              <p>
                Protection d’Anna.
              </p>

              <p>
                Protection de Betty.
              </p>

              <p>
                Récupération exceptionnelle.
              </p>

              <p class="impact-text">
                FACTEUR HOPE AWAKE
              </p>

              <p class="emphasis">
                Toujours aussi difficile
                à tuer.
              </p>
            `
          );


          showSecret(
            "hope-threat",
            "Le Maître Noir semble connaître Hope depuis suffisamment longtemps pour ne pas être réellement surpris par sa survie."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".hope-file-trigger"
  )
  .forEach((button) => {

    if (
      hopeFileObserved.includes(
        button.dataset.hopeFile
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 7
   STRATÉGIE DU MAÎTRE NOIR
========================================================= */

const strategyReveal =
  document.getElementById(
    "strategyReveal"
  );


const strategyButtons =
  document.querySelectorAll(
    ".strategy-trigger"
  );


const strategyOrder = [
  "recover",
  "guide",
  "convince",
  "eliminate"
];


let strategyProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_STRATEGY
    ) || "0",
    10
  );


const strategyTexts = {

  recover:
    "Première idée : récupérer Anna vivante.",

  guide:
    "Deuxième possibilité : l’éduquer autrement et orienter sa compréhension du monde.",

  convince:
    "Troisième étape : tenter de la convaincre d’adhérer volontairement à leur vision.",

  eliminate:
    "Dernière conclusion : Anna n’est plus considérée comme récupérable. Elle devient une menace à supprimer."

};


function restoreStrategy() {

  strategyButtons.forEach(
    (button, index) => {

      if (
        index < strategyProgress
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
    strategyProgress >= 4
  ) {

    setRevealHTML(
      strategyReveal,
      `
        <p>
          Récupérer.
        </p>

        <p>
          Guider.
        </p>

        <p>
          Convaincre.
        </p>

        <p class="impact-text">
          ÉLIMINER.
        </p>

        <p class="emphasis">
          Le temps où Anna pouvait
          encore être récupérée
          est terminé.
        </p>
      `
    );

  }

}


strategyButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.strategy;


        const expected =
          strategyOrder[
            strategyProgress
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


        strategyProgress++;


        localStorage.setItem(
          STORAGE_STRATEGY,
          strategyProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          strategyReveal,
          `
            <p>
              ${strategyTexts[selected]}
            </p>
          `
        );


        playDarkSound();


        if (
          strategyProgress >= 4
        ) {

          setRevealHTML(
            strategyReveal,
            `
              <p>
                Récupérer.
              </p>

              <p>
                Guider.
              </p>

              <p>
                Convaincre.
              </p>

              <p class="impact-text">
                ÉLIMINER.
              </p>

              <p class="emphasis">
                Le Maître Noir
                change définitivement
                de stratégie.
              </p>
            `
          );


          showSecret(
            "anna-elimination",
            "Le Maître Noir abandonne définitivement l’idée de récupérer Anna : sa progression et son entourage la rendent désormais trop dangereuse."
          );

        }

      }
    );

  });


restoreStrategy();


/* =========================================================
   INTERACTION 8
   PROFIL ISABEL
========================================================= */

const isabelProfileReveal =
  document.getElementById(
    "isabelProfileReveal"
  );


let isabelProfileObserved =
  getStoredArray(
    STORAGE_ISABEL_PROFILE
  );


const isabelProfileTexts = {

  planning:
    "Isabel connaît les horaires du personnel et les changements de rotation.",

  providers:
    "Elle organise les prestataires, les livraisons et les interventions extérieures.",

  maintenance:
    "Elle sait quand certaines caméras, portes ou installations doivent être entretenues.",

  access:
    "Elle gère une partie des accès temporaires nécessaires aux intervenants et visiteurs.",

  travel:
    "Elle connaît les déplacements de Betty, les sorties d’Anna et une partie des habitudes quotidiennes de la propriété."

};


document
  .querySelectorAll(
    ".isabel-profile-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.isabelProfile;


        isabelProfileObserved =
          addStoredValue(
            STORAGE_ISABEL_PROFILE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          isabelProfileReveal,
          `
            <p>
              ${isabelProfileTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          isabelProfileObserved.length >= 5
        ) {

          setRevealHTML(
            isabelProfileReveal,
            `
              <p>
                Isabel ne possède pas
                l’ensemble des données
                de sécurité.
              </p>

              <p>
                Elle possède quelque chose
                de presque plus utile :
              </p>

              <p class="impact-text">
                les habitudes.
              </p>

              <p class="emphasis">
                Elle sait juste assez
                pour ouvrir des failles.
              </p>
            `
          );


          showSecret(
            "isabel-role",
            "Isabel peut fournir les informations nécessaires à une intrusion sans jamais avoir besoin d’accéder directement aux systèmes de sécurité les plus sensibles."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".isabel-profile-trigger"
  )
  .forEach((button) => {

    if (
      isabelProfileObserved.includes(
        button.dataset.isabelProfile
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 9
   CONNEXION SECRÈTE
========================================================= */

const secretConnectionTrigger =
  document.getElementById(
    "secretConnectionTrigger"
  );

const secretConnectionReveal =
  document.getElementById(
    "secretConnectionReveal"
  );


function activateSecretConnection() {

  localStorage.setItem(
    STORAGE_CONNECTION,
    "1"
  );


  openReveal(
    secretConnectionReveal
  );


  completeButton(
    secretConnectionTrigger,
    "Connexion ouverte"
  );


  secretConnectionTrigger.disabled =
    true;


  playConnectionSound();


  showSecret(
    "isabel-connection",
    "Le banal tableau de gestion d’Isabel dissimule un accès à une interface sécurisée."
  );

}


secretConnectionTrigger?.addEventListener(
  "click",
  activateSecretConnection
);


if (
  localStorage.getItem(
    STORAGE_CONNECTION
  ) === "1"
) {

  openReveal(
    secretConnectionReveal
  );


  completeButton(
    secretConnectionTrigger,
    "Connexion ouverte"
  );


  if (secretConnectionTrigger) {

    secretConnectionTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 10
   RAPPORT ISABEL
========================================================= */

const reportReveal =
  document.getElementById(
    "reportReveal"
  );


let reportObserved =
  getStoredArray(
    STORAGE_REPORT
  );


const reportTexts = {

  cognitive:
    `
      <p>
        ÉVOLUTION COGNITIVE —
        TOUJOURS SUPÉRIEURE
        AUX ESTIMATIONS.
      </p>

      <p>
        FRANÇAIS —
        PROGRESSION EXTRÊMEMENT RAPIDE.
      </p>
    `,

  training:
    `
      <p>
        ENTRAÎNEMENT PHYSIQUE —
        QUOTIDIEN.
      </p>

      <p>
        FORMATION PRINCIPALE —
        H. AWAKE.
      </p>
    `,

  journalism:
    `
      <p>
        INTÉRÊT POUR LE JOURNALISME —
        CONFIRMÉ.
      </p>

      <p>
        CONTACT AVEC M. SPEEDMAN —
        PROBABLE.
      </p>
    `,

  lucy:
    `
      <p>
        INTÉRÊT CROISSANT
        POUR LES ACTIVITÉS
        DE L. ADVERSE.
      </p>

      <p>
        SUJETS RÉCURRENTS :
        JUSTICE,
        MANIPULATION,
        ORGANISATIONS CLANDESTINES,
        VÉRITÉ.
      </p>
    `,

  hope:
    `
      <p>
        RELATION AVEC H. AWAKE —
        RAPPROCHEMENT TRÈS RAPIDE.
      </p>

      <p class="emphasis">
        H. Awake semble également
        développer un attachement
        inhabituel envers le sujet.
      </p>
    `

};


document
  .querySelectorAll(
    ".report-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.report;


        reportObserved =
          addStoredValue(
            STORAGE_REPORT,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          reportReveal,
          reportTexts[type]
        );


        playDataSound();


        if (
          reportObserved.length >= 5
        ) {

          setRevealHTML(
            reportReveal,
            `
              <p>
                Progression cognitive.
              </p>

              <p>
                Entraînement.
              </p>

              <p>
                Journalisme.
              </p>

              <p>
                Lucy.
              </p>

              <p>
                Hope.
              </p>

              <p class="impact-text">
                LE RAPPORT NE PORTE PLUS
                SEULEMENT SUR ANNA.
              </p>

              <p class="emphasis">
                Son entourage est désormais
                lui aussi analysé.
              </p>
            `
          );


          showSecret(
            "hope-observed",
            "Les observateurs ont compris qu’Hope développe envers Anna et Betty un attachement susceptible de modifier ses décisions."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".report-trigger"
  )
  .forEach((button) => {

    if (
      reportObserved.includes(
        button.dataset.report
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 11
   CONFLIT D'ISABEL
========================================================= */

const isabelConflictTrigger =
  document.getElementById(
    "isabelConflictTrigger"
  );

const isabelConflictReveal =
  document.getElementById(
    "isabelConflictReveal"
  );


function revealIsabelConflict() {

  localStorage.setItem(
    STORAGE_ISABEL_CONFLICT,
    "1"
  );


  openReveal(
    isabelConflictReveal
  );


  completeButton(
    isabelConflictTrigger,
    "Conflit révélé"
  );


  isabelConflictTrigger.disabled =
    true;


  playMarkSound();


  showSecret(
    "isabel-doubt",
    "Isabel commence à comprendre que la jeune femme qu’elle espionne depuis des années n’est plus pour elle un simple sujet de rapport."
  );

}


isabelConflictTrigger?.addEventListener(
  "click",
  revealIsabelConflict
);


if (
  localStorage.getItem(
    STORAGE_ISABEL_CONFLICT
  ) === "1"
) {

  openReveal(
    isabelConflictReveal
  );


  completeButton(
    isabelConflictTrigger,
    "Conflit révélé"
  );


  if (isabelConflictTrigger) {

    isabelConflictTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 12
   LE FANTÔME
========================================================= */

const ghostReveal =
  document.getElementById(
    "ghostReveal"
  );


let ghostObserved =
  getStoredArray(
    STORAGE_GHOST
  );


const ghostTexts = {

  movement:
    "Amy bouge sans gaspiller le moindre geste. Tout semble fluide, calculé et silencieux.",

  precision:
    "Le couteau disparaît dans sa manche avec une précision presque mécanique.",

  awareness:
    "Elle détecte immédiatement la présence de quelqu’un derrière elle sans avoir besoin de se retourner.",

  control:
    "Aucune surprise visible. Aucun mouvement réflexe inutile. Son calme semble permanent."

};


document
  .querySelectorAll(
    ".ghost-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.ghost;


        ghostObserved =
          addStoredValue(
            STORAGE_GHOST,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          ghostReveal,
          `
            <p>
              ${ghostTexts[type]}
            </p>
          `
        );


        playGhostSound();


        if (
          ghostObserved.length >= 4
        ) {

          setRevealHTML(
            ghostReveal,
            `
              <p>
                Silence.
              </p>

              <p>
                Précision.
              </p>

              <p>
                Observation.
              </p>

              <p>
                Contrôle.
              </p>

              <p class="name-reveal">
                LE FANTÔME
              </p>
            `
          );


          showSecret(
            "amy-ghost",
            "Amy n’est pas une exécutante ordinaire. Son surnom, le Fantôme, correspond à une maîtrise extrême de la discrétion et du contrôle."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".ghost-trigger"
  )
  .forEach((button) => {

    if (
      ghostObserved.includes(
        button.dataset.ghost
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 13
   RÉACTION D'AMY À HOPE
========================================================= */

const amyReactionReveal =
  document.getElementById(
    "amyReactionReveal"
  );


let amyReactionObserved =
  getStoredArray(
    STORAGE_AMY_REACTION
  );


const amyReactionTexts = {

  eyes:
    "Son regard reste calme, mais son attention se fixe nettement plus longtemps sur la photographie de Hope.",

  posture:
    "Son corps s’immobilise complètement. Ce changement est discret, mais inhabituel chez quelqu’un qui contrôlait chaque mouvement quelques secondes auparavant.",

  breathing:
    "Sa respiration reste maîtrisée. Pourtant, le silence qui suit l’apparition de Hope dure légèrement trop longtemps."

};


document
  .querySelectorAll(
    ".amy-reaction-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.amyReaction;


        amyReactionObserved =
          addStoredValue(
            STORAGE_AMY_REACTION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          amyReactionReveal,
          `
            <p>
              ${amyReactionTexts[type]}
            </p>
          `
        );


        playMarkSound();


        if (
          amyReactionObserved.length >= 3
        ) {

          setRevealHTML(
            amyReactionReveal,
            `
              <p>
                Regard.
              </p>

              <p>
                Posture.
              </p>

              <p>
                Silence.
              </p>

              <p class="emphasis">
                Amy a reconnu quelque chose.
              </p>

              <p>
                Mais elle ne donne
                aucune explication.
              </p>
            `
          );


          showSecret(
            "amy-hope-reaction",
            "La réaction d’Amy à la photographie de Hope est différente de sa réaction à Anna. La raison reste inconnue."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".amy-reaction-trigger"
  )
  .forEach((button) => {

    if (
      amyReactionObserved.includes(
        button.dataset.amyReaction
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 14
   DOSSIER DE MISSION
========================================================= */

const missionTrigger =
  document.getElementById(
    "missionTrigger"
  );

const missionReveal =
  document.getElementById(
    "missionReveal"
  );


function revealMission() {

  localStorage.setItem(
    STORAGE_MISSION,
    "1"
  );


  openReveal(
    missionReveal
  );


  completeButton(
    missionTrigger,
    "Dossier ouvert"
  );


  missionTrigger.disabled =
    true;


  playDarkSound();


  showSecret(
    "amy-mission",
    "Après deux opérations échouées, le Maître Noir confie directement l’observation d’Anna au Fantôme."
  );

}


missionTrigger?.addEventListener(
  "click",
  revealMission
);


if (
  localStorage.getItem(
    STORAGE_MISSION
  ) === "1"
) {

  openReveal(
    missionReveal
  );


  completeButton(
    missionTrigger,
    "Dossier ouvert"
  );


  if (missionTrigger) {

    missionTrigger.disabled =
      true;

  }

}


/* =========================================================
   MÉMOIRE DU CHAPITRE 7
========================================================= */

const chapter7Finished =
  localStorage.getItem(
    "societeOmbre_chapitre7_termine"
  ) ||
  localStorage.getItem(
    "societeOmbre_chapitre7_finished"
  );


if (
  chapter7Finished === "1"
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
      "chapter7Memory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "chapter7Memory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "30px";


    memory.textContent =
      "Quelques jours plus tôt, une seconde attaque contre Anna avait échoué. Hope avait été grièvement blessée en protégeant Betty, tandis que Hale avait découvert qu’une faille interne avait probablement facilité l’intrusion.";


    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   MÉMOIRE : INFORMATION HOPE BLESSÉE
========================================================= */

const chapter7HopeState =
  localStorage.getItem(
    "societeOmbre_chapitre7_hopeState"
  );


if (
  chapter7HopeState === "1"
) {

  const scene15 =
    document.getElementById(
      "scene-15"
    );


  const textBlock =
    scene15?.querySelector(
      ".text-block"
    );


  if (
    textBlock &&
    !document.getElementById(
      "chapter7HopeMemory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "chapter7HopeMemory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "30px";


    memory.textContent =
      "Vous avez vu Hope être grièvement blessée au flanc avant que Peter ne la place en stase.";


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


  if (masterGain) {

    masterGain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + 0.35
      );

  }


  setTimeout(
    () => {

      try {

        ambienceOsc1?.stop();

        ambienceOsc2?.stop();

        audioCtx?.close();

      } catch {

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
   SONS
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
        0.016
      );

    },
    120
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


function playDarkSound() {

  playTone(
    180,
    0.75,
    0.022,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        240,
        0.95,
        0.017
      );

    },
    170
  );

}


function playMarkSound() {

  playTone(
    350,
    0.7,
    0.019
  );


  setTimeout(
    () => {

      playTone(
        470,
        0.85,
        0.016
      );

    },
    150
  );


  setTimeout(
    () => {

      playTone(
        610,
        1,
        0.014
      );

    },
    300
  );

}


function playConnectionSound() {

  playTone(
    420,
    0.25,
    0.016,
    "square"
  );


  setTimeout(
    () => {

      playTone(
        540,
        0.3,
        0.015,
        "square"
      );

    },
    120
  );


  setTimeout(
    () => {

      playTone(
        680,
        0.5,
        0.014,
        "triangle"
      );

    },
    250
  );

}


function playGhostSound() {

  playTone(
    260,
    0.65,
    0.014,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        390,
        0.8,
        0.012,
        "triangle"
      );

    },
    160
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
