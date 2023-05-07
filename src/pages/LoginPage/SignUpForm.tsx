/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, registerWithEmailAndPassword } from '../../firebase';

import styles from './LoginPage.module.scss';

interface SignUpFormProps {
  toggleForm: () => void;
}

const SignUpForm = ({ toggleForm }: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    // if (loading) return;
    // if (user) navigate('/dashboard');
  }, [user, loading]);

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userCredential = registerWithEmailAndPassword(name, email, password);
    if (userCredential) {
      userCredential
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={signUp}>
      <div className={styles.wrapper__container}>
        <input
          type="text"
          className={styles.wrapper__textBox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className={styles.wrapper__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.wrapper__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className={styles.wrapper__btn}>
          Register
        </button>
        <div>
          Already have an account?{' '}
          <span onClick={toggleForm} role="button" tabIndex={0}>
            Login
          </span>{' '}
          now.
        </div>
      </div>
    </form>
  );
};
export default SignUpForm;
