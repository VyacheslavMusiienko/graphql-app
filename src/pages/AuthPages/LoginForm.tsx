import { useState, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import Loader from '../../components/loader';

import { authSlice } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store';
import { auth } from '../../firebase';

import styles from './authPages.module.scss';
import Paths from '../../utils/enums';

/*
TODO:
- [x] Create error handling
*/

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || Paths.Main;

  const errorCodes: Record<string, string> = {
    'auth/invalid-email': 'The email address is not valid',
    'auth/user-not-found': 'There is no user with such email',
    'auth/wrong-password': 'The password is invalid for the given email',
    'auth/user-disabled': 'The user corresponding to the given email has been disabled',
    'auth/too-many-requests': 'Too many requests. Try again later',
  };

  const signInWithEmailAndPasswordWithErrorHandling = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoaderActive(true);

    const { user, error } = await signInWithEmailAndPasswordWithErrorHandling();

    if (user !== null) {
      dispatch(setUser(user));
      navigate(from, { replace: true });
      setErrorMessage(null);
    } else {
      const firebaseError = error as FirebaseError;
      setErrorMessage(errorCodes[firebaseError.code]);
    }

    setIsLoaderActive(false);
  };

  return (
    <form onSubmit={signIn}>
      <div className={styles.wrapper__container}>
        <Loader active={isLoaderActive} />
        <input
          type="text"
          className={styles.wrapper__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          className={styles.wrapper__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        <button type="submit" className={styles.wrapper__btn}>
          Log In
        </button>
        <div>
          Don&apos;t have an account? <Link to={Paths.SignUp}>Register</Link> now.
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
