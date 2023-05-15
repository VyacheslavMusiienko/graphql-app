import { Link } from 'react-router-dom';

import Button from './Button';
import Paths from '../../utils/enums';

const GoToButton = ({ where }: { where: string }) => {
  return (
    <Button>
      <Link to={Paths.Main}>
        Go to{' '}
        {where
          .split(' ')
          .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
          .join(' ')}
      </Link>
    </Button>
  );
};

export default GoToButton;
