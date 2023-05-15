import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import Loader from '../../components/loader';

import { authSlice } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store';
import { auth } from '../../firebase';

import Paths from '../../utils/enums';

import styles from './authPages.module.scss';

/*
TODO:
- [x] Create error handling
*/

interface IErrors {
  email: boolean;
  password:
    | {
        message: string;
        id: number;
      }[]
    | [];
}

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [errors, setErrors] = useState<null | IErrors>(null);
  const dispatch = useAppDispatch();
  const { setUser } = authSlice.actions;
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || Paths.Main;

  const isValid = () => {
    const rEmail =
      // eslint-disable-next-line
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const oneNumber = /\d/;
    const oneLetter = /[a-zA-Z]/;
    const oneSpecialCharacter = /[@$!%*#?&]/;

    const errorsObject = {
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

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoaderActive(true);

    if (isValid()) {
      setErrors(null);
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName,
          })
            .then(() => {
              dispatch(setUser(user));

              navigate(from, { replace: true });
            })
            .catch(() => {});
        }
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        () => {};
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
        <input
          type="text"
          className={styles.wrapper__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        {errors && errors.email && <span className={styles.error}>Incorrect email</span>}
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
