import styles from './Footer.module.scss';
import reactLogo from '../../assets/react.svg';

const Footer = () => {
  return (
    <footer className={styles.row}>
      <div className={styles.link}>
        <a href="https://github.com/vyacheslavmusiienko" target="_blank" rel="noopener noreferrer">
          Viacheslav Musiienko
        </a>
        <a href="https://github.com/sbavia" target="_blank" rel="noopener noreferrer">
          Ivan Nikanau
        </a>
        <a href="https://github.com/luferov1" target="_blank" rel="noopener noreferrer">
          Dzmitry Luferau
        </a>
      </div>
      <div className="data">2023</div>
      <div className="logo">
        <a href="https://rs.school/react/" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
