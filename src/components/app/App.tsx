import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { authSlice, useAppDispatch } from '../../store';

import { auth } from '../../firebase';

const App = () => {
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

  return <Outlet />;
};

export default App;
