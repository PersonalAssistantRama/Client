import axios from 'axios';

import {
  GET_REPLY_LOADING,
  GET_REPLY_ERROR,
  GET_REPLY_SUCCESS,
  SET_INGAME_MODE,
  SET_NOT_INGAME_MODE
} from './chat.actionsTypes';

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

export const answerGame = (id, answer) => {
  return dispatch => {
    console.log('masok pokoknya', id + '==', answer)
    axios.post('https://cfe485a0.ngrok.io/games/quiz', {
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
  return dispatch => {
    dispatch(loading());
    axios.post('https://e596a609.ngrok.io/replies', {
      text: string
    })
      .then(response => {
        const replyFromYupi = response.data.data;
        if (replyFromYupi.data == 'DUJDS325UEWHCSZNCHSHSADHS') {
          // get movie
          let movieReply = "Film yang Yupi rekomendasiin buat kamu: "
          axios.get('https://cfe485a0.ngrok.io/movies')
          .then(response => {
            response.data.data.data.map(movie => {
              movieReply = movieReply + " " + movie.title
            })
            dispatch(getReplySuccess({ data: movieReply }))
          })
          .catch(err => {
            dispatch(error(err))
          })
        } else if (replyFromYupi.data == 'IWJFDXNC6YWEJ235HKMWJDIWE') {
          let foodReply = "Makanan yang Yupi rekomendasiin buat kamu: "
          axios.get('https://cfe485a0.ngrok.io/foods')
          .then(response => {
            response.data.data.data.map(food => {
              foodReply = foodReply + " " + food.restaurant.name
            })
            dispatch(getReplySuccess({ data: foodReply }))
          })
          .catch(err => {
            dispatch(error(err))
          })
        } else if (replyFromYupi.data === 'J972JNMOQUEMZ29582MJWIEJW') {
          // main game quiz
          axios.get('https://cfe485a0.ngrok.io/games/quiz')
          .then(response => {
            console.log('masuk game', response)
            // dispatch(enterInGame(response.data.data.data._id))
            dispatch(enterInGame(response.data.data.data._id))
            console.log('id game----', response.data.data.data._id)
            dispatch(getReplySuccess({ data: "Yuk! Jawab ya, " + response.data.data.data.question }))
          })
          .catch(err => {
            dispatch(error(err))
          })
        } else if (replyFromYupi.data === 'BZIMI2J4MLIFAHNWMW520JU8D') {
          dispatch(getReplySuccess(replyFromYupi))
          // main game tebak kata
        } else {
          dispatch(getReplySuccess(replyFromYupi))
        }
      })
      .catch(err => {
        console.log('masuk error')
        console.log(err)
        dispatch(error(err))
      });
  }
}
