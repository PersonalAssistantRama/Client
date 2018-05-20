import axios from 'axios';

import {
  GET_REPLY_LOADING,
  GET_REPLY_ERROR,
  GET_REPLY_SUCCESS,
  SET_INGAME_MODE,
  SET_NOT_INGAME_MODE,
  SHOW_MOVIE_LIST,
  SHOW_FOODS_LIST
} from './chat.actionsTypes';
import { changeQuery } from '../helpers/index'

const loading = () => ({
  type: GET_REPLY_LOADING
})

const error = (payload) => ({
  type: GET_REPLY_ERROR,
  payload: payload
})

const getReplySuccess = (payload) => ({
  type: GET_REPLY_SUCCESS,
  payload: payload
})

const enterInGame = (payload) => ({
  type: SET_INGAME_MODE,
  payload: payload
})

const editNotInGame = () => ({
  type: SET_NOT_INGAME_MODE
})

const changeMovieStatus = (payload) => ({
  type: SHOW_MOVIE_LIST,
  payload
})

const changeFoodStatus = (payload) => ({
  type: SHOW_FOODS_LIST,
  payload
})

const baseUrl = 'http://35.198.243.108'

export const answerGame = (id, answer) => {
  return dispatch => {
    console.log('masok pokoknya', id + '==', answer)
    axios.post(`${baseUrl}/games/quiz`, {
      id, answer
    })
      .then(response => {
        console.log('response answer game', response.data.data.data.isCorrect)
        const isCorrect = response.data.data.data.isCorrect;
        if(isCorrect) {
          console.log('benar!!!!')
          dispatch(getReplySuccess({ data: 'Tebakan kamu benar!'}))
        } else {
          console.log('salah!!!!')
          dispatch(getReplySuccess({ data: 'Tebakan kamu salah, Payah nih!'}))
        }
        dispatch(editNotInGame());
      })
      .catch(err => {
        dispatch(error(err))
      })
  }
}

export const getReply = (string) => {
  let input = changeQuery(string)
  return dispatch => {
    dispatch(loading());
    // axios.post(`${baseUrl}/replies`, {
    //   text: string
    // })
    axios({
      method: 'get',
      url: `https://api.dialogflow.com/v1/query?v=20170712&query=${input}&lang=id&sessionId=b18621cf-e981-4f93-b380-ee3fa6cf0b56&timezone=Asia/Jakarta`,
      headers: {
        Authorization: 'Bearer fe981391620d47929cc67a830ed75dab'
      }
    })
      .then(responseApi => {
        let response = {
          data: responseApi.data.result.fulfillment.speech,
          input: input,
          emotion: responseApi.data.result.action
        }
        const replyFromYupi = response;
        console.log('ini respon reply===', responseApi.data.result)
        if (replyFromYupi.data == 'DUJDS325UEWHCSZNCHSHSADHS') {
          // get movie
          // let movieReply = "Film yang Yupi rekomendasiin buat kamu: "
          // axios.get('https://cfe485a0.ngrok.io/movies')
          // .then(response => {
          //   // response.data.data.data.map(movie => {
          //   //   movieReply = movieReply + " " + movie.title
          //   // })
          //   dispatch(getReplySuccess({ data: movieReply }))
          // })
          // .catch(err => {
          //   dispatch(error(err))
          // })
          dispatch(getReplySuccess({data: 'Film yang Yupi rekomendasiin buat kamu:'}))
          dispatch(changeMovieStatus(true))
          dispatch(changeFoodStatus(false))
        } else if (replyFromYupi.data == 'IWJFDXNC6YWEJ235HKMWJDIWE') {
          let foodReply = "Makanan yang Yupi rekomendasiin buat kamu: "
          // axios.get('https://4a0bacf2.ngrok.io/foods')
          // .then(response => {
          //   response.data.data.data.map(food => {
          //     foodReply = foodReply + " " + food.restaurant.name
          //   })
          // })
          // .catch(err => {
            //   dispatch(error(err))
            // })
            dispatch(getReplySuccess({ data: foodReply }))
            dispatch(changeFoodStatus(true))
            dispatch(changeMovieStatus(false))

        } else if (replyFromYupi.data === 'J972JNMOQUEMZ29582MJWIEJW') {
          // main game quiz
          axios.get(`${baseUrl}/games/quiz`)
          .then(response => {
            console.log('masuk game', response)
            // dispatch(enterInGame(response.data.data.data._id))
            dispatch(enterInGame(response.data.data.data._id))
            console.log('id game----', response.data.data.data._id)
            dispatch(getReplySuccess({ data: "Yuk! Jawab ya, " + response.data.data.data.question }))
            dispatch(changeMovieStatus(false))
            dispatch(changeFoodStatus(false))
          })
          .catch(err => {
            dispatch(error(err))
          })
        } else if (replyFromYupi.data === 'BZIMI2J4MLIFAHNWMW520JU8D') {
          dispatch(getReplySuccess(replyFromYupi))
          dispatch(changeMovieStatus(false))
          dispatch(changeFoodStatus(false))
          // main game tebak kata
        } else {
          dispatch(getReplySuccess(replyFromYupi))
          dispatch(changeMovieStatus(false))
          dispatch(changeFoodStatus(false))
        }
      })
      .catch(err => {
        console.log('masuk error')
        console.log(err)
        dispatch(error(err))
      });
  }
}
