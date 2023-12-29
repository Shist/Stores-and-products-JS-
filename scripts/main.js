"use strict";

const CONSTANTS = {
  SERVER: {
    API_PREFIX: "http://localhost:3000/api",
    KEYS: {
      STORE: {
        NAME: "Name",
        EMAIL: "Email",
        PHONE: "PhoneNumber",
        ADDRESS: "Address",
        ESTABLISHED_DATE: "Established",
        FLOOR_AREA: "FloorArea",
      },
      PRODUCT: {
        NAME: "Name",
        PRICE: "Price",
        SPECS: "Specs",
        RATING: "Rating",
        SUPPLIER_INFO: "SupplierInfo",
        COUNTRY: "MadeIn",
        PROD_COMPANY: "ProductionCompanyName",
        STATUS: "Status",
      },
    },
    GET: {
      STORES: "/Stores",
      STORE_BY_ID: "/Stores/{storeId}",
      PRODUCTS_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
    },
    POST: {
      STORE: "/Stores",
      PRODUCT_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
    },
    DELETE: {
      STORE_BY_ID: "/Stores/{storeId}",
      PRDOCUTS_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
      PRODUCT_BY_ID: "/Products/{productId}",
    },
  },
  SPINNERS_ID: {
    STORES_LIST: "stores-list-spinner",
    STORE_DETAILS: "store-details-spinner",
    PRODUCTS_AMOUNTS: "products-amounts-spinner",
    PRODUCTS_LIST: "products-list-spinner",
  },
  SPINNER_TEXT: {
    STORES_LIST: {
      LOADING: "Loading stores list...",
      UPDATING: "Loading updated stores list...",
      CREATING: "Creating new store...",
      DELETING_STORE: "Deleting store...",
      DELETING_STORE_PRODUCTS: "Deleting all products of store...",
    },
    STORE_DETAILS: {
      LOADING: "Loading store description...",
    },
    PRODUCTS_AMOUNTS: {
      LOADING: "Loading products amounts...",
      UPDATING: "Loading updated products amounts...",
      CREATING: "Creating new product...",
      DELETING: "Deleting product...",
    },
    PRODUCTS_LIST: {
      LOADING: "Loading products list...",
      UPDATING: "Loading updated products list...",
      CREATING: "Creating new product...",
      DELETING_STORE: "Deleting store...",
      DELETING_STORE_PRODUCTS: "Deleting all products of store...",
      DELETING_PRODUCT: "Deleting product...",
    },
  },
  STORES_LIST_HEADER_ID: "stores-list-header",
  STORES_LIST_SECTION_ID: "stores-list-section",
  STORES_LAYOUT_ID: "stores-list-layout",
  NO_STORES_LAYOUT_ID: "no-stores-list-layout",
  STORES_LIST_ITEM_CLASS: "stores-list-item",
  STORES_SEARCH_ID: {
    WRAPPER: "store-search-wrapper",
    INPUT: "stores-search-line",
    BTN: "stores-search-btn",
  },
  BTN_CREATE_STORE_ID: "btn-create-store",
  BTN_DELETE_STORE_ID: "btn-delete-store",
  BTN_CREATE_PRODUCT_ID: "btn-create-product",
  STORE_DETAILS_HEADER_ID: "store-details-header",
  STORE_DETAILS_WRAPPER_ID: "store-details-wrapper",
  NO_STORE_DETAILS_WRAPPER_ID: "no-store-details-wrapper",
  STORE_NOT_FOUND_WRAPPER_ID: "store-not-found-wrapper",
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
    TABLE: "products-table",
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
    WRAPPER: "products-search-wrapper",
    INPUT: "products-search-line",
    BTN: "products-search-btn",
  },
  SORT_BTN_CLASS: "products-table__product-field-sort-btn",
  CROSS_BTN_CLASS: "cross-btn",
  SORT_ORDER: {
    ASC: "asc",
    DESC: "desc",
    DEFAULT: "default",
  },
  LOCAL_STORAGE_ID: {
    CURR_STORE_ID: "currStoreId",
    BOOKMARK_DETECTED: "bookmarkIsDetected",
    CURR_PRODUCT_ID: "currProductId",
    CURR_FILTER_ID: "currFilterId",
    CURR_SORT_KEY: "currSortKey",
    CURR_SORT_ORDER: "currSortOrder",
    STORES_LIST_SPINNER_FETHES: "storesListSpinnerFetches",
    DETAILS_SPINNER_FETHES: "detailsSpinnerFetches",
    FILTERS_SPINNER_FETHES: "filtersSpinnerFetches",
    PRODUCTS_LIST_SPINNER_FETHES: "productsListSpinnerFetches",
  },
  JS_CLASS: {
    HIDDEN_ELEMENT: "js-hidden-element",
    FLEX_ELEMENT: "js-flex-element",
    SELECTED_ITEM: "js-selected-item",
    ASC_SORT_BTN: "js-asc-sort-btn",
    DESC_SORT_BTN: "js-desc-sort-btn",
    FILTER_OFF: "js-filter-off",
    ERROR_FIELD_WRAPPER: "js-error-field-wrapper",
    ERROR_FIELD: "js-error-field",
    ERROR_SEARCH_FIELD: "js-error-search-field",
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
    PRODUCT_ID: {
      KEBAB: "product-id",
      CAMEL: "productId",
    },
    SPINNER_INIT_HEIGHT: {
      KEBAB: "init-height",
      CAMEL: "initHeight",
    },
    SPINNER_INIT_WIDTH: {
      KEBAB: "init-width",
      CAMEL: "initWidth",
    },
    WINDOW_INIT_WIDTH: {
      KEBAB: "window-init-width",
      CAMEL: "windowInitWidth",
    },
    ERROR_MSG: {
      KEBAB: "error-msg",
      CAMEL: "errorMsg",
    },
  },
  POPUPS_WRAPPER_ID: "popup-wrapper",
  POPUP_CLASS: "popup",
  POPUP_TEXT_CLASS: "popup__text",
  POPUP_SUCCESS_COLOR: "lawngreen",
  POPUP_ATTENTION_COLOR: "yellow",
  POPUP_ERROR_COLOR: "red",
  MODALS_ID: {
    CREATE_STORE: {
      WRAPPER: "modal-create-store",
      BTN_CONFIRM: "btn-create-store-confirm",
      BTN_CANCEL: "btn-create-store-cancel",
      FORM: "create-store-form",
      INPUT_NAME_WRAPPER: "modal-create-store-name-wrapper",
      INPUT_NAME: "modal-create-store-name",
      INPUT_EMAIL_WRAPPER: "modal-create-store-email-wrapper",
      INPUT_EMAIL: "modal-create-store-email",
      INPUT_PHONE_WRAPPER: "modal-create-store-phone-wrapper",
      INPUT_PHONE: "modal-create-store-phone",
      INPUT_ADDRESS_WRAPPER: "modal-create-store-address-wrapper",
      INPUT_ADDRESS: "modal-create-store-address",
      INPUT_ESTABLISHED_DATE_WRAPPER:
        "modal-create-store-established-date-wrapper",
      INPUT_ESTABLISHED_DATE: "modal-create-store-established-date",
      INPUT_FLOOR_AREA_WRAPPER: "modal-create-store-floor-area-wrapper",
      INPUT_FLOOR_AREA: "modal-create-store-floor-area",
    },
    DELETE_STORE: {
      WRAPPER: "modal-delete-store",
      BTN_CONFIRM: "btn-delete-store-confirm",
      BTN_CANCEL: "btn-delete-store-cancel",
    },
    CREATE_PRODUCT: {
      WRAPPER: "modal-create-product",
      BTN_CONFIRM: "btn-create-product-confirm",
      BTN_CANCEL: "btn-create-product-cancel",
      FORM: "create-product-form",
      INPUT_NAME_WRAPPER: "modal-create-product-name-wrapper",
      INPUT_NAME: "modal-create-product-name",
      INPUT_PRICE_WRAPPER: "modal-create-product-price-wrapper",
      INPUT_PRICE: "modal-create-product-price",
      INPUT_SPECS_WRAPPER: "modal-create-product-specs-wrapper",
      INPUT_SPECS: "modal-create-product-specs",
      INPUT_RATING_WRAPPER: "modal-create-product-rating-wrapper",
      INPUT_RATING: "modal-create-product-rating",
      INPUT_SUPPLIER_INFO_WRAPPER: "modal-create-product-supplier-info-wrapper",
      INPUT_SUPPLIER_INFO: "modal-create-product-supplier-info",
      INPUT_COUNTRY_WRAPPER: "modal-create-product-country-wrapper",
      INPUT_COUNTRY: "modal-create-product-country",
      INPUT_PROD_COMPANY_WRAPPER: "modal-create-product-prod-company-wrapper",
      INPUT_PROD_COMPANY: "modal-create-product-prod-company",
      INPUT_STATUS_WRAPPER: "modal-create-product-status-wrapper",
      INPUT_STATUS: "modal-create-product-status",
    },
    DELETE_PRODUCT: {
      WRAPPER: "modal-delete-product",
      BTN_CONFIRM: "btn-delete-product-confirm",
      BTN_CANCEL: "btn-delete-product-cancel",
    },
    ERROR: {
      WRAPPER: "modal-validation-error",
      BTN_OK: "modal-validation-error-ok-btn",
    },
  },
  MODAL_FIELD_INPUT_WRAPPER_CLASS: "modal-window__field-input-wrapper",
  MODAL_FIELD_INPUT_CLASS: "modal-window__field-input",
  DEFAULT_ERROR_MSG: "No errors yet...",
  DEFAULT_NOT_SPECIFIED_MSG: "(not specified)",
  BOOKMARK_QUERY_STORE_ID: "store-id",
};

// Functions for updating UI
function updateStoresList(storesList) {
  const storesListSection = document.querySelector(
    `#${CONSTANTS.STORES_LAYOUT_ID}`
  );
  const currStoreId = localStorage.getItem(
    CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID
  );

  updateStoresListLayout(storesList);

  storesListSection.innerHTML = getStructureForStoresList(storesList);

  if (currStoreId) {
    highlightActiveStoreCard(currStoreId);
  }
}

function updateStoresListLayout(storesList) {
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

  setTableSortBtnsListener();

  setSearchProductsListeners();
}

function updateAllStoreDetails() {
  setProductsTableHeadToDefault();

  highlightActiveStoreCard();

  updateStoreDetailsLayout();

  updateStoreDescription();

  setProductsAmountSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_AMOUNTS.LOADING);
  setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

  getSearchedProductsListByStoreId(
    localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
  )
    .then((searchedProductsList) => {
      if (Array.isArray(searchedProductsList)) {
        updateProductsAmounts(searchedProductsList);

        updateProductsTableBody(searchedProductsList);
      }
    })
    .catch((error) => {
      showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
      if (localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.BOOKMARK_DETECTED)) {
        const storeDetailsWrapper = document.querySelector(
          `#${CONSTANTS.STORE_DETAILS_WRAPPER_ID}`
        );
        const storeNotFoundWrapper = document.querySelector(
          `#${CONSTANTS.STORE_NOT_FOUND_WRAPPER_ID}`
        );
        storeDetailsWrapper.classList.remove(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
        storeNotFoundWrapper.classList.add(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
      }
    })
    .finally(() => {
      requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
      requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
    });
}

function setProductsTableHeadToDefault() {
  setCurrProductsFilterBtn(CONSTANTS.FILTER_ID.ALL);

  clearTableSortFiltersFromLocalStorage();

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

function updateStoreDetailsLayout() {
  const storeDetailsWrapper = document.querySelector(
    `#${CONSTANTS.STORE_DETAILS_WRAPPER_ID}`
  );
  const noStoreDetailsWrapper = document.querySelector(
    `#${CONSTANTS.NO_STORE_DETAILS_WRAPPER_ID}`
  );
  const storeNotFoundWrapper = document.querySelector(
    `#${CONSTANTS.STORE_NOT_FOUND_WRAPPER_ID}`
  );

  if (localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)) {
    storeDetailsWrapper.classList.add(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
    noStoreDetailsWrapper.classList.add(CONSTANTS.JS_CLASS.HIDDEN_ELEMENT);
    storeNotFoundWrapper.classList.remove(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
  } else {
    storeDetailsWrapper.classList.remove(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
    noStoreDetailsWrapper.classList.remove(CONSTANTS.JS_CLASS.HIDDEN_ELEMENT);
  }
}

function updateStoreDescription() {
  setStoreDescriptionSpinner(CONSTANTS.SPINNER_TEXT.STORE_DETAILS.LOADING);

  getStoreById(localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID))
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

        if (store.Email) {
          storeEmailField.textContent = store.Email;
        } else {
          storeEmailField.textContent = CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
        }
        if (store.Established) {
          storeEstDateField.textContent = new Date(
            store.Established
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } else {
          storeEstDateField.textContent = CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
        }
        if (store.Address) {
          storeAddressField.textContent = store.Address;
        } else {
          storeAddressField.textContent = CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
        }
        if (store.PhoneNumber) {
          storePhoneField.textContent = store.PhoneNumber;
        } else {
          storePhoneField.textContent = CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
        }
        if (store.FloorArea) {
          storeFloorAreaField.textContent = store.FloorArea;
        } else {
          storeFloorAreaField.textContent = CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
        }
      }
    })
    .catch((error) => {
      showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
    })
    .finally(() => {
      requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.STORE_DETAILS);
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
  document.querySelector(`#${CONSTANTS.PRODUCTS_SEARCH_ID.INPUT}`).value = "";
}

function setCurrProductsFilterBtn(filterBtnId) {
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

function updateProductsAmounts(searchedProductsListWithoutFilter) {
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

  productsTableBody.innerHTML = getStructureForTableBody(productsList);
}

function showErrorModal() {
  const modalWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.ERROR.WRAPPER}`
  );

  modalWrapper.classList.add(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
}

function closeErrorModal() {
  const modalWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.ERROR.WRAPPER}`
  );

  modalWrapper.classList.remove(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
}

function showPopupWithMsg(msg, color, timeMillisecs) {
  const popupsWrapper = document.querySelector(
    `#${CONSTANTS.POPUPS_WRAPPER_ID}`
  );

  const msgSpan = document.createElement("span");
  msgSpan.classList.add(CONSTANTS.POPUP_TEXT_CLASS);
  msgSpan.textContent = msg;
  msgSpan.style.color = color;

  const popup = document.createElement("div");
  popup.classList.add(CONSTANTS.POPUP_CLASS);
  popup.insertAdjacentElement("afterbegin", msgSpan);

  popupsWrapper.insertAdjacentElement("beforeend", popup);

  setTimeout(() => {
    popup.style.opacity = "0";

    setTimeout(() => {
      popup.remove();
    }, 2000);
  }, timeMillisecs);
}

function validateSearch(searchWrapper, searchInput) {
  const searchRegex = /^[^#%&*()\[\]{}\\]*$/;

  if (!searchRegex.test(searchInput.value)) {
    addErrorToInput(
      searchInput,
      CONSTANTS.JS_CLASS.ERROR_SEARCH_FIELD,
      searchWrapper,
      `Prohibited symbols entered!`
    );
    return false;
  } else {
    removeErrorFromInput(
      searchInput,
      CONSTANTS.JS_CLASS.ERROR_SEARCH_FIELD,
      searchWrapper
    );
    return true;
  }
}

// Functions for form validations
function addErrorToInput(input, inputErrClass, inputWrapper, errorMsg) {
  input.classList.add(inputErrClass);
  inputWrapper.dataset[CONSTANTS.DATA_ATTRIBUTE.ERROR_MSG.CAMEL] = errorMsg;
  inputWrapper.classList.add(CONSTANTS.JS_CLASS.ERROR_FIELD_WRAPPER);
}

function removeErrorFromInput(input, inputErrClass, inputWrapper) {
  input.classList.remove(inputErrClass);
  inputWrapper.dataset[CONSTANTS.DATA_ATTRIBUTE.ERROR_MSG.CAMEL] =
    CONSTANTS.DEFAULT_ERROR_MSG;
  inputWrapper.classList.remove(CONSTANTS.JS_CLASS.ERROR_FIELD_WRAPPER);
}

function validateCreateStoreForm() {
  const nameIsOk = validateCreateStoreName();
  const emailIsOk = validateCreateStoreEmail();
  const phoneIsOk = validateCreateStorePhone();
  const floorAreaIsOk = validateCreateStoreFloorArea();

  return nameIsOk && emailIsOk && phoneIsOk && floorAreaIsOk;
}

function validateCreateStoreName() {
  const inputNameWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_NAME_WRAPPER}`
  );
  const inputName = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_NAME}`
  );

  if (!inputName.value) {
    addErrorToInput(
      inputName,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputNameWrapper,
      "Name can not be empty!"
    );
    return false;
  } else if (
    inputName.value
      .split(" ")
      .map((word) => word.length)
      .find((wordLength) => wordLength > 15)
  ) {
    addErrorToInput(
      inputName,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputNameWrapper,
      "Name can not contain words with >15 symbols!"
    );
    return false;
  } else {
    removeErrorFromInput(
      inputName,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputNameWrapper
    );
    return true;
  }
}

function validateCreateStoreEmail() {
  const inputEmailWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_EMAIL_WRAPPER}`
  );
  const inputEmail = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_EMAIL}`
  );
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!inputEmail.value) {
    addErrorToInput(
      inputEmail,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputEmailWrapper,
      "Email can not be empty!"
    );
    return false;
  } else if (!emailRegex.test(inputEmail.value)) {
    addErrorToInput(
      inputEmail,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputEmailWrapper,
      "Email you have entered is invalid!"
    );
    return false;
  } else {
    removeErrorFromInput(
      inputEmail,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputEmailWrapper
    );
    return true;
  }
}

function validateCreateStorePhone() {
  const inputPhoneWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_PHONE_WRAPPER}`
  );
  const inputPhone = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_PHONE}`
  );

  if (!inputPhone.value) {
    addErrorToInput(
      inputPhone,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputPhoneWrapper,
      "Phone can not be empty!"
    );
    return false;
  } else {
    removeErrorFromInput(
      inputPhone,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputPhoneWrapper
    );
    return true;
  }
}

function validateCreateStoreFloorArea() {
  const inputFloorAreaWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_FLOOR_AREA_WRAPPER}`
  );
  const inputFloorArea = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_FLOOR_AREA}`
  );

  if (inputFloorArea.value && +inputFloorArea.value <= 0) {
    addErrorToInput(
      inputFloorArea,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputFloorAreaWrapper,
      "Floor area must be positive!"
    );
    return false;
  } else {
    removeErrorFromInput(
      inputFloorArea,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputFloorAreaWrapper
    );
    return true;
  }
}

function validateCreateProductForm() {
  const nameIsOk = validateCreateProductName();
  const priceIsOk = validateCreateProductPrice();
  const specsIsOk = validateCreateProductSpecs();
  const ratingIsOk = validateCreateProductRating();

  return nameIsOk && priceIsOk && specsIsOk && ratingIsOk;
}

function validateCreateProductName() {
  const inputNameWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_NAME_WRAPPER}`
  );
  const inputName = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_NAME}`
  );

  if (!inputName.value) {
    addErrorToInput(
      inputName,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputNameWrapper,
      "Name can not be empty!"
    );
    return false;
  } else {
    removeErrorFromInput(
      inputName,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputNameWrapper
    );
    return true;
  }
}

function validateCreateProductPrice() {
  const inputPriceWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_PRICE_WRAPPER}`
  );
  const inputPrice = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_PRICE}`
  );

  if (inputPrice.value && +inputPrice.value <= 0) {
    addErrorToInput(
      inputPrice,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputPriceWrapper,
      "Price must be positive!"
    );
    return false;
  } else {
    removeErrorFromInput(
      inputPrice,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputPriceWrapper
    );
    return true;
  }
}

function validateCreateProductSpecs() {
  const inputSpecsWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_SPECS_WRAPPER}`
  );
  const inputSpecs = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_SPECS}`
  );

  if (!inputSpecs.value) {
    addErrorToInput(
      inputSpecs,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputSpecsWrapper,
      "Specs can not be empty!"
    );
    return false;
  } else {
    removeErrorFromInput(
      inputSpecs,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputSpecsWrapper
    );
    return true;
  }
}

function validateCreateProductRating() {
  const inputRatingWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_RATING_WRAPPER}`
  );
  const inputRating = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_RATING}`
  );

  if (inputRating.value && +inputRating.value < 1) {
    addErrorToInput(
      inputRating,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputRatingWrapper,
      "Rating must be at least 1!"
    );
    return false;
  } else if (inputRating.value && +inputRating.value > 5) {
    addErrorToInput(
      inputRating,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputRatingWrapper,
      "Rating must be no more than 5!"
    );
    return false;
  } else if (inputRating.value && !Number.isInteger(+inputRating.value)) {
    addErrorToInput(
      inputRating,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputRatingWrapper,
      "Rating must have an integer value"
    );
    return false;
  } else {
    removeErrorFromInput(
      inputRating,
      CONSTANTS.JS_CLASS.ERROR_FIELD,
      inputRatingWrapper
    );
    return true;
  }
}

// Functions for setting spinners
function setStoresListSpinner(spinnerText) {
  if (!getFetchOperationsAmountForSpinner(CONSTANTS.SPINNERS_ID.STORES_LIST)) {
    const storesListHeader = document.querySelector(
      `#${CONSTANTS.STORES_LIST_HEADER_ID}`
    );
    const storesListSection = document.querySelector(
      `#${CONSTANTS.STORES_LIST_SECTION_ID}`
    );

    const spinnerOptions = {
      spinnerId: CONSTANTS.SPINNERS_ID.STORES_LIST,
      targetText: spinnerText,
      targetWidth: `${storesListSection.offsetWidth}px`,
      targetMinWidth: 0,
      targetHeight: `${window.innerHeight - storesListHeader.offsetHeight}px`,
      targetBgColor: "white",
    };

    storesListSection.insertAdjacentHTML(
      "afterbegin",
      getSpinnerStructure(spinnerOptions)
    );
  } else {
    const currSpinner = document.querySelector(
      `#${CONSTANTS.SPINNERS_ID.STORES_LIST}`
    );
    if (currSpinner) {
      const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
      spinnerSpan.textContent = spinnerText;
    }
  }

  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.STORES_LIST);
}

function setStoreDescriptionSpinner(spinnerText) {
  if (
    !getFetchOperationsAmountForSpinner(CONSTANTS.SPINNERS_ID.STORE_DETAILS)
  ) {
    const storesDetailsDescriptionWrapper = document.querySelector(
      `#${CONSTANTS.STORE_DETAILS_DESCRIPTION_WRAPPER_ID}`
    );
    const targetWidthPercent =
      (storesDetailsDescriptionWrapper.offsetWidth /
        document.body.offsetWidth) *
      100;

    const spinnerOptions = {
      spinnerId: CONSTANTS.SPINNERS_ID.STORE_DETAILS,
      targetText: spinnerText,
      targetWidth: `${targetWidthPercent}%`,
      targetMinWidth: "450px",
      targetHeight: `${storesDetailsDescriptionWrapper.offsetHeight}px`,
      targetBgColor: "#eff4f8",
    };

    storesDetailsDescriptionWrapper.insertAdjacentHTML(
      "afterbegin",
      getSpinnerStructure(spinnerOptions)
    );
  } else {
    const currSpinner = document.querySelector(
      `#${CONSTANTS.SPINNERS_ID.STORE_DETAILS}`
    );
    if (currSpinner) {
      const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
      spinnerSpan.textContent = spinnerText;
    }
  }

  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.STORE_DETAILS);
}

function setProductsAmountSpinner(spinnerText) {
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
    const targetWidthPercent = (targetWidth / document.body.offsetWidth) * 100;

    const spinnerOptions = {
      spinnerId: CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS,
      targetText: spinnerText,
      targetWidth: `${targetWidthPercent}%`,
      targetMinWidth: "400px",
      targetHeight: `${filtersWrapper.offsetHeight}px`,
      targetBgColor: "#eff4f8",
    };

    filtersWrapper.insertAdjacentHTML(
      "afterbegin",
      getSpinnerStructure(spinnerOptions)
    );
  } else {
    const currSpinner = document.querySelector(
      `#${CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS}`
    );
    if (currSpinner) {
      const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
      spinnerSpan.textContent = spinnerText;
    }
  }

  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
}

function setProductsListSpinner(spinnerText) {
  if (
    !getFetchOperationsAmountForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST)
  ) {
    const table = document.querySelector(
      `#${CONSTANTS.PRODUCTS_TABLE_ID.TABLE}`
    );
    const topOffsetObj = getTopOffsetForProductsListSpinner();
    const targetHeight = window.innerHeight - topOffsetObj.wholeOffset;

    const spinnerOptions = {
      spinnerId: CONSTANTS.SPINNERS_ID.PRODUCTS_LIST,
      targetText: spinnerText,
      targetWidth: `${table.offsetWidth}px`,
      targetMinWidth: 0,
      targetHeight: `${targetHeight}px`,
      targetBgColor: "white",
    };

    table.insertAdjacentHTML("afterbegin", getSpinnerStructure(spinnerOptions));

    resizeWidthForProductsListSpinner();
    resizeHeightAndMoveProductsListSpinner();

    setProductsListSpinnerResizeListeners();
  } else {
    const currSpinner = document.querySelector(
      `#${CONSTANTS.SPINNERS_ID.PRODUCTS_LIST}`
    );
    if (currSpinner) {
      const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
      spinnerSpan.textContent = spinnerText;
    }
  }

  plusFetchOperationForSpinner(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
}

function getTopOffsetForProductsListSpinner() {
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

function resizeHeightAndMoveProductsListSpinner() {
  const storeDetailsWrapper = document.querySelector(
    `#${CONSTANTS.STORE_DETAILS_WRAPPER_ID}`
  );
  const productsListSpinner = document.querySelector(
    `#${CONSTANTS.SPINNERS_ID.PRODUCTS_LIST}`
  );

  if (productsListSpinner) {
    let offsetDiff = storeDetailsWrapper.scrollTop;
    const spinnerInitHeight = +productsListSpinner.dataset[
      CONSTANTS.DATA_ATTRIBUTE.SPINNER_INIT_HEIGHT.CAMEL
    ].replace(/\D/g, "");
    const offsetObj = getTopOffsetForProductsListSpinner();
    const maxOffsetDiff =
      offsetObj.tableWrapperPaddingOffset + offsetObj.tableHeadNameOffset;

    if (offsetDiff > maxOffsetDiff) {
      offsetDiff = maxOffsetDiff;
    }

    productsListSpinner.style.height = `${spinnerInitHeight + offsetDiff}px`;
    productsListSpinner.style.top = `${offsetObj.wholeOffset - offsetDiff}px`;
  }
}

function resizeWidthForProductsListSpinner() {
  const productsListSpinner = document.querySelector(
    `#${CONSTANTS.SPINNERS_ID.PRODUCTS_LIST}`
  );

  if (productsListSpinner) {
    const windowInitWidth = +productsListSpinner.dataset[
      CONSTANTS.DATA_ATTRIBUTE.WINDOW_INIT_WIDTH.CAMEL
    ].replace(/\D/g, "");
    const spinnerInitWidth = +productsListSpinner.dataset[
      CONSTANTS.DATA_ATTRIBUTE.SPINNER_INIT_WIDTH.CAMEL
    ].replace(/\D/g, "");
    let offsetDiff = window.innerWidth - windowInitWidth;

    if (window.innerWidth <= 960) {
      offsetDiff += 320;
    }

    productsListSpinner.style.width = `${spinnerInitWidth + offsetDiff}px`;
  }
}

function requestSpinnerRemovingById(spinnerId) {
  minusFetchOperationForSpinner(spinnerId);

  const spinnerToRemove = document.querySelector(`#${spinnerId}`);

  if (spinnerToRemove && !getFetchOperationsAmountForSpinner(spinnerId)) {
    if (spinnerId === CONSTANTS.SPINNERS_ID.PRODUCTS_LIST) {
      describeProductsListSpinnerResizeListeners();
    }

    spinnerToRemove.remove();
  }
}

// Functions for preparing HTML structures for DOM
function getStructureForStoresList(storesList) {
  return storesList.reduce((storesStr, nextStore) => {
    const storeName = nextStore.Name
      ? nextStore.Name
      : CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
    const storeAddress = nextStore.Address
      ? nextStore.Address
      : CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
    const storeFLoorArea = nextStore.FloorArea ? nextStore.FloorArea : "-";
    storesStr += `
              <div class="${CONSTANTS.STORES_LIST_ITEM_CLASS}" data-${CONSTANTS.DATA_ATTRIBUTE.STORE_ID.KEBAB}="${nextStore.id}">
                  <div class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__name-address-wrapper">
                      <h3 class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__name-headline">
                          ${storeName}
                      </h3>
                      <span class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__address-text">
                          ${storeAddress}
                      </span>
                  </div>
                  <div class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__area-data-wrapper">
                      <span class="${CONSTANTS.STORES_LIST_ITEM_CLASS}__area-number">
                          ${storeFLoorArea}
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
                <div class="products-table__search-wrapper" 
                id="${CONSTANTS.PRODUCTS_SEARCH_ID.WRAPPER}"
                data-${CONSTANTS.DATA_ATTRIBUTE.ERROR_MSG.KEBAB}=
                "${CONSTANTS.DEFAULT_ERROR_MSG}">
                  <input
                    type="search"
                    class="products-table__search-line"
                    name="${CONSTANTS.PRODUCTS_SEARCH_ID.INPUT}"
                    placeholder="Enter value to search"
                    id="${CONSTANTS.PRODUCTS_SEARCH_ID.INPUT}"
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
          const productName = product.Name
            ? product.Name
            : CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
          const productId = product.id
            ? product.id
            : CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
          productTableDataStr += getTableStructureForNameField(
            productName,
            productId
          );
          break;
        case "Price":
          const productPrice = product.Price ? product.Price : "-";
          productTableDataStr += getTableStructureForPriceField(productPrice);
          break;
        case "Rating":
          const productRating = product.Rating ? product.Rating : 0;
          productTableDataStr += getTableStructureForRatingField(
            productRating,
            product.id
          );
          break;
        default:
          const productStandardField = product[productKey]
            ? product[productKey]
            : CONSTANTS.DEFAULT_NOT_SPECIFIED_MSG;
          productTableDataStr +=
            getTableStructureForStandardField(productStandardField);
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

function getTableStructureForRatingField(productRating, productId) {
  return `<td class="product-table-item__rating">
            <div class="product-table-item__stars-wrapper">
              ${getStructureForRatingStars(productRating, productId)}
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

function getStructureForRatingStars(productRating, productId) {
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
        <span class="${CONSTANTS.CROSS_BTN_CLASS}" data-${CONSTANTS.DATA_ATTRIBUTE.PRODUCT_ID.KEBAB}="${productId}"></span>
    </div>`
  );
}

function getSpinnerStructure({
  spinnerId,
  targetText,
  targetWidth,
  targetMinWidth,
  targetHeight,
  targetBgColor,
}) {
  const windowWidth = window.innerWidth;
  return `<div class="stores-list-section__loading-data-layout" id="${spinnerId}"
          style="width:${targetWidth};min-width:${targetMinWidth};height:${targetHeight};background-color:${targetBgColor}"
          data-${CONSTANTS.DATA_ATTRIBUTE.SPINNER_INIT_HEIGHT.KEBAB}="${targetHeight}"
          data-${CONSTANTS.DATA_ATTRIBUTE.SPINNER_INIT_WIDTH.KEBAB}="${targetWidth}"
          data-${CONSTANTS.DATA_ATTRIBUTE.WINDOW_INIT_WIDTH.KEBAB}="${windowWidth}">
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

// Functions for setting listeners to UI elements and their onClick functions
function setSearchStoresListeners() {
  const searchInput = document.querySelector(
    `#${CONSTANTS.STORES_SEARCH_ID.INPUT}`
  );
  const searchBtn = document.querySelector(
    `#${CONSTANTS.STORES_SEARCH_ID.BTN}`
  );

  searchInput.addEventListener("search", onSearchStoresClick);
  searchBtn.addEventListener("click", onSearchStoresClick);
}

function onSearchStoresClick() {
  if (
    validateSearch(
      document.querySelector(`#${CONSTANTS.STORES_SEARCH_ID.WRAPPER}`),
      document.querySelector(`#${CONSTANTS.STORES_SEARCH_ID.INPUT}`)
    )
  ) {
    setStoresListSpinner(CONSTANTS.SPINNER_TEXT.STORES_LIST.LOADING);

    getSearchedStoresList()
      .then((storesList) => {
        if (Array.isArray(storesList)) {
          updateStoresList(storesList);
        }
      })
      .catch((error) => {
        showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
      })
      .finally(() => {
        requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.STORES_LIST);
      });
  }
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

    if (localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.BOOKMARK_DETECTED)) {
      updateBookmarkInsideURL();
    }

    updateAllStoreDetails();
  }
}

function setProductsFiltersBtnsListener() {
  const filtersWrapper = document.querySelector(
    `#${CONSTANTS.FILTER_WRAPPER_ID}`
  );

  filtersWrapper.addEventListener("click", onProductsFilterBtnClick);
}

function onProductsFilterBtnClick(e) {
  const newFilterBtn = e.target.closest(`.${CONSTANTS.FILTER_BTN_CLASS}`);

  if (
    newFilterBtn &&
    newFilterBtn.id !==
      localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_FILTER_ID)
  ) {
    setCurrProductsFilterBtn(newFilterBtn.id);

    setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

    getFullFilteredProductsListByStoreId(
      localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
    )
      .then((fullFilteredProductsList) => {
        if (Array.isArray(fullFilteredProductsList)) {
          updateProductsTableBody(fullFilteredProductsList);
        }
      })
      .catch((error) => {
        showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
      })
      .finally(() => {
        requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
      });
  }
}

function setTableSortBtnsListener() {
  const productTableTitlesWrapper = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.HEAD_TITLES}`
  );

  productTableTitlesWrapper.addEventListener("click", onTableSortBtnClick);
}

function onTableSortBtnClick(e) {
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

        setTableSortFiltersToLocalStorage(sortKey, CONSTANTS.SORT_ORDER.ASC);

        setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

        getFullFilteredProductsListByStoreId(
          localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
        )
          .then((fullFilteredProductsList) => {
            if (Array.isArray(fullFilteredProductsList)) {
              updateProductsTableBody(fullFilteredProductsList);
            }
          })
          .catch((error) => {
            showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
          })
          .finally(() => {
            requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
          });

        break;
      case CONSTANTS.SORT_ORDER.ASC:
        currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
          CONSTANTS.SORT_ORDER.DESC;
        currSortBtn.classList.remove(CONSTANTS.JS_CLASS.ASC_SORT_BTN);
        currSortBtn.classList.add(CONSTANTS.JS_CLASS.DESC_SORT_BTN);

        setTableSortFiltersToLocalStorage(sortKey, CONSTANTS.SORT_ORDER.DESC);

        setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

        getFullFilteredProductsListByStoreId(
          localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
        )
          .then((fullFilteredProductsList) => {
            if (Array.isArray(fullFilteredProductsList)) {
              updateProductsTableBody(fullFilteredProductsList);
            }
          })
          .catch((error) => {
            showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
          })
          .finally(() => {
            requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
          });

        break;
      case CONSTANTS.SORT_ORDER.DESC:
        currSortBtn.dataset[CONSTANTS.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
          CONSTANTS.SORT_ORDER.DEFAULT;
        currSortBtn.classList.remove(CONSTANTS.JS_CLASS.DESC_SORT_BTN);

        clearTableSortFiltersFromLocalStorage();

        setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

        getFullFilteredProductsListByStoreId(
          localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
        )
          .then((fullFilteredProductsList) => {
            if (Array.isArray(fullFilteredProductsList)) {
              updateProductsTableBody(fullFilteredProductsList);
            }
          })
          .catch((error) => {
            showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
          })
          .finally(() => {
            requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
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
    `#${CONSTANTS.PRODUCTS_SEARCH_ID.INPUT}`
  );
  const searchBtn = document.querySelector(
    `#${CONSTANTS.PRODUCTS_SEARCH_ID.BTN}`
  );

  searchInput.addEventListener("search", onSearchProductsClick);
  searchBtn.addEventListener("click", onSearchProductsClick);
}

function onSearchProductsClick() {
  if (
    validateSearch(
      document.querySelector(`#${CONSTANTS.PRODUCTS_SEARCH_ID.WRAPPER}`),
      document.querySelector(`#${CONSTANTS.PRODUCTS_SEARCH_ID.INPUT}`)
    )
  ) {
    const searchedProductsPromise = getSearchedProductsListByStoreId(
      localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
    ).then((searchedProductsList) => {
      if (Array.isArray(searchedProductsList)) {
        updateProductsAmounts(searchedProductsList);
      }
    });

    const fullFilteredProductsPromise = getFullFilteredProductsListByStoreId(
      localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
    ).then((fullFilteredProductsList) => {
      if (Array.isArray(fullFilteredProductsList)) {
        updateProductsTableBody(fullFilteredProductsList);
      }
    });

    setProductsAmountSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_AMOUNTS.LOADING);
    setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

    Promise.all([searchedProductsPromise, fullFilteredProductsPromise])
      .catch((error) => {
        showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
      })
      .finally(() => {
        requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
        requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
      });
  }
}

function setFootersBtnsListeners() {
  const btnCreateStore = document.querySelector(
    `#${CONSTANTS.BTN_CREATE_STORE_ID}`
  );
  const btnDeleteStore = document.querySelector(
    `#${CONSTANTS.BTN_DELETE_STORE_ID}`
  );
  const btnCreateProduct = document.querySelector(
    `#${CONSTANTS.BTN_CREATE_PRODUCT_ID}`
  );

  btnCreateStore.addEventListener("click", onCreateStoreClick);
  btnDeleteStore.addEventListener("click", onDeleteStoreClick);
  btnCreateProduct.addEventListener("click", onCreateProductClick);
}

function onCreateStoreClick() {
  const modalWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.WRAPPER}`
  );

  modalWrapper.classList.add(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
}

function onDeleteStoreClick() {
  const modalWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.DELETE_STORE.WRAPPER}`
  );

  modalWrapper.classList.add(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
}

function onCreateProductClick() {
  const modalWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.WRAPPER}`
  );

  modalWrapper.classList.add(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
}

function setTableRowsBtnsListener() {
  const tableBody = document.querySelector(
    `#${CONSTANTS.PRODUCTS_TABLE_ID.BODY}`
  );

  tableBody.addEventListener("click", onTableRowsBtnClick);
}

function onTableRowsBtnClick(e) {
  if (e.target.classList.contains(CONSTANTS.CROSS_BTN_CLASS)) {
    const modalWrapper = document.querySelector(
      `#${CONSTANTS.MODALS_ID.DELETE_PRODUCT.WRAPPER}`
    );

    localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_ID.CURR_PRODUCT_ID,
      e.target.dataset[CONSTANTS.DATA_ATTRIBUTE.PRODUCT_ID.CAMEL]
    );

    modalWrapper.classList.add(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
  }
}

function setModalsConfirmBtnsListeners() {
  const btnConfirmCreateStore = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.BTN_CONFIRM}`
  );
  const btnConfirmDeleteStore = document.querySelector(
    `#${CONSTANTS.MODALS_ID.DELETE_STORE.BTN_CONFIRM}`
  );
  const btnConfirmCreateProduct = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.BTN_CONFIRM}`
  );
  const btnConfirmDeleteProduct = document.querySelector(
    `#${CONSTANTS.MODALS_ID.DELETE_PRODUCT.BTN_CONFIRM}`
  );

  btnConfirmCreateStore.addEventListener("click", onConfirmCreateStoreClick);
  btnConfirmDeleteStore.addEventListener("click", onConfirmDeleteStoreClick);
  btnConfirmCreateProduct.addEventListener(
    "click",
    onConfirmCreateProductClick
  );
  btnConfirmDeleteProduct.addEventListener(
    "click",
    onConfirmDeleteProductClick
  );
}

function onConfirmCreateStoreClick() {
  if (validateCreateStoreForm()) {
    const resultObj = getStoreObjFromFormInputs();

    closeCreateStoreModal();

    setStoresListSpinner(CONSTANTS.SPINNER_TEXT.STORES_LIST.CREATING);

    postStore(JSON.stringify(resultObj))
      .then(() => {
        showPopupWithMsg(
          "New store has been successfully created!",
          CONSTANTS.POPUP_SUCCESS_COLOR,
          5000
        );

        setStoresListSpinner(CONSTANTS.SPINNER_TEXT.STORES_LIST.UPDATING);

        getSearchedStoresList()
          .then((storesList) => {
            if (Array.isArray(storesList)) {
              updateStoresList(storesList);
            }
          })
          .catch((error) => {
            showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
          })
          .finally(() => {
            requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.STORES_LIST);
          });
      })
      .catch((error) => {
        showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
      })
      .finally(() => {
        requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.STORES_LIST);
      });
  } else {
    showErrorModal();
  }
}

function onConfirmDeleteStoreClick() {
  disableStoreDetailsFooterBtns();

  closeDeleteStoreModal();

  setStoresListSpinner(
    CONSTANTS.SPINNER_TEXT.STORES_LIST.DELETING_STORE_PRODUCTS
  );
  setProductsListSpinner(
    CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.DELETING_STORE_PRODUCTS
  );

  deleteStoreProducts(
    localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
  )
    .then(() => {
      showPopupWithMsg(
        "All products of store have been successfully deleted.",
        CONSTANTS.POPUP_ATTENTION_COLOR,
        5000
      );

      setStoresListSpinner(CONSTANTS.SPINNER_TEXT.STORES_LIST.DELETING_STORE);
      setProductsListSpinner(
        CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.DELETING_STORE
      );

      deleteStore(
        localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
      )
        .then(() => {
          showPopupWithMsg(
            "The store has been successfully deleted.",
            CONSTANTS.POPUP_ATTENTION_COLOR,
            5000
          );

          localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID);
          if (
            localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.BOOKMARK_DETECTED)
          ) {
            updateBookmarkInsideURL();
          }
          updateStoreDetailsLayout();

          setStoresListSpinner(CONSTANTS.SPINNER_TEXT.STORES_LIST.UPDATING);

          getSearchedStoresList()
            .then((storesList) => {
              if (Array.isArray(storesList)) {
                updateStoresList(storesList);
              }
            })
            .catch((error) => {
              showPopupWithMsg(
                error.message,
                CONSTANTS.POPUP_ERROR_COLOR,
                8000
              );
            })
            .finally(() => {
              requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.STORES_LIST);
            });
        })
        .catch((error) => {
          showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
        })
        .finally(() => {
          unlockStoreDetailsFooterBtns();

          requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.STORES_LIST);
          requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
        });
    })
    .catch((error) => {
      unlockStoreDetailsFooterBtns();

      showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
    })
    .finally(() => {
      requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.STORES_LIST);
      requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
    });
}

function onConfirmCreateProductClick() {
  if (validateCreateProductForm()) {
    const resultObj = getProductObjFromFormInputs();

    closeCreateProductModal();

    setProductsAmountSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_AMOUNTS.CREATING);
    setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.CREATING);

    postProduct(
      localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID),
      JSON.stringify(resultObj)
    )
      .then(() => {
        showPopupWithMsg(
          "New product has been successfully created!",
          CONSTANTS.POPUP_SUCCESS_COLOR,
          5000
        );

        const searchedProductsPromise = getSearchedProductsListByStoreId(
          localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
        ).then((searchedProductsList) => {
          if (Array.isArray(searchedProductsList)) {
            updateProductsAmounts(searchedProductsList);
          }
        });

        const fullFilteredProductsPromise =
          getFullFilteredProductsListByStoreId(
            localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
          ).then((fullFilteredProductsList) => {
            if (Array.isArray(fullFilteredProductsList)) {
              updateProductsTableBody(fullFilteredProductsList);
            }
          });

        setProductsAmountSpinner(
          CONSTANTS.SPINNER_TEXT.PRODUCTS_AMOUNTS.UPDATING
        );
        setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.UPDATING);

        Promise.all([searchedProductsPromise, fullFilteredProductsPromise])
          .catch((error) => {
            showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
          })
          .finally(() => {
            requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
            requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
          });
      })
      .catch((error) => {
        showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
      })
      .finally(() => {
        requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
        requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
      });
  } else {
    showErrorModal();
  }
}

function onConfirmDeleteProductClick() {
  closeDeleteProductModal();

  setProductsAmountSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_AMOUNTS.DELETING);
  setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.DELETING_PRODUCT);

  deleteProduct(
    localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_PRODUCT_ID)
  )
    .then(() => {
      showPopupWithMsg(
        "The product has been successfully deleted.",
        CONSTANTS.POPUP_ATTENTION_COLOR,
        5000
      );

      localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_PRODUCT_ID);

      const searchedProductsPromise = getSearchedProductsListByStoreId(
        localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
      ).then((searchedProductsList) => {
        if (Array.isArray(searchedProductsList)) {
          updateProductsAmounts(searchedProductsList);
        }
      });

      const fullFilteredProductsPromise = getFullFilteredProductsListByStoreId(
        localStorage.getItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID)
      ).then((fullFilteredProductsList) => {
        if (Array.isArray(fullFilteredProductsList)) {
          updateProductsTableBody(fullFilteredProductsList);
        }
      });

      setProductsAmountSpinner(
        CONSTANTS.SPINNER_TEXT.PRODUCTS_AMOUNTS.UPDATING
      );
      setProductsListSpinner(CONSTANTS.SPINNER_TEXT.PRODUCTS_LIST.UPDATING);

      Promise.all([searchedProductsPromise, fullFilteredProductsPromise])
        .catch((error) => {
          showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
        })
        .finally(() => {
          requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
          requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
        });
    })
    .catch((error) => {
      showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
    })
    .finally(() => {
      requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_AMOUNTS);
      requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.PRODUCTS_LIST);
    });
}

function setModalsCancelBtnsListeners() {
  const btnCancelCreateStore = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.BTN_CANCEL}`
  );
  const btnCancelDeleteStore = document.querySelector(
    `#${CONSTANTS.MODALS_ID.DELETE_STORE.BTN_CANCEL}`
  );
  const btnCancelCreateProduct = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.BTN_CANCEL}`
  );
  const btnCancelDeleteProduct = document.querySelector(
    `#${CONSTANTS.MODALS_ID.DELETE_PRODUCT.BTN_CANCEL}`
  );
  const btnOkModalError = document.querySelector(
    `#${CONSTANTS.MODALS_ID.ERROR.BTN_OK}`
  );

  btnCancelCreateStore.addEventListener("click", closeCreateStoreModal);
  btnCancelDeleteStore.addEventListener("click", closeDeleteStoreModal);
  btnCancelCreateProduct.addEventListener("click", closeCreateProductModal);
  btnCancelDeleteProduct.addEventListener("click", closeDeleteProductModal);
  btnOkModalError.addEventListener("click", closeErrorModal);
}

function closeCreateStoreModal() {
  const modalWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.WRAPPER}`
  );
  const modalForm = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.FORM}`
  );
  const formInputWrappers = modalForm.querySelectorAll(
    `.${CONSTANTS.MODAL_FIELD_INPUT_WRAPPER_CLASS}`
  );

  formInputWrappers.forEach((inputWrapper) => {
    const input = inputWrapper.querySelector(
      `.${CONSTANTS.MODAL_FIELD_INPUT_CLASS}`
    );
    removeErrorFromInput(input, CONSTANTS.JS_CLASS.ERROR_FIELD, inputWrapper);
  });

  modalForm.reset();

  modalWrapper.classList.remove(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
}

function closeDeleteStoreModal() {
  const modalWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.DELETE_STORE.WRAPPER}`
  );

  modalWrapper.classList.remove(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
}

function closeCreateProductModal() {
  const modalWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.WRAPPER}`
  );
  const modalForm = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.FORM}`
  );
  const formInputWrappers = modalForm.querySelectorAll(
    `.${CONSTANTS.MODAL_FIELD_INPUT_WRAPPER_CLASS}`
  );

  formInputWrappers.forEach((inputWrapper) => {
    const input = inputWrapper.querySelector(
      `.${CONSTANTS.MODAL_FIELD_INPUT_CLASS}`
    );
    removeErrorFromInput(input, CONSTANTS.JS_CLASS.ERROR_FIELD, inputWrapper);
  });

  modalForm.reset();

  modalWrapper.classList.remove(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
}

function closeDeleteProductModal() {
  const modalWrapper = document.querySelector(
    `#${CONSTANTS.MODALS_ID.DELETE_PRODUCT.WRAPPER}`
  );

  modalWrapper.classList.remove(CONSTANTS.JS_CLASS.FLEX_ELEMENT);
}

// These listeners are needed to change size and offset for productsList table spinner
// if user scrolls table or resizes window
function setProductsListSpinnerResizeListeners() {
  const storeDetailsWrapper = document.querySelector(
    `#${CONSTANTS.STORE_DETAILS_WRAPPER_ID}`
  );

  storeDetailsWrapper.addEventListener(
    "scroll",
    resizeHeightAndMoveProductsListSpinner
  );
  window.addEventListener("resize", resizeWidthForProductsListSpinner);
}

// We should not forget to describe these listeners when productsList table spinner is removed
function describeProductsListSpinnerResizeListeners() {
  const storeDetailsWrapper = document.querySelector(
    `#${CONSTANTS.STORE_DETAILS_WRAPPER_ID}`
  );

  storeDetailsWrapper.removeEventListener(
    "scroll",
    resizeHeightAndMoveProductsListSpinner
  );
  window.removeEventListener("resize", resizeWidthForProductsListSpinner);
}

// Other supporting functions
function setTableSortFiltersToLocalStorage(sortKey, sortOrder) {
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY, sortKey);
  localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER, sortOrder);
}

function clearTableSortFiltersFromLocalStorage() {
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER);
}

function initLocalStorageData() {
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.BOOKMARK_DETECTED);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_PRODUCT_ID);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_FILTER_ID);
  clearTableSortFiltersFromLocalStorage();
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
          `Store with id=${localStorage.getItem(
            CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID
          )} had product with unknown status type: ${product.Status}`
        );
    }
  });

  return amountsData;
}

function getProductsFilterTypeById(filterId) {
  return Object.keys(CONSTANTS.FILTER_ID).find(
    (filterType) => CONSTANTS.FILTER_ID[filterType] === filterId
  );
}

function getProductsSortOrderTypeByAttribute(orderAttribute) {
  return Object.keys(CONSTANTS.SORT_ORDER).find(
    (orderType) => CONSTANTS.SORT_ORDER[orderType] === orderAttribute
  );
}

function getStoreObjFromFormInputs() {
  const inputName = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_NAME}`
  );
  const inputEmail = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_EMAIL}`
  );
  const inputPhone = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_PHONE}`
  );
  const inputAddress = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_ADDRESS}`
  );
  const inputEstablishedDate = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_ESTABLISHED_DATE}`
  );
  const inputFloorArea = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_STORE.INPUT_FLOOR_AREA}`
  );
  const resultObj = {};

  if (inputName.value) {
    resultObj[CONSTANTS.SERVER.KEYS.STORE.NAME] = inputName.value;
  }
  if (inputEmail.value) {
    resultObj[CONSTANTS.SERVER.KEYS.STORE.EMAIL] = inputEmail.value;
  }
  if (inputPhone.value) {
    resultObj[CONSTANTS.SERVER.KEYS.STORE.PHONE] = inputPhone.value;
  }
  if (inputAddress.value) {
    resultObj[CONSTANTS.SERVER.KEYS.STORE.ADDRESS] = inputAddress.value;
  }
  if (inputEstablishedDate.value) {
    resultObj[CONSTANTS.SERVER.KEYS.STORE.ESTABLISHED_DATE] =
      inputEstablishedDate.value;
  }
  if (inputFloorArea.value) {
    resultObj[CONSTANTS.SERVER.KEYS.STORE.FLOOR_AREA] = inputFloorArea.value;
  }

  return resultObj;
}

function getProductObjFromFormInputs() {
  const inputName = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_NAME}`
  );
  const inputPrice = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_PRICE}`
  );
  const inputSpecs = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_SPECS}`
  );
  const inputRating = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_RATING}`
  );
  const inputSupplierInfo = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_SUPPLIER_INFO}`
  );
  const inputCountry = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_COUNTRY}`
  );
  const inputProdCompany = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_PROD_COMPANY}`
  );
  const inputStatus = document.querySelector(
    `#${CONSTANTS.MODALS_ID.CREATE_PRODUCT.INPUT_STATUS}`
  );

  return {
    [CONSTANTS.SERVER.KEYS.PRODUCT.NAME]: inputName.value,
    [CONSTANTS.SERVER.KEYS.PRODUCT.PRICE]: inputPrice.value,
    [CONSTANTS.SERVER.KEYS.PRODUCT.SPECS]: inputSpecs.value,
    [CONSTANTS.SERVER.KEYS.PRODUCT.RATING]: inputRating.value,
    [CONSTANTS.SERVER.KEYS.PRODUCT.SUPPLIER_INFO]: inputSupplierInfo.value,
    [CONSTANTS.SERVER.KEYS.PRODUCT.COUNTRY]: inputCountry.value,
    [CONSTANTS.SERVER.KEYS.PRODUCT.PROD_COMPANY]: inputProdCompany.value,
    [CONSTANTS.SERVER.KEYS.PRODUCT.STATUS]: inputStatus.value,
  };
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

function loadStoreIdFromBookmark() {
  const queryParams = new URLSearchParams(window.location.search);

  const storeId = queryParams.get(CONSTANTS.BOOKMARK_QUERY_STORE_ID);

  if (storeId) {
    localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.BOOKMARK_DETECTED, "true");
    localStorage.setItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID, storeId);
    updateAllStoreDetails();
  }
}

function updateBookmarkInsideURL() {
  const currURL = window.location.href;
  const currStoreId = localStorage.getItem(
    CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID
  );
  const bookmarkKey = CONSTANTS.BOOKMARK_QUERY_STORE_ID;
  const regexPattern = new RegExp(bookmarkKey + "=[^&]+");

  const newUrl = currURL.replace(regexPattern, `${bookmarkKey}=${currStoreId}`);

  history.pushState(null, null, newUrl);
}

function disableStoreDetailsFooterBtns() {
  document.querySelector(`#${CONSTANTS.BTN_CREATE_PRODUCT_ID}`).disabled = true;
  document.querySelector(`#${CONSTANTS.BTN_DELETE_STORE_ID}`).disabled = true;
}

function unlockStoreDetailsFooterBtns() {
  document.querySelector(
    `#${CONSTANTS.BTN_CREATE_PRODUCT_ID}`
  ).disabled = false;
  document.querySelector(`#${CONSTANTS.BTN_DELETE_STORE_ID}`).disabled = false;
}

// Functions for working with server
async function getData(endPoint) {
  try {
    const response = await fetch(`${CONSTANTS.SERVER.API_PREFIX}${endPoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getSearchedStoresList() {
  try {
    let neededURL = CONSTANTS.SERVER.GET.STORES;
    const searchFilterValue = document.querySelector(
      `#${CONSTANTS.STORES_SEARCH_ID.INPUT}`
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

    return await getData(neededURL);
  } catch (error) {
    console.error(`Error while fetching stores list. Reason: ${error.message}`);
    throw new Error(
      `Error while fetching stores list. Reason: ${error.message}`
    );
  }
}

async function getStoreById(storeId) {
  try {
    return await getData(
      CONSTANTS.SERVER.GET.STORE_BY_ID.replace("{storeId}", storeId)
    );
  } catch (error) {
    console.error(
      `Error while fetching store with id=${storeId}. Reason: ${error.message}`
    );
    throw new Error(
      `Error while fetching store with id=${storeId}. Reason: ${error.message}`
    );
  }
}

async function getSearchedProductsListByStoreId(storeId) {
  try {
    let neededURL = CONSTANTS.SERVER.GET.PRODUCTS_BY_STORE_ID.replace(
      "{storeId}",
      storeId
    );
    const searchFilterValue = document.querySelector(
      `#${CONSTANTS.PRODUCTS_SEARCH_ID.INPUT}`
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

    return await getData(neededURL);
  } catch (error) {
    console.error(
      `Error while fetching products list for store with id=${storeId}. Reason: ${error.message}`
    );
    throw new Error(
      `Error while fetching products list for store with id=${storeId}. Reason: ${error.message}`
    );
  }
}

async function getFullFilteredProductsListByStoreId(storeId) {
  try {
    let neededURL = CONSTANTS.SERVER.GET.PRODUCTS_BY_STORE_ID.replace(
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
      `#${CONSTANTS.PRODUCTS_SEARCH_ID.INPUT}`
    ).value;
    const filterObj = {};

    if (searchFilterValue) {
      if (filterId && filterId !== CONSTANTS.FILTER_ID.ALL) {
        filterObj.where = {
          and: [
            { Status: getProductsFilterTypeById(filterId) },
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
          Status: getProductsFilterTypeById(filterId),
        };
      }
    }

    if (sortKey && sortOrder && sortOrder !== CONSTANTS.SORT_ORDER.DEFAULT) {
      filterObj.order = `${sortKey} ${getProductsSortOrderTypeByAttribute(
        sortOrder
      )}`;
    }

    if (filterObj.where || filterObj.order) {
      neededURL += `?filter=${JSON.stringify(filterObj)}`;
    }

    return await getData(neededURL);
  } catch (error) {
    console.error(
      `Error while fetching filtered products list for store with id=${storeId}. Reason: ${error.message}`
    );
    throw new Error(
      `Error while fetching filtered products list for store with id=${storeId}. Reason: ${error.message}`
    );
  }
}

async function postData(endPoint, data) {
  try {
    const response = await fetch(`${CONSTANTS.SERVER.API_PREFIX}${endPoint}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Response status - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function postStore(storeObj) {
  try {
    return await postData(CONSTANTS.SERVER.POST.STORE, storeObj);
  } catch (error) {
    console.error(`Error while posting store. Reason: ${error.message}`);
    throw new Error(`Error while posting store. Reason: ${error.message}`);
  }
}

async function postProduct(storeId, productObj) {
  try {
    return await postData(
      CONSTANTS.SERVER.POST.PRODUCT_BY_STORE_ID.replace("{storeId}", storeId),
      productObj
    );
  } catch (error) {
    console.error(`Error while posting product. Reason: ${error.message}`);
    throw new Error(`Error while posting product. Reason: ${error.message}`);
  }
}

async function deleteData(endPoint) {
  try {
    const response = await fetch(`${CONSTANTS.SERVER.API_PREFIX}${endPoint}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status - ${response.statusText}`);
    }

    if (response.status === 204) {
      return;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteStoreProducts(storeId) {
  try {
    return await deleteData(
      CONSTANTS.SERVER.DELETE.PRDOCUTS_BY_STORE_ID.replace("{storeId}", storeId)
    );
  } catch (error) {
    console.error(
      `Error while deleting all products of store. Reason: ${error.message}`
    );
    throw new Error(
      `Error while deleting all products of store. Reason: ${error.message}`
    );
  }
}

async function deleteStore(storeId) {
  try {
    return await deleteData(
      CONSTANTS.SERVER.DELETE.STORE_BY_ID.replace("{storeId}", storeId)
    );
  } catch (error) {
    console.error(`Error while deleting store. Reason: ${error.message}`);
    throw new Error(`Error while deleting store. Reason: ${error.message}`);
  }
}

async function deleteProduct(productId) {
  try {
    return await deleteData(
      CONSTANTS.SERVER.DELETE.PRODUCT_BY_ID.replace("{productId}", productId)
    );
  } catch (error) {
    console.error(`Error while deleting product. Reason: ${error.message}`);
    throw new Error(`Error while deleting product. Reason: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initLocalStorageData();

  setSearchStoresListeners();
  setStoresCardsClickListener();

  setProductsFiltersBtnsListener();
  renderProductsTableHead();
  setTableRowsBtnsListener();

  setFootersBtnsListeners();
  setModalsConfirmBtnsListeners();
  setModalsCancelBtnsListeners();

  loadStoreIdFromBookmark();

  setStoresListSpinner(CONSTANTS.SPINNER_TEXT.STORES_LIST.LOADING);

  getSearchedStoresList()
    .then((storesList) => {
      if (Array.isArray(storesList)) {
        updateStoresList(storesList);
      }
    })
    .catch((error) => {
      showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
    })
    .finally(() => {
      requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.STORES_LIST);
    });
});
