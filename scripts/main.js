"use strict";

import { storesData } from "../data/data.js";

const CONSTANTS = {
  STORES_LAYOUT_ID: "stores-list-layout",
  NO_STORES_LAYOUT_ID: "no-stores-list-layout",
  STORES_LIST_ITEM_CLASS: "stores-list-item",
  STORES_SEARCH_ID: {
    LINE: "stores-search-line",
    BTN: "stores-search-btn",
  },
  STORE_DETAILS_WRAPPER_ID: "store-details-wrapper",
  NO_STORE_DETAILS_WRAPPER_ID: "no-store-details-wrapper",
  STORE_LABELS_ID: {
    EMAIL: "store-email",
    EST_DATE: "store-est-date",
    PHONE: "store-phone",
    FLOOR_AREA: "store-floor-area",
    ADDRESS: "store-address",
  },
  PRODUCTS_AMOUNTS_ID: {
    ALL: "all-prod-amount",
    OK: "ok-prod-amount",
    STORAGE: "storage-prod-amount",
    OUT_OF_STOCK: "out-of-stock-prod-amount",
  },
  PRODUCTS_TABLE_ID: {
    HEAD: "products-table-head",
    HEAD_TITLES_WRAPPER: "product-table-titles-wrapper",
    BODY: "products-table-body",
  },
  PRODUCTS_SEARCH_ID: {
    LINE: "products-search-line",
    BTN: "products-search-btn",
  },
  SORT_BTN_CLASS: "products-table__product-field-sort-btn",
  LOCAL_STORAGE_ID: {
    CURR_STORE_ID: "currStoreId",
    CURR_COLUMNS_AMOUNT: "currTableColumnsAmount",
    CURR_SORT_KEY: "currSortKey",
    CURR_SORT_TYPE: "currSortType",
    CURR_SORT_ORDER: "currSortOrder",
  },
  JS_CLASS: {
    HIDDEN_ELEMENT: "js-hidden-element",
    FLEX_ELEMENT: "js-flex-element",
    SELECTED_ITEM: "js-selected-item",
    ASC_SORT_BTN: "js-asc-sort-btn",
    DESC_SORT_BTN: "js-desc-sort-btn",
  },
  DATA_ATTRIBUTE: {
    STORE_ID: {
      KEBAB: "store-id",
      CAMEL: "storeId",
    },
  },
};

// Functions for updating UI
function updateStoresList(stores) {
  const storesListSection = document.querySelector(
    `#${CONSTANTS.STORES_LAYOUT_ID}`
  );
  const currStoreId = localStorage.getItem(
    CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID
  );

  updateNoStoresLayout(stores);

  storesListSection.innerHTML = getStoresListStrForDOM(stores);

  if (currStoreId) {
    highlightActiveStoreCard(currStoreId);
  }
}

function updateNoStoresLayout(stores) {
  const noStoresLayout = document.querySelector(
    `#${CONSTANTS.NO_STORES_LAYOUT_ID}`
  );

  if (stores.length) {
    noStoresLayout.classList.add(CONSTANTS.JS_CLASS.HIDDEN_ELEMENT);
  } else {
    noStoresLayout.classList.remove(CONSTANTS.JS_CLASS.HIDDEN_ELEMENT);
  }
}

function updateAllStoreDetails(storeId) {
  const storeObj = getStoreObjById(storeId);

  const productsTableHead = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.HEAD}`
  );

  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID, storeId);

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
  const storesListLayout = document.querySelector(
    `#${CONSTANTS.STORES_LAYOUT_ID}`
  );

  storesListLayout
    .querySelector(`.${CONSTANTS.JS_CLASS.SELECTED_ITEM}`)
    ?.classList.remove(CONSTANTS.JS_CLASS.SELECTED_ITEM);

  storesListLayout
    .querySelector(
      `[data-${CONSTANTS.DATA_ATTRIBUTE.STORE_ID.KEBAB}="${storeId}"]`
    )
    ?.classList.add(CONSTANTS.JS_CLASS.SELECTED_ITEM);
}

function updateStoreDetailsVisibility() {
  const storeDetailsWrapper = document.querySelector(
    `#${CONSTANTS.STORE_DETAILS_WRAPPER_ID}`
  );
  const noStoreDetailsWrapper = document.querySelector(
    `#${CONSTANTS.NO_STORE_DETAILS_WRAPPER_ID}`
  );

  if (localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)) {
    storeDetailsWrapper.classList.add(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
    noStoreDetailsWrapper.classList.add(CONSTANTS.JS_CLASS.HIDDEN_ELEMENT);
  } else {
    storeDetailsWrapper.classList.remove(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
    noStoreDetailsWrapper.classList.remoev(CONSTANTS.JS_CLASS.HIDDEN_ELEMENT);
  }
}

function updateStoreContacts(store) {
  const storeEmailField = document.querySelector(
    `#${CONSTANTS.STORE_LABELS_ID.EMAIL}`
  );
  const storeEstDateField = document.querySelector(
    `#${CONSTANTS.STORE_LABELS_ID.EST_DATE}`
  );
  const storePhoneField = document.querySelector(
    `#${CONSTANTS.STORE_LABELS_ID.PHONE}`
  );
  const storeFloorAreaField = document.querySelector(
    `#${CONSTANTS.STORE_LABELS_ID.FLOOR_AREA}`
  );
  const storeAddressField = document.querySelector(
    `#${CONSTANTS.STORE_LABELS_ID.ADDRESS}`
  );

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
  const sortBtns = document.querySelectorAll(`.${CONSTANTS.SORT_BTN_CLASS}`);

  sortBtns.forEach((btn) => {
    btn.classList.remove(
      CONSTANTS.JS_CLASS.ASC_SORT_BTN,
      CONSTANTS.JS_CLASS.DESC_SORT_BTN
    );
    btn.dataset.sortState = "default";
  });
}

function updateProductsTableBody() {
  const productsTableBody = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.BODY}`
  );

  productsTableBody.innerHTML = getProductsTableBodyStrForDOM();
}

function updateProductsFiltersAndTable() {
  updateProductsFilters();

  updateProductsTableBody();
}

function updateProductsFilters() {
  const prodAmountField = document.querySelector(
    `#${CONSTANTS.PRODUCTS_AMOUNTS_ID.ALL}`
  );
  const prodOkAmountField = document.querySelector(
    `#${CONSTANTS.PRODUCTS_AMOUNTS_ID.OK}`
  );
  const prodStorageAmountField = document.querySelector(
    `#${CONSTANTS.PRODUCTS_AMOUNTS_ID.STORAGE}`
  );
  const prodOutOfStockAmountField = document.querySelector(
    `#${CONSTANTS.PRODUCTS_AMOUNTS_ID.OUT_OF_STOCK}`
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
              <div class="${CONSTANTS.STORES_LIST_ITEM_CLASS}" data-${CONSTANTS.DATA_ATTRIBUTE.STORE_ID.KEBAB}="${store.id}">
                  <div class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__name-address-wrapper">
                      <h3 class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__name-headline">
                          ${store.Name}
                      </h3>
                      <span class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__address-text">
                          ${store.Address}
                      </span>
                  </div>
                  <div class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__area-data-wrapper">
                      <span class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__area-number">
                          ${store.FloorArea}
                      </span>
                      <span class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__area-unit">sq.m</span>
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
                    class="${CONSTANTS.SORT_BTN_CLASS}"
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

  localStorage.setItem(
    CONSTANTS.LOCAL_STORAGE_ID.CURR_COLUMNS_AMOUNT,
    headersAmount
  );

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
                    name="${CONSTANTS.PRODUCTS_SEARCH_ID.LINE}"
                    placeholder="Enter value to search"
                    id="${CONSTANTS.PRODUCTS_SEARCH_ID.LINE}"
                  />
                  <button
                    class="products-table__search-btn"
                    id="${CONSTANTS.PRODUCTS_SEARCH_ID.BTN}"
                    title="Search"
                  ></button>
                </div>
              </div>
            </th>
          </tr>
          <tr
              class="products-table__product-specifications-row"
              id="${CONSTANTS.PRODUCTS_TABLE_ID.HEAD_TITLES_WRAPPER}"
            >${tablesTitlesStr}
          </tr>`;
}

function getProductsTableBodyStrForDOM() {
  let productTableBodyStr = "";

  const filteredProducts = getCurrFilteredProductsList();

  if (localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY)) {
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
          CONSTANTS.LOCAL_STORAGE_ID.CURR_COLUMNS_AMOUNT
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
  const searchInput = document.querySelector(
    `#${CONSTANTS.STORES_SEARCH_ID.LINE}`
  );
  const searchBtn = document.querySelector(
    `#${CONSTANTS.STORES_SEARCH_ID.BTN}`
  );

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
  const storesListSection = document.querySelector(
    `#${CONSTANTS.STORES_LAYOUT_ID}`
  );

  storesListSection.addEventListener("click", onStoreCardClick);
}

function onStoreCardClick(e) {
  const currItemCard = e.target.closest(`.${CONSTANTS.STORES_LIST_ITEM_CLASS}`);

  if (
    currItemCard &&
    CONSTANTS.DATA_ATTRIBUTE.STORE_ID.CAMEL in currItemCard.dataset
  ) {
    updateAllStoreDetails(
      currItemCard.dataset[`${CONSTANTS.DATA_ATTRIBUTE.STORE_ID.CAMEL}`]
    );
  }
}

function setSortBtnsListener() {
  const productTableTitlesWrapper = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.HEAD_TITLES_WRAPPER}`
  );

  productTableTitlesWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains(CONSTANTS.SORT_BTN_CLASS)) {
      const currSortBtn = e.target;
      const sortKey = currSortBtn.dataset.sortKey;
      const sortType = currSortBtn.dataset.sortType;

      switch (currSortBtn.dataset.sortState) {
        case "default":
          setAllSortBtnsToDefault();

          currSortBtn.dataset.sortState = "asc";
          currSortBtn.classList.add(CONSTANTS.JS_CLASS.ASC_SORT_BTN);

          setSortFiltersToLocalStorage(sortType, sortKey, "asc");

          updateProductsTableBody();

          break;
        case "asc":
          currSortBtn.dataset.sortState = "desc";
          currSortBtn.classList.remove(CONSTANTS.JS_CLASS.ASC_SORT_BTN);
          currSortBtn.classList.add(CONSTANTS.JS_CLASS.DESC_SORT_BTN);

          setSortFiltersToLocalStorage(sortType, sortKey, "desc");

          updateProductsTableBody();

          break;
        case "desc":
          currSortBtn.dataset.sortState = "default";
          currSortBtn.classList.remove(CONSTANTS.JS_CLASS.DESC_SORT_BTN);

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
  const searchInput = document.querySelector(
    `#${CONSTANTS.PRODUCTS_SEARCH_ID.LINE}`
  );
  const searchBtn = document.querySelector(
    `#${CONSTANTS.PRODUCTS_SEARCH_ID.BTN}`
  );

  const filterAndUpdateProductsList = () => {
    updateProductsFiltersAndTable();
  };

  searchInput.addEventListener("search", filterAndUpdateProductsList);
  searchBtn.addEventListener("click", filterAndUpdateProductsList);
}

// Other supporting functions
function clearSortFiltersFromLocalStorage() {
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_TYPE);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER);
}

function clearCurrStoreFromLocalStorage() {
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_COLUMNS_AMOUNT);
}

function getStoreObjById(storeId) {
  return storesData.find((nextStore) => nextStore.id.toString() === storeId);
}

function setSortFiltersToLocalStorage(sortType, sortKey, sortOrder) {
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_TYPE, sortType);
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY, sortKey);
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER, sortOrder);
}

function getCompareProductsFunction() {
  const sortType = localStorage.getItem(
    CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_TYPE
  );
  const sortKey = localStorage.getItem(
    CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY
  );
  const sortOrder = localStorage.getItem(
    CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER
  );

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
  const searchInput = document.querySelector(
    `#${CONSTANTS.PRODUCTS_SEARCH_ID.LINE}`
  );
  const currStore = getStoreObjById(
    localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
  );

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
  clearCurrStoreFromLocalStorage();

  updateStoresList(storesData);

  setSearchStoresListeners();

  setStoresCardsClickListener();
});
