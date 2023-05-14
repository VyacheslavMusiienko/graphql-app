import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';

import { authSlice, useAppDispatch } from '../../store';
import useAuth from '../../hooks/useAuth';

import { auth } from '../../firebase';

const AuthStatus = () => {
  const { user } = useAuth();

  if (user === null) {
    return <p style={{ marginTop: '100px' }}>You are not logged in.</p>;
  }

  return <p style={{ marginTop: '100px' }}>Welcome {(user as User).displayName}!</p>;
};

const App = () => {
  const { setUser, setLoading } = authSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <AuthStatus />
      <Outlet />
    </div>
  );
};

export default App;
