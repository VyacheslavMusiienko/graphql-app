import LoginForm from './LoginForm';
import ErrorBoundary from '../../components/ErrorBoundary';

import styles from './authPages.module.scss';

const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </div>
  );
};

export default LoginPage;
