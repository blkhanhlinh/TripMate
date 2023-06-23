import { IonIcon, IonModal, useIonAlert } from '@ionic/react'
import { addOutline, trashOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Attraction } from '../model/Attraction'
import '../theme/styles.css'
import NewAttraction from './NewAttraction'
import { selectAttractions } from '../store/features/attraction/selector'
import { useAppDispatch, useAppSelector } from '../store/hook'
import {
    deleteAttractionThunk,
    getAttractionsByDayIdThunk,
} from '../store/features/attraction/thunk'

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

    const [present] = useIonAlert()
    const handleOnClickDeleteAttraction = (id: string) => {
        present({
            header: 'Delete attraction',
            message: 'Are you sure you want to delete this attraction?',
            buttons: [
                'Cancel',
                {
                    text: 'Delete',
                    handler: async () => {
                        await dispatch(deleteAttractionThunk(id))
                    },
                },
            ],
        })
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
                                <IonIcon
                                    icon={trashOutline}
                                    style={{
                                        color: 'red',
                                        position: 'absolute',
                                        right: 16,
                                        top: 16,
                                    }}
                                    onClick={() =>
                                        handleOnClickDeleteAttraction(attraction._id as string)
                                    }
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default DayPlan
