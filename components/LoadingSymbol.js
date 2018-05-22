import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground
} from 'react-native'
import {
  Container
} from 'native-base'
import Spinner from 'react-native-spinkit'

class LoadingSymbol extends Component {
  render() {
    return (
      <Container>
        <ImageBackground source={require('../assets/img/background.jpg')} style={styles.backgroundImage}>
          <View style={[styles.container, styles.horizontalLoading]}>
            <Spinner style={styles.spinner} isVisible={true} size={60} type="FadingCircleAlt" color="#204E6D"/>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
   containerLoading: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontalLoading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  spinner: {
    paddingRight: 20
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
   },
})

export default LoadingSymbol;