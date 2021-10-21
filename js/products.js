let productsArr = [];
let productsInCart = [];

function product(pNmae, pCategory, pPrice, pRait, pImgPath) {
  this.pNmae = pNmae;
  this.pCategory = pCategory;
  this.pPrice = pPrice;
  this.pRait = pRait;
  this.pImgPath = pImgPath;

  productsArr.push(this);
  this.render();
}

function setLocalStorage() {
  localStorage.setItem("products", JSON.stringify(productsInCart));
}
function getLocalStorage() {
  let local = JSON.parse(localStorage.getItem("products"));
  if (local != null) {
    productsInCart = local;
    let counter = document.getElementById("cart");
    counter.textContent = productsInCart.length;
  }
}

product.prototype.render = function () {
  let allProducts = document.getElementById("all-products");

  let productDiv = document.createElement("div");
  productDiv.className = "product";

  let productIMG = document.createElement("img");
  productIMG.className = "product-img";
  productIMG.src = this.pImgPath;
  productDiv.appendChild(productIMG);
  allProducts.appendChild(productDiv);

  let div = document.createElement("div");

  let productCategory = document.createElement("span");
  productCategory.className = "product-category";
  productCategory.textContent = this.pCategory;
  div.appendChild(productCategory);

  let productName = document.createElement("span");
  productName.className = "product-name";
  productName.textContent = this.pNmae;
  div.appendChild(productName);

  let raitingDiv = document.createElement("div");
  raitingDiv.className = "product-rating";

  let star;
  for (let i = 1; i <= 5; i++) {
    star = document.createElement("span");
    if (i <= this.pRait) {
      star.className = "fa fa-star checked";
    } else {
      star.className = "fa fa-star ";
    }
    raitingDiv.appendChild(star);
  }

  div.appendChild(raitingDiv);
  productDiv.appendChild(div);

  let elwrapper = document.createElement("div");
  elwrapper.className = "el-wrapper";
  elwrapper.setAttribute(
    "onclick",
    `addProductToCart(${productsArr.length - 1})`
  );
  let boxdown = document.createElement("div");
  boxdown.className = "box-down";
  let hbg = document.createElement("div");
  hbg.className = "h-bg";
  let hbginner = document.createElement("div");
  hbginner.className = "h-bg-inner";
  hbg.appendChild(hbginner);
  boxdown.appendChild(hbg);

  let a = document.createElement("a");
  a.className = "cart";
  a.style.cursor = "pointer";
  let priceSpan = document.createElement("span");
  priceSpan.className = "price";
  priceSpan.textContent = `${this.pPrice} RS`;
  let addtocartSpan = document.createElement("span");
  addtocartSpan.className = "add-to-cart";
  let textSpan = document.createElement("span");
  textSpan.className = "txt";
  textSpan.textContent = "Add in cart";

  a.appendChild(priceSpan);
  addtocartSpan.appendChild(textSpan);
  a.appendChild(addtocartSpan);
  boxdown.appendChild(a);
  elwrapper.appendChild(boxdown);
  productDiv.appendChild(elwrapper);
};

let p1 = new product(
  "Colorful bouquet",
  "Flower",
  25,
  5,
  "https://do5ctr7j643mo.cloudfront.net/wp-content/uploads/2017/02/06095857/Maison-des-Fleurs-Box-of-Flowers.jpg"
);
let p2 = new product(
  "lower Vase ",
  "Flower",
  30,
  4,
  "https://cdn.atwilltech.com/flowerdatabase/f/floral-spectacular-flower-vase-VA03507.425.jpg"
);
let p3 = new product(
  "Red roses",
  "Flower",
  15,
  4,
  "http://theluxediary.com/wp-content/uploads/2018/01/Maison-Des-Fleurs_Valentine%C2%B4s-Day_Gift-Idea_6.jpg"
);
let p4 = new product(
  "White orchid",
  "Flower",
  15,
  5,
  "https://nanzandkraft.imgix.net/images/itemVariation/WaterfallOrchidPlant287W-20041714952.jpg"
);
let p5 = new product(
  "Blue orchid",
  "Flower",
  15,
  4,
  "https://www.avasflowers.net/img/prod_img/avasflowers-lavender-orchid-plant.jpg"
);
let p6 = new product(
  "Dish Garden",
  "Flower",
  15,
  4,
  "https://cdn11.bigcommerce.com/s-1pu3v7awq8/images/stencil/1280x1280/products/657/982/1870lz__23118.1544632573.jpg?c=2"
);
let p7 = new product(
  "Red Roses ",
  "Flower",
  15,
  4,
  "https://cdn.shopify.com/s/files/1/1060/3816/products/flowerly-hug_518017b0-5a35-43c0-b701-129a63b12990.jpg?v=1594973545"
);
let p8 = new product(
  "Sunflower Bouquet ",
  "Flower",
  15,
  4,
  "https://www.flowersbyflourish.com/wp-content/uploads/2014/08/Yellows-Bouquet.jpg"
);
let p9 = new product(
  "Floral Harmony Bouquet",
  "Flower",
  15,
  4,
  "https://www.avasflowers.net/img/prod_img/avasflowers-rose-and-carnation-mixed-bouquet_featscat.jpg"
);
let p10 = new product(
  "Country Pumpkin Bouquet",
  "Flower",
  15,
  4,
  "https://www.avasflowers.net/img/prod_img/avasflowers-country-pumpkin-bouquet_featscat.jpg"
);
let p11 = new product(
  "Fabulous Fall Roses",
  "Flower",
  15,
  4,
  "https://www.avasflowers.net/img/prod_img/avasflowers-fabulous-fall-roses_featscat.jpg"
);
let p12 = new product(
  "Fall Expressions Arrangement",
  "Flower",
  15,
  4,
  "https://www.avasflowers.net/img/prod_img/avasflowers-fall-expressions-arrangement_featscat.jpg"
);
let p13 = new product(
  "Peace Lily Plant",
  "Flower",
  15,
  4,
  "https://www.avasflowers.net/img/prod_img/avasflowers-peace-lily-plant_featscat.png"
);
function addProductToCart(index) {
  for (let i = 0; i < productsArr.length; i++) {
    if (i == index) {
      productsInCart.push(productsArr[index]);
      break;
    }
  }
  let counter = document.getElementById("cart");
  counter.textContent = productsInCart.length;
  setLocalStorage();
}
getLocalStorage();
