/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * Country Selection styles -
 */

import {StyleSheet} from 'react-native';
import Constants from '../../config/constants';
import {normalizedWidth} from '../../config/common';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  scrollContainer: {
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  countryContainer: {
    flexDirection: 'row',
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  countryIcon: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    marginHorizontal: 24,
    marginVertical: 14,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(164, 164, 164, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryText: {
    fontSize: 14,
    color: 'rgb(42,42,42)',
    alignSelf: 'center',
    fontFamily: Constants.Fonts.REGULAR,
    justifyContent: 'center',
  },
  tickIcon: {
    height: 23,
    width: 23,
    marginHorizontal: 24,
    marginVertical: 12,
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
  line: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgb(241, 243, 246)',
  },
});

export default styles;
