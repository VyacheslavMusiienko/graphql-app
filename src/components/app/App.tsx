import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';

import { authSlice, useAppDispatch } from '../../store';
import useAuth from '../../hooks/useAuth';

import { auth } from '../../firebase';
import Loader from '../loader';

const AuthStatus = () => {
  const { user, loading } = useAuth();

  if (user === null && !loading) {
    return <p style={{ marginTop: '100px' }}>You are not logged in.</p>;
  }

  if (user !== null) {
    return <p style={{ marginTop: '100px' }}>Welcome {(user as User).displayName}!</p>;
  }

  return null;
};

const App = () => {
  const { setUser, setLoading } = authSlice.actions;
  const dispatch = useAppDispatch();
  const { loading } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <Loader active />;
  }

  return (
    <div>
      <AuthStatus />
      <Outlet />
    </div>
  );
};

export default App;
