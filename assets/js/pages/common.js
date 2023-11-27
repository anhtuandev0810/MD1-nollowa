// Nếu đã login thì không cho vào trang login và rgister nữa

function redirectToHomePageIfLogeed() {
  // 1. get data from localStorage
  let users = JSON.parse(localStorage.getItem("users"));

  // 2. kiểm tra xem có user active hay không?
  let userFind = users.find((user) => {
    if (user.status === "active") {
      return true;
    } else {
      return false;
    }
  });

  if (userFind) {
    window.location.href = "/index.html";
  }
}

redirectToHomePageIfLogeed();
