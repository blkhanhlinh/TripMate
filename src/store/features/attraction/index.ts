/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { State } from '../../../constants/api'
import { Attraction } from '../../../model/Attraction'
import { createAttractionThunk, deleteAttractionThunk, getAttractionsByDayIdThunk } from './thunk'

interface IAttractionSlice {
    attractions?: Attraction[]
    status: State
}

const initialState: IAttractionSlice = {
    status: State.IDLE,
}

export const attractionSlice = createSlice({
    name: 'attraction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAttractionsByDayIdThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(getAttractionsByDayIdThunk.fulfilled, (state, action) => {
                state.attractions = action.payload.attractions
                state.status = State.IDLE
            })
            .addCase(getAttractionsByDayIdThunk.rejected, (state) => {
                state.status = State.IDLE
            })
        builder
            .addCase(createAttractionThunk.pending, (state) => {})
            .addCase(createAttractionThunk.fulfilled, (state, action) => {
                state.attractions?.push(action.payload.newAttraction)
            })
            .addCase(createAttractionThunk.rejected, (state) => {})

        builder
            .addCase(deleteAttractionThunk.pending, (state) => {})
            .addCase(deleteAttractionThunk.fulfilled, (state, action) => {
                state.attractions = state.attractions?.filter(
                    (attraction) => attraction._id !== action.payload.deletedId
                )
            })
            .addCase(deleteAttractionThunk.rejected, (state) => {})
    },
})

export default attractionSlice.reducer
