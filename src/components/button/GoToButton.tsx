import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import Paths from '../../utils/enums';

const GoToButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return <Button onClick={() => navigate(Paths.Main)}>{t('go_to_main')}</Button>;
};

export default GoToButton;
