import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text
} from 'react-native'
import axios from 'axios'

class FoodsComponent extends Component {
  constructor () {
    super()
    this.state={
      data: []
    }
  }
  componentDidMount () {
    this.getFoods()
  }
  
  getFoods = () => {
    axios({
      method: 'get',
      url: `http://35.198.243.108/foods`
    }).then(response => {
      console.log("response===", response.data.data)
      this.setState({
        data: response.data.data
      })
    })
    
  }
  render() {
    return (
      <View style={{height: 240, marginBottom:35}}>
      <ScrollView horizontal>
      {
        this.state.data.map(value => (
          <View style={styles.listItem} key={value.restaurant.id}>
          <Image square
          source={{uri:value.restaurant.featured_image}}
          style={{alignContent:'center',width: 150, height: 200, borderRadius: 18}}
          />
          <Text style={{fontSize: 14, width:150,textAlign:'center', color:'black'}}>{value.restaurant.name}</Text>
          </View>
        ))
      }
      </ScrollView>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 2,
    paddingTop: 2
  }
})

export default FoodsComponent;