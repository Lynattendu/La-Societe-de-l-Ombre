
"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 32 — LE MESSAGER
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
    "societeOmbre_ch32_";

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
     LUCY NE PEUT PLUS RETIRER LA LAME
  ======================================================= */

  setupInteraction({

    selector:
      ".locked-blade-trigger",

    dataAttribute:
      "lockedBlade",

    revealId:
      "lockedBladeReveal",

    group:
      "locked-blade",

    content: {

      white: `
        <strong>Tout devient blanc</strong>
        <p>
          Pendant un instant,
          la cavité,
          les visages
          et même les notions
          de haut et de bas
          disparaissent.
        </p>
      `,

      blade: `
        <strong>La lame reste engagée</strong>
        <p>
          Lucy est toujours reliée
          au dispositif.
          La lame lumineuse
          reste insérée
          dans la fente.
        </p>
      `,

      lines: `
        <strong>Les lignes s'affolent</strong>
        <p>
          La cartographie
          projetée par Pandore
          change brutalement.
          Les trajectoires
          bougent trop vite
          pour être interprétées normalement.
        </p>
      `,

      "do-not-remove": `
        <strong>Ne pas retirer</strong>
        <p>
          Root comprend
          que couper brutalement
          la fonction d'Ancre
          pourrait déstabiliser
          tout le cercle.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     ANNA MAINTIENT LE PONT
  ======================================================= */

  setupInteraction({

    selector:
      ".bridge-holds-trigger",

    dataAttribute:
      "bridgeHolds",

    revealId:
      "bridgeHoldsReveal",

    group:
      "bridge-holds",

    content: {

      south: `
        <strong>Toujours au Sud</strong>
        <p>
          Malgré ce qui vient
          de traverser le seuil,
          Anna reste
          à sa position.
        </p>
      `,

      link: `
        <strong>Liaison des quatre points</strong>
        <p>
          La lumière
          passe réellement
          à travers Anna.
          Le Pont relie maintenant
          les quatre fonctions.
        </p>
      `,

      betty: `
        <strong>Betty veut intervenir</strong>
        <p>
          L'instinct de Betty
          lui ordonne
          de rejoindre sa fille,
          mais cela pourrait
          interrompre le cercle.
        </p>
      `,

      circle: `
        <strong>Ne pas rompre le cercle</strong>
        <p>
          Personne ne sait
          ce qui se produirait
          si Anna quittait
          sa position maintenant.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     LE MAÎTRE NOIR RÉCUPÈRE
  ======================================================= */

  setupInteraction({

    selector:
      ".master-recovers-trigger",

    dataAttribute:
      "masterRecovers",

    revealId:
      "masterRecoversReveal",

    group:
      "master-recovers",

    content: {

      paralysis: `
        <strong>La paralysie cède</strong>
        <p>
          L'effet provoqué
          par Amy et Maître Lee
          n'était que temporaire.
        </p>
      `,

      movement: `
        <strong>Il recommence à bouger</strong>
        <p>
          Un doigt,
          puis deux :
          le contrôle de son corps
          revient progressivement.
        </p>
      `,

      amy: `
        <strong>Amy reste devant lui</strong>
        <p>
          Amy refuse
          de détourner son attention.
          Elle reste entre lui
          et le reste du groupe.
        </p>
      `,

      watch: `
        <strong>Regarder jusqu'au bout</strong>
        <p>
          Amy ne cherche plus
          seulement à le neutraliser.
          Elle veut qu'il assiste
          aux conséquences
          de ce qu'il a provoqué.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     LE MESSAGER PREND FORME
  ======================================================= */

  setupInteraction({

    selector:
      ".messenger-form-trigger",

    dataAttribute:
      "messengerForm",

    revealId:
      "messengerFormReveal",

    group:
      "messenger-form",

    content: {

      sphere: `
        <strong>Une sphère</strong>
        <p>
          L'obscurité
          au centre du dispositif
          commence par prendre
          une forme presque sphérique.
        </p>
      `,

      matter: `
        <strong>Matière sombre et lumineuse</strong>
        <p>
          La chose
          semble réunir
          deux propriétés opposées :
          obscurité et lumière.
        </p>
      `,

      storm: `
        <strong>Fumée et éclairs</strong>
        <p>
          Sa matière
          ressemble à un nuage
          parcouru d'énergie,
          sans structure physique stable.
        </p>
      `,

      unknown: `
        <strong>Peter ne l'avait pas prévu</strong>
        <p>
          Même Peter,
          malgré toute sa technologie,
          ne possède aucun modèle
          capable d'expliquer
          ce qui vient d'apparaître.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     LE MESSAGER RECONNAÎT ANNA
  ======================================================= */

  setupInteraction({

    selector:
      ".recognizes-anna-trigger",

    dataAttribute:
      "recognizesAnna",

    revealId:
      "recognizesAnnaReveal",

    group:
      "recognizes-anna",

    content: {

      turn: `
        <strong>Il se tourne vers Anna</strong>
        <p>
          La première personne
          vers laquelle la forme
          dirige clairement
          son attention
          n'est pas le Maître Noir,
          mais Anna.
        </p>
      `,

      vibration: `
        <strong>La vibration</strong>
        <p>
          Une vibration
          traverse le cercle
          au moment où
          le Messager observe Anna.
        </p>
      `,

      knows: `
        <strong>« Il me connaît »</strong>
        <p>
          Anna ressent
          quelque chose
          qui dépasse
          une simple observation.
        </p>
      `,

      recognizes: `
        <strong>Il la reconnaît</strong>
        <p>
          Elle ne sait pas encore pourquoi,
          mais la sensation
          est suffisamment nette
          pour qu'elle distingue
          connaissance et reconnaissance.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     LE MAÎTRE NOIR EST IGNORÉ
  ======================================================= */

  setupInteraction({

    selector:
      ".ignored-master-trigger",

    dataAttribute:
      "ignoredMaster",

    revealId:
      "ignoredMasterReveal",

    group:
      "ignored-master",

    content: {

      finally: `
        <strong>« Enfin »</strong>
        <p>
          Le Maître Noir
          croit immédiatement
          que l'apparition
          confirme tout
          ce qu'il cherchait.
        </p>
      `,

      ignored: `
        <strong>Ignoré</strong>
        <p>
          Malgré ses appels,
          le Messager
          ne lui accorde
          aucune réponse.
        </p>
      `,

      amy: `
        <strong>Amy le bloque</strong>
        <p>
          Même pendant
          cette apparition,
          Amy reste chargée
          d'empêcher le Maître Noir
          d'intervenir.
        </p>
      `,

      hope: `
        <strong>« Vous non plus »</strong>
        <p>
          Hope lui rappelle
          que son obsession
          ne signifie pas
          qu'il comprend réellement
          ce qu'il a devant lui.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
     TOUTES LES MARQUES RÉAGISSENT
  ======================================================= */

  setupInteraction({

    selector:
      ".all-marks-trigger",

    dataAttribute:
      "allMarks",

    revealId:
      "allMarksReveal",

    group:
      "all-marks",

    content: {

      pandore: `
        <strong>Pandore et les symboles</strong>
        <p>
          Les symboles
          de la cartographie
          traversent la matière
          du Messager
          et en ressortent transformés.
        </p>
      `,

      everyone: `
        <strong>Toutes les marques</strong>
        <p>
          Dragon,
          Phénix,
          Pandore,
          lame,
          marques d'Amy
          et de Hale :
          toutes réagissent.
        </p>
      `,

      anna: `
        <strong>Anna sans marque</strong>
        <p>
          Anna se distingue :
          aucune marque
          n'apparaît sur elle.
          Son corps entier
          est entouré
          d'une lumière fine.
        </p>
      `,

      count: `
        <strong>Il les compte</strong>
        <p>
          Le Messager
          observe chaque personne
          l'une après l'autre,
          comme s'il cherchait
          à les identifier
          individuellement.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
     ÉLIE BLOQUE LES RENFORTS
  ======================================================= */

  setupInteraction({

    selector:
      ".elie-blockade-trigger",

    dataAttribute:
      "elieBlockade",

    revealId:
      "elieBlockadeReveal",

    group:
      "elie-blockade",

    content: {

      blast: `
        <strong>Détonations</strong>
        <p>
          Les explosions
          entendues à l'extérieur
          viennent de l'opération
          menée par Élie.
        </p>
      `,

      reinforcements: `
        <strong>Bloquer les renforts</strong>
        <p>
          Élie empêche
          les forces du Maître Noir
          de rejoindre rapidement
          la Cueva.
        </p>
      `,

      roads: `
        <strong>Routes coupées</strong>
        <p>
          Les accès secondaires
          sont désormais bloqués,
          ce qui isole davantage
          la cavité.
        </p>
      `,

      time: `
        <strong>Gagner du temps</strong>
        <p>
          Son rôle
          n'est pas d'entrer
          dans le dispositif,
          mais d'offrir au groupe
          les minutes nécessaires
          pour aller jusqu'au bout.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     LES VISIONS COMMENCENT
  ======================================================= */

  setupInteraction({

    selector:
      ".visions-trigger",

    dataAttribute:
      "visions",

    revealId:
      "visionsReveal",

    group:
      "visions",

    content: {

      touch: `
        <strong>La matière les traverse</strong>
        <p>
          Le Messager
          ne les frappe pas.
          Sa matière passe
          directement à travers eux.
        </p>
      `,

      warm: `
        <strong>Comme un vent chaud</strong>
        <p>
          Malgré son apparence
          inquiétante,
          le contact
          n'est ni violent
          ni douloureux.
        </p>
      `,

      everyone: `
        <strong>Chacun voit quelque chose</strong>
        <p>
          Le contact provoque
          une expérience différente
          chez chaque personne
          présente.
        </p>
      `,

      individual: `
        <strong>Visions individuelles</strong>
        <p>
          Les images
          semblent adaptées
          à l'histoire,
          aux choix
          et aux contradictions
          propres à chacun.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     VISION DE ROOT
  ======================================================= */

  setupInteraction({

    selector:
      ".root-vision-trigger",

    dataAttribute:
      "rootVision",

    revealId:
      "rootVisionReveal",

    group:
      "root-vision",

    content: {

      paths: `
        <strong>Les chemins</strong>
        <p>
          Root retrouve
          l'image qui lui correspond :
          des milliers de chemins
          et de trajectoires.
        </p>
      `,

      worlds: `
        <strong>Les mondes</strong>
        <p>
          Les routes
          qu'elle perçoit
          semblent traverser
          des mondes différents.
        </p>
      `,

      return: `
        <strong>Les routes qui reviennent</strong>
        <p>
          Certaines routes
          ne mènent pas seulement
          ailleurs :
          elles reviennent
          vers leur point d'origine.
        </p>
      `,

      destination: `
        <strong>La destination</strong>
        <p>
          La vision
          lui rappelle une limite essentielle :
          connaître tous les chemins
          ne signifie pas
          choisir à la place
          de celui qui les emprunte.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     VISION D'ANNA
  ======================================================= */

  setupInteraction({

    selector:
      ".anna-vision-trigger",

    dataAttribute:
      "annaVision",

    revealId:
      "annaVisionReveal",

    group:
      "anna-vision",

    content: {

      hand: `
        <strong>La main</strong>
        <p>
          Anna voit
          une main immense,
          mais qui ne lui paraît
          pas menaçante.
        </p>
      `,

      sphere: `
        <strong>La sphère</strong>
        <p>
          La main
          contient une sphère
          dans laquelle
          apparaissent étoiles
          et mondes.
        </p>
      `,

      worlds: `
        <strong>Les mondes</strong>
        <p>
          La vision
          donne à Anna
          une perception nouvelle
          de l'échelle
          de ce qu'ils viennent
          de découvrir.
        </p>
      `,

      small: `
        <strong>Minuscules</strong>
        <p>
          Anna comprend
          qu'ils ne sont peut-être
          pas le centre
          d'une immensité,
          mais une infime partie
          de quelque chose
          de beaucoup plus vaste.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     VISION D'AMY
  ======================================================= */

  setupInteraction({

    selector:
      ".amy-vision-trigger",

    dataAttribute:
      "amyVision",

    revealId:
      "amyVisionReveal",

    group:
      "amy-vision",

    content: {

      children: `
        <strong>Deux petites filles</strong>
        <p>
          Amy se voit
          enfant avec Hope,
          avant tout ce que
          les différents ordres
          ont construit autour d'elles.
        </p>
      `,

      barrier: `
        <strong>La barrière</strong>
        <p>
          Une séparation
          existe entre elles,
          mais Amy choisit
          de la franchir.
        </p>
      `,

      protected: `
        <strong>Ceux qu'elle a protégés</strong>
        <p>
          Elle découvre
          que beaucoup
          de ses anciens choix
          étaient déjà
          des actes de protection,
          même si elle refusait
          de les nommer ainsi.
        </p>
      `,

      shield: `
        <strong>Le bouclier</strong>
        <p>
          Sa marque
          prend enfin un sens
          qu'Amy peut accepter :
          non pas servir,
          mais protéger.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     VISION DE BETTY
  ======================================================= */

  setupInteraction({

    selector:
      ".betty-vision-trigger",

    dataAttribute:
      "bettyVision",

    revealId:
      "bettyVisionReveal",

    group:
      "betty-vision",

    content: {

      cells: `
        <strong>Les cellules</strong>
        <p>
          Betty voit
          la vie commencer,
          se diviser
          et se construire.
        </p>
      `,

      origin: `
        <strong>Anna à l'origine</strong>
        <p>
          Elle revoit Anna
          avant sa naissance,
          réduite à quelques cellules
          et à une possibilité.
        </p>
      `,

      "open-hand": `
        <strong>Ouvrir la main</strong>
        <p>
          Plus Betty tente
          de retenir Anna,
          plus l'image s'éloigne.
          Elle ne revient
          que lorsque Betty
          accepte d'ouvrir la main.
        </p>
      `,

      choice: `
        <strong>La laisser choisir</strong>
        <p>
          Betty comprend
          enfin pleinement
          que donner la vie
          ne donne aucun droit
          de possession
          sur celle-ci.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     VISION DE PETER
  ======================================================= */

  setupInteraction({

    selector:
      ".peter-vision-trigger",

    dataAttribute:
      "peterVision",

    revealId:
      "peterVisionReveal",

    group:
      "peter-vision",

    content: {

      doors: `
        <strong>Les portes</strong>
        <p>
          Peter voit
          des milliers de portes,
          certaines ouvertes,
          d'autres fermées.
        </p>
      `,

      janus: `
        <strong>Janus</strong>
        <p>
          Les deux visages
          de Janus
          représentent deux regards :
          ce qui existe déjà
          et ce qui pourrait exister.
        </p>
      `,

      "two-uses": `
        <strong>Deux usages</strong>
        <p>
          Toute invention
          peut devenir
          un outil qui libère
          ou un outil
          qui enferme.
        </p>
      `,

      "for-whom": `
        <strong>Pour qui ?</strong>
        <p>
          Peter comprend
          qu'une invention
          ne doit pas seulement
          répondre à
          « Est-ce possible ? »
          mais aussi à
          « Pourquoi ? »
          et surtout
          « Pour qui ? »
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     VOUS AVEZ ÉTÉ ENTENDUS
  ======================================================= */

  setupInteraction({

    selector:
      ".heard-trigger",

    dataAttribute:
      "heard",

    revealId:
      "heardReveal",

    group:
      "heard",

    content: {

      voice: `
        <strong>La voix</strong>
        <p>
          Le Messager
          ne parle pas
          dans l'air.
          Sa voix apparaît
          directement
          dans chacun d'eux.
        </p>
      `,

      "not-called": `
        <strong>Vous n'avez rien appelé</strong>
        <p>
          Leur compréhension
          du dispositif
          était incomplète.
          Ils pensaient
          avoir provoqué l'appel.
        </p>
      `,

      heard: `
        <strong>Vous avez été entendus</strong>
        <p>
          Le passage
          semble avoir fonctionné
          moins comme un appel
          que comme un signal
          suffisamment perceptible
          pour attirer une réponse.
        </p>
      `,

      difference: `
        <strong>« Toutes »</strong>
        <p>
          Pour le Messager,
          appeler volontairement
          et être entendu
          ne sont pas
          deux formulations équivalentes.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     RÉVÉLATION DES ANCIENS
  ======================================================= */

  setupInteraction({

    selector:
      ".ancients-reveal-trigger",

    dataAttribute:
      "ancientsReveal",

    revealId:
      "ancientsRevealReveal",

    group:
      "ancients-reveal",

    content: {

      function: `
        <strong>Une fonction</strong>
        <p>
          Le Messager
          ne se définit pas
          d'abord comme une espèce
          ou un individu,
          mais comme une fonction.
        </p>
      `,

      messenger: `
        <strong>Le Messager</strong>
        <p>
          « Messager »
          n'est peut-être
          que le mot humain
          le plus proche
          de ce qu'il représente.
        </p>
      `,

      ancients: `
        <strong>Les Anciens</strong>
        <p>
          Le Messager
          confirme enfin
          que ceux que Root
          et les différents ordres
          appelaient les Anciens
          ne sont pas seulement
          une légende.
        </p>
      `,

      yes: `
        <strong>Oui</strong>
        <p>
          Un seul mot
          ferme des siècles
          d'incertitude :
          les Anciens existent.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 17
     LE PRIX DES RÉPONSES
  ======================================================= */

  setupInteraction({

    selector:
      ".answers-price-trigger",

    dataAttribute:
      "answersPrice",

    revealId:
      "answersPriceReveal",

    group:
      "answers-price",

    content: {

      minutes: `
        <strong>Quelques minutes</strong>
        <p>
          La fenêtre
          ne restera pas stable
          assez longtemps
          pour poser
          toutes les questions
          qu'ils pourraient imaginer.
        </p>
      `,

      questions: `
        <strong>Poser les questions</strong>
        <p>
          Anna comprend
          que le Messager
          représente une occasion
          qu'ils ne peuvent
          pas laisser passer.
        </p>
      `,

      price: `
        <strong>Le prix</strong>
        <p>
          Le Messager
          ne demande ni objet,
          ni sacrifice,
          ni paiement matériel.
          Le prix des réponses
          est ailleurs.
        </p>
      `,

      understand: `
        <strong>Comprendre</strong>
        <p>
          Pour recevoir
          certaines réponses,
          il ne suffit pas
          de vouloir les connaître.
          Il faut être capable
          d'en comprendre
          réellement le sens.
        </p>
      `

    }

  });


  /* =======================================================
     14. RESTAURATION DES INTERACTIONS
  ======================================================= */

  function restoreDiscoveredButtons() {

    const mappings = {

      lockedBlade:
        "locked-blade",

      bridgeHolds:
        "bridge-holds",

      masterRecovers:
        "master-recovers",

      messengerForm:
        "messenger-form",

      recognizesAnna:
        "recognizes-anna",

      ignoredMaster:
        "ignored-master",

      allMarks:
        "all-marks",

      elieBlockade:
        "elie-blockade",

      visions:
        "visions",

      rootVision:
        "root-vision",

      annaVision:
        "anna-vision",

      amyVision:
        "amy-vision",

      bettyVision:
        "betty-vision",

      peterVision:
        "peter-vision",

      heard:
        "heard",

      ancientsReveal:
        "ancients-reveal",

      answersPrice:
        "answers-price"

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
     FIN DU CHAPITRE 32
  ======================================================= */

});
