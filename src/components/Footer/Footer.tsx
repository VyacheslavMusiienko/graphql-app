import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SvgNText from '../SvgNText';
import { FooterLinks } from '../../utils/enums';

import rsLogo from '../../assets/svg/rsLogo.svg';
import ghLogo from '../../assets/svg/gitLogo.svg';

import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer_wrapper}>
          <Link to={FooterLinks.RsSchool} target="_blank">
            <img src={rsLogo} alt="ghLogo" />
          </Link>
          <Link to={FooterLinks.Luferov} className={styles.link} target="_blank">
            <SvgNText text={t('dzmitry_full') as string} src={ghLogo} />
          </Link>
          <Link to={FooterLinks.Nikanau} className={styles.link} target="_blank">
            <SvgNText text={t('ivan_full') as string} src={ghLogo} />
          </Link>
          <Link to={FooterLinks.Musiienko} className={styles.link} target="_blank">
            <SvgNText text={t('vyacheslav_full') as string} src={ghLogo} />
          </Link>
          <span className={styles.year}>2023</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
