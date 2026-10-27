/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 19 — LES QUATRE POINTS
   Version corrigée et nettoyée
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

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

  const STORAGE_PREFIX = "societeOmbre_chapitre19_";
  const STORAGE_SCROLL = STORAGE_PREFIX + "scroll";
  const STORAGE_PROGRESS = STORAGE_PREFIX + "progression";
  const STORAGE_COMPLETED = STORAGE_PREFIX + "termine";
  const STORAGE_SECRETS = STORAGE_PREFIX + "secrets";

  const STORAGE_ANCIENT_TEXTS = STORAGE_PREFIX + "ancientTexts";
  const STORAGE_PASSAGE_POINTS = STORAGE_PREFIX + "passagePoints";
  const STORAGE_INDECISE_ARCHIVES = STORAGE_PREFIX + "indeciseArchives";
  const STORAGE_ANNA_IDENTITY = STORAGE_PREFIX + "annaIdentity";
  const STORAGE_PROTECT_DECIDE = STORAGE_PREFIX + "protectDecide";
  const STORAGE_PANDORA_KEY = STORAGE_PREFIX + "pandoraKey";
  const STORAGE_PANDORA_FUNCTION = STORAGE_PREFIX + "pandoraFunction";
  const STORAGE_ROOT_LUCY_REACTION = STORAGE_PREFIX + "rootLucyReaction";
  const STORAGE_LUCY_ANCHOR = STORAGE_PREFIX + "lucyAnchor";
  const STORAGE_FOUR_FUNCTIONS = STORAGE_PREFIX + "fourFunctions";
  const STORAGE_SPHERE_MAP = STORAGE_PREFIX + "sphereMap";
  const STORAGE_ROUTE_ANCHOR = STORAGE_PREFIX + "routeAnchor";
  const STORAGE_BLACK_FOUR = STORAGE_PREFIX + "blackFour";
  const STORAGE_TWO_WAY = STORAGE_PREFIX + "twoWay";

  if (localStorage.getItem("societeOmbre_chapitre19_finished") === "1") {
    localStorage.setItem(STORAGE_COMPLETED, "1");
  }

  const urlParams = new URLSearchParams(window.location.search);
  const lectureMode = urlParams.get("lecture");

  /* =========================================================
     OUTILS
  ========================================================= */

  function getStoredArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : [];
    } catch {
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

  function setRevealHTML(reveal, html) {
    if (!reveal) return;
    reveal.innerHTML = html;
    reveal.classList.add("open");
  }

  function updateOrderedButtons(buttons, progress) {
    buttons.forEach((button, index) => {
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

  /* =========================================================
     IMAGES MANQUANTES
  ========================================================= */

  document.querySelectorAll(".visual img").forEach((img) => {
    img.addEventListener("error", () => {
      const visual = img.closest(".visual");
      if (visual) visual.classList.add("visual-missing");
    });
  });

  /* =========================================================
     APPARITION DES SCÈNES
  ========================================================= */

  function animateParagraphs(scene) {
    if (scene.dataset.textAnimated === "1") return;

    scene.dataset.textAnimated = "1";
    const paragraphs = scene.querySelectorAll(".text-block p");

    paragraphs.forEach((paragraph, index) => {
      paragraph.style.opacity = "0";
      paragraph.style.transform = "translateY(12px)";

      setTimeout(() => {
        paragraph.animate(
          [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          {
            duration: 650,
            easing: "ease-out",
            fill: "forwards"
          }
        );
      }, index * 105);
    });
  }

  const sceneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const scene = entry.target;
          scene.classList.add("is-visible");
          animateParagraphs(scene);
          localStorage.setItem(STORAGE_PROGRESS, "1");
        }
      });
    },
    { threshold: 0.14 }
  );

  scenes.forEach((scene) => sceneObserver.observe(scene));

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
      Math.max(0, (window.scrollY / documentHeight) * 100)
    );

    progressFill.style.width = percentage + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* =========================================================
     SAUVEGARDE / REPRISE
  ========================================================= */

  let saveScrollTimer = null;

  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(saveScrollTimer);

      saveScrollTimer = setTimeout(() => {
        localStorage.setItem(STORAGE_SCROLL, Math.round(window.scrollY));
        localStorage.setItem(STORAGE_PROGRESS, "1");
      }, 250);
    },
    { passive: true }
  );

  if (lectureMode === "reprendre") {
    const savedPosition = parseInt(localStorage.getItem(STORAGE_SCROLL), 10);

    if (!Number.isNaN(savedPosition) && savedPosition > 0) {
      setTimeout(() => {
        window.scrollTo({
          top: savedPosition,
          left: 0,
          behavior: "auto"
        });

        updateProgress();
      }, 400);
    }
  }

  if (lectureMode === "recommencer") {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
      });

      updateProgress();
    }, 100);
  }

  /* =========================================================
     BOUTON CONTINUER
  ========================================================= */

  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentScene = button.closest(".scene");
      if (!currentScene) return;

      const nextScene = currentScene.nextElementSibling;

      if (nextScene) {
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

  menuBtn?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);

  chapterMenu?.addEventListener("click", (event) => {
    if (event.target === chapterMenu) {
      closeMenu();
    }
  });

  resumeBtn?.addEventListener("click", () => {
    closeMenu();

    const position = parseInt(localStorage.getItem(STORAGE_SCROLL), 10);

    if (!Number.isNaN(position)) {
      window.scrollTo({
        top: position,
        behavior: "smooth"
      });
    }
  });

  function restartChapterFunction() {
    const keysToDelete = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => {
      localStorage.removeItem(key);
    });

    window.location.href = "chapitre19.html?lecture=recommencer";
  }

  restartBtn?.addEventListener("click", restartChapterFunction);
  restartChapter?.addEventListener("click", restartChapterFunction);

  /* =========================================================
     SECRETS
  ========================================================= */

  function getSecrets() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_SECRETS));
      return Array.isArray(value) ? value : [];
    } catch {
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

  let secretTimer = null;

  function hideSecretPopup() {
    if (!secretPopup) return;

    secretPopup.classList.remove("show");
    secretPopup.setAttribute("aria-hidden", "true");
  }

  function showSecret(secretName, secretText) {
    saveSecret(secretName);

    if (!secretPopup) return;

    const inner =
      secretPopup.querySelector(".secret-popup-inner");

    if (!inner) return;

    let description =
      inner.querySelector(".secret-description");

    if (!description) {
      description = document.createElement("p");

      description.className = "secret-description";
      description.style.marginTop = "14px";
      description.style.fontSize = "15px";
      description.style.lineHeight = "1.55";
      description.style.letterSpacing = "0";
      description.style.color = "#f4eee6";

      inner.appendChild(description);
    }

    description.textContent = secretText;

    secretPopup.classList.add("show");
    secretPopup.setAttribute("aria-hidden", "false");

    playSecretSound();

    clearTimeout(secretTimer);

    secretTimer =
      setTimeout(
        hideSecretPopup,
        3200
      );
  }

  /* =========================================================
     INTERACTIONS LIBRES
  ========================================================= */

  function setupFreeInteraction({
    selector,
    datasetName,
    storageKey,
    revealId,
    texts,
    required,
    finalHTML,
    secretName = null,
    secretText = null,
    sound = playAnalysisSound
  }) {
    const reveal =
      document.getElementById(revealId);

    let observed =
      getStoredArray(storageKey);

    const buttons =
      document.querySelectorAll(selector);

    buttons.forEach((button) => {

      if (
        observed.includes(
          button.dataset[datasetName]
        )
      ) {
        button.classList.add("completed");
      }

      button.addEventListener(
        "click",
        () => {

          const type =
            button.dataset[datasetName];

          observed =
            addStoredValue(
              storageKey,
              type
            );

          button.classList.add(
            "completed"
          );

          setRevealHTML(
            reveal,
            `
              <p>
                ${texts[type] || ""}
              </p>
            `
          );

          sound();

          if (
            observed.length >= required
          ) {

            setRevealHTML(
              reveal,
              finalHTML
            );

            if (
              secretName &&
              secretText
            ) {

              showSecret(
                secretName,
                secretText
              );
            }
          }
        }
      );
    });

    if (
      observed.length >= required
    ) {
      setRevealHTML(
        reveal,
        finalHTML
      );
    }
  }

  /* =========================================================
     INTERACTIONS ORDONNÉES
  ========================================================= */

  function setupOrderedInteraction({
    selector,
    datasetName,
    storageKey,
    revealId,
    order,
    texts,
    finalHTML,
    secretName = null,
    secretText = null,
    sound = playRevealSound
  }) {
    const reveal =
      document.getElementById(revealId);

    const buttons =
      document.querySelectorAll(selector);

    let progress =
      parseInt(
        localStorage.getItem(storageKey) || "0",
        10
      );

    if (
      !Number.isFinite(progress) ||
      progress < 0
    ) {
      progress = 0;
    }

    if (
      progress > order.length
    ) {
      progress = order.length;
    }

    updateOrderedButtons(
      buttons,
      progress
    );

    if (
      progress >= order.length
    ) {
      setRevealHTML(
        reveal,
        finalHTML
      );
    }

    buttons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const selected =
            button.dataset[datasetName];

          const expected =
            order[progress];

          if (
            selected !== expected
          ) {

            button.classList.add(
              "wrong"
            );

            playWrongSound();

            setTimeout(
              () => {

                button.classList.remove(
                  "wrong"
                );

              },
              650
            );

            return;
          }

          progress++;

          localStorage.setItem(
            storageKey,
            String(progress)
          );

          updateOrderedButtons(
            buttons,
            progress
          );

          setRevealHTML(
            reveal,
            `
              <p>
                ${texts[selected] || ""}
              </p>
            `
          );

          sound();

          if (
            progress >= order.length
          ) {

            setRevealHTML(
              reveal,
              finalHTML
            );

            if (
              secretName &&
              secretText
            ) {

              showSecret(
                secretName,
                secretText
              );
            }
          }
        }
      );
    });
  }

  /* =========================================================
     INTERACTION 1
     LES ANCIENS TEXTES
  ========================================================= */

  setupFreeInteraction({
    selector:
      ".ancient-texts-trigger",

    datasetName:
      "ancientTexts",

    storageKey:
      STORAGE_ANCIENT_TEXTS,

    revealId:
      "ancientTextsReveal",

    required:
      5,

    sound:
      playAnalysisSound,

    texts: {

      fragments:
        "Les textes conservés par les Sentinelles ne sont pas complets. Il ne reste que des fragments.",

      masters:
        "Ces fragments ont été transmis de maître à maître pendant des générations.",

      before:
        "Certains remontent à une époque antérieure à la séparation des Sentinelles et des Gardiens Noirs.",

      versions:
        "Les deux ordres possèdent donc probablement des versions différentes d’un même savoir originel.",

      missing:
        "Les Gardiens pourraient posséder des passages que les Sentinelles ont perdus ou volontairement abandonnés."

    },

    finalHTML:
      `
        <p>
          Un même savoir.
        </p>

        <p>
          Deux ordres.
        </p>

        <p>
          Deux transmissions différentes.
        </p>

        <p class="impact-text">
          ET DES PARTIES MANQUANTES.
        </p>
      `,

    secretName:
      "ancient-texts-split",

    secretText:
      "Les Sentinelles et les Gardiens possèdent probablement des fragments différents d’un même savoir ancien."

  });

  /* =========================================================
     INTERACTION 2
     LES PLUSIEURS POINTS
  ========================================================= */

  setupOrderedInteraction({
    selector:
      ".passage-points-trigger",

    datasetName:
      "passagePoints",

    storageKey:
      STORAGE_PASSAGE_POINTS,

    revealId:
      "passagePointsReveal",

    order: [
      "old",
      "same",
      "points",
      "structure",
      "sync"
    ],

    sound:
      playDeductionSound,

    texts: {

      old:
        "Les fragments décrivent un passage dont le fonctionnement est plus ancien que la division entre les deux ordres.",

      same:
        "Sentinelles et Gardiens ont donc hérité d’une même théorie du passage.",

      points:
        "Une règle ressort clairement : un passage ne peut exister qu’entre plusieurs points.",

      structure:
        "Peter envisage qu’il puisse s’agir d’une structure reliant plusieurs éléments.",

      sync:
        "Une autre possibilité apparaît : ces différents points doivent peut-être être synchronisés."

    },

    finalHTML:
      `
        <p>
          Une première règle
          vient d’être confirmée.
        </p>

        <p class="impact-text">
          LE PASSAGE EXIGE
          PLUSIEURS POINTS.
        </p>

        <p class="emphasis">
          Leur rôle reste encore
          à comprendre.
        </p>
      `,

    secretName:
      "passage-multiple-points",

    secretText:
      "Les anciens textes affirment qu’un passage ne peut exister qu’entre plusieurs points."

  });

  /* =========================================================
     INTERACTION 3
     L’INDÉCISE DANS LES ARCHIVES
  ========================================================= */

  setupFreeInteraction({
    selector:
      ".indecise-archives-trigger",

    datasetName:
      "indeciseArchives",

    storageKey:
      STORAGE_INDECISE_ARCHIVES,

    revealId:
      "indeciseArchivesReveal",

    required:
      5,

    sound:
      playAnalysisSound,

    texts: {

      trapdoor:
        "La trappe de l’exploitation a été analysée après le retour du groupe.",

      material:
        "Le matériau noir récupéré précédemment reste difficile à identifier précisément.",

      archives:
        "Les recherches croisées font apparaître des références dans plusieurs archives anciennes.",

      symbol:
        "Le symbole de l’Indécise apparaît bien avant l’époque de Lucy.",

      awake:
        "Lucy décide donc de rejoindre Hacienda Awake pour confronter cette découverte aux recherches sur la clé."

    },

    finalHTML:
      `
        <p>
          La gravure n’était pas
          un hasard.
        </p>

        <p>
          Le symbole existe
          dans des archives anciennes.
        </p>

        <p class="impact-text">
          L’INDÉCISE
          EXISTAIT AVANT LUCY.
        </p>
      `,

    secretName:
      "indecise-old-archives",

    secretText:
      "Le symbole de l’Indécise apparaît dans plusieurs archives bien antérieures à Lucy."

  });

  /* =========================================================
     INTERACTION 4
     ANNA REFUSE D’ÊTRE UNE FONCTION
  ========================================================= */

  setupFreeInteraction({
    selector:
      ".anna-identity-trigger",

    datasetName:
      "annaIdentity",

    storageKey:
      STORAGE_ANNA_IDENTITY,

    revealId:
      "annaIdentityReveal",

    required:
      5,

    sound:
      playWarmSound,

    texts: {

      bridge:
        "Depuis plusieurs jours, Anna entend constamment qu’elle pourrait être le Pont.",

      balance:
        "Elle a également été associée à l’idée d’Équilibre, malgré le refus d’Hope d’en faire une définition.",

      blood:
        "Son origine est désormais liée publiquement, dans le groupe, au sang ancien utilisé par Betty.",

      marks:
        "Sa naissance semble avoir déclenché des marques et des réactions chez plusieurs personnes.",

      anna:
        "Au milieu de toutes ces fonctions, Anna a peur que personne ne voie encore simplement la personne qu’elle est."

    },

    finalHTML:
      `
        <p>
          Pont.
        </p>

        <p>
          Équilibre.
        </p>

        <p>
          Sang ancien.
        </p>

        <p>
          Déclencheur.
        </p>

        <p class="impact-text">
          MAIS ELLE VEUT
          ÊTRE JUSTE ANNA.
        </p>
      `,

    secretName:
      "anna-identity",

    secretText:
      "Anna refuse que son rôle possible dans le passage devienne son identité."

  });

  /* =========================================================
     INTERACTION 5
     PROTÉGER / DÉCIDER
  ========================================================= */

  setupOrderedInteraction({
    selector:
      ".protect-decide-trigger",

    datasetName:
      "protectDecide",

    storageKey:
      STORAGE_PROTECT_DECIDE,

    revealId:
      "protectDecideReveal",

    order: [
      "protect",
      "decide",
      "freedom",
      "fear",
      "love"
    ],

    sound:
      playWarmSound,

    texts: {

      protect:
        "Betty a consacré sa vie à protéger Anna, mais cette protection a parfois dépassé les limites nécessaires.",

      decide:
        "Protéger quelqu’un ne donne pas automatiquement le droit de décider à sa place.",

      freedom:
        "Anna doit pouvoir choisir, mais sa liberté ne l’oblige pas à rejeter toute prudence.",

      fear:
        "Hope leur demande de cesser de chercher laquelle a raison et de comprendre ce dont chacune a peur.",

      love:
        "Sans cela, leur amour pourrait devenir le terrain même de leur conflit."

    },

    finalHTML:
      `
        <p>
          Betty a peur
          de perdre Anna.
        </p>

        <p>
          Anna a peur
          de disparaître derrière
          ce qu’on attend d’elle.
        </p>

        <p class="impact-text">
          PROTÉGER
          N’EST PAS DÉCIDER.
        </p>
      `,

    secretName:
      "protect-versus-decide",

    secretText:
      "Hope identifie le vrai conflit entre Betty et Anna : protéger quelqu’un n’est pas décider à sa place."

  });

  /* =========================================================
     INTERACTION 6
     PANDORE RÉAGIT À LA CLÉ
  ========================================================= */

  setupOrderedInteraction({
    selector:
      ".pandora-key-trigger",

    datasetName:
      "pandoraKey",

    storageKey:
      STORAGE_PANDORA_KEY,

    revealId:
      "pandoraKeyReveal",

    order: [
      "touch",
      "heat",
      "change",
      "symbols",
      "pandora"
    ],

    sound:
      playRevealSound,

    texts: {

      touch:
        "Root pose deux doigts sur la clé pour tester sa réaction.",

      heat:
        "La marque de Pandore chauffe immédiatement sous son vêtement.",

      change:
        "La structure de la clé se modifie légèrement sous les capteurs de Peter.",

      symbols:
        "Trois symboles deviennent visibles : celui d’Hope, celui associé à Anna et un troisième motif plus complexe.",

      pandora:
        "Root reconnaît ce dernier motif : il correspond à la marque de Pandore."

    },

    finalHTML:
      `
        <p>
          Hope.
        </p>

        <p>
          Anna.
        </p>

        <p>
          Puis Root.
        </p>

        <p class="impact-text">
          PANDORE
          FAIT PARTIE DU MÉCANISME.
        </p>
      `,

    secretName:
      "pandora-part-of-key",

    secretText:
      "La clé reconnaît également la marque de Pandore portée par Root."

  });

  /* =========================================================
     INTERACTION 7
     FONCTION DE PANDORE
  ========================================================= */

  setupFreeInteraction({
    selector:
      ".pandora-function-trigger",

    datasetName:
      "pandoraFunction",

    storageKey:
      STORAGE_PANDORA_FUNCTION,

    revealId:
      "pandoraFunctionReveal",

    required:
      4,

    sound:
      playMemorySound,

    texts: {

      memory:
        "Pandore a longtemps été interprétée comme une forme de mémoire.",

      container:
        "Une autre tradition la décrit comme un réceptacle capable de conserver quelque chose.",

      witness:
        "Maître Lee évoque aussi la possibilité d’un témoin : quelque chose qui conserve la trace d’un savoir.",

      direction:
        "La réaction de la clé suggère désormais une autre fonction : Root pourrait indiquer une direction."

    },

    finalHTML:
      `
        <p>
          Mémoire.
        </p>

        <p>
          Réceptacle.
        </p>

        <p>
          Témoin.
        </p>

        <p class="impact-text">
          OU DIRECTION.
        </p>
      `,

    secretName:
      "pandora-direction",

    secretText:
      "La fonction de Pandore pourrait être de guider le passage vers une destination."

  });

  /* =========================================================
     INTERACTION 8
     ROOT / LUCY
  ========================================================= */

  setupFreeInteraction({
    selector:
      ".root-lucy-reaction-trigger",

    datasetName:
      "rootLucyReaction",

    storageKey:
      STORAGE_ROOT_LUCY_REACTION,

    revealId:
      "rootLucyReactionReveal",

    required:
      5,

    sound:
      playWarmSound,

    texts: {

      wait:
        "Root attend Lucy avant même qu’elle sorte de son véhicule.",

      touch:
        "Root prend presque machinalement le bras de Lucy.",

      heat:
        "La marque de Lucy chauffe immédiatement au contact de Root.",

      stronger:
        "Cette fois, la réaction est plus nette que lors de leurs précédents contacts.",

      stay:
        "Lucy ne retire pas immédiatement son bras, malgré la chaleur et l’étrangeté du phénomène."

    },

    finalHTML:
      `
        <p>
          Encore une réaction.
        </p>

        <p>
          Plus forte.
        </p>

        <p>
          Toujours au contact
          de Root.
        </p>

        <p class="impact-text">
          CE N’EST PLUS
          UNE COÏNCIDENCE.
        </p>
      `

  });

  /* =========================================================
     INTERACTION 9
     LUCY = L’ANCRE
  ========================================================= */

  setupOrderedInteraction({
    selector:
      ".lucy-anchor-trigger",

    datasetName:
      "lucyAnchor",

    storageKey:
      STORAGE_LUCY_ANCHOR,

    revealId:
      "lucyAnchorReveal",

    order: [
      "before",
      "approach",
      "three",
      "fourth",
      "anchor"
    ],

    sound:
      playRevealSound,

    texts: {

      before:
        "La marque de Lucy commence à chauffer avant même qu’elle touche la clé.",

      approach:
        "Lucy s’approche malgré sa méfiance et tend finalement la main.",

      three:
        "Les trois symboles déjà révélés réagissent immédiatement à sa présence.",

      fourth:
        "Un quatrième symbole apparaît : un cercle partagé en deux, à la fois sombre et clair.",

      anchor:
        "Maître Lee reconnaît sa fonction : l’Ancrage."

    },

    finalHTML:
      `
        <p>
          Un quatrième symbole.
        </p>

        <p>
          Ni noir.
        </p>

        <p>
          Ni clair.
        </p>

        <p class="impact-text">
          L’ANCRE.
        </p>
      `,

    secretName:
      "lucy-anchor",

    secretText:
      "Lucy représente l’Ancre, la quatrième fonction nécessaire au passage."

  });

  /* =========================================================
     INTERACTION 10
     LES QUATRE FONCTIONS
  ========================================================= */

  setupOrderedInteraction({
    selector:
      ".four-functions-trigger",

    datasetName:
      "fourFunctions",

    storageKey:
      STORAGE_FOUR_FUNCTIONS,

    revealId:
      "fourFunctionsReveal",

    order: [
      "hope",
      "anna",
      "root",
      "lucy",
      "four"
    ],

    sound:
      playRevealSound,

    texts: {

      hope:
        "Hope représente la Clé : elle déclenche l’ouverture du mécanisme.",

      anna:
        "Anna représente le Pont : elle permet la liaison entre les différents points.",

      root:
        "Root représente la Mémoire, mais sa fonction semble aussi déterminer la direction.",

      lucy:
        "Lucy représente l’Ancre : elle empêche le passage de se refermer ou de devenir instable.",

      four:
        "Clé, Pont, Mémoire et Ancre forment ensemble les quatre fonctions décrites dans les anciens textes."

    },

    finalHTML:
      `
        <p class="name-reveal">
          LA CLÉ
        </p>

        <p class="name-reveal">
          LE PONT
        </p>

        <p class="name-reveal">
          LA MÉMOIRE
        </p>

        <p class="name-reveal">
          L’ANCRE
        </p>

        <p class="impact-text">
          QUATRE FONCTIONS.
          QUATRE PERSONNES.
        </p>
      `,

    secretName:
      "four-functions",

    secretText:
      "Hope, Anna, Root et Lucy correspondent aux quatre fonctions nécessaires au passage : Clé, Pont, Mémoire et Ancre."

  });

  /* =========================================================
     INTERACTION 11
     LA CARTE DE SPHÈRES
  ========================================================= */

  setupFreeInteraction({
    selector:
      ".sphere-map-trigger",

    datasetName:
      "sphereMap",

    storageKey:
      STORAGE_SPHERE_MAP,

    revealId:
      "sphereMapReveal",

    required:
      5,

    sound:
      playRevealSound,

    texts: {

      responses:
        "Les quatre personnes provoquent chacune une réponse différente de la clé.",

      signatures:
        "Peter remarque que ces quatre réponses sont distinctes mais complémentaires, comme les signatures biologiques d’Hope et Anna.",

      projection:
        "Lorsque Root touche la clé, l’objet projette une structure directement dans l’air.",

      spheres:
        "La structure contient des dizaines de sphères de tailles et de luminosités différentes.",

      links:
        "Des filaments relient certaines sphères entre elles, comme un réseau de chemins possibles."

    },

    finalHTML:
      `
        <p>
          Des dizaines
          de sphères.
        </p>

        <p>
          Des filaments.
        </p>

        <p>
          Des chemins.
        </p>

        <p class="impact-text">
          UNE CARTE ?
        </p>

        <p class="emphasis">
          Planètes,
          mondes,
          lieux…
          impossible encore
          de le savoir.
        </p>
      `,

    secretName:
      "sphere-map",

    secretText:
      "La clé peut projeter une structure composée de sphères reliées, semblable aux fresques vues par Hope dans la grotte."

  });

  /* =========================================================
     INTERACTION 12
     ROOT CHOISIT / LUCY STABILISE
  ========================================================= */

  setupOrderedInteraction({
    selector:
      ".route-anchor-trigger",

    datasetName:
      "routeAnchor",

    storageKey:
      STORAGE_ROUTE_ANCHOR,

    revealId:
      "routeAnchorReveal",

    order: [
      "anna",
      "hope",
      "root",
      "choice",
      "lucy"
    ],

    sound:
      playRevealSound,

    texts: {

      anna:
        "La ligne entre deux sphères réagit lorsque Anna s’approche.",

      hope:
        "Hope provoque elle aussi une réponse de la structure.",

      root:
        "Quand Root pose la main sur la clé, la trajectoire entre les sphères se modifie.",

      choice:
        "Root comprend qu’elle ne se contente pas de lire la carte : elle semble sélectionner la destination.",

      lucy:
        "Lorsque Lucy pose sa main, la projection cesse de trembler et les lignes deviennent parfaitement nettes."

    },

    finalHTML:
      `
        <p>
          Root modifie
          la trajectoire.
        </p>

        <p>
          Lucy empêche
          la structure
          de s’effondrer.
        </p>

        <p class="impact-text">
          DIRECTION
          ET STABILISATION.
        </p>
      `,

    secretName:
      "direction-stabilization",

    secretText:
      "Root semble choisir la destination du passage tandis que Lucy stabilise la structure."

  });

  /* =========================================================
     INTERACTION 13
     LE MAÎTRE NOIR CONNAÎT LES QUATRE
  ========================================================= */

  setupOrderedInteraction({
    selector:
      ".black-four-trigger",

    datasetName:
      "blackFour",

    storageKey:
      STORAGE_BLACK_FOUR,

    revealId:
      "blackFourReveal",

    order: [
      "key",
      "bridge",
      "memory",
      "anchor",
      "danger"
    ],

    sound:
      playDarkSound,

    texts: {

      key:
        "Le Maître Noir reconnaît immédiatement le symbole de la Clé.",

      bridge:
        "Il identifie également le Pont sans hésitation.",

      memory:
        "La Mémoire lui est tout aussi familière.",

      anchor:
        "Il connaît aussi l’Ancre, preuve qu’il possède des informations importantes sur les quatre fonctions.",

      danger:
        "Mais il affirme que personne ne sait encore ce qui pourrait être attiré lorsque le passage sera ouvert."

    },

    finalHTML:
      `
        <p>
          Il connaît
          les quatre fonctions.
        </p>

        <p>
          Mais pas
          ce qui se trouve
          de l’autre côté.
        </p>

        <p class="impact-text">
          ET CELA
          NE L’EFFRAIE PAS.
        </p>
      `,

    secretName:
      "master-black-four-functions",

    secretText:
      "Le Maître Noir connaît déjà les quatre fonctions, mais lui non plus ne sait pas ce que le passage pourrait attirer."

  });

  /* =========================================================
     INTERACTION 14
     LE PASSAGE DANS LES DEUX SENS
  ========================================================= */

  setupOrderedInteraction({
    selector:
      ".two-way-trigger",

    datasetName:
      "twoWay",

    storageKey:
      STORAGE_TWO_WAY,

    revealId:
      "twoWayReveal",

    order: [
      "first",
      "second",
      "third",
      "return",
      "vibration"
    ],

    sound:
      playDarkSound,

    texts: {

      first:
        "Root active seule la clé et voit apparaître une première sphère.",

      second:
        "Une deuxième sphère se matérialise à proximité.",

      third:
        "Une troisième apparaît ensuite, inconnue de Root et absente de la projection précédente.",

      return:
        "Une ligne se forme, mais elle ne part pas de leur sphère : elle semble revenir vers elle.",

      vibration:
        "Après que Root s’est éloignée, la clé recommence à vibrer toute seule."

    },

    finalHTML:
      `
        <p>
          Jusqu’ici,
          ils pensaient
          pouvoir aller ailleurs.
        </p>

        <p>
          Ils n’avaient pas envisagé
          l’inverse.
        </p>

        <p class="impact-text">
          QUELQUE CHOSE
          POURRAIT AUSSI
          VENIR JUSQU’À EUX.
        </p>
      `,

    secretName:
      "two-way-passage",

    secretText:
      "Le passage semble pouvoir fonctionner dans les deux sens : quelque chose pourrait également venir jusqu’à leur monde."

  });

  /* =========================================================
     FIN DU CHAPITRE
  ========================================================= */

  const finalScene =
    document.getElementById(
      "scene-52"
    );

  if (finalScene) {

    const endObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

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
          threshold: 0.5
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
      39;

    gain1.gain.value =
      0.62;

    ambienceOsc2.type =
      "triangle";

    ambienceOsc2.frequency.value =
      77;

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

    const gain =
      masterGain;

    if (gain) {

      try {

        gain.gain
          .exponentialRampToValueAtTime(
            0.0001,
            ctx.currentTime + 0.35
          );

      } catch {}

    }

    audioCtx =
      null;

    masterGain =
      null;

    ambienceOsc1 =
      null;

    ambienceOsc2 =
      null;

    soundActive =
      false;

    if (soundBtn) {

      soundBtn.classList.remove(
        "sound-active"
      );

      soundBtn.textContent =
        "♫";

    }

    setTimeout(
      () => {

        try {
          osc1?.stop();
        } catch {}

        try {
          osc2?.stop();
        } catch {}

        try {
          ctx?.close();
        } catch {}

      },
      450
    );

  }

  soundBtn?.addEventListener(
    "click",
    () => {

      if (soundActive) {

        stopSound();

      } else {

        startSound();

      }

    }
  );

  /* =========================================================
     GÉNÉRATEUR DE TONS
  ========================================================= */

  function playTone(
    frequency,
    duration,
    volume = 0.04,
    type = "sine"
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
      type;

    oscillator.frequency.value =
      frequency;

    gain.gain.setValueAtTime(
      volume,
      audioCtx.currentTime
    );

    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + duration
      );

    oscillator
      .connect(gain)
      .connect(
        audioCtx.destination
      );

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
      490,
      0.45,
      0.018,
      "triangle"
    );

    setTimeout(
      () => {

        playTone(
          620,
          0.6,
          0.016
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
      () => {

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
      () => {

        playTone(
          720,
          0.75,
          0.012
        );

      },
      220
    );

  }

  function playWarmSound() {

    playTone(
      420,
      0.5,
      0.017,
      "sine"
    );

    setTimeout(
      () => {

        playTone(
          560,
          0.7,
          0.014,
          "triangle"
        );

      },
      130
    );

  }

  function playRevealSound() {

    playTone(
      420,
      0.65,
      0.022
    );

    setTimeout(
      () => {

        playTone(
          640,
          0.8,
          0.018
        );

      },
      150
    );

    setTimeout(
      () => {

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
      () => {

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
      () => {

        playTone(
          260,
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
      0.022
    );

    setTimeout(
      () => {

        playTone(
          760,
          0.8,
          0.018
        );

      },
      140
    );

  }

  /* =========================================================
     TOUCHE ÉCHAP
  ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

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
    () => {

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
        Math.round(
          window.scrollY
        )
      );

      localStorage.setItem(
        STORAGE_PROGRESS,
        "1"
      );

    }
  );

  /* =========================================================
     PREMIÈRE SCÈNE
  ========================================================= */

  const firstScene =
    document.querySelector(
      ".scene"
    );

  if (firstScene) {

    setTimeout(
      () => {

        firstScene.classList.add(
          "is-visible"
        );

      },
      100
    );

  }

});
