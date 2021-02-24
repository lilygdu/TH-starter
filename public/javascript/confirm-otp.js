const instructions = document.querySelector("#instructions");
const input = document.querySelector("input");
const errorMessage = document.querySelector("#error-message");

function displayVerificationMessage() {
  const email = localStorage.getItem("email");
  if (!email) {
    window.location = "/";
  }

  instructions.textContent = `We just sent an email with login instructions to ${email}`;
}

displayVerificationMessage();

async function validateCodeInput() {
  const body = JSON.stringify({
    email: localStorage.getItem("email"),
    otp: form.code.value,
  });

  const response = await fetch(`/confirm-otp`, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (response.ok) {
    window.location = "/index.html";
  } else {
    errorMessage.textContent = data.message;
  }
}

input.addEventListener("input", validateCodeInput);
