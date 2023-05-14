import { useState, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || Paths.Main;

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoaderActive(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser(user));

        navigate(from, { replace: true });
      })
      .catch(() => {
        setIsError(true);
      });

    setIsError(false);
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
        {isError && <span className={styles.error}>Incorrect email or password</span>}
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
