
"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 28 — LE PRIX DU PIÈGE
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
    "societeOmbre_ch28_";

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
            .includes(key)
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
     JARDIN SILENCIEUX
  ======================================================= */

  setupInteraction({

    selector:
      ".silent-garden-trigger",

    dataAttribute:
      "silentGarden",

    revealId:
      "silentGardenReveal",

    group:
      "silent-garden",

    content: {

      max: `
        <strong>Ce que Max lui a appris</strong>
        <p>
          Anna ne détecte pas le danger
          grâce au Pont.
          Elle utilise simplement
          ce que Max lui a appris :
          observer ce qui ne correspond pas
          au reste.
        </p>
      `,

      birds: `
        <strong>Les oiseaux</strong>
        <p>
          Les drones sont normaux.
          Le jardin aussi.
          Mais les oiseaux ont disparu.
          C'est cette absence
          qui révèle l'anomalie.
        </p>
      `,

      silence: `
        <strong>Trop calme</strong>
        <p>
          Le silence du jardin
          n'est pas naturel.
          Quelque chose a déjà perturbé
          l'environnement autour d'Awake.
        </p>
      `,

      hale: `
        <strong>Réaction de Hale</strong>
        <p>
          Hale comprend immédiatement
          qu'Anna vient de remarquer
          quelque chose de sérieux.
          Il ne cherche pas à discuter.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     PÉRIMÈTRE
  ======================================================= */

  setupInteraction({

    selector:
      ".perimeter-trigger",

    dataAttribute:
      "perimeter",

    revealId:
      "perimeterReveal",

    group:
      "perimeter",

    content: {

      three: `
        <strong>Trois anomalies</strong>
        <p>
          Trois zones du périmètre
          montrent une activité anormale
          au même moment.
        </p>
      `,

      electronic: `
        <strong>Pas électroniques</strong>
        <p>
          Les intrus évitent
          de produire des signatures numériques
          facilement détectables par Peter.
        </p>
      `,

      thermal: `
        <strong>Presque invisibles</strong>
        <p>
          Leur présence thermique
          est extrêmement faible.
          Ils utilisent une technologie
          conçue pour contourner
          les systèmes d'Awake.
        </p>
      `,

      camouflage: `
        <strong>Camouflage</strong>
        <p>
          Clive reconnaît
          la logique des Gardiens :
          ils utilisent leur propre système
          de camouflage.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     OBJECTIF DE L'ASSAUT
  ======================================================= */

  setupInteraction({

    selector:
      ".assault-purpose-trigger",

    dataAttribute:
      "assaultPurpose",

    revealId:
      "assaultPurposeReveal",

    group:
      "assault-purpose",

    content: {

      recon: `
        <strong>Ce n'est pas une reconnaissance</strong>
        <p>
          Amy comprend
          que les mouvements observés
          ne correspondent pas
          à une simple mission
          de surveillance.
        </p>
      `,

      exits: `
        <strong>Fermer les sorties</strong>
        <p>
          Les trois groupes
          prennent position
          de manière à contrôler
          les axes de sortie.
        </p>
      `,

      capture: `
        <strong>Capturer</strong>
        <p>
          Les Gardiens
          ne cherchent pas simplement
          à attaquer Awake.
          Leur dispositif est conçu
          pour empêcher une cible
          de s'échapper.
        </p>
      `,

      target: `
        <strong>Une cible précise</strong>
        <p>
          Quelqu'un à Awake
          est la véritable raison
          de l'opération.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     L'EFFACEUR VISE AMY
  ======================================================= */

  setupInteraction({

    selector:
      ".eraser-target-trigger",

    dataAttribute:
      "eraserTarget",

    revealId:
      "eraserTargetReveal",

    group:
      "eraser-target",

    content: {

      amy: `
        <strong>Amy</strong>
        <p>
          Maître Lee comprend
          qu'une partie de l'assaut
          est directement liée à Amy.
        </p>
      `,

      eraser: `
        <strong>L'Effaceur</strong>
        <p>
          Amy sait immédiatement
          qui est probablement
          derrière cette partie
          de l'attaque.
        </p>
      `,

      personal: `
        <strong>Personnel</strong>
        <p>
          L'Effaceur
          ne considère pas Amy
          comme une simple cible.
          Leur relation est devenue personnelle.
        </p>
      `,

      kill: `
        <strong>Personne d'autre</strong>
        <p>
          Amy sait
          qu'il ne laissera pas
          quelqu'un d'autre
          décider de son sort.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     ROOT EST LA CIBLE
  ======================================================= */

  setupInteraction({

    selector:
      ".root-target-trigger",

    dataAttribute:
      "rootTarget",

    revealId:
      "rootTargetReveal",

    group:
      "root-target",

    content: {

      groups: `
        <strong>Deux groupes</strong>
        <p>
          Les forces adverses
          se divisent volontairement
          en plusieurs directions.
        </p>
      `,

      anna: `
        <strong>Vers Anna</strong>
        <p>
          Un groupe
          maintient la pression
          autour d'Anna,
          cible évidente depuis longtemps.
        </p>
      `,

      root: `
        <strong>Vers Root</strong>
        <p>
          Le deuxième groupe
          révèle la véritable surprise :
          Root est elle aussi
          une cible prioritaire.
        </p>
      `,

      strategy: `
        <strong>Stratégie préparée</strong>
        <p>
          Les Gardiens
          ne se déplacent pas au hasard.
          Ils ont étudié les défenses
          et prévu la séparation
          des membres d'Awake.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     IMPULSION
  ======================================================= */

  setupInteraction({

    selector:
      ".pulse-trigger",

    dataAttribute:
      "pulse",

    revealId:
      "pulseReveal",

    group:
      "pulse",

    content: {

      device: `
        <strong>Petit dispositif</strong>
        <p>
          L'arme utilisée contre Root
          est compacte
          et conçue pour être activée
          à très courte distance.
        </p>
      `,

      pulse: `
        <strong>Impulsion</strong>
        <p>
          Le dispositif
          frappe Root
          sans projectile visible.
        </p>
      `,

      paralysis: `
        <strong>Paralysie</strong>
        <p>
          Son corps se bloque
          presque instantanément,
          assez longtemps
          pour permettre sa capture.
        </p>
      `,

      distance: `
        <strong>Éloigner Lucy</strong>
        <p>
          Les Gardiens
          ne cherchent plus
          à vaincre Lucy.
          Leur seul objectif
          est de créer suffisamment
          de distance entre elle et Root.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
     ENLÈVEMENT DE ROOT
  ======================================================= */

  setupInteraction({

    selector:
      ".root-kidnapping-trigger",

    dataAttribute:
      "rootKidnapping",

    revealId:
      "rootKidnappingReveal",

    group:
      "root-kidnapping",

    content: {

      alive: `
        <strong>Root est vivante</strong>
        <p>
          Max entend encore
          sa respiration
          avant que la liaison
          ne soit coupée.
        </p>
      `,

      separate: `
        <strong>Lucy isolée</strong>
        <p>
          Six Gardiens
          sont mobilisés
          principalement pour empêcher
          Lucy de rejoindre Root.
        </p>
      `,

      withdraw: `
        <strong>Retrait immédiat</strong>
        <p>
          Dès que Root disparaît,
          les groupes ennemis
          cessent presque simultanément
          de combattre.
        </p>
      `,

      goal: `
        <strong>Le véritable objectif</strong>
        <p>
          L'assaut n'avait jamais
          pour but de prendre Awake.
          Il devait seulement
          permettre l'enlèvement de Root.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
     SIX GARDIENS
  ======================================================= */

  setupInteraction({

    selector:
      ".six-guardians-trigger",

    dataAttribute:
      "sixGuardians",

    revealId:
      "sixGuardiansReveal",

    group:
      "six-guardians",

    content: {

      split: `
        <strong>Deux contre quatre</strong>
        <p>
          Les Gardiens pensent
          avoir créé un avantage
          en divisant leurs forces
          entre Hope et Amy.
        </p>
      `,

      dragon: `
        <strong>Dragon</strong>
        <p>
          Le Dragon de Hope
          apparaît brièvement
          lorsqu'elle doit se dégager
          d'une attaque arrière.
        </p>
      `,

      coordination: `
        <strong>Coordination</strong>
        <p>
          Hope et Amy
          n'ont presque plus besoin
          de communiquer.
          Un simple regard
          suffit à synchroniser
          leurs mouvements.
        </p>
      `,

      alive: `
        <strong>Aucun mort</strong>
        <p>
          Les six Gardiens
          sont neutralisés
          sans qu'Hope ou Amy
          n'en tue un seul.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     AMY A CHOISI
  ======================================================= */

  setupInteraction({

    selector:
      ".amy-choice-trigger",

    dataAttribute:
      "amyChoice",

    revealId:
      "amyChoiceReveal",

    group:
      "amy-choice",

    content: {

      mark: `
        <strong>La marque</strong>
        <p>
          L'Effaceur découvre
          la marque protectrice d'Amy
          pour la première fois.
        </p>
      `,

      nothing: `
        <strong>« Rien »</strong>
        <p>
          Amy lui fait comprendre
          qu'Awake ne lui a pas imposé
          cette transformation.
        </p>
      `,

      choice: `
        <strong>Tu as choisi</strong>
        <p>
          L'Effaceur comprend
          ce que la marque signifie réellement :
          Amy n'a pas été transformée
          par les autres.
          Elle a commencé à choisir elle-même.
        </p>
      `,

      gesture: `
        <strong>Le poignet</strong>
        <p>
          Hope tend son poignet
          à Amy.
          Un geste bref,
          devenu une marque
          de confiance entre elles.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     RYTHME DE L'EFFACEUR
  ======================================================= */

  setupInteraction({

    selector:
      ".eraser-rhythm-trigger",

    dataAttribute:
      "eraserRhythm",

    revealId:
      "eraserRhythmReveal",

    group:
      "eraser-rhythm",

    content: {

      rhythm: `
        <strong>Son rythme</strong>
        <p>
          Hope et Amy
          se sont entraînées
          précisément pour reconnaître
          sa manière d'avancer
          et d'enchaîner ses attaques.
        </p>
      `,

      habits: `
        <strong>Ses habitudes</strong>
        <p>
          Même un combattant
          aussi imprévisible que l'Effaceur
          possède des automatismes.
          Elles les connaissent désormais.
        </p>
      `,

      flanks: `
        <strong>Deux flancs</strong>
        <p>
          Hope prend la droite.
          Amy la gauche.
          Elles réduisent
          les possibilités de mouvement
          de leur adversaire.
        </p>
      `,

      opening: `
        <strong>Créer l'ouverture</strong>
        <p>
          Leur objectif
          n'est pas de rivaliser
          avec sa force brute,
          mais de créer
          l'instant précis
          où il perd son équilibre.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     AMY REFUSE DE TUER
  ======================================================= */

  setupInteraction({

    selector:
      ".no-kill-trigger",

    dataAttribute:
      "noKill",

    revealId:
      "noKillReveal",

    group:
      "no-kill",

    content: {

      blade: `
        <strong>La lame</strong>
        <p>
          Amy pourrait utiliser
          sa propre arme
          pour terminer le combat.
        </p>
      `,

      weakness: `
        <strong>Faiblesse ?</strong>
        <p>
          L'Effaceur considère
          son refus de tuer
          comme une faiblesse.
        </p>
      `,

      nerve: `
        <strong>Point nerveux</strong>
        <p>
          Amy choisit
          une frappe précise
          qui neutralise temporairement
          son adversaire
          sans le tuer.
        </p>
      `,

      containment: `
        <strong>Contention</strong>
        <p>
          Hope utilise
          le module conçu par Peter
          pour immobiliser
          les bras de l'Effaceur.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     PRISON
  ======================================================= */

  setupInteraction({

    selector:
      ".prison-trigger",

    dataAttribute:
      "prison",

    revealId:
      "prisonReveal",

    group:
      "prison",

    content: {

      depth: `
        <strong>Profondeur</strong>
        <p>
          La cellule
          est installée très profondément
          sous Awake,
          entourée de roche.
        </p>
      `,

      network: `
        <strong>Aucun réseau</strong>
        <p>
          Aucun accès
          au réseau extérieur
          n'est possible depuis la cellule.
        </p>
      `,

      metal: `
        <strong>Aucun métal libre</strong>
        <p>
          Peter et Clive
          ont éliminé tout élément
          pouvant être détourné
          en outil ou en arme.
        </p>
      `,

      locks: `
        <strong>Pas de serrure traditionnelle</strong>
        <p>
          Même Clive
          ne doit pas pouvoir profiter
          d'un mécanisme classique
          pour sortir.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     ROOT PRISONNIÈRE
  ======================================================= */

  setupInteraction({

    selector:
      ".root-prison-trigger",

    dataAttribute:
      "rootPrison",

    revealId:
      "rootPrisonReveal",

    group:
      "root-prison",

    content: {

      memory: `
        <strong>Mémoire</strong>
        <p>
          Le Maître Noir
          a compris que Root
          représente la fonction
          liée à la Mémoire.
        </p>
      `,

      device: `
        <strong>Dispositif</strong>
        <p>
          Il possède
          les photographies,
          inscriptions et plans,
          mais il lui manque
          encore leur interprétation correcte.
        </p>
      `,

      need: `
        <strong>Besoin de Root</strong>
        <p>
          Root n'est pas prisonnière
          uniquement comme moyen de pression.
          Il a réellement besoin
          de ses connaissances.
        </p>
      `,

      defiance: `
        <strong>Provocation</strong>
        <p>
          Même prisonnière,
          Root refuse
          de lui donner l'avantage psychologique.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     MAUVAISE RÉPONSE
  ======================================================= */

  setupInteraction({

    selector:
      ".false-answer-trigger",

    dataAttribute:
      "falseAnswer",

    revealId:
      "falseAnswerReveal",

    group:
      "false-answer",

    content: {

      symbols: `
        <strong>Symboles</strong>
        <p>
          Le Maître Noir
          possède les inscriptions,
          mais les voir
          ne signifie pas
          les comprendre.
        </p>
      `,

      knowledge: `
        <strong>Ce qu'il sait</strong>
        <p>
          Il connaît déjà
          Root,
          les Parques,
          la Mémoire
          et une partie des fonctions.
        </p>
      `,

      interpret: `
        <strong>Interprétation</strong>
        <p>
          Root reste indispensable
          parce qu'elle peut distinguer
          une traduction plausible
          d'une interprétation correcte.
        </p>
      `,

      lie: `
        <strong>Mauvaise réponse</strong>
        <p>
          Le problème du Maître Noir
          est simple :
          même s'il force Root à parler,
          il ne peut pas savoir
          si elle lui dit la vérité.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     ULTIMATUM
  ======================================================= */

  setupInteraction({

    selector:
      ".ultimatum-trigger",

    dataAttribute:
      "ultimatum",

    revealId:
      "ultimatumReveal",

    group:
      "ultimatum",

    content: {

      root: `
        <strong>Root vivante</strong>
        <p>
          La transmission
          confirme enfin
          que Root est toujours vivante.
        </p>
      `,

      all: `
        <strong>« Vous venez tous »</strong>
        <p>
          Le Maître Noir
          ne demande pas
          un échange limité.
          Il exige la présence
          de tout le groupe.
        </p>
      `,

      functions: `
        <strong>Toutes les fonctions</strong>
        <p>
          Il ne connaît pas forcément
          le rôle exact de chacun,
          mais il sait désormais
          qu'Awake réunit
          plusieurs fonctions essentielles.
        </p>
      `,

      trap: `
        <strong>Le piège</strong>
        <p>
          Le piège annoncé
          au chapitre précédent
          prend forme :
          pour sauver Root,
          Awake risque de réunir
          exactement ce dont
          le Maître Noir a besoin.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     AVANTAGE SECRET
  ======================================================= */

  setupInteraction({

    selector:
      ".hidden-advantage-trigger",

    dataAttribute:
      "hiddenAdvantage",

    revealId:
      "hiddenAdvantageReveal",

    group:
      "hidden-advantage",

    content: {

      ignorance: `
        <strong>Ce qu'il ignore</strong>
        <p>
          Anna comprend
          que le Maître Noir
          ne connaît pas encore
          précisément la fonction
          de chaque membre du groupe.
        </p>
      `,

      functions: `
        <strong>Les fonctions</strong>
        <p>
          Clé.
          Pont.
          Mémoire.
          Ancre.
          Il sait que les pièces existent,
          mais pas nécessairement
          comment elles s'assemblent.
        </p>
      `,

      amy: `
        <strong>Amy</strong>
        <p>
          Amy s'est placée
          volontairement hors champ.
          Le Maître Noir
          ne peut donc pas confirmer
          qu'elle est encore vivante
          et alliée à Awake.
        </p>
      `,

      advantage: `
        <strong>Leur avantage</strong>
        <p>
          L'incertitude du Maître Noir
          peut devenir
          l'un des rares avantages
          qu'Awake possède encore.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 17
     CHACUN DEVRA CHOISIR
  ======================================================= */

  setupInteraction({

    selector:
      ".individual-choice-trigger",

    dataAttribute:
      "individualChoice",

    revealId:
      "individualChoiceReveal",

    group:
      "individual-choice",

    content: {

      lee: `
        <strong>Maître Lee</strong>
        <p>
          Lee refuse
          de transformer sa décision
          en ordre pour les autres.
        </p>
      `,

      anna: `
        <strong>Anna</strong>
        <p>
          Même si elle est le Pont,
          personne n'a le droit
          de décider à sa place
          qu'elle doit se rendre.
        </p>
      `,

      amy: `
        <strong>Amy</strong>
        <p>
          Amy rappelle
          qu'elle peut encore
          devenir une variable
          que le Maître Noir
          n'a pas complètement prévue.
        </p>
      `,

      choice: `
        <strong>Chacun choisit</strong>
        <p>
          La mission à venir
          ne sera pas imposée
          par une prophétie,
          une fonction
          ou Maître Lee.
          Chacun devra décider
          s'il accepte d'y aller.
        </p>
      `

    }

  });


  /* =======================================================
     14. RESTAURATION DES INTERACTIONS
  ======================================================= */

  function restoreDiscoveredButtons() {

    const mappings = {

      silentGarden:
        "silent-garden",

      perimeter:
        "perimeter",

      assaultPurpose:
        "assault-purpose",

      eraserTarget:
        "eraser-target",

      rootTarget:
        "root-target",

      pulse:
        "pulse",

      rootKidnapping:
        "root-kidnapping",

      sixGuardians:
        "six-guardians",

      amyChoice:
        "amy-choice",

      eraserRhythm:
        "eraser-rhythm",

      noKill:
        "no-kill",

      prison:
        "prison",

      rootPrison:
        "root-prison",

      falseAnswer:
        "false-answer",

      ultimatum:
        "ultimatum",

      hiddenAdvantage:
        "hidden-advantage",

      individualChoice:
        "individual-choice"

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
     FIN DU CHAPITRE 28
  ======================================================= */

});
