/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { State } from '../../../constants/api'
import { Memory } from '../../../model/Memory'
import { createMemoryThunk, deleteMemoryThunk, getMemoriesByTripIdThunk } from './thunk'

interface IMemorySlice {
    memories?: Memory[]
    status: State
}

const initialState: IMemorySlice = {
    status: State.IDLE,
}

export const memorySlice = createSlice({
    name: 'memory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMemoriesByTripIdThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(getMemoriesByTripIdThunk.fulfilled, (state, action) => {
                state.memories = action.payload.memories
                state.status = State.IDLE
            })
            .addCase(getMemoriesByTripIdThunk.rejected, (state) => {
                state.status = State.IDLE
            })

        builder
            .addCase(createMemoryThunk.pending, (state) => {})
            .addCase(createMemoryThunk.fulfilled, (state, action) => {
                state.memories?.push(action.payload.newMemory)
            })
            .addCase(createMemoryThunk.rejected, (state) => {})

        builder
            .addCase(deleteMemoryThunk.pending, (state) => {})
            .addCase(deleteMemoryThunk.fulfilled, (state, action) => {
                state.memories = state.memories?.filter(
                    (memory) => memory._id !== action.payload.deletedId
                )
            })
            .addCase(deleteMemoryThunk.rejected, (state) => {})
    },
})
