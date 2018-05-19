import axios from 'axios';

import {
  GET_REPLY_LOADING,
  GET_REPLY_ERROR,
  GET_REPLY_SUCCESS
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

export const getReply = (string) => {
  return dispatch => {
    dispatch(loading());
    axios.post('https://5b41de75.ngrok.io/replies', {
      text: string
    })
      .then(response => {
        console.log('masuk', response)
        dispatch(getReplySuccess(response.data.data))
      })
      .catch(err => {
        console.log('masuk error')
        console.log(err)
        dispatch(error(err))
      });
  }
}
