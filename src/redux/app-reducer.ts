import { InferActionType } from './store'
import { fetchUserAuthData } from './auth-reducer'

const initialState = {
  isInitialized: false,
}

type ActionType = InferActionType<typeof actions>

export const appReducer = (state = initialState, action: ActionType) => {
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

export const initializeApp = (token: string) => (dispatch: any) => {
  return Promise.all([dispatch(fetchUserAuthData(token))]).then(dispatch(actions.initializedSuccess()))
}

export const actions = {
  initializedSuccess: () => ({ type: 'KS/APP/INITIALIZED_SUCCESS' } as const),
}