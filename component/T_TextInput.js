import React, { Component } from 'react';
import { TextInput,Dimensions } from 'react-native';
import config from '../config';
const {width, height} = Dimensions.get('window');

export default class T_TextInput extends Component{
    render() {
        return (
          <TextInput underlineColorAndroid="transparent" placeholderTextColor="rgb(152,152,152)"
            {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
            editable = {true}
            maxLength = {40} onChangeText={(text)=> this.props.onChangeText(text)}         
          />
        );
    }
}