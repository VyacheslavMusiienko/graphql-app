import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Loader from '../../components/loader';

import Paths from '../../utils/enums';
import { useAppDispatch, authSlice } from '../../store';
import { signInWithEmailAndPasswordWithErrorHandling } from '../../firebase';

import styles from './authPages.module.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || Paths.Main;

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoaderActive(true);

    const { user, error } = await signInWithEmailAndPasswordWithErrorHandling(email, password);

    if (user !== null) {
      dispatch(setUser(user));
      navigate(from, { replace: true });
      setErrorMessage(null);
    } else {
      setErrorMessage(error);
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
          placeholder={t('placeholder', { context: 'email' }) as string | undefined}
        />
        <input
          type="password"
          className={styles.wrapper__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('placeholder', { context: 'password' }) as string | undefined}
        />
        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        <button type="submit" className={styles.wrapper__btn}>
          {t('signin')}
        </button>
        <div>
          {t('login_account')}
          <Link to={Paths.SignUp}>{t('to_signup')}</Link>
          {t('now')}.
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
