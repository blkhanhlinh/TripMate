import React from 'react'
import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import '../theme/styles.css'
import Heading from '../components/Heading'
import { addOutline } from 'ionicons/icons'
import useNavigate from '../hooks/useNavigate'
import { PAGE } from '../constants/page'
import { useAppSelector } from '../store/hook'
import { selectTrips } from '../store/features/trip/selector'
import moment from 'moment'
import { Swiper, SwiperSlide } from 'swiper/react'
import TripCard from '../components/TripCard'

const Trips: React.FC = () => {
    useNavigate({
        currentPage: PAGE.MY.TRIPS.ROOT,
        pageToNavigate: PAGE.MY.TRIPS.ROOT,
    })
    const router = useIonRouter()

    const { status, trips } = useAppSelector(selectTrips)
    const onGoingTrips = trips
        ? trips.filter((trip) => {
              return (
                  moment(trip.start_at).isBefore(moment()) && moment(trip.end_at).isAfter(moment())
              )
          })
        : []
    const pastTrips = trips ? trips.filter((trip) => moment(trip.end_at).isBefore(moment())) : []
    return (
        <IonPage className="container">
            <Heading header="My Trips" />
            <IonContent>
                <div className="ongoing-trip">
                    <h2>Ongoing trip</h2>
                    <div>
                        <Swiper slidesPerView={1}>
                            {onGoingTrips.length > 0 ? (
                                onGoingTrips.map((trip) => {
                                    return (
                                        <SwiperSlide key={trip._id}>
                                            <TripCard trip={trip} />
                                        </SwiperSlide>
                                    )
                                })
                            ) : (
                                <p>No data</p>
                            )}
                        </Swiper>
                    </div>
                </div>
                <div className="past-trips">
                    <h2>Past trips</h2>
                    <div className="past-trips-items">
                        {pastTrips.length > 0 ? (
                            pastTrips.map((trip) => {
                                return (
                                    <TripCard
                                        trip={trip}
                                        titleStyle={{
                                            fontSize: 16,
                                        }}
                                        key={trip._id}
                                    />
                                )
                            })
                        ) : (
                            <p>No data</p>
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Trips
