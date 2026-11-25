
"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 31 — LES QUATRE POINTS
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
    "societeOmbre_ch31_";

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


    oscillator.type =
      "sine";


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
     LES ARAIGNÉES NEUTRALISENT LES GARDIENS
  ======================================================= */

  setupInteraction({

    selector:
      ".spiders-attack-trigger",

    dataAttribute:
      "spidersAttack",

    revealId:
      "spidersAttackReveal",

    group:
      "spiders-attack",

    content: {

      needle: `
        <strong>Petite pointe</strong>
        <p>
          Une micro-aiguille
          est plantée dans le cou
          du Gardien.
          C'est la première indication
          de ce qui est réellement
          en train de se passer.
        </p>
      `,

      spiders: `
        <strong>Araignées</strong>
        <p>
          Peter comprend
          que les petites araignées
          mécaniques sont déjà
          à l'œuvre dans la cavité.
        </p>
      `,

      six: `
        <strong>Six Gardiens</strong>
        <p>
          Les neutralisations
          se multiplient rapidement
          autour du dispositif
          avant même que le Maître Noir
          comprenne leur origine.
        </p>
      `,

      paralyzed: `
        <strong>Paralysés</strong>
        <p>
          Amy ne cherche pas
          à tuer les Gardiens.
          Les araignées
          les mettent hors de combat
          grâce à leur sédatif.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     LE RETOUR D'AMY
  ======================================================= */

  setupInteraction({

    selector:
      ".amy-return-trigger",

    dataAttribute:
      "amyReturn",

    revealId:
      "amyReturnReveal",

    group:
      "amy-return",

    content: {

      shadow: `
        <strong>L'ombre</strong>
        <p>
          Amy utilise l'obscurité
          pour entrer dans la cavité
          sans révéler sa présence
          avant le dernier instant.
        </p>
      `,

      alive: `
        <strong>Amy vivante</strong>
        <p>
          Le Maître Noir
          découvre enfin
          qu'Amy a survécu.
          Son plan reposait encore
          en partie sur l'incertitude.
        </p>
      `,

      relief: `
        <strong>Soulagement</strong>
        <p>
          Pendant une fraction de seconde,
          Amy distingue chez lui
          quelque chose d'inattendu :
          un véritable soulagement
          de la savoir vivante.
        </p>
      `,

      "other-side": `
        <strong>De l'autre côté</strong>
        <p>
          Son inquiétude arrive aussitôt :
          Amy est vivante,
          mais elle se tient désormais
          contre lui.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     AMY REFUSE D'APPARTENIR
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

      used: `
        <strong>« Ils t'utilisent »</strong>
        <p>
          Le Maître Noir
          reprend l'argument
          qu'il a utilisé
          pendant des années
          pour isoler Amy des autres.
        </p>
      `,

      belong: `
        <strong>Appartenir</strong>
        <p>
          Amy identifie
          la différence essentielle :
          Awake ne lui a jamais demandé
          de devenir sa propriété.
        </p>
      `,

      return: `
        <strong>« Reviens »</strong>
        <p>
          Le Maître Noir
          parle encore à Amy
          comme si elle pouvait
          simplement reprendre
          la place qu'il lui avait assignée.
        </p>
      `,

      free: `
        <strong>Ne plus être à lui</strong>
        <p>
          Amy ne s'est pas libérée
          pour appartenir
          à un autre groupe.
          Elle s'est libérée
          pour enfin s'appartenir.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     LES QUATRE POINTS
  ======================================================= */

  setupInteraction({

    selector:
      ".four-points-trigger",

    dataAttribute:
      "fourPoints",

    revealId:
      "fourPointsReveal",

    group:
      "four-points",

    content: {

      north: `
        <strong>Nord — Mémoire</strong>
        <p>
          Root,
          la Mémoire,
          rejoint le point nord
          du dispositif.
        </p>
      `,

      south: `
        <strong>Sud — Pont</strong>
        <p>
          Anna,
          le Pont,
          rejoint finalement
          la position sud.
        </p>
      `,

      east: `
        <strong>Est — Clé</strong>
        <p>
          Hope,
          la Clé,
          occupe le point est.
        </p>
      `,

      west: `
        <strong>Ouest — Ancre</strong>
        <p>
          Lucy,
          l'Ancre,
          prend la position ouest.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     AMY + MAÎTRE LEE
  ======================================================= */

  setupInteraction({

    selector:
      ".amy-lee-trigger",

    dataAttribute:
      "amyLee",

    revealId:
      "amyLeeReveal",

    group:
      "amy-lee",

    content: {

      precise: `
        <strong>Précision</strong>
        <p>
          Le Maître Noir
          ne combat pas comme l'Effaceur.
          Il ne gaspille aucun mouvement :
          chaque coup cherche
          un résultat précis.
        </p>
      `,

      knows: `
        <strong>Il connaît Amy</strong>
        <p>
          Il connaît ses réflexes
          parce qu'il l'a observée
          et façonnée
          pendant des années.
        </p>
      `,

      older: `
        <strong>Enseignement ancien</strong>
        <p>
          Maître Lee révèle
          que l'art du Maître Noir
          n'est pas unique.
          Certains enseignements
          existaient avant lui.
        </p>
      `,

      together: `
        <strong>Amy + Lee</strong>
        <p>
          Deux écoles
          issues d'une origine commune
          se rejoignent
          pour neutraliser
          celui qui croyait
          maîtriser les deux.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     ACTIVATION DU PONT
  ======================================================= */

  setupInteraction({

    selector:
      ".bridge-activation-trigger",

    dataAttribute:
      "bridgeActivation",

    revealId:
      "bridgeActivationReveal",

    group:
      "bridge-activation",

    content: {

      recognition: `
        <strong>Reconnaissance</strong>
        <p>
          Anna ressent
          la même impression
          que dans la galerie :
          son corps reconnaît
          quelque chose
          qu'elle n'a pourtant
          jamais vécu consciemment.
        </p>
      `,

      posture: `
        <strong>La posture</strong>
        <p>
          Sans instruction,
          Anna adopte
          une posture précise :
          bras ouverts,
          paumes ouvertes
          et poitrine dégagée.
        </p>
      `,

      light: `
        <strong>La lumière</strong>
        <p>
          Une première ligne lumineuse
          apparaît sous ses pieds,
          puis des arcs
          se dessinent derrière elle.
        </p>
      `,

      bridge: `
        <strong>Le Pont</strong>
        <p>
          Le dispositif
          réagit directement
          à Anna.
          Sa fonction de Pont
          devient enfin visible.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
     ACTIVATION DE LA CLÉ
  ======================================================= */

  setupInteraction({

    selector:
      ".key-activation-trigger",

    dataAttribute:
      "keyActivation",

    revealId:
      "keyActivationReveal",

    group:
      "key-activation",

    content: {

      dragon: `
        <strong>Dragon</strong>
        <p>
          Le Dragon de Hope
          dépasse cette fois
          les limites habituelles
          de sa marque
          et devient lumineux.
        </p>
      `,

      phoenix: `
        <strong>Phénix</strong>
        <p>
          Le Phénix répond
          presque immédiatement
          et se manifeste
          avec la même intensité.
        </p>
      `,

      together: `
        <strong>Ils se complètent</strong>
        <p>
          Pour la première fois,
          Dragon et Phénix
          ne semblent plus
          entrer en concurrence.
          Ils fonctionnent ensemble.
        </p>
      `,

      heat: `
        <strong>Montée d'énergie</strong>
        <p>
          L'énergie de Hope
          augmente extrêmement vite,
          au point d'inquiéter
          Betty et Charles.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
     ACTIVATION DE LA MÉMOIRE
  ======================================================= */

  setupInteraction({

    selector:
      ".memory-activation-trigger",

    dataAttribute:
      "memoryActivation",

    revealId:
      "memoryActivationReveal",

    group:
      "memory-activation",

    content: {

      map: `
        <strong>Une carte</strong>
        <p>
          Root cesse enfin
          de regarder le dispositif
          comme une machine.
          Elle comprend
          qu'il fonctionne
          comme une carte.
        </p>
      `,

      orientation: `
        <strong>Orientation</strong>
        <p>
          La Mémoire
          ne sert pas uniquement
          à conserver.
          Elle permet aussi
          d'orienter le passage.
        </p>
      `,

      return: `
        <strong>Retour</strong>
        <p>
          La fonction de Root
          est directement liée
          à la possibilité
          de retrouver le chemin
          une fois le seuil franchi.
        </p>
      `,

      wait: `
        <strong>Pas encore</strong>
        <p>
          Root voit que la fenêtre
          n'est pas complètement alignée.
          Elle retient les autres
          jusqu'au moment exact.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     PANDORE ET LA CARTOGRAPHIE
  ======================================================= */

  setupInteraction({

    selector:
      ".pandore-map-trigger",

    dataAttribute:
      "pandoreMap",

    revealId:
      "pandoreMapReveal",

    group:
      "pandore-map",

    content: {

      sky: `
        <strong>Alignement céleste</strong>
        <p>
          La lumière naturelle
          pénètre enfin dans la cavité
          et les lignes célestes
          gravées au-dessus du cercle
          s'alignent complètement.
        </p>
      `,

      mark: `
        <strong>Marque de Pandore</strong>
        <p>
          La marque de Root
          s'illumine brutalement
          et semble presque
          reprendre une forme physique.
        </p>
      `,

      symbols: `
        <strong>Les symboles</strong>
        <p>
          Des centaines de symboles
          deviennent visibles
          sur les pierres
          et commencent
          à se déplacer.
        </p>
      `,

      map: `
        <strong>Cartographie mouvante</strong>
        <p>
          Les symboles
          s'alignent,
          se croisent
          et se superposent
          jusqu'à produire
          une carte vivante
          du dispositif.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     LA LAME DE LUMIÈRE
  ======================================================= */

  setupInteraction({

    selector:
      ".blade-light-trigger",

    dataAttribute:
      "bladeLight",

    revealId:
      "bladeLightReveal",

    group:
      "blade-light",

    content: {

      hand: `
        <strong>La paume</strong>
        <p>
          Lucy comprend instinctivement
          qu'elle ne doit pas
          insérer sa main
          dans la rainure.
          Elle pose simplement
          sa paume sur la pierre.
        </p>
      `,

      symbols: `
        <strong>Les symboles</strong>
        <p>
          Les motifs de la lame
          deviennent plus nets
          sous sa peau
          et se prolongent
          jusqu'au bout de ses doigts.
        </p>
      `,

      light: `
        <strong>Lame de lumière</strong>
        <p>
          La lame
          n'est plus métallique.
          Elle se forme
          directement en lumière
          depuis les doigts de Lucy.
        </p>
      `,

      groove: `
        <strong>La rainure</strong>
        <p>
          La lame lumineuse
          trouve elle-même
          la rainure du dispositif
          et s'y insère.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     LES QUATRE FONCTIONS CONVERGENT
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

      west: `
        <strong>Ouest — Ancre</strong>
        <p>
          Le dispositif
          s'active d'abord
          depuis Lucy,
          l'Ancre.
        </p>
      `,

      north: `
        <strong>Nord — Mémoire</strong>
        <p>
          La ligne suivante
          rejoint Root,
          la Mémoire.
        </p>
      `,

      south: `
        <strong>Sud — Pont</strong>
        <p>
          Anna,
          le Pont,
          devient ensuite
          la troisième fonction active.
        </p>
      `,

      east: `
        <strong>Est — Clé</strong>
        <p>
          Hope,
          la Clé,
          complète l'activation.
          Les quatre lignes
          convergent alors
          vers le centre.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     LE CHEMIN DU RETOUR
  ======================================================= */

  setupInteraction({

    selector:
      ".return-path-trigger",

    dataAttribute:
      "returnPath",

    revealId:
      "returnPathReveal",

    group:
      "return-path",

    content: {

      routes: `
        <strong>Des routes</strong>
        <p>
          Root ne voit pas
          un avenir déjà écrit.
          Elle voit des trajectoires,
          des possibilités
          et des chemins.
        </p>
      `,

      parques: `
        <strong>Les Parques</strong>
        <p>
          Root comprend enfin
          leur fonction :
          elles ne montrent pas
          un destin obligatoire.
        </p>
      `,

      consequences: `
        <strong>Conséquences possibles</strong>
        <p>
          Les Parques montrent
          les conséquences possibles
          d'une direction choisie.
          Le choix reste réel.
        </p>
      `,

      return: `
        <strong>Le retour</strong>
        <p>
          Une trajectoire
          revient jusqu'au cercle.
          Root identifie enfin
          le chemin permettant
          de revenir.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     LE RÔLE DE L'ANCRE
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

      tension: `
        <strong>Tension</strong>
        <p>
          Lucy ressent
          toute la tension
          produite par les quatre points
          du dispositif.
        </p>
      `,

      balance: `
        <strong>Déséquilibres</strong>
        <p>
          Elle perçoit
          chaque variation,
          chaque vibration
          et chaque tentative
          du cercle pour se déséquilibrer.
        </p>
      `,

      four: `
        <strong>Quatre cordes</strong>
        <p>
          Pour Lucy,
          l'expérience ressemble
          à quatre cordes
          tirées dans des directions opposées.
        </p>
      `,

      hold: `
        <strong>Maintenir</strong>
        <p>
          Son rôle
          n'est pas de diriger
          les autres fonctions,
          mais de maintenir
          l'ensemble suffisamment stable
          pour qu'elles restent reliées.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     LE CHOIX DE LUCY
  ======================================================= */

  setupInteraction({

    selector:
      ".lucy-choice-trigger",

    dataAttribute:
      "lucyChoice",

    revealId:
      "lucyChoiceReveal",

    group:
      "lucy-choice",

    content: {

      failure: `
        <strong>J'ai appris</strong>
        <p>
          Lucy cesse enfin
          de considérer
          l'enlèvement de Root
          uniquement comme un échec.
          Elle utilise
          ce qu'elle en a appris.
        </p>
      `,

      "light-shadow": `
        <strong>Lumière / Ombre</strong>
        <p>
          Elle comprend
          qu'elle n'a pas
          à choisir
          entre les deux camps
          qui prétendaient
          auparavant la définir.
        </p>
      `,

      protect: `
        <strong>Ce qu'elle protège</strong>
        <p>
          Son véritable choix
          n'est pas une appartenance.
          C'est la décision
          de savoir
          ce qu'elle veut protéger.
        </p>
      `,

      them: `
        <strong>Eux</strong>
        <p>
          Lucy choisit
          les personnes
          qui l'entourent.
          Pas un ordre.
          Pas une idéologie.
          Eux.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     OPAQUE
  ======================================================= */

  setupInteraction({

    selector:
      ".opaque-trigger",

    dataAttribute:
      "opaque",

    revealId:
      "opaqueReveal",

    group:
      "opaque",

    content: {

      black: `
        <strong>Ligne noire</strong>
        <p>
          Une ligne noire
          apparaît au cœur
          de la lumière,
          sans la faire disparaître.
        </p>
      `,

      balance: `
        <strong>Ombre et lumière</strong>
        <p>
          Les deux aspects
          restent présents.
          Aucun ne détruit l'autre.
          Lucy accepte enfin
          les deux sans appartenir
          à aucun.
        </p>
      `,

      opaque: `
        <strong>Opaque</strong>
        <p>
          Maître Lee
          prononce enfin
          le nom de ce que Lucy
          est devenue :
          Opaque.
        </p>
      `,

      belong: `
        <strong>Sans appartenir</strong>
        <p>
          Lucy a choisi,
          mais son choix
          ne l'enferme pas
          dans un camp.
          C'est précisément
          ce qui la définit.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     LES MONDES
  ======================================================= */

  setupInteraction({

    selector:
      ".worlds-trigger",

    dataAttribute:
      "worlds",

    revealId:
      "worldsReveal",

    group:
      "worlds",

    content: {

      black: `
        <strong>Le centre noir</strong>
        <p>
          Le cœur du dispositif
          ne devient pas simplement sombre.
          Il prend l'apparence
          d'une véritable absence.
        </p>
      `,

      light: `
        <strong>La lumière</strong>
        <p>
          Une lumière
          apparaît dans cette profondeur,
          sans qu'il soit possible
          d'en déterminer la distance.
        </p>
      `,

      spheres: `
        <strong>Les sphères</strong>
        <p>
          Une sphère apparaît,
          puis des milliers,
          suspendues dans un espace
          impossible à mesurer.
        </p>
      `,

      worlds: `
        <strong>Mondes / Univers</strong>
        <p>
          Leur cerveau
          interprète ce qu'il voit
          comme des mondes,
          des bulles
          ou des univers.
          Mais personne
          ne sait encore
          ce qu'ils regardent réellement.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 17
     QUELQUE CHOSE RÉPOND
  ======================================================= */

  setupInteraction({

    selector:
      ".response-trigger",

    dataAttribute:
      "response",

    revealId:
      "responseReveal",

    group:
      "response",

    content: {

      pull: `
        <strong>Ça tire</strong>
        <p>
          Lucy ressent
          une nouvelle force
          qui agit directement
          sur le cercle.
        </p>
      `,

      toward: `
        <strong>Vers nous</strong>
        <p>
          Cette force
          ne part pas
          de leur côté du passage.
          Elle vient
          de l'autre côté
          vers eux.
        </p>
      `,

      opened: `
        <strong>Vous avez ouvert</strong>
        <p>
          Le Maître Noir
          semble enfin voir
          se produire
          ce qu'il attendait
          depuis longtemps.
        </p>
      `,

      called: `
        <strong>Qui a appelé ?</strong>
        <p>
          Sa phrase
          change complètement
          la compréhension de la scène :
          ils ne savent plus
          s'ils ont envoyé un appel
          ou répondu à quelque chose
          qui les cherchait déjà.
        </p>
      `

    }

  });


  /* =======================================================
     14. RESTAURATION DES INTERACTIONS
  ======================================================= */

  function restoreDiscoveredButtons() {

    const mappings = {

      spidersAttack:
        "spiders-attack",

      amyReturn:
        "amy-return",

      amyChoice:
        "amy-choice",

      fourPoints:
        "four-points",

      amyLee:
        "amy-lee",

      bridgeActivation:
        "bridge-activation",

      keyActivation:
        "key-activation",

      memoryActivation:
        "memory-activation",

      pandoreMap:
        "pandore-map",

      bladeLight:
        "blade-light",

      fourFunctions:
        "four-functions",

      returnPath:
        "return-path",

      anchorRole:
        "anchor-role",

      lucyChoice:
        "lucy-choice",

      opaque:
        "opaque",

      worlds:
        "worlds",

      response:
        "response"

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
     FIN DU CHAPITRE 31
  ======================================================= */

});
