import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import Header from '../../components/Header';
import { useAppDispatch, authSlice } from '../../store';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase';

import Paths from '../../utils/enums';

const WelcomePage = () => {
  const { user: currentUser } = useAuth();
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Header />
      <div style={{ margin: '50px', display: 'flex', flexDirection: 'column' }}>
        {currentUser ? (
          <Link to={Paths.Main}>Main</Link>
        ) : (
          <>
            <Link to={Paths.Login}>Login</Link>
            <Link to={Paths.SignUp}>SignUp</Link>
          </>
        )}
      </div>
    </>
  );
};

export default WelcomePage;
