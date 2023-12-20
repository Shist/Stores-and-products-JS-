"use strict";

import { storesData } from "../data/data.js";

// Functions for updating UI
function updateStoresList(stores) {
  updateNoStoresLayout(stores);

  setSearchStoresListeners();

  const storesListSection = document.querySelector("#stores-list-layout");

  storesListSection.innerHTML = getStoresListStrForDOM(stores);

  storesListSection.addEventListener("click", (e) => {
    const currItemCard = e.target.closest(".stores-list-item");

    if ("storeId" in currItemCard.dataset) {
      updateAllStoreDetails(currItemCard.dataset.storeId);
    }
  });
}

function updateAllStoreDetails(storeId) {
  localStorage.setItem("currStoreId", storeId);

  clearLocalStorageFromTableFilters();

  highlightActiveStore(storeId);

  showStoreDetailsTable();

  const storeObj = getStoreObjById(storeId);

  updateStoreContacts(storeObj);

  const productsTableHead = document.querySelector("#products-table-head");

  if (storeObj.rel_Products?.length) {
    productsTableHead.innerHTML = getStoreTableHeadStrForDOM(
      Object.entries(storeObj.rel_Products[0])
    );
  }

  setSortBtnsListener();

  setSearchProductsListeners();

  updateProductsTableAndFilters(storeObj.rel_Products);
}

function updateProductsTableAndFilters(products) {
  updateStoreFiltersData(products);

  const productsTableBody = document.querySelector("#products-table-body");

  productsTableBody.innerHTML = getStoreTableBodyStrForDOM(products);
}

function updateNoStoresLayout(stores) {
  const noStoresLayout = document.querySelector("#no-stores-list-layout");

  if (stores.length) {
    noStoresLayout.classList.add("js-hidden-element");
  } else {
    noStoresLayout.classList.remove("js-hidden-element");
  }
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

function showStoreDetailsTable() {
  const storeDetailsWrapper = document.querySelector("#store-details-wrapper");
  const noStoreDetailsWrapper = document.querySelector(
    "#no-store-details-wrapper"
  );

  storeDetailsWrapper.classList.add("js-flex-element");
  noStoreDetailsWrapper.classList.add("js-hidden-element");
}

function updateStoreContacts(store) {
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

function updateStoreFiltersData(products) {
  const prodAmountField = document.querySelector("#all-prod-amount");
  const prodOkAmountField = document.querySelector("#ok-prod-amount");
  const prodStorageAmountField = document.querySelector("#storage-prod-amount");
  const prodOutOfStockAmountField = document.querySelector(
    "#out-of-stock-prod-amount"
  );

  const amountsData = getStoreProductsAmounts(products);

  prodAmountField.textContent = amountsData.all;
  prodOkAmountField.textContent = amountsData.ok;
  prodStorageAmountField.textContent = amountsData.storage;
  prodOutOfStockAmountField.textContent = amountsData.outOfStock;
}

// Functions for preparing HTML structures for DOM
function getStoresListStrForDOM(stores) {
  let storesListStr = "";

  stores.forEach((store) => {
    storesListStr += `
              <div class="stores-list-item" data-store-id="${store.id}">
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

  return storesListStr;
}

function getStoreTableHeadStrForDOM(titlePairs) {
  let tablesTitlesStr = "";
  let titlesAmount = 0;

  titlePairs.forEach(([key, value]) => {
    if (key !== "Photo" && key !== "Status" && key !== "id") {
      titlesAmount++;
      const wrapperClassesStr =
        key === "Price"
          ? "products-table__product-field-wrapper products-table__product-field-wrapper_end"
          : "products-table__product-field-wrapper";
      tablesTitlesStr += `
              <th class="products-table__product-field">
                <div class="${wrapperClassesStr}">
                  <button
                    class="products-table__product-field-sort-btn"
                    title="Sort"
                    data-sort-key="${key}"
                    data-sort-type="${typeof value}"
                    data-sort-state="default"
                  ></button>
                  <span class="products-table__product-field-name"
                    >${key.toString()}</span
                  >
                </div>
              </th>
              `;
    }
  });

  return getStoreTableHeadWrapperStrForDOM(titlesAmount, tablesTitlesStr);
}

function getStoreTableHeadWrapperStrForDOM(titlesAmount, tablesTitlesStr) {
  return `<tr class="products-table__table-name-row">
            <th colspan="${titlesAmount}" class="products-table__table-name-headline">
              <div class="product-table__name-search-wrapper">
                <span class="products-table__table-name-text">
                  Products
                </span>
                <div class="products-table__search-wrapper">
                  <input
                    type="search"
                    class="products-table__search-line"
                    name="search-product-line"
                    placeholder="Enter value to search"
                    id="search-product-line"
                  />
                  <button
                    class="products-table__search-btn"
                    id="products-search-btn"
                    title="Search"
                  ></button>
                </div>
              </div>
            </th>
          </tr>
          <tr
              class="products-table__product-specifications-row"
              id="product-table-titles-wrapper"
            >${tablesTitlesStr}
          </tr>`;
}

function getStoreTableBodyStrForDOM(products) {
  const productsCopy = products.slice();

  if (localStorage.getItem("currSortKey")) {
    productsCopy.sort(getCompareProductsFunction());
  }

  let productTableBodyStr = "";

  productsCopy?.forEach((product) => {
    productTableBodyStr += `
      <tr class="product-table-item">
        ${getProductRowStrForDOM(product)}
      </tr>`;
  });

  return productTableBodyStr;
}

function getProductRowStrForDOM(product) {
  let productTableDataStr = "";

  Object.keys(product).forEach((productKey) => {
    switch (productKey) {
      case "Name":
        productTableDataStr += `
            <td class="product-table-item__name">
              <div class="product-table-item__name-num-wrapper">
                <span class="product-table-item__name-text"
                  >${product.Name}</span
                >
                <span class="product-table-item__num-text">${product.id}</span>
              </div>
            </td>`;
        break;
      case "Price":
        productTableDataStr += `
            <td class="product-table-item__price">
              <div class="product-table-item__price-wrapper">
                <span class="product-table-item__price-value">${product.Price}</span>
                <span class="product-table-item__price-currency">USD</span>
              </div>
            </td>`;
        break;
      case "Rating":
        productTableDataStr += `
            <td class="product-table-item__rating">
              <div class="product-table-item__stars-wrapper">
                ${getProductStarsStrForDOM(product)}
              </div>
            </td>`;
        break;
      default:
        if (
          productKey !== "Photo" &&
          productKey !== "Status" &&
          productKey !== "id"
        ) {
          productTableDataStr += `
              <td class="product-table-item__standard-field">
                <span
                  class="product-table-item__standard-field-text"
                  title="${product[productKey]}"
                  >${product[productKey]}</span
                >
              </td>`;
        }
    }
  });

  return productTableDataStr;
}

function getProductStarsStrForDOM(product) {
  let productStarsStr = "";

  for (let k = 0; k < 5; k++) {
    if (k < product.Rating) {
      productStarsStr += `<span class="yellow-star"></span>`;
    } else {
      productStarsStr += `<span class="empty-star"></span>`;
    }
  }

  productStarsStr += `<span class="right-arrow"></span>`;

  return productStarsStr;
}

// Functions for setting listeners to UI elements
function setSearchStoresListeners() {
  const searchInput = document.querySelector("#search-store-line");
  const searchBtn = document.querySelector("#stores-search-btn");

  const filterAndUpdateStoresList = () => {
    const filteredStoresList = storesData.filter(
      (store) =>
        store.Name.toLowerCase().includes(searchInput.value) ||
        store.Address.toLowerCase().includes(searchInput.value) ||
        store.FloorArea.toString().includes(searchInput.value)
    );

    updateStoresList(filteredStoresList);
  };

  searchInput.addEventListener("search", filterAndUpdateStoresList);
  searchBtn.addEventListener("click", filterAndUpdateStoresList);
}

function setSortBtnsListener() {
  const productTableTitlesWrapper = document.querySelector(
    "#product-table-titles-wrapper"
  );

  productTableTitlesWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("products-table__product-field-sort-btn")) {
      const currSortBtn = e.target;
      const sortKey = currSortBtn.dataset.sortKey;
      const sortType = currSortBtn.dataset.sortType;
      const productsTableBody = document.querySelector("#products-table-body");

      switch (currSortBtn.dataset.sortState) {
        case "default":
          setAllSortBtnsToDefault();
          currSortBtn.dataset.sortState = "asc";
          currSortBtn.classList.add("js-asc-sort-btn");

          localStorage.setItem("currSortType", sortType);
          localStorage.setItem("currSortKey", sortKey);
          localStorage.setItem("currSortOrder", "asc");
          productsTableBody.innerHTML = getStoreTableBodyStrForDOM(
            getCurrFilteredProductList()
          );

          break;
        case "asc":
          currSortBtn.dataset.sortState = "desc";
          currSortBtn.classList.remove("js-asc-sort-btn");
          currSortBtn.classList.add("js-desc-sort-btn");

          localStorage.setItem("currSortType", sortType);
          localStorage.setItem("currSortKey", sortKey);
          localStorage.setItem("currSortOrder", "desc");
          productsTableBody.innerHTML = getStoreTableBodyStrForDOM(
            getCurrFilteredProductList()
          );

          break;
        case "desc":
          currSortBtn.dataset.sortState = "default";
          currSortBtn.classList.remove("js-desc-sort-btn");

          clearLocalStorageFromTableFilters();
          productsTableBody.innerHTML = getStoreTableBodyStrForDOM(
            getCurrFilteredProductList()
          );

          break;
        default:
          console.warn(
            `One of sort buttons had unknown data-sort-state type: ${e.target.dataset.sortState}`
          );
      }
    }
  });
}

function setSearchProductsListeners() {
  const searchInput = document.querySelector("#search-product-line");
  const searchBtn = document.querySelector("#products-search-btn");

  const filterAndUpdateProductsList = () => {
    updateProductsTableAndFilters(getCurrFilteredProductList());
  };

  searchInput.addEventListener("search", filterAndUpdateProductsList);
  searchBtn.addEventListener("click", filterAndUpdateProductsList);
}

// Other supporting functions
function getStoreObjById(storeId) {
  return storesData.find((nextStore) => nextStore.id.toString() === storeId);
}

function getCurrFilteredProductList() {
  const searchInput = document.querySelector("#search-product-line");
  const currStore = getStoreObjById(localStorage.getItem("currStoreId"));

  return currStore.rel_Products?.filter(
    (product) =>
      product.Name.toLowerCase().includes(searchInput.value) ||
      product.id.toString().includes(searchInput.value) ||
      product.Price.toString().includes(searchInput.value) ||
      product.Specs.toLowerCase().includes(searchInput.value) ||
      product.SupplierInfo.toLowerCase().includes(searchInput.value) ||
      product["Country of origin"].toLowerCase().includes(searchInput.value) ||
      product["Prod. company"].toLowerCase().includes(searchInput.value) ||
      product.Rating.toString().includes(searchInput.value)
  );
}

function setAllSortBtnsToDefault() {
  const sortBtns = document.querySelectorAll(
    ".products-table__product-field-sort-btn"
  );

  sortBtns.forEach((btn) => {
    btn.classList.remove("js-asc-sort-btn", "js-desc-sort-btn");
    btn.dataset.sortState = "default";
  });
}

function getStoreProductsAmounts(products) {
  const amountsData = {
    all: products.length,
    ok: 0,
    storage: 0,
    outOfStock: 0,
  };

  products.forEach((product) => {
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

function getCompareProductsFunction() {
  const sortType = localStorage.getItem("currSortType");
  const sortKey = localStorage.getItem("currSortKey");
  const sortOrder = localStorage.getItem("currSortOrder");

  return (prodA, prodB) => {
    if (sortOrder === "asc") {
      return sortType === "number"
        ? prodA[sortKey] - prodB[sortKey]
        : prodA[sortKey].localeCompare(prodB[sortKey]);
    } else {
      return sortType === "number"
        ? prodB[sortKey] - prodA[sortKey]
        : prodB[sortKey].localeCompare(prodA[sortKey]);
    }
  };
}

function clearLocalStorageFromTableFilters() {
  localStorage.removeItem("currSortType");
  localStorage.removeItem("currSortKey");
  localStorage.removeItem("currSortOrder");
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

document.addEventListener("DOMContentLoaded", () => {
  updateStoresList(storesData);
});
