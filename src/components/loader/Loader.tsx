import styles from './loader.module.scss';

const Loader = ({ active }: { active: boolean }) => {
  return active ? (
    <div className={[styles.loader, styles.active].join(' ')}>
      <div className={styles.loader__o} />
    </div>
  ) : null;
};

export default Loader;
