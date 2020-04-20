/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * ProfileDetailView -
 */

import {
  translate,
  changeLanguage,
  setI18nConfigSecondTime,
} from '../../config/languageSwitching/index';
import styles from './styles';
import React, {Component} from 'react';
import RNRestart from 'react-native-restart';
import Constants from '../../config/constants';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import HudView from '../../components/hudView';
import {showSingleAlert, checkPasswordValid} from '../../config/common';
import NavigationHeader1 from '../../components/NavigationHeaders/NavigationHeader1';

class ProfileDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  componentDidMount() {
    const {userInfo} = this.props;
    this.setState({
      firstName: userInfo.firstname,
      lastName: userInfo.lastname,
      email: userInfo.email,
    });
  }

  _profileUpdateCallback = status => {
    if (status) {
      showSingleAlert(translate('profile_updated'), translate('Ok'), null);
    }
  };

  _callUpdateApi = () => {
    const {onProfileUpdate, userInfo} = this.props;
    const {oldPassword, newPassword} = this.state;
    const {firstName, lastName, email} = this.state;
    userInfo.firstname = firstName;
    userInfo.lastname = lastName;
    userInfo.email = email;
    onProfileUpdate(
      userInfo,
      oldPassword,
      newPassword,
      this._profileUpdateCallback,
    );
  };

  _didTapOnUpdate = () => {
    const {newPassword, confirmPassword} = this.state;
    if (newPassword === confirmPassword) {
      if (newPassword.length > 0) {
        if (checkPasswordValid(newPassword)) {
          this._callUpdateApi();
        } else {
          showSingleAlert(translate('password_invalid'), translate('Ok'), null);
        }
      } else {
        this._callUpdateApi();
      }
    } else {
      showSingleAlert(translate('password_mismatch'), translate('Ok'), null);
    }
  };

  render() {
    const {selectedLanguage, isLoading} = this.props;
    const {isRTL} = this.props;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
        />
        <NavigationHeader1
          title={translate('Profile Details')}
          didTapOnLeftButton={() => this.props.navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContainer}>
            <View style={styles.accountInfoContainer}>
              <Text style={styles.userNameText}>
                {translate('Account Information')}
              </Text>
              <View style={styles.line} />
              <Text style={styles.subTitle}>{translate('First Name')}</Text>
              <TextInput
                style={styles.inputs}
                keyboardType="name-phone-pad"
                returnKeyType={'next'}
                onSubmitEditing={() => this.lastName.focus()}
                onChangeText={value => this.setState({firstName: value})}
                value={this.state.firstName}
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
              />
              <Text style={styles.subTitle}>{translate('Last Name')}</Text>
              <TextInput
                style={styles.inputs}
                ref={input => (this.lastName = input)}
                keyboardType="name-phone-pad"
                returnKeyType={'next'}
                onSubmitEditing={() => this.emailInput.focus()}
                onChangeText={value => this.setState({lastName: value})}
                value={this.state.lastName}
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
              />
              <Text style={styles.subTitle}>{translate('Email')}</Text>
              <TextInput
                style={[
                  styles.inputs,
                  {marginBottom: 22, color: 'rgba(110,110,110,0.5)'},
                ]}
                ref={input => (this.emailInput = input)}
                keyboardType="email-address"
                returnKeyType={'done'}
                editable={false}
                onChangeText={value => this.setState({email: value})}
                value={this.state.email}
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.passwordContainer}>
              <Text style={styles.userNameText}>
                {translate('Change Password')}
              </Text>
              <View style={styles.line} />
              <Text style={styles.subTitle}>
                {translate('Current Password')}
              </Text>
              <TextInput
                style={styles.inputs}
                keyboardType="default"
                secureTextEntry={true}
                returnKeyType={'next'}
                onSubmitEditing={() => this.newPassword.focus()}
                onChangeText={value => this.setState({oldPassword: value})}
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
              />
              <Text style={styles.subTitle}>{translate('New Password')}</Text>
              <TextInput
                style={styles.inputs}
                ref={input => (this.newPassword = input)}
                keyboardType="default"
                returnKeyType={'next'}
                secureTextEntry={true}
                onSubmitEditing={() => this.confirmPassword.focus()}
                onChangeText={value => this.setState({newPassword: value})}
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
              />
              <Text style={styles.subTitle}>
                {translate('Confirm Password')}
              </Text>
              <TextInput
                style={[styles.inputs, {marginBottom: 22}]}
                ref={input => (this.confirmPassword = input)}
                keyboardType="default"
                returnKeyType={'done'}
                secureTextEntry={true}
                onChangeText={value => this.setState({confirmPassword: value})}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonOutlineContainer}
            activeOpacity={Constants.activeOpacity}
            onPress={() => {
              this._didTapOnUpdate();
            }}>
            <Text style={styles.updateText}>{translate('Update')}</Text>
          </TouchableOpacity>
        </View>
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default ProfileDetailView;
