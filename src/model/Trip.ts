import { Place } from './Place'

export interface Trip {
    _id?: string
    destination: string
    start_at: Date
    end_at: Date
    budget: number
    user_id: string
    place_id: string | Place
    name: string
    image?: string
}
