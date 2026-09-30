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

      <a class="saeson-kort" href="produktliste.html?season=${saeson.season}">

        <img src="img/${saeson.season}.png" alt="${saeson.season}">

        <div class="saeson-tekst">
          <h3>${saeson.season}</h3>
        </div>

      </a>

    `;
  });

  saesonList.innerHTML = myInnerHTML;
}
