// ======================================================
// MODULE : GESTION DE L'AUTHENTIFICATION
// ======================================================
import { DOM } from "../dom-loader.js";
import { FAKE_USER_CREDENTIALS } from "../config.js";

let isLoggedIn = false;

function handleLoginSuccess() {
  isLoggedIn = true;
  if (DOM.loginModal) DOM.loginModal.classList.remove("is-visible");
  if (DOM.loginLogoutBtn) DOM.loginLogoutBtn.textContent = "Se déconnecter";
  DOM.protectedContent.forEach((el) => {
    if (el.tagName === "LI") el.style.display = "list-item";
  });
}

function handleLogout() {
  isLoggedIn = false;
  if (DOM.loginLogoutBtn) DOM.loginLogoutBtn.textContent = "Se connecter";
  DOM.protectedContent.forEach((el) => {
    if (el.tagName === "LI") el.style.display = "none";
  });
  // À faire : fermer l'overlay si un onglet protégé était ouvert
}

export function initAuth() {
  if (!DOM.loginLogoutBtn || !DOM.loginModal || !DOM.loginForm) return;

  DOM.loginLogoutBtn.addEventListener("click", () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      DOM.loginModal.classList.add("is-visible");
    }
  });

  if (DOM.modalCloseBtn)
    DOM.modalCloseBtn.addEventListener("click", () =>
      DOM.loginModal.classList.remove("is-visible")
    );
  DOM.loginModal.addEventListener("click", (event) => {
    if (event.target === DOM.loginModal)
      DOM.loginModal.classList.remove("is-visible");
  });

  DOM.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameInput = DOM.loginForm.querySelector("#username").value;
    const passwordInput = DOM.loginForm.querySelector("#password").value;
    if (
      usernameInput === FAKE_USER_CREDENTIALS.username &&
      passwordInput === FAKE_USER_CREDENTIALS.password
    ) {
      handleLoginSuccess();
      DOM.loginForm.reset();
      if (DOM.loginErrorMsg) DOM.loginErrorMsg.textContent = "";
    } else {
      if (DOM.loginErrorMsg)
        DOM.loginErrorMsg.textContent =
          "Identifiant ou mot de passe incorrect.";
    }
  });
}
