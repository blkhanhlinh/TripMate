import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import {
    addOutline,
    arrowBackOutline,
    flameOutline,
    heart,
    heartOutline,
    locationOutline,
} from 'ionicons/icons'
import React from 'react'
import { useParams } from 'react-router'
import { PAGE } from '../constants/page'
import { selectPlace } from '../store/features/place/selector'
import { useAppDispatch, useAppSelector } from '../store/hook'
import '../theme/styles.css'
import { addFavoriteThunk, deleteFavoriteThunk } from '../store/features/favorites/thunk'
import { selectFavorites } from '../store/features/favorites/selector'
import { Place } from '../model/Place'

const PlaceDetails: React.FC = () => {
    const router = useIonRouter()
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const { places } = useAppSelector(selectPlace)
    const { favorites } = useAppSelector(selectFavorites)
    const place = places && places.find((place) => place._id === id)
    const handleOnClickStartNewTrip = async () => {
        router.push(PAGE.MY.TRIPS.ADD.replace(':place_id', id))
    }

    const favorite = favorites?.find((favorite) => (favorite.place_id as Place)._id === id)
    const isFavorite = !!favorite
    const handleOnClickHeart = async () => {
        if (!isFavorite) {
            await dispatch(addFavoriteThunk(id))
        } else {
            await dispatch(deleteFavoriteThunk(favorite?._id as string))
        }
    }

    return (
        <>
            <IonPage>
                <IonContent>
                    <div className="place-container">
                        <div className="header-back">
                            <IonIcon
                                icon={arrowBackOutline}
                                size="large"
                                onClick={() => router.goBack()}
                            />
                            <IonIcon
                                icon={isFavorite ? heart : heartOutline}
                                size="large"
                                onClick={handleOnClickHeart}
                                style={{
                                    color: isFavorite ? 'red' : 'black',
                                }}
                            />
                        </div>
                        <div>
                            <img src={place?.image} className="custom-pic" />
                        </div>
                        <div className="place-content">
                            <h1>{place?.name}</h1>
                            <div className="address">
                                <IonIcon
                                    icon={locationOutline}
                                    style={{
                                        color: 'blue',
                                    }}
                                />
                                <h4
                                    style={{
                                        color: 'blue',
                                    }}
                                >
                                    {place?.address}
                                </h4>
                            </div>
                            <p>{place?.description}</p>
                            <h3>Tags</h3>
                            <div className="tags">
                                <IonIcon icon={flameOutline} />
                                <div>{place?.type}</div>
                            </div>
                        </div>
                        <button
                            className="custom-button margin-top"
                            onClick={handleOnClickStartNewTrip}
                        >
                            <IonIcon icon={addOutline} size="large" />
                            <span>Start new trip</span>
                        </button>
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PlaceDetails
