import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { Paths } from '../../utils/enums';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation_list}>
        <li className={styles.row_item}>
          <NavLink to={Paths.Main}>Home</NavLink>
        </li>
        <li className={styles.row_item}>
          <NavLink to={Paths.GraphQL}>GraphQl App</NavLink>
        </li>
        <li className={styles.row_item}>
          <NavLink to={Paths.Form}>Signup/Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
