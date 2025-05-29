import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

const axiosClient: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config): any => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: any): Promise<never> => {
    return Promise.reject(error.response?.data?.message || error ||  new Error('An unknown error occurred'))
  }
)

export default axiosClient
