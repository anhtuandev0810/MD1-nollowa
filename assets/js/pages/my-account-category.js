//
// ------------------------Category------------------------
const categoryNameInput = document.querySelector(".category-name");
const categoryForm = document.querySelector(".category-wrapper");
const categoryTable = document.querySelector(".category-table");
const btnSave = document.querySelector(".btn-save");

function saveCategory(e) {
  e.preventDefault();

  let categoryList = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : [];

  let checkEmpty = showError(categoryNameInput, "Please enter category name");

  if (checkEmpty) {
    if (e.target.classList.contains("update-category")) {
      let updateId = e.target.getAttribute("data-id");
      let index = categoryList.findIndex((item) => item.id === updateId);

      categoryList[index].name = categoryNameInput.value;
      localStorage.setItem("category-list", JSON.stringify(categoryList));

      btnSave.innerText = "Lưu";
      btnSave.classList.remove("update-category");
      btnSave.removeAttribute("data-id");

      renderCategoryTable();
      categoryForm.reset();
      showCategoryInit();
    } else {
      categoryList.push({
        id: crypto.randomUUID(),
        name: categoryNameInput.value,
      });

      localStorage.setItem("category-list", JSON.stringify(categoryList));
      renderCategoryTable();
      categoryForm.reset();
      showCategoryInit();
    }
  }
}

function renderCategoryTable() {
  let categoryList = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : [];

  let render = "";
  let tbody = document.querySelector(".category-render");

  categoryList.forEach((item) => {
    render += `<tr>
                <td>${item.name}</td>
                <td>
                  <button class="ctg-edit custom-edit-btn" data-id="${item.id}">Edit</button>
                  <button class="ctg-delete custom-delete-btn" data-id="${item.id}">Delete</button>
                </td>
              </tr>`;
  });

  tbody.innerHTML = render;
}

function categoryEdit(target) {
  let categoryList = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : [];

  let deleteId = target.getAttribute("data-id");
  let index = categoryList.findIndex((item) => item.id === deleteId);

  categoryNameInput.value = categoryList[index].name;
  btnSave.classList.add("update-category");
  btnSave.setAttribute("data-id", deleteId);
  btnSave.innerText = "Chỉnh sửa";
}

function categoryDelete(target) {
  let categoryList = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : [];

  let editId = target.getAttribute("data-id");
  let index = categoryList.findIndex((item) => item.id === editId);

  if (editId === btnSave.getAttribute("data-id")) {
    if (confirm("Are you sure you want to delete it?")) {
      categoryList.splice(index, 1);
      localStorage.setItem("category-list", JSON.stringify(categoryList));

      btnSave.removeAttribute("data-id");
      btnSave.classList.remove("update-category");
      btnSave.innerText = "Save";
      renderCategoryTable();
      categoryForm.reset();
      showCategoryInit();
    }
  } else {
    categoryList.splice(index, 1);
    localStorage.setItem("category-list", JSON.stringify(categoryList));
    renderCategoryTable();
    showCategoryInit();
  }
}

function tableButtonControll(e) {
  let target = e.target;

  if (target.classList.contains("ctg-edit")) {
    categoryEdit(target);
  } else if (target.classList.contains("ctg-delete")) {
    categoryDelete(target);
  }
}

//
// ------------------------Show Category Option------------------------
const categorySelect = document.querySelector(".category-select");

function showCategoryInit() {
  let categoryList = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : [];

  let render = ``;

  categoryList.forEach((item) => {
    render += `<option value="${item.id}">${item.name}</option>`;
  });

  categorySelect.innerHTML = render;
}

btnSave.addEventListener("click", saveCategory);
categoryTable.addEventListener("click", tableButtonControll);
showCategoryInit();
window.addEventListener("load", renderCategoryTable);
