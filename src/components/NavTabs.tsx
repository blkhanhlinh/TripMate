import React from 'react'
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { compassOutline, personOutline, readerOutline } from 'ionicons/icons'
import { Route } from 'react-router'
import Discovery from '../pages/Discovery'
import Trips from '../pages/Trips'
import Profile from '../pages/Profile'
import AddTrip from '../pages/AddTrip'
import TripInfo from '../pages/TripInfo'
import TripDetails from '../pages/TripDetails'
import { PAGE } from '../constants/page'
import Favorites from '../pages/Favorites'
import Settings from '../pages/Settings'
import ForYou from '../containers/ForYou'
import HotPlaces from '../containers/HotPlaces'
import FeaturedExperience from '../containers/FeaturedExperience'
import PlaceDetails from '../pages/PlaceDetails'
import Notifications from '../pages/Notifications'

const NavTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path={PAGE.MY.DISCOVERY.ROOT}>
                    <Discovery />
                </Route>
                <Route exact path={PAGE.MY.TRIPS.ROOT}>
                    <Trips />
                </Route>
                <Route exact path={PAGE.MY.PROFILE.ROOT}>
                    <Profile />
                </Route>
                <Route exact path={PAGE.MY.DISCOVERY.DETAIL}>
                    <PlaceDetails />
                </Route>
                <Route exact path={PAGE.MY.DISCOVERY.FOR_YOU}>
                    <ForYou />
                </Route>
                <Route exact path={PAGE.MY.DISCOVERY.HOT_PLACES}>
                    <HotPlaces />
                </Route>
                <Route exact path={PAGE.MY.DISCOVERY.FEATURED_EXPERIENCE}>
                    <FeaturedExperience />
                </Route>

                <Route exact path={PAGE.MY.TRIPS.INFO.ROOT}>
                    <TripInfo />
                </Route>
                <Route exact path={PAGE.MY.TRIPS.INFO.DETAILS}>
                    <TripDetails />
                </Route>
                <Route exact path={PAGE.MY.TRIPS.ADD}>
                    <AddTrip />
                </Route>
                <Route exact path={PAGE.MY.PROFILE.FAVORITES}>
                    <Favorites />
                </Route>
                <Route exact path={PAGE.MY.PROFILE.SETTINGS}>
                    <Settings />
                </Route>
                <Route exact path={PAGE.MY.NOTIFICATIONS.ROOT}>
                    <Notifications />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="discovery" href={PAGE.MY.DISCOVERY.ROOT}>
                    <IonIcon aria-hidden="true" icon={compassOutline} />
                    <IonLabel>Discovery</IonLabel>
                </IonTabButton>
                <IonTabButton tab="trips" href={PAGE.MY.TRIPS.ROOT}>
                    <IonIcon aria-hidden="true" icon={readerOutline} />
                    <IonLabel>Trips</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href={PAGE.MY.PROFILE.ROOT}>
                    <IonIcon aria-hidden="true" icon={personOutline} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default NavTabs
