/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 10 — LA DISPARITION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


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

const STORAGE_SCROLL =
  "societeOmbre_chapitre10_scroll";

const STORAGE_PROGRESS =
  "societeOmbre_chapitre10_progression";

const STORAGE_COMPLETED =
  "societeOmbre_chapitre10_termine";

const STORAGE_CANYON_SEARCH =
  "societeOmbre_chapitre10_canyonSearch";

const STORAGE_ROOT_CALL =
  "societeOmbre_chapitre10_rootCall";

const STORAGE_CRASH_FALL =
  "societeOmbre_chapitre10_crashFall";

const STORAGE_UNDERGROUND =
  "societeOmbre_chapitre10_underground";

const STORAGE_CAVE =
  "societeOmbre_chapitre10_cave";

const STORAGE_REUNION =
  "societeOmbre_chapitre10_reunion";

const STORAGE_INSTITUTE =
  "societeOmbre_chapitre10_institute";

const STORAGE_MOVEMENTS =
  "societeOmbre_chapitre10_movements";

const STORAGE_PROFILES =
  "societeOmbre_chapitre10_profiles";

const STORAGE_LEE_AUTHORITY =
  "societeOmbre_chapitre10_leeAuthority";

const STORAGE_INNER_LISTENING =
  "societeOmbre_chapitre10_innerListening";

const STORAGE_CROSS_DATA =
  "societeOmbre_chapitre10_crossData";

const STORAGE_SURVIVOR =
  "societeOmbre_chapitre10_survivor";

const STORAGE_MOBILISATION =
  "societeOmbre_chapitre10_mobilisation";

const STORAGE_SECRETS =
  "societeOmbre_chapitre10_secrets";


/* =========================================================
   COMPATIBILITÉ ANCIENNE FIN
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre10_finished"
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

  const prefix =
    "societeOmbre_chapitre10_";


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
      key.startsWith(prefix)
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
    "chapitre10.html?lecture=recommencer";

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
   BETTY CHERCHE HOPE
========================================================= */

const canyonSearchReveal =
  document.getElementById(
    "canyonSearchReveal"
  );


let canyonSearchObserved =
  getStoredArray(
    STORAGE_CANYON_SEARCH
  );


const canyonSearchTexts = {

  river:
    "La rivière poursuit sa course au fond du canyon. Aucun mouvement identifiable à la surface.",

  banks:
    "Les berges visibles sont désertes. Aucune silhouette ne semble avoir émergé.",

  movement:
    "Betty cherche un bras, une tête, une ombre, n’importe quel signe. Rien.",

  sound:
    "Le bruit de l’eau couvre presque tout. Aucun appel. Aucun cri. Aucun signe de Hope."

};


document
  .querySelectorAll(
    ".canyon-search-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.canyonSearch;


        canyonSearchObserved =
          addStoredValue(
            STORAGE_CANYON_SEARCH,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          canyonSearchReveal,
          `
            <p>
              ${canyonSearchTexts[type]}
            </p>
          `
        );


        playDarkSound();


        if (
          canyonSearchObserved.length >= 4
        ) {

          setRevealHTML(
            canyonSearchReveal,
            `
              <p>
                Aucun mouvement.
              </p>

              <p>
                Aucune silhouette.
              </p>

              <p>
                Aucun appel.
              </p>

              <p class="impact-text">
                RIEN.
              </p>

              <p class="emphasis">
                Betty doit quitter le canyon
                sans savoir
                si Hope a survécu.
              </p>
            `
          );


          showSecret(
            "hope-missing",
            "Aucun signe visible ne permet à Betty de savoir ce qui est arrivé à Hope après la chute."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".canyon-search-trigger"
  )
  .forEach((button) => {

    if (
      canyonSearchObserved.includes(
        button.dataset.canyonSearch
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 2
   APPEL À ROOT
========================================================= */

const rootCallReveal =
  document.getElementById(
    "rootCallReveal"
  );


let rootCallObserved =
  getStoredArray(
    STORAGE_ROOT_CALL
  );


const rootCallTexts = {

  anna:
    `
      <p>
        ANNA
      </p>

      <p>
        Elle est avec Max.
      </p>

      <p class="emphasis">
        Elle est en sécurité.
      </p>
    `,

  hope:
    `
      <p>
        HOPE
      </p>

      <p>
        Elle est tombée
        dans le canyon.
      </p>
    `,

  amy:
    `
      <p>
        AMY
      </p>

      <p>
        Elle est tombée
        avec Hope.
      </p>
    `,

  death:
    `
      <p>
        Betty :
      </p>

      <p>
        « Je pense
        qu’elle est morte. »
      </p>

      <p class="impact-text">
        Root :
        « Non. »
      </p>
    `

};


document
  .querySelectorAll(
    ".root-call-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.rootCall;


        rootCallObserved =
          addStoredValue(
            STORAGE_ROOT_CALL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          rootCallReveal,
          rootCallTexts[type]
        );


        playClueSound();


        if (
          rootCallObserved.length >= 4
        ) {

          setRevealHTML(
            rootCallReveal,
            `
              <p>
                Anna est vivante.
              </p>

              <p>
                Hope a disparu.
              </p>

              <p>
                Amy a disparu avec elle.
              </p>

              <p>
                Betty pense Hope morte.
              </p>

              <p class="impact-text">
                ROOT REFUSE CETTE CONCLUSION.
              </p>

              <p class="emphasis">
                « Je ne sais pas.
                Mais je le sais. »
              </p>
            `
          );


          showSecret(
            "root-knows",
            "Root affirme que Hope est vivante sans pouvoir expliquer rationnellement comment elle le sait."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".root-call-trigger"
  )
  .forEach((button) => {

    if (
      rootCallObserved.includes(
        button.dataset.rootCall
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 3
   SURVIE DE HOPE
========================================================= */

const crashFallReveal =
  document.getElementById(
    "crashFallReveal"
  );


let crashFallObserved =
  getStoredArray(
    STORAGE_CRASH_FALL
  );


const crashFallTexts = {

  activation:
    "Hope active sa bulle Crash au dernier instant, juste avant l’impact avec l’eau.",

  impact:
    "La protection n’annule pas la chute, mais elle absorbe une partie suffisamment importante de l’énergie pour éviter un impact directement fatal.",

  separation:
    "Lorsque Hope et Amy frappent l’eau, la bulle se disloque et leurs corps sont séparés par la violence du courant.",

  currents:
    "Amy reste dans le courant principal. Hope est happée par un bras secondaire invisible depuis la surface."

};


document
  .querySelectorAll(
    ".crash-fall-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.crashFall;


        crashFallObserved =
          addStoredValue(
            STORAGE_CRASH_FALL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          crashFallReveal,
          `
            <p>
              ${crashFallTexts[type]}
            </p>
          `
        );


        playCrashSound();


        if (
          crashFallObserved.length >= 4
        ) {

          setRevealHTML(
            crashFallReveal,
            `
              <p>
                Protection activée.
              </p>

              <p>
                Impact partiellement absorbé.
              </p>

              <p>
                Hope et Amy séparées.
              </p>

              <p>
                Deux courants différents.
              </p>

              <p class="impact-text">
                HOPE EST VIVANTE.
              </p>

              <p class="emphasis">
                Mais inconsciente.
              </p>
            `
          );


          showSecret(
            "hope-survived-fall",
            "La bulle Crash n’a pas empêché l’impact mais a suffisamment réduit sa violence pour permettre à Hope de survivre."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".crash-fall-trigger"
  )
  .forEach((button) => {

    if (
      crashFallObserved.includes(
        button.dataset.crashFall
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 4
   SOUS LA MONTAGNE
========================================================= */

const undergroundReveal =
  document.getElementById(
    "undergroundReveal"
  );


const undergroundButtons =
  document.querySelectorAll(
    ".underground-trigger"
  );


const undergroundOrder = [
  "impact",
  "violent",
  "narrow",
  "darkness",
  "slow"
];


let undergroundProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_UNDERGROUND
    ) || "0",
    10
  );


const undergroundTexts = {

  impact:
    "Hope disparaît sous la surface après la séparation avec Amy.",

  violent:
    "Le courant secondaire l’entraîne avec une force suffisante pour l’empêcher de reprendre le contrôle.",

  narrow:
    "Le passage se resserre sous la roche et devient totalement invisible depuis le canyon.",

  darkness:
    "La lumière disparaît. Hope est emportée profondément sous la montagne.",

  slow:
    "Après une longue dérive, le courant perd progressivement sa violence et finit par la rejeter sur une plage souterraine."

};


function restoreUnderground() {

  undergroundButtons.forEach(
    (button, index) => {

      if (
        index < undergroundProgress
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
    undergroundProgress >= 5
  ) {

    setRevealHTML(
      undergroundReveal,
      `
        <p>
          Surface.
        </p>

        <p>
          Courant.
        </p>

        <p>
          Passage étroit.
        </p>

        <p>
          Obscurité.
        </p>

        <p>
          Ralentissement.
        </p>

        <p class="impact-text">
          SOUS LA MONTAGNE.
        </p>
      `
    );

  }

}


undergroundButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.underground;


        const expected =
          undergroundOrder[
            undergroundProgress
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


        undergroundProgress++;


        localStorage.setItem(
          STORAGE_UNDERGROUND,
          undergroundProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          undergroundReveal,
          `
            <p>
              ${undergroundTexts[selected]}
            </p>
          `
        );


        playWaterSound();


        if (
          undergroundProgress >= 5
        ) {

          setRevealHTML(
            undergroundReveal,
            `
              <p>
                Surface.
              </p>

              <p>
                Courant.
              </p>

              <p>
                Passage étroit.
              </p>

              <p>
                Obscurité.
              </p>

              <p>
                Ralentissement.
              </p>

              <p class="impact-text">
                HOPE DISPARAÎT
                SOUS LA MONTAGNE.
              </p>

              <p class="emphasis">
                Personne à la surface
                ne pourrait deviner
                où le courant l’a emportée.
              </p>
            `
          );


          showSecret(
            "underground-passage",
            "Le bras secondaire du cours d’eau mène à un passage totalement caché sous la montagne."
          );

        }

      }
    );

  });


restoreUnderground();


/* =========================================================
   INTERACTION 5
   GROTTE SOUTERRAINE
========================================================= */

const caveReveal =
  document.getElementById(
    "caveReveal"
  );


let caveObserved =
  getStoredArray(
    STORAGE_CAVE
  );


const caveTexts = {

  pool:
    "Une vasque profonde occupe une grande partie de la cavité, reliée au courant qui vient de rejeter Hope sur la plage.",

  sand:
    "La petite langue de sable présente des reflets multicolores difficiles à expliquer dans une grotte aussi peu éclairée.",

  temperature:
    "L’eau paraît étrangement tiède malgré la profondeur et l’absence presque totale de lumière solaire.",

  light:
    "Un mince puits de lumière traverse la roche très haut au-dessus de la cavité.",

  walls:
    "Les parois renvoient des reflets et semblent porter certaines formes dont l’origine n’est pas immédiatement évidente."

};


document
  .querySelectorAll(
    ".cave-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.cave;


        caveObserved =
          addStoredValue(
            STORAGE_CAVE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          caveReveal,
          `
            <p>
              ${caveTexts[type]}
            </p>
          `
        );


        playArtifactSound();


        if (
          caveObserved.length >= 5
        ) {

          setRevealHTML(
            caveReveal,
            `
              <p>
                Eau tiède.
              </p>

              <p>
                Sable multicolore.
              </p>

              <p>
                Puits de lumière.
              </p>

              <p>
                Reflets.
              </p>

              <p>
                Formes dans les parois.
              </p>

              <p class="emphasis">
                Peut-être naturelles.
              </p>

              <p class="impact-text">
                PEUT-ÊTRE PAS.
              </p>
            `
          );


          showSecret(
            "hidden-cave",
            "La grotte où Hope a échoué présente plusieurs caractéristiques inhabituelles que Hope elle-même n’a pas encore vues."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".cave-trigger"
  )
  .forEach((button) => {

    if (
      caveObserved.includes(
        button.dataset.cave
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 6
   RETROUVAILLES
========================================================= */

const reunionReveal =
  document.getElementById(
    "reunionReveal"
  );


let reunionObserved =
  getStoredArray(
    STORAGE_REUNION
  );


const reunionTexts = {

  anna:
    "Anna comprend immédiatement à la manière dont Betty la serre que quelque chose de grave s’est produit.",

  betty:
    "Betty essaie de rester debout malgré la culpabilité, la fatigue et l’image de Hope disparaissant dans le canyon.",

  max:
    "Max baisse les yeux. Il comprend avant même que Betty n’explique ce qui s’est passé.",

  root:
    "Root observe surtout Anna. Sa certitude que Hope est vivante semble étrangement proche de celle de la jeune femme."

};


document
  .querySelectorAll(
    ".reunion-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.reunion;


        reunionObserved =
          addStoredValue(
            STORAGE_REUNION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          reunionReveal,
          `
            <p>
              ${reunionTexts[type]}
            </p>
          `
        );


        playMemorySound();


        if (
          reunionObserved.length >= 4
        ) {

          setRevealHTML(
            reunionReveal,
            `
              <p>
                Betty a vu Hope tomber.
              </p>

              <p>
                Max redoute le pire.
              </p>

              <p>
                Anna refuse sa mort.
              </p>

              <p>
                Root aussi.
              </p>

              <p class="impact-text">
                DEUX CERTITUDES IDENTIQUES.
              </p>

              <p class="emphasis">
                Sans preuve.
              </p>
            `
          );


          showSecret(
            "anna-root-link",
            "Anna et Root semblent partager la même certitude instinctive concernant la survie de Hope."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".reunion-trigger"
  )
  .forEach((button) => {

    if (
      reunionObserved.includes(
        button.dataset.reunion
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 7
   INSTITUT TEMPASS
========================================================= */

const instituteReveal =
  document.getElementById(
    "instituteReveal"
  );


let instituteObserved =
  getStoredArray(
    STORAGE_INSTITUTE
  );


const instituteTexts = {

  security:
    "Le bâtiment possède une sécurité discrète mais très supérieure à celle d’un institut de recherche ordinaire.",

  research:
    "Plusieurs espaces semblent destinés à la recherche et à l’analyse, avec du matériel difficile à identifier au premier regard.",

  private:
    "Certaines zones sont clairement séparées des espaces accessibles au personnel ordinaire.",

  sentinels:
    "Plusieurs personnes présentes portent les signes discrets des Sentinelles et semblent parfaitement intégrées à l’institut."

};


document
  .querySelectorAll(
    ".institute-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.institute;


        instituteObserved =
          addStoredValue(
            STORAGE_INSTITUTE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          instituteReveal,
          `
            <p>
              ${instituteTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          instituteObserved.length >= 4
        ) {

          setRevealHTML(
            instituteReveal,
            `
              <p>
                Recherche.
              </p>

              <p>
                Sécurité.
              </p>

              <p>
                Zones privées.
              </p>

              <p>
                Sentinelles.
              </p>

              <p class="impact-text">
                INSTITUT TEMPASS DU MEXIQUE
              </p>

              <p class="emphasis">
                Un institut de recherche.
                Et manifestement
                beaucoup plus que cela.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".institute-trigger"
  )
  .forEach((button) => {

    if (
      instituteObserved.includes(
        button.dataset.institute
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 8
   MOUVEMENTS INTERNATIONAUX
========================================================= */

const movementReveal =
  document.getElementById(
    "movementReveal"
  );


let movementObserved =
  getStoredArray(
    STORAGE_MOVEMENTS
  );


const movementTexts = {

  private:
    "Plusieurs avions privés ont modifié ou créé des plans de vol en direction du Mexique dans un intervalle de temps inhabituellement court.",

  commercial:
    "Des réservations de vols commerciaux apparaissent depuis plusieurs pays sans relation apparente entre les voyageurs.",

  ground:
    "Certains déplacements terrestres semblent organisés pour rejoindre le Mexique depuis des pays voisins ou depuis des aéroports secondaires.",

  bookings:
    "Plusieurs réservations ont été effectuées en urgence, parfois quelques heures seulement avant le départ."

};


document
  .querySelectorAll(
    ".movement-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.movement;


        movementObserved =
          addStoredValue(
            STORAGE_MOVEMENTS,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          movementReveal,
          `
            <p>
              ${movementTexts[type]}
            </p>
          `
        );


        playDataSound();


        if (
          movementObserved.length >= 4
        ) {

          setRevealHTML(
            movementReveal,
            `
              <p>
                Aviation privée.
              </p>

              <p>
                Vols commerciaux.
              </p>

              <p>
                Routes terrestres.
              </p>

              <p>
                Départs en urgence.
              </p>

              <p class="impact-text">
                MOUVEMENTS INHABITUELS DÉTECTÉS.
              </p>

              <p class="emphasis">
                Beaucoup convergent
                vers le Mexique.
              </p>
            `
          );


          showSecret(
            "international-movements",
            "IA2 détecte une vague de déplacements vers le Mexique qui commence dans les heures suivant la disparition de Hope."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".movement-trigger"
  )
  .forEach((button) => {

    if (
      movementObserved.includes(
        button.dataset.movement
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 9
   PROFILS INTERNATIONAUX
========================================================= */

const profilesReveal =
  document.getElementById(
    "profilesReveal"
  );


let profilesObserved =
  getStoredArray(
    STORAGE_PROFILES
  );


const profilesTexts = {

  finance:
    "Financiers, dirigeants de fondations et investisseurs dont les activités officielles n’ont aucun lien évident avec Hope.",

  military:
    "Anciens militaires et personnels issus de structures de sécurité ou de défense.",

  research:
    "Chercheurs appartenant à plusieurs disciplines et institutions différentes.",

  diplomacy:
    "Diplomates à la retraite et anciens responsables bénéficiant encore de réseaux internationaux importants.",

  religion:
    "Plusieurs figures religieuses apparaissent dans les déplacements sans qu’un événement officiel commun puisse l’expliquer.",

  humanitarian:
    "Des personnes liées à des organisations humanitaires rejoignent elles aussi le Mexique.",

  security:
    "Certains voyageurs possèdent ou dirigent des sociétés privées de sécurité.",

  criminal:
    "Quelques profils possèdent également des liens indirects avec des réseaux criminels ou clandestins."

};


document
  .querySelectorAll(
    ".profiles-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.profile;


        profilesObserved =
          addStoredValue(
            STORAGE_PROFILES,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          profilesReveal,
          `
            <p>
              ${profilesTexts[type]}
            </p>
          `
        );


        playDataSound();


        if (
          profilesObserved.length >= 8
        ) {

          setRevealHTML(
            profilesReveal,
            `
              <p>
                Finance.
              </p>

              <p>
                Armée.
              </p>

              <p>
                Recherche.
              </p>

              <p>
                Diplomatie.
              </p>

              <p>
                Religion.
              </p>

              <p>
                Humanitaire.
              </p>

              <p>
                Sécurité.
              </p>

              <p>
                Réseaux clandestins.
              </p>

              <p class="impact-text">
                PRIS SÉPARÉMENT :
                DES VOYAGES.
              </p>

              <p class="name-reveal">
                ENSEMBLE :
                UNE MOBILISATION.
              </p>
            `
          );


          showSecret(
            "mobilisation-pattern",
            "Les voyageurs n’appartiennent pas à un même milieu, mais leurs réseaux se croisent suffisamment pour exclure progressivement l’hypothèse d’une simple coïncidence."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".profiles-trigger"
  )
  .forEach((button) => {

    if (
      profilesObserved.includes(
        button.dataset.profile
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 10
   AUTORITÉ DE MAÎTRE LEE
========================================================= */

const leeAuthorityReveal =
  document.getElementById(
    "leeAuthorityReveal"
  );


let leeAuthorityObserved =
  getStoredArray(
    STORAGE_LEE_AUTHORITY
  );


const leeAuthorityTexts = {

  sentinels:
    "Les Sentinelles présentes s’inclinent immédiatement à son arrivée, sans attendre la moindre instruction.",

  root:
    "Root se redresse et va directement vers lui. Son attitude change instantanément.",

  max:
    "Max incline légèrement la tête, signe qu’il connaît suffisamment Maître Lee pour comprendre son rang.",

  betty:
    "Betty ne connaît pas encore l’homme qui vient d’entrer, mais comprend immédiatement que son autorité dépasse celle des autres personnes présentes."

};


document
  .querySelectorAll(
    ".lee-authority-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.leeAuthority;


        leeAuthorityObserved =
          addStoredValue(
            STORAGE_LEE_AUTHORITY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          leeAuthorityReveal,
          `
            <p>
              ${leeAuthorityTexts[type]}
            </p>
          `
        );


        playSentinelSound();


        if (
          leeAuthorityObserved.length >= 4
        ) {

          setRevealHTML(
            leeAuthorityReveal,
            `
              <p>
                Les Sentinelles s’inclinent.
              </p>

              <p>
                Root se redresse.
              </p>

              <p>
                Max reconnaît son rang.
              </p>

              <p>
                Betty observe.
              </p>

              <p class="name-reveal">
                MAÎTRE LEE
              </p>

              <p class="emphasis">
                Il n’a pas besoin
                de donner un ordre
                pour être reconnu.
              </p>
            `
          );


          showSecret(
            "lee-authority",
            "L’attitude des Sentinelles confirme que Maître Lee occupe une position d’autorité majeure au sein de leur organisation."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".lee-authority-trigger"
  )
  .forEach((button) => {

    if (
      leeAuthorityObserved.includes(
        button.dataset.leeAuthority
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 11
   ANNA ÉCOUTE AUTRE CHOSE
========================================================= */

const innerListeningReveal =
  document.getElementById(
    "innerListeningReveal"
  );


const innerListeningButtons =
  document.querySelectorAll(
    ".inner-listening-trigger"
  );


let innerListeningObserved =
  getStoredArray(
    STORAGE_INNER_LISTENING
  );


const innerListeningTexts = {

  fear:
    "La peur construit immédiatement le pire scénario : Hope est tombée, donc Hope doit être morte.",

  instinct:
    "Sous la peur, Anna ressent pourtant un refus beaucoup plus calme et beaucoup plus profond de cette conclusion.",

  silence:
    "Lorsqu’elle cesse de chercher une réponse logique, il reste une impression simple : quelque chose n’est pas terminé."

};


document
  .querySelectorAll(
    ".inner-listening-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.innerListening;


        innerListeningObserved =
          addStoredValue(
            STORAGE_INNER_LISTENING,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          innerListeningReveal,
          `
            <p>
              ${innerListeningTexts[type]}
            </p>
          `
        );


        playMemorySound();


        if (
          innerListeningObserved.length >= 3
        ) {

          setRevealHTML(
            innerListeningReveal,
            `
              <p>
                La peur dit :
              </p>

              <p>
                Hope est morte.
              </p>

              <p>
                Quelque chose d’autre dit :
              </p>

              <p class="impact-text">
                NON.
              </p>

              <p class="name-reveal">
                ELLE EST VIVANTE.
              </p>
            `
          );


          showSecret(
            "anna-feels-hope",
            "Comme Root et Maître Lee, Anna semble percevoir quelque chose concernant Hope qui ne repose pas sur une preuve rationnelle."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".inner-listening-trigger"
  )
  .forEach((button) => {

    if (
      innerListeningObserved.includes(
        button.dataset.innerListening
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 12
   CROISER LES ÉVÉNEMENTS
========================================================= */

const crossDataReveal =
  document.getElementById(
    "crossDataReveal"
  );


let crossDataObserved =
  getStoredArray(
    STORAGE_CROSS_DATA
  );


const crossDataTexts = {

  hope:
    "Hope disparaît dans le canyon après avoir entraîné Amy avec elle.",

  world:
    "Quelques heures plus tard, IA2 détecte une vague anormale de déplacements internationaux vers le Mexique.",

  sentinels:
    "Au même moment, les Sentinelles présentes à l’Institut commencent à recevoir des messages et à accélérer leurs déplacements.",

  lee:
    "Maître Lee arrive lui-même à l’Institut Tempass et affirme déjà savoir qu’Hope est vivante."

};


document
  .querySelectorAll(
    ".cross-data-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.crossData;


        crossDataObserved =
          addStoredValue(
            STORAGE_CROSS_DATA,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          crossDataReveal,
          `
            <p>
              ${crossDataTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          crossDataObserved.length >= 4
        ) {

          setRevealHTML(
            crossDataReveal,
            `
              <p>
                Hope disparaît.
              </p>

              <p>
                Les Sentinelles s’activent.
              </p>

              <p>
                Maître Lee arrive.
              </p>

              <p>
                Des voyageurs convergent
                vers le Mexique.
              </p>

              <p class="impact-text">
                MÊME FENÊTRE TEMPORELLE.
              </p>

              <p class="emphasis">
                Lucy commence à soupçonner
                que ces événements
                ne sont pas indépendants.
              </p>
            `
          );


          showSecret(
            "events-linked",
            "La disparition de Hope et la mobilisation internationale commencent presque simultanément."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".cross-data-trigger"
  )
  .forEach((button) => {

    if (
      crossDataObserved.includes(
        button.dataset.crossData
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 13
   IDENTIFIER LA SURVIVANTE
========================================================= */

const survivorReveal =
  document.getElementById(
    "survivorReveal"
  );


let survivorObserved =
  getStoredArray(
    STORAGE_SURVIVOR
  );


const survivorTexts = {

  location:
    "La femme a été repérée sur une rive située en aval du secteur où Hope et Amy sont tombées.",

  description:
    "La description générale correspond davantage à l’autre femme aperçue par Betty qu’à Hope.",

  clothes:
    "Les vêtements signalés par les premiers témoins sont compatibles avec ceux portés par Amy avant la chute.",

  injuries:
    "Les blessures visibles sont cohérentes avec une chute violente et un passage prolongé dans le courant.",

  time:
    "L’heure estimée de sa découverte correspond à un temps de dérive compatible avec le courant principal."

};


document
  .querySelectorAll(
    ".survivor-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.survivor;


        survivorObserved =
          addStoredValue(
            STORAGE_SURVIVOR,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          survivorReveal,
          `
            <p>
              ${survivorTexts[type]}
            </p>
          `
        );


        playDataSound();


        if (
          survivorObserved.length >= 5
        ) {

          setRevealHTML(
            survivorReveal,
            `
              <p>
                Zone compatible.
              </p>

              <p>
                Description compatible.
              </p>

              <p>
                Vêtements compatibles.
              </p>

              <p>
                Blessures compatibles.
              </p>

              <p>
                Chronologie compatible.
              </p>

              <p class="impact-text">
                CONCORDANCE APPROXIMATIVE :
                95 %
              </p>

              <p class="name-reveal">
                AMY
              </p>

              <p class="emphasis">
                Hypothèse forte.
                Pas encore une preuve.
              </p>
            `
          );


          showSecret(
            "amy-survived",
            "Les éléments disponibles indiquent fortement que la femme retrouvée en aval est Amy et non Hope."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".survivor-trigger"
  )
  .forEach((button) => {

    if (
      survivorObserved.includes(
        button.dataset.survivor
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 14
   MOBILISATION POUR HOPE
========================================================= */

const mobilisationReveal =
  document.getElementById(
    "mobilisationReveal"
  );


let mobilisationObserved =
  getStoredArray(
    STORAGE_MOBILISATION
  );


const mobilisationTexts = {

  sentinels:
    "Plusieurs mouvements semblent liés directement ou indirectement aux Sentinelles.",

  allies:
    "D’anciens alliés et connaissances de longue date se dirigent vers le Mexique sans communication publique entre eux.",

  contacts:
    "Des personnes appartenant à des milieux totalement différents activent leurs propres réseaux et déplacements.",

  organizations:
    "Certaines structures officielles ou semi-officielles semblent réagir à la même information sans coordination visible.",

  unknown:
    "Plusieurs voyageurs ne peuvent être reliés clairement ni aux Sentinelles ni aux organisations connues de Lucy."

};


document
  .querySelectorAll(
    ".mobilisation-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.mobilisation;


        mobilisationObserved =
          addStoredValue(
            STORAGE_MOBILISATION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          mobilisationReveal,
          `
            <p>
              ${mobilisationTexts[type]}
            </p>
          `
        );


        playRevealSound();


        if (
          mobilisationObserved.length >= 5
        ) {

          setRevealHTML(
            mobilisationReveal,
            `
              <p>
                Sentinelles.
              </p>

              <p>
                Alliés.
              </p>

              <p>
                Contacts.
              </p>

              <p>
                Organisations.
              </p>

              <p>
                Réseaux encore inconnus.
              </p>

              <p class="impact-text">
                UNE SEULE DISPARITION.
              </p>

              <p class="name-reveal">
                UNE RÉACTION INTERNATIONALE.
              </p>

              <p class="emphasis">
                Quelque chose dans l’existence
                de Hope dépasse largement
                ce que Lucy imaginait.
              </p>
            `
          );


          showSecret(
            "hope-world-reaction",
            "La disparition de Hope suffit à déclencher des mouvements coordonnés ou parallèles à l’échelle internationale."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".mobilisation-trigger"
  )
  .forEach((button) => {

    if (
      mobilisationObserved.includes(
        button.dataset.mobilisation
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
    "scene-35"
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


function playDarkSound() {

  playTone(
    180,
    0.75,
    0.022,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        240,
        0.95,
        0.017
      );

    },
    170
  );

}


function playCrashSound() {

  playTone(
    150,
    0.4,
    0.023,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        300,
        0.6,
        0.016,
        "sine"
      );

    },
    100
  );

}


function playWaterSound() {

  playTone(
    280,
    0.5,
    0.014,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        390,
        0.8,
        0.011,
        "triangle"
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


function playSentinelSound() {

  playTone(
    310,
    0.7,
    0.017,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        470,
        0.85,
        0.014,
        "triangle"
      );

    },
    160
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
