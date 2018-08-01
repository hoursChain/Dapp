import React, {Component} from 'react';
import {
    ScrollView,
    RefreshControl,
    StyleSheet,
    ActivityIndicator,
    View,
    Text,
    TouchableOpacity,
    PixelRatio,
    Dimensions
} from 'react-native';
import config from '../config';
/**
 * 下拉刷新，上拉加载更多
 */
export default class T_ScrollView extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isAddMore: false,
            isRefreshing: false,//是否刷新数据
            isMore:false,//是否加载更多
            refreshingUrl:'',//刷新数据请求地址
            moreUrl:'',//加载更多数据地址
        }
        this.space = 50;//滚动间隔
    }

    render(){
        return(
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            // tintColor="#ff0000"
                            title="加载中..."
                            // titleColor="#00ff00"
                            // colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                          />
                }
                onMomentumScrollEnd = {this._contentViewScroll.bind(this)}
                scrollEventThrottle={200}
            >
                {this.props.children}
                {this._renderLoadMore()}
            </ScrollView>
        );
    }

    /**
     * 显示上啦加载view
     * @private
     */
    _renderLoadMore() {
        if (!this.state.isMore) {
            return <View></View>;
        }else{
            return (
                <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',padding:config.scaleSize(10) }}>
                    <ActivityIndicator
                        size={'small'}
                        // color={AppBaseColor.MAIN_COLOR}
                        animating={true}
                        style={{width:config.scaleSize(15),height:config.scaleSize(15)}}
                    />
                    <Text style={{
                        // color:AppBaseColor.DESC_COLOR,
                        fontSize: 12,
                        marginLeft:config.scaleSize(15)
                    }}>
                        正在加载...
                    </Text>
                </View>
            );
        }
        
    }
    /**
     * 刷新数据
     */
    _onRefresh(){
        
        this.setState({isRefreshing: true});

        setTimeout(()=>{

            this.setState({isRefreshing: false})
        }, 2000)   
    }
    /**
     * 加载更多
     */
    _onMore(){
        
        this.setState({isMore:true});       
        setTimeout(()=>{
            this.setState({isMore: false})
            
        }, 2000) 
    }
    
    _contentViewScroll(event){
        if(this.state.isMore){
            return;
        }else{
            let y = event.nativeEvent.contentOffset.y;
            let height = event.nativeEvent.layoutMeasurement.height;
            let contentHeight = event.nativeEvent.contentSize.height;
    
            console.log('offsetY-->' + y);
            console.log('height-->' + height);
            console.log('contentHeight-->' + contentHeight);
    
            if(y + height >= contentHeight - 20){
                this._onMore()
            }
        }
    }
    _onScroll(event){
     
        if(this.state.isAddMore){
            return;
        }else{
            let y = event.nativeEvent.contentOffset.y;
            let height = event.nativeEvent.layoutMeasurement.height;
            let contentHeight = event.nativeEvent.contentSize.height;
    
            console.log('offsetY-->' + y);
            console.log('height-->' + height);
            console.log('contentHeight-->' + contentHeight);
    
            if(y + height >= contentHeight - 20){
                this._onMore()
            }
        }
        
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
});