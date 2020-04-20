/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * WelcomeContainer -
 */

import {connect} from 'react-redux';
import React, {Component} from 'react';
import WelcomeView from './WelcomeView';
import * as appActions from '../../actions/appActions';

class WelcomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <WelcomeView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.appReducer.selectedLanguage,
    stores: state.appReducer.stores,
    storesView: state.appReducer.storesView,
    storeConfiguration: state.appReducer.storeConfiguration,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    didChangeLAnguage: language => {
      dispatch(appActions.onChangeLanguage(language));
    },
    storeCodeUpdated: code => {
      dispatch(appActions.onstoreCodeUpdated(code));
    },
    updateCurrency: currency => {
      dispatch(appActions.updateCurrency(currency));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
