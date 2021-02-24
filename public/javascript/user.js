const loginButton = document.querySelector("#login");
const accountButton = document.querySelector("#account");

function checkUser() {
  const isLoggedIn =
    !!localStorage.getItem("userId") && localStorage.getItem("email");
  if (isLoggedIn) {
    loginButton.classList.add("hidden");
    accountButton.classList.remove("hidden");
  }
}

checkUser();
