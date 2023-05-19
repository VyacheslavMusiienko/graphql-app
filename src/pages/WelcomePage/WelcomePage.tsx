import { MemberSection, PromoSection, CourseInfoSection } from '../../components/sections';
import Footer from '../../components/Footer';

// import styles from './welcome.module.scss';

const WelcomePage = () => {
  return (
    <>
      <PromoSection />
      <CourseInfoSection />
      <MemberSection />
      <Footer />
    </>
  );
};

export default WelcomePage;
