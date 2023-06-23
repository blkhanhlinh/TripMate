/* eslint-disable no-useless-catch */
import apiInstance from '../../api'
import { API } from '../../constants/api'
import { Attraction } from '../../model/Attraction'

const getAttractionsByDayId = async (dayId: string) => {
    try {
        const res = await apiInstance.get(API.ENDPOINTS.ATTRACTION.INDEX, {
            params: {
                day_id: dayId,
            },
        })
        return res.data
    } catch (err) {
        throw err
    }
}

const createAttraction = async (attraction: Attraction) => {
    try {
        const res = await apiInstance.post(API.ENDPOINTS.ATTRACTION.INDEX, attraction)
        return res.data
    } catch (err) {
        throw err
    }
}

const deleteAttraction = async (attractionId: string) => {
    try {
        const res = await apiInstance.delete(`${API.ENDPOINTS.ATTRACTION.INDEX}/${attractionId}`)
        return res.data
    } catch (err) {
        throw err
    }
}

export { getAttractionsByDayId, createAttraction, deleteAttraction }
