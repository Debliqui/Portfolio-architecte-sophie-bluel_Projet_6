import { generateWorks } from "../js/works.js";

/**
 * Display the second modality dynamically
 */
export function generateAddPictureModal() {
  const addPictureBtn = document.querySelector("#addPictureBtn");
  const backBtn = document.querySelector("#backBtn");
  const galleryModal = document.querySelector(".galleryModal");
  const newForm = document.createElement("form");

  // Listening to the click of the addPicture button for add new form
  addNewForm(addPictureBtn, backBtn, galleryModal, newForm);

  // Listening to the click of the back button for return at main galleryModal
  backBtn.addEventListener("click", () => {
    returnGalleryModal(addPictureBtn, backBtn, galleryModal, newForm);
  });
}

/**
 * Creation of the addPicture modal page by modifying the main moadal when the addPicture button is clicked.
 * @param {HTMLElement} addPictureBtn
 * @param {HTMLElement} backBtn
 * @param {HTMLElement} galleryModal
 * @param {HTMLElement} newForm -The new form to add
 */
function addNewForm(addPictureBtn, backBtn, galleryModal, newForm) {
  addPictureBtn.addEventListener("click", () => {
    /**
     * This style change allows you to redisplay the contents of the new form at the end of the listening session.
     */
    newForm.style.display = "flex";

    backBtn.style.display = "block";

    document.querySelector("dialog p").textContent = "Ajout photo";

    newForm.innerHTML = `
            <form>
                <div class="container-file">
                    <div class="uploadFile">
                        <img src="./assets/icons/picture-logo.svg" alt="">
                        <label for="image" class="custom-imageUpload">
                            <input type="file" id="image" name="image" accept=".jpg, .png" >
                            <span id="fileName">+ Ajouter photo</span>
                        </label>
                        <p>jpg, png : 4mo max</p>
                    </div>
                    <div class="preview"></div>
                </div>
                <div class="container-bottom">
                    <label for="title">Titre</label>
                    <input type="text" name="title" id="title" required="required">
                    <label for="category">Catégorie</label>
                    <select name="category" id="category" required="required">
                        <option value=""></option>
                    </select>
                </div>
                <div class="separator_2"></div>
                <button class="btn selected" id="uploadPictureBtn" type="submit">Valider</button>
            </form>
        `;

    galleryModal.insertAdjacentElement("afterend", newForm);

    generateCategoryMenu();

    const preview = document.querySelector(".preview");
    const uploadFile = document.querySelector(".uploadFile");

    addPicturePreview(preview, uploadFile);

    galleryModal.style.display = "none";
    addPictureBtn.style.display = "none";
    document.querySelector(".separator_1").style.display = "none";

    submitForm(preview, uploadFile, galleryModal);
  });
}

/**
 * Calling up Api categories to generate them into the category menu
 */
async function generateCategoryMenu() {
  const selectCategory = document.querySelector("#category");
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  // Creation of category options for each category
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.innerText = category.name;
    option.setAttribute("value", category.id);
    selectCategory.appendChild(option);
  });
}

/**
 * Resetting the main modal
 * @param {HTMLElement} addPictureBtn
 * @param {HTMLElement} backBtn
 * @param {HTMLElement} galleryModal
 * @param {HTMLElement} newForm
 */
function returnGalleryModal(addPictureBtn, backBtn, galleryModal, newForm) {
  backBtn.style.display = "none";
  newForm.style.display = "none";
  galleryModal.style.display = "grid";
  document.querySelector("dialog p").textContent = "Galerie photo";
  addPictureBtn.style.display = "block";
  document.querySelector(".separator_1").style.display = "block";
}
/**
 * Include preview of uploaded image
 * @param {HTMLElement} preview
 * @param {HTMLElement} uploadFile
 */
function addPicturePreview(preview, uploadFile) {
  const input = document.querySelector("input[type='file']");

  input.addEventListener("change", () => {
    const file = input.files;
    if (file.length == 0) {
      preview.style.zIndex = "0";
      uploadFile.style.zIndex = "1";
    } else {
      preview.style.zIndex = "1";
      uploadFile.style.zIndex = "0";
      const image = document.createElement("img");
      image.src = window.URL.createObjectURL(file[0]);
      preview.appendChild(image);
    }
  });
}

function submitForm(preview, uploadFile, galleryModal) {
  const form = document.querySelector("dialog form");
  const uploadPictureBtn = document.querySelector("#uploadPictureBtn");
  const elementInputSelect = document.querySelectorAll("dialog input, select");

  // Function that changes the button rendering when all fields are filled in.
  function checkEmptyFields() {
    let allFilled = true;
    elementInputSelect.forEach((element) => {
      if (element.value === "") {
        allFilled = false;
      }
    });
    if (allFilled) {
      uploadPictureBtn.classList.add("selected");
      uploadPictureBtn.classList.remove("notValid");
    } else {
      uploadPictureBtn.classList.remove("selected");
      uploadPictureBtn.classList.add("notValid");
    }
  }

  // Listen to all input fields
  elementInputSelect.forEach((element) => {
    element.addEventListener("input", checkEmptyFields);
  });

  // Delete the success message when you want to add a new picuture
  elementInputSelect.forEach((element) => {
    element.addEventListener("focus", () => {
      const successMessage = document.getElementById("successMessage");
      if (successMessage) {
        successMessage.remove();
      }
    });
  });

  // Sending formData to the api
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const token = sessionStorage.getItem("keys");
    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur Serveur");
      }
    } catch (error) {
      console.error("Il y a eu un problème avec la requête fetch:", error);
    }
    // Resets all input fields to zero
    clearInputAndSelect(preview, uploadFile, elementInputSelect);

    updateGalleries();

    addPictureSuccesMessage();
  });

  checkEmptyFields();
}

/**
 *  Function resets all input fields to zero
 * @param {HTMLElement} preview
 * @param {HTMLElement} uploadFile
 * @param {HTMLElement} elementInputSelect
 */
function clearInputAndSelect(preview, uploadFile, elementInputSelect) {
  elementInputSelect.forEach((element) => {
    element.value = "";
  });
  preview.innerHTML = "";

  preview.style.zIndex = "0";
  uploadFile.style.zIndex = "1";
}

// Update galleries after adding pictures
function updateGalleries() {
  galleryModal.innerHTML = "";
  document.querySelector(".gallery").innerHTML = "";
  generateWorks();
}

// Add success message after adding picture
function addPictureSuccesMessage() {
  const successMessage = `
  <div id="successMessage">
    <p>Votre travail a été ajouté avec succès</p>
    <img src="assets/icons/icon-check.png" alt="">
  </div>
`;
  document
    .querySelector("form .container-file")
    .insertAdjacentHTML("beforebegin", successMessage);
}
