import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

const initialState = {
  banner_array: [],
  topCategory_array: [],
  topSales_array: [],
  bestSellers_array: [],
  newProducts_array: [],
  message: '',
};

export const homeReducer = createReducer(initialState, {
  [types.GET_HOME_REQUEST](state, action) {
    return {
      ...state,
      // banner_array: [],
      // topCategory_array: [],
      // topSales_array: [],
      // bestSellers_array: [],
      // newProducts_array: [],
      message: 'requesting',
    };
  },
  [types.GET_HOME_RESPONSE](state, action) {
    const bannerArray = action.response.filter(item => {
      return item.banners;
    });
    const topCategoryArray = action.response.filter(item => {
      return item.top_categories;
    });
    const topSalesArray = action.response.filter(item => {
      return item.top_sales;
    });
    const bestSellersArray = action.response.filter(item => {
      return item.best_sellers;
    });
    const newProductsArray = action.response.filter(item => {
      return item.new_products;
    });
    return {
      ...state,
      banner_array: bannerArray[0].banners,
      topCategory_array: topCategoryArray[0].top_categories,
      topSales_array: topSalesArray[0].top_sales,
      bestSellers_array: bestSellersArray[0].best_sellers,
      newProducts_array: newProductsArray[0].new_products,
      message: 'success',
    };
  },
  [types.GET_HOME_FAILED](state, action) {
    return {
      ...state,
      banner_array: [],
      topCategory_array: [],
      topSales_array: [],
      bestSellers_array: [],
      newProducts_array: [],
      message: 'failure',
    };
  },
});
