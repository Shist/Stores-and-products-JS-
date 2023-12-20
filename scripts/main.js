"use strict";

import { storesData } from "../data/data.js";

function updateStoresList(stores) {
  toggleNoStoresLayout(stores);

  const storesListSection = document.querySelector("#stores-list-layout");

  storesListSection.innerHTML = getStoresListStrForDOM(stores);

  storesListSection.addEventListener("click", (e) => {
    const currItemCard = e.target.closest(".stores-list-item");

    if ("storeId" in currItemCard.dataset) {
      updateAllStoreDetails(currItemCard.dataset.storeId);
    }
  });
}

function toggleNoStoresLayout(stores) {
  const noStoresLayout = document.querySelector("#no-stores-list-layout");

  if (stores.length) {
    noStoresLayout.classList.add("js-hidden-element");
  } else {
    noStoresLayout.classList.remove("js-hidden-element");
  }
}

function getStoresListStrForDOM(stores) {
  let storesListToAddStr = "";

  stores.forEach((store) => {
    storesListToAddStr += `
              <div class="stores-list-item" data-store-id="${store.id}">
                  <div class="stores-list-item__name-address-wrapper">
                      <h3 class="stores-list-item__name-headline">
                          ${store.Name}
                      </h3>
                      <span class="stores-list-item__address-text">
                          ${store.Address}
                      </span>
                  </div>
                  <div class="stores-list-item__area-data-wrapper">
                      <span class="stores-list-item__area-number">
                          ${store.FloorArea}
                      </span>
                      <span class="stores-list-item__area-unit">sq.m</span>
                  </div>
              </div>
              `;
  });

  return storesListToAddStr;
}

function updateAllStoreDetails(storeId) {
  highlightActiveStore(storeId);

  localStorage.setItem("currStoreId", storeId);

  showStoreDetailsTable();

  const storeObj = getStoreObjById(storeId);

  updateStoreContacts(storeObj);

  updateStoreFiltersData(storeObj);

  const productsTableHead = document.querySelector("#products-table-head");

  if (storeObj.rel_Products?.length) {
    productsTableHead.innerHTML = getStoreTableHeadStrForDOM(
      Object.entries(storeObj.rel_Products[0])
    );
  }

  setSortBtnsListener();

  const productsTableBody = document.querySelector("#products-table-body");

  productsTableBody.innerHTML = getStoreTableBodyStrForDOM(storeObj);
}

function highlightActiveStore(storeId) {
  const storeItems = document.querySelectorAll(".stores-list-item");

  storeItems.forEach((storeItem) => {
    storeItem.classList.remove("js-selected-item");

    if (storeItem.dataset.storeId === storeId) {
      storeItem.classList.add("js-selected-item");
    }
  });
}

function showStoreDetailsTable() {
  const storeDetailsWrapper = document.querySelector("#store-details-wrapper");
  const noStoreDetailsWrapper = document.querySelector(
    "#no-store-details-wrapper"
  );

  storeDetailsWrapper.classList.add("js-flex-element");
  noStoreDetailsWrapper.classList.add("js-hidden-element");
}

function getStoreTableHeadStrForDOM(titlePairs) {
  let tablesTitlesToAddStr = "";
  let titlesAmount = 0;

  titlePairs.forEach(([title, value]) => {
    if (title !== "Photo" && title !== "Status" && title !== "id") {
      titlesAmount++;
      const wrapperClassesStr =
        title === "Price"
          ? "products-table__product-field-wrapper products-table__product-field-wrapper_end"
          : "products-table__product-field-wrapper";
      tablesTitlesToAddStr += `
              <th class="products-table__product-field">
                <div class="${wrapperClassesStr}">
                  <button
                    class="products-table__product-field-sort-btn"
                    title="Sort"
                    data-sort-key="${title}"
                    data-sort-type="${typeof value}"
                    data-sort-state="default"
                  ></button>
                  <span class="products-table__product-field-name"
                    >${title.toString()}</span
                  >
                </div>
              </th>
              `;
    }
  });

  const tableHeadToAddStr = `<tr class="products-table__table-name-row">
                                  <th colspan="${titlesAmount}" class="products-table__table-name">
                                    Products
                                  </th>
                                </tr>
                                <tr
                                  class="products-table__product-specifications-row"
                                  id="product-table-titles-wrapper"
                                >${tablesTitlesToAddStr}</tr>`;

  return tableHeadToAddStr;
}

function getStoreObjById(storeId) {
  return storesData.find((nextStore) => nextStore.id.toString() === storeId);
}

function updateStoreContacts(store) {
  const storeEmailField = document.querySelector("#store-email");
  const storeEstDateField = document.querySelector("#store-est-date");
  const storePhoneField = document.querySelector("#store-phone");
  const storeFloorAreaField = document.querySelector("#store-floor-area");
  const storeAddressField = document.querySelector("#store-address");

  storeEmailField.textContent = store.Email;
  storeEstDateField.textContent = transformDateFromISO(store.Established);
  storeAddressField.textContent = store.Address;
  storePhoneField.textContent = store.PhoneNumber;
  storeFloorAreaField.textContent = store.FloorArea;
}

function transformDateFromISO(dateISO) {
  const inputDate = new Date(dateISO);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = inputDate.getDate();
  const month = months[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}

function updateStoreFiltersData(store) {
  const prodAmountField = document.querySelector("#all-prod-amount");
  const prodOkAmountField = document.querySelector("#ok-prod-amount");
  const prodStorageAmountField = document.querySelector("#storage-prod-amount");
  const prodOutOfStockAmountField = document.querySelector(
    "#out-of-stock-prod-amount"
  );

  const amountsData = getStoreProductsAmounts(store);

  prodAmountField.textContent = amountsData.all;
  prodOkAmountField.textContent = amountsData.ok;
  prodStorageAmountField.textContent = amountsData.storage;
  prodOutOfStockAmountField.textContent = amountsData.outOfStock;
}

function getStoreProductsAmounts(store) {
  const amountsData = {
    all: "rel_Products" in store ? store.rel_Products.length : 0,
    ok: 0,
    storage: 0,
    outOfStock: 0,
  };

  store.rel_Products?.forEach((product) => {
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
          `Store with id=${store.id} had product with unknown status type: ${product.Status}`
        );
    }
  });

  return amountsData;
}

function getStoreTableBodyStrForDOM(store, sortFunction) {
  let storeDetailsTableToAddStr = "";
  let products = store.rel_Products?.slice();

  if (sortFunction) {
    products = products.sort(sortFunction);
  }

  products?.forEach((product) => {
    storeDetailsTableToAddStr += `
              <tr class="product-table-item">
                <td class="product-table-item__name">
                  <div class="product-table-item__name-num-wrapper">
                    <span class="product-table-item__name-text"
                      >${product.Name}</span
                    >
                    <span class="product-table-item__num-text">${
                      product.id
                    }</span>
                  </div>
                </td>
                <td class="product-table-item__price">
                  <div class="product-table-item__price-wrapper">
                    <span class="product-table-item__price-value">${
                      product.Price
                    }</span>
                    <span class="product-table-item__price-currency">USD</span>
                  </div>
                </td>
                <td class="product-table-item__specs">
                  <span
                    class="product-table-item__specs-text"
                    title="${product.Specs}"
                    >${product.Specs}</span
                  >
                </td>
                <td class="product-table-item__supplier-info">
                  <span
                    class="product-table-item__supplier-info-text"
                    title="${product.SupplierInfo}"
                    >${product.SupplierInfo}</span
                  >
                </td>
                <td class="product-table-item__country-of-origin">
                  <span class="product-table-item__country-of-origin-text"
                    >${product["Country of origin"]}</span
                  >
                </td>
                <td class="product-table-item__prod-company">
                  <span class="product-table-item__prod-company-text"
                    >${product["Prod. company"]}</span
                  >
                </td>
                <td class="product-table-item__rating">
                  <div class="product-table-item__stars-wrapper">
                    ${getProductStarsStrForDOM(product)}
                  </div>
                </td>
              </tr>
              `;
  });

  return storeDetailsTableToAddStr;
}

function getProductStarsStrForDOM(product) {
  let productStarsToAddStr = "";

  for (let k = 0; k < 5; k++) {
    if (k < product.Rating) {
      productStarsToAddStr += `<span class="yellow-star"></span>`;
    } else {
      productStarsToAddStr += `<span class="empty-star"></span>`;
    }
  }

  productStarsToAddStr += `<span class="right-arrow"></span>`;

  return productStarsToAddStr;
}

function setSearchStoresListeners() {
  const searchInput = document.querySelector("#search-store-line");
  const searchBtn = document.querySelector("#stores-search-btn");

  const filterAndUpdateStoresList = () => {
    const filteredStoresList = storesData.filter(
      (store) =>
        store.Name.toLowerCase().includes(searchInput.value) ||
        store.Address.toLowerCase().includes(searchInput.value) ||
        store.FloorArea.toString().includes(searchInput.value)
    );

    updateStoresList(filteredStoresList);
  };

  searchInput.addEventListener("search", filterAndUpdateStoresList);
  searchBtn.addEventListener("click", filterAndUpdateStoresList);
}

function setSortBtnsListener() {
  const productTableTitlesWrapper = document.querySelector(
    "#product-table-titles-wrapper"
  );

  productTableTitlesWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("products-table__product-field-sort-btn")) {
      const currSortBtn = e.target;
      const sortKey = currSortBtn.dataset.sortKey;
      const sortType = currSortBtn.dataset.sortType;
      const productsTableBody = document.querySelector("#products-table-body");
      const storeObj = getStoreObjById(localStorage.getItem("currStoreId"));

      switch (currSortBtn.dataset.sortState) {
        case "default":
          setAllSortBtnsToDefault();
          currSortBtn.dataset.sortState = "asc";
          currSortBtn.classList.add("js-asc-sort-btn");

          productsTableBody.innerHTML = getStoreTableBodyStrForDOM(
            storeObj,
            getCompareProductsFunction(sortType, sortKey, true)
          );

          break;
        case "asc":
          currSortBtn.dataset.sortState = "desc";
          currSortBtn.classList.remove("js-asc-sort-btn");
          currSortBtn.classList.add("js-desc-sort-btn");

          productsTableBody.innerHTML = getStoreTableBodyStrForDOM(
            storeObj,
            getCompareProductsFunction(sortType, sortKey, false)
          );

          break;
        case "desc":
          currSortBtn.dataset.sortState = "default";
          currSortBtn.classList.remove("js-desc-sort-btn");

          productsTableBody.innerHTML = getStoreTableBodyStrForDOM(storeObj);

          break;
        default:
          console.warn(
            `One of sort buttons had unknown data-sort-state type: ${e.target.dataset.sortState}`
          );
      }
    }
  });
}

function setAllSortBtnsToDefault() {
  const sortBtns = document.querySelectorAll(
    ".products-table__product-field-sort-btn"
  );

  sortBtns.forEach((btn) => {
    btn.classList.remove("js-asc-sort-btn", "js-desc-sort-btn");
    btn.dataset.sortState = "default";
  });
}

function getCompareProductsFunction(sortType, sortKey, isAsc) {
  return (prodA, prodB) => {
    if (isAsc) {
      return sortType === "number"
        ? prodA[sortKey] - prodB[sortKey]
        : prodA[sortKey].localeCompare(prodB[sortKey]);
    } else {
      return sortType === "number"
        ? prodB[sortKey] - prodA[sortKey]
        : prodB[sortKey].localeCompare(prodA[sortKey]);
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  updateStoresList(storesData);

  setSearchStoresListeners();
});
