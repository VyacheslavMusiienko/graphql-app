import { Link } from 'react-router-dom';

import Button from './Button';
import Paths from '../../utils/enums';

const SignUpButton = () => {
  return (
    <Button>
      <Link to={Paths.SignUp}>SignUp</Link>
    </Button>
  );
};

export default SignUpButton;
