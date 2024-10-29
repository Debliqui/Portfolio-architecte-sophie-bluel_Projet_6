// Filter button display function
export async function btnAffichage(){
    const filters = document.querySelector(".filter");
    fetch("http://localhost:5678/api/categories")
    .then( response => response.json())
    .then(filterElement => {
        //Creation of the All button
        const btnTous = document.createElement("button");
        btnTous.innerText = "Tous"
        btnTous.classList = ("btn selected");
        btnTous.setAttribute("data-category-id", "All");
        filters.appendChild(btnTous);
            //Creation of buttons with category names in Api
            filterElement.forEach(filter => {
                const btn = document.createElement("button");
                btn.innerText = filter.name;
                btn.classList = ("btn");
                btn.setAttribute("data-category-id", filter.id);
                filters.appendChild(btn);
            });
            filterFigures();
        });
}

// Filter function by category
function filterFigures(categoryId) {
    const btnFilters = document.querySelectorAll(".filter .btn");
    console.log(btnFilters);
    for (let btnFilter of btnFilters){
        btnFilter.addEventListener("click", () =>{
            // Delete the 'selected' class from all buttons
            btnFilters.forEach(btn => btn.classList.remove("selected"));

            // Add 'selected' class to clicked button
            btnFilter.classList.add("selected");

            let categoryId = btnFilter.dataset.categoryId;

            const figures = document.querySelectorAll(".gallery figure");

            for(let figure of figures){
                figure.style.display = "none";

                if (figure.dataset.categoryId === categoryId || categoryId === "All") {
                    figure.style.display = "";
                    btnFilter.classList.add("selected");
                }
            }
        })
    }   

}

