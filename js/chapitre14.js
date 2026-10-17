/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 14 — LES SECRETS NE MEURENT JAMAIS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
localStorage.setItem(
  "societeOmbre_dernierePage",
  "chapitre14.html"
);

localStorage.setItem(
  "societeOmbre_dernierTitre",
  "Chapitre 14 — Les secrets ne meurent jamais"
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
  "societeOmbre_chapitre14_";

const STORAGE_SCROLL =
  STORAGE_PREFIX + "scroll";

const STORAGE_PROGRESS =
  STORAGE_PREFIX + "progression";

const STORAGE_COMPLETED =
  STORAGE_PREFIX + "termine";

const STORAGE_SECRETS =
  STORAGE_PREFIX + "secrets";

const STORAGE_HOPE_RETURN =
  STORAGE_PREFIX + "hopeReturn";

const STORAGE_MEDICAL_ROOM =
  STORAGE_PREFIX + "medicalRoom";

const STORAGE_CAVE_DISCOVERY =
  STORAGE_PREFIX + "caveDiscovery";

const STORAGE_INFILTRATION =
  STORAGE_PREFIX + "infiltration";

const STORAGE_BIRTH_TRUTH =
  STORAGE_PREFIX + "birthTruth";

const STORAGE_ADMIN_ANOMALY =
  STORAGE_PREFIX + "adminAnomaly";

const STORAGE_ANNA_GENETICS =
  STORAGE_PREFIX + "annaGenetics";

const STORAGE_ISABEL =
  STORAGE_PREFIX + "isabel";

const STORAGE_HIDDEN_REPORT =
  STORAGE_PREFIX + "hiddenReport";

const STORAGE_IDENTITY =
  STORAGE_PREFIX + "identity";

const STORAGE_MOLE =
  STORAGE_PREFIX + "mole";

const STORAGE_PETER_SECRET =
  STORAGE_PREFIX + "peterSecret";

const STORAGE_LAB_CREATURE =
  STORAGE_PREFIX + "labCreature";

const STORAGE_NEW_RULES =
  STORAGE_PREFIX + "newRules";


/* =========================================================
   COMPATIBILITÉ ANCIENNE FIN
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre14_finished"
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
    "chapitre14.html?lecture=recommencer";

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

    const value =
      JSON.parse(
        localStorage.getItem(
          STORAGE_SECRETS
        )
      );


    return Array.isArray(value)
      ? value
      : [];

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
   RETOUR D'HOPE
========================================================= */

const hopeReturnReveal =
  document.getElementById(
    "hopeReturnReveal"
  );


let hopeReturnObserved =
  getStoredArray(
    STORAGE_HOPE_RETURN
  );


const hopeReturnTexts = {

  anna:
    "Anna reste immobile une seconde, comme si elle devait vérifier qu’Hope est réellement devant elle.",

  embrace:
    "Anna court vers Hope et se jette dans ses bras sans réfléchir.",

  pain:
    "Hope grimace sous la douleur, mais referme immédiatement ses bras autour d’Anna.",

  betty:
    "Betty semble soulagée. Pourtant, Hope distingue aussi une autre émotion dans son regard : la peur."

};


document
  .querySelectorAll(
    ".hope-return-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.hopeReturn;


        hopeReturnObserved =
          addStoredValue(
            STORAGE_HOPE_RETURN,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          hopeReturnReveal,
          `
            <p>
              ${hopeReturnTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          hopeReturnObserved.length >= 4
        ) {

          setRevealHTML(
            hopeReturnReveal,
            `
              <p>
                Anna retrouve Hope.
              </p>

              <p>
                Hope est blessée.
              </p>

              <p>
                Betty est soulagée.
              </p>

              <p class="impact-text">
                MAIS BETTY A PEUR.
              </p>

              <p class="emphasis">
                Et Hope comprend
                immédiatement pourquoi.
              </p>
            `
          );


          showSecret(
            "betty-fear",
            "Le retour d’Hope soulage Betty, mais la généticienne comprend aussi que certains secrets vont devoir être révélés."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".hope-return-trigger"
  )
  .forEach((button) => {

    if (
      hopeReturnObserved.includes(
        button.dataset.hopeReturn
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  hopeReturnObserved.length >= 4
) {

  setRevealHTML(
    hopeReturnReveal,
    `
      <p>
        Hope est revenue.
      </p>

      <p class="impact-text">
        MAIS BETTY A PEUR.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 2
   PIÈCE MÉDICALE
========================================================= */

const medicalRoomReveal =
  document.getElementById(
    "medicalRoomReveal"
  );


let medicalRoomObserved =
  getStoredArray(
    STORAGE_MEDICAL_ROOM
  );


const medicalRoomTexts = {

  peter:
    "Peter veut examiner Hope immédiatement et ne lui laisse pratiquement aucun choix.",

  root:
    "Root profite de l’occasion pour souligner l’événement exceptionnel : Hope vient d’obéir à quelqu’un.",

  max:
    "Max retrouve immédiatement son humour et considère que tout semble presque revenu à la normale.",

  betty:
    "Hope ne quitte pas Betty des yeux. Pour elle, rien n’est encore revenu à la normale."

};


document
  .querySelectorAll(
    ".medical-room-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.medicalRoom;


        medicalRoomObserved =
          addStoredValue(
            STORAGE_MEDICAL_ROOM,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          medicalRoomReveal,
          `
            <p>
              ${medicalRoomTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          medicalRoomObserved.length >= 4
        ) {

          setRevealHTML(
            medicalRoomReveal,
            `
              <p>
                Peter veut soigner Hope.
              </p>

              <p>
                Root plaisante.
              </p>

              <p>
                Max pense retrouver
                la normalité.
              </p>

              <p>
                Hope regarde Betty.
              </p>

              <p class="impact-text">
                PAS TOUT À FAIT.
              </p>

              <p class="emphasis">
                — On doit parler.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".medical-room-trigger"
  )
  .forEach((button) => {

    if (
      medicalRoomObserved.includes(
        button.dataset.medicalRoom
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  medicalRoomObserved.length >= 4
) {

  setRevealHTML(
    medicalRoomReveal,
    `
      <p class="impact-text">
        — ON DOIT PARLER.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 3
   DÉCOUVERTE DE LA GROTTE
========================================================= */

const caveDiscoveryReveal =
  document.getElementById(
    "caveDiscoveryReveal"
  );


const caveDiscoveryButtons =
  document.querySelectorAll(
    ".cave-discovery-trigger"
  );


const caveDiscoveryOrder = [
  "room",
  "marks",
  "frescoes",
  "ancients",
  "vial",
  "blood"
];


let caveDiscoveryProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_CAVE_DISCOVERY
    ) || "0",
    10
  );


const caveDiscoveryTexts = {

  room:
    "Hope a découvert une salle immense sous la montagne.",

  marks:
    "Le passage qui y conduisait ne pouvait être ouvert qu’avec le dragon et le phénix.",

  frescoes:
    "Les murs étaient couverts de fresques très anciennes.",

  ancients:
    "Hope pense que ces représentations pourraient être liées aux Anciens.",

  vial:
    "Une fresque représentait une fiole volontairement conservée.",

  blood:
    "À l’intérieur de cette fiole : une goutte de sang."

};


function restoreCaveDiscovery() {

  caveDiscoveryButtons.forEach(
    (button, index) => {

      if (
        index < caveDiscoveryProgress
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
    caveDiscoveryProgress >= 6
  ) {

    setRevealHTML(
      caveDiscoveryReveal,
      `
        <p>
          Salle souterraine.
        </p>

        <p>
          Dragon + Phénix.
        </p>

        <p>
          Fresques anciennes.
        </p>

        <p>
          Les Anciens.
        </p>

        <p>
          Une fiole.
        </p>

        <p class="impact-text">
          DU SANG.
        </p>

        <p class="emphasis">
          Celle que Root
          avait confiée à Betty.
        </p>
      `
    );

  }

}


caveDiscoveryButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.caveDiscovery;


        const expected =
          caveDiscoveryOrder[
            caveDiscoveryProgress
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


        caveDiscoveryProgress++;


        localStorage.setItem(
          STORAGE_CAVE_DISCOVERY,
          caveDiscoveryProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          caveDiscoveryReveal,
          `
            <p>
              ${caveDiscoveryTexts[selected]}
            </p>
          `
        );


        playRevealSound();


        if (
          caveDiscoveryProgress >= 6
        ) {

          setRevealHTML(
            caveDiscoveryReveal,
            `
              <p>
                Salle souterraine.
              </p>

              <p>
                Dragon + Phénix.
              </p>

              <p>
                Fresques anciennes.
              </p>

              <p>
                Les Anciens.
              </p>

              <p>
                Une fiole.
              </p>

              <p class="impact-text">
                DU SANG.
              </p>

              <p class="emphasis">
                Hope vient de relier
                la grotte à la fiole
                confiée autrefois
                à Betty.
              </p>
            `
          );


          showSecret(
            "cave-vial-link",
            "Les fresques de la grotte semblent représenter la même fiole de sang que Root avait confiée à Betty."
          );

        }

      }
    );

  });


restoreCaveDiscovery();


/* =========================================================
   INTERACTION 4
   MÉTHODE D'INFILTRATION
========================================================= */

const infiltrationReveal =
  document.getElementById(
    "infiltrationReveal"
  );


let infiltrationObserved =
  getStoredArray(
    STORAGE_INFILTRATION
  );


const infiltrationTexts = {

  blindspots:
    "Les intrus connaissaient les angles morts du dispositif de surveillance.",

  rotations:
    "Ils connaissaient aussi les rotations exactes des équipes de sécurité.",

  rooms:
    "Ils savaient où se trouvaient les chambres importantes.",

  confinement:
    "Les procédures de confinement ne leur étaient manifestement pas inconnues.",

  response:
    "Ils semblaient même anticiper les temps de réaction de la sécurité.",

  organization:
    "Clive propose une autre hypothèse : personne n’a peut-être piraté la sécurité. Quelqu’un a simplement modifié l’organisation au bon moment."

};


document
  .querySelectorAll(
    ".infiltration-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.infiltration;


        infiltrationObserved =
          addStoredValue(
            STORAGE_INFILTRATION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          infiltrationReveal,
          `
            <p>
              ${infiltrationTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          infiltrationObserved.length >= 6
        ) {

          setRevealHTML(
            infiltrationReveal,
            `
              <p>
                Angles morts.
              </p>

              <p>
                Rotations.
              </p>

              <p>
                Chambres.
              </p>

              <p>
                Confinement.
              </p>

              <p>
                Temps de réponse.
              </p>

              <p class="impact-text">
                LA PORTE ÉTAIT DÉJÀ OUVERTE.
              </p>

              <p class="emphasis">
                Quelqu’un savait
                modifier l’organisation
                sans déclencher d’alarme.
              </p>
            `
          );


          showSecret(
            "organization-infiltration",
            "L’attaque de l’Hacienda Flores semble avoir été facilitée par des modifications administratives plutôt que par un piratage direct."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".infiltration-trigger"
  )
  .forEach((button) => {

    if (
      infiltrationObserved.includes(
        button.dataset.infiltration
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  infiltrationObserved.length >= 6
) {

  setRevealHTML(
    infiltrationReveal,
    `
      <p class="impact-text">
        LA PORTE ÉTAIT DÉJÀ OUVERTE.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 5
   VÉRITABLE NAISSANCE D'ANNA
========================================================= */

const birthTruthReveal =
  document.getElementById(
    "birthTruthReveal"
  );


const birthTruthButtons =
  document.querySelectorAll(
    ".birth-truth-trigger"
  );


const birthTruthOrder = [
  "project",
  "metaphor",
  "created",
  "notcarried"
];


let birthTruthProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_BIRTH_TRUTH
    ) || "0",
    10
  );


const birthTruthTexts = {

  project:
    "Betty rappelle à Anna qu’elle lui a toujours dit qu’elle était le plus beau projet de sa vie.",

  metaphor:
    "Betty révèle que cette phrase n’était pas une métaphore.",

  created:
    "Betty prononce enfin les mots : « Je t’ai créée. »",

  notcarried:
    "Puis elle ajoute la vérité la plus brutale : Anna n’a jamais grandi dans son ventre."

};


function restoreBirthTruth() {

  birthTruthButtons.forEach(
    (button, index) => {

      if (
        index < birthTruthProgress
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
    birthTruthProgress >= 4
  ) {

    setRevealHTML(
      birthTruthReveal,
      `
        <p>
          Le plus beau projet.
        </p>

        <p>
          Pas une métaphore.
        </p>

        <p class="impact-text">
          « JE T’AI CRÉÉE. »
        </p>

        <p class="name-reveal">
          « JE NE T’AI JAMAIS PORTÉE. »
        </p>
      `
    );

  }

}


birthTruthButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.birthTruth;


        const expected =
          birthTruthOrder[
            birthTruthProgress
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


        birthTruthProgress++;


        localStorage.setItem(
          STORAGE_BIRTH_TRUTH,
          birthTruthProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          birthTruthReveal,
          `
            <p>
              ${birthTruthTexts[selected]}
            </p>
          `
        );


        playRevealSound();


        if (
          birthTruthProgress >= 4
        ) {

          setRevealHTML(
            birthTruthReveal,
            `
              <p>
                Le plus beau projet.
              </p>

              <p>
                Pas une métaphore.
              </p>

              <p class="impact-text">
                « JE T’AI CRÉÉE. »
              </p>

              <p class="name-reveal">
                « JE NE T’AI JAMAIS PORTÉE. »
              </p>

              <p class="emphasis">
                Toute l’histoire
                de la naissance d’Anna
                vient de changer.
              </p>
            `
          );


          showSecret(
            "anna-created",
            "Betty révèle qu’Anna n’est pas née d’une grossesse : elle a été créée en laboratoire."
          );

        }

      }
    );

  });


restoreBirthTruth();


/* =========================================================
   INTERACTION 6
   ANOMALIES ADMINISTRATIVES
========================================================= */

const adminAnomalyReveal =
  document.getElementById(
    "adminAnomalyReveal"
  );


const adminAnomalyButtons =
  document.querySelectorAll(
    ".admin-anomaly-trigger"
  );


const adminAnomalyOrder = [
  "camera",
  "guard",
  "delivery",
  "schedule",
  "anna"
];


let adminAnomalyProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_ADMIN_ANOMALY
    ) || "0",
    10
  );


const adminAnomalyTexts = {

  camera:
    "Une maintenance caméra a été avancée deux jours avant l’attaque.",

  guard:
    "Un remplacement de garde a modifié une présence habituelle.",

  delivery:
    "Une livraison a été déplacée à un horaire différent.",

  schedule:
    "Plusieurs horaires ont été modifiés sans déclencher d’alerte de sécurité.",

  anna:
    "Lorsque Lucy compare ces modifications aux déplacements inhabituels d’Anna, un schéma apparaît."

};


function restoreAdminAnomaly() {

  adminAnomalyButtons.forEach(
    (button, index) => {

      if (
        index < adminAnomalyProgress
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
    adminAnomalyProgress >= 5
  ) {

    setRevealHTML(
      adminAnomalyReveal,
      `
        <p>
          Maintenance.
        </p>

        <p>
          Garde.
        </p>

        <p>
          Livraison.
        </p>

        <p>
          Horaire.
        </p>

        <p class="impact-text">
          TOUJOURS AUTOUR D’ANNA.
        </p>

        <p class="emphasis">
          Quelqu’un suivait
          ses habitudes.
        </p>
      `
    );

  }

}


adminAnomalyButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.adminAnomaly;


        const expected =
          adminAnomalyOrder[
            adminAnomalyProgress
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


        adminAnomalyProgress++;


        localStorage.setItem(
          STORAGE_ADMIN_ANOMALY,
          adminAnomalyProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          adminAnomalyReveal,
          `
            <p>
              ${adminAnomalyTexts[selected]}
            </p>
          `
        );


        playDataSound();


        if (
          adminAnomalyProgress >= 5
        ) {

          setRevealHTML(
            adminAnomalyReveal,
            `
              <p>
                Maintenance.
              </p>

              <p>
                Remplacement.
              </p>

              <p>
                Livraison.
              </p>

              <p>
                Horaire.
              </p>

              <p class="impact-text">
                TOUJOURS AUTOUR D’ANNA.
              </p>

              <p class="emphasis">
                Quelqu’un suivait
                ses habitudes
                et adaptait l’organisation
                en conséquence.
              </p>
            `
          );


          showSecret(
            "anna-administrative-pattern",
            "Les anomalies administratives suivent les déplacements inhabituels d’Anna."
          );

        }

      }
    );

  });


restoreAdminAnomaly();


/* =========================================================
   INTERACTION 7
   CRÉATION GÉNÉTIQUE D'ANNA
========================================================= */

const annaGeneticsReveal =
  document.getElementById(
    "annaGeneticsReveal"
  );


let annaGeneticsObserved =
  getStoredArray(
    STORAGE_ANNA_GENETICS
  );


const annaGeneticsTexts = {

  ancient:
    "La fiole contenait un échantillon biologique ancien impossible à dater correctement.",

  human:
    "Une partie des marqueurs était compatible avec l’espèce humaine.",

  impossible:
    "D’autres marqueurs semblaient incompatibles avec tout ce que Betty connaissait.",

  betty:
    "Betty a utilisé son propre matériel génétique comme base du développement.",

  integration:
    "Elle a intégré à cette base une quantité extrêmement faible de matériel provenant de la fiole."

};


document
  .querySelectorAll(
    ".anna-genetics-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.annaGenetics;


        annaGeneticsObserved =
          addStoredValue(
            STORAGE_ANNA_GENETICS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          annaGeneticsReveal,
          `
            <p>
              ${annaGeneticsTexts[type]}
            </p>
          `
        );


        playBiologySound();


        if (
          annaGeneticsObserved.length >= 5
        ) {

          setRevealHTML(
            annaGeneticsReveal,
            `
              <p>
                Sang ancien.
              </p>

              <p>
                Partiellement compatible
                avec l’humain.
              </p>

              <p>
                Marqueurs inexpliqués.
              </p>

              <p>
                ADN de Betty.
              </p>

              <p class="impact-text">
                INTÉGRATION DU MATÉRIEL
                DE LA FIOLE.
              </p>

              <p class="name-reveal">
                ANNA.
              </p>
            `
          );


          showSecret(
            "anna-genetic-origin",
            "Anna a été créée à partir du matériel génétique de Betty et d’une quantité infime de matériel provenant de la fiole ancienne."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".anna-genetics-trigger"
  )
  .forEach((button) => {

    if (
      annaGeneticsObserved.includes(
        button.dataset.annaGenetics
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  annaGeneticsObserved.length >= 5
) {

  setRevealHTML(
    annaGeneticsReveal,
    `
      <p>
        ADN de Betty.
      </p>

      <p>
        Sang ancien.
      </p>

      <p class="name-reveal">
        ANNA.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 8
   IDENTIFIER ISABEL ORTEGA
========================================================= */

const isabelReveal =
  document.getElementById(
    "isabelReveal"
  );


const isabelButtons =
  document.querySelectorAll(
    ".isabel-trigger"
  );


const isabelOrder = [
  "five",
  "seven",
  "ten",
  "coordination",
  "name"
];


let isabelProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_ISABEL
    ) || "0",
    10
  );


const isabelTexts = {

  five:
    "IA2 remonte cinq années d’archives.",

  seven:
    "Puis sept années. Des modifications liées à Anna apparaissent encore.",

  ten:
    "Dix années d’archives révèlent le même type de présence administrative.",

  coordination:
    "Un même service revient régulièrement dans la chaîne : la coordination interne.",

  name:
    "Puis un nom apparaît encore et encore : Isabel Ortega."

};


function restoreIsabel() {

  isabelButtons.forEach(
    (button, index) => {

      if (
        index < isabelProgress
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
    isabelProgress >= 5
  ) {

    setRevealHTML(
      isabelReveal,
      `
        <p>
          Cinq ans.
        </p>

        <p>
          Sept ans.
        </p>

        <p>
          Dix ans.
        </p>

        <p>
          Coordination interne.
        </p>

        <p class="name-reveal">
          ISABEL ORTEGA.
        </p>
      `
    );

  }

}


isabelButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.isabel;


        const expected =
          isabelOrder[
            isabelProgress
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


        isabelProgress++;


        localStorage.setItem(
          STORAGE_ISABEL,
          isabelProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          isabelReveal,
          `
            <p>
              ${isabelTexts[selected]}
            </p>
          `
        );


        playDataSound();


        if (
          isabelProgress >= 5
        ) {

          setRevealHTML(
            isabelReveal,
            `
              <p>
                Cinq ans.
              </p>

              <p>
                Sept ans.
              </p>

              <p>
                Dix ans.
              </p>

              <p>
                Coordination interne.
              </p>

              <p class="name-reveal">
                ISABEL ORTEGA.
              </p>

              <p class="emphasis">
                La taupe possède
                enfin un nom.
              </p>
            `
          );


          showSecret(
            "isabel-identified",
            "Isabel Ortega apparaît comme la personne au cœur de nombreuses modifications liées à Anna."
          );

        }

      }
    );

  });


restoreIsabel();


/* =========================================================
   INTERACTION 9
   RAPPORT CACHÉ
========================================================= */

const hiddenReportReveal =
  document.getElementById(
    "hiddenReportReveal"
  );


const hiddenReportButtons =
  document.querySelectorAll(
    ".hidden-report-trigger"
  );


const hiddenReportOrder = [
  "inventory",
  "hidden",
  "af",
  "age",
  "sent"
];


let hiddenReportProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_HIDDEN_REPORT
    ) || "0",
    10
  );


const hiddenReportTexts = {

  inventory:
    "Le fichier semble n’être qu’un banal inventaire de linge.",

  hidden:
    "IA2 détecte pourtant une couche de données dissimulée à l’intérieur du document.",

  af:
    "Les initiales A.F. apparaissent à plusieurs reprises avec des dates et des déplacements.",

  age:
    "Un ancien rapport indique : SUJET A.F. — âge : 7 ans.",

  sent:
    "Une mention confirme que le rapport a été transmis et reçu. Le destinataire reste inconnu."

};


function restoreHiddenReport() {

  hiddenReportButtons.forEach(
    (button, index) => {

      if (
        index < hiddenReportProgress
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
    hiddenReportProgress >= 5
  ) {

    setRevealHTML(
      hiddenReportReveal,
      `
        <p>
          Fichier banal.
        </p>

        <p>
          Données cachées.
        </p>

        <p>
          A.F.
        </p>

        <p class="impact-text">
          ÂGE : 7 ANS.
        </p>

        <p>
          Rapport transmis.
        </p>

        <p class="name-reveal">
          DESTINATAIRE INCONNU.
        </p>
      `
    );

  }

}


hiddenReportButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.hiddenReport;


        const expected =
          hiddenReportOrder[
            hiddenReportProgress
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


        hiddenReportProgress++;


        localStorage.setItem(
          STORAGE_HIDDEN_REPORT,
          hiddenReportProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          hiddenReportReveal,
          `
            <p>
              ${hiddenReportTexts[selected]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          hiddenReportProgress >= 5
        ) {

          setRevealHTML(
            hiddenReportReveal,
            `
              <p>
                Inventaire banal.
              </p>

              <p>
                Données dissimulées.
              </p>

              <p>
                A.F.
              </p>

              <p class="impact-text">
                ANNA ÉTAIT SURVEILLÉE
                À SEPT ANS.
              </p>

              <p>
                Rapport transmis.
              </p>

              <p class="name-reveal">
                DESTINATAIRE INCONNU.
              </p>
            `
          );


          showSecret(
            "anna-watched-seven",
            "Anna faisait déjà l’objet de rapports de surveillance à l’âge de sept ans."
          );

        }

      }
    );

  });


restoreHiddenReport();


/* =========================================================
   INTERACTION 10
   ORIGINE / IDENTITÉ
========================================================= */

const identityReveal =
  document.getElementById(
    "identityReveal"
  );


let identityObserved =
  getStoredArray(
    STORAGE_IDENTITY
  );


const identityTexts = {

  origin:
    "La révélation de Betty change l’origine d’Anna, mais pas automatiquement tout ce qu’elle est devenue.",

  choices:
    "Les décisions prises par Anna lui appartiennent. Elles ne peuvent pas être réduites à son ADN.",

  personality:
    "Son humour, ses colères, ses goûts et ses refus se sont construits au fil de sa vie.",

  balance:
    "Le lien éventuel avec l’Équilibre reste une hypothèse. Hope refuse d’en faire une identité imposée à Anna."

};


document
  .querySelectorAll(
    ".identity-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.identity;


        identityObserved =
          addStoredValue(
            STORAGE_IDENTITY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          identityReveal,
          `
            <p>
              ${identityTexts[type]}
            </p>
          `
        );


        playWarmSound();


        if (
          identityObserved.length >= 4
        ) {

          setRevealHTML(
            identityReveal,
            `
              <p>
                Origine.
              </p>

              <p>
                Choix.
              </p>

              <p>
                Personnalité.
              </p>

              <p>
                Équilibre ?
              </p>

              <p class="impact-text">
                SON ORIGINE
                N’EST PAS TOUTE SON IDENTITÉ.
              </p>

              <p class="emphasis">
                Comprendre ce qu’Anna est
                sans oublier qui elle est.
              </p>
            `
          );


          showSecret(
            "anna-origin-identity",
            "Hope distingue l’origine biologique d’Anna de la personne qu’elle est devenue."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".identity-trigger"
  )
  .forEach((button) => {

    if (
      identityObserved.includes(
        button.dataset.identity
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  identityObserved.length >= 4
) {

  setRevealHTML(
    identityReveal,
    `
      <p class="impact-text">
        SON ORIGINE
        N’EST PAS TOUTE SON IDENTITÉ.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 11
   LA TAUPE
========================================================= */

const moleReveal =
  document.getElementById(
    "moleReveal"
  );


const moleButtons =
  document.querySelectorAll(
    ".mole-trigger"
  );


const moleOrder = [
  "found",
  "isabel",
  "seven",
  "older",
  "known"
];


let moleProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_MOLE
    ) || "0",
    10
  );


const moleTexts = {

  found:
    "Lucy annonce que l’équipe a enfin identifié la taupe.",

  isabel:
    "Le nom est Isabel Ortega.",

  seven:
    "Les rapports retrouvés remontent au moins jusqu’aux sept ans d’Anna.",

  older:
    "Lucy précise qu’il s’agit seulement du plus ancien rapport récupéré pour le moment.",

  known:
    "Si Anna était observée aussi jeune, quelqu’un connaissait déjà son importance bien avant les événements récents."

};


function restoreMole() {

  moleButtons.forEach(
    (button, index) => {

      if (
        index < moleProgress
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
    moleProgress >= 5
  ) {

    setRevealHTML(
      moleReveal,
      `
        <p>
          Taupe identifiée.
        </p>

        <p class="name-reveal">
          ISABEL ORTEGA.
        </p>

        <p>
          Surveillance depuis
          au moins douze ans.
        </p>

        <p class="impact-text">
          QUELQU’UN SAVAIT.
        </p>
      `
    );

  }

}


moleButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.mole;


        const expected =
          moleOrder[
            moleProgress
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


        moleProgress++;


        localStorage.setItem(
          STORAGE_MOLE,
          moleProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          moleReveal,
          `
            <p>
              ${moleTexts[selected]}
            </p>
          `
        );


        playDataSound();


        if (
          moleProgress >= 5
        ) {

          setRevealHTML(
            moleReveal,
            `
              <p>
                Taupe identifiée.
              </p>

              <p class="name-reveal">
                ISABEL ORTEGA.
              </p>

              <p>
                Anna était déjà
                surveillée à sept ans.
              </p>

              <p>
                Et peut-être avant.
              </p>

              <p class="impact-text">
                QUELQU’UN SAVAIT.
              </p>

              <p class="emphasis">
                Bien avant Hope.
                Bien avant eux tous.
              </p>
            `
          );


          showSecret(
            "someone-knew",
            "L’existence des anciens rapports prouve que quelqu’un connaissait déjà l’importance d’Anna lorsqu’elle était enfant."
          );

        }

      }
    );

  });


restoreMole();


/* =========================================================
   INTERACTION 12
   SECRET DE PETER
========================================================= */

const peterSecretReveal =
  document.getElementById(
    "peterSecretReveal"
  );


let peterSecretObserved =
  getStoredArray(
    STORAGE_PETER_SECRET
  );


const peterSecretTexts = {

  feelings:
    "Peter choisit enfin de reconnaître clairement qu’il a des sentiments pour Betty.",

  research:
    "Il révèle ensuite qu’il a utilisé une partie des recherches de Betty sans lui demander son autorisation.",

  adaptation:
    "Ces travaux concernaient notamment l’adaptation cellulaire.",

  regeneration:
    "Peter a aussi exploité des recherches liées à la régénération ciblée et à la stabilisation des mutations.",

  phoenix:
    "Le Phénix est l’un des résultats les plus spectaculaires de cette combinaison."

};


document
  .querySelectorAll(
    ".peter-secret-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.peterSecret;


        peterSecretObserved =
          addStoredValue(
            STORAGE_PETER_SECRET,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          peterSecretReveal,
          `
            <p>
              ${peterSecretTexts[type]}
            </p>
          `
        );


        playArtifactSound();


        if (
          peterSecretObserved.length >= 5
        ) {

          setRevealHTML(
            peterSecretReveal,
            `
              <p>
                Sentiments.
              </p>

              <p>
                Travaux de Betty.
              </p>

              <p>
                Adaptation cellulaire.
              </p>

              <p>
                Régénération.
              </p>

              <p class="impact-text">
                LE PHÉNIX.
              </p>

              <p class="name-reveal">
                « JE T’AI FAIT
                DES ENFANTS DANS LE DOS. »
              </p>
            `
          );


          showSecret(
            "peter-used-betty-research",
            "Peter reconnaît avoir utilisé certaines recherches de Betty pour développer ses organismes bio-inspirés."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".peter-secret-trigger"
  )
  .forEach((button) => {

    if (
      peterSecretObserved.includes(
        button.dataset.peterSecret
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  peterSecretObserved.length >= 5
) {

  setRevealHTML(
    peterSecretReveal,
    `
      <p class="impact-text">
        LE PHÉNIX.
      </p>

      <p class="name-reveal">
        « DES ENFANTS DANS LE DOS. »
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 13
   LABORATOIRE DE PETER
========================================================= */

const labCreatureReveal =
  document.getElementById(
    "labCreatureReveal"
  );


let labCreatureObserved =
  getStoredArray(
    STORAGE_LAB_CREATURE
  );


const labCreatureTexts = {

  phoenix:
    "Le Phénix est un organisme vivant capable d’apprendre, de reconnaître des personnes et de refuser certains ordres.",

  fleas:
    "Les petites créatures inspirées des puces peuvent se fixer sur une surface, collecter quelques données environnementales et relayer une position temporairement.",

  dragonfly:
    "La libellule est un microdrone biologique destiné à l’observation discrète. Peter l’a imaginée pour Lucy.",

  lizard:
    "Le lézard grimpe, se glisse dans des fissures, analyse certaines vibrations et peut aider à cartographier des cavités. Il est destiné à Root.",

  squirrel:
    "L’organisme inspiré de l’écureuil peut transporter une microcaméra et mémoriser un environnement. Peter l’a pensé pour Max.",

  anna:
    "La créature destinée à Anna n’a pas été conçue pour combattre ou espionner. Elle doit apprendre avec elle, explorer et signaler des dangers simples."

};


document
  .querySelectorAll(
    ".lab-creature-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.labCreature;


        labCreatureObserved =
          addStoredValue(
            STORAGE_LAB_CREATURE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          labCreatureReveal,
          `
            <p>
              ${labCreatureTexts[type]}
            </p>
          `
        );


        playCreatureSound();


        if (
          labCreatureObserved.length >= 6
        ) {

          setRevealHTML(
            labCreatureReveal,
            `
              <p>
                Phénix.
              </p>

              <p>
                Puces traceuses.
              </p>

              <p>
                Libellule.
              </p>

              <p>
                Lézard.
              </p>

              <p>
                Écureuil.
              </p>

              <p>
                Compagnon d’Anna.
              </p>

              <p class="impact-text">
                LE ZOO ILLÉGAL
                DE PETER.
              </p>

              <p class="emphasis">
                Des organismes vivants,
                adaptatifs
                et bio-inspirés.
              </p>
            `
          );


          showSecret(
            "peter-secret-lab",
            "Peter a développé plusieurs organismes bio-inspirés destinés à l’exploration, la surveillance ou l’assistance."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".lab-creature-trigger"
  )
  .forEach((button) => {

    if (
      labCreatureObserved.includes(
        button.dataset.labCreature
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  labCreatureObserved.length >= 6
) {

  setRevealHTML(
    labCreatureReveal,
    `
      <p class="impact-text">
        LE ZOO ILLÉGAL
        DE PETER.
      </p>
    `
  );

}


/* =========================================================
   INTERACTION 14
   NOUVELLES RÈGLES
========================================================= */

const newRulesReveal =
  document.getElementById(
    "newRulesReveal"
  );


let newRulesObserved =
  getStoredArray(
    STORAGE_NEW_RULES
  );


const newRulesTexts = {

  access:
    "Betty exige un accès complet au laboratoire et aux systèmes utilisés par Peter.",

  protocols:
    "Tous les protocoles devront lui être transmis.",

  experiments:
    "Betty veut également consulter toutes les expériences réalisées.",

  prototypes:
    "Aucun prototype ne devra rester caché.",

  permission:
    "Peter ne pourra plus utiliser les recherches de Betty sans son autorisation explicite.",

  anna:
    "Aucun organisme destiné à Anna ne lui sera imposé. Anna décidera elle-même si elle souhaite l’accepter."

};


document
  .querySelectorAll(
    ".new-rules-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.newRules;


        newRulesObserved =
          addStoredValue(
            STORAGE_NEW_RULES,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          newRulesReveal,
          `
            <p>
              ${newRulesTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          newRulesObserved.length >= 6
        ) {

          setRevealHTML(
            newRulesReveal,
            `
              <p>
                Accès complet.
              </p>

              <p>
                Protocoles.
              </p>

              <p>
                Expériences.
              </p>

              <p>
                Prototypes.
              </p>

              <p>
                Autorisation obligatoire.
              </p>

              <p>
                Anna décidera.
              </p>

              <p class="impact-text">
                NOUVELLES RÈGLES.
              </p>

              <p class="emphasis">
                Peter ne travaille plus
                seul dans l’ombre.
              </p>
            `
          );


          showSecret(
            "betty-controls-lab",
            "Betty obtient désormais un accès complet aux recherches bio-inspirées de Peter et impose son accord pour toute utilisation future de ses travaux."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".new-rules-trigger"
  )
  .forEach((button) => {

    if (
      newRulesObserved.includes(
        button.dataset.newRules
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


if (
  newRulesObserved.length >= 6
) {

  setRevealHTML(
    newRulesReveal,
    `
      <p>
        Accès complet.
      </p>

      <p>
        Protocoles.
      </p>

      <p>
        Expériences.
      </p>

      <p>
        Prototypes.
      </p>

      <p>
        Autorisation obligatoire.
      </p>

      <p>
        Anna décidera.
      </p>

      <p class="impact-text">
        NOUVELLES RÈGLES.
      </p>
    `
  );

}


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-41"
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


  const oldAudioCtx =
    audioCtx;

  const oldMasterGain =
    masterGain;

  const oldOsc1 =
    ambienceOsc1;

  const oldOsc2 =
    ambienceOsc2;


  soundActive =
    false;


  if (soundBtn) {

    soundBtn.classList.remove(
      "sound-active"
    );


    soundBtn.textContent =
      "♫";

  }


  try {

    oldMasterGain?.gain
      .exponentialRampToValueAtTime(
        0.0001,
        oldAudioCtx.currentTime + 0.35
      );

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


  setTimeout(
    () => {

      try {

        oldOsc1?.stop();

      } catch {

        /* rien */

      }


      try {

        oldOsc2?.stop();

      } catch {

        /* rien */

      }


      try {

        oldAudioCtx?.close();

      } catch {

        /* rien */

      }

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


function playCreatureSound() {

  playTone(
    470,
    0.28,
    0.014,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        620,
        0.42,
        0.012,
        "sine"
      );

    },
    90
  );


  setTimeout(
    () => {

      playTone(
        790,
        0.5,
        0.01,
        "triangle"
      );

    },
    180
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
