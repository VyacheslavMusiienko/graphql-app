import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Paths from '../utils/enums';

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useAuth();

  return user ? <Navigate to={Paths.Main} /> : children;
};

export default PublicRoute;
