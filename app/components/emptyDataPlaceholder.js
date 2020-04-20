/**
 * Created by ILeaf solutions
 * on March 12, 2020
 * EmptyDataPlaceholder -
 */

import React, {Component} from 'react';
import {View, ActivityIndicator, Image, Text} from 'react-native';
import Constants from '../config/constants';
import Images from '../config/images';
import {
  normalizedHeight,
  normalizedWidth,
  showAlertWithCallback,
} from '../config/common';
import {translate} from '../config/languageSwitching/index';

export default class emptyDataPlaceholder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      titleText,
      descriptionText,
      placeHolderImage,
      imageStyle,
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Constants.APP_WHITE_COLOR,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -(normalizedWidth(300) / 2),
          }}>
          <Image
            resizeMode="contain"
            style={[
              {
                width: normalizedWidth(200),
                height: normalizedWidth(200),
              },
              imageStyle,
            ]}
            source={placeHolderImage}
          />
          <Text
            style={{
              fontFamily: Constants.Fonts.BOLD,
              fontSize: 16,
              color: Constants.APP_BLACK_COLOR,
              textAlign: 'center',
            }}>
            {titleText}
          </Text>
          <Text
            style={{
              fontFamily: Constants.Fonts.REGULAR,
              fontSize: 13,
              color: Constants.APP_GRAY_COLOR,
              textAlign: 'center',
              marginTop: 10,
            }}>
            {descriptionText}
          </Text>
        </View>
      </View>
    );
  }
}
