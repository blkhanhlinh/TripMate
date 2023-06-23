import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';
import './theme/global.css';

import Login from './pages/Login';
import Signup from './pages/Signup';

import { useAppDispatch } from './store/hook';
import { getAllPlacesThunk } from './store/features/place/thunk';
import Loading from './components/Loading';
import NavTabs from './components/NavTabs';
import NotFoundPage from './pages/NotFoundPage';

setupIonicReact()

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    dispatch(getAllPlacesThunk()).then((res) => {
      console.log(res);
    });

    // Simulating authentication check
    setTimeout(() => {
      setIsCheckingAuth(false);
    }, 2000);
  }, [dispatch]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isCheckingAuth) {
    return <Loading />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route exact path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/my">
            <NavTabs />
          </Route>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/my/discovery" /> : <Redirect to="/login" />}
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
