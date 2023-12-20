"use strict";

import { stores } from "../data/data.js";

function toggleNoStoresLayout() {
  const noStoresLayout = document.querySelector("#no-stores-list-layout");

  if (stores.length) {
    noStoresLayout.classList.add("js-hidden-element");
  } else {
    noStoresLayout.classList.remove("js-hidden-element");
  }
}

function getStoresListStrForDOM() {
  let storesListToAddStr = "";

  stores.forEach((store) => {
    storesListToAddStr += `
              <div class="stores-list-item" data-store-id=${store.id}>
                  <div class="stores-list-item__name-address-wrapper">
                      <h3 class="stores-list-item__name-headline">
                          ${store.Name}
                      </h3>
                      <span class="stores-list-item__address-text">
                          ${store.Address}
                      </span>
                  </div>
                  <div class="stores-list-item__area-data-wrapper">
                      <span class="stores-list-item__area-number">
                          ${store.FloorArea}
                      </span>
                      <span class="stores-list-item__area-unit">sq.m</span>
                  </div>
              </div>
              `;
  });

  return storesListToAddStr;
}

function highlightActiveStore(storeId) {
  const storeItems = document.querySelectorAll(".stores-list-item");

  storeItems.forEach((storeItem) => {
    storeItem.classList.remove("js-selected-item");

    if (storeItem.dataset.storeId === storeId) {
      storeItem.classList.add("js-selected-item");
    }
  });
}

function loadStoresListToDOM() {
  toggleNoStoresLayout();

  const storesListSection = document.querySelector("#stores-list-layout");

  storesListSection.innerHTML = getStoresListStrForDOM();

  storesListSection.addEventListener("click", (e) => {
    const currItemCard = e.target.closest(".stores-list-item");

    if ("storeId" in currItemCard.dataset) {
      loadAllStoreDetailsToDOM(currItemCard.dataset.storeId);
    }
  });
}

function showStoreDetailsTable() {
  const storeDetailsWrapper = document.querySelector("#store-details-wrapper");
  const noStoreDetailsWrapper = document.querySelector(
    "#no-store-details-wrapper"
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

function loadStoreContactsToDOM(store) {
  const storeEmailField = document.querySelector("#store-email");
  const storeEstDateField = document.querySelector("#store-est-date");
  const storePhoneField = document.querySelector("#store-phone");
  const storeFloorAreaField = document.querySelector("#store-floor-area");
  const storeAddressField = document.querySelector("#store-address");

  storeEmailField.textContent = store.Email;
  storeEstDateField.textContent = transformDateFromISO(store.Established);
  storeAddressField.textContent = store.Address;
  storePhoneField.textContent = store.PhoneNumber;
  storeFloorAreaField.textContent = store.FloorArea;
}

function getStoreProductsAmounts(store) {
  const amountsData = {
    all: "rel_Products" in store ? store.rel_Products.length : 0,
    ok: 0,
    storage: 0,
    outOfStock: 0,
  };

  store.rel_Products?.forEach((product) => {
    switch (product.Status) {
      case "OK":
        amountsData.ok++;
        break;
      case "STORAGE":
        amountsData.storage++;
        break;
      case "OUT_OF_STOCK":
        amountsData.outOfStock++;
        break;
      default:
        console.warn(
          `Store with id=${store.id} had product with unknown status type: ${product.Status}`
        );
    }
  });

  return amountsData;
}

function loadStoreFiltersDataToDOM(store) {
  const prodAmountField = document.querySelector("#all-prod-amount");
  const prodOkAmountField = document.querySelector("#ok-prod-amount");
  const prodStorageAmountField = document.querySelector("#storage-prod-amount");
  const prodOutOfStockAmountField = document.querySelector(
    "#out-of-stock-prod-amount"
  );

  const amountsData = getStoreProductsAmounts(store);

  prodAmountField.textContent = amountsData.all;
  prodOkAmountField.textContent = amountsData.ok;
  prodStorageAmountField.textContent = amountsData.storage;
  prodOutOfStockAmountField.textContent = amountsData.outOfStock;
}

function getProductStarsStrForDOM(product) {
  let productStarsToAddStr = "";

  for (let k = 0; k < 5; k++) {
    if (k < product.Rating) {
      productStarsToAddStr += `<span class="yellow-star"></span>`;
    } else {
      productStarsToAddStr += `<span class="empty-star"></span>`;
    }
  }

  productStarsToAddStr += `<span class="right-arrow"></span>`;

  return productStarsToAddStr;
}

function getStoreTableStrForDOM(store) {
  let storeDetailsTableToAddStr = "";

  store.rel_Products?.forEach((product) => {
    storeDetailsTableToAddStr += `
              <tr class="product-table-item">
                <td class="product-table-item__name">
                  <div class="product-table-item__name-num-wrapper">
                    <span class="product-table-item__name-text"
                      >${product.Name}</span
                    >
                    <span class="product-table-item__num-text">${
                      product.id
                    }</span>
                  </div>
                </td>
                <td class="product-table-item__price">
                  <div class="product-table-item__price-wrapper">
                    <span class="product-table-item__price-value">${
                      product.Price
                    }</span>
                    <span class="product-table-item__price-currency">USD</span>
                  </div>
                </td>
                <td class="product-table-item__specs">
                  <span
                    class="product-table-item__specs-text"
                    title="${product.Specs}"
                    >${product.Specs}</span
                  >
                </td>
                <td class="product-table-item__supplier-info">
                  <span
                    class="product-table-item__supplier-info-text"
                    title="${product.SupplierInfo}"
                    >${product.SupplierInfo}</span
                  >
                </td>
                <td class="product-table-item__country-of-origin">
                  <span class="product-table-item__country-of-origin-text"
                    >${product.MadeIn}</span
                  >
                </td>
                <td class="product-table-item__prod-company">
                  <span class="product-table-item__prod-company-text"
                    >${product.ProductionCompanyName}</span
                  >
                </td>
                <td class="product-table-item__rating">
                  <div class="product-table-item__stars-wrapper">
                    ${getProductStarsStrForDOM(product)}
                  </div>
                </td>
              </tr>
              `;
  });

  return storeDetailsTableToAddStr;
}

function loadAllStoreDetailsToDOM(storeId) {
  highlightActiveStore(storeId);

  showStoreDetailsTable();

  const store = stores.find((nextStore) => nextStore.id.toString() === storeId);

  loadStoreContactsToDOM(store);

  loadStoreFiltersDataToDOM(store);

  const productsTable = document.querySelector("#products-table-body");

  productsTable.innerHTML = getStoreTableStrForDOM(store);
}

function setSearchStoresListeners() {
  const searchInput = document.querySelector("#search-store-line");
  const searchBtn = document.querySelector("#stores-search-btn");
}

document.addEventListener("DOMContentLoaded", () => {
  loadStoresListToDOM();

  setSearchStoresListeners();
});
