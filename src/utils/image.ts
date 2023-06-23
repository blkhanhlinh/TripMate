/* eslint-disable no-useless-catch */

import apiInstance from '../api'
import { API } from '../constants/api'

export const imageUpload = async (file: any) => {
    const formData = new FormData()
    formData.append('image', file)
    try {
        const res = await apiInstance.post(API.ENDPOINTS.IMAGE_UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        const data = await res.data
        return data.image
    } catch (err) {
        throw err
    }
}
