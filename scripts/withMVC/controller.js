"use strict";

import Model from "./model.js";
import View from "./view.js";

/** Controller class. Orchestrates the model and view objects. A "glue" between them. */
class Controller {
  /**
   * Static object for storing keys of localStorage
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @private
   */
  static _LOCAL_STORAGE_ID = {
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

  /**
   * Static constant with key of bookmark query
   * @constant
   * @type {string}
   * @static
   * @private
   * @example const storeId = queryParams.get(Controller._BOOKMARK_QUERY_STORE_ID);
   */
  static _BOOKMARK_QUERY_STORE_ID = "store-id";

  /**
   * Controller constructor which gets view and model, also binds functions for "products list spinner" listeners
   * @param {View} view view instance
   * @param {Model} model model instance
   * @public
   */
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this._resizeHeightAndMoveProductsListSpinnerBound =
      this._resizeHeightAndMoveProductsListSpinner.bind(this);
    this._resizeWidthForProductsListSpinnerBound =
      this._resizeWidthForProductsListSpinner.bind(this);
  }

  /**
   * Initializes controller
   * @public
   */
  init() {
    this._initLocalStorageData();

    this._setSearchStoresListeners();
    this._setStoresCardsClickListener();

    this._setProductsFiltersBtnsListener();
    this._renderProductsTableHead();
    this._setTableRowsBtnsListener();

    this._setFootersBtnsListeners();
    this._setModalsConfirmBtnsListeners();
    this._setModalsCancelBtnsListeners();

    this._loadStoreIdFromBookmark();

    this._setStoresListSpinner(View.SPINNER_TEXT.STORES_LIST.LOADING);

    this.model
      .getSearchedStoresList(this.view.getStoresSearchInput().value)
      .then((storesList) => {
        if (Array.isArray(storesList)) {
          this.view.updateStoresList(
            storesList,
            localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
          );
        }
      })
      .catch((error) => {
        this.view.showPopupWithMsg(error.message, View.POPUP_COLOR.ERROR, 8000);
      })
      .finally(() => {
        this._requestSpinnerRemovingById(View.ID.SPINNER.STORES_LIST);
      });
  }

  /**
   * Updates details of current store
   * @private
   */
  _updateAllStoreDetails() {
    this._setProductsTableHeadToDefault();

    this.view.highlightActiveStoreCard(
      localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
    );

    this.view.updateStoreDetailsLayout(
      localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
    );

    this._updateStoreDescription();

    this._setProductsAmountsSpinner(View.SPINNER_TEXT.PRODUCTS_AMOUNTS.LOADING);
    this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

    this.model
      .getSearchedProductsListByStoreId(
        localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
        this.view.getProductsSearchInput().value
      )
      .then((searchedProductsList) => {
        if (Array.isArray(searchedProductsList)) {
          this.view.updateProductsAmounts(
            searchedProductsList,
            localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
          );

          this.view.updateProductsTableBody(searchedProductsList);
        }
      })
      .catch((error) => {
        this.view.showPopupWithMsg(error.message, View.POPUP_COLOR.ERROR, 8000);
        if (
          localStorage.getItem(Controller._LOCAL_STORAGE_ID.BOOKMARK_DETECTED)
        ) {
          const storeDetailsWrapper = this.view.getStoreDetailsWrapper();
          const storeNotFoundWrapper = this.view.getStoreNotFoundWrapper();
          storeDetailsWrapper.classList.remove(View.JS_CLASS.ELEMENT.FLEX);
          storeNotFoundWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
        }
      })
      .finally(() => {
        this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_AMOUNTS);
        this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
      });
  }

  /**
   * Sets products table head to default state
   * @private
   */
  _setProductsTableHeadToDefault() {
    this.view.setCurrProductsFilterBtn(
      localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_FILTER),
      Model.FILTER_ID.ALL
    );
    localStorage.setItem(
      Controller._LOCAL_STORAGE_ID.CURR_FILTER,
      Model.FILTER_ID.ALL
    );

    this._clearTableSortFiltersFromLocalStorage();

    this.view.setAllSortBtnsToDefault(Model.SORT_ORDER.DEFAULT);

    this.view.setProductSearchLineToDefault();
  }

  /**
   * Updates current store description
   * @private
   */
  _updateStoreDescription() {
    this._setStoreDescriptionSpinner(View.SPINNER_TEXT.STORE_DETAILS.LOADING);

    this.model
      .getStoreById(
        localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
      )
      .then((store) => {
        if (store) {
          this.view.updateStoreDescriptionFields(store);
        }
      })
      .catch((error) => {
        this.view.showPopupWithMsg(error.message, View.POPUP_COLOR.ERROR, 8000);
      })
      .finally(() => {
        this._requestSpinnerRemovingById(View.ID.SPINNER.STORE_DETAILS);
      });
  }

  /**
   * Renders products table head (based on existing array of columns in object of constans)
   * @private
   */
  _renderProductsTableHead() {
    const productsTableHead = this.view.getProductsTableHead();

    productsTableHead.innerHTML = this.view.getStructureForTableHead(
      Model.SORT_ORDER.DEFAULT
    );

    this._setTableSortBtnsListener();

    this._setSearchProductsListeners();
  }

  /**
   * Loads product data to editing form (via request to server)
   * @private
   */
  _loadProductDataToEditForm() {
    this._setEditProductFormSpinner(
      View.SPINNER_TEXT.EDIT_PRODUCT_FORM.LOADING
    );

    this.model
      .getProductById(
        localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_PRODUCT)
      )
      .then((product) => {
        if (product) {
          this.view.updateEditProductFormFields(product);
        }
      })
      .catch((error) => {
        this.view.showPopupWithMsg(error.message, View.POPUP_COLOR.ERROR, 8000);
      })
      .finally(() => {
        this._requestSpinnerRemovingById(View.ID.SPINNER.EDIT_PRODUCT_FORM);
      });
  }

  /**
   * Sets table sorting filters to local storage via given parameters
   * @param {string} sortKey string containing current sorting key
   * @param {string} sortOrder string containing current sorting order
   * @private
   */
  _setTableSortFiltersToLocalStorage(sortKey, sortOrder) {
    localStorage.setItem(Controller._LOCAL_STORAGE_ID.CURR_SORT_KEY, sortKey);
    localStorage.setItem(
      Controller._LOCAL_STORAGE_ID.CURR_SORT_ORDER,
      sortOrder
    );
  }

  /**
   * Clears table sorting filters from local storage
   * @private
   */
  _clearTableSortFiltersFromLocalStorage() {
    localStorage.removeItem(Controller._LOCAL_STORAGE_ID.CURR_SORT_KEY);
    localStorage.removeItem(Controller._LOCAL_STORAGE_ID.CURR_SORT_ORDER);
  }

  /**
   * Initializes local storage with default states for all keys
   * @private
   */
  _initLocalStorageData() {
    localStorage.removeItem(Controller._LOCAL_STORAGE_ID.CURR_STORE);
    localStorage.removeItem(Controller._LOCAL_STORAGE_ID.BOOKMARK_DETECTED);
    localStorage.removeItem(Controller._LOCAL_STORAGE_ID.CURR_PRODUCT);
    localStorage.removeItem(Controller._LOCAL_STORAGE_ID.CURR_FILTER);
    this._clearTableSortFiltersFromLocalStorage();
    localStorage.setItem(
      Controller._LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      Controller._LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      Controller._LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      Controller._LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      Controller._LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES,
      "0"
    );
  }

  /**
   * Sets listeners for search store input and search store button
   * @private
   */
  _setSearchStoresListeners() {
    const searchInput = this.view.getStoresSearchInput();
    const searchBtn = this.view.getStoresSearchBtn();

    searchInput.addEventListener(
      "search",
      this._onSearchStoresClick.bind(this)
    );
    searchBtn.addEventListener("click", this._onSearchStoresClick.bind(this));
  }

  /**
   * Handles click on search store input or search store button
   * @private
   */
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
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
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

  /**
   * Sets listener for stores list wrapper (to notice clicks on stores cards)
   * @private
   */
  _setStoresCardsClickListener() {
    const storesLayout = this.view.getStoresLayout();

    storesLayout.addEventListener("click", this._onStoreCardClick.bind(this));
  }

  /**
   * Handles click on stores card
   * @param {Event} e the DOM event object
   * @private
   */
  _onStoreCardClick(e) {
    const currItemCard = this.view.getClosestStoresListItem(e.target);

    if (
      currItemCard &&
      View.DATA_ATTRIBUTE.STORE_ID.CAMEL in currItemCard.dataset
    ) {
      localStorage.setItem(
        Controller._LOCAL_STORAGE_ID.CURR_STORE,
        currItemCard.dataset[View.DATA_ATTRIBUTE.STORE_ID.CAMEL]
      );

      if (
        localStorage.getItem(Controller._LOCAL_STORAGE_ID.BOOKMARK_DETECTED)
      ) {
        this._updateBookmarkInsideURL();
      }

      this._updateAllStoreDetails();
    }
  }

  /**
   * Sets listener for filters wrapper (to notice clicks on filter buttons)
   * @private
   */
  _setProductsFiltersBtnsListener() {
    const filtersWrapper = this.view.getFilterWrapper();

    filtersWrapper.addEventListener(
      "click",
      this._onProductsFilterBtnClick.bind(this)
    );
  }

  /**
   * Handles click on filter button
   * @param {Event} e the DOM event object
   * @private
   */
  _onProductsFilterBtnClick(e) {
    const newFilterBtn = this.view.getClosestFilterBtn(e.target);

    if (
      newFilterBtn &&
      newFilterBtn.id !==
        localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_FILTER)
    ) {
      this.view.setCurrProductsFilterBtn(
        localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_FILTER),
        newFilterBtn.id
      );
      localStorage.setItem(
        Controller._LOCAL_STORAGE_ID.CURR_FILTER,
        newFilterBtn.id
      );

      this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

      const filterOptions = {
        filterId: localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.CURR_FILTER
        ),
        sortKey: localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.CURR_SORT_KEY
        ),
        sortOrder: localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.SORT_ORDER
        ),
        searchFilterValue: this.view.getProductsSearchInput().value,
      };

      this.model
        .getFullFilteredProductsListByStoreId(
          localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
          filterOptions
        )
        .then((fullFilteredProductsList) => {
          if (Array.isArray(fullFilteredProductsList)) {
            this.view.updateProductsTableBody(fullFilteredProductsList);
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
          this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
        });
    }
  }

  /**
   * Sets listener for table titles wrapper (to notice clicks on sorting buttons)
   * @private
   */
  _setTableSortBtnsListener() {
    const productTableHeadTitles = this.view.getProductsTableHeadTitles();

    productTableHeadTitles.addEventListener(
      "click",
      this._onTableSortBtnClick.bind(this)
    );
  }

  /**
   * Handles click on sorting button
   * @param {Event} e the DOM event object
   * @private
   */
  _onTableSortBtnClick(e) {
    if (e.target.classList.contains(View.CLASS.BTN.SORT)) {
      const currSortBtn = e.target;
      const sortKey = currSortBtn.dataset[View.DATA_ATTRIBUTE.SORT_KEY.CAMEL];

      const filterOptions = {
        filterId: localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.CURR_FILTER
        ),
        sortKey: sortKey,
        sortOrder: null,
        searchFilterValue: this.view.getProductsSearchInput().value,
      };

      switch (currSortBtn.dataset[View.DATA_ATTRIBUTE.SORT_STATE.CAMEL]) {
        case Model.SORT_ORDER.DEFAULT:
          this.view.setAllSortBtnsToDefault(Model.SORT_ORDER.DEFAULT);

          currSortBtn.dataset[View.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
            Model.SORT_ORDER.ASC;
          currSortBtn.classList.add(View.JS_CLASS.SORT_BTN.ASC);

          this._setTableSortFiltersToLocalStorage(
            sortKey,
            Model.SORT_ORDER.ASC
          );

          filterOptions.sortOrder = Model.SORT_ORDER.ASC;

          this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

          this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
              filterOptions
            )
            .then((fullFilteredProductsList) => {
              if (Array.isArray(fullFilteredProductsList)) {
                this.view.updateProductsTableBody(fullFilteredProductsList);
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
              this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
            });

          break;
        case Model.SORT_ORDER.ASC:
          currSortBtn.dataset[View.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
            Model.SORT_ORDER.DESC;
          currSortBtn.classList.remove(View.JS_CLASS.SORT_BTN.ASC);
          currSortBtn.classList.add(View.JS_CLASS.SORT_BTN.DESC);

          this._setTableSortFiltersToLocalStorage(
            sortKey,
            Model.SORT_ORDER.DESC
          );

          filterOptions.sortOrder = Model.SORT_ORDER.DESC;

          this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

          this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
              filterOptions
            )
            .then((fullFilteredProductsList) => {
              if (Array.isArray(fullFilteredProductsList)) {
                this.view.updateProductsTableBody(fullFilteredProductsList);
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
              this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
            });

          break;
        case Model.SORT_ORDER.DESC:
          currSortBtn.dataset[View.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
            Model.SORT_ORDER.DEFAULT;
          currSortBtn.classList.remove(View.JS_CLASS.SORT_BTN.DESC);

          this._clearTableSortFiltersFromLocalStorage();

          this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

          this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
              filterOptions
            )
            .then((fullFilteredProductsList) => {
              if (Array.isArray(fullFilteredProductsList)) {
                this.view.updateProductsTableBody(fullFilteredProductsList);
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
              this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
            });

          break;
        default:
          console.warn(
            `One of sort buttons had unknown data-${
              View.DATA_ATTRIBUTE.SORT_STATE.KEBAB
            } type: ${e.target.dataset[View.DATA_ATTRIBUTE.SORT_STATE.CAMEL]}`
          );
      }
    }
  }

  /**
   * Sets listeners for search product input and search product button
   * @private
   */
  _setSearchProductsListeners() {
    const searchInput = this.view.getProductsSearchInput();
    const searchBtn = this.view.getProductsSearchBtn();

    searchInput.addEventListener(
      "search",
      this._onSearchProductsClick.bind(this)
    );
    searchBtn.addEventListener("click", this._onSearchProductsClick.bind(this));
  }

  /**
   * Handles click on search product input or search product button
   * @private
   */
  _onSearchProductsClick() {
    const searchWrapper = this.view.getProductsSearchWrapper();
    const searchInput = this.view.getProductsSearchInput();

    if (this.model.validateSearch(searchInput)) {
      this.view.removeErrorFromInput(
        searchInput,
        View.JS_CLASS.ERROR_SEARCH_FIELD,
        searchWrapper
      );

      const searchedProductsPromise = this.model
        .getSearchedProductsListByStoreId(
          localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
          searchInput.value
        )
        .then((searchedProductsList) => {
          if (Array.isArray(searchedProductsList)) {
            this.view.updateProductsAmounts(
              searchedProductsList,
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
            );
          }
        });

      const filterOptions = {
        filterId: localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.CURR_FILTER
        ),
        sortKey: localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.CURR_SORT_KEY
        ),
        sortOrder: localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.SORT_ORDER
        ),
        searchFilterValue: this.view.getProductsSearchInput().value,
      };

      const fullFilteredProductsPromise = this.model
        .getFullFilteredProductsListByStoreId(
          localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
          filterOptions
        )
        .then((fullFilteredProductsList) => {
          if (Array.isArray(fullFilteredProductsList)) {
            this.view.updateProductsTableBody(fullFilteredProductsList);
          }
        });

      this._setProductsAmountsSpinner(
        View.SPINNER_TEXT.PRODUCTS_AMOUNTS.LOADING
      );
      this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

      Promise.all([searchedProductsPromise, fullFilteredProductsPromise])
        .catch((error) => {
          this.view.showPopupWithMsg(
            error.message,
            View.POPUP_COLOR.ERROR,
            8000
          );
        })
        .finally(() => {
          this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_AMOUNTS);
          this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
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

  /**
   * Sets listener for products table (to notice clicks on "edit product button" or "delete product button")
   * @private
   */
  _setTableRowsBtnsListener() {
    const tableBody = this.view.getProductsTableBody();

    tableBody.addEventListener("click", this._onTableRowsBtnClick.bind(this));
  }

  /**
   * Handles click on "edit product button" or "delete product button"
   * @param {Event} e the DOM event object
   * @private
   */
  _onTableRowsBtnClick(e) {
    if (e.target.classList.contains(View.CLASS.BTN.EDIT)) {
      const modalWrapper = this.view.getModalEditProductWrapper();

      localStorage.setItem(
        Controller._LOCAL_STORAGE_ID.CURR_PRODUCT,
        e.target.dataset[View.DATA_ATTRIBUTE.PRODUCT_ID.CAMEL]
      );

      modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);

      this._loadProductDataToEditForm();
    } else if (e.target.classList.contains(View.CLASS.BTN.CROSS)) {
      const modalWrapper = this.view.getModalDeleteProductWrapper();

      localStorage.setItem(
        Controller._LOCAL_STORAGE_ID.CURR_PRODUCT,
        e.target.dataset[View.DATA_ATTRIBUTE.PRODUCT_ID.CAMEL]
      );

      modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
    }
  }

  /**
   * Sets listeners for footer buttons ("Create store", "Delete store", "Create product")
   * @private
   */
  _setFootersBtnsListeners() {
    const btnCreateStore = this.view.getBtnCreateStore();
    const btnDeleteStore = this.view.getBtnDeleteStore();
    const btnCreateProduct = this.view.getBtnCreateProduct();

    btnCreateStore.addEventListener(
      "click",
      this._onCreateStoreClick.bind(this)
    );
    btnDeleteStore.addEventListener(
      "click",
      this._onDeleteStoreClick.bind(this)
    );
    btnCreateProduct.addEventListener(
      "click",
      this._onCreateProductClick.bind(this)
    );
  }

  /**
   * Handles click on "Create store" button
   * @private
   */
  _onCreateStoreClick() {
    const modalWrapper = this.view.getModalCreateStoreWrapper();

    modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
  }

  /**
   * Handles click on "Delete store" button
   * @private
   */
  _onDeleteStoreClick() {
    const modalWrapper = this.view.getModalDeleteStoreWrapper();

    modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
  }

  /**
   * Handles click on "Create product" button
   * @private
   */
  _onCreateProductClick() {
    const modalWrapper = this.view.getModalCreateProductWrapper();

    modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
  }

  /**
   * Sets listeners for modal confirm buttons (create store, delete store, create product, edit product, delete product)
   * @private
   */
  _setModalsConfirmBtnsListeners() {
    const btnConfirmCreateStore = this.view.getBtnConfirmCreateStore();
    const btnConfirmDeleteStore = this.view.getBtnConfirmDeleteStore();
    const btnConfirmCreateProduct = this.view.getBtnConfirmCreateProduct();
    const btnConfirmEditProduct = this.view.getBtnConfirmEditProduct();
    const btnConfirmDeleteProduct = this.view.getBtnConfirmDeleteProduct();

    btnConfirmCreateStore.addEventListener(
      "click",
      this._onConfirmCreateStoreClick.bind(this)
    );
    btnConfirmDeleteStore.addEventListener(
      "click",
      this._onConfirmDeleteStoreClick.bind(this)
    );
    btnConfirmCreateProduct.addEventListener(
      "click",
      this._onConfirmCreateProductClick.bind(this)
    );
    btnConfirmEditProduct.addEventListener(
      "click",
      this._onConfirmEditProductClick.bind(this)
    );
    btnConfirmDeleteProduct.addEventListener(
      "click",
      this._onConfirmDeleteProductClick.bind(this)
    );
  }

  /**
   * Handles click on confirm button of form "Create store"
   * @private
   */
  _onConfirmCreateStoreClick() {
    if (this._validateCreateStoreForm()) {
      const resultObj = this._getStoreObjFromFormInputs();

      this.view.closeCreateStoreModal();

      this._setStoresListSpinner(View.SPINNER_TEXT.STORES_LIST.CREATING);

      this.model
        .postStore(JSON.stringify(resultObj))
        .then(() => {
          this.view.showPopupWithMsg(
            "New store has been successfully created!",
            View.POPUP_COLOR.SUCCESS,
            5000
          );

          this._setStoresListSpinner(View.SPINNER_TEXT.STORES_LIST.UPDATING);

          this.model
            .getSearchedStoresList(this.view.getStoresSearchInput().value)
            .then((storesList) => {
              if (Array.isArray(storesList)) {
                this.view.updateStoresList(
                  storesList,
                  localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
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
      this.view.showErrorModal();
    }
  }

  /**
   * Handles click on confirm button of form "Delete store"
   * @private
   */
  _onConfirmDeleteStoreClick() {
    this.view.disableStoreDetailsFooterBtns();

    this.view.closeDeleteStoreModal();

    this._setStoresListSpinner(
      View.SPINNER_TEXT.STORES_LIST.DELETING_STORE_PRODUCTS
    );
    this._setProductsListSpinner(
      View.SPINNER_TEXT.PRODUCTS_LIST.DELETING_STORE_PRODUCTS
    );

    this.model
      .deleteStoreProducts(
        localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
      )
      .then(() => {
        this.view.showPopupWithMsg(
          "All products of store have been successfully deleted.",
          View.POPUP_COLOR.ATTENTION,
          5000
        );

        this._setStoresListSpinner(
          View.SPINNER_TEXT.STORES_LIST.DELETING_STORE
        );
        this._setProductsListSpinner(
          View.SPINNER_TEXT.PRODUCTS_LIST.DELETING_STORE
        );

        this.model
          .deleteStore(
            localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
          )
          .then(() => {
            this.view.showPopupWithMsg(
              "The store has been successfully deleted.",
              View.POPUP_COLOR.ATTENTION,
              5000
            );

            localStorage.removeItem(Controller._LOCAL_STORAGE_ID.CURR_STORE);
            if (
              localStorage.getItem(
                Controller._LOCAL_STORAGE_ID.BOOKMARK_DETECTED
              )
            ) {
              this._updateBookmarkInsideURL();
            }
            this.view.updateStoreDetailsLayout(
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
            );

            this._setStoresListSpinner(View.SPINNER_TEXT.STORES_LIST.UPDATING);

            this.model
              .getSearchedStoresList(this.view.getStoresSearchInput().value)
              .then((storesList) => {
                if (Array.isArray(storesList)) {
                  this.view.updateStoresList(
                    storesList,
                    localStorage.getItem(
                      Controller._LOCAL_STORAGE_ID.CURR_STORE
                    )
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
          })
          .catch((error) => {
            this.view.showPopupWithMsg(
              error.message,
              View.POPUP_COLOR.ERROR,
              8000
            );
          })
          .finally(() => {
            this.view.unlockStoreDetailsFooterBtns();

            this._requestSpinnerRemovingById(View.ID.SPINNER.STORES_LIST);
            this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
          });
      })
      .catch((error) => {
        this.view.unlockStoreDetailsFooterBtns();

        this.view.showPopupWithMsg(error.message, View.POPUP_COLOR.ERROR, 8000);
      })
      .finally(() => {
        this._requestSpinnerRemovingById(View.ID.SPINNER.STORES_LIST);
        this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
      });
  }

  /**
   * Handles click on confirm button of form "Create product"
   * @private
   */
  _onConfirmCreateProductClick() {
    if (this._validateProductForm(View.ID.MODALS.CREATE_PRODUCT)) {
      const resultObj = this._getProductObjFromFormInputs(
        View.ID.MODALS.CREATE_PRODUCT
      );

      this.view.closeCreateProductModal();

      this._setProductsAmountsSpinner(
        View.SPINNER_TEXT.PRODUCTS_AMOUNTS.CREATING
      );
      this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.CREATING);

      this.model
        .postProduct(
          localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
          JSON.stringify(resultObj)
        )
        .then(() => {
          this.view.showPopupWithMsg(
            "New product has been successfully created!",
            View.POPUP_COLOR.SUCCESS,
            5000
          );

          const searchedProductsPromise = this.model
            .getSearchedProductsListByStoreId(
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
              this.view.getProductsSearchInput().value
            )
            .then((searchedProductsList) => {
              if (Array.isArray(searchedProductsList)) {
                this.view.updateProductsAmounts(
                  searchedProductsList,
                  localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
                );
              }
            });

          const filterOptions = {
            filterId: localStorage.getItem(
              Controller._LOCAL_STORAGE_ID.CURR_FILTER
            ),
            sortKey: localStorage.getItem(
              Controller._LOCAL_STORAGE_ID.CURR_SORT_KEY
            ),
            sortOrder: localStorage.getItem(
              Controller._LOCAL_STORAGE_ID.SORT_ORDER
            ),
            searchFilterValue: this.view.getProductsSearchInput().value,
          };

          const fullFilteredProductsPromise = this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
              filterOptions
            )
            .then((fullFilteredProductsList) => {
              if (Array.isArray(fullFilteredProductsList)) {
                this.view.updateProductsTableBody(fullFilteredProductsList);
              }
            });

          this._setProductsAmountsSpinner(
            View.SPINNER_TEXT.PRODUCTS_AMOUNTS.UPDATING
          );
          this._setProductsListSpinner(
            View.SPINNER_TEXT.PRODUCTS_LIST.UPDATING
          );

          Promise.all([searchedProductsPromise, fullFilteredProductsPromise])
            .catch((error) => {
              this.view.showPopupWithMsg(
                error.message,
                View.POPUP_COLOR.ERROR,
                8000
              );
            })
            .finally(() => {
              this._requestSpinnerRemovingById(
                View.ID.SPINNER.PRODUCTS_AMOUNTS
              );
              this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
            });
        })
        .catch((error) => {
          this.view.showPopupWithMsg(
            error.message,
            View.POPUP_COLOR.ERROR,
            8000
          );
        })
        .finally(() => {
          this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_AMOUNTS);
          this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
        });
    } else {
      this.view.showErrorModal();
    }
  }

  /**
   * Handles click on confirm button of form "Edit product"
   * @private
   */
  _onConfirmEditProductClick() {
    if (this._validateProductForm(View.ID.MODALS.EDIT_PRODUCT)) {
      const resultObj = this._getProductObjFromFormInputs(
        View.ID.MODALS.EDIT_PRODUCT
      );

      resultObj[Model.PRODUCT_KEY.STORE_ID] = localStorage.getItem(
        Controller._LOCAL_STORAGE_ID.CURR_STORE
      );

      this._setProductsAmountsSpinner(
        View.SPINNER_TEXT.PRODUCTS_AMOUNTS.EDITING
      );
      this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.EDITING);

      this.model
        .editProduct(
          localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_PRODUCT),
          JSON.stringify(resultObj)
        )
        .then(() => {
          this.view.showPopupWithMsg(
            "The product has been successfully edited!",
            View.POPUP_COLOR.SUCCESS,
            5000
          );

          const searchedProductsPromise = this.model
            .getSearchedProductsListByStoreId(
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
              this.view.getProductsSearchInput().value
            )
            .then((searchedProductsList) => {
              if (Array.isArray(searchedProductsList)) {
                this.view.updateProductsAmounts(
                  searchedProductsList,
                  localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
                );
              }
            });

          const filterOptions = {
            filterId: localStorage.getItem(
              Controller._LOCAL_STORAGE_ID.CURR_FILTER
            ),
            sortKey: localStorage.getItem(
              Controller._LOCAL_STORAGE_ID.CURR_SORT_KEY
            ),
            sortOrder: localStorage.getItem(
              Controller._LOCAL_STORAGE_ID.SORT_ORDER
            ),
            searchFilterValue: this.view.getProductsSearchInput().value,
          };

          const fullFilteredProductsPromise = this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
              filterOptions
            )
            .then((fullFilteredProductsList) => {
              if (Array.isArray(fullFilteredProductsList)) {
                this.view.updateProductsTableBody(fullFilteredProductsList);
              }
            });

          this._setProductsAmountsSpinner(
            View.SPINNER_TEXT.PRODUCTS_AMOUNTS.UPDATING
          );
          this._setProductsListSpinner(
            View.SPINNER_TEXT.PRODUCTS_LIST.UPDATING
          );

          Promise.all([searchedProductsPromise, fullFilteredProductsPromise])
            .catch((error) => {
              this.view.showPopupWithMsg(
                error.message,
                View.POPUP_COLOR.ERROR,
                8000
              );
            })
            .finally(() => {
              this._requestSpinnerRemovingById(
                View.ID.SPINNER.PRODUCTS_AMOUNTS
              );
              this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
            });
        })
        .catch((error) => {
          this.view.showPopupWithMsg(
            error.message,
            View.POPUP_COLOR.ERROR,
            8000
          );
        })
        .finally(() => {
          this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_AMOUNTS);
          this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
        });

      this._onCancelEditProductBtnClick();
    } else {
      this.view.showErrorModal();
    }
  }

  /**
   * Handles click on confirm button of form "Delete product"
   * @private
   */
  _onConfirmDeleteProductClick() {
    this._setProductsAmountsSpinner(
      View.SPINNER_TEXT.PRODUCTS_AMOUNTS.DELETING
    );
    this._setProductsListSpinner(
      View.SPINNER_TEXT.PRODUCTS_LIST.DELETING_PRODUCT
    );

    this.model
      .deleteProduct(
        localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_PRODUCT)
      )
      .then(() => {
        this.view.showPopupWithMsg(
          "The product has been successfully deleted.",
          View.POPUP_COLOR.ATTENTION,
          5000
        );

        const searchedProductsPromise = this.model
          .getSearchedProductsListByStoreId(
            localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
            this.view.getProductsSearchInput().value
          )
          .then((searchedProductsList) => {
            if (Array.isArray(searchedProductsList)) {
              this.view.updateProductsAmounts(
                searchedProductsList,
                localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE)
              );
            }
          });

        const filterOptions = {
          filterId: localStorage.getItem(
            Controller._LOCAL_STORAGE_ID.CURR_FILTER
          ),
          sortKey: localStorage.getItem(
            Controller._LOCAL_STORAGE_ID.CURR_SORT_KEY
          ),
          sortOrder: localStorage.getItem(
            Controller._LOCAL_STORAGE_ID.SORT_ORDER
          ),
          searchFilterValue: this.view.getProductsSearchInput().value,
        };

        const fullFilteredProductsPromise = this.model
          .getFullFilteredProductsListByStoreId(
            localStorage.getItem(Controller._LOCAL_STORAGE_ID.CURR_STORE),
            filterOptions
          )
          .then((fullFilteredProductsList) => {
            if (Array.isArray(fullFilteredProductsList)) {
              this.view.updateProductsTableBody(fullFilteredProductsList);
            }
          });

        this._setProductsAmountsSpinner(
          View.SPINNER_TEXT.PRODUCTS_AMOUNTS.UPDATING
        );
        this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.UPDATING);

        Promise.all([searchedProductsPromise, fullFilteredProductsPromise])
          .catch((error) => {
            this.view.showPopupWithMsg(
              error.message,
              View.POPUP_COLOR.ERROR,
              8000
            );
          })
          .finally(() => {
            this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_AMOUNTS);
            this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
          });
      })
      .catch((error) => {
        this.view.showPopupWithMsg(error.message, View.POPUP_COLOR.ERROR, 8000);
      })
      .finally(() => {
        this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_AMOUNTS);
        this._requestSpinnerRemovingById(View.ID.SPINNER.PRODUCTS_LIST);
      });

    this._onCancelDeleteProductBtnClick();
  }

  /**
   * Sets listeners for modal cancel buttons (create store, delete store, create product, edit product, delete product, error)
   * @private
   */
  _setModalsCancelBtnsListeners() {
    const btnCancelCreateStore = this.view.getBtnCancelCreateStore();
    const btnCancelDeleteStore = this.view.getBtnCancelDeleteStore();
    const btnCancelCreateProduct = this.view.getBtnCancelCreateProduct();
    const btnCancelEditProduct = this.view.getBtnCancelEditProduct();
    const btnCancelDeleteProduct = this.view.getBtnCancelDeleteProduct();
    const btnOkModalError = this.view.getBtnOkModalError();

    btnCancelCreateStore.addEventListener(
      "click",
      this.view.closeCreateStoreModal.bind(this.view)
    );
    btnCancelDeleteStore.addEventListener(
      "click",
      this.view.closeDeleteStoreModal.bind(this.view)
    );
    btnCancelCreateProduct.addEventListener(
      "click",
      this.view.closeCreateProductModal.bind(this.view)
    );
    btnCancelEditProduct.addEventListener(
      "click",
      this._onCancelEditProductBtnClick.bind(this)
    );
    btnCancelDeleteProduct.addEventListener(
      "click",
      this._onCancelDeleteProductBtnClick.bind(this)
    );
    btnOkModalError.addEventListener(
      "click",
      this.view.closeErrorModal.bind(this.view)
    );
  }

  /**
   * Handles click on cancel button of form "Edit product" (calling view method + clearing localStorage)
   * @private
   */
  _onCancelEditProductBtnClick() {
    this.view.closeEditProductModal();

    localStorage.removeItem(Controller._LOCAL_STORAGE_ID.CURR_PRODUCT);
  }

  /**
   * Handles click on cancel button of form "Delete product" (calling view method + clearing localStorage)
   * @private
   */
  _onCancelDeleteProductBtnClick() {
    this.view.closeDeleteProductModal();

    localStorage.removeItem(Controller._LOCAL_STORAGE_ID.CURR_PRODUCT);
  }

  /**
   * Sets two listeners for resizing "products list spinner" while scrolling or resizing the page
   * @private
   */
  _setProductsListSpinnerResizeListeners() {
    const storeDetailsWrapper = this.view.getStoreDetailsWrapper();

    storeDetailsWrapper.addEventListener(
      "scroll",
      this._resizeHeightAndMoveProductsListSpinnerBound
    );
    window.addEventListener(
      "resize",
      this._resizeWidthForProductsListSpinnerBound
    );
  }

  /**
   * Describes two listeners for resizing "products list spinner" while scrolling or resizing the page
   * @private
   */
  _describeProductsListSpinnerResizeListeners() {
    const storeDetailsWrapper = this.view.getStoreDetailsWrapper();

    storeDetailsWrapper.removeEventListener(
      "scroll",
      this._resizeHeightAndMoveProductsListSpinnerBound
    );
    window.removeEventListener(
      "resize",
      this._resizeWidthForProductsListSpinnerBound
    );
  }

  /**
   * Calculates offset from top for "products list spinner" (heights of header, table head and table wrapper top padding)
   * @returns {Object.<string, number>} Object with offset values
   * @private
   */
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

  /**
   * Resizes height of "products list spinner" and moves it along the Y axis depending on wrapper scrolling
   * @private
   */
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

  /**
   * Resizes width of "products list spinner" depending on window resizing
   * @private
   */
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

  /**
   * Gets current amount of fetch operations for spinner with given identifier
   * @param {string} spinnerId identifier of the spinner
   * @returns {number} amount of fetch operations for spinner
   * @private
   */
  _getFetchOperationsAmountForSpinner(spinnerId) {
    switch (spinnerId) {
      case View.ID.SPINNER.STORES_LIST:
        const storesListFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES
        );
        return storesListFetches;
      case View.ID.SPINNER.STORE_DETAILS:
        const detailsFethes = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES
        );
        return detailsFethes;
      case View.ID.SPINNER.PRODUCTS_AMOUNTS:
        const filtersFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES
        );
        return filtersFetches;
      case View.ID.SPINNER.PRODUCTS_LIST:
        const productsListFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES
        );
        return productsListFetches;
      case View.ID.SPINNER.EDIT_PRODUCT_FORM:
        const editProductFormFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES
        );
        return editProductFormFetches;
      default:
        console.warn(
          `Got unknown type of spinner while getting fetches amount, spinerId: ${spinnerId}`
        );
    }
  }

  /**
   * Increases current amount of fetch operations by one for spinner with given identifier
   * @param {string} spinnerId identifier of the spinner
   * @private
   */
  _plusFetchOperationForSpinner(spinnerId) {
    switch (spinnerId) {
      case View.ID.SPINNER.STORES_LIST:
        let storesListFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES
        );
        storesListFetches++;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
          storesListFetches
        );
        break;
      case View.ID.SPINNER.STORE_DETAILS:
        let detailsFethes = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES
        );
        detailsFethes++;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES,
          detailsFethes
        );
        break;
      case View.ID.SPINNER.PRODUCTS_AMOUNTS:
        let filtersFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES
        );
        filtersFetches++;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES,
          filtersFetches
        );
        break;
      case View.ID.SPINNER.PRODUCTS_LIST:
        let productsListFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES
        );
        productsListFetches++;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
          productsListFetches
        );
        break;
      case View.ID.SPINNER.EDIT_PRODUCT_FORM:
        let editProductFormFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES
        );
        editProductFormFetches++;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES,
          editProductFormFetches
        );
        break;
      default:
        console.warn(
          `Got unknown type of spinner while plusing fetch operation, spinerId: ${spinnerId}`
        );
    }
  }

  /**
   * Decreases current amount of fetch operations by one for spinner with given identifier
   * @param {string} spinnerId identifier of the spinner
   * @private
   */
  _minusFetchOperationForSpinner(spinnerId) {
    switch (spinnerId) {
      case View.ID.SPINNER.STORES_LIST:
        let storesListFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES
        );
        storesListFetches--;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
          storesListFetches
        );
        break;
      case View.ID.SPINNER.STORE_DETAILS:
        let detailsFethes = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES
        );
        detailsFethes--;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES,
          detailsFethes
        );
        break;
      case View.ID.SPINNER.PRODUCTS_AMOUNTS:
        let filtersFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES
        );
        filtersFetches--;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES,
          filtersFetches
        );
        break;
      case View.ID.SPINNER.PRODUCTS_LIST:
        let productsListFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES
        );
        productsListFetches--;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
          productsListFetches
        );
        break;
      case View.ID.SPINNER.EDIT_PRODUCT_FORM:
        let editProductFormFetches = +localStorage.getItem(
          Controller._LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES
        );
        editProductFormFetches--;
        localStorage.setItem(
          Controller._LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES,
          editProductFormFetches
        );
        break;
      default:
        console.warn(
          `Got unknown type of spinner while minusing fetch operation, spinerId: ${spinnerId}`
        );
    }
  }

  /**
   * Creates spinner for section with stores list (if it doesn't exist yet) or changes its text (if it already exists)
   * @param {string} spinnerText the text to be shown inside spinner
   * @private
   */
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
      const currSpinner = this.view.getSpinnerById(View.ID.SPINNER.STORES_LIST);
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.STORES_LIST);
  }

  /**
   * Creates spinner for section with store description (if it doesn't exist yet) or changes its text (if it already exists)
   * @param {string} spinnerText the text to be shown inside spinner
   * @private
   */
  _setStoreDescriptionSpinner(spinnerText) {
    if (
      !this._getFetchOperationsAmountForSpinner(View.ID.SPINNER.STORE_DETAILS)
    ) {
      const storesDetailsDescriptionWrapper =
        this.view.getStoreDetailsDescriptionWrapper();
      const targetWidthPercent =
        (storesDetailsDescriptionWrapper.offsetWidth /
          document.body.offsetWidth) *
        100;

      const spinnerOptions = {
        spinnerId: View.ID.SPINNER.STORE_DETAILS,
        targetText: spinnerText,
        targetWidth: `${targetWidthPercent}%`,
        targetMinWidth: "450px",
        targetHeight: `${storesDetailsDescriptionWrapper.offsetHeight}px`,
        targetBgColor: "#eff4f8",
      };

      storesDetailsDescriptionWrapper.insertAdjacentHTML(
        "afterbegin",
        this.view.getSpinnerStructure(spinnerOptions)
      );
    } else {
      const currSpinner = this.view.getSpinnerById(
        View.ID.SPINNER.STORE_DETAILS
      );
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.STORE_DETAILS);
  }

  /**
   * Creates spinner for section with products amounts (if it doesn't exist yet) or changes its text (if it already exists)
   * @param {string} spinnerText the text to be shown inside spinner
   * @private
   */
  _setProductsAmountsSpinner(spinnerText) {
    if (
      !this._getFetchOperationsAmountForSpinner(
        View.ID.SPINNER.PRODUCTS_AMOUNTS
      )
    ) {
      const filtersWrapper = this.view.getFilterWrapper();
      const filtersWrapperComputedStyle = getComputedStyle(filtersWrapper);
      const targetWidth =
        filtersWrapper.offsetWidth -
        parseFloat(filtersWrapperComputedStyle.paddingLeft) -
        parseFloat(filtersWrapperComputedStyle.paddingRight);
      const targetWidthPercent =
        (targetWidth / document.body.offsetWidth) * 100;

      const spinnerOptions = {
        spinnerId: View.ID.SPINNER.PRODUCTS_AMOUNTS,
        targetText: spinnerText,
        targetWidth: `${targetWidthPercent}%`,
        targetMinWidth: "400px",
        targetHeight: `${filtersWrapper.offsetHeight}px`,
        targetBgColor: "#eff4f8",
      };

      filtersWrapper.insertAdjacentHTML(
        "afterbegin",
        this.view.getSpinnerStructure(spinnerOptions)
      );
    } else {
      const currSpinner = this.view.getSpinnerById(
        View.ID.SPINNER.PRODUCTS_AMOUNTS
      );
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.PRODUCTS_AMOUNTS);
  }

  /**
   * Creates spinner for edit product form (if it doesn't exist yet) or changes its text (if it already exists)
   * @param {string} spinnerText the text to be shown inside spinner
   * @private
   */
  _setEditProductFormSpinner(spinnerText) {
    if (
      !this._getFetchOperationsAmountForSpinner(
        View.ID.SPINNER.EDIT_PRODUCT_FORM
      )
    ) {
      const editProductForm = this.view.getModalEditProductForm();

      const spinnerOptions = {
        spinnerId: View.ID.SPINNER.EDIT_PRODUCT_FORM,
        targetText: spinnerText,
        targetWidth: `${editProductForm.offsetWidth}px`,
        targetMinWidth: 0,
        targetHeight: `${editProductForm.offsetHeight}px`,
        targetBgColor: "white",
      };

      editProductForm.insertAdjacentHTML(
        "afterbegin",
        this.view.getSpinnerStructure(spinnerOptions)
      );
    } else {
      const currSpinner = this.view.getSpinnerById(
        View.ID.SPINNER.EDIT_PRODUCT_FORM
      );
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.EDIT_PRODUCT_FORM);
  }

  /**
   * Creates spinner for section with products list inside the table (if it doesn't exist yet) or changes its text (if it already exists)
   * @param {string} spinnerText the text to be shown inside spinner
   * @private
   */
  _setProductsListSpinner(spinnerText) {
    if (
      !this._getFetchOperationsAmountForSpinner(View.ID.SPINNER.PRODUCTS_LIST)
    ) {
      const table = this.view.getProductsTable();
      const topOffsetObj = this._getTopOffsetForProductsListSpinner();
      const targetHeight = window.innerHeight - topOffsetObj.wholeOffset;

      const spinnerOptions = {
        spinnerId: View.ID.SPINNER.PRODUCTS_LIST,
        targetText: spinnerText,
        targetWidth: `${table.offsetWidth}px`,
        targetMinWidth: 0,
        targetHeight: `${targetHeight}px`,
        targetBgColor: "white",
      };

      table.insertAdjacentHTML(
        "afterbegin",
        this.view.getSpinnerStructure(spinnerOptions)
      );

      this._resizeWidthForProductsListSpinnerBound();
      this._resizeHeightAndMoveProductsListSpinnerBound();

      this._setProductsListSpinnerResizeListeners();
    } else {
      const currSpinner = this.view.getSpinnerById(
        View.ID.SPINNER.PRODUCTS_LIST
      );
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.PRODUCTS_LIST);
  }

  /**
   * Checks if there are no any fetch operations left for spinner with given identifier and remove it in this case
   * @param {string} spinnerId identifier of the spinner to be removed
   * @private
   */
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

  /**
   * Checks fields of create store form and highlights them in case of errors
   * @returns {boolean} are all the form fields valid or not
   * @private
   */
  _validateCreateStoreForm() {
    const validateObj = {
      name: {
        wrapper: this.view.getModalCreateStoreInputNameWrapper(),
        input: this.view.getModalCreateStoreInputName(),
      },
      email: {
        wrapper: this.view.getModalCreateStoreInputEmailWrapper(),
        input: this.view.getModalCreateStoreInputEmail(),
      },
      phone: {
        wrapper: this.view.getModalCreateStoreInputPhoneWrapper(),
        input: this.view.getModalCreateStoreInputPhone(),
      },
      floorArea: {
        wrapper: this.view.getModalCreateStoreInputFloorAreaWrapper(),
        input: this.view.getModalCreateStoreInputFloorArea(),
      },
    };

    validateObj.name.state = this.model.validateCreateStoreName(
      validateObj.name.input
    );
    validateObj.email.state = this.model.validateCreateStoreEmail(
      validateObj.email.input
    );
    validateObj.phone.state = this.model.validateCreateStorePhone(
      validateObj.phone.input
    );
    validateObj.floorArea.state = this.model.validateCreateStoreFloorArea(
      validateObj.floorArea.input
    );

    Object.values(validateObj).forEach(({ wrapper, input, state }) => {
      if (state === "OK") {
        this.view.removeErrorFromInput(
          input,
          View.JS_CLASS.ERROR_FIELD,
          wrapper
        );
      } else {
        this.view.addErrorToInput(
          input,
          View.JS_CLASS.ERROR_FIELD,
          wrapper,
          state
        );
      }
    });

    return Object.values(validateObj).every((item) => item.state === "OK");
  }

  /**
   * Checks fields of product form (create or edit) and highlights them in case of errors
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {boolean} are all the form fields valid or not
   * @private
   */
  _validateProductForm(modalIdsObj) {
    const validateObj = {
      name: {
        wrapper: this.view.getProductInputNameWrapperByModalIdsObj(modalIdsObj),
        input: this.view.getProductInputNameByModalIdsObj(modalIdsObj),
      },
      price: {
        wrapper:
          this.view.getProductInputPriceWrapperByModalIdsObj(modalIdsObj),
        input: this.view.getProductInputPriceByModalIdsObj(modalIdsObj),
      },
      specs: {
        wrapper:
          this.view.getProductInputSpecsWrapperByModalIdsObj(modalIdsObj),
        input: this.view.getProductInputSpecsByModalIdsObj(modalIdsObj),
      },
      rating: {
        wrapper:
          this.view.getProductInputRatingWrapperByModalIdsObj(modalIdsObj),
        input: this.view.getProductInputRatingByModalIdsObj(modalIdsObj),
      },
    };

    validateObj.name.state = this.model.validateProductName(
      validateObj.name.input
    );
    validateObj.price.state = this.model.validateProductPrice(
      validateObj.price.input
    );
    validateObj.specs.state = this.model.validateProductSpecs(
      validateObj.specs.input
    );
    validateObj.rating.state = this.model.validateProductRating(
      validateObj.rating.input
    );

    Object.values(validateObj).forEach(({ wrapper, input, state }) => {
      if (state === "OK") {
        this.view.removeErrorFromInput(
          input,
          View.JS_CLASS.ERROR_FIELD,
          wrapper
        );
      } else {
        this.view.addErrorToInput(
          input,
          View.JS_CLASS.ERROR_FIELD,
          wrapper,
          state
        );
      }
    });

    return Object.values(validateObj).every((item) => item.state === "OK");
  }

  /**
   * Gets the object that contains values of all fields of create store form
   * @returns {Object.<string, string>} the object that contains values of all fields of create store form
   * @private
   */
  _getStoreObjFromFormInputs() {
    const inputName = this.view.getModalCreateStoreInputName();
    const inputEmail = this.view.getModalCreateStoreInputEmail();
    const inputPhone = this.view.getModalCreateStoreInputPhone();
    const inputAddress = this.view.getModalCreateStoreInputAddress();
    const inputEstablishedDate = this.view.getModalCreateStoreInputEstDate();
    const inputFloorArea = this.view.getModalCreateStoreInputFloorArea();
    const resultObj = {};

    if (inputName.value) {
      resultObj[Model.STORE_KEY.NAME] = inputName.value;
    }
    if (inputEmail.value) {
      resultObj[Model.STORE_KEY.EMAIL] = inputEmail.value;
    }
    if (inputPhone.value) {
      resultObj[Model.STORE_KEY.PHONE] = inputPhone.value;
    }
    if (inputAddress.value) {
      resultObj[Model.STORE_KEY.ADDRESS] = inputAddress.value;
    }
    if (inputEstablishedDate.value) {
      resultObj[Model.STORE_KEY.ESTABLISHED_DATE] = inputEstablishedDate.value;
    }
    if (inputFloorArea.value) {
      resultObj[Model.STORE_KEY.FLOOR_AREA] = inputFloorArea.value;
    }

    return resultObj;
  }

  /**
   * Gets the object that contains values of all fields of product form (create or edit)
   * @param {Object.<string, string>} modalIdsObj object with modal identifiers (create form or edit form)
   * @returns {Object.<string, string>} the object that contains values of all fields of product form
   * @private
   */
  _getProductObjFromFormInputs(modalIdsObj) {
    const inputName = this.view.getProductInputNameByModalIdsObj(modalIdsObj);
    const inputPrice = this.view.getProductInputPriceByModalIdsObj(modalIdsObj);
    const inputSpecs = this.view.getProductInputSpecsByModalIdsObj(modalIdsObj);
    const inputRating =
      this.view.getProductInputRatingByModalIdsObj(modalIdsObj);
    const inputSupplierInfo =
      this.view.getProductInputSupplierInfoByModalIdsObj(modalIdsObj);
    const inputCountry =
      this.view.getProductInputCountryByModalIdsObj(modalIdsObj);
    const inputProdCompany =
      this.view.getProductInputProdCompanyByModalIdsObj(modalIdsObj);
    const inputStatus =
      this.view.getProductInputStatusByModalIdsObj(modalIdsObj);

    return {
      [Model.PRODUCT_KEY.NAME]: inputName.value,
      [Model.PRODUCT_KEY.PRICE]: inputPrice.value,
      [Model.PRODUCT_KEY.SPECS]: inputSpecs.value,
      [Model.PRODUCT_KEY.RATING]: inputRating.value,
      [Model.PRODUCT_KEY.SUPPLIER_INFO]: inputSupplierInfo.value,
      [Model.PRODUCT_KEY.COUNTRY]: inputCountry.value,
      [Model.PRODUCT_KEY.PROD_COMPANY]: inputProdCompany.value,
      [Model.PRODUCT_KEY.STATUS]: inputStatus.value,
    };
  }

  /**
   * Loads identifier of the store from bookmark and sets it to localStorage if it exists
   * @private
   */
  _loadStoreIdFromBookmark() {
    const queryParams = new URLSearchParams(window.location.search);

    const storeId = queryParams.get(Controller._BOOKMARK_QUERY_STORE_ID);

    if (storeId) {
      localStorage.setItem(
        Controller._LOCAL_STORAGE_ID.BOOKMARK_DETECTED,
        "true"
      );
      localStorage.setItem(Controller._LOCAL_STORAGE_ID.CURR_STORE, storeId);
      this._updateAllStoreDetails();
    }
  }

  /**
   * Updates current bookmark URL with identifier of the current store
   * @private
   */
  _updateBookmarkInsideURL() {
    const currURL = window.location.href;
    const currStoreId = localStorage.getItem(
      Controller._LOCAL_STORAGE_ID.CURR_STORE
    );
    const bookmarkKey = Controller._BOOKMARK_QUERY_STORE_ID;
    const regexPattern = new RegExp(bookmarkKey + "=[^&]+");

    const newUrl = currURL.replace(
      regexPattern,
      `${bookmarkKey}=${currStoreId}`
    );

    history.pushState(null, null, newUrl);
  }
}

export default Controller;
