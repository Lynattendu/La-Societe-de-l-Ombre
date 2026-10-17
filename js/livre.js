
/* =========================================================
   LA SOCIÉTÉ DE L’OMBRE
   PAGE D’ENTRÉE DU LIVRE
   livre.js
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


/* =========================================================
   ÉLÉMENTS
========================================================= */

const resumeBookBtn =
  document.getElementById(
    "resumeBookBtn"
  );

const startBookBtn =
  document.getElementById(
    "startBookBtn"
  );

const restartBookBtn =
  document.getElementById(
    "restartBookBtn"
  );

const resumeInfo =
  document.getElementById(
    "resumeInfo"
  );

const resumeChapterTitle =
  document.getElementById(
    "resumeChapterTitle"
  );

const restartModal =
  document.getElementById(
    "restartModal"
  );

const cancelRestartBtn =
  document.getElementById(
    "cancelRestartBtn"
  );

const confirmRestartBtn =
  document.getElementById(
    "confirmRestartBtn"
  );


/* =========================================================
   CLÉS DE MÉMOIRE
========================================================= */

const STORAGE_LAST_PAGE =
  "societeOmbre_dernierePage";

const STORAGE_LAST_TITLE =
  "societeOmbre_dernierTitre";


/* =========================================================
   RÉCUPÉRER LA DERNIÈRE LECTURE
========================================================= */

const lastPage =
  localStorage.getItem(
    STORAGE_LAST_PAGE
  );

const lastTitle =
  localStorage.getItem(
    STORAGE_LAST_TITLE
  );


/* =========================================================
   AFFICHER OU CACHER
   LE BOUTON REPRENDRE
========================================================= */

if (lastPage) {

  if (resumeBookBtn) {

    resumeBookBtn.classList.remove(
      "hidden"
    );

  }


  if (resumeInfo) {

    resumeInfo.classList.remove(
      "hidden"
    );

  }


  if (resumeChapterTitle) {

    if (lastTitle) {

      resumeChapterTitle.textContent =
        lastTitle;

    } else {

      resumeChapterTitle.textContent =
        "Lecture en cours";

    }

  }

} else {

  if (resumeBookBtn) {

    resumeBookBtn.classList.add(
      "hidden"
    );

  }


  if (resumeInfo) {

    resumeInfo.classList.add(
      "hidden"
    );

  }

}


/* =========================================================
   REPRENDRE MA LECTURE
========================================================= */

if (resumeBookBtn) {

  resumeBookBtn.addEventListener(
    "click",
    () => {

      const savedPage =
        localStorage.getItem(
          STORAGE_LAST_PAGE
        );


      if (!savedPage) {

        /*
          Sécurité :
          si aucune progression n'est trouvée,
          on commence normalement le livre.
        */

        window.location.href =
  "index.html?commencer=1";

        return;

      }


      /*
        Les chapitres savent déjà interpréter :
        ?lecture=reprendre
      */

      const separator =
        savedPage.includes("?")
          ? "&"
          : "?";


      window.location.href =
        savedPage +
        separator +
        "lecture=reprendre";

    }
  );

}


/* =========================================================
   COMMENCER LE LIVRE
========================================================= */

if (startBookBtn) {

  startBookBtn.addEventListener(
    "click",
    () => {

      /*
        On ne supprime aucune progression.

        Cela permet de commencer depuis
        l'introduction sans détruire
        une ancienne sauvegarde.
      */

     window.location.href =
  "index.html?commencer=1";

    }
  );

}


/* =========================================================
   OUVRIR LA CONFIRMATION
   RECOMMENCER LE LIVRE
========================================================= */

function openRestartModal() {

  if (!restartModal) {
    return;
  }


  restartModal.classList.add(
    "open"
  );


  restartModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeRestartModal() {

  if (!restartModal) {
    return;
  }


  restartModal.classList.remove(
    "open"
  );


  restartModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* =========================================================
   BOUTON RECOMMENCER
========================================================= */

if (restartBookBtn) {

  restartBookBtn.addEventListener(
    "click",
    openRestartModal
  );

}


/* =========================================================
   ANNULER
========================================================= */

if (cancelRestartBtn) {

  cancelRestartBtn.addEventListener(
    "click",
    closeRestartModal
  );

}


/* =========================================================
   CLIC EN DEHORS DE LA FENÊTRE
========================================================= */

if (restartModal) {

  restartModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        restartModal
      ) {

        closeRestartModal();

      }

    }
  );

}


/* =========================================================
   CONFIRMER LE RECOMMENCEMENT
========================================================= */

if (confirmRestartBtn) {

  confirmRestartBtn.addEventListener(
    "click",
    () => {

      /*
        On récupère d'abord les clés
        pour éviter de modifier localStorage
        pendant qu'on le parcourt.
      */

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
            "societeOmbre_"
          )
        ) {

          keysToDelete.push(
            key
          );

        }

      }


      /*
        Effacement de toute la progression :
        chapitres, choix, secrets,
        dernière page, etc.
      */

      keysToDelete.forEach(
        (key) => {

          localStorage.removeItem(
            key
          );

        }
      );


      /*
        Retour au tout début du livre.
      */

      window.location.href =
        "index.html";

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

      closeRestartModal();

    }

  }
);


/* =========================================================
   FIN INITIALISATION
========================================================= */

});
