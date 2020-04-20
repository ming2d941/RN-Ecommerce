/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 25, 2020
 * Product Cell - Product basic info are display here
 */

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import Constants from '../config/constants';
import Images from '../config/images';
import {normalizedHeight, normalizedWidth} from '../config/common';
import {translate} from '../config/languageSwitching/index';

import ImageLoader from 'react-native-image-progress';

const ProductCell = React.memo(
  ({
    data,
    index,
    didSelectAdd,
    didTapOnLikeButton,
    screenWidth,
    numOfColumns,
    currency,
    likeActive,
  }) => {
    // console.log('ITEM', data);
    // console.log('INDEX', index);

    let imageUrl = Constants.APP_BASE_URL + '/pub/media/' + data.image;
    let actualPrice = data.actualprice;
    let finalPrice = data.finalPrice;
    let itemWidth = Constants.IS_ANDROID
      ? (screenWidth - 32) / numOfColumns
      : (screenWidth - 38) / numOfColumns; //32
    let percentage = Math.floor(
      ((actualPrice - finalPrice) / actualPrice) * 100,
    );

    return (
      <TouchableOpacity
        // key={index}
        activeOpacity={Constants.ACTIVE_OPACITY}
        style={{
          height: 300, //normalizedHeight(400),

          // marginTop: index == 0 || index == 1 ? 15 : 0,
          // width: (Constants.SCREEN_WIDTH - 40) / 4,
        }}
        onPress={() => {
          didSelectAdd(data);
        }}>
        <View
          style={{
            shadowOffset: {width: 0, height: 5},
            shadowColor: 'rgba(46,69,187,0.56)',
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}>
          <View
            style={{
              marginLeft: 3, //index % 2 == 0 ? 0 : 3,
              marginBottom: 5,
              borderRadius: 5,
              width: itemWidth - 2, //(Constants.SCREEN_WIDTH - 50) / 2,
              height: normalizedHeight(300),
              backgroundColor: Constants.APP_WHITE_COLOR,
              overflow: 'hidden',
              justifyContent: 'center',
              elevation: 3,
            }}>
            {/* <Image
              source={{uri: imageUrl}}
              resizeMode={'contain'}
              defaultSource={Images.placeHolderProduct}
              style={{
                // width: screenWidth / numOfColumns, //(Constants.SCREEN_WIDTH - 50) / 2,
                height: normalizedHeight(300),
              }}
            /> */}
            <ImageLoader
              source={{uri: imageUrl}}
              resizeMode={'contain'}
              // defaultSource={Images.placeHolderProduct}
              style={{
                // width: screenWidth / numOfColumns, //(Constants.SCREEN_WIDTH - 50) / 2,
                height: normalizedHeight(300),
              }}
            />

            {data.is_variants && (
              <View style={styles.variantsContainer}>
                <View style={styles.varientView}>
                  <Image
                    source={Images.variants}
                    resizeMode={'contain'}
                    style={{
                      width: 13, //normalizedWidth(13),
                      height: 13, //normalizedWidth(13),
                    }}
                  />
                  <Text style={styles.variantsText}>
                    {translate('variants')}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {!data.is_in_stock && (
            <View style={[styles.overlay, {width: itemWidth - 4}]} />
          )}
          {!data.is_in_stock && (
            <Text style={styles.outOfStockText}>
              {translate('Out of stock')}
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            didTapOnLikeButton(likeActive);
          }}
          style={styles.wishListContainer}>
          <Image
            source={Images.likeImage}
            resizeMode={'contain'}
            style={{
              width: 20,
              height: 20,
              tintColor: likeActive
                ? data.is_in_stock
                  ? Constants.APP_THEME_COLOR2
                  : 'rgba(203,39,100, 0.5)'
                : null,
            }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.productName,
            {
              color: data.is_in_stock
                ? Constants.APP_BLACK_COLOR
                : 'rgba(0,0,0,0.4)',
            },
          ]}>
          {data.name}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text
            style={[
              styles.cost,
              {
                color: data.is_in_stock
                  ? Constants.APP_THEME_COLOR2
                  : 'rgba(203,39,100,0.4)',
              },
            ]}>
            {data.finalPrice + ' ' + currency}
          </Text>
          {percentage > 0 && (
            <Text style={styles.offerText}>{percentage + '% OFF'}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  productName: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_BLACK_COLOR,
    marginTop: 5,
    marginHorizontal: 3,
    textAlign: 'left',
  },
  outOfStockText: {
    color: 'rgb(181,24,24)',
    position: 'absolute',
    width: '93%',
    fontSize: 16,
    fontFamily: Constants.Fonts.MEDIUM,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: normalizedHeight(36),
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    bottom: normalizedHeight(30),
    elevation: 3,
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255, 0.7)',
    position: 'absolute',
    top: 0,
    marginLeft: 3,
    marginBottom: 5,
    borderRadius: 10,
    height: normalizedHeight(298),
    elevation: 3,
  },
  cost: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_THEME_COLOR2,
    flex: 1,
    marginStart: 3,
    textAlign: 'left',
  },
  offerText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 12,
    color: Constants.APP_GRAY_COLOR3,
    marginRight: 20,
    // flex: 1,
  },
  wishListContainer: {
    width: 26, //normalizedWidth(26),
    height: 26, //normalizedWidth(26),
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 26 / 2, //normalizedWidth(26) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variantsContainer: {
    // width: normalizedWidth(26),
    // height: normalizedWidth(26),
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 26 / 2, //normalizedWidth(26) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  varientView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244,246,248,1)',
    height: 18, //normalizedHeight(20),
    width: 70, //normalizedWidth(75),
    borderRadius: 18 / 2, // normalizedHeight(20) / 2,
    borderWidth: 0.5,
    borderColor: 'rgba(110,110,110,0.3)',
  },
  variantsText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 10,
    color: Constants.APP_GRAY_COLOR3,
    marginLeft: 5,
  },
});

export default ProductCell;
