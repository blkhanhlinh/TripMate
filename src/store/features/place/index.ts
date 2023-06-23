/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { State } from '../../../constants/api'
import { Place } from '../../../model/Place'
import { getAllPlacesThunk } from './thunk'

interface IPlaceSlice {
    places?: Place[]
    status: State
}

const initialState: IPlaceSlice = {
    status: State.IDLE,
}

export const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPlacesThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(getAllPlacesThunk.fulfilled, (state, action) => {
                state.places = action.payload.places
                state.status = State.IDLE
            })
            .addCase(getAllPlacesThunk.rejected, (state) => {
                state.status = State.IDLE
            })
    },
})

export default placeSlice.reducer
