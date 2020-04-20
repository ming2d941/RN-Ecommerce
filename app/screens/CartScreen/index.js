import React, {useState, useCallback, memo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Constants from '../../config/constants';
import Images from '../../config/images';
import styles from './styles.js';
import * as CartActions from '../../actions/cartActions';
import NavigationHeader2 from '../../components/NavigationHeaders/NavigationHeader2';
import HudView from '../../components/hudView';
import EmptyDataPlaceholder from '../../components/emptyDataPlaceholder';
import {translate} from '../../config/languageSwitching';
import {
  isEmpty,
  showAlertWithCallback,
  showSingleAlert,
} from '../../config/common';

import ItemCell from '../../components/itemCell';
import Login from '../LoginScreen';
import Modal from 'react-native-modal';

const CategoryCall = memo(
  ({
    item,
    index,
    productsColors,
    removeItemFromCart,
    productsSizes,
    addProductToWishList,
    updateCartProductContainer,
    currency,
    totalCost,
    userToken,
    loginCallback,
  }) => {
    function removeFromCart() {
      removeItemFromCart(item, index);
    }
    function addToWishList() {
      if (userToken.length > 0) {
        addProductToWishList(item);
      } else {
        showAlertWithCallback(
          translate('user_not_login'),
          translate('Login'),
          translate('Cancel'),
          () => {
            loginCallback(true);
          },
          null,
        );
      }
    }

    const totalProductGross = item.price * item.qty;
    const [totalGross, setTotalGross] = useState(totalProductGross);

    function getQuantity(quantityValue) {
      setTotalGross(quantityValue * item.price);
    }

    function updateCartProduct(qty, item, index) {
      updateCartProductContainer(qty, item, index);
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
            allowAddOption={true}
            showQuantity={false}
            currency={currency}
            updateCartProductToParent={updateCartProduct}
            totalCost={totalCost}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 0}}>
          <TouchableOpacity
            onPress={removeFromCart}
            style={{
              width: '50%',
              borderWidth: 2,
              borderColor: Constants.APP_BOX_BACKGROUND_GREY,
              borderBottomColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
            }}>
            <Text
              style={{
                color: Constants.APP_GREY_TEXT_COLOR,
                fontFamily: Constants.Fonts.REGULAR,
                fontSize: 12,
              }}>
              REMOVE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addToWishList}
            style={{
              width: '50%',
              borderWidth: 1,
              borderColor: Constants.APP_BOX_BACKGROUND_GREY,
              borderBottomColor: 'transparent',
              borderRightColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              height: 35,
            }}>
            <Text
              style={{
                color: Constants.APP_GREY_TEXT_COLOR,
                fontFamily: Constants.Fonts.REGULAR,
                fontSize: 12,
              }}>
              ADD TO WISHLIST
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default function CartScreen(props) {
  const isRTL = useSelector(state =>
    state.appReducer.selectedLanguage === 'ar' ? true : false,
  );
  const productsSizes = useSelector(state => state.appReducer.productsSizes);
  const currency = useSelector(state => state.appReducer.currency);
  const productsColors = useSelector(state => state.appReducer.productsColors);
  const cartList = useSelector(state => state.cartReducer.cartArray);
  const guestcartList = useSelector(state => state.cartReducer.guestCartArray);
  const userToken = useSelector(state => state.appReducer.userToken);
  const guestToken = useSelector(state => state.appReducer.guestToken);
  const isLoading = useSelector(state => state.loadingReducer.isLoading);
  const cartId = useSelector(state => state.loginReducer.cartID);
  const guestInfo = useSelector(state => state.loginReducer.guestInfo);

  const isUserLoggedIn = isEmpty(userToken);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [totalCost, setTotalCost] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);

  const arrLength =
    userToken.length > 0 ? cartList.length : guestcartList.length;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('commonTotalPriceUpdate();', arrLength);
    if (arrLength > 0) {
      commonTotalPriceUpdate();
    }
  }, []);

  function addProductToWishList(product) {
    let dict = product.extension_attributes;
    let entityId = dict.entity_id;
    dispatch(
      CartActions.addProductFromCartToWishList(
        entityId,
        product.item_id,
        status => {
          alert(status);
          if (status) {
            commonTotalPriceUpdate();
          }
        },
      ),
    );
  }

  function commonTotalPriceUpdate() {
    dispatch(
      CartActions.getTotalCost(totalCostDict => {
        if (totalCostDict) {
          setTotalCost(totalCostDict);
          setFinalPrice(
            totalCostDict.total_segments.length > 0
              ? totalCostDict.grand_total
              : 0,
          );
        }
      }),
    );
  }

  function updateCartProductContainer(qty, item, index) {
    let guestparams = {
      cart_item: {
        sku: item.sku,
        qty: qty,
        quote_id: userToken === '' ? guestToken : cartId,
        item_id: item.item_id,
      },
    };

    if (userToken === '') {
      dispatch(
        CartActions.updateGuestCart(
          item.item_id,
          updateGuestCartCallback,
          guestparams,
          index,
        ),
      );
    } else {
      dispatch(
        CartActions.updateUserCart(guestparams, updateCallback, item.item_id),
      );
    }
  }

  function removeItemFromCartContainer(item, index) {
    if (userToken === '') {
      dispatch(
        CartActions.removeGuestCart(
          item.item_id,
          removeGuestCartCallback,
          index,
        ),
      );
    } else {
      dispatch(
        CartActions.removeUserCart(item.item_id, removeUserCartCallback),
      );
    }
  }

  function updateGuestCartCallback(status) {
    console.log('updateGuestCartCallback status', status);
    if (status) {
      commonTotalPriceUpdate();
    }
  }
  function removeGuestCartCallback(status) {
    console.log('removeGuestCartCallback status', status);
    if (status) {
      commonTotalPriceUpdate();
    }
  }
  function removeUserCartCallback(status) {
    console.log('removeUserCartCallback status', status);
    if (status) {
      commonTotalPriceUpdate();
    }
  }

  function updateCallback(status) {
    if (status) {
      commonTotalPriceUpdate();
    }
  }

  function _didTapOnContinueShopping() {
    props.navigation.navigate('Home');
  }

  function _didTapOnCheckOut() {
    let cartData = isUserLoggedIn ? guestcartList : cartList;

    if (cartData.length > Constants.MAX_CART_SIZE) {
      showSingleAlert(
        translate('cart count exceeds1') +
          Constants.MAX_CART_SIZE +
          translate('cart count exceeds2'),
      );
      return;
    }

    let isOverItem = false;
    cartData.map(item => {
      if (item.qty > Constants.MAX_PRODUCT_COUNT) {
        isOverItem = true;
      }
    });

    if (isOverItem) {
      showSingleAlert(
        translate('products maximum count exceeds1') +
          Constants.MAX_PRODUCT_COUNT +
          translate('products maximum count exceeds2'),
      );
      return;
    }

    if (userToken.length > 0) {
      props.navigation.navigate('Checkout', {totalCost});
    } else {
      if (!guestInfo) {
        setModalVisible(true);
      } else {
        props.navigation.navigate('Checkout', {totalCost});
      }
    }
  }

  function _didTapOnBackButton() {
    props.navigation.goBack();
  }

  const renderFooter = () => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10,
          marginBottom: 10,
          flexDirection: 'row',
          jflex: 1,
          backgroundColor: Constants.APP_WHITE_COLOR,
          height: 60,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            width: '50%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Constants.Fonts.MEDIUM,
              color: Constants.APP_BLACK_COLOR,
            }}>
            {translate('TOTAL AMOUNT')}
          </Text>
        </View>
        <View
          style={{
            width: '50%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Constants.Fonts.MEDIUM,
              color: Constants.APP_BLACK_COLOR,
            }}>
            {finalPrice} {currency}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Constants.APP_WHITE_COLOR}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={Constants.APP_BLACK_COLOR}
        translucent={false}
      />

      <NavigationHeader2
        title={translate('Cart')}
        showBackButton={true}
        didTapOnBackButton={_didTapOnBackButton}
        hideBottomLine={false}
        isRTL={isRTL}
        hideSearch={true}
      />

      {!arrLength ? (
        <View style={{flex: 1}}>
          <EmptyDataPlaceholder
            titleText={translate('Your Cart is empty')}
            descriptionText={translate('cart_empty_list_placeholder')}
            placeHolderImage={Images.cartEmpty}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{backgroundColor: 'white', flex: 1}}>
            {totalCost && (
              <FlatList
                style={{
                  flex: 1,
                  backgroundColor: Constants.APP_SEPARATOR_COLOR,
                }}
                data={isUserLoggedIn ? guestcartList : cartList}
                extraData={isUserLoggedIn ? guestcartList : cartList}
                renderItem={({item, index}) => (
                  <CategoryCall
                    item={item}
                    addProductToWishList={addProductToWishList}
                    index={index}
                    productsSizes={productsSizes}
                    productsColors={productsColors}
                    removeItemFromCart={removeItemFromCartContainer}
                    updateCartProductContainer={updateCartProductContainer}
                    currency={currency}
                    totalCost={totalCost}
                    userToken={userToken}
                    loginCallback={value => setLoginModalVisible(value)}
                  />
                )}
                ListFooterComponent={renderFooter}
              />
            )}
          </View>
          {totalCost && (
            <View style={styles.bottomButtonContainer}>
              <TouchableOpacity
                style={styles.addTocartButton}
                activeOpacity={Constants.activeOpacity}
                onPress={_didTapOnContinueShopping}>
                <Text style={styles.addToCartText}>
                  {translate('CONTINUE SHOPPING')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buyNowButton}
                activeOpacity={Constants.activeOpacity}
                onPress={_didTapOnCheckOut}>
                <Text style={styles.buyNowText}>{translate('CHECKOUT')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={modalVisible}>
        <View style={{flex: 1}}>
          <Login
            isGuestLogin={true}
            didTapOnclose={() => setModalVisible(false)}
            guestInfoAddedCallback={() => {
              setModalVisible(false);
              props.navigation.navigate('Checkout', {totalCost});
            }}
          />
        </View>
      </Modal>
      <Modal
        onBackButtonPress={() => setLoginModalVisible(false)}
        isVisible={loginModalVisible}>
        <View style={{flex: 1}}>
          <Login didTapOnclose={() => setLoginModalVisible(false)} />
        </View>
      </Modal>

      {isLoading && <HudView />}
    </SafeAreaView>
  );
}
