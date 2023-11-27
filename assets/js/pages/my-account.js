const logoutSelector = document.querySelector(".logout-user");

function handleLogout(e) {
  e.preventDefault();

  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  if (confirm("Bạn chắc chắn muốn đăng xuất?")) {
    users.forEach((user) => (user.status = ""));
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/login.html";
  }
}

logoutSelector.addEventListener("click", handleLogout);
