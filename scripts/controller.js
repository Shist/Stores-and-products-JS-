"use strict";

class Controller {
  static LOCAL_STORAGE_ID = {
    CURR_STORE: "currStoreId",
    BOOKMARK_DETECTED: "bookmarkIsDetected",
    CURR_PRODUCT: "currProductId",
    CURR_FILTER: "currFilterId",
    CURR_SORT_KEY: "currSortKey",
    CURR_SORT_ORDER: "currSortOrder",
    STORES_LIST_SPINNER_FETHES: "storesListSpinnerFetches",
    DETAILS_SPINNER_FETHES: "detailsSpinnerFetches",
    FILTERS_SPINNER_FETHES: "filtersSpinnerFetches",
    PRODUCTS_LIST_SPINNER_FETHES: "productsListSpinnerFetches",
    EDIT_PRODUCT_FORM_SPINNER_FETHES: "editProductFormSpinnerFetches",
  };

  static SORT_ORDER = {
    ASC: "asc",
    DESC: "desc",
    DEFAULT: "default",
  };

  static BOOKMARK_QUERY_STORE_ID = "store-id";

  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
}
