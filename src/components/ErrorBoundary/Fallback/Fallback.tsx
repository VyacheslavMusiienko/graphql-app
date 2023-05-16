import { useTranslation } from 'react-i18next';
import ExclamationPoint from '../../ExclamationPoint/ExclamationPoint';
import styles from './Fallback.module.scss';

const Fallback = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <ExclamationPoint />
      <h2 className={styles.title}>{t('errorBoundary', { context: 'title' })}</h2>
      <p className={styles.text}>{t('errorBoundary', { context: 'text' })}</p>
    </div>
  );
};

export default Fallback;
