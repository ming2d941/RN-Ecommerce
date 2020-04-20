/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 28, 2020
 * StoreActions - Actions for store related actions
 */

import * as types from './types';

export function getStores(getStoreInfoCallback) {
  return {
    type: types.GET_STORES,
    getStoreInfoCallback,
  };
}

export function getStoresView() {
  return {
    type: types.GET_STORES_VIEW,
  };
}

export function updateStoreInfo(
  storesList,
  storesViewList,
  storeConfiguration,
) {
  return {
    type: types.UPDATE_STORES_INFO,
    storesList,
    storesViewList,
    storeConfiguration,
  };
}

export function updateFilterDatas(
  productsSizes,
  productsColors,
  productsGrades,
  productsStyles,
  productsAttachments,
  productsStyleInch,
  productsBrands

) {
  return {
    type: types.UPDATE_FILTER_DATAS,
    productsSizes,
    productsColors,
    productsGrades,
    productsStyles,
    productsAttachments,
    productsStyleInch,
    productsBrands
  };
}
