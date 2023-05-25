import { GraphQLArgument } from 'graphql';
import DefaultValue from './default-value';
import MarkdownContent from './utils/markdown';
import TypeLink from './type-link';

type ArgumentProps = {
  arg: GraphQLArgument;
  showDefaultValue?: boolean;
  inline?: boolean;
};

const Argument = ({ arg, showDefaultValue, inline }: ArgumentProps) => {
  const definition = (
    <span>
      <span className="graphiql-doc-explorer-argument-name">{arg.name}</span>
      {': '}
      <TypeLink type={arg.type} />
      {showDefaultValue !== false && <DefaultValue field={arg} />}
    </span>
  );
  if (inline) {
    return definition;
  }
  return (
    <div className="graphiql-doc-explorer-argument">
      {definition}
      {arg.description ? (
        <MarkdownContent type="description">{arg.description}</MarkdownContent>
      ) : null}
      {arg.deprecationReason ? (
        <div className="graphiql-doc-explorer-argument-deprecation">
          <div className="graphiql-doc-explorer-argument-deprecation-label">Deprecated</div>
          <MarkdownContent type="deprecation">{arg.deprecationReason}</MarkdownContent>
        </div>
      ) : null}
    </div>
  );
};
export default Argument;
