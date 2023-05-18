/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from 'react-i18next';
import { LoginButton, SignUpButton, GoToButton } from '../../components/button';
import AuthStatus from '../../components/authStatus';
import Footer from '../../components/Footer';

import useAuth from '../../hooks/useAuth';

import styles from './welcome.module.scss';

import Ivan from '../../assets/ivan.jpg';
import Dzmitry from '../../assets/dzmitry.jpg';
import Vyacheslav from '../../assets/vyacheslav.jpg';

const WelcomePage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div>
      <section className={styles.preview}>
        <div className={styles.preview__btns}>
          {user !== null ? (
            <>
              <AuthStatus />
              <GoToButton />
            </>
          ) : (
            <>
              <LoginButton /> / <SignUpButton />
            </>
          )}
        </div>
        <div className={styles.container}>
          <div className={styles.preview__wrapper}>
            <h1 className={styles.preview__header}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, laborum!
            </h1>
            <h2 className={styles.preview__subheader}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem ea id!
            </h2>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.member}>
          <img src={Vyacheslav} alt="Team Member 1" className={styles.member_photo} />
          <div className={styles.member_info}>
            <h3 className={styles.member_name}>{t('Vyacheslav')}</h3>
            <p className={styles.member_description}>ToDo description 1</p>
          </div>
        </div>
        <div className={styles.member}>
          <img src={Ivan} alt="Team Member 2" className={styles.member_photo} />
          <div className={styles.member_info}>
            <h3 className={styles.member_name}>{t('Ivan')}</h3>
            <p className={styles.member_description}>ToDo description 2</p>
          </div>
        </div>
        <div className={styles.member}>
          <img src={Dzmitry} alt="Team Member 3" className={styles.member_photo} />
          <div className={styles.member_info}>
            <h3 className={styles.member_name}>{t('Dzmitry')}</h3>
            <p className={styles.member_description}>ToDo description 3</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default WelcomePage;
