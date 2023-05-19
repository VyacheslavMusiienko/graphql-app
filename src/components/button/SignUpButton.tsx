import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import Paths from '../../utils/enums';

const SignUpButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return <Button onClick={() => navigate(Paths.SignUp)}>{t('signup')}</Button>;
};

export default SignUpButton;
