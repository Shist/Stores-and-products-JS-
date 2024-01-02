"use strict";

class View {
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
    FILTER: {
      ALL: "filter-all",
      OK: "filter-ok",
      STORAGE: "filter-storage",
      OUT_OF_STOCK: "filter-out-of-stock",
    },
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
      FLEX: "js-hidden-element",
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

  static PRODUCTS_TABLE_COLUMNS = [
    ["Name", "Name", "align-start"],
    ["Price", "Price", "align-end"],
    ["Specs", "Specs", "align-start"],
    ["SupplierInfo", "SupplierInfo", "align-start"],
    ["MadeIn", "Country of origin", "align-start"],
    ["ProductionCompanyName", "Prod. company", "align-start"],
    ["Rating", "Rating", "align-start"],
  ];
}