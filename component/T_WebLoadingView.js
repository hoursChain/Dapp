import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    BackAndroid,
} from 'react-native';
import Text from './T_Text';
export default class T_WebLoadingView extends Component {

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',
        alignItems:'center',backgroundColor:'#f2f2f2'}}>
                <Text style={styles.loadingText}>
                    页面正在加载...
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    webview: {
        flex: 1,
    },
    loadingText: {
        color: '#8a8a8a',
        fontSize: 16
    }
})