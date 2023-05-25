import { GraphQLArgument } from 'graphql';
import DefaultValue from './default-value';
import MarkdownContent from './markdown';
// eslint-disable-next-line import/no-cycle
import TypeLink from './type-link';

type ArgumentProps = {
  arg: GraphQLArgument;
  /**
   * Toggle if the default value for the argument is shown (if there is one)
   * @default false
   */
  // eslint-disable-next-line react/require-default-props
  showDefaultValue?: boolean;
  /**
   * Toggle whether to render the whole argument including description and
   * deprecation reason (`false`) or to just render the argument name, type,
   * and default value in a single line (`true`).
   * @default false
   */
  // eslint-disable-next-line react/require-default-props
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
