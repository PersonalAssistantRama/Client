import React, { Component } from 'react';
import {createStackNavigator, createDrawerNavigator, DrawerItems, createSwitchNavigator} from 'react-navigation'
import {
  Image,
  View,
  Text,
  YellowBox
} from 'react-native';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import SplashScreen from './screens/SplashScreen'
import homestack from './stack/homestack'
import {Provider} from 'react-redux'
import store from './store/index'
import DetailPage from './screens/DetailPage'

YellowBox.ignoreWarnings(
  ['Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Possible Unhandled Promise Rejection',
  'Warning: Cannot update during an existing state transition',
  "Warning: Can't call setState (or forceUpdate) on an unmounted component"]);
 

const HomePage = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  DetailPage: {
    screen: DetailPage
  }
})

const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  SignUp:{
    screen: SignUpScreen
  },
  DetailPage: {
    screen: DetailPage
  },
  Home: {
    screen: homestack,
    navigationOptions: {
      headerLeft:null,
      header:null
    },
  },
  Splash: {
    screen: SplashScreen
  }
},{
   navigationOptions: ({ navigation }) => ({
    // headerTitle: 'YUPI',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#34b8ed',
    },
    headerTitleStyle:{ flex: 1, color: '#fff', textAlign: 'center' }
  }),
  headerMode: 'screen',
  initialRouteName: "Splash"
})

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

export default App
