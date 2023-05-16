import styles from './authPages.module.scss';

interface IErrorMessageProps<T> {
  isList?: boolean;
  field: string;
  errorObject: T | null;
  children: React.ReactNode;
}

function ErrorMessage<T>({ isList, field, errorObject, children }: IErrorMessageProps<T>) {
  if (isList) {
    return <ul />;
  }
  if (errorObject && errorObject[field]) {
    return <span className={styles.error}>{children}</span>;
  }

  return null;
}

ErrorMessage.defaultProps = {
  isList: false,
};

export default ErrorMessage;
