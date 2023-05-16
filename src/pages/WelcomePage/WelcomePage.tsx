import { LoginButton, SignUpButton, GoToButton } from '../../components/button';
import AuthStatus from '../../components/authStatus';
import Footer from '../../components/Footer';

import useAuth from '../../hooks/useAuth';

import { styles } from '../../layout';
// import st from './welcome.module.scss';

const WelcomePage = () => {
  const { user } = useAuth();

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
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
