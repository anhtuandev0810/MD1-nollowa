// const detailName = document.querySelector(".detail-name");
// const detailEmail = document.querySelector(".detail-email");
// const detailPassword = document.querySelector(".detail-password");
// const detailNewPass = document.querySelector(".detail-newpass");
// const detailConfirm = document.querySelector(".detail-confirm");
// const passwordRegexDetail =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

// const seveDetail = document.querySelector(".save-detail");

// function getActiveUser() {
//   let users = localStorage.getItem("users")
//     ? JSON.parse(localStorage.getItem("users"))
//     : [];

//   let activeUser = users.find((user) => user.status === "active");

//   return activeUser;
// }

// function initShow() {
//   detailName.value = getActiveUser().name;
//   detailEmail.value = getActiveUser().email;
// }

// function validateDetail() {
//   let testPassword = passwordRegexDetail.test(detailPassword.value);
//   let testNewPass = passwordRegexDetail.test(detailNewPass.value);
//   console.log(testPassword);

//   let errorMessagePass =
//     detailPassword.parentElement.querySelector(".error-message");

//   if (testPassword && detailPassword.value !== "") {
//     errorMessagePass.innerText =
//       "Password cần có ít nhất 8 ký tự, hoa, thường, số và ký tự(!@#%&)";
//     detailPassword.classList.add("input-error");
//   } else {
//     errorMessagePass.innerText = "";
//     detailPassword.classList.remove("input-error");
//   }

//   let errorMessageNewPass =
//     detailNewPass.parentElement.querySelector(".error-message");

//   if (testNewPass && detailNewPass.value !== "") {
//     errorMessageNewPass.innerText =
//       "Password mới cần có ít nhất 8 ký tự, hoa, thường, số và ký tự(!@#%&)";
//     detailNewPass.classList.add("input-error");
//   } else {
//     errorMessageNewPass.innerText = "";
//     detailNewPass.classList.remove("input-error");
//   }

//   showError(detailName, "Xin hãy nhập tên");
//   showError(detailPassword, "Xin hãy nhập password");
//   showError(detailNewPass, "Xin hãy nhập password mới");
//   showError(detailConfirm, "Xin hãy xác nhận password");

//   let checked =
//     showError(detailName, "Xin hãy nhập tên") &&
//     showError(detailPassword, "Xin hãy nhập password") &&
//     showError(detailNewPass, "Xin hãy nhập password mới") &&
//     showError(detailConfirm, "Xin hãy xác nhận password") &&
//     testPassword &&
//     testNewPass;
// }

// function updateAccount(e) {
//   e.preventDefault();

//   validateDetail();
// }

// initShow();
// seveDetail.addEventListener("click", updateAccount);
