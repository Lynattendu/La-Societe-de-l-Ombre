/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 4 — MAIS QUI EST-ELLE ?
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
  "societeOmbre_chapitre4_scroll";

const STORAGE_SYMBOL =
  "societeOmbre_chapitre4_symbol";

const STORAGE_MICROSCOPE =
  "societeOmbre_chapitre4_microscope";

const STORAGE_FUTURE =
  "societeOmbre_chapitre4_future";

const STORAGE_LUCY_MARK =
  "societeOmbre_chapitre4_lucyMark";

const STORAGE_DEAD_FILES =
  "societeOmbre_chapitre4_deadFiles";

const STORAGE_BLACK_MARK =
  "societeOmbre_chapitre4_blackMark";

const STORAGE_ROOT_HIGHER_MARK =
  "societeOmbre_chapitre4_rootHigherMark";

const STORAGE_DRAGON =
  "societeOmbre_chapitre4_dragon";

const STORAGE_SECRETS =
  "societeOmbre_chapitre4_secrets";

const STORAGE_FINISHED =
  "societeOmbre_chapitre4_finished";


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

        }

      });

    },
    {
      threshold: 0.14
    }
  );


scenes.forEach((scene) => {
  observer.observe(scene);
});


/* =========================================================
   TEXTE PROGRESSIF
========================================================= */

function animateParagraphs(scene) {

  if (
    scene.dataset.textAnimated === "1"
  ) {
    return;
  }

  scene.dataset.textAnimated = "1";

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
   SAUVEGARDE DE LA POSITION
========================================================= */

let saveScrollTimer = null;

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

        },
        250
      );

  },
  {
    passive: true
  }
);


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
          button.closest(".scene");

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
   REPRENDRE LA LECTURE
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
        !Number.isNaN(position)
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

  localStorage.removeItem(
    STORAGE_SCROLL
  );

  localStorage.removeItem(
    STORAGE_SYMBOL
  );

  localStorage.removeItem(
    STORAGE_MICROSCOPE
  );

  localStorage.removeItem(
    STORAGE_FUTURE
  );

  localStorage.removeItem(
    STORAGE_LUCY_MARK
  );

  localStorage.removeItem(
    STORAGE_DEAD_FILES
  );

  localStorage.removeItem(
    STORAGE_BLACK_MARK
  );

  localStorage.removeItem(
    STORAGE_ROOT_HIGHER_MARK
  );

  localStorage.removeItem(
    STORAGE_DRAGON
  );

  localStorage.removeItem(
    STORAGE_FINISHED
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeMenu();

  setTimeout(
    () => {
      location.reload();
    },
    500
  );

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

let secretTimer = null;

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

        secretPopup.classList.remove(
          "show"
        );

        secretPopup.setAttribute(
          "aria-hidden",
          "true"
        );

      },
      3200
    );

}


/* =========================================================
   INTERACTION 1
   SYMBOLE CAMÉLÉON
========================================================= */

const symbolTrigger =
  document.getElementById(
    "symbolTrigger"
  );

const scene14 =
  document.getElementById(
    "scene-14"
  );


function activateSymbol() {

  localStorage.setItem(
    STORAGE_SYMBOL,
    "1"
  );

  if (symbolTrigger) {

    symbolTrigger.classList.add(
      "completed"
    );

    symbolTrigger.textContent =
      "Orientation repérée";

    symbolTrigger.disabled =
      true;

  }

  playClueSound();

  showSecret(
    "cameleon-symbol",
    "Le symbole ne change pas. Seule son orientation varie, comme une aiguille indiquant une direction."
  );


  setTimeout(
    () => {

      if (scene14) {

        scene14.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    },
    450
  );

}


if (symbolTrigger) {

  symbolTrigger.addEventListener(
    "click",
    activateSymbol
  );

}


if (
  localStorage.getItem(
    STORAGE_SYMBOL
  ) === "1"
) {

  if (symbolTrigger) {

    symbolTrigger.classList.add(
      "completed"
    );

    symbolTrigger.textContent =
      "Orientation repérée";

    symbolTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 2
   MESSAGE MICROSCOPIQUE
========================================================= */

const microscopeTrigger =
  document.getElementById(
    "microscopeTrigger"
  );

const microscopeReveal =
  document.getElementById(
    "microscopeReveal"
  );


function activateMicroscope() {

  localStorage.setItem(
    STORAGE_MICROSCOPE,
    "1"
  );

  if (microscopeReveal) {

    microscopeReveal.classList.add(
      "open"
    );

  }

  if (microscopeTrigger) {

    microscopeTrigger.classList.add(
      "completed"
    );

    microscopeTrigger.textContent =
      "Message révélé";

    microscopeTrigger.disabled =
      true;

  }

  playRevealSound();

  showSecret(
    "cameleon-message",
    "La Caméléon voulait que son message soit trouvé, mais uniquement par quelqu’un capable de remarquer ce que les autres négligent."
  );

}


if (microscopeTrigger) {

  microscopeTrigger.addEventListener(
    "click",
    activateMicroscope
  );

}


if (
  localStorage.getItem(
    STORAGE_MICROSCOPE
  ) === "1"
) {

  if (microscopeReveal) {

    microscopeReveal.classList.add(
      "open"
    );

  }

  if (microscopeTrigger) {

    microscopeTrigger.classList.add(
      "completed"
    );

    microscopeTrigger.textContent =
      "Message révélé";

    microscopeTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 3
   AVENIR ALTERNATIF DES VICTIMES
========================================================= */

const futureTrigger =
  document.getElementById(
    "futureTrigger"
  );

const futureReveal =
  document.getElementById(
    "futureReveal"
  );


function activateFutureAnalysis() {

  localStorage.setItem(
    STORAGE_FUTURE,
    "1"
  );

  if (futureReveal) {

    futureReveal.classList.add(
      "open"
    );

  }

  if (futureTrigger) {

    futureTrigger.classList.add(
      "completed"
    );

    futureTrigger.textContent =
      "Trajectoire reconstruite";

    futureTrigger.disabled =
      true;

  }

  playAnalysisSound();

  showSecret(
    "absence-analysis",
    "L’enquête ne porte plus seulement sur ce que la mort a provoqué, mais sur ce que la vie de chaque victime aurait encore pu provoquer."
  );

}


if (futureTrigger) {

  futureTrigger.addEventListener(
    "click",
    activateFutureAnalysis
  );

}


if (
  localStorage.getItem(
    STORAGE_FUTURE
  ) === "1"
) {

  if (futureReveal) {

    futureReveal.classList.add(
      "open"
    );

  }

  if (futureTrigger) {

    futureTrigger.classList.add(
      "completed"
    );

    futureTrigger.textContent =
      "Trajectoire reconstruite";

    futureTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 4
   MARQUE DE LUCY
========================================================= */

const lucyMarkTrigger =
  document.getElementById(
    "lucyMarkTrigger"
  );

const lucyMarkScene =
  document.getElementById(
    "scene-52"
  );


function revealLucyMark() {

  localStorage.setItem(
    STORAGE_LUCY_MARK,
    "1"
  );

  if (lucyMarkScene) {

    lucyMarkScene.classList.add(
      "unlocked"
    );

  }

  if (lucyMarkTrigger) {

    lucyMarkTrigger.classList.add(
      "completed"
    );

    lucyMarkTrigger.textContent =
      "Marque révélée";

    lucyMarkTrigger.disabled =
      true;

  }

  playMarkSound();

  showSecret(
    "lucy-indecis",
    "Lucy porte une marque différente de celles des Sentinelles et des Gardiens Noirs. Son chemin n’est naturellement lié à aucun des deux ordres."
  );


  setTimeout(
    () => {

      if (lucyMarkScene) {

        lucyMarkScene.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    },
    500
  );

}


if (lucyMarkTrigger) {

  lucyMarkTrigger.addEventListener(
    "click",
    revealLucyMark
  );

}


if (
  localStorage.getItem(
    STORAGE_LUCY_MARK
  ) === "1"
) {

  if (lucyMarkScene) {

    lucyMarkScene.classList.add(
      "unlocked"
    );

  }

  if (lucyMarkTrigger) {

    lucyMarkTrigger.classList.add(
      "completed"
    );

    lucyMarkTrigger.textContent =
      "Marque révélée";

    lucyMarkTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 5
   DOSSIERS DES MORTS ADMINISTRATIFS
========================================================= */

const deadFilesTrigger =
  document.getElementById(
    "deadFilesTrigger"
  );

const deadFilesReveal =
  document.getElementById(
    "deadFilesReveal"
  );


function revealDeadFiles() {

  localStorage.setItem(
    STORAGE_DEAD_FILES,
    "1"
  );

  if (deadFilesReveal) {

    deadFilesReveal.classList.add(
      "open"
    );

  }

  if (deadFilesTrigger) {

    deadFilesTrigger.classList.add(
      "completed"
    );

    deadFilesTrigger.textContent =
      "Dossiers ouverts";

    deadFilesTrigger.disabled =
      true;

  }

  playDataSound();

  showSecret(
    "dead-identities",
    "Les hommes sont vivants, mais leurs identités sont officiellement mortes. Pour le monde administratif, ils n’existent plus."
  );

}


if (deadFilesTrigger) {

  deadFilesTrigger.addEventListener(
    "click",
    revealDeadFiles
  );

}


if (
  localStorage.getItem(
    STORAGE_DEAD_FILES
  ) === "1"
) {

  if (deadFilesReveal) {

    deadFilesReveal.classList.add(
      "open"
    );

  }

  if (deadFilesTrigger) {

    deadFilesTrigger.classList.add(
      "completed"
    );

    deadFilesTrigger.textContent =
      "Dossiers ouverts";

    deadFilesTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 6
   MARQUE D'UN GARDIEN NOIR
========================================================= */

const blackMarkTrigger =
  document.getElementById(
    "blackMarkTrigger"
  );

const blackMarkReveal =
  document.getElementById(
    "blackMarkReveal"
  );


function revealBlackMark() {

  localStorage.setItem(
    STORAGE_BLACK_MARK,
    "1"
  );

  if (blackMarkReveal) {

    blackMarkReveal.classList.add(
      "open"
    );

  }

  if (blackMarkTrigger) {

    blackMarkTrigger.classList.add(
      "completed"
    );

    blackMarkTrigger.textContent =
      "Marque révélée";

    blackMarkTrigger.disabled =
      true;

  }

  playDarkMarkSound();

  showSecret(
    "black-guardian-mark",
    "La marque confirme l’appartenance de l’agresseur aux Gardiens Noirs."
  );

}


if (blackMarkTrigger) {

  blackMarkTrigger.addEventListener(
    "click",
    revealBlackMark
  );

}


if (
  localStorage.getItem(
    STORAGE_BLACK_MARK
  ) === "1"
) {

  if (blackMarkReveal) {

    blackMarkReveal.classList.add(
      "open"
    );

  }

  if (blackMarkTrigger) {

    blackMarkTrigger.classList.add(
      "completed"
    );

    blackMarkTrigger.textContent =
      "Marque révélée";

    blackMarkTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 7
   MARQUES SUPÉRIEURES DE ROOT
========================================================= */

const rootHigherMarkTrigger =
  document.getElementById(
    "rootHigherMarkTrigger"
  );

const rootHigherMarkReveal =
  document.getElementById(
    "rootHigherMarkReveal"
  );


function revealRootHigherMark() {

  localStorage.setItem(
    STORAGE_ROOT_HIGHER_MARK,
    "1"
  );

  if (rootHigherMarkReveal) {

    rootHigherMarkReveal.classList.add(
      "open"
    );

  }

  if (rootHigherMarkTrigger) {

    rootHigherMarkTrigger.classList.add(
      "completed"
    );

    rootHigherMarkTrigger.textContent =
      "Marques révélées";

    rootHigherMarkTrigger.disabled =
      true;

  }

  playSentinelSound();

  showSecret(
    "root-higher-mark",
    "La marque de Root n’est qu’une partie d’un ensemble plus complexe. Sa lignée occupe une place particulière parmi les Sentinelles."
  );

}


if (rootHigherMarkTrigger) {

  rootHigherMarkTrigger.addEventListener(
    "click",
    revealRootHigherMark
  );

}


if (
  localStorage.getItem(
    STORAGE_ROOT_HIGHER_MARK
  ) === "1"
) {

  if (rootHigherMarkReveal) {

    rootHigherMarkReveal.classList.add(
      "open"
    );

  }

  if (rootHigherMarkTrigger) {

    rootHigherMarkTrigger.classList.add(
      "completed"
    );

    rootHigherMarkTrigger.textContent =
      "Marques révélées";

    rootHigherMarkTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 8
   DRAGON DE HOPE
========================================================= */

const dragonTrigger =
  document.getElementById(
    "dragonTrigger"
  );

const dragonReveal =
  document.getElementById(
    "dragonReveal"
  );


function revealDragon() {

  localStorage.setItem(
    STORAGE_DRAGON,
    "1"
  );

  if (dragonReveal) {

    dragonReveal.classList.add(
      "open"
    );

  }

  if (dragonTrigger) {

    dragonTrigger.classList.add(
      "completed"
    );

    dragonTrigger.textContent =
      "Dragon révélé";

    dragonTrigger.disabled =
      true;

  }

  playDragonSound();

  showSecret(
    "hope-dragon",
    "La marque de Hope ne ressemble pas à un simple tatouage. Elle réagit comme une présence vivante liée à son statut de Maître Unique."
  );

}


if (dragonTrigger) {

  dragonTrigger.addEventListener(
    "click",
    revealDragon
  );

}


if (
  localStorage.getItem(
    STORAGE_DRAGON
  ) === "1"
) {

  if (dragonReveal) {

    dragonReveal.classList.add(
      "open"
    );

  }

  if (dragonTrigger) {

    dragonTrigger.classList.add(
      "completed"
    );

    dragonTrigger.textContent =
      "Dragon révélé";

    dragonTrigger.disabled =
      true;

  }

}


/* =========================================================
   MÉMOIRE DU CHAPITRE 3
========================================================= */

const chapter3RootMark =
  localStorage.getItem(
    "societeOmbre_chapitre3_rootMark"
  );

const chapter3Finished =
  localStorage.getItem(
    "societeOmbre_chapitre3_finished"
  );


if (
  chapter3RootMark === "1"
) {

  const scene58 =
    document.getElementById(
      "scene-58"
    );

  const textBlock =
    scene58?.querySelector(
      ".text-block"
    );

  if (textBlock) {

    const memory =
      document.createElement(
        "p"
      );

    memory.className =
      "emphasis";

    memory.style.marginTop =
      "30px";

    memory.textContent =
      "Vous avez déjà vu une première marque de Root. Cette fois, Hope va révéler ce qui se cachait encore sous la surface.";

    textBlock.appendChild(
      memory
    );

  }

}


if (
  chapter3Finished === "1"
) {

  const scene2 =
    document.getElementById(
      "scene-2"
    );

  const textBlock =
    scene2?.querySelector(
      ".text-block"
    );

  if (textBlock) {

    const memory =
      document.createElement(
        "p"
      );

    memory.className =
      "emphasis";

    memory.style.marginTop =
      "30px";

    memory.textContent =
      "Au chapitre précédent, le cercle s’était rapproché. Cette fois, la confiance va être mise à l’épreuve.";

    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   MÉMOIRE DU CHOIX DU PROLOGUE
========================================================= */

const prologueChoice =
  localStorage.getItem(
    "societeOmbre_premierChoix"
  );


if (prologueChoice) {

  const scene55 =
    document.getElementById(
      "scene-55"
    );

  const textBlock =
    scene55?.querySelector(
      ".text-block"
    );

  if (textBlock) {

    const memory =
      document.createElement(
        "p"
      );

    memory.className =
      "emphasis";

    memory.style.marginTop =
      "34px";


    if (
      prologueChoice ===
      "eveil"
    ) {

      memory.textContent =
        "Vous aviez choisi d’ouvrir les yeux. Lucy découvre maintenant qu’une vérité peut exister bien avant que nous soyons capables de la voir.";

    }


    if (
      prologueChoice ===
      "illusion"
    ) {

      memory.textContent =
        "Vous aviez choisi l’illusion. Pourtant, ce qui était invisible n’a jamais cessé d’exister.";

    }


    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const scene60 =
  document.getElementById(
    "scene-60"
  );


if (scene60) {

  const endObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              localStorage.setItem(
                STORAGE_FINISHED,
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
    scene60
  );

}


/* =========================================================
   SON D'AMBIANCE
========================================================= */

let audioCtx = null;
let masterGain = null;
let ambienceOsc1 = null;
let ambienceOsc2 = null;
let soundActive = false;


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


  soundActive = true;


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

  masterGain.gain
    .exponentialRampToValueAtTime(
      0.0001,
      audioCtx.currentTime +
      0.35
    );


  setTimeout(
    () => {

      try {

        ambienceOsc1?.stop();
        ambienceOsc2?.stop();

        audioCtx.close();

      } catch (error) {
        /* rien */
      }


      audioCtx = null;
      masterGain = null;
      ambienceOsc1 = null;
      ambienceOsc2 = null;

    },
    450
  );


  soundActive = false;


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


function playDataSound() {

  playTone(
    360,
    0.35,
    0.018,
    "square"
  );

  setTimeout(
    () => {

      playTone(
        440,
        0.42,
        0.015,
        "triangle"
      );

    },
    110
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


function playDarkMarkSound() {

  playTone(
    180,
    0.75,
    0.024,
    "triangle"
  );

  setTimeout(
    () => {

      playTone(
        230,
        0.9,
        0.018,
        "sine"
      );

    },
    180
  );

}


function playSentinelSound() {

  playTone(
    420,
    0.75,
    0.02
  );

  setTimeout(
    () => {

      playTone(
        560,
        0.9,
        0.018
      );

    },
    170
  );

  setTimeout(
    () => {

      playTone(
        710,
        1.05,
        0.014
      );

    },
    330
  );

}


function playDragonSound() {

  playTone(
    220,
    1.1,
    0.024,
    "sine"
  );

  setTimeout(
    () => {

      playTone(
        330,
        1.25,
        0.02,
        "triangle"
      );

    },
    180
  );

  setTimeout(
    () => {

      playTone(
        495,
        1.4,
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
        1.55,
        0.014,
        "triangle"
      );

    },
    540
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
      event.key === "Escape"
    ) {

      closeMenu();

    }

  }
);


/* =========================================================
   SAUVEGARDE AVANT DE QUITTER
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {

    localStorage.setItem(
      STORAGE_SCROLL,
      Math.round(
        window.scrollY
      )
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
