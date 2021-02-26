const signOutButton = document.querySelector("#sign-out-link");
const dialog = document.querySelector("dialog");
const modal = document.querySelector("#modal");
const confirmButton = document.querySelector("#confirm");
const cancelButton = document.querySelector("#cancel");

function handleSignOutClick(event) {
  event.preventDefault();
  dialog.open = true;
}

function handleCancelClick() {
  dialog.open = false;
}
function handleDialogClick(event) {
  if (event.target === event.currentTarget) {
    dialog.open = false;
  }
}

function handleConfirmSignOut() {
  localStorage.clear();
  window.location = "/";
}

signOutButton.addEventListener("click", handleSignOutClick);
confirmButton.addEventListener("click", handleConfirmSignOut);
cancelButton.addEventListener("click", handleCancelClick);
dialog.addEventListener("click", handleDialogClick);
dialog.addEventListener("transitionend", () => confirmButton.focus());
