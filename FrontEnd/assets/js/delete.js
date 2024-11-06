/**
 * Deleting a figure by clicking .btnDelete;
 * The function is integrated into the genererWorks function
 */
export function deleteWorks() {
  const btnDelete = document.querySelectorAll(".btnDelete");
  // Listen for clicks on all buttons
  for (let i = 0; i < btnDelete.length; i++) {
    btnDelete[i].addEventListener("click", async function (event) {
      const id = event.currentTarget.dataset.pictureId;
      // Recover token from sessionStorage
      const token = sessionStorage.getItem("keys");
      // Removal of quotation marks from keys value
      const tokenWithoutQuotes = token.replace(/"/g, '');
      fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${tokenWithoutQuotes}`
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur Serveur");
          }
          console.log("L'élément as bien été supprimer!");
        })
        .catch((error) => {
          console.error("Il y a eu un problème avec la requête fetch:", error);
        });
    });
  }
}
