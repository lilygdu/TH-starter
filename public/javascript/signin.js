const form = document.querySelector("#form");
const errorMessage = document.querySelector(".error-message");
const signInButton = document.querySelector("#sign-in-button");

async function handleSignInSubmit(event) {
  event.preventDefault();
  const response = await fetch("/signin", {
    method: "POST",
    body: JSON.stringify({ email: form.email.value }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (response.ok) {
    const { email, otp } = data;
    localStorage.setItem("email", email);
    const todayDate = new Date().toISOString().slice(0, 10);

    const emailParams = {
      code: otp,
      to_email: email,
      current_date: todayDate,
    };

    await emailjs.send("service_e33zu43", "template_yx0d6ek", emailParams);
    window.location = "/confirm-otp.html";
  } else {
    form.email.classList.add("invalid");
    errorMessage.textContent = data.message;
  }
}

function handleInput() {
  if (form.email.value === "") {
    signInButton.disabled = true;
  } else {
    signInButton.disabled = false;
  }
}

form.addEventListener("submit", handleSignInSubmit);
form.email.addEventListener("input", handleInput);
