/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 18, 2020
 * Checkout UI-
 */

import {
  View,
  Text,
  Image,
  Picker,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import Images from '../../config/images';
import {format, addHours} from 'date-fns';
import HudView from '../../components/hudView';
import Constants from '../../config/constants';
import ItemCell from '../../components/itemCell';
import DatePicker from 'react-native-date-picker';
import {showSingleAlert} from '../../config/common';
import React, {Component, memo, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {translate} from '../../config/languageSwitching/index';
import NavigationHeader1 from '../../components/NavigationHeaders/NavigationHeader1';

const CategoryCall = memo(
  ({
    item,
    index,
    productsColors,
    productsSizes,
    addProductToWishList,
    currency,
    totalCost,
  }) => {
    function removeFromCart() {}
    function addToWishList() {
      addProductToWishList(item);
    }

    const totalProductGross = item.price * item.qty;
    const [totalGross, setTotalGross] = useState(totalProductGross);

    function getQuantity(quantityValue) {
      console.log('quantityValue', quantityValue);
      setTotalGross(quantityValue * item.price);
    }

    return (
      <View style={{marginTop: 5, backgroundColor: Constants.APP_WHITE_COLOR}}>
        <View style={{marginHorizontal: 0}}>
          <ItemCell
            item={item}
            addProductToWishList={addProductToWishList}
            index={index}
            productsSizes={productsSizes}
            productsColors={productsColors}
            allowAddOption={false}
            showQuantity={true}
            currency={currency}
            totalCost={totalCost}
          />
        </View>
      </View>
    );
  },
);

class CheckoutView extends Component {
  constructor(props) {
    super(props);
    let totalCostDict = props.navigation.state.params.totalCost;
    this.state = {
      addressDict: {},
      isSameDayDelivery: true,
      totalCostDict,
      nowDate: new Date(),
      newDate: new Date(),
      nowTime: '10:00 am - 11:00 am',
      newTime: '10:00 am - 11:00 am',
      showDatePicker: false,
      showTimePicker: false,
      selectedAddressIndex: -1,
      voucherCode: '',
      isVoucherApplied: false,
      mCartList: '',
      mGuestcartList: '',
      paymentMethods: [],
      shipmentMethods: [],
    };
  }

  componentDidMount() {
    const {addressList, cartList, userToken, guestcartList} = this.props;
    let defaultAddress = null;
    if (addressList && addressList.length > 0) {
      addressList.map(item => {
        if (item.default_billing) {
          defaultAddress = item;
        }
      });
    }

    if (defaultAddress) {
      this.setState({addressDict: defaultAddress}, () => {
        if (userToken && userToken.length > 0) {
          this._setShippingAddress();
          console.log('defaultAddress', defaultAddress);
        }
      });
    }
    this.setState({mCartList: cartList});
    this.setState({mGuestcartList: guestcartList});
  }

  componentWillUnmount() {}

  _getPaymentAndShippingMethodsCallback = (
    paymentMethodsArray,
    shipmentMethodsArray,
  ) => {
    if (paymentMethodsArray.length > 0 && shipmentMethodsArray.length > 0) {
      this.setState({
        paymentMethods: paymentMethodsArray,
        shipmentMethods: shipmentMethodsArray,
      });
    } else {
      showSingleAlert(translate('API_Failed'), translate('Ok'), () => {
        this.props.navigation.goBack();
      });
    }
  };

  _didTapOnAddAddress = () => {
    const {userToken} = this.props;
    if (userToken.length > 0) {
      this.props.navigation.navigate('AddressListScreen', {
        selectedAddressIndex: this.state.selectedAddressIndex,
        didSelectUserAddress: this._didSelectUserAddress,
      });
    } else {
      this.props.navigation.navigate('AddAddressScreen', {
        details: this.state.addressDict,
        isFromGuestCheckout: true,
        addAddressCallback: this._addAddressCallback,
      });
    }
  };

  _addAddressCallback = addressDict => {
    this.setState({addressDict}, () => {
      console.log('ADDRESS==>', addressDict);
      this._setShippingAddress();
    });
  };

  _didSelectUserAddress = (addressDict, selectedAddressIndex) => {
    console.log('ADDRESS====', addressDict);
    this.setState({addressDict, selectedAddressIndex}, () => {
      this._setShippingAddress();
    });
  };

  _setShippingAddress = () => {
    const {addressDict} = this.state;
    const {userToken, guestInfo, userInfo} = this.props;

    let email = userToken.length > 0 ? userInfo.email : guestInfo.email;

    let params = {
      addressInformation: {
        shippingAddress: {
          country_id: addressDict.country_id,
          street: addressDict.street,
          company: addressDict.company,
          telephone: addressDict.telephone,
          postcode: addressDict.postcode,
          city: addressDict.city,
          firstname: addressDict.firstname,
          lastname: addressDict.lastname,
          email: email,
          sameAsBilling: 1,
        },
        billingAddress: {
          country_id: addressDict.country_id,
          street: addressDict.street,
          company: addressDict.company,
          telephone: addressDict.telephone,
          postcode: addressDict.postcode,
          city: addressDict.city,
          firstname: addressDict.firstname,
          lastname: addressDict.lastname,
          email: email,
        },
        shipping_method_code: 'flatrate',
        shipping_carrier_code: 'flatrate',
      },
    };
    this.props.setShipmentInfo(params, false, this._setShippingAddressCallback);
  };

  _setShippingAddressCallback = status => {
    if (status) {
      this.props.getPaymentAndShippingMethods(
        this._getPaymentAndShippingMethodsCallback,
      );
    } else {
      showSingleAlert(translate('shipping address error'));
    }
  };

  _didTapOnShipmentMethod = item => {
    //TODO: shipment tap
  };

  _didTapOnPaymentMethod = item => {
    //TODO: payment tap
  };

  _didOpenCompletionPage = () => {
    const {addressDict, totalCostDict, mCartList, mGuestcartList} = this.state;
    const {userToken} = this.props;
    let itemArray = userToken.length > 0 ? mCartList : mGuestcartList;

    this.props.navigation.navigate('OrderCompletion', {
      addressDict: addressDict,
      totalCostDict: totalCostDict,
      itemArray: itemArray,
    });
  };

  _didTapOnPlaceOrder = () => {
    const {addressDict} = this.state;
    const {userToken, guestInfo, userInfo} = this.props;

    if (!addressDict.firstname) {
      showSingleAlert(translate('Please add your address'));
      return;
    }

    let email = userToken.length > 0 ? userInfo.email : guestInfo.email;

    let params = {
      addressInformation: {
        shippingAddress: {
          country_id: addressDict.country_id,
          street: addressDict.street,
          company: addressDict.company,
          telephone: addressDict.telephone,
          postcode: addressDict.postcode,
          city: addressDict.city,
          firstname: addressDict.firstname,
          lastname: addressDict.lastname,
          email: email,
          sameAsBilling: 1,
        },
        billingAddress: {
          country_id: addressDict.country_id,
          street: addressDict.street,
          company: addressDict.company,
          telephone: addressDict.telephone,
          postcode: addressDict.postcode,
          city: addressDict.city,
          firstname: addressDict.firstname,
          lastname: addressDict.lastname,
          email: email,
        },
        shipping_method_code: 'flatrate',
        shipping_carrier_code: 'flatrate',
      },
    };
    this.props.setShipmentInfo(params, true, this._orderPlacedCallback);
  };

  _orderPlacedCallback = status => {
    if (status) {
      // showSingleAlert(
      //   translate('Order placed Successfully'),
      //   translate('Ok'),
      //   () => {
      //     this.props.navigation.goBack();
      //   },
      // );
      this._didOpenCompletionPage();
    }
  };

  _didTapOnEditOrderContent = () => {
    this.props.navigation.goBack();
  };

  _didTapOnApplyVoucher = () => {
    const {voucherCode} = this.state;
    if (voucherCode === '') {
      showSingleAlert(translate('voucher code empty'));
      return;
    }
    this.props.applyVoucher(voucherCode, status => {
      if (status) {
        showSingleAlert(translate('Voucher applied successfully'));
        this.setState({isVoucherApplied: true});
      } else {
        showSingleAlert(translate('Invalid Voucher'));
        this.setState({voucherCode: '', isVoucherApplied: false});
      }
    });
  };

  render() {
    const {
      isRTL,
      isLoading,
      guestcartList,
      cartList,
      userToken,
      productsSizes,
      productsColors,
      currency,
      storeCode,
      userInfo,
    } = this.props;

    const {
      addressDict,
      isSameDayDelivery,
      totalCostDict,
      nowTime,
      voucherCode,
      isVoucherApplied,
      paymentMethods,
    } = this.state;

    // let paymentMethods = ['KENT', 'Credit Card', 'Cash on Delivery'];
    let shipmentMethods = [
      {
        name: 'Fedex',
        delivery: 'Expected Delivery 2 days',
        price: 10,
        isSelected: false,
      },
      {
        name: 'Aramex',
        delivery: 'Expected Delivery 3 days',
        price: 8,
        isSelected: true,
      },
      {
        name: 'Bluedart',
        delivery: 'Expected Delivery 4 days',
        price: 5,
        isSelected: false,
      },
    ];

    let itemArray = userToken.length > 0 ? cartList : guestcartList;
    let newStreetAddress = '';
    let isAddressAvailable = false;
    if (addressDict && addressDict.firstname) {
      newStreetAddress =
        addressDict.street.length > 0 ? addressDict.street[0] : '';
      isAddressAvailable = true;
    }

    let currDate = new Date();
    let maxDate = new Date(currDate.setDate(currDate.getDate() + 2 * 7));

    return (
      <SafeAreaView style={styles.safeContainer}>
        <NavigationHeader1
          isRTL={isRTL}
          title={translate('Checkout')}
          didTapOnLeftButton={() => this.props.navigation.goBack()}
        />
        <ScrollView
          styl={{flex: 1, backgroundColor: Constants.APP_GRAY_COLOR2}}>
          <View style={{flex: 1, backgroundColor: Constants.APP_GRAY_COLOR2}}>
            <FlatList
              style={{flex: 1, backgroundColor: Constants.APP_GRAY_COLOR2}}
              data={itemArray}
              extraData={itemArray}
              renderItem={({item, index}) => (
                <CategoryCall
                  item={item}
                  index={index}
                  productsSizes={productsSizes}
                  productsColors={productsColors}
                  currency={currency}
                  totalCost={totalCostDict}
                />
              )}
            />

            {(storeCode === 'kwstoreen' || storeCode === 'kwstorear') && (
              <View style={styles.itemCellContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                  }}>
                  <TouchableOpacity
                    hitSlop={{}}
                    onPress={() => {
                      this.setState({isSameDayDelivery: !isSameDayDelivery});
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={
                          !isSameDayDelivery
                            ? Images.filterIcons.check_outline
                            : Images.filterIcons.check_tick
                        }
                        style={styles.tickSwitch}
                      />
                      <Text style={[styles.addVoucherCode, {marginLeft: 10}]}>
                        {translate('Sameday Delivery')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {!isSameDayDelivery && (
                  <View style={{}}>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: Constants.APP_GRAY_COLOR2,
                      }}
                    />

                    <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                      <View
                        style={[
                          styles.sameDayDeliveryPickerContainer,
                          {marginRight: 10},
                        ]}>
                        <Text style={styles.deliveryDateText}>
                          {translate('Delivery Date')}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({showDatePicker: true});
                          }}
                          style={styles.pickerButton}>
                          <Text style={styles.dateText}>
                            {format(this.state.newDate, 'dd-MM-yyyy')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={[
                          styles.sameDayDeliveryPickerContainer,
                          {marginLeft: 10},
                        ]}>
                        <Text style={styles.deliveryDateText}>
                          {translate('Delivery Time')}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({showTimePicker: true});
                          }}
                          style={styles.pickerButton}>
                          <Text style={styles.dateText}>{nowTime}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            )}

            <View style={styles.itemCellContainer}>
              <View style={{marginHorizontal: 20}}>
                <Text style={styles.addVoucherCode}>
                  {translate('Add Voucher code')}
                </Text>
                <View style={{flexDirection: 'row', marginBottom: 25}}>
                  <TextInput
                    style={[
                      styles.voucherInput,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]}
                    value={voucherCode}
                    onChangeText={text => this.setState({voucherCode: text})}
                    placeholder={translate('Enter Voucher Code')}
                  />
                  <TouchableOpacity
                    style={[
                      styles.applyButton,
                      {
                        backgroundColor: isVoucherApplied
                          ? 'green'
                          : Constants.APP_THEME_COLOR,
                      },
                    ]}
                    onPress={this._didTapOnApplyVoucher}>
                    {isVoucherApplied ? (
                      <Text
                        style={[
                          styles.applyText,
                          {color: Constants.APP_WHITE_COLOR},
                        ]}>
                        {translate('Applied')}
                      </Text>
                    ) : (
                      <Text style={styles.applyText}>{translate('Apply')}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.itemCellContainer}>
              <View style={{marginHorizontal: 20}}>
                <Text style={styles.addVoucherCode}>
                  {translate('Payment Methods')}
                </Text>
                {paymentMethods.map(item => (
                  <TouchableOpacity
                    onPress={() => this._didTapOnPaymentMethod(item)}
                    style={styles.paymentMethodButton}
                    activeOpacity={Constants.ACTIVE_OPACITY}>
                    <View style={styles.paymentOption}>
                      <View
                        style={[
                          styles.paymentOption2,
                          {
                            backgroundColor:
                              item === 'Cash on Delivery'
                                ? Constants.APP_THEME_COLOR
                                : 'white',
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.paymentText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
                <View style={{height: 10}} />
              </View>
            </View>

            <View style={styles.itemCellContainer}>
              <View style={{marginHorizontal: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.addVoucherCode, {flex: 1}]}>
                    {translate('Delivery and Billing Address')}
                  </Text>
                  {isAddressAvailable && (
                    <TouchableOpacity
                      onPress={this._didTapOnAddAddress}
                      style={{
                        height: 26,
                        width: 126,
                        borderRadius: 13,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: Constants.APP_GRAY_COLOR2,
                      }}>
                      <Text
                        style={{
                          fontFamily: Constants.Fonts.REGULAR,
                          color: Constants.APP_GREY_TEXT_COLOR,
                          fontSize: 13,
                        }}>
                        {translate('Change Address')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {isAddressAvailable ? (
                  <View>
                    <Text style={styles.addressText}>
                      {addressDict.firstname + ' ' + addressDict.lastname}
                    </Text>
                    <Text style={styles.addressText}>{newStreetAddress}</Text>
                    <Text style={styles.addressText}>
                      {addressDict.city + ' ' + addressDict.postcode}
                    </Text>
                    <Text style={styles.addressText}>
                      {addressDict.telephone}
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={this._didTapOnAddAddress}
                    style={{
                      height: 26,
                      width: 126,
                      borderRadius: 13,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: Constants.APP_GRAY_COLOR2,
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: Constants.Fonts.REGULAR,
                        color: Constants.APP_GREY_TEXT_COLOR,
                        fontSize: 13,
                      }}>
                      {translate('Add Address')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {storeCode !== 'kwstoreen' && storeCode !== 'kwstorear' && (
              <View style={styles.itemCellContainer}>
                <View style={{marginHorizontal: 20}}>
                  <Text style={styles.addVoucherCode}>
                    {translate('Shipment Methods')}
                  </Text>
                  {shipmentMethods.map(item => (
                    <TouchableOpacity
                      onPress={() => this._didTapOnShipmentMethod(item)}
                      style={[
                        styles.paymentMethodButton,
                        {backgroundColor: Constants.APP_WHITE_COLOR},
                      ]}
                      activeOpacity={Constants.ACTIVE_OPACITY}>
                      <View style={styles.paymentOption}>
                        <View
                          style={[
                            styles.paymentOption2,
                            {
                              backgroundColor: item.isSelected
                                ? Constants.APP_THEME_COLOR
                                : Constants.APP_WHITE_COLOR,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.paymentText}>{item.name}</Text>
                      <Text style={[styles.paymentText, {flex: 1}]}>
                        {item.delivery}
                      </Text>
                      <Text style={styles.paymentText}>
                        {item.price + ' ' + currency}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <View style={{height: 10}} />
                </View>
              </View>
            )}

            <View style={styles.itemCellContainer}>
              <View style={{marginHorizontal: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.titleLabel}>
                    {translate('Cart Total')}
                  </Text>
                  <Text style={styles.titleValueLabel}>
                    {totalCostDict.subtotal + ' ' + currency}
                  </Text>
                </View>

                {totalCostDict.items.map((data, index) => (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.titleLabel}>
                      {translate('item') + (index + 1) + translate('Discount')}
                    </Text>
                    <Text
                      style={[
                        styles.titleValueLabel,
                        {color: 'rgb(249,91,91)'},
                      ]}>
                      {'-' + data.discount_amount + ' ' + currency}
                    </Text>
                  </View>
                ))}

                {storeCode !== 'kwstoreen' && storeCode !== 'kwstorear' && (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.titleLabel}>
                      {translate('Shipping Charges')}
                    </Text>
                    <Text style={styles.titleValueLabel}>
                      {'8' + ' ' + currency}
                    </Text>
                  </View>
                )}

                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text style={styles.titleLabel}>
                    {translate('Cart Total (After Discounts)')}
                  </Text>
                  <Text style={styles.titleValueLabel}>
                    {totalCostDict.grand_total + ' ' + currency}
                  </Text>
                </View>

                <View
                  style={{
                    height: 1,
                    backgroundColor: Constants.APP_GRAY_COLOR,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    marginTop: 5,
                  }}>
                  <Text
                    style={[
                      styles.titleLabel,
                      {
                        flex: 1,
                        fontFamily: Constants.Fonts.BOLD,
                        color: Constants.APP_BLACK_COLOR,
                      },
                    ]}>
                    {translate('TOTAL PAYMENT')}
                  </Text>
                  <Text
                    style={[
                      styles.titleLabel,
                      {
                        fontFamily: Constants.Fonts.BOLD,
                        color: Constants.APP_BLACK_COLOR,
                      },
                    ]}>
                    {parseFloat(totalCostDict.grand_total + 8) + ' ' + currency}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 5,
                  width: '100%',
                  backgroundColor: Constants.APP_GRAY_COLOR2,
                }}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.addTocartButton}
            activeOpacity={Constants.activeOpacity}
            onPress={this._didTapOnEditOrderContent}>
            <Text style={styles.addToCartText}>
              {translate('EDIT ORDER CONTRNT')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buyNowButton}
            activeOpacity={Constants.activeOpacity}
            onPress={this._didTapOnPlaceOrder}>
            {/* onPress={this._didOpenCompletionPage}> */}
            <Text style={styles.buyNowText}>{translate('PLACE ORDER')}</Text>
          </TouchableOpacity>
        </View>
        {isLoading && <HudView />}

        <Modal
          isVisible={this.state.showDatePicker}
          onBackdropPress={() => this.setState({showDatePicker: false})}
          onBackButtonPress={() => this.setState({showDatePicker: false})}>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: 'rgb(255,255,255)',
            }}>
            <DatePicker
              mode="date"
              minimumDate={this.state.nowDate}
              maximumDate={maxDate}
              date={this.state.newDate}
              onDateChange={date => this.setState({newDate: date})}
            />
          </View>
        </Modal>

        <Modal
          isVisible={this.state.showTimePicker}
          onBackdropPress={() => this.setState({showTimePicker: false})}
          onBackButtonPress={() => this.setState({showTimePicker: false})}>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: 'rgb(255,255,255)',
            }}>
            {/* <DatePicker
              mode="time"
              minuteInterval={60}
              minimumDate={this.state.nowTime}
              date={this.state.newTime}
              onDateChange={date => this.setState({newTime: date})}
            /> */}
            <Picker
              selectedValue={this.state.nowTime}
              style={{
                height: Constants.IS_ANDROID ? 50 : 200,
                width: Constants.SCREEN_WIDTH - 100,
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({nowTime: itemValue})
              }>
              <Picker.Item
                label="10:00 am - 11:00 am"
                value="10:00 am - 11:00 am"
              />
              <Picker.Item
                label="11:00 am - 12:00 pm"
                value="11:00 am - 12:00 pm"
              />
              <Picker.Item
                label="12:00 pm - 01:00 pm"
                value="12:00 pm - 01:00 pm"
              />
              <Picker.Item
                label="01:00 pm - 02:00 pm"
                value="01:00 pm - 02:00 pm"
              />
              <Picker.Item
                label="02:00 pm - 03:00 pm"
                value="02:00 pm - 03:00 pm"
              />
              <Picker.Item
                label="03:00 pm - 04:00 pm"
                value="03:00 pm - 04:00 pm"
              />
              <Picker.Item
                label="04:00 pm - 05:00 pm"
                value="04:00 pm - 05:00 pm"
              />
              <Picker.Item
                label="05:00 pm - 06:00 pm"
                value="05:00 pm - 06:00 pm"
              />
              <Picker.Item
                label="06:00 pm - 07:00 pm"
                value="06:00 pm - 07:00 pm"
              />
            </Picker>
          </View>
        </Modal>

        {/* <DatePicker date={new Date()} onDateChange={() => {}} /> */}
      </SafeAreaView>
    );
  }
}

export default CheckoutView;
