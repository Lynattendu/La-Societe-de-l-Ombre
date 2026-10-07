/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   CHAPITRE 7 — L’INCIDENT DE TROP
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
  "societeOmbre_chapitre7_scroll";

const STORAGE_PROGRESS =
  "societeOmbre_chapitre7_progression";

const STORAGE_COMPLETED =
  "societeOmbre_chapitre7_termine";


const STORAGE_SECURITY =
  "societeOmbre_chapitre7_security";

const STORAGE_ALERT =
  "societeOmbre_chapitre7_alert";

const STORAGE_INTRUSION =
  "societeOmbre_chapitre7_intrusion";

const STORAGE_AIRFLY =
  "societeOmbre_chapitre7_airfly";

const STORAGE_CAPSULE =
  "societeOmbre_chapitre7_capsule";

const STORAGE_CRASH_ANNA =
  "societeOmbre_chapitre7_crashAnna";

const STORAGE_HOPE_MISTAKE =
  "societeOmbre_chapitre7_hopeMistake";

const STORAGE_HOPE_STATE =
  "societeOmbre_chapitre7_hopeState";

const STORAGE_STASIS =
  "societeOmbre_chapitre7_stasis";

const STORAGE_HALE_REASONING =
  "societeOmbre_chapitre7_haleReasoning";

const STORAGE_WHITE_ROOM =
  "societeOmbre_chapitre7_whiteRoom";

const STORAGE_SURGERY =
  "societeOmbre_chapitre7_surgery";

const STORAGE_MEDICAL_CAPSULE =
  "societeOmbre_chapitre7_medicalCapsule";

const STORAGE_HEALING =
  "societeOmbre_chapitre7_healing";

const STORAGE_RECOVERY =
  "societeOmbre_chapitre7_recovery";

const STORAGE_DEAD_FILES =
  "societeOmbre_chapitre7_deadFiles";

const STORAGE_VICTIMS =
  "societeOmbre_chapitre7_victims";

const STORAGE_COUNTERFACTUAL =
  "societeOmbre_chapitre7_counterfactual";

const STORAGE_SECRETS =
  "societeOmbre_chapitre7_secrets";


/* =========================================================
   COMPATIBILITÉ ANCIENNE FIN
========================================================= */

if (
  localStorage.getItem(
    "societeOmbre_chapitre7_finished"
  ) === "1"
) {

  localStorage.setItem(
    STORAGE_COMPLETED,
    "1"
  );

}


/* =========================================================
   MODE D'OUVERTURE
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
        localStorage.getItem(
          key
        )
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
  array
) {

  localStorage.setItem(
    key,
    JSON.stringify(
      array
    )
  );

}


function addStoredValue(
  key,
  value
) {

  const array =
    getStoredArray(key);


  if (
    !array.includes(value)
  ) {

    array.push(value);

    saveStoredArray(
      key,
      array
    );

  }


  return array;

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

const observer =
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

    observer.observe(
      scene
    );

  }
);


/* =========================================================
   TEXTE PROGRESSIF
========================================================= */

function animateParagraphs(scene) {

  if (
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
                transform:
                  "translateY(12px)"
              },

              {
                opacity: 1,
                transform:
                  "translateY(0)"
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
    document.documentElement
      .scrollHeight -
    window.innerHeight;


  if (
    documentHeight <= 0
  ) {
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
   SAUVEGARDE DE LA POSITION
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
   REPRENDRE DEPUIS LE MENU GÉNÉRAL
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
   RECOMMENCER DEPUIS LE MENU GÉNÉRAL
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
   BOUTONS CONTINUER
========================================================= */

document
  .querySelectorAll(
    "[data-next]"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

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
    (event) => {

      if (
        event.target ===
        chapterMenu
      ) {

        closeMenu();

      }

    }
  );

}


/* =========================================================
   REPRENDRE DEPUIS LE MENU DU CHAPITRE
========================================================= */

if (resumeBtn) {

  resumeBtn.addEventListener(
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
   RECOMMENCER LE CHAPITRE
========================================================= */

function restartChapterFunction() {

  const prefix =
    "societeOmbre_chapitre7_";


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
        prefix
      )
    ) {

      keysToDelete.push(
        key
      );

    }

  }


  keysToDelete.forEach(
    (key) => {

      localStorage.removeItem(
        key
      );

    }
  );


  window.location.href =
    "chapitre7.html?lecture=recommencer";

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

    return JSON.parse(
      localStorage.getItem(
        STORAGE_SECRETS
      )
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveSecret(secret) {

  const secrets =
    getSecrets();


  if (
    !secrets.includes(
      secret
    )
  ) {

    secrets.push(
      secret
    );


    localStorage.setItem(
      STORAGE_SECRETS,
      JSON.stringify(
        secrets
      )
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
      () => {

        hideSecretPopup();

      },
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
   SÉCURITÉ HACIENDA
========================================================= */

const securityObserveReveal =
  document.getElementById(
    "securityObserveReveal"
  );


let securityObserved =
  getStoredArray(
    STORAGE_SECURITY
  );


const securityTexts = {

  cameras:
    "Les caméras couvrent les zones principales et croisent leurs angles de surveillance.",

  sensors:
    "Les capteurs détectent mouvements, ouvertures et variations inhabituelles dans certaines zones sensibles.",

  patrols:
    "Les équipes effectuent des rotations régulières selon un planning précis.",

  biometric:
    "Certains accès nécessitent une validation biométrique. Un visiteur non autorisé ne devrait normalement pas pouvoir progresser."

};


document
  .querySelectorAll(
    ".security-observe-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset
            .securityObserve;


        securityObserved =
          addStoredValue(
            STORAGE_SECURITY,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          securityObserveReveal,
          `
            <p>
              ${securityTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          securityObserved.length >= 4
        ) {

          setRevealHTML(
            securityObserveReveal,
            `
              <p>
                Caméras.
              </p>

              <p>
                Capteurs.
              </p>

              <p>
                Patrouilles.
              </p>

              <p>
                Biométrie.
              </p>

              <p class="emphasis">
                Tout semble sécurisé.
                Pourtant quelqu’un
                est déjà à l’intérieur.
              </p>
            `
          );


          showSecret(
            "flores-security",
            "Les protections de l’hacienda Flores sont suffisamment nombreuses pour rendre une intrusion extérieure improvisée extrêmement improbable."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".security-observe-trigger"
  )
  .forEach((button) => {

    if (
      securityObserved.includes(
        button.dataset
          .securityObserve
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 2
   ALERTE INTERNE
========================================================= */

const internalAlertTrigger =
  document.getElementById(
    "internalAlertTrigger"
  );

const internalAlertReveal =
  document.getElementById(
    "internalAlertReveal"
  );


function revealInternalAlert() {

  localStorage.setItem(
    STORAGE_ALERT,
    "1"
  );


  openReveal(
    internalAlertReveal
  );


  completeButton(
    internalAlertTrigger,
    "Alerte révélée"
  );


  internalAlertTrigger.disabled =
    true;


  playAlertSound();

}


internalAlertTrigger?.addEventListener(
  "click",
  revealInternalAlert
);


if (
  localStorage.getItem(
    STORAGE_ALERT
  ) === "1"
) {

  openReveal(
    internalAlertReveal
  );


  completeButton(
    internalAlertTrigger,
    "Alerte révélée"
  );


  if (internalAlertTrigger) {

    internalAlertTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 3
   ANALYSE DE L'INTRUSION
========================================================= */

const intrusionReveal =
  document.getElementById(
    "intrusionReveal"
  );


let intrusionObserved =
  getStoredArray(
    STORAGE_INTRUSION
  );


const intrusionTexts = {

  angles:
    "Les assaillants empruntent précisément les zones les moins visibles par les caméras.",

  procedures:
    "Ils progressent comme s’ils connaissaient à l’avance les procédures de verrouillage et de réaction.",

  rotations:
    "Leur déplacement correspond aux intervalles entre les rotations des équipes de sécurité.",

  internal:
    "La précision de leur progression suggère qu’ils possèdent des informations qui ne devraient être accessibles qu’à quelqu’un de l’intérieur."

};


document
  .querySelectorAll(
    ".intrusion-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.intrusion;


        intrusionObserved =
          addStoredValue(
            STORAGE_INTRUSION,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          intrusionReveal,
          `
            <p>
              ${intrusionTexts[type]}
            </p>
          `
        );


        playClueSound();


        if (
          intrusionObserved.length >= 4
        ) {

          setRevealHTML(
            intrusionReveal,
            `
              <p class="impact-text">
                DÉDUCTION
              </p>

              <p>
                Cette intrusion
                n’aurait probablement pas
                été possible
                sans information interne.
              </p>

              <p class="emphasis">
                Quelqu’un les a aidés.
              </p>
            `
          );


          showSecret(
            "internal-help",
            "Les assaillants disposent d’informations trop précises sur l’hacienda Flores pour avoir simplement improvisé leur entrée."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".intrusion-trigger"
  )
  .forEach((button) => {

    if (
      intrusionObserved.includes(
        button.dataset.intrusion
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 4
   AIRFLY
========================================================= */

const airflyTrigger =
  document.getElementById(
    "airflyTrigger"
  );

const airflyReveal =
  document.getElementById(
    "airflyReveal"
  );


function activateAirfly() {

  localStorage.setItem(
    STORAGE_AIRFLY,
    "1"
  );


  openReveal(
    airflyReveal
  );


  completeButton(
    airflyTrigger,
    "Accès rejoint"
  );


  airflyTrigger.disabled =
    true;


  playMovementSound();

}


airflyTrigger?.addEventListener(
  "click",
  activateAirfly
);


if (
  localStorage.getItem(
    STORAGE_AIRFLY
  ) === "1"
) {

  openReveal(
    airflyReveal
  );


  completeButton(
    airflyTrigger,
    "Accès rejoint"
  );


  if (airflyTrigger) {

    airflyTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 5
   CAPSULE DE HALE
========================================================= */

const capsuleReveal =
  document.getElementById(
    "capsuleReveal"
  );


let capsuleObserved =
  getStoredArray(
    STORAGE_CAPSULE
  );


const capsuleTexts = {

  coagulation:
    "La capsule favorise rapidement la formation d’un environnement capable de limiter l’hémorragie.",

  tissue:
    "Une membrane protège localement les tissus lésés et stabilise la zone traumatisée.",

  repair:
    "Certains composés stimulent des mécanismes naturels de réparation déjà présents dans l’organisme. Ils ne recréent pas instantanément un tissu détruit."

};


document
  .querySelectorAll(
    ".capsule-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.capsule;


        capsuleObserved =
          addStoredValue(
            STORAGE_CAPSULE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          capsuleReveal,
          `
            <p>
              ${capsuleTexts[type]}
            </p>
          `
        );


        playMedicalSound();


        if (
          capsuleObserved.length >= 3
        ) {

          setRevealHTML(
            capsuleReveal,
            `
              <p>
                Coagulation.
              </p>

              <p>
                Protection tissulaire.
              </p>

              <p>
                Stimulation de la réparation.
              </p>

              <p class="emphasis">
                La capsule accélère
                des mécanismes biologiques.
                Elle ne remplace pas
                une véritable intervention médicale.
              </p>
            `
          );


          showSecret(
            "hale-capsule",
            "La capsule de Hope stabilise Hale et accélère sa réparation, mais sa blessure reste réelle."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".capsule-trigger"
  )
  .forEach((button) => {

    if (
      capsuleObserved.includes(
        button.dataset.capsule
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 6
   BULLE CRASH ANNA
========================================================= */

const crashAnnaTrigger =
  document.getElementById(
    "crashAnnaTrigger"
  );

const crashAnnaReveal =
  document.getElementById(
    "crashAnnaReveal"
  );


function activateCrashAnna() {

  localStorage.setItem(
    STORAGE_CRASH_ANNA,
    "1"
  );


  openReveal(
    crashAnnaReveal
  );


  completeButton(
    crashAnnaTrigger,
    "Protection déployée"
  );


  crashAnnaTrigger.disabled =
    true;


  playShieldSound();


  showSecret(
    "anna-crash",
    "La bulle Crash permet à Hope de laisser Anna protégée pendant qu’elle cherche Betty."
  );

}


crashAnnaTrigger?.addEventListener(
  "click",
  activateCrashAnna
);


if (
  localStorage.getItem(
    STORAGE_CRASH_ANNA
  ) === "1"
) {

  openReveal(
    crashAnnaReveal
  );


  completeButton(
    crashAnnaTrigger,
    "Protection déployée"
  );


  if (crashAnnaTrigger) {

    crashAnnaTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 7
   ERREUR DE HOPE
========================================================= */

const hopeMistakeTrigger =
  document.getElementById(
    "hopeMistakeTrigger"
  );

const hopeMistakeReveal =
  document.getElementById(
    "hopeMistakeReveal"
  );


function revealHopeMistake() {

  localStorage.setItem(
    STORAGE_HOPE_MISTAKE,
    "1"
  );


  openReveal(
    hopeMistakeReveal
  );


  completeButton(
    hopeMistakeTrigger,
    "Erreur comprise"
  );


  hopeMistakeTrigger.disabled =
    true;


  playMarkSound();


  showSecret(
    "hope-attachment",
    "L’attachement de Hope à Anna et Betty modifie pour la première fois son comportement en combat."
  );

}


hopeMistakeTrigger?.addEventListener(
  "click",
  revealHopeMistake
);


if (
  localStorage.getItem(
    STORAGE_HOPE_MISTAKE
  ) === "1"
) {

  openReveal(
    hopeMistakeReveal
  );


  completeButton(
    hopeMistakeTrigger,
    "Erreur comprise"
  );


  if (hopeMistakeTrigger) {

    hopeMistakeTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 8
   ÉTAT DE HOPE
========================================================= */

const hopeStateTrigger =
  document.getElementById(
    "hopeStateTrigger"
  );

const hopeStateReveal =
  document.getElementById(
    "hopeStateReveal"
  );


function revealHopeState() {

  localStorage.setItem(
    STORAGE_HOPE_STATE,
    "1"
  );


  openReveal(
    hopeStateReveal
  );


  completeButton(
    hopeStateTrigger,
    "État analysé"
  );


  hopeStateTrigger.disabled =
    true;


  playAnalysisSound();

}


hopeStateTrigger?.addEventListener(
  "click",
  revealHopeState
);


if (
  localStorage.getItem(
    STORAGE_HOPE_STATE
  ) === "1"
) {

  openReveal(
    hopeStateReveal
  );


  completeButton(
    hopeStateTrigger,
    "État analysé"
  );


  if (hopeStateTrigger) {

    hopeStateTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 9
   MODE STASE
========================================================= */

const stasisTrigger =
  document.getElementById(
    "stasisTrigger"
  );

const stasisReveal =
  document.getElementById(
    "stasisReveal"
  );


function activateStasis() {

  localStorage.setItem(
    STORAGE_STASIS,
    "1"
  );


  openReveal(
    stasisReveal
  );


  completeButton(
    stasisTrigger,
    "Stase active"
  );


  stasisTrigger.disabled =
    true;


  playStasisSound();


  showSecret(
    "stasis",
    "La stase ne soigne pas Hope. Elle ralentit son métabolisme et son hémorragie afin de gagner du temps."
  );

}


stasisTrigger?.addEventListener(
  "click",
  activateStasis
);


if (
  localStorage.getItem(
    STORAGE_STASIS
  ) === "1"
) {

  openReveal(
    stasisReveal
  );


  completeButton(
    stasisTrigger,
    "Stase active"
  );


  if (stasisTrigger) {

    stasisTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 10
   RAISONNEMENT DE HOPE / HALE
========================================================= */

const haleReasoningTrigger =
  document.getElementById(
    "haleReasoningTrigger"
  );

const haleReasoningReveal =
  document.getElementById(
    "haleReasoningReveal"
  );


function revealHaleReasoning() {

  localStorage.setItem(
    STORAGE_HALE_REASONING,
    "1"
  );


  openReveal(
    haleReasoningReveal
  );


  completeButton(
    haleReasoningTrigger,
    "Raisonnement compris"
  );


  haleReasoningTrigger.disabled =
    true;


  playClueSound();


  showSecret(
    "hale-strategy",
    "Hope n’a pas seulement sauvé Hale. Elle a choisi de préserver celui qui possède le plus d’informations pour continuer à protéger Anna et rechercher la faille."
  );

}


haleReasoningTrigger?.addEventListener(
  "click",
  revealHaleReasoning
);


if (
  localStorage.getItem(
    STORAGE_HALE_REASONING
  ) === "1"
) {

  openReveal(
    haleReasoningReveal
  );


  completeButton(
    haleReasoningTrigger,
    "Raisonnement compris"
  );


  if (haleReasoningTrigger) {

    haleReasoningTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 11
   CHAMBRE BLANCHE
========================================================= */

const whiteRoomReveal =
  document.getElementById(
    "whiteRoomReveal"
  );


let whiteRoomObserved =
  getStoredArray(
    STORAGE_WHITE_ROOM
  );


const whiteRoomTexts = {

  surgery:
    "La salle contient le matériel nécessaire à une chirurgie d’urgence complète.",

  robotics:
    "Des bras robotisés peuvent assister certains gestes précis ou maintenir du matériel sans vibration.",

  monitors:
    "Les moniteurs regroupent les constantes vitales et les données fournies par les dispositifs de Peter.",

  technology:
    "Une partie de la technologie installée ici ne correspond à aucun équipement médical conventionnel visible dans un hôpital classique."

};


document
  .querySelectorAll(
    ".white-room-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.whiteRoom;


        whiteRoomObserved =
          addStoredValue(
            STORAGE_WHITE_ROOM,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          whiteRoomReveal,
          `
            <p>
              ${whiteRoomTexts[type]}
            </p>
          `
        );


        playAnalysisSound();


        if (
          whiteRoomObserved.length >= 4
        ) {

          setRevealHTML(
            whiteRoomReveal,
            `
              <p>
                Chirurgie conventionnelle.
              </p>

              <p>
                Robotique.
              </p>

              <p>
                Surveillance médicale.
              </p>

              <p>
                Technologie expérimentale.
              </p>

              <p class="emphasis">
                La chambre blanche a été conçue
                pour pouvoir traiter une urgence
                loin de tout hôpital.
              </p>
            `
          );


          showSecret(
            "white-room",
            "L’hacienda Awake dispose d’une véritable salle d’intervention clandestine combinant médecine conventionnelle et technologies expérimentales."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".white-room-trigger"
  )
  .forEach((button) => {

    if (
      whiteRoomObserved.includes(
        button.dataset.whiteRoom
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 12A
   CHIRURGIE
========================================================= */

const surgeryReveal =
  document.getElementById(
    "surgeryReveal"
  );


const surgeryButtons =
  document.querySelectorAll(
    ".surgery-trigger"
  );


let surgeryProgress =
  parseInt(
    localStorage.getItem(
      STORAGE_SURGERY
    ) || "0",
    10
  );


const surgeryOrder =
  [
    "locate",
    "extract",
    "bleeding",
    "repair"
  ];


const surgeryTexts = {

  locate:
    "La balle est localisée dans le flanc gauche.",

  extract:
    "Charles extrait le projectile sans provoquer de nouvelle lésion majeure.",

  bleeding:
    "Le vaisseau lésé est identifié et l’hémorragie contrôlée.",

  repair:
    "Les tissus endommagés sont réparés autant que possible avant la phase de récupération."

};


function restoreSurgery() {

  surgeryButtons.forEach(
    (button, index) => {

      if (
        index <
        surgeryProgress
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
    surgeryProgress >= 4
  ) {

    setRevealHTML(
      surgeryReveal,
      `
        <p class="impact-text">
          INTERVENTION TERMINÉE
        </p>

        <p class="emphasis">
          Hope est stable.
        </p>
      `
    );

  }

}


surgeryButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selected =
          button.dataset.surgery;


        const expected =
          surgeryOrder[
            surgeryProgress
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


        surgeryProgress++;


        localStorage.setItem(
          STORAGE_SURGERY,
          surgeryProgress
        );


        button.classList.add(
          "completed"
        );


        button.disabled =
          true;


        setRevealHTML(
          surgeryReveal,
          `
            <p>
              ${surgeryTexts[selected]}
            </p>
          `
        );


        playMedicalSound();


        if (
          surgeryProgress >= 4
        ) {

          setRevealHTML(
            surgeryReveal,
            `
              <p class="impact-text">
                INTERVENTION TERMINÉE
              </p>

              <p class="emphasis">
                Balle extraite.
                Hémorragie contrôlée.
                Hope est stable.
              </p>
            `
          );


          showSecret(
            "hope-surgery",
            "La chirurgie stabilise Hope avant que les capsules ne prennent le relais sur la réparation biologique."
          );

        }

      }
    );

  }
);


restoreSurgery();


/* =========================================================
   INTERACTION 12B
   CAPSULES MÉDICALES
========================================================= */

const medicalCapsuleReveal =
  document.getElementById(
    "medicalCapsuleReveal"
  );


let medicalCapsulesObserved =
  getStoredArray(
    STORAGE_MEDICAL_CAPSULE
  );


const medicalCapsuleTexts = {

  vascular:
    "Cette capsule agit surtout sur la coagulation et la réparation de certains dommages vasculaires.",

  muscle:
    "Cette capsule soutient la réparation des lésions musculaires et la reconstruction tissulaire.",

  cellular:
    "Cette capsule semble orienter les ressources biologiques vers certaines cellules lésées en priorité, sans provoquer de prolifération incontrôlée observable."

};


document
  .querySelectorAll(
    ".medical-capsule-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset
            .medicalCapsule;


        medicalCapsulesObserved =
          addStoredValue(
            STORAGE_MEDICAL_CAPSULE,
            type
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          medicalCapsuleReveal,
          `
            <p>
              ${medicalCapsuleTexts[type]}
            </p>
          `
        );


        playMedicalSound();


        if (
          medicalCapsulesObserved.length >= 3
        ) {

          setRevealHTML(
            medicalCapsuleReveal,
            `
              <p>
                Réparation vasculaire.
              </p>

              <p>
                Reconstruction musculaire.
              </p>

              <p>
                Priorisation cellulaire.
              </p>

              <p class="emphasis">
                Potentiel médical majeur.
                Risques à étudier.
              </p>
            `
          );


          showSecret(
            "medical-capsules",
            "Les capsules ne constituent pas un traitement unique : plusieurs formulations semblent cibler des mécanismes biologiques différents."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".medical-capsule-trigger"
  )
  .forEach((button) => {

    if (
      medicalCapsulesObserved.includes(
        button.dataset
          .medicalCapsule
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION
   CICATRISATION DE HALE
========================================================= */

const healingTrigger =
  document.getElementById(
    "healingTrigger"
  );

const healingReveal =
  document.getElementById(
    "healingReveal"
  );


function revealHealing() {

  localStorage.setItem(
    STORAGE_HEALING,
    "1"
  );


  openReveal(
    healingReveal
  );


  completeButton(
    healingTrigger,
    "Comparaison effectuée"
  );


  healingTrigger.disabled =
    true;


  playMedicalSound();


  showSecret(
    "hale-healing",
    "En moins de deux heures, la blessure de Hale présente une évolution ressemblant à plusieurs jours de cicatrisation."
  );

}


healingTrigger?.addEventListener(
  "click",
  revealHealing
);


if (
  localStorage.getItem(
    STORAGE_HEALING
  ) === "1"
) {

  openReveal(
    healingReveal
  );


  completeButton(
    healingTrigger,
    "Comparaison effectuée"
  );


  if (healingTrigger) {

    healingTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION
   RÉCUPÉRATION DE HOPE
========================================================= */

const recoveryTrigger =
  document.getElementById(
    "recoveryTrigger"
  );

const recoveryReveal =
  document.getElementById(
    "recoveryReveal"
  );


function revealRecovery() {

  localStorage.setItem(
    STORAGE_RECOVERY,
    "1"
  );


  openReveal(
    recoveryReveal
  );


  completeButton(
    recoveryTrigger,
    "Récupération comparée"
  );


  recoveryTrigger.disabled =
    true;


  playAnalysisSound();


  showSecret(
    "hope-recovery",
    "Sept jours après son opération, la récupération de Hope est nettement plus rapide que celle attendue après une blessure comparable."
  );

}


recoveryTrigger?.addEventListener(
  "click",
  revealRecovery
);


if (
  localStorage.getItem(
    STORAGE_RECOVERY
  ) === "1"
) {

  openReveal(
    recoveryReveal
  );


  completeButton(
    recoveryTrigger,
    "Récupération comparée"
  );


  if (recoveryTrigger) {

    recoveryTrigger.disabled =
      true;

  }

}


/* =========================================================
   INTERACTION 13
   MORTS ADMINISTRATIFS
========================================================= */

const deadFilesReveal =
  document.getElementById(
    "deadFilesReveal"
  );


let deadFilesOpened =
  getStoredArray(
    STORAGE_DEAD_FILES
  );


const deadFileTexts = {

  sergio:
    `
      <p class="impact-text">
        SERGIO VELÁZQUEZ
      </p>

      <p>
        Ancien membre
        des forces spéciales mexicaines.
      </p>

      <p>
        Mort officiellement
        huit ans plus tôt
        dans un accident d’hélicoptère.
      </p>
    `,

  michael:
    `
      <p class="impact-text">
        MICHAEL REEVES
      </p>

      <p>
        Ancien policier américain
        spécialisé dans les interventions
        à haut risque.
      </p>

      <p>
        Mort officiellement
        dans l’incendie de son domicile
        six ans auparavant.
      </p>
    `,

  nicolas:
    `
      <p class="impact-text">
        NICOLAS VARGA
      </p>

      <p>
        Ancien champion européen
        de combat libre.
      </p>

      <p>
        Disparu lors
        d’une excursion en montagne,
        puis déclaré mort.
      </p>
    `,

  dimitri:
    `
      <p class="impact-text">
        DIMITRI ORLOV
      </p>

      <p>
        Ancien opérateur militaire russe.
      </p>

      <p>
        Tué officiellement
        pendant une opération
        dont une partie du dossier
        reste classifiée.
      </p>
    `,

  samuel:
    `
      <p class="impact-text">
        SAMUEL KNOX
      </p>

      <p>
        Ancien agent
        de renseignement privé britannique.
      </p>

      <p>
        Mort officiellement
        dans un accident de voiture.
      </p>
    `,

  mateo:
    `
      <p class="impact-text">
        MATEO CRUZ
      </p>

      <p>
        Voyou.
        Trafic d’armes.
        Cambriolages.
        Braquages.
      </p>

      <p>
        Puis indicateur de police.
      </p>

      <p>
        Officiellement assassiné
        par son propre réseau.
      </p>
    `

};


document
  .querySelectorAll(
    ".dead-file-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const id =
          button.dataset.deadFile;


        deadFilesOpened =
          addStoredValue(
            STORAGE_DEAD_FILES,
            id
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          deadFilesReveal,
          deadFileTexts[id]
        );


        playDataSound();


        if (
          deadFilesOpened.length >= 6
        ) {

          setRevealHTML(
            deadFilesReveal,
            `
              <p class="impact-text">
                PROFIL COMMUN
              </p>

              <p>
                Militaires.
              </p>

              <p>
                Policiers.
              </p>

              <p>
                Sportifs.
              </p>

              <p>
                Agents clandestins.
              </p>

              <p>
                Criminels.
              </p>

              <p class="emphasis">
                Le statut social ne compte pas.
                Les compétences,
                oui.
              </p>

              <p class="emphasis">
                Et tous savent disparaître.
              </p>
            `
          );


          showSecret(
            "guardian-recruitment",
            "Les Gardiens Noirs semblent recruter selon les capacités et la possibilité de faire disparaître officiellement leurs membres."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".dead-file-trigger"
  )
  .forEach((button) => {

    if (
      deadFilesOpened.includes(
        button.dataset.deadFile
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION
   VICTIMES CAMÉLÉON
========================================================= */

const victimReveal =
  document.getElementById(
    "victimReveal"
  );


let victimsOpened =
  getStoredArray(
    STORAGE_VICTIMS
  );


const victimTexts = {

  moreno:
    `
      <p class="impact-text">
        DR ELIAS MORENO
      </p>

      <p>
        Médecin chercheur espagnol.
      </p>

      <p>
        Il développait
        un protocole prometteur
        pour conserver plus longtemps
        les organes destinés à la greffe.
      </p>

      <p>
        Deux semaines après sa mort,
        son laboratoire a été racheté.
      </p>

      <p class="emphasis">
        Sa mort n’a pas supprimé
        ses recherches.
        Elle a changé
        celui qui les contrôlait.
      </p>
    `,

  laurent:
    `
      <p class="impact-text">
        CAMILLE LAURENT
      </p>

      <p>
        Ingénieure française
        spécialisée dans le stockage énergétique.
      </p>

      <p>
        Elle devait présenter
        une technologie capable
        d’améliorer la stabilité
        de certaines batteries industrielles.
      </p>

      <p>
        Après sa mort,
        son brevet est resté bloqué
        pendant deux ans.
      </p>

      <p class="emphasis">
        Deux années peuvent modifier
        énormément d’intérêts économiques.
      </p>
    `,

  okafor:
    `
      <p class="impact-text">
        DANIEL OKAFOR
      </p>

      <p>
        Avocat nigérian
        spécialisé dans la lutte
        contre la corruption.
      </p>

      <p>
        Il préparait une procédure
        contre plusieurs sociétés
        impliquées dans l’exploitation
        illégale de ressources minières.
      </p>

      <p>
        Il est mort
        quarante-huit heures
        avant le dépôt du dossier.
      </p>

      <p class="emphasis">
        Après sa mort,
        l’affaire s’est effondrée.
      </p>
    `

};


document
  .querySelectorAll(
    ".victim-trigger"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const id =
          button.dataset.victim;


        victimsOpened =
          addStoredValue(
            STORAGE_VICTIMS,
            id
          );


        button.classList.add(
          "completed"
        );


        setRevealHTML(
          victimReveal,
          victimTexts[id]
        );


        playDataSound();


        if (
          victimsOpened.length >= 3
        ) {

          setRevealHTML(
            victimReveal,
            `
              <p class="impact-text">
                POINT COMMUN
              </p>

              <p>
                Aucun n’était
                une personnalité mondiale.
              </p>

              <p>
                Mais tous étaient
                sur le point
                de provoquer quelque chose.
              </p>

              <p class="emphasis">
                Leur mort a supprimé
                des futurs possibles.
              </p>
            `
          );


          showSecret(
            "cameleon-futures",
            "Les victimes de la Caméléon pourraient avoir été choisies pour empêcher certains futurs plutôt que pour ce qu’elles avaient déjà accompli."
          );

        }

      }
    );

  });


document
  .querySelectorAll(
    ".victim-trigger"
  )
  .forEach((button) => {

    if (
      victimsOpened.includes(
        button.dataset.victim
      )
    ) {

      button.classList.add(
        "completed"
      );

    }

  });


/* =========================================================
   INTERACTION 14
   ANALYSE CONTREFACTUELLE
========================================================= */

const counterfactualTrigger =
  document.getElementById(
    "counterfactualTrigger"
  );

const counterfactualReveal =
  document.getElementById(
    "counterfactualReveal"
  );


let counterfactualRunning =
  false;


function runCounterfactual() {

  if (
    counterfactualRunning
  ) {
    return;
  }


  counterfactualRunning =
    true;


  localStorage.setItem(
    STORAGE_COUNTERFACTUAL,
    "1"
  );


  completeButton(
    counterfactualTrigger,
    "Analyse en cours"
  );


  counterfactualTrigger.disabled =
    true;


  playAnalysisSound();


  const steps = [

    "ANALYSE CONTREFACTUELLE EN COURS…",

    "Reconstruction des décisions possibles…",

    "Analyse des rencontres probables…",

    "Analyse des projets interrompus…",

    "Analyse des successeurs…",

    "Analyse des rachats…",

    "Analyse des contrats attribués…",

    "Analyse des décisions politiques…",

    "Croisement des conséquences…",

    "BÉNÉFICIAIRES"

  ];


  let index =
    0;


  function nextStep() {

    if (
      index >= steps.length
    ) {

      setRevealHTML(
        counterfactualReveal,
        `
          <p class="impact-text">
            CORRÉLATIONS DÉTECTÉES
          </p>

          <p class="name-reveal">
            7 STRUCTURES
          </p>

          <p class="emphasis">
            apparaissent dans plusieurs
            chaînes de conséquences.
          </p>
        `
      );


      if (counterfactualTrigger) {

        counterfactualTrigger.textContent =
          "Analyse terminée";

      }


      playRevealSound();


      showSecret(
        "seven-structures",
        "Sept structures apparaissent à plusieurs reprises parmi les bénéficiaires indirects des morts étudiées."
      );


      return;

    }


    const current =
      steps[index];


    let className =
      "";


    if (
      current ===
      "BÉNÉFICIAIRES"
    ) {

      className =
        ' class="impact-text"';

    }


    setRevealHTML(
      counterfactualReveal,
      `
        <p${className}>
          ${current}
        </p>
      `
    );


    playDataTick();


    index++;


    setTimeout(
      nextStep,
      520
    );

  }


  nextStep();

}


counterfactualTrigger?.addEventListener(
  "click",
  runCounterfactual
);


/* =========================================================
   RESTAURATION ANALYSE CONTREFACTUELLE
========================================================= */

if (
  localStorage.getItem(
    STORAGE_COUNTERFACTUAL
  ) === "1"
) {

  if (counterfactualTrigger) {

    counterfactualTrigger.classList.add(
      "completed"
    );


    counterfactualTrigger.textContent =
      "Analyse terminée";


    counterfactualTrigger.disabled =
      true;

  }


  setRevealHTML(
    counterfactualReveal,
    `
      <p class="impact-text">
        CORRÉLATIONS DÉTECTÉES
      </p>

      <p class="name-reveal">
        7 STRUCTURES
      </p>

      <p class="emphasis">
        apparaissent dans plusieurs
        chaînes de conséquences.
      </p>
    `
  );

}


/* =========================================================
   MÉMOIRE DU CHAPITRE 6
========================================================= */

const chapter6Finished =
  localStorage.getItem(
    "societeOmbre_chapitre6_termine"
  ) ||
  localStorage.getItem(
    "societeOmbre_chapitre6_finished"
  );


if (
  chapter6Finished === "1"
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
      "chapter6Memory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "chapter6Memory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "30px";


    memory.textContent =
      "Quelques jours plus tôt, la mystérieuse clé avait révélé le Phénix de Hope et confirmé qu’une partie des anciennes légendes contenait une réalité encore inexpliquée.";


    textBlock.appendChild(
      memory
    );

  }

}


/* =========================================================
   MÉMOIRE DU CHAPITRE 4
   MORTS ADMINISTRATIFS
========================================================= */

const chapter4DeadFiles =
  localStorage.getItem(
    "societeOmbre_chapitre4_deadFiles"
  );


if (
  chapter4DeadFiles === "1"
) {

  const scene49 =
    document.getElementById(
      "scene-49"
    );


  const textBlock =
    scene49?.querySelector(
      ".text-block"
    );


  if (
    textBlock &&
    !document.getElementById(
      "chapter4DeadFilesMemory"
    )
  ) {

    const memory =
      document.createElement(
        "p"
      );


    memory.id =
      "chapter4DeadFilesMemory";


    memory.className =
      "emphasis";


    memory.style.marginTop =
      "30px";


    memory.textContent =
      "Vous aviez déjà découvert que plusieurs Gardiens Noirs étaient officiellement morts. Lucy cherche maintenant à comprendre qui ils étaient avant de disparaître.";


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
    "scene-57"
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
        audioCtx.currentTime +
          0.35
      );

  }


  setTimeout(
    () => {

      try {

        ambienceOsc1?.stop();


        ambienceOsc2?.stop();


        audioCtx?.close();

      } catch (error) {

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


if (soundBtn) {

  soundBtn.addEventListener(
    "click",
    () => {

      if (soundActive) {

        stopSound();

      } else {

        startSound();

      }

    }
  );

}


/* =========================================================
   PETITS EFFETS SONORES
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


/* =========================================================
   SON INDICE
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


/* =========================================================
   SON ANALYSE
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
        0.016,
        "sine"
      );

    },
    120
  );

}


/* =========================================================
   SON DONNÉES
========================================================= */

function playDataSound() {

  playTone(
    360,
    0.35,
    0.018,
    "square"
  );


  setTimeout(
    () => {

      playTone(
        440,
        0.42,
        0.015,
        "triangle"
      );

    },
    110
  );

}


function playDataTick() {

  playTone(
    520,
    0.12,
    0.012,
    "square"
  );

}


/* =========================================================
   SON ALERTE
========================================================= */

function playAlertSound() {

  playTone(
    260,
    0.25,
    0.025,
    "square"
  );


  setTimeout(
    () => {

      playTone(
        190,
        0.35,
        0.022,
        "square"
      );

    },
    170
  );

}


/* =========================================================
   SON MOUVEMENT
========================================================= */

function playMovementSound() {

  playTone(
    390,
    0.4,
    0.016,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        650,
        0.55,
        0.014,
        "triangle"
      );

    },
    100
  );

}


/* =========================================================
   SON MÉDICAL
========================================================= */

function playMedicalSound() {

  playTone(
    470,
    0.4,
    0.017,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        590,
        0.55,
        0.014,
        "triangle"
      );

    },
    120
  );

}


/* =========================================================
   SON BOUCLIER
========================================================= */

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


/* =========================================================
   SON MARQUE / ÉMOTION
========================================================= */

function playMarkSound() {

  playTone(
    350,
    0.75,
    0.02
  );


  setTimeout(
    () => {

      playTone(
        470,
        0.9,
        0.018
      );

    },
    160
  );


  setTimeout(
    () => {

      playTone(
        610,
        1.0,
        0.015
      );

    },
    310
  );

}


/* =========================================================
   SON STASE
========================================================= */

function playStasisSound() {

  playTone(
    320,
    1.1,
    0.018,
    "sine"
  );


  setTimeout(
    () => {

      playTone(
        240,
        1.25,
        0.016,
        "triangle"
      );

    },
    180
  );


  setTimeout(
    () => {

      playTone(
        170,
        1.4,
        0.014,
        "sine"
      );

    },
    360
  );

}


/* =========================================================
   SON MAUVAISE ÉTAPE
========================================================= */

function playWrongSound() {

  playTone(
    150,
    0.22,
    0.02,
    "square"
  );

}


/* =========================================================
   SON RÉVÉLATION
========================================================= */

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


/* =========================================================
   SON SECRET
========================================================= */

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
   ESCAPE FERME LE MENU
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key ===
      "Escape"
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
