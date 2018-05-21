import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native'


class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  }
  componentDidMount() {
    setTimeout( () => {
       this.setTimePassed();
    },2000);
  }

  setTimePassed() {
     this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/img/happy.png')} style={ styles.logo }/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34b8ed',
    alignItems: 'center'
  },
  logo: {
    flex: 1,
    height: null,
    width: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  }
})
export default SplashScreen;
