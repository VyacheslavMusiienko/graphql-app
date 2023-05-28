import { useTranslation } from 'react-i18next';

import useAuth from '../../hooks/useAuth';

import styles from './authStatus.module.scss';

const AuthStatus = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();

  if (user === null && !loading) {
    return <p>{t('not_logged_in')}</p>;
  }

  if (user !== null) {
    return <p className={styles.status}>{`${t('welcome')} ${user.displayName}!`}</p>;
  }

  return null;
};

export default AuthStatus;
