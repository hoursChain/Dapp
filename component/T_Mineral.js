import React, {Component} from 'react';
import {
    View, Text, Animated, TouchableOpacity
} from 'react-native';

export default class T_Mineral extends Component{

    constructor(props){
        super(props);
        this.trAnim = new Animated.Value(this.props.top);
        this.index = 1;
    }

    componentDidMount() {
        this.tr();                              // 开始执行动画
    }

    
    
    tr(){       
        if(this.index % 2 == 0){
            this.trAnim.setValue(this.props.top - 4);
            Animated.timing(                            // 随时间变化而执行的动画类型
                this.trAnim,                      // 动画中的变量值
                {
                toValue: this.props.top + 4, 
                duration: 2000                           // 透明度最终变为1，即完全不透明
                }
            ).start(()=>{
                this.tr();
            });
        }else{
            this.trAnim.setValue(this.props.top)
            Animated.timing(                            // 随时间变化而执行的动画类型
                this.trAnim,                      // 动画中的变量值
                {
                toValue: this.props.top - 4, 
                duration: 2000                           // 透明度最终变为1，即完全不透明
                }
            ).start(()=>{
                this.tr();
            });
        }
        this.index++;
    }

    render(){
        return(
            <Animated.View key={this.props.index} style={{borderRadius: 15, width: 30, height: 30,backgroundColor: '#ffffff',justifyContent:'center', alignItems:'center', position: 'absolute', top: this.trAnim, left: this.props.left} }>
                <TouchableOpacity onPress={this.props.onPress? this.props.onPress : ''}>
                    <Text>矿石</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}
