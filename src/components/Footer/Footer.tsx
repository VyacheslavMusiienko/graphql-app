import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import rsLogo from '../../assets/svg/rsLogo.svg';
import ghLogo from '../../assets/svg/gitLogo.svg';
import { FooterLinks } from '../../utils/enums';
import SvgNText from '../SvgNText/SvgNText';

const Footer = () => (
  <footer className={styles.footer}>
    <Link to={FooterLinks.RsSchool} target="_blank">
      <img src={rsLogo} alt="ghLogo" />
    </Link>
    <Link to={FooterLinks.Luferov} className={styles.link} target="_blank">
      <SvgNText text="Dmitry Luferov" src={ghLogo} />
    </Link>
    <Link to={FooterLinks.Nikanau} className={styles.link} target="_blank">
      <SvgNText text="Ivan Nikanau" src={ghLogo} />
    </Link>
    <Link to={FooterLinks.Musiienko} className={styles.link} target="_blank">
      <SvgNText text="Viacheslav Musiienko" src={ghLogo} />
    </Link>
    <span className={styles.year}>2023</span>
  </footer>
);

export default Footer;
