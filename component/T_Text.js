import React, { Component } from 'react';
import { Text,Platform } from 'react-native';
/**
 * 统一封装Text
 */
export default class T_Text extends Component{
    render() {   
        if(Platform.OS == 'android'){
            if(this.props.style){this.props.style.fontFamily = '苹方黑体-细-简'}
            else{
                this.props.style = {
                    fontFamily:'苹方黑体-细-简'
                }
            };
            
        }  
        return (
          <Text {...this.props} />
        );
    }
}