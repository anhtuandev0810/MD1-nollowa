function getUserInfo() {
  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  let activeUser = users.find((user) => user.status === "active");

  return activeUser;
}

const dropDownMenu = document.querySelector(".mini-cart");

function dropDownCartRender() {
  let cartItems = localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : {};

  let cartUserItem;

  for (let key in cartItems) {
    if (getUserInfo() && key === getUserInfo().id) {
      cartUserItem = cartItems[key];
    }
  }

  let render = `<span class="count-holder">
                <div class="count">0</div>
                </span>
                <p class="cart-hover">
                <a href="login.html"
                    ><span><i class="fas fa-shopping-cart"></i></span
                ></a>
                </p>

                <div class="drop-down-cart show-cart">
                <p class="cart-name">GIỎ HÀNG</p>

                <ul class="cart-items-box">
                    
                </ul>

                <div class="drop-down-bottom">
                    <div class="total-price">
                    <p>TỔNG TIỀN :</p>
                    <p class="mini-cart-total-price"><span>0</span>$</p>
                    </div>
                    <div class="cart-btn-controll">
                      <span class="shop-cart-btn">
                        <a href="shop-cart.html">Xem giỏ hàng</a>
                      </span>
                      <span class="check-out-btn">
                        <a href="checkout.html">Thanh toán</a>
                      </span>
                    </div>
                </div>
                </div>`;

  let renderLi = "";

  if (getUserInfo() && cartUserItem) {
    // let cartCount = cartUserItem.reduce((total, item) => {
    //   return total + parseInt(item.quantity);
    // }, 0);

    let cartCount = cartUserItem.length;

    let totalPrice = cartUserItem.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    cartUserItem.forEach((item) => {
      renderLi += ` <li class="cart-item">
                <a href="shop-cart.html"
                ><img
                    src="${item.image}"
                    alt=""
                /></a>
    
                <div class="cart-product-content">
                <div class="mini-cart-name">
                    <a href="shop-cart.html"
                    ><p>${item.name}</p></a
                    >
                </div>
    
                <div class="mini-cart-count">
                    <span class="mini-cart-quantity">${item.quantity}</span>
                    <span>X</span>
                    <p>
                    <span class="mini-cart-price">${item.price}</span>đ
                    </p>
                </div>
                </div>
    
                <div class="delete-mini-cart">
                <span data-id="${item.id}" class="btn-delete-cart"
                    ><i class="fas fa-times"></i
                ></span>
                </div>
            </li>`;

      render = `<span class="count-holder">
            <div class="count">${cartCount}</div>
            </span>
            <p class="cart-hover mini-cart-icon">
            <span><i class="fas fa-shopping-cart"></i></span
            >
            </p>
    
            <div class="drop-down-cart show-cart">
            <p class="cart-name">GIỎ HÀNG</p>
    
            <ul class="cart-items-box">
                ${renderLi}
            </ul>
    
            <div class="drop-down-bottom">
                <div class="total-price">
                <p>TỔNG TIỀN :</p>
                <p class="mini-cart-total-price"><span>${totalPrice}</span>$</p>
                </div>
                <div class="cart-btn-controll">
                <span class="shop-cart-btn">
                  <a href="shop-cart.html">Xem giỏ hàng</a>
                </span>
                <span class="check-out-btn">
                  <a href="checkout.html">Thanh toán</a>
                </span>
                </div>
            </div>
            </div>`;
    });
  }

  dropDownMenu.innerHTML = render;
}

function deleteDropDownItem(e) {
  let cartItems = localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items"))
    : {};

  e.preventDefault();

  let target = e.target;

  let cartUserItem;

  for (let key in cartItems) {
    if (key === getUserInfo().id) {
      cartUserItem = cartItems[key];
    }
  }

  if (target.classList.contains("btn-delete-cart")) {
    let deleteId = target.getAttribute("data-id");
    let index = cartUserItem.findIndex((item) => item.id === deleteId);

    cartUserItem.splice(index, 1);
  } else if (target.classList.contains("shop-cart-btn")) {
    window.location.href = "/shop-cart.html";
  } else if (target.classList.contains("check-out-btn")) {
    window.location.href = "/checkout.html";
  }

  localStorage.setItem("cart-items", JSON.stringify(cartItems));
  dropDownCartRender();
}

dropDownMenu.addEventListener("click", deleteDropDownItem);
window.addEventListener("load", dropDownCartRender);
