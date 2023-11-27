const loginShow = document.querySelector(".login-content");
const stickyNavUser = document.querySelector(".sticky-nav-icon a");
const logoutBox = document.querySelector(".logout");
const showCart = document.querySelector(".drop-down-cart");
const cartIcon = document.querySelector(".cart-hover");
const hoverDropdownCart = document.querySelector(".mini-cart");
const stickyNavUserIcon = document.querySelector(".sticky-nav-user-icon");

function getUserIsLoggin() {
  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  let activeUser = users.find((user) => user.status === "active");

  if (activeUser) {
    loginShow.innerHTML = `<a href="my-account.html">
                              <span>
                              <i class="far fa-user"></i>
                              </span>
                              </a>
                              <div class="login-form-popup">
                              <a href="my-account.html">
                              <p class="login-form-popup-top user-name">${activeUser.name}</p>
                              </a>
                              </div>`;

    cartIcon.innerHTML = `<a href="shop-cart.html">
                              <span>
                                <i class="fas fa-shopping-cart"></i>
                              </span>
                          </a>`;

    logoutBox.style.display = "block";
    showCart.classList.add("show-cart");
  }
}

function logout(e) {
  e.preventDefault();

  const users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  if (confirm("Bạn chắc chắn muôn đăng xuất?")) {
    users.forEach((user) => (user.status = ""));
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/login.html";
  }
}

getUserIsLoggin();
logoutBox.addEventListener("click", logout);
