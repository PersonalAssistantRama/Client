import {
  GET_REPLY_LOADING,
  GET_REPLY_ERROR,
  GET_REPLY_SUCCESS,
  SET_INGAME_MODE,
  SET_NOT_INGAME_MODE,
} from './chat.actionsTypes'

const initialState = {
  data : {},
  loading: false,
  error: {
    status: false,
    message: ''
  },
  inGame: false,
  idGame: 'a'
}

const reducers = (state = {...initialState} , action) => {
  switch (action.type) {
    case GET_REPLY_LOADING:
      return {
        ...state,
        loading: true
      }

    case GET_REPLY_ERROR:
      let errObj = {
        status: true,
        message: action.payload.msg
      }
      return {
        ...state,
        error: {
          ...errObj
        },
        loading: false
      }
    
    case GET_REPLY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      }

    case SET_INGAME_MODE:
      return {
        ...state,
        idGame: action.payload,
        inGame: true,
      }
    
    case SET_NOT_INGAME_MODE:
      return {
        ...state,
        inGame: false,
      }

    default:
      return state
  }
}

export default reducers
