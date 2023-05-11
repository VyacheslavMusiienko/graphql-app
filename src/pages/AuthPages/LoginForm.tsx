import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { authSlice } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store';
import { auth } from '../../firebase';

import styles from './AuthPages.module.scss';
import Paths from '../../utils/enums';

/*
TODO:
- [x] Create error handling
*/

const LoginForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setUser(userCredential));
      })
      .catch(() => {});
  };

  return (
    <form onSubmit={signIn}>
      <div className={styles.wrapper__container}>
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
