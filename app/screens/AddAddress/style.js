import {StyleSheet} from 'react-native';
import Constants from '../../config/constants';

const Styles = StyleSheet.create({
  text_input_style: {
    backgroundColor: '#f4f6f8',
    height: 40,
    paddingLeft: 2,
    borderRadius: 5,
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
  },
  text_input_style_country: {
    backgroundColor: '#f4f6f8',
    height: 40,
    paddingLeft: 2,
    borderRadius: 5,
    paddingTop: 12,
  },
  text_input_style_error: {
    backgroundColor: '#f4f6f8',
    height: 40,
    paddingLeft: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
  },
  text_input_style_textarea: {
    backgroundColor: '#f4f6f8',
    height: 120,
    paddingLeft: 2,
    borderRadius: 5,
    lineHeight: 25,
    textAlignVertical: 'top',
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
  },
  text_input_style_textarea_error: {
    backgroundColor: '#f4f6f8',
    height: 120,
    paddingLeft: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
  },
  addAddressBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    marginTop: 40,
    marginBottom: 20,
  },
  btn_touchable_style: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
  },
  textTile: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 16,
    color: Constants.APP_BLACK_COLOR,
  },
});

export default Styles;
