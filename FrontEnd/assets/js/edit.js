/**
 * Function that checks whether the value in the storage session has a keys key. 
 */
export function verificationAcces(){
    const btnLogIn = document.getElementById("login");
    if (window.sessionStorage.getItem("keys")){
        // change login to logout to indicate connection
        btnLogIn.innerText = "logout";
        // Changing the id to handle the actionLogOut() function in script.js
        btnLogIn.setAttribute("id", "logout")
        bannerEdit();
        btnEdit();
        // Remove filter display in Edit Mode
        document.querySelector(".filter").style.display = "none";
    }
    else{
        console.log("Vous avez été déconnecté ! Veuillez vous reconnecter.");
    }
    
}
// Creation of black banner to edit home page
function bannerEdit(){
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
function btnEdit(){
    const edit = `
        <div id="btnEdit">
            <img src="./assets/icons/pen-to-square-black.svg" alt="icon d'un stylo pointant dans un carré a contour noir">
            <p>modifier</p>
        </div>
    `
    // Integration of edit after h2
    document.querySelector("#portfolio h2").insertAdjacentHTML('afterend', edit);
}
