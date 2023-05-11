import { Link } from 'react-router-dom';

import Button from './Button';
import Paths from '../../utils/enums';
import styles from './button.module.scss';

const LoginButton = ({ isSticky }: { isSticky: boolean }) => {
  return (
    <Button className={isSticky ? styles.sticky : undefined}>
      <Link to={Paths.Login}>Login</Link>
    </Button>
  );
};

export default LoginButton;
