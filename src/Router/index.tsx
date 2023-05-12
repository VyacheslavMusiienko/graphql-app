import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import App from '../components/app';
import { ErrorPage, GraphqlPage, LoginPage, MainPage, SignUpPage, WelcomePage } from '../pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Paths from '../utils/enums';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.Welcome} element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<WelcomePage />} />
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
        <Route index element={<MainPage />} />
        {/* <Route path={Paths.GraphQL} element={<GraphqlPage />} /> */}
      </Route>
      <Route path={Paths.GraphQL} element={<PrivateRoute />}>
        <Route index element={<GraphqlPage />} />
        {/* <Route path={Paths.GraphQL} element={<GraphqlPage />} /> */}
      </Route>
    </Route>
  )
);

export default router;
