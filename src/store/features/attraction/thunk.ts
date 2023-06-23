/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    createAttraction,
    deleteAttraction,
    getAttractionsByDayId,
} from '../../reducers/attraction'
import { Attraction } from '../../../model/Attraction'

const getAttractionsByDayIdThunk = createAsyncThunk(
    'attraction/getAttractionsByDayId',
    async (dayId: string) => {
        try {
            const res = await getAttractionsByDayId(dayId)
            return res
        } catch (err) {
            throw err
        }
    }
)

const createAttractionThunk = createAsyncThunk(
    'attraction/createAttraction',
    async (attraction: Attraction) => {
        try {
            const res = await createAttraction(attraction)
            return res
        } catch (err) {
            throw err
        }
    }
)

const deleteAttractionThunk = createAsyncThunk(
    'attraction/deleteAttraction',
    async (attractionId: string) => {
        try {
            const res = await deleteAttraction(attractionId)
            return res
        } catch (err) {
            throw err
        }
    }
)

export { getAttractionsByDayIdThunk, createAttractionThunk, deleteAttractionThunk }
