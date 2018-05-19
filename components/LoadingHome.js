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
        <View style={{alignItems:'center', width:'100%'}}>
          <View style={styles.both}>
            <Text style={{color: 'grey'}}>Yupi is thinking </Text><Spinner style={styles.spinner} isVisible={true} size={20} type="ThreeBounce" color="grey"/>
          </View>
        </View>
        <View style={{alignItems:'center',marginTop:80}}>
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
    marginTop:50,
    padding:10,
    width:'80%',
    borderRadius:3,
    // color: 'grey',
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  spinner: {
    paddingRight: 20
  }
})

export default LoadingHome;