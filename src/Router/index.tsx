import { useContext } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { MainPage, ErrorPage, GraphqlPage, LoginPage, SignUpPage, AuthLayout } from '../pages';
import Layout from '../layout';

import { Paths } from '../utils/enums';

const PrivateRoute = () => {
  const currentUser = useContext(AuthContext);

  return currentUser ? <Layout /> : <Navigate to={Paths.Login} />;
};

const PublicRoute = () => {
  const currentUser = useContext(AuthContext);

  return currentUser ? <Navigate to={Paths.Main} /> : <AuthLayout />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={Paths.Main} element={<PrivateRoute />} errorElement={<ErrorPage />}>
        <Route index element={<MainPage />} />
        <Route errorElement={<ErrorPage />} />
        <Route path={Paths.GraphQL} element={<GraphqlPage />} />
      </Route>
      <Route path={Paths.Main} element={<PublicRoute />} errorElement={<ErrorPage />}>
        <Route path={Paths.Login} element={<LoginPage />} />
        <Route path={Paths.SignUp} element={<SignUpPage />} />
      </Route>
    </>
  )
);

export default router;
