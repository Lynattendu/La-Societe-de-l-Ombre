/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 11 — LE MONDE CONVERGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
localStorage.setItem(
  "societeOmbre_dernierePage",
  "chapitre11.html"
);

localStorage.setItem(
  "societeOmbre_dernierTitre",
  "Chapitre 11 - Le monde converge"
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
  "societeOmbre_chapitre11_";

const STORAGE_SCROLL =
  STORAGE_PREFIX + "scroll";

const STORAGE_PROGRESS =
  STORAGE_PREFIX + "progression";

const STORAGE_COMPLETED =
  STORAGE_PREFIX + "termine";

const STORAGE_SECRETS =
  STORAGE_PREFIX + "secrets";

const STORAGE_CONVERGENCE =
  STORAGE_PREFIX + "convergence";

const STORAGE_ANNA_IMPORTANCE =
  STORAGE_PREFIX + "annaImportance";

const STORAGE_LEE_LUCY =
  STORAGE_PREFIX + "leeLucy";

const STORAGE_LOCATE_HOPE =
  STORAGE_PREFIX + "locateHope";

const STORAGE_UNDERGROUND_MAP =
  STORAGE_PREFIX + "undergroundMap";

const STORAGE_BIOLOGY =
  STORAGE_PREFIX + "biology";

const STORAGE_TREATMENT =
  STORAGE_PREFIX + "treatment";

const STORAGE_TEAM =
  STORAGE_PREFIX + "team";

const STORAGE_EXPEDITION =
  STORAGE_PREFIX + "expedition";

const STORAGE_PROTECTION =
  STORAGE_PREFIX + "protection";

const STORAGE_TRAINING_ROOM =
  STORAGE_PREFIX + "trainingRoom";

const STORAGE_ENVIRONMENTS =
  STORAGE_PREFIX + "environments";

const STORAGE_TECHNOLOGY =
  STORAGE_PREFIX + "technology";

const STORAGE_SYMBOL =
  STORAGE_PREFIX + "symbol";

const STORAGE_SYMBOL_TOUCH =
  STORAGE_PREFIX + "symbolTouch";


/* =========================================================
   COMPATIBILITÉ ANCIENNE FIN
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre11_finished"
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
    "chapitre11.html?lecture=recommencer";

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


function openReveal(reveal) {

  if (!reveal) {
    return;
  }


  reveal.classList.add(
    "open"
  );

}


function completeButton(
  button,
  text = null
) {

  if (!button) {
    return;
  }


  button.classList.add(
    "completed"
  );


  if (text) {

    button.textContent =
      text;

  }

}


/* =========================================================
   INTERACTION 1
   CONVERGENCE
========================================================= */

const convergenceReveal =
  document.getElementById(
    "convergenceReveal"
  );


let convergenceObserved =
  getStoredArray(
    STORAGE_CONVERGENCE
  );


const convergenceTexts = {

  sentinels:
    "Les Sentinelles présentes au Mexique renforcent discrètement leurs positions après la disparition de leur Maître Unique.",

  guardians:
    "Les Gardiens Noirs réorganisent eux aussi leurs réseaux et profitent de l’incertitude créée par l’absence de Hope.",

  independent:
    "D’autres groupes n’appartiennent directement à aucun des deux ordres mais comprennent qu’un changement majeur est en cours.",

  observers:
    "Certains réseaux ne cherchent ni à protéger ni à attaquer. Ils veulent simplement comprendre pourquoi tant d’acteurs se mobilisent.",

  anna:
    "Au centre de tous ces mouvements apparaît le même nom : Anna Flores."

};


document
  .querySelectorAll(
    ".convergence-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.convergence;


        convergenceObserved =
          addStoredValue(
            STORAGE_CONVERGENCE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          convergenceReveal,
          `
            <p>
              ${convergenceTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          convergenceObserved.length >= 5
        ) {

          setRevealHTML(
            convergenceReveal,
            `
              <p>
                Sentinelles.
              </p>

              <p>
                Gardiens Noirs.
              </p>

              <p>
                Groupes indépendants.
              </p>

              <p>
                Observateurs.
              </p>

              <p class="impact-text">
                LA DISPARITION D’HOPE
                CRÉE UN VIDE.
              </p>

              <p class="name-reveal">
                ANNA DEVIENT
                LE POINT DE CONVERGENCE.
              </p>
            `
          );


          showSecret(
            "world-converges",
            "La disparition de Hope modifie immédiatement l’équilibre des forces autour d’Anna."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".convergence-trigger"
  )
  .forEach((button) => {

    if (
      convergenceObserved.includes(
        button.dataset.convergence
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 2
   IMPORTANCE D'ANNA
========================================================= */

const annaImportanceReveal =
  document.getElementById(
    "annaImportanceReveal"
  );


let annaImportanceObserved =
  getStoredArray(
    STORAGE_ANNA_IMPORTANCE
  );


const annaImportanceTexts = {

  hope:
    "Hope était l’une des protections les plus puissantes autour d’Anna. Sa disparition modifie immédiatement les calculs de tous les groupes.",

  protection:
    "Anna reste entourée de personnes capables, mais la disparition du Maître Unique rend son environnement objectivement plus vulnérable.",

  orders:
    "Sentinelles et Gardiens Noirs réorganisent leurs positions presque simultanément autour du même événement.",

  future:
    "Root refuse encore d’expliquer précisément pourquoi, mais elle considère qu’Anna pourrait avoir une importance considérable dans ce qui arrive."

};


document
  .querySelectorAll(
    ".anna-importance-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.annaImportance;


        annaImportanceObserved =
          addStoredValue(
            STORAGE_ANNA_IMPORTANCE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          annaImportanceReveal,
          `
            <p>
              ${annaImportanceTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          annaImportanceObserved.length >= 4
        ) {

          setRevealHTML(
            annaImportanceReveal,
            `
              <p>
                Hope disparaît.
              </p>

              <p>
                La protection change.
              </p>

              <p>
                Les deux ordres bougent.
              </p>

              <p>
                Anna reste au centre.
              </p>

              <p class="emphasis">
                Quelque chose dans son existence
                intéresse désormais
                beaucoup trop de monde.
              </p>
            `
          );


          showSecret(
            "anna-central",
            "Anna devient un enjeu stratégique encore plus important depuis la disparition de Hope."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".anna-importance-trigger"
  )
  .forEach((button) => {

    if (
      annaImportanceObserved.includes(
        button.dataset.annaImportance
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 3
   LEE / LUCY
========================================================= */

const leeLucyReveal =
  document.getElementById(
    "leeLucyReveal"
  );


let leeLucyObserved =
  getStoredArray(
    STORAGE_LEE_LUCY
  );


const leeLucyTexts = {

  questions:
    "Lucy cherche immédiatement les incohérences, les informations manquantes et les réponses que les autres évitent.",

  lee:
    "Maître Lee semble déjà connaître suffisamment Lucy pour anticiper son caractère avant même leur première véritable rencontre.",

  root:
    "Root tente de cacher son amusement, signe qu’elle connaît probablement une partie de l’explication.",

  connection:
    "Lee affirme qu’ils ne se connaissent pas encore. Pourtant, il dit que Lucy est exactement comme il l’imaginait."

};


document
  .querySelectorAll(
    ".lee-lucy-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.leeLucy;


        leeLucyObserved =
          addStoredValue(
            STORAGE_LEE_LUCY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          leeLucyReveal,
          `
            <p>
              ${leeLucyTexts[type]}
            </p>
          `
        );


        playMemorySound();


        if (
          leeLucyObserved.length >= 4
        ) {

          setRevealHTML(
            leeLucyReveal,
            `
              <p>
                Lucy questionne.
              </p>

              <p>
                Lee l’observe.
              </p>

              <p>
                Root sait quelque chose.
              </p>

              <p class="impact-text">
                « TU ES EXACTEMENT
                COMME JE L’IMAGINAIS. »
              </p>

              <p class="emphasis">
                « On se connaît ? »
                — « Pas encore. »
              </p>
            `
          );


          showSecret(
            "lee-knows-lucy",
            "Maître Lee semble posséder des informations sur Lucy alors qu’elle ne se souvient pas de l’avoir déjà rencontré."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".lee-lucy-trigger"
  )
  .forEach((button) => {

    if (
      leeLucyObserved.includes(
        button.dataset.leeLucy
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 4
   LOCALISER HOPE
========================================================= */

const locateHopeReveal =
  document.getElementById(
    "locateHopeReveal"
  );


let locateHopeObserved =
  getStoredArray(
    STORAGE_LOCATE_HOPE
  );


const locateHopeTexts = {

  crash:
    "Le bouclier Crash activé pendant la chute a laissé une signature résiduelle extrêmement faible mais encore détectable.",

  environment:
    "Peter compare cette signature avec plusieurs capteurs environnementaux situés dans la région.",

  hydrology:
    "Les données hydrologiques permettent d’écarter progressivement certaines trajectoires possibles du courant.",

  max:
    "Plusieurs dispositifs présents dans le matériel de Max ont continué à enregistrer des informations pendant et après la fuite."

};


document
  .querySelectorAll(
    ".locate-hope-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.locateHope;


        locateHopeObserved =
          addStoredValue(
            STORAGE_LOCATE_HOPE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          locateHopeReveal,
          `
            <p>
              ${locateHopeTexts[type]}
            </p>
          `
        );


        playDataSound();


        if (
          locateHopeObserved.length >= 4
        ) {

          setRevealHTML(
            locateHopeReveal,
            `
              <p>
                Signature Crash.
              </p>

              <p>
                Capteurs environnementaux.
              </p>

              <p>
                Hydrologie.
              </p>

              <p>
                Données du matériel de Max.
              </p>

              <p class="impact-text">
                ZONE PROBABLE IDENTIFIÉE.
              </p>

              <p class="emphasis">
                Hope n’a probablement pas
                suivi le courant principal.
              </p>
            `
          );


          showSecret(
            "hope-zone",
            "Peter parvient à réduire la zone de recherche grâce à la signature résiduelle du bouclier Crash et aux données hydrologiques."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".locate-hope-trigger"
  )
  .forEach((button) => {

    if (
      locateHopeObserved.includes(
        button.dataset.locateHope
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 5
   CARTE SOUTERRAINE
========================================================= */

const undergroundMapReveal =
  document.getElementById(
    "undergroundMapReveal"
  );


const undergroundMapButtons =
  document.querySelectorAll(
    ".underground-map-trigger"
  );


const undergroundMapOrder = [
  "fall",
  "secondary",
  "rock",
  "network",
  "zone"
];


let undergroundMapProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_UNDERGROUND_MAP
    ) || "0",
    10
  );


const undergroundMapTexts = {

  fall:
    "Point de départ : la falaise et l’impact dans le cours d’eau.",

  secondary:
    "Le courant secondaire emporte Hope dans une direction différente de celle d’Amy.",

  rock:
    "Le passage se poursuit sous la roche, hors de toute observation depuis la surface.",

  network:
    "Les données géologiques suggèrent l’existence d’un réseau souterrain encore mal cartographié.",

  zone:
    "Plusieurs paramètres convergent vers une zone réduite, mais aucune entrée directe n’est encore identifiée."

};


function restoreUndergroundMap() {

  undergroundMapButtons.forEach(
    (button, index) => {

      if (
        index < undergroundMapProgress
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
    undergroundMapProgress >= 5
  ) {

    setRevealHTML(
      undergroundMapReveal,
      `
        <p>
          Chute.
        </p>

        <p>
          Courant secondaire.
        </p>

        <p>
          Passage sous la roche.
        </p>

        <p>
          Réseau souterrain.
        </p>

        <p class="impact-text">
          ZONE PROBABLE.
        </p>

        <p class="emphasis">
          Une grotte
          est une hypothèse crédible.
        </p>
      `
    );

  }

}


undergroundMapButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.undergroundMap;


        const expected =
          undergroundMapOrder[
            undergroundMapProgress
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


        undergroundMapProgress++;


        localStorage.setItem(
          STORAGE_UNDERGROUND_MAP,
          undergroundMapProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          undergroundMapReveal,
          `
            <p>
              ${undergroundMapTexts[selected]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          undergroundMapProgress >= 5
        ) {

          setRevealHTML(
            undergroundMapReveal,
            `
              <p>
                Chute.
              </p>

              <p>
                Courant secondaire.
              </p>

              <p>
                Passage sous roche.
              </p>

              <p>
                Réseau souterrain.
              </p>

              <p class="impact-text">
                ZONE PROBABLE IDENTIFIÉE.
              </p>

              <p class="emphasis">
                Mais les Gardiens
                cherchent eux aussi.
              </p>
            `
          );


          showSecret(
            "underground-search",
            "Peter pense désormais que Hope se trouve dans un réseau souterrain sous la région."
          );

        }

      }
    );

  });


restoreUndergroundMap();


/* =========================================================
   INTERACTION 6
   ÉTAT BIOLOGIQUE
========================================================= */

const biologyReveal =
  document.getElementById(
    "biologyReveal"
  );


let biologyObserved =
  getStoredArray(
    STORAGE_BIOLOGY
  );


const biologyTexts = {

  trauma:
    "Les mesures indirectes indiquent un traumatisme important compatible avec la chute et les blessures précédentes d’Hope.",

  regeneration:
    "Les mécanismes de réparation d’Hope fonctionnent toujours, mais leur organisation semble perturbée.",

  cells:
    "Certaines cellules se multiplient rapidement sans que le système de régénération semble distinguer parfaitement celles qui doivent poursuivre leur croissance.",

  lesions:
    "Le phénomène se concentre autour de plusieurs zones lésées et semble directement lié à la tentative de réparation."

};


document
  .querySelectorAll(
    ".biology-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.biology;


        biologyObserved =
          addStoredValue(
            STORAGE_BIOLOGY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          biologyReveal,
          `
            <p>
              ${biologyTexts[type]}
            </p>
          `
        );


        playBiologySound();


        if (
          biologyObserved.length >= 4
        ) {

          setRevealHTML(
            biologyReveal,
            `
              <p>
                Traumatisme important.
              </p>

              <p>
                Régénération active.
              </p>

              <p>
                Multiplication désorganisée.
              </p>

              <p>
                Zones lésées.
              </p>

              <p class="impact-text">
                CE N’EST PAS UNE TUMEUR.
              </p>

              <p class="emphasis">
                Mais la réparation
                ne sait plus parfaitement
                quelles cellules doivent continuer
                à se multiplier.
              </p>
            `
          );


          showSecret(
            "hope-regeneration",
            "La capacité de régénération d’Hope fonctionne encore, mais elle pourrait devenir dangereuse si la multiplication cellulaire reste désorganisée."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".biology-trigger"
  )
  .forEach((button) => {

    if (
      biologyObserved.includes(
        button.dataset.biology
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 7
   PROTOTYPE DE BETTY
========================================================= */

const treatmentReveal =
  document.getElementById(
    "treatmentReveal"
  );


let treatmentObserved =
  getStoredArray(
    STORAGE_TREATMENT
  );


const treatmentTexts = {

  capsules:
    "Les capsules de Peter accélèrent les mécanismes de réparation et soutiennent temporairement les tissus endommagés.",

  prototype:
    "Le prototype de Betty est conçu pour identifier certaines modifications cellulaires anormales et freiner leur multiplication.",

  risk:
    "Accélérer la réparation sans contrôler les cellules concernées pourrait amplifier la multiplication désorganisée.",

  combine:
    "L’idée de Peter consiste à associer accélération de la réparation et contrôle sélectif de la multiplication cellulaire."

};


document
  .querySelectorAll(
    ".treatment-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.treatment;


        treatmentObserved =
          addStoredValue(
            STORAGE_TREATMENT,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          treatmentReveal,
          `
            <p>
              ${treatmentTexts[type]}
            </p>
          `
        );


        playArtifactSound();


        if (
          treatmentObserved.length >= 4
        ) {

          setRevealHTML(
            treatmentReveal,
            `
              <p>
                Peter :
                accélérer la réparation.
              </p>

              <p>
                Betty :
                contrôler les cellules anormales.
              </p>

              <p>
                Risque :
                accélérer les mauvaises cellules.
              </p>

              <p class="impact-text">
                COMBINER LES DEUX.
              </p>

              <p class="emphasis">
                Réparer
                sans laisser la réparation
                devenir dangereuse.
              </p>
            `
          );


          showSecret(
            "betty-prototype",
            "Le prototype de Betty pourrait devenir le complément nécessaire aux capsules de Peter pour traiter Hope."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".treatment-trigger"
  )
  .forEach((button) => {

    if (
      treatmentObserved.includes(
        button.dataset.treatment
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 8
   ÉQUIPE DE RECHERCHE
========================================================= */

const teamReveal =
  document.getElementById(
    "teamReveal"
  );


let teamObserved =
  getStoredArray(
    STORAGE_TEAM
  );


const teamTexts = {

  root:
    "Root apporte sa connaissance du terrain, son sens de l’orientation et sa capacité à comprendre les traces et les environnements.",

  betty:
    "Betty apporte la biologie, l’analyse cellulaire et la seule expertise permettant d’adapter son prototype si Hope est retrouvée.",

  max:
    "Max apporte son expérience du terrain, sa mobilité et les dispositifs de protection développés par Peter.",

  peter:
    "Peter reste à distance mais fournit cartographie, données, capteurs, matériel et assistance technologique."

};


document
  .querySelectorAll(
    ".team-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.team;


        teamObserved =
          addStoredValue(
            STORAGE_TEAM,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          teamReveal,
          `
            <p>
              ${teamTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          teamObserved.length >= 4
        ) {

          setRevealHTML(
            teamReveal,
            `
              <p>
                Root :
                terrain et orientation.
              </p>

              <p>
                Betty :
                biologie.
              </p>

              <p>
                Max :
                terrain et protection.
              </p>

              <p>
                Peter :
                technologie à distance.
              </p>

              <p class="impact-text">
                ÉQUIPE DE RECHERCHE
                CONSTITUÉE.
              </p>
            `
          );


          showSecret(
            "search-team",
            "Root, Betty, Max et Peter réunissent quatre expertises complémentaires pour retrouver Hope."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".team-trigger"
  )
  .forEach((button) => {

    if (
      teamObserved.includes(
        button.dataset.team
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 9
   MATÉRIEL D'EXPÉDITION
========================================================= */

const expeditionReveal =
  document.getElementById(
    "expeditionReveal"
  );


let expeditionObserved =
  getStoredArray(
    STORAGE_EXPEDITION
  );


const expeditionTexts = {

  thermal:
    "La protection thermique doit permettre à l’équipe d’évoluer dans des cavités froides, humides ou soumises à de brusques variations de température.",

  sensors:
    "Les capteurs souterrains analysent les cavités, les flux d’eau, les vibrations et certaines signatures électroniques.",

  beacons:
    "Les balises permettront de conserver une route de retour et de transmettre la progression de l’équipe malgré un réseau instable.",

  capsules:
    "Les capsules de Peter seront emportées pour stabiliser Hope si elle est retrouvée, mais Betty interdit toute combinaison avec son prototype avant validation."

};


document
  .querySelectorAll(
    ".expedition-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.expedition;


        expeditionObserved =
          addStoredValue(
            STORAGE_EXPEDITION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          expeditionReveal,
          `
            <p>
              ${expeditionTexts[type]}
            </p>
          `
        );


        playEquipmentSound();


        if (
          expeditionObserved.length >= 4
        ) {

          setRevealHTML(
            expeditionReveal,
            `
              <p>
                Protection thermique.
              </p>

              <p>
                Capteurs souterrains.
              </p>

              <p>
                Balises.
              </p>

              <p>
                Capsules.
              </p>

              <p class="impact-text">
                EXPÉDITION PRÊTE.
              </p>

              <p class="emphasis">
                Hope doit être retrouvée
                avant les Gardiens.
              </p>
            `
          );


          showSecret(
            "expedition-ready",
            "La recherche de Hope devient une véritable opération souterraine équipée par Peter."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".expedition-trigger"
  )
  .forEach((button) => {

    if (
      expeditionObserved.includes(
        button.dataset.expedition
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 10
   QUI PROTÈGE ANNA ?
========================================================= */

const protectionReveal =
  document.getElementById(
    "protectionReveal"
  );


let protectionObserved =
  getStoredArray(
    STORAGE_PROTECTION
  );


const protectionTexts = {

  root:
    "Root quitte l’Institut pour participer directement à la recherche de Hope.",

  max:
    "Max part avec Root et Betty afin d’apporter protection, expérience du terrain et équipement.",

  betty:
    "Betty doit être présente si l’état biologique d’Hope exige l’utilisation de son prototype.",

  lucy:
    "Lucy reste auprès d’Anna. Ce n’est pas la mission qu’elle aurait choisie, mais elle devient sa protection immédiate."

};


document
  .querySelectorAll(
    ".protection-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.protection;


        protectionObserved =
          addStoredValue(
            STORAGE_PROTECTION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          protectionReveal,
          `
            <p>
              ${protectionTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          protectionObserved.length >= 4
        ) {

          setRevealHTML(
            protectionReveal,
            `
              <p>
                Root part.
              </p>

              <p>
                Betty part.
              </p>

              <p>
                Max part.
              </p>

              <p class="impact-text">
                LUCY RESTE AVEC ANNA.
              </p>

              <p class="emphasis">
                Et Anna déteste déjà
                l’idée d’avoir
                une baby-sitter.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".protection-trigger"
  )
  .forEach((button) => {

    if (
      protectionObserved.includes(
        button.dataset.protection
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 11
   SALLE D'ENTRAÎNEMENT
========================================================= */

const trainingRoomReveal =
  document.getElementById(
    "trainingRoomReveal"
  );


let trainingRoomObserved =
  getStoredArray(
    STORAGE_TRAINING_ROOM
  );


const trainingRoomTexts = {

  robots:
    "Des robots mobiles simulent des adversaires et peuvent modifier leur comportement en temps réel.",

  drones:
    "Les drones imposent une menace venant de plusieurs hauteurs et directions à la fois.",

  balance:
    "Le parcours d’équilibre oblige à conserver précision et mobilité sur des surfaces instables.",

  walls:
    "Les murs modulables changent la configuration de la pièce et peuvent créer de nouveaux passages ou obstacles.",

  targets:
    "Les cibles mouvantes imposent d’observer, anticiper et décider en quelques secondes."

};


document
  .querySelectorAll(
    ".training-room-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.trainingRoom;


        trainingRoomObserved =
          addStoredValue(
            STORAGE_TRAINING_ROOM,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          trainingRoomReveal,
          `
            <p>
              ${trainingRoomTexts[type]}
            </p>
          `
        );


        playEquipmentSound();


        if (
          trainingRoomObserved.length >= 5
        ) {

          setRevealHTML(
            trainingRoomReveal,
            `
              <p>
                Robots.
              </p>

              <p>
                Drones.
              </p>

              <p>
                Équilibre.
              </p>

              <p>
                Environnement modulable.
              </p>

              <p>
                Cibles mobiles.
              </p>

              <p class="impact-text">
                RIEN ICI
                N’EST DÉCORATIF.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".training-room-trigger"
  )
  .forEach((button) => {

    if (
      trainingRoomObserved.includes(
        button.dataset.trainingRoom
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 12
   PISCINE + JUNGLE
========================================================= */

const environmentsReveal =
  document.getElementById(
    "environmentsReveal"
  );


let environmentsObserved =
  getStoredArray(
    STORAGE_ENVIRONMENTS
  );


const environmentsTexts = {

  tunnels:
    "Sous la piscine se trouvent des tunnels conçus pour entraîner orientation, respiration et contrôle sous l’eau.",

  currents:
    "Des courants artificiels peuvent modifier brutalement le déplacement du nageur et simuler un environnement naturel difficile.",

  obstacles:
    "Les obstacles imposent de changer de trajectoire dans des espaces étroits sans perdre son calme.",

  jungle:
    "La jungle intérieure reproduit un environnement végétal dense, humide et volontairement difficile à lire.",

  rocks:
    "Eau, rochers et végétation créent un terrain où observation, silence et adaptation deviennent essentiels."

};


document
  .querySelectorAll(
    ".environments-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.environments;


        environmentsObserved =
          addStoredValue(
            STORAGE_ENVIRONMENTS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          environmentsReveal,
          `
            <p>
              ${environmentsTexts[type]}
            </p>
          `
        );


        playNatureSound();


        if (
          environmentsObserved.length >= 5
        ) {

          setRevealHTML(
            environmentsReveal,
            `
              <p>
                Eau.
              </p>

              <p>
                Tunnels.
              </p>

              <p>
                Courants.
              </p>

              <p>
                Obstacles.
              </p>

              <p>
                Jungle.
              </p>

              <p class="emphasis">
                Root ne crée jamais
                quelque chose uniquement
                pour que ce soit joli.
              </p>
            `
          );


          showSecret(
            "tempass-training",
            "L’Institut Tempass possède des environnements conçus pour reproduire des situations extrêmes de terrain."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".environments-trigger"
  )
  .forEach((button) => {

    if (
      environmentsObserved.includes(
        button.dataset.environments
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 13
   SALLE TECHNOLOGIQUE
========================================================= */

const technologyReveal =
  document.getElementById(
    "technologyReveal"
  );


let technologyObserved =
  getStoredArray(
    STORAGE_TECHNOLOGY
  );


const technologyTexts = {

  hologram:
    "Certains dispositifs ressemblent à des systèmes de projection ou de simulation holographique.",

  sensor:
    "Plusieurs objets sont probablement des capteurs expérimentaux capables de mesurer des paramètres inhabituels.",

  prototype:
    "De nombreux appareils ne semblent pas encore être des produits finis mais de véritables prototypes.",

  danger:
    "Lucy préfère ne rien tester. Avec Peter, elle estime qu’un objet inconnu peut aussi bien projeter une image que déclencher quelque chose de beaucoup moins amusant."

};


document
  .querySelectorAll(
    ".technology-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.technology;


        technologyObserved =
          addStoredValue(
            STORAGE_TECHNOLOGY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          technologyReveal,
          `
            <p>
              ${technologyTexts[type]}
            </p>
          `
        );


        playDataSound();


        if (
          technologyObserved.length >= 4
        ) {

          setRevealHTML(
            technologyReveal,
            `
              <p>
                Interfaces.
              </p>

              <p>
                Capteurs.
              </p>

              <p>
                Prototypes.
              </p>

              <p class="impact-text">
                NE TOUCHE À RIEN.
              </p>

              <p class="emphasis">
                « Connaissant Peter,
                ça peut soit projeter
                un hologramme,
                soit exploser. »
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".technology-trigger"
  )
  .forEach((button) => {

    if (
      technologyObserved.includes(
        button.dataset.technology
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 14
   LE SYMBOLE DE LA GROTTE
========================================================= */

const symbolReveal =
  document.getElementById(
    "symbolReveal"
  );

const touchSymbolTrigger =
  document.getElementById(
    "touchSymbolTrigger"
  );

const touchSymbolReveal =
  document.getElementById(
    "touchSymbolReveal"
  );


let symbolObserved =
  getStoredArray(
    STORAGE_SYMBOL
  );


const symbolTexts = {

  sand:
    "Le sable présente toujours d’étranges reflets multicolores malgré la faiblesse de la lumière.",

  water:
    "L’eau sombre semble calme dans la vasque, bien loin de la violence du courant qui a entraîné Hope jusque-là.",

  light:
    "Le mince puits de lumière venant de la surface suffit à révéler certaines irrégularités dans la roche.",

  mark:
    "Un symbole apparaît sur la paroi. Hope le reconnaît immédiatement sans parvenir à retrouver le souvenir qui lui est associé."

};


function updateSymbolTouchState() {

  if (!touchSymbolTrigger) {
    return;
  }


  if (
    symbolObserved.length >= 4
  ) {

    touchSymbolTrigger.disabled =
      false;

    touchSymbolTrigger.classList.add(
      "active"
    );

  } else {

    touchSymbolTrigger.disabled =
      true;

    touchSymbolTrigger.classList.remove(
      "active"
    );

  }

}


document
  .querySelectorAll(
    ".symbol-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.symbol;


        symbolObserved =
          addStoredValue(
            STORAGE_SYMBOL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          symbolReveal,
          `
            <p>
              ${symbolTexts[type]}
            </p>
          `
        );


        playArtifactSound();


        if (
          symbolObserved.length >= 4
        ) {

          setRevealHTML(
            symbolReveal,
            `
              <p>
                Sable multicolore.
              </p>

              <p>
                Eau sombre.
              </p>

              <p>
                Puits de lumière.
              </p>

              <p>
                Un symbole.
              </p>

              <p class="impact-text">
                HOPE LE CONNAÎT.
              </p>

              <p class="emphasis">
                Mais elle ne se souvient plus
                où elle l’a déjà vu.
              </p>
            `
          );


          showSecret(
            "cave-symbol",
            "Le symbole de la grotte semble appartenir à un souvenir ancien qu’Hope n’arrive pas encore à retrouver."
          );

        }


        updateSymbolTouchState();

      }
    );

  });


document
  .querySelectorAll(
    ".symbol-trigger"
  )
  .forEach((button) => {

    if (
      symbolObserved.includes(
        button.dataset.symbol
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   TOUCHER LE SYMBOLE
   SOUS-ÉTAPE DE L'INTERACTION 14
========================================================= */

function touchSymbol() {

  if (
    symbolObserved.length < 4
  ) {
    return;
  }


  localStorage.setItem(
    STORAGE_SYMBOL_TOUCH,
    "1"
  );


  openReveal(
    touchSymbolReveal
  );


  completeButton(
    touchSymbolTrigger,
    "Symbole activé"
  );


  touchSymbolTrigger.disabled =
    true;

  touchSymbolTrigger.classList.remove(
    "active"
  );


  playDragonSound();


  showSecret(
    "dragon-activation",
    "Au contact du symbole, le dragon lumineux du bras d’Hope réagit immédiatement."
  );

}


touchSymbolTrigger?.addEventListener(
  "click",
  touchSymbol
);


updateSymbolTouchState();


if (
  localStorage.getItem(
    STORAGE_SYMBOL_TOUCH
  ) === "1"
) {

  openReveal(
    touchSymbolReveal
  );


  completeButton(
    touchSymbolTrigger,
    "Symbole activé"
  );


  if (touchSymbolTrigger) {

    touchSymbolTrigger.disabled =
      true;

    touchSymbolTrigger.classList.remove(
      "active"
    );

  }

}


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-31"
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
   ARRÊT DU SON
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
   SONS
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


function playBiologySound() {

  playTone(
    300,
    0.45,
    0.017,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        510,
        0.65,
        0.014,
        "triangle"
      );

    },
    120
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


function playEquipmentSound() {

  playTone(
    340,
    0.3,
    0.016,
    "square"
  );


  setTimeout(
    () => {

      playTone(
        480,
        0.45,
        0.014,
        "triangle"
      );

    },
    100
  );

}


function playNatureSound() {

  playTone(
    440,
    0.45,
    0.014,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        660,
        0.6,
        0.012,
        "triangle"
      );

    },
    120
  );

}


function playDragonSound() {

  playTone(
    240,
    0.65,
    0.022,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        430,
        0.85,
        0.02,
        "sine"
      );

    },
    140
  );


  setTimeout(
    () => {

      playTone(
        680,
        1.1,
        0.018,
        "triangle"
      );

    },
    300
  );


  setTimeout(
    () => {

      playTone(
        920,
        1.3,
        0.012,
        "sine"
      );

    },
    480
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
