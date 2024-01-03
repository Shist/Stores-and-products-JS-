"use strict";

export default class View {
  static ID = {
    SPINNER: {
      STORES_LIST: "stores-list-spinner",
      STORE_DETAILS: "store-details-spinner",
      PRODUCTS_AMOUNTS: "products-amounts-spinner",
      PRODUCTS_LIST: "products-list-spinner",
      EDIT_PRODUCT_FORM: "edit-product-form-spinner",
    },
    STORES_LIST: {
      HEADER: "stores-list-header",
      SECTION: "stores-list-section",
    },
    STORES_LAYOUT: "stores-list-layout",
    NO_STORES_LAYOUT: "no-stores-list-layout",
    STORES_SEARCH: {
      WRAPPER: "store-search-wrapper",
      INPUT: "stores-search-line",
      BTN: "stores-search-btn",
    },
    BTN: {
      CREATE_STORE: "btn-create-store",
      DELETE_STORE: "btn-delete-store",
      CREATE_PRODUCT: "btn-create-product",
    },
    STORE_DETAILS: {
      WRAPPER: "store-details-wrapper",
      HEADER: "store-details-header",
      DESCRIPTION_WRAPPER: "store-details-description-wrapper",
    },
    NO_STORE_DETAILS_WRAPPER: "no-store-details-wrapper",
    STORE_NOT_FOUND_WRAPPER: "store-not-found-wrapper",
    STORE_LABELS: {
      EMAIL: "store-email",
      EST_DATE: "store-est-date",
      PHONE: "store-phone",
      FLOOR_AREA: "store-floor-area",
      ADDRESS: "store-address",
    },
    FILTER_WRAPPER: "filters-wrapper",
    PRODUCTS_AMOUNTS: {
      ALL: "all-prod-amount",
      OK: "ok-prod-amount",
      STORAGE: "storage-prod-amount",
      OUT_OF_STOCK: "out-of-stock-prod-amount",
    },
    PRODUCTS_TABLE: {
      TABLE_WRAPPER: "products-table-wrapper",
      TABLE: "products-table",
      HEAD: "products-table-head",
      HEAD_NAME: "product-table-name-wrapper",
      HEAD_TITLES: "product-table-titles-wrapper",
      BODY: "products-table-body",
    },
    PRODUCTS_SEARCH: {
      WRAPPER: "products-search-wrapper",
      INPUT: "products-search-line",
      BTN: "products-search-btn",
    },
    POPUPS_WRAPPER: "popup-wrapper",
    MODALS: {
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
        INPUT_SUPPLIER_INFO_WRAPPER:
          "modal-create-product-supplier-info-wrapper",
        INPUT_SUPPLIER_INFO: "modal-create-product-supplier-info",
        INPUT_COUNTRY_WRAPPER: "modal-create-product-country-wrapper",
        INPUT_COUNTRY: "modal-create-product-country",
        INPUT_PROD_COMPANY_WRAPPER: "modal-create-product-prod-company-wrapper",
        INPUT_PROD_COMPANY: "modal-create-product-prod-company",
        INPUT_STATUS_WRAPPER: "modal-create-product-status-wrapper",
        INPUT_STATUS: "modal-create-product-status",
      },
      EDIT_PRODUCT: {
        WRAPPER: "modal-edit-product",
        BTN_CONFIRM: "btn-edit-product-confirm",
        BTN_CANCEL: "btn-edit-product-cancel",
        FORM: "edit-product-form",
        INPUT_NAME_WRAPPER: "modal-edit-product-name-wrapper",
        INPUT_NAME: "modal-edit-product-name",
        INPUT_PRICE_WRAPPER: "modal-edit-product-price-wrapper",
        INPUT_PRICE: "modal-edit-product-price",
        INPUT_SPECS_WRAPPER: "modal-edit-product-specs-wrapper",
        INPUT_SPECS: "modal-edit-product-specs",
        INPUT_RATING_WRAPPER: "modal-edit-product-rating-wrapper",
        INPUT_RATING: "modal-edit-product-rating",
        INPUT_SUPPLIER_INFO_WRAPPER: "modal-edit-product-supplier-info-wrapper",
        INPUT_SUPPLIER_INFO: "modal-edit-product-supplier-info",
        INPUT_COUNTRY_WRAPPER: "modal-edit-product-country-wrapper",
        INPUT_COUNTRY: "modal-edit-product-country",
        INPUT_PROD_COMPANY_WRAPPER: "modal-edit-product-prod-company-wrapper",
        INPUT_PROD_COMPANY: "modal-edit-product-prod-company",
        INPUT_STATUS_WRAPPER: "modal-edit-product-status-wrapper",
        INPUT_STATUS: "modal-edit-product-status",
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
  };

  static CLASS = {
    STORES_LIST_ITEM: "stores-list-item",
    BTN: {
      FILTER: "products-filter-btn",
      SORT: "products-table__product-field-sort-btn",
      EDIT: "edit-btn",
      CROSS: "cross-btn",
    },
    POPUP: "popup",
    POPUP_TEXT: "popup__text",
    MODAL_FIELD_INPUT_WRAPPER: "modal-window__field-input-wrapper",
    MODAL_FIELD_INPUT: "modal-window__field-input",
  };

  static JS_CLASS = {
    ELEMENT: {
      HIDDEN: "js-hidden-element",
      FLEX: "js-flex-element",
    },
    SELECTED_ITEM: "js-selected-item",
    SORT_BTN: {
      ASC: "js-asc-sort-btn",
      DESC: "js-desc-sort-btn",
    },
    FILTER_OFF: "js-filter-off",
    ERROR_FIELD_WRAPPER: "js-error-field-wrapper",
    ERROR_FIELD: "js-error-field",
    ERROR_SEARCH_FIELD: "js-error-search-field",
  };

  static SPINNER_TEXT = {
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
      EDITING: "Editing product...",
    },
    PRODUCTS_LIST: {
      LOADING: "Loading products list...",
      UPDATING: "Loading updated products list...",
      CREATING: "Creating new product...",
      DELETING_STORE: "Deleting store...",
      DELETING_STORE_PRODUCTS: "Deleting all products of store...",
      DELETING_PRODUCT: "Deleting product...",
      EDITING: "Editing product...",
    },
    EDIT_PRODUCT_FORM: {
      LOADING: "Loading product data...",
    },
  };

  static DATA_ATTRIBUTE = {
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
  };

  static POPUP_COLOR = {
    SUCCESS: "lawngreen",
    ATTENTION: "yellow",
    ERROR: "red",
  };

  static DEFAULT_ERROR_MSG = "No errors yet...";

  static DEFAULT_NOT_SPECIFIED_MSG = "(not specified)";

  static ERROR_SEARCH_MSG = "Prohibited symbols entered!";

  static PRODUCTS_TABLE_COLUMNS = [
    ["Name", "Name", "align-start"],
    ["Price", "Price", "align-end"],
    ["Specs", "Specs", "align-start"],
    ["SupplierInfo", "SupplierInfo", "align-start"],
    ["MadeIn", "Country of origin", "align-start"],
    ["ProductionCompanyName", "Prod. company", "align-start"],
    ["Rating", "Rating", "align-start"],
  ];

  getBtnCancelCreateStore() {
    return document.querySelector(`#${View.ID.MODALS.CREATE_STORE.BTN_CANCEL}`);
  }

  getBtnCancelCreateProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_PRODUCT.BTN_CANCEL}`
    );
  }

  getBtnCancelDeleteStore() {
    return document.querySelector(`#${View.ID.MODALS.DELETE_STORE.BTN_CANCEL}`);
  }

  getBtnCancelDeleteProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.DELETE_PRODUCT.BTN_CANCEL}`
    );
  }

  getBtnCancelEditProduct() {
    return document.querySelector(`#${View.ID.MODALS.EDIT_PRODUCT.BTN_CANCEL}`);
  }

  getBtnConfirmCreateStore() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.BTN_CONFIRM}`
    );
  }

  getBtnConfirmCreateProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_PRODUCT.BTN_CONFIRM}`
    );
  }

  getBtnConfirmDeleteStore() {
    return document.querySelector(
      `#${View.ID.MODALS.DELETE_STORE.BTN_CONFIRM}`
    );
  }

  getBtnConfirmDeleteProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.DELETE_PRODUCT.BTN_CONFIRM}`
    );
  }

  getBtnConfirmEditProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.BTN_CONFIRM}`
    );
  }

  getBtnCreateStore() {
    return document.querySelector(`#${View.ID.BTN.CREATE_STORE}`);
  }

  getBtnCreateProduct() {
    return document.querySelector(`#${View.ID.BTN.CREATE_PRODUCT}`);
  }

  getBtnDeleteStore() {
    return document.querySelector(`#${View.ID.BTN.DELETE_STORE}`);
  }

  getBtnOkModalError() {
    return document.querySelector(`#${View.ID.MODALS.ERROR.BTN_OK}`);
  }

  getClosestFilterBtn(element) {
    return element.closest(`.${View.CLASS.BTN.FILTER}`);
  }

  getClosestStoresListItem(element) {
    return element.closest(`.${View.CLASS.STORES_LIST_ITEM}`);
  }

  getFilterWrapper() {
    return document.querySelector(`#${View.ID.FILTER_WRAPPER}`);
  }

  getModalCreateProductWrapper() {
    return document.querySelector(`#${View.ID.MODALS.CREATE_PRODUCT.WRAPPER}`);
  }

  getProductInputNameByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_NAME}`);
  }

  getProductInputNameWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_NAME_WRAPPER}`);
  }

  getProductInputPriceByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_PRICE}`);
  }

  getProductInputPriceWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_PRICE_WRAPPER}`);
  }

  getProductInputSpecsByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_SPECS}`);
  }

  getProductInputSpecsWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_SPECS_WRAPPER}`);
  }

  getProductInputRatingByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_RATING}`);
  }

  getProductInputRatingWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_RATING_WRAPPER}`);
  }

  getProductInputSupplierInfoByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_SUPPLIER_INFO}`);
  }

  getProductInputSupplierInfoWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(
      `#${modalIdsObj.INPUT_SUPPLIER_INFO_WRAPPER}`
    );
  }

  getProductInputCountryByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_COUNTRY}`);
  }

  getProductInputCountryWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_COUNTRY_WRAPPER}`);
  }

  getProductInputProdCompanyByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_PROD_COMPANY}`);
  }

  getProductInputProdCompanyWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_PROD_COMPANY_WRAPPER}`);
  }

  getProductInputStatusByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_STATUS}`);
  }

  getProductInputStatusWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_STATUS_WRAPPER}`);
  }

  getModalCreateStoreWrapper() {
    return document.querySelector(`#${View.ID.MODALS.CREATE_STORE.WRAPPER}`);
  }

  getModalCreateStoreInputName() {
    return document.querySelector(`#${View.ID.MODALS.CREATE_STORE.INPUT_NAME}`);
  }

  getModalCreateStoreInputNameWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_NAME_WRAPPER}`
    );
  }

  getModalCreateStoreInputEmail() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_EMAIL}`
    );
  }

  getModalCreateStoreInputEmailWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_EMAIL_WRAPPER}`
    );
  }

  getModalCreateStoreInputPhone() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_PHONE}`
    );
  }

  getModalCreateStoreInputPhoneWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_PHONE_WRAPPER}`
    );
  }

  getModalCreateStoreInputAddress() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_ADDRESS}`
    );
  }

  getModalCreateStoreInputAddressWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_ADDRESS_WRAPPER}`
    );
  }

  getModalCreateStoreInputEstDate() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_ESTABLISHED_DATE}`
    );
  }

  getModalCreateStoreInputEstDateWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_ESTABLISHED_DATE_WRAPPER}`
    );
  }

  getModalCreateStoreInputFloorArea() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_FLOOR_AREA}`
    );
  }

  getModalCreateStoreInputFloorAreaWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_FLOOR_AREA_WRAPPER}`
    );
  }

  getModalDeleteProductWrapper() {
    return document.querySelector(`#${View.ID.MODALS.DELETE_PRODUCT.WRAPPER}`);
  }

  getModalDeleteStoreWrapper() {
    return document.querySelector(`#${View.ID.MODALS.DELETE_STORE.WRAPPER}`);
  }

  getModalEditProductForm() {
    return document.querySelector(`#${View.ID.MODALS.EDIT_PRODUCT.FORM}`);
  }

  getModalEditProductWrapper() {
    return document.querySelector(`#${View.ID.MODALS.EDIT_PRODUCT.WRAPPER}`);
  }

  getSpinnerById(spinnerId) {
    return document.querySelector(`#${spinnerId}`);
  }

  getStoreDetailsDescriptionWrapper() {
    return document.querySelector(
      `#${View.ID.STORE_DETAILS.DESCRIPTION_WRAPPER}`
    );
  }

  getStoreDetailsHeader() {
    return document.querySelector(`#${View.ID.STORE_DETAILS.HEADER}`);
  }

  getStoreDetailsWrapper() {
    return document.querySelector(`#${View.ID.STORE_DETAILS.WRAPPER}`);
  }

  getStoreNotFoundWrapper() {
    return document.querySelector(`#${View.ID.STORE_NOT_FOUND_WRAPPER}`);
  }

  getStoresLayout() {
    return document.querySelector(`#${View.ID.STORES_LAYOUT}`);
  }

  getStoresListHeader() {
    return document.querySelector(`#${View.ID.STORES_LIST.HEADER}`);
  }

  getStoresListSection() {
    return document.querySelector(`#${View.ID.STORES_LIST.SECTION}`);
  }

  getStoresSearchBtn() {
    return document.querySelector(`#${View.ID.STORES_SEARCH.BTN}`);
  }

  getStoresSearchInput() {
    return document.querySelector(`#${View.ID.STORES_SEARCH.INPUT}`);
  }

  getStoresSearchWrapper() {
    return document.querySelector(`#${View.ID.STORES_SEARCH.WRAPPER}`);
  }

  getProductsSearchBtn() {
    return document.querySelector(`#${View.ID.PRODUCTS_SEARCH.BTN}`);
  }

  getProductsSearchInput() {
    return document.querySelector(`#${View.ID.PRODUCTS_SEARCH.INPUT}`);
  }

  getProductsSearchWrapper() {
    return document.querySelector(`#${View.ID.PRODUCTS_SEARCH.WRAPPER}`);
  }

  getProductsTable() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.TABLE}`);
  }

  getProductsTableBody() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.BODY}`);
  }

  getProductsTableHeadName() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.HEAD_NAME}`);
  }

  getProductsTableHeadTitles() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.HEAD_TITLES}`);
  }

  getProductsTableHead() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.HEAD}`);
  }

  getProductsTableWrapper() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.TABLE_WRAPPER}`);
  }

  getSpinnerStructure({
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
            data-${View.DATA_ATTRIBUTE.SPINNER_INIT_HEIGHT.KEBAB}="${targetHeight}"
            data-${View.DATA_ATTRIBUTE.SPINNER_INIT_WIDTH.KEBAB}="${targetWidth}"
            data-${View.DATA_ATTRIBUTE.WINDOW_INIT_WIDTH.KEBAB}="${windowWidth}">
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

  getStructureForTableHead(defaultSortOrder) {
    return `<tr class="products-table__table-name-row"
            id="${View.ID.PRODUCTS_TABLE.HEAD_NAME}">
              <th colspan="${
                View.PRODUCTS_TABLE_COLUMNS.length
              }" class="products-table__table-name-headline">
                <div class="product-table__name-search-wrapper">
                  <span class="products-table__table-name-text">
                    Products
                  </span>
                  <div class="products-table__search-wrapper" 
                  id="${View.ID.PRODUCTS_SEARCH.WRAPPER}"
                  data-${View.DATA_ATTRIBUTE.ERROR_MSG.KEBAB}=
                  "${View.DEFAULT_ERROR_MSG}">
                    <input
                      type="search"
                      class="products-table__search-line"
                      name="${View.ID.PRODUCTS_SEARCH.INPUT}"
                      placeholder="Enter value to search"
                      id="${View.ID.PRODUCTS_SEARCH.INPUT}"
                    />
                    <button
                      class="products-table__search-btn"
                      id="${View.ID.PRODUCTS_SEARCH.BTN}"
                      title="Search"
                    ></button>
                  </div>
                </div>
              </th>
            </tr>
            <tr class="products-table__product-specifications-row"
            id="${View.ID.PRODUCTS_TABLE.HEAD_TITLES}"
              >${this._getStructureForTableHeaders(defaultSortOrder)}
            </tr>`;
  }

  highlightActiveStoreCard(currStoreId) {
    const storesListLayout = document.querySelector(
      `#${View.ID.STORES_LAYOUT}`
    );

    storesListLayout
      .querySelector(`.${View.JS_CLASS.SELECTED_ITEM}`)
      ?.classList.remove(View.JS_CLASS.SELECTED_ITEM);

    storesListLayout
      .querySelector(
        `[data-${View.DATA_ATTRIBUTE.STORE_ID.KEBAB}="${currStoreId}"]`
      )
      ?.classList.add(View.JS_CLASS.SELECTED_ITEM);

    return this;
  }

  updateStoresList(storesList, currStoreId) {
    const storesListSection = document.querySelector(
      `#${View.ID.STORES_LAYOUT}`
    );

    this._updateStoresListLayout(storesList);

    storesListSection.innerHTML = this._getStructureForStoresList(storesList);

    if (currStoreId) {
      this.highlightActiveStoreCard(currStoreId);
    }

    return this;
  }

  updateStoreDetailsLayout(currStore) {
    const storeDetailsWrapper = document.querySelector(
      `#${View.ID.STORE_DETAILS.WRAPPER}`
    );
    const noStoreDetailsWrapper = document.querySelector(
      `#${View.ID.NO_STORE_DETAILS_WRAPPER}`
    );
    const storeNotFoundWrapper = document.querySelector(
      `#${View.ID.STORE_NOT_FOUND_WRAPPER}`
    );

    if (currStore) {
      storeDetailsWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
      noStoreDetailsWrapper.classList.add(View.JS_CLASS.ELEMENT.HIDDEN);
      storeNotFoundWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);
    } else {
      storeDetailsWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);
      noStoreDetailsWrapper.classList.remove(View.JS_CLASS.ELEMENT.HIDDEN);
    }

    return this;
  }

  updateStoreDescriptionFields(store) {
    const storeEmailField = document.querySelector(
      `#${View.ID.STORE_LABELS.EMAIL}`
    );
    const storeEstDateField = document.querySelector(
      `#${View.ID.STORE_LABELS.EST_DATE}`
    );
    const storePhoneField = document.querySelector(
      `#${View.ID.STORE_LABELS.PHONE}`
    );
    const storeFloorAreaField = document.querySelector(
      `#${View.ID.STORE_LABELS.FLOOR_AREA}`
    );
    const storeAddressField = document.querySelector(
      `#${View.ID.STORE_LABELS.ADDRESS}`
    );

    if (store.Email) {
      storeEmailField.textContent = store.Email;
    } else {
      storeEmailField.textContent = View.DEFAULT_NOT_SPECIFIED_MSG;
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
      storeEstDateField.textContent = View.DEFAULT_NOT_SPECIFIED_MSG;
    }
    if (store.Address) {
      storeAddressField.textContent = store.Address;
    } else {
      storeAddressField.textContent = View.DEFAULT_NOT_SPECIFIED_MSG;
    }
    if (store.PhoneNumber) {
      storePhoneField.textContent = store.PhoneNumber;
    } else {
      storePhoneField.textContent = View.DEFAULT_NOT_SPECIFIED_MSG;
    }
    if (store.FloorArea) {
      storeFloorAreaField.textContent = store.FloorArea;
    } else {
      storeFloorAreaField.textContent = View.DEFAULT_NOT_SPECIFIED_MSG;
    }

    return this;
  }

  updateEditProductFormFields(product) {
    const inputName = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.INPUT_NAME}`
    );
    const inputPrice = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.INPUT_PRICE}`
    );
    const inputSpecs = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.INPUT_SPECS}`
    );
    const inputRating = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.INPUT_RATING}`
    );
    const inputSupplierInfo = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.INPUT_SUPPLIER_INFO}`
    );
    const inputCountry = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.INPUT_COUNTRY}`
    );
    const inputProdCompany = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.INPUT_PROD_COMPANY}`
    );
    const inputStatus = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.INPUT_STATUS}`
    );

    if (product.Name) {
      inputName.value = product.Name;
    }
    if (product.Price) {
      inputPrice.value = product.Price;
    }
    if (product.Specs) {
      inputSpecs.value = product.Specs;
    }
    if (product.Rating) {
      inputRating.value = product.Rating;
    }
    if (product.SupplierInfo) {
      inputSupplierInfo.value = product.SupplierInfo;
    }
    if (product.MadeIn) {
      inputCountry.value = product.MadeIn;
    }
    if (product.ProductionCompanyName) {
      inputProdCompany.value = product.ProductionCompanyName;
    }
    if (product.Status) {
      inputStatus.value = product.Status;
    }

    return this;
  }

  updateProductsAmounts(searchedProductsListWithoutFilter, storeId) {
    const prodAmountField = document.querySelector(
      `#${View.ID.PRODUCTS_AMOUNTS.ALL}`
    );
    const prodOkAmountField = document.querySelector(
      `#${View.ID.PRODUCTS_AMOUNTS.OK}`
    );
    const prodStorageAmountField = document.querySelector(
      `#${View.ID.PRODUCTS_AMOUNTS.STORAGE}`
    );
    const prodOutOfStockAmountField = document.querySelector(
      `#${View.ID.PRODUCTS_AMOUNTS.OUT_OF_STOCK}`
    );

    const amountsData = this._getCurrProductsAmounts(
      searchedProductsListWithoutFilter,
      storeId
    );

    prodAmountField.textContent = amountsData.all;
    prodOkAmountField.textContent = amountsData.ok;
    prodStorageAmountField.textContent = amountsData.storage;
    prodOutOfStockAmountField.textContent = amountsData.outOfStock;

    return this;
  }

  updateProductsTableBody(productsList) {
    const productsTableBody = document.querySelector(
      `#${View.ID.PRODUCTS_TABLE.BODY}`
    );

    productsTableBody.innerHTML = this._getStructureForTableBody(productsList);

    return this;
  }

  setCurrProductsFilterBtn(filterToOff, filterToSet) {
    if (filterToOff) {
      document
        .querySelector(`#${filterToOff}`)
        ?.classList.add(View.JS_CLASS.FILTER_OFF);
    }

    document
      .querySelector(`#${filterToSet}`)
      ?.classList.remove(View.JS_CLASS.FILTER_OFF);

    return this;
  }

  setAllSortBtnsToDefault(defaultSortOrder) {
    const sortBtns = document.querySelectorAll(`.${View.CLASS.BTN.SORT}`);

    sortBtns.forEach((btn) => {
      btn.classList.remove(
        View.JS_CLASS.SORT_BTN.ASC,
        View.JS_CLASS.SORT_BTN.DESC
      );
      btn.dataset[View.DATA_ATTRIBUTE.SORT_STATE.CAMEL] = defaultSortOrder;
    });

    return this;
  }

  setProductSearchLineToDefault() {
    document.querySelector(`#${View.ID.PRODUCTS_SEARCH.INPUT}`).value = "";

    return this;
  }

  closeCreateStoreModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.WRAPPER}`
    );
    const modalForm = document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.FORM}`
    );
    const formInputWrappers = modalForm.querySelectorAll(
      `.${View.CLASS.MODAL_FIELD_INPUT_WRAPPER}`
    );

    formInputWrappers.forEach((inputWrapper) => {
      const input = inputWrapper.querySelector(
        `.${View.CLASS.MODAL_FIELD_INPUT}`
      );
      this.removeErrorFromInput(input, View.JS_CLASS.ERROR_FIELD, inputWrapper);
    });

    modalForm.reset();

    modalWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  closeDeleteStoreModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.DELETE_STORE.WRAPPER}`
    );

    modalWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  closeCreateProductModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.CREATE_PRODUCT.WRAPPER}`
    );
    const modalForm = document.querySelector(
      `#${View.ID.MODALS.CREATE_PRODUCT.FORM}`
    );
    const formInputWrappers = modalForm.querySelectorAll(
      `.${View.CLASS.MODAL_FIELD_INPUT_WRAPPER}`
    );

    formInputWrappers.forEach((inputWrapper) => {
      const input = inputWrapper.querySelector(
        `.${View.CLASS.MODAL_FIELD_INPUT}`
      );
      this.removeErrorFromInput(input, View.JS_CLASS.ERROR_FIELD, inputWrapper);
    });

    modalForm.reset();

    modalWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  closeEditProductModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.WRAPPER}`
    );
    const modalForm = document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.FORM}`
    );
    const formInputWrappers = modalForm.querySelectorAll(
      `.${View.CLASS.MODAL_FIELD_INPUT_WRAPPER}`
    );

    formInputWrappers.forEach((inputWrapper) => {
      const input = inputWrapper.querySelector(
        `.${View.CLASS.MODAL_FIELD_INPUT}`
      );
      this.removeErrorFromInput(input, View.JS_CLASS.ERROR_FIELD, inputWrapper);
    });

    modalForm.reset();

    modalWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  closeDeleteProductModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.DELETE_PRODUCT.WRAPPER}`
    );

    modalWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  disableStoreDetailsFooterBtns() {
    document.querySelector(`#${View.ID.BTN.CREATE_PRODUCT}`).disabled = true;
    document.querySelector(`#${View.ID.BTN.DELETE_STORE}`).disabled = true;

    return this;
  }

  unlockStoreDetailsFooterBtns() {
    document.querySelector(`#${View.ID.BTN.CREATE_PRODUCT}`).disabled = false;
    document.querySelector(`#${View.ID.BTN.DELETE_STORE}`).disabled = false;

    return this;
  }

  addErrorToInput(input, inputErrClass, inputWrapper, errorMsg) {
    input.classList.add(inputErrClass);
    inputWrapper.dataset[View.DATA_ATTRIBUTE.ERROR_MSG.CAMEL] = errorMsg;
    inputWrapper.classList.add(View.JS_CLASS.ERROR_FIELD_WRAPPER);

    return this;
  }

  removeErrorFromInput(input, inputErrClass, inputWrapper) {
    input.classList.remove(inputErrClass);
    inputWrapper.dataset[View.DATA_ATTRIBUTE.ERROR_MSG.CAMEL] =
      View.DEFAULT_ERROR_MSG;
    inputWrapper.classList.remove(View.JS_CLASS.ERROR_FIELD_WRAPPER);

    return this;
  }

  showPopupWithMsg(msg, color, timeMillisecs) {
    const popupsWrapper = document.querySelector(`#${View.ID.POPUPS_WRAPPER}`);

    const msgSpan = document.createElement("span");
    msgSpan.classList.add(View.CLASS.POPUP_TEXT);
    msgSpan.textContent = msg;
    msgSpan.style.color = color;

    const popup = document.createElement("div");
    popup.classList.add(View.CLASS.POPUP);
    popup.insertAdjacentElement("afterbegin", msgSpan);

    popupsWrapper.insertAdjacentElement("beforeend", popup);

    setTimeout(() => {
      popup.style.opacity = "0";

      setTimeout(() => {
        popup.remove();
      }, 2000);
    }, timeMillisecs);

    return this;
  }

  showErrorModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.ERROR.WRAPPER}`
    );

    modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  closeErrorModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.ERROR.WRAPPER}`
    );

    modalWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  _getStructureForStoresList(storesList) {
    return storesList.reduce((storesStr, nextStore) => {
      const storeName = nextStore.Name
        ? nextStore.Name
        : View.DEFAULT_NOT_SPECIFIED_MSG;
      const storeAddress = nextStore.Address
        ? nextStore.Address
        : View.DEFAULT_NOT_SPECIFIED_MSG;
      const storeFLoorArea = nextStore.FloorArea ? nextStore.FloorArea : "-";
      storesStr += `
                <div class="${View.CLASS.STORES_LIST_ITEM}" data-${View.DATA_ATTRIBUTE.STORE_ID.KEBAB}="${nextStore.id}">
                    <div class="${View.CLASS.STORES_LIST_ITEM}__name-address-wrapper">
                        <h3 class="${View.CLASS.STORES_LIST_ITEM}__name-headline">
                            ${storeName}
                        </h3>
                        <span class="${View.CLASS.STORES_LIST_ITEM}__address-text">
                            ${storeAddress}
                        </span>
                    </div>
                    <div class="${View.CLASS.STORES_LIST_ITEM}__area-data-wrapper">
                        <span class="${View.CLASS.STORES_LIST_ITEM}__area-number">
                            ${storeFLoorArea}
                        </span>
                        <span class="${View.CLASS.STORES_LIST_ITEM}__area-unit">sq.m</span>
                    </div>
                </div>
                `;
      return storesStr;
    }, "");
  }

  _getStructureForTableHeaders(defaultSortOrder) {
    return View.PRODUCTS_TABLE_COLUMNS.reduce(
      (tablesHeadersStr, [columnKey, columnName, alignType]) => {
        const wrapperClassesStr =
          alignType === "align-start"
            ? "products-table__product-field-wrapper"
            : "products-table__product-field-wrapper products-table__product-field-wrapper_end";

        tablesHeadersStr += `
              <th class="products-table__product-field">
                <div class="${wrapperClassesStr}">
                  <button
                    class="${View.CLASS.BTN.SORT}"
                    title="Sort"
                    data-${View.DATA_ATTRIBUTE.SORT_KEY.KEBAB}="${columnKey}"
                    data-${View.DATA_ATTRIBUTE.SORT_STATE.KEBAB}="${defaultSortOrder}"
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

  _getStructureForTableBody(productsList) {
    let productTableBodyStr = "";

    if (Array.isArray(productsList)) {
      productTableBodyStr = productsList?.reduce((neededStr, product) => {
        neededStr += `
          <tr class="product-table-item">
            ${this._getStructureForTableRow(product)}
          </tr>`;
        return neededStr;
      }, "");
    }

    if (!productTableBodyStr) {
      productTableBodyStr = `
        <tr class="product-table-empty-item">
          <td colspan="${View.PRODUCTS_TABLE_COLUMNS.length}" class="product-table-empty-item__no-data">
            No data
          </td>
        </tr>`;
    }

    return productTableBodyStr;
  }

  _getStructureForTableRow(product) {
    return View.PRODUCTS_TABLE_COLUMNS.reduce(
      (productTableDataStr, [productKey, ,]) => {
        switch (productKey) {
          case "Name":
            const productName = product.Name
              ? product.Name
              : View.DEFAULT_NOT_SPECIFIED_MSG;
            const productId = product.id
              ? product.id
              : View.DEFAULT_NOT_SPECIFIED_MSG;
            productTableDataStr += this._getTableStructureForNameField(
              productName,
              productId
            );
            break;
          case "Price":
            const productPrice = product.Price ? product.Price : "-";
            productTableDataStr +=
              this._getTableStructureForPriceField(productPrice);
            break;
          case "Rating":
            const productRating = product.Rating ? product.Rating : 0;
            productTableDataStr += this._getTableStructureForRatingField(
              productRating,
              product.id
            );
            break;
          default:
            const productStandardField = product[productKey]
              ? product[productKey]
              : View.DEFAULT_NOT_SPECIFIED_MSG;
            productTableDataStr +=
              this._getTableStructureForStandardField(productStandardField);
        }
        return productTableDataStr;
      },
      ""
    );
  }

  _getTableStructureForNameField(productName, productId) {
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

  _getTableStructureForPriceField(productPrice) {
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

  _getTableStructureForRatingField(productRating, productId) {
    return `<td class="product-table-item__rating">
              <div class="product-table-item__stars-wrapper">
                ${this._getStructureForRatingStars(productRating, productId)}
              </div>
            </td>`;
  }

  _getTableStructureForStandardField(productField) {
    return `<td class="product-table-item__standard-field">
              <span
              class="product-table-item__standard-field-text"
              title="${productField}">
                ${productField}
              </span>
            </td>`;
  }

  _getStructureForRatingStars(productRating, productId) {
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
          <span class="${View.CLASS.BTN.EDIT}" data-${View.DATA_ATTRIBUTE.PRODUCT_ID.KEBAB}="${productId}"></span>
          <span class="${View.CLASS.BTN.CROSS}" data-${View.DATA_ATTRIBUTE.PRODUCT_ID.KEBAB}="${productId}"></span>
      </div>`
    );
  }

  _updateStoresListLayout(storesList) {
    const noStoresLayout = document.querySelector(
      `#${View.ID.NO_STORES_LAYOUT}`
    );

    if (storesList.length) {
      noStoresLayout.classList.add(View.JS_CLASS.ELEMENT.HIDDEN);
    } else {
      noStoresLayout.classList.remove(View.JS_CLASS.ELEMENT.HIDDEN);
    }

    return this;
  }

  _getCurrProductsAmounts(searchedProductsListWithoutFilter, storeId) {
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
            `Store with id=${storeId} had product with unknown status type: ${product.Status}`
          );
      }
    });

    return amountsData;
  }
}
