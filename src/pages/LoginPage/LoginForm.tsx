import { useState, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { mainPageSlice } from '../../store/reducers/mainPageSlice';

import { auth, signInWithEmailAndPassword } from '../../firebase';

import styles from './LoginPage.module.scss';

/*
TODO:
- [x] Create error handling
*/

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { setLogin } = mainPageSlice.actions;

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setLogin(userCredential));
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
          placeholder="E-mail Address"
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
          Don&apos;t have an account? <span>Register</span> now.
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
