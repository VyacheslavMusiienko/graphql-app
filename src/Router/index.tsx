import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';

import { MainPage, ErrorPage, LoginPage, SignUpPage, WelcomePage } from '../pages';
import Layout from '../layout';

import useAuth from '../hooks/useAuth';
import Paths from '../utils/enums';

const PrivateRoute = () => {
  const { user } = useAuth();

  return user ? <Layout /> : <Navigate to={Paths.Welcome} />;
};

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useAuth();

  return user ? <Navigate to={Paths.Main} /> : children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={Paths.Welcome} element={<WelcomePage />} />
      <Route
        path={Paths.Login}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={Paths.SignUp}
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route path={Paths.Main} element={<PrivateRoute />} errorElement={<ErrorPage />}>
        <Route index element={<MainPage />} />
        {/* <Route path={Paths.GraphQL} element={<GraphqlPage />} /> */}
        <Route errorElement={<ErrorPage />} />
      </Route>
    </>
  )
);

export default router;
