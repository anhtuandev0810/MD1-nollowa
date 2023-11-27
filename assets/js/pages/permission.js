// Nếu là user thông thường thì ẩn product, category, order

function hideManagementIfIsUserRegular() {
  let userList = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  document.querySelector("#orders-tab").parentElement.remove();

  let userActive = userList.find((item) => item.status === "active");

  if (userActive.role !== "admin") {
    document.querySelector("#dashboard-tab").parentElement.remove();
    document.querySelector("#orders-tab").parentElement.remove();
    document.querySelector("#address-tab").parentElement.remove();
    document.querySelector("#account-detail-tab").click();
  }
}

hideManagementIfIsUserRegular();
