/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 28, 2020
 * Products List Reducer - Store the list of products in the app
 */

import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialState = {
  productsList: [],
  productsListOnCategory1: [],
  productsListOnCategory2: [],
  productsListOnCategory3: [],
  productsListOnCategory4: [],
  productsListOnCategory5: [],
  productsListOnCategory6: [],
  productsListOnCategory7: [],
  productsListOnCategory8: [],
  productsListOnCategory9: [],
  productsListOnCategory10: [],
};

export const productsListReducer = createReducer(initialState, {
  [types.UPDATE_PRODUCTS_LIST](state, actions) {
    return {
      ...state,
      productsList: actions.productsList,
    };
  },
  [types.CLEAR_CATEGORY_PRODUCTS_LIST](state, actions) {
    return {
      ...state,
      productsListOnCategory1: [],
      productsListOnCategory2: [],
      productsListOnCategory3: [],
      productsListOnCategory4: [],
      productsListOnCategory5: [],
      productsListOnCategory6: [],
      productsListOnCategory7: [],
      productsListOnCategory8: [],
      productsListOnCategory9: [],
      productsListOnCategory10: [],
    };
  },
  [types.UPDATE_CATEGORY_PRODUCTS_LIST](state, actions) {
    switch (actions.categoryType) {
      case 'categoryType1':
        return {
          ...state,
          productsListOnCategory1: actions.categoryProductList,
        };
      case 'categoryType2':
        return {
          ...state,
          productsListOnCategory2: actions.categoryProductList,
        };
      case 'categoryType3':
        return {
          ...state,
          productsListOnCategory3: actions.categoryProductList,
        };
      case 'categoryType4':
        return {
          ...state,
          productsListOnCategory4: actions.categoryProductList,
        };
      case 'categoryType5':
        return {
          ...state,
          productsListOnCategory5: actions.categoryProductList,
        };
      case 'categoryType6':
        return {
          ...state,
          productsListOnCategory6: actions.categoryProductList,
        };
      case 'categoryType7':
        return {
          ...state,
          productsListOnCategory7: actions.categoryProductList,
        };
      case 'categoryType8':
        return {
          ...state,
          productsListOnCategory8: actions.categoryProductList,
        };
      case 'categoryType9':
        return {
          ...state,
          productsListOnCategory9: actions.categoryProductList,
        };
      case 'categoryType10':
        return {
          ...state,
          productsListOnCategory10: actions.categoryProductList,
        };
    }

    return {
      ...state,
    };
  },
});
