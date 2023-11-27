// function getUserData() {
//   const userData = localStorage.getItem("userData")
//     ? JSON.parse(localStorage.getItem("userData"))
//     : [];

//   const errorMessageElements = document.querySelectorAll(".error-message");

//   let errorMessageArr = [];

//   errorMessageElements.forEach((message) =>
//     errorMessageArr.push(message.innerText)
//   );

//   let checkErrorMessage = errorMessageArr.every((message) => message === "");

//   if (checkErrorMessage) {
//     userData.push({
//       id: crypto.randomUUID(),
//       name: nameSelector.value,
//       email: emailSelector.value,
//       password: passwordSelector.value,
//       isLogin: false,
//     });
//   }

//   localStorage.setItem("userData", JSON.stringify(userData));
// }

// buttonAdd.addEventListener("click", getUserData);
