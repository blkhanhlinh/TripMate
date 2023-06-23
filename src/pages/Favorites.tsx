import { IonContent, IonIcon, IonPage, IonSearchbar } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import React, { useMemo } from 'react'
import { useHistory } from 'react-router'
import '../theme/styles.css'
import Searchbar from '../components/Searchbar'
import Phuket from '../assets/phuket.png'
import { useAppSelector } from '../store/hook'
import { selectFavorites } from '../store/features/favorites/selector'
import { Place } from '../model/Place'
import { PAGE } from '../constants/page'

const Favorites: React.FC = () => {
    const history = useHistory()

    const handleBack = () => {
        history.goBack()
    }

    const { favorites } = useAppSelector(selectFavorites)

    const [keyword, setKeyword] = React.useState('')

    const filterdFavorites = useMemo(
        () =>
            favorites?.filter((favorite) =>
                (favorite.place_id as Place)?.name.toLowerCase()?.includes(keyword.toLowerCase())
            ),
        [keyword, favorites]
    )

    return (
        <IonPage className="container">
            <IonContent>
                <div className="subheading">
                    <IonIcon icon={arrowBackOutline} size="large" onClick={handleBack} />
                    <h1>Favorite places</h1>
                </div>
                <IonSearchbar
                    className="margin-top"
                    onIonChange={(e) => {
                        setKeyword(e.target.value as string)
                    }}
                ></IonSearchbar>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginTop: '1rem',
                    }}
                >
                    {filterdFavorites &&
                        (filterdFavorites.length > 0 ? (
                            filterdFavorites.map((favorite) => {
                                const place = favorite.place_id as Place
                                return (
                                    <div
                                        className="places"
                                        key={favorite._id}
                                        onClick={() =>
                                            history.push(
                                                PAGE.MY.DISCOVERY.DETAIL.replace(
                                                    ':id',
                                                    place._id || ''
                                                )
                                            )
                                        }
                                    >
                                        <div className="place">
                                            <img src={place.image} alt="place" />
                                            <div className="place-info">
                                                <h2>{place.name}</h2>
                                                <p>
                                                    {place.description?.slice(0, 100).concat('...')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p>No data</p>
                        ))}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Favorites
