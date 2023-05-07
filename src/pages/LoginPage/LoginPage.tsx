// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const formComponent = isLogin ? (
    <LoginForm toggleForm={(prevState: boolean) => setIsLogin(!prevState)} />
  ) : (
    <SignUpForm toggleForm={() => {}} />
  );

  return <div className={styles.wrapper}>{formComponent}</div>;
};
export default LoginPage;
