/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * CategoriesView - Categories and subcategories list
 */

import styles from './styles';
import React, {Component} from 'react';
import Constants from '../../config/constants';
import {
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import NavigationHeader2 from '../../components/NavigationHeaders/NavigationHeader2';
import {FlatList} from 'react-native-gesture-handler';
import Images from '../../config/images';
import ImageLoader from 'react-native-image-progress';
import {normalizedHeight, normalizedWidth} from '../../config/common';

const isPotrait = () => {
  const {width, height} = Dimensions.get('window');
  return height >= width;
};

class CategoriesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialIndex: 1,
      renderSubCategories: [],
      selectedTitle: '',
      orientation: isPotrait() ? 'potrait' : 'landscape',
      headerCategories: props.categoryLists,
    };
    Dimensions.addEventListener('change', () => {
      this.setState({orientation: isPotrait() ? 'potrait' : 'landScape'});
    });
  }

  _didTapOnSearch = () => {
    this.props.navigation.navigate('Search');
  };

  _didTapOnCart = () => {
    this.props.navigation.navigate('Cart');
  };

  didTapOnItem = (item, selectedindex) => {
    this.state.headerCategories.map((item, index) => {
      if (index === selectedindex) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    console.log('item', item);
    this.setState({
      renderSubCategories: item.subCategories,
      selectedTitle: item.title,
    });
  };

  componentDidMount() {
    this.state.headerCategories.map((item, index) => {
      if (index === 0) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    this.setState({
      renderSubCategories: this.state.headerCategories[0].subCategories || [],
      selectedTitle: this.state.headerCategories[0].title || '',
    });
  }

  render() {
    const {renderSubCategories, headerCategories} = this.state;
    const {cartArray} = this.props;
    console.log(
      Constants.APP_S3_BASE_URL +
        headerCategories[1].home_image.replace('/pub/media/', ''),
      'headerCategories',
    );
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={Constants.APP_BLACK_COLOR}
          translucent={false}
        />
        <NavigationHeader2
          didTapOnFlag={this._didTapOnFlag}
          didTapOnSearch={this._didTapOnSearch}
          didTapOnCart={this._didTapOnCart}
          isShowFlag={false}
          isDark={true}
          showCart={true}
          cartItemsCount={cartArray.length}
        />
        <View
          style={{
            paddingTop: normalizedHeight(10),
            paddingBottom: normalizedHeight(16),
            backgroundColor: Constants.APP_WHITE_COLOR,
          }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={headerCategories}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={Constants.ACTIVE_OPACITY}
                onPress={() => this.didTapOnItem(item, index)}
                style={{
                  alignItems: 'center',
                  paddingHorizontal: normalizedWidth(14),
                }}>
                <View
                  style={{
                    marginVertical: 7,
                  }}>
                  <ImageLoader
                    source={{
                      uri:
                        Constants.APP_S3_BASE_URL +
                        item.home_image.replace('/pub/media/', ''),
                    }}
                    //defaultSource={Images.placeHolderProduct}
                    style={{
                      overflow: 'hidden',
                      width: normalizedWidth(82),
                      height: normalizedWidth(82),
                      borderRadius: normalizedWidth(82) / 2,
                      borderWidth: item.selected ? 4 : 0,
                      borderColor: item.selected
                        ? Constants.APP_THEME_COLOR
                        : '#ccc',
                    }}
                  />
                </View>
                <Text
                  style={
                    item.selected
                      ? styles.categorySelectedTitle
                      : styles.categoryTitle
                  }>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 12,
            backgroundColor: 'rgba(255,255,255,0.9)',
          }}>
          <FlatList
            data={renderSubCategories}
            extraData={this.state}
            renderItem={this.renderSubCategories}
            numColumns={3}
          />
        </View>
      </SafeAreaView>
    );
  }

  renderSubCategories = ({item, index}) => {
    const imagesUri =
      Constants.APP_S3_BASE_URL +
      item.home_page_slider_image.replace('/pub/media/', '');
    console.log('images uri ... ', imagesUri);
    return (
      //
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          alignItems: 'center',
          justifyContent: 'center',
          width: '30.4%',
          margin: isPotrait() ? normalizedWidth(6) : normalizedWidth(8),
          height: normalizedHeight(150),
          borderRadius: 15,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={() => this.navigateProductDetail(index)}>
          <ImageLoader
            style={{
              overflow: 'hidden',
              height: normalizedWidth(74),
              width: normalizedWidth(74),
              borderRadius: normalizedWidth(37),
            }}
            //defaultSource={Images.placeHolderProduct}
            source={{uri: imagesUri}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              fontFamily: Constants.Fonts.REGULAR,
              marginTop: 10,
            }}>
            {item.name.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
      // </TouchableOpacity>
    );
  };

  navigateProductDetail = index => {
    this.props.navigation.navigate('ProductListFromCategory', {
      subCategories: this.state.renderSubCategories,
      categoryName: this.state.selectedTitle,
      selectedSubCategoryIndex: index,
    });
  };
}

export default CategoriesView;
