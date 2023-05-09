import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { MainPage, ErrorPage, GraphqlPage, LoginPage, SignUpPage, AuthLayout } from '../pages';
import Layout from '../layout';

import { Paths } from '../utils/enums';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={Paths.Main} element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<MainPage />} />
        <Route errorElement={<ErrorPage />} />
        <Route path={Paths.GraphQL} element={<GraphqlPage />} />
      </Route>
      <Route path={Paths.Main} element={<AuthLayout />} errorElement={<ErrorPage />}>
        <Route path={Paths.Login} element={<LoginPage />} />
        <Route path={Paths.SignUp} element={<SignUpPage />} />
      </Route>
    </>
  )
);

export default router;
