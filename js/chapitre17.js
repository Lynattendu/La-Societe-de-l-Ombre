/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 17 — LES TRACES DU VIVANT
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
  "societeOmbre_chapitre17_";

const STORAGE_SCROLL =
  STORAGE_PREFIX + "scroll";

const STORAGE_PROGRESS =
  STORAGE_PREFIX + "progression";

const STORAGE_COMPLETED =
  STORAGE_PREFIX + "termine";

const STORAGE_SECRETS =
  STORAGE_PREFIX + "secrets";

const STORAGE_HOPE_RESULTS =
  STORAGE_PREFIX + "hopeResults";

const STORAGE_OLD_SAMPLES =
  STORAGE_PREFIX + "oldSamples";

const STORAGE_CHARLES_RESEARCH =
  STORAGE_PREFIX + "charlesResearch";

const STORAGE_SYMBOL_STUDY =
  STORAGE_PREFIX + "symbolStudy";

const STORAGE_ANNA_OBSERVES =
  STORAGE_PREFIX + "annaObserves";

const STORAGE_LOVE_STRENGTH =
  STORAGE_PREFIX + "loveStrength";

const STORAGE_HALE_COVER =
  STORAGE_PREFIX + "haleCover";

const STORAGE_LUCY_CLIVE =
  STORAGE_PREFIX + "lucyClive";

const STORAGE_AMY_DEPARTURE =
  STORAGE_PREFIX + "amyDeparture";

const STORAGE_AMY_ESCAPE =
  STORAGE_PREFIX + "amyEscape";

const STORAGE_AMY_CALL =
  STORAGE_PREFIX + "amyCall";

const STORAGE_ELIE_BETTY =
  STORAGE_PREFIX + "elieBetty";

const STORAGE_BLOOD_COMPARE =
  STORAGE_PREFIX + "bloodCompare";

const STORAGE_COMPLEMENTARITY =
  STORAGE_PREFIX + "complementarity";


/* =========================================================
   COMPATIBILITÉ ANCIENNE
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre17_finished"
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
    "chapitre17.html?lecture=recommencer";

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
   RÉSULTATS D'HOPE
========================================================= */

const hopeResultsReveal =
  document.getElementById(
    "hopeResultsReveal"
  );


let hopeResultsObserved =
  getStoredArray(
    STORAGE_HOPE_RESULTS
  );


const hopeResultsTexts = {

  blood:
    "Les globules d’Hope restent dans les valeurs attendues. Rien d’alarmant sur ce premier indicateur.",

  inflammation:
    "Les marqueurs inflammatoires sont eux aussi normaux.",

  organs:
    "Les fonctions hépatique et rénale ne montrent aucune anomalie préoccupante.",

  immunity:
    "Le fonctionnement immunitaire paraît normal malgré tout ce qu’Hope vient de traverser.",

  unusual:
    "Certaines données ne correspondent pourtant pas totalement aux anciens profils connus."

};


document
  .querySelectorAll(
    ".hope-results-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.hopeResults;


        hopeResultsObserved =
          addStoredValue(
            STORAGE_HOPE_RESULTS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          hopeResultsReveal,
          `
            <p>
              ${hopeResultsTexts[type]}
            </p>
          `
        );


        playBiologySound();


        if (
          hopeResultsObserved.length >= 5
        ) {

          setRevealHTML(
            hopeResultsReveal,
            `
              <p>
                Globules normaux.
              </p>

              <p>
                Inflammation normale.
              </p>

              <p>
                Fonctions vitales normales.
              </p>

              <p>
                Immunité normale.
              </p>

              <p class="impact-text">
                MAIS CERTAINES DONNÉES
                SONT INHABITUELLES.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".hope-results-trigger"
  )
  .forEach((button) => {

    if (
      hopeResultsObserved.includes(
        button.dataset.hopeResults
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  hopeResultsObserved.length >= 5
) {

  setRevealHTML(
    hopeResultsReveal,
    `
      <p class="impact-text">
        CERTAINES DONNÉES
        SONT INHABITUELLES.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 2
   ANCIENS PRÉLÈVEMENTS
========================================================= */

const oldSamplesReveal =
  document.getElementById(
    "oldSamplesReveal"
  );


const oldSamplesButtons =
  document.querySelectorAll(
    ".old-samples-trigger"
  );


const oldSamplesOrder = [
  "operation",
  "recovery",
  "charles",
  "aliquots",
  "betty"
];


let oldSamplesProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_OLD_SAMPLES
    ) || "0",
    10
  );


const oldSamplesTexts = {

  operation:
    "Après l’opération d’Hope, son organisme commence à récupérer à une vitesse qui surprend déjà Charles.",

  recovery:
    "La récupération paraît trop rapide pour être ignorée par les médecins qui la suivent.",

  charles:
    "Charles contacte Betty quelques jours après l’intervention pour lui parler de ce comportement inhabituel.",

  aliquots:
    "Plusieurs aliquots avaient été conservés à cause des traitements expérimentaux administrés après la fusillade.",

  betty:
    "Betty en demande une partie et commence à étudier Hope en secret."

};


function restoreOldSamples() {

  oldSamplesButtons.forEach(
    (button, index) => {

      if (
        index < oldSamplesProgress
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
    oldSamplesProgress >= 5
  ) {

    setRevealHTML(
      oldSamplesReveal,
      `
        <p>
          Opération.
        </p>

        <p>
          Récupération anormale.
        </p>

        <p>
          Charles appelle Betty.
        </p>

        <p>
          Des aliquots sont conservés.
        </p>

        <p class="impact-text">
          BETTY LES ÉTUDIE
          EN SECRET.
        </p>
      `
    );

  }

}


oldSamplesButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.oldSamples;


        const expected =
          oldSamplesOrder[
            oldSamplesProgress
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


        oldSamplesProgress++;


        localStorage.setItem(
          STORAGE_OLD_SAMPLES,
          oldSamplesProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          oldSamplesReveal,
          `
            <p>
              ${oldSamplesTexts[selected]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          oldSamplesProgress >= 5
        ) {

          setRevealHTML(
            oldSamplesReveal,
            `
              <p>
                La récupération d’Hope
                intriguait déjà Charles.
              </p>

              <p>
                Betty a obtenu
                une partie des prélèvements.
              </p>

              <p class="impact-text">
                BIEN AVANT LA GROTTE.
              </p>
            `
          );


          showSecret(
            "hope-old-samples",
            "Betty étudiait déjà le sang d’Hope après son opération, bien avant les événements de la grotte."
          );

        }

      }
    );

  });


restoreOldSamples();


/* =========================================================
   INTERACTION 3
   CHARLES REJOINT LES RECHERCHES
========================================================= */

const charlesResearchReveal =
  document.getElementById(
    "charlesResearchReveal"
  );


let charlesResearchObserved =
  getStoredArray(
    STORAGE_CHARLES_RESEARCH
  );


const charlesResearchTexts = {

  samples:
    "Charles possède les références des anciens prélèvements et les transmet immédiatement à Betty.",

  operation:
    "Charles a directement observé le corps d’Hope pendant son opération.",

  products:
    "Il a également vu comment son organisme réagissait aux traitements expérimentaux de Peter.",

  recovery:
    "Sa récupération inhabituellement rapide fait de Charles un témoin important de l’évolution biologique d’Hope.",

  consent:
    "Betty pose une règle claire : rien ne sort de ce cercle sans l’accord d’Hope."

};


document
  .querySelectorAll(
    ".charles-research-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.charlesResearch;


        charlesResearchObserved =
          addStoredValue(
            STORAGE_CHARLES_RESEARCH,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          charlesResearchReveal,
          `
            <p>
              ${charlesResearchTexts[type]}
            </p>
          `
        );


        playBiologySound();


        if (
          charlesResearchObserved.length >= 5
        ) {

          setRevealHTML(
            charlesResearchReveal,
            `
              <p>
                Betty.
              </p>

              <p>
                Peter.
              </p>

              <p>
                Charles.
              </p>

              <p>
                Hope.
              </p>

              <p class="impact-text">
                LE CERCLE DE RECHERCHE
                SE FORME.
              </p>

              <p class="emphasis">
                Et Hope conserve
                le contrôle
                de ses propres données.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".charles-research-trigger"
  )
  .forEach((button) => {

    if (
      charlesResearchObserved.includes(
        button.dataset.charlesResearch
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  charlesResearchObserved.length >= 5
) {

  setRevealHTML(
    charlesResearchReveal,
    `
      <p class="impact-text">
        RIEN SANS L’ACCORD D’HOPE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 4
   ÉTUDE DES SYMBOLES
========================================================= */

const symbolStudyReveal =
  document.getElementById(
    "symbolStudyReveal"
  );


let symbolStudyObserved =
  getStoredArray(
    STORAGE_SYMBOL_STUDY
  );


const symbolStudyTexts = {

  birthmark:
    "Un symbole vu dans la grotte ressemble fortement à la marque présente près de l’oreille d’Anna.",

  similarities:
    "Plusieurs traditions anciennes possèdent des motifs proches, mais aucun n’est parfaitement identique.",

  differences:
    "Les différences sont aussi importantes que les ressemblances : elles peuvent révéler des transformations successives.",

  repetitions:
    "Les répétitions permettent de repérer ce qui traverse plusieurs cultures et plusieurs époques.",

  proof:
    "Une ressemblance, même troublante, ne suffit jamais à constituer une preuve."

};


document
  .querySelectorAll(
    ".symbol-study-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.symbolStudy;


        symbolStudyObserved =
          addStoredValue(
            STORAGE_SYMBOL_STUDY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          symbolStudyReveal,
          `
            <p>
              ${symbolStudyTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          symbolStudyObserved.length >= 5
        ) {

          setRevealHTML(
            symbolStudyReveal,
            `
              <p>
                Ressemblances.
              </p>

              <p>
                Différences.
              </p>

              <p>
                Répétitions.
              </p>

              <p class="impact-text">
                MAIS PAS ENCORE
                DE PREUVE.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".symbol-study-trigger"
  )
  .forEach((button) => {

    if (
      symbolStudyObserved.includes(
        button.dataset.symbolStudy
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  symbolStudyObserved.length >= 5
) {

  setRevealHTML(
    symbolStudyReveal,
    `
      <p class="impact-text">
        UNE RESSEMBLANCE
        N’EST PAS UNE PREUVE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 5
   ANNA OBSERVE MAX
========================================================= */

const annaObservesReveal =
  document.getElementById(
    "annaObservesReveal"
  );


let annaObservesObserved =
  getStoredArray(
    STORAGE_ANNA_OBSERVES
  );


const annaObservesTexts = {

  look:
    "Max suit Root du regard dès qu’elle se lève.",

  pause:
    "Pendant quelques secondes, il oublie totalement ce qu’il faisait.",

  root:
    "Root semble ne rien remarquer et continue simplement à chercher son livre.",

  notes:
    "Anna applique parfaitement la leçon de Max : elle observe d’abord, puis elle note."

};


document
  .querySelectorAll(
    ".anna-observes-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.annaObserves;


        annaObservesObserved =
          addStoredValue(
            STORAGE_ANNA_OBSERVES,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          annaObservesReveal,
          `
            <p>
              ${annaObservesTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          annaObservesObserved.length >= 4
        ) {

          setRevealHTML(
            annaObservesReveal,
            `
              <p>
                Max observe Root.
              </p>

              <p>
                Anna observe Max.
              </p>

              <p class="impact-text">
                LA LEÇON
                SE RETOURNE
                CONTRE LE PROFESSEUR.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".anna-observes-trigger"
  )
  .forEach((button) => {

    if (
      annaObservesObserved.includes(
        button.dataset.annaObserves
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  annaObservesObserved.length >= 4
) {

  setRevealHTML(
    annaObservesReveal,
    `
      <p class="impact-text">
        ANNA OBSERVE
        L’OBSERVATEUR.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 6
   AMOUR : FAIBLESSE OU FORCE
========================================================= */

const loveStrengthReveal =
  document.getElementById(
    "loveStrengthReveal"
  );


let loveStrengthObserved =
  getStoredArray(
    STORAGE_LOVE_STRENGTH
  );


const loveStrengthTexts = {

  attraction:
    "Max reconnaît qu’il est fortement attiré par Root.",

  care:
    "Ce n’est pas seulement de l’attirance : il tient réellement à elle.",

  complication:
    "S’attacher rend chaque décision plus difficile lorsqu’une personne vit constamment près du danger.",

  weakness:
    "Anna reprend une idée qu’elle entend souvent autour d’elle : « Love is weakness. »",

  strength:
    "Max refuse cette vision : l’amour peut être précisément ce qui pousse quelqu’un à ne pas abandonner."

};


document
  .querySelectorAll(
    ".love-strength-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.loveStrength;


        loveStrengthObserved =
          addStoredValue(
            STORAGE_LOVE_STRENGTH,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          loveStrengthReveal,
          `
            <p>
              ${loveStrengthTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          loveStrengthObserved.length >= 5
        ) {

          setRevealHTML(
            loveStrengthReveal,
            `
              <p>
                L’amour peut compliquer.
              </p>

              <p>
                Il peut faire peur.
              </p>

              <p>
                Il peut rendre vulnérable.
              </p>

              <p class="impact-text">
                MAIS IL PEUT AUSSI
                EMPÊCHER D’ABANDONNER.
              </p>
            `
          );


          showSecret(
            "love-strength",
            "Pour Max, l’amour n’est pas seulement une faiblesse : il peut devenir une raison de tenir."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".love-strength-trigger"
  )
  .forEach((button) => {

    if (
      loveStrengthObserved.includes(
        button.dataset.loveStrength
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  loveStrengthObserved.length >= 5
) {

  setRevealHTML(
    loveStrengthReveal,
    `
      <p class="impact-text">
        UNE RAISON
        DE NE PAS ABANDONNER.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 7
   HALE GARDE SA COUVERTURE
========================================================= */

const haleCoverReveal =
  document.getElementById(
    "haleCoverReveal"
  );


let haleCoverObserved =
  getStoredArray(
    STORAGE_HALE_COVER
  );


const haleCoverTexts = {

  tone:
    "Hale parle exactement comme il le faisait avant de découvrir la trahison d’Isabel.",

  isabel:
    "Isabel lui sourit avec la même familiarité qu’auparavant.",

  planning:
    "Le faux planning d’Anna est officiellement validé.",

  vehicle:
    "Le véhicule du faux déplacement est prêt, renforçant la crédibilité du piège.",

  normal:
    "La réussite dépend d’une seule chose : ne modifier aucun comportement visible."

};


document
  .querySelectorAll(
    ".hale-cover-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.haleCover;


        haleCoverObserved =
          addStoredValue(
            STORAGE_HALE_COVER,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          haleCoverReveal,
          `
            <p>
              ${haleCoverTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          haleCoverObserved.length >= 5
        ) {

          setRevealHTML(
            haleCoverReveal,
            `
              <p>
                Même ton.
              </p>

              <p>
                Même routine.
              </p>

              <p>
                Même confiance apparente.
              </p>

              <p class="impact-text">
                ISABEL NE DOIT
                RIEN VOIR.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".hale-cover-trigger"
  )
  .forEach((button) => {

    if (
      haleCoverObserved.includes(
        button.dataset.haleCover
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  haleCoverObserved.length >= 5
) {

  setRevealHTML(
    haleCoverReveal,
    `
      <p class="impact-text">
        NE RIEN CHANGER.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 8
   LUCY / ROOT / CLIVE
========================================================= */

const lucyCliveReveal =
  document.getElementById(
    "lucyCliveReveal"
  );


let lucyCliveObserved =
  getStoredArray(
    STORAGE_LUCY_CLIVE
  );


const lucyCliveTexts = {

  call:
    "Lucy hésite brièvement avant d’accepter l’appel de Root. Clive le remarque immédiatement.",

  symbols:
    "Root demande l’aide d’IA2 pour comparer les symboles à des bases iconographiques, linguistiques et cultuelles.",

  dinner:
    "Lucy réclame un nouveau dîner en échange de son aide, cette fois officiellement scientifique.",

  jealousy:
    "Lucy provoque Clive directement en lui demandant s’il est jaloux.",

  look:
    "Après leur échange, Clive regarde Lucy autrement. Son détachement devient moins crédible."

};


document
  .querySelectorAll(
    ".lucy-clive-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.lucyClive;


        lucyCliveObserved =
          addStoredValue(
            STORAGE_LUCY_CLIVE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          lucyCliveReveal,
          `
            <p>
              ${lucyCliveTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          lucyCliveObserved.length >= 5
        ) {

          setRevealHTML(
            lucyCliveReveal,
            `
              <p>
                Root.
              </p>

              <p>
                Lucy.
              </p>

              <p>
                Clive.
              </p>

              <p>
                Un dîner scientifique.
              </p>

              <p class="impact-text">
                ET UN PEU DE JALOUSIE.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".lucy-clive-trigger"
  )
  .forEach((button) => {

    if (
      lucyCliveObserved.includes(
        button.dataset.lucyClive
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  lucyCliveObserved.length >= 5
) {

  setRevealHTML(
    lucyCliveReveal,
    `
      <p class="impact-text">
        CLIVE LA REGARDE
        AUTREMENT.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 9
   AMY QUITTE LA MAISON
========================================================= */

const amyDepartureReveal =
  document.getElementById(
    "amyDepartureReveal"
  );


const amyDepartureButtons =
  document.querySelectorAll(
    ".amy-departure-trigger"
  );


const amyDepartureOrder = [
  "left",
  "authorization",
  "follow",
  "knows",
  "hope"
];


let amyDepartureProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_AMY_DEPARTURE
    ) || "0",
    10
  );


const amyDepartureTexts = {

  left:
    "Amy a quitté la maison pendant la nuit.",

  authorization:
    "Elle n’a demandé aucune autorisation au Maître Noir.",

  follow:
    "Des hommes la suivent à distance pour savoir où elle se rend.",

  knows:
    "Le Maître Noir sait qu’Amy possède un instinct exceptionnel pour détecter une surveillance.",

  hope:
    "La question qu’il redoute apparaît : et si Amy cherchait à rejoindre Hope ?"

};


function restoreAmyDeparture() {

  amyDepartureButtons.forEach(
    (button, index) => {

      if (
        index < amyDepartureProgress
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
    amyDepartureProgress >= 5
  ) {

    setRevealHTML(
      amyDepartureReveal,
      `
        <p>
          Amy est partie.
        </p>

        <p>
          Sans permission.
        </p>

        <p>
          Elle est suivie.
        </p>

        <p>
          Elle le sait probablement.
        </p>

        <p class="impact-text">
          ET SI ELLE REJOIGNAIT HOPE ?
        </p>
      `
    );

  }

}


amyDepartureButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.amyDeparture;


        const expected =
          amyDepartureOrder[
            amyDepartureProgress
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


        amyDepartureProgress++;


        localStorage.setItem(
          STORAGE_AMY_DEPARTURE,
          amyDepartureProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          amyDepartureReveal,
          `
            <p>
              ${amyDepartureTexts[selected]}
            </p>
          `
        );


        playDarkSound();


        if (
          amyDepartureProgress >= 5
        ) {

          setRevealHTML(
            amyDepartureReveal,
            `
              <p>
                Il affirme
                qu’Amy ne rejoindra pas Hope.
              </p>

              <p class="impact-text">
                MAIS IL N’EN EST
                PLUS TOUT À FAIT SÛR.
              </p>
            `
          );


          showSecret(
            "master-black-doubt",
            "Le Maître Noir commence à douter de sa capacité à prévoir les choix d’Amy."
          );

        }

      }
    );

  });


restoreAmyDeparture();


/* =========================================================
   INTERACTION 10
   AMY SÈME LA SURVEILLANCE
========================================================= */

const amyEscapeReveal =
  document.getElementById(
    "amyEscapeReveal"
  );


const amyEscapeButtons =
  document.querySelectorAll(
    ".amy-escape-trigger"
  );


const amyEscapeOrder = [
  "cars",
  "reflection",
  "market",
  "clothes",
  "roof"
];


let amyEscapeProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_AMY_ESCAPE
    ) || "0",
    10
  );


const amyEscapeTexts = {

  cars:
    "Deux véhicules similaires apparaissent à quelques minutes d’intervalle. Amy comprend qu’elle est suivie.",

  reflection:
    "À la station-service, elle utilise les reflets de la vitre pour identifier deux hommes sans jamais les regarder directement.",

  market:
    "Elle traverse un marché bondé afin de casser les lignes de vue.",

  clothes:
    "Amy change de veste et modifie son apparence pour compliquer le suivi visuel.",

  roof:
    "Depuis un toit, elle regarde finalement ses poursuivants chercher dans la mauvaise direction."

};


function restoreAmyEscape() {

  amyEscapeButtons.forEach(
    (button, index) => {

      if (
        index < amyEscapeProgress
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
    amyEscapeProgress >= 5
  ) {

    setRevealHTML(
      amyEscapeReveal,
      `
        <p>
          Deux véhicules.
        </p>

        <p>
          Deux hommes.
        </p>

        <p>
          Un marché.
        </p>

        <p>
          Une nouvelle veste.
        </p>

        <p class="impact-text">
          ET EUX LA CHERCHENT ENCORE.
        </p>
      `
    );

  }

}


amyEscapeButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.amyEscape;


        const expected =
          amyEscapeOrder[
            amyEscapeProgress
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


        amyEscapeProgress++;


        localStorage.setItem(
          STORAGE_AMY_ESCAPE,
          amyEscapeProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          amyEscapeReveal,
          `
            <p>
              ${amyEscapeTexts[selected]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          amyEscapeProgress >= 5
        ) {

          setRevealHTML(
            amyEscapeReveal,
            `
              <p>
                Elle savait.
              </p>

              <p>
                Elle les a laissés croire
                qu’ils la suivaient.
              </p>

              <p class="impact-text">
                AMATEUR.
              </p>
            `
          );

        }

      }
    );

  });


restoreAmyEscape();


/* =========================================================
   INTERACTION 11
   AMY HÉSITE À APPELER HOPE
========================================================= */

const amyCallReveal =
  document.getElementById(
    "amyCallReveal"
  );


let amyCallObserved =
  getStoredArray(
    STORAGE_AMY_CALL
  );


const amyCallTexts = {

  phone:
    "Amy utilise un téléphone prépayé qui ne semble pas relié à son réseau habituel.",

  number:
    "Le numéro affiché est celui d’Hope.",

  finger:
    "Son doigt reste suspendu au-dessus de l’appel. Elle pourrait le faire immédiatement.",

  choice:
    "Elle renonce pourtant et range l’appareil : ce n’est pas un refus définitif, seulement un délai."

};


document
  .querySelectorAll(
    ".amy-call-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.amyCall;


        amyCallObserved =
          addStoredValue(
            STORAGE_AMY_CALL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          amyCallReveal,
          `
            <p>
              ${amyCallTexts[type]}
            </p>
          `
        );


        playMemorySound();


        if (
          amyCallObserved.length >= 4
        ) {

          setRevealHTML(
            amyCallReveal,
            `
              <p>
                Elle connaît
                le numéro.
              </p>

              <p>
                Elle veut appeler.
              </p>

              <p>
                Elle pourrait le faire.
              </p>

              <p class="impact-text">
                PAS ENCORE.
              </p>
            `
          );


          showSecret(
            "amy-wants-contact",
            "Amy envisage désormais réellement de contacter Hope."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".amy-call-trigger"
  )
  .forEach((button) => {

    if (
      amyCallObserved.includes(
        button.dataset.amyCall
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  amyCallObserved.length >= 4
) {

  setRevealHTML(
    amyCallReveal,
    `
      <p class="impact-text">
        PAS ENCORE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 12
   ÉLIE ET BETTY
========================================================= */

const elieBettyReveal =
  document.getElementById(
    "elieBettyReveal"
  );


const elieBettyButtons =
  document.querySelectorAll(
    ".elie-betty-trigger"
  );


const elieBettyOrder = [
  "movement",
  "anna",
  "betty",
  "protect",
  "photo"
];


let elieBettyProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_ELIE_BETTY
    ) || "0",
    10
  );


const elieBettyTexts = {

  movement:
    "Élie reçoit un rapport sur les mouvements inhabituels autour des haciendas Flores et Awake.",

  anna:
    "Son homme pense naturellement que l’intérêt d’Élie concerne Anna.",

  betty:
    "Le nom de Betty provoque pourtant une réaction immédiate chez Élie.",

  protect:
    "Élie donne un ordre absolu : personne ne doit toucher Betty, ni directement ni indirectement.",

  photo:
    "Une vieille photographie révèle qu’Élie et Betty se connaissaient déjà à l’adolescence."

};


function restoreElieBetty() {

  elieBettyButtons.forEach(
    (button, index) => {

      if (
        index < elieBettyProgress
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
    elieBettyProgress >= 5
  ) {

    setRevealHTML(
      elieBettyReveal,
      `
        <p>
          Il surveille l’hacienda.
        </p>

        <p>
          On croit qu’il surveille Anna.
        </p>

        <p>
          Puis le nom de Betty apparaît.
        </p>

        <p class="impact-text">
          PERSONNE
          NE TOUCHE BETTY.
        </p>

        <p class="emphasis">
          Ils se connaissaient
          bien avant aujourd’hui.
        </p>
      `
    );

  }

}


elieBettyButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.elieBetty;


        const expected =
          elieBettyOrder[
            elieBettyProgress
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


        elieBettyProgress++;


        localStorage.setItem(
          STORAGE_ELIE_BETTY,
          elieBettyProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          elieBettyReveal,
          `
            <p>
              ${elieBettyTexts[selected]}
            </p>
          `
        );


        playRevealSound();


        if (
          elieBettyProgress >= 5
        ) {

          setRevealHTML(
            elieBettyReveal,
            `
              <p>
                Une vieille photographie.
              </p>

              <p>
                Betty.
              </p>

              <p>
                Élie.
              </p>

              <p class="impact-text">
                UN PASSÉ COMMUN.
              </p>

              <p class="emphasis">
                Et une protection
                qui existe encore.
              </p>
            `
          );


          showSecret(
            "elie-betty-past",
            "Élie et Betty se connaissaient déjà à l’adolescence, et Élie refuse aujourd’hui qu’on lui fasse du mal."
          );

        }

      }
    );

  });


restoreElieBetty();


/* =========================================================
   INTERACTION 13
   ANCIEN / NOUVEAU SANG D'HOPE
========================================================= */

const bloodCompareReveal =
  document.getElementById(
    "bloodCompareReveal"
  );


const bloodCompareButtons =
  document.querySelectorAll(
    ".blood-compare-trigger"
  );


const bloodCompareOrder = [
  "old",
  "new",
  "anna",
  "absent",
  "present"
];


let bloodCompareProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_BLOOD_COMPARE
    ) || "0",
    10
  );


const bloodCompareTexts = {

  old:
    "Betty charge un prélèvement ancien d’Hope, effectué bien avant son passage dans la grotte.",

  new:
    "Elle ajoute les données obtenues aujourd’hui.",

  anna:
    "Puis elle ouvre la base biologique d’Anna pour comparer les signatures.",

  absent:
    "Avec cette méthode, le marqueur recherché n’apparaît pas dans l’ancien échantillon d’Hope.",

  present:
    "Dans le nouveau prélèvement, une signature nette apparaît."

};


function restoreBloodCompare() {

  bloodCompareButtons.forEach(
    (button, index) => {

      if (
        index < bloodCompareProgress
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
    bloodCompareProgress >= 5
  ) {

    setRevealHTML(
      bloodCompareReveal,
      `
        <p>
          Ancien Hope.
        </p>

        <p>
          Nouveau Hope.
        </p>

        <p>
          Anna.
        </p>

        <p>
          Ancien échantillon :
          non détecté.
        </p>

        <p class="impact-text">
          NOUVEL ÉCHANTILLON :
          SIGNATURE NETTE.
        </p>
      `
    );

  }

}


bloodCompareButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.bloodCompare;


        const expected =
          bloodCompareOrder[
            bloodCompareProgress
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


        bloodCompareProgress++;


        localStorage.setItem(
          STORAGE_BLOOD_COMPARE,
          bloodCompareProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          bloodCompareReveal,
          `
            <p>
              ${bloodCompareTexts[selected]}
            </p>
          `
        );


        playBiologySound();


        if (
          bloodCompareProgress >= 5
        ) {

          setRevealHTML(
            bloodCompareReveal,
            `
              <p>
                Dans l’ancien prélèvement,
                Betty ne détecte rien
                avec cette méthode.
              </p>

              <p>
                Dans le nouveau,
                la signature apparaît.
              </p>

              <p class="impact-text">
                QUELQUE CHOSE
                EST DIFFÉRENT.
              </p>

              <p class="emphasis">
                Mais Betty refuse encore
                de dire que cela prouve
                une apparition récente.
              </p>
            `
          );


          showSecret(
            "hope-new-signature",
            "Une signature biologique est détectée aujourd’hui chez Hope alors qu’elle n’apparaît pas dans l’ancien prélèvement avec la même méthode."
          );

        }

      }
    );

  });


restoreBloodCompare();


/* =========================================================
   INTERACTION 14
   COMPLÉMENTARITÉ HOPE / ANNA
========================================================= */

const complementarityReveal =
  document.getElementById(
    "complementarityReveal"
  );


const complementarityButtons =
  document.querySelectorAll(
    ".complementarity-trigger"
  );


const complementarityOrder = [
  "anna",
  "hope",
  "different",
  "response",
  "complementary"
];


let complementarityProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_COMPLEMENTARITY
    ) || "0",
    10
  );


const complementarityTexts = {

  anna:
    "La signature biologique d’Anna est présente depuis les premiers prélèvements conservés par Betty.",

  hope:
    "La nouvelle signature d’Hope n’est pas identique à celle d’Anna.",

  different:
    "Les deux profils possèdent des formes distinctes. Il ne s’agit donc pas du même marqueur.",

  response:
    "Pourtant, lorsque Betty les superpose, certaines structures semblent se répondre.",

  complementary:
    "Charles propose un mot : complémentaire. Betty refuse encore d’en faire une conclusion, mais c’est précisément ce que les courbes suggèrent."

};


function restoreComplementarity() {

  complementarityButtons.forEach(
    (button, index) => {

      if (
        index < complementarityProgress
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
    complementarityProgress >= 5
  ) {

    setRevealHTML(
      complementarityReveal,
      `
        <p>
          Anna.
        </p>

        <p>
          Hope.
        </p>

        <p>
          Deux signatures différentes.
        </p>

        <p>
          Deux formes
          qui semblent se répondre.
        </p>

        <p class="impact-text">
          COMPLÉMENTAIRES ?
        </p>

        <p class="emphasis">
          Une hypothèse.
          Pas encore une preuve.
        </p>
      `
    );

  }

}


complementarityButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.complementarity;


        const expected =
          complementarityOrder[
            complementarityProgress
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


        complementarityProgress++;


        localStorage.setItem(
          STORAGE_COMPLEMENTARITY,
          complementarityProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          complementarityReveal,
          `
            <p>
              ${complementarityTexts[selected]}
            </p>
          `
        );


        playRevealSound();


        if (
          complementarityProgress >= 5
        ) {

          setRevealHTML(
            complementarityReveal,
            `
              <p>
                Anna :
                une signature.
              </p>

              <p>
                Hope :
                une autre.
              </p>

              <p>
                Différentes.
              </p>

              <p>
                Mais liées
                par une logique commune.
              </p>

              <p class="impact-text">
                LE PONT
                ET LA CLÉ ?
              </p>

              <p class="emphasis">
                Pour la première fois,
                la biologie semble rejoindre
                les symboles de la grotte.
              </p>
            `
          );


          showSecret(
            "hope-anna-complementary",
            "Les signatures biologiques d’Anna et d’Hope ne sont pas identiques, mais elles semblent fonctionner comme deux éléments complémentaires d’un même système."
          );

        }

      }
    );

  });


restoreComplementarity();


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-52"
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
