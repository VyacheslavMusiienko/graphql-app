import PromoHeader from './PromoHeader';

import styles from './promoSection.module.scss';

const PromoSection = () => {
  return (
    <section className={styles.promo}>
      <PromoHeader />
      <div className={styles.container}>
        <div className={styles.promo__wrapper}>
          <h1 className={styles.promo__header}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, laborum!
          </h1>
          <h2 className={styles.promo__subheader}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe qui assumenda expedita
            eveniet.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
