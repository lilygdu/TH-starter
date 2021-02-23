const instructions = document.querySelector("#instructions");
const input = document.querySelector("input");

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
  console.log(data);
}

input.addEventListener("input", validateCodeInput);
