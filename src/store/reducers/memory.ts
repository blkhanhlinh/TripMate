/* eslint-disable no-useless-catch */
import apiInstance from '../../api'
import { API } from '../../constants/api'
import { Memory } from '../../model/Memory'

const getMemoriesByTripId = async (tripId: string) => {
    try {
        const res = await apiInstance.get(API.ENDPOINTS.MEMORY.INDEX, {
            params: {
                trip_id: tripId,
            },
        })
        return res.data
    } catch (err) {
        throw err
    }
}

const createMemory = async (memory: Memory) => {
    try {
        const res = await apiInstance.post(API.ENDPOINTS.MEMORY.INDEX, memory)
        return res.data
    } catch (err) {
        throw err
    }
}

const deleteMemory = async (memoryId: string) => {
    try {
        const res = await apiInstance.delete(`${API.ENDPOINTS.MEMORY.INDEX}/${memoryId}`)
        return res.data
    } catch (err) {
        throw err
    }
}

export { getMemoriesByTripId, createMemory, deleteMemory }
