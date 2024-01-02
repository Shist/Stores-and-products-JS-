"use strict";

import Model from "./model.js";
import View from "./view.js";

export default class Controller {
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

  static BOOKMARK_QUERY_STORE_ID = "store-id";

  constructor(/*TODO - add view and model as parameters*/) {
    this.view = new View();
    this.model = new Model();
  }

  init() {
    this._initLocalStorageData();

    this._setSearchStoresListeners();
    // setStoresCardsClickListener();

    // setProductsFiltersBtnsListener();
    // renderProductsTableHead();
    // setTableRowsBtnsListeners();

    // setFootersBtnsListeners();
    // setModalsConfirmBtnsListeners();
    // setModalsCancelBtnsListeners();

    // loadStoreIdFromBookmark();

    // setStoresListSpinner(CONSTANTS.SPINNER_TEXT.STORES_LIST.LOADING);

    // getSearchedStoresList()
    //   .then((storesList) => {
    //     if (Array.isArray(storesList)) {
    //       updateStoresList(storesList);
    //     }
    //   })
    //   .catch((error) => {
    //     showPopupWithMsg(error.message, CONSTANTS.POPUP_ERROR_COLOR, 8000);
    //   })
    //   .finally(() => {
    //     requestSpinnerRemovingById(CONSTANTS.SPINNERS_ID.STORES_LIST);
    //   });
  }

  _clearTableSortFiltersFromLocalStorage() {
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_KEY);
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_SORT_ORDER);
  }

  _initLocalStorageData() {
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_STORE_ID);
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.BOOKMARK_DETECTED);
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_PRODUCT_ID);
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_ID.CURR_FILTER_ID);
    this._clearTableSortFiltersFromLocalStorage();
    localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      CONSTANTS.LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES,
      "0"
    );
  }

  _setSearchStoresListeners() {
    const searchInput = this.view.getStoresSearchInput();
    const searchBtn = this.view.getStoresSearchBtn();

    searchInput.addEventListener("search", this._onSearchStoresClick);
    searchBtn.addEventListener("click", this._onSearchStoresClick);
  }

  _onSearchStoresClick() {
    const searchWrapper = this.view.getStoresSearchWrapper();
    const searchInput = this.view.getStoresSearchInput();

    if (this.model.validateSearch(searchInput)) {
      this.view.removeErrorFromInput(
        searchInput,
        View.JS_CLASS.ERROR_SEARCH_FIELD,
        searchWrapper
      );

      this._setStoresListSpinner(View.SPINNER_TEXT.STORES_LIST.LOADING);

      this.model
        .getSearchedStoresList(searchInput.value)
        .then((storesList) => {
          if (Array.isArray(storesList)) {
            this.view.updateStoresList(
              storesList,
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
            );
          }
        })
        .catch((error) => {
          this.view.showPopupWithMsg(
            error.message,
            View.POPUP_COLOR.ERROR,
            8000
          );
        })
        .finally(() => {
          this._requestSpinnerRemovingById(View.ID.SPINNER.STORES_LIST);
        });
    } else {
      this.view.addErrorToInput(
        searchInput,
        View.JS_CLASS.ERROR_SEARCH_FIELD,
        searchWrapper,
        View.ERROR_SEARCH_MSG
      );
    }
  }

  _setProductsListSpinnerResizeListeners() {
    const storeDetailsWrapper = this.view.getStoreDetailsWrapper();

    storeDetailsWrapper.addEventListener(
      "scroll",
      this._resizeHeightAndMoveProductsListSpinner
    );
    window.addEventListener("resize", this._resizeWidthForProductsListSpinner);
  }

  _describeProductsListSpinnerResizeListeners() {
    const storeDetailsWrapper = this.view.getStoreDetailsWrapper();

    storeDetailsWrapper.removeEventListener(
      "scroll",
      this._resizeHeightAndMoveProductsListSpinner
    );
    window.removeEventListener(
      "resize",
      this._resizeWidthForProductsListSpinner
    );
  }

  _getTopOffsetForProductsListSpinner() {
    const storeDetailsHeader = this.view.getStoreDetailsHeader();
    const tableWrapperComputedStyle = getComputedStyle(
      this.view.getProductsTableWrapper()
    );
    const tableHeadName = this.view.getProductsTableHeadName();
    const tableHeadTitles = this.view.getProductsTableHeadTitles();

    return {
      wholeOffset:
        storeDetailsHeader.offsetHeight +
        parseFloat(tableWrapperComputedStyle.paddingTop) +
        tableHeadName.offsetHeight +
        tableHeadTitles.offsetHeight,
      tableWrapperPaddingOffset: parseFloat(
        tableWrapperComputedStyle.paddingTop
      ),
      tableHeadNameOffset: tableHeadName.offsetHeight,
    };
  }

  _resizeHeightAndMoveProductsListSpinner() {
    const storeDetailsWrapper = this.view.getStoreDetailsWrapper();
    const productsListSpinner = this.view.getSpinnerById(
      View.ID.SPINNER.PRODUCTS_LIST
    );

    if (productsListSpinner) {
      let offsetDiff = storeDetailsWrapper.scrollTop;
      const spinnerInitHeight = +productsListSpinner.dataset[
        View.DATA_ATTRIBUTE.SPINNER_INIT_HEIGHT.CAMEL
      ].replace(/\D/g, "");
      const offsetObj = this._getTopOffsetForProductsListSpinner();
      const maxOffsetDiff =
        offsetObj.tableWrapperPaddingOffset + offsetObj.tableHeadNameOffset;

      if (offsetDiff > maxOffsetDiff) {
        offsetDiff = maxOffsetDiff;
      }

      productsListSpinner.style.height = `${spinnerInitHeight + offsetDiff}px`;
      productsListSpinner.style.top = `${offsetObj.wholeOffset - offsetDiff}px`;
    }
  }

  _resizeWidthForProductsListSpinner() {
    const productsListSpinner = this.view.getSpinnerById(
      View.ID.SPINNER.PRODUCTS_LIST
    );

    if (productsListSpinner) {
      const windowInitWidth = +productsListSpinner.dataset[
        View.DATA_ATTRIBUTE.WINDOW_INIT_WIDTH.CAMEL
      ].replace(/\D/g, "");
      const spinnerInitWidth = +productsListSpinner.dataset[
        View.DATA_ATTRIBUTE.SPINNER_INIT_WIDTH.CAMEL
      ].replace(/\D/g, "");
      let offsetDiff = window.innerWidth - windowInitWidth;

      if (window.innerWidth <= 960) {
        offsetDiff += 320;
      }

      productsListSpinner.style.width = `${spinnerInitWidth + offsetDiff}px`;
    }
  }

  _getFetchOperationsAmountForSpinner(spinnerId) {
    switch (spinnerId) {
      case View.ID.SPINNER.STORES_LIST:
        const storesListFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES
        );
        return storesListFetches;
      case View.ID.SPINNER.STORE_DETAILS:
        const detailsFethes = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES
        );
        return detailsFethes;
      case View.ID.SPINNER.PRODUCTS_AMOUNTS:
        const filtersFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES
        );
        return filtersFetches;
      case View.ID.SPINNER.PRODUCTS_LIST:
        const productsListFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES
        );
        return productsListFetches;
      case View.ID.SPINNER.EDIT_PRODUCT_FORM:
        const editProductFormFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES
        );
        return editProductFormFetches;
      default:
        console.warn(
          `Got unknown type of spinner while getting fetches amount, spinerId: ${spinnerId}`
        );
    }
  }

  _plusFetchOperationForSpinner(spinnerId) {
    switch (spinnerId) {
      case View.ID.SPINNER.STORES_LIST:
        let storesListFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES
        );
        storesListFetches++;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
          storesListFetches
        );
        break;
      case View.ID.SPINNER.STORE_DETAILS:
        let detailsFethes = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES
        );
        detailsFethes++;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES,
          detailsFethes
        );
        break;
      case View.ID.SPINNER.PRODUCTS_AMOUNTS:
        let filtersFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES
        );
        filtersFetches++;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES,
          filtersFetches
        );
        break;
      case View.ID.SPINNER.PRODUCTS_LIST:
        let productsListFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES
        );
        productsListFetches++;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
          productsListFetches
        );
        break;
      case View.ID.SPINNER.EDIT_PRODUCT_FORM:
        let editProductFormFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES
        );
        editProductFormFetches++;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES,
          editProductFormFetches
        );
        break;
      default:
        console.warn(
          `Got unknown type of spinner while plusing fetch operation, spinerId: ${spinnerId}`
        );
    }
  }

  _minusFetchOperationForSpinner(spinnerId) {
    switch (spinnerId) {
      case View.ID.SPINNER.STORES_LIST:
        let storesListFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES
        );
        storesListFetches--;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
          storesListFetches
        );
        break;
      case View.ID.SPINNER.STORE_DETAILS:
        let detailsFethes = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES
        );
        detailsFethes--;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES,
          detailsFethes
        );
        break;
      case View.ID.SPINNER.PRODUCTS_AMOUNTS:
        let filtersFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES
        );
        filtersFetches--;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES,
          filtersFetches
        );
        break;
      case View.ID.SPINNER.PRODUCTS_LIST:
        let productsListFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES
        );
        productsListFetches--;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
          productsListFetches
        );
        break;
      case View.ID.SPINNER.EDIT_PRODUCT_FORM:
        let editProductFormFetches = +localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES
        );
        editProductFormFetches--;
        localStorage.setItem(
          Controller.LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES,
          editProductFormFetches
        );
        break;
      default:
        console.warn(
          `Got unknown type of spinner while minusing fetch operation, spinerId: ${spinnerId}`
        );
    }
  }

  _setStoresListSpinner(spinnerText) {
    if (
      !this._getFetchOperationsAmountForSpinner(View.ID.SPINNER.STORES_LIST)
    ) {
      const storesListHeader = this.view.getStoresListHeader();
      const storesListSection = this.view.getStoresListSection();

      const spinnerOptions = {
        spinnerId: View.ID.SPINNER.STORES_LIST,
        targetText: spinnerText,
        targetWidth: `${storesListSection.offsetWidth}px`,
        targetMinWidth: 0,
        targetHeight: `${window.innerHeight - storesListHeader.offsetHeight}px`,
        targetBgColor: "white",
      };

      storesListSection.insertAdjacentHTML(
        "afterbegin",
        this.view.getSpinnerStructure(spinnerOptions)
      );
    } else {
      const currSpinner = document.querySelector(
        `#${View.ID.SPINNER.STORES_LIST}`
      );
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.STORES_LIST);
  }

  _requestSpinnerRemovingById(spinnerId) {
    this._minusFetchOperationForSpinner(spinnerId);

    const spinnerToRemove = this.view.getSpinnerById(spinnerId);

    if (
      spinnerToRemove &&
      !this._getFetchOperationsAmountForSpinner(spinnerId)
    ) {
      if (spinnerId === View.ID.SPINNER.PRODUCTS_LIST) {
        this._describeProductsListSpinnerResizeListeners();
      }

      spinnerToRemove.remove();
    }
  }
}
