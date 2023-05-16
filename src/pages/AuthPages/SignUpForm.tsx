import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import Loader from '../../components/loader';

import { authSlice } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store';
import { auth } from '../../firebase';

import Paths from '../../utils/enums';

import styles from './authPages.module.scss';

interface ErrorObject {
  message: string;
  id: number;
}

interface IErrors {
  name: boolean;
  email: boolean;
  password: ErrorObject[] | [];
  common: string | null;
}

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [errors, setErrors] = useState<null | IErrors>(null);

  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || Paths.Main;

  const errorCodes: Record<string, string> = {
    'auth/invalid-email': 'The email address is not valid',
    'auth/user-not-found': 'There is no user with such email',
    'auth/wrong-password': 'The password is invalid for the given email',
    'auth/missing-password': 'Missing the password',
    'auth/user-disabled': 'The user corresponding to the given email has been disabled',
    'auth/too-many-requests': 'Too many requests. Try again later',
  };

  const isValid = () => {
    const rEmail =
      // eslint-disable-next-line
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const oneNumber = /\d/;
    const oneLetter = /[a-zA-Z]/;
    const oneSpecialCharacter = /[@$!%*#?&]/;

    const errorsObject = {
      name: displayName.trim().length < 2,
      email: email === '' || !email.match(rEmail),
      password: [
        password.trim().length < 8 && {
          id: 1,
          message: 'should be at least 8 symbols',
        },
        !password.trim().match(oneNumber) && {
          id: 2,
          message: 'should have at least one number',
        },
        !password.trim().match(oneLetter) && {
          id: 3,
          message: 'should have at least one letter',
        },
        !password.trim().match(oneSpecialCharacter) && {
          id: 4,
          message: 'should have at least one special character - @$!%*#?&',
        },
      ].filter((el) => el),
    };

    const isErrorObjectEmpty = !(errorsObject.email || errorsObject.password.length > 0);

    if (!isErrorObjectEmpty) {
      setErrors(errorsObject as IErrors);
    }

    return isErrorObjectEmpty;
  };

  const createUserWithEmailAndPasswordWithErrorHandling = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoaderActive(true);

    if (isValid()) {
      setErrors(null);

      const { user, error } = await createUserWithEmailAndPasswordWithErrorHandling();

      if (user !== null && auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
        })
          .then(() => {
            setErrors(null);
            dispatch(setUser(user));
            navigate(from, { replace: true });
          })
          .catch(() => {
            setErrors({
              name: false,
              email: false,
              password: [],
              common: `Something went wrong with updating profile`,
            });
          });
      } else {
        const firebaseError = error as FirebaseError;
        if (firebaseError.code === 'auth/invalid-email') {
          setErrors({
            name: false,
            email: true,
            password: [],
            common: ``,
          });
        } else {
          setErrors({
            name: false,
            email: false,
            password: [],
            common: errorCodes[firebaseError.code],
          });
        }
      }
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
          placeholder="Full Name"
        />
        {errors && errors.name && (
          <span className={styles.error}>Name should be at least 2 letters</span>
        )}
        <input
          type="text"
          className={styles.wrapper__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        {errors && errors.email && (
          <span className={styles.error}>The email address is not valid</span>
        )}
        <input
          type="password"
          className={styles.wrapper__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors && errors.password && errors.password.length > 0 && (
          <ul className={[styles.error, styles.error_list].join(' ')}>
            <span>Password:</span>
            {errors.password.map(({ message, id }) => {
              return <li key={id}>{message}</li>;
            })}
          </ul>
        )}
        {errors && errors.common && <span className={styles.error}>{errors.common}</span>}
        <button type="submit" className={styles.wrapper__btn}>
          Register
        </button>
        <div>
          Already have an account? <Link to={Paths.Login}>Login</Link> now.
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
