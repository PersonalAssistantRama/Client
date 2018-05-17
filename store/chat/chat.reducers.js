import {
  GET_REPLY_LOADING,
  GET_REPLY_SUCCESS,
  GET_REPLY_ERROR
} from './chat.actionsTypes'

const initialState = {
  data : {},
  loading: false,
  error: false
}

const reducers = (state = {...initialState} , action) => {
  switch(action.type) {
    case 'GET_REPLY_SUCCESS':
      return ({...state,
              data:action.payload,
              loading:false})
    default:
      return state
  }
}

export default reducers
