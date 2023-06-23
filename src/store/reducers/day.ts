/* eslint-disable no-useless-catch */
import apiInstance from '../../api'
import { API } from '../../constants/api'
import { Day } from '../../model/Day'

const getUserDaysByTripId = async (tripId: string) => {
    try {
        const res = await apiInstance.get(API.ENDPOINTS.DAY.INDEX, {
            params: {
                trip_id: tripId,
            },
        })
        return res.data
    } catch (err) {
        throw err
    }
}

const createDay = async (day: Day) => {
    try {
        const res = await apiInstance.post(API.ENDPOINTS.DAY.INDEX, day)
        return res.data
    } catch (err) {
        throw err
    }
}

const deleteDay = async (dayId: string) => {
    try {
        const res = await apiInstance.delete(`${API.ENDPOINTS.DAY.INDEX}/${dayId}`)
        return res.data
    } catch (err) {
        throw err
    }
}

export { getUserDaysByTripId, createDay, deleteDay }
