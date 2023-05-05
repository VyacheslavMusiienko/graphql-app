import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Navigation from '../Navigation/Navigation';
import { Paths } from '../../utils/enums';
import LogOutButton from '../buttons/LogOutButton/LogOutButton';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to={Paths.Main} className={styles.title}>
        <h1>GraphQL</h1>
      </Link>
      <Navigation />
      <LogOutButton />
    </header>
  );
};

export default Header;
