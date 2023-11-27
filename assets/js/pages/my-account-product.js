//
// ------------------------Product management------------------------
const formWrapper = document.querySelector(".form-product-wrapper");
const nameInputSelector = document.querySelector(".name");
const priceInputSelector = document.querySelector(".price");
const imageInputSelector = document.querySelector(".image");
const locationInputSelector = document.querySelector(".location");
const descriptionInputSelector = document.querySelector(".description");
const regexImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
const tableElement = document.querySelector(".style-table");

//
// ------------------------Button Selector------------------------
const addBtn = document.querySelector(".btn-add");

//
// ------------------------Hiển thị lỗi------------------------
function showError(input, message) {
  let isEmpty = false;

  let inputValue = input.value.trim();

  let showErrorElement = input.parentElement.querySelector(".error-message");

  if (inputValue === "") {
    showErrorElement.innerText = message;
    input.classList.add("input-error");
  } else {
    isEmpty = true;
    showErrorElement.innerText = "";
    input.classList.remove("input-error");
  }

  return isEmpty;
}

//
// ------------------------Check Input------------------------
function handleCheckInput() {
  showError(nameInputSelector, "Please enter product name");
  showError(priceInputSelector, "Please enter product price");
  showError(imageInputSelector, "Please enter product image");
  showError(descriptionInputSelector, "Please enter product description");

  if (
    isNaN(parseFloat(priceInputSelector.value)) &&
    priceInputSelector.value !== ""
  ) {
    priceInputSelector.parentElement.querySelector(".error-message").innerText =
      "Please enter correct price";

    priceInputSelector.classList.add("input-error");
  }

  if (
    !regexImage.test(imageInputSelector.value.trim()) &&
    imageInputSelector.value !== ""
  ) {
    imageInputSelector.parentElement.querySelector(".error-message").innerText =
      "Please enter the correct image format";

    imageInputSelector.classList.add("input-error");
  }

  if (locationInputSelector.value === "1") {
    locationInputSelector.parentElement.querySelector(
      ".error-message"
    ).innerText = "Please choose location";

    locationInputSelector.classList.add("input-error");
  } else {
    locationInputSelector.parentElement.querySelector(
      ".error-message"
    ).innerText = "";

    locationInputSelector.classList.remove("input-error");
  }

  let checkEmpty =
    locationInputSelector.value !== "1" &&
    !isNaN(parseFloat(priceInputSelector.value)) &&
    regexImage.test(imageInputSelector.value.trim()) &&
    showError(imageInputSelector) &&
    showError(nameInputSelector) &&
    showError(priceInputSelector) &&
    showError(descriptionInputSelector);

  return checkEmpty;
}

//
// ------------------------Render Product------------------------
const navLinkAll = document.querySelectorAll(".tab-style1 .nav-link");

function handleTabClick(e) {
  e.preventDefault();

  let target = e.target;
  let tabId = target.getAttribute("data-tab");
  let productTabList = getProductInfo(tabId);
  handleRender(productTabList);
}

function getProductInfo(tabId) {
  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  let productTabList = productList.filter((item) => item.location === tabId);

  return productTabList;
}

function handleRender(products) {
  let categoryList = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : [];

  const tbody = document.querySelector(".style-table-body");
  let render = "";

  if (products.length === 0) {
    render = `<td colspan="5" class="empty-table">Empty product tab list</td>`;
  } else {
    if (Array.isArray(products)) {
      products.forEach((product) => {
        let findCategoryName = categoryList.find(
          (item) => item.id === product.categoryId
        );

        render += `<tr data-tab="${product.location}" class="product-obj">
                                <td>${product.name}</td>
                                <td>${product.price}</td>
                                <td>${findCategoryName.name}</td>
                                <td class="td-img">
                                <img
                                    src="${product.image}"
                                />
                                </td>
                                <td class="td-actions">
                                <button data-id="${product.id}" class="btn-edit custom-edit-btn">Edit</button>
                                <button data-id="${product.id}" class="btn-delete custom-delete-btn">Delete</button>
                                </td>
                            </tr>`;
      });
    }
  }

  tbody.innerHTML = render;
}

//
// ------------------------Add Product------------------------
function addNewProduct(e) {
  e.preventDefault();
  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  if (e.target.classList.contains("btn-update")) {
    let updateId = e.target.getAttribute("data-id");
    let index = productList.findIndex((product) => product.id === updateId);

    productList[index].name = nameInputSelector.value;
    productList[index].price = priceInputSelector.value;
    productList[index].image = imageInputSelector.value;
    productList[index].location = locationInputSelector.value;
    productList[index].categoryId = categorySelect.value;
    productList[index].description = descriptionInputSelector.value;

    localStorage.setItem("product-list", JSON.stringify(productList));

    e.target.classList.remove("btn-update");
    e.target.innerText = "Add Product";
    e.target.removeAttribute("data-id");

    let renderProduct = productList.filter(
      (product) => product.location === locationInputSelector.value
    );
    handleRender(renderProduct);
    formWrapper.reset();
  } else {
    if (handleCheckInput()) {
      productList.push({
        id: crypto.randomUUID(),
        name: nameInputSelector.value,
        price: priceInputSelector.value,
        image: imageInputSelector.value,
        location: locationInputSelector.value,
        categoryId: categorySelect.value,
        description: descriptionInputSelector.value,
      });

      localStorage.setItem("product-list", JSON.stringify(productList));

      let renderProduct = productList.filter(
        (product) => product.location === locationInputSelector.value
      );

      if (locationInputSelector.value === "new-arrival") {
        handleRender(renderProduct);
      }

      // formWrapper.reset();
    }
  }
}

//
// ------------------------Edit Product------------------------
function handleEditItem(target) {
  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  let editId = target.getAttribute("data-id");
  let index = productList.findIndex((product) => product.id === editId);

  nameInputSelector.value = productList[index].name;
  priceInputSelector.value = productList[index].price;
  descriptionInputSelector.value = productList[index].description;
  imageInputSelector.value = productList[index].image;
  locationInputSelector.value = productList[index].location;
  categorySelect.value = productList[index].categoryId;

  addBtn.setAttribute("data-id", editId);
  addBtn.classList.add("btn-update");
  addBtn.innerText = "Update Product";
}

//
// ------------------------Delete Product------------------------
function handleDeleteItem(target) {
  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  let deleteId = target.getAttribute("data-id");
  let index = productList.findIndex((product) => product.id === deleteId);
  let trLocationId = target.closest(".product-obj").getAttribute("data-tab");

  if (deleteId === addBtn.getAttribute("data-id")) {
    if (confirm("Are you sure you want to delete it?")) {
      productList.splice(index, 1);
      localStorage.setItem("product-list", JSON.stringify(productList));

      addBtn.classList.remove("btn-update");
      addBtn.innerText = "Add Product";

      let renderProduct = productList.filter(
        (product) => product.location === trLocationId
      );

      handleRender(renderProduct);
    }
  } else {
    productList.splice(index, 1);
    localStorage.setItem("product-list", JSON.stringify(productList));

    let renderProduct = productList.filter(
      (product) => product.location === trLocationId
    );

    handleRender(renderProduct);
  }
}

function handleTableBtn(e) {
  e.preventDefault();
  let target = e.target;

  if (target.classList.contains("btn-delete")) {
    handleDeleteItem(target);
  } else if (target.classList.contains("btn-edit")) {
    handleEditItem(target);
  }
}

//
// ------------------------Add Event------------------------
addBtn.addEventListener("click", addNewProduct);
tableElement.addEventListener("click", handleTableBtn);

navLinkAll.forEach((link) => {
  link.addEventListener("click", handleTabClick);
});

//
// ------------------------Render Default------------------------
const defaultTab = navLinkAll[0].getAttribute("data-tab");
const defaultProducts = getProductInfo(defaultTab);
handleRender(defaultProducts);

//
// ------------------------Search Product------------------------
const selectSearch = document.querySelector(".select-search");
const searchProductInput = document.querySelector(".search-product-input");

function searchProduct() {
  let categoryList = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : [];

  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  const tbody = document.querySelector(".style-table-body");

  let searchText = searchProductInput.value.trim().toLowerCase();

  let renderProductObj = [];

  if (selectSearch.value === "1") {
    renderProductObj = productList.filter((product) =>
      product.name.toLowerCase().includes(searchText)
    );
  } else if (selectSearch.value === "2") {
    let filteredCategoriesByName = categoryList.filter((category) =>
      category.name.toLowerCase().includes(searchText)
    );

    renderProductObj = productList.filter((product) =>
      filteredCategoriesByName.some(
        (category) => category.id === product.categoryId
      )
    );
  }

  let render = "";
  console.log(renderProductObj);

  if (renderProductObj.length === 0) {
    render = `<td colspan="5" class="empty-table">Empty product tab list</td>`;
  } else {
    renderProductObj.forEach((item) => {
      render += `<tr data-tab="${item.location}" class="product-obj">
                                <td>${item.name}</td>
                                <td>${item.price}</td>
                                <td>${item.location}</td>
                                <td class="td-img">
                                <img
                                    src="${item.image}"
                                />
                                </td>
                                <td class="td-actions">
                                <button data-id="${item.id}" class="btn-edit custom-edit-btn">Edit</button>
                                <button data-id="${item.id}" class="btn-delete custom-delete-btn">Delete</button>
                                </td>
                            </tr>`;
    });
  }

  tbody.innerHTML = render;
}

searchProductInput.addEventListener("keyup", searchProduct);
