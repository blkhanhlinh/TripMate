/* eslint-disable @typescript-eslint/no-extra-semi */
import { setupIonicReact } from '@ionic/react'
import React from 'react'

import '@ionic/react/css/core.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/typography.css'

import './theme/global.css'
import './theme/variables.css'

import { Provider } from 'react-redux'
import MainRouter from './router/main-router'
import { store } from './store'

setupIonicReact()

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <MainRouter />
        </Provider>
    )
}

export default App
