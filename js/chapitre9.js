/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 9 — LA TRAQUE
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
  "societeOmbre_chapitre9_scroll";

const STORAGE_PROGRESS =
  "societeOmbre_chapitre9_progression";

const STORAGE_COMPLETED =
  "societeOmbre_chapitre9_termine";

const STORAGE_HUASTECA =
  "societeOmbre_chapitre9_huasteca";

const STORAGE_JOURNALISM =
  "societeOmbre_chapitre9_journalism";

const STORAGE_TAMUL =
  "societeOmbre_chapitre9_tamul";

const STORAGE_TRACKING =
  "societeOmbre_chapitre9_tracking";

const STORAGE_DISGUISE =
  "societeOmbre_chapitre9_disguise";

const STORAGE_SHIELD =
  "societeOmbre_chapitre9_shield";

const STORAGE_DIVERSION =
  "societeOmbre_chapitre9_diversion";

const STORAGE_PAST =
  "societeOmbre_chapitre9_past";

const STORAGE_GHOST_PROFILE =
  "societeOmbre_chapitre9_ghostProfile";

const STORAGE_AMY_DEDUCTION =
  "societeOmbre_chapitre9_amyDeduction";

const STORAGE_LAST_WORDS =
  "societeOmbre_chapitre9_lastWords";

const STORAGE_ALLIANCE =
  "societeOmbre_chapitre9_alliance";

const STORAGE_SMOKE =
  "societeOmbre_chapitre9_smoke";

const STORAGE_FINAL_CHOICE =
  "societeOmbre_chapitre9_finalChoice";

const STORAGE_SECRETS =
  "societeOmbre_chapitre9_secrets";


/* =========================================================
   COMPATIBILITÉ ANCIENNE FIN
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre9_finished"
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
    "societeOmbre_chapitre9_";


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
    "chapitre9.html?lecture=recommencer";

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

function openReveal(reveal) {

  if (!reveal) {
    return;
  }


  reveal.classList.add(
    "open"
  );

}


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
   EXPLORER LA HUASTECA
========================================================= */

const huastecaReveal =
  document.getElementById(
    "huastecaReveal"
  );


let huastecaObserved =
  getStoredArray(
    STORAGE_HUASTECA
  );


const huastecaTexts = {

  forest:
    "Une forêt dense entoure le sentier. La végétation réduit rapidement la visibilité au-delà de quelques dizaines de mètres.",

  birds:
    "Des oiseaux multicolores traversent les branches et produisent une activité sonore presque constante.",

  plants:
    "Les feuilles immenses et les plantes tropicales forment des couloirs naturels autour du groupe.",

  water:
    "Le bruit de l’eau accompagne une partie du trajet et devient plus intense à mesure qu’ils approchent du canyon.",

  canyon:
    "Le relief devient progressivement plus marqué, avec des falaises, des pentes humides et des zones dominant profondément le fleuve."

};


document
  .querySelectorAll(
    ".huasteca-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.huasteca;


        huastecaObserved =
          addStoredValue(
            STORAGE_HUASTECA,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          huastecaReveal,
          `
            <p>
              ${huastecaTexts[type]}
            </p>
          `
        );


        playNatureSound();


        if (
          huastecaObserved.length >= 5
        ) {

          setRevealHTML(
            huastecaReveal,
            `
              <p>
                Forêt.
              </p>

              <p>
                Oiseaux.
              </p>

              <p>
                Eau.
              </p>

              <p>
                Relief.
              </p>

              <p class="emphasis">
                Un endroit magnifique.
                Et presque parfait
                pour disparaître.
              </p>
            `
          );


          showSecret(
            "huasteca",
            "La beauté de la Huasteca masque aussi un terrain extrêmement favorable à la dissimulation et à la traque."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".huasteca-trigger"
  )
  .forEach((button) => {

    if (
      huastecaObserved.includes(
        button.dataset.huasteca
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 2
   LEÇON DE JOURNALISME
========================================================= */

const journalismReveal =
  document.getElementById(
    "journalismReveal"
  );


let journalismObserved =
  getStoredArray(
    STORAGE_JOURNALISM
  );


const journalismTexts = {

  understand:
    `
      <p>
        Comprendre est essentiel.
      </p>

      <p>
        Mais selon Max,
        cela ne suffit pas.
      </p>

      <p class="emphasis">
        Le véritable problème commence
        lorsque ce que l’on comprend
        devient dérangeant.
      </p>
    `,

  inform:
    `
      <p>
        Informer suppose
        de transmettre quelque chose
        que d’autres préféreraient parfois
        garder caché.
      </p>

      <p class="emphasis">
        Une information n’est pas neutre
        dès qu’elle dérange un intérêt.
      </p>
    `,

  truth:
    `
      <p>
        Chercher la vérité
        paraît noble.
      </p>

      <p>
        Mais la trouver
        impose ensuite un choix.
      </p>

      <p class="emphasis">
        Que faire
        lorsque la vérité
        ne plaît à personne ?
      </p>
    `

};


document
  .querySelectorAll(
    ".journalism-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.journalism;


        journalismObserved =
          addStoredValue(
            STORAGE_JOURNALISM,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          journalismReveal,
          journalismTexts[type]
        );


        playClueSound();


        if (
          journalismObserved.length >= 3
        ) {

          setRevealHTML(
            journalismReveal,
            `
              <p>
                Comprendre.
              </p>

              <p>
                Informer.
              </p>

              <p>
                Chercher la vérité.
              </p>

              <p class="impact-text">
                Mais surtout :
              </p>

              <p class="emphasis">
                qu’es-tu prête à faire
                lorsque ce que tu découvres
                ne te plaît pas ?
              </p>
            `
          );


          showSecret(
            "max-journalism",
            "Pour Max, le journalisme n’est pas seulement une recherche de vérité : il oblige à décider quoi faire lorsqu’une vérité dérange."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".journalism-trigger"
  )
  .forEach((button) => {

    if (
      journalismObserved.includes(
        button.dataset.journalism
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 3
   TAMUL
========================================================= */

const tamulReveal =
  document.getElementById(
    "tamulReveal"
  );


let tamulObserved =
  getStoredArray(
    STORAGE_TAMUL
  );


const tamulTexts = {

  waterfall:
    "Une immense masse d’eau turquoise se précipite depuis le sommet de la falaise.",

  rainbow:
    "La brume suspendue dans l’air capte la lumière et forme par endroits un léger arc-en-ciel.",

  canyon:
    "Le canyon s’étend profondément sous eux, sculpté par les cours d’eau et couvert de végétation.",

  birds:
    "Des oiseaux traversent le vide au-dessus du fleuve tandis que la forêt semble se prolonger à l’infini."

};


document
  .querySelectorAll(
    ".tamul-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.tamul;


        tamulObserved =
          addStoredValue(
            STORAGE_TAMUL,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          tamulReveal,
          `
            <p>
              ${tamulTexts[type]}
            </p>
          `
        );


        playNatureSound();


        if (
          tamulObserved.length >= 4
        ) {

          setRevealHTML(
            tamulReveal,
            `
              <p>
                Eau.
              </p>

              <p>
                Brume.
              </p>

              <p>
                Canyon.
              </p>

              <p>
                Forêt.
              </p>

              <p class="emphasis">
                Il existe des endroits
                qui remettent les choses
                à leur place.
              </p>
            `
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".tamul-trigger"
  )
  .forEach((button) => {

    if (
      tamulObserved.includes(
        button.dataset.tamul
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 4
   DÉTECTION DE LA TRAQUE
========================================================= */

const trackingReveal =
  document.getElementById(
    "trackingReveal"
  );


let trackingObserved =
  getStoredArray(
    STORAGE_TRACKING
  );


const trackingTexts = {

  birds:
    "Les oiseaux ne se taisent pas complètement. Leur rythme change, comme si quelque chose perturbait progressivement leur comportement.",

  movement:
    "Un mouvement revient avec une régularité trop précise dans les feuillages pour correspondre au vent.",

  branch:
    "Une branche déplacée revient lentement en place, comme si quelqu’un venait de la relâcher.",

  silence:
    "Entre deux sons naturels apparaît une absence presque imperceptible. Un silence créé par une présence qui tente de ne pas en faire."

};


document
  .querySelectorAll(
    ".tracking-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.tracking;


        trackingObserved =
          addStoredValue(
            STORAGE_TRACKING,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          trackingReveal,
          `
            <p>
              ${trackingTexts[type]}
            </p>
          `
        );


        playTrackingSound();


        if (
          trackingObserved.length >= 4
        ) {

          setRevealHTML(
            trackingReveal,
            `
              <p>
                Oiseaux perturbés.
              </p>

              <p>
                Mouvement régulier.
              </p>

              <p>
                Branche déplacée.
              </p>

              <p>
                Silence inhabituel.
              </p>

              <p class="impact-text">
                QUELQU’UN LES SUIT.
              </p>

              <p class="emphasis">
                Hope ne le voit pas.
                Elle le sait.
              </p>
            `
          );


          showSecret(
            "tracking",
            "Hope reconnaît les micro-anomalies d’un environnement lorsqu’une présence humaine tente de s’y dissimuler."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".tracking-trigger"
  )
  .forEach((button) => {

    if (
      trackingObserved.includes(
        button.dataset.tracking
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 5
   INVERSION DES SILHOUETTES
========================================================= */

const disguiseReveal =
  document.getElementById(
    "disguiseReveal"
  );


let disguiseObserved =
  getStoredArray(
    STORAGE_DISGUISE
  );


const disguiseTexts = {

  hope:
    "Hope porte désormais la veste d’Anna. De loin, sa silhouette peut être confondue avec celle que leur poursuivant s’attend à suivre.",

  anna:
    "Anna récupère la veste de Betty et perd ainsi une partie des repères visuels utilisés pour l’identifier.",

  max:
    "Max devient le protecteur direct d’Anna et doit l’éloigner du groupe sans attirer l’attention.",

  silhouette:
    "À distance et au milieu de la végétation, couleurs, volumes et mouvements comptent parfois davantage qu’un visage impossible à distinguer."

};


document
  .querySelectorAll(
    ".disguise-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.disguise;


        disguiseObserved =
          addStoredValue(
            STORAGE_DISGUISE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          disguiseReveal,
          `
            <p>
              ${disguiseTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          disguiseObserved.length >= 4
        ) {

          setRevealHTML(
            disguiseReveal,
            `
              <p>
                Anna disparaît du groupe.
              </p>

              <p>
                Hope emprunte sa silhouette.
              </p>

              <p>
                Betty devient le faux compagnon.
              </p>

              <p>
                Max devient le véritable protecteur.
              </p>

              <p class="impact-text">
                LEURRES VISUELS
              </p>

              <p class="emphasis">
                De loin,
                Anna n’est plus forcément Anna.
              </p>
            `
          );


          showSecret(
            "silhouette-switch",
            "Hope ne cherche pas à devenir invisible : elle cherche à exploiter les attentes de la personne qui les poursuit."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".disguise-trigger"
  )
  .forEach((button) => {

    if (
      disguiseObserved.includes(
        button.dataset.disguise
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 6
   BOUCLIER FRAIS
========================================================= */

const shieldReveal =
  document.getElementById(
    "shieldReveal"
  );


let shieldObserved =
  getStoredArray(
    STORAGE_SHIELD
  );


const shieldTexts = {

  optical:
    "Une membrane active modifie localement la lumière renvoyée par les surfaces afin de rendre les contours plus difficiles à distinguer à distance.",

  ballistic:
    "Le système offre une protection partielle contre certains impacts, sans équivaloir à une véritable armure.",

  thermal:
    "La signature thermique est réduite afin de compliquer la détection par certains capteurs infrarouges.",

  jamming:
    "Le dispositif brouille plusieurs modes de détection et limite momentanément le suivi électronique."

};


document
  .querySelectorAll(
    ".shield-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.shield;


        shieldObserved =
          addStoredValue(
            STORAGE_SHIELD,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          shieldReveal,
          `
            <p>
              ${shieldTexts[type]}
            </p>
          `
        );


        playShieldSound();


        if (
          shieldObserved.length >= 4
        ) {

          setRevealHTML(
            shieldReveal,
            `
              <p>
                Camouflage optique.
              </p>

              <p>
                Protection balistique partielle.
              </p>

              <p>
                Réduction thermique.
              </p>

              <p>
                Brouillage.
              </p>

              <p class="impact-text">
                BOUCLIER FRAIS
              </p>

              <p class="emphasis">
                Pas une invisibilité.
                Une confusion suffisamment crédible
                pour gagner du temps.
              </p>
            `
          );


          showSecret(
            "fresh-shield",
            "Le bouclier frais de Peter combine plusieurs technologies défensives plutôt qu’une véritable invisibilité."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".shield-trigger"
  )
  .forEach((button) => {

    if (
      shieldObserved.includes(
        button.dataset.shield
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 7
   PLAN DE DIVERSION
========================================================= */

const diversionReveal =
  document.getElementById(
    "diversionReveal"
  );


let diversionObserved =
  getStoredArray(
    STORAGE_DIVERSION
  );


const diversionTexts = {

  anna:
    "Anna doit quitter la zone de danger avant que la personne qui les suit ne comprenne la substitution.",

  visible:
    "Hope et Betty doivent continuer à avancer de manière suffisamment visible pour maintenir la filature.",

  amy:
    "Hope parie sur la connaissance qu’Amy a d’elle : Amy supposera qu’Hope ne laisserait jamais Anna s’éloigner sans elle.",

  time:
    "Chaque minute pendant laquelle Amy suit le mauvais groupe augmente la distance entre Anna et la menace."

};


document
  .querySelectorAll(
    ".diversion-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.diversion;


        diversionObserved =
          addStoredValue(
            STORAGE_DIVERSION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          diversionReveal,
          `
            <p>
              ${diversionTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          diversionObserved.length >= 4
        ) {

          setRevealHTML(
            diversionReveal,
            `
              <p>
                Éloigner Anna.
              </p>

              <p>
                Rester visibles.
              </p>

              <p>
                Exploiter les attentes d’Amy.
              </p>

              <p>
                Gagner du temps.
              </p>

              <p class="impact-text">
                Hope ne fuit pas Amy.
              </p>

              <p class="emphasis">
                Elle l’attire ailleurs.
              </p>
            `
          );


          showSecret(
            "hope-diversion",
            "Hope utilise sa propre relation avec Amy comme élément central du plan de diversion."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".diversion-trigger"
  )
  .forEach((button) => {

    if (
      diversionObserved.includes(
        button.dataset.diversion
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 8
   PASSÉ HOPE / AMY
========================================================= */

const pastReveal =
  document.getElementById(
    "pastReveal"
  );


const pastButtons =
  document.querySelectorAll(
    ".past-trigger"
  );


const pastOrder = [
  "crash",
  "survivors",
  "camps",
  "friendship",
  "punishment",
  "separation"
];


let pastProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_PAST
    ) || "0",
    10
  );


const pastTexts = {

  crash:
    "Le crash de l’A380 a bouleversé la vie de Hope et frappé une partie de la communauté d’Amy.",

  survivors:
    "Hope et Amy avaient le même âge : douze ans. Deux enfants ayant perdu une partie essentielle de leur monde.",

  camps:
    "Hope a été recueillie par les Sentinelles. Amy par les Gardiens Noirs.",

  friendship:
    "Malgré l’interdiction, elles ont continué à se retrouver en secret pour jouer, parler et partager ce qu’elles apprenaient.",

  punishment:
    "Lorsque leurs deux camps ont découvert leurs rencontres, elles ont été punies de plus en plus sévèrement.",

  separation:
    "Elles ont fini par cesser de se voir, sans pourtant réellement perdre la trace l’une de l’autre."

};


function restorePast() {

  pastButtons.forEach(
    (button, index) => {

      if (
        index < pastProgress
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
    pastProgress >= 6
  ) {

    setRevealHTML(
      pastReveal,
      `
        <p>
          Deux enfants.
        </p>

        <p>
          Deux survivantes.
        </p>

        <p>
          Deux camps ennemis.
        </p>

        <p class="impact-text">
          UNE AMITIÉ INTERDITE
        </p>

        <p class="emphasis">
          Elles ont cessé de se voir.
          Pas de se surveiller.
        </p>
      `
    );

  }

}


pastButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.past;


        const expected =
          pastOrder[
            pastProgress
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


        pastProgress++;


        localStorage.setItem(
          STORAGE_PAST,
          pastProgress
        );


        button.classList.add(
          "completed"
        );

        button.disabled =
          true;


        setRevealHTML(
          pastReveal,
          `
            <p>
              ${pastTexts[selected]}
            </p>
          `
        );


        playMemorySound();


        if (
          pastProgress >= 6
        ) {

          setRevealHTML(
            pastReveal,
            `
              <p>
                Deux enfants.
              </p>

              <p>
                Deux survivantes.
              </p>

              <p>
                Deux camps ennemis.
              </p>

              <p class="impact-text">
                UNE AMITIÉ INTERDITE
              </p>

              <p class="emphasis">
                Elles ont cessé de se voir.
                Pas de se surveiller.
              </p>
            `
          );


          showSecret(
            "hope-amy-past",
            "Hope et Amy ont été amies durant leur enfance malgré l’opposition totale entre Sentinelles et Gardiens Noirs."
          );

        }

      }
    );

  });


restorePast();


/* =========================================================
   INTERACTION 9
   PROFIL DU FANTÔME
========================================================= */

const ghostProfileReveal =
  document.getElementById(
    "ghostProfileReveal"
  );


let ghostProfileObserved =
  getStoredArray(
    STORAGE_GHOST_PROFILE
  );


const ghostProfileTexts = {

  tracker:
    "Amy sait suivre une cible, anticiper ses déplacements et exploiter les traces les plus discrètes.",

  killer:
    "Elle fait partie des recours les plus dangereux des Gardiens Noirs lorsqu’une cible doit être éliminée.",

  observer:
    "Elle observe avant d’agir et sait attendre suffisamment longtemps pour comprendre les habitudes de sa cible.",

  hope:
    "Son principal avantage contre Hope est aussi le plus dangereux : elle connaît ses réflexes, son caractère et une partie de son histoire."

};


document
  .querySelectorAll(
    ".ghost-profile-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.ghostProfile;


        ghostProfileObserved =
          addStoredValue(
            STORAGE_GHOST_PROFILE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          ghostProfileReveal,
          `
            <p>
              ${ghostProfileTexts[type]}
            </p>
          `
        );


        playGhostSound();


        if (
          ghostProfileObserved.length >= 4
        ) {

          setRevealHTML(
            ghostProfileReveal,
            `
              <p>
                Traqueuse.
              </p>

              <p>
                Tueuse.
              </p>

              <p>
                Observatrice.
              </p>

              <p>
                Elle connaît Hope.
              </p>

              <p class="name-reveal">
                LE FANTÔME DE L’OMBRE
              </p>
            `
          );


          showSecret(
            "ghost-profile",
            "Amy est particulièrement dangereuse pour Hope parce que leur histoire commune lui donne des repères que presque aucun adversaire ne possède."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".ghost-profile-trigger"
  )
  .forEach((button) => {

    if (
      ghostProfileObserved.includes(
        button.dataset.ghostProfile
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 10
   AMY COMPREND LA RUSE
========================================================= */

const amyDeductionReveal =
  document.getElementById(
    "amyDeductionReveal"
  );


let amyDeductionObserved =
  getStoredArray(
    STORAGE_AMY_DEDUCTION
  );


const amyDeductionTexts = {

  jacket:
    "Hope porte la veste d’Anna. Le détail confirme qu’une substitution de silhouettes a été organisée.",

  betty:
    "La veste de Betty n’est plus sur elle. La composition du faux duo devient évidente pour Amy.",

  max:
    "Max n’est plus dans le groupe. S’il manque au même moment qu’Anna, ce n’est probablement pas une coïncidence.",

  anna:
    "Anna n’est plus visible. Amy comprend qu’elle a suivi le leurre assez longtemps pour laisser la véritable cible s’éloigner."

};


document
  .querySelectorAll(
    ".amy-deduction-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.amyDeduction;


        amyDeductionObserved =
          addStoredValue(
            STORAGE_AMY_DEDUCTION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          amyDeductionReveal,
          `
            <p>
              ${amyDeductionTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          amyDeductionObserved.length >= 4
        ) {

          setRevealHTML(
            amyDeductionReveal,
            `
              <p>
                Veste d’Anna.
              </p>

              <p>
                Veste de Betty.
              </p>

              <p>
                Max absent.
              </p>

              <p>
                Anna absente.
              </p>

              <p class="impact-text">
                AMY COMPREND.
              </p>

              <p class="emphasis">
                Hope l’a réellement trompée.
              </p>
            `
          );


          showSecret(
            "amy-tricked",
            "Hope parvient à tromper Amy suffisamment longtemps pour éloigner Anna, un exploit qu’Amy reconnaît elle-même comme rare."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".amy-deduction-trigger"
  )
  .forEach((button) => {

    if (
      amyDeductionObserved.includes(
        button.dataset.amyDeduction
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 11
   NE CHANGE JAMAIS
========================================================= */

const lastWordsTrigger =
  document.getElementById(
    "lastWordsTrigger"
  );

const lastWordsReveal =
  document.getElementById(
    "lastWordsReveal"
  );


function revealLastWords() {

  localStorage.setItem(
    STORAGE_LAST_WORDS,
    "1"
  );


  openReveal(
    lastWordsReveal
  );


  completeButton(
    lastWordsTrigger,
    "Trois mots révélés"
  );


  lastWordsTrigger.disabled =
    true;


  playMemorySound();


  showSecret(
    "never-change",
    "« Ne change jamais » sont les trois derniers mots qu’Amy avait adressés à Hope lors de leur dernière véritable rencontre."
  );

}


lastWordsTrigger?.addEventListener(
  "click",
  revealLastWords
);


if (
  localStorage.getItem(
    STORAGE_LAST_WORDS
  ) === "1"
) {

  openReveal(
    lastWordsReveal
  );


  completeButton(
    lastWordsTrigger,
    "Trois mots révélés"
  );


  if (lastWordsTrigger) {

    lastWordsTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 12
   ALLIANCE D'AMY
========================================================= */

const allianceReveal =
  document.getElementById(
    "allianceReveal"
  );


let allianceObserved =
  getStoredArray(
    STORAGE_ALLIANCE
  );


const allianceTexts = {

  amy:
    "Amy s’imagine comme l’élément capable d’utiliser les méthodes des Gardiens Noirs sans leurs limites actuelles.",

  hope:
    "Hope représente pour elle la discipline, les connaissances des Sentinelles et une capacité de combat qu’Amy respecte depuis l’enfance.",

  anna:
    "Anna possède un potentiel qu’Amy juge trop précieux pour être simplement détruit.",

  betty:
    "Même Betty pourrait devenir utile : science, ressources et accès aux recherches biologiques."

};


document
  .querySelectorAll(
    ".alliance-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.alliance;


        allianceObserved =
          addStoredValue(
            STORAGE_ALLIANCE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          allianceReveal,
          `
            <p>
              ${allianceTexts[type]}
            </p>
          `
        );


        playDarkSound();


        if (
          allianceObserved.length >= 4
        ) {

          setRevealHTML(
            allianceReveal,
            `
              <p>
                Amy.
              </p>

              <p>
                Hope.
              </p>

              <p>
                Anna.
              </p>

              <p>
                Peut-être Betty.
              </p>

              <p class="impact-text">
                PERSONNE NE POURRAIT
                NOUS ARRÊTER.
              </p>

              <p class="emphasis">
                Amy ne veut pas seulement
                détruire Anna.
                Elle imagine encore
                pouvoir la rallier.
              </p>
            `
          );


          showSecret(
            "amy-alliance",
            "Amy voit encore Hope et Anna comme des alliées potentielles plutôt que comme de simples ennemies à éliminer."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".alliance-trigger"
  )
  .forEach((button) => {

    if (
      allianceObserved.includes(
        button.dataset.alliance
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 13
   NUAGE / FUITE
========================================================= */

const smokeTrigger =
  document.getElementById(
    "smokeTrigger"
  );

const smokeReveal =
  document.getElementById(
    "smokeReveal"
  );


function deploySmoke() {

  localStorage.setItem(
    STORAGE_SMOKE,
    "1"
  );


  openReveal(
    smokeReveal
  );


  completeButton(
    smokeTrigger,
    "Nuage déployé"
  );


  smokeTrigger.disabled =
    true;


  playSmokeSound();


  showSecret(
    "smoke-escape",
    "Hope n’utilise le nuage que pour gagner quelques secondes : face à Amy, elle sait qu’une simple diversion ne suffira pas longtemps."
  );

}


smokeTrigger?.addEventListener(
  "click",
  deploySmoke
);


if (
  localStorage.getItem(
    STORAGE_SMOKE
  ) === "1"
) {

  openReveal(
    smokeReveal
  );


  completeButton(
    smokeTrigger,
    "Nuage déployé"
  );


  if (smokeTrigger) {

    smokeTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 14
   DERNIÈRES PAROLES DE HOPE
========================================================= */

const finalChoiceTrigger =
  document.getElementById(
    "finalChoiceTrigger"
  );

const finalChoiceReveal =
  document.getElementById(
    "finalChoiceReveal"
  );


function revealFinalChoice() {

  localStorage.setItem(
    STORAGE_FINAL_CHOICE,
    "1"
  );


  openReveal(
    finalChoiceReveal
  );


  completeButton(
    finalChoiceTrigger,
    "Message compris"
  );


  finalChoiceTrigger.disabled =
    true;


  playRevealSound();


  showSecret(
    "anna-more",
    "Hope affirme à Betty qu’Anna est « bien plus que sa fille » et lui demande de la laisser devenir ce qu’elle doit devenir."
  );

}


finalChoiceTrigger?.addEventListener(
  "click",
  revealFinalChoice
);


if (
  localStorage.getItem(
    STORAGE_FINAL_CHOICE
  ) === "1"
) {

  openReveal(
    finalChoiceReveal
  );


  completeButton(
    finalChoiceTrigger,
    "Message compris"
  );


  if (finalChoiceTrigger) {

    finalChoiceTrigger.disabled =
      true;

  }

}


/* =========================================================
   MÉMOIRE DU CHAPITRE 8
========================================================= */

const chapter8Finished =
  localStorage.getItem(
    "societeOmbre_chapitre8_termine"
  ) ||
  localStorage.getItem(
    "societeOmbre_chapitre8_finished"
  );


if (
  chapter8Finished === "1"
) {

  const scene2 =
    document.getElementById(
      "scene-2"
    );


  const textBlock =
    scene2?.querySelector(
      ".text-block"
    );


  if (
    textBlock &&
    !document.getElementById(
      "chapter8Memory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "chapter8Memory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "30px";


    memory.textContent =
      "Pendant qu’Anna poursuivait sa vie, le Maître Noir avait décidé de confier son observation au Fantôme : Amy.";


    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   MÉMOIRE : RÉACTION D'AMY À HOPE
========================================================= */

const amyHopeReaction =
  getStoredArray(
    "societeOmbre_chapitre8_amyReaction"
  );


if (
  amyHopeReaction.length >= 3
) {

  const scene19 =
    document.getElementById(
      "scene-19"
    );


  const textBlock =
    scene19?.querySelector(
      ".text-block"
    );


  if (
    textBlock &&
    !document.getElementById(
      "amyHopeMemory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "amyHopeMemory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "30px";


    memory.textContent =
      "Lorsqu’Amy avait découvert la photographie de Hope, sa réaction avait déjà laissé penser qu’elles partageaient une histoire inconnue.";


    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   FIN DU CHAPITRE
========================================================= */

const finalScene =
  document.getElementById(
    "scene-39"
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


function playTrackingSound() {

  playTone(
    240,
    0.45,
    0.017,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        310,
        0.5,
        0.014,
        "sine"
      );

    },
    140
  );

}


function playShieldSound() {

  playTone(
    300,
    0.5,
    0.02,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        540,
        0.8,
        0.016,
        "sine"
      );

    },
    140
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


function playGhostSound() {

  playTone(
    260,
    0.65,
    0.014,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        390,
        0.8,
        0.012,
        "triangle"
      );

    },
    160
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


function playSmokeSound() {

  playTone(
    210,
    0.35,
    0.018,
    "triangle"
  );


  setTimeout(
    () => {

      playTone(
        500,
        0.6,
        0.012,
        "sine"
      );

    },
    90
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
