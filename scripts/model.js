"use strict";

export default class Model {
  static API_PREFIX = "http://localhost:3000/api";

  static STORE_KEY = {
    NAME: "Name",
    EMAIL: "Email",
    PHONE: "PhoneNumber",
    ADDRESS: "Address",
    ESTABLISHED_DATE: "Established",
    FLOOR_AREA: "FloorArea",
  };

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

  static GET_ENDPOINT = {
    STORES: "/Stores",
    STORE_BY_ID: "/Stores/{storeId}",
    PRODUCTS_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
    PRODUCT_BY_ID: "/Products/{productId}",
  };

  static POST_ENDPOINT = {
    STORE: "/Stores",
    PRODUCT_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
  };

  static PUT_ENDPOINT = {
    PRODUCT_BY_ID: "/Products/{productId}",
  };

  static DELETE_ENDPOINT = {
    STORE_BY_ID: "/Stores/{storeId}",
    PRDOCUTS_BY_STORE_ID: "/Stores/{storeId}/rel_Products",
    PRODUCT_BY_ID: "/Products/{productId}",
  };

  static FILTER_ID = {
    ALL: "filter-all",
    OK: "filter-ok",
    STORAGE: "filter-storage",
    OUT_OF_STOCK: "filter-out-of-stock",
  };

  static SORT_ORDER = {
    ASC: "asc",
    DESC: "desc",
    DEFAULT: "default",
  };

  validateSearch(searchInput) {
    return /^[^#%&*()\[\]{}\\]*$/.test(searchInput.value);
  }

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

  validateCreateStorePhone(inputPhone) {
    if (!inputPhone.value) {
      return "Phone can not be empty!";
    } else {
      return "OK";
    }
  }

  validateCreateStoreFloorArea(inputFloorArea) {
    if (inputFloorArea.value && +inputFloorArea.value <= 0) {
      return "Floor area must be positive!";
    } else {
      return "OK";
    }
  }

  validateProductName(inputName) {
    if (!inputName.value) {
      return "Name can not be empty!";
    } else {
      return "OK";
    }
  }

  validateProductPrice(inputPrice) {
    if (inputPrice.value && +inputPrice.value <= 0) {
      return "Price must be positive!";
    } else {
      return "OK";
    }
  }

  validateProductSpecs(inputSpecs) {
    if (!inputSpecs.value) {
      return "Specs can not be empty!";
    } else {
      return "OK";
    }
  }

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

  async getData(endPoint) {
    try {
      const response = await fetch(`${Model.API_PREFIX}${endPoint}`, {
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

  async getSearchedStoresList(searchFilterValue) {
    try {
      let neededURL = Model.GET_ENDPOINT.STORES;
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
      console.error(
        `Error while fetching stores list. Reason: ${error.message}`
      );
      throw new Error(
        `Error while fetching stores list. Reason: ${error.message}`
      );
    }
  }

  async getStoreById(storeId) {
    try {
      return await getData(
        Model.GET_ENDPOINT.STORE_BY_ID.replace("{storeId}", storeId)
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

  async getSearchedProductsListByStoreId(storeId, searchFilterValue) {
    try {
      let neededURL = Model.GET_ENDPOINT.PRODUCTS_BY_STORE_ID.replace(
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

  async getFullFilteredProductsListByStoreId(
    storeId,
    { filterId, sortKey, sortOrder, searchFilterValue }
  ) {
    try {
      let neededURL = Model.GET_ENDPOINT.PRODUCTS_BY_STORE_ID.replace(
        "{storeId}",
        storeId
      );
      const filterObj = {};

      if (searchFilterValue) {
        if (filterId && filterId !== Model.FILTER_ID.ALL) {
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
            Status: getProductsFilterTypeById(filterId),
          };
        }
      }

      if (sortKey && sortOrder && sortOrder !== Model.SORT_ORDER.DEFAULT) {
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

  async getProductById(productId) {
    try {
      return await getData(
        Model.GET_ENDPOINT.PRODUCT_BY_ID.replace("{productId}", productId)
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

  async postData(endPoint, data) {
    try {
      const response = await fetch(`${Model.API_PREFIX}${endPoint}`, {
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

  async postStore(storeObj) {
    try {
      return await postData(Model.POST_ENDPOINT.STORE, storeObj);
    } catch (error) {
      console.error(`Error while posting store. Reason: ${error.message}`);
      throw new Error(`Error while posting store. Reason: ${error.message}`);
    }
  }

  async postProduct(storeId, productObj) {
    try {
      return await postData(
        Model.POST_ENDPOINT.PRODUCT_BY_STORE_ID.replace("{storeId}", storeId),
        productObj
      );
    } catch (error) {
      console.error(`Error while posting product. Reason: ${error.message}`);
      throw new Error(`Error while posting product. Reason: ${error.message}`);
    }
  }

  async putData(endPoint, data) {
    try {
      const response = await fetch(`${Model.API_PREFIX}${endPoint}`, {
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

  async editProduct(productId, productObj) {
    try {
      return await putData(
        Model.PUT_ENDPOINT.PRODUCT_BY_ID.replace("{productId}", productId),
        productObj
      );
    } catch (error) {
      console.error(`Error while editing product. Reason: ${error.message}`);
      throw new Error(`Error while editing product. Reason: ${error.message}`);
    }
  }

  async deleteData(endPoint) {
    try {
      const response = await fetch(`${Model.API_PREFIX}${endPoint}`, {
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

  async deleteStoreProducts(storeId) {
    try {
      return await deleteData(
        Model.DELETE_ENDPOINT.PRDOCUTS_BY_STORE_ID.replace("{storeId}", storeId)
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

  async deleteStore(storeId) {
    try {
      return await deleteData(
        Model.DELETE_ENDPOINT.STORE_BY_ID.replace("{storeId}", storeId)
      );
    } catch (error) {
      console.error(`Error while deleting store. Reason: ${error.message}`);
      throw new Error(`Error while deleting store. Reason: ${error.message}`);
    }
  }

  async deleteProduct(productId) {
    try {
      return await deleteData(
        Model.DELETE_ENDPOINT.PRODUCT_BY_ID.replace("{productId}", productId)
      );
    } catch (error) {
      console.error(`Error while deleting product. Reason: ${error.message}`);
      throw new Error(`Error while deleting product. Reason: ${error.message}`);
    }
  }
}
