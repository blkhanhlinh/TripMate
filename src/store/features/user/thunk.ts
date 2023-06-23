/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { changeUserAvatar, getCurrentUser, signIn, signUp } from '../../reducers/user'
import { User } from '../../../model/User'

const signInThunk = createAsyncThunk(
    'user/signIn',
    async (payload: { username: string; password: string }) => {
        try {
            const res = await signIn(payload.username, payload.password)
            return res
        } catch (err) {
            throw err
        }
    }
)

const signUpThunk = createAsyncThunk('user/signUp', async (payload: User) => {
    try {
        const res = await signUp(payload)
        return res
    } catch (err) {
        throw err
    }
})

const getCurrentUserThunk = createAsyncThunk('user/getCurrentUser', async () => {
    try {
        const res = await getCurrentUser()
        return res
    } catch (err) {
        throw err
    }
})

const changeUserAvatarThunk = createAsyncThunk(
    'user/changeUserAvatar',
    async (payload: { image: string }) => {
        try {
            const res = await changeUserAvatar(payload.image)
            return res
        } catch (err) {
            throw err
        }
    }
)

export { signInThunk, signUpThunk, getCurrentUserThunk, changeUserAvatarThunk }
