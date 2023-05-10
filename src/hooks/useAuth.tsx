import { useAppSelector } from '../store';

const useAuth = () => {
  const currentUser = useAppSelector((state) => state.authReducer);
  return currentUser;
};

export default useAuth;
