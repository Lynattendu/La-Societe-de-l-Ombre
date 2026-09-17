// Animation d'introduction
const PAGE_SUIVANTE = "chapitre1.html";

const INTRO_DEJA_VUE = "societeOmbre_intro_vue";

/*
  false = l'intro se joue à chaque visite
  true  = après la première visite, elle va directement au chapitre 1
*/
const SAUTER_APRES_PREMIERE_VISITE = false;

const enterBtn = document.getElementById("enterBtn");
const skipBtn = document.getElementById("skipBtn");
const soundBtn = document.getElementById("soundBtn");
const flash = document.getElementById("flash");
const particles = document.getElementById("particles");

/* =========================
   PARTICULES LUMINEUSES
   ========================= */

for (let i = 0; i < 28; i++) {

  const p = document.createElement("span");

  p.className = "particle";

  p.style.left =
    Math.random() * 100 + "%";

  p.style.bottom =
    (-10 - Math.random() * 20) + "vh";

  p.style.animationDelay =
    Math.random() * 8 + "s";

  p.style.animationDuration =
    (6 + Math.random() * 7) + "s";

  p.style.opacity =
    (0.25 + Math.random() * 0.65).toFixed(2);

  p.style.transform =
    `scale(${0.5 + Math.random() * 1.2})`;

  particles.appendChild(p);
}

/* =========================
   AMBIANCE SONORE
   ========================= */

let audioCtx = null;
let masterGain = null;
let isSoundOn = false;

function startAmbience() {

  if (isSoundOn) {
    return;
  }

  audioCtx =
    new (
      window.AudioContext ||
      window.webkitAudioContext
    )();

  masterGain =
    audioCtx.createGain();

  masterGain.gain.value =
    0.035;

  masterGain.connect(
    audioCtx.destination
  );

  const osc1 =
    audioCtx.createOscillator();

  const osc2 =
    audioCtx.createOscillator();

  const gain1 =
    audioCtx.createGain();

  const gain2 =
    audioCtx.createGain();

  osc1.type =
    "sine";

  osc1.frequency.value =
    48;

  gain1.gain.value =
    0.55;

  osc2.type =
    "triangle";

  osc2.frequency.value =
    96;

  gain2.gain.value =
    0.08;

  osc1
    .connect(gain1)
    .connect(masterGain);

  osc2
    .connect(gain2)
    .connect(masterGain);

  osc1.start();

  osc2.start();

  isSoundOn = true;

  soundBtn.textContent =
    "Son : activé";
}

function stopAmbience() {

  if (
    !isSoundOn ||
    !audioCtx
  ) {
    return;
  }

  masterGain.gain
    .exponentialRampToValueAtTime(
      0.0001,
      audioCtx.currentTime + 0.35
    );

  setTimeout(
    () => {

      audioCtx.close();

      audioCtx = null;

      masterGain = null;

    },
    450
  );

  isSoundOn = false;

  soundBtn.textContent =
    "Son : désactivé";
}

soundBtn.addEventListener(
  "click",
  () => {

    if (isSoundOn) {

      stopAmbience();

    } else {

      startAmbience();

    }

  }
);

/* =========================
   PASSAGE AU CHAPITRE 1
   ========================= */

function goNext() {

  localStorage.setItem(
    INTRO_DEJA_VUE,
    "1"
  );

  flash.classList.add(
    "go"
  );

  if (
    isSoundOn &&
    audioCtx &&
    masterGain
  ) {

    masterGain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + 0.8
      );

  }

  setTimeout(
    () => {

      window.location.href =
        PAGE_SUIVANTE;

    },
    850
  );

}

/* Bouton Entrer dans l'ombre */
enterBtn.addEventListener(
  "click",
  goNext
);

/* Bouton Passer l'introduction */
skipBtn.addEventListener(
  "click",
  () => {

    localStorage.setItem(
      INTRO_DEJA_VUE,
      "1"
    );

    window.location.href =
      PAGE_SUIVANTE;

  }
);

/* =========================
   PREMIÈRE VISITE UNIQUEMENT
   ========================= */

if (
  SAUTER_APRES_PREMIERE_VISITE &&
  localStorage.getItem(
    INTRO_DEJA_VUE
  ) === "1"
) {

  window.location.replace(
    PAGE_SUIVANTE
  );

}
