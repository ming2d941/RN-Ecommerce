import {StyleSheet} from 'react-native';
import Constants from '../../config/constants';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Constants.APP_WHITE_COLOR},
  text_align: {textAlign: 'center'},
  emptylist: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  addressCardContainer: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#dbb85a',
    // height: 200,
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
  },
  addAddressBtn: {
    // flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    marginTop: 0,
  },
  btn_touchable_style: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
  },
  card_name_row: {justifyContent: 'space-between', flexDirection: 'row'},
  checkmark: {width: 25, height: 25, marginLeft: 3, marginTop: 3},
  button_left_container: {flexDirection: 'row', flex: 1},
  btn_set_default: {
    width: 125,
    height: 26,
    backgroundColor: '#dbb85a',
    borderWidth: 1,
    borderColor: '#dbb85a',
    paddingTop: 3,
    borderRadius: 26 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_bottom_touchable_style: {
    width: 90,
    height: 30,
    borderWidth: 1,
    borderColor: '#f1f1fc',
    borderRadius: 15,
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_container: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
});

export default styles;
