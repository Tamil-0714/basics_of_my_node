document.addEventListener("DOMContentLoaded", () => {
  const eyeSlash = document.querySelectorAll(".pass-icon");
  eyeSlash.forEach((x) => {
    x.addEventListener("click", () => {
      console.log("pressed");
      const parentElement = x.parentElement;
      const inputField = parentElement.querySelector("input");
      const passIcon = parentElement.querySelector(".pass-icon");
      if (inputField.type === "password") {
        inputField.type = "text";
        passIcon.classList.remove("fa-eye-slash");
        passIcon.classList.add("fa-eye");
      } else {
        inputField.type = "password";
        passIcon.classList.add("fa-eye-slash");
        passIcon.classList.remove("fa-eye");
      }
    });
  });
});

const form = document.querySelector("#frm");
const userName = document.querySelector("#userName");
const pass = document.querySelector("#password");
const confirm = document.querySelector("#confirm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(!userName.value.trim()){
    userName.style.borderColor = "red";
  }
  else if (pass.value.trim() != confirm.value.trim()) {
    pass.style.borderColor = "red";
    confirm.style.borderColor = "red";
  } else {
    form.submit();
  }
});
