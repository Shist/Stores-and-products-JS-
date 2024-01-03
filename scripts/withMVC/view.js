"use strict";

/** View class. Knows everything about DOM & manipulation and a little bit about data structure, which should be filled into UI element. */
class View {
  /**
   * Static object for storing all identifiers of DOM
   * @constant
   * @type {Object.<string, string|Object>}
   * @static
   * @public
   */
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

  /**
   * Static object for storing all classes used in DOM
   * @constant
   * @type {Object.<string, string|Object>}
   * @static
   * @public
   */
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

  /**
   * Static object for storing all classes that dynamically used in script
   * @constant
   * @type {Object.<string, string|Object>}
   * @static
   * @public
   */
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

  /**
   * Static object for storing all text messages for spinners
   * @constant
   * @type {Object.<string, Object<string, string>>}
   * @static
   * @public
   */
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

  /**
   * Static object for storing all data-attributes (kebab and camel cases)
   * @constant
   * @type {Object.<string, Object<string, string>>}
   * @static
   * @public
   */
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

  /**
   * Static object for storing all possible colors for popup
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @public
   */
  static POPUP_COLOR = {
    SUCCESS: "lawngreen",
    ATTENTION: "yellow",
    ERROR: "red",
  };

  /**
   * Static object for storing all possible success and attention messages for popup
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @public
   */
  static POPUP_MSG = {
    SUCCESS_CREATE_STORE: "New store has been successfully created!",
    SUCCESS_CREATE_PRODUCT: "New product has been successfully created!",
    SUCCESS_EDIT_PRODUCT: "The product has been successfully edited!",
    ATTENTION_DELETE_STORE: "The store has been successfully deleted.",
    ATTENTION_DELETE_PRODUCT: "The product has been successfully deleted.",
    ATTENTION_DELETE_ALL_PRODUCTS:
      "All products of store have been successfully deleted.",
  };

  /**
   * Static string for storing message for default error state
   * @constant
   * @type {string}
   * @static
   * @public
   */
  static DEFAULT_ERROR_MSG = "No errors yet...";

  /**
   * Static string for storing message for field which values is not specified
   * @constant
   * @type {string}
   * @static
   * @public
   */
  static DEFAULT_NOT_SPECIFIED_MSG = "(not specified)";

  /**
   * Static string for storing message about prohibited symbols in search input
   * @constant
   * @type {string}
   * @static
   * @public
   */
  static ERROR_SEARCH_MSG = "Prohibited symbols entered!";

  /**
   * Static array for storing arrays that consist of products data: 1) server key; 2) column label; 3) align-type
   * @constant
   * @type {Array.<string[]>}
   * @static
   * @public
   */
  static PRODUCTS_TABLE_COLUMNS = [
    ["Name", "Name", "align-start"],
    ["Price", "Price", "align-end"],
    ["Specs", "Specs", "align-start"],
    ["SupplierInfo", "SupplierInfo", "align-start"],
    ["MadeIn", "Country of origin", "align-start"],
    ["ProductionCompanyName", "Prod. company", "align-start"],
    ["Rating", "Rating", "align-start"],
  ];

  /**
   * Returns the cancel button of create store form
   * @returns {?HTMLButtonElement} cancel button of create store form
   * @public
   */
  getBtnCancelCreateStore() {
    return document.querySelector(`#${View.ID.MODALS.CREATE_STORE.BTN_CANCEL}`);
  }

  /**
   * Returns the cancel button of create product form
   * @returns {?HTMLButtonElement} cancel button of create product form
   * @public
   */
  getBtnCancelCreateProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_PRODUCT.BTN_CANCEL}`
    );
  }

  /**
   * Returns the cancel button of delete store form
   * @returns {?HTMLButtonElement} cancel button of delete store form
   * @public
   */
  getBtnCancelDeleteStore() {
    return document.querySelector(`#${View.ID.MODALS.DELETE_STORE.BTN_CANCEL}`);
  }

  /**
   * Returns the cancel button of delete product form
   * @returns {?HTMLButtonElement} cancel button of delete product form
   * @public
   */
  getBtnCancelDeleteProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.DELETE_PRODUCT.BTN_CANCEL}`
    );
  }

  /**
   * Returns the cancel button of edit product form
   * @returns {?HTMLButtonElement} cancel button of edit product form
   * @public
   */
  getBtnCancelEditProduct() {
    return document.querySelector(`#${View.ID.MODALS.EDIT_PRODUCT.BTN_CANCEL}`);
  }

  /**
   * Returns the confirm button of create store form
   * @returns {?HTMLButtonElement} confirm button of create store form
   * @public
   */
  getBtnConfirmCreateStore() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.BTN_CONFIRM}`
    );
  }

  /**
   * Returns the confirm button of create product form
   * @returns {?HTMLButtonElement} confirm button of create product form
   * @public
   */
  getBtnConfirmCreateProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_PRODUCT.BTN_CONFIRM}`
    );
  }

  /**
   * Returns the confirm button of delete store form
   * @returns {?HTMLButtonElement} confirm button of delete store form
   * @public
   */
  getBtnConfirmDeleteStore() {
    return document.querySelector(
      `#${View.ID.MODALS.DELETE_STORE.BTN_CONFIRM}`
    );
  }

  /**
   * Returns the confirm button of delete product form
   * @returns {?HTMLButtonElement} confirm button of delete product form
   * @public
   */
  getBtnConfirmDeleteProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.DELETE_PRODUCT.BTN_CONFIRM}`
    );
  }

  /**
   * Returns the confirm button of edit product form
   * @returns {?HTMLButtonElement} confirm button of edit product form
   * @public
   */
  getBtnConfirmEditProduct() {
    return document.querySelector(
      `#${View.ID.MODALS.EDIT_PRODUCT.BTN_CONFIRM}`
    );
  }

  /**
   * Returns the button that opens modal with create store form
   * @returns {?HTMLButtonElement} button that opens modal with create store form
   * @public
   */
  getBtnCreateStore() {
    return document.querySelector(`#${View.ID.BTN.CREATE_STORE}`);
  }

  /**
   * Returns the button that opens modal with create product form
   * @returns {?HTMLButtonElement} button that opens modal with create product form
   * @public
   */
  getBtnCreateProduct() {
    return document.querySelector(`#${View.ID.BTN.CREATE_PRODUCT}`);
  }

  /**
   * Returns the button that opens modal with delete store form
   * @returns {?HTMLButtonElement} button that opens modal with delete store form
   * @public
   */
  getBtnDeleteStore() {
    return document.querySelector(`#${View.ID.BTN.DELETE_STORE}`);
  }

  /**
   * Returns the ok button that closes modal with error message
   * @returns {?HTMLButtonElement} ok button that closes modal with error message
   * @public
   */
  getBtnOkModalError() {
    return document.querySelector(`#${View.ID.MODALS.ERROR.BTN_OK}`);
  }

  /**
   * Returns the closest filter button element (or null, if there is no)
   * @param {HTMLElement} element the element starting from which the nearest button is searched
   * @returns {HTMLButtonElement|null} the closest filter button element (or null, if there is no)
   * @public
   */
  getClosestFilterBtn(element) {
    return element.closest(`.${View.CLASS.BTN.FILTER}`);
  }

  /**
   * Returns the closest stores list item element (or null, if there is no)
   * @param {HTMLElement} element the element starting from which the nearest stores list item is searched
   * @returns {HTMLDivElement|null} the closest stores list item element (or null, if there is no)
   * @public
   */
  getClosestStoresListItem(element) {
    return element.closest(`.${View.CLASS.STORES_LIST_ITEM}`);
  }

  /**
   * Returns the wrapper for filters (All, Ok, Storage, Out of stock)
   * @returns {?HTMLDivElement} the wrapper for filters (All, Ok, Storage, Out of stock)
   * @public
   */
  getFilterWrapper() {
    return document.querySelector(`#${View.ID.FILTER_WRAPPER}`);
  }

  /**
   * Returns the wrapper for modal with create product form
   * @returns {?HTMLDivElement} the wrapper for modal with create product form
   * @public
   */
  getModalCreateProductWrapper() {
    return document.querySelector(`#${View.ID.MODALS.CREATE_PRODUCT.WRAPPER}`);
  }

  /**
   * Returns the name input of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLInputElement} the name input of product form
   * @public
   */
  getProductInputNameByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_NAME}`);
  }

  /**
   * Returns the name input wrapper of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLDivElement} the name input wrapper of product form
   * @public
   */
  getProductInputNameWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_NAME_WRAPPER}`);
  }

  /**
   * Returns the price input of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLInputElement} the price input of product form
   * @public
   */
  getProductInputPriceByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_PRICE}`);
  }

  /**
   * Returns the price input wrapper of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLDivElement} the price input wrapper of product form
   * @public
   */
  getProductInputPriceWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_PRICE_WRAPPER}`);
  }

  /**
   * Returns the specs input of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLInputElement} the specs input of product form
   * @public
   */
  getProductInputSpecsByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_SPECS}`);
  }

  /**
   * Returns the specs input wrapper of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLDivElement} the specs input wrapper of product form
   * @public
   */
  getProductInputSpecsWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_SPECS_WRAPPER}`);
  }

  /**
   * Returns the rating input of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLInputElement} the rating input of product form
   * @public
   */
  getProductInputRatingByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_RATING}`);
  }

  /**
   * Returns the rating input wrapper of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLDivElement} the rating input wrapper of product form
   * @public
   */
  getProductInputRatingWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_RATING_WRAPPER}`);
  }

  /**
   * Returns the supplier info input of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLInputElement} the supplier info input of product form
   * @public
   */
  getProductInputSupplierInfoByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_SUPPLIER_INFO}`);
  }

  /**
   * Returns the supplier info input wrapper of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLDivElement} the supplier info input wrapper of product form
   * @public
   */
  getProductInputSupplierInfoWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(
      `#${modalIdsObj.INPUT_SUPPLIER_INFO_WRAPPER}`
    );
  }

  /**
   * Returns the country input of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLInputElement} the country input of product form
   * @public
   */
  getProductInputCountryByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_COUNTRY}`);
  }

  /**
   * Returns the country input wrapper of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLDivElement} the country input wrapper of product form
   * @public
   */
  getProductInputCountryWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_COUNTRY_WRAPPER}`);
  }

  /**
   * Returns the production company input of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLInputElement} the production company input of product form
   * @public
   */
  getProductInputProdCompanyByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_PROD_COMPANY}`);
  }

  /**
   * Returns the production company input wrapper of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLDivElement} the production company input wrapper of product form
   * @public
   */
  getProductInputProdCompanyWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_PROD_COMPANY_WRAPPER}`);
  }

  /**
   * Returns the status input of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLInputElement} the status input of product form
   * @public
   */
  getProductInputStatusByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_STATUS}`);
  }

  /**
   * Returns the status input wrapper of product form (create or edit) by object with modal identifiers
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {?HTMLDivElement} the status input wrapper of product form
   * @public
   */
  getProductInputStatusWrapperByModalIdsObj(modalIdsObj) {
    return document.querySelector(`#${modalIdsObj.INPUT_STATUS_WRAPPER}`);
  }

  /**
   * Returns the wrapper for modal with create store form
   * @returns {?HTMLDivElement} the wrapper for modal with create store form
   * @public
   */
  getModalCreateStoreWrapper() {
    return document.querySelector(`#${View.ID.MODALS.CREATE_STORE.WRAPPER}`);
  }

  /**
   * Returns the name input of create store form
   * @returns {?HTMLInputElement} the name input of create store form
   * @public
   */
  getModalCreateStoreInputName() {
    return document.querySelector(`#${View.ID.MODALS.CREATE_STORE.INPUT_NAME}`);
  }

  /**
   * Returns the name input wrapper of create store form
   * @returns {?HTMLDivElement} the name input wrapper of create store form
   * @public
   */
  getModalCreateStoreInputNameWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_NAME_WRAPPER}`
    );
  }

  /**
   * Returns the email input of create store form
   * @returns {?HTMLInputElement} the email input of create store form
   * @public
   */
  getModalCreateStoreInputEmail() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_EMAIL}`
    );
  }

  /**
   * Returns the email input wrapper of create store form
   * @returns {?HTMLDivElement} the email input wrapper of create store form
   * @public
   */
  getModalCreateStoreInputEmailWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_EMAIL_WRAPPER}`
    );
  }

  /**
   * Returns the phone input of create store form
   * @returns {?HTMLInputElement} the phone input of create store form
   * @public
   */
  getModalCreateStoreInputPhone() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_PHONE}`
    );
  }

  /**
   * Returns the phone input wrapper of create store form
   * @returns {?HTMLDivElement} the phone input wrapper of create store form
   * @public
   */
  getModalCreateStoreInputPhoneWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_PHONE_WRAPPER}`
    );
  }

  /**
   * Returns the address input of create store form
   * @returns {?HTMLInputElement} the address input of create store form
   * @public
   */
  getModalCreateStoreInputAddress() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_ADDRESS}`
    );
  }

  /**
   * Returns the address input wrapper of create store form
   * @returns {?HTMLDivElement} the address input wrapper of create store form
   * @public
   */
  getModalCreateStoreInputAddressWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_ADDRESS_WRAPPER}`
    );
  }

  /**
   * Returns the established date input of create store form
   * @returns {?HTMLInputElement} the established date input of create store form
   * @public
   */
  getModalCreateStoreInputEstDate() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_ESTABLISHED_DATE}`
    );
  }

  /**
   * Returns the established date input wrapper of create store form
   * @returns {?HTMLDivElement} the established date input wrapper of create store form
   * @public
   */
  getModalCreateStoreInputEstDateWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_ESTABLISHED_DATE_WRAPPER}`
    );
  }

  /**
   * Returns the floor area input of create store form
   * @returns {?HTMLInputElement} the floor area input of create store form
   * @public
   */
  getModalCreateStoreInputFloorArea() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_FLOOR_AREA}`
    );
  }

  /**
   * Returns the floor area input wrapper of create store form
   * @returns {?HTMLDivElement} the floor area input wrapper of create store form
   * @public
   */
  getModalCreateStoreInputFloorAreaWrapper() {
    return document.querySelector(
      `#${View.ID.MODALS.CREATE_STORE.INPUT_FLOOR_AREA_WRAPPER}`
    );
  }

  /**
   * Returns the wrapper for modal with delete product form
   * @returns {?HTMLDivElement} the wrapper for modal with delete product form
   * @public
   */
  getModalDeleteProductWrapper() {
    return document.querySelector(`#${View.ID.MODALS.DELETE_PRODUCT.WRAPPER}`);
  }

  /**
   * Returns the wrapper for modal with delete store form
   * @returns {?HTMLDivElement} the wrapper for modal with delete store form
   * @public
   */
  getModalDeleteStoreWrapper() {
    return document.querySelector(`#${View.ID.MODALS.DELETE_STORE.WRAPPER}`);
  }

  /**
   * Returns the edit product form
   * @returns {?HTMLFormElement} the edit product form
   * @public
   */
  getModalEditProductForm() {
    return document.querySelector(`#${View.ID.MODALS.EDIT_PRODUCT.FORM}`);
  }

  /**
   * Returns the wrapper for modal with edit product form
   * @returns {?HTMLDivElement} the wrapper for modal with edit product form
   * @public
   */
  getModalEditProductWrapper() {
    return document.querySelector(`#${View.ID.MODALS.EDIT_PRODUCT.WRAPPER}`);
  }

  /**
   * Returns the spinner DOM element by its identifier
   * @param {string} spinnerId identifier of the spinner DOM element
   * @returns {?HTMLDivElement} the spinner DOM element
   * @public
   */
  getSpinnerById(spinnerId) {
    return document.querySelector(`#${spinnerId}`);
  }

  /**
   * Returns the wrapper for store details description (email, phone, address, estDate, floorArea)
   * @returns {?HTMLDivElement} the wrapper for store details description
   * @public
   */
  getStoreDetailsDescriptionWrapper() {
    return document.querySelector(
      `#${View.ID.STORE_DETAILS.DESCRIPTION_WRAPPER}`
    );
  }

  /**
   * Returns the store details header (store description + filters wrapper)
   * @returns {?HTMLElement} the store details header
   * @public
   */
  getStoreDetailsHeader() {
    return document.querySelector(`#${View.ID.STORE_DETAILS.HEADER}`);
  }

  /**
   * Returns the store details wrapper (store description + filters wrapper + whole table)
   * @returns {?HTMLDivElement} the store details wrapper
   * @public
   */
  getStoreDetailsWrapper() {
    return document.querySelector(`#${View.ID.STORE_DETAILS.WRAPPER}`);
  }

  /**
   * Returns the wrapper for cases when the store is not found
   * @returns {?HTMLDivElement} the wrapper for cases when the store is not found
   * @public
   */
  getStoreNotFoundWrapper() {
    return document.querySelector(`#${View.ID.STORE_NOT_FOUND_WRAPPER}`);
  }

  /**
   * Returns the container in which the list of stores is stored
   * @returns {?HTMLDivElement} the container in which the list of stores is stored
   * @public
   */
  getStoresLayout() {
    return document.querySelector(`#${View.ID.STORES_LAYOUT}`);
  }

  /**
   * Returns the stores list header (headline + search line with button)
   * @returns {?HTMLElement} the stores list header
   * @public
   */
  getStoresListHeader() {
    return document.querySelector(`#${View.ID.STORES_LIST.HEADER}`);
  }

  /**
   * Returns the stores list section (which can contain either stores list layout or layout for empty stores list)
   * @returns {?HTMLDivElement} the stores list section
   * @public
   */
  getStoresListSection() {
    return document.querySelector(`#${View.ID.STORES_LIST.SECTION}`);
  }

  /**
   * Returns the search button for stores
   * @returns {?HTMLButtonElement} the search button for stores
   * @public
   */
  getStoresSearchBtn() {
    return document.querySelector(`#${View.ID.STORES_SEARCH.BTN}`);
  }

  /**
   * Returns the search input for stores
   * @returns {?HTMLInputElement} the search input for stores
   * @public
   */
  getStoresSearchInput() {
    return document.querySelector(`#${View.ID.STORES_SEARCH.INPUT}`);
  }

  /**
   * Returns the search wrapper for stores (that contains input + button)
   * @returns {?HTMLDivElement} the search wrapper for stores
   * @public
   */
  getStoresSearchWrapper() {
    return document.querySelector(`#${View.ID.STORES_SEARCH.WRAPPER}`);
  }

  /**
   * Returns the search button for products
   * @returns {?HTMLButtonElement} the search button for products
   * @public
   */
  getProductsSearchBtn() {
    return document.querySelector(`#${View.ID.PRODUCTS_SEARCH.BTN}`);
  }

  /**
   * Returns the search input for products
   * @returns {?HTMLInputElement} the search input for products
   * @public
   */
  getProductsSearchInput() {
    return document.querySelector(`#${View.ID.PRODUCTS_SEARCH.INPUT}`);
  }

  /**
   * Returns the search wrapper for products (that contains input + button)
   * @returns {?HTMLDivElement} the search wrapper for products
   * @public
   */
  getProductsSearchWrapper() {
    return document.querySelector(`#${View.ID.PRODUCTS_SEARCH.WRAPPER}`);
  }

  /**
   * Returns the whole table with products (the table element)
   * @returns {?HTMLTableElement} the whole table with products (the table element)
   * @public
   */
  getProductsTable() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.TABLE}`);
  }

  /**
   * Returns the table body with products (the table body element)
   * @returns {?HTMLTableSectionElement} the table body with products (the table body element)
   * @public
   */
  getProductsTableBody() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.BODY}`);
  }

  /**
   * Returns the head table row with name of the table and search products wrapper
   * @returns {?HTMLTableRowElement} the head table row with name of the table and search products wrapper
   * @public
   */
  getProductsTableHeadName() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.HEAD_NAME}`);
  }

  /**
   * Returns the head table row with titles of the table (Name, Price, Specs, etc.)
   * @returns {?HTMLTableRowElement} the head table row with titles of the table
   * @public
   */
  getProductsTableHeadTitles() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.HEAD_TITLES}`);
  }

  /**
   * Returns the whole head of the table (consists of table name row and table titles row)
   * @returns {?HTMLTableSectionElement} the whole head of the table
   * @public
   */
  getProductsTableHead() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.HEAD}`);
  }

  /**
   * Returns the wrapper fot products table
   * @returns {?HTMLDivElement} the wrapper fot products table
   * @public
   */
  getProductsTableWrapper() {
    return document.querySelector(`#${View.ID.PRODUCTS_TABLE.TABLE_WRAPPER}`);
  }

  /**
   * Returns the HTML structure of spinner via given spinner options
   * @param {Object.<string, string|number>} filterOptions the object with spinner options
   * @returns {string} the HTML structure of spinner
   * @public
   */
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

  /**
   * Returns the HTML structure of table head
   * @param {string} defaultSortOrder string containing default sorting order value (usually from model)
   * @returns {string} the HTML structure of table head
   * @public
   */
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

  /**
   * Highlights card of current active store via given store identifier
   * @param {string} currStoreId current store identifier
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Highlights card of current active store via given store identifier
   * @param {Object[]} storesList list of stores
   * @param {string} currStoreId current store identifier
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Shows "no store details layout" when given parameter is null or hides it otherwise
   * @param {string} currStore current store identifier
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Updates store description fields (email, phone, etc.) via given store object
   * @param {Object.<string, string|number>} store the store object
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

    storeEmailField.textContent = store.Email
      ? store.Email
      : View.DEFAULT_NOT_SPECIFIED_MSG;
    storeEstDateField.textContent = store.Established
      ? new Date(store.Established).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : View.DEFAULT_NOT_SPECIFIED_MSG;
    storeAddressField.textContent = store.Address
      ? store.Address
      : View.DEFAULT_NOT_SPECIFIED_MSG;
    storePhoneField.textContent = store.PhoneNumber
      ? store.PhoneNumber
      : View.DEFAULT_NOT_SPECIFIED_MSG;
    storeFloorAreaField.textContent = store.FloorArea
      ? store.FloorArea
      : View.DEFAULT_NOT_SPECIFIED_MSG;

    return this;
  }

  /**
   * Updates edit product form fields (name, price, etc.) via given product object
   * @param {Object.<string, string|number>} product the product object
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Updates fields with products amounts (All, Ok, Storage, Out of Stock) via given products array and store identifier
   * @param {Object[]} searchedProductsListWithoutFilter the array of products objects (without status filter)
   * @param {string} storeId current store identifier
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Updates body of products table via given products array
   * @param {Object[]} productsList the array of products objects
   * @returns {View} self object (for chaining ability)
   * @public
   */
  updateProductsTableBody(productsList) {
    const productsTableBody = document.querySelector(
      `#${View.ID.PRODUCTS_TABLE.BODY}`
    );

    productsTableBody.innerHTML = this._getStructureForTableBody(productsList);

    return this;
  }

  /**
   * Turns off old filter and turns on new (active) filter
   * @param {string} filterToOff identifier of old filter
   * @param {string} filterToSet identifier of new filter
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Sets all sorting buttons to default state
   * @param {string} defaultSortOrder string containing default sorting order value (usually from model)
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Sets products search input to default state (makes its value empty)
   * @returns {View} self object (for chaining ability)
   * @public
   */
  setProductSearchLineToDefault() {
    document.querySelector(`#${View.ID.PRODUCTS_SEARCH.INPUT}`).value = "";

    return this;
  }

  /**
   * Closes modal with create store form
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Closes modal with delete store form
   * @returns {View} self object (for chaining ability)
   * @public
   */
  closeDeleteStoreModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.DELETE_STORE.WRAPPER}`
    );

    modalWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  /**
   * Closes modal with create product form
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Closes modal with edit product form
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Closes modal with delete product form
   * @returns {View} self object (for chaining ability)
   * @public
   */
  closeDeleteProductModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.DELETE_PRODUCT.WRAPPER}`
    );

    modalWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  /**
   * Disables buttons of store details footer ("create product" and "delete store")
   * @returns {View} self object (for chaining ability)
   * @public
   */
  disableStoreDetailsFooterBtns() {
    document.querySelector(`#${View.ID.BTN.CREATE_PRODUCT}`).disabled = true;
    document.querySelector(`#${View.ID.BTN.DELETE_STORE}`).disabled = true;

    return this;
  }

  /**
   * Enables buttons of store details footer ("create product" and "delete store")
   * @returns {View} self object (for chaining ability)
   * @public
   */
  unlockStoreDetailsFooterBtns() {
    document.querySelector(`#${View.ID.BTN.CREATE_PRODUCT}`).disabled = false;
    document.querySelector(`#${View.ID.BTN.DELETE_STORE}`).disabled = false;

    return this;
  }

  /**
   * Adds error message to given input wrapper (via data-attributes) and classes for input (with its wrapper)
   * @param {HTMLInputElement} input input which needs adding the error class
   * @param {string} inputErrClass the name of error class for input (for usual input or search input)
   * @param {HTMLDivElement} inputWrapper input wrapper which needs adding the error class and data-attribute with error
   * @param {string} errorMsg string containing message of error
   * @returns {View} self object (for chaining ability)
   * @public
   */
  addErrorToInput(input, inputErrClass, inputWrapper, errorMsg) {
    input.classList.add(inputErrClass);
    inputWrapper.dataset[View.DATA_ATTRIBUTE.ERROR_MSG.CAMEL] = errorMsg;
    inputWrapper.classList.add(View.JS_CLASS.ERROR_FIELD_WRAPPER);

    return this;
  }

  /**
   * Removes error message from given input wrapper (via data-attributes) and classes for input (with its wrapper)
   * @param {HTMLInputElement} input input which needs removing the error class
   * @param {string} inputErrClass the name of error class for input (for usual input or search input)
   * @param {HTMLDivElement} inputWrapper input wrapper which needs removing the error class and data-attribute with error
   * @returns {View} self object (for chaining ability)
   * @public
   */
  removeErrorFromInput(input, inputErrClass, inputWrapper) {
    input.classList.remove(inputErrClass);
    inputWrapper.dataset[View.DATA_ATTRIBUTE.ERROR_MSG.CAMEL] =
      View.DEFAULT_ERROR_MSG;
    inputWrapper.classList.remove(View.JS_CLASS.ERROR_FIELD_WRAPPER);

    return this;
  }

  /**
   * Shows popup with some message for user (can be info popup or error popop)
   * @param {string} msg string containing message for the popup
   * @param {string} color string containing color settings for the popup
   * @param {number} timeMillisecs number of milliseconds which the popup will exist
   * @returns {View} self object (for chaining ability)
   * @public
   */
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

  /**
   * Shows modal with error (usually used in form validations)
   * @returns {View} self object (for chaining ability)
   * @public
   */
  showErrorModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.ERROR.WRAPPER}`
    );

    modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  /**
   * Hides modal with error (usually used in form validations)
   * @returns {View} self object (for chaining ability)
   * @public
   */
  closeErrorModal() {
    const modalWrapper = document.querySelector(
      `#${View.ID.MODALS.ERROR.WRAPPER}`
    );

    modalWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);

    return this;
  }

  /**
   * Returns the HTML structure of stores list
   * @param {Object[]} storesList list of stores
   * @returns {string} the HTML structure of stores list
   * @private
   */
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

  /**
   * Returns the HTML structure of table headers
   * @param {string} defaultSortOrder string containing default sorting order value (usually from model)
   * @returns {string} the HTML structure of table headers
   * @private
   */
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

  /**
   * Returns the HTML structure of table body via given products array
   * @param {Object[]} productsList the array of products objects
   * @returns {string} the HTML structure of table body
   * @private
   */
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

  /**
   * Returns the HTML structure of table row
   * @param {Object.<string, string|number>} product the product object
   * @returns {string} the HTML structure of v
   * @private
   */
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

  /**
   * Returns the HTML structure of name table data
   * @param {string} productName the product name
   * @param {number|string} productId the product identifier
   * @returns {string} the HTML structure of name table data
   * @private
   */
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

  /**
   * Returns the HTML structure of price table data
   * @param {number|string} productPrice the product price
   * @returns {string} the HTML structure of price table data
   * @private
   */
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

  /**
   * Returns the HTML structure of rating table data
   * @param {number|string} productRating the product rating
   * @param {number|string} productId the product identifier
   * @returns {string} the HTML structure of rating table data
   * @private
   */
  _getTableStructureForRatingField(productRating, productId) {
    return `<td class="product-table-item__rating">
              <div class="product-table-item__stars-wrapper">
                ${this._getStructureForRatingStars(productRating, productId)}
              </div>
            </td>`;
  }

  /**
   * Returns the HTML structure of standard field table data (specs, supplierInfo, country, prodCompany)
   * @param {string} productField the product field
   * @returns {string} the HTML structure of standard field table data
   * @private
   */
  _getTableStructureForStandardField(productField) {
    return `<td class="product-table-item__standard-field">
              <span
              class="product-table-item__standard-field-text"
              title="${productField}">
                ${productField}
              </span>
            </td>`;
  }

  /**
   * Returns the HTML structure of rating stars wrapper
   * @param {number|string} productRating the product rating
   * @param {number|string} productId the product identifier
   * @returns {string} the HTML structure of rating stars wrapper
   * @private
   */
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

  /**
   * Shows "no stores layout" when stores list is empty or hides it otherwise
   * @param {Object[]} storesList list of stores
   * @returns {View} self object (for chaining ability)
   * @private
   */
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

  /**
   * Calculates values for products amounts fields (All, Ok, Storage, Out of Stock) via given products array and store identifier
   * @param {Object[]} searchedProductsListWithoutFilter the array of products objects (without status filter)
   * @param {string} storeId current store identifier
   * @returns {Object.<string, number>} object that contains values for products amounts fields
   * @private
   */
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

export default View;
