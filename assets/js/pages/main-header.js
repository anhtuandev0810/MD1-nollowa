//
//---------------------Placeholder---------------------

let i = 0;
const text = "Nhập tên sản phẩm cần tìm...";

function placeholderMove() {
  const searchDefault = document.querySelectorAll(".search-input");

  const speed = 100;
  const placeholder = text.slice(0, i + 1);

  searchDefault.forEach((item) => (item.placeholder = placeholder));

  if (i === text.length + 15) {
    i = 0;
  } else {
    i++;
  }

  setTimeout(placeholderMove, speed);
}

placeholderMove();

//
//---------------------Slider---------------------
const bannerContainer = document.querySelector(".banner-container");
const sliderImageBox = document.querySelector(".slider-image-box");
const imageItems = sliderImageBox.querySelectorAll(".slide-item");
const listBtn = bannerContainer.querySelectorAll(".banner-container ul li");
listBtn.forEach((item, i) => (item.dataset.id = i));

let active = 0;
let slideItemsLength = imageItems.length - 1;
let imageWidth = 100;

function next() {
  if (active + 1 > slideItemsLength) {
    active = 0;
  } else {
    active += 1;
  }

  listBtn.forEach((item) => item.classList.remove("active"));

  listBtn[active].classList.add("active");

  sliderImageBox.style.transform = `translateX(-${imageWidth * active}%)`;
}

function prev() {
  if (active === 0) {
    active = slideItemsLength;
  } else {
    active -= 1;
  }

  listBtn.forEach((item) => item.classList.remove("active"));

  listBtn[active].classList.add("active");

  sliderImageBox.style.transform = `translateX(-${imageWidth * active}%)`;
}

let interval = setInterval(next, 5000);
function handleSlider(e) {
  target = e.target;

  if (target.classList.contains("next")) {
    next();
  } else if (target.classList.contains("prev")) {
    prev();
  } else if (target.classList.contains("slide-list")) {
    active = +target.getAttribute("data-id");

    listBtn.forEach((item) => item.classList.remove("active"));
    listBtn[active].classList.add("active");

    sliderImageBox.style.transform = `translateX(-${imageWidth * active}%)`;
  }

  clearInterval(interval);
  interval = setInterval(next, 5000);
}

bannerContainer.addEventListener("click", handleSlider);

//
//---------------------Toggle Nav---------------------
const toggleNav = document.querySelector(".toggle-nav");
const popupNav = document.querySelector(".popup-nav");

function handlePopupNav(e) {
  let target = e.target;

  console.log(target);
  if (target.classList.contains("fa-bars")) {
    target.style.display = "none";
    toggleNav.querySelector(".fa-xmark").style.display = "inline-block";
    popupNav.style.transform = "translateX(0)";
  } else if (target.classList.contains("fa-xmark")) {
    target.style.display = "none";
    toggleNav.querySelector(".fa-bars").style.display = "inline-block";
    popupNav.style.transform = "translateX(-110%)";
  }
}

toggleNav.addEventListener("click", handlePopupNav);

//
//---------------------Sticky Nav---------------------
const stickyNavBox = document.querySelector(".stiky-nav");
const navTop = document.querySelector(".main-header-middle").offsetTop;
const fixedCart = document.querySelector(".mini-cart");
const fixedUserIcon = document.querySelector(".login-content");

function handleSticky() {
  if (window.scrollY >= navTop + 200) {
    stickyNavBox.classList.add("fixed");
    fixedCart.classList.add("mini-cart-fixed");
    fixedUserIcon.classList.add("login-content-fixed");
  } else {
    stickyNavBox.classList.remove("fixed");
    fixedCart.classList.remove("mini-cart-fixed");
    fixedUserIcon.classList.remove("login-content-fixed");
  }
}

window.addEventListener("scroll", handleSticky);

//
//---------------------Search---------------------
const searchDefault = document.querySelector(".search-default .search-input");
const renderSearchBox = document.querySelector(".render-search-box");

function controllSearch(input, dropdown) {
  let productList = localStorage.getItem("product-list")
    ? JSON.parse(localStorage.getItem("product-list"))
    : [];

  input.addEventListener("keyup", () => {
    let compareInputValue = input.value.trim().toLowerCase();

    if (compareInputValue.length > 0) {
      dropdown.parentElement.style.display = "block";

      let renderProducts = productList.filter((item) => {
        return item.name.trim().toLowerCase().includes(compareInputValue);
      });

      let render = "";

      renderProducts.forEach((item) => {
        render += `<li class="render-search-item">
     <div class="search-item-img">
       <a href="/shop-product-detail.html?id=${item.id}">
         <img src="${item.image}" alt="">
       </a>
     </div>

     <div class="search-item-content">
      <a href="/shop-product-detail.html?id=${item.id}">
        <p class="search-item-title">
         ${item.name}
       </p>
      </a>
     <div class="search-item-price">
         <p class="search-price">123 <span>vnđ</span></p>
       </div>
     </div>
   </li>`;
      });

      dropdown.innerHTML = render;
    } else {
      dropdown.parentElement.style.display = "none";
    }
  });
}

controllSearch(searchDefault, renderSearchBox);

let arr = [4, 2, 9, 5, 1];
let newArr = [];

for (let i = 0; i < arr.length - 1; i++) {
  for (let j = 0; j < arr.length - i; j++) {
    if (arr[j] > arr[j + 1]) {
      let change = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = change;
    }
  }
}

console.log(arr);
