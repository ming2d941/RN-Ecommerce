/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 18, 2020
 * item Cell -
 */

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, Component} from 'react';
import Constants from '../config/constants';
import Images from '../config/images';
import {
  normalizedHeight,
  normalizedWidth,
  showSingleAlert,
  showSimpleSnackbar,
} from '../config/common';
import {translate} from '../config/languageSwitching/index';

import ImageLoader from 'react-native-image-progress';
let colorName = [];
let sizeName = [];
const KeyText = ({itemKey, keylabel, currency}) => {
  let value =
    itemKey === 'Gross Total' || itemKey === 'Unit Price'
      ? keylabel + ' ' + currency
      : keylabel;
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        // justifyContent: 'flex-start',
      }}>
      <View style={{width: '40%'}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Constants.Fonts.REGULAR,
            color: Constants.APP_GRAY_COLOR3,
            textAlign: 'left',
          }}>
          {itemKey}
        </Text>
      </View>
      <View style={{width: '40%', height: 20}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Constants.Fonts.REGULAR,
            textAlign: 'left',
            color:
              itemKey === 'Gross Total'
                ? Constants.APP_TEXT_PINK_COLOR
                : Constants.APP_GRAY_COLOR3,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const QuantityControl = ({quantiryItem, getQuantity, updateCartProduct}) => {
  const [quantityValue, setQuantity] = useState(quantiryItem.qty);

  function incrementQuantity() {
    if (quantityValue >= Constants.MAX_PRODUCT_COUNT) {
      showSimpleSnackbar(
        translate('Product maximum count is') +
          ' ' +
          Constants.MAX_PRODUCT_COUNT,
      );

      // showSingleAlert(
      //   translate('Product maximum count is') +
      //     ' ' +
      //     Constants.MAX_PRODUCT_COUNT,
      // );
      return;
    }

    setQuantity(quantityValue + 1);
    getQuantity(quantityValue + 1);
    updateCartProduct(quantityValue + 1);
  }
  function decrementQuantity() {
    if (quantityValue - 1 >= 1) {
      setQuantity(quantityValue - 1);
      getQuantity(quantityValue - 1);
      updateCartProduct(quantityValue - 1);
    }
  }
  return (
    <View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={decrementQuantity}
        style={{
          borderWidth: 1,
          borderColor: Constants.APP_GREY_TEXT_COLOR,
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Constants.APP_GREY_TEXT_COLOR,
            fontFamily: Constants.Fonts.REGULAR,
          }}>
          -
        </Text>
      </TouchableOpacity>
      <TextInput
        style={{
          marginHorizontal: 14,
          width: 30,
          textAlign: 'center',
          paddingVertical: 0,
          fontSize: 16,
          fontFamily: Constants.Fonts.MEDIUM,
          color: Constants.APP_BLACK_COLOR,
        }}
        value={quantityValue.toString()}
      />

      <TouchableOpacity
        onPress={incrementQuantity}
        style={{
          // marginLeft: 10,
          borderWidth: 1,
          borderColor: Constants.APP_GREY_TEXT_COLOR,
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Constants.APP_GREY_TEXT_COLOR,
            fontFamily: Constants.Fonts.REGULAR,
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ItemCell = React.memo(
  ({
    item,
    index,
    productsColors,
    productsSizes,
    addProductToWishList,
    allowAddOption,
    showQuantity,
    currency,
    updateCartProductToParent,
    totalCost,
  }) => {
    function removeFromCart() {}

    function addToWishList() {
      addProductToWishList(item);
    }

    function updateCartProduct(qty) {
      updateCartProductToParent(qty, item, index);
    }

    const totalProductGross = item.price * item.qty;
    const [totalGross, setTotalGross] = useState(totalProductGross);

    function getQuantity(quantityValue) {
      setTotalGross(quantityValue * item.price);
    }
    console.log('item inside', item);

    if (item.product_option && item.product_option.extension_attributes) {
      const attributesColor = item.product_option.extension_attributes.configurable_item_options.filter(
        color => {
          return color.option_id === '93';
        },
      );
      const attributesSize = item.product_option.extension_attributes.configurable_item_options.filter(
        size => {
          return size.option_id === '178';
        },
      );
      const colorID = attributesColor[0].option_value.toString();
      const sizeID = attributesSize[0].option_value.toString();

      colorName = productsColors.filter(item => {
        return colorID === item.value;
      });
      sizeName = productsSizes.filter(item => {
        return sizeID === item.value;
      });
      console.log('colorName,sizename \n', colorName, sizeName);
    } else {
      colorName = [];
      sizeName = [];
    }

    const imageSource =
      item.extension_attributes && item.extension_attributes.image
        ? {uri: Constants.APP_S3_BASE_URL + item.extension_attributes.image}
        : Images.placeHolderProduct;

    let unitPrice = item.price;

    let total = totalGross;

    if (totalCost && totalCost.items) {
      totalCost.items.map((dataItem, index) => {
        if (dataItem.item_id === item.item_id) {
          unitPrice = dataItem.price_incl_tax;
          total = dataItem.row_total;
        }
      });
    }

    return (
      <View style={{marginTop: 5, backgroundColor: Constants.APP_WHITE_COLOR}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 20,
          }}>
          <Image
            source={imageSource}
            defaultSource={Images.placeHolderProduct}
            style={{
              width: 102, //normalizedWidth(102),
              height: 143, //normalizedWidth(143),
              borderRadius: 5,
            }}
          />
          <View style={{marginHorizontal: 20}}>
            <Text
              multiline={true}
              numberOfLines={0}
              style={{
                flex: 1,
                fontFamily: Constants.Fonts.MEDIUM,
                fontSize: 15,
                color: Constants.APP_BLACK_COLOR,
                textAlign: 'left',
              }}>
              {item.name}
            </Text>

            <View style={{flex: 1}}>
              {sizeName.length > 0 && (
                <KeyText
                  itemKey={translate('Size')}
                  keylabel={sizeName[0].label}
                  currency={currency}
                />
              )}
              {colorName.length > 0 && (
                <KeyText
                  itemKey={translate('Color')}
                  keylabel={colorName[0].label}
                  currency={currency}
                />
              )}
              {showQuantity && (
                <KeyText
                  itemKey={translate('Quantity')}
                  keylabel={item.qty}
                  currency={currency}
                />
              )}
              <KeyText
                itemKey={translate('Unit Price')}
                keylabel={unitPrice}
                currency={currency}
              />
              <KeyText
                itemKey={translate('Gross Total')}
                keylabel={total.toFixed(2)}
                currency={currency}
              />
            </View>

            {allowAddOption && (
              <QuantityControl
                quantiryItem={item}
                getQuantity={getQuantity}
                updateCartProduct={updateCartProduct}
              />
            )}
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({});

export default ItemCell;
