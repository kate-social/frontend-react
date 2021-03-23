import { fetchUserAuthData } from './auth-reducer'

const initialState = {
  isInitialized: false,
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'KS/APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        isInitialized: true,
      }
    default:
      return state
  }
}

export const initializeApp = token => async dispatch => {
  return Promise.all([dispatch(fetchUserAuthData(token))]).then(() => {
    dispatch(actions.initializedSuccess())
  })
}

export const actions = {
  initializedSuccess: () => ({ type: 'KS/APP/INITIALIZED_SUCCESS' }),
}
