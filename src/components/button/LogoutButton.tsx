import { signOut } from 'firebase/auth';

import { useTranslation } from 'react-i18next';
import { authSlice } from '../../store/reducers/authSlice';
import { useAppDispatch } from '../../store';
import { auth } from '../../firebase';
import Button from './Button';

import styles from './button.module.scss';

const LogoutButton = ({ isSticky }: { isSticky: boolean }) => {
  const dispatch = useAppDispatch();
  const { setUser } = authSlice.actions;

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch(() => {});
  };

  const { t } = useTranslation();

  return (
    <Button onClick={logout} className={isSticky ? styles.sticky : undefined}>
      {t('logout')}
    </Button>
  );
};

export default LogoutButton;
