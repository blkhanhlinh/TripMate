/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    createTrip,
    deleteTrip,
    getUserTrips,
    getUserTripsByTripId,
    updateTrip,
} from '../../reducers/trip'
import { Trip } from '../../../model/Trip'

const getUserTripsThunk = createAsyncThunk('trip/getUserTrips', async () => {
    try {
        const res = await getUserTrips()
        return res
    } catch (err) {
        throw err
    }
})

const getUserTripsByTripIdThunk = createAsyncThunk(
    'trip/getUserTripsByTripId',
    async (tripId: string) => {
        try {
            const res = await getUserTripsByTripId(tripId)
            return res
        } catch (err) {
            throw err
        }
    }
)

const createTripThunk = createAsyncThunk('trip/createTrip', async (trip: Trip) => {
    try {
        const res = await createTrip(trip)
        return res
    } catch (err) {
        throw err
    }
})

const updateTripThunk = createAsyncThunk('trip/updateTrip', async (trip: Trip) => {
    try {
        const res = await updateTrip(trip)
        return res
    } catch (err) {
        throw err
    }
})

const deleteTripThunk = createAsyncThunk('trip/deleteTrip', async (tripId: string) => {
    try {
        const res = await deleteTrip(tripId)
        return res
    } catch (err) {
        throw err
    }
})

export {
    getUserTripsThunk,
    getUserTripsByTripIdThunk,
    createTripThunk,
    updateTripThunk,
    deleteTripThunk,
}
