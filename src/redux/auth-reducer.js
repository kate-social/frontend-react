import { UsersAPI } from '../api/users-api'
import { AuthAPI } from '../api/auth-api'

const initialState = {
  token: null,
  id: null,
  login: null,
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

}

export const login = (login, password) => async (dispatch) => {
  const result = await AuthAPI.login(login, password)
  if (result.status === 200) {
    const token = result.data.token
    dispatch(actions.setToken(token))
    await dispatch(fetchUserAuthData(token))
    return token
  }
}


export const actions = {
  setUserData: () => ({ type: 'KS/AUTH/SET_USER_DATA' }),
  setToken: (token) => ({ type: 'KS/AUTH/SET_TOKEN', payload: { token } }),
}
