import { Place } from './Place'

export interface Favorite {
    _id?: string
    user_id: string
    place_id: Place | string
    place?: Place
}
