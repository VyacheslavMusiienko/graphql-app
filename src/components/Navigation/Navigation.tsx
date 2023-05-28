import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Paths from '../../utils/enums';

import styles from './navigation.module.scss';

const Navigation = ({ isSticky }: { isSticky: boolean }) => {
  const { t } = useTranslation();
  return (
    <nav className={styles.navigation}>
      <ul className={isSticky ? styles.navigation__list_sticky : styles.navigation__list}>
        <li className={styles.navigation__item}>
          <NavLink to={Paths.Main} className={[styles.navigation__link, styles.active].join(' ')}>
            {t('navigation', { context: 'home' })}
          </NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink to={Paths.Welcome} className={styles.navigation__link}>
            {t('navigation', { context: 'welcome' })}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
