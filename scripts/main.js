"use strict";

import { stores } from "../data/data.js";

function toggleNoStoresLayout() {
  const noStoresLayout = document.querySelector(
    ".stores-list-section__no-data-layout"
  );

  if (stores.length) {
    noStoresLayout.classList.add("js-hidden-element");
  } else {
    noStoresLayout.classList.remove("js-hidden-element");
  }
}

function prepairStoresListForDOM() {
  let storesListToAddStr = "";

  stores.forEach((store) => {
    storesListToAddStr += `
              <div class="stores-list-item" data-store-id=${store.id}>
                  <div class="stores-list-item__name-address-wrapper" data-store-id=${store.id}>
                      <h3 class="stores-list-item__name-headline" data-store-id=${store.id}>
                          ${store.Name}
                      </h3>
                      <span class="stores-list-item__address-text" data-store-id=${store.id}>
                          ${store.Address}
                      </span>
                  </div>
                  <div class="stores-list-item__area-data-wrapper" data-store-id=${store.id}>
                      <span class="stores-list-item__area-number" data-store-id=${store.id}>
                          ${store.FloorArea}
                      </span>
                      <span class="stores-list-item__area-unit" data-store-id=${store.id}>sq.m</span>
                  </div>
              </div>
              `;
  });

  return storesListToAddStr;
}

function addStoresListToDOM() {
  toggleNoStoresLayout();

  const storesListSection = document.querySelector(
    ".stores-list-section__main-layout"
  );

  storesListSection.innerHTML = prepairStoresListForDOM();

  storesListSection.addEventListener("click", (e) => {
    if ("storeId" in e.target.dataset) {
      loadStoreDetailsToDOM(e.target.dataset.storeId);
    }
  });
}

function showStoreDetailsTable() {
  const storeDetailsWrapper = document.querySelector(".store-details-wrapper");
  const noStoreDetailsWrapper = document.querySelector(
    ".no-store-details-wrapper"
  );

  storeDetailsWrapper.classList.add("js-flex-element");
  noStoreDetailsWrapper.classList.add("js-hidden-element");
}

function transformDateFromISO(dateISO) {
  const inputDate = new Date(dateISO);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = inputDate.getDate();
  const month = months[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}

function loadStoreHeaderToDOM(store) {
  const storeEmailField = document.querySelector(
    ".store-details-header__field-data_email"
  );
  const storeEstDateField = document.querySelector(
    ".store-details-header__field-data_est-date"
  );
  const storePhoneField = document.querySelector(
    ".store-details-header__field-data_phone"
  );
  const storeFloorAreaField = document.querySelector(
    ".store-details-header__field-data_floor-area"
  );
  const storeAddressField = document.querySelector(
    ".store-details-header__field-data_address"
  );

  storeEmailField.textContent = store.Email;
  storeEstDateField.textContent = transformDateFromISO(store.Established);
  storeAddressField.textContent = store.Address;
  storePhoneField.textContent = store.PhoneNumber;
  storeFloorAreaField.textContent = store.FloorArea;
}

function loadStoreDetailsToDOM(storeId) {
  showStoreDetailsTable();

  const store = stores.find((nextStore) => nextStore.id.toString() === storeId);

  loadStoreHeaderToDOM(store);

  //   let storeDetailsTableToAddStr = "";

  //   store.rel_Products?.forEach((detail) => {
  //     storeDetailsTableToAddStr += `

  //         `;
  //   });
}

document.addEventListener("DOMContentLoaded", () => {
  addStoresListToDOM();
});
