import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import {Provider} from 'react-redux'
import store from './store/index'

const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  SignUp:{
    screen: SignUpScreen
  },
  Home: {
    screen: HomeScreen
  }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}