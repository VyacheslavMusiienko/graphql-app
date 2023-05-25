import { ReactNode } from 'react';

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
      <div className="graphiql-doc-explorer-section-title">{title}</div>
      <div className="graphiql-doc-explorer-section-content">{children}</div>
    </div>
  );
};
export default ExplorerSection;
