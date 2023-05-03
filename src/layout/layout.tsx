import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import styles from './layout.module.scss';

export default function layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
