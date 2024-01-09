// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import enTranslations from '../translations/Pixel/en';
import chTranslations from '../translations/Pixel/ch';
import arTranslations from '../translations/Pixel/ar';
import urTranslations from '../translations/Pixel/ur';
let selected_lang = localStorage.getItem('selected_lang') ?? 'en';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      // Add your translation resources here
      en: { translation: enTranslations },
      ur: { translation: urTranslations },
      ch: { translation: chTranslations },
      ar: { translation: arTranslations },

    },
    lng: 'ar', // Default language
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
