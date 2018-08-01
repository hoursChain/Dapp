import React, { Component } from 'react';
import {
StyleSheet,
Animated,
Easing,
View,
} from 'react-native';

/**
 * 上线滚动组建
 */
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateY: new Animated.Value(0),
    };
  }


  componentDidMount() {console.log('componentDidMount')
    this.showHeadBar(0, 5);         //从第0条开始，轮播5条数据
  }


  showHeadBar(index, count) {console.log('start')
    index++;
    Animated.timing(this.state.translateY, {
      toValue: -40 * index,             //40为文本View的高度
      duration: 300,                        //动画时间
      Easing: Easing.linear,
      delay: 1500                            //文字停留时间
    }).start(() => {                          //每一个动画结束后的回调 
      if(index >= count) {
        index = 0;
        this.state.translateY.setValue(0);
      }
      this.showHeadBar(index, count);  //循环动画
    })
  }


 
  render() {
    return(
      <View style={styles.container}>
        <Animated.View style={[styles.wrapper, {transform: [{translateY: this.state.translateY}]}]}>
            {this.props.children}
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    height: 40,
    overflow: 'hidden',

  },
  wrapper: {
    marginHorizontal: 5,
  }, 
});