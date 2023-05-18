import { useTranslation } from 'react-i18next';

import styles from './member.module.scss';

const Member = ({ name, description, photo_src }: Record<string, string>) => {
  const { t } = useTranslation();

  return (
    <div className={styles.member}>
      <img src={photo_src} alt={`Team Member ${name}`} className={styles.member_photo} />
      <div className={styles.member_info}>
        <h3 className={styles.member_name}>{t(name)}</h3>
        <p className={styles.member_description}>{t(description)}</p>
      </div>
    </div>
  );
};

export default Member;
