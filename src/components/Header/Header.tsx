import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';
import AuthStatus from '../authStatus';
import { LogoutButton } from '../button';
import LocationSwitcher from '../LocationSwitcher';

import Paths from '../../utils/enums';

import logo from '../../assets/png/logo.png';
import styles from './Header.module.scss';

const Header = forwardRef<HTMLElement, { isSticky: boolean }>(({ isSticky }, ref) => {
  return (
    <header
      className={isSticky ? [styles.header, styles.header_sticky].join(' ') : styles.header}
      ref={ref}
    >
      <Link to={Paths.Welcome} className={styles.link}>
        <div className={styles.title}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.text}>GraphiQL</div>
        </div>
      </Link>
      <Navigation isSticky={isSticky} />
      <div className={styles.corner}>
        <AuthStatus />
        <LocationSwitcher isSticky={isSticky} />
        <LogoutButton isSticky={isSticky} />
      </div>
    </header>
  );
});

export default Header;
