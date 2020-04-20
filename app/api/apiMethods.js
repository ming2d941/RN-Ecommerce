/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * API Methods -
 */

import ApiConstants from './apiConstants';
import Api from './index';

export function loginUser(username, password) {
  return Api(
    ApiConstants.API_LOGIN,
    {username: username, password: password},
    'post',
    null,
  );
}

export function getUserInfoAPI(userToken) {
  return Api(ApiConstants.API_GET_USER_INFO, null, 'get', null, userToken);
}

export function registerUser(firstName, lastName, email, storeId, password) {
  return Api(
    ApiConstants.API_REGISTER_USER,
    {
      customer: {
        email: email,
        firstname: firstName,
        lastname: lastName,
        store_id: storeId,
      },
      password: password,
    },
    'post',
    null,
  );
}

export function profileUpdate(userInfo, userToken) {
  return Api(
    ApiConstants.API_GET_USER_INFO,
    {customer: userInfo},
    'put',
    null,
    userToken,
  );
}

export function getWishlist(userToken) {
  return Api(ApiConstants.API_GET_WISHLIST, null, 'get', null, userToken);
}

export function removeWishlistItem(productId, userToken) {
  return Api(
    ApiConstants.API_REMOVE_WISHLIST_ITEM + '/' + productId,
    null,
    'post',
    null,
    userToken,
  );
}

export function addWishlistItem(productId, userToken) {
  return Api(
    ApiConstants.API_ADD_WISHLIST_ITEM + '/' + productId,
    null,
    'post',
    null,
    userToken,
  );
}

export function passwordUpdate(oldPassword, newPassword, userToken) {
  return Api(
    ApiConstants.API_PASSWORD_CHANGE,
    {currentPassword: oldPassword, newPassword: newPassword},
    'put',
    null,
    userToken,
  );
}

export function getStoresAPI(adminToken) {
  return Api(ApiConstants.API_GET_STORES, null, 'get', null, adminToken);
}

export function getStoresViewAPI(adminToken) {
  return Api(ApiConstants.API_GET_STORES_VIEW, null, 'get', null, adminToken);
}

export function getAllCategoriesAPI(adminToken) {
  return Api(ApiConstants.API_GET_CATEGORIES, null, 'get', null, adminToken);
}

export function addAddressAPI(params, userToken) {
  return Api(ApiConstants.API_ADD_ADDRESS, params, 'put', null, userToken);
}

export function deleteAddressAPI(params, userToken) {
  return Api(
    ApiConstants.API_DELETE_ADDRESS + '/' + params,
    null,
    'post',
    null,
    userToken,
  );
}

export function addProductToCart(params, userToken) {
  return Api(ApiConstants.API_PRODUCT_CART, params, 'post', null, userToken);
}

export function getCartProducts(userToken) {
  return Api(
    ApiConstants.API_GET_LOGGED_USER_CART,
    null,
    'get',
    null,
    userToken,
  );
}

export function getCartID(userToken, storeCode) {
  return Api(ApiConstants.API_USER_CART_ID, null, 'post', storeCode, userToken);
}

export function getStoreConfigurationAPI(adminToken) {
  return Api(
    ApiConstants.API_STORE_CONFIGURATION,
    null,
    'get',
    null,
    adminToken,
  );
}

export function getProductSizesAPI(adminToken) {
  return Api(ApiConstants.API_PRODUCT_SIZES, null, 'get', null, adminToken);
}

export function getProductColorsAPI(adminToken) {
  return Api(ApiConstants.API_PRODUCT_COLORS, null, 'get', null, adminToken);
}

export function getProductGradesAPI(adminToken) {
  return Api(ApiConstants.API_PRODUCT_GRADES, null, 'get', null, adminToken);
}

export function getProductStylesAPI(adminToken) {
  return Api(ApiConstants.API_PRODUCT_STYLES, null, 'get', null, adminToken);
}

export function getProductAttachmentAPI(adminToken) {
  return Api(
    ApiConstants.API_PRODUCT_ATTACHMENTS,
    null,
    'get',
    null,
    adminToken,
  );
}

export function getProductBrandAPI(adminToken) {
  return Api(ApiConstants.API_PRODUCT_BRANDS, null, 'get', null, adminToken);
}
export function getProductStyleInchAPI(adminToken) {
  return Api(
    ApiConstants.API_PRODUCT_STYLE_INCH,
    null,
    'get',
    null,
    adminToken,
  );
}

export function getSearchProductsAPI(params, storeCode, adminToken) {
  return Api(
    ApiConstants.API_GET_PRODUCTS,
    params,
    'get',
    storeCode,
    adminToken,
  );
}

export function getProductDetailAPI(productId, storeCode, adminToken) {
  return Api(
    ApiConstants.API_PRODUCT_DETAIL,
    productId,
    'get',
    storeCode,
    adminToken,
  );
}

export function getFilterProductDetails(filters, storeCode, adminToken) {
  return Api(
    ApiConstants.API_GET_PRODUCTS,
    filters,
    'get',
    storeCode,
    adminToken,
  );
}

export function getAllFilters(id, storeCode, adminToken) {
  return Api(ApiConstants.FILTER, id, 'get', storeCode, adminToken);
}

export function getHomePageDetails(storeCode, adminToken) {
  return Api(ApiConstants.API_HOME, null, 'get', storeCode, adminToken);
}

export function getCategoryProductsAPI(params, storeCode, adminToken) {
  console.log('params-------', JSON.stringify(params));

  let url =
    ApiConstants.API_GET_PRODUCTS_IN_CATEGORY + '/' + JSON.stringify(params);

  console.log('params----url---', url);
  return Api(url, null, 'get', storeCode, adminToken);
}

export function createGuestCartAPI(storeCode, adminToken) {
  return Api(ApiConstants.API_GUEST_CART, null, 'post', storeCode, adminToken);
}

export function guestAddToCartAPI(params, quoteId, storeCode, adminToken) {
  return Api(
    ApiConstants.API_GUEST_CART + '/' + quoteId + '/items',
    params,
    'post',
    null,
    adminToken,
  );
}

export function updateGuestCartAPI(params, guesttoken, productID, adminToken) {
  return Api(
    ApiConstants.API_GUEST_CART + '/' + guesttoken + '/items',
    params,
    'post',
    null,
    adminToken,
  );
}
export function updateGuestProductsAPI(guesttoken, adminToken) {
  return Api(
    ApiConstants.API_GUEST_CART + '/' + guesttoken + '/items',
    null,
    'get',
    null,
    adminToken,
  );
}

export function deleteGuestCartAPI(guesttoken, productID, adminToken) {
  return Api(
    ApiConstants.API_GUEST_CART + '/' + guesttoken + '/items/' + productID,
    null,
    'delete',
    null,
    adminToken,
  );
}
export function deleteCartAPI(productID, userToken) {
  return Api(
    ApiConstants.API_PRODUCT_CART + '/' + productID,
    null,
    'delete',
    null,
    userToken,
  );
}

export function updateLoggedUserCartAPI(params, productid, userToken) {
  return Api(ApiConstants.API_PRODUCT_CART, params, 'post', null, userToken);

  return Api(ApiConstants.API_PRODUCT_CART, params, 'post', null, userToken);
}

export function getGuestquoteIdAPI(guestToken, storeCode, adminToken) {
  return Api(
    ApiConstants.API_GUEST_CART + '/' + guestToken,
    null,
    'get',
    storeCode,
    adminToken,
  );
}

export function get360DegreeImagesAPI(productId, storeCode, adminToken) {
  return Api(
    ApiConstants.API_PRODUCT_360_IMAGES,
    productId,
    'get',
    storeCode,
    adminToken,
  );
}

export function setShipmentGuestAPI(params, storeCode, guestToken, adminToken) {
  return Api(
    '/guest-carts/' + guestToken + '/shipping-information',
    params,
    'post',
    storeCode,
    adminToken,
  );
}

export function setShipmentLoggedUserAPI(params, storeCode, userToken) {
  return Api(
    '/carts/mine/shipping-information',
    params,
    'post',
    storeCode,
    userToken,
  );
}

export function placeOrderGuestAPI(params, storeCode, guestToken, adminToken) {
  return Api(
    '/guest-carts/' + guestToken + '/order',
    params,
    'put',
    storeCode,
    adminToken,
  );
}

export function placeOrderLoggedUserAPI(params, storeCode, userToken) {
  return Api('/carts/mine/order', params, 'put', storeCode, userToken);
}

export function getLoggedUserCartTotalCostAPI(storeCode, userToken) {
  return Api('/carts/mine/totals', null, 'get', storeCode, userToken);
}

export function getGuestCartTotalCostAPI(storeCode, guestToken, adminToken) {
  return Api(
    '/guest-carts/' + guestToken + '/totals',
    null,
    'get',
    storeCode,
    adminToken,
  );
}

export function getOrderHistoryApi(params, userToken) {
  return Api(ApiConstants.API_PRODUCT_HISTORY, params, 'get', null, userToken);
}

export function submitFeedback(name, email, phone, feedback) {
  return Api(
    ApiConstants.API_CONTACT_US,
    {name: name, email: email, phonenumber: phone, message: feedback},
    'post',
    null,
    null,
  );
}

export function applyVoucherCodeLoggedUserAPI(
  voucherCode,
  storeCode,
  userToken,
) {
  return Api(
    '/carts/mine/coupons/' + voucherCode,
    null,
    'put',
    storeCode,
    userToken,
  );
}

export function applyVoucherCodeGuestAPI(
  voucherCode,
  storeCode,
  guestToken,
  adminToken,
) {
  return Api(
    '/guest-carts/' + guestToken + '/coupons/' + voucherCode,
    null,
    'put',
    storeCode,
    adminToken,
  );
}

export function getPaymentMethodsLoggedUserAPI(storeCode, userToken) {
  return Api('/carts/mine/payment-methods', null, 'get', storeCode, userToken);
}

export function getPaymentMethodsGuestAPI(storeCode, guestToken, adminToken) {
  return Api(
    '/guest-carts/' + guestToken + '/payment-methods/',
    null,
    'get',
    storeCode,
    adminToken,
  );
}

export function getShipmentMethodsLoggedUserAPI(storeCode, userToken) {
  return Api('/carts/mine/shipping-methods', null, 'get', storeCode, userToken);
}

export function getShipmentMethodsGuestAPI(storeCode, guestToken, adminToken) {
  return Api(
    '/guest-carts/' + guestToken + '/shipping-methods/',
    null,
    'get',
    storeCode,
    adminToken,
  );
}
