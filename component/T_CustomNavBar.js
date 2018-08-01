import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {Component} from 'react'
import { Actions } from 'react-native-router-flux';
import config from '../config';
import Text from './T_Text';





const styles = StyleSheet.create({
  container: {
    height: (Platform.OS === 'ios') ? (config.isIphoneX() ? 84 : 64) : 54,
    flexDirection: 'row',   
    // backgroundColor: config.blue_color,
    ...Platform.select({
      ios:{
        paddingTop: config.isIphoneX() ? 40 : 20,
      },
      android:{
        paddingTop: 0,
      }
    }),
    backgroundColor: config.white_color
  },
  navBarItem: {
    width: 50,
    justifyContent: 'center'
  }
})

export default class T_CustomNavBar extends React.Component {

  // constructor(props) {
  //   super(props)
  // }

  _renderLeft() {  
    let imageSource = 
      this.props.backWhite ? 
      require('./../../images/back_left_white.png') : 
      require('./../../images/back_left_black.png');
      return (
        <TouchableOpacity
          onPress={Actions.pop}
          style={[styles.navBarItem, { paddingLeft: 10}, this.props.navigationBarStyle]}>
          <Image resizeMode='contain'
            style={{width: 10, height: 15}}
            resizeMode="contain"
            source={imageSource}></Image>
        </TouchableOpacity>
      )  
  }

  _renderMiddle() {
    return (
      <View style={[this.props.navigationBarStyle, {width: config.width -100, justifyContent: 'center'}]}>
        <Text numberOfLines={1}  style={this.props.titleStyle}>{ this.props.title }</Text>
      </View>
    )
  }

  _renderRight() {

    
    // let view = this.props.renderRightButton ? renderRightButton

    return (
      <View style={[styles.navBarItem, {flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center' }, this.props.navigationBarStyle]}>
        
        {this.props.renderRightButton}
        
        
        {/* <TouchableOpacity
          onPress={() => console.log('Share')}
          style={{ paddingRight: 10}}>
          <Image
            style={{width: 30, height: 50}}
            resizeMode="contain"
            source={{uri: 'https://cdn3.iconfinder.com/data/icons/glypho-free/64/share-512.png'}}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Search')}
          style={{ paddingRight: 10 }}>
          <Image
            style={{width: 30, height: 50}}
            resizeMode="contain"
            source={{uri: 'https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic//search1600.png'}}></Image>
        </TouchableOpacity> */}
      </View>
    )
  }

  render() {  
    
    let ss = this.props.blue ? {backgroundColor: config.blue_color} : {};

    

    return (
        <View style={[styles.container, ss]}>
          { this._renderLeft() }
          { this._renderMiddle() }
          { this._renderRight() }
        </View>
    )
  }
}

