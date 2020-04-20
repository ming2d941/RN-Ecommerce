import {StyleSheet} from 'react-native';
import AppStyles from '../../config/styles';
import Constants from '../../config/constants';

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    borderBottomColor: Constants.APP_SEPARATOR_COLOR,
    borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 15,
    flex: 1,
    textAlign: 'left',
    marginLeft: 30,
    color: Constants.APP_BLACK_COLOR,
    fontFamily: Constants.Fonts.BOLD,
  },
});

export default styles;
