const instructions = document.querySelector("#instructions");

function displayVerficationMessage() {
  const email = localStorage.getItem("email");
  if (!email) {
    window.location = "/";
  }

  instructions.textContent = `We just sent an email with login instructions to ${email}`;
}

displayVerficationMessage();
