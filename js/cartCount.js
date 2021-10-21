let navBarCart = document.getElementById("cart");
let local = JSON.parse(localStorage.getItem("products"));
if (local != null) {
  navBarCart.textContent = local.length;
} else {
  navBarCart.style.display = "none";
}
