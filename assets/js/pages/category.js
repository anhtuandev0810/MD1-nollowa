const categoryBox = document.querySelector(".tab-category");
const productContainer = document.querySelector(".shop-container");
const defaultProducts = [
  {
    categoryId: 1,
    description: 'BAC',
    id: 0,
    image: 'https://cdn.lotteria.vn/media/catalog/product/m/e/menu_menu_copy_2.jpg',
    location: 'new-arrival',
    name: 'Combo Loty',
    price: '12'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 1,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/2/228350-online_5.png',
    location: 'new-arrival',
    name: 'Combo Double Cheese',
    price: '15'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 2,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/2/228786-online_5.png',
    location: 'new-arrival',
    name: 'Gà sốt HS phần',
    price: '22'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 3,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/2/228325-online_5.png',
    location: 'new-arrival',
    name: 'Lody Set',
    price: '23'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 4,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/2/228703-online_5.png',
    location: 'new-arrival',
    name: 'Loking Set',
    price: '24'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 5,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/0/200009-online_5.png',
    location: 'new-arrival',
    name: 'Combo Burger Bulgogi',
    price: '19'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 6,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/2/228785-online_5.png',
    location: 'new-arrival',
    name: 'Gà rán phần',
    price: '1222'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 7,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/2/228329-online_5.png',
    location: 'new-arrival',
    name: 'L4 Set',
    price: '32'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 8,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/2/222288_4.png',
    location: 'new-arrival',
    name: 'Gà sốt đậu (6 miếng)',
    price: '34'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 9,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/1/218680_4.png',
    location: 'new-arrival',
    name: 'Gà sốt phô mai (6 miếng)',
    price: '26'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 10,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/2/228612_4.png',
    location: 'new-arrival',
    name: 'Gà sốt Buffalo (6 miếng)',
    price: '22'
  },
  {
    categoryId: 1,
    description: 'BAC',
    id: 11,
    image: 'https://cdn.lotteria.vn/media/catalog/product/2/2/228380.png',
    location: 'new-arrival',
    name: 'Gà nướng (6 miếng)',
    price: '24'
  },
];



const defaultCategory = [
  {
    categoryId: 1,
    name: "Default Products"
  }
];


function showCategory() {
  let categories = localStorage.getItem("category-list")
    ? JSON.parse(localStorage.getItem("category-list"))
    : defaultCategory;

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
    : defaultProducts;

  let categoryId = target.getAttribute("category-id");

  let categoryListById = productList.filter(
    (item) => item.categoryId === categoryId
  );

  pageItems = categoryListById.length ? categoryListById : defaultProducts;
  renderPageNMumber();
  if (pageItems.length > 0) {
    activePage = 1;
    document.querySelector(".page-link").click();
  } else {
    // productContainer.innerHTML = `<h1 class="empty-item">Sản phẩm đang được cập nhật, xin lỗi vì sự bất tiện này!</h1>`;
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
  localStorage.setItem('default-products', JSON.stringify(defaultProducts));
localStorage.setItem("default-category", JSON.stringify(defaultCategory));
  
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
