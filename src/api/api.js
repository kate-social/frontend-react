import axios from 'axios'

export const APIInstance = axios.create({
  baseURL: 'http://kate.discore.me/api/',
  withCredentials: true,
})
