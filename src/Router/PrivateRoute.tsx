import { Navigate, useLocation } from 'react-router-dom';

import { Layout } from '../layout';

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

export default PrivateRoute;
