/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 26, 2020
 * ProductDetailContainer -
 */

import {connect} from 'react-redux';
import React, {Component} from 'react';
import ProductDetailView from './ProductDetailView';
import * as appActions from '../../actions/appActions';
import * as guestActions from '../../actions/guestActions';
import * as loginActions from '../../actions/loginActions';
import * as productsActions from '../../actions/productsActions';
import * as cartActions from '../../actions/cartActions';

class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ProductDetailView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    isNetworkAvailable: state.appReducer.isNetworkAvailable,
    isLoading: state.loadingReducer.isLoading,
    selectedLanguage: state.appReducer.selectedLanguage,
    userToken: state.appReducer.userToken,
    quoteID: state.loginReducer.cartID,
    guestToken: state.appReducer.guestToken,
    isRTL: state.appReducer.selectedLanguage === 'ar' ? true : false,
    screenWidth: state.appReducer.screenWidth,
    screenHeight: state.appReducer.screenHeight,
    orientation: state.appReducer.orientation,
    productDetails: state.productDetailReducer.productDetails,
    currency: state.appReducer.currency,
    productsSizes: state.appReducer.productsSizes,
    productsColors: state.appReducer.productsColors,
    cartArray:
      state.appReducer.userToken.length > 0
        ? state.cartReducer.cartArray
        : state.cartReducer.guestCartArray,
    wishList: state.loginReducer.wishList,
    guestInfo: state.loginReducer.guestInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    didChangeLAnguage: language => {
      dispatch(appActions.onChangeLanguage(language));
    },
    getProductDetail: (productId, productDetailsCallback) => {
      dispatch(
        productsActions.getProductDetail(productId, productDetailsCallback),
      );
    },
    createGuestCart: createGuestCartCallback => {
      dispatch(guestActions.createGuestCart(createGuestCartCallback));
    },
    guestAddToCart: (params, guestAddToCartCallback) => {
      dispatch(guestActions.guestAddToCart(params, guestAddToCartCallback));
    },
    onLikeTap: (productId, likeCallback) => {
      dispatch(loginActions.addItemToWishlist(productId, likeCallback));
    },
    onDislikeTap: (productId, removeCallback) => {
      dispatch(loginActions.removeItemFromWishlist(productId, removeCallback));
    },
    addPtoCartForLoggedUser: (params, callBack) => {
      dispatch(cartActions.addProductToCartLoggedUser(params, callBack));
    },
    getTotalCost: getTotalCostCallback => {
      dispatch(cartActions.getTotalCost(getTotalCostCallback));
    },
    get360Images: (productId, callBack) => {
      dispatch(productsActions.get360Images(productId, callBack));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailContainer);
