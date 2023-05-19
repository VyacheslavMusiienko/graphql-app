import { LoginButton, SignUpButton, GoToButton } from '../../button';
import LocationSwitcher from '../../LocationSwitcher';
import AuthStatus from '../../authStatus';

import useAuth from '../../../hooks/useAuth';

import styles from './promoSection.module.scss';

const PromoHeader = () => {
  const { user } = useAuth();

  return (
    <div className={styles.promo__btns}>
      {user !== null ? (
        <>
          <LocationSwitcher isSticky={false} />
          <AuthStatus />
          <GoToButton />
        </>
      ) : (
        <>
          <LocationSwitcher isSticky={false} />
          <LoginButton />
          <SignUpButton />
        </>
      )}
    </div>
  );
};

export default PromoHeader;
