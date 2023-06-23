/* eslint-disable no-useless-catch */
import apiInstance from '../../api'
import { API } from '../../constants/api'
import { Trip } from '../../model/Trip'

const getUserTrips = async () => {
    try {
        const res = await apiInstance.get(API.ENDPOINTS.TRIP.USER)
        return res.data
    } catch (err) {
        throw err
    }
}

const getUserTripsByTripId = async (tripId: string) => {
    try {
        const res = await apiInstance.get(`${API.ENDPOINTS.TRIP.USER}/${tripId}`)
        return res.data
    } catch (err) {
        throw err
    }
}

const createTrip = async (trip: Trip) => {
    try {
        const res = await apiInstance.post(API.ENDPOINTS.TRIP.INDEX, trip)
        return res.data
    } catch (err) {
        throw err
    }
}

const updateTrip = async (trip: Trip) => {
    try {
        const res = await apiInstance.put(API.ENDPOINTS.TRIP.INDEX, trip)
        return res.data
    } catch (err) {
        throw err
    }
}

const deleteTrip = async (tripId: string) => {
    try {
        const res = await apiInstance.delete(`${API.ENDPOINTS.TRIP.INDEX}/${tripId}`)
        return res.data
    } catch (err) {
        throw err
    }
}

export { getUserTrips, getUserTripsByTripId, createTrip, updateTrip, deleteTrip }
