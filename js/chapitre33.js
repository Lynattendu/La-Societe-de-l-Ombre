
"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 33 — LE CHOIX
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
    "societeOmbre_ch33_";

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


    oscillator.connect(
      gain
    );

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
     ANNA — ESPOIR
  ======================================================= */

  setupInteraction({

    selector:
      ".anna-hope-trigger",

    dataAttribute:
      "annaHope",

    revealId:
      "annaHopeReveal",

    group:
      "anna-hope",

    content: {

      light: `
        <strong>La lumière d'Anna</strong>
        <p>
          La première sphère
          à s'ouvrir
          est celle d'Anna.
          Chacun comprend
          instinctivement
          que la question
          lui est destinée.
        </p>
      `,

      riddle: `
        <strong>L'énigme</strong>
        <p>
          Le Messager
          ne lui donne pas
          directement une réponse.
          Il commence
          par vérifier
          ce qu'elle comprend déjà.
        </p>
      `,

      hope: `
        <strong>ESPOIR</strong>
        <p>
          Anna reconnaît immédiatement
          ce qui permet encore
          d'avancer lorsque
          presque tout a disparu :
          l'espoir.
        </p>
      `,

      question: `
        <strong>Sa question</strong>
        <p>
          Anna renonce
          aux questions uniquement
          centrées sur sa naissance
          et demande quelque chose
          de plus vaste :
          pourquoi sommes-nous là ?
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     BETTY — VIE
  ======================================================= */

  setupInteraction({

    selector:
      ".betty-life-trigger",

    dataAttribute:
      "bettyLife",

    revealId:
      "bettyLifeReveal",

    group:
      "betty-life",

    content: {

      life: `
        <strong>VIE</strong>
        <p>
          Betty identifie
          immédiatement la réponse
          grâce à la vision
          de la cellule
          et de ses divisions.
        </p>
      `,

      death: `
        <strong>La mort</strong>
        <p>
          Le Messager
          renverse la question
          de Betty :
          la mort n'est pas toujours
          l'opposé de la vie.
        </p>
      `,

      movement: `
        <strong>Le mouvement</strong>
        <p>
          Rien de vivant
          ne reste parfaitement identique.
          La vie implique
          transformation,
          renouvellement
          et disparition.
        </p>
      `,

      value: `
        <strong>Donner de la valeur</strong>
        <p>
          Le Messager invite Betty
          à moins vouloir
          supprimer toute fin
          et davantage
          donner de la valeur
          au temps qui la précède.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     HOPE — ÉQUILIBRE
  ======================================================= */

  setupInteraction({

    selector:
      ".hope-balance-trigger",

    dataAttribute:
      "hopeBalance",

    revealId:
      "hopeBalanceReveal",

    group:
      "hope-balance",

    content: {

      balance: `
        <strong>ÉQUILIBRE</strong>
        <p>
          Hope reconnaît
          ce qui existe
          entre deux extrêmes
          et disparaît
          lorsque l'un d'eux
          prend toute la place.
        </p>
      `,

      "six-nine": `
        <strong>Six ou neuf</strong>
        <p>
          Le même symbole
          peut devenir six
          ou neuf
          selon l'endroit
          depuis lequel
          on le regarde.
        </p>
      `,

      viewpoint: `
        <strong>Point de vue</strong>
        <p>
          L'expérience,
          les connaissances
          et la position
          influencent profondément
          ce qu'une personne
          croit observer.
        </p>
      `,

      missing: `
        <strong>Ce qui manque</strong>
        <p>
          Avant de juger
          celui qui voit autrement,
          il faut aussi chercher
          l'information
          qui manque peut-être
          aux deux observateurs.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     ROOT — DESTIN
  ======================================================= */

  setupInteraction({

    selector:
      ".root-destiny-trigger",

    dataAttribute:
      "rootDestiny",

    revealId:
      "rootDestinyReveal",

    group:
      "root-destiny",

    content: {

      destiny: `
        <strong>DESTIN</strong>
        <p>
          Root reconnaît
          ce qui semble toujours
          à venir
          et se transforme
          à mesure
          que des choix sont faits.
        </p>
      `,

      "old-roads": `
        <strong>Routes anciennes</strong>
        <p>
          Certaines possibilités
          existaient avant eux,
          ouvertes par les choix
          de ceux
          qui les ont précédés.
        </p>
      `,

      "new-road": `
        <strong>Créer une route</strong>
        <p>
          Certaines voies
          ne peuvent exister
          qu'après qu'un premier être
          a osé avancer
          là où personne
          n'était encore allé.
        </p>
      `,

      after: `
        <strong>Regarder après</strong>
        <p>
          Ce que l'on appelle destin
          peut parfois
          n'apparaître comme évident
          qu'une fois la route
          déjà parcourue.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     LUCY — CONFIANCE / CHOIX
  ======================================================= */

  setupInteraction({

    selector:
      ".lucy-choice-final-trigger",

    dataAttribute:
      "lucyChoiceFinal",

    revealId:
      "lucyChoiceFinalReveal",

    group:
      "lucy-choice-final",

    content: {

      trust: `
        <strong>CONFIANCE</strong>
        <p>
          Pour respecter
          la confiance,
          il faut la donner.
          Mais pour la donner,
          il faut d'abord
          être capable
          de la posséder.
        </p>
      `,

      events: `
        <strong>Ce qui arrive</strong>
        <p>
          Lucy ne contrôle pas
          toutes les blessures,
          pertes,
          rencontres
          ou décisions
          imposées par les autres.
        </p>
      `,

      road: `
        <strong>La route</strong>
        <p>
          Même lorsque
          plusieurs chemins
          conduisent au même événement,
          chacun transforme
          différemment
          celui qui l'emprunte.
        </p>
      `,

      change: `
        <strong>Ce que le choix change</strong>
        <p>
          Un choix
          ne modifie pas forcément
          ce qui arrivera.
          Mais il peut modifier
          profondément
          celui qui traversera
          cet événement.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     AMY — PROTÉGER
  ======================================================= */

  setupInteraction({

    selector:
      ".amy-protection-final-trigger",

    dataAttribute:
      "amyProtectionFinal",

    revealId:
      "amyProtectionFinalReveal",

    group:
      "amy-protection-final",

    content: {

      protect: `
        <strong>PROTÉGER</strong>
        <p>
          Amy reconnaît enfin
          pleinement le sens
          de sa marque :
          se tenir entre
          le danger
          et ce qu'elle choisit
          de préserver.
        </p>
      `,

      past: `
        <strong>Le passé</strong>
        <p>
          Son véritable désir
          n'est pas seulement
          de modifier des événements,
          mais de savoir
          qui elle serait
          sans eux.
        </p>
      `,

      repair: `
        <strong>Réparer</strong>
        <p>
          Réparer
          ne signifie pas
          effacer le geste
          qui a déjà eu lieu.
        </p>
      `,

      next: `
        <strong>Le prochain geste</strong>
        <p>
          Amy peut néanmoins
          décider de l'influence
          que son passé
          aura sur ce qu'elle
          choisira de faire ensuite.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
     PETER — CRÉER
  ======================================================= */

  setupInteraction({

    selector:
      ".peter-create-final-trigger",

    dataAttribute:
      "peterCreateFinal",

    revealId:
      "peterCreateFinalReveal",

    group:
      "peter-create-final",

    content: {

      imagination: `
        <strong>IMAGINATION</strong>
        <p>
          Peter reconnaît
          cette capacité
          à fabriquer
          des mondes,
          des objets
          et des possibilités
          qui n'existent pas encore.
        </p>
      `,

      can: `
        <strong>Peut-on le faire ?</strong>
        <p>
          L'intelligence humaine
          repousse constamment
          la frontière
          de ce qui devient possible.
        </p>
      `,

      should: `
        <strong>Devrait-on le faire ?</strong>
        <p>
          La possibilité technique
          n'est jamais
          une justification suffisante
          pour créer quelque chose.
        </p>
      `,

      become: `
        <strong>Que deviendrons-nous ?</strong>
        <p>
          Toute invention
          transforme aussi
          ceux qui la créent
          et ceux qui l'utilisent.
          C'est cette conséquence
          qu'il faut apprendre
          à interroger.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
     MAX — PAROLE / VÉRITÉ
  ======================================================= */

  setupInteraction({

    selector:
      ".max-truth-trigger",

    dataAttribute:
      "maxTruth",

    revealId:
      "maxTruthReveal",

    group:
      "max-truth",

    content: {

      speech: `
        <strong>PAROLE</strong>
        <p>
          Max reconnaît
          l'outil que presque
          tous les humains possèdent,
          mais dont l'usage
          demande davantage
          de sagesse qu'il n'y paraît.
        </p>
      `,

      facts: `
        <strong>Les faits</strong>
        <p>
          Les faits
          existent indépendamment
          du désir
          de celui qui les observe.
        </p>
      `,

      interpretation: `
        <strong>L'interprétation</strong>
        <p>
          En revanche,
          celui qui observe
          apporte toujours
          une partie de lui-même
          dans son interprétation.
        </p>
      `,

      questions: `
        <strong>Continuer à questionner</strong>
        <p>
          Celui qui exige
          la fin des questions
          mérite précisément
          d'être interrogé
          avec encore plus
          d'attention.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     MAÎTRE NOIR — IMMORTALITÉ
  ======================================================= */

  setupInteraction({

    selector:
      ".immortality-trigger",

    dataAttribute:
      "immortality",

    revealId:
      "immortalityReveal",

    group:
      "immortality",

    content: {

      fear: `
        <strong>PEUR</strong>
        <p>
          Le Maître Noir
          identifie la peur,
          mais ne semble toujours
          pas reconnaître
          la place qu'elle occupe
          dans sa propre obsession.
        </p>
      `,

      continue: `
        <strong>Continuer</strong>
        <p>
          Il ne cherche pas
          seulement à laisser
          une trace.
          Il veut conserver
          sa propre conscience
          telle qu'elle existe maintenant.
        </p>
      `,

      movement: `
        <strong>La vie est mouvement</strong>
        <p>
          Le Messager
          souligne la contradiction :
          demander à ne plus changer
          revient peut-être
          à demander à la vie
          de cesser d'être vivante.
        </p>
      `,

      what: `
        <strong>Ce que nous sommes</strong>
        <p>
          La question de l'immortalité
          reste impossible à résoudre
          tant que l'humanité
          ignore encore
          ce qu'est réellement
          sa propre conscience.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     LE CHOIX DE LA PORTE
  ======================================================= */

  setupInteraction({

    selector:
      ".door-choice-trigger",

    dataAttribute:
      "doorChoice",

    revealId:
      "doorChoiceReveal",

    group:
      "door-choice",

    content: {

      closing: `
        <strong>Fermer la porte</strong>
        <p>
          Le groupe choisit
          de refermer le passage,
          même après tout
          ce qu'il a fallu
          pour parvenir à l'ouvrir.
        </p>
      `,

      unknown: `
        <strong>L'inconnu</strong>
        <p>
          Le Maître Noir
          considère précisément
          l'absence de connaissance
          comme une raison
          suffisante pour avancer.
        </p>
      `,

      "not-obliged": `
        <strong>Pas obligé de franchir</strong>
        <p>
          Anna sépare
          possibilité et obligation :
          pouvoir ouvrir une porte
          ne signifie pas
          qu'il faille forcément
          la traverser.
        </p>
      `,

      "my-choice": `
        <strong>Mon choix</strong>
        <p>
          Anna accepte
          de ne pas tout comprendre.
          Mais elle revendique
          le droit de décider
          ce qu'elle fera
          de cette incertitude.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     LE MAÎTRE NOIR FRANCHIT LE SEUIL
  ======================================================= */

  setupInteraction({

    selector:
      ".master-crosses-trigger",

    dataAttribute:
      "masterCrosses",

    revealId:
      "masterCrossesReveal",

    group:
      "master-crosses",

    content: {

      decision: `
        <strong>Sa décision</strong>
        <p>
          Le Maître Noir
          choisit lui aussi.
          Il refuse
          de laisser disparaître
          la porte qu'il a cherchée
          toute sa vie.
        </p>
      `,

      run: `
        <strong>Il s'élance</strong>
        <p>
          Il ne cherche plus
          à convaincre personne.
          Il transforme
          son obsession
          en décision immédiate.
        </p>
      `,

      distortion: `
        <strong>Déformation</strong>
        <p>
          Au passage du seuil,
          sa silhouette
          change d'échelle
          et de forme,
          comme si les règles
          habituelles de l'espace
          cessaient de s'appliquer.
        </p>
      `,

      gone: `
        <strong>Disparu</strong>
        <p>
          Aucun corps
          ni signal
          ne reste visible.
          Mais personne
          ne peut confirmer
          qu'il est mort.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     DERNIER MESSAGE DU MESSAGER
  ======================================================= */

  setupInteraction({

    selector:
      ".final-message-trigger",

    dataAttribute:
      "finalMessage",

    revealId:
      "finalMessageReveal",

    group:
      "final-message",

    content: {

      rule: `
        <strong>Aucune règle</strong>
        <p>
          Le Messager
          refuse de donner
          une formule universelle
          qui garantirait
          à l'humanité
          de toujours bien agir.
        </p>
      `,

      difference: `
        <strong>Vivre avec la différence</strong>
        <p>
          La plus grande difficulté
          ne sera peut-être pas
          de franchir les mondes,
          mais de vivre
          avec ceux qui regardent
          le réel autrement.
        </p>
      `,

      ability: `
        <strong>Ce que nous pouvons faire</strong>
        <p>
          Les capacités humaines
          continueront probablement
          à grandir :
          matière,
          vie,
          communication,
          peut-être passage
          entre les mondes.
        </p>
      `,

      refuse: `
        <strong>Ce que nous refusons</strong>
        <p>
          Le progrès
          ne se mesure pas seulement
          à ce qu'une civilisation
          devient capable de faire,
          mais aussi
          à ce qu'elle choisit
          consciemment
          de ne pas faire.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     PREMIER CONTACT
  ======================================================= */

  setupInteraction({

    selector:
      ".first-contact-trigger",

    dataAttribute:
      "firstContact",

    revealId:
      "firstContactReveal",

    group:
      "first-contact",

    content: {

      ours: `
        <strong>La question nous appartient</strong>
        <p>
          Les Anciens
          ne décideront pas
          de ce que l'humanité
          doit devenir.
          Cette responsabilité
          reste humaine.
        </p>
      `,

      intelligence: `
        <strong>Intelligence</strong>
        <p>
          Comprendre davantage
          n'est peut-être pas
          la seule mesure
          d'une intelligence avancée.
          Savoir préserver
          peut compter autant.
        </p>
      `,

      "not-alone": `
        <strong>Jamais seuls</strong>
        <p>
          Le Messager
          confirme implicitement
          que l'humanité
          n'a jamais été
          la seule forme
          d'existence consciente.
        </p>
      `,

      first: `
        <strong>Premier contact</strong>
        <p>
          Tout ce qui vient
          de se produire
          n'est pas présenté
          comme une conclusion,
          mais comme
          le commencement
          d'une relation nouvelle.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     AMY — RÉDEMPTION
  ======================================================= */

  setupInteraction({

    selector:
      ".redemption-trigger",

    dataAttribute:
      "redemption",

    revealId:
      "redemptionReveal",

    group:
      "redemption",

    content: {

      justice: `
        <strong>Justice</strong>
        <p>
          Lucy ne nie pas
          ce qu'Amy a fait.
          La justice humaine
          pourra encore
          lui demander
          de répondre de ses actes.
        </p>
      `,

      redemption: `
        <strong>Rédemption</strong>
        <p>
          La rédemption
          n'efface pas
          automatiquement le passé.
          Elle commence
          par les actes
          qui viennent après lui.
        </p>
      `,

      saved: `
        <strong>Une vie sauvée</strong>
        <p>
          Sauver une vie
          ne supprime pas
          une vie prise.
          Mais cela ne rend pas
          la vie sauvée
          moins réelle.
        </p>
      `,

      prove: `
        <strong>À toi de le prouver</strong>
        <p>
          Lucy refuse
          de donner à Amy
          un nouveau titre
          comme une absolution.
          Être Protectrice
          devra devenir
          quelque chose
          qu'elle prouve
          par ses choix.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     NEXUS — ÉPILOGUE
  ======================================================= */

  setupInteraction({

    selector:
      ".nexus-epilogue-trigger",

    dataAttribute:
      "nexusEpilogue",

    revealId:
      "nexusEpilogueReveal",

    group:
      "nexus-epilogue",

    content: {

      together: `
        <strong>Réunis</strong>
        <p>
          Trois semaines plus tard,
          presque tous
          se retrouvent ensemble
          dans un contexte
          enfin presque ordinaire.
        </p>
      `,

      source: `
        <strong>Source de Vie</strong>
        <p>
          La Source de Vie
          n'est finalement pas
          seulement un objet
          ou une énergie :
          elle est liée
          au fonctionnement
          du passage.
        </p>
      `,

      passage: `
        <strong>Le passage</strong>
        <p>
          Au prochain alignement
          et si toutes les conditions
          sont réunies,
          le phénomène
          pourra apparaître
          de nouveau.
        </p>
      `,

      human: `
        <strong>Simplement humains</strong>
        <p>
          Pendant quelques minutes,
          les fonctions,
          les marques,
          les ordres
          et les mystères
          s'effacent.
          Il ne reste
          qu'un groupe
          d'êtres humains.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     SIGNAL FINAL
  ======================================================= */

  setupInteraction({

    selector:
      ".final-signal-trigger",

    dataAttribute:
      "finalSignal",

    revealId:
      "finalSignalReveal",

    group:
      "final-signal",

    content: {

      impossible: `
        <strong>Signal impossible</strong>
        <p>
          Le système
          s'allume sans réseau
          et sans alimentation
          censée fonctionner.
          Quelque chose
          vient donc d'activer
          le dispositif
          depuis ailleurs.
        </p>
      `,

      located: `
        <strong>PASSAGE LOCALISÉ</strong>
        <p>
          Le signal
          indique qu'un passage
          a été identifié.
          Mais rien ne précise
          encore lequel,
          ni où.
        </p>
      `,

      origin: `
        <strong>ORIGINE : INCONNUE</strong>
        <p>
          Le système
          ne reconnaît pas
          la provenance
          de ce qui vient
          de répondre.
        </p>
      `,

      crossing: `
        <strong>TRAVERSÉE EN COURS</strong>
        <p>
          Le premier contact
          n'était pas la fin.
          Quelque chose
          utilise désormais
          le passage
          dans l'autre direction.
        </p>
      `

    }

  });


  /* =======================================================
     14. RESTAURATION DES INTERACTIONS
  ======================================================= */

  function restoreDiscoveredButtons() {

    const mappings = {

      annaHope:
        "anna-hope",

      bettyLife:
        "betty-life",

      hopeBalance:
        "hope-balance",

      rootDestiny:
        "root-destiny",

      lucyChoiceFinal:
        "lucy-choice-final",

      amyProtectionFinal:
        "amy-protection-final",

      peterCreateFinal:
        "peter-create-final",

      maxTruth:
        "max-truth",

      immortality:
        "immortality",

      doorChoice:
        "door-choice",

      masterCrosses:
        "master-crosses",

      finalMessage:
        "final-message",

      firstContact:
        "first-contact",

      redemption:
        "redemption",

      nexusEpilogue:
        "nexus-epilogue",

      finalSignal:
        "final-signal"

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
     FIN DU CHAPITRE 33
     FIN DU TOME I
  ======================================================= */

});
