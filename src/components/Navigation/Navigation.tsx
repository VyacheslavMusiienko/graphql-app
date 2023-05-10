import { NavLink } from 'react-router-dom';

import Paths from '../../utils/enums';

import styles from './Navigation.module.scss';

const Navigation = ({ isSticky }: { isSticky: boolean }) => (
  <nav className={styles.navigation}>
    <ul className={isSticky ? styles.navigation__list_sticky : styles.navigation__list}>
      <li className={styles.navigation__item}>
        <NavLink
          to={Paths.Main}
          className={({ isActive }) =>
            isActive ? styles.navigation__link_active : styles.navigation__link
          }
        >
          Home
        </NavLink>
      </li>
      <li className={styles.navigation__item}>
        <NavLink
          to={Paths.Welcome}
          className={({ isActive }) =>
            isActive ? styles.navigation__link_active : styles.navigation__link
          }
        >
          Welcome page
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
