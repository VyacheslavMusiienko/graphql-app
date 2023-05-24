import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';
import Loader from '../../components/loader';

import Paths, { ErrorTypes, SignInInputNames } from '../../utils/enums';
import { useAppDispatch, authSlice } from '../../store';
import { signInWithEmailAndPasswordWithErrorHandling } from '../../firebase';

import styles from './authPages.module.scss';
import { SignInInputs } from '../../utils/interfaces';
import Input from '../../components/Input/Input';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { giveSignInInputOptions } from '../../utils/functions';

const LoginForm = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [serverError, setServerError] = useState<null | string>(null);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInInputs>();

  const inputOptions = giveSignInInputOptions(t);

  const emailInput = register(SignInInputNames.Email, inputOptions.email);
  const passwordInput = register(SignInInputNames.Password, inputOptions.password);

  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || Paths.Main;

  const signIn: SubmitHandler<SignInInputs> = async (data) => {
    const { email, password } = data;
    setIsLoaderActive(true);

    const { user, error } = await signInWithEmailAndPasswordWithErrorHandling(email, password);

    if (user !== null) {
      dispatch(setUser(user));
      navigate(from, { replace: true });
      reset();
      setServerError(null);
    } else {
      setServerError(error);
    }
    setIsLoaderActive(false);
  };

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <div className={styles.wrapper__container}>
        <Loader active={isLoaderActive} />
        <Input
          type="text"
          className={styles.wrapper__textBox}
          placeholder={t('placeholder', { context: 'email' }) as string | undefined}
          props={emailInput}
          ref={emailInput.ref}
        />
        {errors.email && errors.email.type === ErrorTypes.Required && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        {errors.email && errors.email.type === ErrorTypes.Pattern && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        <Input
          type="password"
          className={styles.wrapper__textBox}
          placeholder={t('placeholder', { context: 'password' }) as string | undefined}
          props={passwordInput}
          ref={passwordInput.ref}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
        <button type="submit" className={styles.wrapper__btn}>
          {t('signin')}
        </button>
        <div className={styles.goRegister}>
          {t('login_account')}
          <Link to={Paths.SignUp}>{t('to_signup')}</Link>
          {t('now')}.
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
