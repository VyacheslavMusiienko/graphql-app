import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import styles from './Header.module.scss';
import Navigation from '../Navigation/Navigation';
import { Paths } from '../../utils/enums';
import LogOutButton from '../buttons/LogOutButton/LogOutButton';
import { IsSticky } from '../../utils/interfaces';

const Header = forwardRef<HTMLElement, IsSticky>(({ isSticky }, ref) => {
  return (
<<<<<<< HEAD
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
=======
    <header
      className={isSticky ? [styles.header, styles.header_sticky].join(' ') : styles.header}
      ref={ref}
    >
      <Link to={Paths.Main} className={styles.title}>
        <h1>GraphQL</h1>
      </Link>
      <Navigation isSticky={isSticky} />
      <LogOutButton isSticky={isSticky} />
>>>>>>> development
    </header>
  );
});

export default Header;
