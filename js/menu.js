/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   MENU DES CHAPITRES
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


/* =========================================================
   LISTE DES CHAPITRES
========================================================= */

const chapters = [

  {
    number: 1,
    title: "Embrasse ton destin",
    file: "chapitre1.html"
  },

  {
    number: 2,
    title: "L’union fait la force",
    file: "chapitre2.html"
  },

  {
    number: 3,
    title: "La Confiance",
    file: "chapitre3.html"
  },

  {
    number: 4,
    title: "Mais qui est-elle ?",
    file: "chapitre4.html"
  },

  {
    number: 5,
    title: "Chapitre 5",
    file: "chapitre5.html"
  },

  {
    number: 6,
    title: "Chapitre 6",
    file: "chapitre6.html"
  },

  {
    number: 7,
    title: "Chapitre 7",
    file: "chapitre7.html"
  },

  {
    number: 8,
    title: "Chapitre 8",
    file: "chapitre8.html"
  },

  {
    number: 9,
    title: "Chapitre 9",
    file: "chapitre9.html"
  },

  {
    number: 10,
    title: "Chapitre 10",
    file: "chapitre10.html"
  },

  {
    number: 11,
    title: "Chapitre 11",
    file: "chapitre11.html"
  },

  {
    number: 12,
    title: "Chapitre 12",
    file: "chapitre12.html"
  },

  {
    number: 13,
    title: "Chapitre 13",
    file: "chapitre13.html"
  },

  {
    number: 14,
    title: "Les secrets ne meurent jamais",
    file: "chapitre14.html"
  },

  {
    number: 15,
    title: "Chapitre 15",
    file: "chapitre15.html"
  },

  {
    number: 16,
    title: "Chapitre 16",
    file: "chapitre16.html"
  },

  {
    number: 17,
    title: "Chapitre 17",
    file: "chapitre17.html"
  },

  {
    number: 18,
    title: "Chapitre 18",
    file: "chapitre18.html"
  },

  {
    number: 19,
    title: "Chapitre 19",
    file: "chapitre19.html"
  },

  {
    number: 20,
    title: "Chapitre 20",
    file: "chapitre20.html"
  },

  {
    number: 21,
    title: "Chapitre 21",
    file: "chapitre21.html"
  },

  {
    number: 22,
    title: "Chapitre 22",
    file: "chapitre22.html"
  },

  {
    number: 23,
    title: "Chapitre 23",
    file: "chapitre23.html"
  },

  {
    number: 24,
    title: "Chapitre 24",
    file: "chapitre24.html"
  },

  {
    number: 25,
    title: "Chapitre 25",
    file: "chapitre25.html"
  },

  {
    number: 26,
    title: "Chapitre 26",
    file: "chapitre26.html"
  },

  {
    number: 27,
    title: "Chapitre 27",
    file: "chapitre27.html"
  },

  {
    number: 28,
    title: "Chapitre 28",
    file: "chapitre28.html"
  },

  {
    number: 29,
    title: "Chapitre 29",
    file: "chapitre29.html"
  },

  {
    number: 30,
    title: "Chapitre 30",
    file: "chapitre30.html"
  },

  {
    number: 31,
    title: "Chapitre 31",
    file: "chapitre31.html"
  },

  {
    number: 32,
    title: "Chapitre 32",
    file: "chapitre32.html"
  },

  {
    number: 33,
    title: "Chapitre 33",
    file: "chapitre33.html"
  }

];


/* =========================================================
   ÉLÉMENTS HTML
========================================================= */

const chaptersContainer =
  document.getElementById(
    "chapters"
  );

const chapterModal =
  document.getElementById(
    "chapterModal"
  );

const selectedChapterTitle =
  document.getElementById(
    "selectedChapterTitle"
  );

const resumeBtn =
  document.getElementById(
    "resumeBtn"
  );

const restartBtn =
  document.getElementById(
    "restartBtn"
  );

const cancelBtn =
  document.getElementById(
    "cancelBtn"
  );

const modalBackground =
  document.getElementById(
    "modalBackground"
  );


let selectedChapter =
  null;


/* =========================================================
   ÉTAT D'UN CHAPITRE
========================================================= */

function getChapterStatus(
  chapter
) {

  const progression =
    localStorage.getItem(
      `societeOmbre_chapitre${chapter.number}_progression`
    );


  const termine =
    localStorage.getItem(
      `societeOmbre_chapitre${chapter.number}_termine`
    );


  if (
    termine === "1"
  ) {

    return {
      text: "Déjà lu",
      started: true,
      completed: true
    };

  }


  if (progression) {

    return {
      text: "Lecture en cours",
      started: true,
      completed: false
    };

  }


  return {
    text: "Non commencé",
    started: false,
    completed: false
  };

}


/* =========================================================
   OUVRIR LA FENÊTRE D'UN CHAPITRE
========================================================= */

function openChapterModal(
  chapter
) {

  selectedChapter =
    chapter;


  const status =
    getChapterStatus(
      chapter
    );


  if (selectedChapterTitle) {

    selectedChapterTitle.textContent =
      `Chapitre ${chapter.number} — ${chapter.title}`;

  }


  /*
    Si le chapitre n'a jamais été lu,
    le bouton devient "Commencer".
  */

  if (resumeBtn) {

    if (
      status.started
    ) {

      resumeBtn.textContent =
        "Reprendre la lecture";

    } else {

      resumeBtn.textContent =
        "Commencer le chapitre";

    }

  }


  if (chapterModal) {

    chapterModal.classList.remove(
      "hidden"
    );


    chapterModal.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   FERMER LA FENÊTRE
========================================================= */

function closeChapterModal() {

  if (chapterModal) {

    chapterModal.classList.add(
      "hidden"
    );


    chapterModal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  document.body.style.overflow =
    "";


  selectedChapter =
    null;

}


/* =========================================================
   CRÉER LA LISTE DES CHAPITRES
========================================================= */

function renderChapters() {

  if (!chaptersContainer) {
    return;
  }


  /*
    Important si la fonction devait
    être rappelée plus tard.
  */

  chaptersContainer.innerHTML =
    "";


  chapters.forEach(
    (chapter) => {

      const status =
        getChapterStatus(
          chapter
        );


      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "chapter-btn";


      /*
        Classes supplémentaires utiles
        pour le CSS si on veut ensuite
        différencier les états.
      */

      if (
        status.completed
      ) {

        button.classList.add(
          "chapter-completed"
        );

      } else if (
        status.started
      ) {

        button.classList.add(
          "chapter-current"
        );

      } else {

        button.classList.add(
          "chapter-not-started"
        );

      }


      button.innerHTML =
        `

          <span class="chapter-number">
            Chapitre ${chapter.number}
          </span>

          <span class="chapter-title">
            ${chapter.title}
          </span>

          <span class="chapter-status">
            ${status.text}
          </span>

        `;


      button.addEventListener(
        "click",
        () => {

          openChapterModal(
            chapter
          );

        }
      );


      chaptersContainer.appendChild(
        button
      );

    }
  );

}


/* =========================================================
   REPRENDRE / COMMENCER
========================================================= */

if (resumeBtn) {

  resumeBtn.addEventListener(
    "click",
    () => {

      if (!selectedChapter) {
        return;
      }


      const status =
        getChapterStatus(
          selectedChapter
        );


      /*
        Si le chapitre a déjà été commencé,
        on demande au JS du chapitre
        de reprendre la position enregistrée.
      */

      if (
        status.started
      ) {

        window.location.href =
          `${selectedChapter.file}?lecture=reprendre`;

        return;

      }


      /*
        Si le chapitre n'a jamais été lu,
        on l'ouvre simplement au début.
      */

      window.location.href =
        selectedChapter.file;

    }
  );

}


/* =========================================================
   RECOMMENCER LE CHAPITRE
========================================================= */

if (restartBtn) {

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

}


/* =========================================================
   ANNULER
========================================================= */

if (cancelBtn) {

  cancelBtn.addEventListener(
    "click",
    closeChapterModal
  );

}


/* =========================================================
   CLIC SUR LE FOND
========================================================= */

if (chapterModal) {

  chapterModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
          chapterModal ||
        event.target ===
          modalBackground ||
        event.target.classList.contains(
          "modal-background"
        )
      ) {

        closeChapterModal();

      }

    }
  );

}


/* =========================================================
   TOUCHE ÉCHAP
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key ===
      "Escape"
    ) {

      closeChapterModal();

    }

  }
);


/* =========================================================
   EFFACER LA MÉMOIRE D'UN SEUL CHAPITRE
========================================================= */

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

}


/* =========================================================
   AFFICHAGE INITIAL
========================================================= */

renderChapters();


/* =========================================================
   FIN INITIALISATION
========================================================= */

});
