import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Input from '../../components/Input';
import Loader from '../../components/loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useAppDispatch, authSlice } from '../../store';
import { giveSignUpInputOptions, translate } from '../../utils/functions';
import { createUserWithEmailAndPasswordWithErrorHandling } from '../../firebase';

import { IErrors, SignUpInputs } from '../../utils/interfaces';
import Paths, { ErrorTypes, SignUpInputNames } from '../../utils/enums';

import styles from './authPages.module.scss';

const SignUpForm = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [serverError, setServerError] = useState<null | IErrors>(null);

  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || Paths.Main;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const inputOptions = giveSignUpInputOptions();

  const nameInput = register(SignUpInputNames.Name, {
    ...inputOptions.name,
    validate: (value) => {
      return value.trim().length < 2 ? translate('signUpError', 'name_length') : true;
    },
  });
  const emailInput = register(SignUpInputNames.Email, inputOptions.email);
  const passwordInput = register(SignUpInputNames.Password, inputOptions.password);
  const repeatPasswordInput = register(SignUpInputNames.RepeatPassword, {
    ...inputOptions.repeatPassword,
    validate: (value) => {
      return watch(SignUpInputNames.Password) === value && value.length > 0
        ? true
        : translate('signUpError', 'repeatPassword');
    },
  });

  const signUp: SubmitHandler<SignUpInputs> = async (data) => {
    setIsLoaderActive(true);
    const { name, password, email } = data;
    const { user, error } = await createUserWithEmailAndPasswordWithErrorHandling(
      email,
      password,
      name
    );

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
    <form onSubmit={handleSubmit(signUp)} className={styles.auth_form}>
      <div className={styles.wrapper__container}>
        <Loader active={isLoaderActive} />
        <Input
          type="text"
          className={styles.wrapper__textBox}
          placeholder={translate('placeholder', 'fullName')}
          props={nameInput}
          ref={nameInput.ref}
        />
        {errors.name && errors.name.type === ErrorTypes.Required && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
        {errors.name && errors.name.type === ErrorTypes.Pattern && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
        {errors.name && errors.name.type === ErrorTypes.MinLength && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
        {errors.name && errors.name.type === ErrorTypes.Validate && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
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
        {errors.password && errors.password.type === ErrorTypes.Required && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        {errors.password && errors.password.type === ErrorTypes.MinLength && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        {errors.password && errors.password.type === ErrorTypes.Pattern && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Input
          type="password"
          className={styles.wrapper__textBox}
          placeholder={translate('placeholder', 'repeatPassword')}
          props={repeatPasswordInput}
          ref={repeatPasswordInput.ref}
        />
        {errors.repeatPassword && <ErrorMessage>{errors.repeatPassword.message}</ErrorMessage>}
        {serverError && serverError.common && (
          <ErrorMessage>{translate('serverError', serverError.common)}</ErrorMessage>
        )}
        <button type="submit" className={styles.wrapper__btn}>
          {translate('signup')}
        </button>
        <div className={styles.goLogin}>
          {translate('signup', 'account')}
          <span className={styles.nowrap}>
            <Link to={Paths.SignIn}> {translate('to_signin')}</Link>
            {translate('now')}.
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
