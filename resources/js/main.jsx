import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider, Page } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider i18n={enTranslations}>
    <Page>
    <App />
    </Page>
  </AppProvider>
)