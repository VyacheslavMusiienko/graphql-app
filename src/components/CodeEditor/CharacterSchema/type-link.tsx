import { GraphQLType } from 'graphql';
import { useExplorerContext } from './utils/context-explorer';
import renderType from './utils/util';

type TypeLinkProps = {
  type: GraphQLType;
};

const TypeLink = (props: TypeLinkProps) => {
  const { push } = useExplorerContext({ nonNull: true, caller: TypeLink });

  if (!props.type) {
    return null;
  }

  return renderType(props.type, (namedType) => (
    <button
      type="button"
      className="graphiql-doc-explorer-type-name"
      onClick={(event) => {
        event.preventDefault();
        push({ name: namedType.name, def: namedType });
      }}
    >
      {namedType.name}
    </button>
  ));
};
export default TypeLink;
