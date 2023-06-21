/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit'
import apiInstance from '../../../api'
import { getAllPlaces } from '../../reducers/place'

const getAllPlacesThunk = createAsyncThunk('place/getAllPlaces', async () => {
    try {
        const res = await getAllPlaces()
        return res.data
    } catch (err) {
        throw err
    }
})

export { getAllPlacesThunk }
