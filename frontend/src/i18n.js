import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ICU from 'i18next-icu';
import ru from './locales/ru';

i18n
  .use(initReactI18next)
  .use(ICU)
  .init({
    lng: 'ru',
    debug: true,
    fallbacklng: 'ru',
    resources: {
      ru,
    },
  });

export default i18n;
