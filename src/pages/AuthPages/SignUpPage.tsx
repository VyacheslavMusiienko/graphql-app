import SignUpForm from './SignUpForm';

import styles from './AuthPages.module.scss';

const SignUpPage = () => {
  return (
    <div className={styles.wrapper}>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
