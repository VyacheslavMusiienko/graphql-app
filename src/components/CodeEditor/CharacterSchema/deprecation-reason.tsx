import MarkdownContent from './utils/markdown';

type DeprecationReasonProps = {
  // eslint-disable-next-line react/require-default-props
  children?: string | null;
};

const DeprecationReason = ({ children }: DeprecationReasonProps) => {
  return children ? (
    <div className="graphiql-doc-explorer-deprecation">
      <div className="graphiql-doc-explorer-deprecation-label">Deprecated</div>
      <MarkdownContent type="deprecation" onlyShowFirstChild>
        {children}
      </MarkdownContent>
    </div>
  ) : null;
};
export default DeprecationReason;
