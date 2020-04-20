/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * App Reducer - handles app common states
 */

import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
const {width, height} = Dimensions.get('window');
import {Dimensions} from 'react-native';

const initialState = {
  userToken: '',
  adminToken: 'pi97uov11pk3gzyavah0xsiiaqaxby8v',
  guestToken: '',
  quoteId: '',
  isNetworkAvailable: false,
  isHandset: true,
  selectedLanguage: 'en',
  screenWidth: width,
  screenHeight: height,
  orientation: 'PORTRAIT',
  stores: [],
  storesView: [],
  storeCode: '',
  currency: '',
  storeConfiguration: [],
  productsSizes: [],
  productsColors: [],
  productsGrades: [],
  productsStyles: [],
  productsAttachments: [],
  productsBrands: [],
};

export const appReducer = createReducer(initialState, {
  [types.APP_NETWORK_STATUS](state, action) {
    return {
      ...state,
      isNetworkAvailable: action.networkStatus,
    };
  },
  [types.UPDATE_DEVICE_TYPE](state, action) {
    return {
      ...state,
      isHandset: action.deviceType === 'Handset' ? true : false,
    };
  },
  [types.APP_LANGUAGE_CHANGE](state, action) {
    return {
      ...state,
      selectedLanguage: action.language,
    };
  },
  [types.ORIENTATION_CHANGE](state, action) {
    return {
      ...state,
      screenWidth: action.screenWidth,
      screenHeight: action.screenHeight,
      orientation: action.orientation,
    };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      userToken: action.response,
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      userToken: '',
    };
  },
  [types.USER_LOGOUT](state) {
    return {
      ...state,
      userToken: '',
    };
  },
  [types.UPDATE_GUEST_TOKEN](state, action) {
    return {
      ...state,
      guestToken: action.guestToken,
      quoteId: action.quoteId,
      userToken: '',
    };
  },
  [types.GET_STORES_RESPONSE](state, action) {
    return {
      ...state,
      stores: action.storesList,
    };
  },
  [types.UPDATE_STORES_INFO](state, action) {
    return {
      ...state,
      stores: action.storesList,
      storesView: action.storesViewList,
      storeConfiguration: action.storeConfiguration,
    };
  },
  [types.UPDATE_FILTER_DATAS](state, action) {
    console.log('action.productsColors ...++', action.productsColors);
    return {
      ...state,
      productsSizes: action.productsSizes.options,
      productsColors: action.productsColors[0].options,
      productsGrades: action.productsGrades.options,
      productsStyles: action.productsStyles.options,
      productsAttachments: action.productsAttachments.options,
      productsBrands: action.productsBrands.options,
      productsStylesInch: action.productsStyleInch.options,
    };
  },
  [types.APP_STORE_CODE_CHANGE](state, action) {
    return {
      ...state,
      storeCode: action.code,
      guestToken: '',
      quoteId: '',
    };
  },
  [types.APP_UPDATE_CURRENCY](state, action) {
    return {
      ...state,
      currency: action.currency,
    };
  },
  [types.USER_LOG_OUT](state, action) {
    return {
      ...state,
      userToken: '',
      guestToken: '',
      quoteId: '',
    };
  },
  [types.CLEAR_QUOTE_ID](state, action) {
    return {
      ...state,
      guestToken: '',
      quoteId: '',
    };
  },
});
