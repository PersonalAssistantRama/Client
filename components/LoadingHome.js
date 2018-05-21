import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground
} from 'react-native'
import Spinner from 'react-native-spinkit'

class LoadingHome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>
        <View style={{alignItems:'center',justifyContent: 'center', width:'100%'}}>
          <View style={styles.both}>
            <Text style={{color: 'grey', fontSize:16}}>Yupi is thinking </Text><Spinner style={styles.spinner} isVisible={true} size={20} type="ThreeBounce" color="grey"/>
          </View>
            <View style={styles.triangle}></View>
        </View>
        <View style={{alignItems:'center',marginTop:4}}>
          <Image source={require('../assets/img/18.heran.png')} style={{justifyContent:'center',width: 250, height: 250}}/>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  both: {
    margin:5,
    marginBottom:0,
    paddingLeft: 10,
    paddingRight: 10,
    width:'80%',
    backgroundColor:'white',
    height: 100,
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10
  },
  spinner: {
    paddingRight: 20
  },
  triangle: {
    height: 0,
    width: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginTop:0,
    marginRight:50
  },
})

export default LoadingHome;