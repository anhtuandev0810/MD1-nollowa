const buttonLogin = document.querySelector(".btn-login");
const inputSelectorAll = document.querySelectorAll(".form-group input");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const passwordErrorMessage = document.querySelector(".alert-password");
const emailSelector = document.querySelector(".email");
const passwordSelector = document.querySelector(".password");
const showHideBox = document.querySelector(".icon-show-password");

function validateEmail(valueInput) {
  let message = null;

  if (valueInput === "") {
    message = "Xin hãy nhập email";
  } else if (!regexEmail.test(valueInput)) {
    message = "Xin hãy nhập đúng định dạng email";
  }

  return message;
}

function validatePassword(valueInput) {
  let message = null;

  if (valueInput === "") {
    message = "Xin hãy nhập mật khẩu";
    passwordErrorMessage.innerHTML = "";
  } else if (!regexPassword.test(valueInput)) {
    message = "Mật khẩu không đúng định dạng";
    passwordErrorMessage.innerHTML =
      "<p>Mật khẩu cần có ít nhất 8 ký tự, ký tự hoa, thường, số và ký tự đặc biệt (!@#%&)</p>";
  } else {
    passwordErrorMessage.innerHTML = "";
  }

  return message;
}

function handleLogin(e) {
  e.preventDefault();
  let message;
  let isValid = true;
  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  inputSelectorAll.forEach((input) => {
    let nameInput = input.name;

    if (nameInput === "email") {
      message = validateEmail(input.value.trim());
    } else if (nameInput === "password") {
      message = validatePassword(input.value.trim());
    }

    let errorMessage = input.parentElement.querySelector(".error-message");

    if (message === null) {
      input.classList.remove("error");
      errorMessage.innerText = "";
      isValid &&= true;
    } else {
      input.classList.add("error");
      errorMessage.innerText = message;
      isValid &&= false;
    }
  });

  if (isValid) {
    let isLoginExitIndex = -1;

    users.forEach((user, i) => {
      if (
        user.email === emailSelector.value &&
        user.password === passwordSelector.value
      ) {
        isLoginExitIndex = i;
      }
    });

    if (isLoginExitIndex !== -1) {
      window.location.href = "/index.html";
      users[isLoginExitIndex].status = "active";
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      passwordErrorMessage.innerHTML =
        "<p>Email hoặc mật khẩu không chính xác</p>";
    }
  }
}

function showHidePassword(e) {
  let target = e.target;

  if (target.classList.contains("fa-eye-slash")) {
    passwordSelector.type = "text";
    target.style.display = "none";
    target.parentElement.querySelector(".fa-eye").style.display = "inline";
  } else if (target.classList.contains("fa-eye")) {
    passwordSelector.type = "password";
    target.style.display = "none";
    target.parentElement.querySelector(".fa-eye-slash").style.display =
      "inline";
  }
}

buttonLogin.addEventListener("click", handleLogin);
showHideBox.addEventListener("click", showHidePassword);
