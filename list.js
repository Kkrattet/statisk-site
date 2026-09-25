"use strict";

const productUrl = "https://kea-alt-del.dk/t7/api/products";
const listKollektion = document.querySelector(".produkt-grid");

function getData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showProducts(data);
    });
  });
}
function showProducts(products) {
  console.log("first product", products[0]);
  console.log("Number of products", products.length);

  listKollektion.innerHTML = "";

  products.forEach((product) => {
    listKollektion.innerHTML += `<article class="produkt-kort foraar ${product.soldout ? "soldout" : ""}">
    <a href="produkt.html">
        <div class="produkt-billede">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Billede af ${product.productdisplayname}"/>        
            <h3>${product.productdisplayname}</h3>
            <p>${product.brandname} - ${product.category}</p> 
        </div>
        <p>${product.price}</p>
        <p class="soldout_tag">Sold Out</p>
    </a>
    </article>`;
  });
}

getData(productUrl);
