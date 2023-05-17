import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import Paths from '../../utils/enums';

const LoginButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return <Button onClick={() => navigate(Paths.Login)}>{t('login')}</Button>;
};

export default LoginButton;
