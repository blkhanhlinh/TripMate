import React from 'react'
import { Trip } from '../model/Trip'
import { Place } from '../model/Place'
import moment from 'moment'
import { useIonRouter } from '@ionic/react'
import { PAGE } from '../constants/page'

const TripCard = ({ trip, titleStyle }: { trip: Trip; titleStyle?: React.CSSProperties }) => {
    let generateDate = ''
    const diffDates = moment.duration(moment(trip.end_at).diff(moment(trip.start_at)))
    const diffDay = diffDates.asDays()
    switch (true) {
        case diffDay < 1:
            generateDate = 'On day'
            break
        case diffDay < 7:
            generateDate = diffDates.asDays() + ` day${diffDates.asDays() > 1 ? 's' : ''}`
            break
        case diffDay < 30 && diffDay >= 7:
            generateDate = diffDates.asWeeks() + ' week(s)'
            break
        case diffDay < 365 && diffDay >= 30:
            generateDate = diffDates.asMonths() + ' month(s)'
            break
        case diffDay >= 365:
            generateDate = diffDates.asYears() + ' year(s)'
            break
        default:
            break
    }

    const router = useIonRouter()

    return (
        <div
            style={{
                borderRadius: '1rem',
                textAlign: 'left',
                backgroundColor: '#fff',
                border: '1px solid #E0E0E0',
            }}
            onClick={() => router.push(PAGE.MY.TRIPS.INFO.ROOT.replace(':id', trip._id || ''))}
        >
            <img
                src={trip.image}
                alt={trip.name}
                style={{
                    objectFit: 'cover',
                    borderTopLeftRadius: '1rem',
                    borderTopRightRadius: '1rem',
                    height: 'auto',
                }}
            />
            <div
                style={{
                    padding: '1rem',
                }}
            >
                <p
                    style={{
                        margin: '0.5rem 0',
                        color: '#9E9E9E',
                        fontSize: '1rem',
                    }}
                >
                    {(trip.place_id as Place).address} - {generateDate}
                </p>
                <h3
                    style={{
                        fontWeight: 'bold',
                        ...titleStyle,
                    }}
                >
                    {trip.name}
                </h3>
            </div>
        </div>
    )
}

export default TripCard
