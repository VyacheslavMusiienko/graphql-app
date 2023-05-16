import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import AuthStatus from '../authStatus';
import { LogoutButton } from '../button';

import Paths from '../../utils/enums';

import styles from './header.module.scss';

const Header = forwardRef<HTMLElement, { isSticky: boolean }>(({ isSticky }, ref) => {
  return (
    <header
      className={isSticky ? [styles.header, styles.header_sticky].join(' ') : styles.header}
      ref={ref}
    >
      <Link to={Paths.Main} className={styles.title}>
        <h1>GraphQL</h1>
      </Link>
      <Navigation isSticky={isSticky} />
      <AuthStatus />
      <LogoutButton isSticky={isSticky} />
    </header>
  );
});

export default Header;
