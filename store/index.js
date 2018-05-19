import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import chatReducer from './chat/chat.reducers'
import userReducer from './user/user.reducers'

const reducers = combineReducers({
  data: chatReducer,
  user: userReducer
})

// const store = createStore(reducers)

// export default store;

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store