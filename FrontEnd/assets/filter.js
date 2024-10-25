export async function btnAffichage(){
    const filter = document.querySelector(".filter");
    fetch("http://localhost:5678/api/categories")
    .then( response => response.json())
    .then(filterElement => {
            for (let i =0; i < filterElement.length; i++){
                const btn = document.createElement("button");
                btn.innerText = filterElement[i].name;
                btn.classList= ("btn");
                filter.appendChild(btn);
            }
        });
}
    