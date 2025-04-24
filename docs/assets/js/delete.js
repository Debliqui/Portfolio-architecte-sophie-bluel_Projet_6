/**
 * Deleting a figure by clicking .deleteBtn;
 * The function is integrated into the genererWorks function
 */
export function deleteWorks() {
  const deleteBtn = document.querySelectorAll(".deleteBtn")
  // Listen for clicks on all buttons
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", async function (event) {
      const id = event.currentTarget.dataset.pictureId
      // Recover token from sessionStorage
      const token = sessionStorage.getItem("keys")
      // Removal of quotation marks from keys value
      fetch(
        "https://portfolio-architecte-sophie-bluel-projet.onrender.com/api/works/" +
          id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur Serveur")
          }
          deleteFigure(id)
        })
        .catch((error) => {
          console.error("Il y a eu un problème avec la requête fetch:", error)
        })
    })
  }
}
/**
 * Update list after deletion
 * @param {String} id
 */
function deleteFigure(id) {
  // Recovering modal and gallery figures
  const figuresToDelete = document.querySelectorAll(
    `figure[data-picture-id="${id}"]`
  )
  figuresToDelete.forEach((figure) => {
    figure.remove()
  })
}
