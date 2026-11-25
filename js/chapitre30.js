
"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 30 — LA CONVERGENCE
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
    "societeOmbre_ch30_";

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
     LES TROIS CONVOIS
  ======================================================= */

  setupInteraction({

    selector:
      ".convoys-trigger",

    dataAttribute:
      "convoys",

    revealId:
      "convoysReveal",

    group:
      "convoys",

    content: {

      three: `
        <strong>Trois convois</strong>
        <p>
          Élie répartit ses hommes
          en trois convois différents
          pour multiplier les pistes
          que les Gardiens devront suivre.
        </p>
      `,

      routes: `
        <strong>Trois itinéraires</strong>
        <p>
          Chaque trajet
          paraît suffisamment crédible
          pour pouvoir transporter
          le véritable groupe vers la Cueva.
        </p>
      `,

      followed: `
        <strong>Ils les suivent</strong>
        <p>
          Deux véhicules ennemis
          suivent déjà les convois.
          La diversion fonctionne.
        </p>
      `,

      lies: `
        <strong>Trois mensonges</strong>
        <p>
          Aucun de ces convois
          ne transporte réellement
          le groupe principal.
          Toute l'opération d'Élie
          est une fausse piste.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     LE VRAI GROUPE
  ======================================================= */

  setupInteraction({

    selector:
      ".real-group-trigger",

    dataAttribute:
      "realGroup",

    revealId:
      "realGroupReveal",

    group:
      "real-group",

    content: {

      foot: `
        <strong>À pied</strong>
        <p>
          Pendant que les convois
          attirent les surveillances,
          le véritable groupe
          termine son approche à pied.
        </p>
      `,

      pairs: `
        <strong>Les binômes</strong>
        <p>
          Les associations préparées
          à Awake sont maintenues :
          Hope avec Clive,
          Lucy avec Amy,
          Betty avec Hale,
          Anna avec Maître Lee.
        </p>
      `,

      balls: `
        <strong>Les billes</strong>
        <p>
          Les billes de Peter
          précèdent régulièrement le groupe
          pour reconnaître le terrain
          sans exposer directement
          les membres de l'équipe.
        </p>
      `,

      map: `
        <strong>Cartographie 3D</strong>
        <p>
          Couloirs,
          reliefs,
          chaleur
          et obstacles
          sont reconstruits
          en temps réel
          sur les lunettes de Peter.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     LUCY PERÇOIT AVANT DE VOIR
  ======================================================= */

  setupInteraction({

    selector:
      ".lucy-perception-trigger",

    dataAttribute:
      "lucyPerception",

    revealId:
      "lucyPerceptionReveal",

    group:
      "lucy-perception",

    content: {

      air: `
        <strong>Déplacement d'air</strong>
        <p>
          Lucy applique
          l'enseignement de Maître Lee :
          un corps modifie l'air
          avant même d'être clairement visible.
        </p>
      `,

      tension: `
        <strong>Tension</strong>
        <p>
          Elle cesse de chercher
          une silhouette précise
          et se concentre
          sur les changements
          dans son environnement.
        </p>
      `,

      left: `
        <strong>Deux à gauche</strong>
        <p>
          Lucy localise correctement
          deux des trois présences
          avant de les voir.
        </p>
      `,

      third: `
        <strong>Le troisième</strong>
        <p>
          Amy lui rappelle
          que le véritable danger
          peut être celui
          qui attend justement
          que son attention
          soit attirée ailleurs.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     LES TROIS EMBRANCHEMENTS
  ======================================================= */

  setupInteraction({

    selector:
      ".branches-trigger",

    dataAttribute:
      "branches",

    revealId:
      "branchesReveal",

    group:
      "branches",

    content: {

      three: `
        <strong>Trois embranchements</strong>
        <p>
          La bille de reconnaissance
          révèle trois passages possibles
          dans cette partie de la Cueva.
        </p>
      `,

      watched: `
        <strong>Deux surveillés</strong>
        <p>
          Deux chemins sont
          clairement gardés,
          ce qui pourrait pousser
          un intrus vers le troisième.
        </p>
      `,

      free: `
        <strong>Un libre</strong>
        <p>
          L'absence de surveillance
          n'est pas forcément
          un avantage.
          Clive comprend immédiatement
          que cela peut être volontaire.
        </p>
      `,

      trap: `
        <strong>Le piège</strong>
        <p>
          Deux fils presque invisibles
          confirment que le passage libre
          est justement celui
          qui a été piégé.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     L'ARAIGNÉE REJOINT ROOT
  ======================================================= */

  setupInteraction({

    selector:
      ".spider-contact-trigger",

    dataAttribute:
      "spiderContact",

    revealId:
      "spiderContactReveal",

    group:
      "spider-contact",

    content: {

      spider: `
        <strong>L'araignée</strong>
        <p>
          Une des petites unités
          conçues par Peter
          parvient jusqu'à la cellule
          sans attirer l'attention
          du Gardien.
        </p>
      `,

      pellet: `
        <strong>Micro-pastille</strong>
        <p>
          L'araignée remet à Root
          un minuscule dispositif
          de communication,
          assez petit pour être caché
          derrière son oreille.
        </p>
      `,

      hidden: `
        <strong>Contact discret</strong>
        <p>
          Root doit rester
          parfaitement immobile
          afin que le Gardien
          ne remarque ni l'araignée
          ni la pastille.
        </p>
      `,

      max: `
        <strong>Max</strong>
        <p>
          La première voix
          que Root entend
          est celle de Max.
          Après son enlèvement,
          le contact est enfin rétabli.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     CONTACT SECRET
  ======================================================= */

  setupInteraction({

    selector:
      ".secret-contact-trigger",

    dataAttribute:
      "secretContact",

    revealId:
      "secretContactReveal",

    group:
      "secret-contact",

    content: {

      close: `
        <strong>Ils sont proches</strong>
        <p>
          Peter et Max
          sont déjà suffisamment proches
          pour établir le contact
          avec la cellule de Root.
        </p>
      `,

      hold: `
        <strong>Root va tenir</strong>
        <p>
          Root ne prétend pas
          aller bien.
          Elle leur promet seulement
          qu'elle peut tenir
          encore assez longtemps.
        </p>
      `,

      wrong: `
        <strong>Mal monté</strong>
        <p>
          Root transmet
          l'information essentielle :
          le dispositif du Maître Noir
          n'est pas assemblé correctement.
        </p>
      `,

      axes: `
        <strong>Deux axes inversés</strong>
        <p>
          Deux orientations
          ont été inversées,
          ce qui suffit
          à empêcher le dispositif
          de fonctionner comme prévu.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
     LES QUATRE POSITIONS
  ======================================================= */

  setupInteraction({

    selector:
      ".exact-positions-trigger",

    dataAttribute:
      "exactPositions",

    revealId:
      "exactPositionsReveal",

    group:
      "exact-positions",

    content: {

      north: `
        <strong>Nord — Root</strong>
        <p>
          La Mémoire
          doit occuper
          la position nord.
          Cette fonction correspond à Root.
        </p>
      `,

      south: `
        <strong>Sud — Anna</strong>
        <p>
          Le Pont
          doit être placé
          au sud.
          Cette fonction appartient à Anna.
        </p>
      `,

      east: `
        <strong>Est — Hope</strong>
        <p>
          La Clé,
          Hope,
          doit occuper
          le point est.
        </p>
      `,

      west: `
        <strong>Ouest — Lucy</strong>
        <p>
          L'Ancre,
          désormais liée à Lucy
          et à la lame,
          doit se trouver
          à l'ouest.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
     LA FENÊTRE
  ======================================================= */

  setupInteraction({

    selector:
      ".window-trigger",

    dataAttribute:
      "window",

    revealId:
      "windowReveal",

    group:
      "window",

    content: {

      call: `
        <strong>L'appel</strong>
        <p>
          Le dispositif
          ne peut produire l'appel
          à n'importe quel moment.
        </p>
      `,

      precise: `
        <strong>Fenêtre précise</strong>
        <p>
          La configuration céleste
          crée une période exacte
          pendant laquelle
          le passage peut réagir.
        </p>
      `,

      minutes: `
        <strong>47 minutes</strong>
        <p>
          La fenêtre complète
          ne dure que
          quarante-sept minutes.
        </p>
      `,

      soon: `
        <strong>Très bientôt</strong>
        <p>
          Root constate
          que cette fenêtre
          est sur le point
          de commencer.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     BETTY SURVIT
  ======================================================= */

  setupInteraction({

    selector:
      ".betty-survival-trigger",

    dataAttribute:
      "bettySurvival",

    revealId:
      "bettySurvivalReveal",

    group:
      "betty-survival",

    content: {

      injector: `
        <strong>L'injecteur</strong>
        <p>
          Betty reconnaît immédiatement
          le même type d'arme
          utilisé contre Root.
        </p>
      `,

      training: `
        <strong>L'entraînement</strong>
        <p>
          Elle applique exactement
          ce qu'elle a appris :
          ne pas chercher
          à vaincre son adversaire,
          mais créer assez de temps
          pour qu'Hale puisse intervenir.
        </p>
      `,

      survive: `
        <strong>Survivre</strong>
        <p>
          Betty ne cherche pas
          à devenir combattante.
          Elle cherche seulement
          à rester capable d'agir
          jusqu'à l'arrivée
          de son binôme.
        </p>
      `,

      standing: `
        <strong>Encore debout</strong>
        <p>
          Elle n'a pas gagné
          le combat.
          Elle a atteint
          l'objectif fixé par Lee :
          être encore debout.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     LUCY ANTICIPE
  ======================================================= */

  setupInteraction({

    selector:
      ".lucy-anticipates-trigger",

    dataAttribute:
      "lucyAnticipates",

    revealId:
      "lucyAnticipatesReveal",

    group:
      "lucy-anticipates",

    content: {

      axis: `
        <strong>Garder l'axe</strong>
        <p>
          Lucy et Amy
          ne poursuivent pas inutilement
          les premiers adversaires.
          Elles protègent leur progression
          et restent ensemble.
        </p>
      `,

      sense: `
        <strong>Sensation</strong>
        <p>
          Lucy cesse
          de chercher d'abord
          une confirmation visuelle.
          Elle écoute
          ce que son corps perçoit.
        </p>
      `,

      move: `
        <strong>Déplacement</strong>
        <p>
          Le mouvement du troisième Gardien
          devient perceptible
          avant que son attaque
          ne soit complètement engagée.
        </p>
      `,

      before: `
        <strong>Avant le coup</strong>
        <p>
          Pour la première fois
          en situation réelle,
          Lucy pivote
          avant que le coup
          n'arrive.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     LA LAME RÉAGIT
  ======================================================= */

  setupInteraction({

    selector:
      ".blade-near-trigger",

    dataAttribute:
      "bladeNear",

    revealId:
      "bladeNearReveal",

    group:
      "blade-near",

    content: {

      heat: `
        <strong>La chaleur</strong>
        <p>
          La main de Lucy
          commence à chauffer
          à mesure qu'elle approche
          du dispositif.
        </p>
      `,

      symbols: `
        <strong>Les symboles</strong>
        <p>
          Les motifs de la lame
          redeviennent visibles
          sous sa peau.
        </p>
      `,

      blade: `
        <strong>La lame</strong>
        <p>
          Amy comprend
          que ce n'est pas
          une réaction ordinaire :
          c'est la lame elle-même
          qui répond à la proximité
          du seuil.
        </p>
      `,

      near: `
        <strong>On approche</strong>
        <p>
          Lucy n'a pas besoin
          de voir le dispositif
          pour savoir désormais
          qu'il est proche.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     LE PONT SENT LE SEUIL
  ======================================================= */

  setupInteraction({

    selector:
      ".bridge-sense-trigger",

    dataAttribute:
      "bridgeSense",

    revealId:
      "bridgeSenseReveal",

    group:
      "bridge-sense",

    content: {

      feel: `
        <strong>Elle ressent</strong>
        <p>
          Anna éprouve
          une sensation nouvelle,
          difficile à expliquer
          rationnellement.
        </p>
      `,

      recognize: `
        <strong>Reconnaître</strong>
        <p>
          Elle a l'impression
          de reconnaître
          un lieu
          dans lequel elle n'est pourtant
          jamais venue.
        </p>
      `,

      ahead: `
        <strong>C'est devant</strong>
        <p>
          Après avoir cessé
          de chercher une explication,
          Anna localise clairement
          la sensation devant elle.
        </p>
      `,

      threshold: `
        <strong>Le seuil</strong>
        <p>
          Maître Lee envisage
          que le Pont
          puisse reconnaître le seuil
          avant même qu'Anna
          comprenne consciemment
          ce lien.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     CE QUE LE MAÎTRE NOIR IGNORE
  ======================================================= */

  setupInteraction({

    selector:
      ".master-ignorance-trigger",

    dataAttribute:
      "masterIgnorance",

    revealId:
      "masterIgnoranceReveal",

    group:
      "master-ignorance",

    content: {

      all: `
        <strong>Tous ?</strong>
        <p>
          Le Maître Noir
          veut savoir
          si chaque membre
          qu'il attend
          est réellement arrivé.
        </p>
      `,

      unknown: `
        <strong>Vous ne savez pas</strong>
        <p>
          Root identifie
          sa faiblesse :
          malgré toutes ses informations,
          il possède encore
          des zones d'incertitude.
        </p>
      `,

      roles: `
        <strong>Qui fait quoi</strong>
        <p>
          Il sait
          que plusieurs fonctions existent,
          mais il ne connaît toujours pas
          avec certitude
          l'identité exacte
          de chaque rôle.
        </p>
      `,

      everyone: `
        <strong>Pourquoi tout le monde</strong>
        <p>
          C'est précisément
          cette ignorance
          qui l'a poussé
          à exiger la présence
          de tout le groupe.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     CODE DE VIBRATIONS
  ======================================================= */

  setupInteraction({

    selector:
      ".vibration-code-trigger",

    dataAttribute:
      "vibrationCode",

    revealId:
      "vibrationCodeReveal",

    group:
      "vibration-code",

    content: {

      "two-one": `
        <strong>Deux puis un</strong>
        <p>
          Root utilise
          un code très simple
          transmis par vibrations
          afin de communiquer
          sans parler.
        </p>
      `,

      danger: `
        <strong>Danger proche</strong>
        <p>
          La première séquence
          prévient Peter et Max
          que la situation
          autour de Root
          reste dangereuse.
        </p>
      `,

      three: `
        <strong>Trois taps</strong>
        <p>
          Une deuxième séquence
          transporte une information
          différente.
        </p>
      `,

      positions: `
        <strong>Positions inconnues</strong>
        <p>
          Root confirme
          que le Maître Noir
          ne connaît toujours pas
          les quatre positions exactes.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     CONVERGENCE
  ======================================================= */

  setupInteraction({

    selector:
      ".convergence-trigger",

    dataAttribute:
      "convergence",

    revealId:
      "convergenceReveal",

    group:
      "convergence",

    content: {

      together: `
        <strong>Tout le groupe</strong>
        <p>
          Les différentes équipes
          se rejoignent enfin
          juste avant
          la grande cavité.
        </p>
      `,

      amy: `
        <strong>Amy en retrait</strong>
        <p>
          Amy évite volontairement
          les axes principaux
          afin de ne pas révéler
          trop tôt sa présence.
        </p>
      `,

      bracelet: `
        <strong>Bracelet de Root</strong>
        <p>
          Max garde toujours
          sur lui
          le bracelet retrouvé
          après l'enlèvement de Root.
        </p>
      `,

      separation: `
        <strong>Plus de séparation</strong>
        <p>
          À partir de cet instant,
          Maître Lee impose
          une règle unique :
          personne ne doit permettre
          aux Gardiens
          de diviser encore le groupe.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     DOUZE MINUTES
  ======================================================= */

  setupInteraction({

    selector:
      ".twelve-minutes-trigger",

    dataAttribute:
      "twelveMinutes",

    revealId:
      "twelveMinutesReveal",

    group:
      "twelve-minutes",

    content: {

      window: `
        <strong>La fenêtre</strong>
        <p>
          La période astronomique
          identifiée par Root
          est sur le point
          de commencer.
        </p>
      `,

      twelve: `
        <strong>Douze minutes</strong>
        <p>
          Il ne reste plus
          que douze minutes
          avant le début
          de la fenêtre de fonctionnement.
        </p>
      `,

      root: `
        <strong>Root confirme</strong>
        <p>
          Les calculs de Peter
          correspondent
          à ceux de Root.
          Les deux arrivent
          au même compte à rebours.
        </p>
      `,

      countdown: `
        <strong>Compte à rebours</strong>
        <p>
          À partir de maintenant,
          l'opération ne dépend plus
          seulement de l'infiltration.
          Le temps devient
          lui aussi un adversaire.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 17
     LA LAME EST DEVANT LUI
  ======================================================= */

  setupInteraction({

    selector:
      ".blade-woman-trigger",

    dataAttribute:
      "bladeWoman",

    revealId:
      "bladeWomanReveal",

    group:
      "blade-woman",

    content: {

      lucy: `
        <strong>Lucy</strong>
        <p>
          Root regarde Lucy
          et comprend immédiatement
          que le Maître Noir
          n'a pas saisi
          ce qui s'est produit
          avec la lame.
        </p>
      `,

      hand: `
        <strong>Sa main</strong>
        <p>
          La forme de la lame
          n'est plus un objet séparé.
          Elle existe désormais
          dans la main
          et l'avant-bras de Lucy.
        </p>
      `,

      search: `
        <strong>Il cherche une lame</strong>
        <p>
          Le Maître Noir
          continue de penser
          qu'un objet manque
          à son dispositif.
        </p>
      `,

      woman: `
        <strong>La lame est devant lui</strong>
        <p>
          Son erreur est fondamentale :
          il cherche encore un objet,
          alors que la fonction
          qu'il recherche
          est devenue une personne.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 18
     TROIS CHOSES QU'IL IGNORE
     Cette interaction correspond au dernier bloc du HTML.
     Elle complète les 17 groupes narratifs précédents.
  ======================================================= */

  setupInteraction({

    selector:
      ".three-secrets-trigger",

    dataAttribute:
      "threeSecrets",

    revealId:
      "threeSecretsReveal",

    group:
      "three-secrets",

    content: {

      device: `
        <strong>Dispositif mal assemblé</strong>
        <p>
          Le Maître Noir
          croit disposer
          d'une structure fonctionnelle,
          mais Root sait
          que plusieurs axes
          sont encore mal placés.
        </p>
      `,

      blade: `
        <strong>La lame</strong>
        <p>
          Il croit toujours
          devoir retrouver
          un objet disparu.
          Il ignore
          que Lucy est désormais
          l'interface qu'il cherche.
        </p>
      `,

      amy: `
        <strong>Amy</strong>
        <p>
          Amy est déjà entrée
          derrière les lignes ennemies
          sans que le Maître Noir
          puisse confirmer
          qu'elle est présente.
        </p>
      `,

      advantage: `
        <strong>L'avantage</strong>
        <p>
          Pour la première fois,
          les trois erreurs
          appartiennent au même camp :
          celui du Maître Noir.
        </p>
      `

    }

  });


  /* =======================================================
     14. RESTAURATION DES INTERACTIONS
  ======================================================= */

  function restoreDiscoveredButtons() {

    const mappings = {

      convoys:
        "convoys",

      realGroup:
        "real-group",

      lucyPerception:
        "lucy-perception",

      branches:
        "branches",

      spiderContact:
        "spider-contact",

      secretContact:
        "secret-contact",

      exactPositions:
        "exact-positions",

      window:
        "window",

      bettySurvival:
        "betty-survival",

      lucyAnticipates:
        "lucy-anticipates",

      bladeNear:
        "blade-near",

      bridgeSense:
        "bridge-sense",

      masterIgnorance:
        "master-ignorance",

      vibrationCode:
        "vibration-code",

      convergence:
        "convergence",

      twelveMinutes:
        "twelve-minutes",

      bladeWoman:
        "blade-woman",

      threeSecrets:
        "three-secrets"

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
     FIN DU CHAPITRE 30
  ======================================================= */

});
