
"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 29 — AVANT LA PORTE
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
    "societeOmbre_ch29_";

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
      .add(
        "open"
      );


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
        .includes(
          key
        );


    if (isNew) {

      discoveredInteractions
        .push(
          key
        );

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
      document.getElementById(
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
     LUCY — APPRENDRE OU SE PUNIR
  ======================================================= */

  setupInteraction({

    selector:
      ".lucy-guilt-trigger",

    dataAttribute:
      "lucyGuilt",

    revealId:
      "lucyGuiltReveal",

    group:
      "lucy-guilt",

    content: {

      "too-hard": `
        <strong>Trop vite, trop fort</strong>
        <p>
          Lucy ne cherche pas seulement
          à progresser.
          Elle essaie de compenser
          ce qui s'est passé avec Root
          en allant toujours plus vite
          et plus fort.
        </p>
      `,

      punish: `
        <strong>Se punir</strong>
        <p>
          Amy comprend
          que l'entraînement
          risque de devenir
          une manière pour Lucy
          de se punir elle-même.
        </p>
      `,

      learn: `
        <strong>Apprendre</strong>
        <p>
          La vraie question
          n'est pas de savoir
          si Lucy peut souffrir davantage,
          mais si elle peut transformer
          l'échec en information.
        </p>
      `,

      again: `
        <strong>Encore</strong>
        <p>
          Lucy refuse d'arrêter.
          Son obsession peut devenir
          une force,
          à condition qu'elle change
          ce qu'elle cherche
          à obtenir de chaque chute.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     CE QU'ELLE FAIT DE L'ÉCHEC
  ======================================================= */

  setupInteraction({

    selector:
      ".failure-choice-trigger",

    dataAttribute:
      "failureChoice",

    revealId:
      "failureChoiceReveal",

    group:
      "failure-choice",

    content: {

      there: `
        <strong>J'étais là</strong>
        <p>
          Lucy ne supporte pas
          d'avoir assisté
          à l'enlèvement de Root
          sans avoir pu l'empêcher.
        </p>
      `,

      failed: `
        <strong>Je n'y suis pas arrivée</strong>
        <p>
          Lee ne nie pas l'échec.
          Il ne cherche pas
          à le rendre moins réel
          pour la rassurer.
        </p>
      `,

      now: `
        <strong>Et maintenant ?</strong>
        <p>
          Pour Lee,
          la question importante
          commence après l'échec :
          que fait-on
          de ce qui vient d'arriver ?
        </p>
      `,

      meaning: `
        <strong>Ce qu'elle en fait</strong>
        <p>
          Lucy ne peut pas modifier
          le passé.
          Elle peut cependant choisir
          la manière dont cette expérience
          influencera la suite.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     AVANT LE MOUVEMENT
  ======================================================= */

  setupInteraction({

    selector:
      ".pre-movement-trigger",

    dataAttribute:
      "preMovement",

    revealId:
      "preMovementReveal",

    group:
      "pre-movement",

    content: {

      see: `
        <strong>Avant de voir</strong>
        <p>
          Une action physique
          commence avant
          que l'œil puisse identifier
          clairement le mouvement.
        </p>
      `,

      hear: `
        <strong>Avant d'entendre</strong>
        <p>
          Le bruit
          n'est qu'une conséquence.
          Le corps,
          l'air et le sol
          ont déjà changé avant lui.
        </p>
      `,

      understand: `
        <strong>Avant de comprendre</strong>
        <p>
          Le cerveau cherche
          naturellement à nommer
          et expliquer.
          Mais cette analyse
          peut arriver trop tard
          dans un combat.
        </p>
      `,

      movement: `
        <strong>Avant le mouvement</strong>
        <p>
          Maître Lee veut apprendre
          au groupe à repérer
          les signes qui précèdent
          l'action visible.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     TOUT EST ÉNERGIE
  ======================================================= */

  setupInteraction({

    selector:
      ".energy-reading-trigger",

    dataAttribute:
      "energyReading",

    revealId:
      "energyReadingReveal",

    group:
      "energy-reading",

    content: {

      weight: `
        <strong>Poids</strong>
        <p>
          Avant un déplacement,
          le poids du corps
          change déjà d'appui.
        </p>
      `,

      air: `
        <strong>Air</strong>
        <p>
          Un corps qui se déplace
          modifie l'air
          qui l'entoure.
        </p>
      `,

      breath: `
        <strong>Souffle</strong>
        <p>
          La respiration
          peut trahir
          l'effort,
          l'intention
          ou le moment d'une attaque.
        </p>
      `,

      pressure: `
        <strong>Pression</strong>
        <p>
          Le sol reçoit
          la pression du corps
          avant même
          que le mouvement
          soit complètement visible.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     LUCY SENT LE MOUVEMENT
  ======================================================= */

  setupInteraction({

    selector:
      ".lucy-sense-trigger",

    dataAttribute:
      "lucySense",

    revealId:
      "lucySenseReveal",

    group:
      "lucy-sense",

    content: {

      late: `
        <strong>Trop tard</strong>
        <p>
          Lucy continue d'abord
          à attendre
          que le mouvement soit évident
          avant de réagir.
        </p>
      `,

      slow: `
        <strong>Ralentir</strong>
        <p>
          En ralentissant
          sa respiration,
          elle cesse progressivement
          de forcer l'anticipation.
        </p>
      `,

      air: `
        <strong>Changement dans l'air</strong>
        <p>
          Pour la première fois,
          Lucy perçoit
          un changement physique
          avant le contact.
        </p>
      `,

      before: `
        <strong>Avant le contact</strong>
        <p>
          Elle se déplace
          avant qu'Hope
          puisse la toucher.
          C'est exactement
          ce que Lee cherchait
          à lui faire comprendre.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     BILLE DE RECONNAISSANCE
  ======================================================= */

  setupInteraction({

    selector:
      ".scout-ball-trigger",

    dataAttribute:
      "scoutBall",

    revealId:
      "scoutBallReveal",

    group:
      "scout-ball",

    content: {

      inertial: `
        <strong>Capteur inertiel</strong>
        <p>
          La bille enregistre
          précisément
          ses propres déplacements
          pendant qu'elle roule.
        </p>
      `,

      lidar: `
        <strong>Lidar miniature</strong>
        <p>
          Le lidar
          mesure les distances
          et permet de reconstruire
          les volumes autour
          de sa trajectoire.
        </p>
      `,

      scan: `
        <strong>Scanner</strong>
        <p>
          La bille observe
          les murs,
          ouvertures,
          reliefs,
          sources de chaleur
          et mouvements.
        </p>
      `,

      map: `
        <strong>Carte 3D</strong>
        <p>
          Toutes les données
          sont combinées
          pour produire rapidement
          une représentation
          tridimensionnelle
          de l'environnement.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
     ARAIGNÉES MÉCANIQUES
  ======================================================= */

  setupInteraction({

    selector:
      ".spider-trigger",

    dataAttribute:
      "spider",

    revealId:
      "spiderReveal",

    group:
      "spider",

    content: {

      observe: `
        <strong>Observer</strong>
        <p>
          Les petites unités
          peuvent filmer,
          écouter
          et transmettre
          sans attirer facilement
          l'attention.
        </p>
      `,

      climb: `
        <strong>Grimper</strong>
        <p>
          Leur mobilité
          leur permet
          de progresser
          sur différentes surfaces
          et d'atteindre
          des zones difficiles.
        </p>
      `,

      needle: `
        <strong>Micro-aiguille</strong>
        <p>
          Chaque araignée
          possède une très petite aiguille
          utilisable uniquement
          à très courte portée.
        </p>
      `,

      sedative: `
        <strong>Sédatif</strong>
        <p>
          La dose embarquée
          peut neutraliser brièvement
          une personne non protégée,
          mais les réserves
          sont extrêmement limitées.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
     BALISES DE PROXIMITÉ
  ======================================================= */

  setupInteraction({

    selector:
      ".proximity-trigger",

    dataAttribute:
      "proximity",

    revealId:
      "proximityReveal",

    group:
      "proximity",

    content: {

      separation: `
        <strong>Séparation</strong>
        <p>
          Le système est conçu
          en réponse directe
          à ce qui est arrivé
          à Lucy et Root.
        </p>
      `,

      alert: `
        <strong>Alerte</strong>
        <p>
          Une séparation brutale
          au-delà de la distance fixée
          déclenche immédiatement
          une alerte.
        </p>
      `,

      tracking: `
        <strong>Direction et vitesse</strong>
        <p>
          L'équipe peut savoir
          dans quelle direction
          une personne est déplacée,
          à quelle vitesse
          et quel obstacle
          se trouve entre les deux.
        </p>
      `,

      pair: `
        <strong>Binômes</strong>
        <p>
          Chaque membre
          peut être associé
          à une autre personne
          afin que la séparation
          devienne immédiatement visible.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     LES QUATRE DIRECTIONS
  ======================================================= */

  setupInteraction({

    selector:
      ".directions-trigger",

    dataAttribute:
      "directions",

    revealId:
      "directionsReveal",

    group:
      "directions",

    content: {

      north: `
        <strong>Nord</strong>
        <p>
          La Mémoire
          apparaît toujours
          dans la position nord.
        </p>
      `,

      south: `
        <strong>Sud</strong>
        <p>
          Le Pont
          occupe systématiquement
          le point opposé :
          le sud.
        </p>
      `,

      east: `
        <strong>Est</strong>
        <p>
          La Clé
          correspond physiquement
          à l'axe est
          du dispositif.
        </p>
      `,

      west: `
        <strong>Ouest</strong>
        <p>
          L'Ancre
          occupe la position ouest.
          Les quatre fonctions
          dessinent donc
          une véritable géographie.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     MAUVAIS ASSEMBLAGE
  ======================================================= */

  setupInteraction({

    selector:
      ".wrong-assembly-trigger",

    dataAttribute:
      "wrongAssembly",

    revealId:
      "wrongAssemblyReveal",

    group:
      "wrong-assembly",

    content: {

      memory: `
        <strong>Mémoire au nord</strong>
        <p>
          La position de la Mémoire
          n'est pas symbolique.
          Elle correspond
          à une orientation réelle
          du dispositif.
        </p>
      `,

      bridge: `
        <strong>Pont au sud</strong>
        <p>
          Le Pont
          doit être placé
          sur l'axe sud
          pour respecter
          la géométrie originale.
        </p>
      `,

      "key-anchor": `
        <strong>Clé / Ancre</strong>
        <p>
          La Clé
          doit être à l'est
          et l'Ancre
          à l'ouest.
        </p>
      `,

      misaligned: `
        <strong>Axes décalés</strong>
        <p>
          Certaines pierres
          ont été inversées
          et deux axes
          sont décalés.
          Le dispositif peut réagir,
          mais pas fonctionner
          correctement.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     FENÊTRE CÉLESTE
  ======================================================= */

  setupInteraction({

    selector:
      ".celestial-window-trigger",

    dataAttribute:
      "celestialWindow",

    revealId:
      "celestialWindowReveal",

    group:
      "celestial-window",

    content: {

      sun: `
        <strong>Soleil</strong>
        <p>
          Le Soleil
          fait partie
          de la configuration
          représentée
          au-dessus du cercle.
        </p>
      `,

      moon: `
        <strong>Lune</strong>
        <p>
          La position de la Lune
          doit elle aussi
          correspondre
          à la géométrie attendue.
        </p>
      `,

      planets: `
        <strong>Trois planètes</strong>
        <p>
          Les trois points
          que Root prenait
          pour des marques
          sont en réalité
          trois planètes.
        </p>
      `,

      window: `
        <strong>Une fois par an</strong>
        <p>
          L'ensemble
          ne représente pas
          une date rituelle,
          mais une courte fenêtre
          astronomique
          qui ne se produit
          qu'une fois par an.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     ROOT MENT
  ======================================================= */

  setupInteraction({

    selector:
      ".root-lie-trigger",

    dataAttribute:
      "rootLie",

    revealId:
      "rootLieReveal",

    group:
      "root-lie",

    content: {

      artificial: `
        <strong>Fragments artificiels</strong>
        <p>
          Root dirige volontairement
          l'attention du Maître Noir
          vers une information
          qu'il connaît déjà.
        </p>
      `,

      translation: `
        <strong>Mauvaise traduction</strong>
        <p>
          Elle utilise
          son expertise linguistique
          pour introduire
          une interprétation
          difficile à vérifier.
        </p>
      `,

      possible: `
        <strong>« Passage possible »</strong>
        <p>
          La formulation
          n'est pas complètement fausse,
          mais elle ne donne
          au Maître Noir
          aucune information réellement utile.
        </p>
      `,

      lie: `
        <strong>Évidemment</strong>
        <p>
          Root ne cherche même pas
          à lui faire croire
          qu'elle coopère totalement.
          Elle transforme
          son expertise
          en arme.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     ANTAGONISTE
  ======================================================= */

  setupInteraction({

    selector:
      ".antidote-trigger",

    dataAttribute:
      "antidote",

    revealId:
      "antidoteReveal",

    group:
      "antidote",

    content: {

      paralysis: `
        <strong>Paralysant</strong>
        <p>
          L'injecteur
          contient un agent
          neuromusculaire
          à action rapide.
        </p>
      `,

      reversible: `
        <strong>Réversible</strong>
        <p>
          Son effet
          n'est normalement
          pas permanent,
          ce qui confirme
          que Root devait être capturée
          vivante.
        </p>
      `,

      antagonist: `
        <strong>Antagoniste</strong>
        <p>
          Charles peut maintenant
          préparer un produit
          capable de réduire
          fortement la durée
          de la paralysie.
        </p>
      `,

      minutes: `
        <strong>Quelques minutes</strong>
        <p>
          Même une réduction
          de quelques minutes
          peut devenir décisive
          pendant l'opération.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     BETTY ACCEPTE
  ======================================================= */

  setupInteraction({

    selector:
      ".betty-accept-trigger",

    dataAttribute:
      "bettyAccept",

    revealId:
      "bettyAcceptReveal",

    group:
      "betty-accept",

    content: {

      fear: `
        <strong>La peur</strong>
        <p>
          Betty reconnaît enfin
          que sa peur
          ne peut pas devenir
          une raison suffisante
          pour décider
          à la place d'Anna.
        </p>
      `,

      choice: `
        <strong>Le choix d'Anna</strong>
        <p>
          Anna maintient
          sa décision de participer,
          même après
          l'enlèvement de Root.
        </p>
      `,

      return: `
        <strong>Reviens-moi</strong>
        <p>
          Betty ne lui demande plus
          de rester.
          Elle lui demande seulement
          de revenir.
        </p>
      `,

      both: `
        <strong>Toi aussi</strong>
        <p>
          Anna retourne
          la même demande
          à sa mère.
          Pour la première fois,
          la protection fonctionne
          dans les deux sens.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     DIVERSION D'ÉLIE
  ======================================================= */

  setupInteraction({

    selector:
      ".elie-diversion-trigger",

    dataAttribute:
      "elieDiversion",

    revealId:
      "elieDiversionReveal",

    group:
      "elie-diversion",

    content: {

      convoys: `
        <strong>Trois convois</strong>
        <p>
          Élie déploie
          plusieurs mouvements simultanés
          pour multiplier
          les pistes à surveiller.
        </p>
      `,

      routes: `
        <strong>Itinéraires</strong>
        <p>
          Les routes secondaires
          donnent aux Gardiens
          plusieurs cibles potentielles
          à suivre.
        </p>
      `,

      fake: `
        <strong>Faux groupe</strong>
        <p>
          Le véritable groupe
          n'est pas avec Élie.
          Sa mission consiste
          précisément
          à faire croire le contraire.
        </p>
      `,

      noise: `
        <strong>Créer du bruit</strong>
        <p>
          Surveillances,
          relais,
          déplacements :
          Élie veut saturer
          les capacités d'observation
          ennemies.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     BINÔMES
  ======================================================= */

  setupInteraction({

    selector:
      ".pairs-trigger",

    dataAttribute:
      "pairs",

    revealId:
      "pairsReveal",

    group:
      "pairs",

    content: {

      "betty-hale": `
        <strong>Betty / Hale</strong>
        <p>
          Hale apporte
          la protection tactique
          dont Betty aura besoin
          sans l'éloigner
          du reste du groupe.
        </p>
      `,

      "lucy-amy": `
        <strong>Lucy / Amy</strong>
        <p>
          Amy possède
          l'expérience du terrain,
          tandis que Lucy
          est devenue l'Ancre.
          Leur association
          rend aussi plus difficile
          une nouvelle séparation.
        </p>
      `,

      "hope-clive": `
        <strong>Hope / Clive</strong>
        <p>
          La Clé
          est associée
          au membre le plus capable
          d'improviser
          et de contourner
          un obstacle inattendu.
        </p>
      `,

      "max-peter": `
        <strong>Max / Peter</strong>
        <p>
          Peter observe
          les données techniques.
          Max cherche justement
          ce que les données
          pourraient ne pas montrer.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 17
     47 MINUTES
  ======================================================= */

  setupInteraction({

    selector:
      ".forty-seven-trigger",

    dataAttribute:
      "fortySeven",

    revealId:
      "fortySevenReveal",

    group:
      "forty-seven",

    content: {

      positions: `
        <strong>Quatre positions</strong>
        <p>
          Root mémorise
          une dernière fois
          la géographie exacte :
          Mémoire nord,
          Pont sud,
          Clé est,
          Ancre ouest.
        </p>
      `,

      sky: `
        <strong>Le ciel</strong>
        <p>
          La position
          des corps célestes
          détermine
          le moment
          où le dispositif
          peut réellement fonctionner.
        </p>
      `,

      duration: `
        <strong>47 minutes</strong>
        <p>
          La fenêtre exacte
          est extrêmement courte :
          quarante-sept minutes.
        </p>
      `,

      tomorrow: `
        <strong>Demain soir</strong>
        <p>
          Root sait désormais
          que l'opération
          du Maître Noir
          doit nécessairement
          se dérouler
          le lendemain soir.
        </p>
      `

    }

  });


  /* =======================================================
     14. RESTAURATION DES INTERACTIONS
  ======================================================= */

  function restoreDiscoveredButtons() {

    const mappings = {

      lucyGuilt:
        "lucy-guilt",

      failureChoice:
        "failure-choice",

      preMovement:
        "pre-movement",

      energyReading:
        "energy-reading",

      lucySense:
        "lucy-sense",

      scoutBall:
        "scout-ball",

      spider:
        "spider",

      proximity:
        "proximity",

      directions:
        "directions",

      wrongAssembly:
        "wrong-assembly",

      celestialWindow:
        "celestial-window",

      rootLie:
        "root-lie",

      antidote:
        "antidote",

      bettyAccept:
        "betty-accept",

      elieDiversion:
        "elie-diversion",

      pairs:
        "pairs",

      fortySeven:
        "forty-seven"

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


      return "restart";

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


      return "resume";

    }


    return "normal";

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


  const readingMode =
    handleReadingMode();


  if (
    readingMode !==
    "restart"
  ) {

    restoreDiscoveredButtons();

  }


  restoreReadingPosition();


  window.setTimeout(
    updateProgress,
    300
  );


  /* =======================================================
     FIN DU CHAPITRE 29
  ======================================================= */

});
