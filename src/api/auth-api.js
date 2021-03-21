import { APIInstance } from './api'

export const AuthAPI = {
  async login(login, password) {
    const response = await APIInstance.post('auth/login', {
      login,
      password,
      scope: 2 ** 15,
    })
    return response.data
  },
}