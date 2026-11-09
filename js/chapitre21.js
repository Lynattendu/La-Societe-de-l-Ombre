/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 21 — LE REFUGE DES OMBRES
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     ÉLÉMENTS PRINCIPAUX
  ========================================================= */

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

  /* =========================================================
     LOCALSTORAGE
  ========================================================= */

  const STORAGE_PREFIX = "societeOmbre_chapitre21_";
  const STORAGE_SCROLL = STORAGE_PREFIX + "scroll";
  const STORAGE_PROGRESS = STORAGE_PREFIX + "progression";
  const STORAGE_COMPLETED = STORAGE_PREFIX + "termine";
  const STORAGE_SECRETS = STORAGE_PREFIX + "secrets";

  const STORAGE_EXPEDITION_GEAR = STORAGE_PREFIX + "expeditionGear";
  const STORAGE_HIDDEN_CAMERA = STORAGE_PREFIX + "hiddenCamera";
  const STORAGE_SECRET_ENTRANCE = STORAGE_PREFIX + "secretEntrance";
  const STORAGE_UNION_SYMBOL = STORAGE_PREFIX + "unionSymbol";
  const STORAGE_GUARDIAN_TECH = STORAGE_PREFIX + "guardianTech";
  const STORAGE_SAME_TRAINING = STORAGE_PREFIX + "sameTraining";
  const STORAGE_LUCY_MARK = STORAGE_PREFIX + "lucyMark";
  const STORAGE_TEAM_SYSTEM = STORAGE_PREFIX + "teamSystem";
  const STORAGE_TWO_FRESCOES = STORAGE_PREFIX + "twoFrescoes";
  const STORAGE_BRIDGE_CONTROL = STORAGE_PREFIX + "bridgeControl";
  const STORAGE_BLACK_TABLET = STORAGE_PREFIX + "blackTablet";
  const STORAGE_ESCAPE_REFUGE = STORAGE_PREFIX + "escapeRefuge";
  const STORAGE_ERASER_THREAT = STORAGE_PREFIX + "eraserThreat";
  const STORAGE_AMY_SWITCH = STORAGE_PREFIX + "amySwitch";

  /* =========================================================
     MODE DE LECTURE
  ========================================================= */

  const urlParams = new URLSearchParams(window.location.search);
  const lectureMode = urlParams.get("lecture");

  /* =========================================================
     OUTILS LOCALSTORAGE
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
    localStorage.setItem(key, JSON.stringify(values));
  }

  function addStoredValue(key, value) {
    const values = getStoredArray(key);

    if (!values.includes(value)) {
      values.push(value);
      saveStoredArray(key, values);
    }

    return values;
  }

  /* =========================================================
     OUTILS INTERACTIONS
  ========================================================= */

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

  function markStoredButtons(selector, storageKey, dataKey) {
    const stored = getStoredArray(storageKey);

    document.querySelectorAll(selector).forEach(function (button) {
      if (stored.includes(button.dataset[dataKey])) {
        button.classList.add("completed");
      }
    });

    return stored;
  }

  function flashWrong(button) {
    button.classList.add("wrong");
    playWrongSound();

    setTimeout(function () {
      button.classList.remove("wrong");
    }, 650);
  }

  /* =========================================================
     IMAGES MANQUANTES
  ========================================================= */

  document.querySelectorAll(".visual img").forEach(function (img) {
    img.addEventListener("error", function () {
      const visual = img.closest(".visual");

      if (visual) {
        visual.classList.add("visual-missing");
      }
    });
  });

  /* =========================================================
     APPARITION DES SCÈNES
  ========================================================= */

  function animateParagraphs(scene) {
    if (!scene || scene.dataset.textAnimated === "1") return;

    scene.dataset.textAnimated = "1";

    const paragraphs = scene.querySelectorAll(".text-block p");

    paragraphs.forEach(function (paragraph, index) {
      paragraph.style.opacity = "0";
      paragraph.style.transform = "translateY(12px)";

      setTimeout(function () {
        paragraph.style.transition =
          "opacity 0.65s ease, transform 0.65s ease";

        paragraph.style.opacity = "1";
        paragraph.style.transform = "translateY(0)";
      }, index * 85);
    });
  }

  if ("IntersectionObserver" in window) {
    const sceneObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const scene = entry.target;

            scene.classList.add("is-visible");
            animateParagraphs(scene);

            localStorage.setItem(STORAGE_PROGRESS, "1");
          }
        });
      },
      {
        threshold: 0.08
      }
    );

    scenes.forEach(function (scene) {
      sceneObserver.observe(scene);
    });

  } else {

    scenes.forEach(function (scene) {
      scene.classList.add("is-visible");
      animateParagraphs(scene);
    });
  }

  const firstScene = document.querySelector(".scene");

  if (firstScene) {
    firstScene.classList.add("is-visible");
    animateParagraphs(firstScene);
  }

  /* =========================================================
     BARRE DE PROGRESSION
  ========================================================= */

  function updateProgress() {
    if (!progressFill) return;

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) {
      progressFill.style.width = "0%";
      return;
    }

    const percentage = Math.min(
      100,
      Math.max(
        0,
        (window.scrollY / documentHeight) * 100
      )
    );

    progressFill.style.width = percentage + "%";
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
      clearTimeout(saveScrollTimer);

      saveScrollTimer = setTimeout(function () {
        localStorage.setItem(
          STORAGE_SCROLL,
          String(Math.round(window.scrollY))
        );

        localStorage.setItem(
          STORAGE_PROGRESS,
          "1"
        );
      }, 250);
    },
    {
      passive: true
    }
  );

  /* =========================================================
     REPRISE / RECOMMENCER
  ========================================================= */

  if (lectureMode === "reprendre") {
    const savedPosition = parseInt(
      localStorage.getItem(STORAGE_SCROLL),
      10
    );

    if (
      !Number.isNaN(savedPosition) &&
      savedPosition > 0
    ) {
      setTimeout(function () {
        window.scrollTo(0, savedPosition);
        updateProgress();
      }, 350);
    }
  }

  if (lectureMode === "recommencer") {
    setTimeout(function () {
      window.scrollTo(0, 0);
      updateProgress();
    }, 100);
  }

  /* =========================================================
     BOUTON CONTINUER
  ========================================================= */

  document.querySelectorAll("[data-next]").forEach(function (button) {
    button.addEventListener("click", function () {
      const currentScene = button.closest(".scene");

      if (!currentScene) return;

      const nextScene = currentScene.nextElementSibling;

      if (
        nextScene &&
        typeof nextScene.scrollIntoView === "function"
      ) {
        nextScene.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* =========================================================
     MENU
  ========================================================= */

  function openMenu() {
    if (!chapterMenu) return;

    chapterMenu.classList.add("open");
    chapterMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    if (!chapterMenu) return;

    chapterMenu.classList.remove("open");
    chapterMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", openMenu);
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  if (chapterMenu) {
    chapterMenu.addEventListener("click", function (event) {
      if (event.target === chapterMenu) {
        closeMenu();
      }
    });
  }

  if (resumeBtn) {
    resumeBtn.addEventListener("click", function () {
      closeMenu();

      const position = parseInt(
        localStorage.getItem(STORAGE_SCROLL),
        10
      );

      if (!Number.isNaN(position)) {
        window.scrollTo({
          top: position,
          behavior: "smooth"
        });
      }
    });
  }

  /* =========================================================
     RECOMMENCER LE CHAPITRE
  ========================================================= */

  function restartChapterFunction() {
    const keysToDelete = [];

    for (
      let i = 0;
      i < localStorage.length;
      i += 1
    ) {
      const key = localStorage.key(i);

      if (
        key &&
        key.startsWith(STORAGE_PREFIX)
      ) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(function (key) {
      localStorage.removeItem(key);
    });

    window.location.href =
      "chapitre21.html?lecture=recommencer";
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
     SECRETS
  ========================================================= */

  function getSecrets() {
    try {
      const value = JSON.parse(
        localStorage.getItem(STORAGE_SECRETS)
      );

      return Array.isArray(value)
        ? value
        : [];

    } catch (error) {
      return [];
    }
  }

  function saveSecret(secret) {
    const secrets = getSecrets();

    if (!secrets.includes(secret)) {
      secrets.push(secret);

      localStorage.setItem(
        STORAGE_SECRETS,
        JSON.stringify(secrets)
      );
    }
  }

  /* =========================================================
     POPUP INFORMATION
  ========================================================= */

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

    const inner = secretPopup.querySelector(
      ".secret-popup-inner"
    );

    if (!inner) return;

    let description = inner.querySelector(
      ".secret-description"
    );

    if (!description) {
      description =
        document.createElement("p");

      description.className =
        "secret-description";

      inner.appendChild(description);
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

    secretTimer = setTimeout(
      hideSecretPopup,
      3200
    );
  }

  /* =========================================================
     INTERACTION 1
     ÉQUIPEMENT
  ========================================================= */

  const expeditionGearReveal =
    document.getElementById(
      "expeditionGearReveal"
    );

  let expeditionGearObserved =
    markStoredButtons(
      ".expedition-gear-trigger",
      STORAGE_EXPEDITION_GEAR,
      "expeditionGear"
    );

  const expeditionGearTexts = {
    drones:
      "Trois drones partent en reconnaissance tandis qu’un quatrième reste à basse altitude pour renforcer le réseau local.",

    root:
      "Le bracelet de Root superpose les relevés des drones aux cartes et données anciennes chargées avant l’expédition.",

    lucy:
      "Les lunettes de Lucy et IA2 sont reliées au réseau temporaire établi par les drones de Peter.",

    hale:
      "Hale emporte deux capsules de protection d’urgence pour faire face à une attaque ou à un accident.",

    crash:
      "Hope transporte deux bulles Crash : quelques secondes de protection supplémentaires en cas d’impact ou d’effondrement."
  };

  document
    .querySelectorAll(
      ".expedition-gear-trigger"
    )
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          const type =
            button.dataset.expeditionGear;

          expeditionGearObserved =
            addStoredValue(
              STORAGE_EXPEDITION_GEAR,
              type
            );

          button.classList.add(
            "completed"
          );

          setRevealHTML(
            expeditionGearReveal,
            "<p>" +
            expeditionGearTexts[type] +
            "</p>"
          );

          playAnalysisSound();

          if (
            expeditionGearObserved.length >= 5
          ) {

            setRevealHTML(
              expeditionGearReveal,
              `
                <p>Drones.</p>
                <p>Cartographie.</p>
                <p>IA2.</p>
                <p>Protection d’urgence.</p>
                <p>Bulles Crash.</p>

                <p class="impact-text">
                  CETTE FOIS,
                  ILS SE SONT PRÉPARÉS.
                </p>
              `
            );

            showSecret(
              "expedition-prepared",
              "L’équipe entre dans le canyon avec un dispositif complet de reconnaissance, de communication et de protection."
            );
          }
        }
      );
    });

  if (
    expeditionGearObserved.length >= 5
  ) {
    setRevealHTML(
      expeditionGearReveal,
      `
        <p class="impact-text">
          ILS NE SONT PAS
          VENUS LES MAINS VIDES.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 2
     CAMÉRA CACHÉE
  ========================================================= */

  const hiddenCameraReveal =
    document.getElementById(
      "hiddenCameraReveal"
    );

  const hiddenCameraButtons =
    document.querySelectorAll(
      ".hidden-camera-trigger"
    );

  const hiddenCameraOrder = [
    "birds",
    "ground",
    "watched",
    "tree",
    "camera"
  ];

  let hiddenCameraProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_HIDDEN_CAMERA
      ) || "0",
      10
    );

  const hiddenCameraTexts = {
    birds:
      "Hope remarque que le comportement des oiseaux ne correspond pas complètement à une zone réellement tranquille.",

    ground:
      "Elle observe également le sol et les détails que les drones ne considèrent pas forcément comme des anomalies.",

    watched:
      "Sans détecter directement une personne, Hope comprend que quelqu’un surveille leur progression.",

    tree:
      "Son attention se fixe sur un arbre apparemment ordinaire.",

    camera:
      "Lucy agrandit l’image et découvre une caméra optique minuscule dissimulée dans l’écorce."
  };

  updateOrderedButtons(
    hiddenCameraButtons,
    hiddenCameraProgress
  );

  hiddenCameraButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.hiddenCamera;

          const expected =
            hiddenCameraOrder[
              hiddenCameraProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          hiddenCameraProgress += 1;

          localStorage.setItem(
            STORAGE_HIDDEN_CAMERA,
            String(hiddenCameraProgress)
          );

          updateOrderedButtons(
            hiddenCameraButtons,
            hiddenCameraProgress
          );

          setRevealHTML(
            hiddenCameraReveal,
            "<p>" +
            hiddenCameraTexts[selected] +
            "</p>"
          );

          playDeductionSound();

          if (
            hiddenCameraProgress >= 5
          ) {

            setRevealHTML(
              hiddenCameraReveal,
              `
                <p>
                  Aucun humain détecté
                  par les drones.
                </p>

                <p>
                  Pourtant Hope
                  avait raison.
                </p>

                <p class="impact-text">
                  ILS SONT DÉJÀ
                  SOUS SURVEILLANCE.
                </p>
              `
            );

            showSecret(
              "guardians-watching",
              "Une caméra optique dissimulée confirme que quelqu’un surveille déjà l’entrée du canyon."
            );
          }
        }
      );
    });

  if (
    hiddenCameraProgress >= 5
  ) {
    setRevealHTML(
      hiddenCameraReveal,
      `
        <p class="impact-text">
          ILS SONT DÉJÀ
          SOUS SURVEILLANCE.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 3
     ENTRÉE SECRÈTE
  ========================================================= */

  const secretEntranceReveal =
    document.getElementById(
      "secretEntranceReveal"
    );

  const secretEntranceButtons =
    document.querySelectorAll(
      ".secret-entrance-trigger"
    );

  const secretEntranceOrder = [
    "blocks",
    "cavity",
    "roots",
    "plant",
    "stone"
  ];

  let secretEntranceProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_SECRET_ENTRANCE
      ) || "0",
      10
    );

  const secretEntranceTexts = {
    blocks:
      "Root remarque que plusieurs blocs rocheux ont une position incompatible avec une simple érosion naturelle.",

    cavity:
      "La cartographie des drones confirme l’existence d’un vide derrière la paroi.",

    roots:
      "Les racines proches de l’entrée sont organisées comme si elles faisaient partie d’un mécanisme.",

    plant:
      "Hope pousse doucement une tige vers le bas, activant une contrainte mécanique cachée.",

    stone:
      "La paroi entière se déplace et révèle finalement l’entrée du passage ancien."
  };

  updateOrderedButtons(
    secretEntranceButtons,
    secretEntranceProgress
  );

  secretEntranceButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.secretEntrance;

          const expected =
            secretEntranceOrder[
              secretEntranceProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          secretEntranceProgress += 1;

          localStorage.setItem(
            STORAGE_SECRET_ENTRANCE,
            String(secretEntranceProgress)
          );

          updateOrderedButtons(
            secretEntranceButtons,
            secretEntranceProgress
          );

          setRevealHTML(
            secretEntranceReveal,
            "<p>" +
            secretEntranceTexts[selected] +
            "</p>"
          );

          playMemorySound();

          if (
            secretEntranceProgress >= 5
          ) {

            setRevealHTML(
              secretEntranceReveal,
              `
                <p>
                  La nature
                  dissimule le mécanisme.
                </p>

                <p>Pierre.</p>
                <p>Racines.</p>
                <p>Plante.</p>

                <p class="impact-text">
                  L’ENTRÉE
                  ÉTAIT DEVANT EUX.
                </p>
              `
            );

            showSecret(
              "secret-refuge-entrance",
              "Le refuge utilise un mécanisme ancien intégré à la roche et à la végétation pour dissimuler son entrée."
            );
          }
        }
      );
    });

  if (
    secretEntranceProgress >= 5
  ) {
    setRevealHTML(
      secretEntranceReveal,
      `
        <p class="impact-text">
          L’ENTRÉE
          ÉTAIT DEVANT EUX.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 4
     SYMBOLE D’UNION
  ========================================================= */

  const unionSymbolReveal =
    document.getElementById(
      "unionSymbolReveal"
    );

  const unionSymbolButtons =
    document.querySelectorAll(
      ".union-symbol-trigger"
    );

  const unionSymbolOrder = [
    "wire",
    "sentinel",
    "guardian",
    "entwined",
    "union"
  ];

  let unionSymbolProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_UNION_SYMBOL
      ) || "0",
      10
    );

  const unionSymbolTexts = {
    wire:
      "Le premier obstacle est un câble tendu à hauteur de cheville, détecté par Peter avant que l’équipe ne le déclenche.",

    sentinel:
      "Root découvre ensuite sur le mur un ancien symbole correspondant aux Sentinelles.",

    guardian:
      "À côté apparaît également le symbole associé aux Gardiens.",

    entwined:
      "Les deux signes ne sont pas opposés : ils sont représentés entrelacés.",

    union:
      "Maître Lee confirme qu’il s’agit d’un symbole antérieur à la séparation des deux ordres."
  };

  updateOrderedButtons(
    unionSymbolButtons,
    unionSymbolProgress
  );

  unionSymbolButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.unionSymbol;

          const expected =
            unionSymbolOrder[
              unionSymbolProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          unionSymbolProgress += 1;

          localStorage.setItem(
            STORAGE_UNION_SYMBOL,
            String(unionSymbolProgress)
          );

          updateOrderedButtons(
            unionSymbolButtons,
            unionSymbolProgress
          );

          setRevealHTML(
            unionSymbolReveal,
            "<p>" +
            unionSymbolTexts[selected] +
            "</p>"
          );

          playMemorySound();

          if (
            unionSymbolProgress >= 5
          ) {

            setRevealHTML(
              unionSymbolReveal,
              `
                <p>Sentinelle.</p>
                <p>Gardien.</p>
                <p>Entrelacés.</p>

                <p class="impact-text">
                  ILS ÉTAIENT
                  AUTREFOIS UNIS.
                </p>
              `
            );

            showSecret(
              "old-order-union",
              "Le refuge conserve une preuve matérielle que Sentinelles et Gardiens appartenaient autrefois au même ordre."
            );
          }
        }
      );
    });

  if (
    unionSymbolProgress >= 5
  ) {
    setRevealHTML(
      unionSymbolReveal,
      `
        <p class="impact-text">
          ILS ÉTAIENT
          AUTREFOIS UNIS.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 5
     TECHNOLOGIE DES GARDIENS
  ========================================================= */

  const guardianTechReveal =
    document.getElementById(
      "guardianTechReveal"
    );

  const guardianTechButtons =
    document.querySelectorAll(
      ".guardian-tech-trigger"
    );

  const guardianTechOrder = [
    "steps",
    "thermal",
    "mask",
    "jam",
    "relay"
  ];

  let guardianTechProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_GUARDIAN_TECH
      ) || "0",
      10
    );

  const guardianTechTexts = {
    steps:
      "Hope entend plusieurs personnes dans la galerie avant que les appareils ne détectent quoi que ce soit.",

    thermal:
      "Peter ne reçoit pourtant aucune signature thermique sur ses capteurs.",

    mask:
      "L’équipe comprend que les Gardiens utilisent un système capable de masquer leur chaleur corporelle.",

    jam:
      "Quelques secondes plus tard, les drones et IA2 subissent également un brouillage direct.",

    relay:
      "Hale active alors le relais autonome prévu par Peter et rétablit une liaison minimale avec Awake."
  };

  updateOrderedButtons(
    guardianTechButtons,
    guardianTechProgress
  );

  guardianTechButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.guardianTech;

          const expected =
            guardianTechOrder[
              guardianTechProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          guardianTechProgress += 1;

          localStorage.setItem(
            STORAGE_GUARDIAN_TECH,
            String(guardianTechProgress)
          );

          updateOrderedButtons(
            guardianTechButtons,
            guardianTechProgress
          );

          setRevealHTML(
            guardianTechReveal,
            "<p>" +
            guardianTechTexts[selected] +
            "</p>"
          );

          playDarkSound();

          if (
            guardianTechProgress >= 5
          ) {

            setRevealHTML(
              guardianTechReveal,
              `
                <p>
                  Invisibles
                  à la thermique.
                </p>

                <p>
                  Capables de brouiller
                  les drones.
                </p>

                <p>
                  Mais Peter avait prévu
                  une liaison de secours.
                </p>

                <p class="impact-text">
                  LES GARDIENS
                  MAÎTRISENT LE TERRAIN.
                </p>
              `
            );

            showSecret(
              "guardian-stealth-tech",
              "Les Gardiens disposent d’un camouflage thermique et d’un système de brouillage capables de tromper les capteurs de Peter."
            );
          }
        }
      );
    });

  if (
    guardianTechProgress >= 5
  ) {
    setRevealHTML(
      guardianTechReveal,
      `
        <p class="impact-text">
          LES GARDIENS
          MAÎTRISENT LE TERRAIN.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 6
     MÊME ENTRAÎNEMENT
  ========================================================= */

  const sameTrainingReveal =
    document.getElementById(
      "sameTrainingReveal"
    );

  const sameTrainingButtons =
    document.querySelectorAll(
      ".same-training-trigger"
    );

  const sameTrainingOrder = [
    "stance",
    "breath",
    "block",
    "sequence",
    "origin"
  ];

  let sameTrainingProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_SAME_TRAINING
      ) || "0",
      10
    );

  const sameTrainingTexts = {
    stance:
      "Hope reconnaît immédiatement une position des pieds très proche de celle utilisée par Maître Lee.",

    breath:
      "Le Gardien utilise également la même manière de contrôler sa respiration pendant l’affrontement.",

    block:
      "Ses blocages répondent presque exactement aux techniques enseignées par les Sentinelles.",

    sequence:
      "L’enchaînement complet confirme qu’il ne s’agit pas d’une simple ressemblance.",

    origin:
      "Le Gardien affirme que leurs maîtres ont appris auprès des mêmes personnes."
  };

  updateOrderedButtons(
    sameTrainingButtons,
    sameTrainingProgress
  );

  sameTrainingButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.sameTraining;

          const expected =
            sameTrainingOrder[
              sameTrainingProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          sameTrainingProgress += 1;

          localStorage.setItem(
            STORAGE_SAME_TRAINING,
            String(sameTrainingProgress)
          );

          updateOrderedButtons(
            sameTrainingButtons,
            sameTrainingProgress
          );

          setRevealHTML(
            sameTrainingReveal,
            "<p>" +
            sameTrainingTexts[selected] +
            "</p>"
          );

          playRevealSound();

          if (
            sameTrainingProgress >= 5
          ) {

            setRevealHTML(
              sameTrainingReveal,
              `
                <p>Même position.</p>
                <p>Même respiration.</p>
                <p>Même logique de combat.</p>

                <p class="impact-text">
                  UNE MÊME ORIGINE.
                </p>
              `
            );

            showSecret(
              "same-combat-origin",
              "Les techniques de combat des Gardiens et des Sentinelles proviennent clairement d’un même enseignement ancien."
            );
          }
        }
      );
    });

  if (
    sameTrainingProgress >= 5
  ) {
    setRevealHTML(
      sameTrainingReveal,
      `
        <p class="impact-text">
          UNE MÊME ORIGINE.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 7
     MARQUE DE LUCY
  ========================================================= */

  const lucyMarkReveal =
    document.getElementById(
      "lucyMarkReveal"
    );

  const lucyMarkButtons =
    document.querySelectorAll(
      ".lucy-mark-trigger"
    );

  const lucyMarkOrder = [
    "appear",
    "breathe",
    "focus",
    "anticipate",
    "stable"
  ];

  let lucyMarkProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_LUCY_MARK
      ) || "0",
      10
    );

  const lucyMarkTexts = {
    appear:
      "La marque de Lucy apparaît naturellement pendant le combat.",

    breathe:
      "Cette fois, elle ne panique pas et reprend volontairement le contrôle de sa respiration.",

    focus:
      "La sensation se transforme en une concentration extrêmement précise.",

    anticipate:
      "Lucy perçoit le mouvement de son adversaire suffisamment tôt pour anticiper sa trajectoire.",

    stable:
      "La marque reste visible sans que Root ait besoin de la toucher."
  };

  updateOrderedButtons(
    lucyMarkButtons,
    lucyMarkProgress
  );

  lucyMarkButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.lucyMark;

          const expected =
            lucyMarkOrder[
              lucyMarkProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          lucyMarkProgress += 1;

          localStorage.setItem(
            STORAGE_LUCY_MARK,
            String(lucyMarkProgress)
          );

          updateOrderedButtons(
            lucyMarkButtons,
            lucyMarkProgress
          );

          setRevealHTML(
            lucyMarkReveal,
            "<p>" +
            lucyMarkTexts[selected] +
            "</p>"
          );

          playRevealSound();

          if (
            lucyMarkProgress >= 5
          ) {

            setRevealHTML(
              lucyMarkReveal,
              `
                <p>
                  Elle ne devient pas
                  plus forte.
                </p>

                <p>
                  Elle devient
                  plus précise.
                </p>

                <p class="impact-text">
                  ET LA MARQUE
                  RESTE.
                </p>
              `
            );

            showSecret(
              "lucy-controls-mark",
              "Lucy réussit désormais à maintenir seule sa marque et semble mieux comprendre sa fonction."
            );
          }
        }
      );
    });

  if (
    lucyMarkProgress >= 5
  ) {
    setRevealHTML(
      lucyMarkReveal,
      `
        <p class="impact-text">
          ET LA MARQUE RESTE.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 8
     ÉQUIPE COORDONNÉE
  ========================================================= */

  const teamSystemReveal =
    document.getElementById(
      "teamSystemReveal"
    );

  let teamSystemObserved =
    markStoredButtons(
      ".team-system-trigger",
      STORAGE_TEAM_SYSTEM,
      "teamSystem"
    );

  const teamSystemTexts = {
    root:
      "Root continue d’analyser les murs et repère une ouverture que les autres n’avaient pas remarquée.",

    hale:
      "Hale protège Root et Lucy tout en maintenant la ligne de défense.",

    peter:
      "Peter utilise un drone secondaire pour créer une diversion sonore dans une autre galerie.",

    phoenix:
      "Le Phénix attaque directement les dispositifs de brouillage fixés au plafond.",

    hope:
      "Hope exploite immédiatement chaque ouverture créée par les autres membres de l’équipe."
  };

  document
    .querySelectorAll(
      ".team-system-trigger"
    )
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          const type =
            button.dataset.teamSystem;

          teamSystemObserved =
            addStoredValue(
              STORAGE_TEAM_SYSTEM,
              type
            );

          button.classList.add(
            "completed"
          );

          setRevealHTML(
            teamSystemReveal,
            "<p>" +
            teamSystemTexts[type] +
            "</p>"
          );

          playAnalysisSound();

          if (
            teamSystemObserved.length >= 5
          ) {

            setRevealHTML(
              teamSystemReveal,
              `
                <p>Root observe.</p>
                <p>Hale protège.</p>
                <p>Peter détourne.</p>
                <p>Le Phénix ouvre la voie.</p>
                <p>Hope exploite chaque ouverture.</p>

                <p class="impact-text">
                  ILS COMMENCENT
                  À FONCTIONNER
                  COMME UN SYSTÈME.
                </p>
              `
            );

            showSecret(
              "team-system",
              "L’équipe ne repose plus seulement sur les capacités individuelles : chacun complète désormais les autres."
            );
          }
        }
      );
    });

  if (
    teamSystemObserved.length >= 5
  ) {
    setRevealHTML(
      teamSystemReveal,
      `
        <p class="impact-text">
          UN SEUL SYSTÈME.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 9
     DEUX FRESQUES
  ========================================================= */

  const twoFrescoesReveal =
    document.getElementById(
      "twoFrescoesReveal"
    );

  let twoFrescoesObserved =
    markStoredButtons(
      ".two-frescoes-trigger",
      STORAGE_TWO_FRESCOES,
      "twoFrescoes"
    );

  const twoFrescoesTexts = {
    hope:
      "Dans la grotte d’Hope, les sphères semblaient reliées entre elles par un réseau de passages.",

    guardian:
      "Dans le refuge des Gardiens, la structure générale est semblable mais la représentation change.",

    linked:
      "La première version évoque des mondes connectés et un équilibre possible.",

    dominated:
      "Ici, une silhouette centrale semble contrôler ou dominer les liens entre les sphères.",

    sentence:
      "Le texte lui-même a changé : l’Équilibre est remplacé par l’idée de contrôler le Pont pour dominer le passage."
  };

  document
    .querySelectorAll(
      ".two-frescoes-trigger"
    )
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          const type =
            button.dataset.twoFrescoes;

          twoFrescoesObserved =
            addStoredValue(
              STORAGE_TWO_FRESCOES,
              type
            );

          button.classList.add(
            "completed"
          );

          setRevealHTML(
            twoFrescoesReveal,
            "<p>" +
            twoFrescoesTexts[type] +
            "</p>"
          );

          playMemorySound();

          if (
            twoFrescoesObserved.length >= 5
          ) {

            setRevealHTML(
              twoFrescoesReveal,
              `
                <p>Même origine.</p>
                <p>Même passage.</p>

                <p>
                  Mais une interprétation
                  différente.
                </p>

                <p class="impact-text">
                  POUR LES GARDIENS,
                  LE PASSAGE
                  DOIT ÊTRE CONTRÔLÉ.
                </p>
              `
            );

            showSecret(
              "guardian-fresco-version",
              "Les Gardiens ont conservé une version du récit ancien où le passage n’est plus équilibré, mais dominé."
            );
          }
        }
      );
    });

  if (
    twoFrescoesObserved.length >= 5
  ) {
    setRevealHTML(
      twoFrescoesReveal,
      `
        <p class="impact-text">
          DEUX VERSIONS
          D’UNE MÊME HISTOIRE.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 10
     PONT / CLÉ
  ========================================================= */

  const bridgeControlReveal =
    document.getElementById(
      "bridgeControlReveal"
    );

  const bridgeControlButtons =
    document.querySelectorAll(
      ".bridge-control-trigger"
    );

  const bridgeControlOrder = [
    "bridge",
    "notdestroy",
    "bind",
    "key",
    "break"
  ];

  let bridgeControlProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_BRIDGE_CONTROL
      ) || "0",
      10
    );

  const bridgeControlTexts = {
    bridge:
      "Les inscriptions parlent directement du Pont, fonction désormais associée à Anna.",

    notdestroy:
      "Le texte est explicite : le Pont ne doit pas être détruit.",

    bind:
      "Il doit au contraire être lié, ce qui implique une forme de contrôle ou de dépendance.",

    key:
      "Le Pont doit être lié à celui qui possède la Clé, rôle associé à Hope.",

    break:
      "Si la Clé refuse, les Gardiens pensent qu’elle peut être brisée et peut-être remplacée."
  };

  updateOrderedButtons(
    bridgeControlButtons,
    bridgeControlProgress
  );

  bridgeControlButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.bridgeControl;

          const expected =
            bridgeControlOrder[
              bridgeControlProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          bridgeControlProgress += 1;

          localStorage.setItem(
            STORAGE_BRIDGE_CONTROL,
            String(bridgeControlProgress)
          );

          updateOrderedButtons(
            bridgeControlButtons,
            bridgeControlProgress
          );

          setRevealHTML(
            bridgeControlReveal,
            "<p>" +
            bridgeControlTexts[selected] +
            "</p>"
          );

          playDarkSound();

          if (
            bridgeControlProgress >= 5
          ) {

            setRevealHTML(
              bridgeControlReveal,
              `
                <p>
                  Le Pont
                  doit être conservé.
                </p>

                <p>Puis lié.</p>

                <p>
                  À celui
                  qui possède la Clé.
                </p>

                <p class="impact-text">
                  ANNA DOIT ÊTRE
                  CONTRÔLÉE.
                </p>

                <p class="emphasis">
                  Et selon leur croyance,
                  une Clé qui refuse
                  peut être brisée.
                </p>
              `
            );

            showSecret(
              "bridge-must-be-controlled",
              "Les textes des Gardiens indiquent qu’Anna ne doit pas être tuée : ils veulent contrôler le Pont et le lier à la Clé."
            );
          }
        }
      );
    });

  if (
    bridgeControlProgress >= 5
  ) {
    setRevealHTML(
      bridgeControlReveal,
      `
        <p class="impact-text">
          ANNA DOIT ÊTRE
          CONTRÔLÉE.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 11
     TABLETTE NOIRE
  ========================================================= */

  const blackTabletReveal =
    document.getElementById(
      "blackTabletReveal"
    );

  let blackTabletObserved =
    markStoredButtons(
      ".black-tablet-trigger",
      STORAGE_BLACK_TABLET,
      "blackTablet"
    );

  const blackTabletTexts = {
    niche:
      "Root repère une niche dissimulée dans la chambre basse.",

    mechanism:
      "Clive ouvre le mécanisme avec les indications de Peter, malgré son envie de prétendre qu’il savait déjà comment faire.",

    tablet:
      "À l’intérieur se trouve un petit artefact ressemblant à une tablette noire.",

    scan:
      "Lucy lance immédiatement un scan complet avec IA2.",

    unknown:
      "IA2 ne reconnaît ni le matériau, ni l’origine, ni la fonction de l’objet."
  };

  document
    .querySelectorAll(
      ".black-tablet-trigger"
    )
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          const type =
            button.dataset.blackTablet;

          blackTabletObserved =
            addStoredValue(
              STORAGE_BLACK_TABLET,
              type
            );

          button.classList.add(
            "completed"
          );

          setRevealHTML(
            blackTabletReveal,
            "<p>" +
            blackTabletTexts[type] +
            "</p>"
          );

          playMemorySound();

          if (
            blackTabletObserved.length >= 5
          ) {

            setRevealHTML(
              blackTabletReveal,
              `
                <p>
                  Aucun matériau connu.
                </p>

                <p>
                  Aucune fonction reconnue.
                </p>

                <p>
                  Aucun résultat IA2.
                </p>

                <p class="impact-text">
                  LA TABLETTE
                  RESTE INCONNUE.
                </p>
              `
            );

            showSecret(
              "black-tablet",
              "L’équipe récupère une tablette noire que même IA2 est incapable d’identifier."
            );
          }
        }
      );
    });

  if (
    blackTabletObserved.length >= 5
  ) {
    setRevealHTML(
      blackTabletReveal,
      `
        <p class="impact-text">
          INCONNUE.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 12
     FUITE DU REFUGE
  ========================================================= */

  const escapeRefugeReveal =
    document.getElementById(
      "escapeRefugeReveal"
    );

  const escapeRefugeButtons =
    document.querySelectorAll(
      ".escape-refuge-trigger"
    );

  const escapeRefugeOrder = [
    "charges",
    "ceiling",
    "crash",
    "exit",
    "hale"
  ];

  let escapeRefugeProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_ESCAPE_REFUGE
      ) || "0",
      10
    );

  const escapeRefugeTexts = {
    charges:
      "Peter détecte plusieurs charges activées presque simultanément dans la structure.",

    ceiling:
      "Le plafond commence à s’effondrer alors que l’équipe est encore dans la chambre basse.",

    crash:
      "Hope active une bulle Crash qui absorbe une partie des blocs pendant seulement quelques secondes.",

    exit:
      "Le Phénix, Root et les drones permettent de rejoindre une sortie secondaire.",

    hale:
      "Pendant la fuite, Hale révèle finalement une profonde coupure à la jambe."
  };

  updateOrderedButtons(
    escapeRefugeButtons,
    escapeRefugeProgress
  );

  escapeRefugeButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.escapeRefuge;

          const expected =
            escapeRefugeOrder[
              escapeRefugeProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          escapeRefugeProgress += 1;

          localStorage.setItem(
            STORAGE_ESCAPE_REFUGE,
            String(escapeRefugeProgress)
          );

          updateOrderedButtons(
            escapeRefugeButtons,
            escapeRefugeProgress
          );

          setRevealHTML(
            escapeRefugeReveal,
            "<p>" +
            escapeRefugeTexts[selected] +
            "</p>"
          );

          playDarkSound();

          if (
            escapeRefugeProgress >= 5
          ) {

            setRevealHTML(
              escapeRefugeReveal,
              `
                <p>Charges activées.</p>
                <p>Effondrement.</p>

                <p>
                  Trois secondes
                  de protection.
                </p>

                <p>
                  Une sortie secondaire.
                </p>

                <p class="impact-text">
                  HALE EST BLESSÉ.
                </p>
              `
            );

            showSecret(
              "refuge-collapse",
              "Le refuge était préparé pour s’effondrer après leur passage, mais l’équipe parvient à sortir avec l’artefact."
            );
          }
        }
      );
    });

  if (
    escapeRefugeProgress >= 5
  ) {
    setRevealHTML(
      escapeRefugeReveal,
      `
        <p class="impact-text">
          HALE EST BLESSÉ.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 13
     MENACE DE L’EFFACEUR
  ========================================================= */

  const eraserThreatReveal =
    document.getElementById(
      "eraserThreatReveal"
    );

  const eraserThreatButtons =
    document.querySelectorAll(
      ".eraser-threat-trigger"
    );

  const eraserThreatOrder = [
    "hope",
    "anna",
    "butcher",
    "choice",
    "awake"
  ];

  let eraserThreatProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_ERASER_THREAT
      ) || "0",
      10
    );

  const eraserThreatTexts = {
    hope:
      "Hope reçoit une photographie prise dans le canyon quelques instants auparavant.",

    anna:
      "La seconde photographie montre Anna devant une fenêtre de l’hacienda Awake.",

    butcher:
      "Un troisième message demande à Hope d’interroger Amy au sujet du Boucher.",

    choice:
      "Le message suivant transforme la surveillance en menace directe : laquelle des deux veut-elle sauver en premier ?",

    awake:
      "Betty éloigne Anna des fenêtres, Peter déploie les drones et Max verrouille immédiatement les accès."
  };

  updateOrderedButtons(
    eraserThreatButtons,
    eraserThreatProgress
  );

  eraserThreatButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.eraserThreat;

          const expected =
            eraserThreatOrder[
              eraserThreatProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          eraserThreatProgress += 1;

          localStorage.setItem(
            STORAGE_ERASER_THREAT,
            String(eraserThreatProgress)
          );

          updateOrderedButtons(
            eraserThreatButtons,
            eraserThreatProgress
          );

          setRevealHTML(
            eraserThreatReveal,
            "<p>" +
            eraserThreatTexts[selected] +
            "</p>"
          );

          playDarkSound();

          if (
            eraserThreatProgress >= 5
          ) {

            setRevealHTML(
              eraserThreatReveal,
              `
                <p>
                  Hope est surveillée.
                </p>

                <p>
                  Anna aussi.
                </p>

                <p>
                  Et l’Effaceur
                  connaît leur lien.
                </p>

                <p class="impact-text">
                  LA MENACE
                  EST DÉSORMAIS
                  PERSONNELLE.
                </p>
              `
            );

            showSecret(
              "eraser-targets-hope-anna",
              "L’Effaceur menace désormais directement Hope et Anna et démontre qu’il peut surveiller les deux groupes."
            );
          }
        }
      );
    });

  if (
    eraserThreatProgress >= 5
  ) {
    setRevealHTML(
      eraserThreatReveal,
      `
        <p class="impact-text">
          LA MENACE
          EST DÉSORMAIS
          PERSONNELLE.
        </p>
      `
    );
  }

  /* =========================================================
     INTERACTION 14
     AMY CHANGE DE CAMP
  ========================================================= */

  const amySwitchReveal =
    document.getElementById(
      "amySwitchReveal"
    );

  const amySwitchButtons =
    document.querySelectorAll(
      ".amy-switch-trigger"
    );

  const amySwitchOrder = [
    "photos",
    "eraser",
    "number",
    "hope",
    "help"
  ];

  let amySwitchProgress =
    parseInt(
      localStorage.getItem(
        STORAGE_AMY_SWITCH
      ) || "0",
      10
    );

  const amySwitchTexts = {
    photos:
      "Amy reçoit exactement les mêmes photographies d’Hope et d’Anna.",

    eraser:
      "Elle appelle immédiatement l’Effaceur et lui interdit de toucher à l’une ou l’autre.",

    number:
      "Après la coupure, Amy utilise un numéro qu’elle n’avait encore jamais employé.",

    hope:
      "Pour la première fois, elle contacte Hope directement au lieu de rester dans l’ombre.",

    help:
      "Amy avertit Hope que personne n’est en sécurité et lui annonce qu’elle va les aider à arrêter l’Effaceur."
  };

  updateOrderedButtons(
    amySwitchButtons,
    amySwitchProgress
  );

  amySwitchButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const selected =
            button.dataset.amySwitch;

          const expected =
            amySwitchOrder[
              amySwitchProgress
            ];

          if (selected !== expected) {
            flashWrong(button);
            return;
          }

          amySwitchProgress += 1;

          localStorage.setItem(
            STORAGE_AMY_SWITCH,
            String(amySwitchProgress)
          );

          updateOrderedButtons(
            amySwitchButtons,
            amySwitchProgress
          );

          setRevealHTML(
            amySwitchReveal,
            "<p>" +
            amySwitchTexts[selected] +
            "</p>"
          );

          playRevealSound();

          if (
            amySwitchProgress >= 5
          ) {

            setRevealHTML(
              amySwitchReveal,
              `
                <p>
                  Elle ne fuit plus.
                </p>

                <p>
                  Elle ne protège plus
                  Hope en secret.
                </p>

                <p>
                  Elle l’appelle.
                </p>

                <p class="impact-text">
                  ET ELLE CHOISIT
                  DE L’AIDER.
                </p>
              `
            );

            showSecret(
              "amy-changes-side",
              "Amy contacte directement Hope et décide ouvertement de l’aider contre l’Effaceur."
            );
          }
        }
      );
    });

  if (
    amySwitchProgress >= 5
  ) {
    setRevealHTML(
      amySwitchReveal,
      `
        <p class="impact-text">
          AMY VIENT
          DE CHANGER DE CAMP.
        </p>
      `
    );
  }

  /* =========================================================
     FIN DU CHAPITRE
  ========================================================= */

  const finalScene =
    document.getElementById(
      "scene-60"
    );

  if (
    finalScene &&
    "IntersectionObserver" in window
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
     SON D’AMBIANCE
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

    if (!AudioContextClass) return;

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
     GÉNÉRATEUR DE TONS
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
        audioCtx.currentTime + duration
      );

    oscillator
      .connect(gain)
      .connect(audioCtx.destination);

    oscillator.start();

    oscillator.stop(
      audioCtx.currentTime + duration
    );
  }

  /* =========================================================
     EFFETS SONORES
  ========================================================= */

  function playAnalysisSound() {
    playTone(
      480,
      0.45,
      0.018,
      "triangle"
    );

    setTimeout(function () {
      playTone(
        620,
        0.6,
        0.016,
        "sine"
      );
    }, 120);
  }

  function playDeductionSound() {
    playTone(
      390,
      0.4,
      0.017,
      "triangle"
    );

    setTimeout(function () {
      playTone(
        550,
        0.55,
        0.015,
        "sine"
      );
    }, 100);

    setTimeout(function () {
      playTone(
        720,
        0.75,
        0.012,
        "sine"
      );
    }, 220);
  }

  function playRevealSound() {
    playTone(
      420,
      0.65,
      0.022,
      "sine"
    );

    setTimeout(function () {
      playTone(
        640,
        0.8,
        0.018,
        "sine"
      );
    }, 150);

    setTimeout(function () {
      playTone(
        820,
        0.95,
        0.012,
        "triangle"
      );
    }, 300);
  }

  function playMemorySound() {
    playTone(
      330,
      0.75,
      0.016,
      "sine"
    );

    setTimeout(function () {
      playTone(
        440,
        0.9,
        0.014,
        "triangle"
      );
    }, 180);
  }

  function playDarkSound() {
    playTone(
      170,
      0.7,
      0.018,
      "sine"
    );

    setTimeout(function () {
      playTone(
        255,
        0.9,
        0.013,
        "triangle"
      );
    }, 150);
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

    setTimeout(function () {
      playTone(
        760,
        0.8,
        0.018,
        "sine"
      );
    }, 140);
  }

  /* =========================================================
     TOUCHE ÉCHAP
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
     SAUVEGARDE AVANT DE QUITTER
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
