"use strict";

import { storesData } from "../data/data.js";

// Functions for updating UI
function updateStoresList(stores) {
  const storesListSection = document.querySelector("#stores-list-layout");
  const currStoreId = localStorage.getItem("currStoreId");

  updateNoStoresLayout(stores);

  storesListSection.innerHTML = getStoresListStrForDOM(stores);

  if (currStoreId) {
    highlightActiveStoreCard(currStoreId);
  }
}

function updateNoStoresLayout(stores) {
  const noStoresLayout = document.querySelector("#no-stores-list-layout");

  if (stores.length) {
    noStoresLayout.classList.add("js-hidden-element");
  } else {
    noStoresLayout.classList.remove("js-hidden-element");
  }
}

function updateAllStoreDetails(storeId) {
  const storeObj = getStoreObjById(storeId);

  const productsTableHead = document.querySelector("#products-table-head");

  localStorage.setItem("currStoreId", storeId);

  clearSortFiltersFromLocalStorage();

  highlightActiveStoreCard(storeId);

  updateStoreDetailsVisibility();

  updateStoreContacts(storeObj);

  if (storeObj.rel_Products?.length) {
    productsTableHead.innerHTML = getProductsTableHeadStrForDOM(
      Object.entries(storeObj.rel_Products[0])
    );
  }

  setSortBtnsListener();

  setSearchProductsListeners();

  updateProductsFiltersAndTable();
}

function highlightActiveStoreCard(storeId) {
  const storesListLayout = document.querySelector("#stores-list-layout");

  storesListLayout
    .querySelector(".js-selected-item")
    ?.classList.remove("js-selected-item");

  storesListLayout
    .querySelector(`[data-store-id="${storeId}"]`)
    ?.classList.add("js-selected-item");
}

function updateStoreDetailsVisibility() {
  const storeDetailsWrapper = document.querySelector("#store-details-wrapper");
  const noStoreDetailsWrapper = document.querySelector(
    "#no-store-details-wrapper"
  );

  if (localStorage.getItem("currStoreId")) {
    storeDetailsWrapper.classList.add("js-flex-element");
    noStoreDetailsWrapper.classList.add("js-hidden-element");
  } else {
    storeDetailsWrapper.classList.remove("js-flex-element");
    noStoreDetailsWrapper.classList.remoev("js-hidden-element");
  }
}

function updateStoreContacts(store) {
  const storeEmailField = document.querySelector("#store-email");
  const storeEstDateField = document.querySelector("#store-est-date");
  const storePhoneField = document.querySelector("#store-phone");
  const storeFloorAreaField = document.querySelector("#store-floor-area");
  const storeAddressField = document.querySelector("#store-address");

  storeEmailField.textContent = store.Email;
  storeEstDateField.textContent = new Date(
    store.Established
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  storeAddressField.textContent = store.Address;
  storePhoneField.textContent = store.PhoneNumber;
  storeFloorAreaField.textContent = store.FloorArea;
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

function updateProductsTableBody() {
  const productsTableBody = document.querySelector("#products-table-body");

  productsTableBody.innerHTML = getProductsTableBodyStrForDOM();
}

function updateProductsFiltersAndTable() {
  updateProductsFilters();

  updateProductsTableBody();
}

function updateProductsFilters() {
  const prodAmountField = document.querySelector("#all-prod-amount");
  const prodOkAmountField = document.querySelector("#ok-prod-amount");
  const prodStorageAmountField = document.querySelector("#storage-prod-amount");
  const prodOutOfStockAmountField = document.querySelector(
    "#out-of-stock-prod-amount"
  );

  const amountsData = getStoreProductsAmounts();

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

function getProductsTableHeadStrForDOM(headerPairs) {
  let tablesHeadersStr = "";
  let headersAmount = 0;

  headerPairs.forEach(([key, value]) => {
    if (key !== "Photo" && key !== "Status" && key !== "id") {
      headersAmount++;

      const wrapperClassesStr =
        key === "Price"
          ? "products-table__product-field-wrapper products-table__product-field-wrapper_end"
          : "products-table__product-field-wrapper";

      tablesHeadersStr += `
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

  localStorage.setItem("currTableColumnsAmount", headersAmount);

  return getProductsTableHeadWrapperStrForDOM(headersAmount, tablesHeadersStr);
}

function getProductsTableHeadWrapperStrForDOM(titlesAmount, tablesTitlesStr) {
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

function getProductsTableBodyStrForDOM() {
  let productTableBodyStr = "";

  const filteredProducts = getCurrFilteredProductsList();

  if (localStorage.getItem("currSortKey")) {
    filteredProducts.sort(getCompareProductsFunction());
  }

  filteredProducts?.forEach((product) => {
    productTableBodyStr += `
      <tr class="product-table-item">
        ${getProductRowStrForDOM(product)}
      </tr>`;
  });

  if (!productTableBodyStr) {
    productTableBodyStr = `
      <tr class="product-table-empty-item">
        <td colspan="${localStorage.getItem(
          "currTableColumnsAmount"
        )}" class="product-table-empty-item__no-data">
          No data
        </td>
      </tr>`;
  }

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
        store.Name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        store.Address.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        store.FloorArea.toString().includes(searchInput.value)
    );

    updateStoresList(filteredStoresList);
  };

  searchInput.addEventListener("search", filterAndUpdateStoresList);
  searchBtn.addEventListener("click", filterAndUpdateStoresList);
}

function setStoresCardsClickListener() {
  const storesListSection = document.querySelector("#stores-list-layout");

  storesListSection.addEventListener("click", onStoreCardClick);
}

function onStoreCardClick(e) {
  const currItemCard = e.target.closest(".stores-list-item");

  if (currItemCard && "storeId" in currItemCard.dataset) {
    updateAllStoreDetails(currItemCard.dataset.storeId);
  }
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

      switch (currSortBtn.dataset.sortState) {
        case "default":
          setAllSortBtnsToDefault();

          currSortBtn.dataset.sortState = "asc";
          currSortBtn.classList.add("js-asc-sort-btn");

          setSortFiltersToLocalStorage(sortType, sortKey, "asc");

          updateProductsTableBody();

          break;
        case "asc":
          currSortBtn.dataset.sortState = "desc";
          currSortBtn.classList.remove("js-asc-sort-btn");
          currSortBtn.classList.add("js-desc-sort-btn");

          setSortFiltersToLocalStorage(sortType, sortKey, "desc");

          updateProductsTableBody();

          break;
        case "desc":
          currSortBtn.dataset.sortState = "default";
          currSortBtn.classList.remove("js-desc-sort-btn");

          clearSortFiltersFromLocalStorage();

          updateProductsTableBody();

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
    updateProductsFiltersAndTable();
  };

  searchInput.addEventListener("search", filterAndUpdateProductsList);
  searchBtn.addEventListener("click", filterAndUpdateProductsList);
}

// Other supporting functions
function clearSortFiltersFromLocalStorage() {
  localStorage.removeItem("currSortType");
  localStorage.removeItem("currSortKey");
  localStorage.removeItem("currSortOrder");
}

function getStoreObjById(storeId) {
  return storesData.find((nextStore) => nextStore.id.toString() === storeId);
}

function setSortFiltersToLocalStorage(sortType, sortKey, sortOrder) {
  localStorage.setItem("currSortType", sortType);
  localStorage.setItem("currSortKey", sortKey);
  localStorage.setItem("currSortOrder", sortOrder);
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

function getCurrFilteredProductsList() {
  const searchInput = document.querySelector("#search-product-line");
  const currStore = getStoreObjById(localStorage.getItem("currStoreId"));

  return currStore.rel_Products?.filter(
    (product) =>
      product.Name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      product.id.toString().includes(searchInput.value) ||
      product.Price.toString().includes(searchInput.value) ||
      product.Specs.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      product.SupplierInfo.toLowerCase().includes(
        searchInput.value.toLowerCase()
      ) ||
      product["Country of origin"]
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      product["Prod. company"]
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      product.Rating.toString().includes(searchInput.value)
  );
}

function getStoreProductsAmounts() {
  const products = getCurrFilteredProductsList();

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

document.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();

  updateStoresList(storesData);

  setSearchStoresListeners();

  setStoresCardsClickListener();
});
