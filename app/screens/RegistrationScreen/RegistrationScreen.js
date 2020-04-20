/**
 * Created by Tinoy for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * RegistrationScreen - RegistrationScreen View
 */

import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {translate} from '../../config/languageSwitching/index';
import Constants from '../../config/constants';
import {
  isEmpty,
  checkEMailValidation,
  checkPasswordValid,
} from '../../config/common';
import Images from '../../config/images';
import HudView from '../../components/hudView';
import {navigateToHomeScreen} from '../../actions/navigationActions';
import {showSingleAlert} from '../../config/common';

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPwd: '',
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      passwordMismatchError: '',
      showClose: true,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    /**
     * cleans up event listener
     */
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {}

  _keyboardDidHide() {}

  _isFieldsValid() {
    const {email, password, firstName, lastName, confirmPwd} = this.state;
    let isValid = true;
    if (isEmpty(firstName)) {
      isValid = false;
      this.setState({firstNameError: 'First name required.'});
    } else {
      this.setState({firstNameError: null});
    }
    if (isEmpty(lastName)) {
      isValid = false;
      this.setState({lastNameError: 'Last name required.'});
    } else {
      this.setState({lastNameError: null});
    }
    if (isEmpty(email)) {
      this.setState({emailError: 'Email required.'});
      isValid = false;
    } else {
      if (checkEMailValidation(email)) {
        this.setState({emailError: null});
      } else {
        this.setState({emailError: 'Invalid Email.'});
        isValid = false;
      }
    }
    if (isEmpty(password)) {
      isValid = false;
      this.setState({passwordError: 'Password required.'});
    } else {
      this.setState({passwordError: null});
    }
    if (password !== confirmPwd) {
      isValid = false;
      this.setState({passwordMismatchError: 'Password mismatch.'});
    } else {
      this.setState({passwordMismatchError: null});
    }
    return isValid;
  }

  _onSubmit() {
    const {email, password, firstName, lastName, confirmPwd} = this.state;
    const {onRegisterUser} = this.props;
    if (this._isFieldsValid()) {
      if (checkPasswordValid(password)) {
        //onRegisterUser('abc4', 'def4', 'abcdef4@test.com', 'abcdef');
        onRegisterUser(
          firstName,
          lastName,
          email,
          password,
          this._registerCallback,
        );
      } else {
        showSingleAlert(translate('password_invalid'), translate('Ok'), null);
      }
    }
  }

  _registerCallback = status => {
    if (status) {
      showSingleAlert(
        translate('registration_complete_success'),
        translate('Ok'),
        () => {
          this.props.didTapOnclose();
        },
      );
    }
  };

  render() {
    const {isLoading, showLogin} = this.props;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar backgroundColor={Constants.APP_THEME_DARK_GRAY} />
        <ScrollView
          scrollEventThrottle={16}
          onScroll={event => {
            if (event.nativeEvent.contentOffset.y > 150) {
              this.setState({showClose: false});
            } else {
              this.setState({showClose: true});
            }
          }}>
          <View style={styles.container}>
            <View style={{width: '100%', height: '28%'}}>
              <Image
                source={Images.loginHeaderBg}
                resizeMode="cover"
                style={styles.logo}
              />
              <View style={styles.overlay} />
              <View style={styles.logoContainer}>
                <Image
                  source={Images.logo}
                  resizeMode="contain"
                  style={styles.appLogo}
                />
              </View>
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.registrationText}>
                {translate('Registration')}
              </Text>
              <View style={styles.underline} />
              <View style={styles.containerHalf}>
                <View style={styles.containerHalfInner}>
                  <View style={styles.inputContainerHalf}>
                    <TextInput
                      style={styles.inputs}
                      placeholder={translate('First name')}
                      keyboardType="default"
                      returnKeyType={'next'}
                      blurOnSubmit={false}
                      maxLength={16}
                      numberOfLines={1}
                      onSubmitEditing={() => this.lastNameInput.focus()}
                      onChangeText={value => this.setState({firstName: value})}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <Text style={styles.errorText}>
                    {this.state.firstNameError}
                  </Text>
                </View>
                <View style={styles.containerHalfInner}>
                  <View style={styles.inputContainerHalf}>
                    <TextInput
                      style={styles.inputs}
                      placeholder={translate('Last name')}
                      ref={input => (this.lastNameInput = input)}
                      keyboardType="default"
                      returnKeyType={'next'}
                      blurOnSubmit={false}
                      maxLength={16}
                      numberOfLines={1}
                      onSubmitEditing={() => this.emailInput.focus()}
                      onChangeText={value => this.setState({lastName: value})}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <Text style={styles.errorText}>
                    {this.state.lastNameError}
                  </Text>
                </View>
              </View>
              <View style={styles.inputContainerFull}>
                <TextInput
                  style={styles.inputs}
                  placeholder={translate('Email')}
                  ref={input => (this.emailInput = input)}
                  keyboardType="email-address"
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={value => this.setState({email: value})}
                  underlineColorAndroid="transparent"
                />
              </View>
              <Text style={[styles.errorText, {marginStart: 27}]}>
                {this.state.emailError}
              </Text>
              <View style={styles.inputContainerFull}>
                <TextInput
                  style={styles.inputs}
                  placeholder={translate('Password')}
                  ref={input => (this.passwordInput = input)}
                  keyboardType="default"
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.confPasswordInput.focus()}
                  secureTextEntry={true}
                  onChangeText={value => this.setState({password: value})}
                  underlineColorAndroid="transparent"
                />
              </View>
              <Text style={[styles.errorText, {marginStart: 27}]}>
                {this.state.passwordError}
              </Text>
              <View style={styles.inputContainerFull}>
                <TextInput
                  style={styles.inputs}
                  placeholder={translate('Confirm Password')}
                  ref={input => (this.confPasswordInput = input)}
                  keyboardType="default"
                  returnKeyType={'done'}
                  secureTextEntry={true}
                  onSubmitEditing={() => this._onSubmit()}
                  onChangeText={value => this.setState({confirmPwd: value})}
                  underlineColorAndroid="transparent"
                />
              </View>
              <Text style={[styles.errorText, {marginStart: 27}]}>
                {this.state.passwordMismatchError}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this._onSubmit();
                }}>
                <LinearGradient
                  colors={['rgb(185, 128, 43)', 'rgb(229, 183, 80)']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradient}>
                  <Text style={styles.submitText}>{translate('Submit')}</Text>
                </LinearGradient>
              </TouchableOpacity>

              {showLogin && (
                <View style={styles.footerContainer}>
                  <Text style={styles.haveAccount}>
                    {translate('AlreadyHaveAccount')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.didTapOnclose();
                      // this.props.navigation.navigate('LoginScreen')
                    }}>
                    <Text style={styles.login}>{translate('Login')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {this.state.showClose && (
          <TouchableOpacity
            onPress={() => {
              this.props.didTapOnclose();
            }}
            style={styles.closeButtonView}>
            <Image
              source={Images.close}
              style={{width: 15, height: 15}}></Image>
          </TouchableOpacity>
        )}
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default RegistrationScreen;
