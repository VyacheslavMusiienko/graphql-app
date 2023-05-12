import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useTranslation } from 'react-i18next';
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
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoaderActive(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setUser(userCredential));
      })
      .catch(() => {});

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
          placeholder={t('placeholder', { context: 'email' }) as string | undefined}
        />
        <input
          type="password"
          className={styles.wrapper__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('placeholder', { context: 'password' }) as string | undefined}
        />
        <button type="submit" className={styles.wrapper__btn}>
          {t('login')}
        </button>
        <div>
          {t('login', { context: 'account' })}
          <Link to={Paths.SignUp}>{t('register')}</Link>
          {t('now')}.
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
