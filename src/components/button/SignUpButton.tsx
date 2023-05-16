import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import Paths from '../../utils/enums';

const SignUpButton = () => {
  const { t } = useTranslation();
  return (
    <Button>
      <Link to={Paths.SignUp}>{t('register')}</Link>
    </Button>
  );
};

export default SignUpButton;
