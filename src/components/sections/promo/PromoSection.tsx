import { useTranslation } from 'react-i18next';

import PromoHeader from './PromoHeader';

import styles from './promoSection.module.scss';

const PromoSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.promo}>
      <PromoHeader />
      <div className={styles.container}>
        <div>
          <h1 className={styles.promo__header}>{t('promo_header')}</h1>
          <p className={styles.promo__subheader}>{t('promo_subheader')}</p>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
