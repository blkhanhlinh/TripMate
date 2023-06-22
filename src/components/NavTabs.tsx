import React from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { compassOutline, personOutline, readerOutline } from 'ionicons/icons';
import { Route } from 'react-router';
import Discovery from '../pages/Discovery';
import Trips from '../pages/Trips';
import Profile from '../pages/Profile';
import AddTrip from '../pages/AddTrip';

const NavTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/discovery">
          <Discovery />
        </Route>
        <Route exact path="/my/trips">
          <Trips />
        </Route>
        <Route exact path="/my/profile">
          <Profile />
        </Route>
        <Route exact path="/my/trips/add">
          <AddTrip />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="discovery" href="/my/discovery">
          <IonIcon aria-hidden="true" icon={compassOutline} />
          <IonLabel>Discovery</IonLabel>
        </IonTabButton>
        <IonTabButton tab="trips" href="/my/trips">
          <IonIcon aria-hidden="true" icon={readerOutline} />
          <IonLabel>Trips</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/my/profile">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default NavTabs;