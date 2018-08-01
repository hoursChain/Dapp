import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Platform
} from 'react-native';

import Text from '../../component/T_Text';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StatusBar from '../../component/T_StatusBar';
import SytleUtils from '../StyleUtils';
import LinearGradient from 'react-native-linear-gradient';
import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
/**
 * 消息中心
 */
export default class MessageCenter extends Component{

    render(){
        return(
            <Text>MessageCenter</Text>
        )
    }
}



