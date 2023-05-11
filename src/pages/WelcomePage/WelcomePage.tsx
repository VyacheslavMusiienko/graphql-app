import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useAuth from '../../hooks/useAuth';

import Paths from '../../utils/enums';

import { styles } from '../../layout';

const WelcomePage = () => {
  const { user: currentUser } = useAuth();

  return (
    <div className={styles.wrapper}>
      <Header />
      <div style={{ margin: '50px', display: 'flex', flexDirection: 'column' }}>
        {currentUser ? (
          <Link to={Paths.Main}>Welcome</Link>
        ) : (
          <>
            <Link to={Paths.Login}>Login</Link>
            <Link to={Paths.SignUp}>SignUp</Link>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
