const instructions = document.querySelector("#instructions");
const input = document.querySelector("input");
const errorMessage = document.querySelector("#error-message");

function displayVerificationMessage() {
  const email = localStorage.getItem("email");
  if (!email) {
    window.location = "/";
  }

  instructions.innerHTML = `We just sent an email with login instructions to <b>${email}</b>`;
}

displayVerificationMessage();

async function validateCodeInput() {
  if (form.code.value.length < 6) {
    return;
  }

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
    localStorage.setItem("userId", data.id);
    window.location = "/index.html";
  } else {
    form.code.classList.add("invalid");
    errorMessage.textContent = data.message;
  }
}

input.addEventListener("input", validateCodeInput);
