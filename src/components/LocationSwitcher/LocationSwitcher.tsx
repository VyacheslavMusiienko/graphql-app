import { useTranslation } from 'react-i18next';

import { Button } from '../button';
import { Languages } from '../../utils/enums';

import styles from './LocationSwitcher.module.scss';

const LocationSwitcher = ({ isSticky }: { isSticky: boolean }) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = () => {
    const newLanguage = i18n.language === Languages.EN ? Languages.RU : Languages.EN;

    i18n.changeLanguage(newLanguage);
  };

  const setClassName = () => {
    const classNames = [styles.switcher];

    if (isSticky) {
      classNames.push(styles.switcher_sticky);
    }

    return classNames.join(' ');
  };

  return (
    <div className={styles.localization}>
      <Button className={setClassName()} onClick={changeLanguage}>
        {i18n.language === Languages.EN
          ? t('language', { context: 'ru' })
          : t('language', { context: 'en' })}
      </Button>
    </div>
  );
};
export default LocationSwitcher;
