/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 11, 2020
 * Cart Reducer - handles cart states
 */

import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

const initialState = {
  cartArray: [],
  guestCartArray: [],
};

//types.CART_PRODUCT_LIST
//types.UPDATE_CART_PRODUCT_LIST
//types.GET_PRODUCTS_IN_CART_FAILED
export const cartReducer = createReducer(initialState, {
  [types.GET_PRODUCTS_IN_CART](state, action) {
    return {
      ...state,
    };
  },
  [types.CART_PRODUCT_LIST](state, action) {
    return {
      ...state,
      cartArray: action.response,
      message: 'success',
    };
  },
  [types.UPDATE_CART_PRODUCT_LIST](state, action) {
    return {
      ...state,
      cartArray: action.product,
      message: 'success',
    };
  },
  [types.UPDATE_GUEST_CART_PRODUCT_LIST](state, action) {
    return {
      ...state,
      guestCartArray: action.product,
      message: 'success',
    };
  },
  [types.GET_PRODUCTS_IN_CART_FAILED](state, action) {
    return {
      ...state,
      message: 'failure',
    };
  },
  [types.UPDATE_CART_LIST](state, action) {
    return {
      ...state,
      guestCartArray: action.cartArray,
      message: 'failure',
    };
  },
  [types.USER_LOG_OUT](state, action) {
    return {
      ...state,
      cartArray: [],
      guestCartArray: [],
    };
  },
  [types.GUEST_CART_CLEAR](state, action) {
    return {
      ...state,
      guestCartArray: [],
    };
  },
  [types.APP_STORE_CODE_CHANGE](state) {
    return {
      ...state,
      guestCartArray: [],
      cartArray: [],
    };
  },
});
