import SignUpForm from './SignUpForm';

import ErrorBoundary from '../../components/ErrorBoundary';

import styles from './authPages.module.scss';

const SignUpPage = () => {
  return (
    <div className={styles.wrapper}>
      <ErrorBoundary>
        <SignUpForm />
      </ErrorBoundary>
    </div>
  );
};

export default SignUpPage;
