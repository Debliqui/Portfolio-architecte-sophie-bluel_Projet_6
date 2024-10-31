// Function to create figure in the gallery
function figureInner(figure){
    const sectionGallery = document.querySelector(".gallery");
    const figureElement = document.createElement("figure");
    figureElement.setAttribute("data-category-id", figure.categoryId);

    const imgElement = document.createElement("img");
    imgElement.src = figure.imageUrl;
    imgElement.setAttribute("alt", figure.title )

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = figure.title;

    sectionGallery.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);

}

//Function to generate works from the API
export async function genererWorks(){
    fetch("http://localhost:5678/api/works/")
    .then(r => r.json())
    .then(works => {
        works.forEach(work => {
            figureInner(work);          
        });
    }
    )
}