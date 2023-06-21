import { Place } from './Place'

export interface Trip {
    _id?: string
    destination: string
    startDate: Date
    endDate: Date
    budget: number
    userId: string
    placeId: string
    place?: Place
    name: string
    image?: string
}
