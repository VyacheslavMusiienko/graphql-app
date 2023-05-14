import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import Button from './Button';

import Paths from '../../utils/enums';
import { auth } from '../../firebase';
import { useAppDispatch } from '../../store';
import { authSlice } from '../../store/reducers/authSlice';

import styles from './button.module.scss';

const LogoutButton = ({ isSticky }: { isSticky: boolean }) => {
  const dispatch = useAppDispatch();
  const { setUser } = authSlice.actions;
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        navigate(Paths.Welcome);
      })
      .catch(() => {});
  };

  const clazz = isSticky ? [styles.sticky, 'MG-R'].join(' ') : 'MG-R';

  return (
    <Button onClick={logout} className={clazz}>
      Logout
    </Button>
  );
};

export default LogoutButton;
