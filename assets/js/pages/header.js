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
//---------------------Toggle Nav---------------------
const toggleNav = document.querySelector(".toggle-nav");
const popupNav = document.querySelector(".popup-nav");
const wrapperHeader = document.querySelector(".wrapper-header");
const navHome = document.querySelectorAll(".list-item");

function handlePopupNav(e) {
  let target = e.target;

  if (target.classList.contains("fa-bars")) {
    target.style.display = "none";
    toggleNav.querySelector(".fa-times").style.display = "inline-block";
    popupNav.style.transform = "translateX(0)";
  } else if (target.classList.contains("fa-times")) {
    target.style.display = "none";
    toggleNav.querySelector(".fa-bars").style.display = "inline-block";
    popupNav.style.transform = "translateX(-110%)";
  }
}

function headerLocation(e) {
  let target = e.target;

  if (target.classList.contains("top-logo")) {
    window.location.href = "/index.html";
  }
}

toggleNav.addEventListener("click", handlePopupNav);
wrapperHeader.addEventListener("click", headerLocation);
navHome[0].addEventListener(
  "click",
  () => (window.location.href = "/index.html")
);
navHome[1].addEventListener(
  "click",
  () => (window.location.href = "/category.html")
);

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
