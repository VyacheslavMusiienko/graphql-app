import { useTranslation } from 'react-i18next';
import styles from './LocationSwitcher.module.scss';

const LocationSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <div className={styles.localization}>
        <button type="button" onClick={() => changeLanguage('en')}>
          EN
        </button>
        <button type="button" onClick={() => changeLanguage('ru')}>
          RU
        </button>
      </div>
      <div className={styles.test}>{t('text')}</div>
    </>
  );
};
export default LocationSwitcher;
