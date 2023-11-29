const productDetailImg = document.querySelector("#product_img");
const productDetailName = document.querySelector(".product_title");
const productDetailPrice = document.querySelector(".product_price .price");
const productDetailCategory = document.querySelector(".product-meta");
const productDetailDes = document.querySelector("#Description");
const cartExtra = document.querySelector(".cart_extra");

const defaultProducts = JSON.parse(localStorage.getItem("default-products"));
console.log(defaultProducts);
const defaultCategory = JSON.parse(localStorage.getItem("default-category"));
console.log(defaultCategory);
// const defaultCategory = [
//   {
//     categoryId: crypto.randomUUID(),
//     name: "Default Products"
//   }
// ];


function getProductId() {
  let arrParam = document.location.search.split("=");

  return arrParam[1];
}
console.log(getProductId());

function renderProductDetail() {
  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : defaultProducts;

  let categories = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : defaultCategory;
  
  let product = productList.find((item) => item.id.toString() === getProductId());
  console.log(product);
  let productCategory = categories?.find(
    (item) => product.categoryId === item.categoryId
  );

  productDetailImg.src = product.image;
  productDetailName.innerHTML = `<a href="#">${product.name}</a>`;
  productDetailPrice.innerText = `${product.price}$`;
  productDetailCategory.innerHTML = `<li>Category: <a href="#">${productCategory.name}</a></li>`;
  productDetailDes.innerHTML = `<p>${product.description}</p>`;
}

function productDetailPlus(target) {
  let parentElement = target.closest(".cart_extra");

  let quantityInput = parentElement.querySelector('input[name="quantity"]');

  quantityInput.value++;
}

function productDetailMinus(target) {
  let parentElement = target.closest(".cart_extra");

  let quantityInput = parentElement.querySelector('input[name="quantity"]');

  if (quantityInput.value > 1) {
    quantityInput.value--;
  }
}

function updateCart(target) {
  let cartItems = localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : {};

  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  let parentElement = target.closest(".cart_extra");

  let quantityInput = parentElement.querySelector('input[name="quantity"]');

  if (getUserInfo()) {
    let index = productList.findIndex((item) => item.id === getProductId());
    let activeUserId = getUserInfo().id;

    cartItems[activeUserId] = cartItems[activeUserId]
      ? cartItems[activeUserId]
      : [];

    let existingProduct = cartItems[activeUserId].find(
      (item) => item.id === productList[index].id
    );

    if (existingProduct) {
      existingProduct.quantity =
        +existingProduct.quantity + +quantityInput.value;
    } else {
      cartItems[activeUserId].push({
        id: productList[index].id,
        name: productList[index].name,
        price: productList[index].price,
        image: productList[index].image,
        quantity: quantityInput.value,
      });
    }

    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    dropDownCartRender();
  } else {
    window.location.href = "/login.html";
  }
}

function quantityControll(e) {
  let target = e.target;

  if (target.classList.contains("plus")) {
    productDetailPlus(target);
  } else if (target.classList.contains("minus")) {
    productDetailMinus(target);
  } else if (target.classList.contains("btn-addtocart")) {
    updateCart(target);
  }
}

renderProductDetail();
cartExtra.addEventListener("click", quantityControll);
