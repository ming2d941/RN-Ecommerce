/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * LoginScreen - LoginScreen View
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {translate} from '../../config/languageSwitching/index';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {
  isEmpty,
  showSingleAlert,
  checkEMailValidation,
  showAlertWithCallback,
  normalizedHeight,
} from '../../config/common';
import {LoginManager} from 'react-native-fbsdk';
import Images from '../../config/images';
import LinearGradient from 'react-native-linear-gradient';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRealUserStatus,
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import Constants from '../../config/constants';
import Modal from 'react-native-modal';
import HudView from '../../components/hudView';

import SignUp from '../../screens/RegistrationScreen';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    let isGuestLogin = props.isGuestLogin ? this.props.isGuestLogin : false;

    // this.authCredentialListener = null;
    this.user = null;
    this.state = {
      credentialStateForUser: -1,
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isLogin: !isGuestLogin,
      isSignUpViewShow: false,
      isForgotPasswordShow: false,
      firstName: '',
      lastName: '',
      firstNameError: '',
      lastnameError: '',
      guestEmailError: '',
      showClose: true,
      forgotEmail: '',
      forgotEmailError: '',
      isTermsChecked: false,
    };
  }

  componentDidMount() {
    // GoogleSignin.configure();
    console.log('VESRION===', Constants.IOS_VERSION);

    GoogleSignin.configure({
      hostedDomain: '',
      loginHint: '',
      forceConsentPrompt: true,
      accountName: '',
      iosClientId:
        '855821477319-lof8mcnb5v133mt0ptpnk3rcgqie169e.apps.googleusercontent.com',
    });

    // /**
    //  * subscribe to credential updates.This returns a function which can be used to remove the event listener
    //  * when the component unmounts.
    //  */
    // this.authCredentialListener = appleAuth.onCredentialRevoked(async () => {
    //   console.warn('Credential Revoked');
    //   this.fetchAndUpdateCredentialState().catch(error => {
    //     console.log('===fetchAndUpdateCredentialState==', error);

    //     this.setState({credentialStateForUser: `Error: ${error.code}`});
    //   });
    // });

    // this.fetchAndUpdateCredentialState()
    //   .then(res => {
    //     this.setState({credentialStateForUser: res});
    //     console.log('000000fetchAndUpdateCredentialState---', res);
    //   })
    //   .catch(error => {
    //     console.log('===fetchAndUpdateCredentialState==XXX', error);
    //     this.setState({credentialStateForUser: `Error: ${error.code}`});
    //   });
  }

  componentWillUnmount() {
    /**
     * cleans up event listener
     */
    // this.authCredentialListener();
  }

  /** FB Login */
  onFBLoginPress = () => {
    // this.props.navigateToHomeScreen();
    // this.props.navigation.navigate('HomeScreen');
    LoginManager.logOut();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function(result) {
        console.log('FB LOGIN RESULT===', result);

        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());

            let token = data.accessToken.toString();

            fetch(
              'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
                token,
            )
              .then(response => response.json())
              .then(json => {
                console.log('DATA RESPONSE ==', json);

                alert('Login success');

                // // Some user object has been set up somewhere, build that user here
                // user.name = json.name;
                // user.id = json.id;
                // user.user_friends = json.friends;
                // user.email = json.email;
                // user.username = json.name;
                // user.loading = false;
                // user.loggedIn = true;
                // user.avatar = setAvatar(json.id);
              })
              .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK');
              });
          });
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  /** Google Login */
  onGoogleLoginPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      alert('Login success');
    } catch (error) {
      console.log('ERROR', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  /** Apple Login */
  onAppleLoginPress = async () => {
    console.warn('Beginning Apple Authentication');

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      console.log('credentialState====----->>>', credentialState);

      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        alert('SUCCESS');
      }

      this.user = newUser;

      // this.fetchAndUpdateCredentialState()
      //   .then(res => {
      //     this.setState({credentialStateForUser: res});
      //     console.log('fetchAndUpdateCredentialState===', res);
      //   })
      //   .catch(error => {
      //     this.setState({credentialStateForUser: `Error: ${error.code}`});
      //     console.log('fetchAndUpdateCredentialState ERROR ===>>', error);
      //   });

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken);
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${this.user}, ${email}`);
    } catch (error) {
      console.log('!!!ERROR', error);

      if (error.code === AppleAuthError.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  };

  // fetchAndUpdateCredentialState = async () => {
  //   if (this.user === null) {
  //     this.setState({credentialStateForUser: 'N/A'});
  //   } else {
  //     const credentialState = await appleAuth.getCredentialStateForUser(
  //       this.user,
  //     );
  //     if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
  //       this.setState({credentialStateForUser: 'AUTHORIZED'});
  //     } else {
  //       this.setState({credentialStateForUser: credentialState});
  //     }
  //   }
  // };

  _isFieldsValid() {
    const {email, password} = this.state;
    let isValid = true;
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
    return isValid;
  }

  _onSubmit() {
    const {email, password} = this.state;
    const {onLoginUser} = this.props;
    if (this._isFieldsValid()) {
      onLoginUser(email, password, this._loginCallback);
    }
  }

  _onSubmitGuest = () => {
    const {firstName, lastName, email} = this.state;
    let valid = true;
    if (firstName === '') {
      this.setState({firstNameError: 'First name required'});
      valid = false;
    } else {
      this.setState({firstNameError: ''});
    }
    if (lastName === '') {
      this.setState({lastnameError: 'Last name required'});
      valid = false;
    } else {
      this.setState({lastnameError: ''});
    }
    if (isEmpty(email)) {
      this.setState({guestEmailError: 'Email required'});
      valid = false;
    } else {
      this.setState({guestEmailError: ''});
      if (checkEMailValidation(email)) {
        this.setState({guestEmailError: ''});
      } else {
        this.setState({guestEmailError: 'Invalid Email'});
        valid = false;
      }
    }

    if (valid) {
      let params = {firstName: firstName, lastName: lastName, email: email};
      this.props.updateGuestInfo(params);
      if (this.props.guestInfoAddedCallback) {
        this.props.guestInfoAddedCallback();
      } else {
        this.props.didTapOnclose();
      }
    }
  };

  _loginCallback = (status, showAlert) => {
    if (status) {
      this.props.didTapOnclose();
    } else {
      if (showAlert) {
        showAlertWithCallback(
          'Something went wrong, please login again',
          'Ok',
          'Continue as guest',
          () => {},
          () => {
            this.props.didTapOnclose();
          },
        );
      }
      this.props.userDidLogOut();
    }
  };

  _didSubmitForgotPwd = () => {
    const {forgotEmail} = this.state;
    let valid = true;
    if (isEmpty(forgotEmail)) {
      this.setState({forgotEmailError: 'Email required'});
      valid = false;
    } else {
      this.setState({forgotEmailError: ''});
      if (checkEMailValidation(forgotEmail)) {
        this.setState({forgotEmailError: ''});
      } else {
        this.setState({forgotEmailError: 'Invalid Email'});
        valid = false;
      }
    }
    if (valid) {
      this.setState({forgotEmail: ''});
      showSingleAlert(
        translate('Message sent succesfully'),
        translate('Ok'),
        () => this.setState({isForgotPasswordShow: false}),
      );
    }
  };

  render() {
    const {
      isSignUpViewShow,
      isForgotPasswordShow,
      forgotEmailError,
      isTermsChecked,
    } = this.state;
    const {isLoading} = this.props;

    let loginTextColor = this.state.isLogin
      ? 'rgb(42,42,42)'
      : 'rgba(120,120,120, 0.5)';
    let guestTextColor = !this.state.isLogin
      ? 'rgb(42,42,42)'
      : 'rgba(120,120,120, 0.5)';
    let loginLineColor = this.state.isLogin
      ? 'rgb(42,42,42)'
      : 'rgb(255,255,255)';
    let guestLineColor = !this.state.isLogin
      ? 'rgb(42,42,42)'
      : 'rgb(255,255,255)';

    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar backgroundColor={Constants.APP_THEME_DARK_GRAY} />
        <ScrollView
          style={{flex: 1}}
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
              {/* <TouchableOpacity
                onPress={() => {
                  this.props.didTapOnclose();
                }}
                style={styles.closeButtonView}>
                <Image
                  source={Images.close}
                  style={{width: 15, height: 15}}></Image>
              </TouchableOpacity> */}
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.tabContainer}>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({isLogin: true});
                    }}>
                    <Text style={[styles.loginText, {color: loginTextColor}]}>
                      {translate('Login')}
                    </Text>
                    <View
                      style={[styles.uline, {backgroundColor: loginLineColor}]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({isLogin: false});
                    }}>
                    <Text style={[styles.guestText, {color: guestTextColor}]}>
                      {translate('Guest')}
                    </Text>
                    <View
                      style={[styles.uline, {backgroundColor: guestLineColor}]}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* login section */}
              {this.state.isLogin && (
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 20,
                  }}>
                  <View style={styles.inputContainerFull}>
                    <TextInput
                      style={styles.inputs}
                      returnKeyType={'next'}
                      placeholder={translate('Email')}
                      keyboardType="email-address"
                      onSubmitEditing={() => this.passwordInput.focus()}
                      onChangeText={value => this.setState({email: value})}
                      underlineColorAndroid="transparent"
                      blurOnSubmit={false}
                    />
                  </View>
                  <Text style={styles.errorText}>{this.state.emailError}</Text>
                  <View style={[styles.inputContainerFull, {marginTop: 8}]}>
                    <TextInput
                      style={styles.inputs}
                      placeholder={translate('Password')}
                      ref={input => (this.passwordInput = input)}
                      onChangeText={value => this.setState({password: value})}
                      returnKeyType={'done'}
                      keyboardType="default"
                      secureTextEntry={true}
                      onSubmitEditing={() => this._onSubmit()}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <Text style={styles.errorText}>
                    {this.state.passwordError}
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
                      <Text style={styles.submitText}>
                        {translate('Submit')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <View style={styles.footerContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({isForgotPasswordShow: true})
                      }>
                      <Text style={styles.forgotPassword}>
                        {translate('Forgot Password')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        // this.props.navigation.navigate('RegistrationScreen')
                        this.setState({isSignUpViewShow: true})
                      }>
                      <Text style={styles.signup}>{translate('Signup')}</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.or}>{translate('OR')}</Text>
                  <View style={styles.containerHalf}>
                    <TouchableOpacity
                      //onPress={this.onGoogleLoginPress}
                      style={styles.buttonHalf}>
                      <Image
                        source={Images.google}
                        resizeMode="contain"
                        style={styles.socialLogo}
                      />
                      <Text style={styles.socialName}>
                        {translate('Google')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      //onPress={this.onFBLoginPress}
                      style={styles.buttonHalf}>
                      <Image
                        source={Images.fb}
                        resizeMode="contain"
                        style={styles.socialLogo}
                      />
                      <Text
                        style={[
                          styles.socialName,
                          {color: 'rgb(57, 111, 204)'},
                        ]}>
                        {translate('Facebook')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      //onPress={this.onAppleLoginPress}
                      style={[
                        styles.buttonFull,
                        {borderColor: 'rgb(0, 0, 0)'},
                      ]}>
                      <Image
                        source={Images.apple}
                        resizeMode="contain"
                        style={styles.socialLogo}
                      />
                      <Text
                        style={[styles.socialName, {color: 'rgb(0, 0, 0)'}]}>
                        {translate('APPLE login')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Guest section */}
              {!this.state.isLogin && (
                <View style={{}}>
                  <View style={[styles.containerHalf, {marginTop: 38}]}>
                    <View style={{flexDirection: 'column', width: '48%'}}>
                      <View style={styles.inputContainerHalf}>
                        <TextInput
                          style={styles.inputs}
                          placeholder={translate('First name')}
                          onChangeText={value =>
                            this.setState({firstName: value})
                          }
                          returnKeyType={'next'}
                          keyboardType="default"
                          blurOnSubmit={false}
                          maxLength={16}
                          numberOfLines={1}
                          onSubmitEditing={() => this.lastNameInput.focus()}
                          underlineColorAndroid="transparent"
                        />
                      </View>
                      <Text style={[styles.errorText, {marginStart: 6}]}>
                        {this.state.firstNameError}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column', width: '48%'}}>
                      <View style={styles.inputContainerHalf}>
                        <TextInput
                          style={styles.inputs}
                          placeholder={translate('Last name')}
                          ref={input => (this.lastNameInput = input)}
                          returnKeyType={'next'}
                          keyboardType="default"
                          blurOnSubmit={false}
                          maxLength={16}
                          numberOfLines={1}
                          onSubmitEditing={() => this.guestEmailInput.focus()}
                          onChangeText={value =>
                            this.setState({lastName: value})
                          }
                          underlineColorAndroid="transparent"
                        />
                      </View>
                      <Text style={[styles.errorText, {marginStart: 6}]}>
                        {this.state.lastnameError}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.inputContainerFull}>
                    <TextInput
                      style={styles.inputs}
                      placeholder={translate('Email')}
                      ref={input => (this.guestEmailInput = input)}
                      keyboardType="email-address"
                      returnKeyType={'done'}
                      //onSubmitEditing={() => this._onSubmitGuest()}
                      onChangeText={value => this.setState({email: value})}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <Text style={styles.errorText}>
                    {this.state.guestEmailError}
                  </Text>
                  <View style={styles.termsWrapper}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({isTermsChecked: !isTermsChecked})
                      }>
                      <Image
                        source={
                          isTermsChecked
                            ? Images.filterIcons.check_tick
                            : Images.filterIcons.check_outline
                        }
                        resizeMode="contain"
                        style={styles.termsTick}
                      />
                    </TouchableOpacity>
                    <Text style={styles.termsText}>
                      {translate('terms_text_part_one') + ' '}
                      <Text
                        style={styles.termsTextColored}
                        onPress={() => showSingleAlert('Terms clicked')}>
                        {translate('terms_text_part_two') + ' '}
                      </Text>
                      {translate('terms_text_part_three') + ' '}
                      <Text
                        style={styles.termsTextColored}
                        onPress={() => showSingleAlert('condition clicked')}>
                        {translate('terms_text_part_four')}
                      </Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    disabled={!isTermsChecked}
                    activeOpacity={0.7}
                    onPress={() => {
                      this._onSubmitGuest();
                    }}>
                    <LinearGradient
                      colors={['rgb(185, 128, 43)', 'rgb(229, 183, 80)']}
                      opacity={isTermsChecked ? 1 : 0.6}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.gradient}>
                      <Text style={styles.submitText}>
                        {translate('Submit')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* 
          <Text style={styles.errorText}>{this.state.emailError}</Text>
          <Text style={styles.errorText}>{this.state.passwordError}</Text>
    
          {Constants.IOS_VERSION >= 13 && (
            <TouchableOpacity
              onPress={this.onAppleLoginPress}
              style={{
                borderWidth: 1,
                margin: 5,
                padding: 15,
                alignSelf: 'center',
              }}>
              <Text>{translate('APPLE login')}</Text>
            </TouchableOpacity>
          )} */}
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
        <Modal
          onBackButtonPress={() => this.setState({isSignUpViewShow: false})}
          isVisible={isSignUpViewShow}>
          <View style={{flex: 1}}>
            <SignUp
              didTapOnclose={() => this.setState({isSignUpViewShow: false})}
              showLogin={true}
            />
          </View>
        </Modal>
        <Modal
          isVisible={isForgotPasswordShow}
          onBackdropPress={() => this.setState({isForgotPasswordShow: false})}
          onBackButtonPress={() =>
            this.setState({isForgotPasswordShow: false})
          }>
          <View style={styles.passwordModalWrapper}>
            <View style={styles.passwordCardWrapper}>
              <Text style={styles.forgotPwdTxt}>
                {translate('Forgot your password?')}
              </Text>
              <View style={styles.inputContainerFull}>
                <TextInput
                  style={styles.inputs}
                  placeholder={translate('Enter your email Address')}
                  keyboardType="email-address"
                  returnKeyType={'done'}
                  onChangeText={value => this.setState({forgotEmail: value})}
                  underlineColorAndroid="transparent"
                />
              </View>
              {forgotEmailError !== '' && (
                <Text style={styles.errorText}>
                  {this.state.forgotEmailError}
                </Text>
              )}
              <View style={styles.pwdSubmitWrapper}>
                <TouchableOpacity
                  onPress={() => this.setState({isForgotPasswordShow: false})}
                  style={styles.pwdCancelWrapper}>
                  <Text style={styles.pwdCancelTxt}>{translate('Cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._didSubmitForgotPwd()}
                  style={styles.pwdSubmitBtnWrapper}>
                  <Text style={styles.pwdSubmitTxt}>
                    {translate('Continue')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
