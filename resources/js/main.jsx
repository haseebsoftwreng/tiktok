import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider, Page } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from './Pixel/i18n.js';




ReactDOM.createRoot(document.getElementById('root')).render(
  
  <AppProvider i18n={i18n}>
    <Page>
    <App />
    <ToastContainer/>
    </Page>
  </AppProvider>
)