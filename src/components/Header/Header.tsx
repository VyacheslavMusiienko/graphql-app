import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import { LogOutButton } from '../buttons';

import { IsSticky } from '../../utils/interfaces';
import Paths from '../../utils/enums';

import styles from './Header.module.scss';

const Header = forwardRef<HTMLElement, IsSticky>(({ isSticky }, ref) => {
  return (
    <header
      className={isSticky ? [styles.header, styles.header_sticky].join(' ') : styles.header}
      ref={ref}
    >
      <Link to={Paths.Main} className={styles.title}>
        <h1>GraphQL</h1>
      </Link>
      <Navigation isSticky={isSticky} />
      <LogOutButton isSticky={isSticky} />
    </header>
  );
});

export default Header;
