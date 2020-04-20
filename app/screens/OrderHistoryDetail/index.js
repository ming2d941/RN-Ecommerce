import {connect} from 'react-redux';
import * as orderHistoryActions from '../../actions/orderHistoryActions';
import OrderHistoryDetailScreen from './OrderHistoryDetailScreen';
import React, {Component} from 'react';

class OrderHistoryDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <OrderHistoryDetailScreen {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    userToken: state.appReducer.userToken,
    selectedLanguage: state.appReducer.selectedLanguage,
    productsSizes: state.appReducer.productsSizes,
    productsColors: state.appReducer.productsColors,
    isLoading: state.loadingReducer.isLoading,
    isRTL: state.appReducer.selectedLanguage === 'ar' ? true : false,
    currency: state.appReducer.currency,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrderHistory: callback => {
      dispatch(orderHistoryActions.getOrderHistory(callback));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderHistoryDetailContainer);
