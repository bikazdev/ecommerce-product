const $ = document;

const menuBar = $.querySelector(".menubar");
const subMenuClose = $.querySelector(".sb-close");
const menuBtn = $.querySelector(".menu-btn");
const viewSliderClose = $.querySelector(".vw-close");
const viewSlider = $.querySelector(".view-slider");

const mainSliderPhoto = $.querySelector(".main-slider-photo");
const subSliderPhoto = $.querySelectorAll(".sub-slider-photo li");
const viewSliderPhoto = $.querySelector(".vs-main-photo");

const subViewSliderPhoto = $.querySelectorAll(".view-slider ul li");
const prevBtn = $.querySelector(".prev");
const nextBtn = $.querySelector(".next");

const shopBtn = $.querySelector(".shop-btn");
const cartElem = $.querySelector(".cart");
const countShopBtn = shopBtn.querySelector('span')
const countElem = $.querySelector(".count");
const productCount = $.querySelector(".count small");
const addToCartBtn = $.querySelector(".btn button");
const emptyCart = $.querySelector(".empty");

let count = 1;
productCount.innerHTML = count;

countElem.addEventListener("click", (event) => {
  const { target } = event;
  if (target.classList.contains("minus")) {
    count--;
    if (count < 0) {
      count = 0;
    }
    productCount.innerHTML = count;
  }
  if (target.classList.contains("plus")) {
    count++;
    productCount.innerHTML = count;
  }
});

addToCartBtn.addEventListener("click", () => {
  let mtNumber = count * 125.0;
  const isThere = cartElem.querySelector(".product");
  const cartCount = cartElem.querySelector(".cartCount");
  countShopBtn.style.display = 'block'
  if (cartElem.contains(isThere)) {
    const totalPrice = document.querySelector(".mtNumber");
    totalPrice.innerHTML = `$${mtNumber}.00`;
    cartCount.innerHTML = count;
    countShopBtn.innerHTML = cartCount.innerHTML
  } else {
    cartElem.insertAdjacentHTML(
      "beforeend",
      `
      <div class="product">
        <div class="purchased-product">
        <img
        src="./images/image-product-1-thumbnail.jpg"
        alt="product-img" />
        <div class="title-and-price">
        <p>Fall Limited Edition Sneakers</p>
        <span>$125.00 x <span class="cartCount">${count}</span>  <span class="mtNumber">$${mtNumber}.00</span></span>
        </div>
        <span class="delete" onclick="removeProduct(event)"></span>
      </div>
        <button>Checkout</button>
      </div> 
    `
    );
  }

  emptyCart.classList.remove("active");
  cartElem.classList.add("active");
  productCount.innerHTML = 1;
  count = 1;
});

function removeProduct(event) {
  event.target.parentElement.parentElement.remove();
  cartElem.classList.remove("active");
  $.querySelector(".user").style.outline = "";
  emptyCart.classList.add("active");
  countShopBtn.style.display = 'none'
  countShopBtn.innerHTML = ''
}

let numberSlider = Number(
  window
    .getComputedStyle(mainSliderPhoto, null)
    .getPropertyValue("background-image")
    .split("/")
    .pop()
    .split("-")
    .pop()
    .split(".")[0]
);

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  numberSlider--;
  fixCount(numberSlider);
  sliderHandler(mainSliderPhoto, numberSlider);
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  numberSlider++;
  fixCount(numberSlider);
  sliderHandler(mainSliderPhoto, numberSlider);
});

shopBtn.addEventListener("click", () => {
  cartElem.classList.toggle("active");
});

viewSliderPhoto.querySelector(".next").addEventListener("click", () => {
  numberSlider++;
  fixCount(numberSlider);
  sliderHandler(viewSliderPhoto, numberSlider);
});

viewSliderPhoto.querySelector(".prev").addEventListener("click", () => {
  numberSlider--;
  fixCount(numberSlider);
  sliderHandler(viewSliderPhoto, numberSlider);
});

menuBtn.addEventListener("click", () => {
  menuBar.classList.add("active");
});

subMenuClose.addEventListener("click", () => {
  menuBar.classList.remove("active");
});

viewSliderClose.addEventListener("click", () => {
  viewSlider.classList.remove("active");
});

subSliderPhoto.forEach((photo) => {
  photo.addEventListener("click", (event) => {
    const { target } = event;
    let getNumberPhoto = target.src.split("/").pop().split("-")[2];
    sliderHandler(mainSliderPhoto, getNumberPhoto);
  });
});

mainSliderPhoto.addEventListener("click", (e) => {
  const getUrlBg = window
    .getComputedStyle(mainSliderPhoto, null)
    .getPropertyValue("background-image");
  let getNumberPhoto = getUrlBg.split("/").pop().split("-").pop().split(".")[0];
  viewSlider.classList.add("active");
  sliderHandler(viewSliderPhoto, getNumberPhoto);
});

subViewSliderPhoto.forEach((photo) => {
  photo.addEventListener("click", (event) => {
    const { target } = event;
    let getNumberPhoto = target.children[0].src.split("/").pop().split("-")[2];

    sliderHandler(viewSliderPhoto, getNumberPhoto);
  });
});

console.log(shopBtn.children);

function sliderHandler(element, number) {
  element.style.backgroundImage = `url(./images/image-product-${number}.jpg)`;
}

function fixCount() {
  if (numberSlider > 4) {
    numberSlider = 1;
  } else if (numberSlider < 1) {
    numberSlider = 4;
  }
}
