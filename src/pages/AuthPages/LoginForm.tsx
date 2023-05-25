import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Loader from '../../components/loader';
import Input from '../../components/Input/Input';
import ErrorMessage from '../../components/ErrorMessage';

import { useAppDispatch, authSlice } from '../../store';
import { giveSignInInputOptions, translate } from '../../utils/functions';
import { signInWithEmailAndPasswordWithErrorHandling } from '../../firebase';

import { SignInInputs } from '../../utils/interfaces';
import Paths, { ErrorTypes, SignInInputNames } from '../../utils/enums';

import styles from './authPages.module.scss';

const LoginForm = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [serverError, setServerError] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInInputs>();

  const inputOptions = giveSignInInputOptions();

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
          placeholder={translate('placeholder', 'email')}
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
          placeholder={translate('placeholder', 'password')}
          props={passwordInput}
          ref={passwordInput.ref}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        {serverError && <ErrorMessage>{translate('serverError', serverError)}</ErrorMessage>}
        <button type="submit" className={styles.wrapper__btn}>
          {translate('signin')}
        </button>
        <div className={styles.goRegister}>
          {translate('login_account')}
          <Link to={Paths.SignUp}>{translate('to_signup')}</Link>
          {translate('now')}.
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
