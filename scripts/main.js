"use strict";

const CONSTANTS = {
  SERVER: {
    API_PREFIX: "http://localhost:3000/api",
    STORES: "/Stores",
    STORE_BY_ID: "/Stores/{storeId}",
    PRODUCTS_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
  },
  SPINNERS_ID: {
    STORES_LIST: "stores-list-spinner",
    STORE_DETAILS: "store-details-spinner",
    PRODUCTS_AMOUNTS: "products-amounts-spinner",
    PRODUCTS_LIST: "products-list-spinner",
  },
  STORES_LIST_HEADER_ID: "stores-list-header",
  STORES_LIST_SECTION_ID: "stores-list-section",
  STORES_LAYOUT_ID: "stores-list-layout",
  NO_STORES_LAYOUT_ID: "no-stores-list-layout",
  STORES_LIST_ITEM_CLASS: "stores-list-item",
  STORES_SEARCH_ID: {
    LINE: "stores-search-line",
    BTN: "stores-search-btn",
  },
  STORE_DETAILS_HEADER_ID: "store-details-header",
  STORE_DETAILS_WRAPPER_ID: "store-details-wrapper",
  NO_STORE_DETAILS_WRAPPER_ID: "no-store-details-wrapper",
  STORE_DETAILS_DESCRIPTION_WRAPPER_ID: "store-details-description-wrapper",
  STORE_LABELS_ID: {
    EMAIL: "store-email",
    EST_DATE: "store-est-date",
    PHONE: "store-phone",
    FLOOR_AREA: "store-floor-area",
    ADDRESS: "store-address",
  },
  FILTER_WRAPPER_ID: "filters-wrapper",
  FILTER_BTN_CLASS: "products-filter-btn",
  FILTER_ID: {
    ALL: "filter-all",
    OK: "filter-ok",
    STORAGE: "filter-storage",
    OUT_OF_STOCK: "filter-out-of-stock",
  },
  PRODUCTS_AMOUNTS_ID: {
    ALL: "all-prod-amount",
    OK: "ok-prod-amount",
    STORAGE: "storage-prod-amount",
    OUT_OF_STOCK: "out-of-stock-prod-amount",
  },
  PRODUCTS_TABLE_ID: {
    TABLE_WRAPPER: "products-table-wrapper",
    HEAD: "products-table-head",
    HEAD_NAME: "product-table-name-wrapper",
    HEAD_TITLES: "product-table-titles-wrapper",
    BODY: "products-table-body",
  },
  PRODUCTS_TABLE_COLUMNS: [
    ["Name", "Name", "align-start"],
    ["Price", "Price", "align-end"],
    ["Specs", "Specs", "align-start"],
    ["SupplierInfo", "SupplierInfo", "align-start"],
    ["MadeIn", "Country of origin", "align-start"],
    ["ProductionCompanyName", "Prod. company", "align-start"],
    ["Rating", "Rating", "align-start"],
  ],
  PRODUCTS_SEARCH_ID: {
    LINE: "products-search-line",
    BTN: "products-search-btn",
  },
  SORT_BTN_CLASS: "products-table__product-field-sort-btn",
  SORT_ORDER: {
    ASC: "asc",
    DESC: "desc",
    DEFAULT: "default",
  },
  LOCAL_STORAGE_ID: {
    CURR_STORE_ID: "currStoreId",
    CURR_FILTER_ID: "currFilterId",
    CURR_SORT_KEY: "currSortKey",
    CURR_SORT_ORDER: "currSortOrder",
    STORES_LIST_SPINNER_FETHES: "storesListSpinnerFetches",
    DETAILS_SPINNER_FETHES: "detailsSpinnerFetches",
    FILTERS_SPINNER_FETHES: "filtersSpinnerFetches",
    PRODUCTS_LIST_SPINNER_FETHES: "productsListSpinnerFetches",
    NEW_PRODUCTS_LIST_SPINNER_NEEDED: "newProductsListSpinnerNeeded",
  },
  JS_CLASS: {
    HIDDEN_ELEMENT: "js-hidden-element",
    FLEX_ELEMENT: "js-flex-element",
    SELECTED_ITEM: "js-selected-item",
    ASC_SORT_BTN: "js-asc-sort-btn",
    DESC_SORT_BTN: "js-desc-sort-btn",
    FILTER_OFF: "js-filter-off",
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
    SORT_STATE: {
      KEBAB: "sort-state",
      CAMEL: "sortState",
    },
    SPINNER_INIT_HEIGHT: {
      KEBAB: "init-height",
      CAMEL: "initHeight",
    },
  },
};

// Functions for updating UI
function updateStoresList(storesList) {
  const storesListSection = document.querySelector(
    `#${CONSTANTS.STORES_LAYOUT_ID}`
  );
  const currStoreId = localStorage.getItem(
    CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID
  );

  updateNoStoresLayout(storesList);

  storesListSection.innerHTML = getStructureForStoresList(storesList);

  if (currStoreId) {
    highlightActiveStoreCard(currStoreId);
  }
}

function updateNoStoresLayout(storesList) {
  const noStoresLayout = document.querySelector(
    `#${CONSTANTS.NO_STORES_LAYOUT_ID}`
  );

  if (storesList.length) {
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

  updateStoreDescription();

  setProductsAmountSpinner();
  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
  setProductsListSpinner();
  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
  fetchSearchedProductsListByStoreId(
    localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
  )
    .then((searchedProductsList) => {
      if (Array.isArray(searchedProductsList)) {
        updateProductsFilters(searchedProductsList);

        updateProductsTableBody(searchedProductsList);
      }
    })
    .catch((error) => {
      // TODO: Show something to user on UI
    })
    .finally(() => {
      removeSpinnerById(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
      removeSpinnerById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
    });
}

function setProductsTableHeadToDefault() {
  setCurrFilterBtn(CONSTANTS.FILTER_ID.ALL);

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

function updateStoreDescription() {
  setStoreDetailsSpinner();
  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.STORE_DETAILS);
  fetchStoreById(localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID))
    .then((store) => {
      if (store) {
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
    })
    .catch((error) => {
      // TODO: Show something to user on UI
    })
    .finally(() => {
      removeSpinnerById(CONSTANTS.SPINNERS_ID.STORE_DETAILS);
    });
}

function setAllSortBtnsToDefault() {
  const sortBtns = document.querySelectorAll(`.${CONSTANTS.SORT_BTN_CLASS}`);

  sortBtns.forEach((btn) => {
    btn.classList.remove(
      CONSTANTS.JS_CLASS.ASC_SORT_BTN,
      CONSTANTS.JS_CLASS.DESC_SORT_BTN
    );
    btn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
      CONSTANTS.SORT_ORDER.DEFAULT;
  });
}

function setProductSearchLineToDefault() {
  document.querySelector(`#${CONSTANTS.PRODUCTS_SEARCH_ID.LINE}`).value = "";
}

function setCurrFilterBtn(filterBtnId) {
  const filterToOff = localStorage.getItem(
    CONSTANTS.LOCAL_STORAGE_ID.CURR_FILTER_ID
  );

  if (filterToOff) {
    document
      .querySelector(`#${filterToOff}`)
      ?.classList.add(CONSTANTS.JS_CLASS.FILTER_OFF);
  }

  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_FILTER_ID, filterBtnId);

  document
    .querySelector(`#${filterBtnId}`)
    ?.classList.remove(CONSTANTS.JS_CLASS.FILTER_OFF);
}

function updateProductsFilters(searchedProductsListWithoutFilter) {
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

  const amountsData = getCurrProductsAmounts(searchedProductsListWithoutFilter);

  prodAmountField.textContent = amountsData.all;
  prodOkAmountField.textContent = amountsData.ok;
  prodStorageAmountField.textContent = amountsData.storage;
  prodOutOfStockAmountField.textContent = amountsData.outOfStock;
}

function updateProductsTableBody(productsList) {
  const productsTableBody = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.BODY}`
  );

  // Note: if this is the last productsList fetch update, then we say we don't need new spinner
  if (
    getFetchOperationsAmountForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST) ===
    1
  ) {
    localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_ID.NEW_PRODUCTS_LIST_SPINNER_NEEDED,
      "false"
    );
  } else {
    localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_ID.NEW_PRODUCTS_LIST_SPINNER_NEEDED,
      "true"
    );
  }

  describeProductsListSpinnerResizeListener();

  productsTableBody.innerHTML = getStructureForTableBody(productsList);

  setProductsListSpinner();
}

// Functions for setting spinners
function setStoresListSpinner() {
  if (!getFetchOperationsAmountForSpinner(CONSTANTS.SPINNERS_ID.STORES_LIST)) {
    const storesListHeader = document.querySelector(
      `#${CONSTANTS.STORES_LIST_HEADER_ID}`
    );
    const storesListSection = document.querySelector(
      `#${CONSTANTS.STORES_LIST_SECTION_ID}`
    );

    storesListSection.insertAdjacentHTML(
      "afterbegin",
      getSpinnerStructure(
        CONSTANTS.SPINNERS_ID.STORES_LIST,
        "Updating stores list...",
        storesListSection.offsetWidth,
        window.innerHeight - storesListHeader.offsetHeight,
        "white"
      )
    );
  }
}

function setStoreDetailsSpinner() {
  if (
    !getFetchOperationsAmountForSpinner(CONSTANTS.SPINNERS_ID.STORE_DETAILS)
  ) {
    const storesDetailsDescriptionWrapper = document.querySelector(
      `#${CONSTANTS.STORE_DETAILS_DESCRIPTION_WRAPPER_ID}`
    );

    storesDetailsDescriptionWrapper.insertAdjacentHTML(
      "afterbegin",
      getSpinnerStructure(
        CONSTANTS.SPINNERS_ID.STORE_DETAILS,
        "Updating store description...",
        storesDetailsDescriptionWrapper.offsetWidth,
        storesDetailsDescriptionWrapper.offsetHeight,
        "#eff4f8"
      )
    );
  }
}

function setProductsAmountSpinner() {
  if (
    !getFetchOperationsAmountForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS)
  ) {
    const filtersWrapper = document.querySelector(
      `#${CONSTANTS.FILTER_WRAPPER_ID}`
    );
    const filtersWrapperComputedStyle = getComputedStyle(filtersWrapper);
    const targetWidth =
      filtersWrapper.offsetWidth -
      parseFloat(filtersWrapperComputedStyle.paddingLeft) -
      parseFloat(filtersWrapperComputedStyle.paddingRight);

    filtersWrapper.insertAdjacentHTML(
      "afterbegin",
      getSpinnerStructure(
        CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS,
        "Updating products amounts...",
        targetWidth,
        filtersWrapper.offsetHeight,
        "#eff4f8"
      )
    );
  }
}

function setProductsListSpinner() {
  // Note: in some cases we need to set new spinner if the old one was wiped out by .innerHTML()
  if (
    !getFetchOperationsAmountForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST) ||
    localStorage.getItem(
      CONSTANTS.LOCAL_STORAGE_ID.NEW_PRODUCTS_LIST_SPINNER_NEEDED
    ) === "true"
  ) {
    const tableBody = document.querySelector(
      `#${CONSTANTS.PRODUCTS_TABLE_ID.BODY}`
    );
    const offsetObj = getTopOffsetForProductListSpinner();
    const targetHeight = window.innerHeight - offsetObj.wholeOffset;

    tableBody.insertAdjacentHTML(
      "afterbegin",
      getSpinnerStructure(
        CONSTANTS.SPINNERS_ID.PRODUCTS_LIST,
        "Updating products list...",
        tableBody.offsetWidth,
        targetHeight,
        "white"
      )
    );

    resizeAndMoveProductsListSpinner();

    setProductsListSpinnerResizeListener();
  }
}

function getTopOffsetForProductListSpinner() {
  const storeDetailsHeader = document.querySelector(
    `#${CONSTANTS.STORE_DETAILS_HEADER_ID}`
  );
  const tableWrapperComputedStyle = getComputedStyle(
    document.querySelector(`#${CONSTANTS.PRODUCTS_TABLE_ID.TABLE_WRAPPER}`)
  );
  const tableHeadName = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.HEAD_NAME}`
  );
  const tableHeadTitles = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.HEAD_TITLES}`
  );

  return {
    wholeOffset:
      storeDetailsHeader.offsetHeight +
      parseFloat(tableWrapperComputedStyle.paddingTop) +
      tableHeadName.offsetHeight +
      tableHeadTitles.offsetHeight,
    tableWrapperPaddingOffset: parseFloat(tableWrapperComputedStyle.paddingTop),
    tableHeadNameOffset: tableHeadName.offsetHeight,
  };
}

function resizeAndMoveProductsListSpinner() {
  const storeDetailsWrapper = document.querySelector(
    `#${CONSTANTS.STORE_DETAILS_WRAPPER_ID}`
  );
  const productsListSpinner = document.querySelector(
    `#${CONSTANTS.SPINNERS_ID.PRODUCTS_LIST}`
  );

  if (productsListSpinner) {
    let offsetDiff = storeDetailsWrapper.scrollTop;
    const spinnerInitHeight =
      +productsListSpinner.dataset[
        CONSTANTS.DATA_ATTRIBUTE.SPINNER_INIT_HEIGHT.CAMEL
      ];
    const offsetObj = getTopOffsetForProductListSpinner();
    const maxOffsetDiff =
      offsetObj.tableWrapperPaddingOffset + offsetObj.tableHeadNameOffset;

    if (offsetDiff > maxOffsetDiff) {
      offsetDiff = maxOffsetDiff;
    }
    productsListSpinner.style.height = `${spinnerInitHeight + offsetDiff}px`;
    productsListSpinner.style.top = `${offsetObj.wholeOffset - offsetDiff}px`;
  }
}

function removeSpinnerById(spinnerId) {
  minusFetchOperationForSpinner(spinnerId);

  const spinnerToRemove = document.querySelector(`#${spinnerId}`);

  if (spinnerToRemove && !getFetchOperationsAmountForSpinner(spinnerId)) {
    spinnerToRemove.remove();
  }
}

// Functions for preparing HTML structures for DOM
function getStructureForStoresList(storesList) {
  return storesList.reduce((storesStr, nextStore) => {
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
  return `<tr class="products-table__table-name-row"
          id="${CONSTANTS.PRODUCTS_TABLE_ID.HEAD_NAME}">
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
          <tr class="products-table__product-specifications-row"
          id="${CONSTANTS.PRODUCTS_TABLE_ID.HEAD_TITLES}"
            >${getStructureForTableHeaders()}
          </tr>`;
}

function getStructureForTableHeaders() {
  return CONSTANTS.PRODUCTS_TABLE_COLUMNS.reduce(
    (tablesHeadersStr, [columnKey, columnName, alignType]) => {
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
                  data-${CONSTANTS.DATA_ATTRIBUTE.SORT_KEY.KEBAB}="${columnKey}"
                  data-${CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.KEBAB}="${CONSTANTS.SORT_ORDER.DEFAULT}"
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

function getStructureForTableBody(productsList) {
  let productTableBodyStr = "";

  if (Array.isArray(productsList)) {
    productTableBodyStr = productsList?.reduce((neededStr, product) => {
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

function getSpinnerStructure(
  spinnerId,
  targetText,
  targetWidth,
  targetHeight,
  targetBgColor
) {
  return `<div class="stores-list-section__loading-data-layout" id="${spinnerId}"
          style="width:${
            (targetWidth / document.body.offsetWidth) * 100
          }%;height:${targetHeight}px;background-color:${targetBgColor}"
          data-${
            CONSTANTS.DATA_ATTRIBUTE.SPINNER_INIT_HEIGHT.KEBAB
          }="${targetHeight}">
            <span class="stores-list-section__loading-data-text"
              >${targetText}</span
            >
            <div class="loading-spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
          </div>`;
}

// Functions for setting listeners to UI elements
function setSearchStoresListeners() {
  const searchInput = document.querySelector(
    `#${CONSTANTS.STORES_SEARCH_ID.LINE}`
  );
  const searchBtn = document.querySelector(
    `#${CONSTANTS.STORES_SEARCH_ID.BTN}`
  );

  searchInput.addEventListener("search", onSearchStoresClick);
  searchBtn.addEventListener("click", onSearchStoresClick);
}

function onSearchStoresClick() {
  setStoresListSpinner();
  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.STORES_LIST);
  fetchSearchedStoresList()
    .then((storesList) => {
      if (Array.isArray(storesList)) {
        updateStoresList(storesList);
      }
    })
    .catch((error) => {
      // TODO: Show something to user on UI
    })
    .finally(() => {
      removeSpinnerById(CONSTANTS.SPINNERS_ID.STORES_LIST);
    });
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

function setFiltersBtnsListener() {
  const filtersWrapper = document.querySelector(
    `#${CONSTANTS.FILTER_WRAPPER_ID}`
  );

  filtersWrapper.addEventListener("click", onFilterBtnClick);
}

function onFilterBtnClick(e) {
  const newFilterBtn = e.target.closest(`.${CONSTANTS.FILTER_BTN_CLASS}`);

  if (
    newFilterBtn &&
    newFilterBtn.id !==
      localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_FILTER_ID)
  ) {
    setCurrFilterBtn(newFilterBtn.id);

    setProductsListSpinner();
    plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
    fetchFullFilteredProductsListByStoreId(
      localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
    )
      .then((fullFilteredProductsList) => {
        if (Array.isArray(fullFilteredProductsList)) {
          updateProductsTableBody(fullFilteredProductsList);
        }
      })
      .catch((error) => {
        // TODO: Show something to user on UI
      })
      .finally(() => {
        removeSpinnerById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
      });
  }
}

function setSortBtnsListener() {
  const productTableTitlesWrapper = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.HEAD_TITLES}`
  );

  productTableTitlesWrapper.addEventListener("click", onSortBtnClick);
}

function onSortBtnClick(e) {
  if (e.target.classList.contains(CONSTANTS.SORT_BTN_CLASS)) {
    const currSortBtn = e.target;
    const sortKey =
      currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_KEY.CAMEL];

    switch (currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL]) {
      case CONSTANTS.SORT_ORDER.DEFAULT:
        setAllSortBtnsToDefault();

        currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
          CONSTANTS.SORT_ORDER.ASC;
        currSortBtn.classList.add(CONSTANTS.JS_CLASS.ASC_SORT_BTN);

        setSortFiltersToLocalStorage(sortKey, CONSTANTS.SORT_ORDER.ASC);

        setProductsListSpinner();
        plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
        fetchFullFilteredProductsListByStoreId(
          localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
        )
          .then((fullFilteredProductsList) => {
            if (Array.isArray(fullFilteredProductsList)) {
              updateProductsTableBody(fullFilteredProductsList);
            }
          })
          .catch((error) => {
            // TODO: Show something to user on UI
          })
          .finally(() => {
            removeSpinnerById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
          });

        break;
      case CONSTANTS.SORT_ORDER.ASC:
        currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
          CONSTANTS.SORT_ORDER.DESC;
        currSortBtn.classList.remove(CONSTANTS.JS_CLASS.ASC_SORT_BTN);
        currSortBtn.classList.add(CONSTANTS.JS_CLASS.DESC_SORT_BTN);

        setSortFiltersToLocalStorage(sortKey, CONSTANTS.SORT_ORDER.DESC);

        setProductsListSpinner();
        plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
        fetchFullFilteredProductsListByStoreId(
          localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
        )
          .then((fullFilteredProductsList) => {
            if (Array.isArray(fullFilteredProductsList)) {
              updateProductsTableBody(fullFilteredProductsList);
            }
          })
          .catch((error) => {
            // TODO: Show something to user on UI
          })
          .finally(() => {
            removeSpinnerById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
          });

        break;
      case CONSTANTS.SORT_ORDER.DESC:
        currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
          CONSTANTS.SORT_ORDER.DEFAULT;
        currSortBtn.classList.remove(CONSTANTS.JS_CLASS.DESC_SORT_BTN);

        clearSortFiltersFromLocalStorage();

        setProductsListSpinner();
        plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
        fetchFullFilteredProductsListByStoreId(
          localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
        )
          .then((fullFilteredProductsList) => {
            if (Array.isArray(fullFilteredProductsList)) {
              updateProductsTableBody(fullFilteredProductsList);
            }
          })
          .catch((error) => {
            // TODO: Show something to user on UI
          })
          .finally(() => {
            removeSpinnerById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
          });

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

  searchInput.addEventListener("search", onSearchProductsClick);
  searchBtn.addEventListener("click", onSearchProductsClick);
}

function onSearchProductsClick() {
  const searchedProductsPromise = fetchSearchedProductsListByStoreId(
    localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
  ).then((searchedProductsList) => {
    if (Array.isArray(searchedProductsList)) {
      updateProductsFilters(searchedProductsList);
    }
  });

  const fullFilteredProductsPromise = fetchFullFilteredProductsListByStoreId(
    localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
  ).then((fullFilteredProductsList) => {
    if (Array.isArray(fullFilteredProductsList)) {
      updateProductsTableBody(fullFilteredProductsList);
    }
  });

  setProductsAmountSpinner();
  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
  setProductsListSpinner();
  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
  Promise.all([searchedProductsPromise, fullFilteredProductsPromise])
    .catch((error) => {
      // TODO: Show something to user on UI
    })
    .finally(() => {
      removeSpinnerById(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
      removeSpinnerById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
    });
}

// This listener is needed to change size and offset for productsList table spinner if user scrolls products table
function setProductsListSpinnerResizeListener() {
  const storeDetailsWrapper = document.querySelector(
    `#${CONSTANTS.STORE_DETAILS_WRAPPER_ID}`
  );

  storeDetailsWrapper.addEventListener(
    "scroll",
    resizeAndMoveProductsListSpinner
  );
}

// We should not forget to describe this listener from wrapper when productsList table spinner is removed
function describeProductsListSpinnerResizeListener() {
  const storeDetailsWrapper = document.querySelector(
    `#${CONSTANTS.STORE_DETAILS_WRAPPER_ID}`
  );

  storeDetailsWrapper.removeEventListener(
    "scroll",
    resizeAndMoveProductsListSpinner
  );
}

// Other supporting functions
function setSortFiltersToLocalStorage(sortKey, sortOrder) {
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY, sortKey);
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER, sortOrder);
}

function clearSortFiltersFromLocalStorage() {
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER);
}

function initLocalStorageData() {
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_FILTER_ID);
  clearSortFiltersFromLocalStorage();
  localStorage.setItem(
    CONSTANTS.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
    "0"
  );
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES, "0");
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES, "0");
  localStorage.setItem(
    CONSTANTS.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
    "0"
  );
  localStorage.setItem(
    CONSTANTS.LOCAL_STORAGE_ID.NEW_PRODUCTS_LIST_SPINNER_NEEDED,
    "true"
  );
}

function getCurrProductsAmounts(searchedProductsListWithoutFilter) {
  const amountsData = {
    all: searchedProductsListWithoutFilter.length,
    ok: 0,
    storage: 0,
    outOfStock: 0,
  };

  searchedProductsListWithoutFilter.forEach((product) => {
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

function getFilterTypeByFilterId(filterId) {
  return Object.keys(CONSTANTS.FILTER_ID).find(
    (filterType) => CONSTANTS.FILTER_ID[filterType] === filterId
  );
}

function getOrderTypeByOrderAttribute(orderAttribute) {
  return Object.keys(CONSTANTS.SORT_ORDER).find(
    (orderType) => CONSTANTS.SORT_ORDER[orderType] === orderAttribute
  );
}

function getFetchOperationsAmountForSpinner(spinnerId) {
  switch (spinnerId) {
    case CONSTANTS.SPINNERS_ID.STORES_LIST:
      const storesListFetches = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES
      );
      return storesListFetches;
    case CONSTANTS.SPINNERS_ID.STORE_DETAILS:
      const detailsFethes = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES
      );
      return detailsFethes;
    case CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS:
      const filtersFetches = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES
      );
      return filtersFetches;
    case CONSTANTS.SPINNERS_ID.PRODUCTS_LIST:
      const productsListFetches = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES
      );
      return productsListFetches;
    default:
      console.warn(
        `Got unknown type of spinner while getting fetches amount, spinerId: ${spinnerId}`
      );
  }
}

function plusFetchOperationForSpinner(spinnerId) {
  switch (spinnerId) {
    case CONSTANTS.SPINNERS_ID.STORES_LIST:
      let storesListFetches = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES
      );
      storesListFetches++;
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
        storesListFetches
      );
      break;
    case CONSTANTS.SPINNERS_ID.STORE_DETAILS:
      let detailsFethes = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES
      );
      detailsFethes++;
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES,
        detailsFethes
      );
      break;
    case CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS:
      let filtersFetches = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES
      );
      filtersFetches++;
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES,
        filtersFetches
      );
      break;
    case CONSTANTS.SPINNERS_ID.PRODUCTS_LIST:
      let productsListFetches = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES
      );
      productsListFetches++;
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
        productsListFetches
      );
      break;
    default:
      console.warn(
        `Got unknown type of spinner while plusing fetch operation, spinerId: ${spinnerId}`
      );
  }
}

function minusFetchOperationForSpinner(spinnerId) {
  switch (spinnerId) {
    case CONSTANTS.SPINNERS_ID.STORES_LIST:
      let storesListFetches = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES
      );
      storesListFetches--;
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
        storesListFetches
      );
      break;
    case CONSTANTS.SPINNERS_ID.STORE_DETAILS:
      let detailsFethes = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES
      );
      detailsFethes--;
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES,
        detailsFethes
      );
      break;
    case CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS:
      let filtersFetches = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES
      );
      filtersFetches--;
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES,
        filtersFetches
      );
      break;
    case CONSTANTS.SPINNERS_ID.PRODUCTS_LIST:
      let productsListFetches = +localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES
      );
      productsListFetches--;
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
        productsListFetches
      );
      break;
    default:
      console.warn(
        `Got unknown type of spinner while minusing fetch operation, spinerId: ${spinnerId}`
      );
  }
}

// Functions for working with server
async function fetchData(endPoint) {
  try {
    const response = await fetch(`${CONSTANTS.SERVER.API_PREFIX}${endPoint}`);

    if (!response.ok) {
      throw new Error(`Response status - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error while fetching data: ${error.message}`);
    throw new Error(error.message);
  }
}

async function fetchSearchedStoresList() {
  try {
    let neededURL = CONSTANTS.SERVER.STORES;
    const searchFilterValue = document.querySelector(
      `#${CONSTANTS.STORES_SEARCH_ID.LINE}`
    ).value;
    const filterObj = {};

    if (searchFilterValue) {
      filterObj.where = {
        or: [
          { Name: { regexp: `/${searchFilterValue}/i` } },
          { Address: { regexp: `/${searchFilterValue}/i` } },
          { FloorArea: searchFilterValue },
        ],
      };
    }

    if (filterObj.where) {
      neededURL += `?filter=${JSON.stringify(filterObj)}`;
    }

    return await fetchData(neededURL);
  } catch (error) {
    console.error(`Error while fetching stores list: ${error.message}`);
    throw new Error(`Error while fetching stores list: ${error.message}`);
  }
}

async function fetchStoreById(storeId) {
  try {
    return await fetchData(
      CONSTANTS.SERVER.STORE_BY_ID.replace("{storeId}", storeId)
    );
  } catch (error) {
    console.error(
      `Error while fetching store with id=${storeId} : ${error.message}`
    );
    throw new Error(
      `Error while fetching store with id=${storeId} : ${error.message}`
    );
  }
}

async function fetchSearchedProductsListByStoreId(storeId) {
  try {
    let neededURL = CONSTANTS.SERVER.PRODUCTS_BY_STORE_ID.replace(
      "{storeId}",
      storeId
    );
    const searchFilterValue = document.querySelector(
      `#${CONSTANTS.PRODUCTS_SEARCH_ID.LINE}`
    ).value;
    const filterObj = {};

    if (searchFilterValue) {
      filterObj.where = {
        or: [
          { Name: { regexp: `/${searchFilterValue}/i` } },
          { Price: searchFilterValue },
          { Specs: { regexp: `/${searchFilterValue}/i` } },
          { SupplierInfo: { regexp: `/${searchFilterValue}/i` } },
          { MadeIn: { regexp: `/${searchFilterValue}/i` } },
          {
            ProductionCompanyName: { regexp: `/${searchFilterValue}/i` },
          },
          { Rating: searchFilterValue },
        ],
      };
    }

    if (filterObj.where) {
      neededURL += `?filter=${JSON.stringify(filterObj)}`;
    }

    return await fetchData(neededURL);
  } catch (error) {
    console.error(
      `Error while fetching all products list with id=${storeId} : ${error.message}`
    );
    throw new Error(
      `Error while fetching all products list with id=${storeId} : ${error.message}`
    );
  }
}

async function fetchFullFilteredProductsListByStoreId(storeId) {
  try {
    let neededURL = CONSTANTS.SERVER.PRODUCTS_BY_STORE_ID.replace(
      "{storeId}",
      storeId
    );
    const filterId = localStorage.getItem(
      CONSTANTS.LOCAL_STORAGE_ID.CURR_FILTER_ID
    );
    const sortKey = localStorage.getItem(
      CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY
    );
    const sortOrder = localStorage.getItem(
      CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER
    );
    const searchFilterValue = document.querySelector(
      `#${CONSTANTS.PRODUCTS_SEARCH_ID.LINE}`
    ).value;
    const filterObj = {};

    if (searchFilterValue) {
      if (filterId && filterId !== CONSTANTS.FILTER_ID.ALL) {
        filterObj.where = {
          and: [
            { Status: getFilterTypeByFilterId(filterId) },
            {
              or: [
                { Name: { regexp: `/${searchFilterValue}/i` } },
                { Price: searchFilterValue },
                { Specs: { regexp: `/${searchFilterValue}/i` } },
                { SupplierInfo: { regexp: `/${searchFilterValue}/i` } },
                { MadeIn: { regexp: `/${searchFilterValue}/i` } },
                {
                  ProductionCompanyName: { regexp: `/${searchFilterValue}/i` },
                },
                { Rating: searchFilterValue },
              ],
            },
          ],
        };
      } else {
        filterObj.where = {
          or: [
            { Name: { regexp: `/${searchFilterValue}/i` } },
            { Price: searchFilterValue },
            { Specs: { regexp: `/${searchFilterValue}/i` } },
            { SupplierInfo: { regexp: `/${searchFilterValue}/i` } },
            { MadeIn: { regexp: `/${searchFilterValue}/i` } },
            {
              ProductionCompanyName: { regexp: `/${searchFilterValue}/i` },
            },
            { Rating: searchFilterValue },
          ],
        };
      }
    } else {
      if (filterId && filterId !== CONSTANTS.FILTER_ID.ALL) {
        filterObj.where = {
          Status: getFilterTypeByFilterId(filterId),
        };
      }
    }

    if (sortKey && sortOrder && sortOrder !== CONSTANTS.SORT_ORDER.DEFAULT) {
      filterObj.order = `${sortKey} ${getOrderTypeByOrderAttribute(sortOrder)}`;
    }

    if (filterObj.where || filterObj.order) {
      neededURL += `?filter=${JSON.stringify(filterObj)}`;
    }

    return await fetchData(neededURL);
  } catch (error) {
    console.error(
      `Error while fetching specific products list of store with id=${storeId} : ${error.message}`
    );
    throw new Error(
      `Error while fetching specific products list of store with id=${storeId} : ${error.message}`
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initLocalStorageData();

  setStoresListSpinner();
  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.STORES_LIST);
  fetchSearchedStoresList()
    .then((storesList) => {
      if (Array.isArray(storesList)) {
        updateStoresList(storesList);
      }
    })
    .catch((error) => {
      // TODO: Show something to user on UI
    })
    .finally(() => {
      removeSpinnerById(CONSTANTS.SPINNERS_ID.STORES_LIST);
    });

  setSearchStoresListeners();

  setStoresCardsClickListener();

  setFiltersBtnsListener();

  renderProductsTableHead();
});
