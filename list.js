"use strict";
const param = new URLSearchParams(window.location.search);
const selectedSeason = param.get("season");
console.log("selectedSeason", selectedSeason);

const productUrl = `https://kea-alt-del.dk/t7/api/products?season=${selectedSeason}`;
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
    listKollektion.innerHTML += `<article class="produkt-kort ${product.soldout ? "udsolgt" : ""}">
      <div class="produkt-billede">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Billede af ${product.productdisplayname}" />
        <div class="labels">
          ${product.discount ? `<span class="tilbud-label">-${product.discount}%</span>` : ""}
          ${product.soldout ? `<span class="udsolgt-label">Udsolgt</span>` : ""}
        </div>
      </div>
      <h3>${product.productdisplayname}</h3>
      <p>${product.brandname} - ${product.category}</p>
      <div class="pris">
        ${
          product.discount
            ? `<p class="gammel-pris">${product.price} kr</p>
               <p class="tilbuds-pris">${getDiscountPrice(product.price, product.discount)} kr</p>`
            : `<p>${product.price} kr</p>`
        }
      </div>
            <p><a class="laes-mere" href="produkt.html?id=${product.id}">Læs mere</a></p>
    </article>`;
  });
}

function getDiscountPrice(originalPrice, discount) {
  return Math.round((originalPrice * (100 - discount)) / 100);
}

getData(productUrl);
