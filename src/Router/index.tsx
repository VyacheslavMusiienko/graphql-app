import { createBrowserRouter, createRoutesFromElements, Route, redirect } from 'react-router-dom';

import { LoginPage, MainPage, ErrorPage, GraphqlPage } from '../pages';
import App from '../components/App';

import { Paths } from '../utils/enums';

/*
TODO:
- [x] Create public and private routes
*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.Main} element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<MainPage />} />
      <Route errorElement={<ErrorPage />} />
      <Route path={Paths.GraphQL} element={<GraphqlPage />} />
      <Route path={Paths.Login} loader={() => redirect('/')} element={<LoginPage />} />
    </Route>
  )
);

export default router;
