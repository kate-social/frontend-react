import axios from 'axios'

export const APIInstance = axios.create({
  baseURL: 'http://134.209.194.157/api/',
  withCredentials: true,
})
