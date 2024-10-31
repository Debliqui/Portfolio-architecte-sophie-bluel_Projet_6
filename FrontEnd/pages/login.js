/**
 * Function that compares the IDs entered by the user with the Users available in the Api.
 * And call apiUsers function.
 */
async function authenticationUser() {
  const formLogIn = document.querySelector("#logIn");
  // Listening to the submit button
  formLogIn.addEventListener("submit", (event) => {
    event.preventDefault();
    // Input recovery
    const users = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=password]").value,
    };
    const chargeUtile = JSON.stringify(users);
    apiUsers(chargeUtile);
  });
}
/**
 * Send a request to the API with serialized users.
 * And response processing .
 * 
 * @param {string} chargeUtile 
 * @returns {object}
 */
async function apiUsers(chargeUtile) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur dans l’identifiant ou le mot de passe");
      }
      return response.json();
    })
    .then((data) => {
      // Data storage in sessionsStorage
      window.sessionStorage.setItem("keys", JSON.stringify(data));
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
