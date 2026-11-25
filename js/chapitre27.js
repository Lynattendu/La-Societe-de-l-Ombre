
"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 27 — LES MARQUES DU CHOIX
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
    "societeOmbre_ch27_";

  const STORAGE_SCROLL =
    STORAGE_PREFIX + "scroll";

  const STORAGE_PROGRESS =
    STORAGE_PREFIX + "progress";

  const STORAGE_SOUND =
    STORAGE_PREFIX + "sound";

  const STORAGE_INTERACTIONS =
    STORAGE_PREFIX + "interactions";


  /* =======================================================
     3. ÉTAT
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
     6. PROGRESSION
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
     7. SAUVEGARDE DE LA POSITION
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
     8. BOUTON CONTINUER
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
     11. RECOMMENCER
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


  function resetInteractionDisplay() {

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

  }


  function restartReading() {

    clearChapterStorage();

    discoveredInteractions = [];

    resetInteractionDisplay();

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
     12. POPUP
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
     13. BASE DES INTERACTIONS
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
     LA LAME RECONNAÎT LUCY
  ======================================================= */

  setupInteraction({

    selector:
      ".blade-recognition-trigger",

    dataAttribute:
      "bladeRecognition",

    revealId:
      "bladeRecognitionReveal",

    group:
      "blade-recognition",

    content: {

      touch: `
        <strong>Premier contact</strong>
        <p>
          Lucy a déjà touché la lame.
          Elle avait réagi,
          mais sans révéler
          sa véritable fonction.
        </p>
      `,

      weak: `
        <strong>Réaction faible</strong>
        <p>
          Les capteurs de Peter
          détectent une réaction,
          mais elle reste faible
          tant que Lucy se contente
          de tenir l'objet.
        </p>
      `,

      recognize: `
        <strong>Reconnaissance</strong>
        <p>
          La lame sait
          qui se trouve devant elle.
          Elle reconnaît Lucy
          comme liée à sa fonction.
        </p>
      `,

      choose: `
        <strong>Être choisie</strong>
        <p>
          Maître Lee distingue
          deux choses :
          être reconnue
          et être véritablement choisie.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     LA LAME SE DÉSAGRÈGE
  ======================================================= */

  setupInteraction({

    selector:
      ".blade-dissolve-trigger",

    dataAttribute:
      "bladeDissolve",

    revealId:
      "bladeDissolveReveal",

    group:
      "blade-dissolve",

    content: {

      heat: `
        <strong>Chaleur</strong>
        <p>
          Lorsque Lucy rapproche
          la lame de sa poitrine,
          le métal commence
          à chauffer.
        </p>
      `,

      lines: `
        <strong>Lignes lumineuses</strong>
        <p>
          Une première ligne
          apparaît sur l'objet,
          puis une deuxième.
          La réaction s'intensifie.
        </p>
      `,

      vibration: `
        <strong>Vibration</strong>
        <p>
          La lame ne réagit plus
          comme un simple mécanisme.
          Elle donne l'impression
          de se réveiller.
        </p>
      `,

      fracture: `
        <strong>Fissure</strong>
        <p>
          La lame se fissure,
          mais elle ne casse pas.
          Sa matière commence
          à changer d'état.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     LA MARQUE DE LUCY
  ======================================================= */

  setupInteraction({

    selector:
      ".lucy-mark-trigger",

    dataAttribute:
      "lucyMark",

    revealId:
      "lucyMarkReveal",

    group:
      "lucy-mark",

    content: {

      palm: `
        <strong>Paume</strong>
        <p>
          Les particules lumineuses
          pénètrent directement
          dans la paume de Lucy.
        </p>
      `,

      blade: `
        <strong>Silhouette de la lame</strong>
        <p>
          Les premières lignes
          dessinent progressivement
          la forme de la lame
          sur son avant-bras.
        </p>
      `,

      symbols: `
        <strong>Symboles</strong>
        <p>
          Cercles,
          traits,
          points
          et motifs géométriques
          apparaissent autour
          de la forme centrale.
        </p>
      `,

      fingers: `
        <strong>Jusqu'aux doigts</strong>
        <p>
          La marque descend
          jusqu'au bout de chaque doigt,
          chacun devenant
          l'extrémité d'un motif différent.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     LUCY DEVIENT L'INTERFACE
  ======================================================= */

  setupInteraction({

    selector:
      ".anchor-interface-trigger",

    dataAttribute:
      "anchorInterface",

    revealId:
      "anchorInterfaceReveal",

    group:
      "anchor-interface",

    content: {

      slot: `
        <strong>La fente</strong>
        <p>
          L'emplacement observé
          dans le dispositif
          n'était peut-être pas conçu
          pour recevoir une lame.
        </p>
      `,

      hand: `
        <strong>La main</strong>
        <p>
          La forme correspond
          avec précision
          à la main marquée de Lucy.
        </p>
      `,

      forearm: `
        <strong>L'avant-bras</strong>
        <p>
          La correspondance
          ne s'arrête pas à la paume :
          elle se poursuit
          sur l'avant-bras.
        </p>
      `,

      interface: `
        <strong>Interface</strong>
        <p>
          Lucy n'est pas destinée
          à porter l'objet.
          Elle devient elle-même
          l'interface entre l'Ancre
          et le dispositif.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     FORME PROVISOIRE
  ======================================================= */

  setupInteraction({

    selector:
      ".provisional-form-trigger",

    dataAttribute:
      "provisionalForm",

    revealId:
      "provisionalFormReveal",

    group:
      "provisional-form",

    content: {

      find: `
        <strong>Trouver Lucy</strong>
        <p>
          Root comprend
          que la lame pouvait servir
          à identifier
          la personne destinée
          à devenir l'Ancre.
        </p>
      `,

      ready: `
        <strong>Être prête</strong>
        <p>
          Hope envisage
          que la lame ait simplement attendu
          que Lucy soit prête
          à recevoir sa fonction.
        </p>
      `,

      choice: `
        <strong>Choisir</strong>
        <p>
          Recevoir la fonction
          n'est pas encore
          choisir ce que Lucy
          décidera d'en faire.
        </p>
      `,

      opaque: `
        <strong>Opaque</strong>
        <p>
          Lucy reste une Indécise.
          Sa véritable transformation
          en Opaque
          n'a pas encore eu lieu.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     DÉPART DE CLARK
  ======================================================= */

  setupInteraction({

    selector:
      ".clark-departure-trigger",

    dataAttribute:
      "clarkDeparture",

    revealId:
      "clarkDepartureReveal",

    group:
      "clark-departure",

    content: {

      surprise: `
        <strong>La surprise</strong>
        <p>
          Clark pensait simplement
          venir surprendre Root.
          Il repart avec une vision
          beaucoup plus étrange
          de sa nouvelle réalité.
        </p>
      `,

      losangeles: `
        <strong>Los Angeles</strong>
        <p>
          Clark doit repartir
          pour un tournage
          d'au moins trois semaines.
        </p>
      `,

      root: `
        <strong>Root</strong>
        <p>
          Leur relation reste stable
          malgré la distance,
          les missions
          et les dangers.
        </p>
      `,

      return: `
        <strong>Il revient toujours</strong>
        <p>
          Pour Root,
          le retour de Clark
          est devenu une certitude importante.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
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

      lookaway: `
        <strong>Il détourne les yeux</strong>
        <p>
          Max essaie toujours
          de masquer
          ce qu'il ressent
          lorsqu'il voit Root avec Clark.
        </p>
      `,

      anna: `
        <strong>Anna remarque</strong>
        <p>
          Anna continue
          d'appliquer les leçons de Max :
          observer avant de conclure.
        </p>
      `,

      care: `
        <strong>« Prends soin d'elle »</strong>
        <p>
          La phrase de Clark
          place soudain Max
          dans une position
          qu'il n'avait pas anticipée.
        </p>
      `,

      reaction: `
        <strong>Une fraction de seconde</strong>
        <p>
          Max ne réagit presque pas.
          Presque.
          Anna voit pourtant
          exactement ce qui s'est passé.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
     ENTRAÎNEMENT HOPE / AMY
  ======================================================= */

  setupInteraction({

    selector:
      ".hope-amy-training-trigger",

    dataAttribute:
      "hopeAmyTraining",

    revealId:
      "hopeAmyTrainingReveal",

    group:
      "hope-amy-training",

    content: {

      light: `
        <strong>Entraînement léger</strong>
        <p>
          Le projet initial
          était une simple reprise.
          Hope et Amy
          oublient rapidement cette idée.
        </p>
      `,

      dragon: `
        <strong>Dragon</strong>
        <p>
          Le Dragon de Hope
          apparaît légèrement
          avant même
          que l'affrontement commence réellement.
        </p>
      `,

      rhythm: `
        <strong>Même rythme</strong>
        <p>
          Elles ne se battent plus
          comme deux adversaires
          qui cherchent à se dominer.
          Leurs mouvements commencent
          à s'accorder.
        </p>
      `,

      trust: `
        <strong>Confiance</strong>
        <p>
          La confiance
          qu'elles réapprennent
          devient visible
          jusque dans leur manière
          de se relever ensemble.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     APPARITION DE LA MARQUE D'AMY
  ======================================================= */

  setupInteraction({

    selector:
      ".amy-mark-trigger",

    dataAttribute:
      "amyMark",

    revealId:
      "amyMarkReveal",

    group:
      "amy-mark",

    content: {

      heat: `
        <strong>Chaleur</strong>
        <p>
          La transformation
          commence par une chaleur
          qui apparaît
          sur l'épaule d'Amy.
        </p>
      `,

      inside: `
        <strong>Énergie intérieure</strong>
        <p>
          Le tissu noircit
          sans véritable flamme,
          comme si l'énergie
          provenait directement
          du corps d'Amy.
        </p>
      `,

      back: `
        <strong>Dos et épaules</strong>
        <p>
          Les premières lignes
          se dessinent dans son dos
          avant de gagner
          les épaules.
        </p>
      `,

      arms: `
        <strong>Bras</strong>
        <p>
          Les marques
          se prolongent ensuite
          le long de ses bras
          jusqu'aux poignets.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     AMY PROTECTRICE
  ======================================================= */

  setupInteraction({

    selector:
      ".protector-mark-trigger",

    dataAttribute:
      "protectorMark",

    revealId:
      "protectorMarkReveal",

    group:
      "protector-mark",

    content: {

      shield: `
        <strong>Bouclier</strong>
        <p>
          Le centre du motif
          prend la forme
          d'un vaste bouclier stylisé.
        </p>
      `,

      wings: `
        <strong>Ailes protectrices</strong>
        <p>
          Deux ailes
          entourent le motif central.
          Leur forme évoque
          clairement la protection.
        </p>
      `,

      star: `
        <strong>Étoile directionnelle</strong>
        <p>
          Au centre,
          une étoile directionnelle
          suggère autant
          la protection
          que l'orientation.
        </p>
      `,

      response: `
        <strong>Dragon et Phénix</strong>
        <p>
          Le Dragon
          puis le Phénix de Hope
          s'illuminent en réponse
          à l'apparition de la marque d'Amy.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     ANNA COMPREND BETTY
  ======================================================= */

  setupInteraction({

    selector:
      ".anna-betty-trigger",

    dataAttribute:
      "annaBetty",

    revealId:
      "annaBettyReveal",

    group:
      "anna-betty",

    content: {

      scientist: `
        <strong>La scientifique</strong>
        <p>
          Anna reconnaît immédiatement
          la fascination scientifique
          de sa mère
          lorsqu'elle observe Hope.
        </p>
      `,

      affection: `
        <strong>Affection</strong>
        <p>
          Mais cette fois,
          Anna voit autre chose :
          Betty ne regarde pas Hope
          seulement comme un sujet d'étude.
        </p>
      `,

      fear: `
        <strong>Peur de perdre</strong>
        <p>
          Anna comprend
          que Betty vit avec
          une peur profonde
          de perdre les personnes
          auxquelles elle tient.
        </p>
      `,

      protect: `
        <strong>Trop protéger</strong>
        <p>
          Cette peur explique
          en partie
          pourquoi Betty cherche parfois
          à contrôler
          ou protéger excessivement
          ceux qu'elle aime.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     PETER / CLIVE
  ======================================================= */

  setupInteraction({

    selector:
      ".peter-clive-trigger",

    dataAttribute:
      "peterClive",

    revealId:
      "peterCliveReveal",

    group:
      "peter-clive",

    content: {

      module: `
        <strong>Module thermique</strong>
        <p>
          Peter démonte
          la technologie récupérée
          sur les Gardiens
          afin d'en comprendre
          les limites.
        </p>
      `,

      smaller: `
        <strong>Plus petit</strong>
        <p>
          Clive veut immédiatement
          transformer la technologie
          en un outil
          plus discret.
        </p>
      `,

      silent: `
        <strong>Silencieux</strong>
        <p>
          Pour Clive,
          une technologie utile
          doit pouvoir être employée
          sans attirer l'attention.
        </p>
      `,

      friends: `
        <strong>Amis ?</strong>
        <p>
          Peter et Clive
          refusent encore le mot.
          Leur manière de travailler ensemble
          commence pourtant
          à raconter autre chose.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     RÉSEAU MÉDICAL
  ======================================================= */

  setupInteraction({

    selector:
      ".medical-network-trigger",

    dataAttribute:
      "medicalNetwork",

    revealId:
      "medicalNetworkReveal",

    group:
      "medical-network",

    content: {

      companies: `
        <strong>Sociétés écrans</strong>
        <p>
          Élie identifie
          deux nouvelles structures
          utilisées par le réseau
          lié à Hidalgo.
        </p>
      `,

      technicians: `
        <strong>Techniciens</strong>
        <p>
          Les recrutements
          ne concernaient pas seulement
          le transport :
          géologues,
          ingénieurs
          et spécialistes des matériaux
          étaient aussi recherchés.
        </p>
      `,

      doctors: `
        <strong>Médecins</strong>
        <p>
          La présence de médecins
          change immédiatement
          la nature du problème
          aux yeux d'Élie et Betty.
        </p>
      `,

      names: `
        <strong>Les noms</strong>
        <p>
          Pour la première fois,
          Élie obtient
          l'identité complète
          des personnes recrutées.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     MARQUE DORMANTE D'AMY
  ======================================================= */

  setupInteraction({

    selector:
      ".dormant-mark-trigger",

    dataAttribute:
      "dormantMark",

    revealId:
      "dormantMarkReveal",

    group:
      "dormant-mark",

    content: {

      different: `
        <strong>Différente de Hope</strong>
        <p>
          La marque d'Amy
          ne correspond pas
          aux marqueurs du Dragon
          ou du Phénix.
        </p>
      `,

      activation: `
        <strong>Même logique d'activation</strong>
        <p>
          Betty reconnaît pourtant
          une activation comparable :
          quelque chose de préexistant
          s'est réveillé.
        </p>
      `,

      dormant: `
        <strong>Dormante</strong>
        <p>
          La marque
          semblait présente
          depuis longtemps
          sans être visible.
        </p>
      `,

      inside: `
        <strong>Déjà en elle</strong>
        <p>
          Charles confirme
          que le corps d'Amy
          n'a pas créé la marque
          ce jour-là :
          elle était déjà là.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     SA MAIN EST LA LAME
  ======================================================= */

  setupInteraction({

    selector:
      ".hand-is-blade-trigger",

    dataAttribute:
      "handIsBlade",

    revealId:
      "handIsBladeReveal",

    group:
      "hand-is-blade",

    content: {

      replace: `
        <strong>Remplace la lame</strong>
        <p>
          Peter formule
          la première hypothèse :
          la main de Lucy
          aurait remplacé l'objet.
        </p>
      `,

      is: `
        <strong>Est la lame</strong>
        <p>
          Root corrige immédiatement :
          Lucy ne remplace pas
          la lame.
          Sa main est devenue
          ce que la lame représentait.
        </p>
      `,

      person: `
        <strong>Une personne</strong>
        <p>
          Le dispositif
          n'attendait finalement
          pas un artefact.
          Il attendait une personne.
        </p>
      `,

      temporary: `
        <strong>Forme provisoire</strong>
        <p>
          Maître Lee comprend
          que l'objet physique
          n'était qu'une forme temporaire
          destinée à subsister
          jusqu'à l'arrivée de l'Ancre.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     LUCY / FUTURE OPAQUE
  ======================================================= */

  setupInteraction({

    selector:
      ".opaque-choice-trigger",

    dataAttribute:
      "opaqueChoice",

    revealId:
      "opaqueChoiceReveal",

    group:
      "opaque-choice",

    content: {

      anchor: `
        <strong>Ancrer</strong>
        <p>
          Lucy peut déjà
          remplir une partie
          de sa fonction :
          stabiliser le seuil.
        </p>
      `,

      direction: `
        <strong>Maintenir la direction</strong>
        <p>
          Root soupçonne
          que l'Ancre permet également
          de garder la direction ouverte
          assez longtemps
          pour maintenir l'appel.
        </p>
      `,

      indispensable: `
        <strong>Indispensable</strong>
        <p>
          Anna comprend
          que Lucy devient,
          elle aussi,
          une composante irremplaçable
          du fonctionnement complet.
        </p>
      `,

      opaque: `
        <strong>Devenir Opaque</strong>
        <p>
          Lucy peut déjà ancrer,
          mais personne ne sait
          ce que sa fonction deviendra
          lorsqu'elle aura réellement
          choisi sa voie.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 17
     DEUX CHOIX QUI APPROCHENT
  ======================================================= */

  setupInteraction({

    selector:
      ".final-choice-trigger",

    dataAttribute:
      "finalChoice",

    revealId:
      "finalChoiceReveal",

    group:
      "final-choice",

    content: {

      waiting: `
        <strong>Quelque chose attend</strong>
        <p>
          Lucy ne ressent pas
          simplement la marque.
          Elle a l'impression
          qu'elle attend une décision.
        </p>
      `,

      decide: `
        <strong>Décider</strong>
        <p>
          Sa fonction
          ne lui impose pas encore
          une voie.
          Elle lui demande
          ce qu'elle veut en faire.
        </p>
      `,

      lucy: `
        <strong>Lucy</strong>
        <p>
          Elle approche
          du moment
          où elle devra choisir
          ce que signifie réellement
          devenir Opaque.
        </p>
      `,

      amy: `
        <strong>Amy</strong>
        <p>
          Dans une autre pièce,
          Amy regarde ses propres marques.
          Elle aussi doit décider
          ce qu'elle fera désormais
          de ce qu'elle est.
        </p>
      `

    }

  });


  /* =======================================================
     14. RESTAURATION DES INTERACTIONS
  ======================================================= */

  function restoreDiscoveredButtons() {

    const mappings = {

      bladeRecognition:
        "blade-recognition",

      bladeDissolve:
        "blade-dissolve",

      lucyMark:
        "lucy-mark",

      anchorInterface:
        "anchor-interface",

      provisionalForm:
        "provisional-form",

      clarkDeparture:
        "clark-departure",

      maxReaction:
        "max-reaction",

      hopeAmyTraining:
        "hope-amy-training",

      amyMark:
        "amy-mark",

      protectorMark:
        "protector-mark",

      annaBetty:
        "anna-betty",

      peterClive:
        "peter-clive",

      medicalNetwork:
        "medical-network",

      dormantMark:
        "dormant-mark",

      handIsBlade:
        "hand-is-blade",

      opaqueChoice:
        "opaque-choice",

      finalChoice:
        "final-choice"

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
     15. MODE URL
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

      resetInteractionDisplay();


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
     16. RESTAURATION AUTOMATIQUE
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
     17. INITIALISATION
  ======================================================= */

  updateProgress();

  handleReadingMode();

  restoreReadingPosition();


  window.setTimeout(
    updateProgress,
    300
  );


  /* =======================================================
     FIN DU CHAPITRE 27
  ======================================================= */

});
