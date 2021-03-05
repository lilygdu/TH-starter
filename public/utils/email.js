import emailjs, { init } from "emailjs-com";

init("user_C0PNrF65QnYy5WbnUlyV7");

export const sendOTPEmail = async ({ otp, email }) => {
  const today = new Date().toISOString().slice(0, 10);
  const emailParams = {
    code: otp,
    to_email: email,
    current_date: today,
  };
  await emailjs.send("service_e33zu43", "template_yx0d6ek", emailParams);
};
