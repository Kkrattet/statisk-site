"use strict";
const param = new URLSearchParams(window.location.search);
const selectedSeason = param.get("season");
console.log("selectedSeason", selectedSeason);

const listKollektion = document.querySelector(".produkt-grid");
const overskrift = document.querySelector(".kollektion h1");
const seasonButtons = document.querySelectorAll(".filter_season_buttons_container .list_button");

// Hvert klik på en sæsonknap viser kun den sæsons tøj
seasonButtons.forEach((button) => {
  button.addEventListener("click", () => showSeason(button.dataset.season));
});

function showSeason(season) {
  // Overskrift og farver skifter til den valgte sæson
  overskrift.textContent = season;
  document.body.classList.remove("Summer", "Fall", "Winter", "Spring");
  document.body.classList.add(season);

  // Knappen for den aktive sæson skjules, så de tre andre står tilbage
  seasonButtons.forEach((button) => {
    button.classList.toggle("skjult", button.dataset.season === season);
  });

  // tilbage-knappen
  history.replaceState(null, "", `produktliste.html?season=${season}`);

  getData(`https://kea-alt-del.dk/t7/api/products?season=${season}`);
}

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

// Hvis der er valgt en sæson i URL'en, vises den. Ellers vises alle produkter.
if (selectedSeason === null) {
  getData("https://kea-alt-del.dk/t7/api/products?limit=30");
} else {
  showSeason(selectedSeason);
}
