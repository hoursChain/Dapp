import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import Text from '../../component/T_Text';
import {Actions} from 'react-native-router-flux';
import config from '../../config';
import StatusBar from '../../component/T_StatusBar';
import SytleUtils from '../StyleUtils';
import Progress from '../../component/T_ProgressBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as singinManager from '../../service/SinginService';

/**
 * 医疗社区
 */
export default class MedicalCommunity extends Component{

    constructor(props){
        super(props);
        this.state = {
            cmsList: [],
            selected: new Map(),
            pageSize: 20,  
            loaded: false,//控制Request请求是否加载完毕  
        }
        this.moreText = "加载完毕";    //foot显示的文案  
    }
    /**
     * 此函数用于为给定的item生成一个不重复的Key。
     * Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
     * 若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标
     *
     * @param item
     * @param index
     * @private
     */
    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item}) =>{
        return(
            <FlatListItem
                id={item.id}
                onPressItem={ this._onPressItem }
                selected={ !!this.state.selected.get(item.id) }
                title={ item.name }
                createDate={ item.createDate }
                uri={ item.url}
                dataTag= { item.dataTag}
                callback={this.props.callback}
            />
        );
    };
    /**
     * 使用箭头函数防止不必要的re-render；
     * 如果使用bind方式来绑定onPressItem，每次都会生成一个新的函数，导致props在===比较时返回false，
     * 从而触发自身的一次不必要的重新render，也就是FlatListItem组件每次都会重新渲染。
     *
     * @param id
     * @private
     */
    _onPressItem = (id) => {
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            return {selected}
        });
    };
    // 上拉加载更多
    _onEndReached = () => {

    };

    render(){
        return(
            <View style={[SytleUtils.container, SytleUtils.whiteBackgroundColor]}>
            <StatusBar />
                <FlatList style={{width:config.width,}}
                    ref={ ref => this.flatList = ref }
                    data={ this.state.cmsList }
                    extraData={ this.state.selected }
                    keyExtractor={ this._keyExtractor }
                    renderItem={ this._renderItem }
                    // 决定当距离内容最底部还有多远时触发onEndReached回调；数值范围0~1，例如：0.5表示可见布局的最底端距离content最底端等于可见布局一半高度的时候调用该回调
                    onEndReachedThreshold={0.1}
                    // 当列表被滚动到距离内容最底部不足onEndReacchedThreshold设置的距离时调用
                    onEndReached={ this._onEndReached }
                    // ListHeaderComponent={ this._renderHeader }
                    // ListFooterComponent={ this._renderFooter }
                    ItemSeparatorComponent={ this._renderItemSeparatorComponent }
                    ListEmptyComponent={ this._renderEmptyView }
                    refreshing={ this.state.loaded }
                    // onRefresh={ this._renderRefresh }
                    // 是一个可选的优化，用于避免动态测量内容；+50是加上Header的高度
                    getItemLayout={(data, index) => ( { length: 50, offset: (50 + 1) * index , index } )}
                />

                <Progress ref='progress'/>
                <Toast ref='toast'/>
            </View>
        );
    }

    // Footer布局
    _renderFooter = () => (
        <View><Text></Text></View>
    );

    // 自定义分割线
    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{ height:1 * config.pixel, backgroundColor:config.space_color }}></View>
    );

    // 空布局
    _renderEmptyView = () => (
        <View style={{width: config.width, alignItems:'center', padding: 8}}><Text>数据消失啦～ 工程师正在处理</Text></View>
    );

    // 下拉刷新
    _renderRefresh = () => {
        this.setState({loaded: true})//开始刷新
        //这里模拟请求网络，拿到数据，3s后停止刷新
        setTimeout(() => {
            alert('_renderRefresh');
            this.setState({loaded: false});
        }, 3000);
    };

    // 上拉加载更多
    _onEndReached = () => {
        this.loadData();
    };

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        this.setState({loadData: true});
        this.refs.progress.show();
        singinManager.getNewsList({'start': (this.state.cmsList.length + 1), 'len': this.state.pageSize},data=>{
            this.refs.progress.hidden();

            this.setState({loadData: false});
            
            if(data){
                if(config.SUCCESS == data.code){
                    this.setState({
                        cmsList: this.state.cmsList.concat(data.data)
                    })
                }else{
                    this.refs.toast.show(data.msg); 
                }
            }else{
                this.refs.toast.show('服务器忙,稍后再试');
            }
        })
    }


}
class FlatListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
        Actions.webMessage({uri: this.props.uri, title: this.props.title})
        singinManager.rederNum(data=>{
            singinManager.refreshIntegral(
                this.props.callback('mc')
            );
        });
    };

    render() {
        return(
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
                style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}
            >
                <Text numberOfLines={1} style={{textAlign:'left', width: config.width * 0.9,fontSize: 14, color: '#333333'}}>{this.props.title}</Text>

                <Text style={{textAlign:'left', width: config.width * 0.9,fontSize: 12}}>{this.props.createDate}</Text>

            </TouchableOpacity>
        );
    }
}