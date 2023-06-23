/* eslint-disable no-useless-catch */

import axios from 'axios'
import apiInstance from '../../api'
import { API } from '../../constants/api'
import { User } from '../../model/User'
import Token from '../../utils/token'

const signIn = async (username: string, password: string) => {
    try {
        const res = await axios.post(API.BASE + API.ENDPOINTS.AUTH.SIGNIN, {
            username,
            password,
        })
        await Token.setToken(res.data.accessToken)
        return res.data
    } catch (err) {
        console.log(err)
        throw err
    }
}

const signUp = async (data: User) => {
    try {
        const res = await axios.post(API.BASE + API.ENDPOINTS.AUTH.SIGNUP, data)
        await Token.setToken(res.data.accessToken)
        return res.data
    } catch (err) {
        throw err
    }
}

const getCurrentUser = async () => {
    try {
        const res = await apiInstance.get(API.ENDPOINTS.USER.CURRENT)
        return res.data
    } catch (err) {
        throw err
    }
}

export { signIn, signUp, getCurrentUser }
