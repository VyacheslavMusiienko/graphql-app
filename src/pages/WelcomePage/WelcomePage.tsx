import { LoginButton, SignUpButton, GoToButton } from '../../components/button';
import AuthStatus from '../../components/authStatus';
import Footer from '../../components/Footer';

import useAuth from '../../hooks/useAuth';

import { styles } from '../../layout';
// import st from './welcome.module.scss';

const WelcomePage = () => {
  const { user: currentUser } = useAuth();

  return (
    <div className={styles.wrapper}>
      <div style={{ margin: '50px', display: 'flex', flexDirection: 'column' }}>
        {currentUser ? (
          <>
            <AuthStatus />
            <GoToButton where="main page" />
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
