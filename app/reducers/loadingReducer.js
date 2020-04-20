/**
 * Created by ILeaf solutions
 * on July 03, 2019
 * Loading Reducer - Handles loading state.
 */

import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

const initialState = {
  isLoading: false,
  isLoadingProductList: false,
};

export const loadingReducer = createReducer(initialState, {
  [types.ENABLE_LOADER](state) {
    return {...state, isLoading: true};
  },
  [types.DISABLE_LOADER](state) {
    return {...state, isLoading: false};
  },
  [types.PRODUCT_LIST_ENABLE_LOADER](state) {
    return {
      ...state,
      isLoadingProductList: true,
    };
  },
  [types.PRODUCT_LIST_DISABLE_LOADER](state) {
    return {
      ...state,
      isLoadingProductList: false,
    };
  },
});
