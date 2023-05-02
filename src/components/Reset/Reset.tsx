import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';

import { auth, sendPasswordReset } from '../../firebase';

import styles from './Reset.module.scss';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard');
  }, [user, loading]);

  return (
    <div className={styles.reset}>
      <div className={styles.reset__container}>
        <input
          type="text"
          className={styles.reset__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          type="button"
          className={styles.reset__btn}
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don&apos;t have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
};
export default Reset;
