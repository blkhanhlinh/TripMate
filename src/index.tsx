import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { store } from './store'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()
defineCustomElements(window)
