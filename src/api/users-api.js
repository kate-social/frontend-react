import { APIInstance } from './api'

export const UsersAPI = {
  async getMe(token) {
    const response = await APIInstance.get('users/me', {
      headers: {
        Token: token || null,
      },
    })
    return response.data
  },
}
