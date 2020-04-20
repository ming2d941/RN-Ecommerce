/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * ContactUs styles -
 */

import {StyleSheet} from 'react-native';
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
  contactInfoContainer: {
    marginTop: 8,
    paddingHorizontal: 22,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  contactAddressText: {
    fontSize: 15,
    fontFamily: Constants.Fonts.MEDIUM,
    color: 'rgb(42,42,42)',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'left',
  },
  line: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgb(241, 243, 246)',
  },
  subTitle: {
    fontSize: 15,
    fontFamily: Constants.Fonts.REGULAR,
    color: 'rgb(42,42,42)',
    textAlign: 'left',
    lineHeight: 25,
  },
  contactIcon: {
    height: 15,
    width: 15,
    alignSelf: 'center',
  },
  contactText: {
    fontSize: 15,
    marginStart: 22,
    fontFamily: Constants.Fonts.REGULAR,
    color: 'rgb(120,120,120)',
    textAlign: 'left',
  },
  contactWrapper: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  subTitle2: {
    fontSize: 14,
    fontFamily: Constants.Fonts.REGULAR,
    color: 'rgb(120,120,120)',
    textAlign: 'left',
    marginTop: 7,
  },

  inputs: {
    height: normalizedHeight(48),
    marginTop: 10,
    paddingHorizontal: 6,
    color: 'rgb(42,42,42)',
    backgroundColor: 'rgb(244, 246, 248)',
    borderBottomColor: '#FFFFFF',
    width: '100%',
    fontSize: 14,
    textAlign: 'left',
    fontFamily: Constants.Fonts.REGULAR,
  },
  passwordContainer: {
    marginVertical: 8,
    paddingHorizontal: 22,
    paddingBottom: 12,
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
  fabStyle: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    backgroundColor: 'rgb(219,184,90)',
    position: 'absolute',
    bottom: normalizedHeight(120),
    right: normalizedWidth(12),
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 4},
    shadowColor: Constants.APP_BLACK_COLOR,
    shadowOpacity: 0.25,
  },
  fabIcon: {
    height: 24,
    width: 24,
  },
  errorText: {
    height: 14,
    fontSize: 11,
    marginTop: 1,
    textAlign: 'left',
    color: 'red',
  },
});

export default styles;
