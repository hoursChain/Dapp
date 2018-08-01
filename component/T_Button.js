import React, {Component} from 'react';
import{
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Text from './T_Text';
import LinearGradient from 'react-native-linear-gradient';
export default class T_Button extends Component{
    constructor(props){
        super(props);
    }
    render(){        
        return(
            <TouchableOpacity onPress={this.props.onPress} style={{width: this.props.width}}>
                <LinearGradient colors={this.props.colors} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>{this.props.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
 
    linearGradient: {     
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 12,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 8,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
});