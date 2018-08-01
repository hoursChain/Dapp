import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  AsyncStorage
} from 'react-native';

/**
 * 底部导航TabView 
 */
export default class T_TabImage extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Image source={this.props.Image}/>
        );
    }
}

const styles = StyleSheet.create({
    tab_view:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    }
});