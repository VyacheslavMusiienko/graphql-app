import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Loader from '../../components/loader';
// import ErrorMessage from './ErrorMessage';

import { useAppDispatch, authSlice } from '../../store';
import { createUserWithEmailAndPasswordWithErrorHandling } from '../../firebase';

import Paths from '../../utils/enums';
import { validate, IErrors } from './utils/validate';

import styles from './authPages.module.scss';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errors, setErrors] = useState<null | IErrors>(null);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || Paths.Main;

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoaderActive(true);

    const validated = validate(email, password, displayName);

    if (validated === true) {
      setErrors(null);

      const { user, error } = await createUserWithEmailAndPasswordWithErrorHandling(
        email,
        password,
        displayName
      );

      if (user !== null) {
        setErrors(null);
        dispatch(setUser(user));
        navigate(from, { replace: true });
      } else {
        setErrors(error);
      }
    } else {
      setErrors(validated);
    }

    setIsLoaderActive(false);
  };

  return (
    <form onSubmit={signUp}>
      <div className={styles.wrapper__container}>
        <Loader active={isLoaderActive} />
        <input
          type="text"
          className={styles.wrapper__textBox}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder={t('placeholder', { context: 'fullName' }) as string | undefined}
        />
        {errors && errors.name && <span className={styles.error}>{t('name_signup_error')}</span>}
        <input
          type="text"
          className={styles.wrapper__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder', { context: 'email' }) as string | undefined}
        />
        {errors && errors.email && <span className={styles.error}>{t('email_signup_error')}</span>}
        <input
          type="password"
          className={styles.wrapper__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('placeholder', { context: 'password' }) as string | undefined}
        />
        {errors && errors.password && errors.password.length > 0 && (
          <ul className={[styles.error, styles.error_list].join(' ')}>
            <span>{`${t('placeholder_password')}:`}</span>
            {errors.password.map(({ message, id }) => {
              return <li key={id}>{message}</li>;
            })}
          </ul>
        )}
        {errors && errors.common && <span className={styles.error}>{errors.common}</span>}
        <button type="submit" className={styles.wrapper__btn}>
          {t('signup')}
        </button>
        <div className={styles.goLogin}>
          {t('signup', { context: 'account' })}
          <Link to={Paths.SignIn}> {t('to_signin')}</Link>
          {t('now')}.
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
