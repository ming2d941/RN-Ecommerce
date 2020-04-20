/**
 * Created by Arun for iLeaf Solutions Pvt.Ltd
 * on March 16, 2020
 * CartActions - actions for category related operations
 */

import * as types from './types';

export function getProuctsInCart() {
  return {
    type: types.GET_PRODUCTS_IN_CART,
  };
}

export function addProductToCartLoggedUser(params, callback) {
  return {
    type: types.ADD_PRODUCT_TO_CART_LOGGEDUSER,
    params,
    callback,
  };
}

export function cartProductsList(response) {
  return {
    type: types.CART_PRODUCT_LIST,
    response,
  };
}

export function cartProductsCallFailed() {
  return {
    type: types.GET_PRODUCTS_IN_CART_FAILED,
  };
}

export function updateCartProducts(product) {
  return {
    type: types.UPDATE_CART_PRODUCT_LIST,
    product,
  };
}

export function updateGuestCartProducts(product) {
  return {
    type: types.UPDATE_GUEST_CART_PRODUCT_LIST,
    product,
  };
}

export function removeProductFromCart() {
  return {
    type: types.REMOVE_PRODUCT_FROM_CART,
    response,
  };
}

export function addProductFromCartToWishList(
  entityId,
  productId,
  addProductToWishListCallback,
) {
  return {
    type: types.ADD_CART_PRODUCT_TO_WISHLIST,
    entityId,
    productId,
    addProductToWishListCallback,
  };
}

export function updateGuestCart(
  productid,
  updateGuestCartCallback,
  params,
  index,
) {
  return {
    type: types.UPDATE_GUEST_CART,
    productid,
    updateGuestCartCallback,
    params,
    index,
  };
}

export function updateUserCart(params, updateCallback, productid) {
  return {
    type: types.UPDATE_USER_CART,
    params,
    updateCallback,
    productid,
  };
}

export function removeGuestCart(productid, removeGuestCartCallback, index) {
  return {
    type: types.REMOVE_GUEST_CART,
    productid,
    removeGuestCartCallback,
    index,
  };
}

export function removeUserCart(productid, removeUserCartCallback) {
  return {
    type: types.REMOVE_USER_CART,
    productid,
    removeUserCartCallback,
  };
}

export function getTotalCost(getTotalCostCallback) {
  return {
    type: types.GET_TOTAL_CART_COST,
    getTotalCostCallback,
  };
}
