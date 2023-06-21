import axios from 'axios'
import Token from '../utils/token'
import { API } from '../constants/api'

const apiInstance = axios.create({
    baseURL: API.BASE,
})

apiInstance.interceptors.request.use(async function (config) {
    const token = await Token.getToken()
    console.log({ token })
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default apiInstance
