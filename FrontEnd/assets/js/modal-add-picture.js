/**
 * Display the second modality dynamically
 */
export function affichageModalAddPicture(){
    const btnAddPicture = document.querySelector("#addPicture");
    const backBtn = document.querySelector("#backBtn");
    const galleryModal = document.querySelector(".galleryModal");
    const newForm = document.createElement('form');

    // Listening to the click of the AddPicture button
    addNewForm(btnAddPicture, backBtn, galleryModal, newForm);

    // Listening to the click of the back button
    returnGalleryModal(btnAddPicture, backBtn, galleryModal, newForm);
}

/**
 * Creation of the add photo modal page by modifying the main moadal when the AddPicture button is clicked.
 * @param {*} btnAddPicture 
 * @param {*} backBtn 
 * @param {*} galleryModal 
 * @param {*} newForm -The new form to add
 */
function addNewForm(btnAddPicture, backBtn, galleryModal, newForm) {
    btnAddPicture.addEventListener("click", () => {
        /**
         * This style change allows you to redisplay the contents of the new form at the end of the listening session. 
         */
        newForm.style.display ="block";

        backBtn.style.display = "block";
        
        document.querySelector("dialog p").textContent = "Ajout photo";

        newForm.innerHTML = `
            <form>
                <div class="container-file">
                    <img src="./assets/icons/picture-logo.svg" alt="">
                    <label for="image" class="custom-imageUpload">
                        <input type="file" id="image" name="image" accept=".jpg, .png" required>
                        <span id="fileName">+ Ajouter photo</span>
                    </label>
                    <p>jpg, png : 4mo max</p>
                </div>
                <div class="container-bottom">
                    <label for="title">Titre</label>
                    <input type="text" name="tilte" id="title" required>
                    <label for="category">Catégorie</label>
                    <select name="category" id="category" required>
                        <option value=""></option>
                    </select>
                </div>
            </form>
        `;

        galleryModal.insertAdjacentElement("afterend", newForm);
        
        menuCategory();

        galleryModal.style.display ="none";

        // Changing the appearance and attributes of the AddPicture button
        btnAddPicture.classList.remove("selected");
        btnAddPicture.classList.add("notValid");
        btnAddPicture.type = "submit";
        btnAddPicture.setAttribute("id", "uploadPicture")
        btnAddPicture.textContent ="Valider";

    })
}

/**
 * Calling up Api categories to integrate them into the category menu
 */
async function menuCategory(){
    const selectCategory = document.querySelector("#category");
    fetch("http://localhost:5678/api/categories")
    .then( response => response.json())
    .then(categorys => {
            // Creation of category options for each category
            categorys.forEach(category => {
                const option = document.createElement("option");
                option.innerText = category.name;
                option.setAttribute("value", category.name);
                option.dataset.categoryId = category.id;
                selectCategory.appendChild(option);
            });
        });
}

/**
 * Resetting the main modal by clicking the back button
 * @param {*} btnAddPicture 
 * @param {*} backBtn 
 * @param {*} galleryModal 
 * @param {*} newForm 
 */
function returnGalleryModal(btnAddPicture, backBtn, galleryModal, newForm){
    backBtn.addEventListener("click", () =>{
        backBtn.style.display = "none";
        newForm.style.display ="none";
        galleryModal.style.display = "grid";
        btnAddPicture.classList.add("selected");
        btnAddPicture.classList.remove("notValid");
        btnAddPicture.type = "button";
        btnAddPicture.setAttribute("id", "addPicture")
        btnAddPicture.textContent ="Ajouter une photo";
        document.querySelector("dialog p").textContent = "Galerie photo";
    })
}