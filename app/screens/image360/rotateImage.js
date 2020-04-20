// import React, {
//   Component,
//   View,
//   Dimensions,
// } from 'react-native';
import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity, Image} from 'react-native';
import Voodoo360 from './image360';
import Images from '../../config/images';

var IMGS = [];
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img01.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img02.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img03.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img04.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img05.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img06.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img07.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img08.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img09.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img10.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img11.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img12.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img13.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img14.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img15.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img16.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img17.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img18.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img19.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img20.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img21.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img22.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img23.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img24.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img25.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img26.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img27.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img28.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img29.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img30.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img31.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img32.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img33.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img34.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img35.jpg',
//   'https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img36.jpg',
// ];

// for (let i = 206; i <= 269; i++) {
//   let url = 'https://saloonaat.s3.ap-south-1.amazonaws.com/Img0' + i + '.jpg';
//   IMGS.push(url);
// }

const {height, width} = Dimensions.get('window');

// let { Voodoo360 } = require('react-native-voodoo360');

class RotateImage extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          // width: 300,
          // height: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <Voodoo360 images={IMGS} style={{}} /> */}
        <View
          style={{
            width: width,
            height: width,
            overflow: 'hidden',
          }}>
          <Voodoo360 images={this.props.imagesArray360} style={{}} />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.didTapOnclose();
          }}
          style={{
            position: 'absolute',
            top: 10,
            left: 0,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Images.close} style={{width: 15, height: 15}}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RotateImage;
