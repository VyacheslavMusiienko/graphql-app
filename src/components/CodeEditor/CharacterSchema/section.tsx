import { ReactNode } from 'react';
import styles from './section.module.scss';

type ExplorerSectionProps = {
  children: ReactNode;
  title:
    | 'Root Types'
    | 'Fields'
    | 'Deprecated Fields'
    | 'Type'
    | 'Arguments'
    | 'Deprecated Arguments'
    | 'Implements'
    | 'Implementations'
    | 'Possible Types'
    | 'Enum Values'
    | 'Deprecated Enum Values'
    | 'Directives'
    | 'All Schema Types';
};

const ExplorerSection = ({ title, children }: ExplorerSectionProps) => {
  return (
    <div>
      <div className={styles.section_title}>{title}</div>
      <div className={styles.section_content}>{children}</div>
    </div>
  );
};
export default ExplorerSection;
