"use strict";

/* =========================================================
   LA SOCIÉTÉ DE L'OMBRE
   CHAPITRE 24 — L'IRREMPLAÇABLE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. ÉLÉMENTS PRINCIPAUX
  ======================================================= */

  const chapter = document.getElementById("chapter");
  const scenes = [...document.querySelectorAll(".scene")];

  const progressFill = document.getElementById("progressFill");

  const menuBtn = document.getElementById("menuBtn");
  const soundBtn = document.getElementById("soundBtn");

  const chapterMenu = document.getElementById("chapterMenu");
  const menuClose = document.getElementById("menuClose");

  const resumeBtn = document.getElementById("resumeBtn");
  const restartBtn = document.getElementById("restartBtn");
  const restartChapter = document.getElementById("restartChapter");

  const secretPopup = document.getElementById("secretPopup");


  /* =======================================================
     2. CLÉS DE SAUVEGARDE
  ======================================================= */

  const STORAGE_PREFIX = "societeOmbre_ch24_";

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
        localStorage.getItem(STORAGE_INTERACTIONS)
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

    if (audioContext.state === "suspended") {

      audioContext.resume().catch(() => {});

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

    const ctx = getAudioContext();

    if (!ctx) {
      return;
    }

    const oscillator =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      frequency,
      ctx.currentTime
    );

    gain.gain.setValueAtTime(
      volume,
      ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

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

    window.setTimeout(() => {

      playTone(
        680,
        0.1,
        0.02
      );

    }, 70);

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

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
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

                  paragraph.classList.add(
                    "is-visible"
                  );

                },
                index * 55
              );

            }
          );


          sceneObserver.unobserve(
            scene
          );

        });

      },

      {
        threshold: 0.12
      }

    );


  scenes.forEach(scene => {

    sceneObserver.observe(scene);

  });


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
     7. SAUVEGARDE DE LA POSITION
  ======================================================= */

  let saveTimer = null;


  function saveReadingPosition() {

    localStorage.setItem(
      STORAGE_SCROLL,
      String(window.scrollY)
    );

    updateProgress();

  }


  window.addEventListener(
    "scroll",
    () => {

      updateProgress();

      clearTimeout(saveTimer);

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
     8. CONTINUER VERS LA SCÈNE SUIVANTE
  ======================================================= */

  document
    .querySelectorAll("[data-next]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          playTone(
            480,
            0.06,
            0.025
          );

          const currentScene =
            button.closest(".scene");

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

          nextScene.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     9. MENU
  ======================================================= */

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

    chapterMenu.classList.remove(
      "open"
    );

    chapterMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
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
        event.key === "Escape"
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
      Number.isFinite(savedScroll) &&
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

  function restartReading() {

    Object.keys(localStorage)
      .filter(key =>
        key.startsWith(
          STORAGE_PREFIX
        )
      )
      .forEach(key => {

        localStorage.removeItem(
          key
        );

      });


    discoveredInteractions = [];


    document
      .querySelectorAll(
        ".interaction-btn"
      )
      .forEach(button => {

        button.classList.remove(
          "discovered",
          "active"
        );

      });


    document
      .querySelectorAll(
        ".reveal-box"
      )
      .forEach(box => {

        box.innerHTML = "";

        box.classList.remove(
          "visible",
          "open",
          "active"
        );

      });


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

    secretPopup.classList.add(
      "visible"
    );

    secretPopup.classList.add(
      "active"
    );

    secretPopup.setAttribute(
      "aria-hidden",
      "false"
    );


    popupTimer =
      window.setTimeout(
        () => {

          secretPopup.classList.remove(
            "visible"
          );

          secretPopup.classList.remove(
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
      !discoveredInteractions.includes(
        key
      );


    if (isNew) {

      discoveredInteractions.push(
        key
      );

      saveInteractions();

    }


    if (button) {

      button.classList.add(
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

    revealBox.classList.add(
      "visible"
    );

    revealBox.classList.add(
      "open"
    );

    revealBox.classList.add(
      "active"
    );

  }


  function selectButton(
    buttons,
    selectedButton
  ) {

    buttons.forEach(button => {

      button.classList.remove(
        "active"
      );

    });

    selectedButton.classList.add(
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
        ...document.querySelectorAll(
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


    buttons.forEach(button => {

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
        discoveredInteractions.includes(
          key
        )
      ) {

        button.classList.add(
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

    });

  }


  /* =======================================================
     INTERACTION 1
     ÉTAT D'AMY
  ======================================================= */

  setupInteraction({

    selector:
      ".amy-health-trigger",

    dataAttribute:
      "amyHealth",

    revealId:
      "amyHealthReveal",

    group:
      "amy-health",

    content: {

      healing: `
        <strong>Cicatrisation</strong>
        <p>
          La blessure évolue correctement.
          Mais une bonne cicatrisation ne signifie pas
          qu’Amy peut déjà reprendre normalement.
        </p>
      `,

      inflammation: `
        <strong>Inflammation</strong>
        <p>
          Elle diminue,
          mais la zone reste encore en récupération.
          Betty et Charles refusent de confondre
          amélioration et guérison complète.
        </p>
      `,

      training: `
        <strong>Entraînement</strong>
        <p>
          Amy veut déjà reprendre.
          Son corps,
          lui,
          demande encore du temps.
        </p>
      `,

      charles: `
        <strong>Avis de Charles</strong>
        <p>
          La récupération est bonne.
          Pas suffisante.
          Pour Charles,
          la prudence reste obligatoire.
        </p>
      `,

      amy: `
        <strong>Avis d’Amy</strong>
        <p>
          Amy considère qu’elle va très bien.
          Le problème est que personne autour d’elle
          ne semble partager cette définition.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 2
     CAPSULE RÉGÉNÉRATIVE
  ======================================================= */

  setupInteraction({

    selector:
      ".regenerative-trigger",

    dataAttribute:
      "regenerative",

    revealId:
      "regenerativeReveal",

    group:
      "regenerative",

    content: {

      adapted: `
        <strong>Capsule adaptée</strong>
        <p>
          Peter n’utilise pas exactement
          les mêmes capsules que pour Hope.
          La formulation est adaptée
          à la blessure d’Amy.
        </p>
      `,

      control: `
        <strong>Contrôler la réaction</strong>
        <p>
          Betty refuse toute utilisation aveugle.
          Chaque réaction doit être observée,
          mesurée et arrêtée si nécessaire.
        </p>
      `,

      local: `
        <strong>Diffusion locale</strong>
        <p>
          Le produit n’est pas diffusé
          dans tout l’organisme.
          Peter cible directement
          la zone blessée.
        </p>
      `,

      repair: `
        <strong>Réparation tissulaire</strong>
        <p>
          L’objectif est d’améliorer la perfusion,
          stimuler la réparation des tissus
          et réduire progressivement l’inflammation.
        </p>
      `,

      limits: `
        <strong>Pas de miracle</strong>
        <p>
          La capsule accélère certains mécanismes.
          Elle ne remplace ni le temps,
          ni le repos,
          ni la surveillance médicale.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 3
     LES QUATRE RÈGLES
  ======================================================= */

  setupInteraction({

    selector:
      ".four-rules-trigger",

    dataAttribute:
      "fourRules",

    revealId:
      "fourRulesReveal",

    group:
      "four-rules",

    content: {

      key: `
        <strong>La Clé</strong>
        <p>
          Les textes affirment
          que la Clé peut être brisée.
          Sa fonction semble donc reproductible
          ou transmissible d’une autre manière.
        </p>
      `,

      anchor: `
        <strong>L’Ancre</strong>
        <p>
          L’Ancre peut être remplacée
          par une force équivalente.
          La nature exacte de cette équivalence
          reste inconnue.
        </p>
      `,

      memory: `
        <strong>La Mémoire</strong>
        <p>
          La Mémoire peut être transmise.
          Pandore n’est donc peut-être pas liée
          définitivement à un seul porteur.
        </p>
      `,

      bridge: `
        <strong>Le Pont</strong>
        <p>
          Une seule fonction échappe
          aux possibilités de remplacement.
          Le Pont ne peut naître qu’une fois.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 4
     PONT ARTIFICIEL
  ======================================================= */

  setupInteraction({

    selector:
      ".artificial-bridge-trigger",

    dataAttribute:
      "artificialBridge",

    revealId:
      "artificialBridgeReveal",

    group:
      "artificial-bridge",

    content: {

      text: `
        <strong>Texte ancien</strong>
        <p>
          Le passage reconstitué provient
          de plusieurs fragments :
          inscriptions,
          images,
          données d’Isabel
          et symboles du dispositif.
        </p>
      `,

      attempt: `
        <strong>Ils ont essayé</strong>
        <p>
          La précision du texte suggère
          que les Gardiens ont déjà tenté
          de reproduire artificiellement
          la fonction du Pont.
        </p>
      `,

      artificial: `
        <strong>Pont artificiel</strong>
        <p>
          Reproduire l’apparence
          ou certaines propriétés du Pont
          ne suffit pas à créer
          sa véritable fonction.
        </p>
      `,

      failure: `
        <strong>Échec</strong>
        <p>
          Le texte est clair :
          un Pont artificiel
          ne relie rien.
        </p>
      `,

      form: `
        <strong>Imiter la forme</strong>
        <p>
          Une copie peut ressembler au Pont.
          Mais elle ne possède pas
          ce qui permet réellement
          de relier deux points.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 5
     ANNA EST IRREMPLAÇABLE
  ======================================================= */

  setupInteraction({

    selector:
      ".irreplaceable-trigger",

    dataAttribute:
      "irreplaceable",

    revealId:
      "irreplaceableReveal",

    group:
      "irreplaceable",

    content: {

      once: `
        <strong>Une seule fois</strong>
        <p>
          Les textes ne parlent pas
          d’une fonction rare.
          Ils parlent d’un événement
          qui ne se produit qu’une seule fois.
        </p>
      `,

      cannotcopy: `
        <strong>Impossible à copier</strong>
        <p>
          Une imitation du Pont
          peut reproduire la forme.
          Pas sa fonction.
        </p>
      `,

      anna: `
        <strong>Anna</strong>
        <p>
          Anna n’est plus seulement
          une personne liée au dispositif.
          Elle est sa seule connexion connue
          capable d’assurer la fonction du Pont.
        </p>
      `,

      guardians: `
        <strong>Les Gardiens</strong>
        <p>
          S’ils veulent ouvrir réellement
          le passage,
          les Gardiens ont besoin d’Anna vivante.
        </p>
      `,

      unique: `
        <strong>Irremplaçable</strong>
        <p>
          Clé,
          Mémoire
          et Ancre peuvent avoir une alternative.
          Le Pont,
          non.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 6
     LE POIDS DU RÔLE D'ANNA
  ======================================================= */

  setupInteraction({

    selector:
      ".anna-weight-trigger",

    dataAttribute:
      "annaWeight",

    revealId:
      "annaWeightReveal",

    group:
      "anna-weight",

    content: {

      unique: `
        <strong>Irremplaçable</strong>
        <p>
          Le mot peut sembler valorisant.
          Pour Anna,
          il ressemble surtout
          à une nouvelle contrainte.
        </p>
      `,

      role: `
        <strong>Son rôle</strong>
        <p>
          Être le Pont
          décrit une fonction.
          Cela ne définit pas
          tout ce qu’Anna est.
        </p>
      `,

      expectations: `
        <strong>Les attentes</strong>
        <p>
          Plus les autres comprennent
          son importance,
          plus le poids placé sur elle
          devient difficile à ignorer.
        </p>
      `,

      identity: `
        <strong>Son identité</strong>
        <p>
          Anna veut encore pouvoir être
          autre chose qu’un symbole,
          une fonction
          ou une pièce indispensable.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 7
     ÊTRE ESSENTIELLE
  ======================================================= */

  setupInteraction({

    selector:
      ".essential-trigger",

    dataAttribute:
      "essential",

    revealId:
      "essentialReveal",

    group:
      "essential",

    content: {

      others: `
        <strong>Pour les autres</strong>
        <p>
          Anna est désormais essentielle
          au dispositif,
          aux Gardiens
          et probablement aux Sentinelles.
        </p>
      `,

      herself: `
        <strong>Pour elle-même</strong>
        <p>
          Hope déplace la question :
          l’importance qu’Anna possède
          pour les autres
          ne dit rien de la valeur
          qu’elle se donne elle-même.
        </p>
      `,

      role: `
        <strong>Une fonction</strong>
        <p>
          Être indispensable à un mécanisme
          ne suffit pas
          à construire une identité.
        </p>
      `,

      choice: `
        <strong>Choisir</strong>
        <p>
          Anna n’a pas choisi d’être le Pont.
          Elle peut encore choisir
          ce qu’elle fera de cette fonction.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 8
     COMBAT HOPE / AMY
  ======================================================= */

  setupInteraction({

    selector:
      ".training-fight-trigger",

    dataAttribute:
      "trainingFight",

    revealId:
      "trainingFightReveal",

    group:
      "training-fight",

    content: {

      speed: `
        <strong>Vitesse d’Amy</strong>
        <p>
          La blessure ne lui a pas retiré
          ses réflexes.
          Amy reste rapide,
          précise
          et difficile à lire.
        </p>
      `,

      hope: `
        <strong>Hope s’adapte</strong>
        <p>
          Hope ne cherche pas
          à dominer Amy.
          Elle ajuste constamment
          son rythme au sien.
        </p>
      `,

      rhythm: `
        <strong>Le rythme monte</strong>
        <p>
          Ce qui devait être
          une simple vérification physique
          devient progressivement
          un véritable échange.
        </p>
      `,

      scar: `
        <strong>La cicatrice</strong>
        <p>
          Hope voit ce qu’Amy
          refuse d’admettre :
          la blessure tire encore.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 9
     RÉAPPRENDRE LA CONFIANCE
  ======================================================= */

  setupInteraction({

    selector:
      ".relearn-trust-trigger",

    dataAttribute:
      "relearnTrust",

    revealId:
      "relearnTrustReveal",

    group:
      "relearn-trust",

    content: {

      winning: `
        <strong>Gagner</strong>
        <p>
          Ni Hope ni Amy
          ne cherche réellement la victoire.
          Leur objectif est ailleurs.
        </p>
      `,

      opening: `
        <strong>L’ouverture</strong>
        <p>
          Hope laisse volontairement
          une ligne ouverte.
          Amy la voit immédiatement.
        </p>
      `,

      hesitation: `
        <strong>Amy hésite</strong>
        <p>
          Elle pourrait frapper.
          Elle choisit de ne pas le faire.
        </p>
      `,

      trust: `
        <strong>La confiance</strong>
        <p>
          Elles ne réapprennent pas
          à combattre ensemble.
          Elles réapprennent
          à croire que l’autre
          ne profitera pas
          de chaque faiblesse.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 10
     DISPOSITIF DU MAÎTRE NOIR
  ======================================================= */

  setupInteraction({

    selector:
      ".device-progress-trigger",

    dataAttribute:
      "deviceProgress",

    revealId:
      "deviceProgressReveal",

    group:
      "device-progress",

    content: {

      percent: `
        <strong>76 %</strong>
        <p>
          La pierre artificielle
          reproduit une grande partie
          de la réponse attendue.
          Pas suffisamment.
        </p>
      `,

      artificial: `
        <strong>Pierre artificielle</strong>
        <p>
          Les Gardiens tentent
          de compléter le dispositif ancien
          avec des éléments fabriqués
          grâce à des technologies modernes.
        </p>
      `,

      center: `
        <strong>Le centre vide</strong>
        <p>
          Malgré les fragments réunis,
          une partie essentielle
          manque encore au dispositif.
        </p>
      `,

      bridge: `
        <strong>Le Pont</strong>
        <p>
          Le dispositif peut être
          presque complet matériellement.
          Sans Anna,
          il reste inutilisable.
        </p>
      `,

      useless: `
        <strong>Inutile sans elle</strong>
        <p>
          Le problème des Gardiens
          n’est plus seulement
          de reconstruire la machine.
          Ils doivent obtenir
          l’unique personne capable
          de la relier.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 11
     SIGNATURE D'ANNA
  ======================================================= */

  setupInteraction({

    selector:
      ".anna-signature-trigger",

    dataAttribute:
      "annaSignature",

    revealId:
      "annaSignatureReveal",

    group:
      "anna-signature",

    content: {

      permanent: `
        <strong>Marqueurs permanents</strong>
        <p>
          Certains marqueurs biologiques
          sont présents chez Anna
          en permanence.
        </p>
      `,

      stable: `
        <strong>Signature stable</strong>
        <p>
          Contrairement à Hope,
          Anna n’a pas besoin
          d’une situation particulière
          pour que sa signature soit détectable.
        </p>
      `,

      ancient: `
        <strong>Signature ancienne</strong>
        <p>
          Les données renforcent
          l’hypothèse qu’une composante ancienne
          fait partie intégrante
          de la biologie d’Anna.
        </p>
      `,

      bridge: `
        <strong>Le Pont</strong>
        <p>
          La fonction symbolique du Pont
          possède désormais
          un équivalent biologique observable.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 12
     SIGNATURE D'HOPE
  ======================================================= */

  setupInteraction({

    selector:
      ".hope-signature-trigger",

    dataAttribute:
      "hopeSignature",

    revealId:
      "hopeSignatureReveal",

    group:
      "hope-signature",

    content: {

      dragon: `
        <strong>Dragon</strong>
        <p>
          Certains marqueurs d’Hope
          s’activent lorsque le Dragon réagit.
        </p>
      `,

      phoenix: `
        <strong>Phénix</strong>
        <p>
          Le Phénix accompagne
          lui aussi certaines variations
          biologiques mesurables.
        </p>
      `,

      artifacts: `
        <strong>Artefacts</strong>
        <p>
          La proximité de certains objets anciens
          provoque également
          une réponse chez Hope.
        </p>
      `,

      stress: `
        <strong>Stress contrôlé</strong>
        <p>
          Certaines conditions physiques
          peuvent rendre la signature
          plus facilement détectable.
        </p>
      `,

      device: `
        <strong>Dispositif</strong>
        <p>
          L’interaction avec le dispositif
          produit l’une des réponses
          les plus nettes observées.
          Hope ne porte pas la même signature qu’Anna :
          elle y répond.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 13
     L'ANCRE
  ======================================================= */

  setupInteraction({

    selector:
      ".anchor-equivalent-trigger",

    dataAttribute:
      "anchorEquivalent",

    revealId:
      "anchorEquivalentReveal",

    group:
      "anchor-equivalent",

    content: {

      replace: `
        <strong>Remplaçable</strong>
        <p>
          Contrairement au Pont,
          la fonction d’Ancre
          pourrait être assurée
          par autre chose que Lucy.
        </p>
      `,

      force: `
        <strong>Force équivalente</strong>
        <p>
          Les textes ne parlent pas
          d’une autre personne précise.
          Ils parlent d’une force
          capable de produire
          le même équilibre.
        </p>
      `,

      balance: `
        <strong>Équilibre</strong>
        <p>
          L’Ancre ne crée pas
          le passage.
          Elle empêche sa structure
          de perdre sa stabilité.
        </p>
      `,

      unknown: `
        <strong>Forme inconnue</strong>
        <p>
          Maître Lee ignore encore
          quelle autre force
          pourrait remplacer
          cette fonction.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 14
     CRÉATURE DE PETER
  ======================================================= */

  setupInteraction({

    selector:
      ".creature-gift-trigger",

    dataAttribute:
      "creatureGift",

    revealId:
      "creatureGiftReveal",

    group:
      "creature-gift",

    content: {

      skin: `
        <strong>Sa peau</strong>
        <p>
          Elle semble à la fois
          animale et légèrement végétale.
          Sa texture change subtilement
          selon son environnement.
        </p>
      `,

      flowers: `
        <strong>Structures florales</strong>
        <p>
          De minuscules formations
          semblables à des fleurs
          parcourent son dos.
        </p>
      `,

      color: `
        <strong>Régulation de couleur</strong>
        <p>
          La créature adapte
          sa teinte
          à ce qui l’entoure.
        </p>
      `,

      signatures: `
        <strong>Reconnaissance</strong>
        <p>
          Elle peut identifier
          plusieurs signatures biologiques
          et analyser quelques paramètres simples.
        </p>
      `,

      permission: `
        <strong>Autorisation</strong>
        <p>
          Peter a intégré
          une règle essentielle :
          la créature ne déclenche rien
          sans permission.
          Il a compris la leçon.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 15
     NOUVEAU PLAN DU MAÎTRE NOIR
  ======================================================= */

  setupInteraction({

    selector:
      ".black-plan-trigger",

    dataAttribute:
      "blackPlan",

    revealId:
      "blackPlanReveal",

    group:
      "black-plan",

    content: {

      resonance: `
        <strong>Nouvelle résonance</strong>
        <p>
          Les fragments du dispositif
          détectent deux réponses
          presque simultanées.
        </p>
      `,

      bridge: `
        <strong>Le Pont</strong>
        <p>
          L’une des signatures
          correspond probablement à Anna.
          Son rôle devient désormais
          impossible à ignorer.
        </p>
      `,

      key: `
        <strong>La Clé</strong>
        <p>
          La seconde signature
          correspond probablement à Hope.
          Lorsqu’elles apparaissent ensemble,
          l’intensité augmente.
        </p>
      `,

      amy: `
        <strong>Amy</strong>
        <p>
          Depuis son départ avec Hope,
          les Gardiens ont perdu
          toute trace fiable d’Amy.
        </p>
      `,

      eraser: `
        <strong>L’Effaceur</strong>
        <p>
          L’Effaceur a lui aussi disparu.
          Le Maître Noir ordonne
          qu’on le retrouve.
        </p>
      `,

      alive: `
        <strong>Nouveau plan</strong>
        <p>
          Anna ne doit plus être touchée.
          Et tant que le lien exact
          entre le Pont et la Clé
          reste inconnu,
          Hope doit rester en vie
          elle aussi.
        </p>
      `

    }

  });


  /* =======================================================
     INTERACTION 16
     CAMP OU DIRECTION
  ======================================================= */

  setupInteraction({

    selector:
      ".direction-trigger",

    dataAttribute:
      "direction",

    revealId:
      "directionReveal",

    group:
      "direction",

    content: {

      camp: `
        <strong>Changer de camp</strong>
        <p>
          Pour Amy,
          quitter les Gardiens
          reviendrait à changer
          tout ce qui a défini sa vie.
        </p>
      `,

      direction: `
        <strong>Changer de direction</strong>
        <p>
          Hope ne lui demande pas
          de choisir immédiatement
          une nouvelle appartenance.
          Seulement de décider
          où elle veut aller.
        </p>
      `,

      belong: `
        <strong>Appartenir</strong>
        <p>
          Un camp définit souvent
          les personnes auxquelles
          on est supposé appartenir.
        </p>
      `,

      choose: `
        <strong>Choisir</strong>
        <p>
          Une direction ne demande
          aucune permission.
          Amy peut la choisir elle-même.
        </p>
      `,

      future: `
        <strong>La suite</strong>
        <p>
          Amy n’a toujours pas décidé
          si elle restera à Awake.
          Mais pour la première fois,
          cette décision lui appartient réellement.
        </p>
      `

    }

  });


  /* =======================================================
     15. RESTAURATION VISUELLE DES INTERACTIONS
  ======================================================= */

  function restoreDiscoveredButtons() {

    document
      .querySelectorAll(
        ".interaction-btn"
      )
      .forEach(button => {

        const datasetEntries =
          Object.entries(
            button.dataset
          );


        datasetEntries.forEach(
          ([key, value]) => {

            const mappings = {

              amyHealth:
                "amy-health",

              regenerative:
                "regenerative",

              fourRules:
                "four-rules",

              artificialBridge:
                "artificial-bridge",

              irreplaceable:
                "irreplaceable",

              annaWeight:
                "anna-weight",

              essential:
                "essential",

              trainingFight:
                "training-fight",

              relearnTrust:
                "relearn-trust",

              deviceProgress:
                "device-progress",

              annaSignature:
                "anna-signature",

              hopeSignature:
                "hope-signature",

              anchorEquivalent:
                "anchor-equivalent",

              creatureGift:
                "creature-gift",

              blackPlan:
                "black-plan",

              direction:
                "direction"

            };


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
              discoveredInteractions.includes(
                storageKey
              )
            ) {

              button.classList.add(
                "discovered"
              );

            }

          }
        );

      });

  }


  restoreDiscoveredButtons();


  /* =======================================================
     16. MODE REPRENDRE / RECOMMENCER VIA URL
  ======================================================= */

  function handleReadingMode() {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const mode =
      params.get("lecture");


    if (mode === "recommencer") {

      Object.keys(localStorage)
        .filter(key =>
          key.startsWith(
            STORAGE_PREFIX
          )
        )
        .forEach(key => {

          localStorage.removeItem(
            key
          );

        });

      discoveredInteractions = [];

      window.scrollTo({
        top: 0,
        behavior: "auto"
      });

      return;

    }


    if (mode === "reprendre") {

      const savedScroll =
        parseFloat(
          localStorage.getItem(
            STORAGE_SCROLL
          )
        );

      if (
        Number.isFinite(savedScroll) &&
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
      params.has("lecture")
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
      !Number.isFinite(savedScroll) ||
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
     FIN
  ======================================================= */

});
