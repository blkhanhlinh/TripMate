import { IonContent, IonIcon, IonPage, IonSearchbar, useIonRouter } from '@ionic/react'
import React, { useMemo } from 'react'
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

    const history = useHistory()
    const handleBack = () => {
        history.goBack()
    }

    const [searchKW, setSearchKW] = React.useState('')

    const filteredFeaturedExp = useMemo(
        () =>
            featuredExperience?.filter((place) =>
                place.name.toLowerCase().includes(searchKW.toLowerCase()) ||
                place.address.toLowerCase().includes(searchKW.toLowerCase())
            ),
        [searchKW, featuredExperience]
    )

    const router = useIonRouter()
    return (
        <IonPage>
            <IonContent fullscreen class="ion-padding">
                <div className="type-header">
                    <IonIcon icon={arrowBackOutline} size="large" onClick={handleBack} />
                    <h1>Featured experience</h1>
                </div>
                <IonSearchbar
                    onIonChange={(e) => {
                        setSearchKW(e.target.value as string)
                    }}
                ></IonSearchbar>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        rowGap: 16,
                        columnGap: 8,
                        marginBottom: 32,
                        marginTop: 16,
                    }}
                >
                    {filteredFeaturedExp &&
                        (filteredFeaturedExp.length > 0 ? (
                            filteredFeaturedExp.map((place) => {
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
                            })) : (
                            <p>No data</p>
                        ))}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default FeaturedExperience