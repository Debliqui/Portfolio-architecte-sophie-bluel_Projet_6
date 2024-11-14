/**
 * Management of modal opening and closing
 */
export function generateMainModal() {
  const dialog = document.querySelector("dialog");
  const showBtn = document.querySelector("#editBtn");
  const closeBtn = document.querySelector("#closeBtn");

  // Opening the modal at the click of #btnEdit
  if (showBtn) {
    showBtn.addEventListener("click", () => {
      dialog.showModal();
      document.body.classList.add("no-scroll");
    });
  }

  // Listen to event to close by clicking on the X
  closeBtn.addEventListener("click", () => {
    dialog.close();
    document.body.classList.remove("no-scroll");
  });

  // Listen to the event to close by clicking anywhere or on the page
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
      document.body.classList.remove("no-scroll");
    }
  });
}

/**
 * Inserting gallery elements using the genererWorks() function
 * @param {Object} figure
 */
export function generateModalFigure(figure) {
  const figureGalleryModal = document.createElement("figure");
  figureGalleryModal.dataset.pictureId = figure.id;

  const imgGalleryModal = document.createElement("img");
  imgGalleryModal.src = figure.imageUrl;
  imgGalleryModal.setAttribute("alt", figure.title);

  const backgroundTrashCan = document.createElement("button");
  backgroundTrashCan.classList.add("deleteBtn");
  backgroundTrashCan.dataset.pictureId = figure.id;

  const trashCan = document.createElement("img");
  trashCan.setAttribute("src", "./assets/icons/trash-can-solid.svg");
  trashCan.setAttribute("alt", "icon d'une poubel dessiner en contour blanc");

  figureGalleryModal.appendChild(imgGalleryModal);
  figureGalleryModal.appendChild(backgroundTrashCan);
  backgroundTrashCan.appendChild(trashCan);

  return figureGalleryModal;
}
