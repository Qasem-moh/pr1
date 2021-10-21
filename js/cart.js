let productsList = [];
function product(pNmae, pCategory, pPrice, pRait, pImgPath) {
  this.pNmae = pNmae;
  this.pCategory = pCategory;
  this.pPrice = pPrice;
  this.pRait = pRait;
  this.pImgPath = pImgPath;
  productsList.push(this);
  this.render();
}
function getLocalStorage() {
  let local = JSON.parse(localStorage.getItem("products"));
  productsList = [];
  if (local != null) {
    for (let i = 0; i < local.length; i++) {
      new product(
        local[i].pNmae,
        local[i].pCategory,
        local[i].pPrice,
        local[i].pRait,
        local[i].pImgPath
      );
    }
  }
  let pList = document.getElementsByClassName("plist")[0];
  if (pList.textContent == "") {
    let span = document.createElement("span");
    span.textContent = "Empty Cart";
    span.id = "EmptyCart";
    pList.appendChild(span);

    let checkout = document.getElementById("checkout");
    checkout.setAttribute("disabled", "disabled");
  }
}
function setLocalStorage() {
  localStorage.removeItem("products");
  localStorage.setItem("products", JSON.stringify(productsList));
}
function dleteProduct(elemnt) {
  let local = [];
  for (let i = 0; i < productsList.length; i++) {
    if (i != elemnt) {
      local.push(productsList[i]);
    }
  }
  productsList = local;

  let TotalPrice = document.getElementsByClassName("TotalPrice")[0];
  TotalPrice.textContent = "";
  TotalPrice = document.getElementsByClassName("TotalPrice")[1];
  TotalPrice.textContent = "";
  setLocalStorage();
  let pList = document.getElementsByClassName("plist")[0];
  pList.textContent = "";
  let checkoutInfo = document.getElementById("checkoutInfo");
  checkoutInfo.textContent = "";

  getLocalStorage();
  if (productsList.length == 0) {
    let counter = document.getElementsByClassName("CartCounter")[0];
    counter.textContent = 0;
    counter = document.getElementsByClassName("CartCounter")[1];
    counter.textContent = 0;
    TotalPrice = document.getElementsByClassName("TotalPrice")[0];
    TotalPrice.textContent = 0;
    TotalPrice = document.getElementsByClassName("TotalPrice")[1];
    TotalPrice.textContent = 0;
    let navBarCart = document.getElementById("cart");
    navBarCart.textContent = 0;
  }
}

product.prototype.render = function () {
  let Index = productsList.length - 1;
  let pList = document.getElementsByClassName("plist")[0];
  let product = document.createElement("div");
  product.className = "product";
  let productimgDiv = document.createElement("div");
  productimgDiv.className = "product-img";
  let productIMG = document.createElement("img");
  productIMG.setAttribute("src", this.pImgPath);
  productimgDiv.appendChild(productIMG);
  product.appendChild(productimgDiv);

  let productinfo = document.createElement("div");
  productinfo.className = "product-info";

  let h1 = document.createElement("h1");
  h1.textContent = this.pNmae;
  let h2 = document.createElement("h2");
  h2.textContent = this.pCategory;
  productinfo.appendChild(h1);
  productinfo.appendChild(h2);

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", `isGift${Index}`);
  checkbox.setAttribute("id", `isGift${Index}`);
  productinfo.appendChild(checkbox);

  let checkboxLable = document.createElement("label");
  checkboxLable.textContent = "This is a gift ";
  checkboxLable.setAttribute("for", `isGift${Index}`);
  productinfo.appendChild(checkboxLable);

  productinfo.appendChild(document.createElement("br"));

  let deleteButton = document.createElement("button");
  deleteButton.className = "deletButton";
  let i = document.createElement("i");
  i.className = "fas fa-trash-alt";
  deleteButton.appendChild(i);
  deleteButton.setAttribute("onclick", `dleteProduct(${Index})`);
  productinfo.appendChild(deleteButton);

  let productPrice = document.createElement("div");
  productPrice.className = "product-price";
  let priceSpan = document.createElement("span");
  priceSpan.textContent = this.pPrice;
  productPrice.appendChild(priceSpan);
  let priceSign = document.createElement("span");
  priceSign.textContent = " RS";
  productPrice.appendChild(priceSign);

  product.appendChild(productinfo);

  product.appendChild(productPrice);

  pList.appendChild(product);
  let hr = document.createElement("hr");
  pList.appendChild(hr);

  let checkoutInfo = document.getElementById("checkoutInfo");
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let span = document.createElement("span");
  span.textContent = `${this.pNmae}`;
  td.appendChild(span);
  tr.appendChild(td);
  td = document.createElement("td");
  span = document.createElement("span");
  span.textContent = this.pPrice;
  td.appendChild(span);
  span = document.createElement("span");
  span.textContent = "RS";
  td.appendChild(span);
  tr.appendChild(td);
  checkoutInfo.appendChild(tr);

  let counter = document.getElementsByClassName("CartCounter")[0];
  counter.textContent = Index + 1;
  counter = document.getElementsByClassName("CartCounter")[1];
  counter.textContent = Index + 1;
  let navBarCart = document.getElementById("cart");
  navBarCart.textContent = Index + 1;
  let TotalPrice = document.getElementsByClassName("TotalPrice")[0];
  TotalPrice.textContent = Number(TotalPrice.textContent) + this.pPrice;
  TotalPrice = document.getElementsByClassName("TotalPrice")[1];
  TotalPrice.textContent = Number(TotalPrice.textContent) + this.pPrice;
};
// ! Checkout section
function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}
function CorrectOn() {
  let inputsList = document.getElementsByClassName("input-field");
  let flag = true;
  for (let i = 0; i < inputsList.length; i++) {
    if (inputsList[i].value.length == 0) {
      flag = false;
    }
  }
  let counter = document.getElementsByClassName("CartCounter")[0];
  if (counter.textContent == "" || counter.textContent == "0") {
    flag = false;
  }

  if (flag) {
    document.getElementById("CorectOverlay").style.display = "block";
    setTimeout(function () {
      document.getElementById("CorectOverlay").style.display = "none";
    }, 2000);
    document.getElementById("overlay").style.display = "none";

    let form = document.getElementById("payForm");
    form.reset();

    localStorage.removeItem("products");
    getLocalStorage();
    setTimeout(function () {
      location.reload();
    }, 2100);
  }
}

function CorrectOff() {
  document.getElementById("CorectOverlay").style.display = "none";
}

getLocalStorage();

// ! Payment card Code
var cardDrop = document.getElementById("card-dropdown");
var activeDropdown;
cardDrop.addEventListener("click", function () {
  var node;
  for (var i = 0; i < this.childNodes.length - 1; i++)
    node = this.childNodes[i];
  if (node.className === "dropdown-select") {
    node.classList.add("visible");
    activeDropdown = node;
  }
});

window.onclick = function (e) {
  if (e.target.tagName === "LI" && activeDropdown) {
    if (e.target.innerHTML === "Master Card") {
      document.getElementById("credit-card-image").src =
        "https://dl.dropboxusercontent.com/s/2vbqk5lcpi7hjoc/MasterCard_Logo.svg.png";
      activeDropdown.classList.remove("visible");
      activeDropdown = null;
      e.target.innerHTML = document.getElementById("current-card").innerHTML;
      document.getElementById("current-card").innerHTML = "Master Card";
    } else if (e.target.innerHTML === "American Express") {
      document.getElementById("credit-card-image").src =
        "https://dl.dropboxusercontent.com/s/f5hyn6u05ktql8d/amex-icon-6902.png";
      activeDropdown.classList.remove("visible");
      activeDropdown = null;
      e.target.innerHTML = document.getElementById("current-card").innerHTML;
      document.getElementById("current-card").innerHTML = "American Express";
    } else if (e.target.innerHTML === "Visa") {
      document.getElementById("credit-card-image").src =
        "https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png";
      activeDropdown.classList.remove("visible");
      activeDropdown = null;
      e.target.innerHTML = document.getElementById("current-card").innerHTML;
      document.getElementById("current-card").innerHTML = "Visa";
    }
  } else if (e.target.className !== "dropdown-btn" && activeDropdown) {
    activeDropdown.classList.remove("visible");
    activeDropdown = null;
  }
};
