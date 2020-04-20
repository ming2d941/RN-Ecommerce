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
});

export default styles;
