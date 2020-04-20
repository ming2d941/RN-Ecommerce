/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * ProductList - ProductList container
 */

import {connect} from 'react-redux';
import ProductListFromCategoryScreen from './ProductListFromCategory';
import React, {Component} from 'react';
import * as appActions from '../../actions/appActions';
import * as loginActions from '../../actions/loginActions';
import * as productsActions from '../../actions/productsActions';
import * as filterActions from '../../actions/filterResultAction';

class ProductListFromCategoryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ProductListFromCategoryScreen {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.appReducer.selectedLanguage,
    isLoading: state.loadingReducer.isLoading,
    isLoadingProductList: state.loadingReducer.isLoadingProductList,
    currency: state.appReducer.currency,
    isRTL: state.appReducer.selectedLanguage === 'ar' ? true : false,
    screenWidth: state.appReducer.screenWidth,
    screenHeight: state.appReducer.screenHeight,
    isHandset: state.appReducer.isHandset,
    orientation: state.appReducer.orientation,
    selectedFilters: state.filterListReducer.selectedFilters,
    categoryList: state.categoryListReducer.category_list,
    productsListOnCategory1: state.productsListReducer.productsListOnCategory1,
    productsListOnCategory2: state.productsListReducer.productsListOnCategory2,
    productsListOnCategory3: state.productsListReducer.productsListOnCategory3,
    productsListOnCategory4: state.productsListReducer.productsListOnCategory4,
    productsListOnCategory5: state.productsListReducer.productsListOnCategory5,
    productsListOnCategory6: state.productsListReducer.productsListOnCategory6,
    productsListOnCategory7: state.productsListReducer.productsListOnCategory7,
    productsListOnCategory8: state.productsListReducer.productsListOnCategory8,
    productsListOnCategory9: state.productsListReducer.productsListOnCategory9,
    productsListOnCategory10:
      state.productsListReducer.productsListOnCategory10,
    cartArray:
      state.appReducer.userToken.length > 0
        ? state.cartReducer.cartArray
        : state.cartReducer.guestCartArray,
    wishList: state.loginReducer.wishList,
    userToken: state.appReducer.userToken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    didChangeLAnguage: language => {
      dispatch(appActions.onChangeLanguage(language));
    },
    clearCategoryProducts: () => {
      dispatch(productsActions.clearCategoryProducts());
    },
    clearFilters: () => {
      dispatch(filterActions.resetFilters());
    },
    getCategoryProductsList: (
      pageIndex,
      pageCount,
      categoryType,
      categoryId,
      filterparams,
      getCategoryProductsListCallback,
    ) => {
      dispatch(
        productsActions.getCategoryProductsList(
          pageIndex,
          pageCount,
          categoryType,
          categoryId,
          filterparams,
          getCategoryProductsListCallback,
          true,
        ),
      );
    },
    onLikeTap: (productId, likeCallback) => {
      dispatch(loginActions.addItemToWishlist(productId, likeCallback));
    },
    onDislikeTap: (productId, removeCallback) => {
      dispatch(loginActions.removeItemFromWishlist(productId, removeCallback));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductListFromCategoryContainer);
