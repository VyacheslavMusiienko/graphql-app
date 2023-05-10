import LoginForm from './LoginForm';

import styles from './AuthPages.module.scss';

const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
