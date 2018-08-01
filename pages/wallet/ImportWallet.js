import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MemorizingWords from './MemorizingWords';
import OfficialPurse from './OfficialPurse';
import PrivateKey from './PrivateKey';

import StatusBar from '../../component/T_StatusBar';
/**
 * 助记词
 */
export default class ImportWallet extends Component{

    render(){
        return(
            <ScrollableTabView 
            tabBarBackgroundColor={config.white_color}
            tabBarActiveTextColor={config.blue_color}
            tabBarUnderlineStyle={{backgroundColor: config.blue_color}}>
           
                <MemorizingWords tabLabel="助记词" />
                <OfficialPurse tabLabel="官方钱包" />
                <Priv
                ateKey tabLabel="私钥" />
            </ScrollableTabView>
        );
    }

}