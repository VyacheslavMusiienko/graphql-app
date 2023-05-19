import { useTranslation } from 'react-i18next';

import styles from './courseInfo.module.scss';

const CourseInfoSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.dark}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2 className={styles.title}>{t('course_title')}</h2>
          <p className={styles.description}>{t('course_description')}</p>
        </div>
      </div>
    </section>
  );
};

export default CourseInfoSection;
