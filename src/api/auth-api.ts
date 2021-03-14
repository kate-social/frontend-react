import { APIInstance } from './api'

export const AuthAPI = {
  login(login: string, password: string) {
    return APIInstance.post('auth/user', {
      login,
      password,
      scope: 2 ** 5,
      server_cookie: true,
    }).then((res) => {
      return res
    })
  },
}