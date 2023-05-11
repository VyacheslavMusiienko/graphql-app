import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  email?: boolean;
  password?: boolean;
}

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [errors, setErrors] = useState<null | IErrors>(null);
  const dispatch = useAppDispatch();
  const { setUser } = authSlice.actions;

  const isValid = () => {
    const rEmail =
      // eslint-disable-next-line
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const oneNumber = /\d/;
    const oneLetter = /[a-zA-Z]/;
    const oneSpecialCharacter = /[@$!%*#?&]/;

    const errorsObject = {
      email: email === '' || !email.match(rEmail),
      password:
        password === '' ||
        password.length < 8 ||
        !password.match(oneNumber) ||
        !password.match(oneLetter) ||
        !password.match(oneSpecialCharacter),
    };

    const isErrorObjectEmpty = !(errorsObject.email || errorsObject.password);

    if (!isErrorObjectEmpty) {
      setErrors(errorsObject);
    }

    return isErrorObjectEmpty;
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoaderActive(true);

    if (isValid()) {
      setErrors(null);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName,
          })
            .then(() => {
              dispatch(setUser(res));
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
        {errors && errors.email && <span>Incorrect email</span>}
        <input
          type="password"
          className={styles.wrapper__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors && errors.password && (
          <span>
            Password should be at least 8 symbols and have at least one letter, one digit and one
            special character (@$!%*#?&)
          </span>
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
