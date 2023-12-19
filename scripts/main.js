"use strict";

import { Stores } from "../data/data.js";

document.addEventListener("DOMContentLoaded", () => {
  const noStoresLayout = document.querySelector(
    ".stores-list-section__no-data-layout"
  );

  if (Stores.length) {
    noStoresLayout.classList.add("js-hidden-element");
  }

  let storesListToAddStr = "";

  Stores.forEach((store) => {
    storesListToAddStr += `
        <div class="stores-list-item">
            <div class="stores-list-item__name-address-wrapper">
                <h3 class="stores-list-item__name-headline">
                    ${store.Name}
                </h3>
                <span class="stores-list-item__address-text"
                    >${store.Address}</span
                >
            </div>
            <div class="stores-list-item__area-data-wrapper">
                <span class="stores-list-item__area-number">${store.FloorArea}</span>
                <span class="stores-list-item__area-unit">sq.m</span>
            </div>
        </div>
        `;
  });

  const storesListSection = document.querySelector(".stores-list-section");

  storesListSection.insertAdjacentHTML("afterbegin", storesListToAddStr);
});
