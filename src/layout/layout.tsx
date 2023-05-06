import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import styles from './layout.module.scss';
import { useAppSelector } from '../hooks';
import { Paths } from '../utils/enums';

const Layout = () => {
  const { isLoggedIn } = useAppSelector((state) => state.mainPageReducer);
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef: RefObject<HTMLElement> = useRef(null);

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
      if (header) handleScroll(header.top, header.height);
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);
  if (isLoggedIn) {
    return (
      <div className={styles.wrapper}>
        <Header ref={headerRef} isSticky={sticky.isSticky} />
        <Outlet />
        <Footer />
      </div>
    );
  }
  return <Navigate to={Paths.Form} />;
};

export default Layout;
