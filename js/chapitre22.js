/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 22 — CEUX QUI VEILLENT DANS L’OMBRE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const scenes = document.querySelectorAll(".scene");
  const progressFill = document.getElementById("progressFill");
  const menuBtn = document.getElementById("menuBtn");
  const soundBtn = document.getElementById("soundBtn");
  const chapterMenu = document.getElementById("chapterMenu");
  const menuClose = document.getElementById("menuClose");
  const resumeBtn = document.getElementById("resumeBtn");
  const restartBtn = document.getElementById("restartBtn");
  const restartChapter = document.getElementById("restartChapter");
  const secretPopup = document.getElementById("secretPopup");

  const STORAGE_PREFIX = "societeOmbre_chapitre22_";
  const STORAGE_SCROLL = STORAGE_PREFIX + "scroll";
  const STORAGE_PROGRESS = STORAGE_PREFIX + "progression";
  const STORAGE_COMPLETED = STORAGE_PREFIX + "termine";
  const STORAGE_SECRETS = STORAGE_PREFIX + "secrets";

  const urlParams = new URLSearchParams(window.location.search);
  const lectureMode = urlParams.get("lecture");

  /* =========================================================
     OUTILS
  ========================================================= */

  function getStoredArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function saveStoredArray(key, values) {
    localStorage.setItem(
      key,
      JSON.stringify(values)
    );
  }

  function addStoredValue(key, value) {
    const values = getStoredArray(key);

    if (!values.includes(value)) {
      values.push(value);
      saveStoredArray(key, values);
    }

    return values;
  }

  function setRevealHTML(reveal, html) {
    if (!reveal) return;

    reveal.innerHTML = html;
    reveal.classList.add("open");
  }

  function updateOrderedButtons(buttons, progress) {
    buttons.forEach(function (button, index) {

      button.classList.remove("active");

      if (index < progress) {
        button.classList.add("completed");
        button.disabled = true;
      } else {
        button.disabled = false;
      }

      if (index === progress) {
        button.classList.add("active");
      }

    });
  }

  function flashWrong(button) {

    button.classList.add("wrong");

    playWrongSound();

    setTimeout(function () {
      button.classList.remove("wrong");
    }, 650);

  }

  /* =========================================================
     SECRETS
  ========================================================= */

  function saveSecret(secret) {

    const secrets =
      getStoredArray(
        STORAGE_SECRETS
      );

    if (!secrets.includes(secret)) {

      secrets.push(secret);

      saveStoredArray(
        STORAGE_SECRETS,
        secrets
      );

    }
  }

  let secretTimer = null;

  function hideSecretPopup() {

    if (!secretPopup) return;

    secretPopup.classList.remove("show");

    secretPopup.setAttribute(
      "aria-hidden",
      "true"
    );
  }

  function showSecret(
    secretName,
    secretText
  ) {

    saveSecret(secretName);

    if (!secretPopup) return;

    const inner =
      secretPopup.querySelector(
        ".secret-popup-inner"
      );

    if (!inner) return;

    let description =
      inner.querySelector(
        ".secret-description"
      );

    if (!description) {

      description =
        document.createElement("p");

      description.className =
        "secret-description";

      inner.appendChild(
        description
      );

    }

    description.textContent =
      secretText;

    secretPopup.classList.add("show");

    secretPopup.setAttribute(
      "aria-hidden",
      "false"
    );

    playSecretSound();

    clearTimeout(secretTimer);

    secretTimer =
      setTimeout(
        hideSecretPopup,
        3200
      );
  }

  /* =========================================================
     MOTEUR INTERACTIONS ORDONNÉES
  ========================================================= */

  function setupOrderedInteraction(config) {

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

    if (Number.isNaN(progress)) {
      progress = 0;
    }

    if (progress < 0) {
      progress = 0;
    }

    if (
      progress >
      config.order.length
    ) {
      progress =
        config.order.length;
    }

    updateOrderedButtons(
      buttons,
      progress
    );

    if (
      progress >= config.order.length &&
      config.finalHTML
    ) {

      setRevealHTML(
        reveal,
        config.finalHTML
      );
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

              flashWrong(button);

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

            if (config.sound) {
              config.sound();
            }

            if (
              progress >=
              config.order.length
            ) {

              if (config.finalHTML) {

                setRevealHTML(
                  reveal,
                  config.finalHTML
                );

              }

              showSecret(
                config.secretName,
                config.secretText
              );

            }

          }
        );

      }
    );

  }

  /* =========================================================
     MOTEUR INTERACTIONS LIBRES
  ========================================================= */

  function setupFreeInteraction(config) {

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
          observed.includes(value)
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

            if (config.sound) {
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

              showSecret(
                config.secretName,
                config.secretText
              );

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

  function animateParagraphs(scene) {

    if (
      !scene ||
      scene.dataset.textAnimated === "1"
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
          index * 85
        );

      }
    );

  }

  if (
    "IntersectionObserver"
    in window
  ) {

    const sceneObserver =
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
          threshold: 0.08
        }
      );

    scenes.forEach(
      function (scene) {

        sceneObserver.observe(
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

    if (!progressFill) return;

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

  let saveScrollTimer = null;

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
     REPRISE
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
     CONTINUER
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

    if (!chapterMenu) return;

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

    if (!chapterMenu) return;

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
          !Number.isNaN(
            position
          )
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
      "chapitre22.html?lecture=recommencer";

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
     HOPE / LEE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".lee-training-trigger",

    dataKey:
      "leeTraining",

    revealId:
      "leeTrainingReveal",

    storage:
      "leeTraining",

    order: [
      "attack",
      "parry",
      "feint",
      "sweep",
      "stop"
    ],

    texts: {

      attack:
        "Maître Lee attaque sans prévenir pour forcer Hope à réagir plutôt qu’à réfléchir.",

      parry:
        "Hope pare, pivote et contre, mais Lee attend déjà son changement d’angle.",

      feint:
        "Hope tente une feinte qu’elle pense nouvelle, mais Lee l’avait anticipée.",

      sweep:
        "Lee balaie sa jambe et lui rappelle qu’une seconde de satisfaction peut suffire à créer une ouverture.",

      stop:
        "Au milieu de l’entraînement, Hope et Lee s’arrêtent exactement au même moment : tous les deux ont senti une présence dans les bois."

    },

    sound:
      playDeductionSound,

    finalHTML:
      `
        <p>Attaque.</p>
        <p>Parade.</p>
        <p>Feinte.</p>
        <p>Balayage.</p>

        <p class="impact-text">
          PUIS LE MÊME ARRÊT,
          AU MÊME INSTANT.
        </p>
      `,

    secretName:
      "lee-hope-sense-amy",

    secretText:
      "Hope et Maître Lee détectent tous les deux la présence d’Amy autour de l’hacienda."

  });

  /* =========================================================
     INTERACTION 2
     POURQUOI AMY VEILLE
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".amy-purpose-trigger",

    dataKey:
      "amyPurpose",

    revealId:
      "amyPurposeReveal",

    storage:
      "amyPurpose",

    total: 5,

    texts: {

      anna:
        "Amy surveille directement la zone où se trouve Anna.",

      protect:
        "Elle ne cherche pas une cible : sa position sert à protéger l’hacienda et surtout Anna.",

      wait:
        "Hope comprend qu’Amy ne fait pas que surveiller : elle attend quelqu’un.",

      eraser:
        "La personne qu’Amy attend est l’Effaceur, celui qu’elle appelle le Boucher.",

      attachment:
        "Maître Lee suggère qu’une rivalité peut parfois cacher quelque chose de beaucoup plus ancien : l’attachement."

    },

    sound:
      playMemorySound,

    finalHTML:
      `
        <p>Rivalité.</p>
        <p>Devoir.</p>
        <p>Surveillance.</p>
        <p>Supériorité.</p>

        <p class="impact-text">
          PARFOIS,
          ON APPELLE AUTREMENT
          CE QU’ON RESSENT.
        </p>
      `,

    secretName:
      "amy-protects-anna",

    secretText:
      "Amy veille sur Anna et attend l’Effaceur, tandis que Lee révèle à Hope que l’attachement peut se cacher derrière des années de rivalité."

  });

  /* =========================================================
     INTERACTION 3
     AMY REPÈRE L'EFFACEUR
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".amy-watch-trigger",

    dataKey:
      "amyWatch",

    revealId:
      "amyWatchReveal",

    storage:
      "amyWatch",

    order: [
      "branch",
      "silence",
      "move",
      "man",
      "eraser"
    ],

    texts: {

      branch:
        "Amy surveille l’hacienda depuis une branche, invisible depuis le chemin et même pour les drones de Peter.",

      silence:
        "Un silence trop parfait lui indique qu’un mouvement anormal se cache dans les bois.",

      move:
        "Elle abandonne sa position avant même de voir clairement la menace.",

      man:
        "Un homme massif passe exactement à l’endroit où elle se trouvait quelques secondes plus tôt.",

      eraser:
        "Amy reconnaît l’Effaceur. Il est venu jusqu’au périmètre de l’hacienda."

    },

    sound:
      playDarkSound,

    finalHTML:
      `
        <p>Une branche.</p>
        <p>Un silence trop propre.</p>
        <p>Un déplacement.</p>
        <p>Un homme.</p>

        <p class="impact-text">
          L’EFFACEUR.
        </p>
      `,

    secretName:
      "eraser-at-awake",

    secretText:
      "L’Effaceur a atteint le périmètre extérieur de l’hacienda Awake."

  });

  /* =========================================================
     INTERACTION 4
     LES LIENS D'AMY
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".eraser-links-trigger",

    dataKey:
      "eraserLinks",

    revealId:
      "eraserLinksReveal",

    storage:
      "eraserLinks",

    order: [
      "protect",
      "anna",
      "hope",
      "silence",
      "weakness"
    ],

    texts: {

      protect:
        "En refusant de le laisser passer, Amy révèle involontairement qu’elle protège quelqu’un derrière elle.",

      anna:
        "L’Effaceur prononce le nom d’Anna pour observer sa réaction.",

      hope:
        "Il ajoute ensuite Hope, cherchant à savoir laquelle des deux compte réellement pour Amy.",

      silence:
        "Amy ne répond pas, mais son silence fournit déjà une information à quelqu’un qui sait provoquer les réactions.",

      weakness:
        "L’Effaceur ne cherche pas seulement à entrer : il cherche les liens d’Amy afin de savoir où frapper."

    },

    sound:
      playDarkSound,

    finalHTML:
      `
        <p>Anna.</p>
        <p>Hope.</p>
        <p>Le silence d’Amy.</p>

        <p class="impact-text">
          IL CHERCHE SES LIENS
          POUR TROUVER
          SES FAIBLESSES.
        </p>
      `,

    secretName:
      "eraser-uses-links",

    secretText:
      "L’Effaceur teste les réactions d’Amy pour identifier les personnes auxquelles elle est attachée."

  });

  /* =========================================================
     INTERACTION 5
     AMY PROTÈGE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".amy-protect-trigger",

    dataKey:
      "amyProtect",

    revealId:
      "amyProtectReveal",

    storage:
      "amyProtect",

    order: [
      "attack",
      "distance",
      "turn",
      "stop",
      "wound"
    ],

    texts: {

      attack:
        "Amy prend immédiatement l’initiative et utilise sa vitesse et sa précision contre la force brute de l’Effaceur.",

      distance:
        "Elle déplace volontairement le combat toujours plus loin de l’hacienda et d’Anna.",

      turn:
        "L’Effaceur comprend sa stratégie et cesse de la combattre pour courir directement vers l’hacienda.",

      stop:
        "Amy abandonne toute prudence et se jette sur lui pour l’empêcher de passer.",

      wound:
        "Il pivote au dernier instant et sa lame traverse le flanc d’Amy. Elle est blessée parce qu’elle a choisi de protéger."

    },

    sound:
      playDarkSound,

    finalHTML:
      `
        <p>
          Elle ne cherche plus
          à gagner.
        </p>

        <p>
          Elle ne cherche même plus
          à rester intacte.
        </p>

        <p class="impact-text">
          ELLE L’EMPÊCHE
          DE PASSER.
        </p>
      `,

    secretName:
      "amy-fights-to-protect",

    secretText:
      "Amy se fait blesser en empêchant volontairement l’Effaceur d’atteindre l’hacienda et Anna."

  });

  /* =========================================================
     INTERACTION 6
     HOPE + AMY
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".duo-combat-trigger",

    dataKey:
      "duoCombat",

    revealId:
      "duoCombatReveal",

    storage:
      "duoCombat",

    order: [
      "hope",
      "amy",
      "open",
      "strike",
      "together"
    ],

    texts: {

      hope:
        "Hope utilise davantage la force et oblige l’Effaceur à concentrer sa défense sur elle.",

      amy:
        "Amy détourne ses mouvements et déplace son attention au moment exact où Hope attaque.",

      open:
        "Amy crée une ouverture dans sa garde sans avoir besoin de prévenir Hope.",

      strike:
        "Hope frappe immédiatement dans l’espace créé par Amy.",

      together:
        "Leurs styles, construits séparément depuis l’enfance, s’emboîtent naturellement lorsqu’elles combattent enfin du même côté."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>Hope force.</p>
        <p>Amy détourne.</p>
        <p>Amy ouvre.</p>
        <p>Hope frappe.</p>

        <p class="impact-text">
          DEUX STYLES.
          UN SEUL RYTHME.
        </p>
      `,

    secretName:
      "hope-amy-fight-together",

    secretText:
      "Hope et Amy découvrent qu’elles peuvent combattre ensemble presque instinctivement."

  });

  /* =========================================================
     INTERACTION 7
     LAISSER ENTRER AMY
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".let-amy-in-trigger",

    dataKey:
      "letAmyIn",

    revealId:
      "letAmyInReveal",

    storage:
      "letAmyIn",

    total: 5,

    texts: {

      attempt:
        "Lucy n’oublie pas qu’Amy était autrefois venue pour tuer Anna.",

      failed:
        "Amy ne l’a pourtant pas fait, mais ce refus ne suffit pas à effacer ce qu’elle avait accepté auparavant.",

      protect:
        "Cette nuit, Amy a passé des heures à empêcher l’Effaceur d’approcher Anna.",

      dangerous:
        "Hope reconnaît elle-même qu’Amy reste dangereuse et qu’elle ne lui fait pas encore entièrement confiance.",

      injured:
        "Mais Amy est gravement blessée, et Hope refuse de transformer la méfiance en condamnation à mort."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>
          Elle n’est pas innocente.
        </p>

        <p>
          Elle n’est pas inoffensive.
        </p>

        <p>
          Mais elle vient
          de protéger Anna.
        </p>

        <p class="impact-text">
          FAIRE CONFIANCE
          N’EST PAS LA MÊME CHOSE
          QUE PARDONNER.
        </p>
      `,

    secretName:
      "amy-enters-awake",

    secretText:
      "Hope fait entrer Amy dans l’hacienda sans nier son passé ni le danger qu’elle représente."

  });

  /* =========================================================
     INTERACTION 8
     HOPE / LUCY
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".hope-lucy-trigger",

    dataKey:
      "hopeLucy",

    revealId:
      "hopeLucyReveal",

    storage:
      "hopeLucy",

    order: [
      "police",
      "judge",
      "responsibility",
      "watch",
      "enter"
    ],

    texts: {

      police:
        "Lucy rappelle à Hope qu’elle n’est pas policière et qu’elle ne peut pas décider seule qu’Amy est innocente.",

      judge:
        "Hope répond que Lucy n’est pas juge non plus : la prudence ne donne pas le droit de condamner quelqu’un sans recours.",

      responsibility:
        "Lucy pense à sa responsabilité envers Anna et à ce qu’elle devra expliquer si Amy les trahit.",

      watch:
        "Un compromis apparaît : Amy peut entrer, mais elle restera sous surveillance constante.",

      enter:
        "La priorité devient médicale. Peter rappelle qu’Amy perd trop de sang et Lucy finit par s’écarter."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>Méfiance.</p>
        <p>Responsabilité.</p>
        <p>Surveillance.</p>

        <p class="impact-text">
          ELLE ENTRE.
          MAIS RIEN N’EST EFFACÉ.
        </p>
      `,

    secretName:
      "lucy-allows-amy",

    secretText:
      "Lucy accepte l’entrée d’Amy à Awake sous surveillance, sans lui accorder sa confiance."

  });

  /* =========================================================
     INTERACTION 9
     AMY ACCEPTE L'AIDE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".amy-help-trigger",

    dataKey:
      "amyHelp",

    revealId:
      "amyHelpReveal",

    storage:
      "amyHelp",

    order: [
      "wound",
      "charles",
      "betty",
      "hope",
      "why"
    ],

    texts: {

      wound:
        "La blessure d’Amy est profonde et nécessite des soins immédiats.",

      charles:
        "Charles supervise à distance et refuse de se satisfaire d’un simple « probablement pas vital ».",

      betty:
        "Betty prépare directement le matériel et s’occupe d’Amy malgré ce qu’elle sait de son passé.",

      hope:
        "Hope reste près d’elle alors qu’Amy lui répète qu’elle peut partir.",

      why:
        "À la question « Pourquoi tu restes ? », Hope répond simplement : « Parce que j’en ai envie. »"

    },

    sound:
      playMemorySound,

    finalHTML:
      `
        <p>
          Amy ne demande rien.
        </p>

        <p>
          Hope ne réclame rien.
        </p>

        <p class="impact-text">
          ELLE RESTE
          PARCE QU’ELLE EN A ENVIE.
        </p>
      `,

    secretName:
      "hope-stays-with-amy",

    secretText:
      "Hope reste volontairement près d’Amy sans attendre de justification ni de reconnaissance."

  });

  /* =========================================================
     INTERACTION 10
     AMY / BETTY
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".amy-betty-trigger",

    dataKey:
      "amyBetty",

    revealId:
      "amyBettyReveal",

    storage:
      "amyBetty",

    total: 5,

    texts: {

      betty:
        "Amy reconnaît Betty et comprend immédiatement qui elle est pour Anna.",

      anna:
        "Son premier sujet n’est pas sa propre blessure : elle parle d’Anna.",

      safe:
        "Amy précise que personne n’a approché Anna pendant qu’elle surveillait le périmètre.",

      thanks:
        "Betty comprend ce qu’Amy vient réellement de faire et la remercie.",

      toolate:
        "Amy refuse le remerciement, mais Betty ne lui laisse pas la possibilité de nier complètement son geste."

    },

    sound:
      playMemorySound,

    finalHTML:
      `
        <p>
          « Ne me remercie pas. »
        </p>

        <p class="impact-text">
          « TROP TARD. »
        </p>
      `,

    secretName:
      "betty-thanks-amy",

    secretText:
      "Betty remercie Amy d’avoir protégé Anna, même si Amy refuse encore d’assumer ce que son geste signifie."

  });

  /* =========================================================
     INTERACTION 11
     ÉLIE ARRIVE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".elie-trust-trigger",

    dataKey:
      "elieTrust",

    revealId:
      "elieTrustReveal",

    storage:
      "elieTrust",

    order: [
      "alone",
      "weapon",
      "search",
      "box",
      "stones"
    ],

    texts: {

      alone:
        "Élie respecte la première condition de Betty et arrive seul par l’entrée secondaire.",

      weapon:
        "Il ne porte aucune arme apparente et accepte les conditions imposées.",

      search:
        "Hale le fouille personnellement et ne lui accorde aucune confiance particulière.",

      box:
        "Élie apporte une petite caisse au lieu de demander qu’on le croie sur parole.",

      stones:
        "La caisse contient les fragments de pierre transportés depuis des années par son réseau."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>Seul.</p>
        <p>Sans arme.</p>
        <p>Fouillé.</p>
        <p>Une caisse.</p>

        <p class="impact-text">
          ÉLIE APPORTE
          UNE PREUVE.
        </p>
      `,

    secretName:
      "elie-brings-stones",

    secretText:
      "Élie accepte les conditions de Betty et apporte directement les fragments de pierre pour que Root les examine."

  });

  /* =========================================================
     INTERACTION 12
     LES PIERRES
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".stone-network-trigger",

    dataKey:
      "stoneNetwork",

    revealId:
      "stoneNetworkReveal",

    storage:
      "stoneNetwork",

    order: [
      "symbol",
      "site",
      "years",
      "network",
      "gather"
    ],

    texts: {

      symbol:
        "Root reconnaît immédiatement sur les fragments un symbole lié aux découvertes précédentes.",

      site:
        "Mais la pierre ne correspond pas exactement au refuge : elle provient probablement d’un autre site.",

      years:
        "Élie confirme que des cargaisons semblables circulent par son réseau depuis plusieurs années.",

      network:
        "Root comprend alors que les routes du cartel ont servi de chaîne logistique à des clients liés aux Gardiens.",

      gather:
        "Le but n’était peut-être pas seulement de déplacer les fragments, mais de les réunir progressivement dans un même ensemble."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>Plusieurs sites.</p>
        <p>Plusieurs années.</p>
        <p>Un même réseau.</p>

        <p class="impact-text">
          QUELQU’UN RASSEMBLE
          LES FRAGMENTS.
        </p>
      `,

    secretName:
      "stones-are-gathered",

    secretText:
      "Root comprend que le réseau d’Élie pourrait avoir servi pendant des années à rassembler les fragments d’un dispositif ancien dispersé."

  });

  /* =========================================================
     INTERACTION 13
     CONFIANCE / RISQUE
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".trust-risk-trigger",

    dataKey:
      "trustRisk",

    revealId:
      "trustRiskReveal",

    storage:
      "trustRisk",

    total: 5,

    texts: {

      danger:
        "Hope ne nie pas le problème : Amy reste dangereuse.",

      distrust:
        "Lucy a raison de continuer à se méfier d’elle.",

      chance:
        "Mais Hope estime qu’Amy mérite malgré tout la possibilité de poursuivre le changement qu’elle a déjà commencé.",

      betrayal:
        "La possibilité d’une trahison existe encore et Hope ne cherche pas à l’effacer.",

      responsibility:
        "Si elle se trompe, Hope accepte d’assumer elle-même le risque d’avoir cru en Amy."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>
          Se méfier
          peut être juste.
        </p>

        <p>
          Laisser une chance
          peut l’être aussi.
        </p>

        <p class="impact-text">
          LES DEUX
          PEUVENT ÊTRE VRAIES.
        </p>
      `,

    secretName:
      "trust-without-naivety",

    secretText:
      "Hope distingue la confiance de la naïveté : elle reconnaît le danger d’Amy tout en lui laissant une chance."

  });

  /* =========================================================
     INTERACTION 14
     FIN HOPE / AMY
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".final-amy-trigger",

    dataKey:
      "finalAmy",

    revealId:
      "finalAmyReveal",

    storage:
      "finalAmy",

    order: [
      "awake",
      "eraser",
      "two",
      "changed",
      "smile"
    ],

    texts: {

      awake:
        "Amy se réveille et découvre que Hope est encore là, endormie dans le fauteuil près d’elle.",

      eraser:
        "Elle avertit Hope que l’Effaceur reviendra et que la prochaine attaque ne sera plus un simple test.",

      two:
        "Hope lui répond que, la prochaine fois, Amy ne l’affrontera plus seule : elles seront deux.",

      changed:
        "Amy affirme que Hope n’a jamais changé, et Hope lui retourne exactement la même idée.",

      smile:
        "Hope lui dit qu’elle a seulement mis plus de temps à comprendre qui elle était encore. Cette fois, Amy sourit."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>
          « La prochaine fois… »
        </p>

        <p>
          « On sera deux. »
        </p>

        <p>
          « Tu n’as vraiment
          pas changé. »
        </p>

        <p class="impact-text">
          AMY SOURIT.
        </p>
      `,

    secretName:
      "hope-amy-loop-closes",

    secretText:
      "Hope et Amy referment une vieille boucle de leur enfance : Amy ne se tient plus de l’autre côté."

  });

  /* =========================================================
     FIN DU CHAPITRE
  ========================================================= */

  const finalScene =
    document.getElementById(
      "scene-76"
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
          threshold: 0.35
        }
      );

    endObserver.observe(
      finalScene
    );

  }

  /* =========================================================
     SON
  ========================================================= */

  let audioCtx = null;
  let masterGain = null;
  let ambienceOsc1 = null;
  let ambienceOsc2 = null;
  let soundActive = false;

  function startSound() {

    if (soundActive) return;

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
      0.021;

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
      38;

    gain1.gain.value =
      0.62;

    ambienceOsc2.type =
      "triangle";

    ambienceOsc2.frequency.value =
      73;

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

    soundActive = true;

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

    soundActive = false;

    audioCtx = null;
    masterGain = null;
    ambienceOsc1 = null;
    ambienceOsc2 = null;

    if (soundBtn) {

      soundBtn.classList.remove(
        "sound-active"
      );

      soundBtn.textContent =
        "♫";

    }

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
     TONS
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
      480,
      0.45,
      0.018,
      "triangle"
    );

    setTimeout(
      function () {

        playTone(
          620,
          0.6,
          0.016,
          "sine"
        );

      },
      120
    );

  }

  function playDeductionSound() {

    playTone(
      390,
      0.4,
      0.017,
      "triangle"
    );

    setTimeout(
      function () {

        playTone(
          550,
          0.55,
          0.015,
          "sine"
        );

      },
      100
    );

    setTimeout(
      function () {

        playTone(
          720,
          0.75,
          0.012,
          "sine"
        );

      },
      220
    );

  }

  function playRevealSound() {

    playTone(
      420,
      0.65,
      0.022,
      "sine"
    );

    setTimeout(
      function () {

        playTone(
          640,
          0.8,
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
          0.95,
          0.012,
          "triangle"
        );

      },
      300
    );

  }

  function playMemorySound() {

    playTone(
      330,
      0.75,
      0.016,
      "sine"
    );

    setTimeout(
      function () {

        playTone(
          440,
          0.9,
          0.014,
          "triangle"
        );

      },
      180
    );

  }

  function playDarkSound() {

    playTone(
      170,
      0.7,
      0.018,
      "sine"
    );

    setTimeout(
      function () {

        playTone(
          255,
          0.9,
          0.013,
          "triangle"
        );

      },
      150
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
