import React, {Component} from 'react';
import {
    View, Modal, ActivityIndicator, StyleSheet, TouchableHighlight
} from 'react-native';
import Text from './T_Text';
import config from '../config';
export default class T_ProgressBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            transparent: true
        };
    }
    show(){
        this.setState({modalVisible: true});
    }
    hidden(){
        this.setState({modalVisible: false});
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    render(){
        let center = config.height / 2 - 40;
        return(
            <Modal
                animationType={"fade"}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
                >
                <View style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', flex: 1}}>
                <ActivityIndicator color={config.white_color}
                    animating={true}
                    style={[styles.centering, {height: 80, marginTop: center}]}
                    size="large" />
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',  
        alignItems: 'center',
        backgroundColor: config.white_color
    },
    centering: {        
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
});
