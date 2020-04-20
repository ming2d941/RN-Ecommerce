/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * LoginActions - Actions for login
 */

import * as types from './types';

export function requestLogin(username, password, loginCallback) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
    loginCallback,
  };
}

export function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

export function updateCartId(id) {
  return {
    type: types.UPADTE_CART_ID,
    id,
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

export function requestRegister(
  firstName,
  lastName,
  email,
  password,
  registerCallback,
) {
  return {
    type: types.REGISTER_REQUEST,
    firstName,
    lastName,
    email,
    password,
    registerCallback,
  };
}

export function registerFailed() {
  return {
    type: types.REGISTER_FAILED,
  };
}

export function onRegisterResponse(response) {
  return {
    type: types.REGISTER_RESPONSE,
    response,
  };
}

export function updateUserInfo(userInfo, userName, password) {
  return {
    type: types.APP_UPDATE_USER_INFO,
    userInfo,
    userName,
    password,
  };
}

export function profileUpdateRequest(
  userInfo,
  oldPassword,
  newPassword,
  profileUpdateCallback,
) {
  return {
    type: types.PROFILE_UPDATE_REQUEST,
    userInfo,
    oldPassword,
    newPassword,
    profileUpdateCallback,
  };
}

export function onProfileUpdateResponse(response) {
  return {
    type: types.PROFILE_UPDATE_RESPONSE,
    response,
  };
}

export function updateWishList(wishListResponse) {
  return {
    type: types.USER_WISHLIST_RESPONSE,
    wishListResponse,
  };
}

export function removeItemFromWishlist(productId, removeCallback) {
  return {
    type: types.REMOVE_WISHLIST_ITEM,
    productId,
    removeCallback,
  };
}

export function addItemToWishlist(productId, addCallback) {
  return {
    type: types.ADD_WISHLIST_ITEM,
    productId,
    addCallback,
  };
}

export function userDidLogOut() {
  return {
    type: types.USER_LOG_OUT,
  };
}

export function updateGuestInfo(guestInfo) {
  return {
    type: types.UPDATE_GUEST_INFO,
    guestInfo,
  };
}

export function clearGuestCart() {
  return {
    type: types.GUEST_CART_CLEAR,
  };
}

export function onFeedbackSubmit(name, email, phone, onMyMind, callBack) {
  return {
    type: types.SUBMIT_CONTACT_US,
    name,
    email,
    phone,
    onMyMind,
    callBack,
  };
}
