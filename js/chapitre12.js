/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 12 — SOUS LA MONTAGNE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
localStorage.setItem(
  "societeOmbre_dernierePage",
  "chapitre12.html"
);

localStorage.setItem(
  "societeOmbre_dernierTitre",
  "Chapitre 12 - Sous la montagne"
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


/* =========================================================
   CLÉS LOCALSTORAGE
========================================================= */

const STORAGE_PREFIX =
  "societeOmbre_chapitre12_";

const STORAGE_SCROLL =
  STORAGE_PREFIX + "scroll";

const STORAGE_PROGRESS =
  STORAGE_PREFIX + "progression";

const STORAGE_COMPLETED =
  STORAGE_PREFIX + "termine";

const STORAGE_SECRETS =
  STORAGE_PREFIX + "secrets";

const STORAGE_STATUS =
  STORAGE_PREFIX + "status";

const STORAGE_FIRST_SYMBOLS =
  STORAGE_PREFIX + "firstSymbols";

const STORAGE_REACTION =
  STORAGE_PREFIX + "reaction";

const STORAGE_TUNNEL =
  STORAGE_PREFIX + "tunnel";

const STORAGE_SOURCE_MEMORY =
  STORAGE_PREFIX + "sourceMemory";

const STORAGE_WALL_MECHANISM =
  STORAGE_PREFIX + "wallMechanism";

const STORAGE_DRAGON_SEQUENCE =
  STORAGE_PREFIX + "dragonSequence";

const STORAGE_PHOENIX_SEQUENCE =
  STORAGE_PREFIX + "phoenixSequence";

const STORAGE_FRESCO_ROOM =
  STORAGE_PREFIX + "frescoRoom";

const STORAGE_SPHERES =
  STORAGE_PREFIX + "spheres";

const STORAGE_CIVILIZATION =
  STORAGE_PREFIX + "civilization";

const STORAGE_IMPULSE =
  STORAGE_PREFIX + "impulse";

const STORAGE_VIAL =
  STORAGE_PREFIX + "vial";

const STORAGE_ANNA_TRUTH =
  STORAGE_PREFIX + "annaTruth";


/* =========================================================
   COMPATIBILITÉ ANCIENNE FIN
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre12_finished"
  ) === "1"
) {

  localStorage.setItem(
    STORAGE_COMPLETED,
    "1"
  );

}


/* =========================================================
   MODE DE LECTURE
========================================================= */

const urlParams =
  new URLSearchParams(
    window.location.search
  );

const lectureMode =
  urlParams.get("lecture");


/* =========================================================
   OUTILS LOCALSTORAGE
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

  } catch {

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
   IMAGES MANQUANTES
========================================================= */

document
  .querySelectorAll(".visual img")
  .forEach((img) => {

    img.addEventListener(
      "error",
      () => {

        const visual =
          img.closest(".visual");


        if (visual) {

          visual.classList.add(
            "visual-missing"
          );

        }

      }
    );

  });


/* =========================================================
   APPARITION DES SCÈNES
========================================================= */

const sceneObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

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

      });

    },
    {
      threshold: 0.14
    }
  );


scenes.forEach(
  (scene) => {

    sceneObserver.observe(
      scene
    );

  }
);


/* =========================================================
   TEXTE PROGRESSIF
========================================================= */

function animateParagraphs(scene) {

  if (
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
    (paragraph, index) => {

      paragraph.style.opacity =
        "0";

      paragraph.style.transform =
        "translateY(12px)";


      setTimeout(
        () => {

          paragraph.animate(
            [
              {
                opacity: 0,
                transform: "translateY(12px)"
              },
              {
                opacity: 1,
                transform: "translateY(0)"
              }
            ],
            {
              duration: 650,
              easing: "ease-out",
              fill: "forwards"
            }
          );

        },
        index * 105
      );

    }
  );

}


/* =========================================================
   BARRE DE PROGRESSION
========================================================= */

function updateProgress() {

  if (!progressFill) {
    return;
  }


  const scrollTop =
    window.scrollY;


  const documentHeight =
    document.documentElement.scrollHeight -
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
          scrollTop /
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
  () => {

    clearTimeout(
      saveScrollTimer
    );


    saveScrollTimer =
      setTimeout(
        () => {

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

        },
        250
      );

  },
  {
    passive: true
  }
);


/* =========================================================
   REPRENDRE
========================================================= */

if (
  lectureMode === "reprendre"
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
      () => {

        window.scrollTo({
          top: savedPosition,
          left: 0,
          behavior: "instant"
        });


        updateProgress();

      },
      400
    );

  }

}


/* =========================================================
   RECOMMENCER
========================================================= */

if (
  lectureMode === "recommencer"
) {

  setTimeout(
    () => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });


      updateProgress();

    },
    100
  );

}


/* =========================================================
   BOUTON CONTINUER
========================================================= */

document
  .querySelectorAll("[data-next]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const currentScene =
          button.closest(".scene");


        if (!currentScene) {
          return;
        }


        const nextScene =
          currentScene.nextElementSibling;


        if (nextScene) {

          nextScene.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }
    );

  });


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


menuBtn?.addEventListener(
  "click",
  openMenu
);


menuClose?.addEventListener(
  "click",
  closeMenu
);


chapterMenu?.addEventListener(
  "click",
  (event) => {

    if (
      event.target === chapterMenu
    ) {

      closeMenu();

    }

  }
);


/* =========================================================
   REPRENDRE VIA MENU
========================================================= */

resumeBtn?.addEventListener(
  "click",
  () => {

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


/* =========================================================
   RECOMMENCER LE CHAPITRE
========================================================= */

function restartChapterFunction() {

  const keysToDelete =
    [];


  for (
    let i = 0;
    i < localStorage.length;
    i++
  ) {

    const key =
      localStorage.key(i);


    if (
      key &&
      key.startsWith(
        STORAGE_PREFIX
      )
    ) {

      keysToDelete.push(key);

    }

  }


  keysToDelete.forEach(
    (key) => {

      localStorage.removeItem(key);

    }
  );


  window.location.href =
    "chapitre12.html?lecture=recommencer";

}


restartBtn?.addEventListener(
  "click",
  restartChapterFunction
);


restartChapter?.addEventListener(
  "click",
  restartChapterFunction
);


/* =========================================================
   SECRETS
========================================================= */

function getSecrets() {

  try {

    return JSON.parse(
      localStorage.getItem(
        STORAGE_SECRETS
      )
    ) || [];

  } catch {

    return [];

  }

}


function saveSecret(secret) {

  const secrets =
    getSecrets();


  if (
    !secrets.includes(secret)
  ) {

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

let secretTimer =
  null;


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

}


function showSecret(
  secretName,
  secretText
) {

  saveSecret(secretName);


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
      document.createElement("p");


    description.className =
      "secret-description";


    description.style.marginTop =
      "14px";

    description.style.fontSize =
      "15px";

    description.style.lineHeight =
      "1.55";

    description.style.letterSpacing =
      "0";

    description.style.color =
      "#f4eee6";


    inner.appendChild(
      description
    );

  }


  description.textContent =
    secretText;


  secretPopup.classList.add(
    "show"
  );


  secretPopup.setAttribute(
    "aria-hidden",
    "false"
  );


  playSecretSound();


  clearTimeout(
    secretTimer
  );


  secretTimer =
    setTimeout(
      hideSecretPopup,
      3200
    );

}


/* =========================================================
   OUTILS INTERACTIONS
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
   INTERACTION 1
   ÉTAT DES LIEUX
========================================================= */

const statusReveal =
  document.getElementById(
    "statusReveal"
  );


let statusObserved =
  getStoredArray(
    STORAGE_STATUS
  );


const statusTexts = {

  pain:
    "Une douleur sourde traverse le dos d’Hope. Chaque mouvement lui rappelle la violence de la chute.",

  ribs:
    "Ses côtes sont douloureuses. Respirer reste possible, mais certains mouvements sont difficiles.",

  pool:
    "La vasque est très sombre au centre mais prend des teintes turquoise près de la rive.",

  sand:
    "Le sable présente des reflets rouges, orangés, bleus et dorés. Il est étrangement tiède.",

  light:
    "Un mince puits de lumière atteint la grotte depuis une ouverture située beaucoup trop haut pour être accessible."

};


document
  .querySelectorAll(
    ".status-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.status;


        statusObserved =
          addStoredValue(
            STORAGE_STATUS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          statusReveal,
          `
            <p>
              ${statusTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          statusObserved.length >= 5
        ) {

          setRevealHTML(
            statusReveal,
            `
              <p>
                Blessée.
              </p>

              <p>
                Isolée.
              </p>

              <p>
                Sans issue évidente.
              </p>

              <p class="impact-text">
                MAIS VIVANTE.
              </p>
            `
          );


          showSecret(
            "hope-alive-underground",
            "Hope a survécu à la chute, mais son corps reste fortement traumatisé."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".status-trigger"
  )
  .forEach((button) => {

    if (
      statusObserved.includes(
        button.dataset.status
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 2
   PREMIERS SYMBOLES
========================================================= */

const firstSymbolsReveal =
  document.getElementById(
    "firstSymbolsReveal"
  );


let firstSymbolsObserved =
  getStoredArray(
    STORAGE_FIRST_SYMBOLS
  );


const firstSymbolsTexts = {

  lines:
    "Les lignes sont trop régulières et trop structurées pour ressembler à de simples fractures naturelles.",

  geometry:
    "Certaines formes semblent géométriques, répétées selon une organisation difficile à attribuer au hasard.",

  familiar:
    "Plus Hope observe, plus certains signes réveillent une impression de déjà-vu.",

  source:
    "Quelques formes rappellent étrangement celles qu’Hope avait aperçues autrefois près de la Source de Vie."

};


document
  .querySelectorAll(
    ".first-symbols-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.firstSymbols;


        firstSymbolsObserved =
          addStoredValue(
            STORAGE_FIRST_SYMBOLS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          firstSymbolsReveal,
          `
            <p>
              ${firstSymbolsTexts[type]}
            </p>
          `
        );


        playArtifactSound();


        if (
          firstSymbolsObserved.length >= 4
        ) {

          setRevealHTML(
            firstSymbolsReveal,
            `
              <p>
                Lignes structurées.
              </p>

              <p>
                Géométrie répétée.
              </p>

              <p>
                Impression de déjà-vu.
              </p>

              <p class="impact-text">
                CE N’EST PROBABLEMENT PAS NATUREL.
              </p>
            `
          );


          showSecret(
            "first-ancient-symbols",
            "Les marques de la grotte semblent artificielles et présentent des ressemblances avec les signes de la Source de Vie."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".first-symbols-trigger"
  )
  .forEach((button) => {

    if (
      firstSymbolsObserved.includes(
        button.dataset.firstSymbols
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 3
   RÉACTION DRAGON + PHÉNIX
========================================================= */

const reactionReveal =
  document.getElementById(
    "reactionReveal"
  );


let reactionObserved =
  getStoredArray(
    STORAGE_REACTION
  );


const reactionTexts = {

  dragon:
    "Au contact de la roche, les contours du dragon apparaissent sous la peau d’Hope et son avant-bras devient brûlant.",

  phoenix:
    "Presque simultanément, une chaleur se répand dans son dos : le phénix réagit lui aussi.",

  touch:
    "Lorsqu’Hope touche de nouveau la paroi, le phénomène se reproduit immédiatement.",

  together:
    "Les deux marques ne réagissent pas au hasard. Elles répondent toutes les deux aux symboles de la grotte."

};


document
  .querySelectorAll(
    ".reaction-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.reaction;


        reactionObserved =
          addStoredValue(
            STORAGE_REACTION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          reactionReveal,
          `
            <p>
              ${reactionTexts[type]}
            </p>
          `
        );


        playDragonSound();


        if (
          reactionObserved.length >= 4
        ) {

          setRevealHTML(
            reactionReveal,
            `
              <p>
                Dragon.
              </p>

              <p>
                Phénix.
              </p>

              <p>
                Même réaction.
              </p>

              <p class="impact-text">
                LA GROTTE RÉAGIT À HOPE.
              </p>

              <p class="emphasis">
                Ou peut-être
                à ce qu’elle porte.
              </p>
            `
          );


          showSecret(
            "dragon-phoenix-react",
            "Le dragon et le phénix réagissent tous les deux aux symboles gravés dans la grotte."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".reaction-trigger"
  )
  .forEach((button) => {

    if (
      reactionObserved.includes(
        button.dataset.reaction
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 4
   EXPLORER LE TUNNEL
========================================================= */

const tunnelReveal =
  document.getElementById(
    "tunnelReveal"
  );


const tunnelButtons =
  document.querySelectorAll(
    ".tunnel-trigger"
  );


const tunnelOrder = [
  "descent",
  "narrow",
  "cavities",
  "symbols"
];


let tunnelProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_TUNNEL
    ) || "0",
    10
  );


const tunnelTexts = {

  descent:
    "Le passage descend lentement sous la montagne.",

  narrow:
    "À certains endroits, Hope doit se pencher pour continuer à avancer.",

  cavities:
    "De petites cavités apparaissent lorsque les parois s’écartent.",

  symbols:
    "Les mêmes signes reviennent régulièrement sur les parois du tunnel."

};


function restoreTunnel() {

  tunnelButtons.forEach(
    (button, index) => {

      if (
        index < tunnelProgress
      ) {

        button.classList.add(
          "completed"
        );

        button.disabled =
          true;

      }

    }
  );


  if (
    tunnelProgress >= 4
  ) {

    setRevealHTML(
      tunnelReveal,
      `
        <p>
          Descente.
        </p>

        <p>
          Passage étroit.
        </p>

        <p>
          Cavités.
        </p>

        <p class="impact-text">
          LES MÊMES SYMBOLES.
        </p>
      `
    );

  }

}


tunnelButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.tunnel;


        const expected =
          tunnelOrder[
            tunnelProgress
          ];


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


        tunnelProgress++;


        localStorage.setItem(
          STORAGE_TUNNEL,
          tunnelProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          tunnelReveal,
          `
            <p>
              ${tunnelTexts[selected]}
            </p>
          `
        );


        playTunnelSound();


        if (
          tunnelProgress >= 4
        ) {

          setRevealHTML(
            tunnelReveal,
            `
              <p>
                Descente.
              </p>

              <p>
                Roche.
              </p>

              <p>
                Cavités.
              </p>

              <p class="impact-text">
                TOUJOURS LES MÊMES SIGNES.
              </p>

              <p class="emphasis">
                Cet endroit semble appartenir
                à un ensemble beaucoup plus vaste.
              </p>
            `
          );


          showSecret(
            "symbol-network",
            "Les signes se répètent profondément sous la montagne, suggérant un réseau construit ou utilisé autrefois."
          );

        }

      }
    );

  });


restoreTunnel();


/* =========================================================
   INTERACTION 5
   SOUVENIR DE LA SOURCE DE VIE
========================================================= */

const sourceMemoryReveal =
  document.getElementById(
    "sourceMemoryReveal"
  );


let sourceMemoryObserved =
  getStoredArray(
    STORAGE_SOURCE_MEMORY
  );


const sourceMemoryTexts = {

  source:
    "Hope avait déjà aperçu certains signes semblables près de la Source de Vie.",

  trials:
    "Ces souvenirs remontent à ses anciennes épreuves, bien avant qu’elle ne comprenne ce que ces symboles pouvaient signifier.",

  symbols:
    "À l’époque, les marques lui avaient semblé anciennes et mystérieuses, mais elle n’avait jamais reçu l’autorisation de les étudier.",

  lee:
    "Maître Lee lui avait interdit de les déchiffrer : certaines réponses ne doivent être cherchées que lorsqu’on est prêt à entendre la question."

};


document
  .querySelectorAll(
    ".source-memory-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.sourceMemory;


        sourceMemoryObserved =
          addStoredValue(
            STORAGE_SOURCE_MEMORY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          sourceMemoryReveal,
          `
            <p>
              ${sourceMemoryTexts[type]}
            </p>
          `
        );


        playMemorySound();


        if (
          sourceMemoryObserved.length >= 4
        ) {

          setRevealHTML(
            sourceMemoryReveal,
            `
              <p>
                Source de Vie.
              </p>

              <p>
                Épreuves.
              </p>

              <p>
                Symboles interdits.
              </p>

              <p class="impact-text">
                « LORSQU’ON EST PRÊT
                À ENTENDRE LA QUESTION. »
              </p>

              <p class="emphasis">
                Hope détestait cette phrase.
                Elle commence enfin
                à la comprendre.
              </p>
            `
          );


          showSecret(
            "source-symbol-link",
            "Les symboles de la grotte semblent liés à ceux qu’Hope avait aperçus près de la Source de Vie."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".source-memory-trigger"
  )
  .forEach((button) => {

    if (
      sourceMemoryObserved.includes(
        button.dataset.sourceMemory
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 6
   LE FAUX MUR
========================================================= */

const wallMechanismReveal =
  document.getElementById(
    "wallMechanismReveal"
  );


let wallMechanismObserved =
  getStoredArray(
    STORAGE_WALL_MECHANISM
  );


const wallMechanismTexts = {

  regular:
    "La paroi est anormalement régulière, comme si elle avait été ajustée plutôt que formée uniquement par l’érosion.",

  engravings:
    "Les gravures ne sont pas réparties au hasard. Elles semblent former plusieurs groupes distincts.",

  cracks:
    "Les fissures naturelles habituelles sont presque absentes au centre de la paroi.",

  alignment:
    "Plusieurs symboles présentent un alignement précis qui ressemble davantage à un dispositif qu’à une inscription décorative."

};


document
  .querySelectorAll(
    ".wall-mechanism-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.wallMechanism;


        wallMechanismObserved =
          addStoredValue(
            STORAGE_WALL_MECHANISM,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          wallMechanismReveal,
          `
            <p>
              ${wallMechanismTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          wallMechanismObserved.length >= 4
        ) {

          setRevealHTML(
            wallMechanismReveal,
            `
              <p>
                Trop régulier.
              </p>

              <p>
                Trop organisé.
              </p>

              <p>
                Trop précis.
              </p>

              <p class="impact-text">
                CE N’EST PAS UN SIMPLE MUR.
              </p>

              <p class="emphasis">
                Les symboles
                semblent faire partie
                d’un mécanisme.
              </p>
            `
          );


          showSecret(
            "hidden-door",
            "Le cul-de-sac dissimule probablement un mécanisme ancien commandé par les symboles."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".wall-mechanism-trigger"
  )
  .forEach((button) => {

    if (
      wallMechanismObserved.includes(
        button.dataset.wallMechanism
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 7
   SÉQUENCE DU DRAGON
========================================================= */

const dragonSequenceReveal =
  document.getElementById(
    "dragonSequenceReveal"
  );


const dragonSequenceButtons =
  document.querySelectorAll(
    ".dragon-sequence-trigger"
  );


const dragonSequenceOrder = [
  "head",
  "neck",
  "torso",
  "wings",
  "body",
  "tail"
];


let dragonSequenceProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_DRAGON_SEQUENCE
    ) || "0",
    10
  );


const dragonSequenceTexts = {

  head:
    "La tête du dragon s’illumine.",

  neck:
    "La lumière descend le long du cou.",

  torso:
    "Le torse apparaît progressivement.",

  wings:
    "Les ailes s’illuminent à leur tour.",

  body:
    "La lumière gagne le reste du corps.",

  tail:
    "La queue complète enfin le dessin."

};


function restoreDragonSequence() {

  dragonSequenceButtons.forEach(
    (button, index) => {

      if (
        index < dragonSequenceProgress
      ) {

        button.classList.add(
          "completed"
        );

        button.disabled =
          true;

      }

    }
  );


  if (
    dragonSequenceProgress >= 6
  ) {

    setRevealHTML(
      dragonSequenceReveal,
      `
        <p>
          Tête.
        </p>

        <p>
          Cou.
        </p>

        <p>
          Torse.
        </p>

        <p>
          Ailes.
        </p>

        <p>
          Corps.
        </p>

        <p>
          Queue.
        </p>

        <p class="impact-text">
          DRAGON COMPLET.
        </p>

        <p class="emphasis">
          Première moitié.
        </p>
      `
    );

  }

}


dragonSequenceButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.dragonSequence;


        const expected =
          dragonSequenceOrder[
            dragonSequenceProgress
          ];


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


        dragonSequenceProgress++;


        localStorage.setItem(
          STORAGE_DRAGON_SEQUENCE,
          dragonSequenceProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          dragonSequenceReveal,
          `
            <p>
              ${dragonSequenceTexts[selected]}
            </p>
          `
        );


        playDragonSound();


        if (
          dragonSequenceProgress >= 6
        ) {

          setRevealHTML(
            dragonSequenceReveal,
            `
              <p>
                Tête.
              </p>

              <p>
                Cou.
              </p>

              <p>
                Torse.
              </p>

              <p>
                Ailes.
              </p>

              <p>
                Corps.
              </p>

              <p>
                Queue.
              </p>

              <p class="impact-text">
                DRAGON COMPLET.
              </p>

              <p class="emphasis">
                La paroi vibre.
                Certains signes
                s’enfoncent dans la roche.
              </p>
            `
          );


          showSecret(
            "dragon-key-half",
            "La séquence du dragon active une première partie du mécanisme caché."
          );

        }

      }
    );

  });


restoreDragonSequence();


/* =========================================================
   INTERACTION 8
   SÉQUENCE DU PHÉNIX
========================================================= */

const phoenixSequenceReveal =
  document.getElementById(
    "phoenixSequenceReveal"
  );


const phoenixSequenceButtons =
  document.querySelectorAll(
    ".phoenix-sequence-trigger"
  );


const phoenixSequenceOrder = [
  "head",
  "wings",
  "chest",
  "feathers",
  "tail"
];


let phoenixSequenceProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_PHOENIX_SEQUENCE
    ) || "0",
    10
  );


const phoenixSequenceTexts = {

  head:
    "La tête du phénix s’illumine dans le dos d’Hope.",

  wings:
    "Les ailes apparaissent progressivement.",

  chest:
    "La lumière gagne la poitrine du phénix.",

  feathers:
    "Les plumes s’illuminent les unes après les autres.",

  tail:
    "La queue complète enfin le phénix."

};


function restorePhoenixSequence() {

  phoenixSequenceButtons.forEach(
    (button, index) => {

      if (
        index < phoenixSequenceProgress
      ) {

        button.classList.add(
          "completed"
        );

        button.disabled =
          true;

      }

    }
  );


  if (
    phoenixSequenceProgress >= 5
  ) {

    setRevealHTML(
      phoenixSequenceReveal,
      `
        <p>
          Tête.
        </p>

        <p>
          Ailes.
        </p>

        <p>
          Poitrine.
        </p>

        <p>
          Plumes.
        </p>

        <p>
          Queue.
        </p>

        <p class="impact-text">
          PHÉNIX COMPLET.
        </p>

        <p class="name-reveal">
          LA PAROI S’OUVRE.
        </p>
      `
    );

  }

}


phoenixSequenceButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        if (
          dragonSequenceProgress < 6
        ) {

          button.classList.add(
            "wrong"
          );


          setRevealHTML(
            phoenixSequenceReveal,
            `
              <p class="emphasis">
                Le mécanisme du dragon
                n’est pas encore complet.
              </p>
            `
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


        const selected =
          button.dataset.phoenixSequence;


        const expected =
          phoenixSequenceOrder[
            phoenixSequenceProgress
          ];


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


        phoenixSequenceProgress++;


        localStorage.setItem(
          STORAGE_PHOENIX_SEQUENCE,
          phoenixSequenceProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          phoenixSequenceReveal,
          `
            <p>
              ${phoenixSequenceTexts[selected]}
            </p>
          `
        );


        playPhoenixSound();


        if (
          phoenixSequenceProgress >= 5
        ) {

          setRevealHTML(
            phoenixSequenceReveal,
            `
              <p>
                Tête.
              </p>

              <p>
                Ailes.
              </p>

              <p>
                Poitrine.
              </p>

              <p>
                Plumes.
              </p>

              <p>
                Queue.
              </p>

              <p class="impact-text">
                PHÉNIX COMPLET.
              </p>

              <p class="name-reveal">
                PASSAGE OUVERT.
              </p>

              <p class="emphasis">
                Dragon + Phénix.
                Deux moitiés
                d’une même clé.
              </p>
            `
          );


          showSecret(
            "dragon-phoenix-key",
            "Le dragon et le phénix forment ensemble la clé permettant d’ouvrir le passage ancien."
          );

        }

      }
    );

  });


restorePhoenixSequence();


/* =========================================================
   INTERACTION 9
   SALLE DES FRESQUES
========================================================= */

const frescoRoomReveal =
  document.getElementById(
    "frescoRoomReveal"
  );


let frescoRoomObserved =
  getStoredArray(
    STORAGE_FRESCO_ROOM
  );


const frescoRoomTexts = {

  light:
    "De minuscules puits de lumière traversent le plafond à des hauteurs vertigineuses et éclairent certaines zones précises.",

  walls:
    "Les murs sont entièrement recouverts de fresques qui semblent se poursuivre bien au-delà des zones éclairées.",

  symbols:
    "Des milliers de symboles accompagnent les représentations et semblent former une sorte de langage visuel.",

  story:
    "Les fresques ne sont pas isolées. Elles se suivent comme si elles racontaient une seule histoire extrêmement longue."

};


document
  .querySelectorAll(
    ".fresco-room-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.frescoRoom;


        frescoRoomObserved =
          addStoredValue(
            STORAGE_FRESCO_ROOM,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          frescoRoomReveal,
          `
            <p>
              ${frescoRoomTexts[type]}
            </p>
          `
        );


        playArtifactSound();


        if (
          frescoRoomObserved.length >= 4
        ) {

          setRevealHTML(
            frescoRoomReveal,
            `
              <p>
                Lumière.
              </p>

              <p>
                Fresques.
              </p>

              <p>
                Symboles.
              </p>

              <p class="impact-text">
                UNE HISTOIRE.
              </p>

              <p class="emphasis">
                Hope ne lit pas les mots.
                Elle comprend leur sens.
              </p>
            `
          );


          showSecret(
            "ancient-fresco-room",
            "La salle semble conserver une histoire entière sous forme de fresques et de symboles."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".fresco-room-trigger"
  )
  .forEach((button) => {

    if (
      frescoRoomObserved.includes(
        button.dataset.frescoRoom
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 10
   ÊTRES ET SPHÈRES
========================================================= */

const spheresReveal =
  document.getElementById(
    "spheresReveal"
  );


let spheresObserved =
  getStoredArray(
    STORAGE_SPHERES
  );


const spheresTexts = {

  beings:
    "Plusieurs êtres de taille immense apparaissent autour d’une structure centrale. Hope ignore si leur taille est réelle ou symbolique.",

  stars:
    "Certaines sphères semblent contenir des ensembles d’étoiles.",

  planets:
    "D’autres montrent des formes ressemblant à des planètes.",

  galaxies:
    "Certaines représentations rappellent même la structure de galaxies.",

  touch:
    "Dans une scène, l’un des êtres touche une sphère et quelque chose change à l’intérieur."

};


document
  .querySelectorAll(
    ".spheres-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.spheres;


        spheresObserved =
          addStoredValue(
            STORAGE_SPHERES,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          spheresReveal,
          `
            <p>
              ${spheresTexts[type]}
            </p>
          `
        );


        playCosmicSound();


        if (
          spheresObserved.length >= 5
        ) {

          setRevealHTML(
            spheresReveal,
            `
              <p>
                Êtres.
              </p>

              <p>
                Étoiles.
              </p>

              <p>
                Planètes.
              </p>

              <p>
                Galaxies.
              </p>

              <p class="impact-text">
                DES MONDES ?
              </p>

              <p class="emphasis">
                Ou simplement
                une représentation symbolique ?
              </p>
            `
          );


          showSecret(
            "world-spheres",
            "Les fresques montrent des sphères contenant ce qui ressemble à des mondes, mais Hope ne peut pas encore savoir si la représentation est littérale."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".spheres-trigger"
  )
  .forEach((button) => {

    if (
      spheresObserved.includes(
        button.dataset.spheres
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 11
   ÉVOLUTION DES CIVILISATIONS
========================================================= */

const civilizationReveal =
  document.getElementById(
    "civilizationReveal"
  );


const civilizationButtons =
  document.querySelectorAll(
    ".civilization-trigger"
  );


const civilizationOrder = [
  "fire",
  "tools",
  "wheel",
  "writing",
  "machines",
  "circuits",
  "ai"
];


let civilizationProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_CIVILIZATION
    ) || "0",
    10
  );


const civilizationTexts = {

  fire:
    "Une étincelle devient feu.",

  tools:
    "Des outils apparaissent dans les mains des silhouettes.",

  wheel:
    "La roue marque une nouvelle étape dans leur progression.",

  writing:
    "Des systèmes d’écriture apparaissent ensuite.",

  machines:
    "Les objets deviennent progressivement des machines.",

  circuits:
    "Les fresques évoluent jusqu’à des formes ressemblant à des circuits.",

  ai:
    "Enfin apparaissent des réseaux et des formes que Hope interprète comme pouvant évoquer des intelligences artificielles."

};


function restoreCivilization() {

  civilizationButtons.forEach(
    (button, index) => {

      if (
        index < civilizationProgress
      ) {

        button.classList.add(
          "completed"
        );

        button.disabled =
          true;

      }

    }
  );


  if (
    civilizationProgress >= 7
  ) {

    setRevealHTML(
      civilizationReveal,
      `
        <p>
          Feu.
        </p>

        <p>
          Outils.
        </p>

        <p>
          Roue.
        </p>

        <p>
          Écriture.
        </p>

        <p>
          Machines.
        </p>

        <p>
          Circuits.
        </p>

        <p class="impact-text">
          RÉSEAUX / IA ?
        </p>
      `
    );

  }

}


civilizationButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.civilization;


        const expected =
          civilizationOrder[
            civilizationProgress
          ];


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


        civilizationProgress++;


        localStorage.setItem(
          STORAGE_CIVILIZATION,
          civilizationProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          civilizationReveal,
          `
            <p>
              ${civilizationTexts[selected]}
            </p>
          `
        );


        playDataSound();


        if (
          civilizationProgress >= 7
        ) {

          setRevealHTML(
            civilizationReveal,
            `
              <p>
                Feu.
              </p>

              <p>
                Outils.
              </p>

              <p>
                Roue.
              </p>

              <p>
                Écriture.
              </p>

              <p>
                Machines.
              </p>

              <p>
                Circuits.
              </p>

              <p class="impact-text">
                RÉSEAUX / IA ?
              </p>

              <p class="emphasis">
                Est-ce réellement
                ce que la fresque représente ?
                Ou Hope interprète-t-elle
                l’ancien avec un regard moderne ?
              </p>
            `
          );


          showSecret(
            "civilization-progression",
            "Une série de fresques semble représenter une progression technologique allant du feu jusqu’à des systèmes proches des réseaux modernes."
          );

        }

      }
    );

  });


restoreCivilization();


/* =========================================================
   INTERACTION 12
   IMPULSION / POSSIBILITÉS
========================================================= */

const impulseReveal =
  document.getElementById(
    "impulseReveal"
  );


let impulseObserved =
  getStoredArray(
    STORAGE_IMPULSE
  );


const impulseTexts = {

  tension:
    "Les montagnes sont déjà fissurées avant l’événement représenté. La catastrophe semble déjà possible.",

  trigger:
    "La sphère ne paraît pas créer la catastrophe. Elle semble seulement déclencher quelque chose qui était déjà prêt à se produire.",

  butterfly:
    "Hope pense à une logique proche de l’effet papillon : une petite perturbation peut suffire lorsqu’un système est déjà instable.",

  divergence:
    "D’autres fresques montrent ensuite des sphères presque identiques qui évoluent pourtant dans des directions différentes."

};


document
  .querySelectorAll(
    ".impulse-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.impulse;


        impulseObserved =
          addStoredValue(
            STORAGE_IMPULSE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          impulseReveal,
          `
            <p>
              ${impulseTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          impulseObserved.length >= 4
        ) {

          setRevealHTML(
            impulseReveal,
            `
              <p>
                Une tension existe déjà.
              </p>

              <p>
                Une impulsion intervient.
              </p>

              <p>
                L’événement bascule.
              </p>

              <p>
                Puis les trajectoires divergent.
              </p>

              <p class="impact-text">
                DES POSSIBILITÉS.
              </p>

              <p class="emphasis">
                Futurs possibles ?
                Mondes différents ?
                Hope refuse encore
                de conclure.
              </p>
            `
          );


          showSecret(
            "butterfly-possibilities",
            "Les fresques semblent montrer de petites impulsions capables de faire diverger l’évolution d’un monde ou d’une possibilité."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".impulse-trigger"
  )
  .forEach((button) => {

    if (
      impulseObserved.includes(
        button.dataset.impulse
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 13
   LA FIOLE
========================================================= */

const vialReveal =
  document.getElementById(
    "vialReveal"
  );


let vialObserved =
  getStoredArray(
    STORAGE_VIAL
  );


const vialTexts = {

  fragment:
    "Hope comprend l’idée générale : la goutte de sang est décrite comme un fragment de ceux qui ont laissé ce message.",

  preserved:
    "Le fragment aurait été conservé, volontairement, pendant une durée impossible à déterminer.",

  worlds:
    "Le message semble indiquer qu’un fragment aurait été conservé dans chaque monde, ou dans chaque sphère représentée.",

  meeting:
    "La suite semble attendre un moment précis : celui où leur sang rencontrera celui des êtres vivant dans ce monde."

};


document
  .querySelectorAll(
    ".vial-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.vial;


        vialObserved =
          addStoredValue(
            STORAGE_VIAL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          vialReveal,
          `
            <p>
              ${vialTexts[type]}
            </p>
          `
        );


        playRevealSound();


        if (
          vialObserved.length >= 4
        ) {

          setRevealHTML(
            vialReveal,
            `
              <p>
                Un fragment de nous.
              </p>

              <p>
                Conservé.
              </p>

              <p>
                Dans chaque monde.
              </p>

              <p>
                Jusqu’à la rencontre.
              </p>

              <p class="impact-text">
                « LORSQUE NOTRE SANG
                RENCONTRERA LE LEUR… »
              </p>

              <p class="name-reveal">
                « … L’ÉQUILIBRE
                POURRA RENAÎTRE PARMI EUX. »
              </p>
            `
          );


          showSecret(
            "ancient-blood",
            "La fiole semble contenir un fragment de sang ancien conservé jusqu’au moment où il rencontrerait le sang humain."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".vial-trigger"
  )
  .forEach((button) => {

    if (
      vialObserved.includes(
        button.dataset.vial
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 14
   RELIER LA FIOLE À ANNA
========================================================= */

const annaTruthReveal =
  document.getElementById(
    "annaTruthReveal"
  );


let annaTruthObserved =
  getStoredArray(
    STORAGE_ANNA_TRUTH
  );


const annaTruthTexts = {

  vial:
    "Root avait confié à Betty une fiole de sang impossible à dater.",

  root:
    "Root connaissait l’existence de cette fiole et l’avait volontairement confiée à Betty pour analyse.",

  betty:
    "Betty est la seule personne qui pouvait avoir accès au sang ancien et aux moyens biologiques nécessaires pour l’étudier.",

  age:
    "Anna a dix-neuf ans. Hope refait mentalement les dates et comprend que cette chronologie peut correspondre.",

  learning:
    "Anna apprend à une vitesse anormalement élevée et assimile certaines compétences avec une facilité difficile à expliquer.",

  intuition:
    "Ses perceptions et son intuition dépassent régulièrement ce qu’Hope attend d’une jeune femme ordinaire.",

  hale:
    "Hale protège Anna depuis sa naissance comme si cette protection avait été décidée bien avant que la jeune femme puisse représenter un danger apparent.",

  lee:
    "Maître Lee parle d’Anna comme de quelqu’un dont l’importance existe déjà, avant même qu’Anna elle-même ne la comprenne.",

  guardians:
    "Les Gardiens Noirs concentrent une attention considérable sur Anna, ce qui confirme qu’ils connaissent ou soupçonnent quelque chose."

};


document
  .querySelectorAll(
    ".anna-truth-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.annaTruth;


        annaTruthObserved =
          addStoredValue(
            STORAGE_ANNA_TRUTH,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          annaTruthReveal,
          `
            <p>
              ${annaTruthTexts[type]}
            </p>
          `
        );


        playDeductionSound();


        if (
          annaTruthObserved.length >= 9
        ) {

          setRevealHTML(
            annaTruthReveal,
            `
              <p>
                La fiole.
              </p>

              <p>
                Root.
              </p>

              <p>
                Betty.
              </p>

              <p>
                Dix-neuf ans.
              </p>

              <p>
                L’apprentissage.
              </p>

              <p>
                L’intuition.
              </p>

              <p>
                Hale.
              </p>

              <p>
                Maître Lee.
              </p>

              <p>
                Les Gardiens Noirs.
              </p>

              <p class="impact-text">
                TROP DE CHOSES
                S’EMBOÎTENT.
              </p>

              <p class="name-reveal">
                ANNA.
              </p>

              <p class="emphasis">
                Et si la question
                n’était pas de savoir
                ce qu’elle peut devenir…
              </p>

              <p class="impact-text">
                MAIS CE QU’ELLE EST DÉJÀ ?
              </p>
            `
          );


          showSecret(
            "anna-blood-link",
            "Hope comprend que la fiole, les recherches de Betty et l’existence d’Anna pourraient être directement liées."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".anna-truth-trigger"
  )
  .forEach((button) => {

    if (
      annaTruthObserved.includes(
        button.dataset.annaTruth
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-30"
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
   SON D'AMBIANCE
========================================================= */

let audioCtx =
  null;

let masterGain =
  null;

let ambienceOsc1 =
  null;

let ambienceOsc2 =
  null;

let soundActive =
  false;


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


/* =========================================================
   ARRÊT SON
========================================================= */

function stopSound() {

  if (
    !soundActive ||
    !audioCtx
  ) {
    return;
  }


  if (masterGain) {

    masterGain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + 0.35
      );

  }


  setTimeout(
    () => {

      try {

        ambienceOsc1?.stop();

        ambienceOsc2?.stop();

        audioCtx?.close();

      } catch {

        /* rien */

      }


      audioCtx =
        null;

      masterGain =
        null;

      ambienceOsc1 =
        null;

      ambienceOsc2 =
        null;

    },
    450
  );


  soundActive =
    false;


  if (soundBtn) {

    soundBtn.classList.remove(
      "sound-active"
    );


    soundBtn.textContent =
      "♫";

  }

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

function playClueSound() {

  playTone(
    430,
    0.35,
    0.018
  );


  setTimeout(
    () => {

      playTone(
        575,
        0.45,
        0.015
      );

    },
    100
  );

}


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


function playDataSound() {

  playTone(
    360,
    0.3,
    0.016,
    "square"
  );


  setTimeout(
    () => {

      playTone(
        445,
        0.4,
        0.014,
        "triangle"
      );

    },
    110
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


function playTunnelSound() {

  playTone(
    230,
    0.6,
    0.015,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        320,
        0.8,
        0.012,
        "sine"
      );

    },
    140
  );

}


function playArtifactSound() {

  playTone(
    380,
    0.65,
    0.017,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        520,
        0.85,
        0.014,
        "triangle"
      );

    },
    140
  );


  setTimeout(
    () => {

      playTone(
        690,
        1,
        0.012
      );

    },
    300
  );

}


function playDragonSound() {

  playTone(
    250,
    0.45,
    0.022,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        470,
        0.75,
        0.018,
        "sine"
      );

    },
    120
  );

}


function playPhoenixSound() {

  playTone(
    420,
    0.5,
    0.02,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        690,
        0.8,
        0.017,
        "sine"
      );

    },
    120
  );


  setTimeout(
    () => {

      playTone(
        880,
        1,
        0.013,
        "triangle"
      );

    },
    260
  );

}


function playCosmicSound() {

  playTone(
    310,
    0.7,
    0.015,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        515,
        0.9,
        0.013,
        "triangle"
      );

    },
    160
  );


  setTimeout(
    () => {

      playTone(
        740,
        1.1,
        0.01,
        "sine"
      );

    },
    320
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


/* =========================================================
   FIN INITIALISATION
========================================================= */

});
