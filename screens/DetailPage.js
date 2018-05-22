import React, { Component } from 'react';
import {
  WebView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// const other = this.props.navigation.getParam('other')

class DetailPage extends Component {
  static navigationOptions = {
    title: 'Detail',
    headerStyle: {
      backgroundColor: '#204E6D',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  renderLoadingView () {
    return (
      <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator
         color = '#1289A7'
         size = "large"
         hidesWhenStopped={true} 
      />
      </View>
  );
  }
  render() {
    const url = this.props.navigation.getParam('url')
    return (
      <WebView
        source={{uri: url}}
        renderLoading={this.renderLoadingView} startInLoadingState={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default DetailPage;