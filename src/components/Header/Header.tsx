import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LocationSwitcher from '../LocationSwitcher/LocationSwitcher';
import styles from './Header.module.scss';

const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <nav>
        <ul className={styles.row}>
          <li className={styles.row_item}>
            <NavLink to="/">{t('navigateMain')}</NavLink>
          </li>
          <li className={styles.row_item}>
            <NavLink to="/form">{t('navigateForm')}</NavLink>
          </li>
          <li className={styles.row_item}>
            <NavLink to="/graphql">GraphQl</NavLink>
          </li>
        </ul>
      </nav>
      <LocationSwitcher />
    </header>
  );
};

export default Header;
