import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet
}from 'react-native';
import Text from './T_Text';
import config from '../config';

export default class T_CheckBox extends Component{

    constructor(props){
        super(props);
        this.state = {
            isClick: this.props.isClick ? this.props.isClick : false
        }
    }

    isClick(){
        return this.state.isClick ? this.state.isClick : false;
    }

    render(){
        return(
            <View style={[styles.container, this.props.style]}>
                <TouchableOpacity style={styles.check_view} onPress={()=>{
                    this.setState({
                        isClick:!this.state.isClick
                    });
                    if(this.props.callback) this.props.callback();
                }}>
                    <Image style={styles.check_view} 
                    source={this.state.isClick?require('./../../images/checkbox_select.png'):require('./../../images/checkbox.png')}>
                    </Image>
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }

    setClick(flag){
        this.setState({
            isClick:flag
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems: 'center',
    },
    check_view:{
        width: 20,
        height: 20,
    },
    text:{
        fontSize: 13, color:'rgb(152,152,152)', marginLeft: 8
    }
});
