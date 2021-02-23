const form = document.querySelector("#form");
const inputs = form.querySelectorAll("select, input");
let submitted = false;
let errors = {};

async function handleSubmit(event) {
  event.preventDefault();
  submitted = true;

  const body = JSON.stringify({
    email: form.email.value,
    country: form.country.value,
    name: form.name.value,
    email_consent: form.email_consent.checked,
    tos_consent: form.tos_consent.checked,
  });

  const response = await fetch(`/signup`, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  const attributes = Object.keys(data).filter((attribute) => data[attribute]);

  if (response.ok) {
    for (const attribute of attributes) {
      localStorage.setItem(attribute, data[attribute]);
    }
  } else {
    errors = data;
    for (const attribute of attributes) {
      const input = form.querySelector(`#${attribute}`);
      validate(input);
    }
  }
}

function validate(input) {
  if (!submitted) {
    return;
  }
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
    } else {
      errorMessage = errors[input.id];
    }
  }
  input
    .closest(".form-field")
    .querySelector(".error-message").textContent = errorMessage;
}

inputs.forEach((input) =>
  input.addEventListener("input", () => validate(input))
);
form.addEventListener("submit", handleSubmit);
