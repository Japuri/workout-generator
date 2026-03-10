import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { authReducer } from './reducers/authReducer'
import {
  conversationCreateReducer,
  conversationsListReducer,
  conversationDetailReducer,
} from './reducers/conversationReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  conversationCreate: conversationCreateReducer,
  conversationsList: conversationsListReducer,
  conversationDetail: conversationDetailReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
