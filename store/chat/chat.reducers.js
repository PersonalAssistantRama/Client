import {
  GET_REPLY_LOADING,
  GET_REPLY_ERROR,
  GET_REPLY_SUCCESS,
  SET_INGAME_MODE,
  SET_NOT_INGAME_MODE,
  SHOW_MOVIE_LIST,
  SHOW_FOODS_LIST,
  URL_DETAIL
} from './chat.actionsTypes'
// import { stat } from 'fs';

const initialState = {
  idGame: '',
  data : {},
  loading: false,
  error: {
    status: false,
    message: ''
  },
  inGame: false,
  movies: false,
  foods: false,
  urlDetail: ''
}

const reducers = (state = {...initialState} , action) => {
  switch (action.type) {
    case GET_REPLY_LOADING:
      return {
        ...state,
        loading: true,
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
      console.log('set ingame mode-', action.payload)
      return {
        ...state,
        idGame: action.payload,
        inGame: true,
      }
    
    case SET_NOT_INGAME_MODE:
      console.log('masa ga masuk sini...')
      return {
        ...state,
        inGame: false,
        idGame: ''
      }

    case SHOW_MOVIE_LIST:
      return {
        ...state,
        movies: action.payload
      }
      
      case SHOW_FOODS_LIST:
      return {
        ...state,
        foods: action.payload
      }

      case URL_DETAIL:
      return {
        ...state,
        urlDetail: action.payload
      }

    default:
      return state
  }
}

export default reducers
