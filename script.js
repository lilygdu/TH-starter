const form = document.querySelector("#form");

function handleSubmit(event) {
  event.preventDefault();

  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    let errorMessage = "";
    if (input.checkValidity()) {
      input.classList.add("valid");
      input.classList.remove("invalid");
    } else {
      input.classList.add("invalid");
      input.classList.remove("valid");
      if (input.type === "email") {
        if (input.value === "") {
          errorMessage = "Email is a required field.";
        } else {
          errorMessage = "That doesn't look like a valid email.";
        }
      }
      if (input.type === "text") {
        errorMessage = "Name is a required field.";
      }
      if (input.type === "checkbox") {
        errorMessage =
          "You must agree to the privacy policy and terms of service before signing up.";
      }
    }
    input
      .closest(".form-field")
      .querySelector(".error-message").textContent = errorMessage;
  });
}

form.addEventListener("submit", handleSubmit);
