import { Link } from 'react-router-dom';

import Button from './Button';
import Paths from '../../utils/enums';
import styles from './button.module.scss';

const SignUpButton = ({ isSticky }: { isSticky: boolean }) => {
  return (
    <Button className={isSticky ? styles.sticky : undefined}>
      <Link to={Paths.SignUp}>SignUp</Link>
    </Button>
  );
};

export default SignUpButton;
