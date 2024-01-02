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

  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this._initLocalStorageData();

    this._setSearchStoresListeners();
    this._setStoresCardsClickListener();

    this._setProductsFiltersBtnsListener();
    this._renderProductsTableHead();
    this._setTableRowsBtnsListeners();

    this._setFootersBtnsListeners();
    this._setModalsConfirmBtnsListeners();
    this._setModalsCancelBtnsListeners();

    this._loadStoreIdFromBookmark();

    this.view.setStoresListSpinner(View.SPINNER_TEXT.STORES_LIST.LOADING);

    this.model
      .getSearchedStoresList(this.view.getStoresSearchInput().value)
      .then((storesList) => {
        if (Array.isArray(storesList)) {
          this.view.updateStoresList(
            storesList,
            localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
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

  _updateAllStoreDetails() {
    this._setProductsTableHeadToDefault();

    this.view.highlightActiveStoreCard(
      localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
    );

    this.view.updateStoreDetailsLayout(
      localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
    );

    this._updateStoreDescription();

    this._setProductsAmountSpinner(View.SPINNER_TEXT.PRODUCTS_AMOUNTS.LOADING);
    this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

    this.model
      .getSearchedProductsListByStoreId(
        localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
        this.view.getProductsSearchInput().value
      )
      .then((searchedProductsList) => {
        if (Array.isArray(searchedProductsList)) {
          this.view.updateProductsAmounts(
            searchedProductsList,
            localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
          );

          this.view.updateProductsTableBody(searchedProductsList);
        }
      })
      .catch((error) => {
        this.view.showPopupWithMsg(error.message, View.POPUP_COLOR.ERROR, 8000);
        if (
          localStorage.getItem(Controller.LOCAL_STORAGE_ID.BOOKMARK_DETECTED)
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

  _setProductsTableHeadToDefault() {
    this.view.setCurrProductsFilterBtn(
      localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_FILTER),
      Model.FILTER_ID.ALL
    );
    localStorage.setItem(
      Controller.LOCAL_STORAGE_ID.CURR_FILTER,
      Model.FILTER_ID.ALL
    );

    this._clearTableSortFiltersFromLocalStorage();

    this.view.setAllSortBtnsToDefault(Model.SORT_ORDER.DEFAULT);

    this.view.setProductSearchLineToDefault();
  }

  _updateStoreDescription() {
    this._setStoreDescriptionSpinner(View.SPINNER_TEXT.STORE_DETAILS.LOADING);

    this.model
      .getStoreById(
        localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
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

  _renderProductsTableHead() {
    const productsTableHead = this.view.getProductsTableHead();

    productsTableHead.innerHTML = this.view.getStructureForTableHead(
      Model.SORT_ORDER.DEFAULT
    );

    this._setTableSortBtnsListener();

    this._setSearchProductsListeners();
  }

  _loadProductDataToEditForm() {
    this._setEditProductFormSpinner(
      View.SPINNER_TEXT.EDIT_PRODUCT_FORM.LOADING
    );

    this.model
      .getProductById(
        localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_PRODUCT)
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

  _setTableSortFiltersToLocalStorage(sortKey, sortOrder) {
    localStorage.setItem(Controller.LOCAL_STORAGE_ID.CURR_SORT_KEY, sortKey);
    localStorage.setItem(
      Controller.LOCAL_STORAGE_ID.CURR_SORT_ORDER,
      sortOrder
    );
  }

  _clearTableSortFiltersFromLocalStorage() {
    localStorage.removeItem(Controller.LOCAL_STORAGE_ID.CURR_SORT_KEY);
    localStorage.removeItem(Controller.LOCAL_STORAGE_ID.CURR_SORT_ORDER);
  }

  _initLocalStorageData() {
    localStorage.removeItem(Controller.LOCAL_STORAGE_ID.CURR_STORE);
    localStorage.removeItem(Controller.LOCAL_STORAGE_ID.BOOKMARK_DETECTED);
    localStorage.removeItem(Controller.LOCAL_STORAGE_ID.CURR_PRODUCT);
    localStorage.removeItem(Controller.LOCAL_STORAGE_ID.CURR_FILTER);
    this._clearTableSortFiltersFromLocalStorage();
    localStorage.setItem(
      Controller.LOCAL_STORAGE_ID.STORES_LIST_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      Controller.LOCAL_STORAGE_ID.DETAILS_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      Controller.LOCAL_STORAGE_ID.FILTERS_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      Controller.LOCAL_STORAGE_ID.PRODUCTS_LIST_SPINNER_FETHES,
      "0"
    );
    localStorage.setItem(
      Controller.LOCAL_STORAGE_ID.EDIT_PRODUCT_FORM_SPINNER_FETHES,
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

  _setStoresCardsClickListener() {
    const storesLayout = this.view.getStoresLayout();

    storesLayout.addEventListener("click", this._onStoreCardClick);
  }

  _onStoreCardClick(e) {
    const currItemCard = this.view.getClosestStoresListItem(e.target);

    if (
      currItemCard &&
      View.DATA_ATTRIBUTE.STORE_ID.CAMEL in currItemCard.dataset
    ) {
      localStorage.setItem(
        Controller.LOCAL_STORAGE_ID.CURR_STORE,
        currItemCard.dataset[View.DATA_ATTRIBUTE.STORE_ID.CAMEL]
      );

      if (localStorage.getItem(Controller.LOCAL_STORAGE_ID.BOOKMARK_DETECTED)) {
        this._updateBookmarkInsideURL();
      }

      this._updateAllStoreDetails();
    }
  }

  _setProductsFiltersBtnsListener() {
    const filtersWrapper = this.view.getFilterWrapper();

    filtersWrapper.addEventListener("click", this._onProductsFilterBtnClick);
  }

  _onProductsFilterBtnClick(e) {
    const newFilterBtn = this.view.getClosestFilterBtn(e.target);

    if (
      newFilterBtn &&
      newFilterBtn.id !==
        localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_FILTER)
    ) {
      this.view.setCurrProductsFilterBtn(
        localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_FILTER),
        newFilterBtn.id
      );

      this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

      const filterOptions = {
        filterId: localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_FILTER),
        sortKey: localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.CURR_SORT_KEY
        ),
        sortOrder: localStorage.getItem(Controller.LOCAL_STORAGE_ID.SORT_ORDER),
        searchFilterValue: this.view.getProductsSearchInput().value,
      };

      this.model
        .getFullFilteredProductsListByStoreId(
          localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
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

  _setTableSortBtnsListener() {
    const productTableHeadTitles = this.view.getProductsTableHeadTitles();

    productTableHeadTitles.addEventListener("click", this._onTableSortBtnClick);
  }

  _onTableSortBtnClick(e) {
    if (e.target.classList.contains(View.CLASS.BTN.SORT)) {
      const currSortBtn = e.target;
      const sortKey = currSortBtn.dataset[View.DATA_ATTRIBUTE.SORT_KEY.CAMEL];

      const filterOptions = {
        filterId: localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_FILTER),
        sortKey: localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.CURR_SORT_KEY
        ),
        sortOrder: localStorage.getItem(Controller.LOCAL_STORAGE_ID.SORT_ORDER),
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

          this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

          this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
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

          this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

          this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
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
        case Model.SORT_ORDER.DEFAULT:
          currSortBtn.dataset[View.DATA_ATTRIBUTE.SORT_STATE.CAMEL] =
            Model.SORT_ORDER.DEFAULT;
          currSortBtn.classList.remove(View.JS_CLASS.SORT_BTN.DESC);

          this._clearTableSortFiltersFromLocalStorage();

          this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.LOADING);

          this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
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

  _setSearchProductsListeners() {
    const searchInput = this.view.getProductsSearchInput();
    const searchBtn = this.view.getProductsSearchBtn();

    searchInput.addEventListener("search", this._onSearchProductsClick);
    searchBtn.addEventListener("click", this._onSearchProductsClick);
  }

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
          localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
          searchInput.value
        )
        .then((searchedProductsList) => {
          if (Array.isArray(searchedProductsList)) {
            this.view.updateProductsAmounts(
              searchedProductsList,
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
            );
          }
        });

      const filterOptions = {
        filterId: localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_FILTER),
        sortKey: localStorage.getItem(
          Controller.LOCAL_STORAGE_ID.CURR_SORT_KEY
        ),
        sortOrder: localStorage.getItem(Controller.LOCAL_STORAGE_ID.SORT_ORDER),
        searchFilterValue: this.view.getProductsSearchInput().value,
      };

      const fullFilteredProductsPromise = this.model
        .getFullFilteredProductsListByStoreId(
          localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
          filterOptions
        )
        .then((fullFilteredProductsList) => {
          if (Array.isArray(fullFilteredProductsList)) {
            this.view.updateProductsTableBody(fullFilteredProductsList);
          }
        });

      this._setProductsAmountSpinner(
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

  _setTableRowsBtnsListeners() {
    const tableBody = this.view.getProductsTableBody();

    tableBody.addEventListener("click", this._onTableRowsBtnClick);
  }

  _onTableRowsBtnClick(e) {
    if (e.target.classList.contains(View.CLASS.BTN.EDIT)) {
      const modalWrapper = this.view.getModalEditProductWrapper();

      localStorage.setItem(
        Controller.LOCAL_STORAGE_ID.CURR_PRODUCT,
        e.target.dataset[View.DATA_ATTRIBUTE.PRODUCT_ID.CAMEL]
      );

      modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);

      this._loadProductDataToEditForm();
    } else if (e.target.classList.contains(View.CLASS.BTN.CROSS)) {
      const modalWrapper = this.view.getModalDeleteProductWrapper();

      localStorage.setItem(
        Controller.LOCAL_STORAGE_ID.CURR_PRODUCT,
        e.target.dataset[View.DATA_ATTRIBUTE.PRODUCT_ID.CAMEL]
      );

      modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
    }
  }

  _setFootersBtnsListeners() {
    const btnCreateStore = this.view.getBtnCreateStore();
    const btnDeleteStore = this.view.getBtnDeleteStore();
    const btnCreateProduct = this.view.getBtnCreateProduct();

    btnCreateStore.addEventListener("click", this._onCreateStoreClick);
    btnDeleteStore.addEventListener("click", this._onDeleteStoreClick);
    btnCreateProduct.addEventListener("click", this._onCreateProductClick);
  }

  _onCreateStoreClick() {
    const modalWrapper = this.view.getModalCreateStoreWrapper();

    modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
  }

  _onDeleteStoreClick() {
    const modalWrapper = this.view.getModalDeleteStoreWrapper();

    modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
  }

  _onCreateProductClick() {
    const modalWrapper = this.view.getModalCreateProductWrapper();

    modalWrapper.classList.add(View.JS_CLASS.ELEMENT.FLEX);
  }

  _setModalsConfirmBtnsListeners() {
    const btnConfirmCreateStore = this.view.getBtnConfirmCreateStore();
    const btnConfirmDeleteStore = this.view.getBtnConfirmDeleteStore();
    const btnConfirmCreateProduct = this.view.getBtnConfirmCreateProduct();
    const btnConfirmEditProduct = this.view.getBtnConfirmEditProduct();
    const btnConfirmDeleteProduct = this.view.getBtnConfirmDeleteProduct();

    btnConfirmCreateStore.addEventListener(
      "click",
      this._onConfirmCreateStoreClick
    );
    btnConfirmDeleteStore.addEventListener(
      "click",
      this._onConfirmDeleteStoreClick
    );
    btnConfirmCreateProduct.addEventListener(
      "click",
      this._onConfirmCreateProductClick
    );
    btnConfirmEditProduct.addEventListener(
      "click",
      this._onConfirmEditProductClick
    );
    btnConfirmDeleteProduct.addEventListener(
      "click",
      this._onConfirmDeleteProductClick
    );
  }

  _onConfirmCreateStoreClick() {
    if (this._validateCreateStoreForm()) {
      const resultObj = this._getStoreObjFromFormInputs();

      this.view.closeCreateStoreModal();

      this.view.setStoresListSpinner(View.SPINNER_TEXT.STORES_LIST.CREATING);

      this.model
        .postStore()(JSON.stringify(resultObj))
        .then(() => {
          this.view.showPopupWithMsg(
            "New store has been successfully created!",
            View.POPUP_COLOR.SUCCESS,
            5000
          );

          this.view.setStoresListSpinner(
            View.SPINNER_TEXT.STORES_LIST.UPDATING
          );

          this.model
            .getSearchedStoresList(this.view.getStoresSearchInput().value)
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

  _onConfirmDeleteStoreClick() {
    this.view.disableStoreDetailsFooterBtns();

    this.view.closeDeleteStoreModal();

    this.view.setStoresListSpinner(
      View.SPINNER_TEXT.STORES_LIST.DELETING_STORE_PRODUCTS
    );
    this.view.setProductsListSpinner(
      View.SPINNER_TEXT.PRODUCTS_LIST.DELETING_STORE_PRODUCTS
    );

    this.model
      .deleteStoreProducts(
        localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
      )
      .then(() => {
        this.view.showPopupWithMsg(
          "All products of store have been successfully deleted.",
          View.POPUP_COLOR.ATTENTION,
          5000
        );

        this.view.setStoresListSpinner(
          View.SPINNER_TEXT.STORES_LIST.DELETING_STORE
        );
        this.view.setProductsListSpinner(
          View.SPINNER_TEXT.PRODUCTS_LIST.DELETING_STORE
        );

        this.model
          .deleteStore(
            localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
          )
          .then(() => {
            this.view.showPopupWithMsg(
              "The store has been successfully deleted.",
              View.POPUP_COLOR.ATTENTION,
              5000
            );

            localStorage.removeItem(Controller.LOCAL_STORAGE_ID.CURR_STORE);
            if (
              localStorage.getItem(
                Controller.LOCAL_STORAGE_ID.BOOKMARK_DETECTED
              )
            ) {
              this._updateBookmarkInsideURL();
            }
            this.view.updateStoreDetailsLayout(
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
            );

            this.view.setStoresListSpinner(
              View.SPINNER_TEXT.STORES_LIST.UPDATING
            );

            this.model
              .getSearchedStoresList(this.view.getStoresSearchInput().value)
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

  _onConfirmCreateProductClick() {
    if (this._validateProductForm(View.ID.MODALS.CREATE_PRODUCT)) {
      const resultObj = this._getProductObjFromFormInputs(
        View.ID.MODALS.CREATE_PRODUCT
      );

      this.view.closeCreateProductModal();

      this._setProductsAmountSpinner(
        View.SPINNER_TEXT.PRODUCTS_AMOUNTS.CREATING
      );
      this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.CREATING);

      this.model
        .postProduct(
          localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
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
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
              this.view.getProductsSearchInput().value
            )
            .then((searchedProductsList) => {
              if (Array.isArray(searchedProductsList)) {
                this.view.updateProductsAmounts(
                  searchedProductsList,
                  localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
                );
              }
            });

          const filterOptions = {
            filterId: localStorage.getItem(
              Controller.LOCAL_STORAGE_ID.CURR_FILTER
            ),
            sortKey: localStorage.getItem(
              Controller.LOCAL_STORAGE_ID.CURR_SORT_KEY
            ),
            sortOrder: localStorage.getItem(
              Controller.LOCAL_STORAGE_ID.SORT_ORDER
            ),
            searchFilterValue: this.view.getProductsSearchInput().value,
          };

          const fullFilteredProductsPromise = this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
              filterOptions
            )
            .then((fullFilteredProductsList) => {
              if (Array.isArray(fullFilteredProductsList)) {
                this.view.updateProductsTableBody(fullFilteredProductsList);
              }
            });

          this.view.setProductsAmountSpinner(
            View.SPINNER_TEXT.PRODUCTS_AMOUNTS.UPDATING
          );
          this.view.setProductsListSpinner(
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

  _onConfirmEditProductClick() {
    if (this._validateProductForm(View.ID.MODALS.EDIT_PRODUCT)) {
      const resultObj = this._getProductObjFromFormInputs(
        View.ID.MODALS.EDIT_PRODUCT
      );

      resultObj[Model.PRODUCT_KEY.STORE_ID] = localStorage.getItem(
        Controller.LOCAL_STORAGE_ID.CURR_STORE
      );

      this._setProductsAmountSpinner(
        View.SPINNER_TEXT.PRODUCTS_AMOUNTS.EDITING
      );
      this._setProductsListSpinner(View.SPINNER_TEXT.PRODUCTS_LIST.EDITING);

      this.model
        .editProduct(
          localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_PRODUCT),
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
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
              this.view.getProductsSearchInput().value
            )
            .then((searchedProductsList) => {
              if (Array.isArray(searchedProductsList)) {
                this.view.updateProductsAmounts(
                  searchedProductsList,
                  localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
                );
              }
            });

          const filterOptions = {
            filterId: localStorage.getItem(
              Controller.LOCAL_STORAGE_ID.CURR_FILTER
            ),
            sortKey: localStorage.getItem(
              Controller.LOCAL_STORAGE_ID.CURR_SORT_KEY
            ),
            sortOrder: localStorage.getItem(
              Controller.LOCAL_STORAGE_ID.SORT_ORDER
            ),
            searchFilterValue: this.view.getProductsSearchInput().value,
          };

          const fullFilteredProductsPromise = this.model
            .getFullFilteredProductsListByStoreId(
              localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
              filterOptions
            )
            .then((fullFilteredProductsList) => {
              if (Array.isArray(fullFilteredProductsList)) {
                this.view.updateProductsTableBody(fullFilteredProductsList);
              }
            });

          this.view.setProductsAmountSpinner(
            View.SPINNER_TEXT.PRODUCTS_AMOUNTS.UPDATING
          );
          this.view.setProductsListSpinner(
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

  _onConfirmDeleteProductClick() {
    this._setProductsAmountSpinner(View.SPINNER_TEXT.PRODUCTS_AMOUNTS.DELETING);
    this._setProductsListSpinner(
      View.SPINNER_TEXT.PRODUCTS_LIST.DELETING_PRODUCT
    );

    this.model
      .deleteProduct(
        localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_PRODUCT)
      )
      .then(() => {
        this.view.showPopupWithMsg(
          "The product has been successfully deleted.",
          View.POPUP_COLOR.ATTENTION,
          5000
        );

        const searchedProductsPromise = this.model
          .getSearchedProductsListByStoreId(
            localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
            this.view.getProductsSearchInput().value
          )
          .then((searchedProductsList) => {
            if (Array.isArray(searchedProductsList)) {
              this.view.updateProductsAmounts(
                searchedProductsList,
                localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE)
              );
            }
          });

        const filterOptions = {
          filterId: localStorage.getItem(
            Controller.LOCAL_STORAGE_ID.CURR_FILTER
          ),
          sortKey: localStorage.getItem(
            Controller.LOCAL_STORAGE_ID.CURR_SORT_KEY
          ),
          sortOrder: localStorage.getItem(
            Controller.LOCAL_STORAGE_ID.SORT_ORDER
          ),
          searchFilterValue: this.view.getProductsSearchInput().value,
        };

        const fullFilteredProductsPromise = this.model
          .getFullFilteredProductsListByStoreId(
            localStorage.getItem(Controller.LOCAL_STORAGE_ID.CURR_STORE),
            filterOptions
          )
          .then((fullFilteredProductsList) => {
            if (Array.isArray(fullFilteredProductsList)) {
              this.view.updateProductsTableBody(fullFilteredProductsList);
            }
          });

        this.view.setProductsAmountSpinner(
          View.SPINNER_TEXT.PRODUCTS_AMOUNTS.UPDATING
        );
        this.view.setProductsListSpinner(
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

  _setModalsCancelBtnsListeners() {
    const btnCancelCreateStore = this.view.getBtnCancelCreateStore();
    const btnCancelDeleteStore = this.view.getBtnCancelDeleteStore();
    const btnCancelCreateProduct = this.view.getBtnCancelCreateProduct();
    const btnCancelEditProduct = this.view.getBtnCancelEditProduct();
    const btnCancelDeleteProduct = this.view.getBtnCancelDeleteProduct();
    const btnOkModalError = this.view.getBtnOkModalError();

    btnCancelCreateStore.addEventListener(
      "click",
      this.view.closeCreateStoreModal
    );
    btnCancelDeleteStore.addEventListener(
      "click",
      this.view.closeDeleteStoreModal
    );
    btnCancelCreateProduct.addEventListener(
      "click",
      this.view.closeCreateProductModal
    );
    btnCancelEditProduct.addEventListener(
      "click",
      this._onCancelEditProductBtnClick
    );
    btnCancelDeleteProduct.addEventListener(
      "click",
      this._onCancelDeleteProductBtnClick
    );
    btnOkModalError.addEventListener("click", this.view.closeErrorModal);
  }

  _onCancelEditProductBtnClick() {
    this.view.closeEditProductModal();

    localStorage.removeItem(Controller.LOCAL_STORAGE_ID.CURR_PRODUCT);
  }

  _onCancelDeleteProductBtnClick() {
    this.view.closeDeleteProductModal();

    localStorage.removeItem(Controller.LOCAL_STORAGE_ID.CURR_PRODUCT);
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
      const currSpinner = document.querySelector(
        `#${View.ID.SPINNER.STORE_DETAILS}`
      );
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.STORE_DETAILS);
  }

  _setProductsAmountSpinner(spinnerText) {
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
      const currSpinner = document.querySelector(
        `#${View.ID.SPINNER.PRODUCTS_AMOUNTS}`
      );
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.PRODUCTS_AMOUNTS);
  }

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
      const currSpinner = document.querySelector(
        `#${View.ID.SPINNER.EDIT_PRODUCT_FORM}`
      );
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.EDIT_PRODUCT_FORM);
  }

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

      this._resizeWidthForProductsListSpinner();
      this._resizeHeightAndMoveProductsListSpinner();

      this._setProductsListSpinnerResizeListeners();
    } else {
      const currSpinner = document.querySelector(
        `#${View.ID.SPINNER.PRODUCTS_LIST}`
      );
      if (currSpinner) {
        const spinnerSpan = currSpinner.getElementsByTagName("span")[0];
        spinnerSpan.textContent = spinnerText;
      }
    }

    this._plusFetchOperationForSpinner(View.ID.SPINNER.PRODUCTS_LIST);
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

  _validateCreateStoreForm() {
    const validateObj = {
      name: {
        wrapper: this.view.getModalCreateStoreInputNameWrapper(),
        input: this.view.getModalCreateStoreInputName(),
      },
      email: {
        wrapper: this.view.getModalCreateStoreInputEmail(),
        input: this.view.getModalCreateStoreInputEmailWrapper(),
      },
      phone: {
        wrapper: this.view.getModalCreateStoreInputPhone(),
        input: this.view.getModalCreateStoreInputPhoneWrapper(),
      },
      floorArea: {
        wrapper: this.view.getModalCreateStoreInputFloorArea(),
        input: this.view.getModalCreateStoreInputFloorAreaWrapper(),
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

    Object.keys(validateObj).forEach(({ wrapper, input, state }) => {
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

  _validateProductForm(modalIdsObj) {
    const validateObj = {
      name: {
        wrapper: this.view.getProductInputNameByModalIdsObj(modalIdsObj),
        input: this.view.getProductInputNameWrapperByModalIdsObj(modalIdsObj),
      },
      price: {
        wrapper: this.view.getProductInputPriceByModalIdsObj(modalIdsObj),
        input: this.view.getProductInputPriceWrapperByModalIdsObj(modalIdsObj),
      },
      specs: {
        wrapper: this.view.getProductInputSpecsByModalIdsObj(modalIdsObj),
        input: this.view.getProductInputSpecsWrapperByModalIdsObj(modalIdsObj),
      },
      rating: {
        wrapper: this.view.getProductInputRatingByModalIdsObj(modalIdsObj),
        input: this.view.getProductInputRatingWrapperByModalIdsObj(modalIdsObj),
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

    Object.keys(validateObj).forEach(({ wrapper, input, state }) => {
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

  _loadStoreIdFromBookmark() {
    const queryParams = new URLSearchParams(window.location.search);

    const storeId = queryParams.get(Controller.BOOKMARK_QUERY_STORE_ID);

    if (storeId) {
      localStorage.setItem(
        Controller.LOCAL_STORAGE_ID.BOOKMARK_DETECTED,
        "true"
      );
      localStorage.setItem(Controller.LOCAL_STORAGE_ID.CURR_STORE, storeId);
      this._updateAllStoreDetails();
    }
  }

  _updateBookmarkInsideURL() {
    const currURL = window.location.href;
    const currStoreId = localStorage.getItem(
      Controller.LOCAL_STORAGE_ID.CURR_STORE
    );
    const bookmarkKey = Controller.BOOKMARK_QUERY_STORE_ID;
    const regexPattern = new RegExp(bookmarkKey + "=[^&]+");

    const newUrl = currURL.replace(
      regexPattern,
      `${bookmarkKey}=${currStoreId}`
    );

    history.pushState(null, null, newUrl);
  }
}
