"use strict";

const productUrl = "https://kea-alt-del.dk/t7/api/seasons";

const saesonList = document.querySelector(".saeson-grid");

getData();

function getData() {
  fetch(productUrl).then((result) => result.json().then((data) => showData(data)));
}

function showData(data) {
  saesonList.innerHTML = "";

  let myInnerHTML = "";

  data.forEach((saeson) => {
    console.log(saeson.season);

    myInnerHTML += `

      <a href="produktliste.html">

        <article class="saeson-kort">

          <img src="img/${saeson.season}.png" alt="${saeson.season}">

        </article>

      </a>

    `;
  });

  saesonList.innerHTML = myInnerHTML;
}
