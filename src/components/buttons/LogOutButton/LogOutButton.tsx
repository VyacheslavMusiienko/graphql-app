import { signOut } from 'firebase/auth';

import { authSlice } from '../../../store/reducers/authSlice';
import { useAppDispatch } from '../../../store';
import { auth } from '../../../firebase';
import Button from '../Button';

import { IsSticky } from '../../../utils/interfaces';
import styles from './logOutButton.module.scss';

const LogOutButton = ({ isSticky }: IsSticky) => {
  const dispatch = useAppDispatch();
  const { setUser } = authSlice.actions;

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch(() => {});
  };

  return (
    <Button onClick={logOut} className={isSticky ? styles.sticky : undefined}>
      logOut
    </Button>
  );
};

export default LogOutButton;
