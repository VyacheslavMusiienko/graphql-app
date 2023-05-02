import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { LoginPage, MainPage, ErrorPage, GraphqlPage, FormPage } from '../pages';
import Layout from '../layout/layout';
import Dashboard from '../components/Dashboard/Dashboard';
import Register from '../components/Register/Register';
import Reset from '../components/Reset/Reset';

import { Paths } from '../utils/enums';

import '../App.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.Main} element={<Layout />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />} />
      <Route index element={<MainPage />} />
      <Route path={Paths.GraphQL} element={<GraphqlPage />} />
      <Route path={Paths.Form} element={<FormPage />} />
      <Route path={Paths.Login} element={<LoginPage />} />
      <Route path={Paths.Dashboard} element={<Dashboard />} />
      <Route path={Paths.Register} element={<Register />} />
      <Route path={Paths.Reset} element={<Reset />} />
    </Route>
  )
);

export default router;
