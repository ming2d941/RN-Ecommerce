/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 20, 2020
 * CategorySaga - handles search history state
 */

import {put, call, select} from 'redux-saga/effects';
import {getAllCategoriesAPI} from '../api/apiMethods';
import * as loadingActions from '../actions/loadingActions';
import * as categoryActions from '../actions/categoryActions';

// //selector Function used to access reducer states
// export const getNetworkState = state => {
//   return {};
// };

// Our worker Saga that logins the user
export function* getAllCategoriesSaga(action) {
  const {isNetworkAvailable} = yield select(state => state.appReducer);

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(getAllCategoriesAPI);
    console.log('response from category list', response);
    yield put(categoryActions.onCategoryResponse(response));
    yield put(loadingActions.disableLoader({}));

    // if (response.success) {
    //   yield put(loginActions.onLoginResponse(response.data));
    //   setTimeout(() => {
    //     Snackbar.show({
    //       title: 'You Have Successfully Logged In',
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }, 200);
    //  yield call(navigationActions.navigateToHomeScreen);
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
