import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { useAppDispatch, authSlice } from '../../store';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase';

import Paths from '../../utils/enums';

const WelcomePage = () => {
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();
  const currentUser = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {currentUser ? (
        <Link to={Paths.Main}>Main</Link>
      ) : (
        <>
          <Link to={Paths.Login}>Login</Link>
          <Link to={Paths.SignUp}>SignUp</Link>
        </>
      )}
    </div>
  );
};

export default WelcomePage;
