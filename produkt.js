"use strict";
const params = new URLSearchParams(window.location.search);
const selectedID = params.get("id");

const detailURL = `https://kea-alt-del.dk/t7/api/products/${selectedID}`;
const produktIndhold = document.querySelector(".produktIndhold");

function loadData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
}

function showDetails(detail) {
  console.log("detail", detail);

  produktIndhold.innerHTML = `
    <div class="detalje-grid">
      <img class="produkt-billede stor"
           src="https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp"
           alt="${detail.productdisplayname}">
      <article class="produkt-detaljer">
        <p>${detail.brandname} - ${detail.articletype}</p>
        <h1>${detail.productdisplayname}</h1>
        <strong>${detail.discount ? getDiscountPrice(detail.price, detail.discount) : detail.price} kr.</strong>
        <button class="knap">Vælg størrelse</button>
      </article>
    </div>`;

  // Tilbage-linket går til produktets sæson
  document.querySelector(".tilbage").href = `produktliste.html?season=${detail.season}`;
}

function getDiscountPrice(originalPrice, discount) {
  return Math.round((originalPrice * (100 - discount)) / 100);
}

loadData(detailURL);
