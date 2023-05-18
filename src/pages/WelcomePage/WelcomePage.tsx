import WelcomeHeader from './WelcomeHeader';
import { MemberSection } from '../../components/membersSection';
import Footer from '../../components/Footer';

import styles from './welcome.module.scss';

const WelcomePage = () => {
  return (
    <div>
      <section className={styles.preview}>
        <WelcomeHeader />
        <div className={styles.container}>
          <div className={styles.preview__wrapper}>
            <h1 className={styles.preview__header}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, laborum!
            </h1>
            <h2 className={styles.preview__subheader}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem ea id!
            </h2>
          </div>
        </div>
      </section>
      <MemberSection />
      <Footer />
    </div>
  );
};

export default WelcomePage;
