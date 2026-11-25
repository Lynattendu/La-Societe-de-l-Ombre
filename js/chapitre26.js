
"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 26 — LE SEUIL
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
    "societeOmbre_ch26_";

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
     13. INTERACTIONS
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
     LAME / HÉRITAGES
  ======================================================= */

  setupInteraction({

    selector:
      ".blade-heritage-trigger",

    dataAttribute:
      "bladeHeritage",

    revealId:
      "bladeHeritageReveal",

    group:
      "blade-heritage",

    content: {

      blade: `
        <strong>La lame</strong>
        <p>
          Elle n'est pas une clé centrale.
          Elle sert à orienter le dispositif
          et à sélectionner un chemin.
        </p>
      `,

      parcae: `
        <strong>Les Parques</strong>
        <p>
          Root semble liée à la mémoire
          des routes,
          des conséquences
          et des chemins possibles.
        </p>
      `,

      janus: `
        <strong>Janus</strong>
        <p>
          Deux visages.
          Deux directions.
          Une entrée et un retour.
        </p>
      `,

      thoth: `
        <strong>Thoth</strong>
        <p>
          Écriture,
          mémoire,
          vérité consignée
          et conservation des faits.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     QUATRE FONCTIONS
  ======================================================= */

  setupInteraction({

    selector:
      ".four-functions-trigger",

    dataAttribute:
      "fourFunctions",

    revealId:
      "fourFunctionsReveal",

    group:
      "four-functions",

    content: {

      bridge: `
        <strong>Le Pont — Anna</strong>
        <p>
          Anna établit le lien.
          Elle est la fonction
          que les Gardiens
          ne peuvent pas recréer artificiellement.
        </p>
      `,

      key: `
        <strong>La Clé — Hope</strong>
        <p>
          Hope rend l'activation possible.
          Sa signature répond
          au dispositif
          et à celle d'Anna.
        </p>
      `,

      memory: `
        <strong>La Mémoire — Root</strong>
        <p>
          Root détermine
          et conserve la route
          empruntée par le passage.
        </p>
      `,

      anchor: `
        <strong>L'Ancre — Lucy</strong>
        <p>
          Lucy stabilise le passage
          afin qu'il ne se déséquilibre pas
          pendant son ouverture.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     LUCY / ANCRE
  ======================================================= */

  setupInteraction({

    selector:
      ".anchor-role-trigger",

    dataAttribute:
      "anchorRole",

    revealId:
      "anchorRoleReveal",

    group:
      "anchor-role",

    content: {

      stability: `
        <strong>Stabiliser</strong>
        <p>
          L'Ancre maintient l'équilibre
          du seuil
          lorsque celui-ci devient actif.
        </p>
      `,

      opening: `
        <strong>Pendant l'ouverture</strong>
        <p>
          La fonction de Lucy
          intervient lorsque le passage
          est en cours de formation.
        </p>
      `,

      closing: `
        <strong>Fermeture</strong>
        <p>
          Peter soupçonne
          que l'Ancre pourrait également
          empêcher le seuil
          de se refermer prématurément.
        </p>
      `,

      opaque: `
        <strong>Opaque</strong>
        <p>
          Personne ne sait encore
          ce qui changera
          lorsque Lucy aura réellement choisi
          sa voie et sera devenue une Opaque.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     MÉMOIRE / RETOUR
  ======================================================= */

  setupInteraction({

    selector:
      ".memory-path-trigger",

    dataAttribute:
      "memoryPath",

    revealId:
      "memoryPathReveal",

    group:
      "memory-path",

    content: {

      translate: `
        <strong>Nouvelle traduction</strong>
        <p>
          La phrase ne signifie probablement pas
          que la Mémoire conduit
          celui qui franchit.
        </p>
      `,

      conserve: `
        <strong>Conserver la voie</strong>
        <p>
          La Mémoire garde la trace
          de la route exacte
          empruntée par le passage.
        </p>
      `,

      return: `
        <strong>Le retour</strong>
        <p>
          Cette trace permettrait
          de retrouver la direction
          nécessaire pour revenir.
        </p>
      `,

      danger: `
        <strong>Le risque</strong>
        <p>
          Sans la Mémoire,
          il pourrait être possible
          de traverser le seuil
          sans pouvoir retrouver
          le chemin du retour.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     JANUS / INTERFACE
  ======================================================= */

  setupInteraction({

    selector:
      ".janus-interface-trigger",

    dataAttribute:
      "janusInterface",

    revealId:
      "janusInterfaceReveal",

    group:
      "janus-interface",

    content: {

      two: `
        <strong>Deux ouvertures</strong>
        <p>
          Janus représente
          les deux faces d'un passage :
          l'entrée et la sortie.
        </p>
      `,

      pressure: `
        <strong>Deux pressions</strong>
        <p>
          Un seuil doit gérer
          les différences physiques
          entre les deux côtés.
        </p>
      `,

      states: `
        <strong>Deux états</strong>
        <p>
          Peter envisage
          que les deux extrémités
          puissent obéir
          à des conditions physiques différentes.
        </p>
      `,

      interface: `
        <strong>Interface</strong>
        <p>
          La fonction liée à Janus
          serait de construire
          une interface suffisamment stable
          pour permettre la traversée.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     THOTH / ARCHIVISTE
  ======================================================= */

  setupInteraction({

    selector:
      ".thoth-archive-trigger",

    dataAttribute:
      "thothArchive",

    revealId:
      "thothArchiveReveal",

    group:
      "thoth-archive",

    content: {

      witness: `
        <strong>Témoin</strong>
        <p>
          Thoth conserve
          ce qui a été vu
          et ce qui s'est réellement produit.
        </p>
      `,

      archive: `
        <strong>Archiviste</strong>
        <p>
          Max comprend
          que sa fonction
          ne consiste pas seulement
          à observer,
          mais à préserver une trace fiable.
        </p>
      `,

      facts: `
        <strong>Les faits</strong>
        <p>
          L'archiviste distingue
          l'événement réel
          de ce que les générations suivantes
          pourraient en raconter.
        </p>
      `,

      story: `
        <strong>Le récit</strong>
        <p>
          Les civilisations peuvent déformer
          une histoire.
          La fonction de Thoth
          consiste à conserver
          ce qui s'est véritablement passé.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
     ROOT / RETOUR
  ======================================================= */

  setupInteraction({

    selector:
      ".root-return-trigger",

    dataAttribute:
      "rootReturn",

    revealId:
      "rootReturnReveal",

    group:
      "root-return",

    content: {

      departure: `
        <strong>Le départ</strong>
        <p>
          Root sait désormais
          que la mission peut les conduire
          au cœur du dispositif.
        </p>
      `,

      pandore: `
        <strong>Pandore</strong>
        <p>
          Sa marque reste liée
          à une histoire familiale
          dont elle commence seulement
          à comprendre la fonction réelle.
        </p>
      `,

      blade: `
        <strong>La lame</strong>
        <p>
          Root transporte désormais
          l'élément qui permet
          d'orienter le passage.
        </p>
      `,

      return: `
        <strong>Garantir le retour</strong>
        <p>
          Son rôle ne consiste peut-être pas
          à garantir qu'ils pourront partir,
          mais qu'ils pourront revenir.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
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

      routes: `
        <strong>Routes secondaires</strong>
        <p>
          Élie abandonne
          les routes habituelles
          vers Hidalgo
          pour utiliser des axes secondaires.
        </p>
      `,

      convoys: `
        <strong>Deux convois</strong>
        <p>
          Deux convois suffisamment visibles
          sont envoyés
          afin d'attirer l'attention
          des Gardiens.
        </p>
      `,

      opposite: `
        <strong>Directions opposées</strong>
        <p>
          Les véhicules prennent
          deux directions
          éloignées de la véritable route
          vers la Cueva.
        </p>
      `,

      diversion: `
        <strong>Diversion</strong>
        <p>
          Le but n'est pas
          de transporter quelque chose,
          mais de faire croire
          qu'un transport important
          est en cours.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     CARTE FALSIFIÉE
  ======================================================= */

  setupInteraction({

    selector:
      ".false-map-trigger",

    dataAttribute:
      "falseMap",

    revealId:
      "falseMapReveal",

    group:
      "false-map",

    content: {

      ninehundred: `
        <strong>900 mètres</strong>
        <p>
          L'équipe approche
          de la zone
          où les indications officielles
          cessent d'être fiables.
        </p>
      `,

      wrong: `
        <strong>Carte fausse</strong>
        <p>
          À partir de ce point,
          Amy sait que les plans
          ne correspondent plus
          à la réalité.
        </p>
      `,

      intentional: `
        <strong>Falsification volontaire</strong>
        <p>
          Les erreurs ne sont pas accidentelles.
          Les Gardiens ont volontairement
          modifié leurs propres plans.
        </p>
      `,

      guardians: `
        <strong>Gardiens</strong>
        <p>
          Les plans falsifiés
          permettent de protéger
          certaines parties
          de la Cueva
          même en cas de fuite d'informations.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     ALARME MÉCANIQUE
  ======================================================= */

  setupInteraction({

    selector:
      ".mechanical-alarm-trigger",

    dataAttribute:
      "mechanicalAlarm",

    revealId:
      "mechanicalAlarmReveal",

    group:
      "mechanical-alarm",

    content: {

      wire: `
        <strong>Le fil</strong>
        <p>
          Une alarme presque invisible
          utilise un simple fil
          dissimulé dans l'environnement.
        </p>
      `,

      nonelectronic: `
        <strong>Non électronique</strong>
        <p>
          Aucun signal numérique.
          Aucun composant actif.
          Les capteurs de Peter
          ne peuvent rien détecter.
        </p>
      `,

      amy: `
        <strong>Amy</strong>
        <p>
          Sa connaissance
          des méthodes des Gardiens
          devient indispensable
          à l'approche de la Cueva.
        </p>
      `,

      disable: `
        <strong>Désactivation</strong>
        <p>
          Amy neutralise
          le mécanisme
          sans déclencher l'alerte.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     PORTE DES PARQUES
  ======================================================= */

  setupInteraction({

    selector:
      ".parcae-door-trigger",

    dataAttribute:
      "parcaeDoor",

    revealId:
      "parcaeDoorReveal",

    group:
      "parcae-door",

    content: {

      symbol: `
        <strong>Le symbole</strong>
        <p>
          Trois lignes gravées
          dans la roche
          reprennent le motif
          associé aux Parques.
        </p>
      `,

      blade: `
        <strong>La lame</strong>
        <p>
          Le symbole reste inerte
          jusqu'à ce que Root
          approche la lame.
        </p>
      `,

      mechanism: `
        <strong>Mécanisme ancien</strong>
        <p>
          La porte n'est pas magique.
          Elle repose sur un mécanisme
          physique ancien
          encore fonctionnel.
        </p>
      `,

      hidden: `
        <strong>Passage oublié</strong>
        <p>
          Amy ignorait son existence,
          non parce qu'il était nouveau,
          mais parce qu'elle ne savait pas
          comment le révéler.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     CAMOUFLAGE THERMIQUE
  ======================================================= */

  setupInteraction({

    selector:
      ".thermal-camo-trigger",

    dataAttribute:
      "thermalCamo",

    revealId:
      "thermalCamoReveal",

    group:
      "thermal-camo",

    content: {

      active: `
        <strong>Zone active</strong>
        <p>
          La lumière au loin
          indique que l'équipe
          entre maintenant
          dans une zone utilisée
          par les Gardiens.
        </p>
      `,

      twelve: `
        <strong>Douze minutes</strong>
        <p>
          Les nouveaux modules
          de Peter peuvent masquer
          leur signature thermique
          pendant douze minutes
          en utilisation continue.
        </p>
      `,

      guardians: `
        <strong>Gardiens</strong>
        <p>
          Le système des Gardiens
          ne tenait auparavant
          que moins de huit minutes.
        </p>
      `,

      amy: `
        <strong>Amy accepte</strong>
        <p>
          Cette fois,
          Amy finit par accepter
          le dispositif de protection
          sans véritable confrontation.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     DISPOSITIF RÉEL
  ======================================================= */

  setupInteraction({

    selector:
      ".real-device-trigger",

    dataAttribute:
      "realDevice",

    revealId:
      "realDeviceReveal",

    group:
      "real-device",

    content: {

      ancient: `
        <strong>Fragments anciens</strong>
        <p>
          Les véritables pierres
          du dispositif
          ont été réassemblées
          dans la cavité.
        </p>
      `,

      modern: `
        <strong>Pièces modernes</strong>
        <p>
          Les Gardiens ont ajouté
          générateurs,
          structures métalliques
          et technologies contemporaines.
        </p>
      `,

      copies: `
        <strong>Copies artificielles</strong>
        <p>
          Lorsque certains fragments
          manquent encore,
          des reproductions artificielles
          tentent d'en compenser l'absence.
        </p>
      `,

      center: `
        <strong>Centre vide</strong>
        <p>
          Malgré tout ce travail,
          le cœur du dispositif
          reste incomplet :
          l'emplacement de la lame
          est toujours vide.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     QUATRE EMPLACEMENTS
  ======================================================= */

  setupInteraction({

    selector:
      ".four-slots-trigger",

    dataAttribute:
      "fourSlots",

    revealId:
      "fourSlotsReveal",

    group:
      "four-slots",

    content: {

      hope: `
        <strong>Hope — Clé</strong>
        <p>
          Sa fonction
          rend l'activation
          du système possible.
        </p>
      `,

      anna: `
        <strong>Anna — Pont</strong>
        <p>
          Elle établit le lien
          indispensable
          entre les deux côtés.
        </p>
      `,

      root: `
        <strong>Root — Mémoire</strong>
        <p>
          Elle conserve
          la route choisie
          et permet potentiellement
          le retour.
        </p>
      `,

      lucy: `
        <strong>Lucy — Ancre</strong>
        <p>
          Elle stabilise
          le seuil
          pendant son fonctionnement.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     EFFACEUR / COMBAT
  ======================================================= */

  setupInteraction({

    selector:
      ".eraser-fight-trigger",

    dataAttribute:
      "eraserFight",

    revealId:
      "eraserFightReveal",

    group:
      "eraser-fight",

    content: {

      eraser: `
        <strong>L'Effaceur</strong>
        <p>
          Il apparaît
          dans la galerie
          alors que plusieurs signatures
          convergent déjà vers l'équipe.
        </p>
      `,

      hope: `
        <strong>Hope</strong>
        <p>
          Elle sent sa présence
          avant même
          que l'Effaceur
          ne se montre.
        </p>
      `,

      amy: `
        <strong>Amy</strong>
        <p>
          Elle connaît déjà
          sa manière de combattre
          et comprend immédiatement
          le danger.
        </p>
      `,

      coordination: `
        <strong>Coordination</strong>
        <p>
          Hope et Amy
          n'ont plus besoin de parler.
          L'une prend la droite,
          l'autre la gauche.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     LE MOT "APPEL"
  ======================================================= */

  setupInteraction({

    selector:
      ".call-word-trigger",

    dataAttribute:
      "callWord",

    revealId:
      "callWordReveal",

    group:
      "call-word",

    content: {

      opening: `
        <strong>« Ouverture »</strong>
        <p>
          Pendant des semaines,
          Root croyait
          que l'inscription parlait
          simplement de l'ouverture
          du passage.
        </p>
      `,

      call: `
        <strong>« Appel »</strong>
        <p>
          Max corrige finalement
          la traduction :
          le dernier mot
          signifie « appel ».
        </p>
      `,

      something: `
        <strong>Quelque chose</strong>
        <p>
          Si le passage
          produit réellement un appel,
          quelque chose situé au-delà
          pourrait être capable
          de le percevoir.
        </p>
      `,

      someone: `
        <strong>Quelqu'un</strong>
        <p>
          La possibilité la plus inquiétante
          est que cet appel
          soit destiné
          à une présence consciente.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 17
     CE QUI DEMEURE AU-DELÀ
  ======================================================= */

  setupInteraction({

    selector:
      ".beyond-call-trigger",

    dataAttribute:
      "beyondCall",

    revealId:
      "beyondCallReveal",

    group:
      "beyond-call",

    content: {

      threshold: `
        <strong>Le seuil</strong>
        <p>
          Le dispositif
          ne semble pas être
          une simple porte mécanique.
        </p>
      `,

      path: `
        <strong>Le chemin</strong>
        <p>
          Lorsque le seuil
          reconnaît une route,
          il semble établir
          quelque chose de plus profond
          qu'une simple ouverture.
        </p>
      `,

      beyond: `
        <strong>Ce qui demeure au-delà</strong>
        <p>
          Le texte ne précise pas
          ce qui existe
          de l'autre côté.
          Mais il affirme
          que cela peut entendre.
        </p>
      `,

      hear: `
        <strong>Entendre l'appel</strong>
        <p>
          Jusqu'ici,
          ils cherchaient
          un moyen d'aller vers l'autre côté.
          Ils découvrent maintenant
          que l'autre côté
          pourrait également
          être capable de les trouver.
        </p>
      `

    }

  });


  /* =======================================================
     14. RESTAURATION DES INTERACTIONS
  ======================================================= */

  function restoreDiscoveredButtons() {

    const mappings = {

      bladeHeritage:
        "blade-heritage",

      fourFunctions:
        "four-functions",

      anchorRole:
        "anchor-role",

      memoryPath:
        "memory-path",

      janusInterface:
        "janus-interface",

      thothArchive:
        "thoth-archive",

      rootReturn:
        "root-return",

      elieDiversion:
        "elie-diversion",

      falseMap:
        "false-map",

      mechanicalAlarm:
        "mechanical-alarm",

      parcaeDoor:
        "parcae-door",

      thermalCamo:
        "thermal-camo",

      realDevice:
        "real-device",

      fourSlots:
        "four-slots",

      eraserFight:
        "eraser-fight",

      callWord:
        "call-word",

      beyondCall:
        "beyond-call"

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
     FIN DU CHAPITRE 26
  ======================================================= */

});
