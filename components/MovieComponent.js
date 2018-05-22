import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

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
      console.log("response===", response.data.data.slice(0,10))
      let movies = response.data.data.slice(0,10)
      this.setState({
        data: movies
      })
    })
    
  }
  render() {
    return (
      <View style={{height: 240, marginBottom:40}}>
        <ScrollView horizontal>
        {
          this.state.data.map(value => (
            <View style={styles.listMovie} key={value.id}>
            <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('DetailPage',
            {url: `https://www.themoviedb.org/movie/${value.id}`,
            other: value.title
          })}
          >
            <Image square
            source={{uri:`https://image.tmdb.org/t/p/w300/${value.poster_path}`}}
            style={styles.imageStyle}
            />
            </TouchableOpacity>
            <Text style={styles.title}>{value.title}</Text>
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
  },
  title:{
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

export default MovieComponent;