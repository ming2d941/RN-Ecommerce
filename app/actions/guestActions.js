/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 18, 2020
 * History Actions -  Actions for History data updations
 */

import * as types from './types';

export function createGuestCart(createGuestCartCallback) {
  return {
    type: types.CREATE_GUEST_CART,
    createGuestCartCallback,
  };
}

export function onCreateGuestCart(guestToken, quoteId) {
  return {
    type: types.UPDATE_GUEST_TOKEN,
    guestToken,
    quoteId,
  };
}

export function guestAddToCart(inputParams, guestAddToCartCallback) {
  return {
    type: types.GUEST_ADD_TO_CART,
    inputParams,
    guestAddToCartCallback,
  };
}

export function updateCartList(cartArray) {
  return {
    type: types.UPDATE_CART_LIST,
    cartArray,
  };
}

export function clearQuoteId() {
  return {
    type: types.CLEAR_QUOTE_ID,
  };
}
