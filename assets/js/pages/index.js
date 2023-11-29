//
//---------------------Main Bottom Slide Button----------------------
const mainBottomBox = document.querySelector(".main-bottom-flexbox");
const mainBottomItems = document.querySelectorAll(".main-bottom-item");
const bottomSlideNextBtn = document.querySelector(".main-bottom-slide-nextbtn");
const bottomSlidePrevBtn = document.querySelector(".main-bottom-slide-prevbtn");

let slideLength = mainBottomItems.length - 1;
let index = 0;
let bottomSlideItemWidth = 385;

mainBottomItems.forEach((item) => {
  let rect = item.getBoundingClientRect();
  // console.log(rect.left / 12);
});

if (index === slideLength - 2) {
  bottomSlideNextBtn.style.display = "none";
}

function handleSlideNextItem() {
  index + 1 > slideLength - 2 ? (index = slideLength - 1) : (index += 1);

  mainBottomBox.style.transform = `translateX(-${
    bottomSlideItemWidth * index
  }px)`;
}

function handleSlidePrevItem() {
  index > 0 ? (index -= 1) : (index = 0);

  mainBottomBox.style.transform = `translateX(-${
    bottomSlideItemWidth * index
  }px)`;
}

bottomSlidePrevBtn.addEventListener("click", handleSlidePrevItem);
bottomSlideNextBtn.addEventListener("click", handleSlideNextItem);



document.getElementById("fb").scrollIntoView();
document.getElementById("ig").scrollIntoView();
document.getElementById("yt").scrollIntoView();