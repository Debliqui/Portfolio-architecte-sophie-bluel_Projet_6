import { genererWorks } from "../assets/js/works.js";
import { btnAffichage } from "../assets/js/filter.js";

btnAffichage();
genererWorks();
affichageLoginPage();

// redirect to login page
function affichageLoginPage(){
    const lienLoginPage = document.querySelector("#login");

    lienLoginPage.addEventListener( "click", () => {
        window.location.href = './pages/login.html';
    })
}