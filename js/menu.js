/* =========================
   LA SOCIÉTÉ DE L'OMBRE
   MENU DES CHAPITRES
   ========================= */


/* =========================
   LISTE DES CHAPITRES
   ========================= */

const chapters = [

  {
    number: 1,
    title: "Embrasse ton destin",
    file: "chapitre1.html"
  },

  {
    number: 2,
    title: "Chapitre 2",
    file: "chapitre2.html"
  },

  {
    number: 3,
    title: "Chapitre 3",
    file: "chapitre3.html"
  }

];


/*
  Plus tard, pour ajouter le chapitre 4 :

  {
    number: 4,
    title: "Nom du chapitre",
    file: "chapitre4.html"
  }

*/


/* =========================
   ÉLÉMENTS HTML
   ========================= */

const chaptersContainer =
  document.getElementById("chapters");

const chapterModal =
  document.getElementById("chapterModal");

const selectedChapterTitle =
  document.getElementById("selectedChapterTitle");

const resumeBtn =
  document.getElementById("resumeBtn");

const restartBtn =
  document.getElementById("restartBtn");

const cancelBtn =
  document.getElementById("cancelBtn");


let selectedChapter = null;


/* =========================
   AFFICHER LES CHAPITRES
   ========================= */

chapters.forEach((chapter) => {

  const button =
    document.createElement("button");

  button.className =
    "chapter-btn";

  const progression =
    localStorage.getItem(
      `societeOmbre_chapitre${chapter.number}_progression`
    );

  const termine =
    localStorage.getItem(
      `societeOmbre_chapitre${chapter.number}_termine`
    );


  let status =
    "Non commencé";


  if (progression) {

    status =
      "Lecture en cours";

  }


  if (termine === "1") {

    status =
      "Déjà lu";

  }


  button.innerHTML = `

    <span class="chapter-number">
      Chapitre ${chapter.number}
    </span>

    <span class="chapter-title">
      ${chapter.title}
    </span>

    <span class="chapter-status">
      ${status}
    </span>

  `;


  button.addEventListener(
    "click",
    () => {

      selectedChapter =
        chapter;

      selectedChapterTitle.textContent =
        `Chapitre ${chapter.number} — ${chapter.title}`;

      chapterModal.classList.remove(
        "hidden"
      );

    }
  );


  chaptersContainer.appendChild(
    button
  );

});


/* =========================
   REPRENDRE LE CHAPITRE
   ========================= */

resumeBtn.addEventListener(
  "click",
  () => {

    if (!selectedChapter) {
      return;
    }

    window.location.href =
      `${selectedChapter.file}?lecture=reprendre`;

  }
);


/* =========================
   RECOMMENCER LE CHAPITRE
   ========================= */

restartBtn.addEventListener(
  "click",
  () => {

    if (!selectedChapter) {
      return;
    }

    resetChapter(
      selectedChapter.number
    );

    window.location.href =
      `${selectedChapter.file}?lecture=recommencer`;

  }
);


/* =========================
   ANNULER
   ========================= */

cancelBtn.addEventListener(
  "click",
  () => {

    chapterModal.classList.add(
      "hidden"
    );

    selectedChapter = null;

  }
);


/* =========================
   FERMER EN CLIQUANT AUTOUR
   ========================= */

chapterModal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === chapterModal ||
      event.target.classList.contains(
        "modal-background"
      )
    ) {

      chapterModal.classList.add(
        "hidden"
      );

      selectedChapter = null;

    }

  }
);


/* =========================
   EFFACER UN CHAPITRE
   ========================= */

function resetChapter(
  chapterNumber
) {

  const prefix =
    `societeOmbre_chapitre${chapterNumber}_`;

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

}
