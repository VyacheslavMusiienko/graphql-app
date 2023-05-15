import { LoginButton, SignUpButton, GoToButton } from '../../components/button';
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
          <GoToButton where="main page" />
        ) : (
          <>
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
