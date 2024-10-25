export async function btnAffichage(){
    const filters = document.querySelector(".filter");
    fetch("http://localhost:5678/api/categories")
    .then( response => response.json())
    .then(filterElement => {
            filterElement.forEach(filter => {
                const btn = document.createElement("button");
                btn.innerText = filter.name;
                btn.classList= ("btn");
                filters.appendChild(btn);
            });
        });
}
    