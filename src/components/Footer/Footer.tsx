import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SvgNText from '../SvgNText';
import { FooterLinks } from '../../utils/enums';

import styles from './Footer.module.scss';
import rsLogo from '../../assets/svg/rsLogo.svg';
import ghLogo from '../../assets/svg/gitLogo.svg';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <Link to={FooterLinks.RsSchool} target="_blank">
        <img src={rsLogo} alt="ghLogo" />
      </Link>
      <Link to={FooterLinks.Luferov} className={styles.link} target="_blank">
        <SvgNText text={t('name', { context: 'luf' }) as string} src={ghLogo} />
      </Link>
      <Link to={FooterLinks.Nikanau} className={styles.link} target="_blank">
        <SvgNText text={t('name', { context: 'nik' }) as string} src={ghLogo} />
      </Link>
      <Link to={FooterLinks.Musiienko} className={styles.link} target="_blank">
        <SvgNText text={t('name', { context: 'mus' }) as string} src={ghLogo} />
      </Link>
      <span className={styles.year}>2023</span>
    </footer>
  );
};

export default Footer;
