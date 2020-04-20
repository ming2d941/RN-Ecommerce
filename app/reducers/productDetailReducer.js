/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 03, 2020
 * Products Details Reducer - Store the details of products in the app
 */

import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialState = {
  productDetails: {},
};

export const productDetailReducer = createReducer(initialState, {
  [types.UPDATE_PRODUCT_DETAIL](state, actions) {
    return {
      ...state,
      productDetails: actions.productDetailsDict,
    };
  },
});
