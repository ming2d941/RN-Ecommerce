/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 18, 2020
 * Search History Reducer - handles search history state
 */

import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialState = {
  searchHistoryarray: [],
};

export const searchHistoryReducer = createReducer(initialState, {
  [types.UPDATE_SEARCH_HISTORY](state, actions) {
    return {
      ...state,
      searchHistoryarray: actions.newList,
    };
  },
  [types.USER_LOG_OUT](state, action) {
    return {
      ...state,
      searchHistoryarray: [],
    };
  },
});
