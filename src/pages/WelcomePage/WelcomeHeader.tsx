import { LoginButton, SignUpButton, GoToButton } from '../../components/button';
import LocationSwitcher from '../../components/LocationSwitcher';
import AuthStatus from '../../components/authStatus';

import useAuth from '../../hooks/useAuth';

import styles from './welcome.module.scss';

const WelcomeHeader = () => {
  const { user } = useAuth();

  return (
    <div className={styles.preview__btns}>
      {user !== null ? (
        <>
          <LocationSwitcher isSticky={false} />
          <AuthStatus />
          <GoToButton />
        </>
      ) : (
        <>
          <LocationSwitcher isSticky={false} />
          <LoginButton /> / <SignUpButton />
        </>
      )}
    </div>
  );
};

export default WelcomeHeader;
