import { RefObject, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from './layout.module.scss';

const Layout = () => {
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
    <div className={styles.wrapper}>
      <Header ref={headerRef} isSticky={sticky.isSticky} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
