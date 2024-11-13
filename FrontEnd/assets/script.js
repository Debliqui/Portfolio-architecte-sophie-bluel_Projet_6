import { generateWorks } from "./js/works.js";
import { btnAffichage } from "./js/filter.js";
import { checkingAcces } from "./js/edit.js";
import { generateMainModal } from "./js/modal.js";
import { deleteWorks } from "./js/delete.js";
import { affichageModalAddPicture } from "./js/modal-add-picture.js";

// Function to connect or disconnect
function managementAccount() {
  const btnGestionCompte = document.querySelector(".gestionCompte");
  btnGestionCompte.addEventListener("click", () => {
    if (btnGestionCompte.id === "login") {
      window.location.href = "./pages/login.html";
    } else if (btnGestionCompte.id === "logout") {
      window.sessionStorage.removeItem("keys");
      window.location.href = "index.html";
    }
  });
}

btnAffichage();
generateWorks();
checkingAcces();
managementAccount("login");
managementAccount("logout");
generateMainModal();
deleteWorks();
affichageModalAddPicture();
