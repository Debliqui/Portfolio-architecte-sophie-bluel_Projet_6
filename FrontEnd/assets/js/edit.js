/**
 * Function that checks whether the value in the storage session has a keys key. 
 */
export function checkingAcces(){
    const logInBtn = document.getElementById("login");
    if (window.sessionStorage.getItem("keys")){
        // change login to logout to indicate connection
        logInBtn.innerText = "logout";
        // Changing the id to handle the actionLogOut() function in script.js
        logInBtn.setAttribute("id", "logout")
        generateEditBanner();
        generateEditBtn();
        // Remove filter display in Edit Mode
        // document.querySelector(".filter").style.display = "none";
    }
    
}
// Creation of black banner to edit home page
function generateEditBanner(){
    const editBanner = `
        <header class="editBanner">
            <div id="banner">
                <img src="./assets/icons/pen-to-square.svg" alt="icon d'un stylo pointant dans un carré a contour blanc">
                <p>Mode édition</p>
            </div>
        </header>
    `
    // Integration of banner in first body position
    document.querySelector("body").insertAdjacentHTML("afterbegin", editBanner);
}


// Create edit button
function generateEditBtn(){
    const editBtn = `
        <button id="editBtn">
            <img src="./assets/icons/pen-to-square-black.svg" alt="icon d'un stylo pointant dans un carré a contour noir">
            <p>modifier</p>
        </button>
    `
    // Integration of edit after h2
    document.querySelector("#portfolio h2").insertAdjacentHTML('afterend', editBtn);
}
