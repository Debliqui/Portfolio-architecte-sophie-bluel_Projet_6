import { genererWorks } from "../assets/js/works.js";
import { btnAffichage } from "../assets/js/filter.js";
import { verificationAcces } from "../assets/js/edit.js";

// redirect to login page
function affichageLoginPage(){
    const lienLoginPage = document.querySelector("#login");

    lienLoginPage.addEventListener( "click", () => {
        window.location.href = './pages/login.html';
    })
}

// Account logout function
function actionLogOut(){
    const btnLogOut = document.getElementById("logout");
    btnLogOut.addEventListener("click", () => {
        window.sessionStorage.removeItem("keys");
    })
}

btnAffichage();
genererWorks();
affichageLoginPage();
verificationAcces();
actionLogOut();