import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import useAuth from '../hooks/useAuth';
import Paths from '../utils/enums';

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();

  return user ? <Navigate to={Paths.Main} /> : children;
};

export default PublicRoute;
