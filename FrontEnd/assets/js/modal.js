/**
 * Management of modal opening and closing
 */
export function affichageModal() {
  const dialog = document.querySelector("dialog");
  const showBtn = document.querySelector("#btnEdit");
  const closeBtn = document.querySelector("#closeBtn");

  // Opening the modal at the click of #btnEdit
  if (showBtn) {
    showBtn.addEventListener("click", () => {
      dialog.showModal();
      openCheck(dialog);
      document.body.classList.add("no-scroll");
    });
  }

  // Listen to event to close by clicking on the X
  closeBtn.addEventListener("click", () => {
    dialog.close();
    openCheck(dialog);
    document.body.classList.remove("no-scroll");
  });

  // Listen to the event to close by clicking anywhere or on the page
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
      openCheck(dialog);
      document.body.classList.remove("no-scroll");
    }
  });
}

/** Function to check if the modal is open */
function openCheck(dialog) {
  if (dialog.open) {
    console.log("Dialog open");
  } else {
    console.log("Dialog closed");
  }
}

/**
 * Inserting gallery elements using the genererWorks() function
 * @param {Object} figure
 */
export async function affichageGallery(figure) {
  const galleryModal = document.querySelector(".galleryModal");

  const figureElement = document.createElement("figure");
  figureElement.dataset.pictureId = figure.id;

  const imgElement = document.createElement("img");
  imgElement.src = figure.imageUrl;
  imgElement.setAttribute("alt", figure.title);

  const backgroundDelete = document.createElement("button");
  backgroundDelete.classList.add("btnDelete");
  backgroundDelete.dataset.pictureId = figure.id;

  const trashCan = document.createElement("img");
  trashCan.setAttribute("src", "./assets/icons/trash-can-solid.svg");
  trashCan.setAttribute("alt", "icon d'une poubel dessiner en contour blanc");

  galleryModal.appendChild(figureElement);
  figureElement.appendChild(imgElement);
  figureElement.appendChild(backgroundDelete);
  backgroundDelete.appendChild(trashCan);
}
