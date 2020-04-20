/**
 * Created by Tinoy for iLeaf Solutions Pvt.Ltd
 * on March 21, 2020
 * ChatContainer -
 */

import {connect} from 'react-redux';
import React, {Component} from 'react';
import ChatView from './ChatView';
//import * as loginActions from '../../actions/loginActions';
//import * as appActions from '../../actions/appActions';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ChatView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.appReducer.selectedLanguage,
    userInfo: state.loginReducer.userInfo,
    isLoading: state.loadingReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
