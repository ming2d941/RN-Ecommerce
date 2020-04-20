/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * Login Reducer - handles login states in the app
 */

import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialState = {
  userInfo: null,
  wishList: [],
  cartID: '',
  userName: '',
  password: '',
  guestInfo: null,
};

export const loginReducer = createReducer(initialState, {
  [types.USER_LOGOUT](state) {
    return {
      ...state,
      userInfo: null,
    };
  },
  [types.REGISTER_RESPONSE](state, action) {
    return {
      ...state,
      userInfo: action.response,
    };
  },
  [types.APP_UPDATE_USER_INFO](state, action) {
    return {
      ...state,
      guestInfo: null,
      userInfo: action.userInfo,
      userName: action.userName,
      password: action.password,
    };
  },
  [types.REGISTER_FAILED](state) {
    return {
      ...state,
      userInfo: null,
    };
  },
  [types.UPADTE_CART_ID](state, action) {
    return {
      ...state,
      cartID: action.id,
    };
  },
  [types.PROFILE_UPDATE_RESPONSE](state, action) {
    return {
      ...state,
      userInfo: action.response,
    };
  },
  [types.USER_WISHLIST_RESPONSE](state, action) {
    return {
      ...state,
      wishList: action.wishListResponse,
    };
  },
  [types.USER_LOG_OUT](state, action) {
    return {
      ...state,
      userInfo: null,
      wishList: [],
      cartID: '',
      userName: '',
      password: '',
    };
  },
  [types.UPDATE_GUEST_INFO](state, action) {
    return {
      ...state,
      guestInfo: action.guestInfo,
    };
  },
});
