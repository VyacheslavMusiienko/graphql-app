import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';

import { authSlice, useAppDispatch } from '../../store';
import useAuth from '../../hooks/useAuth';

import { auth } from '../../firebase';
import Loader from '../loader';

const App = () => {
  const { setUser, setLoading } = authSlice.actions;
  const dispatch = useAppDispatch();
  const { loading } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(setUser(user));
      dispatch(setLoading(false));

      let idTokenResult;
      if (auth.currentUser) {
        idTokenResult = await getIdTokenResult(auth.currentUser);
      }

      if (idTokenResult && new Date(idTokenResult.expirationTime).getTime() < Date.now()) {
        dispatch(setUser(null));
        dispatch(setLoading(false));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <Loader active />;
  }

  return <Outlet />;
};

export default App;
