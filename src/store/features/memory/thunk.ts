/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createMemory, deleteMemory, getMemoriesByTripId } from '../../reducers/memory'
import { Memory } from '../../../model/Memory'

const getMemoriesByTripIdThunk = createAsyncThunk(
    'memory/getMemoriesByTripId',
    async (tripId: string) => {
        try {
            const res = await getMemoriesByTripId(tripId)
            return res
        } catch (err) {
            throw err
        }
    }
)

const createMemoryThunk = createAsyncThunk('memory/createMemory', async (memory: Memory) => {
    try {
        const res = await createMemory(memory)
        return res
    } catch (err) {
        throw err
    }
})

const deleteMemoryThunk = createAsyncThunk('memory/deleteMemory', async (memoryId: string) => {
    try {
        const res = await deleteMemory(memoryId)
        return res
    } catch (err) {
        throw err
    }
})

export { getMemoriesByTripIdThunk, createMemoryThunk, deleteMemoryThunk }
