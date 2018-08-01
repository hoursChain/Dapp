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
export default class TabBottom extends Component {

    componentDidMount() {
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({value}) {
        console.log(value);
    }

    render() {


        let height_item = Platform.OS == 'ios' ? 45.5 : 47; 
        

        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => {
                    let color = this.props.activeTab === i ? this.props.activeTabColor : this.props.unactiveTabColor;
                    let icon = this.props.activeTab == i ? this.props.selectedTabIconNames[i] : this.props.tabIconNames[i];
                    
                    let yuan = (i == 2) ? <View style={{width: 49, height: 49, alignItems:'center', justifyContent:'center', backgroundColor: config.white_color, borderRadius: 24.5}}>
                        <Image resizeMode='contain' style={[{width: 35, height: 35}]} source={icon}/>
                    </View> : <Image resizeMode='contain' style={[styles.icon]} source={icon}/>
                    

                    let tempView = i == 2 ? 
                    <View style={{
                        borderTopColor: config.space_color,
                        borderTopWidth: 1 * config.pixel,
                        position: 'absolute',
                        width:config.width * 0.2, 
                        height: height_item,  left:0, bottom: 0, 
                        backgroundColor:config.white_color}}></View> 
                    : <View></View>;



                    let tempView2Widht = config.width * 0.2 * 0.95;
                    let tempView2 = i == 2 ?
                    <View style={{
                        borderColor: config.space_color,
                        borderWidth: 1 * config.pixel,
                        position: 'absolute',
                        width: tempView2Widht, borderRadius: tempView2Widht / 2,
                        height: tempView2Widht,  left:0, bottom: 0, 
                        backgroundColor:config.white_color}}></View> 
                    : <View></View>;


                    return (                        
                        <TouchableOpacity
                            key={i} activeOpacity={0.8} style={[styles.tab,{height: 65}]} onPress={()=>this.props.goToPage(i)}>
                                <View style={i == 2 ? styles.tabItem2 :styles.tabItem}>
                                   
                                    {tempView}
                                    
                                    {yuan}
                                    <Text style={{color: color, fontSize: 12}}>
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
        paddingTop: 4,
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
        width: config.width * 0.2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor:'#ffffff'
    },
    tabItem2:{
        
        paddingTop: 4,
        width: config.width * 0.2,
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