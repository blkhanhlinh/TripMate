import apiInstance from '../../api'
import { API } from '../../constants/api'

/* eslint-disable no-useless-catch */
const getAllPlaces = async () => {
    try {
        const res = await apiInstance.get(API.ENDPOINTS.PLACE.ALL)
        return res.data
    } catch (err) {
        throw err
    }
}

export { getAllPlaces }
