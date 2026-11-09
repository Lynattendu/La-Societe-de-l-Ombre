
/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 23 — LE DISPOSITIF
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

  const STORAGE_PREFIX = "societeOmbre_chapitre23_";
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
    const secrets = getStoredArray(STORAGE_SECRETS);

    if (!secrets.includes(secret)) {
      secrets.push(secret);
      saveStoredArray(STORAGE_SECRETS, secrets);
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

    const inner = secretPopup.querySelector(".secret-popup-inner");

    if (!inner) return;

    let description = inner.querySelector(".secret-description");

    if (!description) {
      description = document.createElement("p");
      description.className = "secret-description";
      inner.appendChild(description);
    }

    description.textContent = secretText;

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
     INTERACTIONS ORDONNÉES
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
      progress >=
        config.order.length &&
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
  }

  /* =========================================================
     INTERACTIONS LIBRES
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
      "chapitre23.html?lecture=recommencer";
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
     ASSEMBLER LES FRAGMENTS
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".fragments-trigger",

    dataKey:
      "fragments",

    revealId:
      "fragmentsReveal",

    storage:
      "fragments",

    order: [
      "first",
      "second",
      "breaks",
      "lines",
      "plate"
    ],

    texts: {

      first:
        "Root isole un premier fragment dont la forme semble irrégulière mais travaillée.",

      second:
        "Un deuxième fragment présente une cassure qui pourrait prolonger la première.",

      breaks:
        "Peter superpose les cassures et révèle une correspondance presque parfaite entre plusieurs morceaux.",

      lines:
        "Les lignes gravées se poursuivent d’un fragment à l’autre, preuve qu’elles appartenaient au même ensemble.",

      plate:
        "La grande plaque centrale attire les motifs périphériques et donne enfin une logique à la reconstruction."

    },

    sound:
      playDeductionSound,

    finalHTML:
      `
        <p>Fragments.</p>
        <p>Cassures compatibles.</p>
        <p>Lignes continues.</p>
        <p>Plaque centrale.</p>

        <p class="impact-text">
          ILS APPARTIENNENT
          AU MÊME ENSEMBLE.
        </p>
      `,

    secretName:
      "fragments-same-structure",

    secretText:
      "Les fragments retrouvés par Élie appartiennent à une seule et même structure ancienne."

  });

  /* =========================================================
     INTERACTION 2
     IDENTIFIER LE DISPOSITIF
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".device-shape-trigger",

    dataKey:
      "deviceShape",

    revealId:
      "deviceShapeReveal",

    storage:
      "deviceShape",

    order: [
      "curve",
      "circle",
      "elements",
      "structure",
      "device"
    ],

    texts: {

      curve:
        "La reconstruction commence par une courbe trop régulière pour être une simple paroi.",

      circle:
        "En ajoutant les correspondances, Peter obtient progressivement une forme circulaire.",

      elements:
        "La structure complète devait être composée de dizaines d’éléments différents.",

      structure:
        "Les fragments forment les restes d’une architecture technique cohérente et non d’un décor.",

      device:
        "Root comprend enfin qu’il ne s’agit pas de pierres indépendantes, mais des morceaux d’un même dispositif."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>Une courbe.</p>
        <p>Un cercle.</p>
        <p>Des dizaines d’éléments.</p>

        <p class="impact-text">
          UN MÊME DISPOSITIF.
        </p>
      `,

    secretName:
      "ancient-device",

    secretText:
      "Les pierres transportées depuis des années sont les fragments d’un dispositif ancien dispersé."

  });

  /* =========================================================
     INTERACTION 3
     SORT D'ISABEL
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".isabel-fate-trigger",

    dataKey:
      "isabelFate",

    revealId:
      "isabelFateReveal",

    storage:
      "isabelFate",

    order: [
      "years",
      "discovered",
      "removed",
      "kept",
      "watched"
    ],

    texts: {

      years:
        "Isabel a passé dix-huit ans à s’intégrer à Flores jusqu’à devenir presque invisible.",

      discovered:
        "Une fois Hale convaincu qu’une source interne existait, son identité n’était plus qu’une question de temps.",

      removed:
        "Le Maître Noir lui interdit de retourner à Flores et la prive de tout rôle opérationnel direct.",

      kept:
        "Il ne la libère pourtant pas : il la conserve parce qu’elle peut encore servir.",

      watched:
        "Isabel reste vivante, mais uniquement sous contrôle et sans accès à l’ensemble des opérations."

    },

    sound:
      playDarkSound,

    finalHTML:
      `
        <p>Dix-huit ans d’infiltration.</p>
        <p>Découverte.</p>
        <p>Écartée.</p>

        <p class="impact-text">
          CONSERVÉE.
        </p>
      `,

    secretName:
      "isabel-removed",

    secretText:
      "Isabel n’est plus la taupe active de Flores : elle est écartée et gardée uniquement parce qu’elle reste utile."

  });

  /* =========================================================
     INTERACTION 4
     ISABEL SOUS CONTRÔLE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".isabel-control-trigger",

    dataKey:
      "isabelControl",

    revealId:
      "isabelControlReveal",

    storage:
      "isabelControl",

    order: [
      "nocontact",
      "nooverview",
      "eraser",
      "useful",
      "threat"
    ],

    texts: {

      nocontact:
        "Isabel ne pourra plus contacter les personnes qu’elle surveillait ni reprendre sa couverture.",

      nooverview:
        "Elle ne connaîtra plus l’ensemble des opérations du réseau des Gardiens.",

      eraser:
        "La présence silencieuse de l’Effaceur lui rappelle ce qui arrive aux éléments devenus inutiles.",

      useful:
        "Son expérience, ses souvenirs et ses informations sont encore suffisamment précieux pour la maintenir en vie.",

      threat:
        "Son utilité n’est plus un privilège : elle devient littéralement sa seule protection."

    },

    sound:
      playDarkSound,

    finalHTML:
      `
        <p>Plus de couverture.</p>
        <p>Plus de vue d’ensemble.</p>
        <p>L’Effaceur à proximité.</p>

        <p class="impact-text">
          SON UTILITÉ EST
          SA SEULE PROTECTION.
        </p>
      `,

    secretName:
      "isabel-controlled",

    secretText:
      "Isabel devient une ressource conservée sous menace, et non plus une agente autonome."

  });

  /* =========================================================
     INTERACTION 5
     REMONTER LES CONVOIS
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".routes-trigger",

    dataKey:
      "routes",

    revealId:
      "routesReveal",

    storage:
      "routes",

    order: [
      "official",
      "clive",
      "old",
      "sites",
      "destinations"
    ],

    texts: {

      official:
        "Lucy commence avec les routes, dates, poids, sociétés écrans et chauffeurs officiellement enregistrés.",

      clive:
        "Clive ajoute une unité mémoire obtenue dans le bureau secondaire d’Élie, contenant les trajets non déclarés.",

      old:
        "Les nouvelles données remontent à presque vingt ans et révèlent une activité beaucoup plus ancienne que prévu.",

      sites:
        "Les points d’enlèvement correspondent à des zones archéologiques, des grottes, des cavités ou des sanctuaires.",

      destinations:
        "Les routes permettent enfin de suivre non seulement l’origine des fragments, mais aussi leur destination finale."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>Routes officielles.</p>
        <p>Routes cachées.</p>
        <p>Presque vingt ans.</p>

        <p class="impact-text">
          LES FRAGMENTS
          ONT ÉTÉ RÉCUPÉRÉS
          PARTOUT.
        </p>
      `,

    secretName:
      "twenty-years-routes",

    secretText:
      "Les Gardiens ont utilisé pendant près de vingt ans un réseau logistique pour récupérer des fragments sur de nombreux sites anciens."

  });

  /* =========================================================
     INTERACTION 6
     DESTINATION FINALE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".destination-trigger",

    dataKey:
      "destination",

    revealId:
      "destinationReveal",

    storage:
      "destination",

    order: [
      "warehouses",
      "three",
      "two",
      "hidalgo",
      "cueva"
    ],

    texts: {

      warehouses:
        "Les cargaisons passent d’abord par plusieurs entrepôts afin de brouiller leur destination réelle.",

      three:
        "En remontant les transferts, Peter réduit les destinations finales à trois lieux principaux.",

      two:
        "Les trajets cachés éliminent encore une possibilité et n’en laissent plus que deux.",

      hidalgo:
        "La majorité des flux finit par converger vers une zone montagneuse de l’Hidalgo.",

      cueva:
        "Une ancienne carte permet à Root d’identifier le nom oublié du site : Cueva de las Voces."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>Entrepôts.</p>
        <p>Trois destinations.</p>
        <p>Deux.</p>
        <p>Hidalgo.</p>

        <p class="impact-text">
          CUEVA DE LAS VOCES.
        </p>
      `,

    secretName:
      "cueva-location",

    secretText:
      "Presque tous les convois convergent vers Cueva de las Voces, une ancienne zone montagneuse de l’Hidalgo."

  });

  /* =========================================================
     INTERACTION 7
     CERCLE DE FRANCHISSEMENT
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".crossing-circle-trigger",

    dataKey:
      "crossingCircle",

    revealId:
      "crossingCircleReveal",

    storage:
      "crossingCircle",

    order: [
      "structure",
      "teaching",
      "circle",
      "notportal",
      "conditions"
    ],

    texts: {

      structure:
        "Maître Lee reconnaît immédiatement la logique générale de la structure reconstruite.",

      teaching:
        "Il en retrouve le principe dans les anciens enseignements transmis avant la séparation des ordres.",

      circle:
        "Le nom conservé dans ces enseignements est Cercle de Franchissement.",

      notportal:
        "Lee précise qu’il ne s’agit pas d’un portail déjà existant que l’on ouvrirait simplement.",

      conditions:
        "Le Cercle recrée les conditions nécessaires pour qu’un passage puisse apparaître."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>Cercle de Franchissement.</p>
        <p>Pas une porte existante.</p>

        <p class="impact-text">
          IL CRÉE LES CONDITIONS
          DU PASSAGE.
        </p>
      `,

    secretName:
      "crossing-circle",

    secretText:
      "Le dispositif est un Cercle de Franchissement : il ne contient pas un passage, il recrée les conditions pour en faire apparaître un."

  });

  /* =========================================================
     INTERACTION 8
     POURQUOI IL A ÉTÉ DISPERSÉ
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".dispersed-trigger",

    dataKey:
      "dispersed",

    revealId:
      "dispersedReveal",

    storage:
      "dispersed",

    order: [
      "oldorder",
      "danger",
      "scatter",
      "split",
      "rebuild"
    ],

    texts: {

      oldorder:
        "Le Cercle appartenait aux savoirs d’un ordre ancien, antérieur à la séparation entre Sentinelles et Gardiens.",

      danger:
        "Ses détenteurs ont estimé qu’un dispositif complet représentait un danger trop grand.",

      scatter:
        "Ils l’ont donc démonté et dispersé volontairement en de nombreux fragments.",

      split:
        "Cette dispersion a eu lieu avant que les deux courants ne deviennent les ordres rivaux actuels.",

      rebuild:
        "Le but était simple : empêcher qu’une seule faction puisse un jour le reconstruire facilement."

    },

    sound:
      playMemorySound,

    finalHTML:
      `
        <p>Un ancien ordre.</p>
        <p>Un dispositif trop dangereux.</p>
        <p>Une dispersion volontaire.</p>

        <p class="impact-text">
          POUR EMPÊCHER
          SA RECONSTRUCTION.
        </p>
      `,

    secretName:
      "device-dispersed",

    secretText:
      "Le Cercle a été volontairement dispersé par les premiers gardiens du savoir parce qu’il était trop dangereux pour rester complet."

  });

  /* =========================================================
     INTERACTION 9
     LES DATES / ANNA
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".anna-dates-trigger",

    dataKey:
      "annaDates",

    revealId:
      "annaDatesReveal",

    storage:
      "annaDates",

    order: [
      "nineteen",
      "birth",
      "months",
      "collection",
      "signal"
    ],

    texts: {

      nineteen:
        "Les archives d’Élie montrent que les collectes ont commencé il y a environ dix-neuf ans.",

      birth:
        "Cette durée correspond presque exactement à l’âge d’Anna.",

      months:
        "Lucy corrige cependant le détail : les premières collectes commencent quelques mois après sa naissance.",

      collection:
        "Ce décalage suggère une réaction à un événement détecté après la naissance plutôt qu’un plan fixé avant elle.",

      signal:
        "Root comprend que ces quelques mois ont probablement servi aux Gardiens à localiser le signal du Pont."

    },

    sound:
      playDeductionSound,

    finalHTML:
      `
        <p>Dix-neuf ans.</p>
        <p>Naissance d’Anna.</p>
        <p>Quelques mois.</p>

        <p class="impact-text">
          LE TEMPS
          DE LOCALISER LE SIGNAL.
        </p>
      `,

    secretName:
      "anna-triggered-collection",

    secretText:
      "La collecte des fragments commence quelques mois après la naissance d’Anna, probablement après la détection du signal du Pont."

  });

  /* =========================================================
     INTERACTION 10
     POURQUOI ANNA ÉTAIT SURVEILLÉE
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".anna-purpose-trigger",

    dataKey:
      "annaPurpose",

    revealId:
      "annaPurposeReveal",

    storage:
      "annaPurpose",

    order: [
      "bridge",
      "signal",
      "locate",
      "rebuild",
      "use"
    ],

    texts: {

      bridge:
        "Anna n’est pas seulement une personne surveillée : elle correspond à la fonction du Pont.",

      signal:
        "Sa naissance semble avoir produit un signal ou une résonance que les Gardiens ont détecté.",

      locate:
        "Ils ont d’abord dû confirmer l’existence du Pont et déterminer où il se trouvait.",

      rebuild:
        "Une fois cette certitude acquise, ils ont intensifié la collecte des fragments du Cercle.",

      use:
        "Leur objectif était donc de reconstruire le moyen d’utiliser le Pont, pas seulement de l’observer."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>Le Pont existe.</p>
        <p>Ils le détectent.</p>
        <p>Ils le localisent.</p>
        <p>Ils reconstruisent le Cercle.</p>

        <p class="impact-text">
          ILS PRÉPARAIENT
          LE MOYEN DE L’UTILISER.
        </p>
      `,

    secretName:
      "why-anna-watched",

    secretText:
      "Les Gardiens surveillaient Anna parce que l’existence du Pont leur permettait enfin de reconstruire le moyen de créer le passage."

  });

  /* =========================================================
     INTERACTION 11
     FONCTIONS DES FRAGMENTS
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".fragment-functions-trigger",

    dataKey:
      "fragmentFunctions",

    revealId:
      "fragmentFunctionsReveal",

    storage:
      "fragmentFunctions",

    order: [
      "orientation",
      "stabilization",
      "activation",
      "memory",
      "energy"
    ],

    texts: {

      orientation:
        "Certains motifs fonctionnent comme des directions et semblent liés à l’orientation du passage.",

      stabilization:
        "Un deuxième groupe utilise des symboles associés aux sphères fixes et correspond probablement à la stabilisation.",

      activation:
        "Les fragments proches d’Hope provoquent une réaction de son Dragon et une hausse électromagnétique : ils participent à l’activation.",

      memory:
        "Une grande dalle reprend les trajectoires de Pandore et semble porter une fonction de mémoire ou de guidage.",

      energy:
        "Peter et Lee concluent qu’une autre partie du système doit fournir ou transmettre l’énergie nécessaire à l’apparition du passage."

    },

    sound:
      playAnalysisSound,

    finalHTML:
      `
        <p>Orientation.</p>
        <p>Stabilisation.</p>
        <p>Activation.</p>
        <p>Mémoire.</p>
        <p>Énergie.</p>

        <p class="impact-text">
          LES PIERRES
          FORMENT UN SYSTÈME.
        </p>
      `,

    secretName:
      "device-functions",

    secretText:
      "Les fragments remplissent des fonctions techniques distinctes : orientation, stabilisation, activation, mémoire et probablement énergie."

  });

  /* =========================================================
     INTERACTION 12
     LES QUATRE FONCTIONS
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".four-functions-trigger",

    dataKey:
      "fourFunctions",

    revealId:
      "fourFunctionsReveal",

    storage:
      "fourFunctions",

    order: [
      "key",
      "bridge",
      "memory",
      "anchor",
      "circle"
    ],

    texts: {

      key:
        "La Clé, associée à Hope, déclenche ou active certains éléments du système.",

      bridge:
        "Le Pont, associé à Anna, relie ce qui doit être franchi.",

      memory:
        "La Mémoire, associée à Root, semble orienter ou guider la trajectoire du passage.",

      anchor:
        "L’Ancre, associée à Lucy, stabilise probablement le phénomène et empêche sa fermeture prématurée.",

      circle:
        "Le Cercle fournit la structure matérielle permettant à ces quatre fonctions d’agir ensemble."

    },

    sound:
      playRevealSound,

    finalHTML:
      `
        <p>Clé.</p>
        <p>Pont.</p>
        <p>Mémoire.</p>
        <p>Ancre.</p>

        <p class="impact-text">
          LE CERCLE
          ET LES QUATRE FONCTIONS
          SONT COMPLÉMENTAIRES.
        </p>
      `,

    secretName:
      "circle-four-functions",

    secretText:
      "Le Cercle ne suffit pas seul : son fonctionnement dépend des quatre fonctions de Clé, Pont, Mémoire et Ancre."

  });

  /* =========================================================
     INTERACTION 13
     AMY CONNAÎT LA CUEVA
  ========================================================= */

  setupFreeInteraction({

    selector:
      ".amy-cueva-trigger",

    dataKey:
      "amyCueva",

    revealId:
      "amyCuevaReveal",

    storage:
      "amyCueva",

    total: 5,

    texts: {

      knows:
        "Amy reconnaît immédiatement le nom Cueva de las Voces sur la carte.",

      visited:
        "Elle révèle qu’elle s’y est rendue plusieurs années auparavant avec les Gardiens.",

      stones:
        "À l’époque, elle y avait déjà vu des pierres et une structure encore très incomplète.",

      researchers:
        "Des hommes creusaient sur place, accompagnés de chercheurs dont certains n’étaient pas là volontairement.",

      almost:
        "Si les convois ont continué depuis sa visite, Amy estime que le dispositif est aujourd’hui probablement presque terminé."

    },

    sound:
      playMemorySound,

    finalHTML:
      `
        <p>Amy connaît le site.</p>
        <p>Elle y est déjà allée.</p>
        <p>Le Cercle était déjà en construction.</p>

        <p class="impact-text">
          IL EST PROBABLEMENT
          PRESQUE TERMINÉ.
        </p>
      `,

    secretName:
      "amy-confirms-cueva",

    secretText:
      "Amy confirme que Cueva de las Voces abrite depuis des années la reconstruction du Cercle et qu’elle est probablement très avancée."

  });

  /* =========================================================
     INTERACTION 14
     FRAGMENTS ARTIFICIELS
  ========================================================= */

  setupOrderedInteraction({

    selector:
      ".artificial-stone-trigger",

    dataKey:
      "artificialStone",

    revealId:
      "artificialStoneReveal",

    storage:
      "artificialStone",

    order: [
      "missing",
      "copy",
      "generation",
      "reaction",
      "compatibility"
    ],

    texts: {

      missing:
        "Plusieurs emplacements du Cercle restent vides : certains fragments originaux manquent encore.",

      copy:
        "Les Gardiens tentent depuis des années de remplacer ces pièces manquantes par des copies fabriquées.",

      generation:
        "La pierre montrée dans la cavité appartient déjà à une troisième génération de prototypes.",

      reaction:
        "Lorsqu’elle est activée, les fragments anciens voisins réagissent réellement à sa présence.",

      compatibility:
        "Le prototype atteint soixante-douze pour cent de compatibilité, insuffisant pour le Maître Noir mais assez pour prouver que la méthode fonctionne partiellement."

    },

    sound:
      playDarkSound,

    finalHTML:
      `
        <p>Un fragment manquant.</p>
        <p>Une copie fabriquée.</p>
        <p>Troisième génération.</p>
        <p>Réaction des pierres anciennes.</p>

        <p class="impact-text">
          COMPATIBILITÉ :
          72 %.
        </p>
      `,

    secretName:
      "artificial-fragments",

    secretText:
      "Les Gardiens sont capables de fabriquer des fragments artificiels partiellement compatibles avec le Cercle."

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
