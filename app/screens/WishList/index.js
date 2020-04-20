/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * WishListContainer -
 */

import {connect} from 'react-redux';
import React, {Component} from 'react';
import WishListView from './WishListView';
import * as appActions from '../../actions/appActions';
import * as productsActions from '../../actions/productsActions';
import * as loginActions from '../../actions/loginActions';

class WishListContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <WishListView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.appReducer.selectedLanguage,
    screenWidth: state.appReducer.screenWidth,
    screenHeight: state.appReducer.screenHeight,
    orientation: state.appReducer.orientation,
    productsList: state.productsListReducer.productsList,
    userToken: state.appReducer.userToken,
    wishList: state.loginReducer.wishList,
    currency: state.appReducer.currency,
    isHandset: state.appReducer.isHandset,
    cartArray:
      state.appReducer.userToken.length > 0
        ? state.cartReducer.cartArray
        : state.cartReducer.guestCartArray,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    didChangeLAnguage: language => {
      dispatch(appActions.onChangeLanguage(language));
    },
    getProductsList: (pageIndex, pageCount, getProductListCallback) => {
      dispatch(
        productsActions.getProductsList(
          pageIndex,
          pageCount,
          getProductListCallback,
        ),
      );
    },
    onRemoveTap: (productId, removeCallback) => {
      dispatch(loginActions.removeItemFromWishlist(productId, removeCallback));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishListContainer);
