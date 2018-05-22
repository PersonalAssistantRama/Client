import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Button,
  WebView
} from 'react-native'
import axios from 'axios'
import {getUrl} from '../store/chat/chat.actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
  // getUrlDetail = (url) => {
  //   this.props.getUrl(url)
  //   this.props.navigation.navigate('DetailPage')
  // }

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
      <View style={{height: 240, marginBottom:50}}>
      <ScrollView horizontal>
      {
        this.state.data.map(value => (
          <View style={styles.listItem} key={value.restaurant.id}>
          <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('DetailPage',
            {url: value.restaurant.url})}
            // onPress={() => this.getUrlDetail(value.restaurant.url)}
          >
          <Image square
          source={{uri:value.restaurant.featured_image}}
          style={styles.imageStyle}
          />
          </TouchableOpacity>
          <Text style={styles.title}>{value.restaurant.name}</Text>
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
  },
  title: {
    fontSize: 12,
    width:150,
    textAlign:'center',
    color:'black',
    backgroundColor:'white',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingTop: 5,
    paddingBottom: 5
  },
  imageStyle: {
    alignContent:'center',
    width: 150,
    height: 200,
    borderTopRightRadius:18,
    borderTopLeftRadius: 18
  }
})

const mapStateToProps = (state) => ({
  url: state.data.urlDetail
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUrl
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (FoodsComponent);