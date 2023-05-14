import { Link } from 'react-router-dom';

import Footer from '../../components/Footer';
import useAuth from '../../hooks/useAuth';

import Paths from '../../utils/enums';

import { styles } from '../../layout';
// import st from './welcome.module.scss';

const WelcomePage = () => {
  const { user: currentUser } = useAuth();

  return (
    <div className={styles.wrapper}>
      <div style={{ margin: '50px', display: 'flex', flexDirection: 'column' }}>
        {currentUser ? (
          <Link to={Paths.Main}>GraphQL</Link>
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
