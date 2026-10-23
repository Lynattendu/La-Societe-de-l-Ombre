/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 16 — LES LIENS INVISIBLES
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
   LOCALSTORAGE
========================================================= */

const STORAGE_PREFIX =
  "societeOmbre_chapitre16_";

const STORAGE_SCROLL =
  STORAGE_PREFIX + "scroll";

const STORAGE_PROGRESS =
  STORAGE_PREFIX + "progression";

const STORAGE_COMPLETED =
  STORAGE_PREFIX + "termine";

const STORAGE_SECRETS =
  STORAGE_PREFIX + "secrets";

const STORAGE_MOTHER_DAUGHTER =
  STORAGE_PREFIX + "motherDaughter";

const STORAGE_JOURNALIST =
  STORAGE_PREFIX + "journalist";

const STORAGE_MAX_ROOT =
  STORAGE_PREFIX + "maxRoot";

const STORAGE_HOPE_ANALYSIS =
  STORAGE_PREFIX + "hopeAnalysis";

const STORAGE_ANCIENT_STUDY =
  STORAGE_PREFIX + "ancientStudy";

const STORAGE_ISABEL_WAIT =
  STORAGE_PREFIX + "isabelWait";

const STORAGE_LUCY_MARK =
  STORAGE_PREFIX + "lucyMark";

const STORAGE_AMY_REPORT =
  STORAGE_PREFIX + "amyReport";

const STORAGE_COUNTER_TRAP =
  STORAGE_PREFIX + "counterTrap";

const STORAGE_HYBRID =
  STORAGE_PREFIX + "hybrid";

const STORAGE_TERRACE =
  STORAGE_PREFIX + "terrace";

const STORAGE_BLACK_ROLL =
  STORAGE_PREFIX + "blackRoll";

const STORAGE_COORDINATES =
  STORAGE_PREFIX + "coordinates";

const STORAGE_AMY_LOYALTY =
  STORAGE_PREFIX + "amyLoyalty";


/* =========================================================
   COMPATIBILITÉ ANCIENNE
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre16_finished"
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

      entries.forEach(
        (entry) => {

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

        }
      );

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
          window.scrollY /
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
    !Number.isNaN(savedPosition) &&
    savedPosition > 0
  ) {

    setTimeout(
      () => {

        window.scrollTo({
          top: savedPosition,
          left: 0,
          behavior: "auto"
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
        behavior: "auto"
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
    "chapitre16.html?lecture=recommencer";

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
   OUTIL RÉVÉLATIONS
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


/* =========================================================
   INTERACTION 1
   ANNA / BETTY
========================================================= */

const motherDaughterReveal =
  document.getElementById(
    "motherDaughterReveal"
  );


let motherDaughterObserved =
  getStoredArray(
    STORAGE_MOTHER_DAUGHTER
  );


const motherDaughterTexts = {

  cake:
    "Betty a préparé du gâteau alors qu’Anna affirme ne pas avoir faim. Elle connaît trop bien cette habitude.",

  cups:
    "Deux tasses sont déjà posées. Betty espérait manifestement qu’Anna viendrait.",

  anger:
    "Anna ne cache pas sa colère. Betty ne cherche pas à la minimiser.",

  habit:
    "Même blessées, leurs petites habitudes quotidiennes sont encore là.",

  bond:
    "Leur relation est abîmée, mais elle n’est pas rompue."

};


document
  .querySelectorAll(
    ".mother-daughter-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.motherDaughter;


        motherDaughterObserved =
          addStoredValue(
            STORAGE_MOTHER_DAUGHTER,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          motherDaughterReveal,
          `
            <p>
              ${motherDaughterTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          motherDaughterObserved.length >= 5
        ) {

          setRevealHTML(
            motherDaughterReveal,
            `
              <p>
                Deux tasses.
              </p>

              <p>
                Un morceau de gâteau.
              </p>

              <p>
                Une colère toujours présente.
              </p>

              <p class="impact-text">
                MAIS LE LIEN
                EST TOUJOURS LÀ.
              </p>

              <p class="emphasis">
                Une blessure ouverte
                n’est pas forcément
                une rupture.
              </p>
            `
          );


          showSecret(
            "anna-betty-bond",
            "Anna et Betty ne sont pas encore réconciliées, mais leur lien refuse de se rompre."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".mother-daughter-trigger"
  )
  .forEach((button) => {

    if (
      motherDaughterObserved.includes(
        button.dataset.motherDaughter
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  motherDaughterObserved.length >= 5
) {

  setRevealHTML(
    motherDaughterReveal,
    `
      <p class="impact-text">
        LE LIEN EST TOUJOURS LÀ.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 2
   LEÇON DE MAX
========================================================= */

const journalistReveal =
  document.getElementById(
    "journalistReveal"
  );


let journalistObserved =
  getStoredArray(
    STORAGE_JOURNALIST
  );


const journalistTexts = {

  woman:
    "La femme transporte du linge, mais regarde vers le portail chaque fois qu’un véhicule arrive.",

  guards:
    "Le garde de gauche parle avec son collègue sans jamais le regarder.",

  car:
    "La voiture est propre, sauf les roues arrière couvertes de traces humides.",

  window:
    "La fenêtre ouverte semble banale. Pour l’instant, rien ne permet d’en tirer une conclusion.",

  drone:
    "Le drone passe au-dessus du domaine. Un détail ordinaire peut devenir important s’il ne correspond plus au contexte."

};


document
  .querySelectorAll(
    ".journalist-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.journalist;


        journalistObserved =
          addStoredValue(
            STORAGE_JOURNALIST,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          journalistReveal,
          `
            <p>
              ${journalistTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          journalistObserved.length >= 5
        ) {

          setRevealHTML(
            journalistReveal,
            `
              <p>
                Ne pas seulement regarder.
              </p>

              <p>
                Comparer.
              </p>

              <p>
                Questionner.
              </p>

              <p>
                Chercher l’anomalie.
              </p>

              <p class="impact-text">
                CE QUI NE COLLE PAS.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".journalist-trigger"
  )
  .forEach((button) => {

    if (
      journalistObserved.includes(
        button.dataset.journalist
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  journalistObserved.length >= 5
) {

  setRevealHTML(
    journalistReveal,
    `
      <p class="impact-text">
        REGARDER CE QUI NE COLLE PAS.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 3
   MAX / ROOT
========================================================= */

const maxRootReveal =
  document.getElementById(
    "maxRootReveal"
  );


let maxRootObserved =
  getStoredArray(
    STORAGE_MAX_ROOT
  );


const maxRootTexts = {

  look:
    "Anna remarque que Max ne regarde pas Root comme il regarde les autres.",

  silence:
    "La façon dont il hésite avant de répondre en dit déjà beaucoup.",

  admiration:
    "Max décrit Root comme brillante, courageuse et fascinante.",

  danger:
    "Ce qui l’attire chez Root est peut-être aussi ce qui l’inquiète : son incapacité à rester loin du danger."

};


document
  .querySelectorAll(
    ".max-root-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.maxRoot;


        maxRootObserved =
          addStoredValue(
            STORAGE_MAX_ROOT,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          maxRootReveal,
          `
            <p>
              ${maxRootTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          maxRootObserved.length >= 4
        ) {

          setRevealHTML(
            maxRootReveal,
            `
              <p>
                Un regard différent.
              </p>

              <p>
                Une hésitation.
              </p>

              <p>
                Une admiration évidente.
              </p>

              <p class="name-reveal">
                ROOT.
              </p>

              <p class="emphasis">
                Anna vient d’apprendre
                à observer son professeur.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".max-root-trigger"
  )
  .forEach((button) => {

    if (
      maxRootObserved.includes(
        button.dataset.maxRoot
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  maxRootObserved.length >= 4
) {

  setRevealHTML(
    maxRootReveal,
    `
      <p class="impact-text">
        MAX REGARDE ROOT
        DIFFÉREMMENT.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 4
   ANALYSE D'HOPE
========================================================= */

const hopeAnalysisReveal =
  document.getElementById(
    "hopeAnalysisReveal"
  );


let hopeAnalysisObserved =
  getStoredArray(
    STORAGE_HOPE_ANALYSIS
  );


const hopeAnalysisTexts = {

  regeneration:
    "Betty veut mesurer précisément si la vitesse de réparation des tissus d’Hope a changé.",

  inflammation:
    "La réponse inflammatoire peut révéler une modification du comportement biologique après la grotte.",

  mutation:
    "Betty cherche également toute mutation ou variation apparue récemment.",

  markers:
    "Des marqueurs inconnus pourraient confirmer une réaction liée aux événements de la grotte.",

  compare:
    "Les échantillons conservés avant la grotte permettront une comparaison directe avec l’état actuel d’Hope."

};


document
  .querySelectorAll(
    ".hope-analysis-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.hopeAnalysis;


        hopeAnalysisObserved =
          addStoredValue(
            STORAGE_HOPE_ANALYSIS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          hopeAnalysisReveal,
          `
            <p>
              ${hopeAnalysisTexts[type]}
            </p>
          `
        );


        playBiologySound();


        if (
          hopeAnalysisObserved.length >= 5
        ) {

          setRevealHTML(
            hopeAnalysisReveal,
            `
              <p>
                Régénération.
              </p>

              <p>
                Inflammation.
              </p>

              <p>
                Mutations.
              </p>

              <p>
                Marqueurs inconnus.
              </p>

              <p class="impact-text">
                AVANT / APRÈS LA GROTTE.
              </p>

              <p class="emphasis">
                Betty ne cherche pas
                à prouver qu’Hope a changé.
                Elle cherche à savoir
                si elle a changé.
              </p>
            `
          );


          showSecret(
            "hope-after-cave",
            "Betty va comparer les données biologiques d’Hope avant et après son passage dans la grotte."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".hope-analysis-trigger"
  )
  .forEach((button) => {

    if (
      hopeAnalysisObserved.includes(
        button.dataset.hopeAnalysis
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  hopeAnalysisObserved.length >= 5
) {

  setRevealHTML(
    hopeAnalysisReveal,
    `
      <p class="impact-text">
        AVANT / APRÈS LA GROTTE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 5
   ÉTUDE DES ANCIENS
========================================================= */

const ancientStudyReveal =
  document.getElementById(
    "ancientStudyReveal"
  );


let ancientStudyObserved =
  getStoredArray(
    STORAGE_ANCIENT_STUDY
  );


const ancientStudyTexts = {

  symbols:
    "Chaque symbole pourra être indexé, comparé et relié aux lieux où il apparaît.",

  phrases:
    "Les phrases seront étudiées comme des textes, mais aussi comme de possibles descriptions de phénomènes.",

  marks:
    "Chaque réaction du dragon, du phénix ou des autres marques pourra être enregistrée comme une donnée.",

  places:
    "Les lieux d’apparition des symboles pourront révéler une géographie ou une logique ancienne.",

  sciences:
    "Biologie, physique et astronomie permettront de tester ce qui pourrait avoir une base observable.",

  humanities:
    "Mythologie, histoire, anthropologie, archéologie et linguistique permettront de comparer les récits anciens."

};


document
  .querySelectorAll(
    ".ancient-study-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.ancientStudy;


        ancientStudyObserved =
          addStoredValue(
            STORAGE_ANCIENT_STUDY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          ancientStudyReveal,
          `
            <p>
              ${ancientStudyTexts[type]}
            </p>
          `
        );


        playRevealSound();


        if (
          ancientStudyObserved.length >= 6
        ) {

          setRevealHTML(
            ancientStudyReveal,
            `
              <p>
                Symboles.
              </p>

              <p>
                Phrases.
              </p>

              <p>
                Marques.
              </p>

              <p>
                Lieux.
              </p>

              <p>
                Sciences.
              </p>

              <p>
                Histoire et cultures.
              </p>

              <p class="impact-text">
                UNE BASE DES ANCIENS.
              </p>

              <p class="emphasis">
                Croire ne suffira plus.
                Ils vont comparer,
                mesurer et comprendre.
              </p>
            `
          );


          showSecret(
            "ancient-database",
            "Hope et Betty décident de construire une base multidisciplinaire consacrée aux traces laissées par les Anciens."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".ancient-study-trigger"
  )
  .forEach((button) => {

    if (
      ancientStudyObserved.includes(
        button.dataset.ancientStudy
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  ancientStudyObserved.length >= 6
) {

  setRevealHTML(
    ancientStudyReveal,
    `
      <p class="impact-text">
        UNE BASE DES ANCIENS.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 6
   ATTENDRE ISABEL
========================================================= */

const isabelWaitReveal =
  document.getElementById(
    "isabelWaitReveal"
  );


let isabelWaitObserved =
  getStoredArray(
    STORAGE_ISABEL_WAIT
  );


const isabelWaitTexts = {

  sent:
    "Le faux planning contenant le déplacement médical fictif a été envoyé.",

  received:
    "Isabel a reçu l’information par les circuits administratifs habituels.",

  reaction:
    "Aucun appel, aucun message, aucun changement visible.",

  normal:
    "Isabel continue à travailler comme si rien n’avait changé.",

  wait:
    "Pour Lucy et Clive, la meilleure décision reste de ne rien provoquer et d’attendre."

};


document
  .querySelectorAll(
    ".isabel-wait-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.isabelWait;


        isabelWaitObserved =
          addStoredValue(
            STORAGE_ISABEL_WAIT,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          isabelWaitReveal,
          `
            <p>
              ${isabelWaitTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          isabelWaitObserved.length >= 5
        ) {

          setRevealHTML(
            isabelWaitReveal,
            `
              <p>
                Information envoyée.
              </p>

              <p>
                Information reçue.
              </p>

              <p>
                Aucun changement.
              </p>

              <p class="impact-text">
                PARFAIT.
              </p>

              <p class="emphasis">
                Une bonne taupe
                continue à vivre normalement.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".isabel-wait-trigger"
  )
  .forEach((button) => {

    if (
      isabelWaitObserved.includes(
        button.dataset.isabelWait
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  isabelWaitObserved.length >= 5
) {

  setRevealHTML(
    isabelWaitReveal,
    `
      <p class="impact-text">
        UNE BONNE TAUPE
        NE RÉAGIT PAS.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 7
   MARQUE DE LUCY
========================================================= */

const lucyMarkReveal =
  document.getElementById(
    "lucyMarkReveal"
  );


const lucyMarkButtons =
  document.querySelectorAll(
    ".lucy-mark-trigger"
  );


const lucyMarkOrder = [
  "contact",
  "heat",
  "lucy",
  "root",
  "clive"
];


let lucyMarkProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_LUCY_MARK
    ) || "0",
    10
  );


const lucyMarkTexts = {

  contact:
    "Le bras de Root effleure celui de Lucy.",

  heat:
    "Une chaleur légère apparaît immédiatement au niveau de la marque de Lucy.",

  lucy:
    "Lucy se fige puis retire rapidement son bras.",

  root:
    "Root ressent ou remarque manifestement quelque chose elle aussi.",

  clive:
    "Clive observe toute la scène et remarque le trouble de Lucy."

};


function restoreLucyMark() {

  lucyMarkButtons.forEach(
    (button, index) => {

      if (
        index < lucyMarkProgress
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
    lucyMarkProgress >= 5
  ) {

    setRevealHTML(
      lucyMarkReveal,
      `
        <p>
          Contact.
        </p>

        <p>
          Chaleur.
        </p>

        <p>
          Lucy se fige.
        </p>

        <p>
          Root le remarque.
        </p>

        <p>
          Clive aussi.
        </p>

        <p class="impact-text">
          LA MARQUE A RÉAGI.
        </p>
      `
    );

  }

}


lucyMarkButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.lucyMark;


        const expected =
          lucyMarkOrder[
            lucyMarkProgress
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


        lucyMarkProgress++;


        localStorage.setItem(
          STORAGE_LUCY_MARK,
          lucyMarkProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          lucyMarkReveal,
          `
            <p>
              ${lucyMarkTexts[selected]}
            </p>
          `
        );


        playMemorySound();


        if (
          lucyMarkProgress >= 5
        ) {

          setRevealHTML(
            lucyMarkReveal,
            `
              <p>
                Root touche Lucy.
              </p>

              <p>
                La chaleur apparaît.
              </p>

              <p>
                Lucy le ressent.
              </p>

              <p>
                Root le remarque.
              </p>

              <p>
                Clive observe.
              </p>

              <p class="impact-text">
                LA MARQUE DE LUCY
                A RÉAGI.
              </p>
            `
          );


          showSecret(
            "lucy-root-reaction",
            "La marque de Lucy réagit immédiatement lorsque Root entre en contact avec elle."
          );

        }

      }
    );

  });


restoreLucyMark();


/* =========================================================
   INTERACTION 8
   RAPPORT D'AMY
========================================================= */

const amyReportReveal =
  document.getElementById(
    "amyReportReveal"
  );


let amyReportObserved =
  getStoredArray(
    STORAGE_AMY_REPORT
  );


const amyReportTexts = {

  chance:
    "Amy disposait d’une occasion réelle de tuer Hope.",

  hope:
    "Malgré cette occasion, Hope est toujours vivante.",

  never:
    "Le Maître Noir sait qu’Amy ne manque presque jamais une cible lorsqu’elle a réellement décidé de tuer.",

  hesitation:
    "La conclusion s’impose : ce n’est probablement pas une erreur technique. Amy a hésité.",

  different:
    "Le Maître Noir reconnaît qu’Amy a toujours été plus instinctive et plus difficile à contrôler que les autres."

};


document
  .querySelectorAll(
    ".amy-report-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.amyReport;


        amyReportObserved =
          addStoredValue(
            STORAGE_AMY_REPORT,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          amyReportReveal,
          `
            <p>
              ${amyReportTexts[type]}
            </p>
          `
        );


        playDarkSound();


        if (
          amyReportObserved.length >= 5
        ) {

          setRevealHTML(
            amyReportReveal,
            `
              <p>
                Amy avait l’occasion.
              </p>

              <p>
                Hope est vivante.
              </p>

              <p>
                Amy ne rate pas.
              </p>

              <p class="impact-text">
                ELLE A HÉSITÉ.
              </p>

              <p class="emphasis">
                Et le Maître Noir
                commence à le comprendre.
              </p>
            `
          );


          showSecret(
            "amy-hesitated",
            "Le Maître Noir comprend qu’Amy n’a probablement pas réellement voulu tuer Hope."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".amy-report-trigger"
  )
  .forEach((button) => {

    if (
      amyReportObserved.includes(
        button.dataset.amyReport
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  amyReportObserved.length >= 5
) {

  setRevealHTML(
    amyReportReveal,
    `
      <p class="impact-text">
        AMY A HÉSITÉ.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 9
   CONTRE-PIÈGE
========================================================= */

const counterTrapReveal =
  document.getElementById(
    "counterTrapReveal"
  );


const counterTrapButtons =
  document.querySelectorAll(
    ".counter-trap-trigger"
  );


const counterTrapOrder = [
  "planning",
  "detected",
  "team",
  "three",
  "amy"
];


let counterTrapProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_COUNTER_TRAP
    ) || "0",
    10
  );


const counterTrapTexts = {

  planning:
    "Le faux planning concernant Anna atteint le réseau du Maître Noir.",

  detected:
    "Il comprend immédiatement que l’information est probablement un piège.",

  team:
    "Au lieu de l’éviter, il décide d’envoyer une équipe.",

  three:
    "Son véritable objectif est d’observer Hale, Lucy et Clive pour comprendre qui dirige l’opération.",

  amy:
    "En parallèle, il ordonne qu’Amy soit surveillée discrètement."

};


function restoreCounterTrap() {

  counterTrapButtons.forEach(
    (button, index) => {

      if (
        index < counterTrapProgress
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
    counterTrapProgress >= 5
  ) {

    setRevealHTML(
      counterTrapReveal,
      `
        <p>
          Piège détecté.
        </p>

        <p>
          Équipe envoyée.
        </p>

        <p>
          Hale.
        </p>

        <p>
          Lucy.
        </p>

        <p>
          Clive.
        </p>

        <p class="impact-text">
          LE PIÈGE DEVIENT
          UN CONTRE-PIÈGE.
        </p>
      `
    );

  }

}


counterTrapButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.counterTrap;


        const expected =
          counterTrapOrder[
            counterTrapProgress
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


        counterTrapProgress++;


        localStorage.setItem(
          STORAGE_COUNTER_TRAP,
          counterTrapProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          counterTrapReveal,
          `
            <p>
              ${counterTrapTexts[selected]}
            </p>
          `
        );


        playDeductionSound();


        if (
          counterTrapProgress >= 5
        ) {

          setRevealHTML(
            counterTrapReveal,
            `
              <p>
                Lucy tend un piège.
              </p>

              <p>
                Le Maître Noir le voit.
              </p>

              <p>
                Il répond quand même.
              </p>

              <p class="impact-text">
                IL UTILISE
                LEUR PROPRE PIÈGE.
              </p>
            `
          );


          showSecret(
            "counter-trap",
            "Le Maître Noir décide volontairement de répondre au piège afin d’observer Hale, Lucy et Clive."
          );

        }

      }
    );

  });


restoreCounterTrap();


/* =========================================================
   INTERACTION 10
   CRÉATURE HYBRIDE
========================================================= */

const hybridReveal =
  document.getElementById(
    "hybridReveal"
  );


let hybridObserved =
  getStoredArray(
    STORAGE_HYBRID
  );


const hybridTexts = {

  movement:
    "La créature se déplace avec une coordination animale malgré sa forme très inhabituelle.",

  color:
    "Sa teinte change subtilement lorsqu’elle approche de la paroi.",

  skin:
    "Sa peau semble capable de modifier localement son apparence en fonction de son environnement.",

  flower:
    "Une petite structure florale s’ouvre le long de son dos, comme si végétal et animal avaient été réunis.",

  betty:
    "La photo de Betty affichée sur l’écran laisse peu de doute : Peter espère probablement lui présenter cette création."

};


document
  .querySelectorAll(
    ".hybrid-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.hybrid;


        hybridObserved =
          addStoredValue(
            STORAGE_HYBRID,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          hybridReveal,
          `
            <p>
              ${hybridTexts[type]}
            </p>
          `
        );


        playCreatureSound();


        if (
          hybridObserved.length >= 5
        ) {

          setRevealHTML(
            hybridReveal,
            `
              <p>
                Animal.
              </p>

              <p>
                Végétal.
              </p>

              <p>
                Adaptation.
              </p>

              <p>
                Changement de teinte.
              </p>

              <p>
                Floraison.
              </p>

              <p class="impact-text">
                UNE NOUVELLE CRÉATURE.
              </p>

              <p class="emphasis">
                Et Peter semble
                vouloir impressionner Betty.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".hybrid-trigger"
  )
  .forEach((button) => {

    if (
      hybridObserved.includes(
        button.dataset.hybrid
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  hybridObserved.length >= 5
) {

  setRevealHTML(
    hybridReveal,
    `
      <p class="impact-text">
        ANIMAL ET VÉGÉTAL.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 11
   TERRASSE ANNA / BETTY
========================================================= */

const terraceReveal =
  document.getElementById(
    "terraceReveal"
  );


const terraceButtons =
  document.querySelectorAll(
    ".terrace-trigger"
  );


const terraceOrder = [
  "call",
  "stay",
  "distance",
  "shoulder",
  "anger"
];


let terraceProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_TERRACE
    ) || "0",
    10
  );


const terraceTexts = {

  call:
    "Alors que Betty s’apprête à partir, Anna l’appelle : « Maman. »",

  stay:
    "Anna ne pardonne pas encore, mais lui dit qu’elle peut rester.",

  distance:
    "Betty s’assoit à une distance prudente : ni trop près, ni trop loin.",

  shoulder:
    "Anna pose spontanément sa tête contre l’épaule de Betty pendant quelques secondes.",

  anger:
    "Le rapprochement n’efface rien : Anna précise qu’elle est toujours en colère."

};


function restoreTerrace() {

  terraceButtons.forEach(
    (button, index) => {

      if (
        index < terraceProgress
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
    terraceProgress >= 5
  ) {

    setRevealHTML(
      terraceReveal,
      `
        <p>
          « Maman. »
        </p>

        <p>
          « Tu peux rester. »
        </p>

        <p>
          Pas trop près.
        </p>

        <p>
          Pas trop loin.
        </p>

        <p class="impact-text">
          SA TÊTE
          CONTRE SON ÉPAULE.
        </p>

        <p class="emphasis">
          Ce n’est pas encore
          le pardon.
        </p>
      `
    );

  }

}


terraceButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.terrace;


        const expected =
          terraceOrder[
            terraceProgress
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


        terraceProgress++;


        localStorage.setItem(
          STORAGE_TERRACE,
          terraceProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          terraceReveal,
          `
            <p>
              ${terraceTexts[selected]}
            </p>
          `
        );


        playWarmSound();


        if (
          terraceProgress >= 5
        ) {

          setRevealHTML(
            terraceReveal,
            `
              <p>
                Elle ne pardonne pas encore.
              </p>

              <p>
                Elle ne veut pas non plus
                perdre sa mère.
              </p>

              <p class="impact-text">
                LE LIEN COMMENCE
                À SE RÉPARER.
              </p>
            `
          );


          showSecret(
            "anna-betty-repair",
            "Anna n’est pas prête à pardonner Betty, mais elle refuse désormais qu’elle disparaisse de sa vie."
          );

        }

      }
    );

  });


restoreTerrace();


/* =========================================================
   INTERACTION 12
   ROULEAU NOIR
========================================================= */

const blackRollReveal =
  document.getElementById(
    "blackRollReveal"
  );


const blackRollButtons =
  document.querySelectorAll(
    ".black-roll-trigger"
  );


const blackRollOrder = [
  "enter",
  "wait",
  "clive",
  "roll",
  "scanner"
];


let blackRollProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_BLACK_ROLL
    ) || "0",
    10
  );


const blackRollTexts = {

  enter:
    "Isabel entre dans l’ancien oratoire pendant que Hale, Lucy et Clive la suivent à distance.",

  wait:
    "Lucy refuse que Clive intervienne immédiatement. Isabel doit d’abord être suffisamment loin.",

  clive:
    "Clive entre seul dans l’oratoire et rejoint la cache découverte précédemment.",

  roll:
    "Cette fois, la cavité contient un minuscule rouleau de matériau noir.",

  scanner:
    "Clive ne touche pas l’objet et utilise un scanner miniature pour l’examiner."

};


function restoreBlackRoll() {

  blackRollButtons.forEach(
    (button, index) => {

      if (
        index < blackRollProgress
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
    blackRollProgress >= 5
  ) {

    setRevealHTML(
      blackRollReveal,
      `
        <p>
          Isabel entre.
        </p>

        <p>
          Ils attendent.
        </p>

        <p>
          Clive rejoint la cache.
        </p>

        <p class="impact-text">
          UN ROULEAU NOIR.
        </p>

        <p>
          Ancien par son apparence.
        </p>

        <p class="emphasis">
          Moderne par sa fabrication.
        </p>
      `
    );

  }

}


blackRollButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.blackRoll;


        const expected =
          blackRollOrder[
            blackRollProgress
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


        blackRollProgress++;


        localStorage.setItem(
          STORAGE_BLACK_ROLL,
          blackRollProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          blackRollReveal,
          `
            <p>
              ${blackRollTexts[selected]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          blackRollProgress >= 5
        ) {

          setRevealHTML(
            blackRollReveal,
            `
              <p>
                Ce n’est pas du papier.
              </p>

              <p>
                Ce n’est pas
                un support numérique classique.
              </p>

              <p class="impact-text">
                ANCIEN
                ET MODERNE À LA FOIS.
              </p>
            `
          );


          showSecret(
            "black-roll",
            "Isabel transmet un support physique noir mêlant une apparence ancienne à une fabrication moderne."
          );

        }

      }
    );

  });


restoreBlackRoll();


/* =========================================================
   INTERACTION 13
   COORDONNÉES
========================================================= */

const coordinatesReveal =
  document.getElementById(
    "coordinatesReveal"
  );


const coordinatesButtons =
  document.querySelectorAll(
    ".coordinates-trigger"
  );


const coordinatesOrder = [
  "symbols",
  "coords",
  "ia2",
  "destination",
  "trap"
];


let coordinatesProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_COORDINATES
    ) || "0",
    10
  );


const coordinatesTexts = {

  symbols:
    "Le scanner révèle d’abord une série de symboles intégrés au matériau.",

  coords:
    "Une seconde couche contient des coordonnées exploitables.",

  ia2:
    "IA2 calcule la zone correspondant aux données récupérées.",

  destination:
    "La destination ne correspond pas au laboratoire de Peter annoncé dans le faux planning.",

  trap:
    "La conclusion devient évidente : le réseau a détecté le piège et envoie volontairement Lucy, Hale et Clive ailleurs."

};


function restoreCoordinates() {

  coordinatesButtons.forEach(
    (button, index) => {

      if (
        index < coordinatesProgress
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
    coordinatesProgress >= 5
  ) {

    setRevealHTML(
      coordinatesReveal,
      `
        <p>
          Symboles.
        </p>

        <p>
          Coordonnées.
        </p>

        <p>
          IA2 calcule.
        </p>

        <p>
          Mauvaise destination.
        </p>

        <p class="impact-text">
          ILS SAVENT.
        </p>

        <p class="emphasis">
          Le piège
          vient de changer de camp.
        </p>
      `
    );

  }

}


coordinatesButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.coordinates;


        const expected =
          coordinatesOrder[
            coordinatesProgress
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


        coordinatesProgress++;


        localStorage.setItem(
          STORAGE_COORDINATES,
          coordinatesProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          coordinatesReveal,
          `
            <p>
              ${coordinatesTexts[selected]}
            </p>
          `
        );


        playDataSound();


        if (
          coordinatesProgress >= 5
        ) {

          setRevealHTML(
            coordinatesReveal,
            `
              <p>
                Le réseau n’a pas mordu.
              </p>

              <p>
                Il répond volontairement.
              </p>

              <p class="impact-text">
                ILS SAVENT
                QU’ON SAIT.
              </p>

              <p class="emphasis">
                Et Lucy décide
                quand même de suivre
                la piste.
              </p>
            `
          );


          showSecret(
            "false-coordinates",
            "Les coordonnées transmises par Isabel constituent volontairement une nouvelle piste : le réseau sait qu’il est observé."
          );

        }

      }
    );

  });


restoreCoordinates();


/* =========================================================
   INTERACTION 14
   LOYAUTÉ D'AMY
========================================================= */

const amyLoyaltyReveal =
  document.getElementById(
    "amyLoyaltyReveal"
  );


const amyLoyaltyButtons =
  document.querySelectorAll(
    ".amy-loyalty-trigger"
  );


const amyLoyaltyOrder = [
  "watch",
  "photo",
  "hope",
  "disobey",
  "loyalty"
];


let amyLoyaltyProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_AMY_LOYALTY
    ) || "0",
    10
  );


const amyLoyaltyTexts = {

  watch:
    "Le Maître Noir observe Amy à distance malgré l’ordre de lui laisser le temps de récupérer.",

  photo:
    "Elle tient une vieille photographie dans ses mains.",

  hope:
    "Sur la photo apparaissent deux enfants : Amy et Hope.",

  disobey:
    "Le souvenir d’Hope rend désormais possible une nouvelle désobéissance.",

  loyalty:
    "Pour la première fois, le Maître Noir ne sait plus exactement jusqu’où va la loyauté d’Amy."

};


function restoreAmyLoyalty() {

  amyLoyaltyButtons.forEach(
    (button, index) => {

      if (
        index < amyLoyaltyProgress
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
    amyLoyaltyProgress >= 5
  ) {

    setRevealHTML(
      amyLoyaltyReveal,
      `
        <p>
          Amy.
        </p>

        <p>
          Une vieille photographie.
        </p>

        <p>
          Hope.
        </p>

        <p>
          Une désobéissance possible.
        </p>

        <p class="impact-text">
          JUSQU’OÙ VA
          SA LOYAUTÉ ?
        </p>
      `
    );

  }

}


amyLoyaltyButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.amyLoyalty;


        const expected =
          amyLoyaltyOrder[
            amyLoyaltyProgress
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


        amyLoyaltyProgress++;


        localStorage.setItem(
          STORAGE_AMY_LOYALTY,
          amyLoyaltyProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          amyLoyaltyReveal,
          `
            <p>
              ${amyLoyaltyTexts[selected]}
            </p>
          `
        );


        playDarkSound();


        if (
          amyLoyaltyProgress >= 5
        ) {

          setRevealHTML(
            amyLoyaltyReveal,
            `
              <p>
                Anna n’est pas
                ce qui l’inquiète.
              </p>

              <p>
                Hale non plus.
              </p>

              <p>
                Ni Maître Lee.
              </p>

              <p class="name-reveal">
                AMY.
              </p>

              <p class="impact-text">
                ELLE COMMENCE
                À LUI ÉCHAPPER.
              </p>
            `
          );


          showSecret(
            "amy-loyalty",
            "Le Maître Noir comprend qu’Amy devient désormais l’élément qu’il contrôle le moins."
          );

        }

      }
    );

  });


restoreAmyLoyalty();


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-40"
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


  const ctx =
    audioCtx;

  const osc1 =
    ambienceOsc1;

  const osc2 =
    ambienceOsc2;

  const gain =
    masterGain;


  if (gain) {

    try {

      gain.gain
        .exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + 0.35
        );

    } catch {}

  }


  audioCtx =
    null;

  masterGain =
    null;

  ambienceOsc1 =
    null;

  ambienceOsc2 =
    null;

  soundActive =
    false;


  if (soundBtn) {

    soundBtn.classList.remove(
      "sound-active"
    );

    soundBtn.textContent =
      "♫";

  }


  setTimeout(
    () => {

      try {
        osc1?.stop();
      } catch {}

      try {
        osc2?.stop();
      } catch {}

      try {
        ctx?.close();
      } catch {}

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


  setTimeout(
    () => {

      playTone(
        820,
        0.95,
        0.012,
        "triangle"
      );

    },
    300
  );

}


function playBiologySound() {

  playTone(
    300,
    0.45,
    0.017,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        510,
        0.65,
        0.014,
        "triangle"
      );

    },
    120
  );

}


function playCreatureSound() {

  playTone(
    470,
    0.28,
    0.014,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        620,
        0.42,
        0.012,
        "sine"
      );

    },
    90
  );


  setTimeout(
    () => {

      playTone(
        790,
        0.5,
        0.01,
        "triangle"
      );

    },
    180
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


function playDarkSound() {

  playTone(
    170,
    0.7,
    0.018,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        260,
        0.9,
        0.013,
        "triangle"
      );

    },
    150
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
