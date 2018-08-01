import React, {Component} from 'react';
import {
    StatusBar,
    Platform
} from 'react-native';
import config from '../config';
export default class T_StatusBar extends Component{
    render(){
        let therem = this.props.bar ? 'light-content' : 'default';
        return(<StatusBar {...Platform.select({
                    ios:{
                        barStyle:therem, 
                        animated:true, //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
                        hidden:false,  //是否隐藏状态栏
                    },
                    android: {
                        backgroundColor: config.statusBar_backgroundColor,
                        translucent:false,
                        animated:true, //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
                        hidden:false,  //是否隐藏状态栏
                    }
                })}/>
        );
    }
}