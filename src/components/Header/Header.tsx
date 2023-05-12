import { RefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import { LogoutButton, LoginButton, SignUpButton } from '../button';

import Paths from '../../utils/enums';
import useAuth from '../../hooks/useAuth';

import LocationSwitcher from '../LocationSwitcher/LocationSwitcher';
import logo from '../../assets/png/logo.png';
import styles from './Header.module.scss';

const Header = () => {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef: RefObject<HTMLElement> = useRef(null);
  const { user } = useAuth();

  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.scrollY > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  useEffect(() => {
    const header = headerRef.current?.getBoundingClientRect();

    const handleScrollEvent = () => {
      if (header) {
        handleScroll(header.top, header.height);
      }
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <header
      className={sticky ? [styles.header, styles.header_sticky].join(' ') : styles.header}
      ref={headerRef}
    >
      <Link to={Paths.Main} className={styles.title}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h1 className={styles.text}>GraphQL</h1>
      </Link>
      <Navigation isSticky={!sticky.isSticky} />
      <LocationSwitcher isSticky={!sticky.isSticky} />
      {user ? (
        <LogoutButton isSticky={!sticky.isSticky} />
      ) : (
        <>
          <LoginButton isSticky={!sticky.isSticky} />
          /
          <SignUpButton isSticky={!sticky.isSticky} />
        </>
      )}
    </header>
  );
};

export default Header;
