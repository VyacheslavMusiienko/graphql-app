/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, FormEvent } from 'react';
import { auth, signInWithEmailAndPassword } from '../../firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';

import styles from './LoginPage.module.scss';

interface LoginFormProps {
  toggleForm: (value: boolean) => void;
}

const LoginForm = ({ toggleForm }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('sign in', email, password, auth);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        console.log(err);
      });
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
          Don&apos;t have an account?{' '}
          <span onClick={toggleForm} role="button" tabIndex={0}>
            Register
          </span>{' '}
          now.
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
