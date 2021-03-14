import { APIInstance } from './api'

export const UsersAPI = {
  getMe(token: string) {
    return APIInstance.get('users/me', {
      headers: {
        token: token,
      },
    }).then((res) => {
      return res.data
    }).catch((e) => {
      const resp = e.response
      if (resp.status === 409) {
        if (resp.data.code === 4) {
          return
        }
      }
    })
  },
}