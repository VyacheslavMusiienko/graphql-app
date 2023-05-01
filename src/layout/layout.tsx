import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

export default function layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
