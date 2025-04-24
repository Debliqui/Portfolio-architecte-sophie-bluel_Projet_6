import { generateModalFigure } from "../js/modal.js"
import { deleteWorks } from "../js/delete.js"

// Function to create figure in the gallery
function generateMainFigure(figure) {
  const figureGallery = document.createElement("figure")
  figureGallery.dataset.categoryId = figure.categoryId
  figureGallery.dataset.pictureId = figure.id

  const imgGalery = document.createElement("img")
  imgGalery.src = figure.imageUrl
  imgGalery.setAttribute("alt", figure.title)

  const figcaptionGalery = document.createElement("figcaption")
  figcaptionGalery.innerText = figure.title

  figureGallery.appendChild(imgGalery)
  figureGallery.appendChild(figcaptionGalery)

  return figureGallery
}

//Function to generate works from the API
export async function generateWorks() {
  const reponse = await fetch(
    "https://portfolio-architecte-sophie-bluel-projet.onrender.com/api/works/"
  )
  const works = await reponse.json()
  works.forEach((work) => {
    const sectionGallery = document.querySelector(".gallery")
    // generate works in the main gallery
    sectionGallery.appendChild(generateMainFigure(work))

    const galleryModal = document.querySelector(".galleryModal")
    // generate works in the modal gallery
    galleryModal.appendChild(generateModalFigure(work))
  })
  // function delete
  deleteWorks()
}
