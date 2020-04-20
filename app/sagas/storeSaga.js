/* Redux saga class
 */
import {put, call, select, all} from 'redux-saga/effects';
import {
  getStoresAPI,
  getStoresViewAPI,
  getAllCategoriesAPI,
  getStoreConfigurationAPI,
  getProductSizesAPI,
  getProductColorsAPI,
  getProductGradesAPI,
  getProductStylesAPI,
  getProductAttachmentAPI,
  getProductStyleInchAPI,
  getProductBrandAPI,
} from '../api/apiMethods';
import {showSingleAlert} from '../config/common';
import * as loadingActions from '../actions/loadingActions';
import * as categoryActions from '../actions/categoryActions';
import * as storeActions from '../actions/storeActions';
import {translate} from '../config/languageSwitching';

export function* getStoresSaga(action) {
  const {isNetworkAvailable} = yield select(state => state.appReducer);
  const {adminToken} = yield select(state => state.appReducer);
  if (!isNetworkAvailable) {
    showSingleAlert(translate('No internet connection'));
    return;
  }

  yield put(loadingActions.enableLoader());

  try {
    const {
      stores,
      storesView,
      categories,
      storeConfiguration,
      productsSizes,
      productsColors,
      productsGrades,
      productsStyles,
      productsAttachments,
      productsStyleInch,
      productsBrands,
    } = yield all({
      stores: call(getStoresAPI, adminToken),
      storesView: call(getStoresViewAPI, adminToken),
      categories: call(getAllCategoriesAPI, adminToken),
      storeConfiguration: call(getStoreConfigurationAPI, adminToken),
      productsSizes: call(getProductSizesAPI, adminToken),
      productsColors: call(getProductColorsAPI, adminToken),
      productsGrades: call(getProductGradesAPI, adminToken),
      productsStyles: call(getProductStylesAPI, adminToken),
      productsAttachments: call(getProductAttachmentAPI, adminToken),
      productsStyleInch: call(getProductStyleInchAPI, adminToken),
      productsBrands: call(getProductBrandAPI, adminToken),
    });
    console.log('API RESPONSE OF GET_STORES ', stores);
    console.log('API RESPONSE OF GET_STORES_VIEW ', storesView);
    console.log('API RESPONSE OF ALL CATEGORIES ', categories);
    console.log('API RESPONSE OF STORE CONFIGURATIONS', storeConfiguration);
    console.log('API RESPONSE OF productsSizes ', productsSizes);
    console.log('API RESPONSE OF productsColors ', productsColors);
    console.log('API RESPONSE OF productsGrades ', productsGrades);
    console.log('API RESPONSE OF productsStyles', productsStyles);
    console.log('API RESPONSE OF productsAttachments', productsAttachments);

    yield put(loadingActions.disableLoader({}));

    if (
      stores &&
      storesView &&
      categories &&
      storeConfiguration &&
      productsSizes &&
      productsColors &&
      productsGrades &&
      productsStyles &&
      productsAttachments &&
      productsStyleInch &&
      productsBrands
    ) {
      yield put(
        storeActions.updateStoreInfo(stores, storesView, storeConfiguration),
      );
      yield put(categoryActions.onCategoryResponse(categories));
      yield put(
        storeActions.updateFilterDatas(
          productsSizes,
          productsColors,
          productsGrades,
          productsStyles,
          productsAttachments,
          productsStyleInch,
          productsBrands,
        ),
      );

      if (action.getStoreInfoCallback) {
        action.getStoreInfoCallback(true);
      }
    } else {
      if (action.getStoreInfoCallback) {
        action.getStoreInfoCallback(false);
      }
    }
  } catch (error) {
    if (action.getStoreInfoCallback) {
      action.getStoreInfoCallback(false);
    }
    console.log('GET_STORES API ERROR!!!!', error);
    yield put(loadingActions.disableLoader({}));
  }
}
