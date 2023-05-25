import { ReactNode } from 'react';
import styles from './ErrorMessage.module.scss';

interface Props {
  children: ReactNode;
}
const ErrorMessage = ({ children }: Props) => {
  return <span className={styles.error}>{children}</span>;
};

export default ErrorMessage;
