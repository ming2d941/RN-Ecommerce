/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * Account - Account Styles
 */

import {StyleSheet} from 'react-native';
import AppStyles from '../../config/styles';
import Constants from '../../config/constants';
import {normalizedHeight, normalizedWidth} from '../../config/common';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_BLACK_COLOR,
  },
  scrollContainer: {
    backgroundColor: Constants.APP_GRAY_COLOR2,
    //height: Constants.SCREEN_HEIGHT
  },
  userInfoContainer: {
    marginTop: 7,
    marginBottom: 9,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  noUserContainer: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 9,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  buttonSignup: {
    borderWidth: 1,
    borderColor: 'rgba(120, 120, 120, 0.5)',
    borderRadius: 12,
    width: '43%',
    height: normalizedHeight(48),
    marginVertical: normalizedHeight(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogin: {
    borderRadius: 12,
    width: '43%',
    backgroundColor: 'rgb(219, 184, 90)',
    height: normalizedHeight(48),
    marginVertical: normalizedHeight(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialName: {
    fontSize: 16,
    color: 'rgb(42,42,42)',
    fontFamily: Constants.Fonts.MEDIUM,
  },
  userNameText: {
    fontSize: 22,
    fontFamily: Constants.Fonts.BOLD,
    color: 'rgb(42,42,42)',
    marginHorizontal: 20,
    marginTop: 16,
    textAlign: 'left',
  },
  userEmailText: {
    fontSize: 14,
    fontFamily: Constants.Fonts.REGULAR,
    color: 'rgb(154,154,154)',
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 19,
    textAlign: 'left',
  },
  editIconContainer: {
    position: 'absolute',
    top: normalizedWidth(15),
    right: normalizedWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImage: {
    width: 20,
    height: 20,
  },
  itemContainer: {
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  itemText: {
    fontSize: 16,
    fontFamily: Constants.Fonts.REGULAR,
    color: 'rgb(42,42,42)',
    margin: 18,
    textAlign: 'left',
  },
  itemImage: {
    width: 14,
    height: 14,
    marginEnd: 18,
    alignSelf: 'center',
  },
  line: {
    height: 1.5,
    width: '100%',
    backgroundColor: Constants.APP_GRAY_COLOR2,
  },
  actionSheetTitle: {
    color: 'rgb(154,154,154)',
    fontSize: 18,
    fontFamily: Constants.Fonts.REGULAR,
  },
});

export default styles;
