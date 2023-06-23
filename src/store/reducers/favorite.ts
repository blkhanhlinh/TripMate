/* eslint-disable no-useless-catch */

import apiInstance from '../../api'
import { API } from '../../constants/api'

const getUserFavorites = async () => {
    try {
        const res = await apiInstance.get(API.ENDPOINTS.FAVORITE.USER)
        return res.data
    } catch (err) {
        throw err
    }
}

const addFavorite = async (placeId: string) => {
    try {
        const res = await apiInstance.post(API.ENDPOINTS.FAVORITE.INDEX, { place_id: placeId })
        return res.data
    } catch (err) {
        throw err
    }
}

const deleteFavorite = async (favoriteId: string) => {
    try {
        const res = await apiInstance.delete(`${API.ENDPOINTS.FAVORITE.INDEX}/${favoriteId}`)
        return res.data
    } catch (err) {
        throw err
    }
}

export { getUserFavorites, addFavorite, deleteFavorite }
