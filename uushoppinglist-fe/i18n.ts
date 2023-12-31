import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './src/assets/translations/en.json';
import cs from './src/assets/translations/cs.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      cs: { translation: cs },
    },
    fallbackLng: 'en',
    debug: true,
  });

export default i18n;
