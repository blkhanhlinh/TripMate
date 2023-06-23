import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Attraction } from '../model/Attraction'
import DayPlan from '../components/DayPlan'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { getUserDaysByTripIdThunk } from '../store/features/day/thunk'
import { selectDays } from '../store/features/day/selector'
import { resetDaySlice } from '../store/features/day'

type Props = {
    tripId: string
    dayIndex: number
}

const DaysPlan: React.FC<Props> = ({ tripId }) => {
    const [selectedDay, setSelectedDay] = useState<number>(1)

    const dispatch = useAppDispatch()
    const { status, days } = useAppSelector(selectDays)
    const selectedDayId = days?.[selectedDay - 1]?._id
    useEffect(() => {
        dispatch(getUserDaysByTripIdThunk(tripId))
    }, [tripId])

    const handleDayClick = (dayIndex: number) => {
        setSelectedDay(dayIndex)
    }

    const renderDayButtons = () => {
        const dayButtons = []

        for (let i = 1; i <= (days?.length || 0); i++) {
            const dayNumber = i
            const formattedDate = moment(days?.[i - 1]?.date).format('DD/MM/YYYY')

            dayButtons.push(
                <div key={i} className="day-button-container">
                    <button
                        className={`day-button ${selectedDay === i ? 'active' : ''}`}
                        onClick={() => handleDayClick(dayNumber)}
                    >
                        <div className="day-flex">
                            <h3>Day {dayNumber}</h3>
                            <p>{formattedDate}</p>
                        </div>
                    </button>
                </div>
            )
        }

        return dayButtons
    }

    return (
        <div className="day-plan">
            <div className="days-nav">{renderDayButtons()}</div>
            {selectedDay && (
                <>
                    <DayPlan dayId={selectedDayId as string} />
                </>
            )}
        </div>
    )
}

export default DaysPlan
