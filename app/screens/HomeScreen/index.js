/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * HomeScreen - HomeScreen container
 */

import {connect} from 'react-redux';
import HomeScreen from './HomeScreen';
import React, {Component} from 'react';
import * as appActions from '../../actions/appActions';
import * as homeAction from '../../actions/homeAction';
import * as loginActions from '../../actions/loginActions';

class HomeScreenContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadHomePage();
  }

  render() {
    return <HomeScreen {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    screenWidth: state.appReducer.screenWidth,
    screenHeight: state.appReducer.screenHeight,
    selectedLanguage: state.appReducer.selectedLanguage,
    userToken: state.appReducer.userToken,
    currency: state.appReducer.currency,
    categoryList: state.categoryListReducer.category_list,
    isRTL: state.appReducer.selectedLanguage === 'ar' ? true : false,
    bannerArray: state.homeReducer.banner_array || [],
    topCategoryArray: state.homeReducer.topCategory_array || [],
    topSalesArray: state.homeReducer.topSales_array || [],
    bestSellersArray: state.homeReducer.bestSellers_array || [],
    newProductsArray: state.homeReducer.newProducts_array || [],
    loader: state.loadingReducer.isLoading,
    storeCode: state.appReducer.storeCode,
    cartArray:
      state.appReducer.userToken.length > 0
        ? state.cartReducer.cartArray
        : state.cartReducer.guestCartArray,
    wishList: state.loginReducer.wishList || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    didChangeLAnguage: language => {
      dispatch(appActions.onChangeLanguage(language));
    },
    loadHomePage: () => {
      dispatch(homeAction.homeRequest());
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
)(HomeScreenContainer);
