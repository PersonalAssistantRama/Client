import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text
} from 'react-native'
// import {
//   Container,
//   Content,
//   Thumbnail,
//   Text
// } from 'native-base'
import axios from 'axios'

class MovieComponent extends Component {
  constructor () {
    super()
    this.state={
      data: []
    }
  }
  componentDidMount () {
    this.getMovie()
  }
  
  getMovie = () => {
    axios({
      method: 'get',
      url: `http://35.198.243.108/movies`
    }).then(response => {
      console.log("response===", response)
      this.setState({
        data: response.data.data
      })
    })
    
  }
  render() {
    return (
      <View style={{height: 240, marginBottom:20}}>
        <ScrollView horizontal>
        {
          this.state.data.map(value => (
            <View style={styles.listMovie} key={value.id}>
            <Image square
            source={{uri:`https://image.tmdb.org/t/p/w300/${value.poster_path}`}}
            style={{alignContent:'center',width: 150, height: 200}}
            />
            <Text style={{fontSize: 14, width:150,textAlign:'center'}}>{value.title}</Text>
            </View>
          ))
        }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listMovie: {
    marginHorizontal: 2,
    paddingTop: 2
  }
})

export default MovieComponent;