/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 18 — LE PIÈGE
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
  "societeOmbre_chapitre18_";

const STORAGE_SCROLL =
  STORAGE_PREFIX + "scroll";

const STORAGE_PROGRESS =
  STORAGE_PREFIX + "progression";

const STORAGE_COMPLETED =
  STORAGE_PREFIX + "termine";

const STORAGE_SECRETS =
  STORAGE_PREFIX + "secrets";

const STORAGE_TRAP_DEPARTURE =
  STORAGE_PREFIX + "trapDeparture";

const STORAGE_TRAP_PURPOSE =
  STORAGE_PREFIX + "trapPurpose";

const STORAGE_ANNA_CREATED =
  STORAGE_PREFIX + "annaCreated";

const STORAGE_ABANDONED_FARM =
  STORAGE_PREFIX + "abandonedFarm";

const STORAGE_GAS_TRAP =
  STORAGE_PREFIX + "gasTrap";

const STORAGE_LUCY_TARGET =
  STORAGE_PREFIX + "lucyTarget";

const STORAGE_CAMERAS =
  STORAGE_PREFIX + "cameras";

const STORAGE_ROOT_MAX =
  STORAGE_PREFIX + "rootMax";

const STORAGE_PETER_GIFT =
  STORAGE_PREFIX + "peterGift";

const STORAGE_LEE_SIGNATURES =
  STORAGE_PREFIX + "leeSignatures";

const STORAGE_LUCY_SYMBOL =
  STORAGE_PREFIX + "lucySymbol";

const STORAGE_OLD_ORDER =
  STORAGE_PREFIX + "oldOrder";

const STORAGE_HALE_MISSION =
  STORAGE_PREFIX + "haleMission";

const STORAGE_PASSAGE_KEY =
  STORAGE_PREFIX + "passageKey";


/* =========================================================
   COMPATIBILITÉ ANCIENNE
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre18_finished"
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
    "chapitre18.html?lecture=recommencer";

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
   PARTIR VERS LE PIÈGE
========================================================= */

const trapDepartureReveal =
  document.getElementById(
    "trapDepartureReveal"
  );


let trapDepartureObserved =
  getStoredArray(
    STORAGE_TRAP_DEPARTURE
  );


const trapDepartureTexts = {

  coordinates:
    "Les coordonnées viennent directement du message récupéré dans le dépôt mort.",

  knowledge:
    "Lucy, Hale et Clive ne se font aucune illusion : la destination leur a été donnée volontairement.",

  team:
    "Ils décident malgré tout d’y aller ensemble.",

  risk:
    "Le danger est connu, mais ils doivent comprendre ce que les Gardiens cherchent à provoquer.",

  choice:
    "Ils acceptent volontairement d’entrer dans le jeu adverse."

};


document
  .querySelectorAll(
    ".trap-departure-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.trapDeparture;


        trapDepartureObserved =
          addStoredValue(
            STORAGE_TRAP_DEPARTURE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          trapDepartureReveal,
          `
            <p>
              ${trapDepartureTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          trapDepartureObserved.length >= 5
        ) {

          setRevealHTML(
            trapDepartureReveal,
            `
              <p>
                Ils savent.
              </p>

              <p>
                Ils comprennent le risque.
              </p>

              <p>
                Ils savent
                que l’ennemi les attend.
              </p>

              <p class="impact-text">
                ET ILS Y VONT
                QUAND MÊME.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".trap-departure-trigger"
  )
  .forEach((button) => {

    if (
      trapDepartureObserved.includes(
        button.dataset.trapDeparture
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  trapDepartureObserved.length >= 5
) {

  setRevealHTML(
    trapDepartureReveal,
    `
      <p class="impact-text">
        ILS ENTRENT
        VOLONTAIREMENT DANS LE PIÈGE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 2
   OBJECTIF DU PIÈGE
========================================================= */

const trapPurposeReveal =
  document.getElementById(
    "trapPurposeReveal"
  );


const trapPurposeButtons =
  document.querySelectorAll(
    ".trap-purpose-trigger"
  );


const trapPurposeOrder = [
  "easy",
  "isolated",
  "digital",
  "observe",
  "capture"
];


let trapPurposeProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_TRAP_PURPOSE
    ) || "0",
    10
  );


const trapPurposeTexts = {

  easy:
    "L’information récupérée est beaucoup trop simple à exploiter.",

  isolated:
    "La destination se trouve à l’écart de tout, dans une zone facile à contrôler.",

  digital:
    "Aucun relais numérique visible ne trahit pourtant une opération classique.",

  observe:
    "Clive comprend alors que les Gardiens ne cherchent peut-être pas à les éliminer mais à étudier leurs réactions.",

  capture:
    "Hale ajoute une possibilité plus inquiétante : capturer l’un d’eux vivant."

};


function restoreTrapPurpose() {

  trapPurposeButtons.forEach(
    (button, index) => {

      if (
        index < trapPurposeProgress
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
    trapPurposeProgress >= 5
  ) {

    setRevealHTML(
      trapPurposeReveal,
      `
        <p>
          Trop facile.
        </p>

        <p>
          Trop isolé.
        </p>

        <p>
          Trop propre.
        </p>

        <p class="impact-text">
          LES OBSERVER.
        </p>

        <p class="emphasis">
          Ou en capturer un.
        </p>
      `
    );

  }

}


trapPurposeButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.trapPurpose;


        const expected =
          trapPurposeOrder[
            trapPurposeProgress
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


        trapPurposeProgress++;


        localStorage.setItem(
          STORAGE_TRAP_PURPOSE,
          trapPurposeProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          trapPurposeReveal,
          `
            <p>
              ${trapPurposeTexts[selected]}
            </p>
          `
        );


        playDeductionSound();


        if (
          trapPurposeProgress >= 5
        ) {

          showSecret(
            "trap-purpose",
            "Le piège semble conçu avant tout pour observer Lucy, Hale et Clive, voire capturer l’un d’eux vivant."
          );

        }

      }
    );

  });


restoreTrapPurpose();


/* =========================================================
   INTERACTION 3
   ANNA / BETTY
========================================================= */

const annaCreatedReveal =
  document.getElementById(
    "annaCreatedReveal"
  );


let annaCreatedObserved =
  getStoredArray(
    STORAGE_ANNA_CREATED
  );


const annaCreatedTexts = {

  fear:
    "Betty reconnaît qu’elle avait peur dès le début, notamment parce qu’elle ignorait si Anna survivrait.",

  experiment:
    "Au commencement, la motivation de Betty était scientifique : savoir si cette création était possible.",

  survival:
    "Le projet pouvait échouer à tout moment, et Betty ne savait pas exactement ce qu’elle avait déclenché.",

  possible:
    "Puis quelque chose change : Anna cesse d’être seulement une possibilité scientifique.",

  daughter:
    "À partir de ce moment, arrêter l’expérience aurait signifié renoncer à Anna elle-même."

};


document
  .querySelectorAll(
    ".anna-created-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.annaCreated;


        annaCreatedObserved =
          addStoredValue(
            STORAGE_ANNA_CREATED,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          annaCreatedReveal,
          `
            <p>
              ${annaCreatedTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          annaCreatedObserved.length >= 5
        ) {

          setRevealHTML(
            annaCreatedReveal,
            `
              <p>
                Au début :
                une expérience.
              </p>

              <p>
                Puis :
                une possibilité.
              </p>

              <p class="impact-text">
                PUIS ANNA.
              </p>

              <p class="emphasis">
                Renoncer n’aurait plus été
                arrêter une expérience.
                C’était renoncer à elle.
              </p>
            `
          );


                 showSecret(
            "anna-became-person",
            "Pour Betty, le moment décisif survient lorsque continuer ou arrêter ne concerne plus une expérience mais Anna elle-même."
          );

        }

      }

    );

  });
document
  .querySelectorAll(
    ".anna-created-trigger"
  )
  .forEach((button) => {

    if (
      annaCreatedObserved.includes(
        button.dataset.annaCreated
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  annaCreatedObserved.length >= 5
) {

  setRevealHTML(
    annaCreatedReveal,
    `
      <p class="impact-text">
        C’ÉTAIT RENONCER À TOI.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 4
   EXPLOITATION ABANDONNÉE
========================================================= */

const abandonedFarmReveal =
  document.getElementById(
    "abandonedFarmReveal"
  );


let abandonedFarmObserved =
  getStoredArray(
    STORAGE_ABANDONED_FARM
  );


const abandonedFarmTexts = {

  movement:
    "Aucun mouvement visible autour des bâtiments.",

  thermal:
    "Le détecteur de Hale ne montre aucune signature thermique évidente.",

  silence:
    "Le calme est si complet qu’il devient lui-même suspect.",

  buildings:
    "La maison, les hangars et les silos offrent de nombreux angles morts.",

  split:
    "Lucy décide finalement qu’ils se sépareront légèrement, sans jamais sortir du champ visuel des autres."

};


document
  .querySelectorAll(
    ".abandoned-farm-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.abandonedFarm;


        abandonedFarmObserved =
          addStoredValue(
            STORAGE_ABANDONED_FARM,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          abandonedFarmReveal,
          `
            <p>
              ${abandonedFarmTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          abandonedFarmObserved.length >= 5
        ) {

          setRevealHTML(
            abandonedFarmReveal,
            `
              <p>
                Aucun mouvement.
              </p>

              <p>
                Aucune chaleur.
              </p>

              <p>
                Aucun signe visible.
              </p>

              <p class="impact-text">
                TROP RIEN.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".abandoned-farm-trigger"
  )
  .forEach((button) => {

    if (
      abandonedFarmObserved.includes(
        button.dataset.abandonedFarm
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  abandonedFarmObserved.length >= 5
) {

  setRevealHTML(
    abandonedFarmReveal,
    `
      <p class="impact-text">
        L’ABSENCE DE SIGNE
        EST DÉJÀ UN SIGNE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 5
   PIÈGE AU GAZ
========================================================= */

const gasTrapReveal =
  document.getElementById(
    "gasTrapReveal"
  );


const gasTrapButtons =
  document.querySelectorAll(
    ".gas-trap-trigger"
  );


const gasTrapOrder = [
  "symbol",
  "tracks",
  "noise",
  "grenade",
  "gas"
];


let gasTrapProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_GAS_TRAP
    ) || "0",
    10
  );


const gasTrapTexts = {

  symbol:
    "Le symbole des Gardiens a été placé bien en évidence sur le mur. Lucy le juge immédiatement trop évident.",

  tracks:
    "Hale découvre plusieurs traces récentes autour des bâtiments.",

  noise:
    "Un bruit sec annonce que quelque chose vient d’être déclenché.",

  grenade:
    "Une grenade roule dans la pièce où se trouve Lucy.",

  gas:
    "L’explosion ne projette ni feu ni éclats : elle libère une fumée blanche."

};


function restoreGasTrap() {

  gasTrapButtons.forEach(
    (button, index) => {

      if (
        index < gasTrapProgress
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
    gasTrapProgress >= 5
  ) {

    setRevealHTML(
      gasTrapReveal,
      `
        <p>
          Symbole trop visible.
        </p>

        <p>
          Traces récentes.
        </p>

        <p>
          Déclenchement.
        </p>

        <p>
          Grenade.
        </p>

        <p class="impact-text">
          GAZ.
        </p>
      `
    );

  }

}


gasTrapButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.gasTrap;


        const expected =
          gasTrapOrder[
            gasTrapProgress
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


        gasTrapProgress++;


        localStorage.setItem(
          STORAGE_GAS_TRAP,
          gasTrapProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          gasTrapReveal,
          `
            <p>
              ${gasTrapTexts[selected]}
            </p>
          `
        );


        playDarkSound();


        if (
          gasTrapProgress >= 5
        ) {

          showSecret(
            "gas-trap",
            "Le symbole des Gardiens servait d’appât : le vrai piège est conçu pour neutraliser plutôt que tuer."
          );

        }

      }
    );

  });


restoreGasTrap();


/* =========================================================
   INTERACTION 6
   LUCY EST LA CIBLE
========================================================= */

const lucyTargetReveal =
  document.getElementById(
    "lucyTargetReveal"
  );


let lucyTargetObserved =
  getStoredArray(
    STORAGE_LUCY_TARGET
  );


const lucyTargetTexts = {

  weapons:
    "Les assaillants utilisent surtout des armes incapacitantes plutôt que des armes létales.",

  alive:
    "Hale comprend qu’ils cherchent à les garder vivants.",

  house:
    "Deux assaillants convergent directement vers la maison où Lucy est isolée.",

  needle:
    "Dans la fumée, un homme tente d’approcher une aiguille du cou de Lucy.",

  lucy:
    "Tout indique que Lucy est la cible prioritaire de l’opération."

};


document
  .querySelectorAll(
    ".lucy-target-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.lucyTarget;


        lucyTargetObserved =
          addStoredValue(
            STORAGE_LUCY_TARGET,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          lucyTargetReveal,
          `
            <p>
              ${lucyTargetTexts[type]}
            </p>
          `
        );


        playDarkSound();


        if (
          lucyTargetObserved.length >= 5
        ) {

          setRevealHTML(
            lucyTargetReveal,
            `
              <p>
                Armes incapacitantes.
              </p>

              <p>
                Aiguille.
              </p>

              <p>
                Convergence vers la maison.
              </p>

              <p class="impact-text">
                ILS VEULENT LUCY.
              </p>
            `
          );


          showSecret(
            "lucy-primary-target",
            "Les assaillants semblent chercher à capturer Lucy vivante."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".lucy-target-trigger"
  )
  .forEach((button) => {

    if (
      lucyTargetObserved.includes(
        button.dataset.lucyTarget
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  lucyTargetObserved.length >= 5
) {

  setRevealHTML(
    lucyTargetReveal,
    `
      <p class="impact-text">
        LUCY EST LA CIBLE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 7
   LES CAMÉRAS
========================================================= */

const camerasReveal =
  document.getElementById(
    "camerasReveal"
  );


const camerasButtons =
  document.querySelectorAll(
    ".cameras-trigger"
  );


const camerasOrder = [
  "lens",
  "second",
  "watching",
  "dontshoot",
  "lookback"
];


let camerasProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_CAMERAS
    ) || "0",
    10
  );


const camerasTexts = {

  lens:
    "Lucy repère une petite lentille sur le toit du hangar.",

  second:
    "Une deuxième caméra confirme qu’il ne s’agit pas d’un dispositif isolé.",

  watching:
    "Le combat entier est probablement observé en direct.",

  dontshoot:
    "Lucy empêche Hale de détruire les caméras : leur existence est désormais une information utile.",

  lookback:
    "Elle choisit alors de regarder directement l’objectif pour faire comprendre aux observateurs qu’elle les a repérés."

};


function restoreCameras() {

  camerasButtons.forEach(
    (button, index) => {

      if (
        index < camerasProgress
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
    camerasProgress >= 5
  ) {

    setRevealHTML(
      camerasReveal,
      `
        <p>
          Une caméra.
        </p>

        <p>
          Puis une autre.
        </p>

        <p>
          Ils observent.
        </p>

        <p class="impact-text">
          LUCY LES REGARDE EN RETOUR.
        </p>
      `
    );

  }

}


camerasButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.cameras;


        const expected =
          camerasOrder[
            camerasProgress
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


        camerasProgress++;


        localStorage.setItem(
          STORAGE_CAMERAS,
          camerasProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          camerasReveal,
          `
            <p>
              ${camerasTexts[selected]}
            </p>
          `
        );


        playDeductionSound();


        if (
          camerasProgress >= 5
        ) {

          showSecret(
            "cameras-watch",
            "Les Gardiens utilisent l’exploitation pour observer directement les réactions du groupe."
          );

        }

      }
    );

  });


restoreCameras();


/* =========================================================
   INTERACTION 8
   ROOT / MAX
========================================================= */

const rootMaxReveal =
  document.getElementById(
    "rootMaxReveal"
  );


let rootMaxObserved =
  getStoredArray(
    STORAGE_ROOT_MAX
  );


const rootMaxTexts = {

  traces:
    "Root ne dit pas qu’elle croit aveuglément aux récits anciens : elle croit aux traces observables.",

  repetitions:
    "Les répétitions entre civilisations peuvent indiquer une origine commune derrière des récits différents.",

  ancients:
    "Après tout ce qu’elle a vécu, Root accepte désormais que l’hypothèse des Anciens mérite d’être étudiée sérieusement.",

  piece:
    "Face à quelque chose de trop grand, Root propose une méthode simple : comprendre un morceau à la fois.",

  feeling:
    "Max laisse échapper qu’il l’aime bien, puis réalise aussitôt ce qu’il vient de dire."

};


document
  .querySelectorAll(
    ".root-max-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.rootMax;


        rootMaxObserved =
          addStoredValue(
            STORAGE_ROOT_MAX,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          rootMaxReveal,
          `
            <p>
              ${rootMaxTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          rootMaxObserved.length >= 5
        ) {

          setRevealHTML(
            rootMaxReveal,
            `
              <p>
                Traces.
              </p>

              <p>
                Répétitions.
              </p>

              <p>
                Questions.
              </p>

              <p class="impact-text">
                UN MORCEAU À LA FOIS.
              </p>

              <p class="emphasis">
                Et peut-être
                un sentiment
                qui devient moins discret.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".root-max-trigger"
  )
  .forEach((button) => {

    if (
      rootMaxObserved.includes(
        button.dataset.rootMax
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  rootMaxObserved.length >= 5
) {

  setRevealHTML(
    rootMaxReveal,
    `
      <p class="impact-text">
        COMPRENDRE
        UN MORCEAU À LA FOIS.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 9
   LE CADEAU DE PETER
========================================================= */

const peterGiftReveal =
  document.getElementById(
    "peterGiftReveal"
  );


let peterGiftObserved =
  getStoredArray(
    STORAGE_PETER_GIFT
  );


const peterGiftTexts = {

  box:
    "Peter arrive avec un petit coffret qu’il ne veut pas encore ouvrir.",

  hide:
    "À la seconde où Betty le remarque, Peter le cache derrière lui.",

  betty:
    "Il finit par reconnaître que le cadeau est destiné à Betty.",

  apology:
    "Peter espère se faire pardonner grâce à la créature qu’il a préparée."

};


document
  .querySelectorAll(
    ".peter-gift-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.peterGift;


        peterGiftObserved =
          addStoredValue(
            STORAGE_PETER_GIFT,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          peterGiftReveal,
          `
            <p>
              ${peterGiftTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          peterGiftObserved.length >= 4
        ) {

          setRevealHTML(
            peterGiftReveal,
            `
              <p>
                Un coffret.
              </p>

              <p>
                Une créature.
              </p>

              <p>
                Un cadeau pour Betty.
              </p>

              <p class="impact-text">
                UNE TENTATIVE
                DE PARDON.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".peter-gift-trigger"
  )
  .forEach((button) => {

    if (
      peterGiftObserved.includes(
        button.dataset.peterGift
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  peterGiftObserved.length >= 4
) {

  setRevealHTML(
    peterGiftReveal,
    `
      <p class="impact-text">
        POUR BETTY.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 10
   LEE CONNAÎT LES SIGNATURES
========================================================= */

const leeSignaturesReveal =
  document.getElementById(
    "leeSignaturesReveal"
  );


let leeSignaturesObserved =
  getStoredArray(
    STORAGE_LEE_SIGNATURES
  );


const leeSignaturesTexts = {

  face:
    "Le visage de Maître Lee change à peine, mais Hope remarque immédiatement sa réaction.",

  anna:
    "Lee observe attentivement la signature biologique d’Anna.",

  hope:
    "Puis il compare celle d’Hope, apparue dans les nouveaux prélèvements.",

  knowledge:
    "Il reconnaît qu’il sait ce que ces signatures pourraient signifier.",

  answer:
    "Betty décide que cette fois, Lee ne quittera pas la pièce sans répondre."

};


document
  .querySelectorAll(
    ".lee-signatures-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.leeSignatures;


        leeSignaturesObserved =
          addStoredValue(
            STORAGE_LEE_SIGNATURES,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          leeSignaturesReveal,
          `
            <p>
              ${leeSignaturesTexts[type]}
            </p>
          `
        );


        playRevealSound();


        if (
          leeSignaturesObserved.length >= 5
        ) {

          setRevealHTML(
            leeSignaturesReveal,
            `
              <p>
                Lee reconnaît les données.
              </p>

              <p>
                Il connaît leur signification possible.
              </p>

              <p class="impact-text">
                IL SAIT QUELQUE CHOSE.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".lee-signatures-trigger"
  )
  .forEach((button) => {

    if (
      leeSignaturesObserved.includes(
        button.dataset.leeSignatures
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  );


if (
  leeSignaturesObserved.length >= 5
) {

  setRevealHTML(
    leeSignaturesReveal,
    `
      <p class="impact-text">
        MAÎTRE LEE SAIT.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 11
   LE SYMBOLE DE LUCY
========================================================= */

const lucySymbolReveal =
  document.getElementById(
    "lucySymbolReveal"
  );


const lucySymbolButtons =
  document.querySelectorAll(
    ".lucy-symbol-trigger"
  );


const lucySymbolOrder = [
  "trapdoor",
  "trap",
  "cavity",
  "guardians",
  "indecise"
];


let lucySymbolProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_LUCY_SYMBOL
    ) || "0",
    10
  );


const lucySymbolTexts = {

  trapdoor:
    "Clive découvre une ancienne trappe cachée sous un établi.",

  trap:
    "Comme prévu, son mécanisme contient lui-même un dispositif destiné à piéger celui qui l’ouvre.",

  cavity:
    "Sous la trappe se trouve une petite cavité presque entièrement vide.",

  guardians:
    "Un premier symbole gravé dans la pierre correspond aux Gardiens Noirs.",

  indecise:
    "À côté apparaît le symbole porté par Lucy : celui de l’Indécise."

};


function restoreLucySymbol() {

  lucySymbolButtons.forEach(
    (button, index) => {

      if (
        index < lucySymbolProgress
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
    lucySymbolProgress >= 5
  ) {

    setRevealHTML(
      lucySymbolReveal,
      `
        <p>
          Une trappe.
        </p>

        <p>
          Une cavité.
        </p>

        <p>
          Les Gardiens.
        </p>

        <p class="impact-text">
          L’INDÉCISE.
        </p>

        <p class="emphasis">
          Gravée dans une pierre
          plus ancienne que Lucy.
        </p>
      `
    );

  }

}


lucySymbolButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.lucySymbol;


        const expected =
          lucySymbolOrder[
            lucySymbolProgress
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


        lucySymbolProgress++;


        localStorage.setItem(
          STORAGE_LUCY_SYMBOL,
          lucySymbolProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          lucySymbolReveal,
          `
            <p>
              ${lucySymbolTexts[selected]}
            </p>
          `
        );


        playRevealSound();


        if (
          lucySymbolProgress >= 5
        ) {

          showSecret(
            "lucy-symbol-ancient",
            "Le symbole de l’Indécise était déjà gravé dans une cache des Gardiens bien avant la naissance de Lucy."
          );

        }

      }
    );

  });


restoreLucySymbol();


/* =========================================================
   INTERACTION 12
   ORDRE ORIGINEL
========================================================= */

const oldOrderReveal =
  document.getElementById(
    "oldOrderReveal"
  );


const oldOrderButtons =
  document.querySelectorAll(
    ".old-order-trigger"
  );


const oldOrderOrder = [
  "birth",
  "resonance",
  "marks",
  "both",
  "origin"
];


let oldOrderProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_OLD_ORDER
    ) || "0",
    10
  );


const oldOrderTexts = {

  birth:
    "Au moment de la naissance d’Anna, quelque chose change pour certains membres des anciens ordres.",

  resonance:
    "Maître Lee décrit le phénomène comme une résonance plutôt que comme une onde classique.",

  marks:
    "Certaines marques apparaissent ou réagissent à ce moment précis.",

  both:
    "Les Sentinelles ne sont pas les seules à l’avoir ressenti : les Gardiens Noirs aussi.",

  origin:
    "Lee révèle enfin que Sentinelles et Gardiens formaient autrefois un seul ordre."

};


function restoreOldOrder() {

  oldOrderButtons.forEach(
    (button, index) => {

      if (
        index < oldOrderProgress
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
    oldOrderProgress >= 5
  ) {

    setRevealHTML(
      oldOrderReveal,
      `
        <p>
          Naissance d’Anna.
        </p>

        <p>
          Résonance.
        </p>

        <p>
          Apparition des marques.
        </p>

        <p>
          Sentinelles.
        </p>

        <p>
          Gardiens.
        </p>

        <p class="impact-text">
          UN SEUL ORDRE
          À L’ORIGINE.
        </p>
      `
    );

  }

}


oldOrderButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.oldOrder;


        const expected =
          oldOrderOrder[
            oldOrderProgress
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


        oldOrderProgress++;


        localStorage.setItem(
          STORAGE_OLD_ORDER,
          oldOrderProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          oldOrderReveal,
          `
            <p>
              ${oldOrderTexts[selected]}
            </p>
          `
        );


        playRevealSound();


        if (
          oldOrderProgress >= 5
        ) {

          setRevealHTML(
            oldOrderReveal,
            `
              <p>
                Une même source.
              </p>

              <p>
                Un même ordre.
              </p>

              <p>
                Puis une séparation.
              </p>

              <p class="impact-text">
                PRÉSERVER
                OU CONTRÔLER.
              </p>
            `
          );


          showSecret(
            "orders-common-origin",
            "Sentinelles et Gardiens Noirs descendent d’un même ordre ancien lié aux Anciens."
          );

        }

      }
    );

  });


restoreOldOrder();


/* =========================================================
   INTERACTION 13
   MISSION INITIALE DE HALE
========================================================= */

const haleMissionReveal =
  document.getElementById(
    "haleMissionReveal"
  );


const haleMissionButtons =
  document.querySelectorAll(
    ".hale-mission-trigger"
  );


const haleMissionOrder = [
  "nearby",
  "vial",
  "birth",
  "mark",
  "protect"
];


let haleMissionProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_HALE_MISSION
    ) || "0",
    10
  );


const haleMissionTexts = {

  nearby:
    "Hale était déjà présent dans la région avant même la naissance d’Anna.",

  vial:
    "Sa mission initiale n’était pas de surveiller Betty ou Anna mais la fiole de sang ancien.",

  birth:
    "La naissance d’Anna provoque alors la résonance ressentie par les membres des deux ordres.",

  mark:
    "La marque de Hale apparaît précisément ce jour-là.",

  protect:
    "Maître Lee lui ordonne ensuite de rester et de protéger l’enfant."

};


function restoreHaleMission() {

  haleMissionButtons.forEach(
    (button, index) => {

      if (
        index < haleMissionProgress
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
    haleMissionProgress >= 5
  ) {

    setRevealHTML(
      haleMissionReveal,
      `
        <p>
          Hale était déjà là.
        </p>

        <p>
          Pour la fiole.
        </p>

        <p>
          Anna naît.
        </p>

        <p>
          Sa marque apparaît.
        </p>

        <p class="impact-text">
          IL RESTE
          POUR PROTÉGER L’ENFANT.
        </p>
      `
    );

  }

}


haleMissionButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.haleMission;


        const expected =
          haleMissionOrder[
            haleMissionProgress
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


        haleMissionProgress++;


        localStorage.setItem(
          STORAGE_HALE_MISSION,
          haleMissionProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          haleMissionReveal,
          `
            <p>
              ${haleMissionTexts[selected]}
            </p>
          `
        );


        playMemorySound();


        if (
          haleMissionProgress >= 5
        ) {

          showSecret(
            "hale-original-mission",
            "Hale surveillait déjà la fiole avant la naissance d’Anna. Sa mission devient ensuite de protéger l’enfant."
          );

        }

      }
    );

  });


restoreHaleMission();


/* =========================================================
   INTERACTION 14
   LA CLÉ ET LE PASSAGE
========================================================= */

const passageKeyReveal =
  document.getElementById(
    "passageKeyReveal"
  );


const passageKeyButtons =
  document.querySelectorAll(
    ".passage-key-trigger"
  );


const passageKeyOrder = [
  "approach",
  "marks",
  "anna",
  "birthmark",
  "deploy"
];


let passageKeyProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_PASSAGE_KEY
    ) || "0",
    10
  );


const passageKeyTexts = {

  approach:
    "Hope approche progressivement la clé ancienne d’Anna.",

  marks:
    "À environ un mètre, le Dragon chauffe sur le bras d’Hope et le Phénix réagit dans son dos.",

  anna:
    "Anna ressent à son tour une vibration qu’elle ne sait pas expliquer.",

  birthmark:
    "La marque près de son oreille devient plus visible sans qu’elle touche la clé.",

  deploy:
    "La clé se transforme alors en mécanisme : plusieurs segments glissent pour former un cercle incomplet."

};


function restorePassageKey() {

  passageKeyButtons.forEach(
    (button, index) => {

      if (
        index < passageKeyProgress
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
    passageKeyProgress >= 5
  ) {

    setRevealHTML(
      passageKeyReveal,
      `
        <p>
          Hope.
        </p>

        <p>
          Dragon.
        </p>

        <p>
          Phénix.
        </p>

        <p>
          Anna.
        </p>

        <p>
          La marque.
        </p>

        <p class="impact-text">
          LA CLÉ SE DÉPLOIE.
        </p>

        <p class="emphasis">
          Un cercle incomplet.
        </p>
      `
    );

  }

}


passageKeyButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.passageKey;


        const expected =
          passageKeyOrder[
            passageKeyProgress
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


        passageKeyProgress++;


        localStorage.setItem(
          STORAGE_PASSAGE_KEY,
          passageKeyProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          passageKeyReveal,
          `
            <p>
              ${passageKeyTexts[selected]}
            </p>
          `
        );


        playRevealSound();


        if (
          passageKeyProgress >= 5
        ) {

          setRevealHTML(
            passageKeyReveal,
            `
              <p>
                La clé ne se contente pas
                de réagir.
              </p>

              <p>
                Elle cherche
                une autre partie.
              </p>

              <p>
                Hope et Anna
                déclenchent ensemble
                le mécanisme.
              </p>

              <p class="impact-text">
                ELLE NE SERT PAS
                À OUVRIR UNE PORTE.
              </p>

              <p class="name-reveal">
                ELLE SERT
                À EN CRÉER UNE.
              </p>
            `
          );


          showSecret(
            "key-creates-passage",
            "La clé ancienne ne semble pas conçue pour ouvrir une porte existante : elle participe à la création du passage lui-même."
          );

        }

      }
    );

  });


restorePassageKey();


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-61"
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
