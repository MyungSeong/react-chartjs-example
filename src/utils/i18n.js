import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {},
    },
    jp: {
        translation: {},
    },
    kr: {
        translation: {},
    },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: 'kr',
        debug: true,
        interpolation: { escapeValue: true },
        returnObjects: true,
        returnEmptyString: true,
        returnNull: true,
    });

export default i18n;
