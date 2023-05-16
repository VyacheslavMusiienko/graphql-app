import useAuth from '../../hooks/useAuth';

const AuthStatus = () => {
  const { user } = useAuth();

  if (user !== null) {
    return <p>Welcome {user.displayName}!</p>;
  }

  return <p>You are not logged in.</p>;
};

export default AuthStatus;
