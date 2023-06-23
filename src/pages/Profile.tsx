import React from 'react'
import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
// temp
import Avatar from '../assets/avatar.jpg'
import '../theme/styles.css'
import {
    camera,
    cameraOutline,
    chevronForwardOutline,
    heartSharp,
    logOutOutline,
    settingsSharp,
} from 'ionicons/icons'
import { useHistory } from 'react-router'
import Heading from '../components/Heading'
import { PAGE } from '../constants/page'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { selectUser } from '../store/features/user/selector'
import { logOut } from '../store/features/user'
import useCamera from '../hooks/useCamera'
import { imageUpload } from '../utils/image'
import { changeUserAvatarThunk } from '../store/features/user/thunk'

const Profile: React.FC = () => {
    const history = useHistory()
    const handleSettings = () => {
        history.push(PAGE.MY.PROFILE.SETTINGS)
    }

    const handleFavorite = () => {
        history.push(PAGE.MY.PROFILE.FAVORITES)
    }

    const { user } = useAppSelector(selectUser)

    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logOut())
        history.replace(PAGE.LOGIN)
    }

    const { takePicture } = useCamera()
    const handleChangeAvatar = async () => {
        const image = await takePicture()
        if (image) {
            // console.log({image})
            const imageFile = await fetch(image.webPath!)
            const imageBlob = await imageFile.blob()
            try {
                const imageUploaded = await imageUpload(imageBlob)
                if (imageUploaded) {
                    const res = await dispatch(
                        changeUserAvatarThunk({
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

    return (
        <IonPage className="container">
            <IonContent>
                <Heading header="Profile" />
                <div className="info">
                    <div
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <img src={user?.image || Avatar} alt="avatar" className="avatar" />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'blue',
                                fontWeight: 'bold',
                                paddingTop: 10,
                            }}
                            onClick={handleChangeAvatar}
                        >
                            Change avatar
                        </div>
                    </div>
                    <p className="name">{user?.full_name}</p>
                </div>
                <div className="features">
                    <button className="feature" onClick={handleFavorite}>
                        <div className="flex-row">
                            <IonIcon icon={heartSharp} className="custom-icon" />
                            <p>Favorite places</p>
                        </div>
                        <IonIcon icon={chevronForwardOutline} className="custom-icon" />
                    </button>
                    <button className="feature" onClick={handleSettings}>
                        <div className="flex-row">
                            <IonIcon icon={settingsSharp} className="custom-icon" />
                            <p>Settings</p>
                        </div>
                        <IonIcon icon={chevronForwardOutline} className="custom-icon" />
                    </button>
                </div>
                <div>
                    <button className="logout" onClick={handleLogout}>
                        <p>Log out</p>
                        <IonIcon icon={logOutOutline} className="custom-icon" />
                    </button>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Profile
