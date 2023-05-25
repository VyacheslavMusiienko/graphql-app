import { DirectiveNode } from 'graphql';

type DirectiveProps = {
  /**
   * The directive that should be rendered.
   */
  directive: DirectiveNode;
};

const Directive = ({ directive }: DirectiveProps) => {
  return <span className="graphiql-doc-explorer-directive">@{directive.name.value}</span>;
};
export default Directive;
