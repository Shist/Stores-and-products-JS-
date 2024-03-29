"use strict";

/** Model class. Knows everything about API endpoint and data structure. Can format/map data to any structure. */
class Model {
  /**
   * Static object for storing keys of store entity
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @public
   */
  static STORE_KEY = {
    NAME: "Name",
    EMAIL: "Email",
    PHONE: "PhoneNumber",
    ADDRESS: "Address",
    ESTABLISHED_DATE: "Established",
    FLOOR_AREA: "FloorArea",
  };

  /**
   * Static object for storing keys of product entity
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @public
   */
  static PRODUCT_KEY = {
    NAME: "Name",
    PRICE: "Price",
    SPECS: "Specs",
    RATING: "Rating",
    SUPPLIER_INFO: "SupplierInfo",
    COUNTRY: "MadeIn",
    PROD_COMPANY: "ProductionCompanyName",
    STATUS: "Status",
    STORE_ID: "StoreId",
  };

  /**
   * Static object for storing possible filter identifiers (keys - server format, values - DOM identifiers)
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @public
   */
  static FILTER_ID = {
    ALL: "filter-all",
    OK: "filter-ok",
    STORAGE: "filter-storage",
    OUT_OF_STOCK: "filter-out-of-stock",
  };

  /**
   * Static object for storing possible sorting order values (keys - server format, values - DOM data-attributes)
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @public
   */
  static SORT_ORDER = {
    ASC: "asc",
    DESC: "desc",
    DEFAULT: "default",
  };

  /**
   * Static constant with prefix of server API
   * @constant
   * @type {string}
   * @static
   * @private
   * @example fetch(`${Model._API_PREFIX}${endPoint}`);
   */
  static _API_PREFIX = "http://localhost:3000/api";

  /**
   * Static object with URL templates for getting stores and products from server
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @private
   * @example let neededURL = Model._GET_ENDPOINT.STORES;
   * @example let neededURL = Model._GET_ENDPOINT.STORE_BY_ID.replace("{storeId}", storeId);
   * @example let neededURL = Model._GET_ENDPOINT.PRODUCTS_BY_STORE_ID.replace("{storeId}", storeId);
   * @example let neededURL = Model._GET_ENDPOINT.PRODUCT_BY_ID.replace("{productId}", productId);
   */
  static _GET_ENDPOINT = {
    STORES: "/Stores",
    STORE_BY_ID: "/Stores/{storeId}",
    PRODUCTS_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
    PRODUCT_BY_ID: "/Products/{productId}",
  };

  /**
   * Static object with URL templates for posting stores and products to server
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @private
   * @example let neededURL = Model._POST_ENDPOINT.STORE;
   * @example let neededURL = Model._POST_ENDPOINT.PRODUCT_BY_STORE_ID.replace("{storeId}", storeId);
   */
  static _POST_ENDPOINT = {
    STORE: "/Stores",
    PRODUCT_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
  };

  /**
   * Static object with URL templates for editing stores and products on server
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @private
   * @example let neededURL = Model._PUT_ENDPOINT.PRODUCT_BY_ID.replace("{productId}", productId);
   */
  static _PUT_ENDPOINT = {
    PRODUCT_BY_ID: "/Products/{productId}",
  };

  /**
   * Static object with URL templates for deleting stores and products from server
   * @constant
   * @type {Object.<string, string>}
   * @static
   * @private
   * @example let neededURL = Model._DELETE_ENDPOINT.PRDOCUTS_BY_STORE_ID.replace("{storeId}", storeId);
   * @example let neededURL = Model._DELETE_ENDPOINT.STORE_BY_ID.replace("{storeId}", storeId);
   * @example let neededURL = Model._DELETE_ENDPOINT.PRODUCT_BY_ID.replace("{productId}", productId);
   */
  static _DELETE_ENDPOINT = {
    STORE_BY_ID: "/Stores/{storeId}",
    PRDOCUTS_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
    PRODUCT_BY_ID: "/Products/{productId}",
  };

  /**
   * Checks if value of search input valid or not
   * @param {HTMLInputElement} searchInput the search input element
   * @returns {boolean} valid or not
   * @public
   */
  validateSearch(searchInput) {
    return /^[^#%&*()\[\]{}\\]*$/.test(searchInput.value);
  }

  /**
   * Checks if value of store name input valid or not
   * @param {HTMLInputElement} inputName the store name input element
   * @returns {string} message with state of validation: either "OK" or error message
   * @public
   */
  validateCreateStoreName(inputName) {
    if (!inputName.value) {
      return "Name can not be empty!";
    } else if (
      inputName.value
        .split(" ")
        .map((word) => word.length)
        .find((wordLength) => wordLength > 15)
    ) {
      return "Name can not contain words with >15 symbols!";
    } else {
      return "OK";
    }
  }

  /**
   * Checks if value of store email input valid or not
   * @param {HTMLInputElement} inputEmail the store email input element
   * @returns {string} message with state of validation: either "OK" or error message
   * @public
   */
  validateCreateStoreEmail(inputEmail) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!inputEmail.value) {
      return "Email can not be empty!";
    } else if (!emailRegex.test(inputEmail.value)) {
      return "Email you have entered is invalid!";
    } else {
      return "OK";
    }
  }

  /**
   * Checks if value of store phone input valid or not
   * @param {HTMLInputElement} inputPhone the store phone input element
   * @returns {string} message with state of validation: either "OK" or error message
   * @public
   */
  validateCreateStorePhone(inputPhone) {
    const phoneRegex = /^[\d\+\-\(\)x\ ]+$/;

    if (!inputPhone.value) {
      return "Phone can not be empty!";
    } else if (!phoneRegex.test(inputPhone.value)) {
      return "Phone you have entered is invalid!";
    } else {
      return "OK";
    }
  }

  /**
   * Checks if value of store floor area input valid or not
   * @param {HTMLInputElement} inputFloorArea the store floor area input element
   * @returns {string} message with state of validation: either "OK" or error message
   * @public
   */
  validateCreateStoreFloorArea(inputFloorArea) {
    if (inputFloorArea.value && +inputFloorArea.value <= 0) {
      return "Floor area must be positive!";
    } else {
      return "OK";
    }
  }

  /**
   * Checks if value of product name input valid or not
   * @param {HTMLInputElement} inputName the product name input element
   * @returns {string} message with state of validation: either "OK" or error message
   * @public
   */
  validateProductName(inputName) {
    if (!inputName.value) {
      return "Name can not be empty!";
    } else {
      return "OK";
    }
  }

  /**
   * Checks if value of product price input valid or not
   * @param {HTMLInputElement} inputPrice the product price input element
   * @returns {string} message with state of validation: either "OK" or error message
   * @public
   */
  validateProductPrice(inputPrice) {
    if (inputPrice.value && +inputPrice.value <= 0) {
      return "Price must be positive!";
    } else {
      return "OK";
    }
  }

  /**
   * Checks if value of product specs input valid or not
   * @param {HTMLInputElement} inputSpecs the product specs input element
   * @returns {string} message with state of validation: either "OK" or error message
   * @public
   */
  validateProductSpecs(inputSpecs) {
    if (!inputSpecs.value) {
      return "Specs can not be empty!";
    } else {
      return "OK";
    }
  }

  /**
   * Checks if value of product rating input valid or not
   * @param {HTMLInputElement} inputRating the product rating input element
   * @returns {string} message with state of validation: either "OK" or error message
   * @public
   */
  validateProductRating(inputRating) {
    if (inputRating.value && +inputRating.value < 1) {
      return "Rating must be at least 1!";
    } else if (inputRating.value && +inputRating.value > 5) {
      return "Rating must be no more than 5!";
    } else if (inputRating.value && !Number.isInteger(+inputRating.value)) {
      return "Rating must have an integer value";
    } else {
      return "OK";
    }
  }

  /**
   * Gets the list of stores from server using search filter
   * @param {string} searchFilterValue the value of search filter
   * @returns {Promise} the promise object will be resolved once the stores list gets loaded
   * @public
   * @async
   */
  async getSearchedStoresList(searchFilterValue) {
    try {
      let neededURL = Model._GET_ENDPOINT.STORES;
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

      return await this._getData(neededURL);
    } catch (error) {
      console.error(
        `Error while fetching stores list. Reason: ${error.message}`
      );
      throw new Error(
        `Error while fetching stores list. Reason: ${error.message}`
      );
    }
  }

  /**
   * Gets the store by its identifier from server
   * @param {string} storeId the identifier of store
   * @returns {Promise} the promise object will be resolved once the store gets loaded
   * @public
   * @async
   */
  async getStoreById(storeId) {
    try {
      return await this._getData(
        Model._GET_ENDPOINT.STORE_BY_ID.replace("{storeId}", storeId)
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

  /**
   * Gets the list of products by its store identifier from server using only search filter
   * @param {string} storeId the identifier of store
   * @param {string} searchFilterValue the value of search filter
   * @returns {Promise} the promise object will be resolved once the products list gets loaded
   * @public
   * @async
   */
  async getSearchedProductsListByStoreId(storeId, searchFilterValue) {
    try {
      let neededURL = Model._GET_ENDPOINT.PRODUCTS_BY_STORE_ID.replace(
        "{storeId}",
        storeId
      );
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

      return await this._getData(neededURL);
    } catch (error) {
      console.error(
        `Error while fetching products list for store with id=${storeId}. Reason: ${error.message}`
      );
      throw new Error(
        `Error while fetching products list for store with id=${storeId}. Reason: ${error.message}`
      );
    }
  }

  /**
   * Gets the list of products by its store identifier from server using all filters
   * @param {string} storeId the identifier of store
   * @param {Object.<string, string>} filterOptions the object with filter options
   * @returns {Promise} the promise object will be resolved once the products list gets loaded
   * @public
   * @async
   */
  async getFullFilteredProductsListByStoreId(
    storeId,
    { filterId, sortKey, sortOrder, searchFilterValue }
  ) {
    try {
      let neededURL = Model._GET_ENDPOINT.PRODUCTS_BY_STORE_ID.replace(
        "{storeId}",
        storeId
      );
      const filterObj = {};

      if (searchFilterValue) {
        if (filterId && filterId !== Model.FILTER_ID.ALL) {
          filterObj.where = {
            and: [
              { Status: this._getProductsFilterTypeById(filterId) },
              {
                or: [
                  { Name: { regexp: `/${searchFilterValue}/i` } },
                  { Price: searchFilterValue },
                  { Specs: { regexp: `/${searchFilterValue}/i` } },
                  { SupplierInfo: { regexp: `/${searchFilterValue}/i` } },
                  { MadeIn: { regexp: `/${searchFilterValue}/i` } },
                  {
                    ProductionCompanyName: {
                      regexp: `/${searchFilterValue}/i`,
                    },
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
        if (filterId && filterId !== Model.FILTER_ID.ALL) {
          filterObj.where = {
            Status: this._getProductsFilterTypeById(filterId),
          };
        }
      }

      if (sortKey && sortOrder && sortOrder !== Model.SORT_ORDER.DEFAULT) {
        filterObj.order = `${sortKey} ${this._getProductsSortOrderTypeByAttribute(
          sortOrder
        )}`;
      }

      if (filterObj.where || filterObj.order) {
        neededURL += `?filter=${JSON.stringify(filterObj)}`;
      }

      return await this._getData(neededURL);
    } catch (error) {
      console.error(
        `Error while fetching filtered products list for store with id=${storeId}. Reason: ${error.message}`
      );
      throw new Error(
        `Error while fetching filtered products list for store with id=${storeId}. Reason: ${error.message}`
      );
    }
  }

  /**
   * Gets the product by its identifier from server
   * @param {string} productId the identifier of product
   * @returns {Promise} the promise object will be resolved once the product gets loaded
   * @public
   * @async
   */
  async getProductById(productId) {
    try {
      return await this._getData(
        Model._GET_ENDPOINT.PRODUCT_BY_ID.replace("{productId}", productId)
      );
    } catch (error) {
      console.error(
        `Error while fetching product with id=${productId}. Reason: ${error.message}`
      );
      throw new Error(
        `Error while fetching product with id=${productId}. Reason: ${error.message}`
      );
    }
  }

  /**
   * Posts the store object to server
   * @param {string} storeObj string containing JSON.stringify() version of the store object
   * @returns {Promise} the promise object will be resolved once the store gets posted
   * @public
   * @async
   */
  async postStore(storeObj) {
    try {
      return await this._postData(Model._POST_ENDPOINT.STORE, storeObj);
    } catch (error) {
      console.error(`Error while posting store. Reason: ${error.message}`);
      throw new Error(`Error while posting store. Reason: ${error.message}`);
    }
  }

  /**
   * Posts the product object to server using store identifier
   * @param {string} storeId the identifier of store
   * @param {string} productObj string containing JSON.stringify() version of the product object
   * @returns {Promise} the promise object will be resolved once the product gets posted
   * @public
   * @async
   */
  async postProduct(storeId, productObj) {
    try {
      return await this._postData(
        Model._POST_ENDPOINT.PRODUCT_BY_STORE_ID.replace("{storeId}", storeId),
        productObj
      );
    } catch (error) {
      console.error(`Error while posting product. Reason: ${error.message}`);
      throw new Error(`Error while posting product. Reason: ${error.message}`);
    }
  }

  /**
   * Edit the product object on server using its identifier
   * @param {string} productId the identifier of product
   * @param {string} productObj string containing JSON.stringify() version of the product object
   * @returns {Promise} the promise object will be resolved once the product gets edited
   * @public
   * @async
   */
  async editProduct(productId, productObj) {
    try {
      return await this._putData(
        Model._PUT_ENDPOINT.PRODUCT_BY_ID.replace("{productId}", productId),
        productObj
      );
    } catch (error) {
      console.error(`Error while editing product. Reason: ${error.message}`);
      throw new Error(`Error while editing product. Reason: ${error.message}`);
    }
  }

  /**
   * Delete the store products from server using store identifier
   * @param {string} storeId the identifier of store
   * @returns {Promise} the promise object will be resolved once the products list of store gets deleted
   * @public
   * @async
   */
  async deleteStoreProducts(storeId) {
    try {
      return await this._deleteData(
        Model._DELETE_ENDPOINT.PRDOCUTS_BY_STORE_ID.replace(
          "{storeId}",
          storeId
        )
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

  /**
   * Delete the store from server using its identifier
   * @param {string} storeId the identifier of store
   * @returns {Promise} the promise object will be resolved once the store gets deleted
   * @public
   * @async
   */
  async deleteStore(storeId) {
    try {
      return await this._deleteData(
        Model._DELETE_ENDPOINT.STORE_BY_ID.replace("{storeId}", storeId)
      );
    } catch (error) {
      console.error(`Error while deleting store. Reason: ${error.message}`);
      throw new Error(`Error while deleting store. Reason: ${error.message}`);
    }
  }

  /**
   * Delete the product from server using its identifier
   * @param {string} productId the identifier of product
   * @returns {Promise} the promise object will be resolved once the product gets deleted
   * @public
   * @async
   */
  async deleteProduct(productId) {
    try {
      return await this._deleteData(
        Model._DELETE_ENDPOINT.PRODUCT_BY_ID.replace("{productId}", productId)
      );
    } catch (error) {
      console.error(`Error while deleting product. Reason: ${error.message}`);
      throw new Error(`Error while deleting product. Reason: ${error.message}`);
    }
  }

  /**
   * Gets type of filter (in server format) by DOM identifier
   * @param {string} filterId the DOM identifier of filter
   * @returns {string} the type of filter (in server format)
   * @private
   */
  _getProductsFilterTypeById(filterId) {
    return Object.keys(Model.FILTER_ID).find(
      (filterType) => Model.FILTER_ID[filterType] === filterId
    );
  }

  /**
   * Gets type of sort order (in server format) by DOM data-attribute
   * @param {string} orderAttribute the DOM data-attribute of sort order
   * @returns {string} the type of sort order (in server format)
   * @private
   */
  _getProductsSortOrderTypeByAttribute(orderAttribute) {
    return Object.keys(Model.SORT_ORDER).find(
      (orderType) => Model.SORT_ORDER[orderType] === orderAttribute
    );
  }

  /**
   * Gets data from server via given endpoint
   * @param {string} endPoint endpoint for server
   * @returns {Promise} the promise object will be resolved after receiving the response
   * @private
   * @async
   */
  async _getData(endPoint) {
    try {
      const response = await fetch(`${Model._API_PREFIX}${endPoint}`, {
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

  /**
   * Posts data to server via given endpoint
   * @param {string} endPoint endpoint for server
   * @param {string} data string containing JSON.stringify() version of the data object
   * @returns {Promise} the promise object will be resolved after receiving the response
   * @private
   * @async
   */
  async _postData(endPoint, data) {
    try {
      const response = await fetch(`${Model._API_PREFIX}${endPoint}`, {
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

  /**
   * Edits data on server via given endpoint
   * @param {string} endPoint endpoint for server
   * @param {string} data string containing JSON.stringify() version of the data object
   * @returns {Promise} the promise object will be resolved after receiving the response
   * @private
   * @async
   */
  async _putData(endPoint, data) {
    try {
      const response = await fetch(`${Model._API_PREFIX}${endPoint}`, {
        method: "PUT",
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

  /**
   * Deletes data from server via given endpoint
   * @param {string} endPoint endpoint for server
   * @returns {Promise} the promise object will be resolved after receiving the response
   * @private
   * @async
   */
  async _deleteData(endPoint) {
    try {
      const response = await fetch(`${Model._API_PREFIX}${endPoint}`, {
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
}

export default Model;
