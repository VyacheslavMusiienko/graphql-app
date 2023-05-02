import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import '../App.scss';
import Layout from '../layout/layout';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import MainPage from '../pages/MainPage/MainPage';
import FormPage from '../pages/FormPage/FormPage';
import GraphqlPage from '../pages/GraphqlPage/GraphqlPage';
import { Paths } from '../utils/enums';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.Main} element={<Layout />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />} />
      <Route index element={<MainPage />} />
      <Route path={Paths.GraphQL} element={<GraphqlPage />} />
      <Route path={Paths.Form} element={<FormPage />} />
    </Route>
  )
);

export default router;
