import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Button from './Button';
import Paths from '../../utils/enums';
import styles from './button.module.scss';

const LoginButton = ({ isSticky }: { isSticky: boolean }) => {
  const { t } = useTranslation();
  return (
    <Button className={isSticky ? styles.sticky : undefined}>
      <Link to={Paths.Login}>{t('login')}</Link>
    </Button>
  );
};

export default LoginButton;
