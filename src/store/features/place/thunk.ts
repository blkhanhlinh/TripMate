/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPlaces } from '../../reducers/place'

const getAllPlacesThunk = createAsyncThunk('place/getAllPlaces', async () => {
    try {
        const res = await getAllPlaces()
        return res
    } catch (err) {
        throw err
    }
})

export { getAllPlacesThunk }
