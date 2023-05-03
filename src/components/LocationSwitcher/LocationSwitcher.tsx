import { useTranslation } from 'react-i18next';
import styles from './LocationSwitcher.module.scss';

const LocationSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={styles.localization}>
      <button className={styles.switcher} type="button" onClick={() => changeLanguage('en')}>
        EN
      </button>
      <button className={styles.switcher} type="button" onClick={() => changeLanguage('ru')}>
        RU
      </button>
    </div>
  );
};
export default LocationSwitcher;
