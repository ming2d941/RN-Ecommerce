/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 28, 2020
 * SearchSaga - handles searching of products
 */

import {put, call, select} from 'redux-saga/effects';
import {getSearchProductsAPI} from '../api/apiMethods';
import * as loadingActions from '../actions/loadingActions';
import * as searchActions from '../actions/searchActions';
import {showSingleAlert} from '../config/common';
import {translate} from '../config/languageSwitching';

export function* getProductsBySearchTextSaga(action) {
  const {isNetworkAvailable, adminToken, storeCode} = yield select(
    state => state.appReducer,
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate('No internet connection'));
    return;
  }

  yield put(loadingActions.enableLoader());

  try {
    let params = {
      'searchCriteria[filter_groups][0][filters][0][field]': 'name',
      'searchCriteria[filter_groups][0][filters][0][value]':
        '%' + action.searchText + '%',
      'searchCriteria[filter_groups][0][filters][0][condition_type]': 'like',
      'searchCriteria[filter_groups][2][filters][0][field]': 'visibility',
      'searchCriteria[filter_groups][2][filters][0][value]': 4,
      'searchCriteria[filter_groups][2][filters][0][condition_type]': 'eq',
    };
    const response = yield call(
      getSearchProductsAPI,
      params,
      storeCode,
      adminToken,
    );
    console.log('API RESPONSE OF SEARCH PRODUCTS ', response);
    yield put(loadingActions.disableLoader({}));

    if (response && response.items && response.items) {
      yield put(searchActions.updateProductSearchList(response.items));
    }

    // if (response.success) {
    //   yield put(loginActions.onLoginResponse(response.data));
    //   setTimeout(() => {
    //     Snackbar.show({
    //       title: 'You Have Successfully Logged In',
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }, 200);
    //   yield call(navigationActions.navigateToHomeScreen);
    //   yield put(loginActions.disableLoader({}));
    // } else {
    //   yield put(loginActions.loginFailed());
    //   yield put(loginActions.disableLoader({}));
    //   setTimeout(() => {
    //     Snackbar.show({
    //       title: response.Message,
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }, 200);
    // }
  } catch (error) {
    console.log('API ERROR!!!!', error);
    yield put(loadingActions.disableLoader({}));
  }
}
