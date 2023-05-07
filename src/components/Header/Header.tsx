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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
