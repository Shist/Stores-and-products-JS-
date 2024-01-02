"use strict";

class Model {
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
}
