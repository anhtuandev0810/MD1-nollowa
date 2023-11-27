//
// ------------------Render Product------------------
const navLinkAll = document.querySelectorAll(".tab-link");
const productItemBox = document.querySelector(".shop-container");

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
  let renderProduct = "";

  let maxProducts = 7;
  let productShow = products.slice(0, maxProducts);

  for (let i = 1; i < productShow.length; i++) {
    let item = productShow[i];

    renderProduct += `<div class="collection-item">
        <a href='/shop-product-detail.html?id=${item.id}'><img
          src="${item.image}"
          alt=""
        /></a>

        <div class="collection-item-content">
          <div class="item-description">
            <div class="description-content">
              <p>${item.name}</p>
              <p class="price">${item.price}<span>$</span></p>
            </div>

            <div class="item-btns">
            <span data-id="${item.id}" class="buy btn-hover add-cart-btn"
            ><i class="fa-solid fa-cart-shopping"></i
          > Giỏ hàng</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  let imageSrc = "";
  let render = "";

  if (productShow[0] && productShow[0].image) {
    imageSrc = productShow[0].image;
  }

  if (productShow.length > 0) {
    render = `<div class="main-item groupbanner-hover">
        <a href='/shop-product-detail.html?id=${productShow[0].id}'>
          <img class="banner-hover-img"
          src="${imageSrc}"
          alt="" />
        </a>
      </div>
  
      <div class="item-box tab-content">
        ${renderProduct}
      </div>`;
  } else {
    render = `<p class="empty-item">Sản phẩm đang được cập nhật thêm...</p>`;
  }

  productItemBox.innerHTML = render;
}

navLinkAll.forEach((navLink) => {
  navLink.addEventListener("click", handleTabClick);
});

const defaultTab = navLinkAll[0].getAttribute("data-tab");
const defaultProducts = getProductInfo(defaultTab);
handleRender(defaultProducts);

//
// ------------------Add To Cart------------------
const productBox = document.querySelector(".tab-content");

function addToCart(target) {
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

//
// ------------------Render Main Bottom------------------
const scaleFigureTitle = document.querySelector(".main-middle-title");
const scaleFigureBox = document.querySelector(".main-bottom-flexbox");

function rederMainBottom() {
  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  let scaleFigureMaxItem = 12;

  let tabId = scaleFigureTitle.getAttribute("data-tab");

  let productTabList = productList.filter((item) => item.location === tabId);

  let producRender = productTabList.slice(0, scaleFigureMaxItem);

  let render = "";

  producRender.forEach((item) => {
    render += `<div class="main-bottom-item">
        <img data-id="${item.id}" src="${item.image}" alt="">

        <div class="description-content">
          <p>${item.name}</p>
          <p class="price"><span>${item.price}</span>$</p>
        </div>
      </div>`;
  });

  scaleFigureBox.innerHTML = render;

  const toProducDetail = document.querySelectorAll(".main-bottom-item img");

  toProducDetail.forEach((item) => {
    item.addEventListener("click", (e) => {
      let target = e.target;

      let itemId = target.getAttribute("data-id");

      window.location.href = `/shop-product-detail.html?id=${itemId}`;
    });
  });
}

function productBtnControll(e) {
  let target = e.target;

  if (target.classList.contains("add-cart-btn")) {
    e.preventDefault();
    addToCart(target);
  }
}

productBox.addEventListener("click", productBtnControll);
rederMainBottom();
