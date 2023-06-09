import { IonContent, IonIcon, IonPage, IonSpinner, useIonAlert } from '@ionic/react'
import { arrowBack, cameraOutline, mapOutline } from 'ionicons/icons'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import MemoryCard from '../components/MemoryCard'
import { State } from '../constants/api'
import { PAGE } from '../constants/page'
import useCamera from '../hooks/useCamera'
import useNavigate from '../hooks/useNavigate'
import { Trip } from '../model/Trip'
import { selectMemory } from '../store/features/memory/selector'
import { createMemoryThunk, getMemoriesByTripIdThunk } from '../store/features/memory/thunk'
import { selectTrips } from '../store/features/trip/selector'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { toDot } from '../utils/converter'
import { imageUpload } from '../utils/image'
import { Place } from '../model/Place'
import { deleteTripThunk } from '../store/features/trip/thunk'

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
        history.push(
            PAGE.MY.DISCOVERY.FEATURED_EXPERIENCE + `?keyword=${(trip?.place_id as Place).name}`
        )
    }

    const handlePlanOnclick = () => {
        history.push(PAGE.MY.TRIPS.INFO.DETAILS.replace(':id', id))
    }

    const { takePicture } = useCamera()

    const handleOnPickImage = async () => {
        //
        const image = await takePicture()
        if (image) {
            // console.log({image})
            const imageFile = await fetch(image.webPath!)
            const imageBlob = await imageFile.blob()
            try {
                const imageUploaded = await imageUpload(imageBlob)
                if (imageUploaded) {
                    const res = await dispatch(
                        createMemoryThunk({
                            trip_id: id,
                            image: imageUploaded,
                        })
                    )
                    if (res.payload) {
                        console.log({ res })
                    }
                }
            } catch (err) {
                console.log({ err })
            }
        }
    }

    const [present] = useIonAlert()
    const handleOnClickDelete = () => {
        present({
            header: 'Delete trip',
            message: 'Are you sure you want to delete this trip?',
            buttons: [
                'Cancel',
                {
                    text: 'Delete',
                    handler: async () => {
                        const res = await dispatch(deleteTripThunk(id))
                        if (res.payload) {
                            history.replace(PAGE.MY.TRIPS.ROOT)
                        }
                    },
                },
            ],
        })
    }

    return (
        <>
            <IonPage>
                <IonContent>
                    <div className="header-container">
                        <IonIcon
                            icon={arrowBack}
                            onClick={() => history.goBack()}
                            className="back-arrow"
                            size="large"
                        />
                        <img src={trip?.image} alt="Place image" />
                    </div>
                    <div className="trip-info">
                        <h1 className="trip-name">
                            <strong>{trip?.name}</strong>
                        </h1>
                        <h4>{displayDate}</h4>
                        <h4>My budget: {toDot(trip?.budget || 0)} VND</h4>
                        <div className='trip-buttons'>
                            <button className="custom-outline-button" onClick={handleOnclick}>
                                Discovery
                            </button>
                            <button className="custom-button" onClick={handlePlanOnclick}>
                                Trip details plan
                            </button>
                            <button
                                onClick={handleOnClickDelete}
                                style={{
                                    color: 'red',
                                }}
                            >
                                Delete trip
                            </button>
                        </div>
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
                                    return <MemoryCard {...memory} key={memory._id} />
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
