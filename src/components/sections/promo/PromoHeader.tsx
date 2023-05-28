import { LoginButton, SignUpButton, GoToButton } from '../../button';
import LocationSwitcher from '../../LocationSwitcher';
import AuthStatus from '../../authStatus';

import useAuth from '../../../hooks/useAuth';

import styles from './promoSection.module.scss';

const PromoHeader = () => {
  const { user } = useAuth();

  return (
    <div className={styles.promo__btns}>
      <LocationSwitcher isSticky={false} />
      {user !== null ? (
        <>
          <AuthStatus />
          <GoToButton />
        </>
      ) : (
        <>
          <LoginButton />
          <SignUpButton />
        </>
      )}
    </div>
  );
};

export default PromoHeader;
