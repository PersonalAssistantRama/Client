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
    console.log('masuk action', string)
    
    axios.post('http://localhost:3000/replies', {
      text: string
    })
      .then(response => {
        console.log('masuk', response)
        dispatch(getReplySuccess(response.data))
      })
      .catch(err => dispatch(error(err)));
  }
}