/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from 'react-i18next';
import { LoginButton, SignUpButton, GoToButton } from '../../components/button';
import AuthStatus from '../../components/authStatus';
import Footer from '../../components/Footer';

import useAuth from '../../hooks/useAuth';

import { styles } from '../../layout';
import st from './welcome.module.scss';

import Ivan from '../../assets/ivan.jpg';
import Dzmitry from '../../assets/dzmitry.jpg';
import Vyacheslav from '../../assets/vyacheslav.jpg';

const WelcomePage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div style={{ margin: '50px', display: 'flex', flexDirection: 'column' }}>
        {user !== null ? (
          <>
            <AuthStatus />
            <GoToButton />
          </>
        ) : (
          <>
            <AuthStatus />
            <LoginButton />
            <SignUpButton />
          </>
        )}
        <section className={st.teamSection}>
          <div className={st.teamMember}>
            <img src={Vyacheslav} alt="Team Member 1" className={st.memberPhoto} />
            <div className={st.memberInfo}>
              <h3 className={st.memberName}>{t('Vyacheslav')}</h3>
              <p className={st.memberDescription}>ToDo description 1</p>
            </div>
          </div>
          <div className={st.teamMember}>
            <img src={Ivan} alt="Team Member 2" className={st.memberPhoto} />
            <div className={st.memberInfo}>
              <h3 className={st.memberName}>{t('Ivan')}</h3>
              <p className={st.memberDescription}>ToDo description 2</p>
            </div>
          </div>
          <div className={st.teamMember}>
            <img src={Dzmitry} alt="Team Member 3" className={st.memberPhoto} />
            <div className={st.memberInfo}>
              <h3 className={st.memberName}>{t('Dzmitry')}</h3>
              <p className={st.memberDescription}>ToDo description 3</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
