/* eslint-disable @typescript-eslint/no-extra-semi */
import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import NavTabs from '../components/NavTabs'
import NotFoundPage from '../pages/NotFoundPage'
import { PAGE } from '../constants/page'
import Token from '../utils/token'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { getAllPlacesThunk } from '../store/features/place/thunk'
import { getUserFavoritesThunk } from '../store/features/favorites/thunk'
import { getUserTripsThunk } from '../store/features/trip/thunk'
import { selectUser } from '../store/features/user/selector'
import { AuthState } from '../model/User'
import { getCurrentUserThunk } from '../store/features/user/thunk'
import FeaturedExperience from '../containers/FeaturedExperience'

const MainRouter = () => {
    const dispatch = useAppDispatch()
    const { authState, user } = useAppSelector(selectUser)
    useEffect(() => {
        ;(async function () {
            const token = await Token.getToken()
            if (token) {
                if (authState !== AuthState.AUTHORIZED) {
                    dispatch(getCurrentUserThunk())
                }
                if (authState === AuthState.AUTHORIZED) {
                    Promise.all([
                        dispatch(getAllPlacesThunk()),
                        dispatch(getUserFavoritesThunk()),
                        dispatch(getUserTripsThunk()),
                    ])
                }
            }
        })()
    }, [authState, user])
    return (
        <IonApp>
            <IonReactRouter>
                <Switch>
                    <Route exact path={PAGE.LOGIN}>
                        <Login />
                    </Route>
                    <Route exact path={PAGE.SIGNUP}>
                        <Signup />
                    </Route>

                    <Route exact path={PAGE.MY.DISCOVERY.FEATURED_EXPERIENCE}>
                        <FeaturedExperience />
                    </Route>
                    <Route path={PAGE.MY.ROOT}>
                        <NavTabs />
                    </Route>
                    <Route exact path={PAGE.HOME}>
                        <Redirect to={PAGE.LOGIN} />
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </IonReactRouter>
        </IonApp>
    )
}

export default MainRouter
