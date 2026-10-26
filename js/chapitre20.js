/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 20 — LES LIGNES BOUGENT
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
  "societeOmbre_chapitre20_";

const STORAGE_SCROLL =
  STORAGE_PREFIX + "scroll";

const STORAGE_PROGRESS =
  STORAGE_PREFIX + "progression";

const STORAGE_COMPLETED =
  STORAGE_PREFIX + "termine";

const STORAGE_SECRETS =
  STORAGE_PREFIX + "secrets";

const STORAGE_MARKS_CONTROL =
  STORAGE_PREFIX + "marksControl";

const STORAGE_LIVING_MARKS =
  STORAGE_PREFIX + "livingMarks";

const STORAGE_DESTINY_PATH =
  STORAGE_PREFIX + "destinyPath";

const STORAGE_ISABEL_CAUGHT =
  STORAGE_PREFIX + "isabelCaught";

const STORAGE_ISABEL_IDEA =
  STORAGE_PREFIX + "isabelIdea";

const STORAGE_AMY_CHOICE =
  STORAGE_PREFIX + "amyChoice";

const STORAGE_ERASER_ARRIVAL =
  STORAGE_PREFIX + "eraserArrival";

const STORAGE_CAVES_CLUE =
  STORAGE_PREFIX + "cavesClue";

const STORAGE_THREE_SITES =
  STORAGE_PREFIX + "threeSites";

const STORAGE_DRAGON_PHOENIX =
  STORAGE_PREFIX + "dragonPhoenix";

const STORAGE_ELIE_CARGO =
  STORAGE_PREFIX + "elieCargo";

const STORAGE_OLD_REFUGE =
  STORAGE_PREFIX + "oldRefuge";

const STORAGE_EXPEDITION_TEAM =
  STORAGE_PREFIX + "expeditionTeam";

const STORAGE_LINES_MOVE =
  STORAGE_PREFIX + "linesMove";


/* =========================================================
   COMPATIBILITÉ ANCIENNE
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre20_finished"
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
    "chapitre20.html?lecture=recommencer";

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


function updateOrderedButtons(
  buttons,
  progress
) {

  buttons.forEach(
    (button, index) => {

      button.classList.remove(
        "active"
      );


      if (
        index < progress
      ) {

        button.classList.add(
          "completed"
        );

        button.disabled =
          true;

      } else {

        button.disabled =
          false;

      }


      if (
        index === progress
      ) {

        button.classList.add(
          "active"
        );

      }

    }
  );

}


/* =========================================================
   INTERACTION 1
   DRAGON / PHÉNIX / CONTRÔLE
========================================================= */

const marksControlReveal =
  document.getElementById(
    "marksControlReveal"
  );


const marksControlButtons =
  document.querySelectorAll(
    ".marks-control-trigger"
  );


const marksControlOrder = [
  "breath",
  "movement",
  "dragon",
  "phoenix",
  "control"
];


let marksControlProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_MARKS_CONTROL
    ) || "0",
    10
  );


const marksControlTexts = {

  breath:
    "Hope commence par ralentir sa respiration et stabiliser son corps avant le moindre mouvement.",

  movement:
    "Ses gestes accélèrent progressivement, mais chaque frappe et chaque esquive restent parfaitement contrôlées.",

  dragon:
    "Le Dragon apparaît sur son bras pendant l’effort, ses couleurs suivant les mouvements de ses muscles.",

  phoenix:
    "Une chaleur gagne ensuite son dos et le Phénix lumineux se déploie presque d’une épaule à l’autre.",

  control:
    "Hope ne subit plus seulement les manifestations : elle semble désormais capable de les accompagner et de les contrôler beaucoup plus facilement."

};


function restoreMarksControl() {

  updateOrderedButtons(
    marksControlButtons,
    marksControlProgress
  );


  if (
    marksControlProgress >= 5
  ) {

    setRevealHTML(
      marksControlReveal,
      `
        <p>
          Respiration.
        </p>

        <p>
          Mouvement.
        </p>

        <p>
          Dragon.
        </p>

        <p>
          Phénix.
        </p>

        <p class="impact-text">
          LE CONTRÔLE
          DEVIENT PLUS NATUREL.
        </p>
      `
    );

  }

}


marksControlButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.marksControl;


        const expected =
          marksControlOrder[
            marksControlProgress
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


        marksControlProgress++;


        localStorage.setItem(
          STORAGE_MARKS_CONTROL,
          marksControlProgress
        );


        updateOrderedButtons(
          marksControlButtons,
          marksControlProgress
        );


        setRevealHTML(
          marksControlReveal,
          `
            <p>
              ${marksControlTexts[selected]}
            </p>
          `
        );


        playRevealSound();


        if (
          marksControlProgress >= 5
        ) {

          showSecret(
            "hope-marks-control",
            "Depuis son passage dans la grotte, Hope semble pouvoir faire apparaître Dragon et Phénix plus facilement."
          );

        }

      }
    );

  });


restoreMarksControl();


/* =========================================================
   INTERACTION 2
   LES MARQUES VIVANTES
========================================================= */

const livingMarksReveal =
  document.getElementById(
    "livingMarksReveal"
  );


let livingMarksObserved =
  getStoredArray(
    STORAGE_LIVING_MARKS
  );


const livingMarksTexts = {

  distance:
    "Les couleurs du Dragon s’intensifient alors que la main de Betty se trouve encore à quelques centimètres de la peau.",

  color:
    "Les différentes couleurs ne restent pas fixes : elles semblent répondre à l’environnement et à l’état d’Hope.",

  touch:
    "Lorsque Betty touche enfin le bord du Dragon, une impulsion lumineuse traverse tout le dessin.",

  heat:
    "Hope décrit une chaleur interne accompagnée d’une concentration différente et parfois d’une légère euphorie.",

  alive:
    "Pour Betty, il ne s’agit ni d’un tatouage classique ni d’une simple modification de pigmentation."

};


document
  .querySelectorAll(
    ".living-marks-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.livingMarks;


        livingMarksObserved =
          addStoredValue(
            STORAGE_LIVING_MARKS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          livingMarksReveal,
          `
            <p>
              ${livingMarksTexts[type]}
            </p>
          `
        );


        playBiologySound();


        if (
          livingMarksObserved.length >= 5
        ) {

          setRevealHTML(
            livingMarksReveal,
            `
              <p>
                Réaction avant contact.
              </p>

              <p>
                Couleurs variables.
              </p>

              <p>
                Chaleur.
              </p>

              <p>
                Réponse au toucher.
              </p>

              <p class="impact-text">
                CE NE SONT PAS
                DE SIMPLES TATOUAGES.
              </p>
            `
          );


          showSecret(
            "living-dragon-phoenix",
            "Dragon et Phénix se comportent comme des manifestations biologiquement actives, et non comme de simples tatouages."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".living-marks-trigger"
  )
  .forEach((button) => {

    if (
      livingMarksObserved.includes(
        button.dataset.livingMarks
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  livingMarksObserved.length >= 5
) {

  setRevealHTML(
    livingMarksReveal,
    `
      <p class="impact-text">
        ILS RÉAGISSENT.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 3
   DESTINÉE / TRAJECTOIRE
========================================================= */

const destinyPathReveal =
  document.getElementById(
    "destinyPathReveal"
  );


let destinyPathObserved =
  getStoredArray(
    STORAGE_DESTINY_PATH
  );


const destinyPathTexts = {

  event:
    "Maître Lee savait seulement qu’un événement important avait eu lieu lors de la naissance d’Anna.",

  hale:
    "Il savait qu’Hale devait protéger l’enfant, mais pas déterminer la manière dont elle devait vivre.",

  texts:
    "Certains textes anciens pouvaient concerner Anna, sans permettre de savoir exactement qui elle deviendrait.",

  trajectory:
    "Lee distingue une destinée imposée d’une trajectoire possible : une direction n’est pas une obligation.",

  choice:
    "Même si Anna possède une fonction particulière, elle reste libre de décider ce qu’elle veut en faire."

};


document
  .querySelectorAll(
    ".destiny-path-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.destinyPath;


        destinyPathObserved =
          addStoredValue(
            STORAGE_DESTINY_PATH,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          destinyPathReveal,
          `
            <p>
              ${destinyPathTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          destinyPathObserved.length >= 5
        ) {

          setRevealHTML(
            destinyPathReveal,
            `
              <p>
                Une direction
                peut exister.
              </p>

              <p>
                Elle ne décide pas
                de ce qu’Anna
                doit devenir.
              </p>

              <p class="impact-text">
                DESTINÉE
                N’EST PAS TRAJECTOIRE.
              </p>
            `
          );


          showSecret(
            "anna-free-trajectory",
            "Les anciens textes peuvent indiquer une trajectoire possible pour Anna, mais pas lui imposer une destinée."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".destiny-path-trigger"
  )
  .forEach((button) => {

    if (
      destinyPathObserved.includes(
        button.dataset.destinyPath
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  destinyPathObserved.length >= 5
) {

  setRevealHTML(
    destinyPathReveal,
    `
      <p class="impact-text">
        UNE DIRECTION
        N’EST PAS UNE OBLIGATION.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 4
   ISABEL EST DÉMASQUÉE
========================================================= */

const isabelCaughtReveal =
  document.getElementById(
    "isabelCaughtReveal"
  );


const isabelCaughtButtons =
  document.querySelectorAll(
    ".isabel-caught-trigger"
  );


const isabelCaughtOrder = [
  "deposit",
  "clive",
  "hale",
  "lucy",
  "understands"
];


let isabelCaughtProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_ISABEL_CAUGHT
    ) || "0",
    10
  );


const isabelCaughtTexts = {

  deposit:
    "Isabel répète exactement son rituel habituel dans l’oratoire et dépose une nouvelle information.",

  clive:
    "Cette fois, Clive est déjà caché dans la pièce et observe toute la scène.",

  hale:
    "Lorsque Isabel cherche une sortie, Hale apparaît à son tour.",

  lucy:
    "Lucy rejoint finalement la pièce, fermant toute possibilité de faire semblant.",

  understands:
    "Isabel comprend immédiatement qu’ils connaissent désormais son rôle."

};


function restoreIsabelCaught() {

  updateOrderedButtons(
    isabelCaughtButtons,
    isabelCaughtProgress
  );


  if (
    isabelCaughtProgress >= 5
  ) {

    setRevealHTML(
      isabelCaughtReveal,
      `
        <p>
          Clive.
        </p>

        <p>
          Hale.
        </p>

        <p>
          Lucy.
        </p>

        <p class="impact-text">
          ISABEL EST DÉMASQUÉE.
        </p>
      `
    );

  }

}


isabelCaughtButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.isabelCaught;


        const expected =
          isabelCaughtOrder[
            isabelCaughtProgress
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


        isabelCaughtProgress++;


        localStorage.setItem(
          STORAGE_ISABEL_CAUGHT,
          isabelCaughtProgress
        );


        updateOrderedButtons(
          isabelCaughtButtons,
          isabelCaughtProgress
        );


        setRevealHTML(
          isabelCaughtReveal,
          `
            <p>
              ${isabelCaughtTexts[selected]}
            </p>
          `
        );


        playDeductionSound();


        if (
          isabelCaughtProgress >= 5
        ) {

          showSecret(
            "isabel-exposed",
            "Le rôle d’Isabel comme taupe est désormais ouvertement révélé. Sa couverture est terminée."
          );

        }

      }
    );

  });


restoreIsabelCaught();


/* =========================================================
   INTERACTION 5
   ISABEL TRAVAILLE POUR UNE IDÉE
========================================================= */

const isabelIdeaReveal =
  document.getElementById(
    "isabelIdeaReveal"
  );


let isabelIdeaObserved =
  getStoredArray(
    STORAGE_ISABEL_IDEA
  );


const isabelIdeaTexts = {

  eighteen:
    "Les rapports accumulés couvrent près de dix-huit années de surveillance.",

  anna:
    "Isabel a observé Anna grandir, ses habitudes, ses examens et ses progrès.",

  betty:
    "Betty lui faisait également confiance, ce qui rend la trahison beaucoup plus personnelle.",

  name:
    "Isabel comprend que Lucy, Hale et Clive cherchent naturellement à remonter jusqu’à un responsable.",

  idea:
    "Mais Isabel affirme qu’elle ne travaille pas simplement pour un homme : elle sert avant tout une idée."

};


document
  .querySelectorAll(
    ".isabel-idea-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.isabelIdea;


        isabelIdeaObserved =
          addStoredValue(
            STORAGE_ISABEL_IDEA,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          isabelIdeaReveal,
          `
            <p>
              ${isabelIdeaTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          isabelIdeaObserved.length >= 5
        ) {

          setRevealHTML(
            isabelIdeaReveal,
            `
              <p>
                Dix-huit années
                de surveillance.
              </p>

              <p>
                Une confiance
                trahie.
              </p>

              <p class="impact-text">
                MAIS ISABEL
                NE SERT PAS SEULEMENT
                UN HOMME.
              </p>

              <p class="name-reveal">
                ELLE SERT UNE IDÉE.
              </p>
            `
          );


          showSecret(
            "isabel-serves-idea",
            "Isabel se considère comme membre d’une cause et non comme simple employée d’un chef."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".isabel-idea-trigger"
  )
  .forEach((button) => {

    if (
      isabelIdeaObserved.includes(
        button.dataset.isabelIdea
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  isabelIdeaObserved.length >= 5
) {

  setRevealHTML(
    isabelIdeaReveal,
    `
      <p class="impact-text">
        UNE IDÉE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 6
   AMY A CHOISI
========================================================= */

const amyChoiceReveal =
  document.getElementById(
    "amyChoiceReveal"
  );


let amyChoiceObserved =
  getStoredArray(
    STORAGE_AMY_CHOICE
  );


const amyChoiceTexts = {

  followed:
    "Amy découvre que le Maître Noir la fait suivre parce qu’il ne lui fait plus totalement confiance.",

  hope:
    "La raison centrale du conflit reste la mission concernant Hope.",

  spared:
    "Le Maître Noir sait qu’Amy possédait les capacités nécessaires pour tuer Hope.",

  decision:
    "Amy revendique pourtant clairement son choix : Hope est vivante parce qu’elle a décidé de l’épargner.",

  hesitation:
    "Pour la première fois, Amy accepte même d’admettre qu’elle a peut-être hésité."

};


document
  .querySelectorAll(
    ".amy-choice-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.amyChoice;


        amyChoiceObserved =
          addStoredValue(
            STORAGE_AMY_CHOICE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          amyChoiceReveal,
          `
            <p>
              ${amyChoiceTexts[type]}
            </p>
          `
        );


        playDarkSound();


        if (
          amyChoiceObserved.length >= 5
        ) {

          setRevealHTML(
            amyChoiceReveal,
            `
              <p>
                Elle pouvait tuer Hope.
              </p>

              <p>
                Elle ne l’a pas fait.
              </p>

              <p class="impact-text">
                PARCE QU’ELLE
                L’A DÉCIDÉ.
              </p>
            `
          );


          showSecret(
            "amy-free-choice",
            "Amy affirme pour la première fois ouvertement que l’échec de la mission sur Hope était son propre choix."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".amy-choice-trigger"
  )
  .forEach((button) => {

    if (
      amyChoiceObserved.includes(
        button.dataset.amyChoice
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  amyChoiceObserved.length >= 5
) {

  setRevealHTML(
    amyChoiceReveal,
    `
      <p class="impact-text">
        PARCE QUE JE L’AI DÉCIDÉ.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 7
   ARRIVÉE DE L’EFFACEUR
========================================================= */

const eraserArrivalReveal =
  document.getElementById(
    "eraserArrivalReveal"
  );


const eraserArrivalButtons =
  document.querySelectorAll(
    ".eraser-arrival-trigger"
  );


const eraserArrivalOrder = [
  "voice",
  "freeze",
  "man",
  "butcher",
  "eraser"
];


let eraserArrivalProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_ERASER_ARRIVAL
    ) || "0",
    10
  );


const eraserArrivalTexts = {

  voice:
    "Une voix inconnue retentit derrière Amy alors qu’elle affronte le Maître Noir.",

  freeze:
    "Amy se fige immédiatement, réaction inhabituelle chez elle.",

  man:
    "L’homme est grand et massif, avec un visage presque banal mais un regard profondément inquiétant.",

  butcher:
    "Amy le reconnaît et utilise un surnom qui suffit à définir sa réputation : le Boucher.",

  eraser:
    "L’homme préfère un autre nom : l’Effaceur."

};


function restoreEraserArrival() {

  updateOrderedButtons(
    eraserArrivalButtons,
    eraserArrivalProgress
  );


  if (
    eraserArrivalProgress >= 5
  ) {

    setRevealHTML(
      eraserArrivalReveal,
      `
        <p>
          Amy le connaît.
        </p>

        <p>
          Et pour une fois,
          elle ne sourit plus.
        </p>

        <p class="impact-text">
          L’EFFACEUR
          EST ENTRÉ EN JEU.
        </p>
      `
    );

  }

}


eraserArrivalButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.eraserArrival;


        const expected =
          eraserArrivalOrder[
            eraserArrivalProgress
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


        eraserArrivalProgress++;


        localStorage.setItem(
          STORAGE_ERASER_ARRIVAL,
          eraserArrivalProgress
        );


        updateOrderedButtons(
          eraserArrivalButtons,
          eraserArrivalProgress
        );


        setRevealHTML(
          eraserArrivalReveal,
          `
            <p>
              ${eraserArrivalTexts[selected]}
            </p>
          `
        );


        playDarkSound();


        if (
          eraserArrivalProgress >= 5
        ) {

          showSecret(
            "eraser-arrives",
            "Le Maître Noir a fait venir l’Effaceur, un homme qu’Amy considère comme particulièrement dangereux."
          );

        }

      }
    );

  });


restoreEraserArrival();


/* =========================================================
   INTERACTION 8
   LA PISTE DES GROTTES
========================================================= */

const cavesClueReveal =
  document.getElementById(
    "cavesClueReveal"
  );


let cavesClueObserved =
  getStoredArray(
    STORAGE_CAVES_CLUE
  );


const cavesClueTexts = {

  shelters:
    "Lucy comprend qu’il existe plusieurs refuges liés au réseau des Gardiens.",

  versions:
    "Isabel rappelle que Sentinelles et Gardiens possèdent chacun leur propre version de l’histoire.",

  camps:
    "Lucy refuse désormais une lecture trop simple opposant un camp entièrement bon à un camp entièrement mauvais.",

  caves:
    "Isabel oriente finalement le groupe vers des grottes abandonnées brutalement par leurs anciens habitants.",

  parques:
    "Elle affirme que Root, en tant que Parques, possède précisément les connaissances nécessaires pour retrouver ces lieux."

};


document
  .querySelectorAll(
    ".caves-clue-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.cavesClue;


        cavesClueObserved =
          addStoredValue(
            STORAGE_CAVES_CLUE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          cavesClueReveal,
          `
            <p>
              ${cavesClueTexts[type]}
            </p>
          `
        );


        playDeductionSound();


        if (
          cavesClueObserved.length >= 5
        ) {

          setRevealHTML(
            cavesClueReveal,
            `
              <p>
                Plusieurs refuges.
              </p>

              <p>
                Des versions différentes.
              </p>

              <p>
                Des grottes
                abandonnées sans raison claire.
              </p>

              <p class="impact-text">
                ET UNE PARQUES
                POUR LES RETROUVER.
              </p>
            `
          );


          showSecret(
            "caves-clue",
            "Isabel fournit une piste exploitable : d’anciennes grottes abandonnées que Root pourrait identifier."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".caves-clue-trigger"
  )
  .forEach((button) => {

    if (
      cavesClueObserved.includes(
        button.dataset.cavesClue
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  cavesClueObserved.length >= 5
) {

  setRevealHTML(
    cavesClueReveal,
    `
      <p class="impact-text">
        DEMANDEZ À ROOT.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 9
   TROIS SITES
========================================================= */

const threeSitesReveal =
  document.getElementById(
    "threeSitesReveal"
  );


let threeSitesObserved =
  getStoredArray(
    STORAGE_THREE_SITES
  );


const threeSitesTexts = {

  abandoned:
    "Root commence par rechercher les grottes correspondant à des occupations humaines anciennes puis abandonnées.",

  undocumented:
    "Certaines cavités ne sont pratiquement pas documentées dans les archives modernes.",

  excavated:
    "D’autres ont été fouillées puis abandonnées sans explication convaincante.",

  stories:
    "Plusieurs de ces sites apparaissent aussi dans des récits beaucoup plus anciens.",

  three:
    "En croisant les informations d’Isabel et les cartes anciennes, Root isole finalement trois sites."

};


document
  .querySelectorAll(
    ".three-sites-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.threeSites;


        threeSitesObserved =
          addStoredValue(
            STORAGE_THREE_SITES,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          threeSitesReveal,
          `
            <p>
              ${threeSitesTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          threeSitesObserved.length >= 5
        ) {

          setRevealHTML(
            threeSitesReveal,
            `
              <p>
                Les informations
                d’Isabel sont vagues.
              </p>

              <p>
                Mais Root parvient
                à les croiser.
              </p>

              <p class="impact-text">
                TROIS SITES
                CORRESPONDENT.
              </p>
            `
          );


          showSecret(
            "three-ancient-sites",
            "Root identifie trois grottes correspondant aux indications données par Isabel."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".three-sites-trigger"
  )
  .forEach((button) => {

    if (
      threeSitesObserved.includes(
        button.dataset.threeSites
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  threeSitesObserved.length >= 5
) {

  setRevealHTML(
    threeSitesReveal,
    `
      <p class="impact-text">
        TROIS SITES.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 10
   DRAGON / PHÉNIX / BIOLOGIE
========================================================= */

const dragonPhoenixReveal =
  document.getElementById(
    "dragonPhoenixReveal"
  );


const dragonPhoenixButtons =
  document.querySelectorAll(
    ".dragon-phoenix-trigger"
  );


const dragonPhoenixOrder = [
  "dragon",
  "marker",
  "phoenix",
  "different",
  "complementary"
];


let dragonPhoenixProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_DRAGON_PHOENIX
    ) || "0",
    10
  );


const dragonPhoenixTexts = {

  dragon:
    "Lorsque le Dragon apparaît, plusieurs valeurs biologiques d’Hope se modifient immédiatement.",

  marker:
    "Le marqueur que Betty avait déjà repéré comme partiellement commun avec Anna augmente nettement.",

  phoenix:
    "Hope fait ensuite apparaître le Phénix avec une séquence beaucoup plus lente et fluide.",

  different:
    "La réponse biologique obtenue n’est pas la même que celle du Dragon.",

  complementary:
    "Charles et Betty constatent cependant que les deux réponses semblent complémentaires."

};


function restoreDragonPhoenix() {

  updateOrderedButtons(
    dragonPhoenixButtons,
    dragonPhoenixProgress
  );


  if (
    dragonPhoenixProgress >= 5
  ) {

    setRevealHTML(
      dragonPhoenixReveal,
      `
        <p>
          Dragon :
          une réponse.
        </p>

        <p>
          Phénix :
          une autre.
        </p>

        <p class="impact-text">
          DIFFÉRENTES.
        </p>

        <p class="emphasis">
          Mais complémentaires.
        </p>
      `
    );

  }

}


dragonPhoenixButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.dragonPhoenix;


        const expected =
          dragonPhoenixOrder[
            dragonPhoenixProgress
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


        dragonPhoenixProgress++;


        localStorage.setItem(
          STORAGE_DRAGON_PHOENIX,
          dragonPhoenixProgress
        );


        updateOrderedButtons(
          dragonPhoenixButtons,
          dragonPhoenixProgress
        );


        setRevealHTML(
          dragonPhoenixReveal,
          `
            <p>
              ${dragonPhoenixTexts[selected]}
            </p>
          `
        );


        playBiologySound();


        if (
          dragonPhoenixProgress >= 5
        ) {

          showSecret(
            "dragon-phoenix-complementary",
            "Dragon et Phénix provoquent chez Hope deux réponses biologiques différentes mais complémentaires."
          );

        }

      }
    );

  });


restoreDragonPhoenix();


/* =========================================================
   INTERACTION 11
   ÉLIE / CARGAISON ANCIENNE
========================================================= */

const elieCargoReveal =
  document.getElementById(
    "elieCargoReveal"
  );


const elieCargoButtons =
  document.querySelectorAll(
    ".elie-cargo-trigger"
  );


const elieCargoOrder = [
  "vehicles",
  "route",
  "client",
  "crates",
  "objects"
];


let elieCargoProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_ELIE_CARGO
    ) || "0",
    10
  );


const elieCargoTexts = {

  vehicles:
    "Trois véhicules, deux chauffeurs et un conteneur ont disparu du réseau d’Élie.",

  route:
    "Les hommes ont reçu au dernier moment un nouvel itinéraire.",

  client:
    "L’ordre venait d’un client lié à l’Hidalgo.",

  crates:
    "La cargaison contenait des caisses anciennes dont le contenu n’avait pas été vérifié.",

  objects:
    "Les seules descriptions disponibles parlent de roches et d’objets anciens."

};


function restoreElieCargo() {

  updateOrderedButtons(
    elieCargoButtons,
    elieCargoProgress
  );


  if (
    elieCargoProgress >= 5
  ) {

    setRevealHTML(
      elieCargoReveal,
      `
        <p>
          Hidalgo.
        </p>

        <p>
          Un itinéraire modifié.
        </p>

        <p>
          Des caisses anciennes.
        </p>

        <p>
          Roches.
        </p>

        <p>
          Objets.
        </p>

        <p class="impact-text">
          QUELQU’UN UTILISE
          LE RÉSEAU D’ÉLIE.
        </p>
      `
    );

  }

}


elieCargoButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.elieCargo;


        const expected =
          elieCargoOrder[
            elieCargoProgress
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


        elieCargoProgress++;


        localStorage.setItem(
          STORAGE_ELIE_CARGO,
          elieCargoProgress
        );


        updateOrderedButtons(
          elieCargoButtons,
          elieCargoProgress
        );


        setRevealHTML(
          elieCargoReveal,
          `
            <p>
              ${elieCargoTexts[selected]}
            </p>
          `
        );


        playDeductionSound();


        if (
          elieCargoProgress >= 5
        ) {

          showSecret(
            "elie-ancient-cargo",
            "Le réseau d’Élie a été utilisé pour transporter secrètement des roches et objets anciens liés à l’Hidalgo."
          );

        }

      }
    );

  });


restoreElieCargo();


/* =========================================================
   INTERACTION 12
   L’ANCIEN REFUGE
========================================================= */

const oldRefugeReveal =
  document.getElementById(
    "oldRefugeReveal"
  );


const oldRefugeButtons =
  document.querySelectorAll(
    ".old-refuge-trigger"
  );


const oldRefugeOrder = [
  "occupation",
  "abandon",
  "texts",
  "common",
  "fragments"
];


let oldRefugeProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_OLD_REFUGE
    ) || "0",
    10
  );


const oldRefugeTexts = {

  occupation:
    "Les sites étudiés montrent tous des traces d’occupation humaine ancienne.",

  abandon:
    "Plusieurs de ces lieux ont ensuite été abandonnés brutalement sans cause clairement établie.",

  texts:
    "Maître Lee reconnaît l’un des sites grâce aux anciens textes des Sentinelles.",

  common:
    "Le lieu est antérieur à la séparation : il appartenait autrefois à l’ordre unique.",

  fragments:
    "Il pourrait donc conserver une version du savoir ancien et peut-être des fragments concernant le passage."

};


function restoreOldRefuge() {

  updateOrderedButtons(
    oldRefugeButtons,
    oldRefugeProgress
  );


  if (
    oldRefugeProgress >= 5
  ) {

    setRevealHTML(
      oldRefugeReveal,
      `
        <p>
          Un lieu ancien.
        </p>

        <p>
          Avant les Sentinelles.
        </p>

        <p>
          Avant les Gardiens.
        </p>

        <p class="impact-text">
          UN LIEU COMMUN.
        </p>

        <p class="emphasis">
          Et peut-être
          des fragments du passage.
        </p>
      `
    );

  }

}


oldRefugeButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.oldRefuge;


        const expected =
          oldRefugeOrder[
            oldRefugeProgress
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


        oldRefugeProgress++;


        localStorage.setItem(
          STORAGE_OLD_REFUGE,
          oldRefugeProgress
        );


        updateOrderedButtons(
          oldRefugeButtons,
          oldRefugeProgress
        );


        setRevealHTML(
          oldRefugeReveal,
          `
            <p>
              ${oldRefugeTexts[selected]}
            </p>
          `
        );


        playMemorySound();


        if (
          oldRefugeProgress >= 5
        ) {

          showSecret(
            "old-common-refuge",
            "Le refuge ciblé existait avant la séparation entre Sentinelles et Gardiens et pourrait contenir des fragments anciens du passage."
          );

        }

      }
    );

  });


restoreOldRefuge();


/* =========================================================
   INTERACTION 13
   FORMER L’ÉQUIPE
========================================================= */

const expeditionTeamReveal =
  document.getElementById(
    "expeditionTeamReveal"
  );


let expeditionTeamObserved =
  getStoredArray(
    STORAGE_EXPEDITION_TEAM
  );


const expeditionTeamTexts = {

  hale:
    "Hale se porte immédiatement volontaire pour accompagner l’expédition.",

  lucy:
    "Lucy veut être présente pour poursuivre directement les réponses obtenues grâce à Isabel.",

  clive:
    "Clive considère sa présence comme une évidence.",

  hope:
    "Hope partira également, autant pour les Gardiens que pour les liens possibles avec le passage.",

  root:
    "Root est indispensable pour lire les traces anciennes et comprendre ce que le refuge pourrait contenir."

};


document
  .querySelectorAll(
    ".expedition-team-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.expeditionTeam;


        expeditionTeamObserved =
          addStoredValue(
            STORAGE_EXPEDITION_TEAM,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          expeditionTeamReveal,
          `
            <p>
              ${expeditionTeamTexts[type]}
            </p>
          `
        );


        playRevealSound();


        if (
          expeditionTeamObserved.length >= 5
        ) {

          setRevealHTML(
            expeditionTeamReveal,
            `
              <p>
                Hale.
              </p>

              <p>
                Lucy.
              </p>

              <p>
                Clive.
              </p>

              <p>
                Hope.
              </p>

              <p>
                Root.
              </p>

              <p class="impact-text">
                L’ÉQUIPE EST FORMÉE.
              </p>
            `
          );


          showSecret(
            "expedition-team",
            "Hope, Root, Lucy, Hale et Clive formeront l’équipe envoyée vers l’ancien refuge."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".expedition-team-trigger"
  )
  .forEach((button) => {

    if (
      expeditionTeamObserved.includes(
        button.dataset.expeditionTeam
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  expeditionTeamObserved.length >= 5
) {

  setRevealHTML(
    expeditionTeamReveal,
    `
      <p class="impact-text">
        CINQ PERSONNES.
        UN ANCIEN REFUGE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 14
   LES LIGNES BOUGENT
========================================================= */

const linesMoveReveal =
  document.getElementById(
    "linesMoveReveal"
  );


const linesMoveButtons =
  document.querySelectorAll(
    ".lines-move-trigger"
  );


const linesMoveOrder = [
  "isabel",
  "amy",
  "eraser",
  "guardians",
  "expedition"
];


let linesMoveProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_LINES_MOVE
    ) || "0",
    10
  );


const linesMoveTexts = {

  isabel:
    "Isabel a perdu sa couverture et a commencé à fournir des informations exploitables.",

  amy:
    "Amy reconnaît désormais clairement qu’elle sait de quel côté elle veut se tenir.",

  eraser:
    "L’Effaceur a été appelé par le Maître Noir et s’intéresse déjà directement à Hope.",

  guardians:
    "Le Maître Noir sait où l’équipe se dirige et ordonne aux Gardiens de préparer l’ancien refuge.",

  expedition:
    "Hope, Root, Lucy, Hale et Clive se préparent au même moment à rejoindre exactement ce lieu."

};


function restoreLinesMove() {

  updateOrderedButtons(
    linesMoveButtons,
    linesMoveProgress
  );


  if (
    linesMoveProgress >= 5
  ) {

    setRevealHTML(
      linesMoveReveal,
      `
        <p>
          Isabel a parlé.
        </p>

        <p>
          Amy a choisi.
        </p>

        <p>
          L’Effaceur est là.
        </p>

        <p>
          Les Gardiens se préparent.
        </p>

        <p>
          L’équipe part.
        </p>

        <p class="impact-text">
          LES LIGNES BOUGENT.
        </p>
      `
    );

  }

}


linesMoveButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.linesMove;


        const expected =
          linesMoveOrder[
            linesMoveProgress
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


        linesMoveProgress++;


        localStorage.setItem(
          STORAGE_LINES_MOVE,
          linesMoveProgress
        );


        updateOrderedButtons(
          linesMoveButtons,
          linesMoveProgress
        );


        setRevealHTML(
          linesMoveReveal,
          `
            <p>
              ${linesMoveTexts[selected]}
            </p>
          `
        );


        playDarkSound();


        if (
          linesMoveProgress >= 5
        ) {

          setRevealHTML(
            linesMoveReveal,
            `
              <p>
                Les deux camps
                savent désormais
                qu’ils vont se rencontrer.
              </p>

              <p class="impact-text">
                PERSONNE
                N’AVANCE PLUS
                DANS L’OMBRE.
              </p>

              <p class="name-reveal">
                LES GARDIENS
                LES ATTENDENT.
              </p>
            `
          );


          showSecret(
            "lines-are-moving",
            "L’expédition avance vers un refuge où le Maître Noir a déjà ordonné aux Gardiens de les attendre."
          );

        }

      }
    );

  });


restoreLinesMove();


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-63"
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
   SON D’AMBIANCE
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


function playBiologySound() {

  playTone(
    360,
    0.5,
    0.018,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        510,
        0.7,
        0.015,
        "triangle"
      );

    },
    130
  );


  setTimeout(
    () => {

      playTone(
        680,
        0.75,
        0.012,
        "sine"
      );

    },
    250
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
