const form = document.querySelector("#form");

function handleSubmit(event) {
  event.preventDefault();

  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.checkValidity()) {
      if (input.type === "text" || input.type === "email") {
        console.log("It is valid- text, email");
        input.classList.add("valid");
        input.classList.remove("invalid");

        input
          .closest(".form-field")
          .querySelector(".error-message").textContent = "";
      } else if (input.name === "promotional-emails") {
        console.log("first checkbox");
      } else {
        console.log("It is valid- checkbox");

        input
          .closest(".checkbox-field")
          .querySelector(".error-message").textContent = "";
      }
    } else {
      console.log("not valid");
      input.classList.add("invalid");
      input.classList.remove("valid");

      if (input.type === "email") {
        if (input.value === "") {
          input
            .closest(".form-field")
            .querySelector(".error-message").textContent =
            "Email is a required field.";
        } else {
          input
            .closest(".form-field")
            .querySelector(".error-message").textContent =
            "That doesn't look like a valid email.";
        }
      }

      if (input.type === "text") {
        input
          .closest(".form-field")
          .querySelector(".error-message").textContent =
          "Name is a required field.";
      }

      if ((input.type === "checkbox") & (input.id === "terms-of-service")) {
        console.log("checkbox type");

        input
          .closest(".checkbox-field")
          .querySelector(".error-message").textContent =
          "You must agree to the privacy policy and terms of service before signing up.";
      }
    }
  });
}

form.addEventListener("submit", handleSubmit);
