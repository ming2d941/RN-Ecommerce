/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 18, 2020
 * Checkout style -
 */

import {StyleSheet} from 'react-native';
import AppStyles from '../../config/styles';
import Constants from '../../config/constants';
import {normalizedHeight, normalizedWidth} from '../../config/common';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE,
  },
  container: {
    backgroundColor: 'rgb(241,243,246)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  titleText: {
    fontSize: 15,
    fontFamily: Constants.Fonts.REGULAR,
    flex: 1,
    textAlign: 'left',
    marginLeft: 30,
    color: Constants.APP_GRAY_COLOR3,
  },
  separatorView: {
    height: 10,
    backgroundColor: Constants.APP_GRAY_COLOR2,
  },
  searchButton: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchHistoryText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: 'left',
    marginLeft: 18,
  },
  recentSearchTitle: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
    textAlign: 'left',
    flex: 1,
  },
  clearButonText: {
    fontFamily: Constants.Fonts.LIGHT,
    fontSize: 15,
    color: Constants.APP_GRAY_COLOR,
  },
  searchHistoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
  },
  addVoucherCode: {
    fontSize: 16,
    fontFamily: Constants.Fonts.MEDIUM,
    color: Constants.APP_BLACK_COLOR,
    marginVertical: 10,
    textAlign: 'left',
  },
  voucherInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: Constants.Fonts.REGULAR,
    color: 'rgb(164,164,164)',
    height: 42,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(112,112,112)',
    paddingLeft: 10,
  },
  applyButton: {
    marginLeft: 5,
    width: normalizedWidth(83),
    height: 42,
    backgroundColor: Constants.APP_THEME_COLOR,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontSize: 16,
    fontFamily: Constants.Fonts.MEDIUM,
    color: Constants.APP_BLACK_COLOR,
  },
  itemCellContainer: {
    marginTop: 5,
    backgroundColor: Constants.APP_WHITE_COLOR,
    flex: 1,
  },
  paymentMethodButton: {
    backgroundColor: 'rgb(244,246,248)',
    height: 42,
    alignItems: 'center',
    marginBottom: 4,
    flexDirection: 'row',
  },
  paymentOption: {
    marginLeft: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Constants.APP_GRAY_COLOR3,
  },
  paymentOption2: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paymentText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3,
    marginLeft: 15,
    textAlign: 'left',
  },
  addressText: {
    marginVertical: 5,
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3,
  },
  titleLabel: {
    marginVertical: 8,
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: 'left',
  },
  titleValueLabel: {
    flex: 1,
    marginVertical: 5,
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: 'right',
  },
  bottomButtonContainer: {
    height: normalizedHeight(100),
    width: '100%',
    backgroundColor: Constants.APP_WHITE_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTocartButton: {
    flex: 1,
    borderRadius: 15,
    height: normalizedHeight(60),
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 10,
    borderColor: Constants.APP_GRAY_COLOR3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowButton: {
    flex: 1,
    borderRadius: 15,
    height: normalizedHeight(60),
    borderWidth: 1,
    marginRight: 20,
    marginLeft: 10,
    borderColor: Constants.APP_GRAY_COLOR3,
    backgroundColor: Constants.APP_BLACK_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 16,
    color: Constants.APP_THEME_COLOR,
  },
  tickSwitch: {
    width: 20,
    height: 20,
    tintColor: Constants.APP_BLACK_COLOR,
    paddingRight: 5,
  },
  sameDayDeliveryPickerContainer: {
    height: 70,
    flex: 1,
    marginTop: 10,
  },
  deliveryDateText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 12,
    color: Constants.APP_GRAY_COLOR3,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: Constants.APP_GRAY_COLOR3,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '80%',
  },
  dateText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 12,
    color: Constants.APP_GRAY_COLOR3,
  },
});

export default styles;
