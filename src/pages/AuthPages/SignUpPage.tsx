import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import SignUpForm from './SignUpForm';

import styles from './AuthPages.module.scss';

const SignUpPage = () => {
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
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
