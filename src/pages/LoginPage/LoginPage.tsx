import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, signInWithEmailAndPassword, signInWithGoogle } from '../../firebase';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/dashboard');
  }, [user, loading]);

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <input
          type="text"
          className={styles.login__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.login__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="button"
          className={styles.login__btn}
          onClick={() => signInWithEmailAndPassword(auth, email, password)}
        >
          Login
        </button>
        <button
          type="button"
          className={[styles.login__btn, styles.login__google].join(' ')}
          onClick={signInWithGoogle}
        >
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don&apos;t have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
