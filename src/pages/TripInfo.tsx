import React, { useEffect } from 'react'
import { IonContent, IonIcon, IonPage, IonSpinner } from '@ionic/react'
import Phuket from '../assets/phuket.png'
import moment from 'moment'
import { cameraOutline, mapOutline } from 'ionicons/icons'
import { useHistory, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { selectTrips } from '../store/features/trip/selector'
import { Trip } from '../model/Trip'
import { toDot } from '../utils/converter'
import { selectMemory } from '../store/features/memory/selector'
import { getMemoriesByTripIdThunk } from '../store/features/memory/thunk'
import { State } from '../constants/api'
import { PAGE } from '../constants/page'
import useNavigate from '../hooks/useNavigate'

const TripInfor: React.FC = () => {
    useNavigate({
        currentPage: PAGE.MY.TRIPS.INFO.ROOT,
        pageToNavigate: PAGE.MY.TRIPS.INFO.ROOT,
    })
    const { id } = useParams<{
        id: string
    }>()
    const { trips } = useAppSelector(selectTrips)
    const trip = trips ? trips.find((trip) => trip._id === id) : ({} as Trip)
    const formattedStart_at = moment(trip?.start_at).format('ddd, MMM D')
    const formattedEnd_at = moment(trip?.end_at).format('ddd, MMM D YYYY')
    const displayDate =
        trip?.start_at && trip?.end_at ? `${formattedStart_at} - ${formattedEnd_at}` : ''
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getMemoriesByTripIdThunk(id))
    }, [id])
    const { memories, status } = useAppSelector(selectMemory)

    const history = useHistory()

    const handleOnclick = () => {
        history.push(PAGE.MY.DISCOVERY.ROOT)
    }

    const handlePlanOnclick = () => {
        history.push(PAGE.MY.TRIPS.INFO.DETAILS)
    }

    const handleOnPickImage = () => {
        //
    }

    return (
        <>
            <IonPage>
                <IonContent>
                    <img src={Phuket}></img>
                    <div className="trip-info">
                        <h1 className="trip-name">
                            <strong>{trip?.name}</strong>
                        </h1>
                        <div className="flex-row">
                            <IonIcon icon={mapOutline} className="custom-icon" />
                            <h3 className="trip-destination">{trip?.destination}</h3>
                        </div>
                        <h3 className="trip-date">{displayDate}</h3>
                        <h3 className="trip-budget">My budget: {toDot(trip?.budget || 0)} VND</h3>
                        <button className="custom-outline-button" onClick={handleOnclick}>
                            Discovery
                        </button>
                        <button className="custom-button" onClick={handlePlanOnclick}>
                            Trip details plan
                        </button>
                    </div>
                    <div className="memories">
                        <h2 className="memories-title">Memories</h2>
                        <div className="memories-container">
                            <div className="add-pic" onClick={handleOnPickImage}>
                                <IonIcon icon={cameraOutline} size="large" />
                            </div>
                            {status === State.LOADING ? (
                                <IonSpinner />
                            ) : (
                                memories?.map((memory) => {
                                    return (
                                        <img
                                            src={memory?.image}
                                            alt={trip?.name}
                                            key={memory._id}
                                        />
                                    )
                                })
                            )}
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default TripInfor
