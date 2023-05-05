import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { Paths } from '../../utils/enums';
import { IsSticky } from '../../utils/interfaces';

const Navigation = ({ isSticky }: IsSticky) => (
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
          to={Paths.GraphQL}
          className={({ isActive }) =>
            isActive ? styles.navigation__link_active : styles.navigation__link
          }
        >
          GraphQl App
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
