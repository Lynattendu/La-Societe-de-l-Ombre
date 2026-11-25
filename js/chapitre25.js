
"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 25 — LES HÉRITAGES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     1. ÉLÉMENTS PRINCIPAUX
  ======================================================= */

  const scenes =
    [...document.querySelectorAll(".scene")];

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


  /* =======================================================
     2. CLÉS DE SAUVEGARDE
  ======================================================= */

  const STORAGE_PREFIX =
    "societeOmbre_ch25_";

  const STORAGE_SCROLL =
    STORAGE_PREFIX + "scroll";

  const STORAGE_PROGRESS =
    STORAGE_PREFIX + "progress";

  const STORAGE_SOUND =
    STORAGE_PREFIX + "sound";

  const STORAGE_INTERACTIONS =
    STORAGE_PREFIX + "interactions";


  /* =======================================================
     3. ÉTAT DU CHAPITRE
  ======================================================= */

  let soundEnabled =
    localStorage.getItem(STORAGE_SOUND) !== "off";

  let discoveredInteractions = [];


  try {

    discoveredInteractions =
      JSON.parse(
        localStorage.getItem(
          STORAGE_INTERACTIONS
        )
      ) || [];

  } catch (error) {

    discoveredInteractions = [];

  }


  /* =======================================================
     4. AUDIO
  ======================================================= */

  let audioContext = null;


  function getAudioContext() {

    if (!audioContext) {

      const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioContextClass) {
        return null;
      }

      audioContext =
        new AudioContextClass();

    }


    if (
      audioContext.state ===
      "suspended"
    ) {

      audioContext
        .resume()
        .catch(() => {});

    }


    return audioContext;

  }


  function playTone(
    frequency = 440,
    duration = 0.05,
    volume = 0.025
  ) {

    if (!soundEnabled) {
      return;
    }


    const ctx =
      getAudioContext();


    if (!ctx) {
      return;
    }


    const oscillator =
      ctx.createOscillator();

    const gain =
      ctx.createGain();


    oscillator.type = "sine";


    oscillator.frequency
      .setValueAtTime(
        frequency,
        ctx.currentTime
      );


    gain.gain
      .setValueAtTime(
        volume,
        ctx.currentTime
      );


    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
      );


    oscillator.connect(gain);

    gain.connect(
      ctx.destination
    );


    oscillator.start();


    oscillator.stop(
      ctx.currentTime + duration
    );

  }


  function playInteractionSound() {

    playTone(
      520,
      0.08,
      0.03
    );


    window.setTimeout(
      () => {

        playTone(
          680,
          0.10,
          0.02
        );

      },
      70
    );

  }


  function updateSoundButton() {

    if (!soundBtn) {
      return;
    }


    soundBtn.textContent =
      soundEnabled
        ? "♫"
        : "♪";


    soundBtn.setAttribute(
      "aria-label",
      soundEnabled
        ? "Désactiver le son"
        : "Activer le son"
    );


    soundBtn.classList.toggle(
      "sound-off",
      !soundEnabled
    );

  }


  if (soundBtn) {

    soundBtn.addEventListener(
      "click",
      () => {

        soundEnabled =
          !soundEnabled;


        localStorage.setItem(
          STORAGE_SOUND,
          soundEnabled
            ? "on"
            : "off"
        );


        updateSoundButton();


        if (soundEnabled) {

          playTone(
            620,
            0.08,
            0.03
          );

        }

      }
    );

  }


  updateSoundButton();


  /* =======================================================
     5. APPARITION DES SCÈNES
  ======================================================= */

  const sceneObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            const scene =
              entry.target;


            scene.classList.add(
              "is-visible"
            );


            const paragraphs =
              scene.querySelectorAll(
                ".text-block p"
              );


            paragraphs.forEach(
              (paragraph, index) => {

                window.setTimeout(
                  () => {

                    paragraph
                      .classList
                      .add(
                        "is-visible"
                      );

                  },
                  index * 40
                );

              }
            );


            sceneObserver
              .unobserve(
                scene
              );

          }
        );

      },

      {
        threshold: 0.08
      }

    );


  scenes.forEach(
    scene => {

      sceneObserver.observe(
        scene
      );

    }
  );


  /* =======================================================
     6. BARRE DE PROGRESSION
  ======================================================= */

  function updateProgress() {

    const documentElement =
      document.documentElement;


    const maxScroll =
      documentElement.scrollHeight -
      window.innerHeight;


    let progress = 0;


    if (maxScroll > 0) {

      progress =
        window.scrollY /
        maxScroll;

    }


    progress =
      Math.min(
        1,
        Math.max(
          0,
          progress
        )
      );


    if (progressFill) {

      progressFill.style.width =
        `${progress * 100}%`;

    }


    localStorage.setItem(
      STORAGE_PROGRESS,
      String(progress)
    );

  }


  /* =======================================================
     7. SAUVEGARDE POSITION DE LECTURE
  ======================================================= */

  let saveTimer = null;


  function saveReadingPosition() {

    localStorage.setItem(
      STORAGE_SCROLL,
      String(
        window.scrollY
      )
    );


    updateProgress();

  }


  window.addEventListener(
    "scroll",
    () => {

      updateProgress();


      clearTimeout(
        saveTimer
      );


      saveTimer =
        window.setTimeout(
          saveReadingPosition,
          120
        );

    },
    {
      passive: true
    }
  );


  window.addEventListener(
    "beforeunload",
    saveReadingPosition
  );


  /* =======================================================
     8. CONTINUER
  ======================================================= */

  document
    .querySelectorAll(
      "[data-next]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            playTone(
              480,
              0.06,
              0.025
            );


            const currentScene =
              button.closest(
                ".scene"
              );


            if (!currentScene) {
              return;
            }


            const currentIndex =
              scenes.indexOf(
                currentScene
              );


            const nextScene =
              scenes[
                currentIndex + 1
              ];


            if (!nextScene) {
              return;
            }


            nextScene
              .scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

          }
        );

      }
    );


  /* =======================================================
     9. MENU
  ======================================================= */

  function openMenu() {

    if (!chapterMenu) {
      return;
    }


    chapterMenu
      .classList
      .add("open");


    chapterMenu.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body
      .classList
      .add(
        "menu-open"
      );


    playTone(
      420,
      0.05,
      0.02
    );

  }


  function closeMenu() {

    if (!chapterMenu) {
      return;
    }


    chapterMenu
      .classList
      .remove(
        "open"
      );


    chapterMenu.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body
      .classList
      .remove(
        "menu-open"
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
      event => {

        if (
          event.target ===
          chapterMenu
        ) {

          closeMenu();

        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeMenu();

      }

    }
  );


  /* =======================================================
     10. REPRENDRE LA LECTURE
  ======================================================= */

  function resumeReading() {

    closeMenu();


    const savedScroll =
      parseFloat(
        localStorage.getItem(
          STORAGE_SCROLL
        )
      );


    if (
      Number.isFinite(
        savedScroll
      ) &&
      savedScroll > 0
    ) {

      window.scrollTo({
        top: savedScroll,
        behavior: "auto"
      });

    }

  }


  if (resumeBtn) {

    resumeBtn.addEventListener(
      "click",
      resumeReading
    );

  }


  /* =======================================================
     11. RECOMMENCER LE CHAPITRE
  ======================================================= */

  function clearChapterStorage() {

    Object
      .keys(localStorage)
      .filter(
        key =>
          key.startsWith(
            STORAGE_PREFIX
          )
      )
      .forEach(
        key => {

          localStorage
            .removeItem(
              key
            );

        }
      );

  }


  function restartReading() {

    clearChapterStorage();


    discoveredInteractions = [];


    document
      .querySelectorAll(
        ".interaction-btn"
      )
      .forEach(
        button => {

          button.classList.remove(
            "discovered",
            "active"
          );

        }
      );


    document
      .querySelectorAll(
        ".reveal-box"
      )
      .forEach(
        box => {

          box.innerHTML = "";


          box.classList.remove(
            "visible",
            "open",
            "active"
          );

        }
      );


    closeMenu();


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    window.setTimeout(
      () => {

        saveReadingPosition();

      },
      500
    );

  }


  if (restartBtn) {

    restartBtn.addEventListener(
      "click",
      restartReading
    );

  }


  if (restartChapter) {

    restartChapter.addEventListener(
      "click",
      restartReading
    );

  }


  /* =======================================================
     12. POPUP INFORMATION DÉCOUVERTE
  ======================================================= */

  let popupTimer = null;


  function showSecretPopup() {

    if (!secretPopup) {
      return;
    }


    clearTimeout(
      popupTimer
    );


    secretPopup
      .classList
      .add(
        "visible",
        "active"
      );


    secretPopup.setAttribute(
      "aria-hidden",
      "false"
    );


    popupTimer =
      window.setTimeout(
        () => {

          secretPopup
            .classList
            .remove(
              "visible",
              "active"
            );


          secretPopup.setAttribute(
            "aria-hidden",
            "true"
          );

        },
        1500
      );

  }


  /* =======================================================
     13. SAUVEGARDE DES INTERACTIONS
  ======================================================= */

  function saveInteractions() {

    localStorage.setItem(
      STORAGE_INTERACTIONS,
      JSON.stringify(
        discoveredInteractions
      )
    );

  }


  function interactionKey(
    group,
    value
  ) {

    return `${group}:${value}`;

  }


  function registerDiscovery(
    group,
    value,
    button,
    silent = false
  ) {

    const key =
      interactionKey(
        group,
        value
      );


    const isNew =
      !discoveredInteractions
        .includes(key);


    if (isNew) {

      discoveredInteractions
        .push(key);


      saveInteractions();

    }


    if (button) {

      button
        .classList
        .add(
          "discovered"
        );

    }


    if (
      isNew &&
      !silent
    ) {

      playInteractionSound();

      showSecretPopup();

    }

  }


  /* =======================================================
     14. AFFICHAGE DES RÉVÉLATIONS
  ======================================================= */

  function openReveal(
    revealBox,
    html
  ) {

    if (!revealBox) {
      return;
    }


    revealBox.innerHTML =
      html;


    revealBox
      .classList
      .add(
        "visible",
        "open",
        "active"
      );

  }


  function selectButton(
    buttons,
    selectedButton
  ) {

    buttons.forEach(
      button => {

        button
          .classList
          .remove(
            "active"
          );

      }
    );


    selectedButton
      .classList
      .add(
        "active"
      );

  }


  function setupInteraction({
    selector,
    dataAttribute,
    revealId,
    group,
    content
  }) {

    const buttons =
      [
        ...document
          .querySelectorAll(
            selector
          )
      ];


    const revealBox =
      document
        .getElementById(
          revealId
        );


    if (
      !buttons.length ||
      !revealBox
    ) {
      return;
    }


    buttons.forEach(
      button => {

        const value =
          button.dataset[
            dataAttribute
          ];


        if (!value) {
          return;
        }


        const key =
          interactionKey(
            group,
            value
          );


        if (
          discoveredInteractions
            .includes(
              key
            )
        ) {

          button
            .classList
            .add(
              "discovered"
            );

        }


        button.addEventListener(
          "click",
          () => {

            selectButton(
              buttons,
              button
            );


            const html =
              content[value];


            if (!html) {
              return;
            }


            openReveal(
              revealBox,
              html
            );


            registerDiscovery(
              group,
              value,
              button
            );

          }
        );

      }
    );

  }


  /* =======================================================
     INTERACTION 1
     FONCTION DE LA LAME
  ======================================================= */

  setupInteraction({

    selector:
      ".blade-function-trigger",

    dataAttribute:
      "bladeFunction",

    revealId:
      "bladeFunctionReveal",

    group:
      "blade-function",

    content: {

      reaction: `
        <strong>Réaction à Root</strong>
        <p>
          La lame réagit immédiatement
          lorsque Root approche la main.
          Son lien avec la Mémoire
          semble donc toujours actif.
        </p>
      `,

      line: `
        <strong>Ligne pâle</strong>
        <p>
          Une ligne nouvelle apparaît
          sur le manche.
          Elle n’était pas visible
          de cette manière auparavant.
        </p>
      `,

      lateral: `
        <strong>Axe latéral</strong>
        <p>
          La lame ne correspond pas
          au centre du dispositif.
          Sa place se trouve
          sur l’un de ses axes latéraux.
        </p>
      `,

      selector: `
        <strong>Sélecteur</strong>
        <p>
          Sa forme évoque moins
          une clé classique
          qu’un guide capable
          de sélectionner une possibilité.
        </p>
      `,

      direction: `
        <strong>Orientation</strong>
        <p>
          La lame ne crée pas le passage.
          Elle lui donne une direction.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     RECONSTRUCTION DU DISPOSITIF
  ======================================================= */

  setupInteraction({

    selector:
      ".device-reconstruction-trigger",

    dataAttribute:
      "deviceReconstruction",

    revealId:
      "deviceReconstructionReveal",

    group:
      "device-reconstruction",

    content: {

      stones: `
        <strong>Les pierres</strong>
        <p>
          Les pierres retrouvées
          appartiennent à une même structure
          ancienne et dispersée.
        </p>
      `,

      elie: `
        <strong>Fragments transportés</strong>
        <p>
          Plusieurs pièces ont transité
          pendant des années
          par le réseau d’Élie
          sans que leur fonction réelle
          soit connue.
        </p>
      `,

      missing: `
        <strong>Parties manquantes</strong>
        <p>
          Malgré les fragments retrouvés,
          la reconstruction reste incomplète.
          Certaines fonctions du dispositif
          n’ont pas encore leur équivalent.
        </p>
      `,

      guide: `
        <strong>Guide</strong>
        <p>
          La rainure latérale
          ressemble à un rail
          destiné à guider
          un élément mobile.
        </p>
      `,

      path: `
        <strong>Chemin</strong>
        <p>
          Le dispositif ne semble pas
          seulement ouvrir un passage.
          Il doit également définir
          quel chemin ce passage emprunte.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     LES PARQUES
  ======================================================= */

  setupInteraction({

    selector:
      ".parcae-trigger",

    dataAttribute:
      "parcae",

    revealId:
      "parcaeReveal",

    group:
      "parcae",

    content: {

      nona: `
        <strong>Nona</strong>
        <p>
          Première des trois figures.
          Dans la tradition,
          elle est associée
          au commencement du fil.
        </p>
      `,

      decima: `
        <strong>Décima</strong>
        <p>
          Elle mesure.
          Elle représente ici
          la conséquence,
          la distance
          ou la progression d’un chemin.
        </p>
      `,

      morta: `
        <strong>Morta</strong>
        <p>
          Elle coupe.
          Mais Root commence à douter
          que cette image signifie
          simplement décider du destin.
        </p>
      `,

      choice: `
        <strong>Choix</strong>
        <p>
          Les inscriptions semblent relier
          les Parques
          non pas à un avenir fixé,
          mais à une décision prise.
        </p>
      `,

      consequence: `
        <strong>Conséquence</strong>
        <p>
          Un choix ouvre une direction.
          Une direction produit
          plusieurs conséquences possibles.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     HÉRITAGE DE ROOT
  ======================================================= */

  setupInteraction({

    selector:
      ".root-inheritance-trigger",

    dataAttribute:
      "rootInheritance",

    revealId:
      "rootInheritanceReveal",

    group:
      "root-inheritance",

    content: {

      family: `
        <strong>Famille</strong>
        <p>
          Les symboles des Parques
          apparaissent depuis longtemps
          sur certains objets
          de la famille de Root.
        </p>
      `,

      memory: `
        <strong>Mémoire</strong>
        <p>
          La fonction familiale
          pourrait être liée
          à la conservation
          des chemins déjà empruntés.
        </p>
      `,

      paths: `
        <strong>Chemins</strong>
        <p>
          Root ne se contente peut-être pas
          de choisir une direction.
          Elle semble capable
          d’en comprendre les conséquences.
        </p>
      `,

      orientation: `
        <strong>Orientation</strong>
        <p>
          La Mémoire pourrait servir
          à lire,
          conserver
          et retrouver une trajectoire.
        </p>
      `,

      function: `
        <strong>Une fonction</strong>
        <p>
          Les Parques ne seraient donc
          pas seulement une référence familiale.
          Elles désigneraient
          une fonction transmise.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     JANUS / PETER
  ======================================================= */

  setupInteraction({

    selector:
      ".janus-trigger",

    dataAttribute:
      "janus",

    revealId:
      "janusReveal",

    group:
      "janus",

    content: {

      faces: `
        <strong>Deux faces</strong>
        <p>
          Janus est représenté
          par deux visages opposés.
          Deux regards,
          deux directions.
        </p>
      `,

      directions: `
        <strong>Deux directions</strong>
        <p>
          Le dispositif comporte
          une entrée
          et une sortie.
          Deux orientations d’un même passage.
        </p>
      `,

      doors: `
        <strong>Les portes</strong>
        <p>
          Janus est associé
          aux portes,
          aux seuils
          et aux commencements.
        </p>
      `,

      passages: `
        <strong>Les passages</strong>
        <p>
          Le symbole correspond étrangement
          aux mécanismes
          que Peter comprend
          presque instinctivement.
        </p>
      `,

      peter: `
        <strong>Peter</strong>
        <p>
          Il comprend certaines structures
          qu’il n’a jamais étudiées.
          Ce qui ressemblait à de l’intuition
          pourrait être autre chose.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     THOTH / MAX
  ======================================================= */

  setupInteraction({

    selector:
      ".thoth-trigger",

    dataAttribute:
      "thoth",

    revealId:
      "thothReveal",

    group:
      "thoth",

    content: {

      writing: `
        <strong>Écriture</strong>
        <p>
          Thoth est lié
          à l’écriture
          et à la conservation
          de ce qui doit être transmis.
        </p>
      `,

      memory: `
        <strong>Mémoire</strong>
        <p>
          Une mémoire ne sert pas seulement
          à se souvenir.
          Elle permet aussi
          de retrouver un chemin.
        </p>
      `,

      knowledge: `
        <strong>Connaissance</strong>
        <p>
          Lire,
          comparer,
          vérifier
          et comprendre :
          la fonction ressemble
          étrangement au travail de Max.
        </p>
      `,

      truth: `
        <strong>Vérité consignée</strong>
        <p>
          Un fait enregistré
          reste accessible.
          Il devient une trace
          que d’autres peuvent retrouver.
        </p>
      `,

      journalist: `
        <strong>Journaliste</strong>
        <p>
          Max a construit toute sa carrière
          autour de la vérification,
          de l’écriture,
          de la conservation
          et de la distinction
          entre fait et interprétation.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
     TED
  ======================================================= */

  setupInteraction({

    selector:
      ".ted-truth-trigger",

    dataAttribute:
      "tedTruth",

    revealId:
      "tedTruthReveal",

    group:
      "ted-truth",

    content: {

      racket: `
        <strong>Racket</strong>
        <p>
          Le restaurant de Ted
          faisait partie des établissements
          auxquels l’organisation d’Élie
          imposait de payer.
        </p>
      `,

      refusal: `
        <strong>Refus de payer</strong>
        <p>
          Ted refusait de payer
          pour conserver
          ce qui lui appartenait déjà.
        </p>
      `,

      organization: `
        <strong>Organisation</strong>
        <p>
          Les hommes responsables
          travaillaient bien
          pour une équipe
          contrôlée par le cartel d’Élie.
        </p>
      `,

      responsibility: `
        <strong>Responsabilité</strong>
        <p>
          Élie n’a peut-être pas donné
          personnellement l’ordre concernant Ted.
          Mais il savait parfaitement
          comment son organisation fonctionnait.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
     LES PIERRES D'ÉLIE
  ======================================================= */

  setupInteraction({

    selector:
      ".elie-stones-trigger",

    dataAttribute:
      "elieStones",

    revealId:
      "elieStonesReveal",

    group:
      "elie-stones",

    content: {

      transport: `
        <strong>Transport</strong>
        <p>
          Les pierres ont circulé
          pendant des années
          par les routes contrôlées
          par l’organisation d’Élie.
        </p>
      `,

      network: `
        <strong>Réseau</strong>
        <p>
          Certains intermédiaires
          utilisaient déjà ces routes
          avant même qu’Élie
          en prenne complètement le contrôle.
        </p>
      `,

      ignorance: `
        <strong>Ignorance volontaire</strong>
        <p>
          Élie ne savait pas
          ce que contenaient réellement
          certains convois.
          Mais il reconnaît
          qu’il n’a jamais cherché à le savoir.
        </p>
      `,

      money: `
        <strong>Bien payé</strong>
        <p>
          Tant que les transports
          étaient suffisamment rentables,
          personne ne posait de questions.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     RESPONSABILITÉ D'ÉLIE
  ======================================================= */

  setupInteraction({

    selector:
      ".elie-responsibility-trigger",

    dataAttribute:
      "elieResponsibility",

    revealId:
      "elieResponsibilityReveal",

    group:
      "elie-responsibility",

    content: {

      guilt: `
        <strong>Culpabilité</strong>
        <p>
          Élie refuse de prétendre
          qu’il n’a aucune responsabilité
          dans la mort de Ted.
        </p>
      `,

      useful: `
        <strong>Utilité</strong>
        <p>
          Hope déteste devoir reconnaître
          que l’homme lié à la mort de son frère
          peut désormais leur être utile.
        </p>
      `,

      forgive: `
        <strong>Pas de pardon</strong>
        <p>
          Aider aujourd’hui
          ne répare pas ce qui s’est passé.
          Hope ne pardonne pas Ted.
          Élie ne le lui demande pas.
        </p>
      `,

      help: `
        <strong>Aider maintenant</strong>
        <p>
          Puisque son réseau
          a servi à transporter les pierres,
          Hope exige qu’Élie aide maintenant
          à empêcher leur utilisation.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     LES TROIS SYMBOLES
  ======================================================= */

  setupInteraction({

    selector:
      ".three-symbols-trigger",

    dataAttribute:
      "threeSymbols",

    revealId:
      "threeSymbolsReveal",

    group:
      "three-symbols",

    content: {

      parcae: `
        <strong>Parques</strong>
        <p>
          Root.
          Mémoire.
          Conséquences.
          Orientation.
        </p>
      `,

      janus: `
        <strong>Janus</strong>
        <p>
          Peter.
          Portes.
          Deux directions.
          Fonctionnement du passage.
        </p>
      `,

      thoth: `
        <strong>Thoth</strong>
        <p>
          Max.
          Écriture.
          Connaissance.
          Trace et vérité consignée.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     LES HÉRITAGES
  ======================================================= */

  setupInteraction({

    selector:
      ".inheritances-trigger",

    dataAttribute:
      "inheritances",

    revealId:
      "inheritancesReveal",

    group:
      "inheritances",

    content: {

      roles: `
        <strong>Rôles</strong>
        <p>
          Certaines lignées
          semblent avoir conservé
          des fonctions particulières
          à travers le temps.
        </p>
      `,

      abilities: `
        <strong>Aptitudes</strong>
        <p>
          Il ne s’agit peut-être pas
          de pouvoirs,
          mais d’une facilité particulière
          à comprendre certaines choses.
        </p>
      `,

      transmission: `
        <strong>Transmission</strong>
        <p>
          Une fonction peut survivre
          sans que ceux qui l’héritent
          comprennent encore
          son origine.
        </p>
      `,

      understanding: `
        <strong>Compréhension</strong>
        <p>
          Root,
          Peter
          et Max
          semblent chacun comprendre
          une partie différente
          du même système.
        </p>
      `,

      families: `
        <strong>Familles</strong>
        <p>
          Les anciennes lignées
          auraient pu conserver
          des rôles
          sous forme de traditions,
          de métiers,
          de récits
          ou d’instincts.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     SYMBOLE DE VOIE
  ======================================================= */

  setupInteraction({

    selector:
      ".route-symbol-trigger",

    dataAttribute:
      "routeSymbol",

    revealId:
      "routeSymbolReveal",

    group:
      "route-symbol",

    content: {

      way: `
        <strong>Une voie</strong>
        <p>
          Chez les Gardiens,
          ce symbole ne désignait pas
          une porte.
          Il représentait une voie.
        </p>
      `,

      direction: `
        <strong>Direction</strong>
        <p>
          Le symbole indique
          qu’un itinéraire précis
          doit être suivi.
        </p>
      `,

      authorization: `
        <strong>Autorisation</strong>
        <p>
          Certaines directions
          étaient officiellement reconnues
          et autorisées.
        </p>
      `,

      route: `
        <strong>Route</strong>
        <p>
          La lame semble donc bien
          être liée
          à la sélection d’un chemin.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     ACCÈS INTERDIT
  ======================================================= */

  setupInteraction({

    selector:
      ".forbidden-access-trigger",

    dataAttribute:
      "forbiddenAccess",

    revealId:
      "forbiddenAccessReveal",

    group:
      "forbidden-access",

    content: {

      restricted: `
        <strong>Accès restreint</strong>
        <p>
          Le second symbole
          marquait des zones
          qui ne pouvaient pas
          être empruntées librement.
        </p>
      `,

      order: `
        <strong>Ordre direct</strong>
        <p>
          L’accès nécessitait
          une autorisation explicite
          venue du sommet
          de l’organisation.
        </p>
      `,

      master: `
        <strong>Maître Noir</strong>
        <p>
          Seul le Maître Noir
          pouvait autoriser
          officiellement
          l’utilisation de ces voies.
        </p>
      `,

      device: `
        <strong>Dispositif</strong>
        <p>
          Ces passages interdits
          ne conduisent pas
          à une simple salle.
          Ils mènent directement
          vers le dispositif.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     LE CHERCHEUR
  ======================================================= */

  setupInteraction({

    selector:
      ".researcher-trigger",

    dataAttribute:
      "researcher",

    revealId:
      "researcherReveal",

    group:
      "researcher",

    content: {

      guardian: `
        <strong>Chercheur des Gardiens</strong>
        <p>
          Amy a autrefois escorté
          un chercheur
          lié directement
          aux Gardiens.
        </p>
      `,

      return: `
        <strong>Retour du dispositif</strong>
        <p>
          L’homme revenait
          d’une zone profonde
          liée au dispositif.
        </p>
      `,

      fear: `
        <strong>Terrifié</strong>
        <p>
          Amy se souvient surtout
          de son état :
          il était véritablement terrifié.
        </p>
      `,

      silence: `
        <strong>Son silence</strong>
        <p>
          Il n’a jamais voulu expliquer
          ce qu’il avait vu
          ou découvert là-dessous.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     RETOUR DE CLARK
  ======================================================= */

  setupInteraction({

    selector:
      ".clark-return-trigger",

    dataAttribute:
      "clarkReturn",

    revealId:
      "clarkReturnReveal",

    group:
      "clark-return",

    content: {

      surprise: `
        <strong>Surprise</strong>
        <p>
          Clark arrive à Awake
          sans prévenir Root.
        </p>
      `,

      root: `
        <strong>Root</strong>
        <p>
          Son visage change immédiatement
          lorsqu’elle comprend
          qui l’attend.
        </p>
      `,

      clark: `
        <strong>Clark</strong>
        <p>
          Sac à l’épaule,
          grand sourire,
          il est venu vérifier
          pourquoi Root avait disparu
          pendant plusieurs semaines.
        </p>
      `,

      reunion: `
        <strong>Retrouvailles</strong>
        <p>
          Root court presque vers lui.
          Pour quelques instants,
          le dispositif,
          les Gardiens
          et les mystères disparaissent.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     RÉACTION DE MAX
  ======================================================= */

  setupInteraction({

    selector:
      ".max-reaction-trigger",

    dataAttribute:
      "maxReaction",

    revealId:
      "maxReactionReveal",

    group:
      "max-reaction",

    content: {

      jealousy: `
        <strong>Jalousie</strong>
        <p>
          Max connaissait l’existence
          de Clark.
          Mais le voir réellement
          avec Root
          produit une réaction différente.
        </p>
      `,

      observation: `
        <strong>Observation</strong>
        <p>
          Anna applique exactement
          ce que Max lui apprend :
          elle regarde,
          compare,
          et remarque ce qu’il aimerait cacher.
        </p>
      `,

      anna: `
        <strong>Anna remarque</strong>
        <p>
          Root ne voit rien.
          Anna,
          elle,
          voit immédiatement
          la réaction de Max.
        </p>
      `,

      knowsee: `
        <strong>Savoir et voir</strong>
        <p>
          Connaître une information
          n’a pas le même effet
          que la voir devenir réelle
          devant soi.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 17
     LA LAME MONTRE LE CHEMIN
  ======================================================= */

  setupInteraction({

    selector:
      ".blade-direction-trigger",

    dataAttribute:
      "bladeDirection",

    revealId:
      "bladeDirectionReveal",

    group:
      "blade-direction",

    content: {

      root: `
        <strong>Root — Les Parques</strong>
        <p>
          La Mémoire conserve
          les chemins possibles
          et permet de comprendre
          leurs conséquences.
        </p>
      `,

      peter: `
        <strong>Peter — Janus</strong>
        <p>
          Peter comprend
          les passages,
          les deux orientations
          et le fonctionnement
          des seuils.
        </p>
      `,

      max: `
        <strong>Max — Thoth</strong>
        <p>
          Max conserve,
          vérifie
          et distingue les faits
          de leurs interprétations.
        </p>
      `,

      cave: `
        <strong>Cueva de las Voces</strong>
        <p>
          La nouvelle ligne
          apparue sur la lame
          pointe précisément
          vers la grotte
          où se trouve le dispositif.
        </p>
      `,

      heritages: `
        <strong>Trois héritages</strong>
        <p>
          Parques.
          Janus.
          Thoth.
          Trois fonctions oubliées
          qui commencent enfin
          à retrouver leur sens.
        </p>
      `

    }

  });


  /* =======================================================
     15. RESTAURATION DES BOUTONS DÉCOUVERTS
  ======================================================= */

  function restoreDiscoveredButtons() {

    const mappings = {

      bladeFunction:
        "blade-function",

      deviceReconstruction:
        "device-reconstruction",

      parcae:
        "parcae",

      rootInheritance:
        "root-inheritance",

      janus:
        "janus",

      thoth:
        "thoth",

      tedTruth:
        "ted-truth",

      elieStones:
        "elie-stones",

      elieResponsibility:
        "elie-responsibility",

      threeSymbols:
        "three-symbols",

      inheritances:
        "inheritances",

      routeSymbol:
        "route-symbol",

      forbiddenAccess:
        "forbidden-access",

      researcher:
        "researcher",

      clarkReturn:
        "clark-return",

      maxReaction:
        "max-reaction",

      bladeDirection:
        "blade-direction"

    };


    document
      .querySelectorAll(
        ".interaction-btn"
      )
      .forEach(
        button => {

          Object
            .entries(
              button.dataset
            )
            .forEach(
              ([key, value]) => {

                const group =
                  mappings[key];


                if (!group) {
                  return;
                }


                const storageKey =
                  interactionKey(
                    group,
                    value
                  );


                if (
                  discoveredInteractions
                    .includes(
                      storageKey
                    )
                ) {

                  button
                    .classList
                    .add(
                      "discovered"
                    );

                }

              }
            );

        }
      );

  }


  restoreDiscoveredButtons();


  /* =======================================================
     16. MODE URL :
     ?lecture=reprendre
     ?lecture=recommencer
  ======================================================= */

  function handleReadingMode() {

    const params =
      new URLSearchParams(
        window.location.search
      );


    const mode =
      params.get(
        "lecture"
      );


    if (
      mode ===
      "recommencer"
    ) {

      clearChapterStorage();

      discoveredInteractions = [];


      window.scrollTo({
        top: 0,
        behavior: "auto"
      });


      return;

    }


    if (
      mode ===
      "reprendre"
    ) {

      const savedScroll =
        parseFloat(
          localStorage.getItem(
            STORAGE_SCROLL
          )
        );


      if (
        Number.isFinite(
          savedScroll
        ) &&
        savedScroll > 0
      ) {

        window.setTimeout(
          () => {

            window.scrollTo({
              top: savedScroll,
              behavior: "auto"
            });

          },
          120
        );

      }

    }

  }


  /* =======================================================
     17. RESTAURATION AUTOMATIQUE
  ======================================================= */

  function restoreReadingPosition() {

    const params =
      new URLSearchParams(
        window.location.search
      );


    if (
      params.has(
        "lecture"
      )
    ) {

      return;

    }


    const savedScroll =
      parseFloat(
        localStorage.getItem(
          STORAGE_SCROLL
        )
      );


    if (
      !Number.isFinite(
        savedScroll
      ) ||
      savedScroll <= 0
    ) {

      return;

    }


    window.setTimeout(
      () => {

        window.scrollTo({
          top: savedScroll,
          behavior: "auto"
        });

      },
      150
    );

  }


  /* =======================================================
     18. INITIALISATION
  ======================================================= */

  updateProgress();

  handleReadingMode();

  restoreReadingPosition();


  window.setTimeout(
    updateProgress,
    300
  );


  /* =======================================================
     FIN DU CHAPITRE 25
  ======================================================= */

});
