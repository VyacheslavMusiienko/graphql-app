import { useTranslation } from 'react-i18next';

import styles from './member.module.scss';

interface IMember {
  name: string;
  description: string;
  photo_src: string;
}

const Member = ({ name, description, photo_src }: IMember) => {
  const { t } = useTranslation();

  return (
    <li className={styles.member}>
      <img src={photo_src} alt={`Team Member ${name}`} className={styles.member_photo} />
      <div className={styles.member_info}>
        <h3 className={styles.member_name}>{t(name)}</h3>
        <p className={styles.member_description}>{t(description)}</p>
      </div>
    </li>
  );
};

export default Member;
