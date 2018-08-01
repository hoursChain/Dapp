import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    View
}
from 'react-native';
import Text from './T_Text';
import config from '../config';
export default class TabBottomNew extends Component {

    componentDidMount() {
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({value}) {
        console.log(value);
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => {
                    let color = this.props.activeTab === i ? this.props.activeTabColor : this.props.unactiveTabColor;
                    let icon = this.props.activeTab == i ? this.props.selectedTabIconNames[i] : this.props.tabIconNames[i];
                    return (                        
                        <TouchableOpacity
                            key={i} activeOpacity={0.8} style={[styles.tab]} onPress={()=>this.props.goToPage(i)}>
                                <View style={styles.tabItem}>
                                   <View style={{alignItems:'center', justifyContent:'center', backgroundColor: config.white_color, borderRadius: 24.5}}>
                                            <Image resizeMode='contain' style={[{width: config.scaleSize(55), height: config.scaleSize(55)}]} source={icon}/>
                                    </View>
                                    <Text style={{color: color, fontSize: 12, marginTop: 4, marginBottom: 4}}>
                                        {this.props.tabNames[i]}
                                    </Text>
                                </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }


    
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        justifyContent:'flex-end'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'flex-end'
    },
    tabItem: {
        borderTopColor: config.space_color,
        borderTopWidth: 1 * config.pixel,
        paddingTop: 4,
        width: config.width * 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor:'#ffffff'
    },
    tabItem2:{
        
        paddingTop: 4,
        width: config.width * 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        
    },
    icon: {
        width: 26,
        height: 26,
        marginBottom: 2
    }
});