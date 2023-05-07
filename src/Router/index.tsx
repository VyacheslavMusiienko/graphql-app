import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { LoginPage, MainPage, ErrorPage, GraphqlPage, FormPage } from '../pages';
import Layout from '../layout/layout';

import { Paths } from '../utils/enums';

import '../App.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={Paths.Main} element={<Layout />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />} />
        <Route index element={<MainPage />} />
        <Route path={Paths.GraphQL} element={<GraphqlPage />} />
      </Route>
      <Route path={Paths.Login} element={<LoginPage />} />
      <Route path={Paths.Form} element={<FormPage />} errorElement={<ErrorPage />} />
    </>
  )
);

export default router;
