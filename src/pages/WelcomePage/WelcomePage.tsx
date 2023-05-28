import { MemberSection, PromoSection, CourseInfoSection } from '../../components/sections';
import Footer from '../../components/Footer';

const WelcomePage = () => {
  return (
    <main>
      <PromoSection />
      <CourseInfoSection />
      <MemberSection />
      <Footer />
    </main>
  );
};

export default WelcomePage;
