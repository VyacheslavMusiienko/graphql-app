import MarkdownContent from './utils/markdown';
import styles from './deprecation-reason.module.scss';

type DeprecationReasonProps = {
  children?: string | null;
};

const DeprecationReason = ({ children }: DeprecationReasonProps) => {
  return children ? (
    <div className={styles.deprecation}>
      <div className={styles.deprecation_label}>Deprecated</div>
      <MarkdownContent type="deprecation" onlyShowFirstChild>
        {children}
      </MarkdownContent>
    </div>
  ) : null;
};
export default DeprecationReason;
