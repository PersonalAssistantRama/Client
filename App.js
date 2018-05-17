import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen'
import { Provider } from 'react-redux'

import store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <HomeScreen />
      </Provider>
    );
  }
}