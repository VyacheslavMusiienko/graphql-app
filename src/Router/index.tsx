import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import App from '../components/app';
import { ErrorPage, LoginPage, MainPage, SignUpPage, WelcomePage } from '../pages';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Paths from '../utils/enums';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} errorElement={<ErrorPage />}>
      <Route index path={Paths.Welcome} element={<WelcomePage />} />
      <Route
        path={Paths.SignIn}
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
      <Route element={<PrivateRoute />}>
        <Route path={Paths.Main} element={<MainPage />} />
      </Route>
    </Route>
  )
);

export default router;
