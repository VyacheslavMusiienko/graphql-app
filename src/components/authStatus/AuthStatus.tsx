import { useTranslation } from 'react-i18next';

import useAuth from '../../hooks/useAuth';

const AuthStatus = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();

  if (user === null && !loading) {
    return <p>{t('not_logged_in')}</p>;
  }

  if (user !== null) {
    return (
      <p style={{ fontSize: '20px', color: 'rgb(33, 37, 41)' }}>{`${t('welcome')} ${
        user.displayName
      }!`}</p>
    );
  }

  return null;
};

export default AuthStatus;
