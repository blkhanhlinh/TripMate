/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { State } from '../../../constants/api'
import { Favorite } from '../../../model/Favorite'
import { addFavoriteThunk, deleteFavoriteThunk, getUserFavoritesThunk } from './thunk'

interface IFavoritesState {
    favorites?: Favorite[]
    status: State
}

const initialState: IFavoritesState = {
    status: State.IDLE,
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserFavoritesThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(getUserFavoritesThunk.fulfilled, (state, action) => {
                state.favorites = action.payload.favorites
                state.status = State.IDLE
            })
            .addCase(getUserFavoritesThunk.rejected, (state) => {
                state.status = State.IDLE
            })

        builder
            .addCase(addFavoriteThunk.pending, (state) => {})
            .addCase(addFavoriteThunk.fulfilled, (state, action) => {
                state.favorites?.push(action.payload.newFavorite)
            })
            .addCase(addFavoriteThunk.rejected, (state) => {})

        builder
            .addCase(deleteFavoriteThunk.pending, (state) => {})
            .addCase(deleteFavoriteThunk.fulfilled, (state, action) => {
                state.favorites = state.favorites?.filter(
                    (favorite) => favorite._id !== action.payload.deletedId
                )
            })
    },
})

export default favoritesSlice.reducer
