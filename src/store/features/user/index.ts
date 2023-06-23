/* eslint-disable @typescript-eslint/no-empty-function */
import { State } from '../../../constants/api'
import { AuthState, User } from '../../../model/User'
import { createSlice } from '@reduxjs/toolkit'
import { changeUserAvatarThunk, getCurrentUserThunk, signInThunk, signUpThunk } from './thunk'
import Token from '../../../utils/token'

interface IUserSlice {
    user?: User
    authState: AuthState
    status: State
}

const initialState: IUserSlice = {
    authState: AuthState.UNAUTHORIZED,
    status: State.IDLE,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.authState = AuthState.UNAUTHORIZED
            state.user = undefined
            Token.removeAll()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(signInThunk.fulfilled, (state, action) => {
                state.authState = AuthState.AUTHORIZED
                state.status = State.IDLE
                state.user = action.payload.user
            })
            .addCase(signInThunk.rejected, (state) => {
                state.status = State.IDLE
            })

        builder
            .addCase(signUpThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(signUpThunk.fulfilled, (state, action) => {
                state.authState = AuthState.AUTHORIZED
                state.status = State.IDLE
                state.user = action.payload.user
            })
            .addCase(signUpThunk.rejected, (state) => {
                state.status = State.IDLE
            })

        builder
            .addCase(getCurrentUserThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.authState = AuthState.AUTHORIZED
                state.status = State.IDLE
            })
            .addCase(getCurrentUserThunk.rejected, (state) => {
                state.status = State.IDLE
            })

        builder
            .addCase(changeUserAvatarThunk.pending, (state) => {})
            .addCase(changeUserAvatarThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(changeUserAvatarThunk.rejected, (state) => {})
    },
})

export default userSlice.reducer
export const { logOut } = userSlice.actions
