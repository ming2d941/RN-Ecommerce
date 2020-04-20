/**
 * Created by Tinoy for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * RegistrationScreen - RegistrationScreen Styles
 */

import {StyleSheet, I18nManager} from 'react-native';
import Constants from '../../config/constants';
import {normalizedHeight, normalizedWidth} from '../../config/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Constants.SCREEN_HEIGHT,
  },
  safeContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 34,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#1c385c',
  },
  inputContainerHalf: {
    borderWidth: 1,
    borderColor: 'rgb(164, 164, 164)',
    borderRadius: 15,
    width: '100%',
    height: normalizedHeight(48),
    marginTop: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerFull: {
    borderWidth: 1,
    borderColor: 'rgb(164, 164, 164)',
    borderRadius: 15,
    width: '91%',
    height: normalizedHeight(48),
    marginTop: 12,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  errorText: {
    height: 14,
    fontSize: 11,
    marginTop: 1,
    marginStart: 9,
    textAlign: 'left',
    color: 'red',
  },
  inputs: {
    height: normalizedHeight(45),
    margin: 14,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontFamily: Constants.Fonts.LIGHT,
  },
  gradient: {
    marginTop: 38,
    height: normalizedHeight(51),
    width: '91%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Constants.Fonts.REGULAR,
  },
  overlay: {
    position: 'absolute',
    opacity: 0.88,
    backgroundColor: '#2A2A2A',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    position: 'absolute',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    marginTop: -15,
    backgroundColor: '#ffffff',
  },
  containerHalf: {
    flexDirection: 'row',
    marginTop: 32,
    width: '91%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  containerHalfInner: {
    flexDirection: 'column',
    width: '48%',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  appLogo: {
    width: '60%',
    height: '60%',
    alignSelf: 'center',
  },
  registrationText: {
    color: 'rgb(42,42,42)',
    fontSize: 20,
    marginTop: 18,
    marginHorizontal: 24,
    marginBottom: 14,
    alignSelf: 'flex-start',
    fontFamily: Constants.Fonts.MEDIUM,
  },
  underline: {
    backgroundColor: 'rgb(42,42,42)',
    height: 2,
    width: 154,
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignSelf: 'center',
  },
  haveAccount: {
    fontSize: 16,
    color: 'rgb(164, 164, 164)',
    fontFamily: Constants.Fonts.REGULAR,
  },
  login: {
    marginStart: 12,
    fontSize: 16,
    color: 'rgb(42, 42, 42)',
    textDecorationLine: 'underline',
    fontFamily: Constants.Fonts.REGULAR,
  },
  closeButtonView: {
    position: 'absolute',
    top: normalizedHeight(10),
    left: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
