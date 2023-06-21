import { Place } from './Place'

export interface Favorite {
    _id?: string
    userId: string
    placeId: string
    place?: Place
}
