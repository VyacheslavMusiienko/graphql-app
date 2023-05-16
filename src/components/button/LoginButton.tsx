import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import Paths from '../../utils/enums';

const LoginButton = () => {
  const { t } = useTranslation();
  return (
    <Button>
      <Link to={Paths.Login}>{t('login')}</Link>
    </Button>
  );
};

export default LoginButton;
