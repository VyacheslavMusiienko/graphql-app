import { Link } from 'react-router-dom';

import Button from './Button';
import Paths from '../../utils/enums';

const LoginButton = () => {
  return (
    <Button>
      <Link to={Paths.Login}>Login</Link>
    </Button>
  );
};

export default LoginButton;
