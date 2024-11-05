import { genererWorks } from "../assets/js/works.js";
import { btnAffichage } from "../assets/js/filter.js";
import { verificationAcces } from "../assets/js/edit.js";
import { affichageModal } from "../assets/js/modal.js";
import { deleteWorks } from "../assets/js/delete.js";

// Function to connect or disconnect
function AccountManagement(){
    const btnGestionCompte = document.querySelector(".gestionCompte");
    btnGestionCompte.addEventListener("click", () => {
        if (btnGestionCompte.id === "login") {
            window.location.href = './pages/login.html';
        }
        else if (btnGestionCompte.id === "logout") {
            window.sessionStorage.removeItem("keys");
            window.location.href = 'index.html';
        }
    })
}

btnAffichage();
genererWorks();
verificationAcces();
AccountManagement("login");
AccountManagement("logout");
affichageModal();
deleteWorks();