import { generateWorks } from "./js/works.js";
import { btnAffichage } from "./js/filter.js";
import { checkingAcces } from "./js/edit.js";
import { generateMainModal } from "./js/modal.js";
import { deleteWorks } from "./js/delete.js";
import { generateAddPictureModal } from "./js/modal-add-picture.js";

// Function to connect or disconnect
function manageAccount() {
  const manageAccountBtn = document.querySelector(".manageAccount");
  manageAccountBtn.addEventListener("click", () => {
    if (manageAccountBtn.id === "login") {
      window.location.href = "./pages/login.html";
    } else if (manageAccountBtn.id === "logout") {
      window.sessionStorage.removeItem("keys");
      window.location.href = "index.html";
    }
  });
}

btnAffichage();
generateWorks();
checkingAcces();
manageAccount("login");
manageAccount("logout");
generateMainModal();
deleteWorks();
generateAddPictureModal();
