import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import LocationSwitcher from '../LocationSwitcher/LocationSwitcher';

const Header = () => {
  return (
    <header>
      <nav>
        <ul className={styles.row}>
          <li className={styles.row_item}>
            <NavLink to="/">Main</NavLink>
          </li>
          <li className={styles.row_item}>
            <NavLink to="/form">Form</NavLink>
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
