import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import SignUpForm from './SignUpForm';

import { useAppDispatch, authSlice } from '../../store';
import { auth } from '../../firebase';

import styles from './AuthPages.module.scss';

const SignUpPage = () => {
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
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
