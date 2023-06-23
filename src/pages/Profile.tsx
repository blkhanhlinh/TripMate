import React from 'react';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
// temp
import Avatar from "../assets/avatar.jpg"
import '../theme/styles.css';
import { chevronForwardOutline, heartSharp, logOutOutline, settingsSharp } from 'ionicons/icons';
import { useHistory } from 'react-router';
import Heading from '../components/Heading';

const Profile: React.FC = () => {
  const history = useHistory();
  const handleSettings = () => {
    history.push('/my/profile/settings');
  }

  const handleFavorite = () => {
    history.push('/my/profile/favorites');
  }
  return (
    <IonPage className='container'>
      <IonContent>
        <Heading header="Profile" />
        <div className='info'>
          <img src={Avatar} alt='avatar' className='avatar'/>
          <p className='name'>Billie Eilish</p>
        </div>
        <div className='features'>
          <button className='feature' onClick={handleFavorite}>
            <div className='flex-row'>
              <IonIcon icon={heartSharp} className='custom-icon'/>
              <p>Favorite places</p>
            </div>
            <IonIcon icon={chevronForwardOutline} className='custom-icon'/>
          </button>
          <button className='feature' onClick={handleSettings}>
            <div className='flex-row'>
              <IonIcon icon={settingsSharp} className='custom-icon'/>
              <p>Settings</p>
            </div>
            <IonIcon icon={chevronForwardOutline} className='custom-icon'/>
          </button>
        </div>
        <div>
          <button className='logout'>
            <p>Log out</p>
            <IonIcon icon={logOutOutline} className='custom-icon'/>
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
