import { generateWorks } from "../js/works.js";

/**
 * Display the second modality dynamically
 */
export function affichageModalAddPicture() {
  const btnAddPicture = document.querySelector("#addPicture");
  const backBtn = document.querySelector("#backBtn");
  const galleryModal = document.querySelector(".galleryModal");
  const newForm = document.createElement("form");

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
    newForm.style.display = "flex";

    backBtn.style.display = "block";

    document.querySelector("dialog p").textContent = "Ajout photo";

    newForm.innerHTML = `
            <form>
                <div class="container-file">
                    <div class="uploadFile">
                        <img src="./assets/icons/picture-logo.svg" alt="">
                        <label for="image" class="custom-imageUpload">
                            <input type="file" id="image" name="image" accept=".jpg, .png" required="required">
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
                <button class="btn selected" id="uploadPicture" type="submit">Valider</button>
            </form>
        `;

    galleryModal.insertAdjacentElement("afterend", newForm);

    menuCategory();

    const preview = document.querySelector(".preview");
    const uploadFile = document.querySelector(".uploadFile");

    previewPicture(preview, uploadFile);

    galleryModal.style.display = "none";
    btnAddPicture.style.display = "none";
    document.querySelector(".separator_1").style.display = "none";

    submitForm(preview, uploadFile, galleryModal);
  });
}

/**
 * Calling up Api categories to integrate them into the category menu
 */
async function menuCategory() {
  const selectCategory = document.querySelector("#category");
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categorys) => {
      // Creation of category options for each category
      categorys.forEach((category) => {
        const option = document.createElement("option");
        option.innerText = category.name;
        option.setAttribute("value", category.id);
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
function returnGalleryModal(btnAddPicture, backBtn, galleryModal, newForm) {
  backBtn.addEventListener("click", () => {
    backBtn.style.display = "none";
    newForm.style.display = "none";
    galleryModal.style.display = "grid";
    document.querySelector("dialog p").textContent = "Galerie photo";
    btnAddPicture.style.display = "block";
    document.querySelector(".separator_1").style.display = "block";
  });
}

function previewPicture(preview, uploadFile) {
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

async function submitForm(preview, uploadFile, galleryModal) {
  const form = document.querySelector("dialog form");
  const btnUploadPicture = document.querySelector("#uploadPicture");
  const elementInputSelect = document.querySelectorAll("dialog input, select");

  function verifyFormEmpty() {
    let allFilled = true;
    elementInputSelect.forEach((element) => {
      if (element.value === "") {
        allFilled = false;
      }
    });
    if (allFilled) {
      btnUploadPicture.classList.add("selected");
      btnUploadPicture.classList.remove("notValid");
    } else {
      btnUploadPicture.classList.remove("selected");
      btnUploadPicture.classList.add("notValid");
    }
  }

  elementInputSelect.forEach((element) => {
    element.addEventListener("input", verifyFormEmpty);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const token = sessionStorage.getItem("keys");
    // Removal of quotation marks from keys value
    const tokenWithoutQuotes = token.replace(/"/g, "");
    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenWithoutQuotes}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur Serveur");
      }

      console.log("L'élément a bien été ajouté!");
    } catch (error) {
      console.error("Il y a eu un problème avec la requête fetch:", error);
    }

    clearInputAndSelect(preview, uploadFile, elementInputSelect);

    galleryModal.innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    generateWorks();
  });

  verifyFormEmpty();
}

function clearInputAndSelect(preview, uploadFile, elementInputSelect) {
  elementInputSelect.forEach((element) => {
    element.value = "";
  });
  preview.innerHTML = "";
  preview.style.zIndex = "0";
  uploadFile.style.zIndex = "1";
}
