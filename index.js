"use strict";

const productUrl = "https://kea-alt-del.dk/t7/api/seasons";
const saesoner = document.querySelector(".saeson-grid");

getData();

function getData() {
  fetch(productUrl)
    .then((result) => result.json())
    .then((data) => {
      console.log("API data:", data);
      showData(data);
    })
    .catch((error) => {
      console.error("Der skete en fejl:", error);
    });
}

function showData(data) {
  saesoner.innerHTML = "";
  let myinnerHTML = "";

  data.forEach((saeson) => {
    myinnerHTML += `
      <a href="produktliste.html#foraar">
        <article class="saeson-kort foraar">
          <h3>${saeson.category}</h3>
        </article>
      </a>
    `;
  });

  saesoner.innerHTML = myinnerHTML;
}
