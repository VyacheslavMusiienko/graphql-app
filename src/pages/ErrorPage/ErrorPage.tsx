import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Paths from '../../utils/enums';
import { Button } from '../../components/button';

import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToMain = () => navigate(Paths.Welcome);
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>{t('errorPage', { context: 'title' })}</h2>
      <Button className={styles.button} onClick={navigateToMain}>
        {t('errorPage', { context: 'button' })}
      </Button>
    </div>
  );
};

export default ErrorPage;
