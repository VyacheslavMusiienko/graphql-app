import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import App from '../components/app';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { MainPage, ErrorPage, LoginPage, SignUpPage, WelcomePage } from '../pages';

import Paths from '../utils/enums';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} errorElement={<ErrorPage />}>
      <Route index path={Paths.Welcome} element={<WelcomePage />} />
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
      <Route path={Paths.Main} element={<PrivateRoute />}>
        <Route element={<MainPage />} />
      </Route>
    </Route>
  )
);

export default router;
