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
import { useAppDispatch } from '../store/hook'
import { getAllPlacesThunk } from '../store/features/place/thunk'
import { getUserFavoritesThunk } from '../store/features/favorites/thunk'
import { getUserTripsThunk } from '../store/features/trip/thunk'

const MainRouter = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        ;(async function () {
            const token = await Token.getToken()
            console.log({ token })
            if (token) {
                Promise.all([
                    dispatch(getAllPlacesThunk()),
                    dispatch(getUserFavoritesThunk()),
                    dispatch(getUserTripsThunk()),
                ])
            }
        })()
    }, [])
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
