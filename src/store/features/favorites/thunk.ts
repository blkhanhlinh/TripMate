/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { addFavorite, deleteFavorite, getUserFavorites } from '../../reducers/favorite'

const getUserFavoritesThunk = createAsyncThunk('favorites/getUserFavorites', async () => {
    try {
        const res = await getUserFavorites()
        return res
    } catch (err) {
        throw err
    }
})

const addFavoriteThunk = createAsyncThunk('favorites/addFavorite', async (placeId: string) => {
    try {
        const res = await addFavorite(placeId)
        return res
    } catch (err) {
        throw err
    }
})

const deleteFavoriteThunk = createAsyncThunk(
    'favorites/deleteFavorite',
    async (favoriteId: string) => {
        try {
            const res = await deleteFavorite(favoriteId)
            return res
        } catch (err) {
            throw err
        }
    }
)

export { getUserFavoritesThunk, addFavoriteThunk, deleteFavoriteThunk }
