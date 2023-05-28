import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import Paths from '../utils/enums';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (user === null && !loading) {
    return children;
  }

  if (user !== null && !loading) {
    return <Navigate to={Paths.Main} />;
  }

  return null;
};

export default PublicRoute;
