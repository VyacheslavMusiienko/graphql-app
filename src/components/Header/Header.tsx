import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { Paths } from '../../utils/enums';
export default function Header() {
  return (
    <header>
      <nav>
        <ul className={styles.row}>
          <li className={styles.row_item}>
            <NavLink to={Paths.Main}>Main</NavLink>
          </li>
          <li className={styles.row_item}>
            <NavLink to={Paths.Form}>Form</NavLink>
          </li>
          <li className={styles.row_item}>
            <NavLink to={Paths.GraphQL}>GraphQl</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
