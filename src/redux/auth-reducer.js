import { UsersAPI } from '../api/users-api'
import { AuthAPI } from '../api/auth-api'

const initialState = {
  token: null,
  id: null,
  username: null,
  isAuthenticated: false,
}


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'KS/AUTH/SET_TOKEN':
      return { ...state, token: action.payload.token }
    default:
      return state
  }
}

export const fetchUserAuthData = (token) => async (dispatch) => {
  const authData = await UsersAPI.getMe(token)
  if (authData.ok) {
    dispatch(actions.setUserData(authData.id, authData.username, true))
    return
  }
  dispatch(actions.setUserData(null, null, false))
}

export const login = (login, password) => async (dispatch) => {
  const result = await AuthAPI.login(login, password)
  if (result.ok) {
    const token = result.response.token
    dispatch(actions.setToken(token))
    await dispatch(fetchUserAuthData(token))
    return token
  }
  return null
}


export const actions = {
  setUserData: (id, username, isAuthenticated) => ({
    type: 'KS/AUTH/SET_USER_DATA',
    payload: { id, username, isAuthenticated },
  }),
  setToken: (token) => ({ type: 'KS/AUTH/SET_TOKEN', payload: { token } }),
}
