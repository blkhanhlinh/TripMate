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

const MainRouter = () => {
    const dispatch = useAppDispatch()
    const { authState, user } = useAppSelector(selectUser)
    useEffect(() => {
        ;(async function () {
            if (authState === AuthState.AUTHORIZED) {
                const token = await Token.getToken()
                if (token) {
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
