/* =========================
   LA SOCIÉTÉ DE L'OMBRE
   MÉMOIRE DE LECTURE
   ========================= */


function chapitrePrefix(
  chapterNumber
) {

  return (
    `societeOmbre_chapitre${chapterNumber}_`
  );

}


/* =========================
   MÉMORISER UNE SCÈNE
   ========================= */

function saveChapterProgress(
  chapterNumber,
  sceneId
) {

  localStorage.setItem(
    chapitrePrefix(chapterNumber)
      + "progression",

    sceneId
  );

}


/* =========================
   RETROUVER LA SCÈNE
   ========================= */

function getChapterProgress(
  chapterNumber
) {

  return localStorage.getItem(
    chapitrePrefix(chapterNumber)
      + "progression"
  );

}


/* =========================
   MÉMORISER UN CHOIX
   ========================= */

function saveChapterChoice(
  chapterNumber,
  choiceName,
  value
) {

  localStorage.setItem(

    chapitrePrefix(chapterNumber)
      + "choix_"
      + choiceName,

    value

  );

}


/* =========================
   RETROUVER UN CHOIX
   ========================= */

function getChapterChoice(
  chapterNumber,
  choiceName
) {

  return localStorage.getItem(

    chapitrePrefix(chapterNumber)
      + "choix_"
      + choiceName

  );

}


/* =========================
   MÉMORISER UN SECRET
   ========================= */

function saveChapterSecret(
  chapterNumber,
  secretName
) {

  localStorage.setItem(

    chapitrePrefix(chapterNumber)
      + "secret_"
      + secretName,

    "1"

  );

}


/* =========================
   CHAPITRE TERMINÉ
   ========================= */

function markChapterCompleted(
  chapterNumber
) {

  localStorage.setItem(

    chapitrePrefix(chapterNumber)
      + "termine",

    "1"

  );

}


/* =========================
   CHAPITRE DÉJÀ LU ?
   ========================= */

function isChapterCompleted(
  chapterNumber
) {

  return (
    localStorage.getItem(

      chapitrePrefix(chapterNumber)
        + "termine"

    ) === "1"
  );

}


/* =========================
   EFFACER TOUT LE CHAPITRE
   ========================= */

function resetChapterMemory(
  chapterNumber
) {

  const prefix =
    chapitrePrefix(
      chapterNumber
    );

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
