function createUserAdmin() {
  // 1. Lấy dữ liệu user từ localStorage
  let userList = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  // 3. Thực hiện update user cũ và thêm user admin mới
  let userAdmin = {
    id: crypto.randomUUID(),
    name: "Admin",
    email: "admin@gmail.com",
    password: "aA@12345",
    status: "",
    role: "admin",
  };

  //   Tạo ra mảng mới gồm dữ liệu user cũ + useradmin
  let allUser = [...userList, userAdmin];

  // 3. Cập nhật role cho regular user
  let regularUserUpdate = allUser.map((item) => {
    if (item.role === "admin") {
      return item;
    } else {
      item.role = "regular";
      return item;
    }
  });

  let userAdminExit = userList.find((item) => item.role === "admin");

  if (!userAdminExit) {
    localStorage.setItem("users", JSON.stringify(regularUserUpdate));
  }
}

// Tạo user admin
// role: admin -- role: regular
createUserAdmin();
