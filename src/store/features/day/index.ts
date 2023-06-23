/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { State } from '../../../constants/api'
import { Day } from '../../../model/Day'
import { createDayThunk, deleteDayThunk, getUserDaysByTripIdThunk } from './thunk'

interface IDaySlice {
    days?: Day[]
    status: State
}

const initialState: IDaySlice = {
    status: State.IDLE,
}

export const daySlice = createSlice({
    name: 'day',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDaysByTripIdThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(getUserDaysByTripIdThunk.fulfilled, (state, action) => {
                state.days = action.payload.day
                state.status = State.IDLE
            })
            .addCase(getUserDaysByTripIdThunk.rejected, (state) => {
                state.status = State.IDLE
            })

        builder
            .addCase(createDayThunk.pending, (state) => {})
            .addCase(createDayThunk.fulfilled, (state, action) => {
                state.days?.push(action.payload.newDay)
            })
            .addCase(createDayThunk.rejected, (state) => {})

        builder
            .addCase(deleteDayThunk.pending, (state) => {})
            .addCase(deleteDayThunk.fulfilled, (state, action) => {
                state.days = state.days?.filter((day) => day._id !== action.payload.deletedId)
            })
            .addCase(deleteDayThunk.rejected, (state) => {})
    },
})

export default daySlice.reducer
