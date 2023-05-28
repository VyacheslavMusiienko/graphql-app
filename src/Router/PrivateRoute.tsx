import { Navigate, useLocation } from 'react-router-dom';

import { Layout } from '../layout';

import useAuth from '../hooks/useAuth';
import Paths from '../utils/enums';

const PrivateRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === null) {
    return <Navigate to={Paths.Welcome} state={{ from: location }} replace />;
  }

  return <Layout />;
};

export default PrivateRoute;
