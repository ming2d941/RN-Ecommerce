import React, {Component, memo} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {translate} from '../../config/languageSwitching/index';
import Images from '../../config/images';
import Styles from './style';
import NavigationHeader2 from '../../components/NavigationHeaders/NavigationHeader2';
import constants from '../../config/constants';
import Countries from '../../lib/countires.js';
import {showAlertWithCallback} from '../../config/common';
import HudView from '../../components/hudView';
import EmptyDataPlaceholder from '../../components/emptyDataPlaceholder';

class AddressListScreen extends Component {
  newDefaultAddress = selectedIndex => {
    let addressListArray = this.props.addressList;
    addressListArray.map(item => {
      item['default_billing'] = false;
    });

    let addressDict = addressListArray[selectedIndex];
    addressDict['default_billing'] = true;
    addressListArray[selectedIndex] = addressDict;

    let userInfo = this.props.userInfo;
    userInfo['addresses'] = addressListArray;
    this.props.editAddressUser({customer: userInfo}, () => {
      console.log('SUCCESS');
    });
  };

  removeAddressFromList = selectedIndex => {
    let addressArray = this.props.addressList;
    let selectedAddressDict = addressArray[selectedIndex];
    showAlertWithCallback(
      translate('removeAddress'),
      translate('Yes'),
      translate('No'),
      () => {
        this.props.removeAddress(selectedAddressDict.id, selectedIndex);
      },
      null,
    );
  };

  didTapOnBackButton = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {addressList, isLoading} = this.props;
    return (
      <SafeAreaView style={Styles.container}>
        <NavigationHeader2
          title={translate('Address Book')}
          hideSearch={true}
          showBackButton={true}
          didTapOnBackButton={this.didTapOnBackButton}
          isRTL={this.props.isRTL}
        />
        {addressList && addressList.length == 0 ? (
          // <View style={Styles.emptylist}>
          //   <Text style={{fontFamily: constants.Fonts.REGULAR}}>
          //     {translate('No Address Found')}
          //   </Text>
          // </View>
          <View style={{flex: 1}}>
            <EmptyDataPlaceholder
              titleText={translate('Your address list is empty')}
              descriptionText={translate(
                'Please add your Billing/Shipping address',
              )}
              placeHolderImage={Images.addressEmpty}
              imageStyle={{width: 100, height: 100, marginBottom: 30}}
            />
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: constants.APP_GRAY_COLOR2}}>
            <FlatList
              data={addressList}
              style={{backgroundColor: constants.APP_GRAY_COLOR2, flex: 1}}
              renderItem={({item, index}) => (
                <AdressListComponent
                  setDefaultAddress={this.newDefaultAddress}
                  removeAddressFromList={this.removeAddressFromList}
                  list={addressList}
                  item={item}
                  index={index}
                  props={this.props}
                />
              )}
              extraData={this.props}
            />
          </View>
        )}
        <View style={Styles.addAddressBtn}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AddAddressScreen', {
                details: {},
              });
            }}
            style={Styles.btn_touchable_style}>
            <Text
              style={{
                color: constants.APP_THEME_COLOR,
                fontFamily: constants.Fonts.REGULAR,
                fontSize: 16,
              }}>
              {translate('Add Address')}
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

/** Value Deals Item Component */
const AdressListComponent = memo(
  ({item, props, index, setDefaultAddress, removeAddressFromList}) => {
    let a = item.default_billing;

    // let selectedAddressIndex = props.navigation.state.params
    //   .selectedAddressIndex
    //   ? props.navigation.state.params.selectedAddressIndex
    //   : -1;

    const onChoose = selectedIndex => {
      setDefaultAddress(selectedIndex);
    };

    // const CountryData = Countries.filter(c => {
    //   return item.country_id === c.id;
    // });
    const countryName = Countries[item.country_id].name.common;

    const removeAddress = selectedIndex => {
      removeAddressFromList(selectedIndex);
    };
    return (
      <TouchableOpacity
        style={Styles.addressCardContainer}
        onPress={() => {
          let didSelectUserAddress = props.navigation.state.params
            ? props.navigation.state.params.didSelectUserAddress
            : null;
          if (didSelectUserAddress) {
            didSelectUserAddress(item, index);
            props.navigation.goBack();
          }
        }}>
        {/* <View style={Styles.addressCardContainer}> */}
        <View style={[Styles.card_name_row, {marginLeft: 10}]}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: constants.Fonts.BOLD,
                color: constants.APP_BLACK_COLOR,
                marginBottom: 5,
                marginTop: 5,
              }}>
              {item.firstname} {item.lastname}
            </Text>
            <Text
              style={{
                color: '#787878',
                fontFamily: constants.Fonts.REGULAR,
                marginBottom: 3,
                textAlign: 'left',
              }}>
              {item.street[0]}
            </Text>
            {item.street[1] ? (
              <Text
                style={{
                  color: '#787878',
                  fontFamily: constants.Fonts.REGULAR,
                  marginBottom: 3,
                  textAlign: 'left',
                }}>
                {item.street[1]}
              </Text>
            ) : null}
            {item.street[2] ? (
              <Text
                style={{
                  color: '#787878',
                  fontFamily: constants.Fonts.REGULAR,
                  marginBottom: 3,
                }}>
                {item.street[2]}
              </Text>
            ) : null}
            <Text
              style={{color: '#787878', fontFamily: constants.Fonts.REGULAR}}>
              {item.city}
              {', '}
              {/* {CountryData[0].full_name_english} */}
              {countryName}
            </Text>
          </View>
          {a ? (
            <View>
              <Image
                source={Images.check.checkmark}
                style={Styles.checkmark}
                resizeMode="contain"
              />
            </View>
          ) : null}
        </View>
        <View style={{marginVertical: 10, marginLeft: 10}}>
          <Text
            style={{
              color: '#787878',
              textAlign: 'left',
              fontFamily: constants.Fonts.REGULAR,
            }}>
            {item.telephone}
          </Text>
        </View>
        <View style={Styles.button_container}>
          <View style={Styles.button_left_container}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AddAddressScreen', {
                  details: item,
                  edit: true,
                });
              }}
              style={Styles.btn_bottom_touchable_style}>
              <Text
                style={[
                  {fontFamily: constants.Fonts.REGULAR},
                  Styles.text_align,
                ]}>
                {translate('Edit')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeAddress(index)}
              style={[Styles.btn_bottom_touchable_style, {marginLeft: 10}]}>
              <Text
                style={[
                  Styles.text_align,
                  {
                    fontFamily: constants.Fonts.REGULAR,
                    color: constants.APP_RED_COLOR,
                  },
                ]}>
                {translate('Remove')}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {!a ? (
              <TouchableOpacity
                onPress={() => onChoose(index)}
                style={Styles.btn_set_default}>
                <Text style={Styles.text_align}>
                  {translate('Set as default')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        {/* </View> */}
      </TouchableOpacity>
    );
  },
);

export default AddressListScreen;
