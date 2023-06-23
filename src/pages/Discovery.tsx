import React, { useCallback } from 'react'
import {
    IonContent,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonPage,
    useIonRouter,
} from '@ionic/react'
import useNavigate from '../hooks/useNavigate'
import { PAGE } from '../constants/page'
import { useAppSelector } from '../store/hook'
import { selectPlace } from '../store/features/place/selector'
import { Place, PlaceType } from '../model/Place'
import { Virtuoso } from 'react-virtuoso'
import { Swiper, SwiperSlide } from 'swiper/react'
import { chevronForwardOutline, locationOutline } from 'ionicons/icons'
import PlaceCard from '../components/PlaceCard'
import Heading from '../components/Heading'

const Discovery: React.FC = () => {
    useNavigate({
        currentPage: PAGE.MY.DISCOVERY.ROOT,
        pageToNavigate: PAGE.MY.DISCOVERY.ROOT,
    })

    const { status, places } = useAppSelector(selectPlace)

    const forYou = places ? places.filter((place) => place.type === PlaceType.FOR_YOU) : []
    const hotPlaces = places ? places.filter((place) => place.type === PlaceType.HOT_PLACES) : []
    const featuredExperience = places
        ? places.filter((place) => place.type === PlaceType.FEATURED_EXPERIENCE)
        : []

    const renderData = [
        {
            title: 'For you',
            data: forYou,
            to: PAGE.MY.DISCOVERY.FOR_YOU,
        },
        {
            title: 'Hot places',
            data: hotPlaces,
            to: PAGE.MY.DISCOVERY.HOT_PLACES,
        },
        {
            title: 'Featured experience',
            data: featuredExperience,
            to: PAGE.MY.DISCOVERY.FEATURED_EXPERIENCE,
        },
    ]

    const RenderList = useCallback(({ places }: { places: Place[] }) => {
        return places.length > 0 ? (
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                style={{
                    marginBottom: 20,
                }}
            >
                {places.slice(0, 7).map((place) => (
                    <SwiperSlide
                        key={place._id}
                        onClick={() =>
                            router.push(PAGE.MY.DISCOVERY.DETAIL.replace(':id', place._id || ''))
                        }
                    >
                        <PlaceCard {...place} />
                    </SwiperSlide>
                ))}
            </Swiper>
        ) : (
            <p>No data</p>
        )
    }, [])

    const router = useIonRouter()

    return (
        <>
            <IonPage className="container">
                <IonContent fullscreen scrollY={false}>
                    <Heading header="Discovery" />
                    <div>
                        {renderData.map((item) => {
                            const { title, data, to } = item
                            return (
                                <div key={title}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: 10,
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {title}
                                        </h3>
                                        <button
                                            onClick={() => router.push(to)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 5,
                                            }}
                                        >
                                            <span>See all</span>
                                            <IonIcon icon={chevronForwardOutline} />
                                        </button>
                                    </div>
                                    <RenderList places={data} />
                                </div>
                            )
                        })}
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default Discovery
