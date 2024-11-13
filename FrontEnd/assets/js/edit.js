/**
 * Function that checks whether the value in the storage session has a keys key. 
 */
export function checkingAcces(){
    const btnLogIn = document.getElementById("login");
    if (window.sessionStorage.getItem("keys")){
        // change login to logout to indicate connection
        btnLogIn.innerText = "logout";
        // Changing the id to handle the actionLogOut() function in script.js
        btnLogIn.setAttribute("id", "logout")
        generateEditBanner();
        generateEditBtn();
        // Remove filter display in Edit Mode
        // document.querySelector(".filter").style.display = "none";
    }
    
}
// Creation of black banner to edit home page
function generateEditBanner(){
    const banner = `
        <header class="bannerEdit">
            <div id="banner">
                <img src="./assets/icons/pen-to-square.svg" alt="icon d'un stylo pointant dans un carré a contour blanc">
                <p>Mode édition</p>
            </div>
        </header>
    `
    // Integration of banner in first body position
    document.querySelector("body").insertAdjacentHTML("afterbegin", banner);
}


// Create edit button
function generateEditBtn(){
    const edit = `
        <button id="btnEdit">
            <img src="./assets/icons/pen-to-square-black.svg" alt="icon d'un stylo pointant dans un carré a contour noir">
            <p>modifier</p>
        </button>
    `
    // Integration of edit after h2
    document.querySelector("#portfolio h2").insertAdjacentHTML('afterend', edit);
}
