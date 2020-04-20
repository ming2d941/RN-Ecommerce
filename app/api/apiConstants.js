/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * API constants - API constants, url end points etc.
 */

import Constants from '../config/constants';

const ApiConstants = {
  BASE_URL: Constants.APP_BASE_URL,
  API_GET_CATEGORIES: '/categories/all',
  API_GET_PRODUCTS: '/products',
  FILTER: '/getlayered',
  API_REGISTER_USER: '/customers',
  API_GET_STORES: '/store/storeGroups',
  API_GET_STORES_VIEW: '/store/storeViews',
  API_LOGIN: '/integration/customer/token',
  API_STORE_CONFIGURATION: '/store/storeConfigs',
  API_PRODUCT_SIZES: '/products/attributes/178',
  API_PRODUCT_COLORS: '/productsswatches/93',
  // API_PRODUCT_COLORS: '/products/attributes/93',
  API_PRODUCT_GRADES: '/products/attributes/219',
  API_PRODUCT_STYLES: '/products/attributes/216',
  API_PRODUCT_ATTACHMENTS: '/products/attributes/218',
  API_PRODUCT_BRANDS: '/products/attributes/217',
  API_PRODUCT_STYLE_INCH: '/products/attributes/215',
  API_HOME: '/custom/homepage',
  API_GET_USER_INFO: '/customers/me',
  API_GET_WISHLIST: '/wishlist/product',
  API_REMOVE_WISHLIST_ITEM: '/wishlist/remove',
  API_ADD_WISHLIST_ITEM: '/wishlist/add',
  API_GET_PRODUCTS_IN_CATEGORY: '/customproducts/searchCriteria',
  API_PASSWORD_CHANGE: '/customers/me/password',
  API_GUEST_CART: '/guest-carts',
  API_GUEST_ADD_TO_CART: '/guest-carts/57/items',
  API_USER_CART_ID: '/carts/mine',
  API_GET_LOGGED_USER_CART: '/carts/mine/items',
  API_ADD_ADDRESS: '/customers/me',
  API_PRODUCT_CART: '/carts/mine/items',
  API_PRODUCT_DETAIL: '/customproducts/sku',
  API_PRODUCT_360_IMAGES: '/360details/sku',
  API_PRODUCT_HISTORY: '/orders',
  API_PRDUCT_UPDATE_CART_LOGGED_USER: '/cart',
  API_CONTACT_US: '/contactUs',
  API_DELETE_ADDRESS: '/deleteAddress',
};

export default ApiConstants;
