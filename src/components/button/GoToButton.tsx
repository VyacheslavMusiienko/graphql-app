import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import Paths from '../../utils/enums';

const GoToButton = () => {
  const { t } = useTranslation();

  return (
    <Button>
      <Link to={Paths.Main}>{t('go_to_main')}</Link>
    </Button>
  );
};

export default GoToButton;
