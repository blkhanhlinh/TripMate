import { IonIcon, IonModal } from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Attraction } from '../model/Attraction'
import '../theme/styles.css'
import NewAttraction from './NewAttraction'
import { selectAttractions } from '../store/features/attraction/selector'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { getAttractionsByDayIdThunk } from '../store/features/attraction/thunk'

type Props = {
    dayId: string
}

const DayPlan: React.FC<Props> = ({ dayId }) => {
    const [showModal, setShowModal] = useState(false)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAttractionsByDayIdThunk(dayId))
    }, [dayId])
    const { attractions } = useAppSelector(selectAttractions)

    const handleAddAttraction = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <div className="day-screen">
            <button onClick={handleAddAttraction} className="add-button">
                <IonIcon icon={addOutline} className="custom-icon" />
                <p>Add new attraction</p>
            </button>

            <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
                <NewAttraction onCancel={handleCloseModal} dayId={dayId} />
            </IonModal>

            <div className="day-plan">
                <div className="attractions">
                    {attractions &&
                        attractions.map((attraction) => (
                            <div key={attraction._id} className="attraction">
                                <p>{attraction.time.toLocaleString()}</p>
                                <h3>{attraction.location_name}</h3>
                                <p>{attraction.address}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default DayPlan
