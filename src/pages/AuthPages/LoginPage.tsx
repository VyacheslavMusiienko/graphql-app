import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import ErrorBoundary from '../../components/ErrorBoundary';

import Paths from '../../utils/enums';
import logo from '../../assets/png/logo.png';

import styles from './authPages.module.scss';

const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <Link to={Paths.Welcome} className={styles.no_decoration}>
        <div className={styles.logo_wrapper}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div>GraphiQL</div>
        </div>
      </Link>
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </div>
  );
};

export default LoginPage;
