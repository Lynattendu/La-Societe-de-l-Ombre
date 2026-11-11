/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 1 — EMBRASSE TON DESTIN
   NOUVELLE VERSION
   10 VISUELS / 18 INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


  /* =========================================================
     DERNIÈRE PAGE LUE
  ========================================================= */

  localStorage.setItem(
    "societeOmbre_dernierePage",
    "chapitre1.html"
  );

  localStorage.setItem(
    "societeOmbre_dernierTitre",
    "Chapitre 1 — Embrasse ton destin"
  );


  /* =========================================================
     ÉLÉMENTS PRINCIPAUX
  ========================================================= */

  const scenes =
    document.querySelectorAll(".scene");

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

  const choiceButtons =
    document.querySelectorAll(
      ".choice-btn"
    );

  const choiceResult =
    document.getElementById(
      "choiceResult"
    );

  const openEnvelope =
    document.getElementById(
      "openEnvelope"
    );

  const envelopeReveal =
    document.getElementById(
      "envelopeReveal"
    );


  /* =========================================================
     CLÉS MÉMOIRE
  ========================================================= */

  const STORAGE_PREFIX =
    "societeOmbre_chapitre1_";

  const STORAGE_SCROLL =
    STORAGE_PREFIX + "scroll";

  const STORAGE_PROGRESS =
    STORAGE_PREFIX + "progression";

  const STORAGE_COMPLETED =
    STORAGE_PREFIX + "termine";

  const STORAGE_SECRETS =
    STORAGE_PREFIX + "secrets";

  const STORAGE_CHOICE =
    STORAGE_PREFIX + "instinctRaison";

  const STORAGE_ENVELOPE =
    STORAGE_PREFIX + "enveloppe";


  /* =========================================================
     URL
  ========================================================= */

  const urlParams =
    new URLSearchParams(
      window.location.search
    );

  const lectureMode =
    urlParams.get("lecture");


  /* =========================================================
     OUTILS MÉMOIRE
  ========================================================= */

  function getStoredArray(key) {

    try {

      const value =
        JSON.parse(
          localStorage.getItem(key)
        );

      return Array.isArray(value)
        ? value
        : [];

    } catch (error) {

      return [];

    }

  }


  function saveStoredArray(
    key,
    values
  ) {

    localStorage.setItem(
      key,
      JSON.stringify(values)
    );

  }


  function addStoredValue(
    key,
    value
  ) {

    const values =
      getStoredArray(key);

    if (
      !values.includes(value)
    ) {

      values.push(value);

      saveStoredArray(
        key,
        values
      );

    }

    return values;

  }


  /* =========================================================
     BOÎTES DE RÉVÉLATION
  ========================================================= */

  function setRevealHTML(
    reveal,
    html
  ) {

    if (!reveal) {
      return;
    }

    reveal.innerHTML =
      html;

    reveal.classList.add(
      "open"
    );

  }


  /* =========================================================
     ÉTATS DES BOUTONS ORDONNÉS
  ========================================================= */

  function updateOrderedButtons(
    buttons,
    progress
  ) {

    buttons.forEach(
      function (button, index) {

        button.classList.remove(
          "active"
        );

        if (
          index < progress
        ) {

          button.classList.add(
            "completed"
          );

          button.disabled =
            true;

        } else {

          button.classList.remove(
            "completed"
          );

          button.disabled =
            false;

        }

        if (
          index === progress
        ) {

          button.classList.add(
            "active"
          );

        }

      }
    );

  }


  /* =========================================================
     MAUVAIS CHOIX
  ========================================================= */

  function flashWrong(button) {

    if (!button) {
      return;
    }

    button.classList.add(
      "wrong"
    );

    playWrongSound();

    setTimeout(
      function () {

        button.classList.remove(
          "wrong"
        );

      },
      650
    );

  }


  /* =========================================================
     SECRETS / INFORMATIONS
  ========================================================= */

  function getSecrets() {

    return getStoredArray(
      STORAGE_SECRETS
    );

  }


  function saveSecret(secret) {

    const secrets =
      getSecrets();

    if (
      !secrets.includes(secret)
    ) {

      secrets.push(secret);

      saveStoredArray(
        STORAGE_SECRETS,
        secrets
      );

    }

  }


  let secretTimer = null;
  let secretSafetyTimer = null;


  function hideSecretPopup() {

    if (!secretPopup) {
      return;
    }

    secretPopup.classList.remove(
      "show"
    );

    secretPopup.setAttribute(
      "aria-hidden",
      "true"
    );

    secretPopup.style.pointerEvents =
      "none";

    clearTimeout(
      secretSafetyTimer
    );

    setTimeout(
      function () {

        if (
          !secretPopup.classList.contains(
            "show"
          )
        ) {

          secretPopup.style.display =
            "none";

        }

      },
      400
    );

  }


  function showSecret(
    secretName,
    secretText
  ) {

    saveSecret(
      secretName
    );

    if (!secretPopup) {
      return;
    }

    const inner =
      secretPopup.querySelector(
        ".secret-popup-inner"
      );

    if (!inner) {
      return;
    }

    let description =
      inner.querySelector(
        ".secret-description"
      );

    if (!description) {

      description =
        document.createElement(
          "p"
        );

      description.className =
        "secret-description";

      inner.appendChild(
        description
      );

    }

    description.textContent =
      secretText;

    secretPopup.style.display =
      "flex";

    secretPopup.style.pointerEvents =
      "none";

    secretPopup.setAttribute(
      "aria-hidden",
      "false"
    );

    secretPopup.classList.remove(
      "show"
    );

    requestAnimationFrame(
      function () {

        requestAnimationFrame(
          function () {

            secretPopup.classList.add(
              "show"
            );

          }
        );

      }
    );

    clearTimeout(
      secretTimer
    );

    clearTimeout(
      secretSafetyTimer
    );

    secretTimer =
      setTimeout(
        hideSecretPopup,
        3000
      );

    secretSafetyTimer =
      setTimeout(
        function () {

          if (!secretPopup) {
            return;
          }

          secretPopup.classList.remove(
            "show"
          );

          secretPopup.setAttribute(
            "aria-hidden",
            "true"
          );

          secretPopup.style.pointerEvents =
            "none";

          secretPopup.style.display =
            "none";

        },
        4200
      );

    try {

      playSecretSound();

    } catch (error) {

      console.warn(
        "Son indisponible.",
        error
      );

    }

  }


  /* =========================================================
     MOTEUR INTERACTION ORDONNÉE
  ========================================================= */

  function setupOrderedInteraction(
    config
  ) {

    const reveal =
      document.getElementById(
        config.revealId
      );

    const buttons =
      document.querySelectorAll(
        config.selector
      );

    const storageKey =
      STORAGE_PREFIX +
      config.storage;

    let progress =
      parseInt(
        localStorage.getItem(
          storageKey
        ) || "0",
        10
      );

    if (
      Number.isNaN(progress)
    ) {

      progress = 0;

    }

    progress =
      Math.max(
        0,
        Math.min(
          progress,
          config.order.length
        )
      );

    updateOrderedButtons(
      buttons,
      progress
    );

    if (
      progress >=
      config.order.length
    ) {

      if (
        config.finalHTML
      ) {

        setRevealHTML(
          reveal,
          config.finalHTML
        );

      }

    }

    buttons.forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const selected =
              button.dataset[
                config.dataKey
              ];

            const expected =
              config.order[
                progress
              ];

            if (
              selected !== expected
            ) {

              flashWrong(
                button
              );

              return;

            }

            progress += 1;

            localStorage.setItem(
              storageKey,
              String(progress)
            );

            updateOrderedButtons(
              buttons,
              progress
            );

            if (
              config.texts[selected]
            ) {

              setRevealHTML(
                reveal,
                "<p>" +
                config.texts[selected] +
                "</p>"
              );

            }

            if (
              config.sound
            ) {

              config.sound();

            }

            if (
              progress >=
              config.order.length
            ) {

              if (
                config.finalHTML
              ) {

                setRevealHTML(
                  reveal,
                  config.finalHTML
                );

              }

              if (
                config.secretName
              ) {

                showSecret(
                  config.secretName,
                  config.secretText
                );

              }

            }

          }
        );

      }
    );

  }


  /* =========================================================
     MOTEUR INTERACTION LIBRE
  ========================================================= */

  function setupFreeInteraction(
    config
  ) {

    const reveal =
      document.getElementById(
        config.revealId
      );

    const storageKey =
      STORAGE_PREFIX +
      config.storage;

    let observed =
      getStoredArray(
        storageKey
      );

    const buttons =
      document.querySelectorAll(
        config.selector
      );

    buttons.forEach(
      function (button) {

        const value =
          button.dataset[
            config.dataKey
          ];

        if (
          observed.includes(
            value
          )
        ) {

          button.classList.add(
            "completed"
          );

        }

        button.addEventListener(
          "click",
          function () {

            const selected =
              button.dataset[
                config.dataKey
              ];

            observed =
              addStoredValue(
                storageKey,
                selected
              );

            button.classList.add(
              "completed"
            );

            if (
              config.texts[selected]
            ) {

              setRevealHTML(
                reveal,
                "<p>" +
                config.texts[selected] +
                "</p>"
              );

            }

            if (
              config.sound
            ) {

              config.sound();

            }

            if (
              observed.length >=
              config.total
            ) {

              if (
                config.finalHTML
              ) {

                setRevealHTML(
                  reveal,
                  config.finalHTML
                );

              }

              if (
                config.secretName
              ) {

                showSecret(
                  config.secretName,
                  config.secretText
                );

              }

            }

          }
        );

      }
    );

    if (
      observed.length >=
      config.total &&
      config.finalHTML
    ) {

      setRevealHTML(
        reveal,
        config.finalHTML
      );

    }

  }


  /* =========================================================
     IMAGES MANQUANTES
  ========================================================= */

  document
    .querySelectorAll(
      ".visual img"
    )
    .forEach(
      function (img) {

        img.addEventListener(
          "error",
          function () {

            const visual =
              img.closest(
                ".visual"
              );

            if (visual) {

              visual.classList.add(
                "visual-missing"
              );

            }

          }
        );

      }
    );


  /* =========================================================
     APPARITION DES SCÈNES
  ========================================================= */

  function animateParagraphs(
    scene
  ) {

    if (
      !scene ||
      scene.dataset.textAnimated ===
      "1"
    ) {

      return;

    }

    scene.dataset.textAnimated =
      "1";

    const paragraphs =
      scene.querySelectorAll(
        ".text-block p"
      );

    paragraphs.forEach(
      function (
        paragraph,
        index
      ) {

        paragraph.style.opacity =
          "0";

        paragraph.style.transform =
          "translateY(12px)";

        setTimeout(
          function () {

            paragraph.style.transition =
              "opacity 0.65s ease, transform 0.65s ease";

            paragraph.style.opacity =
              "1";

            paragraph.style.transform =
              "translateY(0)";

          },
          index * 55
        );

      }
    );

  }


  if (
    "IntersectionObserver"
    in window
  ) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                const scene =
                  entry.target;

                scene.classList.add(
                  "is-visible"
                );

                animateParagraphs(
                  scene
                );

                localStorage.setItem(
                  STORAGE_PROGRESS,
                  "1"
                );

              }

            }
          );

        },
        {
          threshold: 0.06
        }
      );

    scenes.forEach(
      function (scene) {

        observer.observe(
          scene
        );

      }
    );

  } else {

    scenes.forEach(
      function (scene) {

        scene.classList.add(
          "is-visible"
        );

        animateParagraphs(
          scene
        );

      }
    );

  }


  const firstScene =
    document.querySelector(
      ".scene"
    );

  if (firstScene) {

    firstScene.classList.add(
      "is-visible"
    );

    animateParagraphs(
      firstScene
    );

  }


  /* =========================================================
     BARRE DE PROGRESSION
  ========================================================= */

  function updateProgress() {

    if (!progressFill) {
      return;
    }

    const documentHeight =
      document.documentElement
        .scrollHeight -
      window.innerHeight;

    if (
      documentHeight <= 0
    ) {

      progressFill.style.width =
        "0%";

      return;

    }

    const percentage =
      Math.min(
        100,
        Math.max(
          0,
          (
            window.scrollY /
            documentHeight
          ) * 100
        )
      );

    progressFill.style.width =
      percentage + "%";

  }


  window.addEventListener(
    "scroll",
    updateProgress,
    {
      passive: true
    }
  );

  updateProgress();


  /* =========================================================
     SAUVEGARDE POSITION
  ========================================================= */

  let saveScrollTimer =
    null;


  window.addEventListener(
    "scroll",
    function () {

      clearTimeout(
        saveScrollTimer
      );

      saveScrollTimer =
        setTimeout(
          function () {

            localStorage.setItem(
              STORAGE_SCROLL,
              String(
                Math.round(
                  window.scrollY
                )
              )
            );

            localStorage.setItem(
              STORAGE_PROGRESS,
              "1"
            );

          },
          250
        );

    },
    {
      passive: true
    }
  );


  /* =========================================================
     REPRISE DU CHAPITRE
  ========================================================= */

  if (
    lectureMode ===
    "reprendre"
  ) {

    const savedPosition =
      parseInt(
        localStorage.getItem(
          STORAGE_SCROLL
        ),
        10
      );

    if (
      !Number.isNaN(
        savedPosition
      ) &&
      savedPosition > 0
    ) {

      setTimeout(
        function () {

          window.scrollTo(
            0,
            savedPosition
          );

          updateProgress();

        },
        350
      );

    }

  }


  if (
    lectureMode ===
    "recommencer"
  ) {

    setTimeout(
      function () {

        window.scrollTo(
          0,
          0
        );

        updateProgress();

      },
      100
    );

  }


  /* =========================================================
     BOUTONS COMMENCER / CONTINUER
  ========================================================= */

  document
    .querySelectorAll(
      "[data-next]"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const currentScene =
              button.closest(
                ".scene"
              );

            if (!currentScene) {
              return;
            }

            const nextScene =
              currentScene
                .nextElementSibling;

            if (
              nextScene &&
              typeof nextScene
                .scrollIntoView ===
                "function"
            ) {

              nextScene.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            }

          }
        );

      }
    );


  /* =========================================================
     MENU
  ========================================================= */

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
      "no-scroll"
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
      "no-scroll"
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
      function (event) {

        if (
          event.target ===
          chapterMenu
        ) {

          closeMenu();

        }

      }
    );

  }


  if (resumeBtn) {

    resumeBtn.addEventListener(
      "click",
      function () {

        closeMenu();

        const position =
          parseInt(
            localStorage.getItem(
              STORAGE_SCROLL
            ),
            10
          );

        if (
          !Number.isNaN(position)
        ) {

          window.scrollTo({
            top: position,
            behavior: "smooth"
          });

        }

      }
    );

  }


  /* =========================================================
     RECOMMENCER
  ========================================================= */

  function restartChapterFunction() {

    const keysToDelete =
      [];

    for (
      let i = 0;
      i < localStorage.length;
      i += 1
    ) {

      const key =
        localStorage.key(i);

      if (
        key &&
        key.startsWith(
          STORAGE_PREFIX
        )
      ) {

        keysToDelete.push(
          key
        );

      }

    }

    keysToDelete.forEach(
      function (key) {

        localStorage.removeItem(
          key
        );

      }
    );

    window.location.href =
      "chapitre1.html?lecture=recommencer";

  }


  if (restartBtn) {

    restartBtn.addEventListener(
      "click",
      restartChapterFunction
    );

  }


  if (restartChapter) {

    restartChapter.addEventListener(
      "click",
      restartChapterFunction
    );

  }


  /* =========================================================
     INTERACTION 1
     LA FIOLE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".fiole-trigger",

    dataKey:
      "fiole",

    revealId:
      "fioleReveal",

    storage:
      "fiole",

    order: [
      "age",
      "blood",
      "dna",
      "root",
      "betty"
    ],

    texts: {

      age:
        "La fiole est si ancienne qu’aucune datation fiable n’a encore permis d’en déterminer l’époque.",

      blood:
        "Elle contient un sang dont les caractéristiques ne correspondent pas totalement aux références humaines connues.",

      dna:
        "Betty découvre dans ce sang un code génétique capable d’amplifier certaines aptitudes humaines.",

      root:
        "C’est Root qui a découvert la fiole avant de la confier à Betty pour obtenir des réponses.",

      betty:
        "Betty choisit finalement de mêler son propre code génétique à celui contenu dans la fiole."

    },

    sound:
      playDiscoverySound,

    finalHTML:
      `
        <p>Une fiole impossible à dater.</p>
        <p>Un sang mystérieux.</p>
        <p>Un code génétique inhabituel.</p>
        <p>Root la découvre.</p>
        <p>Betty l’utilise.</p>

        <p class="impact-text">
          ANNA EST NÉE
          DE CETTE DÉCISION.
        </p>
      `,

    secretName:
      "origine-fiole",

    secretText:
      "La fiole découverte par Root est à l’origine de la création génétique d’Anna."

  });


  /* =========================================================
     INTERACTION 2
     COMPRENDRE ANNA
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".anna-capacity-trigger",

    dataKey:
      "annaCapacity",

    revealId:
      "annaCapacityReveal",

    storage:
      "annaCapacity",

    total: 5,

    texts: {

      intelligence:
        "Le développement intellectuel d’Anna semble plus rapide et plus intense que celui d’une jeune femme ordinaire.",

      perception:
        "Elle perçoit certains détails, émotions et changements que d’autres remarquent beaucoup plus tard.",

      reaction:
        "Sa vitesse d’analyse lui permet parfois de réagir avant même d’avoir consciemment compris la totalité d’une situation.",

      physical:
        "Son corps exploite plus efficacement certaines capacités humaines naturelles.",

      human:
        "Anna ne possède aucun super-pouvoir : ses capacités restent humaines, mais fortement amplifiées."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>Intelligence.</p>
        <p>Perception.</p>
        <p>Réaction.</p>
        <p>Capacités physiques.</p>

        <p class="impact-text">
          PAS DE SUPER-POUVOIR.
        </p>

        <p>
          Seulement des capacités humaines
          utilisées à un niveau inhabituel.
        </p>
      `,

    secretName:
      "capacites-anna",

    secretText:
      "Anna ne possède pas de pouvoirs surnaturels : son code génétique amplifie des capacités humaines naturelles."

  });


  /* =========================================================
     INTERACTION 3
     ANNA SENT LE DANGER
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".danger-sense-trigger",

    dataKey:
      "dangerSense",

    revealId:
      "dangerSenseReveal",

    storage:
      "dangerSense",

    order: [
      "driver",
      "anxiety",
      "listen",
      "anticipate",
      "protect"
    ],

    texts: {

      driver:
        "Anna porte soudain davantage d’attention au chauffeur.",

      anxiety:
        "Elle ressent chez lui une anxiété qui ne correspond pas à leur conversation.",

      listen:
        "Sans alerter Betty, elle tend davantage l’oreille et cherche d’autres indices.",

      anticipate:
        "Elle comprend qu’un événement dangereux est sur le point de se produire avant de pouvoir l’identifier.",

      protect:
        "Anna agit immédiatement et entraîne Betty au sol avant les premiers impacts."

    },

    sound:
      playDeductionSound,

    finalHTML:
      `
        <p>Une émotion étrangère.</p>
        <p>Une alerte.</p>
        <p>Une anticipation.</p>

        <p class="impact-text">
          ANNA RÉAGIT
          AVANT DE VOIR LE DANGER.
        </p>
      `,

    secretName:
      "instinct-anna",

    secretText:
      "Anna est capable de détecter certains signaux émotionnels et environnementaux avant d’en comprendre consciemment la cause."

  });


  /* =========================================================
     INTERACTION 4
     OBSERVER ÉLIE
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".elie-read-trigger",

    dataKey:
      "elieRead",

    revealId:
      "elieReadReveal",

    storage:
      "elieRead",

    total: 5,

    texts: {

      entrance:
        "Élie entre calmement, accompagné de quatre hommes, sans avoir besoin de montrer la moindre agressivité.",

      clients:
        "Plusieurs convives changent immédiatement d’attitude lorsqu’ils le reconnaissent.",

      guards:
        "Les gardes de Betty et Anna se mettent en alerte, mais évitent toute provocation.",

      charm:
        "Élie utilise la courtoisie et le charme comme une autre manière d’afficher son assurance et son contrôle.",

      position:
        "Il choisit la table du fond, d’où il peut observer toutes les entrées et sorties."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>Aucune menace ouverte.</p>
        <p>Aucun geste violent.</p>

        <p class="impact-text">
          ET POURTANT,
          TOUT LE MONDE SAIT
          QUI CONTRÔLE LA PIÈCE.
        </p>
      `,

    secretName:
      "presence-elie",

    secretText:
      "Élie impose son pouvoir sans avoir besoin de menacer directement qui que ce soit."

  });


  /* =========================================================
     INTERACTION 5
     POURQUOI LE MEXIQUE
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".mexico-reason-trigger",

    dataKey:
      "mexicoReason",

    revealId:
      "mexicoReasonReveal",

    storage:
      "mexicoReason",

    total: 4,

    texts: {

      hope:
        "Hope part au Mexique après l’assassinat de son frère Ted et pour reprendre ses affaires.",

      max:
        "Max doit réaliser un reportage sur le cartel Santalucibel.",

      peter:
        "Peter doit participer au salon des nouvelles technologies et envisage d’implanter son entreprise au Mexique.",

      root:
        "Root propose d’aider Hope et possède déjà plusieurs liens professionnels avec le pays."

    },

    sound:
      playDiscoverySound,

    finalHTML:
      `
        <p>Quatre personnes.</p>
        <p>Quatre raisons différentes.</p>

        <p class="impact-text">
          UNE MÊME DESTINATION.
        </p>

        <p>
          Le Mexique.
        </p>
      `,

    secretName:
      "convergence-mexique",

    secretText:
      "Hope, Max, Peter et Root ont chacun une raison différente de se rendre au Mexique."

  });


  /* =========================================================
     INTERACTION 6
     CONVERGENCE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".convergence-trigger",

    dataKey:
      "convergence",

    revealId:
      "convergenceReveal",

    storage:
      "convergence",

    order: [
      "hope",
      "max",
      "peter",
      "root",
      "mexico"
    ],

    texts: {

      hope:
        "Hope ouvre la première trajectoire.",

      max:
        "Le voyage professionnel de Max rejoint la même destination.",

      peter:
        "Le projet de Peter ajoute une troisième ligne.",

      root:
        "Root décide à son tour qu’elle rejoindra Hope.",

      mexico:
        "Toutes les trajectoires convergent désormais vers le même pays."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>Hope.</p>
        <p>Max.</p>
        <p>Peter.</p>
        <p>Root.</p>

        <p class="impact-text">
          MEXIQUE.
        </p>

        <p>
          Une coïncidence peut être un hasard.
          Plusieurs commencent à former un motif.
        </p>
      `,

    secretName:
      "trajectoires-convergentes",

    secretText:
      "Plusieurs trajectoires indépendantes commencent à converger vers le Mexique."

  });


  /* =========================================================
     INTERACTION 7
     INSTINCT OU RAISON
  ========================================================= */

  function resetChoiceButtons() {

    choiceButtons.forEach(
      function (button) {

        button.classList.remove(
          "selected",
          "dimmed"
        );

      }
    );

  }


  function applyChoice(
    choice,
    playSound
  ) {

    if (!choiceResult) {
      return;
    }

    resetChoiceButtons();

    const selected =
      document.querySelector(
        '[data-choice="' +
        choice +
        '"]'
      );

    choiceButtons.forEach(
      function (button) {

        if (
          button === selected
        ) {

          button.classList.add(
            "selected"
          );

        } else {

          button.classList.add(
            "dimmed"
          );

        }

      }
    );

    if (
      choice === "instinct"
    ) {

      choiceResult.innerHTML =
        `
          <p>
            Root décide d’écouter cette sensation
            qu’elle ne parvient pas encore à expliquer.
          </p>

          <p>
            Elle fait demi-tour.
          </p>

          <p>
            Son instinct vient de remarquer
            quelque chose que sa conscience
            n’avait pas encore compris.
          </p>
        `;

    }


    if (
      choice === "raison"
    ) {

      choiceResult.innerHTML =
        `
          <p>
            Root tente d’abord de poursuivre
            sa route vers l’aéroport.
          </p>

          <p>
            Pourtant, le doute ne disparaît pas.
          </p>

          <p>
            Plus elle avance,
            plus cette sensation devient forte.
          </p>

          <p>
            Elle finit par accepter
            qu’elle doit vérifier.
          </p>

          <p>
            Root fait demi-tour.
          </p>
        `;

    }

    if (playSound) {

      playChoiceSound();

      showSecret(
        "choix-instinct",
        choice === "instinct"
          ? "Tu as choisi d’écouter l’instinct de Root."
          : "Tu as choisi la raison, mais le doute a fini par ramener Root vers Hope."
      );

    }

  }


  choiceButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const choice =
            button.dataset.choice;

          localStorage.setItem(
            STORAGE_CHOICE,
            choice
          );

          applyChoice(
            choice,
            true
          );

        }
      );

    }
  );


  const savedChoice =
    localStorage.getItem(
      STORAGE_CHOICE
    );

  if (
    savedChoice === "instinct" ||
    savedChoice === "raison"
  ) {

    applyChoice(
      savedChoice,
      false
    );

  }


  /* =========================================================
     INTERACTION 8
     COMPRENDRE L'INSTINCT
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".instinct-trigger",

    dataKey:
      "instinct",

    revealId:
      "instinctReveal",

    storage:
      "instinct",

    order: [
      "doubt",
      "missed",
      "unconscious",
      "signal",
      "decision"
    ],

    texts: {

      doubt:
        "Le doute apparaît sans que Root sache encore précisément pourquoi.",

      missed:
        "Il peut provenir d’un détail perçu trop rapidement pour avoir été analysé consciemment.",

      unconscious:
        "L’esprit inconscient conserve pourtant cette information.",

      signal:
        "L’instinct transforme cette information oubliée en sensation d’alerte.",

      decision:
        "La réflexion reste nécessaire : l’instinct indique une direction, mais Root choisit ensuite d’agir."

    },

    sound:
      playMemorySound,

    finalHTML:
      `
        <p>Percevoir.</p>
        <p>Enregistrer.</p>
        <p>Ressentir.</p>
        <p>Réfléchir.</p>
        <p>Décider.</p>

        <p class="impact-text">
          L’INSTINCT N’EST PAS
          L’ABSENCE DE RÉFLEXION.
        </p>
      `,

    secretName:
      "fonction-instinct",

    secretText:
      "Pour Hope, l’instinct peut révéler une information que l’esprit conscient n’a pas encore analysée."

  });


  /* =========================================================
     INTERACTION 9
     LIGNÉE DE ROOT
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".lineage-trigger",

    dataKey:
      "lineage",

    revealId:
      "lineageReveal",

    storage:
      "lineage",

    order: [
      "nona",
      "decima",
      "morta",
      "fileuses",
      "parque"
    ],

    texts: {

      nona:
        "Nona appartient aux trois sœurs liées au fil de la destinée humaine.",

      decima:
        "Décima accompagne la mesure et le déroulement du fil.",

      morta:
        "Morta représente la fin du fil et l’accomplissement du destin.",

      fileuses:
        "Ensemble, les trois sœurs forment la lignée secrète des Fileuses.",

      parque:
        "Root descend de cette lignée : elle est une Parque, liée à la mémoire du temps."

    },

    sound:
      playMemorySound,

    finalHTML:
      `
        <p>Nona.</p>
        <p>Décima.</p>
        <p>Morta.</p>
        <p>Les Fileuses.</p>

        <p class="impact-text">
          ROOT EST UNE PARQUE.
        </p>

        <p>
          Le fil d’or de la lignée
          des mémoires du temps.
        </p>
      `,

    secretName:
      "root-parque",

    secretText:
      "Root descend de la lignée secrète des Fileuses et appartient aux mémoires du temps."

  });


  /* =========================================================
     INTERACTION 10
     BOÎTE DE PANDORE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".pandora-trigger",

    dataKey:
      "pandora",

    revealId:
      "pandoraReveal",

    storage:
      "pandora",

    order: [
      "unique",
      "ancient",
      "legend",
      "essential",
      "pandora"
    ],

    texts: {

      unique:
        "Hope parle d’un objet dont il n’existerait aucun équivalent.",

      ancient:
        "La boîte est extrêmement ancienne.",

      legend:
        "Son existence appartient davantage à la légende qu’à l’histoire officielle.",

      essential:
        "Pourtant, Hope affirme qu’elle deviendra indispensable à ce qui va suivre.",

      pandora:
        "Root comprend immédiatement de quel objet Hope parle : la boîte de Pandore."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>Unique.</p>
        <p>Antique.</p>
        <p>Légendaire.</p>
        <p>Indispensable.</p>

        <p class="impact-text">
          LA BOÎTE DE PANDORE.
        </p>
      `,

    secretName:
      "boite-pandore",

    secretText:
      "Root doit retrouver la boîte de Pandore et devenir sa protectrice."

  });


  /* =========================================================
     INTERACTION 11
     ENVELOPPE
  ========================================================= */

  function openHopeEnvelope(
    playSound
  ) {

    if (!envelopeReveal) {
      return;
    }

    envelopeReveal.classList.add(
      "open"
    );

    localStorage.setItem(
      STORAGE_ENVELOPE,
      "1"
    );

    if (openEnvelope) {

      openEnvelope.classList.add(
        "completed"
      );

      openEnvelope.textContent =
        "Enveloppe ouverte";

      openEnvelope.disabled =
        true;

    }

    if (playSound) {

      playRevealSound();

      showSecret(
        "destination-vietnam",
        "La boîte de Pandore se trouve quelque part dans la grotte de Hang Son Doong, au Vietnam."
      );

    }

  }


  if (openEnvelope) {

    openEnvelope.addEventListener(
      "click",
      function () {

        openHopeEnvelope(
          true
        );

      }
    );

  }


  if (
    localStorage.getItem(
      STORAGE_ENVELOPE
    ) === "1"
  ) {

    openHopeEnvelope(
      false
    );

  }


  /* =========================================================
     INTERACTION 12
     SYMBOLE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".symbol-trigger",

    dataKey:
      "symbol",

    revealId:
      "symbolReveal",

    storage:
      "symbol",

    order: [
      "same",
      "angle",
      "axis",
      "direction",
      "object"
    ],

    texts: {

      same:
        "Le motif dessiné sur chaque victime est parfaitement identique.",

      angle:
        "Seule son inclinaison change légèrement d’une scène de crime à l’autre.",

      axis:
        "Lucy prolonge l’axe correspondant à cette inclinaison.",

      direction:
        "Le symbole cesse alors d’être une simple signature : il devient une direction.",

      object:
        "Chaque axe désigne précisément un objet présent sur la scène de crime."

    },

    sound:
      playDeductionSound,

    finalHTML:
      `
        <p>Même symbole.</p>
        <p>Angle différent.</p>
        <p>Un axe.</p>
        <p>Une direction.</p>

        <p class="impact-text">
          UN OBJET.
        </p>
      `,

    secretName:
      "symbole-direction",

    secretText:
      "L’inclinaison du symbole indique un objet précis sur chaque scène de crime."

  });


  /* =========================================================
     INTERACTION 13
     MESSAGE CACHÉ
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".message-trigger",

    dataKey:
      "message",

    revealId:
      "messageReveal",

    storage:
      "message",

    total: 5,

    texts: {

      woman:
        "Le texte indique explicitement que l’auteur des crimes est une femme.",

      artist:
        "Elle considère manifestement son activité comme un art qu’elle maîtrise parfaitement.",

      hope:
        "Le mot espoir suggère qu’elle imagine qu’un enquêteur puisse finir par s’approcher d’elle.",

      persistence:
        "Elle attend quelqu’un d’assez obstiné pour poursuivre les indices jusqu’au bout.",

      hunt:
        "Le message transforme l’enquête en relation entre la tueuse et celui ou celle qui tente de la comprendre."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>Une femme.</p>
        <p>Une artiste.</p>
        <p>Un enquêteur attendu.</p>
        <p>Une persistance nécessaire.</p>

        <p class="impact-text">
          ELLE VEUT ÊTRE POURSUIVIE.
        </p>
      `,

    secretName:
      "jeu-tueuse",

    secretText:
      "La tueuse semble volontairement laisser un chemin permettant à un enquêteur suffisamment perspicace de la poursuivre."

  });


  /* =========================================================
     INTERACTION 14
     TUEUR EN SÉRIE OU TUEUSE À GAGES
  ========================================================= */

  const killerButtons =
    document.querySelectorAll(
      ".killer-trigger"
    );

  const killerReveal =
    document.getElementById(
      "killerReveal"
    );

  const STORAGE_KILLER =
    STORAGE_PREFIX +
    "killerHypothesis";


  function applyKillerAnswer(
    answer,
    playSound
  ) {

    killerButtons.forEach(
      function (button) {

        button.classList.remove(
          "completed",
          "wrong"
        );

      }
    );

    if (
      answer === "contract"
    ) {

      const correct =
        document.querySelector(
          '[data-killer="contract"]'
        );

      if (correct) {

        correct.classList.add(
          "completed"
        );

      }

      setRevealHTML(
        killerReveal,
        `
          <p>
            Les victimes ne correspondent pas
            au comportement classique
            d’un tueur en série.
          </p>

          <p>
            Elles ressemblent davantage
            à des contrats distincts.
          </p>

          <p class="impact-text">
            UNE TUEUSE À GAGES.
          </p>
        `
      );

      localStorage.setItem(
        STORAGE_KILLER,
        "contract"
      );

      if (playSound) {

        playRevealSound();

        showSecret(
          "tueuse-a-gages",
          "Lucy comprend qu’elle ne poursuit pas une tueuse en série, mais une professionnelle exécutant des contrats."
        );

      }

    } else {

      const wrong =
        document.querySelector(
          '[data-killer="serial"]'
        );

      if (wrong) {

        flashWrong(
          wrong
        );

      }

      setRevealHTML(
        killerReveal,
        `
          <p>
            Cette hypothèse ne correspond pas
            à l’ensemble des indices.
          </p>

          <p>
            Les victimes, les lieux
            et la portée internationale
            suggèrent autre chose.
          </p>
        `
      );

    }

  }


  killerButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          applyKillerAnswer(
            button.dataset.killer,
            true
          );

        }
      );

    }
  );


  if (
    localStorage.getItem(
      STORAGE_KILLER
    ) === "contract"
  ) {

    applyKillerAnswer(
      "contract",
      false
    );

  }


  /* =========================================================
     INTERACTION 15
     ROOT COMPREND LE MÉTIER DE LUCY
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".lucy-job-trigger",

    dataKey:
      "lucyJob",

    revealId:
      "lucyJobReveal",

    storage:
      "lucyJob",

    order: [
      "intervention",
      "posture",
      "technique",
      "training",
      "cyber"
    ],

    texts: {

      intervention:
        "Lucy intervient immédiatement face à trois agresseurs sans hésiter.",

      posture:
        "Sa manière de se déplacer et de contrôler l’espace montre une habitude des situations dangereuses.",

      technique:
        "Ses gestes sont propres, codifiés et issus d’un entraînement professionnel.",

      training:
        "Root comprend que Lucy s’entraîne régulièrement et maîtrise plusieurs techniques de défense.",

      cyber:
        "À partir de ces éléments et de détails observés chez Lucy, Root pousse sa déduction jusqu’à la cybercriminalité."

    },

    sound:
      playDeductionSound,

    finalHTML:
      `
        <p>Réaction immédiate.</p>
        <p>Posture professionnelle.</p>
        <p>Technique codifiée.</p>
        <p>Entraînement régulier.</p>

        <p class="impact-text">
          POLICE.
          CYBERCRIMINALITÉ.
        </p>
      `,

    secretName:
      "root-lit-lucy",

    secretText:
      "Root est capable de déduire le métier de Lucy en observant sa manière d’agir, de combattre et de réagir."

  });


  /* =========================================================
     INTERACTION 16
     SHIN GI TAI
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".shin-trigger",

    dataKey:
      "shin",

    revealId:
      "shinReveal",

    storage:
      "shin",

    total: 3,

    texts: {

      shin:
        "Shin représente le mental : intention, concentration, calme et décision.",

      gi:
        "Gi représente la technique : le savoir-faire, les gestes et leur maîtrise.",

      tai:
        "Tai représente le corps : condition physique, mouvement et exécution."

    },

    sound:
      playMemorySound,

    finalHTML:
      `
        <p>
          SHIN — le mental.
        </p>

        <p>
          GI — la technique.
        </p>

        <p>
          TAI — le corps.
        </p>

        <p class="impact-text">
          LES TROIS DOIVENT
          FONCTIONNER ENSEMBLE.
        </p>
      `,

    secretName:
      "shin-gi-tai",

    secretText:
      "Le Shin-Gi-Tai unit le mental, la technique et le corps en une seule manière d’agir."

  });


  /* =========================================================
     INTERACTION 17
     CAUSE ET CONSÉQUENCE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".consequence-trigger",

    dataKey:
      "consequence",

    revealId:
      "consequenceReveal",

    storage:
      "consequence",

    order: [
      "action",
      "reaction",
      "people",
      "society",
      "change"
    ],

    texts: {

      action:
        "Tout peut commencer par une décision apparemment minuscule.",

      reaction:
        "Cette décision provoque une première réaction.",

      people:
        "D’autres personnes y répondent à leur tour.",

      society:
        "Le mouvement peut finir par dépasser l’individu et toucher une société entière.",

      change:
        "Une action ponctuelle peut alors devenir le déclencheur d’une transformation majeure."

    },

    sound:
      playDeductionSound,

    finalHTML:
      `
        <p>Une décision.</p>
        <p>Une réaction.</p>
        <p>D’autres personnes.</p>
        <p>Une société.</p>

        <p class="impact-text">
          UNE CONSÉQUENCE IMMENSE.
        </p>
      `,

    secretName:
      "effet-cause-consequence",

    secretText:
      "Pour Root, une décision minuscule peut devenir le déclencheur d’un changement historique."

  });


  /* =========================================================
     INTERACTION 18
     LUCY OBSERVE ROOT
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".lucy-root-trigger",

    dataKey:
      "lucyRoot",

    revealId:
      "lucyRootReveal",

    storage:
      "lucyRoot",

    total: 5,

    texts: {

      combat:
        "Lucy vient de voir Root neutraliser presque seule plusieurs agresseurs.",

      intelligence:
        "Root analyse très rapidement les situations et construit des raisonnements inhabituels.",

      people:
        "Elle semble comprendre les autres avec une facilité presque dérangeante.",

      knowledge:
        "Ses connaissances dépassent largement ce que Lucy imaginait d’une simple historienne.",

      anticipation:
        "Root parle d’anticiper les conséquences humaines et sociales avant qu’elles ne se produisent."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>Combat.</p>
        <p>Intelligence.</p>
        <p>Lecture des gens.</p>
        <p>Connaissances.</p>
        <p>Anticipation.</p>

        <p class="impact-text">
          LUCY NE REGARDE PLUS ROOT
          UNIQUEMENT COMME UNE AMIE.
        </p>

        <p>
          Son instinct d’enquêtrice
          vient de se réveiller.
        </p>
      `,

    secretName:
      "lucy-enquete-root",

    secretText:
      "La curiosité personnelle de Lucy envers Root devient progressivement une curiosité professionnelle."

  });


  /* =========================================================
     FIN DU CHAPITRE
  ========================================================= */

  const finalScene =
    document.getElementById(
      "chapter-end"
    );


  if (
    finalScene &&
    "IntersectionObserver"
    in window
  ) {

    const endObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                localStorage.setItem(
                  STORAGE_COMPLETED,
                  "1"
                );

                localStorage.setItem(
                  STORAGE_PROGRESS,
                  "1"
                );

              }

            }
          );

        },
        {
          threshold: 0.3
        }
      );

    endObserver.observe(
      finalScene
    );

  }


  /* =========================================================
     AMBIANCE SONORE
  ========================================================= */

  let audioCtx = null;
  let masterGain = null;
  let ambienceOsc1 = null;
  let ambienceOsc2 = null;
  let soundActive = false;


  function startSound() {

    if (soundActive) {
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    audioCtx =
      new AudioContextClass();

    masterGain =
      audioCtx.createGain();

    masterGain.gain.value =
      0.022;

    masterGain.connect(
      audioCtx.destination
    );

    ambienceOsc1 =
      audioCtx.createOscillator();

    ambienceOsc2 =
      audioCtx.createOscillator();

    const gain1 =
      audioCtx.createGain();

    const gain2 =
      audioCtx.createGain();

    ambienceOsc1.type =
      "sine";

    ambienceOsc1.frequency.value =
      40;

    gain1.gain.value =
      0.62;

    ambienceOsc2.type =
      "triangle";

    ambienceOsc2.frequency.value =
      78;

    gain2.gain.value =
      0.06;

    ambienceOsc1
      .connect(gain1)
      .connect(masterGain);

    ambienceOsc2
      .connect(gain2)
      .connect(masterGain);

    ambienceOsc1.start();
    ambienceOsc2.start();

    soundActive =
      true;

    if (soundBtn) {

      soundBtn.classList.add(
        "sound-active"
      );

      soundBtn.textContent =
        "♪";

    }

  }


  function stopSound() {

    if (
      !soundActive ||
      !audioCtx
    ) {

      return;

    }

    const ctx =
      audioCtx;

    const osc1 =
      ambienceOsc1;

    const osc2 =
      ambienceOsc2;

    soundActive =
      false;

    audioCtx =
      null;

    masterGain =
      null;

    ambienceOsc1 =
      null;

    ambienceOsc2 =
      null;

    try {

      if (osc1) {
        osc1.stop();
      }

    } catch (error) {}

    try {

      if (osc2) {
        osc2.stop();
      }

    } catch (error) {}

    try {

      ctx.close();

    } catch (error) {}

    if (soundBtn) {

      soundBtn.classList.remove(
        "sound-active"
      );

      soundBtn.textContent =
        "♫";

    }

  }


  if (soundBtn) {

    soundBtn.addEventListener(
      "click",
      function () {

        if (soundActive) {

          stopSound();

        } else {

          startSound();

        }

      }
    );

  }


  /* =========================================================
     PETITS SONS
  ========================================================= */

  function playTone(
    frequency,
    duration,
    volume,
    type
  ) {

    if (
      !soundActive ||
      !audioCtx
    ) {

      return;

    }

    const oscillator =
      audioCtx.createOscillator();

    const gain =
      audioCtx.createGain();

    oscillator.type =
      type || "sine";

    oscillator.frequency.value =
      frequency;

    gain.gain.setValueAtTime(
      volume || 0.02,
      audioCtx.currentTime
    );

    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime +
        duration
      );

    oscillator
      .connect(gain)
      .connect(
        audioCtx.destination
      );

    oscillator.start();

    oscillator.stop(
      audioCtx.currentTime +
      duration
    );

  }


  function playAnalysisSound() {

    playTone(
      470,
      0.42,
      0.018,
      "triangle"
    );

    setTimeout(
      function () {

        playTone(
          620,
          0.55,
          0.015,
          "sine"
        );

      },
      110
    );

  }


  function playDiscoverySound() {

    playTone(
      390,
      0.45,
      0.017,
      "triangle"
    );

    setTimeout(
      function () {

        playTone(
          540,
          0.6,
          0.015,
          "sine"
        );

      },
      120
    );

  }


  function playDeductionSound() {

    playTone(
      360,
      0.38,
      0.017,
      "triangle"
    );

    setTimeout(
      function () {

        playTone(
          520,
          0.5,
          0.015,
          "sine"
        );

      },
      100
    );

    setTimeout(
      function () {

        playTone(
          700,
          0.65,
          0.012,
          "sine"
        );

      },
      210
    );

  }


  function playRevealSound() {

    playTone(
      420,
      0.62,
      0.022,
      "sine"
    );

    setTimeout(
      function () {

        playTone(
          640,
          0.78,
          0.018,
          "sine"
        );

      },
      150
    );

    setTimeout(
      function () {

        playTone(
          820,
          0.9,
          0.012,
          "triangle"
        );

      },
      290
    );

  }


  function playMemorySound() {

    playTone(
      320,
      0.7,
      0.016,
      "sine"
    );

    setTimeout(
      function () {

        playTone(
          440,
          0.86,
          0.014,
          "triangle"
        );

      },
      170
    );

  }


  function playChoiceSound() {

    playTone(
      330,
      0.45,
      0.02,
      "sine"
    );

  }


  function playWrongSound() {

    playTone(
      150,
      0.22,
      0.02,
      "square"
    );

  }


  function playSecretSound() {

    playTone(
      540,
      0.65,
      0.022,
      "sine"
    );

    setTimeout(
      function () {

        playTone(
          760,
          0.8,
          0.018,
          "sine"
        );

      },
      140
    );

  }


  /* =========================================================
     ÉCHAP
  ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape"
      ) {

        closeMenu();
        hideSecretPopup();

      }

    }
  );


  /* =========================================================
     SAUVEGARDE AVANT QUITTER
  ========================================================= */

  window.addEventListener(
    "beforeunload",
    function () {

      const params =
        new URLSearchParams(
          window.location.search
        );

      if (
        params.get("lecture") ===
        "recommencer"
      ) {

        return;

      }

      localStorage.setItem(
        STORAGE_SCROLL,
        String(
          Math.round(
            window.scrollY
          )
        )
      );

      localStorage.setItem(
        STORAGE_PROGRESS,
        "1"
      );

    }
  );


});
