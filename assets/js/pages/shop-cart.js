const cartTbody = document.querySelector(".cart-tbody");
const updateTotalPrice = document.querySelector(".btn-update-cart");
const cartTotalAmount = document.querySelector(".cart-item-total-amount");
const completed = document.querySelector(".to-completed");

function renderShopCart() {
  let cartItems = localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : {};

  if (getUserInfo()) {
    let cartUserItem;

    for (let key in cartItems) {
      cartUserItem = key === getUserInfo().id ? cartItems[key] : [];
    }

    let render = "";

    cartUserItem.forEach((item) => {
      render += `<tr data-id="${item.id}">
                <td class="product-thumbnail">
                <a href="/shop-product-detail.html?id=${item.id}"
                    ><img
                    src="${item.image}"
                    alt="product1"
                /></a>
                </td>
                <td class="product-name" data-title="Product">
                <a href="/shop-product-detail.html?id=${item.id}">${
        item.name
      }</a>
                </td>
                <td class="product-price" data-title="Price"><span class="card-item-price">${
                  item.price
                }</span> $</td>
                <td class="product-quantity" data-title="Quantity">
                <div class="quantity">
                    <input type="button" value="-" class="minus" />
                    <input
                    type="text"
                    name="quantity"
                    value="${item.quantity}"
                    title="Qty"
                    class="qty"
                    size="4"
                    />
                    <input type="button" value="+" class="plus" />
                </div>
                </td>
                <td class="product-subtotal" data-title="Total">
                  <span class="card-total-price">${
                    +item.quantity * +item.price
                  }</span> $
                </td>
                <td class="product-remove" data-title="Remove">
                <a href="#"><i data-id=${
                  item.id
                } class="ti-close delete-card"></i></a>
                </td>
            </tr>`;
    });

    cartTbody.innerHTML = render;
  }
}

function plusitems(target) {
  let cartItems = localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : {};

  if (getUserInfo()) {
    let cartUserItem;

    for (let key in cartItems) {
      cartUserItem = key === getUserInfo().id ? cartItems[key] : [];
    }

    let parentElement = target.closest("tr");

    let itemId = parentElement.getAttribute("data-id");
    let item = cartUserItem.find((item) => itemId === item.id.toString());

    let itemQuantity = parentElement.querySelector('input[name="quantity"]');

    let cardItemPrice =
      +parentElement.querySelector(".card-item-price").innerText;

    item.quantity++;
    itemQuantity.value = item.quantity;

    parentElement.querySelector(".card-total-price").innerText =
      item.quantity * cardItemPrice;

    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    renderShopCart();
    dropDownCartRender();
  }
}

function minusItems(target) {
  let cartItems = localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : {};

  if (getUserInfo()) {
    let cartUserItem;

    for (let key in cartItems) {
      cartUserItem = key === getUserInfo().id ? cartItems[key] : [];
    }

    let parentElement = target.closest("tr");

    let itemId = parentElement.getAttribute("data-id");
    let item = cartUserItem.find((item) => itemId === item.id);

    let itemQuantity = parentElement.querySelector('input[name="quantity"]');

    let cardItemPrice =
      +parentElement.querySelector(".card-item-price").innerText;

    if (itemQuantity.value > 1) {
      item.quantity--;
      itemQuantity.value = item.quantity;

      parentElement.querySelector(".card-total-price").innerText =
        item.quantity * cardItemPrice;
    }

    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    renderShopCart();
    dropDownCartRender();
  }
}

function removeCartItem(target) {
  if (confirm("Bạn chắc chắn muốn xóa sản phẩm?")) {
    let cartItems = localStorage.getItem("cart-items")
      ? JSON.parse(localStorage.getItem("cart-items"))
      : {};

    if (getUserInfo()) {
      let cartUserItem;

      for (let key in cartItems) {
        cartUserItem = key === getUserInfo().id ? cartItems[key] : [];
      }

      let parentElement = target.closest("tr");

      let itemId = parentElement.getAttribute("data-id");
      let index = cartUserItem.findIndex((item) => itemId === item.id);

      cartUserItem.splice(index, 1);

      localStorage.setItem("cart-items", JSON.stringify(cartItems));
      renderShopCart();
      dropDownCartRender();
    }
  }
}

function setInitTotal() {
  const cartTotalPrice = document.querySelectorAll(".card-total-price");

  cartTotalAmount.innerText = [...cartTotalPrice].reduce((total, item) => {
    return total + +item.innerText;
  }, 0);
}

function updateCardTotalPrice(e) {
  let target = e.target;

  let cartItems = localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : {};

  if (getUserInfo()) {
    let cartUserItem;

    for (let key in cartItems) {
      cartUserItem = key === getUserInfo().id ? cartItems[key] : [];
    }

    cartTotalAmount.innerText = cartUserItem.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  }
}

function toCompleted(e) {
  e.preventDefault();

  let target = e.target;

  let cartItems = localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : {};

  const payError = document.querySelector(".pay-error");

  if (getUserInfo()) {
    let cartUserItem;

    for (let key in cartItems) {
      cartUserItem = key === getUserInfo().id ? cartItems[key] : [];
    }

    if (cartUserItem.length > 0) {
      payError.innerText = "";
      cartUserItem.splice(0, cartUserItem.length);
      window.location.href = "/order-completed.html";
    } else {
      payError.innerText = "Vui lòng chọn sản phẩm trước khi thanh toán";
    }

    localStorage.setItem("cart-items", JSON.stringify(cartItems));
  }
}

function controllQuantity(e) {
  let target = e.target;

  if (target.classList.contains("plus")) {
    plusitems(target);
  } else if (target.classList.contains("minus")) {
    minusItems(target);
  } else if (target.classList.contains("delete-card")) {
    e.preventDefault();
    removeCartItem(target);
  }
}

renderShopCart();
setInitTotal();
cartTbody.addEventListener("click", controllQuantity);
updateTotalPrice.addEventListener("click", updateCardTotalPrice);
completed.addEventListener("click", toCompleted);
