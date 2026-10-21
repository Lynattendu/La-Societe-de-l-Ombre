/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 15 — LE JEU COMMENCE
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

const STORAGE_PREFIX =
  "societeOmbre_chapitre15_";

const STORAGE_SCROLL =
  STORAGE_PREFIX + "scroll";

const STORAGE_PROGRESS =
  STORAGE_PREFIX + "progression";

const STORAGE_COMPLETED =
  STORAGE_PREFIX + "termine";

const STORAGE_SECRETS =
  STORAGE_PREFIX + "secrets";

const STORAGE_ISABEL_WATCH =
  STORAGE_PREFIX + "isabelWatch";

const STORAGE_MOLE_STRATEGY =
  STORAGE_PREFIX + "moleStrategy";

const STORAGE_TRAP_PLAN =
  STORAGE_PREFIX + "trapPlan";

const STORAGE_ANNA_MAX =
  STORAGE_PREFIX + "annaMax";

const STORAGE_HOPE_ANNA =
  STORAGE_PREFIX + "hopeAnna";

const STORAGE_BLACK_HACIENDA =
  STORAGE_PREFIX + "blackHacienda";

const STORAGE_BLACK_MASTER =
  STORAGE_PREFIX + "blackMaster";

const STORAGE_AMY_SURVIVAL =
  STORAGE_PREFIX + "amySurvival";

const STORAGE_CHAPEL =
  STORAGE_PREFIX + "chapel";

const STORAGE_DEAD_DROP =
  STORAGE_PREFIX + "deadDrop";

const STORAGE_OLD_SYMBOL =
  STORAGE_PREFIX + "oldSymbol";

const STORAGE_FIRST_SIGNAL =
  STORAGE_PREFIX + "firstSignal";

const STORAGE_HALE_MEMORY =
  STORAGE_PREFIX + "haleMemory";

const STORAGE_ORIGIN_TRACE =
  STORAGE_PREFIX + "originTrace";


/* =========================================================
   COMPATIBILITÉ ANCIENNE FIN
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre15_finished"
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
    "chapitre15.html?lecture=recommencer";

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


/* =========================================================
   INTERACTION 1
   ISABEL SOUS SURVEILLANCE
========================================================= */

const isabelWatchReveal =
  document.getElementById(
    "isabelWatchReveal"
  );


let isabelWatchObserved =
  getStoredArray(
    STORAGE_ISABEL_WATCH
  );


const isabelWatchTexts = {

  routine:
    "Isabel traverse l’hacienda exactement comme d’habitude. Aucun geste inhabituel. Aucun changement visible.",

  smile:
    "Son sourire reste discret, professionnel, parfaitement naturel.",

  work:
    "Elle vérifie une livraison, échange avec une employée et poursuit son travail comme elle le fait depuis des années.",

  hale:
    "Hale, lui, ne peut plus la regarder de la même manière. Il doit pourtant faire semblant.",

  years:
    "Isabel travaille ici depuis dix-huit ans. Presque toute la vie d’Anna."

};


document
  .querySelectorAll(
    ".isabel-watch-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.isabelWatch;


        isabelWatchObserved =
          addStoredValue(
            STORAGE_ISABEL_WATCH,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          isabelWatchReveal,
          `
            <p>
              ${isabelWatchTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          isabelWatchObserved.length >= 5
        ) {

          setRevealHTML(
            isabelWatchReveal,
            `
              <p>
                Routine parfaite.
              </p>

              <p>
                Aucun excès.
              </p>

              <p>
                Aucun comportement suspect.
              </p>

              <p>
                Dix-huit années
                sans attirer l’attention.
              </p>

              <p class="impact-text">
                C’EST JUSTEMENT
                POUR ÇA QU’ELLE EST BONNE.
              </p>
            `
          );


          showSecret(
            "isabel-perfect-cover",
            "La meilleure couverture d’Isabel est précisément son absence totale de comportement suspect."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".isabel-watch-trigger"
  )
  .forEach((button) => {

    if (
      isabelWatchObserved.includes(
        button.dataset.isabelWatch
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  isabelWatchObserved.length >= 5
) {

  setRevealHTML(
    isabelWatchReveal,
    `
      <p>
        Dix-huit années.
      </p>

      <p class="impact-text">
        AUCUN FAUX PAS.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 2
   UTILISER LA TAUPE
========================================================= */

const moleStrategyReveal =
  document.getElementById(
    "moleStrategyReveal"
  );


let moleStrategyObserved =
  getStoredArray(
    STORAGE_MOLE_STRATEGY
  );


const moleStrategyTexts = {

  arrest:
    "L’arrêter immédiatement permettrait de neutraliser Isabel, mais détruirait la piste vers ceux à qui elle transmet.",

  question:
    "L’interroger pourrait confirmer certaines choses, mais l’obligerait à comprendre qu’elle est découverte.",

  watch:
    "La surveiller permet de transformer son avantage en faiblesse sans modifier son comportement.",

  feed:
    "Une fausse information connue seulement d’Isabel peut révéler si elle transmet encore, et peut-être à qui."

};


document
  .querySelectorAll(
    ".mole-strategy-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.moleStrategy;


        moleStrategyObserved =
          addStoredValue(
            STORAGE_MOLE_STRATEGY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          moleStrategyReveal,
          `
            <p>
              ${moleStrategyTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          moleStrategyObserved.length >= 4
        ) {

          setRevealHTML(
            moleStrategyReveal,
            `
              <p>
                Ne pas l’arrêter.
              </p>

              <p>
                Ne pas modifier
                son environnement.
              </p>

              <p>
                Continuer à l’observer.
              </p>

              <p class="impact-text">
                LUI DONNER
                UNE FAUSSE INFORMATION.
              </p>

              <p class="emphasis">
                Une taupe identifiée
                peut devenir un chemin
                vers son réseau.
              </p>
            `
          );


          showSecret(
            "mole-used-as-bait",
            "Lucy, Hale et Clive décident de transformer Isabel en outil d’observation plutôt que de l’arrêter."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".mole-strategy-trigger"
  )
  .forEach((button) => {

    if (
      moleStrategyObserved.includes(
        button.dataset.moleStrategy
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  moleStrategyObserved.length >= 4
) {

  setRevealHTML(
    moleStrategyReveal,
    `
      <p class="impact-text">
        ISABEL DEVIENT L’APPÂT.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 3
   CONSTRUIRE LE PIÈGE
========================================================= */

const trapPlanReveal =
  document.getElementById(
    "trapPlanReveal"
  );


const trapPlanButtons =
  document.querySelectorAll(
    ".trap-plan-trigger"
  );


const trapPlanOrder = [
  "move",
  "medical",
  "vehicle",
  "schedule",
  "exclusive"
];


let trapPlanProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_TRAP_PLAN
    ) || "0",
    10
  );


const trapPlanTexts = {

  move:
    "La première couche du piège est simple : faire croire qu’Anna quittera l’Hacienda Awake.",

  medical:
    "La raison paraît crédible : de nouveaux examens liés aux révélations concernant sa naissance.",

  vehicle:
    "Un véhicule doit être officiellement prévu pour rendre le déplacement crédible.",

  schedule:
    "Le planning doit être modifié par les circuits administratifs habituels.",

  exclusive:
    "L’information doit parvenir à Isabel naturellement, sans qu’aucune autre personne n’en ait besoin."

};


function restoreTrapPlan() {

  trapPlanButtons.forEach(
    (button, index) => {

      if (
        index < trapPlanProgress
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
    trapPlanProgress >= 5
  ) {

    setRevealHTML(
      trapPlanReveal,
      `
        <p>
          Faux déplacement.
        </p>

        <p>
          Raison médicale.
        </p>

        <p>
          Véhicule.
        </p>

        <p>
          Planning modifié.
        </p>

        <p class="impact-text">
          UNE SEULE PERSONNE
          DOIT CONNAÎTRE L’INFORMATION.
        </p>

        <p class="emphasis">
          Anna,
          elle,
          ne bougera jamais.
        </p>
      `
    );

  }

}


trapPlanButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.trapPlan;


        const expected =
          trapPlanOrder[
            trapPlanProgress
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


        trapPlanProgress++;


        localStorage.setItem(
          STORAGE_TRAP_PLAN,
          trapPlanProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          trapPlanReveal,
          `
            <p>
              ${trapPlanTexts[selected]}
            </p>
          `
        );


        playDataSound();


        if (
          trapPlanProgress >= 5
        ) {

          setRevealHTML(
            trapPlanReveal,
            `
              <p>
                Déplacement fictif.
              </p>

              <p>
                Examens médicaux.
              </p>

              <p>
                Véhicule prévu.
              </p>

              <p>
                Planning modifié.
              </p>

              <p class="impact-text">
                INFORMATION RÉSERVÉE
                À ISABEL.
              </p>

              <p class="emphasis">
                Le but n’est pas
                de déplacer Anna.
                Le but est d’observer
                l’information.
              </p>
            `
          );


          showSecret(
            "false-anna-transfer",
            "Le faux transfert médical d’Anna est conçu uniquement pour révéler si Isabel transmet l’information."
          );

        }

      }
    );

  });


restoreTrapPlan();


/* =========================================================
   INTERACTION 4
   ANNA ET MAX
========================================================= */

const annaMaxReveal =
  document.getElementById(
    "annaMaxReveal"
  );


let annaMaxObserved =
  getStoredArray(
    STORAGE_ANNA_MAX
  );


const annaMaxTexts = {

  origin:
    "L’origine d’Anna explique peut-être comment elle est apparue, mais elle ne suffit pas à définir toute sa personne.",

  genetics:
    "La génétique peut influencer des capacités, des réactions ou certaines particularités, sans décider d’un destin.",

  coffee:
    "Anna déteste le café alors que Betty l’adore. Max utilise cette différence très simple pour lui rappeler que l’hérédité n’explique déjà pas tout.",

  abilities:
    "Un talent exceptionnel ne dit pas à celui qui le possède ce qu’il doit en faire.",

  choice:
    "Pour Max, la part essentielle vient ensuite : chacun décide comment utiliser ce qu’il possède."

};


document
  .querySelectorAll(
    ".anna-max-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.annaMax;


        annaMaxObserved =
          addStoredValue(
            STORAGE_ANNA_MAX,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          annaMaxReveal,
          `
            <p>
              ${annaMaxTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          annaMaxObserved.length >= 5
        ) {

          setRevealHTML(
            annaMaxReveal,
            `
              <p>
                Origine.
              </p>

              <p>
                Génétique.
              </p>

              <p>
                Capacités.
              </p>

              <p>
                Expérience.
              </p>

              <p class="impact-text">
                CHOIX.
              </p>

              <p class="emphasis">
                L’origine explique
                peut-être pourquoi
                Anna existe.
                Elle ne décide pas
                de ce qu’elle fera.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".anna-max-trigger"
  )
  .forEach((button) => {

    if (
      annaMaxObserved.includes(
        button.dataset.annaMax
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  annaMaxObserved.length >= 5
) {

  setRevealHTML(
    annaMaxReveal,
    `
      <p class="impact-text">
        C’EST ANNA QUI CHOISIT.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 5
   HOPE ET ANNA
========================================================= */

const hopeAnnaReveal =
  document.getElementById(
    "hopeAnnaReveal"
  );


let hopeAnnaObserved =
  getStoredArray(
    STORAGE_HOPE_ANNA
  );


const hopeAnnaTexts = {

  anger:
    "Hope confirme immédiatement qu’Anna a le droit d’être en colère contre Betty.",

  understanding:
    "Comprendre pourquoi Betty a menti ne transforme pas automatiquement ce mensonge en décision juste.",

  forgive:
    "Le pardon peut venir un jour, mais il n’a aucune obligation d’être immédiat.",

  balance:
    "Hope pense qu’un lien existe entre Anna, la fiole et l’Équilibre, mais refuse d’en tirer une conclusion définitive.",

  danger:
    "Tout individu peut devenir dangereux. Ce sont les moyens disponibles et les choix qui changent l’ampleur du risque.",

  freedom:
    "Pour Hope, le danger véritable serait qu’un autre groupe décide à la place d’Anna de ce qu’elle doit devenir."

};


document
  .querySelectorAll(
    ".hope-anna-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.hopeAnna;


        hopeAnnaObserved =
          addStoredValue(
            STORAGE_HOPE_ANNA,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          hopeAnnaReveal,
          `
            <p>
              ${hopeAnnaTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          hopeAnnaObserved.length >= 6
        ) {

          setRevealHTML(
            hopeAnnaReveal,
            `
              <p>
                Colère.
              </p>

              <p>
                Compréhension.
              </p>

              <p>
                Pardon.
              </p>

              <p>
                Équilibre.
              </p>

              <p>
                Danger.
              </p>

              <p class="impact-text">
                LIBERTÉ.
              </p>

              <p class="emphasis">
                Le danger serait
                que quelqu’un d’autre
                décide à la place d’Anna.
              </p>
            `
          );


          showSecret(
            "anna-choice-protected",
            "Hope refuse que la nature d’Anna soit utilisée pour lui imposer une destinée."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".hope-anna-trigger"
  )
  .forEach((button) => {

    if (
      hopeAnnaObserved.includes(
        button.dataset.hopeAnna
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  hopeAnnaObserved.length >= 6
) {

  setRevealHTML(
    hopeAnnaReveal,
    `
      <p class="impact-text">
        PERSONNE NE DÉCIDERA
        À SA PLACE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 6
   HACIENDA DU MAÎTRE NOIR
========================================================= */

const blackHaciendaReveal =
  document.getElementById(
    "blackHaciendaReveal"
  );


let blackHaciendaObserved =
  getStoredArray(
    STORAGE_BLACK_HACIENDA
  );


const blackHaciendaTexts = {

  domain:
    "Le domaine semble paisible, isolé et parfaitement entretenu au milieu des montagnes.",

  stone:
    "La pierre sombre et le bois ancien donnent à l’hacienda une apparence traditionnelle et presque intemporelle.",

  gardens:
    "Les jardins sont entretenus avec une précision qui ne laisse rien deviner des activités du lieu.",

  galleries:
    "Sous le bâtiment principal existe pourtant un réseau de galeries bien plus ancien que l’hacienda actuelle.",

  room:
    "Dans l’une des salles souterraines, le Maître Noir reçoit et analyse ses informations."

};


document
  .querySelectorAll(
    ".black-hacienda-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.blackHacienda;


        blackHaciendaObserved =
          addStoredValue(
            STORAGE_BLACK_HACIENDA,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          blackHaciendaReveal,
          `
            <p>
              ${blackHaciendaTexts[type]}
            </p>
          `
        );


        playDarkSound();


        if (
          blackHaciendaObserved.length >= 5
        ) {

          setRevealHTML(
            blackHaciendaReveal,
            `
              <p>
                Hacienda isolée.
              </p>

              <p>
                Apparence paisible.
              </p>

              <p>
                Jardins entretenus.
              </p>

              <p>
                Galeries anciennes.
              </p>

              <p class="name-reveal">
                LE MAÎTRE NOIR.
              </p>
            `
          );


          showSecret(
            "black-master-hacienda",
            "Le Maître Noir opère depuis une ancienne hacienda des montagnes de l’Hidalgo, construite au-dessus de galeries souterraines."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".black-hacienda-trigger"
  )
  .forEach((button) => {

    if (
      blackHaciendaObserved.includes(
        button.dataset.blackHacienda
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  blackHaciendaObserved.length >= 5
) {

  setRevealHTML(
    blackHaciendaReveal,
    `
      <p class="name-reveal">
        LE MAÎTRE NOIR.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 7
   LE MAÎTRE NOIR DÉTECTE LE PIÈGE
========================================================= */

const blackMasterReveal =
  document.getElementById(
    "blackMasterReveal"
  );


const blackMasterButtons =
  document.querySelectorAll(
    ".black-master-trigger"
  );


const blackMasterOrder = [
  "read",
  "clean",
  "logical",
  "easy",
  "trap"
];


let blackMasterProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_BLACK_MASTER
    ) || "0",
    10
  );


const blackMasterTexts = {

  read:
    "Le Maître Noir reçoit l’information concernant un transfert médical exceptionnel d’Anna.",

  clean:
    "Le message est trop propre. Aucun détail superflu, aucune imperfection naturelle.",

  logical:
    "La justification est trop logique : de nouveaux examens après les révélations sur sa naissance.",

  easy:
    "L’information arrive trop facilement à quelqu’un qui sait qu’Isabel peut être compromise.",

  trap:
    "Conclusion : Lucy, Clive et Hale testent probablement leur taupe."

};


function restoreBlackMaster() {

  blackMasterButtons.forEach(
    (button, index) => {

      if (
        index < blackMasterProgress
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
    blackMasterProgress >= 5
  ) {

    setRevealHTML(
      blackMasterReveal,
      `
        <p>
          Trop propre.
        </p>

        <p>
          Trop logique.
        </p>

        <p>
          Trop facile.
        </p>

        <p class="name-reveal">
          UN PIÈGE.
        </p>

        <p class="emphasis">
          Et le Maître Noir
          choisit volontairement
          d’y répondre.
        </p>
      `
    );

  }

}


blackMasterButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.blackMaster;


        const expected =
          blackMasterOrder[
            blackMasterProgress
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


        blackMasterProgress++;


        localStorage.setItem(
          STORAGE_BLACK_MASTER,
          blackMasterProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          blackMasterReveal,
          `
            <p>
              ${blackMasterTexts[selected]}
            </p>
          `
        );


        playDeductionSound();


        if (
          blackMasterProgress >= 5
        ) {

          setRevealHTML(
            blackMasterReveal,
            `
              <p>
                Trop propre.
              </p>

              <p>
                Trop logique.
              </p>

              <p>
                Trop facile.
              </p>

              <p class="name-reveal">
                UN PIÈGE.
              </p>

              <p class="impact-text">
                MAIS IL VA FAIRE
                SEMBLANT D’Y CROIRE.
              </p>
            `
          );


          showSecret(
            "black-master-sees-trap",
            "Le Maître Noir comprend immédiatement que le faux transfert d’Anna est probablement un piège."
          );

        }

      }
    );

  });


restoreBlackMaster();


/* =========================================================
   INTERACTION 8
   AMY SURVIT
========================================================= */

const amySurvivalReveal =
  document.getElementById(
    "amySurvivalReveal"
  );


let amySurvivalObserved =
  getStoredArray(
    STORAGE_AMY_SURVIVAL
  );


const amySurvivalTexts = {

  injury:
    "Amy a survécu à la chute, mais son épaule est bandée et son corps porte encore de nombreuses blessures.",

  man:
    "Un homme affirme avoir empêché Amy de se noyer. Il travaille manifestement pour le même réseau qu’elle.",

  tablet:
    "Sa tablette a été laissée à portée de main, signe que quelqu’un voulait qu’elle lise un ordre précis.",

  order:
    "Le message est direct : MISSION A.F. SUSPENDUE.",

  anna:
    "Amy regarde la photographie d’Anna. Son expression montre clairement qu’un ordre ne suffira plus à refermer cette histoire."

};


document
  .querySelectorAll(
    ".amy-survival-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.amySurvival;


        amySurvivalObserved =
          addStoredValue(
            STORAGE_AMY_SURVIVAL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          amySurvivalReveal,
          `
            <p>
              ${amySurvivalTexts[type]}
            </p>
          `
        );


        playDangerSound();


        if (
          amySurvivalObserved.length >= 5
        ) {

          setRevealHTML(
            amySurvivalReveal,
            `
              <p>
                Amy est vivante.
              </p>

              <p>
                Elle est blessée.
              </p>

              <p>
                Sa mission
                est suspendue.
              </p>

              <p class="impact-text">
                MAIS ELLE N’A PAS
                TOURNÉ LA PAGE.
              </p>

              <p class="emphasis">
                Anna est devenue
                son affaire.
                Hope aussi.
              </p>
            `
          );


          showSecret(
            "amy-alive",
            "Amy a survécu à la chute et reçoit l’ordre de suspendre sa mission concernant Anna."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".amy-survival-trigger"
  )
  .forEach((button) => {

    if (
      amySurvivalObserved.includes(
        button.dataset.amySurvival
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  amySurvivalObserved.length >= 5
) {

  setRevealHTML(
    amySurvivalReveal,
    `
      <p class="impact-text">
        AMY EST VIVANTE.
      </p>

      <p>
        Mission A.F. suspendue.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 9
   L'ORATOIRE
========================================================= */

const chapelReveal =
  document.getElementById(
    "chapelReveal"
  );


let chapelObserved =
  getStoredArray(
    STORAGE_CHAPEL
  );


const chapelTexts = {

  time:
    "Isabel s’arrête seulement une quinzaine de secondes. Suffisamment peu pour que le geste paraisse anodin.",

  chapel:
    "Elle entre dans l’ancien oratoire du jardin, un endroit où personne ne s’étonnerait d’un bref passage.",

  candle:
    "Clive remarque pourtant un geste précis : Isabel déplace une bougie.",

  habit:
    "Après deux jours d’observation, Clive affirme qu’Isabel ne s’arrête normalement jamais ici pour prier.",

  wait:
    "Hale veut vérifier immédiatement. Clive et Lucy refusent : toute fouille trop rapide pourrait avertir Isabel."

};


document
  .querySelectorAll(
    ".chapel-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.chapel;


        chapelObserved =
          addStoredValue(
            STORAGE_CHAPEL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          chapelReveal,
          `
            <p>
              ${chapelTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          chapelObserved.length >= 5
        ) {

          setRevealHTML(
            chapelReveal,
            `
              <p>
                Quinze secondes.
              </p>

              <p>
                Ancien oratoire.
              </p>

              <p>
                Une bougie déplacée.
              </p>

              <p class="impact-text">
                UN GESTE
                QUI N’APPARTIENT PAS
                À SA ROUTINE.
              </p>

              <p class="emphasis">
                Ils attendront
                avant d’intervenir.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".chapel-trigger"
  )
  .forEach((button) => {

    if (
      chapelObserved.includes(
        button.dataset.chapel
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  chapelObserved.length >= 5
) {

  setRevealHTML(
    chapelReveal,
    `
      <p class="impact-text">
        LA BOUGIE.
      </p>

      <p>
        Quelque chose
        vient de changer.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 10
   DÉPÔT MORT
========================================================= */

const deadDropReveal =
  document.getElementById(
    "deadDropReveal"
  );


const deadDropButtons =
  document.querySelectorAll(
    ".dead-drop-trigger"
  );


const deadDropOrder = [
  "candle",
  "wood",
  "cavity",
  "empty",
  "mark"
];


let deadDropProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_DEAD_DROP
    ) || "0",
    10
  );


const deadDropTexts = {

  candle:
    "Clive commence par reproduire le geste d’Isabel autour de la bougie.",

  wood:
    "Derrière le meuble, une plaque de bois possède un jeu presque imperceptible.",

  cavity:
    "La plaque dissimule une minuscule cavité.",

  empty:
    "La cavité est vide. Quelque chose a peut-être déjà été récupéré.",

  mark:
    "Au fond, Clive remarque une marque infime qui n’a rien à voir avec le mécanisme."

};


function restoreDeadDrop() {

  deadDropButtons.forEach(
    (button, index) => {

      if (
        index < deadDropProgress
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
    deadDropProgress >= 5
  ) {

    setRevealHTML(
      deadDropReveal,
      `
        <p>
          Bougie.
        </p>

        <p>
          Plaque de bois.
        </p>

        <p>
          Cavité cachée.
        </p>

        <p>
          Vide.
        </p>

        <p class="name-reveal">
          DÉPÔT MORT.
        </p>

        <p class="emphasis">
          Isabel peut transmettre
          sans rencontrer directement
          son contact.
        </p>
      `
    );

  }

}


deadDropButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.deadDrop;


        const expected =
          deadDropOrder[
            deadDropProgress
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


        deadDropProgress++;


        localStorage.setItem(
          STORAGE_DEAD_DROP,
          deadDropProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          deadDropReveal,
          `
            <p>
              ${deadDropTexts[selected]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          deadDropProgress >= 5
        ) {

          setRevealHTML(
            deadDropReveal,
            `
              <p>
                Bougie.
              </p>

              <p>
                Plaque de bois.
              </p>

              <p>
                Cavité.
              </p>

              <p>
                Vide.
              </p>

              <p class="name-reveal">
                DÉPÔT MORT.
              </p>

              <p class="impact-text">
                ET UNE MARQUE
                AU FOND.
              </p>
            `
          );


          showSecret(
            "dead-drop",
            "Isabel utilise probablement un dépôt mort permettant de transmettre des informations sans rencontrer directement son contact."
          );

        }

      }
    );

  });


restoreDeadDrop();


/* =========================================================
   INTERACTION 11
   ANCIEN SYMBOLE
========================================================= */

const oldSymbolReveal =
  document.getElementById(
    "oldSymbolReveal"
  );


let oldSymbolObserved =
  getStoredArray(
    STORAGE_OLD_SYMBOL
  );


const oldSymbolTexts = {

  shape:
    "La marque est minuscule, volontairement discrète et différente des inscriptions ordinaires de l’oratoire.",

  files:
    "Lucy compare sa géométrie à plusieurs éléments déjà présents dans les archives de l’enquête.",

  dead:
    "Une ressemblance apparaît avec certains dossiers concernant des hommes officiellement morts.",

  transmissions:
    "D’autres correspondances renvoient à d’anciennes transmissions anonymes ou masquées.",

  older:
    "Certaines de ces traces sont antérieures à l’arrivée d’Isabel à l’Hacienda Flores."

};


document
  .querySelectorAll(
    ".old-symbol-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.oldSymbol;


        oldSymbolObserved =
          addStoredValue(
            STORAGE_OLD_SYMBOL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          oldSymbolReveal,
          `
            <p>
              ${oldSymbolTexts[type]}
            </p>
          `
        );


        playMemorySound();


        if (
          oldSymbolObserved.length >= 5
        ) {

          setRevealHTML(
            oldSymbolReveal,
            `
              <p>
                Symbole discret.
              </p>

              <p>
                Dossiers anciens.
              </p>

              <p>
                Hommes officiellement morts.
              </p>

              <p>
                Transmissions anciennes.
              </p>

              <p class="impact-text">
                PLUS ANCIEN
                QU’ISABEL.
              </p>
            `
          );


          showSecret(
            "network-before-isabel",
            "Le symbole relie le dépôt d’Isabel à un réseau d’informations plus ancien que sa présence à l’hacienda."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".old-symbol-trigger"
  )
  .forEach((button) => {

    if (
      oldSymbolObserved.includes(
        button.dataset.oldSymbol
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  oldSymbolObserved.length >= 5
) {

  setRevealHTML(
    oldSymbolReveal,
    `
      <p class="impact-text">
        LE RÉSEAU EXISTAIT
        AVANT ISABEL.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 12
   PREMIER SIGNAL
========================================================= */

const firstSignalReveal =
  document.getElementById(
    "firstSignalReveal"
  );


const firstSignalButtons =
  document.querySelectorAll(
    ".first-signal-trigger"
  );


const firstSignalOrder = [
  "date",
  "birth",
  "message",
  "recipient",
  "reactivation"
];


let firstSignalProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_FIRST_SIGNAL
    ) || "0",
    10
  );


const firstSignalTexts = {

  date:
    "Un fichier remonte à dix-neuf ans auparavant.",

  birth:
    "La date correspond à quelques mois seulement après la naissance d’Anna.",

  message:
    "Le texte est bref : « LE SIGNAL A ÉTÉ CONFIRMÉ AU MEXIQUE. L’ENFANT EXISTE. »",

  recipient:
    "L’origine du fichier reste inconnue et le destinataire a été masqué.",

  reactivation:
    "Une trace encore plus proche de la naissance d’Anna contient un seul terme : RÉACTIVATION."

};


function restoreFirstSignal() {

  firstSignalButtons.forEach(
    (button, index) => {

      if (
        index < firstSignalProgress
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
    firstSignalProgress >= 5
  ) {

    setRevealHTML(
      firstSignalReveal,
      `
        <p>
          Dix-neuf ans.
        </p>

        <p>
          Naissance d’Anna.
        </p>

        <p class="impact-text">
          LE SIGNAL A ÉTÉ CONFIRMÉ
          AU MEXIQUE.
        </p>

        <p class="name-reveal">
          L’ENFANT EXISTE.
        </p>

        <p>
          Destinataire inconnu.
        </p>

        <p class="emphasis">
          RÉACTIVATION.
        </p>
      `
    );

  }

}


firstSignalButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.firstSignal;


        const expected =
          firstSignalOrder[
            firstSignalProgress
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


        firstSignalProgress++;


        localStorage.setItem(
          STORAGE_FIRST_SIGNAL,
          firstSignalProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          firstSignalReveal,
          `
            <p>
              ${firstSignalTexts[selected]}
            </p>
          `
        );


        playRevealSound();


        if (
          firstSignalProgress >= 5
        ) {

          setRevealHTML(
            firstSignalReveal,
            `
              <p>
                Dix-neuf ans plus tôt.
              </p>

              <p>
                Quelques mois
                après la naissance d’Anna.
              </p>

              <p class="impact-text">
                LE SIGNAL A ÉTÉ CONFIRMÉ
                AU MEXIQUE.
              </p>

              <p class="name-reveal">
                L’ENFANT EXISTE.
              </p>

              <p>
                Origine inconnue.
              </p>

              <p>
                Destinataire masqué.
              </p>

              <p class="emphasis">
                RÉACTIVATION.
              </p>
            `
          );


          showSecret(
            "first-signal",
            "Un réseau inconnu savait qu’Anna existait quelques mois seulement après sa naissance."
          );

        }

      }
    );

  });


restoreFirstSignal();


/* =========================================================
   INTERACTION 13
   SOUVENIR DE HALE
========================================================= */

const haleMemoryReveal =
  document.getElementById(
    "haleMemoryReveal"
  );


let haleMemoryObserved =
  getStoredArray(
    STORAGE_HALE_MEMORY
  );


const haleMemoryTexts = {

  vial:
    "Hale se souvient que sa mission initiale concernait une fiole ancienne conservée par Betty.",

  lee:
    "Maître Lee l’avait envoyé auprès des Flores pour surveiller cet objet et ce qu’il pourrait provoquer.",

  birth:
    "Puis Anna est née.",

  mark:
    "Le même jour, la marque de Sentinelle de Hale est apparue.",

  signal:
    "Les anciens messages montrent qu’ailleurs, presque au même moment, quelqu’un parlait d’un signal confirmé au Mexique."

};


document
  .querySelectorAll(
    ".hale-memory-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.haleMemory;


        haleMemoryObserved =
          addStoredValue(
            STORAGE_HALE_MEMORY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          haleMemoryReveal,
          `
            <p>
              ${haleMemoryTexts[type]}
            </p>
          `
        );


        playMemorySound();


        if (
          haleMemoryObserved.length >= 5
        ) {

          setRevealHTML(
            haleMemoryReveal,
            `
              <p>
                La fiole.
              </p>

              <p>
                Maître Lee.
              </p>

              <p>
                La naissance d’Anna.
              </p>

              <p>
                La marque de Hale.
              </p>

              <p class="impact-text">
                LE PREMIER SIGNAL.
              </p>

              <p class="emphasis">
                Plusieurs événements
                se sont déclenchés
                au même moment.
              </p>
            `
          );


          showSecret(
            "hale-mark-anna-birth",
            "La marque de Sentinelle de Hale est apparue le jour de la naissance d’Anna, alors que sa mission initiale concernait seulement la fiole."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".hale-memory-trigger"
  )
  .forEach((button) => {

    if (
      haleMemoryObserved.includes(
        button.dataset.haleMemory
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  haleMemoryObserved.length >= 5
) {

  setRevealHTML(
    haleMemoryReveal,
    `
      <p class="impact-text">
        LE JOUR OÙ ANNA EST NÉE,
        LA MARQUE EST APPARUE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 14
   LÀ OÙ TOUT A COMMENCÉ
========================================================= */

const originTraceReveal =
  document.getElementById(
    "originTraceReveal"
  );


const originTraceButtons =
  document.querySelectorAll(
    ".origin-trace-trigger"
  );


const originTraceOrder = [
  "anomaly",
  "hale",
  "lee",
  "signal",
  "outside"
];


let originTraceProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_ORIGIN_TRACE
    ) || "0",
    10
  );


const originTraceTexts = {

  anomaly:
    "Le système du Maître Noir détecte que l’Hacienda Flores remonte maintenant d’anciennes traces.",

  hale:
    "Hale est signalé comme actif. Pour le Maître Noir, cela signifie qu’il commence probablement à se souvenir.",

  lee:
    "Le Maître Noir s’interroge sur ce que Maître Lee a réellement révélé à Hale.",

  signal:
    "Une nouvelle trace reliée au tout premier signal vient d’être retrouvée.",

  outside:
    "Cette trace ne mène pas au Mexique."

};


function restoreOriginTrace() {

  originTraceButtons.forEach(
    (button, index) => {

      if (
        index < originTraceProgress
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
    originTraceProgress >= 5
  ) {

    setRevealHTML(
      originTraceReveal,
      `
        <p>
          Hacienda Flores
          remonte le fil.
        </p>

        <p>
          Hale est actif.
        </p>

        <p>
          Maître Lee
          cache peut-être encore
          quelque chose.
        </p>

        <p>
          Le premier signal
          réapparaît.
        </p>

        <p class="impact-text">
          PAS AU MEXIQUE.
        </p>

        <p class="name-reveal">
          LÀ OÙ TOUT A COMMENCÉ.
        </p>
      `
    );

  }

}


originTraceButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.originTrace;


        const expected =
          originTraceOrder[
            originTraceProgress
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


        originTraceProgress++;


        localStorage.setItem(
          STORAGE_ORIGIN_TRACE,
          originTraceProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          originTraceReveal,
          `
            <p>
              ${originTraceTexts[selected]}
            </p>
          `
        );


        playDarkSound();


        if (
          originTraceProgress >= 5
        ) {

          setRevealHTML(
            originTraceReveal,
            `
              <p>
                Hacienda Flores
                remonte le réseau.
              </p>

              <p>
                Hale se souvient.
              </p>

              <p>
                Le nom de Maître Lee
                revient.
              </p>

              <p>
                Une trace liée
                au premier signal
                vient d’être retrouvée.
              </p>

              <p class="impact-text">
                PAS AU MEXIQUE.
              </p>

              <p class="name-reveal">
                LÀ OÙ TOUT A COMMENCÉ.
              </p>
            `
          );


          showSecret(
            "origin-outside-mexico",
            "Une trace liée au tout premier signal conduit le Maître Noir vers un lieu situé hors du Mexique."
          );

        }

      }
    );

  });


restoreOriginTrace();


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-33"
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

  const oldMasterGain =
    masterGain;

  const oldOsc1 =
    ambienceOsc1;

  const oldOsc2 =
    ambienceOsc2;


  soundActive =
    false;


  if (soundBtn) {

    soundBtn.classList.remove(
      "sound-active"
    );


    soundBtn.textContent =
      "♫";

  }


  try {

    oldMasterGain?.gain
      .exponentialRampToValueAtTime(
        0.0001,
        oldAudioCtx.currentTime + 0.35
      );

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


function playDangerSound() {

  playTone(
    210,
    0.45,
    0.02,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        165,
        0.7,
        0.016,
        "sine"
      );

    },
    120
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
