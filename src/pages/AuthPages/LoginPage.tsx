import LoginForm from './LoginForm';

import styles from './authPages.module.scss';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

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
