import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { authSlice } from '../store/reducers/authSlice';
import { useAppDispatch } from '../store';
import { auth } from '../firebase';
import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from './layout.module.scss';

const Layout = () => {
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
