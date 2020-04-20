/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * Cart styles -
 */

import {StyleSheet, I18nManager} from 'react-native';
import AppStyles from '../../config/styles';
import Constants from '../../config/constants';
import {normalizedHeight, normalizedWidth} from '../../config/common';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  scrollContainer: {
    backgroundColor: Constants.APP_GRAY_COLOR2,
  },
  accountInfoContainer: {
    marginTop: 8,
    paddingHorizontal: 22,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  userNameText: {
    fontSize: 15,
    fontFamily: Constants.Fonts.MEDIUM,
    color: 'rgb(42,42,42)',
    marginTop: 16,
    textAlign: 'left',
  },
  line: {
    marginVertical: 15,
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgb(241, 243, 246)',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: Constants.Fonts.REGULAR,
    color: 'rgb(120,120,120)',
    marginTop: 5,
    textAlign: 'left',
  },
  inputs: {
    height: normalizedHeight(48),
    marginVertical: 8,
    paddingHorizontal: 6,
    color: 'rgb(42,42,42)',
    backgroundColor: 'rgb(244, 246, 248)',
    borderBottomColor: '#FFFFFF',
    width: '100%',
    fontSize: 15,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignSelf: 'center',
    fontFamily: Constants.Fonts.REGULAR,
  },
  passwordContainer: {
    marginVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  buttonContainer: {
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  buttonOutlineContainer: {
    marginVertical: 12,
    marginHorizontal: 14,
    borderRadius: 15,
    height: normalizedHeight(54),
    backgroundColor: Constants.APP_BLACK_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateText: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 16,
    color: Constants.APP_THEME_COLOR,
  },
});

export default styles;
