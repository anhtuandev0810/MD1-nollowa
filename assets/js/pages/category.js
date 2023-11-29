const categoryBox = document.querySelector(".tab-category");
const productContainer = document.querySelector(".shop-container");
const defaultProducts = [
  {
    categoryId: crypto.randomUUID(),
    description: 'BAC',
    id: crypto.randomUUID(),
    image: '',
    location: 'new-arrival',
    name: '',
    price: '1222'
  },
  {
    categoryId: crypto.randomUUID(),
    description: 'BAC',
    id: crypto.randomUUID(),
    image: '',
    location: 'new-arrival',
    name: '',
    price: '1222'
  },
  {
    categoryId: crypto.randomUUID(),
    description: 'BAC',
    id: crypto.randomUUID(),
    image: '',
    location: 'new-arrival',
    name: '',
    price: '1222'
  },
  {
    categoryId: crypto.randomUUID(),
    description: 'BAC',
    id: crypto.randomUUID(),
    image: '',
    location: 'new-arrival',
    name: '',
    price: '1222'
  },
  {
    categoryId: crypto.randomUUID(),
    description: 'BAC',
    id: crypto.randomUUID(),
    image: '',
    location: 'new-arrival',
    name: '',
    price: '1222'
  }

];

function showCategory() {
  let categories = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : defaultProducts;

  let render = "";
  
  categories.forEach((item) => {
    render += `<li class="tab-link categories_name" category-id="${item.id}">
                    ${item.name}
                </li>`;
  });

  categoryBox.innerHTML = render;
}

//
// ----------------------Pagination & Render Category----------------------
const pageNumberBox = document.querySelector(".render-pagination");

let activePage = 1;
let pageMaxItem = 6;
let pageItems;

function getPageTotalItem(target) {
  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  let categoryId = target.getAttribute("category-id");

  let categoryListById = productList.filter(
    (item) => item.categoryId === categoryId
  );

  pageItems = categoryListById;

  renderPageNMumber();

  if (categoryListById.length > 0) {
    activePage = 1;
    document.querySelector(".page-link").click();
  } else {
    productContainer.innerHTML = `<h1 class="empty-item">Sản phẩm đang được cập nhật, xin lỗi vì sự bất tiện này!</h1>`;
  }
}

function renderPageNMumber() {
  let render = "";
  let totalPage = Math.ceil(pageItems.length / pageMaxItem);

  for (let i = 1; i <= totalPage; i++) {
    let activeClass = i === activePage ? "active" : "";

    render += `<li class="page-item ${activeClass}">
                <a class="page-link" href="#">${i}</a>
              </li>`;
  }

  pageNumberBox.innerHTML = render;
}

function renderItemByPage(e) {
  e.preventDefault();

  let target = e.target;

  if (target.classList.contains("page-link")) {
    document.querySelectorAll(".page-item").forEach((item) => {
      item.classList.remove("active");
    });
    target.parentElement.classList.add("active");

    activePage = parseInt(target.innerText);

    let startIndex = (activePage - 1) * pageMaxItem;
    let endIndex = activePage * pageMaxItem - 1;
    let render = "";

    for (let i = startIndex; i < pageItems.length && i <= endIndex; i++) {
      let item = pageItems[i];

      render += `<div class="col-md-4 col-6">
       <div class="product my-product">
         <div class="product-img">
           <a href="shop-product-detail.html?id=${item.id}">
             <img
               src="${item.image}"
               alt="product_img1"
             />
           </a>
         </div>
         <div class="product_info">
           <h6 class="product_title">
             <a href="shop-product-detail.html?id=${item.id}">${item.name}</a>
           </h6>
           <div class="product_price">
             <span class="price">${item.price}$</span>
           </div>

           <div class="buy btn-hover">
             <p data-id="${item.id}" class="category-add-btn"}>
               <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
               hàng
             </p>
           </div>

           <div class="pr_desc">
             <p>${item.description}</p>
           </div>
         </div>
       </div>
     </div>`;
    }

    productContainer.innerHTML = render;
  }
}

function categoryAddToCart(target) {
  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  let cartItems = localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : {};

  if (getUserInfo()) {
    let addCardId = target.getAttribute("data-id");
    let index = productList.findIndex((item) => item.id === addCardId);
    let activeUserId = getUserInfo().id;

    cartItems[activeUserId] = cartItems[activeUserId]
      ? cartItems[activeUserId]
      : [];

    let existingProduct = cartItems[activeUserId].find(
      (item) => item.id === productList[index].id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems[activeUserId].push({
        id: productList[index].id,
        name: productList[index].name,
        price: productList[index].price,
        image: productList[index].image,
        quantity: 1,
      });
    }
  } else {
    window.location.href = "/login.html";
  }

  localStorage.setItem("cart-items", JSON.stringify(cartItems));
  dropDownCartRender();
}

function controllCategoryTab(e) {
  e.preventDefault();

  let target = e.target;

  if (target.classList.contains("categories_name")) {
    getPageTotalItem(target);
  }
}

function categoryAddToCartCotroll(e) {
  let target = e.target;

  if (target.classList.contains("category-add-btn")) {
    categoryAddToCart(target);
  }
}

showCategory();
categoryBox.addEventListener("click", controllCategoryTab);
pageNumberBox.addEventListener("click", renderItemByPage);
categoryBox.querySelector(".categories_name").click();
productContainer.addEventListener("click", categoryAddToCartCotroll);
