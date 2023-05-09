import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import LoginForm from './LoginForm';

import styles from './AuthPages.module.scss';

const LoginPage = () => {
  // const { auth } = useAppSelector((state) => state.mainPageReducer);
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
