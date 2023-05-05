import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import styles from './layout.module.scss';
import { useAppSelector } from '../hooks';
import { Paths } from '../utils/enums';

const Layout = () => {
  const { isLoggedIn } = useAppSelector((state) => state.mainPageReducer);
  if (isLoggedIn) {
    return (
      <div className={styles.wrapper}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
  return <Navigate to={Paths.Form} />;
};

export default Layout;
