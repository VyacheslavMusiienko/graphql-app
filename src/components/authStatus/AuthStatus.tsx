import useAuth from '../../hooks/useAuth';

const AuthStatus = () => {
  const { user, loading } = useAuth();

  if (user === null && !loading) {
    return <p>You are not logged in.</p>;
  }

  if (user !== null) {
    return <p>Welcome {user.displayName}!</p>;
  }

  return null;
};

export default AuthStatus;
