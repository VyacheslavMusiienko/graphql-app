import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { MainPage, ErrorPage, LoginPage, SignUpPage, WelcomePage } from '../pages';
import { Layout } from '../layout';
import App from '../components/app';

import useAuth from '../hooks/useAuth';
import Paths from '../utils/enums';

const PrivateRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={Paths.Login} state={{ from: location }} replace />;
  }

  return <Layout />;
};

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useAuth();

  return user ? <Navigate to={Paths.Main} /> : children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.Welcome} element={<App />}>
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
      <Route path={Paths.Main} element={<PrivateRoute />} errorElement={<ErrorPage />}>
        <Route index element={<MainPage />} />
        {/* <Route path={Paths.GraphQL} element={<GraphqlPage />} /> */}
        <Route errorElement={<ErrorPage />} />
      </Route>
    </Route>
  )
);

export default router;
