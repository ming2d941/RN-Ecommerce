import {StyleSheet} from 'react-native';
import Constants from '../../config/constants';

const styles = StyleSheet.create({
  child_view: {
    flex: 1,
    margin: 3,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    height: 40,
    backgroundColor: Constants.APP_BOX_BACKGROUND_GREY,
  },
  child_color_view: {
    flex: 1,
    margin: 3,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Constants.APP_BOX_BACKGROUND_GREY,
    // backgroundColor:Constants.APP_BOX_BACKGROUND_GREY
  },
  sub_container_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    alignItems: 'center',
    margin: 3,
  },
  discount_conatiner_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    alignItems: 'center',
    margin: 3,
  },
  btn_touchable_style: {
    // width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  addAddressBtn: {justifyContent: 'flex-end'},
  checkbox_icon: {
    width: 20,
    height: 20,
    tintColor: Constants.APP_GREY_TEXT_COLOR,
  },
  view_textinputs: {
    borderWidth: 1,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 8,
    height: 40,
    borderColor: Constants.APP_BOX_BACKGROUND_GREY,
  },
  // style_view:{
  // 	flex: 1,
  // 	margin:3,
  // 	flexDirection: 'row',

  // 	height: 40,
  // 	backgroundColor:Constants.APP_BOX_BACKGROUND_GREY
  // },
  // choose_color_view:{ flex: 1, flexDirection: 'row',margin:3, height: 40,backgroundColor:Constants.APP_BOX_BACKGROUND_GREY   }
});

export default styles;
