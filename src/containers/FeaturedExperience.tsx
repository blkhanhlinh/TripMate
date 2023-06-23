import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import React from 'react'
import { useAppSelector } from '../store/hook'
import { selectPlace } from '../store/features/place/selector'
import { PlaceType } from '../model/Place'
import PlaceCard from '../components/PlaceCard'
import { PAGE } from '../constants/page'
import { arrowBackOutline } from 'ionicons/icons'
import { useHistory } from 'react-router'

const FeaturedExperience: React.FC = () => {
    const searchParams = new URLSearchParams(document.location.search)
    const keyword = searchParams.get('keyword') || ''
    const { places } = useAppSelector(selectPlace)
    const featuredExperience = places?.filter((place) => {
        return (
            place.type === PlaceType.FEATURED_EXPERIENCE &&
            place.address.toLowerCase().includes(decodeURI(keyword.toLowerCase()))
        )
    })

    const history = useHistory();
    const handleBack = () => {
        history.goBack();
    }

    const router = useIonRouter()
    return (
        <IonPage>
            <IonContent fullscreen class="ion-padding">
                <div className="type-header">
                    <IonIcon icon={arrowBackOutline} size='large' onClick={handleBack} />
                    <h1>Featured experience</h1>
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        rowGap: 16,
                        columnGap: 8,
                        marginBottom: 32,
                    }}
                >
                    {featuredExperience?.map((place) => {
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
                    {featuredExperience?.length === 0 && <p>No data</p>}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default FeaturedExperience
