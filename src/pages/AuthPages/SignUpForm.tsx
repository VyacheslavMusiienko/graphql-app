import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { authSlice } from '../../store/reducers/authSlice';
import { auth } from '../../firebase';

import { useAppDispatch } from '../../hooks';
import styles from './AuthPages.module.scss';
import { Paths } from '../../utils/enums';

/*
TODO:
- [x] Create error handling
*/

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const { setLogin } = authSlice.actions;

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
        })
          .then(() => {
            dispatch(setLogin(res));
            // Profile updated!
            // ...
          })
          .catch(() => {
            // An error occurred
            // ...
          });
      }
    } catch (err) {
      setError(true);
    }

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     dispatch(setLogin(userCredential));
    //   })
    //   .catch(() => {});
  };

  return (
    <form onSubmit={signUp}>
      <div className={styles.wrapper__container}>
        <input
          type="text"
          className={styles.wrapper__textBox}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
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
        {error && <span>Something went wrong</span>}
        <div>
          Already have an account? <Link to={Paths.Login}>Login</Link> now.
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
