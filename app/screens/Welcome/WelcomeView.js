/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * WelcomeView - First screen when app opens (User will select country and language here.)
 */

import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  I18nManager,
  BackHandler,
} from 'react-native';
import {translate} from '../../config/languageSwitching/index';
import styles from './styles';
import React, {Component} from 'react';
import RNRestart from 'react-native-restart';
import Constants from '../../config/constants';
import Images from '../../config/images';
import {showSingleAlert} from '../../config/common';

class WelcomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryId: 0,
      countryName: '',
      storeName: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  _didLanguageChange = language => {
    const {countryName} = this.state;
    const {storesView, storeConfiguration} = this.props;
    if (countryName) {
      let type = language === 'en' ? 'English' : 'Arabic';
      if (storesView && storesView.length > 0) {
        storesView.map(item => {
          if (
            item.store_group_id === this.state.countryId &&
            item.name === type
          ) {
            this.props.storeCodeUpdated(item.code);

            storeConfiguration.map(storeConfigItem => {
              if (storeConfigItem.code === item.code) {
                this.props.updateCurrency(
                  storeConfigItem.default_display_currency_code,
                );
              }
            });
          }
        });
      }
      setTimeout(() => {
        this._openTabPage(language);
      }, 200);
    } else {
      showSingleAlert('Please select any country', null);
    }
  };

  _openTabPage = language => {
    const {selectedLanguage} = this.props;
    if (language === selectedLanguage) {
      // this.props.navigation.dispatch(state => {
      //   return CommonActions.reset({
      //     index: 0,
      //     routes: [{name: 'Tab'}],
      //   });
      // });
      this.props.navigation.navigate('Tab');
    } else {
      this.props.didChangeLAnguage(language);
      if (language === 'ar') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
      setTimeout(() => {
        //setI18nConfigSecondTime(this.props.selectedLanguage);
        RNRestart.Restart();
      }, 100);
    }
  };

  _didCountrySelected = country => {
    const {stores} = this.props;
    if (stores && stores.length > 0) {
      stores.map(item => {
        if (item.name.toUpperCase() === country.toUpperCase()) {
          this.setState({countryId: item.id});
          this.setState({countryName: country});
        }
      });
    }
  };

  _didSelectedInternational = country => {
    const {stores} = this.props;
    const {storesView, storeConfiguration} = this.props;
    if (stores && stores.length > 0) {
      stores.map(item => {
        if (item.name.toUpperCase() === country.toUpperCase()) {
          let mCountryId = item.id;
          storesView.map(itemInner => {
            if (itemInner.store_group_id === mCountryId) {
              this.props.storeCodeUpdated(itemInner.code);
              storeConfiguration.map(storeConfigItem => {
                if (storeConfigItem.code === itemInner.code) {
                  this.props.updateCurrency(
                    storeConfigItem.default_display_currency_code,
                  );
                }
              });
              this._openTabPage('en');
            }
          });
        }
      });
    }
  };

  render() {
    const {selectedLanguage} = this.props;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar backgroundColor={Constants.APP_THEME_DARK_GRAY} />
        <View style={styles.topContainer}>
          <Image
            source={Images.logoLarge}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>

        <View style={styles.middleContainer}>
          <Text style={styles.chooseCountryText}>
            {translate('Choose Your Country')}
          </Text>

          <View style={styles.countryContainer}>
            <TouchableOpacity
              onPress={() => this._didCountrySelected('KUWAIT')}>
              <View style={styles.countryItem}>
                <Image
                  style={[
                    styles.countryIcon,
                    {
                      borderColor:
                        this.state.countryName === 'KUWAIT'
                          ? 'rgb(207, 155, 61)'
                          : 'rgb(164, 164, 164)',
                    },
                  ]}
                  source={Images.flags.kuwait}
                />
                <Text style={styles.countryText}>{'KUWAIT'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._didCountrySelected('KSA')}>
              <View style={styles.countryItem}>
                <Image
                  style={[
                    styles.countryIcon,
                    {
                      borderColor:
                        this.state.countryName === 'KSA'
                          ? 'rgb(207, 155, 61)'
                          : 'rgb(164, 164, 164)',
                    },
                  ]}
                  source={Images.flags.ksa}
                />
                <Text style={styles.countryText}>{'KSA'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._didCountrySelected('OMAN')}>
              <View style={styles.countryItem}>
                <Image
                  style={[
                    styles.countryIcon,
                    {
                      borderColor:
                        this.state.countryName === 'OMAN'
                          ? 'rgb(207, 155, 61)'
                          : 'rgb(164, 164, 164)',
                    },
                  ]}
                  source={Images.flags.oman}
                />
                <Text style={styles.countryText}>{'OMAN'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.countryContainer}>
            <TouchableOpacity
              onPress={() => this._didCountrySelected('BAHRAIN')}>
              <View style={styles.countryItem}>
                <Image
                  style={[
                    styles.countryIcon,
                    {
                      borderColor:
                        this.state.countryName === 'BAHRAIN'
                          ? 'rgb(207, 155, 61)'
                          : 'rgb(164, 164, 164)',
                    },
                  ]}
                  source={Images.flags.beharin}
                />
                <Text style={styles.countryText}>{'BAHRAIN'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._didCountrySelected('UAE')}>
              <View style={styles.countryItem}>
                <Image
                  style={[
                    styles.countryIcon,
                    {
                      borderColor:
                        this.state.countryName === 'UAE'
                          ? 'rgb(207, 155, 61)'
                          : 'rgb(164, 164, 164)',
                    },
                  ]}
                  source={Images.flags.uae}
                />
                <Text style={styles.countryText}>{'UAE'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._didCountrySelected('QATAR')}>
              <View style={styles.countryItem}>
                <Image
                  style={[
                    styles.countryIcon,
                    {
                      borderColor:
                        this.state.countryName === 'QATAR'
                          ? 'rgb(207, 155, 61)'
                          : 'rgb(164, 164, 164)',
                    },
                  ]}
                  source={Images.flags.qatar}
                />
                <Text style={styles.countryText}>{'QATAR'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={{color: 'rgb(129, 129, 129)', fontSize: 16, margin: 24}}>
            {translate('OR')}
          </Text>
          <TouchableOpacity
            onPress={() => this._didSelectedInternational('INTERNATIONAL')}>
            <Text style={styles.internationalText}>
              {translate('INTERNATIONAL')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => this._didLanguageChange('en')}>
            <Text style={styles.languageText}>{translate('ENGLISH')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => this._didLanguageChange('ar')}>
            <Text style={styles.languageText}>{translate('ARABIC')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default WelcomeView;
