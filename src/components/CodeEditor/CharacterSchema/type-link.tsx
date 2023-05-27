import { GraphQLType } from 'graphql';
import styles from './type-link.module.scss';
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
      className={styles.type_name}
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
