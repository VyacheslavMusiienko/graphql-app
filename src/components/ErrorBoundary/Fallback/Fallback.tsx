import styles from './Fallback.module.scss';
import ExclamationPoint from '../../ExclamationPoint/ExclamationPoint';

const Fallback = () => (
  <div className={styles.container}>
    <ExclamationPoint />
    <h2 className={styles.title}>Something went wrong...</h2>
    <p className={styles.text}>Please try again later</p>
  </div>
);

export default Fallback;
