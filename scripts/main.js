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
  PRODUCTS_TABLE_COLUMNS: [
    ["Name", "string", "align-start"],
    ["Price", "number", "align-end"],
    ["Specs", "string", "align-start"],
    ["SupplierInfo", "string", "align-start"],
    ["Country of origin", "string", "align-start"],
    ["Prod. company", "string", "align-start"],
    ["Rating", "number", "align-start"],
  ],
  PRODUCTS_SEARCH_ID: {
    LINE: "products-search-line",
    BTN: "products-search-btn",
  },
  SORT_BTN_CLASS: "products-table__product-field-sort-btn",
  LOCAL_STORAGE_ID: {
    CURR_STORE_ID: "currStoreId",
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
    SORT_KEY: {
      KEBAB: "sort-key",
      CAMEL: "sortKey",
    },
    SORT_TYPE: {
      KEBAB: "sort-type",
      CAMEL: "sortType",
    },
    SORT_STATE: {
      KEBAB: "sort-state",
      CAMEL: "sortState",
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

  storesListSection.innerHTML = getStructureForStoresList(stores);

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

function renderProductsTableHead() {
  const productsTableHead = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.HEAD}`
  );

  productsTableHead.innerHTML = getStructureForTableHead();

  setSortBtnsListener();

  setSearchProductsListeners();
}

function updateAllStoreDetails() {
  setProductsTableHeadToDefault();

  highlightActiveStoreCard();

  updateStoreDetailsVisibility();

  updateStoreContacts();

  updateProductsFiltersAndTableBody();
}

function setProductsTableHeadToDefault() {
  clearSortFiltersFromLocalStorage();

  setAllSortBtnsToDefault();

  setProductSearchLineToDefault();
}

function highlightActiveStoreCard() {
  const storesListLayout = document.querySelector(
    `#${CONSTANTS.STORES_LAYOUT_ID}`
  );

  storesListLayout
    .querySelector(`.${CONSTANTS.JS_CLASS.SELECTED_ITEM}`)
    ?.classList.remove(CONSTANTS.JS_CLASS.SELECTED_ITEM);

  storesListLayout
    .querySelector(
      `[data-${CONSTANTS.DATA_ATTRIBUTE.STORE_ID.KEBAB}="${localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID
      )}"]`
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

function updateStoreContacts() {
  const store = getStoreObjById(
    localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
  );

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
    btn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] = "default";
  });
}

function setProductSearchLineToDefault() {
  document.querySelector(`#${CONSTANTS.PRODUCTS_SEARCH_ID.LINE}`).value = "";
}

function updateProductsFiltersAndTableBody() {
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

  const amountsData = getCurrProductsAmounts();

  prodAmountField.textContent = amountsData.all;
  prodOkAmountField.textContent = amountsData.ok;
  prodStorageAmountField.textContent = amountsData.storage;
  prodOutOfStockAmountField.textContent = amountsData.outOfStock;
}

function updateProductsTableBody() {
  const productsTableBody = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.BODY}`
  );

  productsTableBody.innerHTML = getStructureForTableBody();
}

// Functions for preparing HTML structures for DOM
function getStructureForStoresList(stores) {
  return stores.reduce((storesStr, nextStore) => {
    storesStr += `
              <div class="${CONSTANTS.STORES_LIST_ITEM_CLASS}" data-${CONSTANTS.DATA_ATTRIBUTE.STORE_ID.KEBAB}="${nextStore.id}">
                  <div class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__name-address-wrapper">
                      <h3 class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__name-headline">
                          ${nextStore.Name}
                      </h3>
                      <span class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__address-text">
                          ${nextStore.Address}
                      </span>
                  </div>
                  <div class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__area-data-wrapper">
                      <span class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__area-number">
                          ${nextStore.FloorArea}
                      </span>
                      <span class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__area-unit">sq.m</span>
                  </div>
              </div>
              `;
    return storesStr;
  }, "");
}

function getStructureForTableHead() {
  return `<tr class="products-table__table-name-row">
            <th colspan="${
              CONSTANTS.PRODUCTS_TABLE_COLUMNS.length
            }" class="products-table__table-name-headline">
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
            >${getStructureForTableHeaders()}
          </tr>`;
}

function getStructureForTableHeaders() {
  return CONSTANTS.PRODUCTS_TABLE_COLUMNS.reduce(
    (tablesHeadersStr, [columnName, columnType, alignType]) => {
      const wrapperClassesStr =
        alignType === "align-start"
          ? "products-table__product-field-wrapper"
          : "products-table__product-field-wrapper products-table__product-field-wrapper_end";

      tablesHeadersStr += `
            <th class="products-table__product-field">
              <div class="${wrapperClassesStr}">
                <button
                  class="${CONSTANTS.SORT_BTN_CLASS}"
                  title="Sort"
                  data-${CONSTANTS.DATA_ATTRIBUTE.SORT_KEY.KEBAB}="${columnName}"
                  data-${CONSTANTS.DATA_ATTRIBUTE.SORT_TYPE.KEBAB}="${columnType}"
                  data-${CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.KEBAB}="default"
                ></button>
                <span class="products-table__product-field-name"
                  >${columnName}</span
                >
              </div>
            </th>
            `;

      return tablesHeadersStr;
    },
    ""
  );
}

function getStructureForTableBody() {
  const filteredProducts = getCurrFilteredProductsList();
  let productTableBodyStr = "";

  if (localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY)) {
    filteredProducts.sort(getCompareProductsFunction());
  }

  if (Array.isArray(filteredProducts)) {
    productTableBodyStr = filteredProducts?.reduce((neededStr, product) => {
      neededStr += `
        <tr class="product-table-item">
          ${getStructureForTableRow(product)}
        </tr>`;
      return neededStr;
    }, "");
  }

  if (!productTableBodyStr) {
    productTableBodyStr = `
      <tr class="product-table-empty-item">
        <td colspan="${CONSTANTS.PRODUCTS_TABLE_COLUMNS.length}" class="product-table-empty-item__no-data">
          No data
        </td>
      </tr>`;
  }

  return productTableBodyStr;
}

function getStructureForTableRow(product) {
  return CONSTANTS.PRODUCTS_TABLE_COLUMNS.reduce(
    (productTableDataStr, [productKey, ,]) => {
      switch (productKey) {
        case "Name":
          productTableDataStr += getTableStructureForNameField(
            product.Name,
            product.id
          );
          break;
        case "Price":
          productTableDataStr += getTableStructureForPriceField(product.Price);
          break;
        case "Rating":
          productTableDataStr += getTableStructureForRatingField(
            product.Rating
          );
          break;
        default:
          productTableDataStr += getTableStructureForStandardField(
            product[productKey]
          );
      }
      return productTableDataStr;
    },
    ""
  );
}

function getTableStructureForNameField(productName, productId) {
  return `<td class="product-table-item__name">
            <div class="product-table-item__name-num-wrapper">
              <span class="product-table-item__name-text">
                ${productName}
              </span>
              <span class="product-table-item__num-text">
                ${productId}
              </span>
            </div>
          </td>`;
}

function getTableStructureForPriceField(productPrice) {
  return `<td class="product-table-item__price">
            <div class="product-table-item__price-wrapper">
              <span class="product-table-item__price-value">
                ${productPrice}
              </span>
              <span class="product-table-item__price-currency">
                USD
              </span>
            </div>
          </td>`;
}

function getTableStructureForRatingField(productRating) {
  return `<td class="product-table-item__rating">
            <div class="product-table-item__stars-wrapper">
              ${getStructureForRatingStars(productRating)}
            </div>
          </td>`;
}

function getTableStructureForStandardField(productField) {
  return `<td class="product-table-item__standard-field">
            <span
            class="product-table-item__standard-field-text"
            title="${productField}">
              ${productField}
            </span>
          </td>`;
}

function getStructureForRatingStars(productRating) {
  return (
    Array(5)
      .fill()
      .reduce((neededStr, _, index) => {
        if (index < productRating) {
          return neededStr + `<span class="yellow-star"></span>`;
        } else {
          return neededStr + `<span class="empty-star"></span>`;
        }
      }, "") +
    `<div class="arrow-cross-wrapper">
        <span class="right-arrow"></span>
        <span class="cross-btn"></span>
    </div>`
  );
}

// Functions for setting listeners to UI elements
function setSearchStoresListeners() {
  const searchInput = document.querySelector(
    `#${CONSTANTS.STORES_SEARCH_ID.LINE}`
  );
  const searchBtn = document.querySelector(
    `#${CONSTANTS.STORES_SEARCH_ID.BTN}`
  );

  searchInput.addEventListener("search", () =>
    onSearchStoresClick(searchInput)
  );
  searchBtn.addEventListener("click", () => onSearchStoresClick(searchInput));
}

function onSearchStoresClick(searchInput) {
  const filteredStoresList = storesData.filter(
    (store) =>
      store.Name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      store.Address.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      store.FloorArea.toString().includes(searchInput.value)
  );

  updateStoresList(filteredStoresList);
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
    localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID,
      currItemCard.dataset[CONSTANTS.DATA_ATTRIBUTE.STORE_ID.CAMEL]
    );

    updateAllStoreDetails();
  }
}

function setSortBtnsListener() {
  const productTableTitlesWrapper = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.HEAD_TITLES_WRAPPER}`
  );

  productTableTitlesWrapper.addEventListener("click", onSortBtnClick);
}

function onSortBtnClick(e) {
  if (e.target.classList.contains(CONSTANTS.SORT_BTN_CLASS)) {
    const currSortBtn = e.target;
    const sortKey =
      currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_KEY.CAMEL];
    const sortType =
      currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_TYPE.CAMEL];

    switch (currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL]) {
      case "default":
        setAllSortBtnsToDefault();

        currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] = "asc";
        currSortBtn.classList.add(CONSTANTS.JS_CLASS.ASC_SORT_BTN);

        setSortFiltersToLocalStorage(sortType, sortKey, "asc");
        updateProductsTableBody();

        break;
      case "asc":
        currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] = "desc";
        currSortBtn.classList.remove(CONSTANTS.JS_CLASS.ASC_SORT_BTN);
        currSortBtn.classList.add(CONSTANTS.JS_CLASS.DESC_SORT_BTN);

        setSortFiltersToLocalStorage(sortType, sortKey, "desc");
        updateProductsTableBody();

        break;
      case "desc":
        currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
          "default";
        currSortBtn.classList.remove(CONSTANTS.JS_CLASS.DESC_SORT_BTN);

        clearSortFiltersFromLocalStorage();
        updateProductsTableBody();

        break;
      default:
        console.warn(
          `One of sort buttons had unknown data-${
            CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.KEBAB
          } type: ${
            e.target.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL]
          }`
        );
    }
  }
}

function setSearchProductsListeners() {
  const searchInput = document.querySelector(
    `#${CONSTANTS.PRODUCTS_SEARCH_ID.LINE}`
  );
  const searchBtn = document.querySelector(
    `#${CONSTANTS.PRODUCTS_SEARCH_ID.BTN}`
  );

  searchInput.addEventListener("search", updateProductsFiltersAndTableBody);
  searchBtn.addEventListener("click", updateProductsFiltersAndTableBody);
}

// Other supporting functions
function getStoreObjById(storeId) {
  return storesData.find((nextStore) => nextStore.id.toString() === storeId);
}

function setSortFiltersToLocalStorage(sortType, sortKey, sortOrder) {
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_TYPE, sortType);
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY, sortKey);
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER, sortOrder);
}

function clearSortFiltersFromLocalStorage() {
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_TYPE);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER);
}

function clearCurrStoreIdFromLocalStorage() {
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID);
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

function getCurrProductsAmounts() {
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
  clearCurrStoreIdFromLocalStorage();

  updateStoresList(storesData);

  setSearchStoresListeners();

  setStoresCardsClickListener();

  renderProductsTableHead();
});
