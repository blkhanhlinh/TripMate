/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createDay, deleteDay, getUserDaysByTripId } from '../../reducers/day'
import { Day } from '../../../model/Day'

const getUserDaysByTripIdThunk = createAsyncThunk(
    'day/getUserDaysByTripId',
    async (tripId: string) => {
        try {
            const res = await getUserDaysByTripId(tripId)
            return res
        } catch (err) {
            throw err
        }
    }
)

const createDayThunk = createAsyncThunk('day/createDay', async (day: Day) => {
    try {
        const res = await createDay(day)
        return res
    } catch (err) {
        throw err
    }
})

const deleteDayThunk = createAsyncThunk('day/deleteDay', async (dayId: string) => {
    try {
        const res = await deleteDay(dayId)
        return res
    } catch (err) {
        throw err
    }
})

export { getUserDaysByTripIdThunk, createDayThunk, deleteDayThunk }
