import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Button from './Button';
import Paths from '../../utils/enums';
import styles from './button.module.scss';

const SignUpButton = ({ isSticky }: { isSticky: boolean }) => {
  const { t } = useTranslation();
  return (
    <Button className={isSticky ? styles.sticky : undefined}>
      <Link to={Paths.SignUp}>{t('register')}</Link>
    </Button>
  );
};

export default SignUpButton;
