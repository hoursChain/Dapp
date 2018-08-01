import React, {Component} from 'react';
import {
    StyleSheet,
    Platform
} from 'react-native';
import config from '../config';
/**全局样式类 */
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    whiteBackgroundColor:{
        backgroundColor: config.white_color
    },
    space:{
        height: 1 * config.pixel,
        backgroundColor: config.space_color
    },
    title_txt:{
        fontSize: 16,
    },
    header:{
        ...Platform.select({
            ios:{
                paddingTop: config.isIphoneX() ?  40 : 20,
            },
            android:{
                paddingTop: 0
            }
        })
    },
    shadowStyle:{
        ...Platform.select({
            ios:{
                shadowOffset: {w: 2, h: 2},
                shadowColor: '#999999',
                shadowRadius: 5,
                shadowOpacity: 0.8,
            },
            android:{
                elevation: 3
            }
        })
    },
    card:{
        width: config.width * 0.9,
        alignItems:'center',
        borderRadius:5, 
        backgroundColor: config.white_color 
    },
    cardItem:{
        width: config.width * 0.9,
        padding : 8,
    },
    borderRadius:{
        borderRadius: 5
    },
    row_item:{
        flexDirection: 'row',
    }
});


export default styles;