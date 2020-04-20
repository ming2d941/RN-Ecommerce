/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 02, 2020
 * ProductsActions - Actions for products listing
 */

import * as types from './types';

export function getProductsList(pageIndex, pageCount, getProductListCallback) {
  return {
    type: types.GET_PRODUCTS_LIST,
    pageIndex,
    pageCount,
    getProductListCallback,
  };
}

export function getCategoryProductsList(
  pageIndex,
  pageCount,
  categoryType,
  categoryId,
  filterParams,
  getCategoryProductsListCallback,
  fromHome,
) {
  return {
    type: types.GET_CATEGORY_PRODUCTS_LIST,
    pageIndex,
    pageCount,
    categoryType,
    categoryId,
    filterParams,
    getCategoryProductsListCallback,
    fromHome,
  };
}

export function getProductDetail(productId, productDetailsCallback) {
  return {
    type: types.GET_PRODUCT_DETAIL,
    productId,
    productDetailsCallback,
  };
}

export function updateProductDetails(productDetailsDict) {
  return {
    type: types.UPDATE_PRODUCT_DETAIL,
    productDetailsDict,
  };
}

export function updateCategoryProductList(categoryProductList, categoryType) {
  return {
    type: types.UPDATE_CATEGORY_PRODUCTS_LIST,
    categoryProductList,
    categoryType,
  };
}

export function updateCategoryProductListFromCategory(
  categoryProductList,
  categoryType,
) {
  return {
    type: types.UPDATE_CATEGORY_PRODUCTS_LIST_FROM_CATEGORY,
    categoryProductList,
    categoryType,
  };
}

export function clearCategoryProducts() {
  return {
    type: types.CLEAR_CATEGORY_PRODUCTS_LIST,
  };
}

export function clearCategoryProductsFromCategory() {
  return {
    type: types.CLEAR_CATEGORY_PRODUCTS_LIST_FROM_CATEGORY,
  };
}

// export function getDegreeImage() {
//   alert('productId');
//   return {
//     type: types.GET_ROTTATION_IMGAGES_ARRAY,
//   };
// }

export function get360Images(productId, callback) {
  return {
    type: types.GET_ROTTATION_IMGAGES_ARRAY,
    productId,
    callback,
  };
}
