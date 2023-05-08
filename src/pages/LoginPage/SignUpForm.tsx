import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { useAppDispatch } from '../../hooks';
import { mainPageSlice } from '../../store/reducers/mainPageSlice';
import { auth } from '../../firebase';

import styles from './LoginPage.module.scss';

/*
TODO:
- [x] Create error handling
*/

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const { setLogin } = mainPageSlice.actions;

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setLogin(userCredential));
      })
      .catch(() => {});
  };

  return (
    <form onSubmit={signUp}>
      <div className={styles.wrapper__container}>
        <input
          type="text"
          className={styles.wrapper__textBox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
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
          Register
        </button>
        <div>
          Already have an account? <span>Login</span> now.
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
