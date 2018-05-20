import React, { Component } from 'react';
import {createStackNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation'
import {
  Image,
  View,
  Text,
  YellowBox
} from 'react-native';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import {Provider} from 'react-redux'
import store from './store/index'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader','Possible Unhandled Promise Rejection']);


const custom = (prop) => {
  return (
    <View style={{flex: 1}}>
      <View style={{paddingVertical: 25, borderBottomColor: 'rgba(255, 255, 255, 0.4)', borderBottomWidth: 1, alignItems: 'center'}}>
        <Image style={{height: 150, width: 150}} source={require('./assets/img/happy.png')} />
        <Text style={{fontSize: 24, fontFamily: '100', marginTop: 12, color: '#fff'}}> yupi </Text>
      </View>
      <DrawerItems {...prop}
        activeTintColor='#2196f3'
        activeBackgroundColor='rgba(0, 0, 0, .04)'
        inactiveTintColor='rgba(0, 0, 0, .87)'
        inactiveBackgroundColor='transparent'
        style={{backgroundColor: '#000000'}}
        labelStyle={{color: '#ffffff',  fontSize: 16, fontWeight: '200'}}
      />
    </View>
  )
}


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
},{
  navigationOptions: ({ navigation }) => ({
    headerTitle: 'YUPI',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#34b8ed',
    },
    headerTitleStyle:{ flex: 1, color: '#fff', textAlign: 'center' }
  }),
  headerMode: 'screen',
  initialRouteName: "Login"
})

const Root = createDrawerNavigator({
  Dashboard: HomeScreen,
  Logout: RootStack
},{
  initialRouteName: 'Logout',
  drawerPosition: 'left',
  drawerBackgroundColor: '#34b8ed',
  headerMode: 'float',
  contentComponent: custom,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App
