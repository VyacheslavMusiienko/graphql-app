import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

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
          <li className={styles.row_item}>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className={styles.row_item}>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li className={styles.row_item}>
            <NavLink to="/reset">Reset</NavLink>
          </li>
          <li className={styles.row_item}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
