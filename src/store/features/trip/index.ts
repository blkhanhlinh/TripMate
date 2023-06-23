/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { State } from '../../../constants/api'
import { Trip } from '../../../model/Trip'
import { createTripThunk, deleteTripThunk, getUserTripsThunk, updateTripThunk } from './thunk'

interface ITripSlice {
    trips?: Trip[]
    status: State
}

const initialState: ITripSlice = {
    status: State.IDLE,
}

export const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserTripsThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(getUserTripsThunk.fulfilled, (state, action) => {
                state.trips = action.payload.trips
                state.status = State.IDLE
            })
            .addCase(getUserTripsThunk.rejected, (state) => {
                state.status = State.IDLE
            })

        builder
            .addCase(createTripThunk.pending, (state) => {})
            .addCase(createTripThunk.fulfilled, (state, action) => {
                state.trips?.push(action.payload.trip)
            })
            .addCase(createTripThunk.rejected, (state) => {})

        builder
            .addCase(updateTripThunk.pending, (state) => {})
            .addCase(updateTripThunk.fulfilled, (state, action) => {
                state.trips = state.trips?.map((trip) => {
                    if (trip._id === action.payload.trip._id) {
                        return action.payload.trip
                    }
                    return trip
                })
            })
            .addCase(updateTripThunk.rejected, (state) => {})

        builder
            .addCase(deleteTripThunk.pending, (state) => {})
            .addCase(deleteTripThunk.fulfilled, (state, action) => {
                state.trips = state.trips?.filter((trip) => trip._id !== action.payload.deletedId)
            })
            .addCase(deleteTripThunk.rejected, (state) => {})
    },
})

export default tripSlice.reducer
