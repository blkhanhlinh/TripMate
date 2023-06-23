import { IonContent, IonPage, useIonRouter } from '@ionic/react'
import React from 'react'
import { useAppSelector } from '../store/hook'
import { selectPlace } from '../store/features/place/selector'
import { PlaceType } from '../model/Place'
import PlaceCard from '../components/PlaceCard'
import { PAGE } from '../constants/page'

const HotPlaces: React.FC = () => {
    const { places } = useAppSelector(selectPlace)
    const hotPlaces = places?.filter((place) => place.type === PlaceType.HOT_PLACES)
    const router = useIonRouter()
    return (
        <IonPage>
            <IonContent fullscreen class="ion-padding">
                <h1
                    style={{
                        marginBottom: 10,
                    }}
                >
                    Hot places
                </h1>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 50%)',
                        rowGap: 10,
                        columnGap: 4,
                    }}
                >
                    {hotPlaces?.map((place) => {
                        return (
                            <div
                                key={place._id}
                                onClick={() =>
                                    router.push(
                                        PAGE.MY.DISCOVERY.DETAIL.replace(':id', place._id || '')
                                    )
                                }
                            >
                                <PlaceCard
                                    place={place}
                                    titleStyle={{
                                        width: '100%',
                                        whiteSpace: 'normal',
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default HotPlaces
