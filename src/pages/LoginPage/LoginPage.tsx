import LoginForm from './LoginForm';
// import SignUpForm from './SignUpForm';

import styles from './LoginPage.module.scss';

/*
TODO:
- [x] Make forms switchable
*/

const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      {/* <SignUpForm /> */}
      <LoginForm />
    </div>
  );
};
export default LoginPage;
