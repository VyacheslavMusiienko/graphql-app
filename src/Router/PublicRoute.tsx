import { Navigate } from 'react-router-dom';

import Loader from '../components/loader';
import useAuth from '../hooks/useAuth';
import Paths from '../utils/enums';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader active />;
  }

  if (user === null && !loading) {
    return children;
  }

  if (user !== null && !loading) {
    return <Navigate to={Paths.Main} />;
  }

  return null;
};

export default PublicRoute;
