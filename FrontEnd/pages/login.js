/**
 * Function that compares the IDs entered by the user with the Users available in the Api.
 * And call apiUsers function.
 */
async function authenticationUser() {
  const logInForm = document.querySelector("#logIn");
  // Listening to the submit button
  logInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Input recovery
    const users = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=password]").value,
    };
    const userfulLoad = JSON.stringify(users);
    apiUsers(userfulLoad);
  });
}
/**
 * Send a request to the API with serialized users.
 * And response processing .
 *
 * @param {string} userfulLoad
 * @returns {object}
 */
async function apiUsers(userfulLoad) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: userfulLoad,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur dans l’identifiant ou le mot de passe");
      }
      return response.json();
    })
    .then((data) => {
      // Data storage in sessionsStorage
      window.sessionStorage.setItem("keys", data.token);
      // redirects to homePage
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      // insetion of "Erreur dans l’identifiant ou le mot de passe" in <p>
      document.querySelector("p").textContent =
        "Erreur dans l’identifiant ou le mot de passe";
    });
}

authenticationUser();
