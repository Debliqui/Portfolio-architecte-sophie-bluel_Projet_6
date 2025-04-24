// Filter button display function
export async function generateFiltersBtn() {
  const filters = document.querySelector(".filter");
  const response = await fetch("http://localhost:5678/api/categories");
  const filterElement = await response.json();
  // Creation of a button to group all categories
  const allCategoriesBtn = document.createElement("button");
  allCategoriesBtn.innerText = "Tous";
  allCategoriesBtn.classList.add("btn", "selected");
  allCategoriesBtn.setAttribute("data-category-id", "all");
  filters.appendChild(allCategoriesBtn);
  //Creation of buttons with category names in Api
  filterElement.forEach((filter) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.innerText = filter.name;
    categoryBtn.classList.add("btn");
    categoryBtn.setAttribute("data-category-id", filter.id);
    filters.appendChild(categoryBtn);
  });
  registerFilterEventsListener();
}

// Function that adds listening for filter button events
function registerFilterEventsListener() {
  const filtersBtn = document.querySelectorAll(".filter .btn");
  for (let filterBtn of filtersBtn) {
    filterBtn.addEventListener("click", () => {
      const figures = document.querySelectorAll(".gallery figure");
      // Delete the 'selected' class from all buttons
      filtersBtn.forEach((btn) => btn.classList.remove("selected"));
      // Recovering categoryId datasets
      let categoryId = filterBtn.dataset.categoryId;

      for (let figure of figures) {
        // Disappearance of all figure elements
        figure.style.display = "none";
        // Appearance of figure elements containing the same dataset as the button
        if (figure.dataset.categoryId === categoryId || categoryId === "all") {
          figure.style.display = "";
          // Add 'selected' class to clicked button
          filterBtn.classList.add("selected");
        }
      }
    });
  }
}
