import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'

const reducers = combineReducers({ app: appReducer, auth: authReducer })

type reducersType = typeof reducers;
export type AppStateType = ReturnType<reducersType>

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))