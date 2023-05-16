import { useTranslation } from 'react-i18next';

import { Button } from '../button';
import { Languages } from '../../utils/enums';

import styles from './LocationSwitcher.module.scss';

const LocationSwitcher = ({ isSticky }: { isSticky: boolean }) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const setClassName = (_isSticky: boolean, language: Languages) => {
    const classNames = [styles.switcher];
    if (isSticky) classNames.push(styles.switcher_sticky);
    if (i18n.language === language) classNames.push(styles.switcher_active);
    return classNames.join(' ');
  };

  return (
    <div className={styles.localization}>
      <Button className={setClassName(isSticky, Languages.EN)} onClick={() => changeLanguage('en')}>
        {t('language', { context: 'en' })}
      </Button>
      <Button className={setClassName(isSticky, Languages.RU)} onClick={() => changeLanguage('ru')}>
        {t('language', { context: 'ru' })}
      </Button>
    </div>
  );
};
export default LocationSwitcher;
