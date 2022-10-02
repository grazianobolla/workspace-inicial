const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
  const username = localStorage.getItem("username");
  if (username == 'undefined' || username == null) {
    window.location.href = "login.html";
    return;
  }

  addHeader();
})

function addHeader() {
  const nav = `<div class="container"> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarNav"> <ul class="navbar-nav w-100 justify-content-between"> <li class="nav-item"> <a class="nav-link" href="index.html">Inicio</a> </li> <li class="nav-item"> <a class="nav-link" href="categories.html">Categorías</a> </li> <li class="nav-item"> <a class="nav-link active" href="sell.html">Vender</a> </li> <li class="nav-item dropdown"> <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">${localStorage.getItem("username")}</a>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="#" onclick="navMenuActions('cart')">Mi carrito</a></li>
    <li><a class="dropdown-item" href="#" onclick="navMenuActions('profile')">Mi perfil</a></li>
    <li><a class="dropdown-item" href="#" onclick="navMenuActions('logout')">Cerrar sesión</a></li>
  </ul></li></ul></div></div>`;
  document.getElementById("navbarheader").innerHTML = nav;
}

function navMenuActions(action) {
  switch (action) {
    case 'cart':
      window.location = "cart.html";
      break;
    case 'profile':
      window.location = "my-profile.html";
      break;
    case 'logout':
      localStorage.setItem("username", undefined);
      window.location = "login.html";
      break;
  }
}

function redirectCategory(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}

function redirectProduct(id) {
  localStorage.setItem("product-id", id);
  window.location = "product-info.html";
}