const form = document.querySelector("#form");
const errorMessage = document.querySelector("#error-message");

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
    errorMessage.textContent = data.message;
  }
}

form.addEventListener("submit", handleSignInSubmit);
