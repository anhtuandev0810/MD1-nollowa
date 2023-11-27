const buttonAdd = document.querySelector(".btn-signup");
const nameSelector = document.querySelector(".name");
const emailSelector = document.querySelector(".email");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordSelector = document.querySelector(".password");
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const passwordErrorMessage = document.querySelector(".alert-password");
const confirmPasswordSelector = document.querySelector(".confirm-password");
const resigterForm = document.querySelector(".resigter-form");
const showHideBox = document.querySelector(".icon-show-password");

function showError(input, message) {
  let messageInput = input.nextElementSibling;
  input.classList.add("error");
  input.classList.remove("success");
  messageInput.innerText = message;
}

function showSuccess(input) {
  let messageInput = input.nextElementSibling;
  input.classList.remove("error");
  messageInput.innerText = "";
}

function hanldeSignup(e) {
  e.preventDefault();
  let passwordValue = passwordSelector.value;

  let isNameValid = validateName();

  let isEmailValid = validateEmail();

  let isPasswordValid = validatePassword();

  if (!passwordRegex.test(passwordValue) && passwordValue !== "") {
    passwordErrorMessage.innerHTML = `<p>Mật khẩu cần có ít nhất 8 ký tự, ký tự hoa, thường, số và ký tự đặc biệt (!@#%&)</p>`;
  } else {
    passwordErrorMessage.innerHTML = "";
  }

  let isConfirmPasswordValid = confirmValidate();

  if (
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    let userListBefore = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    let isEmailUnique = true;

    for (let i = 0; i < userListBefore.length; i++) {
      if (userListBefore[i].email === emailSelector.value) {
        isEmailUnique = false;
        break;
      }
    }

    if (isEmailUnique) {
      let newUserObj = {
        id: crypto.randomUUID(),
        name: nameSelector.value,
        email: emailSelector.value,
        password: passwordSelector.value,
        status: "",
        role: "regular",
      };

      userListBefore.push(newUserObj);
      localStorage.setItem("users", JSON.stringify(userListBefore));

      window.location.href = "/login.html";
    } else {
      showError(emailSelector, "Email đã tồn tại");
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

function validateName() {
  let isValidate = false;
  let valueName = nameSelector.value;

  if (valueName === "") {
    showError(nameSelector, "Xin hãy nhập tên");
  } else {
    isValidate = true;
    showSuccess(nameSelector);
  }

  return isValidate;
}

function validateEmail() {
  let isValidate = false;
  let valueEmail = emailSelector.value;

  if (valueEmail === "") {
    showError(emailSelector, "Xin hãy nhập email");
  } else if (!regexEmail.test(valueEmail)) {
    showError(emailSelector, "Xin hãy nhập đúng định dạng email");
  } else {
    isValidate = true;
    showSuccess(emailSelector);
  }

  return isValidate;
}

function validatePassword() {
  let isValidate = false;
  let passwordValue = passwordSelector.value;

  if (passwordValue === "") {
    showError(passwordSelector, "Xin hãy nhập mật khẩu");
  } else if (!passwordRegex.test(passwordValue)) {
    showError(passwordSelector, "Định dạng password không chính xác");
  } else {
    isValidate = true;
    showSuccess(passwordSelector);
  }

  return isValidate;
}

function confirmValidate() {
  let isValidate = false;

  let confirmPassValue = confirmPasswordSelector.value;
  let passwordValue = passwordSelector.value;

  if (confirmPassValue === "") {
    showError(confirmPasswordSelector, "Xin hãy nhập xác nhận mật khẩu");
  } else if (confirmPassValue !== passwordValue) {
    showError(confirmPasswordSelector, "Mật khẩu không khớp");
  } else {
    isValidate = true;
    showSuccess(confirmPasswordSelector);
  }

  return isValidate;
}

buttonAdd.addEventListener("click", hanldeSignup);
showHideBox.addEventListener("click", showHidePassword);
