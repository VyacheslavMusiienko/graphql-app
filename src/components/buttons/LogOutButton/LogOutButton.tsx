import { signOut } from 'firebase/auth';

import { mainPageSlice } from '../../../store/reducers/mainPageSlice';
import { useAppDispatch } from '../../../hooks';
import { auth } from '../../../firebase';
import Button from '../Button';

import { IsSticky } from '../../../utils/interfaces';
import styles from './logOutButton.module.scss';

const LogOutButton = ({ isSticky }: IsSticky) => {
  const dispatch = useAppDispatch();
  const { setLogin } = mainPageSlice.actions;

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setLogin(null));
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
