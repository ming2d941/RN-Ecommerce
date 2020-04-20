import {StyleSheet} from 'react-native';
import AppStyles from '../../config/styles';
import Constants from '../../config/constants';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  scrollContainer: {
    marginTop: 5,
  },
  itemImage: {
    width: 14,
    height: 14,
    // marginEnd: 18,
    alignSelf: 'center',
  },
  underLineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Constants.APP_SEPARATOR_COLOR,
    marginVertical: 5,
  },
  underLineStyle2: {
    borderBottomWidth: 1,
    borderBottomColor: Constants.APP_SEPARATOR_COLOR,
    marginTop: 18,
    marginBottom: 3,
    marginHorizontal: 18,
  },
  orderNumberText: {
    fontSize: 16,
    color: Constants.APP_BLACK_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
    textAlign: 'left',
  },
  deliveryStatusText: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: Constants.Fonts.REGULAR,
    textAlign: 'left',
  },
  normalText: {
    fontSize: 14,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: 'left',
  },
  textBlue: {
    fontSize: 14,
    fontFamily: Constants.Fonts.MEDIUM,
    color: 'rgb(92,115,207)',
    textAlign: 'left',
  },
  normalTextBold: {
    fontSize: 14,
    fontFamily: Constants.Fonts.MEDIUM,
    color: 'rgb(0,0,0)',
    textAlign: 'left',
  },
  largeTextBold: {
    fontSize: 15,
    marginTop: 4,
    fontFamily: Constants.Fonts.MEDIUM,
    color: 'rgb(0,0,0)',
    textAlign: 'left',
  },
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  wrapperColumn: {
    marginHorizontal: 18,
    marginTop: 12,
  },
  addressText: {
    fontSize: 14,
    marginTop: 7,
    marginBottom: 12,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: 'left',
  },
  cardWrapper: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    paddingBottom: 18,
  },
});

export default styles;
