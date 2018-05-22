import React, { Component } from 'react';
import {createDrawerNavigator, DrawerItems} from 'react-navigation'
import App from './../App'
import {
  Image,
  View,
  Text,
  YellowBox
} from 'react-native';
import HomeScreen from './../screens/HomeScreen'
import LoginScreen from './../screens/LoginScreen'
import ListAlarmScreen from './../screens/ListAlarmScreen'

const custom = (prop) => {
  return (
    <View style={{flex: 1}}>
      <View style={{paddingVertical: 30, borderBottomColor: 'rgba(255, 255, 255, 0.4)', borderBottomWidth: 1, alignItems: 'center'}}>
        <Image style={{height: 150, width: 150}} source={require('./../assets/img/happy.png')} />
        <Text style={{fontSize: 24, fontFamily: 'Pacifico', marginTop: 12, color: '#fff'}}>Yupi</Text>
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

export default homestack = createDrawerNavigator({
  Dashboard: HomeScreen,
  ['List Alarm']: ListAlarmScreen,
  Logout: LoginScreen,
},{
  initialRouteName: 'Dashboard',
  drawerPosition: 'left',
  drawerBackgroundColor: '#34b8ed',
  headerMode: 'float',
  contentComponent: custom,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});
