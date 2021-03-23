import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'

const reducers = combineReducers({ app: appReducer, auth: authReducer })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
)
