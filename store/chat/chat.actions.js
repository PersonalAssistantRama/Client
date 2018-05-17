import {
  GET_REPLY_LOADING,
  GET_REPLY_SUCCESS,
  GET_REPLY_ERROR
} from './chat.actionsTypes'

import axios from 'axios'

export const showdatas = () => {
  return dispatch => {
    dispatch(loadHeroLoading())
    axios.get('http://localhost:3000/replies')
    .then ( response => {
      dispatch(showdata(response.data))
    })
  }
}

const showdata = (payload) => {
  return {
    type: 'GET_REPLY_SUCCESS',
    payload:payload
  }
}
