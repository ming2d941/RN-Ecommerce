import {
  translate,
  changeLanguage,
  setI18nConfigSecondTime,
} from '../../config/languageSwitching/index';
import styles from './styles';
import React, {Component} from 'react';
import Images from '../../config/images';
import Constants from '../../config/constants';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import HudView from '../../components/hudView';
import EmptyDataPlaceholder from '../../components/emptyDataPlaceholder';
import NavigationHeader2 from '../../components/NavigationHeaders/NavigationHeader2';
import OrderHistoryCell from '../../components/orderHistoryCell';
import {isEmpty} from '../../config/common';

const ListItem = React.memo(
  ({
    item,
    index,
    productsColors,
    productsSizes,
    addProductToWishList,
    didTapOnItem,
    props,
  }) => {
    // function removeFromCart() {}
    // function addToWishList() {
    //   addProductToWishList(item);
    // }

    // function getQuantity(quantityValue) {
    //   console.log('quantityValue', quantityValue);
    //   setTotalGross(quantityValue * item.price);
    // }

    // const attributesColor = item.product_option.extension_attributes.configurable_item_options.filter(
    //   color => {
    //     return color.option_id === '93';
    //   },
    // );
    // const attributesSize = item.product_option.extension_attributes.configurable_item_options.filter(
    //   size => {
    //     return size.option_id === '178';
    //   },
    // );
    // const colorID = attributesColor[0].option_value.toString();
    // const sizeID = attributesSize[0].option_value.toString();

    // const colorName = productsColors.filter(item => {
    //   return colorID === item.value;
    // });
    // const sizeName = productsSizes.filter(item => {
    //   return sizeID === item.value;
    // });

    const orderCell = item.items.map(orderedItem => {
      if (orderedItem.parent_item) {
        return (
          <View style={{marginHorizontal: 0}}>
            <OrderHistoryCell
              item={orderedItem.parent_item}
              addProductToWishList={addProductToWishList}
              index={index}
              productsSizes={productsSizes}
              productsColors={productsColors}
              allowAddOption={false}
              showQuantity={false}
              currency={props.currency}
            />
          </View>
        );
      }
    });

    return (
      <TouchableOpacity
        activeOpacity={Constants.ACTIVE_OPACITY}
        onPress={() => {
          didTapOnItem(item, index);
        }}
        style={{
          marginTop: 3,
          backgroundColor: Constants.APP_WHITE_COLOR,
          marginBottom: 10,
        }}>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.orderNumberText}>
                {translate('Order Number :') + ' '}
              </Text>
              <Text style={styles.orderNumberText}>{item.increment_id}</Text>
            </View>
            <Image
              source={Images.arrowRight}
              resizeMode={'contain'}
              style={[
                styles.itemImage,
                {transform: [{rotate: props.isRTL ? '180deg' : '0deg'}]},
              ]}
            />
          </View>
          <Text
            style={[
              styles.deliveryStatusText,
              {color: item.status === 'pending' ? 'green' : 'red'},
            ]}>
            {item.status}
          </Text>
          <View style={styles.underLineStyle} />
        </View>
        {orderCell}
      </TouchableOpacity>
    );
  },
);

class OrderHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: '',
    };
  }

  componentDidMount() {
    this.props.getOrderHistory(response => {
      response.items.map(orderedItem => {
        let arr = [];
        arr = orderedItem.items.filter(subItem => {
          return subItem.product_type === 'simple';
        });
        orderedItem.items = arr;
      });
      console.log('order history after ', response);

      this.setState({orderList: response.items});
    });
  }

  _didTapOnBackButton = () => {
    this.props.navigation.goBack();
  };

  _didTapOnListItem = (item, index) => {
    this.props.navigation.navigate('OrderHistoryDetail', {orderItem: item});
  };

  render() {
    const {
      selectedLanguage,
      cartArray,
      guestCartArray,
      userToken,
      productsSizes,
      productsColors,
      isLoading,
      isRTL,
      currency,
    } = this.props;
    const {orderList} = this.state;
    const isUserLoggedIn = isEmpty(userToken);
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
        />
        <NavigationHeader2
          title={'Order History'}
          showBackButton={true}
          didTapOnBackButton={this._didTapOnBackButton}
          hideBottomLine={false}
          isRTL={selectedLanguage === 'ar' ? true : false}
          hideSearch={true}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: Constants.APP_GRAY_COLOR2}}>
          <View style={styles.scrollContainer}>
            {orderList.length > 0 && (
              <FlatList
                //data={isUserLoggedIn ? guestCartArray : cartArray}
                data={orderList}
                extraData={this.props}
                renderItem={({item, index}) => (
                  <ListItem
                    item={item}
                    index={index}
                    productsSizes={productsSizes}
                    productsColors={productsColors}
                    didTapOnItem={() => this._didTapOnListItem(item, index)}
                    props={this.props}
                  />
                )}
              />
            )}
          </View>
        </ScrollView>
        {!isLoading && orderList.length == 0 && (
          <View style={{alignSelf: 'center'}}>
            <EmptyDataPlaceholder
              titleText={translate('Your order history is empty')}
              descriptionText={translate('order_history_empty_placeholder')}
              placeHolderImage={Images.noWishlist}
            />
          </View>
        )}
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default OrderHistoryScreen;
